import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/components/sites/portfolio/content";
import { Room, type RoomInfo } from "@/components/sites/portfolio/Room";

// One room per door on the homepage, in door order, coloured like its door.
const ROOMS: RoomInfo[] = [
  { slug: "web-developer", title: "Web Development", colour: "#22304a" },
  { slug: "app-developer", title: "App Development", colour: "#4a3540" },
  { slug: "ui-ux-designer", title: "UI/UX Design", colour: "#7a8670" },
  { slug: "graphic-designer", title: "Graphic Design", colour: "#a4552c" },
  { slug: "photographer", title: "Photography", colour: "#262523" },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return ROOMS.map(({ slug }) => ({ room: slug }));
}

type Props = { params: Promise<{ room: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { room: slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  return { title: room ? `${room.title} — ${site.firstName}` : site.title };
}

export default async function RoomPage({ params }: Props) {
  const { room: slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) notFound();
  return <Room room={room} />;
}
