import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // the homepage rewrites the address bar to /home, /work or /my-story as you scroll; reloading any of them lands on it
  async rewrites() {
    return ["/home", "/work", "/my-story"].map((source) => ({ source, destination: "/" }));
  },
  // the 3D ability card is a static page in public/ability-card; its files are relative to that folder
  async redirects() {
    return [{ source: "/ability-card", destination: "/ability-card/index.html", permanent: false }];
  },
};

export default nextConfig;
