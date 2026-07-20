const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 1. Parse .env.local variables
const envPath = path.join(__dirname, '.env.local');
const env = {};
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] || '';
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1);
            }
            env[match[1]] = value.trim();
        }
    });
}

const botToken = env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const adminChatIds = (env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || '').split(',').map(id => id.trim());

if (!botToken) {
    console.error('Error: TELEGRAM_BOT_TOKEN not found in .env.local!');
    process.exit(1);
}

console.log(`Starting ENQOPAZYON {dev} Telegram Bot Concierge...`);

// Bind a web port for Render health checks ONLY if running in STANDALONE_BOT mode
if (process.env.STANDALONE_BOT === 'true') {
    const PORT = process.env.PORT || 10000;
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ENQOPAZYON Telegram Bot is Alive and running!\n');
    });
    server.listen(PORT, () => {
        console.log(`HTTP Server bound successfully on port ${PORT} for Render health checks.`);
    });
} else {
    console.log("Running in concurrent mode. Web server skipped to let Next.js bind to the port.");
}

// Robust HTTPS Request Wrapper (solves native fetch IPv6 resolve errors on Windows)
const telegramApi = (method, body = {}) => {
    return new Promise((resolve) => {
        const payload = JSON.stringify(body);
        const options = {
            hostname: 'api.telegram.org',
            port: 443,
            path: `/bot${botToken}/${method}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ ok: false, description: 'Parsing error' });
                }
            });
        });

        req.on('error', (err) => {
            console.error(`Telegram API error (${method}):`, err.message);
            resolve({ ok: false, description: err.message });
        });

        req.write(payload);
        req.end();
    });
};

// Setup Self-Pinging Interval to prevent Render Free Tier sleeping (every 10 minutes)
const appUrl = env.APP_URL || process.env.RENDER_EXTERNAL_URL || process.env.APP_URL;
if (appUrl) {
    console.log(`Self-pinging activated for bot: ${appUrl}`);
    setInterval(() => {
        const pingLib = appUrl.startsWith('https') ? https : http;
        pingLib.get(appUrl, (res) => {
            console.log(`[Self-Ping] Bot Keep-Alive response: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error('[Self-Ping] Bot Keep-Alive failed:', err.message);
        });
    }, 10 * 60 * 1000); // 10 minutes interval
} else {
    console.log("Self-pinging disabled for bot (Provide APP_URL or RENDER_EXTERNAL_URL to keep bot alive).");
}

