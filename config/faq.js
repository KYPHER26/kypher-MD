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
    reply: 'KYPHER TECH SOLUTIONS offers web development, automation (like WhatsApp bots), and tech support/repairs. Let us know what you need and we\'ll point you in the right direction!',
  },
  {
    keywords: ['web dev', 'website', 'web design'],
    reply: 'We build websites and web apps tailored to your business — from simple portfolio sites to full custom platforms. Tell us a bit about what you need and we\'ll get you a quote.',
  },
  {
    keywords: ['automation', 'bot', 'whatsapp bot'],
    reply: 'We build automation tools and bots (like WhatsApp bots for customer support) to save you time. What would you like automated?',
  },
  {
    keywords: ['repair', 'fix my', 'tech support', 'not working', 'broken'],
    reply: 'We offer tech support and repair services. Tell us what device/issue you\'re having and we\'ll advise on the next step.',
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    reply: 'Hey! 👋 Welcome to KYPHER TECH SOLUTIONS. How can we help you today?',
  },
  {
    keywords: ['location', 'address', 'where are you', 'where is your office'],
    reply: 'KYPHER TECH SOLUTIONS is located in Tabora, Tanzania. Message us here for exact directions if you\'d like to visit.',
  },
  {
    keywords: ['payment', 'pay', 'mobile money', 'how do i pay'],
    reply: 'We accept mobile money via Tigo Pesa (YAS), account name: Zakaria Killenga. Send us your order details first and we\'ll confirm the amount before payment.',
  },
  {
    keywords: ['turnaround', 'how long', 'delivery time', 'when will it be ready'],
    reply: 'Turnaround time depends on the project — small jobs can take a few days, larger builds take longer. Tell us what you need and we\'ll give you an estimated timeline.',
  },
  {
    keywords: ['consultation', 'book a call', 'meeting', 'appointment'],
    reply: 'Happy to set up a consultation! Let us know a good day/time for you and we\'ll confirm.',
  },
  {
    keywords: ['warranty', 'guarantee', 'support after'],
    reply: 'We stand behind our work — if something isn\'t right after delivery, reach out here and we\'ll sort it out.',
  },
  {
    keywords: ['thank you', 'thanks', 'thx'],
    reply: 'You\'re welcome! Let us know if there\'s anything else we can help with. 🙏',
  },
];
