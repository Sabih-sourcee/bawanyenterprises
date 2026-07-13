import { divisions, trustReasons } from "./brand";

export const heroPhrases = [
  "Mobile Distribution",
  "Official Imports",
  "PTA Approved",
  "Genuine Warranty",
];

export const heroTickerItems = [
  "Official Importer",
  "PTA Approved Devices",
  "Bawany Mobiles",
  "Intro Technology",
  "Infinix Pakistan",
  "Genuine Warranty",
  "Nationwide Distribution",
  "Authentic Imports",
];

export const partnerLogos = [
  { name: "Infinix", src: "/assets/partners/infinix.svg" },
  { name: "Samsung", src: "/assets/partners/samsung.svg" },
  { name: "Xiaomi", src: "/assets/partners/xiaomi.svg" },
  { name: "Oppo", src: "/assets/partners/oppo.svg" },
  { name: "Vivo", src: "/assets/partners/vivo.svg" },
  { name: "Realme", src: "/assets/partners/realme.svg" },
  { name: "Tecno", src: "/assets/partners/tecno.svg" },
];

/** Divisions shown as service-style cards */
export const serviceTabs = divisions.map((d) => ({
  id: d.id,
  label: d.shortLabel,
  title: d.name,
  headline: d.description,
  links: d.features as unknown as string[],
}));

export const trustItems = trustReasons;

export const buzzStats = [
  {
    id: "stat-1",
    value: "100",
    suffix: "%",
    label: "PTA approved devices. Full registration, zero restrictions.",
    variant: "accent" as const,
    span: "col-span-1 row-span-1",
  },
  {
    id: "stat-2",
    value: "",
    suffix: "",
    label: "Legal import channels only. No grey market. No shortcuts.",
    variant: "light" as const,
    span: "col-span-1 row-span-1",
  },
  {
    id: "stat-3",
    value: "Zero",
    suffix: "",
    label: "smuggled stock. Every phone properly documented.",
    variant: "light" as const,
    span: "col-span-1 row-span-1",
  },
  {
    id: "stat-4",
    value: "2",
    suffix: "",
    label: "strong divisions — Bawany Mobiles and Intro Technology — one promise of authenticity.",
    variant: "light" as const,
    span: "col-span-2 row-span-1",
    large: true,
  },
  {
    id: "stat-5",
    value: "Nation",
    suffix: "-wide",
    label: "distribution reach across Pakistan's major cities.",
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

export const highlightStats = buzzStats;

export const testimonials = [
  {
    quote:
      "With Bawany, every handset is PTA approved and properly documented. Our customers finally stopped worrying about grey market risks.",
    author: "Ahmed Raza",
    role: "Retail Partner — Karachi",
  },
  {
    quote:
      "Official Infinix supply through Bawany Mobiles changed our shelves. Steady stock, real warranty, and a team that stands behind every device.",
    author: "Usman Ali",
    role: "Dealer — Punjab Region",
  },
  {
    quote:
      "Intro Technology keeps our retail network supplied without the usual chaos. Transparent process, reliable deliveries.",
    author: "Sana Malik",
    role: "Retail Chain Manager",
  },
  {
    quote:
      "We switched from informal channels to Bawany and never looked back. Genuine phones, genuine support.",
    author: "Faisal Khan",
    role: "Mobile Retailer — Lahore",
  },
  {
    quote:
      "PTA registration from day one means fewer complaints and happier customers. That alone is worth the partnership.",
    author: "Zain Sheikh",
    role: "Distributor — Sindh",
  },
  {
    quote:
      "Bawany treats dealer relationships like partnerships, not transactions. Pricing stays honest even when the market doesn't.",
    author: "Brand Manager",
    role: "Consumer Electronics",
  },
  {
    quote:
      "Warranty claims that actually get resolved. After years of grey market headaches, that feels revolutionary.",
    author: "Category Lead",
    role: "National Retail",
  },
  {
    quote:
      "Official importer status isn't just a label with Bawany — you see it in the paperwork, the process, and the after-sales.",
    author: "Procurement Head",
    role: "Enterprise Retail Group",
  },
  {
    quote:
      "Our customers ask for PTA approved devices. Bawany is how we deliver that promise every time.",
    author: "Store Owner",
    role: "Islamabad",
  },
];

export const formInterests = [
  "Bawany Mobiles / Infinix",
  "Intro Technology Partnership",
  "Dealer / Retail Inquiry",
  "Corporate Procurement",
  "Warranty & After-Sales",
];

export const formBudgets = [
  "Dealer / Retail Partnership",
  "Bulk / Corporate Order",
  "General Inquiry",
];

export const formSources = [
  "Google",
  "Referral",
  "Social Media",
  "Retail Partner",
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
  { title: "Home", href: "#home", page: "home" as const },
  { title: "About", href: "#about", page: "about" as const },
  { title: "Divisions", href: "#divisions-section", page: "home" as const },
  { title: "Contact", href: "#contact-form-section", page: "home" as const },
];

export const footerLinks = {
  divisions: divisions.map((d) => ({ label: d.name, href: "#divisions-section" })),
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Divisions", href: "#divisions-section" },
    { label: "Contact Us", href: "#contact-form-section" },
  ],
  connect: [
    { label: "Dealer Inquiry", href: "#contact-form-section" },
    { label: "Corporate Sales", href: "#contact-form-section" },
    { label: "Privacy Policy", href: "#" },
  ],
};

/** Selected Work — mobile distribution case studies */
export const workItems = [
  {
    id: "infinix-launch",
    tags: ["INFINIX", "OFFICIAL", "LAUNCH"],
    title: "Official Infinix Distribution Rollout",
    client: "Bawany Mobiles — Nationwide",
    metric: "PTA Approved Supply",
    image: "/assets/work/infinix.webp",
    hoverImage: "/assets/work/hover.jpeg",
    layout: "wide" as const,
  },
  {
    id: "dealer-network",
    tags: ["RETAIL", "DEALERS", "B2B"],
    title: "Nationwide Dealer Network Expansion",
    client: "Intro Technology Partners",
    metric: "Major Cities Covered",
    image: "/assets/work/nationwide.jpeg",
    hoverImage: "/assets/work/nationwide-hover.jpeg",
    layout: "half" as const,
  },
  {
    id: "pta-compliance",
    tags: ["PTA", "COMPLIANCE", "IMPORTS"],
    title: "Full PTA Registration Pipeline",
    client: "Legal Import Channels",
    metric: "100% Approved Stock",
    image: "/assets/work/warehouse.jpeg",
    hoverImage: "/assets/work/warehouse-hover.jpeg",
    layout: "half" as const,
  },
  {
    id: "warranty-support",
    tags: ["WARRANTY", "SUPPORT", "SERVICE"],
    title: "Genuine After-Sales Support Network",
    client: "Customer Care Operations",
    metric: "Real Warranty Coverage",
    image: "/assets/work/led-retrofit.webp",
    layout: "half" as const,
  },
  {
    id: "retail-supply",
    tags: ["SUPPLY", "RETAIL", "LOGISTICS"],
    title: "Steady Retail Supply Program",
    client: "Intro Technology — Distribution",
    metric: "Transparent Logistics",
    image: "/assets/work/commercial-solar.webp",
    layout: "half" as const,
  },
];
