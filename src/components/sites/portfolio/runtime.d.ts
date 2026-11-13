export function initPortfolio(cfg: {
  name: string;
  firstName: string;
  email: string;
  colourPortrait: string;
  /** Supabase project the contact form saves enquiries to (public URL + publishable key). */
  enquiries?: { url: string; key: string };
}): Promise<void>;
