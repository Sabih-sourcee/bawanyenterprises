export const brand = {
  name: "Bawany Enterprises",
  shortName: "Bawany",
  tagline: "Powering Connectivity, Sustaining Progress.",
  pillars: ["Smart Design", "Honest Pricing", "Long-Lasting Performance"],
  purpose:
    "To bridge the gap between world-class technology and everyday utility by equipping businesses and homes with the energy, lighting, and connectivity tools they need to thrive.",
  vision:
    "To become one of Pakistan's most trusted, multi-disciplinary distribution and technology conglomerates, recognized for setting benchmark standards in product longevity, distribution reach, and customer partnerships.",
  mission:
    "We source, distribute, and implement high-performance technology and energy solutions. By focusing on honest pricing, smart engineering, and dependable post-sale relationships, we ensure every product we deliver adds measurable value to our clients' ecosystems.",
  positioning:
    "For commercial enterprises, retailers, and modern consumers across Pakistan seeking reliable infrastructure and technology, Bawany Enterprises is the premier distribution and solutions partner that delivers future-ready energy, illumination, and mobile connectivity backed by uncompromising durability and honest value.",
  heroHeadlineLead: "Leading Full-Service",
  heroOverlayQuote:
    "A narrative etched with decades of shaping industries across Pakistan.",
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

export const verticals = [
  {
    id: "energy",
    name: "Energy Solutions",
    shortLabel: "Energy Solutions",
    tag: "ENERGY SOLUTIONS",
    description:
      "Solar energy systems and lithium battery storage for residential and commercial use — future-ready resilience against grid volatility.",
    features: [
      "Residential Solar Systems",
      "Commercial Solar Arrays",
      "Lithium Battery Storage",
      "Grid-Independent Power",
    ],
    stat: { label: "MW INSTALLED", value: "25+" },
    image: "/assets/verticals/energy.webp",
  },
  {
    id: "mobile",
    name: "Mobile Distribution",
    shortLabel: "Mobile Distribution",
    tag: "MOBILE DISTRIBUTION",
    description:
      "Nationwide distribution network connecting global mobile manufacturers to local retail markets with robust supply chain reliability.",
    features: [
      "Nationwide Dealer Network",
      "Leading Brand Partnerships",
      "Supply Chain Logistics",
      "Retail Channel Support",
    ],
    stat: { label: "DEALER PARTNERS", value: "500+" },
    image: "/assets/verticals/mobile.webp",
  },
  {
    id: "lighting",
    name: "Lighting Solutions",
    shortLabel: "Lighting Solutions",
    tag: "LIGHTING SOLUTIONS",
    description:
      "Commercial and residential energy-saving LED illumination — high-efficiency brightness that reduces operational footprints.",
    features: [
      "Commercial LED Systems",
      "Residential Illumination",
      "Energy-Efficient Retrofits",
      "Industrial Lighting",
    ],
    stat: { label: "LUMENS DELIVERED", value: "10M+" },
    image: "/assets/verticals/lighting.webp",
  },
  {
    id: "tech",
    name: "Tech Accessories",
    shortLabel: "Tech Accessories",
    tag: "TECH ACCESSORIES",
    description:
      "Chargers, audio devices, and everyday performance hardware engineered for daily wear and tear at accessible price points.",
    features: [
      "Fast-Charging Solutions",
      "Audio & Peripherals",
      "Durability-Tested Hardware",
      "Retail-Ready Packaging",
    ],
    stat: { label: "SKUs DISTRIBUTED", value: "200+" },
    image: "/assets/verticals/tech.webp",
  },
] as const;

export const values = [
  {
    title: "Reliability & Longevity",
    description: "Products curated for endurance — from solar arrays to charging cables.",
  },
  {
    title: "Integrity in Pricing",
    description: "Honest pricing structures delivering maximum ROI for B2B and consumers.",
  },
  {
    title: "Agile Innovation",
    description: "Staying ahead of technological curves in energy, mobile, and accessories.",
  },
  {
    title: "Relationship-Centric Growth",
    description: "Distribution networks built on long-term trust and mutual scaling.",
  },
] as const;
