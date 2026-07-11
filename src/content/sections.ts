import { verticals } from "./brand";

export const heroPhrases = verticals.map((v) => v.shortLabel);

export const heroTickerItems = [
  ...verticals.map((v) => v.name),
  "Solar & Storage Systems",
  "Nationwide Distribution",
  "Commercial LED",
  "Performance Accessories",
  "Dealer Network",
  "Enterprise Solutions",
];

export const partnerLogos = [
  { name: "Samsung", src: "/assets/partners/samsung.svg" },
  { name: "Xiaomi", src: "/assets/partners/xiaomi.svg" },
  { name: "Oppo", src: "/assets/partners/oppo.svg" },
  { name: "Vivo", src: "/assets/partners/vivo.svg" },
  { name: "Realme", src: "/assets/partners/realme.svg" },
  { name: "Infinix", src: "/assets/partners/infinix.svg" },
  { name: "Tecno", src: "/assets/partners/tecno.svg" },
  { name: "Haier", src: "/assets/partners/haier.svg" },
];

export const workItems = [
  {
    id: "commercial-solar",
    tags: ["SOLAR", "COMMERCIAL", "STORAGE"],
    title: "Commercial Solar & Storage Deployment",
    client: "Samad Group of Industries",
    metric: "500 kW Installed Capacity",
    image: "/assets/work/commercial-solar.webp",
    layout: "wide" as const,
  },
  {
    id: "dealer-network",
    tags: ["MOBILE", "DISTRIBUTION", "B2B"],
    title: "Nationwide Mobile Dealer Network",
    client: "Retail Channel Expansion",
    metric: "120+ Cities Covered",
    image: "/assets/work/dealer-network.webp",
    layout: "half" as const,
  },
  {
    id: "led-retrofit",
    tags: ["LED", "COMMERCIAL", "EFFICIENCY"],
    title: "Commercial LED Retrofit Program",
    client: "Corporate Campus — Karachi",
    metric: "40% Energy Reduction",
    image: "/assets/work/led-retrofit.webp",
    layout: "half" as const,
  },
  {
    id: "accessories-line",
    tags: ["ACCESSORIES", "RETAIL", "DURABILITY"],
    title: "Performance Accessories Product Line",
    client: "Retail Distribution Launch",
    metric: "200+ SKUs Nationwide",
    image: "/assets/work/accessories-line.webp",
    layout: "half" as const,
  },
  {
    id: "residential-solar",
    tags: ["SOLAR", "RESIDENTIAL", "STORAGE"],
    title: "Residential Solar & Lithium Storage",
    client: "Housing Society — Lahore",
    metric: "300+ Homes Energized",
    image: "/assets/work/residential-solar.webp",
    layout: "half" as const,
  },
];

export const serviceTabs = [
  ...verticals.map((v) => ({
    id: v.id,
    label: v.name.replace(" Solutions", "").replace(" Distribution", ""),
    title: v.name,
    headline: `We deliver ${v.name.toLowerCase()} built for longevity.`,
    links: [
      ...v.features,
      "Enterprise Procurement",
      "Technical Support",
    ] as string[],
  })),
  {
    id: "logistics",
    label: "Logistics",
    title: "Distribution & Logistics",
    headline: "We move products across Pakistan with supply chains built for scale.",
    links: [
      "Nationwide Logistics",
      "Dealer Onboarding",
      "Warehouse Management",
      "Retail Channel Support",
      "After-Sales Service",
      "Inventory Planning",
    ] as string[],
  },
];

export const buzzStats = [
  {
    id: "stat-1",
    value: "240",
    suffix: "%",
    label: "lead gen spike within partner networks. Actual math, not fluff.",
    variant: "accent" as const,
    span: "col-span-1 row-span-1",
  },
  {
    id: "stat-2",
    value: "",
    suffix: "",
    label: "custom-built supply chains. From warehouse to retail shelf. No cookie-cutter distribution.",
    variant: "light" as const,
    span: "col-span-1 row-span-1",
  },
  {
    id: "stat-3",
    value: "Zero",
    suffix: "",
    label: "disposable solutions. Every product curated for endurance.",
    variant: "light" as const,
    span: "col-span-1 row-span-1",
  },
  {
    id: "stat-4",
    value: "4",
    suffix: "X",
    label: "more distribution reach. When infrastructure works, partners scale.",
    variant: "light" as const,
    span: "col-span-2 row-span-1",
    large: true,
  },
  {
    id: "stat-5",
    value: "94",
    suffix: "%",
    label: "of B2B partners stick around. Results earn repeat business.",
    variant: "accent" as const,
    span: "col-span-1 row-span-1",
    large: true,
  },
  {
    id: "stat-6",
    value: "",
    suffix: "",
    label: "",
    variant: "dark" as const,
    span: "col-span-1 row-span-1",
    icon: "heart" as const,
  },
];

