import { SCENARIOS } from "@/data/scenarios";
import { ALL_LESSONS } from "@/data/curriculum";
import ChatView from "./ChatView";

/**
 * Pre-generate static pages for both real scenarios and A0 practice lessons
 * (so /chat/a0-2-2 etc. work in the Capacitor static export too).
 */
export function generateStaticParams() {
  const scenarioIds = SCENARIOS.map((s) => ({ id: s.id }));
  const lessonIds = ALL_LESSONS.filter((l) => l.level === "A0" || l.level === "A1").map((l) => ({
    id: l.id,
  }));
  return [...scenarioIds, ...lessonIds];
}

// Allow A0 lesson ids not in the static set (dev + non-A0 future lessons).
export const dynamicParams = true;

/**
 * NOTE: In Next.js 16, `params` is a Promise and must be awaited.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <ChatView scenarioId={resolvedParams.id} />;
}
