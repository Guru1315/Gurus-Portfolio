"use client";
// Links out of a room are full page loads on purpose: the homepage's runtime reads #works on arrival to skip
// its intro and stand at the doors, and the rooms are separate pages it loads in frames.
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-location-assign-relative-destination */

import { useEffect } from "react";
import { site } from "./content";
import { ROOMS, type RoomInfo, type World } from "./rooms";
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

  useEffect(() => initRoom(room.worlds), [room.worlds]);

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

      <main>
        <div className="wrap">
        <section className="intro">
          <h1>{room.title}</h1>
          <div>
            <p>{room.blurb}</p>
          </div>
          {room.worlds && (
            <span className="how">
              <i />
              Scroll to walk the line
            </span>
          )}
        </section>

        {room.worlds ? null : room.projects.length ? (
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
                    {p.url ? (
                      <a className="live" href={p.url} target="_blank" rel="noopener noreferrer">
                        Visit live site {ARROW}
                      </a>
                    ) : (
                      <span className="note">{p.note ?? "Screens from the app"}</span>
                    )}
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
        </div>

        {room.worlds && (
          <section className="worlds" id="worlds" aria-label="Graphic design work">
            {room.worlds.map((w, wi) => (
              <section
                key={w.k}
                className="world"
                data-i={wi}
                style={{ "--wbg": w.bg, "--wfg": w.fg, "--wacc": w.acc } as React.CSSProperties}
                aria-label={w.em ? `${w.name} ${w.em}` : w.name}
              >
                <div className="pin">
                  <header className="w-head">
                    <p className="w-kicker">
                      <span>{String(wi + 1).padStart(2, "0")}</span>
                      <i />
                      <span>{w.kicker}</span>
                    </p>
                    <h2 className="w-name">
                      {w.name} {w.em && <em>{w.em}</em>}
                    </h2>
                    <div>
                      <p className="w-desc">{w.desc}</p>
                      <ul className="w-tags">
                        {w.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </header>
                  <div className="line">
                    <div className="track">
                      {w.items.map((it, ii) => (
                        <figure
                          key={it.f + ii}
                          className={`print${it.deck ? " deck" : ""}${it.dark ? " dark" : ""}`}
                          data-ii={ii}
                          style={{ "--ar": it.w / it.h } as React.CSSProperties}
                        >
                          <span className="peg" aria-hidden="true" />
                          <button className="paper" aria-label={`Open ${it.title || w.name} ${ii + 1}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={it.f} alt="" loading={wi < 1 ? "eager" : "lazy"} decoding="async" width={it.w} height={it.h} />
                            {it.deck && <span className="badge">Carousel · {it.deck.length} slides</span>}
                          </button>
                        </figure>
                      ))}
                    </div>
                  </div>
                  <div className="w-foot">
                    <div className="w-bar">
                      <i />
                    </div>
                    <span className="w-hint">{wi === 0 ? "Scroll →" : w.em ? `${w.name} ${w.em}` : w.name}</span>
                  </div>
                </div>
              </section>
            ))}
          </section>
        )}
      </main>

      {room.worlds && (
        <div className="lb" id="lb" role="dialog" aria-modal="true" aria-label="Design viewer" hidden>
          <div className="lb__top">
            <p className="lb__t" id="lbT" />
            <button className="lb__x" id="lbX" aria-label="Close">
              ×
            </button>
          </div>
          <div className="lb__stage">
            <button className="lb__nav prev" id="lbP" aria-label="Previous">
              ←
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="lbI" alt="" />
            <button className="lb__nav next" id="lbN" aria-label="Next">
              →
            </button>
          </div>
          <div className="lb__dots" id="lbD" />
        </div>
      )}

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
                © <span data-fyear>2026</span> {site.name}. Built by {site.firstName}.
              </span>
              <span className="sf__legal">
                <a href="/legal" target="_top">
                  Privacy &amp; credits
                </a>
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
function initRoom(worldData?: World[]) {
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

  if (worldData) off.push(initLine(worldData, reduced));

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

// The Graphic Design room: each brand hangs on its own line. Scrolling down walks you along it, the prints
// swing as they pass, and a click opens the print (or a carousel, slide by slide) in a viewer.
function initLine(data: World[], reduced: boolean) {
  const host = document.getElementById("worlds");
  const lb = document.getElementById("lb");
  if (!host || !lb) return () => {};
  const lbI = document.getElementById("lbI") as HTMLImageElement;
  const lbT = document.getElementById("lbT")!;
  const lbD = document.getElementById("lbD")!;
  const navH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 64;

  type Swing = { el: HTMLElement; a: number; v: number; ph: number; sp: number };
  const worlds = [...host.querySelectorAll<HTMLElement>(".world")].map((el) => ({
    el,
    track: el.querySelector<HTMLElement>(".track")!,
    bar: el.querySelector<HTMLElement>(".w-bar")!,
    prints: [...el.querySelectorAll<HTMLElement>(".print")].map((p): Swing => ({ el: p, a: 0, v: 0, ph: Math.random() * 6.28, sp: 0.7 + Math.random() * 0.5 })),
    dist: 0,
    x: 0,
    lx: 0,
  }));

  // every print hangs at the same height; each world is as tall as its line is long
  const layout = () => {
    const vh = innerHeight - navH();
    worlds.forEach((w) => {
      const head = w.el.querySelector<HTMLElement>(".w-head")!.offsetHeight;
      const ph = Math.max(150, Math.min(vh - head - (innerWidth < 768 ? 110 : 150), innerWidth < 768 ? 420 : 560));
      w.el.style.setProperty("--ph", ph + "px");
      w.prints.forEach((p) => {
        const img = p.el.querySelector("img")!;
        img.style.width = (ph - 30) * +p.el.style.getPropertyValue("--ar") + "px";
      });
      // stop exactly when the last print is fully in view
      const last = w.prints[w.prints.length - 1].el, pad = parseFloat(getComputedStyle(w.track).paddingLeft) || 0;
      w.dist = Math.max(0, last.offsetLeft + last.offsetWidth + pad - innerWidth);
      w.el.style.setProperty("--h", vh + w.dist * (innerWidth < 768 ? 1.1 : 1) + "px");
    });
  };
  layout();
  addEventListener("resize", layout);
  document.fonts?.ready.then(layout);

  let lastT = 0, raf = 0;
  const frame = (t: number) => {
    const dt = Math.min(48, t - (lastT || t)) / 16.67;
    lastT = t;
    const nav = navH();
    worlds.forEach((w) => {
      const r = w.el.getBoundingClientRect(), span = Math.max(1, r.height - (innerHeight - nav));
      const p = Math.min(1, Math.max(0, (nav - r.top) / span));
      w.x = -p * w.dist;
      const vel = (w.x - w.lx) / Math.max(dt, 0.5);
      w.lx = w.x;
      w.track.style.transform = `translate3d(${w.x.toFixed(1)}px,0,0)`;
      w.bar.style.setProperty("--p", p.toFixed(4));
      if (reduced || !(r.top < innerHeight && r.bottom > nav)) return;
      w.prints.forEach((pr) => {
        const idle = Math.sin((t / 1000) * pr.sp + pr.ph) * 1.1;
        const target = Math.max(-11, Math.min(11, vel * 0.55)) + idle;
        pr.v += (target - pr.a) * 0.045 * dt;
        pr.v *= Math.pow(0.88, dt);
        pr.a += pr.v * dt;
        pr.el.style.transform = `rotate(${pr.a.toFixed(2)}deg)`;
      });
    });
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  // ---- the viewer
  type Img = { f: string; w: number; h: number };
  let L: { items: Img[]; i: number; title: string } = { items: [], i: 0, title: "" };
  let lastFocus: HTMLElement | null = null;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const show = (i: number) => {
    L.i = (i + L.items.length) % L.items.length;
    lbI.classList.add("swap");
    const it = L.items[L.i], pre = new Image(), stage = lbI.parentElement!;
    pre.src = it.f;
    const go = () => {
      lbI.src = it.f;
      lbI.classList.remove("swap");
      stage.classList.remove("ld");
    };
    if (pre.complete) go();
    else {
      stage.style.setProperty("--ar", (it.w / it.h).toFixed(4));
      stage.classList.add("ld");
      pre.onload = go;
      pre.onerror = go;
    }
    lbI.alt = `${L.title}, ${L.i + 1} of ${L.items.length}`;
    lbT.innerHTML = `${esc(L.title)}<span>${L.i + 1} / ${L.items.length}</span>`;
    lbD.innerHTML = L.items.map((_, k) => `<i class="${k === L.i ? "on" : ""}"></i>`).join("");
  };
  const open = (items: Img[], i: number, title: string) => {
    L = { items, i, title };
    lastFocus = document.activeElement as HTMLElement;
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("open"));
    show(i);
    document.getElementById("lbX")!.focus({ preventScroll: true });
  };
  const close = () => {
    lb.classList.remove("open");
    setTimeout(() => (lb.hidden = true), 360);
    lastFocus?.focus?.({ preventScroll: true });
  };
  const onHost = (e: MouseEvent) => {
    const b = (e.target as HTMLElement).closest(".paper");
    if (!b) return;
    const w = data[+(b.closest(".world") as HTMLElement).dataset.i!];
    const ii = +(b.closest(".print") as HTMLElement).dataset.ii!, it = w.items[ii];
    const label = w.em ? `${w.name} ${w.em}` : w.name;
    if (it.deck) open(it.deck, 0, it.title || label);
    else open(w.items, ii, label);
  };
  host.addEventListener("click", onHost);
  document.getElementById("lbX")!.onclick = close;
  document.getElementById("lbP")!.onclick = () => show(L.i - 1);
  document.getElementById("lbN")!.onclick = () => show(L.i + 1);
  lb.onclick = (e) => {
    const t = e.target as HTMLElement;
    if (t === lb || t.classList.contains("lb__stage")) close();
  };
  const onKey = (e: KeyboardEvent) => {
    if (lb.hidden) return;
    if (e.key === "Escape") {
      e.stopImmediatePropagation(); // the viewer closes; the room stays open
      close();
    }
    if (e.key === "ArrowRight") show(L.i + 1);
    if (e.key === "ArrowLeft") show(L.i - 1);
    if (e.key === "Tab") {
      // Tab stays inside the open viewer
      const f = [...lb.querySelectorAll<HTMLElement>("button")];
      const first = f[0], last = f[f.length - 1];
      if (!lb.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  addEventListener("keydown", onKey, true);
  let sx = 0, sy = 0;
  lb.ontouchstart = (e) => {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  };
  lb.ontouchend = (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(L.i + (dx < 0 ? 1 : -1));
  };

  return () => {
    cancelAnimationFrame(raf);
    removeEventListener("resize", layout);
    removeEventListener("keydown", onKey, true);
    host.removeEventListener("click", onHost);
  };
}
