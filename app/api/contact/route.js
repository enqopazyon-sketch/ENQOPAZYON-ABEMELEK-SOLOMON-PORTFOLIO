import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { name, phone, telegram, message: clientMessage } = await request.json();
        
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        
        if (!botToken || !chatId) {
            console.error('Server Configuration Error: Telegram keys are missing.');
            return NextResponse.json({ 
                success: false, 
                error: 'Telegram bot credentials are missing on the server.' 
            }, { status: 500 });
        }
        
        let message = `📬 *New Lead from Portfolio!*\n\n👤 *Name*: ${name}\n📞 *Phone*: ${phone}\n✈️ *Telegram*: @${telegram.replace('@', '')}`;
        if (clientMessage) {
            message += `\n📝 *Message*: ${clientMessage}`;
        }
        
        // Support multiple chat IDs separated by commas
        const chatIds = chatId.split(',').map(id => id.trim());
        
        const sendPromises = chatIds.map(async (id) => {
            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: id,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });
                return await response.json();
            } catch (err) {
                return { ok: false, description: err.message };
            }
        });
        
        const results = await Promise.all(sendPromises);
        const successfulCount = results.filter(r => r.ok).length;
        
        if (successfulCount === 0) {
            console.error('Telegram API error (all failed):', results);
            return NextResponse.json({ 
                success: false, 
                error: results[0].description || 'Failed to dispatch to Telegram.' 
            }, { status: 500 });
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Internal Server Error' 
        }, { status: 500 });
    }
}
