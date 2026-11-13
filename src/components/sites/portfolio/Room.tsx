"use client";
// Links out of a room are full page loads on purpose: the homepage's runtime reads #works on arrival to skip
// its intro and stand at the doors, and the rooms are separate pages it loads in frames.
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-location-assign-relative-destination */

import { useEffect } from "react";
import { site } from "./content";
import { ROOMS, type RoomInfo } from "./rooms";
import "./room.css";

const ARROW = (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
const SIG = (
  <svg viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
    <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
  </svg>
);
const WIFI = (
  <svg viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
    <path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8 .5 10.6 10.6 0 0 0 .5 3.4l1.2 1.3A9 9 0 0 1 8 2.2Zm0 3.4c1.5 0 2.9.6 4 1.6l1.2-1.3A7.4 7.4 0 0 0 8 3.9a7.4 7.4 0 0 0-5.2 2l1.2 1.3c1.1-1 2.5-1.6 4-1.6Zm0 3.4c.6 0 1.2.2 1.6.6L8 11.5 6.4 9.6c.4-.4 1-.6 1.6-.6Z" />
  </svg>
);
const BATT = (
  <svg viewBox="0 0 27 12" fill="none" aria-hidden="true">
    <rect x=".5" y=".5" width="22" height="11" rx="3" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="19" height="8" rx="1.8" fill="currentColor" /><path d="M24.5 4v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill="currentColor" opacity=".45" />
  </svg>
);

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Runs before first paint: behind a door the room waits under its veil until the homepage says you walked in.
const bootScript = `if(/[?&]embed\\b/.test(location.search)&&window.parent!==window)document.documentElement.classList.add('embed')`;

// The page behind a door. The homepage loads it in a frame (?embed) and walks through the door into it;
// opened directly, it is an ordinary page with a way back to the doors.
export function Room({ room }: { room: RoomInfo }) {
  const doorIndex = ROOMS.findIndex((r) => r.slug === room.slug);
  const phone = room.device === "phone";

  useEffect(() => initRoom(), []);

  const nav: [string, string][] = [
    ["home", "Home"],
    ...ROOMS.slice(0, 4).map((r, i): [string, string] => [`door:${i}`, r.title]),
    ["about", "My story"],
    ["contact", "Contact"],
  ];

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <div className="glow" aria-hidden="true" />
      <header className="rn" id="rn">
        <div className="rn__in">
          <a className="backd" href="/#works" data-back aria-label="Back to the doors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            <span>Back to the doors</span>
          </a>
          <nav aria-label="Primary">
            <ul>
              {nav.map(([to, label]) => (
                <li key={to}>
                  <button data-nav={to} aria-current={to === `door:${doorIndex}` ? "page" : undefined}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rn__clock" aria-label="Local time">
            <span>Local time</span>
            <b data-ftime>—</b>
            <span className="d">·</span>
            <span className="d" data-fdate />
          </div>
          <button className="rn__menu" id="rnMenu" aria-expanded="false" aria-controls="rnPanel">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Menu</span>
          </button>
        </div>
        <div className="rn__panel" id="rnPanel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="rn__phead">
            <span className="rn__plbl">Menu</span>
            <button className="rn__pclose" id="rnClose" aria-label="Close menu">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="rn__plist">
            {nav.map(([to, label], i) => (
              <button key={to} data-nav={to} style={{ "--i": i } as React.CSSProperties} aria-current={to === `door:${doorIndex}` ? "page" : undefined}>
                {label}
              </button>
            ))}
          </div>
          <p className="rn__pfoot">{site.name} — available for new work</p>
        </div>
      </header>

      <main className="wrap">
        <section className="intro">
          <h1>{room.title}</h1>
          <div>
            <p>{room.blurb}</p>
          </div>
        </section>

        {room.projects.length ? (
          <section className="stack" id="stack" aria-label="Projects">
            {room.projects.map((p, i) => (
              <article key={p.title} className={`card${i % 2 ? " flip" : ""}`} style={{ "--i": i } as React.CSSProperties} aria-labelledby={`p${i}`}>
                <div className={`card__in${phone ? " ph" : ""}`}>
                  <div className="card__info">
                    {p.icon ? (
                      <div className="app">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.icon} alt="" width={58} height={58} decoding="async" loading={i < 1 ? "eager" : "lazy"} />
                        <p className="card__meta">
                          <span>{p.kind}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="card__meta">
                        <span>{p.kind}</span>
                      </p>
                    )}
                    <h2 id={`p${i}`}>{p.title}</h2>
                    <p className="sub">{p.sub}</p>
                    <p className="desc">{p.desc}</p>
                    <ul className="tags">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <a className="live" href={p.url} target="_blank" rel="noopener noreferrer">
                      Visit live site {ARROW}
                    </a>
                  </div>
                  <div className={`stage${phone ? " ph" : ""}`} aria-hidden="true">
                    {phone ? (
                      <div className="phone">
                        <div className="phone__body">
                          <i className="phone__btn l" style={{ top: "19%", height: "4%" }} />
                          <i className="phone__btn l" style={{ top: "26%", height: "7.5%" }} />
                          <i className="phone__btn l" style={{ top: "35%", height: "7.5%" }} />
                          <i className="phone__btn r" style={{ top: "28%", height: "11%" }} />
                          <div className="phone__screen">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="page" src={p.shot} alt="" decoding="async" loading={i < 1 ? "eager" : "lazy"} />
                            <div className="sbar">
                              <span>9:41</span>
                              <span>
                                {SIG}
                                {WIFI}
                                {BATT}
                              </span>
                            </div>
                            <div className="island" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mon">
                        <div className="mon__body">
                          <div className="mon__screen">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="page" src={p.shot} alt="" decoding="async" loading={i < 1 ? "eager" : "lazy"} />
                          </div>
                        </div>
                        <div className="mon__neck" />
                        <div className="mon__foot" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="card__dim" />
              </article>
            ))}
          </section>
        ) : (
          <section className="soon">
            <div>
              <span className="lbl">Coming soon</span>
              <p>{room.soon}</p>
            </div>
          </section>
        )}
      </main>

      <div className="sfw">
        <footer className="sf" aria-labelledby="sfTitle">
          <div className="sf__in">
            <p className="sf__eye">
              <i />
              Available for new work
            </p>
            <h2 className="sf__h" id="sfTitle">
              Need something built?<span>Let&apos;s make it happen.</span>
            </h2>
            <p className="sf__p">
              I&apos;m available for freelance work: websites, apps, interfaces and visual content. Tell me what you need and I&apos;ll get back to you within a day.
            </p>
            <div className="sf__cta">
              <button className="sf__btn" data-nav="contact">
                Hire me{" "}
                <b>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </b>
              </button>
            </div>
            <div className="sf__cols">
              <div>
                <h3>Work</h3>
                <ul className="work">
                  {ROOMS.map((r, i) => (
                    <li key={r.slug}>
                      <a href={`/${r.slug}`} data-nav={`door:${i}`}>
                        {r.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Navigate</h3>
                <ul>
                  <li>
                    <a href="/" data-nav="home">Home</a>
                  </li>
                  <li>
                    <a href="/#about" data-nav="about">My story</a>
                  </li>
                  <li>
                    <button data-nav="contact">Contact</button>
                  </li>
                </ul>
              </div>
              <div>
                <h3>Status</h3>
                <ul>
                  <li className="st">Available for work</li>
                  <li className="st">Remote-first, worldwide</li>
                  <li className="st">
                    Local time <span data-ftime>—</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sf__bot">
              <span>
                © <span data-fyear>2026</span> {site.name}.
              </span>
              <button data-nav="top">Back to top ↑</button>
            </div>
          </div>
          <p className="sf__word" aria-hidden="true">
            <span className="full">{site.name}</span>
            <span className="short">{site.firstName}</span>
          </p>
        </footer>
      </div>
    </>
  );
}

// Everything that moves: the stacked cards, the screens scrolling their pages, the bar, the menu and the
// conversation with the homepage when the room is shown behind a door. Returns its own clean-up.
function initRoom() {
  const root = document.documentElement;
  const EMBED = /[?&]embed\b/.test(location.search) && window.parent !== window;
  const ORIGIN = location.origin === "null" ? "*" : location.origin;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const off: (() => void)[] = [];
  const on = <K extends keyof WindowEventMap>(ev: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
    addEventListener(ev, fn, opts);
    off.push(() => removeEventListener(ev, fn));
  };

  if (EMBED) root.classList.add("embed");
  try {
    if (localStorage.getItem("site-mode") === "dark") root.dataset.mode = "dark";
  } catch {}
  let live = !EMBED; // inside the homepage nothing plays until you have walked in

  // ---- the bar: its height, and a hairline once the page scrolls under it
  const rn = document.getElementById("rn")!;
  const setNav = () => root.style.setProperty("--nav-h", rn.offsetHeight + "px");
  setNav();
  on("resize", setNav);
  on("scroll", () => rn.classList.toggle("stuck", scrollY > 4), { passive: true });
  requestAnimationFrame(() => document.querySelector(".backd")?.classList.add("show"));

  // ---- leaving and moving around
  const post = (msg: object) => parent.postMessage(msg, ORIGIN);
  const go = (to: string) => {
    if (to === "top") return scrollTo({ top: 0, behavior: "smooth" });
    if (EMBED) return post({ wall: "go", to });
    if (to === "home") location.href = "/";
    else if (to === "about") location.href = "/#about";
    else if (to === "contact") location.href = "/#contact";
    else if (to.startsWith("door:")) location.href = "/" + ROOMS[+to.slice(5)].slug;
  };
  const menu = document.getElementById("rnMenu")!;
  const pclose = document.getElementById("rnClose")!;
  const setMenu = (o: boolean) => {
    rn.classList.toggle("open", o);
    menu.setAttribute("aria-expanded", String(o));
    root.classList.toggle("rn-lock", o);
    if (o) setTimeout(() => pclose.focus(), 50);
  };
  menu.onclick = () => setMenu(true);
  pclose.onclick = () => setMenu(false);
  const onClick = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest("[data-back]")) {
      if (EMBED) {
        e.preventDefault();
        post({ wall: "close" });
      }
      return;
    }
    const b = t.closest<HTMLElement>("[data-nav]");
    if (!b) return;
    if (b.tagName === "A" && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button)) return;
    e.preventDefault();
    setMenu(false);
    if (b.hasAttribute("aria-current")) return scrollTo({ top: 0, behavior: "smooth" });
    go(b.dataset.nav!);
  };
  document.addEventListener("click", onClick);
  off.push(() => document.removeEventListener("click", onClick));
  on("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (rn.classList.contains("open")) setMenu(false);
    else if (EMBED) post({ wall: "close" });
  });

  // ---- clock and the footer name sized edge to edge
  const tick = () => {
    const d = new Date(), h = d.getHours();
    document.querySelectorAll("[data-ftime]").forEach((e) => (e.textContent = `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}${h < 12 ? "am" : "pm"}`));
    document.querySelectorAll("[data-fyear]").forEach((e) => (e.textContent = String(d.getFullYear())));
    const short = matchMedia("(max-width: 767.98px)").matches;
    document
      .querySelectorAll("[data-fdate]")
      .forEach((e) => (e.textContent = short ? `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}` : `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`));
  };
  tick();
  const clock = setInterval(tick, 20000);
  off.push(() => clearInterval(clock));
  const fit = () =>
    document.querySelectorAll<HTMLElement>(".sf").forEach((f) => {
      const w = f.querySelector<HTMLElement>(".sf__word");
      const span = w && [...w.children].find((s) => getComputedStyle(s).display !== "none");
      if (!w || !span) return;
      w.style.setProperty("--wf", "100px");
      const k = (f.clientWidth * 0.955) / span.getBoundingClientRect().width;
      f.style.setProperty("--wf", (100 * k).toFixed(2) + "px");
      w.style.removeProperty("--wf");
    });
  fit();
  on("resize", fit);
  document.fonts?.ready.then(fit);

  // ---- the cards
  const cards = [...document.querySelectorAll<HTMLElement>(".card")];
  const SPEED = 230, REST = 1100; // screen pixels a second, and the pause at each end (ms)
  type Shot = { c: HTMLElement; img: HTMLImageElement; scr: HTMLElement; pos: number; dist: number; dir: number; wait: number; covered: boolean; measure: () => void };
  const paint = (s: Shot) => (s.img.style.transform = `translate3d(0,${-s.pos.toFixed(1)}px,0)`);
  const shots: Shot[] = cards.flatMap((c) => {
    const img = c.querySelector<HTMLImageElement>("img.page"), scr = c.querySelector<HTMLElement>(".mon__screen,.phone__screen");
    if (!img || !scr) return [];
    const s: Shot = { c, img, scr, pos: 0, dist: 0, dir: 1, wait: REST, covered: false, measure: () => {} };
    s.measure = () => {
      s.dist = Math.max(0, img.offsetHeight - scr.clientHeight);
      s.pos = Math.min(s.pos, s.dist);
      paint(s);
    };
    if (img.complete && img.naturalWidth) s.measure();
    else img.addEventListener("load", s.measure, { once: true });
    return [s];
  });
  on("resize", () => shots.forEach((s) => s.measure()));
  const restart = (s: Shot) => {
    s.pos = 0;
    s.dir = 1;
    s.wait = REST;
    paint(s);
  };
  // a screen that has been out of sight (scrolled away, or covered by the card stacked over it) starts again from the top
  const checkHidden = () =>
    shots.forEach((s) => {
      const r = s.scr.getBoundingClientRect();
      const i = cards.indexOf(s.c);
      let hidden = r.bottom <= 0 || r.top >= innerHeight;
      for (let k = i + 1; !hidden && k < cards.length; k++) {
        const n = cards[k].getBoundingClientRect();
        if (n.top <= r.top + 1 && n.bottom >= r.bottom - 1) hidden = true;
      }
      if (hidden && !s.covered) restart(s);
      s.covered = hidden;
    });
  on("scroll", checkHidden, { passive: true });
  on("resize", checkHidden);
  let last = 0, raf = 0;
  const run = (t: number) => {
    const dt = Math.min(64, t - (last || t));
    last = t;
    if (live && !reduced)
      for (const s of shots) {
        if (s.covered || !s.c.classList.contains("on") || !s.dist) continue;
        if (s.wait > 0) {
          s.wait -= dt;
          continue;
        }
        const left = s.dir > 0 ? s.dist - s.pos : s.pos;
        const ease = Math.min(1, 0.3 + left / 160) * Math.min(1, 0.35 + (s.dist - left) / 160); // eases in and out at each end
        s.pos += (s.dir * SPEED * ease * dt) / 1000;
        if (s.pos >= s.dist) {
          s.pos = s.dist;
          s.dir = -1;
          s.wait = REST;
        } else if (s.pos <= 0) {
          s.pos = 0;
          s.dir = 1;
          s.wait = REST;
        }
        paint(s);
      }
    raf = requestAnimationFrame(run);
  };
  raf = requestAnimationFrame(run);
  off.push(() => cancelAnimationFrame(raf));
  checkHidden();

  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        e.target.classList.toggle("on", e.isIntersecting);
        if (e.isIntersecting) e.target.classList.add("seen");
      }),
    { threshold: 0.25 },
  );
  cards.forEach((c) => io.observe(c));
  off.push(() => io.disconnect());

  // stacking: as the next card slides over, the one beneath settles back a little
  let ticking = false;
  const stackFx = () => {
    ticking = false;
    cards.forEach((c, i) => {
      const next = cards[i + 1];
      let p = 0;
      if (next) {
        const top = parseFloat(getComputedStyle(c).top), h = c.offsetHeight;
        p = Math.min(1, Math.max(0, (top + h - next.getBoundingClientRect().top) / h));
      }
      c.style.transform = p ? `scale(${(1 - p * 0.06).toFixed(4)})` : "";
      (c.lastElementChild as HTMLElement).style.opacity = (p * 0.28).toFixed(3);
    });
  };
  if (!reduced) {
    on("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(stackFx);
      }
    }, { passive: true });
    stackFx();
  }

  // ---- behind a door: the homepage tells the room when you walk in and out, and the light/dark mode
  let liveT = 0;
  on("message", (e) => {
    if (e.source !== parent || !e.data) return;
    const m = e.data as { wall?: string; mode?: string };
    if (m.wall === "enter") {
      root.classList.remove("out");
      scrollTo(0, 0);
      shots.forEach(restart);
      requestAnimationFrame(() => root.classList.add("in"));
      clearTimeout(liveT);
      liveT = window.setTimeout(() => {
        live = true;
        checkHidden();
        dispatchEvent(new Event("scroll"));
      }, 650);
    }
    if (m.wall === "exit") {
      clearTimeout(liveT);
      live = false;
      root.classList.add("out");
      root.classList.remove("in");
    }
    if (m.wall === "reset") root.classList.remove("out", "in");
    if (m.wall === "mode") {
      if (m.mode === "dark") root.dataset.mode = "dark";
      else delete root.dataset.mode;
    }
  });

  return () => off.forEach((f) => f());
}
