const express = require('express');
const qrcode = require('qrcode');

let latestQR = null;
let connectionStatus = 'starting';

function setQR(qr) {
  latestQR = qr;
  connectionStatus = 'qr-ready';
}

function setConnected() {
  latestQR = null;
  connectionStatus = 'connected';
}

function setStatus(status) {
  connectionStatus = status;
}

function startServer(port) {
  const app = express();

  // Render (and UptimeRobot) will ping this to keep the service awake
  app.get('/', async (req, res) => {
    if (connectionStatus === 'connected') {
      return res.send('<h2>✅ KYPHER TECH SOLUTIONS bot is connected and running.</h2>');
    }

    if (connectionStatus === 'qr-ready' && latestQR) {
      const qrImage = await qrcode.toDataURL(latestQR);
      return res.send(`
        <html>
          <body style="text-align:center; font-family: sans-serif;">
            <h2>Scan this QR code with WhatsApp</h2>
            <p>Settings → Linked Devices → Link a Device</p>
            <img src="${qrImage}" />
            <p>Page refreshes every 10s until connected.</p>
            <script>setTimeout(() => location.reload(), 10000)</script>
          </body>
        </html>
      `);
    }

    res.send(`<h3>Bot status: ${connectionStatus}... refreshing</h3><script>setTimeout(() => location.reload(), 5000)</script>`);
  });

  app.listen(port, () => console.log(`🌐 Keep-alive server running on port ${port}`));
}

module.exports = { startServer, setQR, setConnected, setStatus };
