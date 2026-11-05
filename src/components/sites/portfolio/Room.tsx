"use client";

import { useEffect, useState } from "react";
import "./room.css";

export type RoomInfo = { slug: string; title: string; colour: string };

// The page behind a door. The homepage loads it in a frame (?embed) and walks through the door into it;
// opened directly, it is an ordinary page with a way back to the doors.
export function Room({ room }: { room: RoomInfo }) {
  const [embedded, setEmbedded] = useState(false);

  useEffect(() => {
    // reading the URL has to wait for the browser; the server render is the standalone page
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmbedded(new URLSearchParams(location.search).has("embed") && window.parent !== window);
    try {
      if (localStorage.getItem("site-mode") === "dark") document.documentElement.dataset.mode = "dark";
    } catch {}
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== location.origin || e.data?.wall !== "mode") return;
      if (e.data.mode === "dark") document.documentElement.dataset.mode = "dark";
      else delete document.documentElement.dataset.mode;
    };
    addEventListener("message", onMessage);
    return () => removeEventListener("message", onMessage);
  }, []);

  const leave = () => window.parent.postMessage({ wall: "close" }, location.origin);

  return (
    <main className="door-room" style={{ "--room": room.colour } as React.CSSProperties}>
      <div className="door-room__in">
        <p className="door-room__eye">Behind the door</p>
        <h1 className="door-room__h">{room.title}</h1>
        <p className="door-room__p">Your projects go here. Add case studies, screenshots and links for this skill.</p>
        {embedded ? (
          <button className="door-room__back" onClick={leave}>
            ← Back to the doors
          </button>
        ) : (
          // a full page load: the homepage reads #works on arrival to skip its intro and stand at the doors
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a className="door-room__back" href="/#works">
            ← Back to the doors
          </a>
        )}
      </div>
    </main>
  );
}
