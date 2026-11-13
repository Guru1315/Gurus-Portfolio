import type { Metadata, Viewport } from "next";
import { site } from "@/components/sites/portfolio/content";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#1A1818",
};

// Runs before first paint, as on the source: restore the pull-cord's dark mode and ease effects off on modest devices.
const bootScript = `try{if(localStorage.getItem('site-mode')==='dark')document.documentElement.dataset.mode='dark'}catch(e){}
(function(){var n=navigator,m=n.deviceMemory||8,c=n.hardwareConcurrency||8,s=n.connection&&n.connection.saveData;
if(m<=2||c<=2||s)document.documentElement.classList.add('lite');})();`;

// Vercel Web Analytics (cookieless). The homepage preloads every room in a hidden frame (?embed); those loads aren't
// visits, so they're dropped before sending. Opening a door changes the address bar, which counts as a room view.
const analyticsQueue = `window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};
window.va('beforeSend',function(e){return window.parent!==window&&/[?&]embed\\b/.test(location.search)?null:e});`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/sites/portfolio/fonts/onest-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script dangerouslySetInnerHTML={{ __html: analyticsQueue }} />
        <script defer src="/_vercel/insights/script.js" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
