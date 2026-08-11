import { ALL_LESSONS } from "@/data/curriculum";
import { LessonView } from "./LessonView";

/**
 * Pre-generate one static page per non-roleplay lesson so the route works in
 * the Capacitor static export too.
 */
export function generateStaticParams() {
  return ALL_LESSONS.filter((l) => l.type !== "roleplay").map((l) => ({ id: l.id }));
}

export const dynamicParams = false;

/**
 * Next.js 16: `params` is a Promise — must be awaited.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LessonView lessonId={id} />;
}
