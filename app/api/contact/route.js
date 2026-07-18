import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { name, phone, telegram } = await request.json();
        
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        
        if (!botToken || !chatId) {
            console.error('Server Configuration Error: Telegram keys are missing.');
            return NextResponse.json({ 
                success: false, 
                error: 'Telegram bot credentials are missing on the server.' 
            }, { status: 500 });
        }
        
        const message = `📬 *New Lead from Portfolio!*\n\n👤 *Name*: ${name}\n📞 *Phone*: ${phone}\n✈️ *Telegram*: @${telegram.replace('@', '')}`;
        
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        
        if (!response.ok || !data.ok) {
            console.error('Telegram API error:', data);
            return NextResponse.json({ 
                success: false, 
                error: data.description || 'Failed to dispatch to Telegram.' 
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
