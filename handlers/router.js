const { matchFaq } = require('./faq');
const { handlePersonalCommand } = require('./personal');

/**
 * Central router for incoming messages.
 * Personal commands (prefixed with "!") take priority, then FAQ matching.
 * Returns a reply string, or null if nothing matched (bot stays silent).
 */
function routeMessage(text, jid, sendMessage) {
  if (!text) return null;

  if (text.trim().startsWith('!')) {
    return handlePersonalCommand(text, jid, sendMessage);
  }

  return matchFaq(text);
}

module.exports = { routeMessage };
