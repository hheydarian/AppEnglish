import { redirect } from "next/navigation";
import { ALL_LESSONS, getLessonById } from "@/data/curriculum";
import { LessonView } from "./LessonView";

/**
 * Pre-generate a static page for EVERY lesson — including roleplay ones.
 *
 * Roleplay lessons (type === "roleplay") have no interactive 4-step content
 * (vocab/grammar/quiz). Instead, when a user lands on /lesson/[roleplay-id]
 * — whether by direct URL, a stale bookmark, or a misrouted link — we
 * immediately redirect them to /chat/[id] where the live AI conversation
 * lives. This eliminates the 404 entirely.
 */
export function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ id: l.id }));
}

export const dynamicParams = false;

/**
 * Next.js 16: `params` is a Promise — must be awaited.
 *
 * For roleplay lessons, redirect to /chat/[id] instead of rendering the
 * lesson view (which would have no content to show).
 */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);

  // Roleplay lessons → redirect to the live AI chat for that lesson.
  if (!lesson || lesson.type === "roleplay") {
    redirect(`/chat/${id}`);
  }

  return <LessonView lessonId={id} />;
}