export const stats = [
  { id: "stat-kw", target: 2500, suffix: "+", label: "SOLAR CAPACITY INSTALLED" },
  { id: "stat-dealers", target: 500, suffix: "+", label: "DEALER PARTNERS NATIONWIDE" },
  { id: "stat-retention", target: 94, suffix: "%", label: "B2B PARTNER RETENTION RATE" },
  { id: "stat-years", target: 15, suffix: "+", label: "YEARS OF DISTRIBUTION EXCELLENCE" },
];

export const highlightStats = buzzStats;

export const testimonials = [
  {
    quote:
      "Bawany's supply chain reliability transformed our retail operations. Consistent inventory, honest pricing, and a team that understands dealer economics.",
    author: "Ahmed Raza",
    role: "Regional Dealer — Mobile Division",
  },
  {
    quote:
      "The commercial solar installation exceeded our ROI projections. Grid-independent power with lithium storage gave us operational resilience we needed.",
    author: "Sana Malik",
    role: "Operations Director — Manufacturing",
  },
  {
    quote:
      "Their LED retrofit program cut our facility energy costs by 40%. Long-lasting products, transparent pricing, and dependable post-sale support.",
    author: "Faisal Khan",
    role: "Facilities Manager — Corporate Campus",
  },
  {
    quote:
      "We've partnered with Bawany for mobile distribution across three provinces. Their logistics network and brand relationships are unmatched.",
    author: "Usman Ali",
    role: "CEO — Retail Chain",
  },
  {
    quote:
      "Hiring Bawany was straightforward. We stopped evaluating other distributors halfway through the first call.",
    author: "Head of Procurement",
    role: "Enterprise Retail Group",
  },
  {
    quote:
      "Within two weeks, the difference was obvious. Our inventory moved faster, margins improved, and we stopped fighting supply gaps.",
    author: "Brand Manager",
    role: "Consumer Electronics",
  },
  {
    quote:
      "Their team handled our entire lighting procurement — spec, supply, and install — without a single delay. That kind of coordination is rare.",
    author: "Project Lead",
    role: "Commercial Real Estate Developer",
  },
  {
    quote:
      "Bawany treats dealer relationships like partnerships, not transactions. Pricing stays honest even when the market doesn't.",
    author: "Zain Sheikh",
    role: "Distributor — Punjab Region",
  },
  {
    quote:
      "The accessories line outsold every competing brand on our shelves within a quarter. Durability sells itself when the supply is consistent.",
    author: "Category Manager",
    role: "National Retail Chain",
  },
];

export const formInterests = verticals.map((v) => v.name);

export const formBudgets = [
  "Under PKR 500,000",
  "PKR 500,000 – 2,000,000",
  "PKR 2,000,000+",
];

export const formSources = [
  "Google",
  "Referral",
  "LinkedIn",
  "Trade Event",
  "Existing Partner",
  "Other",
];

export const locations = [
  {
    city: "Karachi",
    address: "Bawany Enterprises, Karachi, Pakistan",
    phone: "+92-300-0000000",
    email: "info@bawanyenterprises.com",
  },
  {
    city: "Lahore",
    address: "Distribution Hub, Lahore, Pakistan",
    phone: "+92-300-0000001",
    email: "lahore@bawanyenterprises.com",
  },
  {
    city: "Islamabad",
    address: "Corporate Office, Islamabad, Pakistan",
    phone: "+92-300-0000002",
    email: "islamabad@bawanyenterprises.com",
  },
];

export const navLinks = [
  { title: "About", href: "#about-section" },
  { title: "Partners", href: "#partners-marquee-section" },
  { title: "Work", href: "#portfolio" },
  { title: "Contact", href: "#contact-form-section" },
];

export const footerLinks = {
  verticals: verticals.map((v) => ({ label: v.name, href: "#services-section" })),
  company: [
    { label: "About Us", href: "#about-section" },
    { label: "Our Work", href: "#portfolio" },
    { label: "Partner With Us", href: "#contact-form-section" },
  ],
  connect: [
    { label: "Dealer Inquiry", href: "#contact-form-section" },
    { label: "Corporate Sales", href: "#contact-form-section" },
    { label: "Privacy Policy", href: "#" },
  ],
};
