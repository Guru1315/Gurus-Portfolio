import type { SiteContent, Chapter } from "./content";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const chapter = (ch: Chapter, i: number) => `          <li class="ch${i === 0 ? " ch--now" : ""}" data-y="${esc(ch.year)}" data-when="${esc(ch.when)}">
            <p class="ch__date">${esc(ch.when)}</p>
            <h3 class="ch__t">${esc(ch.title)}</h3>
            <p class="ch__org">${esc(ch.org)}</p>
            <ul class="ch__b">${ch.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          </li>`;

/** Page markup ported from the source; runtime.js wires up every interaction. */
export function portfolioMarkup(c: SiteContent): string {
  return `<a class="skip" href="#main">Skip to content</a>

<!-- ============ PageLoader ============ -->
<div class="loader" id="loader" aria-hidden="true">
  <div class="ld__bg"></div>
  <div class="ld__stack">
    <div class="ld__pill" style="--k:0;--c:#1F1C1C;--t:#E8E4E0;--dir:1"><span>${esc(c.name)}</span></div>
    <div class="ld__pill" style="--k:1;--c:#22304a;--t:#E8E4E0;--dir:-1"><span>Web development</span></div>
    <div class="ld__pill" style="--k:2;--c:#4a3540;--t:#E8E4E0;--dir:1"><span>App development</span></div>
    <div class="ld__pill" style="--k:3;--c:#7a8670;--t:#F3EEEC;--dir:-1"><span>UI/UX design</span></div>
    <div class="ld__pill" style="--k:4;--c:#a4552c;--t:#F3EEEC;--dir:1"><span>Graphic design</span></div>
    <div class="ld__pill" style="--k:5;--c:#C4B0B0;--t:#1A1818;--dir:-1"><span>Photography</span></div>
  </div>
  <div class="ld__hud">
    <div class="ld__top"><span><b>${esc(c.name)}</b> · Portfolio</span><span>Web · App · UI/UX · Graphic design</span></div>
    <div class="ld__bot">
      <p class="ld__num"><small>Opening up the work</small><span id="ldCount">000</span></p>
      <div class="ld__bar"><i></i></div>
    </div>
  </div>
</div>

<!-- ============ Header ============ -->
<header class="hdr rv">
  <div class="shell hdr__in">
    <nav aria-label="Primary">
      <ul class="nav">
        <li><button data-go="home" aria-current="page"><span data-h="y 0 -2|o .8 1" data-hs="320 22" data-ht="button">Home</span></button></li>
        <li><button data-door="0"><span data-h="y 0 -2|o .8 1" data-hs="320 22" data-ht="button">Web Development</span></button></li>
        <li><button data-door="1"><span data-h="y 0 -2|o .8 1" data-hs="320 22" data-ht="button">App Development</span></button></li>
        <li><button data-door="2"><span data-h="y 0 -2|o .8 1" data-hs="320 22" data-ht="button">UI/UX Design</span></button></li>
        <li><button data-door="3"><span data-h="y 0 -2|o .8 1" data-hs="320 22" data-ht="button">Graphic Design</span></button></li>
        <li><button data-go="about"><span data-h="y 0 -2|o .8 1" data-hs="320 22" data-ht="button">My story</span></button></li>
        <li><button data-contact><span data-h="y 0 -2|o .8 1" data-hs="320 22" data-ht="button">Contact</span></button></li>
      </ul>
    </nav>
    <div class="hdr__right">
      <div class="chip clock" aria-label="Local time">
        <span class="clock__lbl">Local time</span>
        <span class="clock__time tnum" data-time>9:41am</span>
        <span class="clock__sep" aria-hidden="true">•</span>
        <span class="clock__date" data-date>12 March, 2025</span><span class="clock__ds" data-dshort>12 Mar</span>
      </div>
      <button class="chip menu-btn" id="menuBtn" style="min-height:44px;min-width:44px" aria-haspopup="dialog" aria-controls="navm" aria-label="Menu">
        <span data-h="s 1 1.05" data-hs="320 18" data-ht=".menu-btn"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span class="word">Menu</span></span>
      </button>
    </div>
  </div>
</header>

<!-- ============ Pull cord: light / dark switch ============ -->
<div class="cord" id="cord">
  <canvas class="cord__cv" aria-hidden="true"></canvas>
  <button class="cord__hit" id="cordHit" role="switch" aria-checked="false" aria-label="Dark mode (pull the cord)"></button>
</div>

<main id="main">
  <!-- ============ Hero ============ -->
  <section id="home" class="hero" aria-label="Introduction">
    <div class="hero__vig" aria-hidden="true"></div>

    <div class="hero__stage">
      <div class="fig" id="fig">
        <img id="figBase" src="/sites/portfolio/portrait-bw.webp" alt="" decoding="async" fetchpriority="high" aria-hidden="true">
        <canvas id="figCanvas" aria-hidden="true"></canvas>
        <button class="fig__card" id="holoOpen" aria-haspopup="dialog" aria-controls="holo">My ability card</button>
      </div>
    </div>

    <div class="shell hero__content">
      <div class="hero__left">
        <p class="eyebrow rv" style="--d:200ms">Independent Freelancer</p>
        <h1 class="h1">
          <span class="sr-only">Hi, I'm ${esc(c.firstName)}. I am a photographer, graphic designer, UI/UX designer and developer.</span>
          <span aria-hidden="true">
            <span class="line"><span style="--d:250ms">Hi, I'm ${esc(c.firstName)}.</span></span>
            <span class="line"><span class="soft" style="--d:370ms">I am a</span></span>
            <span class="cal-line">
              <span class="cal rv" id="cal" style="--d:520ms">
                <span class="cal__body">
                  <span class="cal__stand"></span>
                  <span class="cal__stack">
                    <span class="cal__back"><span class="cal__holes"></span></span>
                    <span class="cal__page" data-under><span class="cal__holes"></span><span class="cal__word"></span><span class="cal__no"></span><span class="cal__shade"></span></span>
                    <span class="cal__leaf">
                      <span class="cal__face"><span class="cal__holes"></span><span class="cal__word"></span><span class="cal__no"></span><span class="cal__shade"></span></span>
                      <span class="cal__rear"><span class="cal__holes"></span></span>
                    </span>
                  </span>
                  <span class="cal__rings"></span>
                </span>
                <span class="cal__measure"></span>
              </span>
            </span>
          </span>
        </h1>
        <div class="ctas rv" style="--d:750ms">
          <button class="pill pill--dark pill--arrow" data-contact>
            <span class="pill__in" data-h="s 1 1.04" data-hs="320 18" data-ht=".pill">Hire me
              <span class="pill__badge"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-h="x 0 3" data-hs="320 18" data-ht=".pill"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </span>
          </button>
          <button class="pill pill--outline" data-go="works">
            <span class="pill__in" data-h="s 1 1.04" data-hs="320 18" data-ht=".pill">See my work</span>
          </button>
        </div>
      </div>

    </div>

    <div class="shell hero__bar rv">
      <span>Available for work</span>
      <span class="mid">Remote-first, worldwide</span>
      <span class="scroll">Scroll to explore <i aria-hidden="true">↓</i></span>
    </div>
  </section>

  <!-- ============ Doors ============ -->
  <section id="works" class="doors" aria-labelledby="doorsTitle">
    <div class="doors__tex" aria-hidden="true"></div>
    <div class="doors__pin">
    <div class="shell doors__wall">
      <h2 class="sr-only" id="doorsTitle">My work, one door per skill</h2>
      <p class="paint" aria-hidden="true">Magic happens <br class="mbr">behind the doors</p>
      <p class="doors__hint" aria-hidden="true">Swipe along the wall</p>
      <div class="dinfo" id="dinfo" aria-live="polite"><h3 class="dinfo__h"></h3><p class="dinfo__t"></p><ul class="dinfo__p"></ul></div>
      <p class="doors__dots" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></p>
      <ul class="doors__row">
        <li class="unit" style="--i:0;--door:#22304a;--door-dk:#1c2840">
          <button class="doorway" aria-label="Open the Web Developer door">
            <span class="casing"></span>
            <span class="opening">
              <span class="room"></span>
              <span class="spill"></span>
              <span class="door">
                <span class="door__flute"></span>
                <span class="plate">Web Developer</span>
                <span class="handle"><span class="handle__lever"></span><span class="handle__lock"></span></span>
                <span class="door__shade"></span>
                <span class="leak"></span>
              </span>
              <span class="sill"></span>
            </span>
            <span class="pool"></span>
          </button>
        </li>
        <li class="unit" style="--i:1;--door:#4a3540;--door-dk:#3f2d37">
          <button class="doorway" aria-label="Open the App Developer door">
            <span class="casing"></span>
            <span class="opening">
              <span class="room"></span>
              <span class="spill"></span>
              <span class="door">
                <span class="door__flute"></span>
                <span class="plate">App Developer</span>
                <span class="handle"><span class="handle__lever"></span><span class="handle__lock"></span></span>
                <span class="door__shade"></span>
                <span class="leak"></span>
              </span>
              <span class="sill"></span>
            </span>
            <span class="pool"></span>
          </button>
        </li>
        <li class="unit" style="--i:2;--door:#7a8670;--door-dk:#66705d">
          <button class="doorway" aria-label="Open the UI/UX Designer door">
            <span class="casing"></span>
            <span class="opening">
              <span class="room"></span>
              <span class="spill"></span>
              <span class="door">
                <span class="door__flute"></span>
                <span class="plate">UI/UX Designer</span>
                <span class="handle"><span class="handle__lever"></span><span class="handle__lock"></span></span>
                <span class="door__shade"></span>
                <span class="leak"></span>
              </span>
              <span class="sill"></span>
            </span>
            <span class="pool"></span>
          </button>
        </li>
        <li class="unit" style="--i:3;--door:#a4552c;--door-dk:#8c4826">
          <button class="doorway" aria-label="Open the Graphic Designer door">
            <span class="casing"></span>
            <span class="opening">
              <span class="room"></span>
              <span class="spill"></span>
              <span class="door">
                <span class="door__flute"></span>
                <span class="plate">Graphic Designer</span>
                <span class="handle"><span class="handle__lever"></span><span class="handle__lock"></span></span>
                <span class="door__shade"></span>
                <span class="leak"></span>
              </span>
              <span class="sill"></span>
            </span>
            <span class="pool"></span>
          </button>
        </li>
        <li class="unit unit--secret" style="--i:4;--door:#262523;--door-dk:#201f1d" inert>
          <button class="doorway" aria-label="Open the Photographer door">
            <span class="casing"></span>
            <span class="opening">
              <span class="room"></span>
              <span class="spill"></span>
              <span class="door">
                <span class="door__flute"></span>
                <span class="plate">Photographer</span>
                <span class="handle"><span class="handle__lever"></span><span class="handle__lock"></span></span>
                <span class="door__shade"></span>
                <span class="leak"></span>
              </span>
              <span class="sill"></span>
            </span>
            <span class="pool"></span>
          </button>
        </li>
      </ul>
    </div>
    <div class="doors__floor" aria-hidden="true"></div>
    </div>
  </section>

  <section id="about" class="story" aria-labelledby="storyTitle" style="--n:${c.timeline.length}">
    <div class="story__amb" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="story__track">
      <div class="story__pin">
        <div class="shell story__stage">
          <div class="story__clock">
            <canvas class="story__bg" aria-hidden="true"></canvas>
            <p class="eyebrow">My story</p>
            <h2 class="story__h" id="storyTitle">Let's go back in time.</h2>
            <div class="story__yr" aria-hidden="true"><span class="dg"><span class="dg__c"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></span><span class="dg"><span class="dg__c"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></span><span class="dg"><span class="dg__c"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></span><span class="dg"><span class="dg__c"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></span></div>
            <p class="story__when" aria-hidden="true">${esc(c.timeline[0]?.when ?? "")}</p>
            <div class="story__meter" aria-hidden="true">
              <svg aria-hidden="true" focusable="false" class="story__rw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/></svg>
              <span class="story__count">01</span><span class="story__of">/ ${String(c.timeline.length).padStart(2, "0")}</span>
              <i class="story__bar"><b></b></i>
            </div>
          </div>
          <div class="story__line">
            <span class="story__rail" aria-hidden="true"></span><span class="story__ttrack" aria-hidden="true"><span class="story__tail"></span></span><span class="story__dtrack" aria-hidden="true"><span class="story__dot"></span></span>
            <ol class="story__list">
${c.timeline.map(chapter).join("\n")}
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
<div class="sfw">
<footer class="sf" id="contact-footer" aria-labelledby="sfTitle">
  <div class="sf__in">
    <p class="sf__eye"><i></i>Available for new work</p>
    <h2 class="sf__h" id="sfTitle">Need something built?<span>Let's make it happen.</span></h2>
    <p class="sf__p">I'm available for freelance work: websites, apps, interfaces and visual content. Tell me what you need and I'll get back to you within a day.</p>
    <div class="sf__cta">
      <button class="sf__btn" data-contact>Hire me <b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></b></button>
      <button class="sf__ghost" data-go="works">See my work</button>
    </div>
    <div class="sf__cols">
      <div><h3>Work</h3><ul class="work"><li><a href="/web-developer" data-door="0">Web Development</a></li><li><a href="/app-developer" data-door="1">App Development</a></li><li><a href="/ui-ux-designer" data-door="2">UI/UX Design</a></li><li><a href="/graphic-designer" data-door="3">Graphic Design</a></li><li><a href="/photographer" data-door="4">Photography</a></li></ul></div>
      <div><h3>Navigate</h3><ul><li><a href="/" data-go="home">Home</a></li><li><a href="/#about" data-go="about">My story</a></li><li><button data-contact>Contact</button></li></ul></div>
      <div><h3>Status</h3><ul><li class="st">Available for work</li><li class="st">Remote-first, worldwide</li><li class="st">Local time <span data-ftime>—</span></li></ul></div>
    </div>
    <div class="sf__bot"><span>© <span data-fyear>2026</span> ${esc(c.name)}.</span><button data-go="home">Back to top ↑</button></div>
  </div>
</footer>
</div>
<button class="totop" data-go="home" aria-label="Back to top"><svg class="ring" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24"/></svg><svg class="ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg><span class="lbl">Back to top</span></button>

<!-- ============ Door cursor + walk-through veil ============ -->
<div class="door-cursor" id="doorCursor" aria-hidden="true">Click to enter</div>
<div class="veil" id="veil" aria-hidden="true" hidden></div>
<div class="shade" id="shade" aria-hidden="true" hidden></div>
<div class="passage" id="passage" aria-hidden="true" hidden></div>
<div class="wallv" id="wallv"></div>

<!-- ============ NavMenu ============ -->
<div class="navm" id="navm" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <div class="shell navm__top">
    <span class="brand"><svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" fill="currentColor"><path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"/></svg>${esc(c.firstName)}</span>
    <button class="close-btn" id="navClose"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l16 16M20 4 4 20"/></svg>Close</button>
  </div>
  <nav class="shell navm__nav" aria-label="Menu"><ul id="navList"></ul></nav>
  <div class="shell navm__bot">
    <span>Local time<span data-navtime></span></span>
    <button id="navStart" style="min-height:44px">Hire me →</button>
  </div>
</div>

<!-- ============ Ability card ============ -->
<div class="holo" id="holo" role="dialog" aria-modal="true" aria-label="${esc(c.name)}'s ability card" hidden>
  <div class="holo__ld" id="holoLd" aria-hidden="true"><div class="cl" aria-hidden="true"><p class="cl__name">${esc(c.name)}</p><div class="cl__line"><i></i></div><p class="cl__row"><span>Loading the card</span><b id="holoPct">0%</b></p></div></div>
  <div class="holo__lite" id="holoLite" hidden>
    <button class="hc" id="hc" aria-label="Flip the card"><i class="hc__aura"></i><span class="hc__in"><span class="hc__face hc__front"><span class="hc__win"><img class="hc__bg" src="/sites/portfolio/card/win_bg.webp" loading="lazy" alt="" decoding="async"><img class="hc__sub" src="/sites/portfolio/card/win_sub.webp" loading="lazy" alt="" decoding="async"><i class="hc__wsh"></i></span><img class="hc__plate" src="/sites/portfolio/card/plate.webp" loading="lazy" alt="${esc(c.name)}'s ability card: web development 90, UI/UX design 85, graphic design 85, app development 75." decoding="async"><i class="hc__foil"></i><i class="hc__sheen"></i><i class="hc__glare"></i><i class="hc__rim"></i></span><span class="hc__face hc__back"><img class="hc__backimg" src="/sites/portfolio/card/back.webp" loading="lazy" alt="" decoding="async"><i class="hc__foil"></i><i class="hc__glare"></i><i class="hc__rim"></i></span></span></button>
    <p class="hc__hint"><span class="hc__hm">Move across the card</span><span class="hc__ht">Tilt or drag it</span> · tap to flip</p>
  </div>
  <button class="holo__x" id="holoClose"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>Close</button>
</div>

<!-- ============ RequestModal ============ -->
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle" hidden>
  <div class="modal__panel" id="mPanel">
    <button class="x-btn" id="mClose" aria-label="Close"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l16 16M20 4 4 20"/></svg></button>
    <div id="mForm">
      <div class="mhead"><p>Hire me</p><h2 id="mTitle">Tell me what you need built.</h2></div>
      <form class="mform" id="reqForm" name="contact" method="POST" action="/">
        <input type="hidden" name="form-name" value="contact">
        <p class="mform__hp" aria-hidden="true"><label>Leave this empty <input name="company" tabindex="-1" autocomplete="off"></label></p>
        <label for="f-name"><span>Name</span><input id="f-name" name="name" type="text" required maxlength="80" placeholder="Your name" autocomplete="name"></label>
        <label for="f-email"><span>Email</span><input id="f-email" name="email" type="email" required maxlength="120" placeholder="you@company.com" autocomplete="email"></label>
        <label for="f-phone"><span>Phone</span><input id="f-phone" name="phone" type="tel" required maxlength="20" minlength="7" pattern="[\d\s\-\+\(\)]{7,20}" placeholder="+91 98765 43210" autocomplete="tel" title="Phone number with country code"></label>
        <label for="f-project"><span>What do you need?</span><textarea id="f-project" name="project" rows="4" required maxlength="1500" placeholder="Describe the work you'd like done — scope, timeline and budget."></textarea></label>
        <div class="mform__bot">
          <small>I reply within one business day.</small>
          <button type="submit" class="pill pill--dark pill--arrow" id="mSend">
            <span class="pill__in" data-h="s 1 1.04" data-hs="320 18" data-ht=".pill"><span id="mSendLbl">Write the email</span>
              <span class="pill__badge"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-h="x 0 2|y 0 -2" data-hs="320 18" data-ht=".pill"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
            </span>
          </button>
        </div>
      </form>
    </div>
    <div class="msuccess" id="mSuccess" role="status" aria-live="polite" hidden>
      <div class="msuccess__badge"><svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" fill="currentColor"><path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"/></svg></div>
      <h2 id="mOkT">Almost there</h2>
      <p id="mOkP">Your email app has opened with your message ready to go. Press send there and I'll reply within one business day.</p>
      <p class="msuccess__alt">Email app didn't open? Write to <a data-mail href="#contact">my email</a>.</p>
      <button class="pill pill--dark" id="mDone"><span class="pill__in" data-h="s 1 1.04" data-hs="320 18" data-ht=".pill">Close</span></button>
    </div>
  </div>
</div>
`;
}
