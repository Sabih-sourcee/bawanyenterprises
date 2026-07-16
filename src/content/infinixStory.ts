export const infinixStoryPage = {
  label: "Infinix × Bawany",
  brand: {
    eyebrow: "The Brand",
    headline: "Infinix — built for the next generation.",
    body: [
      "Infinix is a global tech brand known for smartphones, tablets, power banks, and everyday accessories — bold design, long battery life, and features people actually use. Since 2015, Bawany Enterprises has been Pakistan's first official distributor — bringing every product through legal channels, fully PTA approved where it applies.",
      "Not a reseller. Not a middleman. The original partner — still standing behind authentic supply, warranty, and after-sales support across the country.",
    ],
    points: [
      { label: "Since", value: "2015" },
      { label: "Status", value: "1st Official Distributor" },
      { label: "Devices", value: "100% Authentic Supply" },
    ],
  },
  productsLabel: "Products",
  productsHeadline: "Smartphones, power, tablets, and more.",
  products: [
    {
      id: "smartphones",
      category: "Smartphones",
      name: "Phones for every day",
      description:
        "From Hot to Note and GT — Infinix smartphones with long battery life, strong cameras, and designs people reach for. Genuine devices, PTA approved, backed by real warranty.",
      image: "/assets/infinix/smartphone-hero.jpg",
      tag: "MOBILE",
    },
    {
      id: "tablets",
      category: "Tablets",
      name: "Screens that keep up",
      description:
        "Infinix tablets for work, study, and entertainment — portable displays with the same reliability we bring to every handset.",
      image: "/assets/infinix/tablet.jpg",
      tag: "TABLET",
    },
    {
      id: "power-banks",
      category: "Power Banks",
      name: "Power that travels",
      description:
        "Portable charging that matches how people live — high capacity, fast output, and builds you can trust on the go.",
      image: "/assets/infinix/powerbank.jpg",
      tag: "POWER",
    },
    {
      id: "accessories",
      category: "Accessories",
      name: "Chargers, cables & more",
      description:
        "The essentials that complete the kit — chargers, cables, and accessories designed to work with Infinix devices.",
      image: "/assets/infinix/charger.jpg",
      tag: "ACCESSORIES",
    },
    {
      id: "audio",
      category: "Audio",
      name: "Wireless sound",
      description:
        "Earbuds and audio gear from the Infinix ecosystem — everyday listening with the same authenticity standard.",
      image: "/assets/infinix/earbuds.jpg",
      tag: "AUDIO",
    },
    {
      id: "support",
      category: "Care & Warranty",
      name: "After-sales that answer",
      description:
        "Official warranty and support through Bawany's network — documentation and service that stay with the product.",
      image: "/assets/infinix/support.jpg",
      tag: "SUPPORT",
    },
  ],
  cta: {
    headline: "Ready to stock Infinix?",
    body: "Dealers and retailers across Pakistan trust Bawany for authentic Infinix smartphones, tablets, power banks, and accessories.",
    button: "Become a Partner",
  },
} as const;
