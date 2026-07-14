export const brand = {
  name: "Bawany Enterprises",
  shortName: "Bawany",
  tagline: "Since 1996, We've Never Cut Corners",
  purpose:
    "Bawany Enterprises has been part of Pakistan's mobile phone industry for almost thirty years, starting as a distributor in 1996 and growing into the company that brought Infinix to Pakistan for the first time in 2015.",
  vision:
    "To be the name people trust without a second thought, whether it's a phone, a solar panel, or whatever we build next.",
  mission:
    "To bring genuine, reliable products into every sector we touch — mobile technology, electric solutions, and renewable energy — through honest business and a supply chain people never have to question.",
  positioning: "Every business we've launched carries the same rule we started with in 1996: do it right, or don't do it at all.",
  heroHeadline: "Since 1996, We've Never Cut Corners",
  heroSubhead:
    "Bawany Enterprises has been part of Pakistan's mobile phone industry for almost thirty years, starting as a distributor in 1996 and growing into the company that brought Infinix to Pakistan for the first time in 2015. Every phone we sell is authentic, fully PTA approved, and backed by real support after the sale.",
  heroCta: "See How Far We've Come",
  heroOverlayQuote: "Do it properly, or don't do it.",
  contactCtaHeadline: "Let's Talk",
  contactCtaBody:
    "Got questions about our products or want to know more about what we do? Reach out, we're happy to help.",
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

/** Home — What We're Built On */
export const divisions = [
  {
    id: "bawany-mobile",
    name: "Bawany Mobile",
    shortLabel: "Bawany Mobile",
    tag: "SINCE 2005",
    description:
      "We launched Bawany Mobile in 2005 to grow into accessories, giving retailers and customers across the country another reason to trust our name.",
    features: [
      "Mobile Accessories",
      "Retail & Wholesale Trust",
      "Nationwide Reach",
      "Genuine Products",
    ],
    image: "/assets/verticals/mobile.webp",
  },
  {
    id: "infinix-story",
    name: "The Infinix Story",
    shortLabel: "Infinix",
    tag: "SINCE 2015",
    description:
      "In 2015, Bawany Enterprises became the first official distributor of Infinix in Pakistan. Not a reseller, not a middleman — the original distributor, and still one today.",
    features: [
      "First Official Distributor",
      "Original Partner",
      "Authentic Supply",
      "Real After-Sales Support",
    ],
    image: "/assets/verticals/tech.webp",
  },
  {
    id: "factor-led",
    name: "Factor LED",
    shortLabel: "Factor LED",
    tag: "SINCE 2018",
    description:
      "A manufacturer — not just a distributor — designing and producing residential, commercial, industrial, and architectural lighting from COB lights to street lighting.",
    features: [
      "LED Manufacturer",
      "Residential & Commercial",
      "Industrial Lighting",
      "Street Lighting",
    ],
    image: "/assets/verticals/led.webp",
  },
  {
    id: "factor-solar",
    name: "Factor Solar",
    shortLabel: "Factor Solar",
    tag: "SINCE 2022",
    description:
      "Importing and distributing solar panels, lithium batteries, and inverters — helping homes and businesses take control of their own power.",
    features: [
      "Solar Panels",
      "Lithium Batteries",
      "Inverters",
      "Energy Solutions",
    ],
    image: "/assets/verticals/solar.webp",
  },
  {
    id: "factor-institutional",
    name: "Factor Institutional",
    shortLabel: "Institutional",
    tag: "SINCE 2026",
    description:
      "Taking everything we've learned in lighting and energy and applying it at institutional scale — for partners who need the whole picture.",
    features: [
      "Institutional Projects",
      "Lighting & Energy",
      "Large-Scale Delivery",
      "End-to-End Partners",
    ],
    image: "/assets/verticals/led.webp",
  },
] as const;

export const verticals = divisions;

export const trustReasons = [
  {
    title: "Almost 30 Years in the Business",
    description:
      "We started in 1996, and we're still standing on the same principles.",
  },
  {
    title: "We Brought Infinix to Pakistan",
    description: "The first, the official, the one that started it all.",
  },
  {
    title: "Real Phones, Real Approval",
    description:
      "Every device is genuine and fully PTA registered, no exceptions.",
  },
  {
    title: "Still Growing, Same Values",
    description:
      "From phones to LED lighting to solar energy, the standard never drops.",
  },
] as const;

export const whoWeAre = {
  label: "Where It All Started",
  headline: "We didn't show up overnight.",
  paragraphs: [
    "Bawany Enterprises began in 1996 with mobile phone distribution, running through a network of retail and wholesale shops across Pakistan. That early groundwork is still the reason people trust us today.",
    "Then in 2015, we did something that changed everything for us — we became the first official distributor to bring Infinix into Pakistan. That one decision put us on the map, and we've spent every year since living up to it.",
  ],
} as const;

export const aboutPage = {
  label: "About Us",
  headline: "A Business That Grew the Slow, Honest Way",
  intro: [
    "Bawany Enterprises started in 1996 with one goal: distributing mobile phones the right way. No shortcuts, no grey market games. Just a retail and wholesale network built on trust, one customer at a time.",
    "That foundation carried us further than we expected. In 2005, we launched Bawany Mobile to step into accessories. Then came 2015, the year we became the first official distributor to bring Infinix into Pakistan — a milestone that changed the direction of our company for good.",
    "From there, we kept building. In 2018, we launched Factor Group, adding Login Smart Technology and stepping into the electric sector through Factor LED, working with LED lighting, PVC tapes, and circuit breakers. In 2022, we expanded again into energy, becoming importers and distributors of solar panels from Longi, Jinko, Canadian Solar, TW, and JA Solar, along with lithium batteries from EVE Energy, Vami, Everbest, and Lithium Valley, and Sungrow inverters. And in 2026, we launched Factor Institutional under Factor Group, taking on projects at an institutional scale.",
    "Every one of these steps came from the same place: do it properly, or don't do it.",
  ],
  timelineLabel: "How We Got Here",
  timeline: [
    {
      year: "1996",
      title: "Where We Began",
      body: "Mobile phone distribution, built on a network of retail and wholesale shops.",
    },
    {
      year: "2005",
      title: "Bawany Mobile",
      body: "Stepped into accessories, expanding what our name stood for.",
    },
    {
      year: "2015",
      title: "Infinix Comes to Pakistan",
      body: "Became the first official distributor of Infinix in the country.",
    },
    {
      year: "2018",
      title: "Factor Group Takes Shape",
      body: "Launched Login Smart Technology and Factor LED, entering the electric sector.",
    },
    {
      year: "2022",
      title: "Powering Into Energy",
      body: "Launched Factor Solar and started importing and distributing solar panels, lithium batteries, and inverters.",
    },
    {
      year: "2026",
      title: "Factor Institutional",
      body: "Extended our work into institutional scale projects under Factor Group.",
    },
  ],
  whyLabel: "Why We Do What We Do",
  mission: {
    title: "Our Mission",
    body: "To bring genuine, reliable products into every sector we touch — mobile technology, electric solutions, and renewable energy — through honest business and a supply chain people never have to question. We're not chasing fast growth. We're building something that lasts, the same way it has for almost three decades.",
  },
  vision: {
    title: "Our Vision",
    body: "To be the name people trust without a second thought, whether it's a phone, a solar panel, or whatever we build next. Every business we've launched carries the same rule we started with in 1996: do it right, or don't do it at all.",
  },
} as const;

export const groupPage = {
  label: "Our Group",
  headline: "One Family, Many Directions",
  intro: [
    "Bawany Enterprises is where our story started, but it's not where it stayed. Over the years, the same instinct that built our mobile distribution business — finding a real need and meeting it properly — led us into lighting, energy, and technology. Different products, same instinct.",
    "Here's where that instinct took us.",
  ],
  companies: [
    {
      id: "bawany-mobile",
      name: "Bawany Mobile",
      eyebrow: "It began with a phone in someone's hand",
      body: "Before Bawany Enterprises became a name people recognized, it was a small distribution operation trying to get genuine phones into genuine hands. Bawany Mobile grew out of that, and it's still the part of our story closest to where we started.",
      href: "https://bawanymobile.com",
      cta: "Visit Bawany Mobile",
      logo: "/assets/group-logos/bawany-mobile.png",
    },
    {
      id: "login-smart",
      name: "Login Smart Technology",
      eyebrow: "From one accessory to a whole ecosystem",
      body: "What started as a simple accessories line grew into something much larger. Today, Login Smart Technology builds smartwatches, wireless earbuds, headphones, speakers, power banks, chargers, and data storage — the everyday tech people actually reach for. It's less a product line now and more a lifestyle brand people follow for what's next.",
      href: "https://login.com.pk",
      cta: "Visit Login Smart Technology",
      logo: "/assets/group-logos/login-smart.png",
    },
    {
      id: "factor-led",
      name: "Factor LED",
      eyebrow: "When we decided light shouldn't be an afterthought",
      body: "At some point, we looked at how lighting was being sold in Pakistan and realized it deserved better. So Factor LED became a manufacturer, not just a distributor, designing and producing residential, commercial, industrial, and architectural lighting right here, from COB lights to street lighting.",
      href: "https://factorled.pk",
      cta: "Visit Factor LED",
      logo: "/assets/group-logos/factor-led.png",
    },
    {
      id: "factor-solar",
      name: "Factor Solar",
      eyebrow: "Betting on where energy was heading",
      body: "We saw where the country was moving — toward energy that doesn't run out — and got there early. Factor Solar now imports and distributes solar panels, lithium batteries, and inverters, helping homes and businesses take control of their own power.",
      href: "https://factorgroup.co",
      cta: "Visit Factor Group",
      logo: "/assets/group-logos/factor-solar.png",
    },
    {
      id: "factor-institutional",
      name: "Factor Institutional",
      eyebrow: "Thinking bigger than a single building",
      body: "Our newest chapter takes everything we've learned — in lighting, in energy, in doing things properly — and applies it at a larger scale, working with institutions on projects that need more than a single product. They need a partner who understands the whole picture.",
      href: "https://factorled.pk/institutional",
      cta: "Visit Factor Institutional",
      logo: "/assets/group-logos/factor-institutional.png",
    },
  ],
  closingLabel: "Still One Standard",
  closing:
    "Different names, different products, same rule we started with — do it right, or don't do it. Wherever you find us in this group, that's what you're getting.",
} as const;

export const values = trustReasons;
