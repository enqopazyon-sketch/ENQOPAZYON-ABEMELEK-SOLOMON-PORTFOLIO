document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. CYBERPRELOADER INITIALIZATION
  // ==========================================
  const preloader = document.getElementById("cyber-preloader");
  const appContainer = document.getElementById("app-container");
  const preloaderFill = document.getElementById("preloader-fill");
  const preloaderText = document.getElementById("preloader-text");
  const preloaderPct = document.getElementById("preloader-pct");

  const loaderPhrases = [
    "Initializing secure chat socket...",
    "Decrypting Telegram API handshake keys...",
    "Mapping keyboard grids and menus...",
    "Injecting package price matrix database...",
    "Bot online! Dispatching welcome message..."
  ];

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 2;
    if (progress > 100) progress = 100;

    preloaderFill.style.width = `${progress}%`;
    preloaderPct.innerText = `${progress}%`;
    preloaderText.innerText = loaderPhrases[Math.min(4, Math.floor(progress / 22))];

    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transform = "scale(1.05)";
        appContainer.style.display = "grid";
        setTimeout(() => {
          appContainer.style.opacity = "1";
          appContainer.style.transform = "scale(1)";
          preloader.style.display = "none";
          // Trigger first bot welcome message!
          triggerBotWelcome();
        }, 300);
      }, 500);
    }
  }, 70);

  // ==========================================
  // 2. CHAT STATE & DYNAMIC DATA SETS
  // ==========================================
  const chatMessages = document.getElementById("chat-messages-container");
  const typingIndicator = document.getElementById("typing-indicator");
  const replyKeyboard = document.getElementById("reply-keyboard");
  const chatInput = document.getElementById("chat-text-input");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const webhookLogs = document.getElementById("webhook-logs");

  let botState = "menu"; // "menu", "custom_order"
  let currentSelectionType = ""; // "website", "bot", "mobile"

  // Sound Synth Helper
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, audioCtx.currentTime); // standard telegram message sound alert
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // browser blocks audio contexts without click
    }
  };

  // Log events in the Webhook Console
  const logWebhookEvent = (eventType, data) => {
    const placeholder = webhookLogs.querySelector(".console-placeholder");
    if (placeholder) placeholder.style.display = "none";

    const timestamp = new Date().toISOString();
    const logCard = document.createElement("div");
    logCard.className = "console-entry";
    logCard.innerHTML = `
      <span class="timestamp">[${timestamp.substring(11, 19)}]</span> 
      <span class="event-type">[${eventType}]</span>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    webhookLogs.appendChild(logCard);
    webhookLogs.scrollTop = webhookLogs.scrollHeight;
  };

  // Scroll to bottom helper
  const scrollToBottom = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Render Bot Typing indicator
  const showTyping = (show) => {
    typingIndicator.style.display = show ? "flex" : "none";
    scrollToBottom();
  };

  // Render text helper (simulates basic markdown for bot bubbles)
  const formatMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--tg-accent); text-decoration: underline;">$1</a>')
      .replace(/\n/g, "<br/>");
  };

  // Append Chat Message bubble to stream
  const appendMessage = (sender, text) => {
    const row = document.createElement("div");
    row.className = `msg-row ${sender}`;
    
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    row.innerHTML = `
      <div class="msg-bubble">
        ${formatMarkdown(text)}
        <span class="msg-time">${timeStr}</span>
      </div>
    `;
    
    chatMessages.appendChild(row);
    scrollToBottom();
    if (sender === "bot") playBeep();
  };

  // ==========================================
  // 3. KEYBOARD BUTTONS CONFIG
  // ==========================================
  const renderKeyboard = (buttons) => {
    replyKeyboard.innerHTML = "";
    buttons.forEach(btnText => {
      const btn = document.createElement("button");
      btn.className = "kbd-btn";
      btn.innerText = btnText;
      btn.addEventListener("click", () => handleKeyboardClick(btnText));
      replyKeyboard.appendChild(btn);
    });
  };

  // ==========================================
  // 4. INTERACTIVE CONCIERGE FLOWS
  // ==========================================

  // Menu Options Keyboard Configs
  const menuButtons = [
    "💻 Website Packages & Prices",
    "🤖 Custom Bot Packages",
    "📱 Mobile App Packages",
    "📞 Request Custom Consultation",
    "💬 Chat on Real Telegram"
  ];

  const websiteMenuButtons = [
    "📦 Optional Add-Ons",
    "💬 Order Website Now",
    "🔙 Back to Main Menu"
  ];

  const botMenuButtons = [
    "💬 Order Bot Now",
    "🔙 Back to Main Menu"
  ];

  const appMenuButtons = [
    "💬 Order Mobile App Now",
    "🔙 Back to Main Menu"
  ];

  // Welcome Bot bubble trigger
  const triggerBotWelcome = () => {
    showTyping(true);
    setTimeout(() => {
      showTyping(false);
      appendMessage("bot", "👋 **Welcome to ENQOPAZYON {dev} Concierge!**\n\nI am your automated assistant to help you request premium websites, custom Telegram bots, and responsive mobile applications directly from our development team.\n\nSelect an option below to browse packages or request a custom project:");
      renderKeyboard(menuButtons);
      
      logWebhookEvent("BOT_SESSION_INIT", { status: "ready", timestamp: new Date().toISOString() });
    }, 1200);
  };

  // Keyboard Click Router
  const handleKeyboardClick = (text) => {
    // Render Client bubble immediately
    appendMessage("user", text);
    logWebhookEvent("BUTTON_CLICK", { text: text });

    // Show typing, wait 1s, trigger bot response
    showTyping(true);
    setTimeout(() => {
      showTyping(false);
      
      switch (text) {
        case "🔙 Back to Main Menu":
          appendMessage("bot", "What would you like to build? Select an option below:");
          renderKeyboard(menuButtons);
          botState = "menu";
          break;

        case "💬 Chat on Real Telegram":
          appendMessage("bot", "Redirecting you to our official Telegram bot [**@enqopazyondevbot**](https://t.me/enqopazyondevbot). Please send your messages there! 🚀");
          setTimeout(() => {
            window.open("https://t.me/enqopazyondevbot", "_blank");
          }, 1500);
          renderKeyboard(menuButtons);
          break;

        case "💻 Website Packages & Prices":
          appendMessage("bot", "🖥️ **Website Development Packages**\n\n" +
            "🥉 **Tier 1: Basic Package (ዲጂታል ሜኑ እና አድራሻ)**\n" +
            "• *Price:* **18,000 – 25,000 ETB**\n" +
            "• *Features:* Landing page (one-page), Google Maps location, static digital food/juice menu, mobile responsive UX, social media links.\n\n" +
            "🥈 **Tier 2: Standard Package (Growth)**\n" +
            "• *Price:* **35,000 – 55,000 ETB**\n" +
            "• *Features:* Multi-page web, Dynamic CMS Admin panel (edit prices/photos easily), Simple table reservation form, Basic SEO setups, Client review forum.\n\n" +
            "🥇 **Tier 3: Advanced/Premium (Online System)**\n" +
            "• *Price:* **75,000 – 120,000+ ETB**\n" +
            "• *Features:* Full online ordering systems, Local payment gateway integrations (Chapa, Telebirr, CBE Birr API), Multi-location supports, Kitchen tracking dashboard, advanced SEO.");
          renderKeyboard(websiteMenuButtons);
          currentSelectionType = "website";
          break;

        case "📦 Optional Add-Ons":
          appendMessage("bot", "➕ **Optional Add-On Services (Extra Fees)**\n\n" +
            "🌐 **Domain & Hosting (Annual):** 5,000 – 10,000 ETB (annual package).\n" +
            "📸 **Professional Photography/Videography:** 10,000 – 15,000 ETB (vital for premium food/juice presentation).\n" +
            "🔧 **Annual Maintenance:** Fixed monthly/annual retainer options for continuous updates after free support period.");
          renderKeyboard(["🔙 Back to Website Menu", "💬 Order Website Now"]);
          break;

        case "🔙 Back to Website Menu":
          appendMessage("bot", "Select an option from the website development package menu:");
          renderKeyboard(websiteMenuButtons);
          break;

        case "🤖 Custom Bot Packages":
          appendMessage("bot", "🤖 **Custom Telegram Bot Packages**\n\n" +
            "🥉 **Tier 1: Basic Auto-Reply/FAQ Bot**\n" +
            "• *Price:* **15,000 – 25,000 ETB**\n" +
            "• *Features:* FAQ logic tree, automated response keywords, welcome media cards, customer contact collect.\n\n" +
            "🥈 **Tier 2: E-Commerce Store Bot**\n" +
            "• *Price:* **35,000 – 60,000 ETB**\n" +
            "• *Features:* Integrated product catalog, shopping cart system, Telebirr/Chapa QR payment, automated receipts.\n\n" +
            "🥇 **Tier 3: Custom Database CRM Bot**\n" +
            "• *Price:* **50,000 – 90,000+ ETB**\n" +
            "• *Features:* Real-time database integrations, staff manager dispatcher, customer segmentation CRM.");
          renderKeyboard(botMenuButtons);
          currentSelectionType = "bot";
          break;

        case "📱 Mobile App Packages":
          appendMessage("bot", "📱 **Mobile App Tiers (Flutter iOS/Android)**\n\n" +
            "🥈 **Tier 1: Basic App (Local Catalog/Info)**\n" +
            "• *Price:* **60,000 – 90,000 ETB**\n" +
            "• *Features:* Core catalog browsing, responsive layout, contact submit, basic pushes.\n\n" +
            "🥇 **Tier 2: Advanced Platform (Full API Backend)**\n" +
            "• *Price:* **100,000 – 250,000+ ETB**\n" +
            "• *Features:* Cross-platform (iOS + Android), dynamic backend CMS portal, live courier tracks (Google Maps), online checkout wallets.");
          renderKeyboard(appMenuButtons);
          currentSelectionType = "mobile";
          break;

        case "💬 Order Website Now":
        case "💬 Order Bot Now":
        case "💬 Order Mobile App Now":
        case "📞 Request Custom Consultation":
          appendMessage("bot", "📝 **Start Project Request**\n\nPlease enter your **Name**, **Phone Number**, and a brief description of what you want to build. (Type and send in the input bar below!)");
          botState = "custom_order";
          
          // Toggle input controls
          chatInput.disabled = false;
          chatSendBtn.disabled = false;
          chatInput.placeholder = "e.g. Aron Hailu, 0911223344, website for clinic...";
          chatInput.focus();
          
          // Clear keyboard options
          replyKeyboard.innerHTML = "";
          break;

        default:
          appendMessage("bot", "I didn't catch that. Please select an option from the menu.");
          renderKeyboard(menuButtons);
          break;
      }

    }, 1000);
  };

  // ==========================================
  // 5. TEXT INPUT LEAD CAPTURE HANDLER
  // ==========================================
  const handleTextInputSubmit = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    // Render User message
    appendMessage("user", text);
    chatInput.value = "";
    
    // Disable inputs
    chatInput.disabled = true;
    chatSendBtn.disabled = true;
    chatInput.placeholder = "Message input locked.";

    // Show Typing
    showTyping(true);
    setTimeout(() => {
      showTyping(false);
      appendMessage("bot", "✅ **Ticket Dispatched Successfully!**\n\nThank you! Our lead developer will review your request and contact you immediately within 2 hours.\n\nA notification payload has been pushed to our webhook server.");
      renderKeyboard(["🔙 Back to Main Menu"]);
      botState = "menu";

      // Log webhook ticket
      logWebhookEvent("CONCIERGE_LEAD_TICKET", {
        client_request: text,
        selected_type: currentSelectionType || "general",
        timestamp: new Date().toISOString(),
        routing: "telegram_webhook_concierge_main"
      });
    }, 1500);
  };

  chatSendBtn.addEventListener("click", handleTextInputSubmit);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleTextInputSubmit();
  });

});
