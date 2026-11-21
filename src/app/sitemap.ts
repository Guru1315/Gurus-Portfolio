import type { MetadataRoute } from "next";
import { site } from "@/components/sites/portfolio/content";
import { ROOMS } from "@/components/sites/portfolio/rooms";

// /sitemap.xml: the homepage, every room behind the doors, and the legal page.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...ROOMS.map((r) => ({ url: `${site.url}/${r.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
