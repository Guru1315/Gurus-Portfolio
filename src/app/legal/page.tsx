import type { Metadata } from "next";
import { site } from "@/components/sites/portfolio/content";
import { MailLink } from "./MailLink";
import "./legal.css";

export const metadata: Metadata = {
  title: `Privacy & credits — ${site.name}`,
  description: "How this portfolio handles your data, and the credits and licences for what it is built with.",
};

const [mailUser, mailDomain] = site.email.split("@");

const CREDITS: [string, string, string][] = [
  ["Next.js 16 — © 2025 Vercel, Inc.", "The framework the site is built with", "MIT"],
  ["React 19 — © Meta Platforms, Inc. and affiliates", "Rendering the pages", "MIT"],
  ["three.js r180 — © 2010–2025 three.js authors", "The 3D ability card", "MIT"],
  ["ThreeUI holo card component — © 2026 Meng To", "The ability card's renderer and frame art", "MIT (ThreeUI Community)"],
  ["Lenis 1.3.23 — © 2024 darkroom.engineering", "Smooth scrolling on desktop", "MIT"],
  ["Onest — © 2021 The Onest Project Authors", "The site's typeface", "SIL Open Font License 1.1"],
  ["EB Garamond — © 2017 The EB Garamond Project Authors", "Small captions on the ability card", "SIL Open Font License 1.1"],
];

export default function LegalPage() {
  return (
    <main className="wrap">
      <div className="top">
        {/* a full page load, so the homepage starts fresh */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="chip" href="/">
          ← Back to the portfolio
        </a>
      </div>
      <p className="eye">Privacy &amp; credits</p>
      <h1>Your privacy, and who made what.</h1>
      <p className="lead">
        This site is a personal portfolio. It doesn&apos;t track you, sets no cookies, and doesn&apos;t collect anything about you unless you choose to
        contact me.
      </p>

      <h2>Privacy notice</h2>
      <div className="box">
        <p>
          <b>In short:</b> no analytics, no advertising, no tracking pixels and no cookies. The only thing this site remembers is whether you
          prefer light or dark mode, and that stays in your browser.
        </p>
      </div>

      <h3>Who is responsible</h3>
      <p>
        {site.name}, an independent freelancer based in India. You can reach me at{" "}
        <MailLink user={mailUser} domain={mailDomain}>
          my email address
        </MailLink>{" "}
        ({mailUser} at {mailDomain.replace(".", " dot ")}).
      </p>

      <h3>What this site stores on your device</h3>
      <p>
        One thing, in your browser&apos;s local storage: your light or dark mode choice (key <code>site-mode</code>). It is not a cookie and it
        never leaves your device. You can clear it any time from your browser settings.
      </p>

      <h3>Analytics</h3>
      <p>This site uses no analytics or visitor-tracking service of any kind.</p>

      <h3>When you contact me</h3>
      <p>
        The &ldquo;Hire me&rdquo; form doesn&apos;t send anything itself. When you press &ldquo;Write the email&rdquo;, it opens your own email
        app with your name, email address, phone number and message filled in, addressed to me. Nothing is sent until you press send there; the
        message then travels through your email provider to my inbox (Gmail, run by Google).
      </p>
      <p>
        I ask for your phone number so I can reach you quickly about your project. I will only call or message you about the enquiry you send,
        never for marketing. I use what you send only to reply to you and to discuss your project, keep it only as long as it is useful for our
        work together, and delete it if you ask.
      </p>

      <h3>The hosting provider</h3>
      <p>
        This site is hosted by Vercel, Inc. (USA). Like every host, its servers briefly process technical details such as your IP address and
        browser type to deliver the pages and protect them from abuse. That is governed by Vercel&apos;s own privacy policy. I don&apos;t receive
        or use those logs to identify visitors.
      </p>

      <h3>Links to other websites</h3>
      <p>
        Each project links to its live website. Most are hosted on Vercel; one app runs on Streamlit Community Cloud. Once you follow a link you
        are on that site and under its host&apos;s privacy policy.
      </p>

      <h3>Your rights</h3>
      <p>
        You can ask me what personal data I hold about you, ask me to correct it, or ask me to delete it, by emailing me. I&apos;ll respond within
        30 days. This notice is written with India&apos;s Digital Personal Data Protection Act, 2023 and the EU and UK GDPR in mind.
      </p>

      <h2>Work shown on this site</h2>
      <p>
        The projects shown here were designed and built by me. Several are concept and fan sites for well-known brands, products and films.
        Their names, logos, products and imagery belong to their respective owners, and those projects are personal concept work: they were not
        commissioned by, and are not affiliated with or endorsed by, those companies. If you own any of this material and would like it changed or
        removed, email me and I&apos;ll act on it promptly.
      </p>
      <p>
        The layout and interactions of this portfolio are adapted from{" "}
        <a href="https://therishithakor.com" target="_blank" rel="noopener noreferrer">
          Rishi Thakor&apos;s portfolio
        </a>
        .
      </p>

      <h2>Credits &amp; licences</h2>
      <p>
        This site is built with the open-source work below. Their full licence texts are in <a href="/legal/licenses.txt">licenses.txt</a>.
      </p>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Software or font</th>
              <th>Used for</th>
              <th>Licence</th>
            </tr>
          </thead>
          <tbody>
            {CREDITS.map(([what, use, licence]) => (
              <tr key={what}>
                <td>{what}</td>
                <td>{use}</td>
                <td>{licence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>No warranty</h2>
      <p>This site is provided for information about my work. I try to keep it accurate and up to date, but it is provided as is, without any guarantee.</p>
      <p className="small">
        Last updated 13 November 2026. © 2026 {site.name}.
      </p>
    </main>
  );
}
