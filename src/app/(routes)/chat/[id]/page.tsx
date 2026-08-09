import { SCENARIOS } from "@/data/scenarios";
import ChatView from "./ChatView";

/**
 * Pre-generate one static page per scenario so the dynamic route
 * `/chat/[id]` works in a static export (Capacitor / APK build).
 * In the normal web build this is simply an optimization.
 */
export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ id: s.id }));
}

// Always render on demand in dev; statically in export.
export const dynamicParams = false;

export default function Page({ params }: { params: { id: string } }) {
  return <ChatView scenarioId={params.id} />;
}
