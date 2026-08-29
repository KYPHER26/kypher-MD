const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const { routeMessage } = require('./handlers/router');
const { startServer, setQR, setConnected, setStatus } = require('./server');

// Render sets PORT automatically. Fallback to 3000 for local testing.
const PORT = process.env.PORT || 3000;
startServer(PORT);

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: 'silent' }), // set to 'info' for verbose Baileys logs
    // No printQRInTerminal here — Render has no visible terminal.
    // The QR code is shown on the web page instead (see server.js).
  });

  // Persist login credentials whenever they update
  sock.ev.on('creds.update', saveCreds);

  // Handle connection status changes (QR code, reconnects, etc.)
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      setQR(qr);
      console.log('📷 New QR code ready — open the app URL in your browser to scan it.');
    }

    if (connection === 'close') {
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log('Connection closed. Reconnecting:', shouldReconnect);
      setStatus('reconnecting');
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      setConnected();
      console.log('✅ KYPHER TECH SOLUTIONS bot is connected to WhatsApp!');
    }
  });

  // Handle incoming messages
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;

      const jid = msg.key.remoteJid;
      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        '';

      if (!text) continue;

      console.log(`📩 Message from ${jid}: ${text}`);

      const reply = routeMessage(text, jid, (toJid, replyText) =>
        sock.sendMessage(toJid, { text: replyText })
      );

      if (reply) {
        await sock.sendMessage(jid, { text: reply });
      }
    }
  });
}

startBot().catch((err) => console.error('Failed to start bot:', err));
