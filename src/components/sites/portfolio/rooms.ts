// The rooms behind the doors on the homepage, in door order, and the work shown in each.
// Screenshots live in public/sites/portfolio/work/: a tall strip of the site that scrolls on the device's screen.

export type Project = {
  /** Small label above the title, e.g. "Website build". */
  kind: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  /** Live site, shown as a "Visit live site" button. Without one, the card shows a short note instead, as on the source. */
  url?: string;
  /** The note shown when there is no link; defaults to "Screens from the app". */
  note?: string;
  /** Tall screenshot that scrolls on the monitor or phone screen. */
  shot: string;
  /** App icon shown beside the label (apps only). */
  icon?: string;
};

/** One print hanging on a brand's line. A deck is a carousel: it hangs as a little stack and opens slide by slide. */
export type Print = { f: string; w: number; h: number; dark?: boolean; title?: string; deck?: { f: string; w: number; h: number }[] };

/** A brand's own line in the Graphic Design room, in its own colours. */
export type World = {
  k: string;
  name: string;
  /** The softer second half of the name, e.g. "Living" in "Aranya Living". */
  em?: string;
  kicker: string;
  desc: string;
  tags: string[];
  bg: string;
  fg: string;
  acc: string;
  items: Print[];
};

export type RoomInfo = {
  slug: string;
  title: string;
  /** Used in the browser tab title. */
  seoTitle: string;
  colour: string;
  blurb: string;
  /** Desktop sites show on a monitor, apps on an iPhone, designs hang on a washing line. */
  device: "monitor" | "phone" | "line";
  projects: Project[];
  worlds?: World[];
  /** Shown while a room has no projects yet. */
  soon?: string;
};

const shot = (name: string) => `/sites/portfolio/work/${name}.webp`;
const gd = (name: string, w = 1080, h = 1350) => ({ f: `/sites/portfolio/gd/${name}.webp`, w, h });

const WORLDS: World[] = [
  {
    k: "aranya",
    name: "Aranya",
    em: "Living",
    kicker: "Social campaign · Real estate",
    desc: "A launch campaign for courtyard homes in Bengaluru: sun-baked arches, terracotta and olive, and editorial type that sells morning light rather than square feet.",
    tags: ["Art direction", "Instagram posts", "Illustration"],
    bg: "#2A2420",
    fg: "#F1E7D8",
    acc: "#D9925F",
    items: ["ar-1", "ar-2", "ar-3", "ar-4", "ar-5"].map((n) => gd(n)),
  },
  {
    k: "kaelum",
    name: "Kaelum",
    em: "Springs",
    kicker: "Social campaign · Premium water",
    desc: "A campaign for a Himalayan glacial water: icy light, a glass bottle beaded with cold, and quiet serif lines that make still water feel like luxury.",
    tags: ["Product illustration", "Instagram posts", "Brand voice"],
    bg: "#E6EDF2",
    fg: "#0D2235",
    acc: "#2E4A61",
    items: ["ke-1", "ke-2", "ke-3", "ke-4"].map((n) => gd(n)),
  },
  {
    k: "saanvi",
    name: "Saanvi",
    em: "Atelier",
    kicker: "Posts & stories · Fashion",
    desc: "Posts and stories for a handloom womenswear label: Bodoni editorial type, product callouts, a colour-of-the-season palette and shop-the-look stories.",
    tags: ["Fashion editorial", "Posts & stories", "Product callouts"],
    bg: "#D9BDB5",
    fg: "#2B2324",
    acc: "#6E4A4C",
    items: [gd("sa-1"), gd("sa-2"), gd("sa-3"), gd("sa-4", 1080, 1920), gd("sa-5", 1080, 1920)],
  },
  {
    k: "cortexa",
    name: "Cortexa",
    em: "AI",
    kicker: "Carousels · AI company",
    desc: "Swipe-through explainers for an AI company: how cameras read a crowd before it peaks, and what AI really does in a classroom. Click a stack to swipe through it.",
    tags: ["Carousels", "Information design", "Data viz"],
    bg: "#15122B",
    fg: "#EEEAF8",
    acc: "#D7FF3A",
    items: [
      { ...gd("cx-a1"), title: "How AI reads a crowd", deck: ["cx-a1", "cx-a2", "cx-a3", "cx-a4", "cx-a5"].map((n) => gd(n)) },
      { ...gd("cx-b1"), title: "AI in the classroom", deck: ["cx-b1", "cx-b2", "cx-b3", "cx-b4"].map((n) => gd(n)) },
      { ...gd("cx-a3"), title: "How AI reads a crowd · 3" },
      { ...gd("cx-b3"), title: "AI in the classroom · 3" },
    ],
  },
  {
    k: "posters",
    name: "Posters & logos",
    kicker: "Events · Identity",
    desc: "Posters for a college fest, a music night and a 24-hour hackathon, and logo marks for every brand on these lines, from bold type-led launches to quiet identities.",
    tags: ["Event posters", "Logo design", "Typography"],
    bg: "#1A1818",
    fg: "#E8E4E0",
    acc: "#C4B0B0",
    items: [
      gd("po-spectrum", 1000, 1414),
      gd("po-midnight", 1000, 1414),
      gd("po-hack"),
      ...["lg-aranya", "lg-kaelum", "lg-saanvi", "lg-cortexa", "lg-brew"].map((n) => ({ ...gd(n, 1000, 1000), dark: true })),
    ],
  },
];

