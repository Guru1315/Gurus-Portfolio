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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { room: slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  return room ? { title: `${room.seoTitle} — ${site.name}`, description: room.blurb } : { title: site.title };
}

export default async function RoomPage({ params }: Props) {
  const { room: slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) notFound();
  return <Room room={room} />;
}
