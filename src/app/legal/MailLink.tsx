"use client";

import { useEffect, useState } from "react";

// The address is put together in the browser, so bots reading the page source don't harvest it;
// until then the link reads "my email address", as on the source.
export function MailLink({ user, domain, children }: { user: string; domain: string; children: React.ReactNode }) {
  const [address, setAddress] = useState<string>();
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setAddress(`${user}@${domain}`), [user, domain]);
  return <a href={address ? `mailto:${address}` : "#"}>{address ?? children}</a>;
}
