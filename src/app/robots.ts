import type { MetadataRoute } from "next";
import { site } from "@/components/sites/portfolio/content";

// /robots.txt: everything may be indexed; points search engines at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
