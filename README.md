# KYPHER TECH SOLUTIONS — WhatsApp Bot

A WhatsApp bot built with [Baileys](https://github.com/WhiskeySockets/Baileys) for customer support (FAQ auto-replies) and personal automation (reminders, notes).

## Deploying on Render (free tier + keep-alive trick)

Render's free tier only supports **Web Services** (not background workers),
and it spins down after 15 minutes of no incoming web traffic. This project
includes a small built-in web server (`server.js`) so Render sees it as a
valid web service, and shows the WhatsApp QR code on a web page instead of
a terminal (since Render has no visible terminal).

**Steps:**

1. **Put the code on GitHub** (Render deploys from a Git repo):
   - Create a free GitHub account if you don't have one.
   - Create a new repository, upload this project's files to it
     (drag-and-drop works in GitHub's web UI — no Git command line needed).
   - Do NOT upload the `auth_info` or `node_modules` folders (`.gitignore`
     already excludes them).

2. **Create the Render service:**
   - Sign up at [render.com](https://render.com) (free, works from your phone browser).
   - Click **New → Web Service**.
   - Connect your GitHub repo.
   - Settings:
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free
   - Click **Create Web Service**. Render will build and start it.

3. **Scan the QR code:**
   - Once deployed, Render gives you a URL like `https://your-bot.onrender.com`.
   - Open that URL in your browser — you'll see the QR code there.
   - Scan it with WhatsApp: **Settings → Linked Devices → Link a Device**.
   - The page will update to "connected" once linked.

4. **Keep it awake (the free trick):**
   - Sign up at [UptimeRobot](https://uptimerobot.com) (free).
   - Add a new monitor: **HTTP(s)**, paste your Render URL, check interval
     **5 minutes**.
   - This pings your bot regularly so Render doesn't spin it down from
     inactivity.

**Reality check on this approach:** Render's free tier can still restart
the service periodically regardless of pings (deploys, platform maintenance,
etc.). Baileys usually reconnects automatically using the saved session in
`auth_info` — but that folder lives on Render's disk and can be wiped on
redeploys/restarts on the free tier, which would force you to rescan the QR
code. Treat this as good for testing and light use; if you need rock-solid
uptime for customer support, an always-on paid instance or a small VPS
avoids this entirely.

## Setup (run on your own PC or VPS — NOT in this sandbox)

1. Install [Node.js](https://nodejs.org) v18 or newer.
2. Download/copy this project folder to your machine.
3. Open a terminal in the project folder and run:
   ```
   npm install
   ```
4. Start the bot:
   ```
   npm start
   ```
5. A QR code will appear in your terminal. Open WhatsApp on your phone →
   **Settings → Linked Devices → Link a Device** → scan the QR code.
6. Once connected, you'll see `✅ KYPHER TECH SOLUTIONS bot is connected to WhatsApp!`

Your session is saved in the `auth_info/` folder, so you won't need to
scan the QR code again unless you log out or delete that folder.

## How it works

- **Customer FAQ auto-replies**: edit `config/faq.js` to add/change keywords
  and answers. No coding needed — just edit the text.
- **Personal automation commands** (send these to the bot yourself):
  - `!remind 30m Call the supplier` — set a reminder
  - `!note Buy more domain credits` — save a note
  - `!notes` — list saved notes
  - `!clearnotes` — delete all notes
  - `!help` — show all commands

## Keeping it running 24/7

Running `npm start` in a terminal only works while your PC is on and the
terminal stays open. For real customer support, you'll want to either:
- Keep a dedicated PC always on, or
- Deploy to a cheap VPS (Hetzner, Contabo, DigitalOcean — ~$4-6/month) or
  Railway/Render, and run it with a process manager like `pm2` so it
  restarts automatically if it crashes.

## Notes on WhatsApp's rules

This uses an unofficial library (Baileys), not the official WhatsApp
Business API. It works well for small-scale personal/small-business use,
but sending too many messages too fast, or to numbers that haven't
messaged you first, can get the number banned. Keep replies reasonable
and avoid mass/unsolicited messaging.
