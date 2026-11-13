// Everything personal on the page lives here. Swap these placeholders for your own details.
// Photos: replace public/sites/portfolio/portrait-bw.webp and portrait-colour.webp (801×1033, transparent
// background, figure standing on the bottom edge) and public/sites/portfolio/card/win_sub.webp + plate.webp.

export type Chapter = {
  /** Four-digit year the odometer rolls to while this chapter is in view. */
  year: string;
  when: string;
  title: string;
  org: string;
  points: string[];
};

export type SiteContent = {
  name: string;
  firstName: string;
  email: string;
  title: string;
  description: string;
  timeline: Chapter[];
};

export const site: SiteContent = {
  name: "Guru Charan",
  firstName: "Guru",
  email: "gurumurugan291@gmail.com",
  title: "Guru Charan — Freelance Web & App Developer, UI/UX Designer",
  description:
    "Freelance developer and designer building websites, apps and brand design for clients worldwide.",
  timeline: [
    {
      year: "2026",
      when: "Oct 2026 — Now",
      title: "Independent freelancer",
      org: "Working for myself, remote-first",
      points: [
        "Websites, iOS apps, interfaces and brand creatives, carried from the first sketch to launch.",
        "Working directly with clients, wherever they are.",
      ],
    },
    {
      year: "2026",
      when: "Jan 2026 — Jun 2026",
      title: "Graphic designer",
      org: "Himspring LLC",
      points: [
        "Managed visual content across social media handles for real estate, luxury water bottle and clothing brands.",
        "Designed social media creatives, stories and carousels in Adobe Illustrator, keeping every brand consistent across platforms.",
      ],
    },
    {
      year: "2025",
      when: "Sep 2025 — Dec 2025",
      title: "UI/UX designer",
      org: "Quicko Pvt Ltd, Chennai",
      points: [
        "Designed website interfaces and user experiences in Figma, focused on usability, visual clarity and function.",
        "Built no-code web pages and interactive financial tools in Framer, turning designs into working products.",
      ],
    },
    {
      year: "2024",
      when: "Aug 2024 — Now",
      title: "B.Tech in Artificial Intelligence",
      org: "Saveetha University (SIMATS)",
      points: [
        "Four years of computer science: where it all started, with code in the classroom and design on the side.",
        "With internships and real projects already under way.",
      ],
    },
    {
      year: "2022",
      when: "Jun 2022 — Mar 2024",
      title: "Higher Secondary in Bio-Maths",
      org: "Shepherds Matric Hr Sec School, Tirupattur, Tamil Nadu",
      points: [
        "Statistics and probability: mean, median, standard deviation, distributions and correlation, the ideas behind how machine-learning algorithms make predictions.",
        "Linear algebra and calculus: matrices, vectors, derivatives and gradients, which explain how neural networks and deep learning models learn.",
      ],
    },
  ],
};
