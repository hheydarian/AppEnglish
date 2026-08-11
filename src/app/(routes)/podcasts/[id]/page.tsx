import { STORIES } from "@/data/podcasts";
import { StoryPlayer } from "@/components/podcast/StoryPlayer";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = STORIES.find((s) => s.id === id);
  if (!story) return <div className="p-8 text-center">داستان پیدا نشد.</div>;
  return <StoryPlayer story={story} />;
}