// Setup Pinging Interval for the Portfolio Website to prevent sleeping (every 12 minutes)
const portfolioUrl = env.PORTFOLIO_URL || process.env.PORTFOLIO_URL;
if (portfolioUrl) {
    console.log(`Self-pinging activated for portfolio website: ${portfolioUrl}`);
    setInterval(() => {
        const pingLib = portfolioUrl.startsWith('https') ? https : http;
        pingLib.get(portfolioUrl, (res) => {
            console.log(`[Self-Ping] Portfolio Website Keep-Alive response: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error('[Self-Ping] Portfolio Website Keep-Alive failed:', err.message);
        });
    }, 12 * 60 * 1000); // 12 minutes interval
} else {
    console.log("Self-pinging disabled for portfolio website (Provide PORTFOLIO_URL to keep website alive).");
}

// State store for active users
const userStates = {};

// Persistent Custom Keyboard (Always visible at the bottom)
const replyKeyboard = {
    keyboard: [
        [{ text: "💻 Website Packages" }, { text: "🤖 Bot Packages" }],
        [{ text: "📱 Mobile App Packages" }, { text: "💡 Pitch Tip (ጠቃሚ ምክር)" }],
        [{ text: "📞 Request Consultation" }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
};

const sendWelcomeMessage = async (chatId, firstName) => {
    const text = `👋 *እንኳን ወደ ENQOPAZYON {dev} ቦት በደህና መጡ, ${firstName}!*
እኛ ዘመናዊ ዌብሳይቶችን፣ የቴሌግራም ቦቶችን እና የሞባይል መተግበሪያዎችን (Apps) ለድርጅትዎ እንሰራለን።

🌟 *የሰራኋቸውን ፕሮጀክቶች፣ ስራዎች እና ልምዶቼን በፎቶ እና በዲሞ ለመመልከት ከታች በስተግራ ያለውን \`🌐 {dev} web\` (ወይም Menu) አዝራር ይጫኑ!*

👋 *Welcome to ENQOPAZYON {dev} Concierge, ${firstName}!*
We build premium websites, custom Telegram bots, and responsive mobile applications directly for your business.

🌟 *To explore our full portfolio, live interactive project demos, and experience, tap the \`🌐 {dev} web\` button at the bottom left!*

👇 *ከታች ካሉት አዝራሮች በመምረጥም የዋጋ ክፍፍሎችን ማየት ይችላሉ (Choose an option below):*`;

    await telegramApi("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: replyKeyboard
    });
};

const sendWebsitePackages = async (chatId) => {
    const text = `🖥️ *የዌብሳይት ፓኬጆችና የዋጋ ክፍፍል (Website Packages)*

🥉 *Tier 1: Basic Package (ዲጂታል ሜኑ እና አድራሻ)*
• _ዋጋ (Price):_ *18,000 – 25,000 ETB*
• _የሚካተቱ ነገሮች (Included):_ Landing Page (One-page website), Google Maps አድራሻ፣ የስራ ሰዓት፣ Static Digital Menu (የጁስ/ምግብ ዝርዝር በጽሑፍ/ፎቶ)፣ Mobile Responsive UX፣ የማህበራዊ ሚዲያ (TikTok, Telegram) ማገናኛ。
• _የማይካተቱ (Not Included):_ CMS Admin Panel, Table reservation, Domain & Hosting.

🥈 *Tier 2: Standard Package (Growth)*
• _ዋጋ (Price):_ *35,000 – 55,000 ETB*
• _የሚካተቱ ነገሮች (Included):_ Multi-page website (Home, Menu, About Us, Contact), Dynamic Menu (ዋጋና ፎቶ መቀየር የሚቻልበት የአድሚን ፓናል/CMS), Table Reservation System, SEO Setup (Google search index), Review/Feedback form.
• _የማይካተቱ (Not Included):_ API integrations (Chapa/Telebirr), Delivery driver panel, Domain & Hosting (requires extra fee).

🥇 *Tier 3: Advanced/Premium (Online System)*
• _ዋጋ (Price):_ *75,000 – 120,000+ ETB*
• _የሚካተቱ ነገሮች (Included):_ Online Ordering System, Telebirr/Chapa/CBE Birr API integration, Multi-location support, Admin Dashboard for kitchen/riders, Advanced SEO & Analytics.
• _የማይካተቱ (Not Included):_ Domain & Hosting.

⚠️ *ተጨማሪ ክፍያዎች (Optional Add-Ons):*
• *Domain & Hosting:* 5,000 – 10,000 ETB (ዓመታዊ ክፍያ)
• *Photography/Videography:* 10,000 – 15,000 ETB (ለጁስ/ምግብ ፎቶዎች ጥራት)
• *Maintenance (ጥገና):* ከ 3-6 ወር ነጻ ድጋፍ በኋላ ዓመታዊ የጥገና ክፍያ`;

    const inlineKeyboard = {
        inline_keyboard: [
            [{ text: "💬 Order Website (ማዘዝ እፈልጋለሁ)", callback_data: "order_website" }]
        ]
    };

    await telegramApi("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: inlineKeyboard
    });
};

const sendBotPackages = async (chatId) => {
    const text = `🤖 *የቴሌግራም ቦት ፓኬጆችና ዋጋ (Telegram Bot Packages)*

🥉 *Tier 1: Basic Auto-Reply/FAQ Bot*
• _ዋጋ (Price):_ *15,000 – 25,000 ETB*
• _የሚካተቱ ነገሮች (Included):_ FAQ logic trees, auto-replies, contact details, user database collection.
• _የማይካተቱ (Not Included):_ Product catalog, shopping cart, inline search.

🥈 *Tier 2: E-Commerce Store Bot*
• _ዋጋ (Price):_ *35,000 – 60,000 ETB*
• _የሚካተቱ ነገሮች (Included):_ Shopping Cart, Product catalog, Chapa/Telebirr QR checkout, auto invoice generation, admin inventory management table.
• _የማይካተቱ (Not Included):_ Custom API database synchronization.

🥇 *Tier 3: Advanced CRM Bot*
• _ዋጋ (Price):_ *50,000 – 90,000+ ETB*
• _የሚካተቱ ነገሮች (Included):_ Advanced databases sync, customer segmentation CRM, staff management panel, automatic broadcasts.`;

    const inlineKeyboard = {
        inline_keyboard: [
            [{ text: "💬 Order Bot (ማዘዝ እፈልጋለሁ)", callback_data: "order_bot" }]
        ]
    };

    await telegramApi("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: inlineKeyboard
    });
};

const sendAppPackages = async (chatId) => {
    const text = `📱 *የሞባይል መተግበሪያዎች ዋጋ (Mobile App Tiers - Flutter)*

🥈 *Tier 1: Basic Mobile App (Catalog)*
• _ዋጋ (Price):_ *60,000 – 90,000 ETB*
• _የሚካተቱ ነገሮች (Included):_ Core catalog view, contact forms, social accounts links, push notifications.
• _የማይካተቱ (Not Included):_ Real-time backend sync, live maps integration.

🥇 *Tier 2: Advanced Platform (Backend CMS)*
• _ዋጋ (Price):_ *100,000 – 250,000+ ETB*
• _የሚካተቱ ነገሮች (Included):_ Cross-Platform Flutter App (iOS + Android), Dynamic backend CMS database, live courier tracking (Google Maps Integration), local API checkouts.`;

    const inlineKeyboard = {
        inline_keyboard: [
            [{ text: "💬 Order App (ማዘዝ እፈልጋለሁ)", callback_data: "order_app" }]
        ]
    };

    await telegramApi("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: inlineKeyboard
    });
};

const sendPitchTip = async (chatId) => {
    const text = `💡 *ለካፌ/ሬስቶራንት ባለቤቶች ስታስረዳ ልታጎላው የሚገባ ነጥብ (Pitch Tip)*

"አብዛኛው ሰው ካፌ ወይም ጁስ ቤት ከመሄዱ በፊት ቲክቶክ ወይም ኢንስታግራም ላይ አይቶ ነው። ነገር ግን ዌብሳይት ሲኖራችሁ ደንበኛው በቀጥታ ሜኑ ማየት፣ ዋጋ ማወዳደር እና መምጣት ይችላል።

በተለይ ሜኑ በ *𝗤🇷 𝗖𝗼𝗱𝗲* ጠረጴዛ ላይ በማስቀመጥ የህትመት ወጪን ማስቀረት ትችላላችሁ።"`;

    await telegramApi("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: replyKeyboard
    });
};

