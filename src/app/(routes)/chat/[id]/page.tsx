import { SCENARIOS } from "@/data/scenarios";
import { ALL_LESSONS } from "@/data/curriculum";
import ChatView from "./ChatView";

/**
 * Pre-generate static pages for both real scenarios and A0 practice lessons
 * (so /chat/a0-2-2 etc. work in the Capacitor static export too).
 */
export function generateStaticParams() {
  const scenarioIds = SCENARIOS.map((s) => ({ id: s.id }));
  // All lessons across every level (A0–C2) get a chat route.
  const lessonIds = ALL_LESSONS.map((l) => ({ id: l.id }));
  // Special persona-only chats (no curriculum lesson) are listed explicitly.
  return [...scenarioIds, ...lessonIds, { id: "exam-oral" }];
}

// Static export requires exhaustive params — every lesson id (A0–C2) plus
// the special exam-oral persona is generated above, so nothing else is needed.
export const dynamicParams = false;

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