export const ROOMS: RoomInfo[] = [
  {
    slug: "web-developer",
    title: "Web Development",
    seoTitle: "Freelance Web Developer",
    colour: "#22304a",
    device: "monitor",
    blurb:
      "Websites, landing pages and product launches, built end to end: from layout and motion to responsive front-end and launch.",
    projects: [
      {
        kind: "Website build · Live",
        title: "Lay's Crunch Lab",
        sub: "Snack brand launch site",
        desc: "A bold launch site for a crisps brand: a loader that seasons the chips, a 3D bag that turns as you scroll and chapters on what keeps every chip whole.",
        tags: ["3D product", "Scroll story", "Motion"],
        url: "https://guru-lays-site.vercel.app",
        shot: shot("web-lays"),
      },
      {
        kind: "Website build · Live",
        title: "Cherry Kiss",
        sub: "Lipstick sale · campaign site",
        desc: "A Black Friday campaign for a lipstick range: 3D shades spin on a pedestal, a shade picker steps through the collection and the price drops right in the hero.",
        tags: ["3D product", "E-commerce", "Campaign"],
        url: "https://guru-lipstick-ad-site.vercel.app",
        shot: shot("web-lipstick"),
      },
      {
        kind: "Website build · Live",
        title: "Navis Luxury Cruises",
        sub: "Cruise line · booking website",
        desc: "A cinematic site for a cruise line: video skies over the open sea, the ship's engineering told in chapters and a clear path to book a voyage.",
        tags: ["Video hero", "Booking flow", "Storytelling"],
        url: "https://guru-voyage-booking.vercel.app",
        shot: shot("web-voyage"),
      },
      {
        kind: "Website build · Live",
        title: "Movade",
        sub: "Travel agency · website",
        desc: "A fresh travel agency site: a misty rainforest hero, a search panel for location, dates and guests, and destinations that open up as you scroll.",
        tags: ["Landing page", "Search UI", "Responsive build"],
        url: "https://movade-travel.vercel.app",
        shot: shot("web-movade"),
      },
      {
        kind: "Website build · Live",
        title: "Écorce Parfums",
        sub: "Perfume house · campaign site",
        desc: "Ten extraits distilled from bark, resin and skin: a press-and-hold intro sprays the scent, then 3D bottles turn around a fragrance wheel as you scroll through the collection.",
        tags: ["3D product", "Editorial type", "Interactive intro"],
        url: "https://guru-perfume-ad-site.vercel.app",
        shot: shot("web-perfume"),
      },
    ],
  },
  {
    slug: "app-developer",
    title: "App Development",
    seoTitle: "Freelance App Developer",
    colour: "#4a3540",
    device: "phone",
    blurb:
      "Web apps and AI tools, designed and built end to end: from the first screen to the small interactions that make an app feel good in your hand.",
    projects: [
      {
        kind: "Web app · AI",
        title: "MindLab AI",
        sub: "Source-grounded research and study",
        desc: "Upload your documents and ask questions with clickable citations, then turn everything into study guides, flashcards, quizzes, mind maps and podcast-style audio overviews.",
        tags: ["AI", "Citations", "Study tools"],
        shot: shot("app-mindlab"),
        icon: shot("icon-mindlab"),
      },
      {
        kind: "Web app · AI",
        title: "Campus Foodie Bot",
        sub: "AI food guide for Saveetha campus · Streamlit",
        desc: "An AI guide to the best food on campus, powered by Google Gemini: ask what to eat, where to find it and what's good today, and get answers in a friendly chat.",
        tags: ["Gemini AI", "Python", "Streamlit"],
        shot: shot("app-chatbot"),
        icon: shot("icon-chatbot"),
      },
      {
        kind: "Web app · Food & drink",
        title: "Kaapi Kadai",
        sub: "Filter-coffee house · since 1983",
        desc: "A retro app for a Mylapore filter-coffee house: a 3D brass davara-tumbler on a sunburst, Tamil and English lettering, and an account to log in and order.",
        tags: ["3D", "Accounts & login", "Retro brand look"],
        shot: shot("app-kaapi"),
        icon: shot("icon-kaapi"),
      },
      {
        kind: "Web app · AI productivity",
        title: "PlanAI",
        sub: "AI personal planner",
        desc: "Describe a goal in plain English, like an exam in 18 days, and it builds a day-by-day plan around the hours you're free, with a dashboard, study streak and auto-rescheduling for missed sessions. Uses Gemini, or a built-in planner with no key.",
        tags: ["Gemini AI", "Planning", "JavaScript"],
        shot: shot("app-planai"),
        icon: shot("icon-planai"),
      },
      {
        kind: "AI agents · Automation",
        title: "Develop Team",
        sub: "Multi-agent software dev team",
        desc: "Give it a feature request and a team of AI agents (product manager, architect, developer and tester) writes the spec, design, code and tests, with a supervisor looping fixes until it passes. Built in Flowise and n8n, with a live web console.",
        tags: ["Multi-agent AI", "n8n & Flowise", "Supabase"],
        shot: shot("app-devteam"),
        icon: shot("icon-devteam"),
      },
      {
        kind: "AI agent · Investigation",
        title: "AI Fraud Investigation",
        sub: "Built on the open-source Surelock Homes",
        desc: "Pick a ZIP code and the agent checks licensed childcare providers against public records, comparing licensed capacity with the building's size, Street View and business listings, and flags anomalies for further review.",
        tags: ["AI agent", "Public data", "Python"],
        shot: shot("app-fraud"),
        icon: shot("icon-fraud"),
      },
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Design",
    seoTitle: "Freelance UI/UX Designer",
    colour: "#7a8670",
    device: "monitor",
    blurb:
      "Interfaces designed for impact: immersive product pages, 3D showcases and visual stories, from concept to a polished, working build.",
    projects: [
      {
        kind: "Product showcase · Live",
        title: "Thar",
        sub: "Off-roader launch · ad website",
        desc: "A launch page for an off-roader, built like an ad: \"Born for the impossible\" in bold type, then the Thar Roxx pulled out from under its cover as you scroll, chapter by chapter.",
        tags: ["Product showcase", "Bold typography", "Motion"],
        url: "https://thor-car-ad.vercel.app/",
        shot: shot("ui-thor"),
      },
      {
        kind: "Product showcase · Live",
        title: "Velox",
        sub: "Supercar, moto racer & hypercar · ad website",
        desc: "A dark showroom with light streaking past the name: choose your machine from the GT-X, RS1 and LX1, each with its own page, smooth scrolling and controls to explore every detail.",
        tags: ["Multi-page", "Smooth scroll", "Interaction design"],
        url: "https://velox-car-ad.vercel.app/",
        shot: shot("ui-velox"),
      },
      {
        kind: "Visual story · Live",
        title: "Moana",
        sub: "Film · graphic editing showcase",
        desc: "A cinematic fan page for the film: a sunset hero, the journey, gallery and characters, and the official trailer playing in an overlay.",
        tags: ["Graphic editing", "Animation", "Storytelling"],
        url: "https://moana-graphic-editing.vercel.app/",
        shot: shot("ui-moana"),
      },
      {
        kind: "Visual story · Live",
        title: "Avatar",
        sub: "Film saga · scroll-driven 3D journey",
        desc: "A cinematic journey through Pandora in five chapters: the avatar turns its head to follow your mouse, and your scroll scrubs a pinned 3D sequence through each chapter before a living gallery.",
        tags: ["3D image sequence", "Scroll animation", "Graphic editing"],
        url: "https://guru-avatar-editing.vercel.app/",
        shot: shot("ui-avatar"),
      },
      {
        kind: "3D showcase · Live",
        title: "Aerion GT",
        sub: "Sports car · 3D product page",
        desc: "A sports car you can turn in 3D right on the page, with a launch-style layout built around the car's lines and performance.",
        tags: ["3D", "Product page", "Interactive"],
        url: "https://aerion-gt.vercel.app/",
        shot: shot("ui-aerion"),
      },
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Design",
    seoTitle: "Freelance Graphic Designer",
    colour: "#a4552c",
    device: "line",
    blurb:
      "Brand campaigns, social media creatives, posters and logos. Each brand hangs on its own line, in its own colours: scroll to walk along it, click any print to see it up close.",
    projects: [],
    worlds: WORLDS,
  },
];
