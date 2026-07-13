export const brand = {
  name: "Bawany Enterprises",
  shortName: "Bawany",
  tagline: "Pakistan's Trusted Name in Mobile Phone Distribution",
  purpose:
    "Pakistan's official importer and distributor of mobile phones, bringing authentic, PTA approved devices to customers who deserve better than grey market risks.",
  vision:
    "To become Pakistan's most trusted name in mobile phone distribution, known not just for the brands we carry, but for the integrity behind every transaction.",
  mission:
    "To bring authentic, fully approved mobile technology to every corner of Pakistan, through honest business practices, transparent processes, and a distribution network people can genuinely trust.",
  positioning:
    "We are not here to compete with grey market sellers. We are here to give people a reason to stop trusting them.",
  heroHeadline: "Pakistan's Trusted Name in Mobile Phone Distribution",
  heroSubhead:
    "Bawany Enterprises is Pakistan's official importer and distributor of mobile phones, bringing authentic, PTA approved devices to customers who deserve better than grey market risks.",
  heroCta: "Explore Our Brands",
  heroOverlayQuote: "Authentic. PTA approved. Properly documented.",
  contactCtaHeadline: "Get In Touch",
  contactCtaBody:
    "Looking for a phone you can actually trust? Reach out to Bawany Enterprises and experience what proper distribution looks like.",
  contactCtaButton: "Contact Us",
  contact: {
    email: "info@bawanyenterprises.com",
    phone: "+92-300-0000000",
    address: "Karachi, Pakistan",
  },
  social: {
    linkedin: "#",
    instagram: "#",
  },
} as const;

/** Two operating divisions */
export const divisions = [
  {
    id: "bawany-mobiles",
    name: "Bawany Mobiles",
    shortLabel: "Bawany Mobiles",
    tag: "OFFICIAL DISTRIBUTOR",
    description:
      "The official distributor of Infinix in Pakistan. Every device passes through legal import channels, complete documentation, and full PTA registration. What you get is a phone that works properly, and a warranty that actually means something.",
    features: [
      "Official Infinix Distributor",
      "Legal Import Channels",
      "Full PTA Registration",
      "Genuine Warranty Support",
    ],
    image: "/assets/verticals/mobile.webp",
  },
  {
    id: "intro-technology",
    name: "Intro Technology",
    shortLabel: "Intro Technology",
    tag: "DISTRIBUTION NETWORK",
    description:
      "Our second division, built to widen our reach across Pakistan's retail and distribution network. Intro Technology works closely with partners across the country to keep supply steady, transparent, and reliable.",
    features: [
      "Nationwide Retail Reach",
      "Partner Network Support",
      "Steady Supply Chains",
      "Transparent Distribution",
    ],
    image: "/assets/verticals/tech.webp",
  },
] as const;

/** @deprecated use divisions — kept as alias for gradual migration */
export const verticals = divisions;

export const trustReasons = [
  {
    title: "Authentic Imports Only",
    description:
      "Every phone comes through proper legal channels, no smuggled stock, no shortcuts.",
  },
  {
    title: "PTA Approved, Always",
    description:
      "Full registration means your phone works without restrictions, right from day one.",
  },
  {
    title: "Real Warranty Support",
    description: "Genuine after-sales service and support you can actually count on.",
  },
  {
    title: "Nationwide Presence",
    description: "A distribution network that reaches major cities across Pakistan.",
  },
] as const;

export const aboutPage = {
  headline: "Built on Trust. Driven by Authenticity.",
  intro: [
    "Bawany Enterprises stands as Pakistan's official importer and distributor of mobile phones. For years, we have worked to bring genuine technology into people's hands, the right way, through the right channels, with nothing hidden and nothing compromised.",
    "Our operations run through two divisions, Bawany Mobiles, the official distributor of Infinix in Pakistan, and Intro Technology, which strengthens our reach across the country's retail landscape. Together, these two divisions reflect what we stand for: honest business, proper process, and products people can rely on.",
    "In a market crowded with grey market imports and unauthorized sellers, we chose a harder path. We chose to do things properly. And that decision has shaped everything we do.",
  ],
  mission: {
    title: "Our Mission",
    body: "To bring authentic, fully approved mobile technology to every corner of Pakistan, through honest business practices, transparent processes, and a distribution network people can genuinely trust. We exist to prove that doing business the right way is not just possible, it is better, for customers, for retailers, and for the industry as a whole.",
  },
  vision: {
    title: "Our Vision",
    body: 'To become Pakistan\'s most trusted name in mobile phone distribution, known not just for the brands we carry, but for the integrity behind every transaction. We see a future where grey market phones are no longer the default choice, where customers know exactly what they are buying, and where "official distributor" is not just a label, but a promise that is kept every single time.',
  },
  differentiators: [
    {
      title: "Legal Imports, Always",
      description:
        "No grey market shortcuts. Every device we distribute follows proper import procedures from start to finish.",
    },
    {
      title: "Full PTA Compliance",
      description:
        "Every phone is registered and approved, so customers never face restrictions or surprises.",
    },
    {
      title: "Genuine Accountability",
      description:
        "When something needs support, we stand behind it. Real service, real warranty, real people.",
    },
    {
      title: "Years of Industry Experience",
      description:
        "Our understanding of Pakistan's mobile market runs deep, built through consistent, dependable work.",
    },
  ],
} as const;

export const whoWeAre = {
  label: "Who We Are",
  paragraphs: [
    "We are Bawany Enterprises, the official importer and distributor of mobile phones in Pakistan. Our work runs through two strong divisions, Bawany Mobiles and Intro Technology, both built on one simple promise: every phone we bring into this country is genuine, properly documented, and fully approved by PTA.",
    "We are not here to compete with grey market sellers. We are here to give people a reason to stop trusting them.",
  ],
} as const;

export const values = trustReasons;
