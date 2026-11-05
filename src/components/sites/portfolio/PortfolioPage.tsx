"use client";

import { useEffect } from "react";
import { site } from "./content";
import { portfolioMarkup } from "./markup";
import { initPortfolio } from "./runtime";
import "./portfolio.css";

const html = portfolioMarkup(site);

export function PortfolioPage() {
  useEffect(() => {
    initPortfolio({
      name: site.name,
      firstName: site.firstName,
      email: site.email,
      colourPortrait: "/sites/portfolio/portrait-colour.webp",
    });
  }, []);

  // The runtime drives this markup directly (layers, canvases, springs), so React renders it once and leaves it alone.
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
