// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Load from environment variables
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const THREAD_ID = process.env.TELEGRAM_THREAD_ID;

async function sendToTelegram(message: string) {
    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram credentials not configured');
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                message_thread_id: THREAD_ID,  // Add thread ID for forum topics
                text: message,
                parse_mode: 'HTML',
            }),
        });
    } catch (error) {
        console.error('Error sending to Telegram:', error);
    }
}

export async function middleware(request: NextRequest) {
    // Basic info
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const timestamp = new Date().toISOString();
    const path = request.nextUrl.pathname;
    const method = request.method;
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // CloudFlare specific info
    const country = request.headers.get('cf-ipcountry') || 'unknown';
    const city = request.headers.get('cf-ipcity') || 'unknown';
    const region = request.headers.get('cf-region') || 'unknown';
    const timezone = request.headers.get('cf-timezone') || 'unknown';
    const continent = request.headers.get('cf-continent') || 'unknown';
    const latitude = request.headers.get('cf-iplatitude') || 'unknown';
    const longitude = request.headers.get('cf-iplongitude') || 'unknown';
    const isBot = request.headers.get('cf-bot') === 'true' ? '🤖' : '👤';
    const device = request.headers.get('cf-device-type') || 'unknown';
    const browserFamily = request.headers.get('cf-client-browser-family') || 'unknown';
    const osFamily = request.headers.get('cf-client-os-family') || 'unknown';
    const asn = request.headers.get('cf-asn') || 'unknown';
    const isp = request.headers.get('cf-isp') || 'unknown';
    const tlsVersion = request.headers.get('cf-tls-version') || 'unknown';
    const requestId = request.headers.get('cf-ray') || 'unknown';

    const message = `
${isBot} <b>New Visit</b>

<b>Request Info:</b>
🆔 Request ID: <code>${requestId}</code>
🌐 IP: <code>${ip}</code>
🔗 Path: ${method} ${path}
⚙️ User Agent: ${userAgent}

<b>Location Info:</b>
🌍 Continent: ${continent}
🗺 Country: ${country}
🏙 City: ${city}
📍 Region: ${region}
🕒 Timezone: ${timezone}
📌 Coordinates: ${latitude}, ${longitude}

<b>Client Info:</b>
📱 Device: ${device}
🌐 Browser: ${browserFamily}
💻 OS: ${osFamily}

<b>Network Info:</b>
🔧 ASN: ${asn}
🏢 ISP: ${isp}
🔒 TLS Version: ${tlsVersion}

⏰ Timestamp: ${timestamp}
    `.trim();

    // Send to Telegram
    await sendToTelegram(message);

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};