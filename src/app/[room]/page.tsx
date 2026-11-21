import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/components/sites/portfolio/content";
import { Room } from "@/components/sites/portfolio/Room";
import { ROOMS } from "@/components/sites/portfolio/rooms";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROOMS.map(({ slug }) => ({ room: slug }));
}

type Props = { params: Promise<{ room: string }> };

const SHARE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Guru Charan, Web, AI and ML Developer and UI/UX and Graphic Designer, in a maroon suit",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { room: slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) return { title: site.title };
  const title = `${room.seoTitle} — ${site.name}`;
  return {
    title,
    description: room.blurb,
    alternates: { canonical: `/${room.slug}` },
    // a page's own openGraph/twitter replaces the inherited one, so the share card is named again here
    openGraph: { type: "website", url: `/${room.slug}`, siteName: `${site.name} · Portfolio`, title, description: room.blurb, images: [SHARE] },
    twitter: { card: "summary_large_image", title, description: room.blurb, images: [SHARE] },
  };
}

export default async function RoomPage({ params }: Props) {
  const { room: slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) notFound();
  return <Room room={room} />;
}
