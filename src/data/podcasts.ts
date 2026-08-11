import type { Story } from "@/types";

/**
 * Graded audio stories for the Podcasts section.
 *
 * Each story is short, A1-level, and sentence-segmented so the player can
 * highlight the line currently being spoken (live transcript). Every story
 * ends with a 3-question comprehension quiz.
 *
 * Tone: warm, vivid, and encouraging — never robotic.
 */
export const STORIES: Story[] = [
  /* ====================================================================== */
  {
    id: "lost-keys-cafe",
    title: "کلیدهای گم‌شده در کافه",
    description: "یک ماجرای طنز درباره‌ی پیدا کردن کلید گم‌شده تو کافه ☕",
    emoji: "☕",
    level: "A1",
    estimatedMinutes: 3,
    tags: ["daily", "funny", "cafe"],
    lines: [
      { en: "Tom goes to a small cafe every morning.", fa: "تام هر صبح به یک کافه‌ی کوچک می‌رود." },
      { en: "He loves coffee and croissants.", fa: "او عاشق قهوه و کرواسان است." },
      { en: "Today, he sits at his favorite table.", fa: "امروز، در میز محبوبش می‌نشیند." },
      { en: "He puts his keys on the table.", fa: "کلیدهایش را روی میز می‌گذارد." },
      { en: "Then his friend Sara walks in.", fa: "بعد دوستش سارا وارد می‌شود." },
      { en: "They talk and laugh for an hour.", fa: "آن‌ها یک ساعت صحبت می‌کنند و می‌خندند." },
      { en: "When Tom wants to leave, he looks for his keys.", fa: "وقتی تام می‌خواهد برود، دنبال کلیدهایش می‌گردد." },
      { en: "The keys are not on the table!", fa: "کلیدها روی میز نیستن!" },
      { en: "Tom is worried. 'Where are my keys?' he asks.", fa: "تام نگران است. می‌پرسد: «کلیدهایم کجان؟»" },
      { en: "Sara smiles and points at Tom's pocket.", fa: "سارا لبخند می‌زند و به جیب تام اشاره می‌کند." },
      { en: "The keys are in his pocket the whole time!", fa: "کلیدها همه‌ی این مدت در جیبش بودن!" },
      { en: "Tom laughs. 'I am so silly!' he says.", fa: "تام می‌خندد و می‌گوید: «من چقدر احمقانه رفتار کردم!»" },
      { en: "They drink one more coffee together.", fa: "آن‌ها با هم یک قهوه‌ی دیگر می‌نوشند." },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "تام هر صبح چه می‌خورد؟",
        options: ["چای و نان", "قهوه و کرواسان", "آب و سیب", "شیر و کیک"],
        correctIndex: 1,
        explain: "در متن آمده: He loves coffee and croissants.",
      },
      {
        id: "q2",
        prompt: "کلیدها آخر کار کجا بودند؟",
        options: ["روی میز", "زیر صندلی", "در جیب تام", "نزد سارا"],
        correctIndex: 2,
        explain: "سارا به جیب تام اشاره می‌کند — کلیدها آنجا بودن.",
      },
      {
        id: "q3",
        prompt: "تام در پایان چه می‌گوید؟",
        options: ["«من عصبانی‌ام!»", "«من خسته‌ام.»", "«من چقدر احمقانه بودم!»", "«من گرسنه‌ام.»"],
        correctIndex: 2,
        explain: "تاب می‌گوید: 'I am so silly!'",
      },
    ],
  },

  /* ====================================================================== */
  {
    id: "sara-london-trip",
    title: "اولین سفر سارا به لندن",
    description: "یک سفر هیجان‌انگیز به شهر لندن با سارا ✈️",
    emoji: "✈️",
    level: "A1",
    estimatedMinutes: 4,
    tags: ["travel", "adventure", "london"],
    lines: [
      { en: "Sara lives in a small town in Iran.", fa: "سارا در یک شهر کوچک در ایران زندگی می‌کند." },
      { en: "She has never been to another country.", fa: "او هرگز به کشور دیگری نرفته بود." },
      { en: "One day, she buys a ticket to London!", fa: "یک روز، بلیت لندن می‌خرد!" },
      { en: "She is very excited and a little nervous.", fa: "خیلی هیجان‌زده و کمی مضطرب است." },
      { en: "On the plane, she looks out the window.", fa: "در هواپیما، از پنجره بیرون را نگاه می‌کند." },
      { en: "She sees clouds and the blue sky.", fa: "ابرها و آسمان آبی را می‌بیند." },
      { en: "When she arrives, it is raining in London.", fa: "وقتی می‌رسد، در لندن باران می‌بارد." },
      { en: "But Sara smiles. She loves the rain.", fa: "ولی سارا لبخند می‌زند. او باران را دوست دارد." },
      { en: "She takes a big red bus to the city center.", fa: "با یک اتوبوس قرمز بزرگ به مرکز شهر می‌رود." },
      { en: "She sees Big Ben and the River Thames.", fa: "بیگ‌بن و رودخانه‌ی تِمز را می‌بیند." },
      { en: "She eats fish and chips for lunch.", fa: "برای ناهار فیش‌اندچیپس می‌خورد." },
      { en: "A friendly man asks, 'Do you like London?'", fa: "یک مرد مهربان می‌پرسد: «لندن را دوست داری؟»" },
      { en: "Sara says, 'Yes! I love it here!'", fa: "سارا می‌گوید: «بله! من اینجا را دوست دارم!»" },
      { en: "It is the best day of her life.", fa: "این بهترین روز زندگی‌اش است." },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "سارا کجا زندگی می‌کند؟",
        options: ["لندن", "پاریس", "یک شهر کوچک در ایران", "نیویورک"],
        correctIndex: 2,
        explain: "در متن: Sara lives in a small town in Iran.",
      },
      {
        id: "q2",
        prompt: "هوا در لندن چگونه بود؟",
        options: ["آفتابی", "برفی", "بارانی", "طوفانی"],
        correctIndex: 2,
        explain: "وقتی رسید، در لندن باران می‌بارید.",
      },
      {
        id: "q3",
        prompt: "سارا برای ناهار چه خورد؟",
        options: ["پیتزا", "فیش‌اندچیپس", "همبرگر", "سالاد"],
        correctIndex: 1,
        explain: "She eats fish and chips for lunch.",
      },
    ],
  },

  /* ====================================================================== */
  {
    id: "max-brave-dog",
    title: "مکس، سگ شجاع",
    description: "داستان صمیمی از یک سگ باهوش و وفادار 🐕",
    emoji: "🐕",
    level: "A1",
    estimatedMinutes: 3,
    tags: ["animals", "heartwarming", "family"],
    lines: [
      { en: "Max is a big brown dog.", fa: "مکس یک سگ قهوه‌ای بزرگ است." },
      { en: "He lives with a little girl named Lily.", fa: "او با یک دختر کوچک به نام لی‌لی زندگی می‌کند." },
      { en: "Max and Lily are best friends.", fa: "مکس و لی‌لی بهترین دوستان هستند." },
      { en: "Every day, they play in the garden.", fa: "هر روز در باغچه بازی می‌کنند." },
      { en: "One sunny afternoon, Lily finds a small cat.", fa: "یک عصر آفتابی، لی‌لی یک گربه‌ی کوچک پیدا می‌کند." },
      { en: "The cat is afraid and hungry.", fa: "گربه ترسیده و گرسنه است." },
      { en: "Lily wants to help the cat.", fa: "لی‌لی می‌خواهد به گربه کمک کند." },
      { en: "But a big noisy dog runs toward them!", fa: "ولی یک سگ بزرگ و سر و صداکنان به سمت آن‌ها می‌دود!" },
      { en: "Lily is scared.", fa: "لی‌لی می‌ترسد." },
      { en: "Max stands in front of Lily and the cat.", fa: "مکس جلوی لی‌لی و گربه می‌ایستد." },
      { en: "He barks loudly: 'Woof! Woof!'", fa: "با صدای بلند پارس می‌کند: «ووف! ووف!»" },
      { en: "The other dog runs away.", fa: "سگِ دیگر فرار می‌کند." },
      { en: "Lily hugs Max. 'You are so brave!' she says.", fa: "لی‌لی مکس را بغل می‌کند. می‌گوید: «تو خیلی شجاعی!»" },
      { en: "From that day, the cat lives with them too.", fa: "از آن روز، گربه هم با آن‌ها زندگی می‌کند." },
      { en: "Max is a hero.", fa: "مکس یک قهرمان است." },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "مکس چه سگی است؟",
        options: ["کوچک و سفید", "بزرگ و قهوه‌ای", "سیاه و کوچک", "زرد و بزرگ"],
        correctIndex: 1,
        explain: "Max is a big brown dog.",
      },
      {
        id: "q2",
        prompt: "چه اتفاقی افتاد که مکس شجاع شد؟",
        options: ["یک سگ بزرگ نزدیک شد", "گربه فرار کرد", "باران بارید", "لی‌لی گریه کرد"],
        correctIndex: 0,
        explain: "یک سگ بزرگ سر و صداکنان به سمتشان دوید و مکس جلوشان ایستاد.",
      },
      {
        id: "q3",
        prompt: "در پایان، چه کسی با آن‌ها زندگی می‌کند؟",
        options: ["فقط مکس", "گربه هم", "سگِ دیگر", "هیچ‌کس"],
        correctIndex: 1,
        explain: "From that day, the cat lives with them too.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

export function getStoryById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export const TOTAL_STORIES = STORIES.length;
