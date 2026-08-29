const faqList = require('../config/faq');

/**
 * Checks incoming text against the FAQ list.
 * Returns a reply string if a match is found, otherwise null.
 */
function matchFaq(text) {
  const lower = text.toLowerCase();

  for (const entry of faqList) {
    const isMatch = entry.keywords.some((keyword) =>
      lower.includes(keyword.toLowerCase())
    );
    if (isMatch) {
      return entry.reply;
    }
  }

  return null;
}

module.exports = { matchFaq };
