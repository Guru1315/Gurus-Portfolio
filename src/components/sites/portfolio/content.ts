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
  email: "hello@example.com",
  title: "Guru Charan — Freelance Web & App Developer, UI/UX Designer",
  description:
    "Freelance developer and designer building websites, apps and brand design for clients worldwide.",
  timeline: [
    {
      year: "2026",
      when: "Jan 2026 — Now",
      title: "Independent freelancer",
      org: "Working for myself, remote-first",
      points: ["Describe the kind of work you take on for clients.", "Add a second highlight here."],
    },
    {
      year: "2025",
      when: "Jun 2025 — Dec 2025",
      title: "Role title",
      org: "Company name, City",
      points: ["What you were responsible for.", "A result you are proud of."],
    },
    {
      year: "2024",
      when: "Jan 2024 — May 2025",
      title: "Role title",
      org: "Company name, City",
      points: ["What you were responsible for.", "A result you are proud of."],
    },
    {
      year: "2023",
      when: "Jun 2023 — Dec 2023",
      title: "Internship title",
      org: "Company name · Remote",
      points: ["What you worked on.", "What you learned."],
    },
    {
      year: "2020",
      when: "Jul 2020 — May 2024",
      title: "Degree, Field of study",
      org: "University name",
      points: ["Where it all started.", "Projects or achievements from your studies."],
    },
  ],
};
