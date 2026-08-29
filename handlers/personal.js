const fs = require('fs');
const path = require('path');

const NOTES_FILE = path.join(__dirname, '..', 'notes.json');

function loadNotes() {
  if (!fs.existsSync(NOTES_FILE)) return [];
  return JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
}

function saveNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

/**
 * Parses "10m", "2h", "1d" style durations into milliseconds.
 */
function parseDuration(str) {
  const match = str.match(/^(\d+)(m|h|d)$/i);
  if (!match) return null;
  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  const multipliers = { m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };
  return value * multipliers[unit];
}

/**
 * Handles personal commands. Returns a reply string if handled, otherwise null.
 * `sendMessage(jid, text)` is used to deliver delayed reminders.
 */
function handlePersonalCommand(text, jid, sendMessage) {
  const trimmed = text.trim();

  // !remind <duration> <message>  e.g. "!remind 30m call the supplier"
  if (trimmed.toLowerCase().startsWith('!remind')) {
    const parts = trimmed.split(' ');
    const duration = parseDuration(parts[1] || '');
    const message = parts.slice(2).join(' ');

    if (!duration || !message) {
      return 'Usage: !remind <time> <message>\nExample: !remind 30m Call the supplier\n(time units: m = minutes, h = hours, d = days)';
    }

    setTimeout(() => {
      sendMessage(jid, `⏰ Reminder: ${message}`);
    }, duration);

    return `Got it! I'll remind you in ${parts[1]}: "${message}"`;
  }

  // !note <text>  e.g. "!note buy more domain credits"
  if (trimmed.toLowerCase().startsWith('!note ')) {
    const noteText = trimmed.slice(6).trim();
    const notes = loadNotes();
    notes.push({ text: noteText, date: new Date().toISOString() });
    saveNotes(notes);
    return `Saved note #${notes.length}: "${noteText}"`;
  }

  // !notes  -> list saved notes
  if (trimmed.toLowerCase() === '!notes') {
    const notes = loadNotes();
    if (notes.length === 0) return 'No notes saved yet. Use "!note <text>" to add one.';
    return notes
      .map((n, i) => `${i + 1}. ${n.text} (${new Date(n.date).toLocaleString()})`)
      .join('\n');
  }

  // !clearnotes -> wipe all notes
  if (trimmed.toLowerCase() === '!clearnotes') {
    saveNotes([]);
    return 'All notes cleared.';
  }

  // !help -> list commands
  if (trimmed.toLowerCase() === '!help') {
    return [
      '*KYPHER TECH SOLUTIONS Bot Commands*',
      '!remind <time> <message> — set a reminder (e.g. !remind 30m Call supplier)',
      '!note <text> — save a note',
      '!notes — list saved notes',
      '!clearnotes — delete all notes',
      '!help — show this message',
    ].join('\n');
  }

  return null;
}

module.exports = { handlePersonalCommand };
