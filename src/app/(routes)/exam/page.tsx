import { ExamView } from "./ExamView";

export const metadata = {
  title: "آزمون نهایی استادی",
  description: "آزمون جامع تعیین سطح و گواهی تسلط SpeakUp",
};

/**
 * The Grand Mastery Exam — a fully client-side certification flow
 * (intro → 4 skill sections → score + digital certificate).
 */
export default function ExamPage() {
  return <ExamView />;
}