const initiateOrder = async (chatId, type) => {
    userStates[chatId] = { state: "awaiting_lead_details", type: type };
    
    const text = `📝 *የፕሮጀክት ማዘዣ ፎርም (Request Details)*

እባክዎ **ስምዎትን**፣ **የስልክ ቁጥርዎትን** እና መስራት የሚፈልጉትን **የስራ ዓይነት መግለጫ** በጽሑፍ እዚህ ይላኩልን። የልማት ቡድናችን መረጃውን ተመልክቶ በ 2 ሰዓት ውስጥ በስልክ ያገኝዎታል።

_Please type and send your *Name*, *Phone Number*, and a brief *Project Description* in a single message below:_`;

    const inlineKeyboard = {
        inline_keyboard: [
            [{ text: "❌ Cancel Request (አውጣ)", callback_data: "cancel_order" }]
        ]
    };

    await telegramApi("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: inlineKeyboard
    });
};

const handleCallbackQuery = async (query) => {
    const callbackData = query.data;
    const chatId = query.message.chat.id;
    const queryId = query.id;

    await telegramApi("answerCallbackQuery", { callback_query_id: queryId });

    if (callbackData.startsWith("order_")) {
        const type = callbackData.replace("order_", "");
        await initiateOrder(chatId, type);
    } 
    else if (callbackData === "cancel_order") {
        userStates[chatId] = null;
        await telegramApi("sendMessage", {
            chat_id: chatId,
            text: "❌ Request cancelled. What would you like to build? Select an option below:",
            reply_markup: replyKeyboard
        });
    }
};

const handleMessage = async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text || '';
    const firstName = msg.chat.first_name || 'there';

    if (text.startsWith("/start")) {
        userStates[chatId] = null;
        await sendWelcomeMessage(chatId, firstName);
        return;
    }

    // Check Persistent buttons
    if (text === "💻 Website Packages") {
        await sendWebsitePackages(chatId);
        return;
    }
    if (text === "🤖 Bot Packages") {
        await sendBotPackages(chatId);
        return;
    }
    if (text === "📱 Mobile App Packages") {
        await sendAppPackages(chatId);
        return;
    }
    if (text === "💡 Pitch Tip (ጠቃሚ ምክር)") {
        await sendPitchTip(chatId);
        return;
    }
    if (text === "📞 Request Consultation") {
        await initiateOrder(chatId, "general");
        return;
    }

    // Handle lead capture state
    const userState = userStates[chatId];
    if (userState && userState.state === "awaiting_lead_details") {
        userStates[chatId] = null;

        await telegramApi("sendMessage", {
            chat_id: chatId,
            text: `✅ *መረጃዎ በተሳካ ሁኔታ ተልኳል!*\n\nእናመሰግናለን! የልማት ቡድናችን ትዕዛዝዎን ተመልክቶ በ 2 ሰዓት ውስጥ በስልክ ያገኝዎታል።\n\n*Request Dispatched!* Our lead developer will contact you shortly.`,
            parse_mode: 'Markdown',
            reply_markup: replyKeyboard
        });

        // Forward to admins
        const adminMsg = `📬 *New Concierge Bot Lead!*\n\n👤 *Client*: ${firstName} (@${msg.from.username || 'None'})\n📂 *Category*: ${userState.type.toUpperCase()}\n📝 *Request*: ${text}`;
        for (const adminId of adminChatIds) {
            if (adminId) {
                await telegramApi("sendMessage", {
                    chat_id: adminId,
                    text: adminMsg,
                    parse_mode: 'Markdown'
                });
            }
        }
    } else {
        await telegramApi("sendMessage", {
            chat_id: chatId,
            text: `እባክዎ ከታች ያሉትን አዝራሮች በመጫን ምላሽ ያግኙ (Please select an option from the menu buttons below):`,
            reply_markup: replyKeyboard
        });
    }
};

// Polling Loop
let offset = 0;
const poll = async () => {
    const updatesRes = await telegramApi("getUpdates", { offset: offset, timeout: 30 });
    if (updatesRes.ok && updatesRes.result && updatesRes.result.length > 0) {
        for (const update of updatesRes.result) {
            offset = update.update_id + 1;
            if (update.message) {
                await handleMessage(update.message);
            } else if (update.callback_query) {
                await handleCallbackQuery(update.callback_query);
            }
        }
    }
    setTimeout(poll, 100);
};

poll();
