// Edit this file to update auto-reply answers for KYPHER TECH SOLUTIONS.
// Each entry: keywords (any match triggers the reply) -> reply text.
// Matching is case-insensitive and checks if the message CONTAINS the keyword.

module.exports = [
  {
    keywords: ['hours', 'open', 'opening time', 'when are you open'],
    reply: 'KYPHER TECH SOLUTIONS is open Monday–Saturday, 9am–6pm. We\'ll get back to you outside those hours as soon as we can!',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much'],
    reply: 'Thanks for asking about pricing! Could you tell us which service you\'re interested in so we can give you an accurate quote?',
  },
  {
    keywords: ['contact', 'phone number', 'reach you'],
    reply: 'You can reach KYPHER TECH SOLUTIONS right here on WhatsApp, or call 0658004446.',
  },
  {
    keywords: ['services', 'what do you offer', 'what do you do'],
    reply: 'KYPHER TECH SOLUTIONS offers web development, automation, and tech support. Let us know what you need and we\'ll point you in the right direction!',
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    reply: 'Hey! 👋 Welcome to KYPHER TECH SOLUTIONS. How can we help you today?',
  },
];
