import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // the homepage rewrites the address bar to /home, /work or /my-story as you scroll; reloading any of them lands on it
  async rewrites() {
    return ["/home", "/work", "/my-story"].map((source) => ({ source, destination: "/" }));
  },
  async redirects() {
    return [
      // the old Vercel address sends visitors (and search engines) to the custom domain, keeping the path and query;
      // only this exact host matches, so preview deployments are unaffected
      {
        source: "/:path*",
        has: [{ type: "host", value: "guru1315-portfolio.vercel.app" }],
        destination: "https://www.gurucharan.me/:path*",
        permanent: true,
      },
      // the 3D ability card is a static page in public/ability-card; its files are relative to that folder
      { source: "/ability-card", destination: "/ability-card/index.html", permanent: false },
      // short links used in the résumé PDF: every link points at this one domain, so a PDF reader's
      // "this document is trying to connect to..." prompt appears once, not once per website
      ...Object.entries({
        perfume: "https://guru-perfume-ad-site.vercel.app",
        lays: "https://guru-lays-site.vercel.app",
        movade: "https://movade-travel.vercel.app",
        ml: "https://github.com/Guru1315/DAILY_PROJECTS_OF_ML-ALGORITHMS",
        github: "https://github.com/Guru1315",
        linkedin: "https://www.linkedin.com/in/guru-charan-m-436b26435",
      }).map(([name, destination]) => ({ source: `/go/${name}`, destination, permanent: false })),
    ];
  },
};

export default nextConfig;
