// The rooms behind the doors on the homepage, in door order, and the work shown in each.
// Screenshots live in public/sites/portfolio/work/: a tall strip of the site that scrolls on the device's screen.

export type Project = {
  /** Small label above the title, e.g. "Website build". */
  kind: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  url: string;
  /** Tall screenshot that scrolls on the monitor or phone screen. */
  shot: string;
  /** App icon shown beside the label (apps only). */
  icon?: string;
};

export type RoomInfo = {
  slug: string;
  title: string;
  /** Used in the browser tab title. */
  seoTitle: string;
  colour: string;
  blurb: string;
  /** Desktop sites show on a monitor, apps on an iPhone. */
  device: "monitor" | "phone";
  projects: Project[];
  /** Shown while a room has no projects yet. */
  soon?: string;
};

const shot = (name: string) => `/sites/portfolio/work/${name}.webp`;

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
        url: "https://mindlab-ai-psi.vercel.app",
        shot: shot("app-mindlab"),
        icon: shot("icon-mindlab"),
      },
      {
        kind: "Web app · AI",
        title: "Campus Foodie Bot",
        sub: "AI food guide for Saveetha campus · Streamlit",
        desc: "An AI guide to the best food on campus, powered by Google Gemini: ask what to eat, where to find it and what's good today, and get answers in a friendly chat.",
        tags: ["Gemini AI", "Python", "Streamlit"],
        url: "https://ai-chatbot-pvj39rjn32zxtyxtlqrehq.streamlit.app/",
        shot: shot("app-chatbot"),
        icon: shot("icon-chatbot"),
      },
      {
        kind: "Web app · Food & drink",
        title: "Kaapi Kadai",
        sub: "Filter-coffee house · since 1983",
        desc: "A retro app for a Mylapore filter-coffee house: a 3D brass davara-tumbler on a sunburst, Tamil and English lettering, and an account to log in and order.",
        tags: ["3D", "Accounts & login", "Retro brand look"],
        url: "https://kaapi-kadai-sail22.vercel.app",
        shot: shot("app-kaapi"),
        icon: shot("icon-kaapi"),
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
    device: "monitor",
    blurb: "Brand campaigns, social media creatives, posters and logos.",
    projects: [],
    soon: "New graphic design work is on its way. In the meantime, say hello and tell me what you need designed.",
  },
  {
    slug: "photographer",
    title: "Photography",
    seoTitle: "Photography",
    colour: "#262523",
    device: "monitor",
    blurb: "Moments, places and people, seen through my lens.",
    projects: [],
    soon: "A wall of photographs is coming to this room soon.",
  },
];
