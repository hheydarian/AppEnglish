import type { CurriculumStage, Lesson } from "@/types";
import { A0_LESSON_CONTENT } from "./a0-content";
import { A1_LESSON_CONTENT } from "./a1-content";
import { A2_LESSON_CONTENT } from "./a2-content";
import { B1_LESSON_CONTENT } from "./b1-content";
import { B2_LESSON_CONTENT } from "./b2-content";
import { C1_LESSON_CONTENT } from "./c1-content";
import { C2_LESSON_CONTENT } from "./c2-content";

/**
 * The SpeakUp Learning Tree — a complete path from absolute zero (A0) to
 * mastery (C2). A0 is built out in full (4 units × 3 lessons, each with a
 * 4-step interactive flow). Higher levels reuse the simpler flat structure
 * until they get the same treatment.
 *
 * Tone rule: every description is warm, human, and encouraging — never robotic.
 */

/* ====================================================================== */
/*  A0 — Absolute Beginner (FULL: 4 units × 3 lessons)                    */
/* ====================================================================== */

const a0_lessons: Lesson[] = [
  /* ----- Unit 1: Alphabet, Sounds & Greetings ----- */
  {
    id: "a0-1-1",
    title: "حروف و صداهای الفبا",
    description: "با ۲۶ حرف آشنا شو و صدای هرکدوم رو بشنو. پایه‌ی همه‌چیز!",
    type: "alphabet",
    level: "A0",
    icon: "Type",
    estimatedMinutes: 8,
  },
  {
    id: "a0-1-2",
    title: "سلام و احوالپرسی",
    description: "اولین سلام‌ودرود روزمره رو یاد بگیر و با اعتماد‌به‌نفس بگو!",
    type: "phrase",
    level: "A0",
    icon: "Hand",
    estimatedMinutes: 7,
  },
  {
    id: "a0-1-3",
    title: "مکالمه: سلام و احوالپرسی",
    description: "بریم توی یک گفتگوی واقعی — خودت رو معرفی کن و سلام بده!",
    type: "roleplay",
    level: "A0",
    icon: "MessagesSquare",
    scenarioId: "casual-chat",
    estimatedMinutes: 6,
  },

  /* ----- Unit 2: Self-Introduction & Numbers ----- */
  {
    id: "a0-2-1",
    title: "اعداد ۱ تا ۲۰",
    description: "از یک تا بیست بشمار و سن‌ت رو بگو. خیلی راحت و سرگرم‌کننده!",
    type: "vocab",
    level: "A0",
    icon: "Hash",
    estimatedMinutes: 8,
  },
  {
    id: "a0-2-2",
    title: "معرفی خودت",
    description: "بگو اسم‌ت چیه، کی هستی و کجا زندگی می‌کنی. ساده و قدرتمند!",
    type: "grammar",
    level: "A0",
    icon: "UserRound",
    estimatedMinutes: 10,
  },
  {
    id: "a0-2-3",
    title: "مکالمه: معرفی به دوست جدید",
    description: "با یک دوست جدید آشنا شو و خودت رو کامل معرفی کن.",
    type: "roleplay",
    level: "A0",
    icon: "UserPlus",
    scenarioId: "casual-chat",
    estimatedMinutes: 6,
  },

  /* ----- Unit 3: Objects, Colors & Basic Commands ----- */
  {
    id: "a0-3-1",
    title: "رنگ‌ها و اشیاء",
    description: "در، صندلی، قرمز، آبی... دنیای اطرافت رو به انگلیسی بشناس!",
    type: "vocab",
    level: "A0",
    icon: "Palette",
    estimatedMinutes: 9,
  },
  {
    id: "a0-3-2",
    title: "این، آن، این‌ها، آن‌ها",
    description: "با This/That/These/Those به اشیاء اشاره کن. خیلی کاربردی!",
    type: "grammar",
    level: "A0",
    icon: "Pointer",
    estimatedMinutes: 10,
  },
  {
    id: "a0-3-3",
    title: "تمرین تعاملی: اشاره‌ها",
    description: "با یه تمرین صوتی و متنی همه‌چی رو تثبیت کن!",
    type: "challenge",
    level: "A0",
    icon: "Sparkles",
    estimatedMinutes: 8,
  },

  /* ----- Unit 4: Basic Needs & Café ----- */
  {
    id: "a0-4-1",
    title: "غذا و نوشیدنی",
    description: "آب، قهوه، لطفاً، ممنون... کلمات ضروری زندگی روزمره!",
    type: "vocab",
    level: "A0",
    icon: "Coffee",
    estimatedMinutes: 8,
  },
  {
    id: "a0-4-2",
    title: "درخواست‌های ساده",
    description: "«I'd like...» و «Can I have...» رو یاد بگیر و چیزی بخواه!",
    type: "grammar",
    level: "A0",
    icon: "HandHelping",
    estimatedMinutes: 10,
  },
  {
    id: "a0-4-3",
    title: "مکالمه: سفارش در کافه",
    description: "وای، رسیدیم به ماجرای واقعی! تو یه کافه قهوه سفارش بده. ☕",
    type: "roleplay",
    level: "A0",
    icon: "Coffee",
    scenarioId: "cafe-ordering",
    estimatedMinutes: 7,
  },
];

export const CURRICULUM: CurriculumStage[] = [
  {
    level: "A0",
    label: "صفر مطلق",
    subtitle: "از همینجا شروع کن — خیلی ساده و قدم‌به‌قدم.",
    icon: "Sparkles",
    accent: "sky",
    lessons: a0_lessons,
    units: [
      {
        id: "a0-u1",
        title: "الفبا، صداها و سلام‌ودرود",
        subtitle: "اولین قدم: آشنا شدن با زبان انگلیسی",
        icon: "Type",
        lessons: a0_lessons.slice(0, 3),
      },
      {
        id: "a0-u2",
        title: "معرفی خود و اعداد",
        subtitle: "بگو کی هستی و بشمار!",
        icon: "UserRound",
        lessons: a0_lessons.slice(3, 6),
      },
      {
        id: "a0-u3",
        title: "اشیاء، رنگ‌ها و اشاره‌ها",
        subtitle: "دنیای اطرافت رو به انگلیسی بشناس",
        icon: "Palette",
        lessons: a0_lessons.slice(6, 9),
      },
      {
        id: "a0-u4",
        title: "نیازهای اولیه و کافه",
        subtitle: "یاد بگیر چیزی بخواه و سفارش بده",
        icon: "Coffee",
        lessons: a0_lessons.slice(9, 12),
      },
    ],
  },

  /* ==================================================================== */
  /*  A1+ — placeholders (full build-out in later milestones)             */
  /* ==================================================================== */
  /*  A1 — Elementary (FULL: 4 units × 3 lessons)                         */
  /* ==================================================================== */
  {
    level: "A1",
    label: "مقدماتی",
    subtitle: "کارهای روزمره، خانواده، گذشته و خرید — حسابی جنبیده‌ای!",
    icon: "Sprout",
    accent: "emerald",
    lessons: [
      // Unit 1: Daily routines & present simple
      {
        id: "a1-1-1",
        title: "کلمات روزمره (۵۰ کلمه)",
        description: "از بیدار شدن تا خواب — تمام افعال پرکاربرد روزمره!",
        type: "vocab",
        level: "A1",
        icon: "BookOpen",
        estimatedMinutes: 15,
      },
      {
        id: "a1-1-2",
        title: "زمان حال ساده",
        description: "I work / He works / Do you...? / don't — قلب انگلیسی!",
        type: "grammar",
        level: "A1",
        icon: "Repeat",
        estimatedMinutes: 12,
      },
      {
        id: "a1-1-3",
        title: "مکالمه: کارهای روزمره",
        description: "با یه دوست درباره‌ی روتین روزانه‌ت حرف بزن.",
        type: "roleplay",
        level: "A1",
        icon: "MessagesSquare",
        estimatedMinutes: 8,
      },
      // Unit 2: Family, jobs & descriptions
      {
        id: "a1-2-1",
        title: "خانواده و مشاغل",
        description: "اعضای خانواده + ۱۵ شغل اصلی — از doctor تا engineer.",
        type: "vocab",
        level: "A1",
        icon: "Users",
        estimatedMinutes: 12,
      },
      {
        id: "a1-2-2",
        title: "صفات ملکی و توصیفی",
        description: "my/your/his/her + tall, kind, busy — توصیف کن!",
        type: "grammar",
        level: "A1",
        icon: "Heart",
        estimatedMinutes: 12,
      },
      {
        id: "a1-2-3",
        title: "مکالمه: خانواده و شغل",
        description: "خانواده و شغلت رو به یه دوست جدید معرفی کن.",
        type: "roleplay",
        level: "A1",
        icon: "UserRound",
        estimatedMinutes: 8,
      },
      // Unit 3: Past simple & vacations
      {
        id: "a1-3-1",
        title: "افعال گذشته",
        description: "باقاعده (played) و بی‌قاعده (went, saw, ate) — کامل!",
        type: "vocab",
        level: "A1",
        icon: "History",
        estimatedMinutes: 12,
      },
      {
        id: "a1-3-2",
        title: "گذشته + کلمات زمانی",
        description: "yesterday, last week, ago — خاطراتت رو تعریف کن.",
        type: "grammar",
        level: "A1",
        icon: "Clock",
        estimatedMinutes: 12,
      },
      {
        id: "a1-3-3",
        title: "مکالمه: آخرین تعطیلات",
        description: "خاطره‌ی آخرین سفر یا آخر هفته‌ات رو تعریف کن.",
        type: "roleplay",
        level: "A1",
        icon: "Plane",
        estimatedMinutes: 8,
      },
      // Unit 4: Directions, shopping & prices
      {
        id: "a1-4-1",
        title: "خرید و قیمت‌ها",
        description: "لباس‌ها، مغازه‌ها، How much و حراج — خرید حرفه‌ای!",
        type: "vocab",
        level: "A1",
        icon: "ShoppingBag",
        estimatedMinutes: 12,
      },
      {
        id: "a1-4-2",
        title: "آدرس‌دهی و مکان",
        description: "next to, turn left, go straight — تو شهر گم نشو!",
        type: "grammar",
        level: "A1",
        icon: "Navigation",
        estimatedMinutes: 12,
      },
      {
        id: "a1-4-3",
        title: "مکالمه: خرید و آدرس",
        description: "لباس بخر و آدرس بپرس — مثل یه بومی‌تبار!",
        type: "roleplay",
        level: "A1",
        icon: "MapPin",
        estimatedMinutes: 8,
      },
    ],
    units: [
      {
        id: "a1-u1",
        title: "کارهای روزمره و حال ساده",
        subtitle: "از صبح تا شب — به انگلیسی بگو چه می‌کنی",
        icon: "Repeat",
        lessons: [],
      },
      {
        id: "a1-u2",
        title: "خانواده و مشاغل",
        subtitle: "آشنایانت رو معرفی کن",
        icon: "Users",
        lessons: [],
      },
      {
        id: "a1-u3",
        title: "گذشته و تعطیلات",
        subtitle: "خاطراتت رو تعریف کن",
        icon: "History",
        lessons: [],
      },
      {
        id: "a1-u4",
        title: "خرید و آدرس‌دهی",
        subtitle: "تو شهر و مغازه راه برو",
        icon: "ShoppingBag",
        lessons: [],
      },
    ],
  },

  {
    level: "A2",
    label: "پیش‌متوسطه",
    subtitle: "گذشته، آینده، سلامت و تجربیات زندگی — حسابی پیشرفت کردی!",
    icon: "Leaf",
    accent: "emerald",
    lessons: [
      // Unit 1: Past simple & life events
      {
        id: "a2-1-1",
        title: "۲۰ فعل بی‌قاعده گذشته",
        description: "went, saw, ate, bought, felt... افعال پرکاربرد گذشته!",
        type: "vocab",
        level: "A2",
        icon: "History",
        estimatedMinutes: 12,
      },
      {
        id: "a2-1-2",
        title: "گذشته: سوال و منفی",
        description: "Did you...? / I didn't... — گذشته رو کامل کن!",
        type: "grammar",
        level: "A2",
        icon: "HelpCircle",
        estimatedMinutes: 12,
      },
      {
        id: "a2-1-3",
        title: "مکالمه: خاطره تعطیلات",
        description: "خاطره‌ی آخرین سفرت رو با AI تعریف کن!",
        type: "roleplay",
        level: "A2",
        icon: "Plane",
        estimatedMinutes: 8,
      },
      // Unit 2: Future plans & comparisons
      {
        id: "a2-2-1",
        title: "سفر و برنامه‌های آینده",
        description: "book a hotel, pack bags, flight ticket — سفر کن!",
        type: "vocab",
        level: "A2",
        icon: "Luggage",
        estimatedMinutes: 12,
      },
      {
        id: "a2-2-2",
        title: "مقایسه و be going to",
        description: "bigger than, the most famous + برنامه‌ی آینده!",
        type: "grammar",
        level: "A2",
        icon: "Scale",
        estimatedMinutes: 12,
      },
      {
        id: "a2-2-3",
        title: "مکالمه: برنامه‌ریزی سفر",
        description: "با AI برنامه‌ریزی سفر آینده‌ت رو انجام بده!",
        type: "roleplay",
        level: "A2",
        icon: "MapPinned",
        estimatedMinutes: 8,
      },
      // Unit 3: Health & advice
      {
        id: "a2-3-1",
        title: "سلامت و بیماری",
        description: "headache, fever, sore throat — علائم رو بشناس!",
        type: "vocab",
        level: "A2",
        icon: "HeartPulse",
        estimatedMinutes: 12,
      },
      {
        id: "a2-3-2",
        title: "توصیه با should/shouldn't",
        description: "You should rest / shouldn't smoke — نصیحت کن!",
        type: "grammar",
        level: "A2",
        icon: "Stethoscope",
        estimatedMinutes: 12,
      },
      {
        id: "a2-3-3",
        title: "مکالمه: ویزیت پزشک",
        description: "علایمت رو به دکتر AI بگو و توصیه بگیر!",
        type: "roleplay",
        level: "A2",
        icon: "Stethoscope",
        estimatedMinutes: 8,
      },
      // Unit 4: Present perfect & experiences
      {
        id: "a2-4-1",
        title: "تجربیات هیجان‌انگیز",
        description: "travel abroad, skydiving, meet someone famous!",
        type: "vocab",
        level: "A2",
        icon: "Trophy",
        estimatedMinutes: 12,
      },
      {
        id: "a2-4-2",
        title: "حال کامل ساده",
        description: "Have you ever...? / I have visited... — تجربیاتت!",
        type: "grammar",
        level: "A2",
        icon: "Sparkle",
        estimatedMinutes: 12,
      },
      {
        id: "a2-4-3",
        title: "مکالمه: تجربیات زندگی",
        description: "درباره‌ی تجربیات جابت با AI حرف بزن!",
        type: "roleplay",
        level: "A2",
        icon: "MessagesSquare",
        estimatedMinutes: 8,
      },
    ],
    units: [
      {
        id: "a2-u1",
        title: "گذشته و خاطرات",
        subtitle: "خاطراتت رو تعریف کن",
        icon: "History",
        lessons: [],
      },
      {
        id: "a2-u2",
        title: "آینده و سفر",
        subtitle: "برنامه‌ریزی کن",
        icon: "Luggage",
        lessons: [],
      },
      {
        id: "a2-u3",
        title: "سلامت و توصیه",
        subtitle: "مراقب خودت باش",
        icon: "HeartPulse",
        lessons: [],
      },
      {
        id: "a2-u4",
        title: "تجربیات زندگی",
        subtitle: "درباره‌ی تجربیاتت حرف بزن",
        icon: "Trophy",
        lessons: [],
      },
    ],
  },

  {
    level: "B1",
    label: "متوسط",
    subtitle: "۸ فصل جامع — از شخصیت تا شرطی‌ها، مجهول و نقل قول!",
    icon: "Plane",
    accent: "amber",
    lessons: [
      // Unit 1: Personality & relationships
      { id: "b1-1-1", title: "صفات شخصیت", description: "generous, reliable, stubborn... آدم‌ها رو توصیف کن!", type: "vocab", level: "B1", icon: "Users", estimatedMinutes: 12 },
      { id: "b1-1-2", title: "افعال عبارتی", description: "get along, look up to, make up... Phrasal Verbs!", type: "grammar", level: "B1", icon: "Link", estimatedMinutes: 14 },
      { id: "b1-1-3", title: "مکالمه: توصیف دوست", description: "دوستت رو با صفات شخصیت به AI توصیف کن!", type: "roleplay", level: "B1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 2: Housing
      { id: "b1-2-1", title: "اجاره و خانه", description: "rent, landlord, deposit, lease...", type: "vocab", level: "B1", icon: "Home", estimatedMinutes: 12 },
      { id: "b1-2-2", title: "ضرورت: Must/Have to", description: "must vs have to vs mustn't vs don't have to.", type: "grammar", level: "B1", icon: "ShieldAlert", estimatedMinutes: 14 },
      { id: "b1-2-3", title: "مکالمه: مشکل آپارتمان", description: "با صاحب‌خانه درباره‌ی مشکلات آپارتمان حرف بزن!", type: "roleplay", level: "B1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 3: Airport
      { id: "b1-3-1", title: "فرودگاه و گمرک", description: "boarding pass, gate, customs, duty-free...", type: "vocab", level: "B1", icon: "Plane", estimatedMinutes: 12 },
      { id: "b1-3-2", title: "شرطی نوع اول", description: "If + present, will + verb — احتمالات واقعی!", type: "grammar", level: "B1", icon: "GitBranch", estimatedMinutes: 14 },
      { id: "b1-3-3", title: "مکالمه: چک‌این فرودگاه", description: "پاسپورت، بلیط، گیت و گمرک — مثل حرفه‌ای‌ها!", type: "roleplay", level: "B1", icon: "Plane", estimatedMinutes: 8 },
      // Unit 4: Hotel
      { id: "b1-4-1", title: "هتل و شکایات", description: "reception, complaint, refund, room service...", type: "vocab", level: "B1", icon: "Building", estimatedMinutes: 12 },
      { id: "b1-4-2", title: "سوالات غیرمستقیم", description: "Could you tell me...? / I was wondering...", type: "grammar", level: "B1", icon: "HelpCircle", estimatedMinutes: 14 },
      { id: "b1-4-3", title: "مکالمه: شکایت هتل", description: "به مدیر هتل محترمانه شکایت کن!", type: "roleplay", level: "B1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 5: Job interview
      { id: "b1-5-1", title: "رزومه و نقاط قوت", description: "resume, strengths, qualifications, team player...", type: "vocab", level: "B1", icon: "Briefcase", estimatedMinutes: 12 },
      { id: "b1-5-2", title: "حال کامل استمراری", description: "have been doing — مدت زمان فعالیت!", type: "grammar", level: "B1", icon: "Clock", estimatedMinutes: 14 },
      { id: "b1-5-3", title: "مکالمه: مصاحبه شغلی", description: "تجربه‌ات رو به Alice بگو و سوال هوشمند بپرس!", type: "roleplay", level: "B1", icon: "Briefcase", estimatedMinutes: 8 },
      // Unit 6: Technology
      { id: "b1-6-1", title: "فناوری و رسانه", description: "software, AI, social media, device...", type: "vocab", level: "B1", icon: "Cpu", estimatedMinutes: 12 },
      { id: "b1-6-2", title: "مجهول (Passive)", description: "be + past participle — was built, is spoken!", type: "grammar", level: "B1", icon: "ArrowLeftRight", estimatedMinutes: 14 },
      { id: "b1-6-3", title: "مکالمه: فناوری و AI", description: "درباره‌ی آینده‌ی تکنولوژی و AI بحث کن!", type: "roleplay", level: "B1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 7: Opinions & debate
      { id: "b1-7-1", title: "ابراز عقیده", description: "In my opinion, I believe, on the other hand...", type: "vocab", level: "B1", icon: "MessageCircle", estimatedMinutes: 12 },
      { id: "b1-7-2", title: "نقل قول (Reported)", description: "He said that... / She told me... — backshift!", type: "grammar", level: "B1", icon: "Quote", estimatedMinutes: 14 },
      { id: "b1-7-3", title: "مکالمه: مناظره", description: "در یک بحث دوستانه نظرت رو دفاع کن!", type: "roleplay", level: "B1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 8: Wishes & conditionals
      { id: "b1-8-1", title: "اهداف و آرزوها", description: "goal, ambition, achieve, career, save up...", type: "vocab", level: "B1", icon: "Target", estimatedMinutes: 12 },
      { id: "b1-8-2", title: "شرطی نوع دوم", description: "If I were rich, I would... — خیال و فرض!", type: "grammar", level: "B1", icon: "Sparkles", estimatedMinutes: 14 },
      { id: "b1-8-3", title: "مکالمه: آرزوها", description: "درباره‌ی آرزوها و «اگرهای» زندگی‌ت حرف بزن!", type: "roleplay", level: "B1", icon: "MessagesSquare", estimatedMinutes: 8 },
    ],
    units: [
      { id: "b1-u1", title: "شخصیت و روابط", subtitle: "آدم‌ها رو بشناس", icon: "Users", lessons: [] },
      { id: "b1-u2", title: "مسکن و امکانات", subtitle: "خانه و اجاره", icon: "Home", lessons: [] },
      { id: "b1-u3", title: "فرودگاه و پرواز", subtitle: "سفر هوایی", icon: "Plane", lessons: [] },
      { id: "b1-u4", title: "هتل و شکایات", subtitle: "اقامت و مشکل‌حلی", icon: "Building", lessons: [] },
      { id: "b1-u5", title: "مصاحبه شغلی", subtitle: "حرفه‌ای شو", icon: "Briefcase", lessons: [] },
      { id: "b1-u6", title: "فناوری و اخبار", subtitle: "دنیای دیجیتال", icon: "Cpu", lessons: [] },
      { id: "b1-u7", title: "نظرات و مناظره", subtitle: "نظرت رو بگو", icon: "MessageCircle", lessons: [] },
      { id: "b1-u8", title: "آرزوها و فرض‌ها", subtitle: "ای کاش...", icon: "Target", lessons: [] },
    ],
  },

  /* ==================================================================== */
  /*  B2 — Upper-Intermediate (FULL: 8 units × 3 lessons)                 */
  /* ==================================================================== */
  {
    level: "B2",
    label: "متوسط پیشرفته",
    subtitle: "روان‌شناسی تا مذاکره، حقوق تا اقتصاد — سطح نزدیک به حرفه‌ای!",
    icon: "GraduationCap",
    accent: "violet",
    lessons: [
      // Unit 1: Psychology & behavior
      { id: "b2-1-1", title: "احساسات عمیق", description: "overwhelmed, empathy, intuition, resilient...", type: "vocab", level: "B2", icon: "Brain", estimatedMinutes: 12 },
      { id: "b2-1-2", title: "مدال‌های گذشته", description: "must have / could have / shouldn't have — حدس و سرزنش!", type: "grammar", level: "B2", icon: "Clock", estimatedMinutes: 14 },
      { id: "b2-1-3", title: "مکالمه: تحلیل تصمیم گذشته", description: "تصمیم گذشته‌ت رو تحلیل کن و مشاوره بگیر!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 2: Business & negotiation
      { id: "b2-2-1", title: "مذاکره تجاری", description: "stakeholder, leverage, counter-offer, ROI...", type: "vocab", level: "B2", icon: "Briefcase", estimatedMinutes: 12 },
      { id: "b2-2-2", title: "شرطی‌های ترکیبی", description: "If I had taken that job, I would be... — Mixed!", type: "grammar", level: "B2", icon: "GitBranch", estimatedMinutes: 14 },
      { id: "b2-2-3", title: "مکالمه: مذاکره قرارداد", description: "با مدیر فروش سر قرارداد و تخفیف چانه بزن!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 3: Law & ethics
      { id: "b2-3-1", title: "حقوق و جرم", description: "verdict, testimony, smuggling, defense...", type: "vocab", level: "B2", icon: "Scale", estimatedMinutes: 12 },
      { id: "b2-3-2", title: "مجهول پیشرفته", description: "It is believed that... / have something done!", type: "grammar", level: "B2", icon: "ArrowLeftRight", estimatedMinutes: 14 },
      { id: "b2-3-3", title: "مکالمه: دفاع حقوقی", description: "در نقش وکیل از موکلت دفاع کن!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 4: Media & critical thinking
      { id: "b2-4-1", title: "رسانه و تفکر انتقادی", description: "sensationalism, bias, clickbait, propaganda...", type: "vocab", level: "B2", icon: "Newspaper", estimatedMinutes: 12 },
      { id: "b2-4-2", title: "افعال گزاره‌ای", description: "claim, deny, urge, insist on + gerund!", type: "grammar", level: "B2", icon: "Quote", estimatedMinutes: 14 },
      { id: "b2-4-3", title: "مکالمه: تحلیل خبر", description: "اعتبار یک مقاله خبری رو با تحلیل‌گر بسنج!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 5: Biotech & medicine
      { id: "b2-5-1", title: "پزشکی و ژنتیک", description: "clinical trial, breakthrough, genetic, AI...", type: "vocab", level: "B2", icon: "Dna", estimatedMinutes: 12 },
      { id: "b2-5-2", title: "وارونگی (Inversion)", description: "Not only did we... / Seldom have I seen...", type: "grammar", level: "B2", icon: "ArrowUpDown", estimatedMinutes: 14 },
      { id: "b2-5-3", title: "مکالمه: اخلاق و AI", description: "درباره‌ی اخلاق در هوش مصنوعی بحث کن!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 6: Arts & criticism
      { id: "b2-6-1", title: "هنر و نقد", description: "masterpiece, aesthetic, contemporary, evoke...", type: "vocab", level: "B2", icon: "Palette", estimatedMinutes: 12 },
      { id: "b2-6-2", title: "جملات واره‌ای", description: "Having finished..., Having been praised...", type: "grammar", level: "B2", icon: "Scissors", estimatedMinutes: 14 },
      { id: "b2-6-3", title: "مکالمه: نقد اثر هنری", description: "یک کتاب یا فیلم معروف رو نقد کن!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 7: Economy & finance
      { id: "b2-7-1", title: "اقتصاد و سرمایه", description: "inflation, volatility, assets, recession...", type: "vocab", level: "B2", icon: "TrendingUp", estimatedMinutes: 12 },
      { id: "b2-7-2", title: "حسرت و آرزو", description: "I wish / If only / It's time we + past!", type: "grammar", level: "B2", icon: "Sparkles", estimatedMinutes: 14 },
      { id: "b2-7-3", title: "مکالمه: مشاور مالی", description: "با مشاور مالی برنامه‌ی سرمایه‌گذاری بچین!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 8: Debate & public speaking
      { id: "b2-8-1", title: "پیوندهای منطقی", description: "furthermore, in contrast, nevertheless...", type: "vocab", level: "B2", icon: "Link", estimatedMinutes: 12 },
      { id: "b2-8-2", title: "جملات شکافته", description: "What surprised me was... / It was X that...", type: "grammar", level: "B2", icon: "Highlighter", estimatedMinutes: 14 },
      { id: "b2-8-3", title: "مکالمه: مناظره بین‌المللی", description: "در کنفرانس بین‌المللی مناظره کن!", type: "roleplay", level: "B2", icon: "MessagesSquare", estimatedMinutes: 8 },
    ],
    units: [
      { id: "b2-u1", title: "روان‌شناسی و احساسات", subtitle: "رفتار آدم‌ها", icon: "Brain", lessons: [] },
      { id: "b2-u2", title: "مذاکره تجاری", subtitle: "محیط کار حرفه‌ای", icon: "Briefcase", lessons: [] },
      { id: "b2-u3", title: "حقوق و اخلاق", subtitle: "قانون و جرم", icon: "Scale", lessons: [] },
      { id: "b2-u4", title: "رسانه و انتقاد", subtitle: "تفکر نقادانه", icon: "Newspaper", lessons: [] },
      { id: "b2-u5", title: "پزشکی و آینده", subtitle: "بیوتکنولوژی", icon: "Dna", lessons: [] },
      { id: "b2-u6", title: "هنر و ادبیات", subtitle: "نقد فرهنگی", icon: "Palette", lessons: [] },
      { id: "b2-u7", title: "اقتصاد جهانی", subtitle: "سرمایه‌گذاری", icon: "TrendingUp", lessons: [] },
      { id: "b2-u8", title: "مناظره پیشرفته", subtitle: "سخنرانی رسمی", icon: "Mic", lessons: [] },
    ],
  },

  /* ==================================================================== */
  /*  C1 — Advanced (FULL: 8 units × 3 lessons)                           */
  /* ==================================================================== */
  {
    level: "C1",
    label: "پیشرفته",
    subtitle: "دیپلماسی، فلسفه، اقتصاد کلان و نگارش آکادمیک — سطح C1!",
    icon: "Award",
    accent: "cyan",
    lessons: [
      // Unit 1: Diplomacy & hedging
      { id: "c1-1-1", title: "تعدیل کلام (Hedging)", description: "It is plausible that, arguably, tentative...", type: "vocab", level: "C1", icon: "Scale", estimatedMinutes: 12 },
      { id: "c1-1-2", title: "وجه التزامی", description: "I recommend that he be... / It is imperative...", type: "grammar", level: "C1", icon: "Crown", estimatedMinutes: 14 },
      { id: "c1-1-3", title: "مکالمه: میانجی‌گری تجاری", description: "در مناقشه‌ی دو شرکت بین‌المللی میانجی باش!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 2: Philosophy & AI ethics
      { id: "c1-2-1", title: "فلسفه و شناخت", description: "epistemology, sentience, paradigm shift...", type: "vocab", level: "C1", icon: "Brain", estimatedMinutes: 12 },
      { id: "c1-2-2", title: "شرطی‌های وارونه", description: "Had we anticipated... / Were it not for...", type: "grammar", level: "C1", icon: "GitBranch", estimatedMinutes: 14 },
      { id: "c1-2-3", title: "مکالمه: اخلاق AI", description: "با پژوهشگر درباره‌ی AI خودمختار مناظره کن!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 3: Geopolitics & climate
      { id: "c1-3-1", title: "ژئوپلیتیک و اقلیم", description: "sovereignty, net-zero, multilateral...", type: "vocab", level: "C1", icon: "Globe", estimatedMinutes: 12 },
      { id: "c1-3-2", title: "پیوندهای رسمی", description: "notwithstanding, whereby, henceforth...", type: "grammar", level: "C1", icon: "Link", estimatedMinutes: 14 },
      { id: "c1-3-3", title: "مکالمه: سخنرانی دیپلماتیک", description: "در نشست شبیه‌سازی‌شده‌ی سازمان ملل سخنرانی کن!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 4: Macroeconomics & fintech
      { id: "c1-4-1", title: "اقتصاد کلان و فین‌تک", description: "liquidity, systemic risk, quantitative easing...", type: "vocab", level: "C1", icon: "TrendingUp", estimatedMinutes: 12 },
      { id: "c1-4-2", title: "وارونگی منفی", description: "Under no circumstances will we... — تأکید!", type: "grammar", level: "C1", icon: "ArrowUpDown", estimatedMinutes: 14 },
      { id: "c1-4-3", title: "مکالمه: استراتژی ریسک", description: "استراتژی مدیریت ریسک رو به هیئت‌مدیره ارائه کن!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 5: Neuroscience
      { id: "c1-5-1", title: "علوم اعصاب", description: "cognitive dissonance, neuroplasticity, bias...", type: "vocab", level: "C1", icon: "Dna", estimatedMinutes: 12 },
      { id: "c1-5-2", title: "مجهول آکادمیک", description: "It is widely purported that / There is believed...", type: "grammar", level: "C1", icon: "ArrowLeftRight", estimatedMinutes: 14 },
      { id: "c1-5-3", title: "مکالمه: مطالعه موردی", description: "مطالعه موردی روان‌شناختی رو تحلیل کن!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 6: Literary devices
      { id: "c1-6-1", title: "کنایه و استعاره", description: "double entendre, satirical, juxtaposition...", type: "vocab", level: "C1", icon: "BookOpen", estimatedMinutes: 12 },
      { id: "c1-6-2", title: "اسمی‌سازی", description: "The rapid deterioration of... — فشرده‌سازی!", type: "grammar", level: "C1", icon: "Package", estimatedMinutes: 14 },
      { id: "c1-6-3", title: "مکالمه: نقد ادبی", description: "رمان معاصری رو با منتقد نقد کن!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 7: Urbanism & futurism
      { id: "c1-7-1", title: "شهرسازی پایدار", description: "biophilic, urban sprawl, carbon footprint...", type: "vocab", level: "C1", icon: "Trees", estimatedMinutes: 12 },
      { id: "c1-7-2", title: "بندهای پیراسته", description: "When evaluating... / Although controversial...", type: "grammar", level: "C1", icon: "Scissors", estimatedMinutes: 14 },
      { id: "c1-7-3", title: "مکالمه: شورای شهر", description: "پروژه‌ی شهر هوشمند رو در شورا دفاع کن!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 8: Scholarly discourse
      { id: "c1-8-1", title: "نگارش آکادمیک", description: "empirical, methodology, discrepancy, validity...", type: "vocab", level: "C1", icon: "FlaskConical", estimatedMinutes: 12 },
      { id: "c1-8-2", title: "پیوندهای علّی سطح بالا", description: "Notwithstanding, Inasmuch as, Hitherto...", type: "grammar", level: "C1", icon: "Quote", estimatedMinutes: 14 },
      { id: "c1-8-3", title: "مکالمه: دفاعیه دکتری", description: "پروپوزال پژوهشیت رو به کمیته دفاع کن!", type: "roleplay", level: "C1", icon: "MessagesSquare", estimatedMinutes: 8 },
    ],
    units: [
      { id: "c1-u1", title: "دیپلماسی و ظرافت کلام", subtitle: "کلام دیپلماتیک", icon: "Scale", lessons: [] },
      { id: "c1-u2", title: "فلسفه و اخلاق AI", subtitle: "ذهن و ماشین", icon: "Brain", lessons: [] },
      { id: "c1-u3", title: "ژئوپلیتیک و اقلیم", subtitle: "دیپلماسی جهانی", icon: "Globe", lessons: [] },
      { id: "c1-u4", title: "اقتصاد کلان", subtitle: "فین‌تک و بازار", icon: "TrendingUp", lessons: [] },
      { id: "c1-u5", title: "علوم اعصاب", subtitle: "شناخت رفتار", icon: "Dna", lessons: [] },
      { id: "c1-u6", title: "ادبیات و طنز", subtitle: "کنایه و ظرافت", icon: "BookOpen", lessons: [] },
      { id: "c1-u7", title: "شهر پایدار", subtitle: "آینده‌سازی", icon: "Trees", lessons: [] },
      { id: "c1-u8", title: "نگارش آکادمیک", subtitle: "دفاعیه پژوهش", icon: "FlaskConical", lessons: [] },
    ],
  },

  /* ==================================================================== */
  /*  C2 — Mastery & Native Fluency (FINAL: 8 units × 3 lessons)          */
  /* ==================================================================== */
  {
    level: "C2",
    label: "تسلط کامل",
    subtitle: "آرگو، بلاغت، حقوق و آزمون نهایی استادی — درخت یادگیری کامل می‌شود!",
    icon: "Crown",
    accent: "rose",
    lessons: [
      // Unit 1: Slang & street wit
      { id: "c2-1-1", title: "آرگو و اصطلاحات بومی", description: "banter, dodge a bullet, through the grapevine...", type: "vocab", level: "C2", icon: "MessagesSquare", estimatedMinutes: 12 },
      { id: "c2-1-2", title: "حذف‌های گفتار بومی", description: "Seen him lately? / No point doing that — Ellipsis!", type: "grammar", level: "C2", icon: "Scissors", estimatedMinutes: 14 },
      { id: "c2-1-3", title: "مکالمه: گپ دوستانه", description: "با یه بومی واقعی گپ بزن و شوخی کن!", type: "roleplay", level: "C2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 2: Irony & puns
      { id: "c2-2-1", title: "کنایه و بازی کلمات", description: "pun, tongue-in-cheek, deadpan, sardonic...", type: "vocab", level: "C2", icon: "Theater", estimatedMinutes: 12 },
      { id: "c2-2-2", title: "تناقض‌نما و کم‌گویی", description: "Deafening silence / Not bad at all! — ظرافت!", type: "grammar", level: "C2", icon: "Contrast", estimatedMinutes: 14 },
      { id: "c2-2-3", title: "مکالمه: استندآپ کمدی", description: "بداهه‌گویی و شوخی با کمدین!", type: "roleplay", level: "C2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 3: Rhetoric & oratory
      { id: "c2-3-1", title: "آرایه‌های سخنوری", description: "anaphora, chiasmus, hypophora, antithesis...", type: "vocab", level: "C2", icon: "Mic", estimatedMinutes: 12 },
      { id: "c2-3-2", title: "قانون سه‌گانه", description: "We shall fight, we shall strive, we shall conquer!", type: "grammar", level: "C2", icon: "ListOrdered", estimatedMinutes: 14 },
      { id: "c2-3-3", title: "مکالمه: نطق انگیزشی", description: "مانیفستت رو با بلاغت دفاع کن!", type: "roleplay", level: "C2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 4: Literary grandeur
      { id: "c2-4-1", title: "میراث شکسپیر", description: "brave new world, heart of gold, wild-goose chase...", type: "vocab", level: "C2", icon: "Feather", estimatedMinutes: 12 },
      { id: "c2-4-2", title: "ساختارهای کهن", description: "Be that as it may / Come what may — فاخره!", type: "grammar", level: "C2", icon: "Scroll", estimatedMinutes: 14 },
      { id: "c2-4-3", title: "مکالمه: مشاعره نثری", description: "با استاد ادبیات زیبایی‌شناسی کن!", type: "roleplay", level: "C2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 5: Legalese
      { id: "c2-5-1", title: "زبان حقوقی", description: "indemnify, force majeure, in perpetuity...", type: "vocab", level: "C2", icon: "Scale", estimatedMinutes: 12 },
      { id: "c2-5-2", title: "شرطی‌های قراردادی", description: "Herein / Whereby / Provided that...", type: "grammar", level: "C2", icon: "FileText", estimatedMinutes: 14 },
      { id: "c2-5-3", title: "مکالمه: وکیل ارشد", description: "بندهای قرارداد سرمایه‌گذاری رو بازبینی کن!", type: "roleplay", level: "C2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 6: Crisis communication
      { id: "c2-6-1", title: "خنثی‌سازی حمله کلامی", description: "deflect, spin doctor, ad hominem, straw man...", type: "vocab", level: "C2", icon: "ShieldAlert", estimatedMinutes: 12 },
      { id: "c2-6-2", title: "محورچرخانی دیپلماتیک", description: "That raises a broader question... — تکنیک!", type: "grammar", level: "C2", icon: "Compass", estimatedMinutes: 14 },
      { id: "c2-6-3", title: "مکالمه: کنفرانس بحران", description: "به خبرنگاران پرشور در بحران جواب بده!", type: "roleplay", level: "C2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 7: Interpretation
      { id: "c2-7-1", title: "ترجمه‌ناپذیرها", description: "culture-bound idioms, false friends, calque...", type: "vocab", level: "C2", icon: "Languages", estimatedMinutes: 12 },
      { id: "c2-7-2", title: "بازآفرینی معنا", description: "Dynamic equivalence / chunking / anticipation!", type: "grammar", level: "C2", icon: "ArrowLeftRight", estimatedMinutes: 14 },
      { id: "c2-7-3", title: "مکالمه: ترجمه هم‌زمان", description: "سخنرانی رو در اجلاس دوزبانه ترجمه کن!", type: "roleplay", level: "C2", icon: "MessagesSquare", estimatedMinutes: 8 },
      // Unit 8: Grandmaster's crucible
      { id: "c2-8-1", title: "واژگان غایی استادی", description: "epitome, serendipity, ephemeral, ubiquitous...", type: "vocab", level: "C2", icon: "Crown", estimatedMinutes: 12 },
      { id: "c2-8-2", title: "ترکیب ساختارها", description: "Inversion + Subjunctive + Cleft در یک بند!", type: "grammar", level: "C2", icon: "Sparkles", estimatedMinutes: 14 },
      { id: "c2-8-3", title: "مکالمه: آزمون استادی", description: "مکالمه آزاد چندموضوعی → نشان استادی زبان! 👑", type: "roleplay", level: "C2", icon: "Trophy", estimatedMinutes: 10 },
    ],
    units: [
      { id: "c2-u1", title: "آرگو و طنز کوچه", subtitle: "گفتار بومی", icon: "MessagesSquare", lessons: [] },
      { id: "c2-u2", title: "کنایه و شوخی", subtitle: "طنز چندلایه", icon: "Theater", lessons: [] },
      { id: "c2-u3", title: "بلاغت و سخنوری", subtitle: "متقاعدسازی", icon: "Mic", lessons: [] },
      { id: "c2-u4", title: "ادبیات کهن", subtitle: "میراث شکسپیر", icon: "Feather", lessons: [] },
      { id: "c2-u5", title: "زبان حقوقی", subtitle: "قرارداد فاخر", icon: "Scale", lessons: [] },
      { id: "c2-u6", title: "مدیریت بحران", subtitle: "مناظره تند", icon: "ShieldAlert", lessons: [] },
      { id: "c2-u7", title: "ترجمه و ظرافت", subtitle: "مفاهیم نایاب", icon: "Languages", lessons: [] },
      { id: "c2-u8", title: "آزمون استادی", subtitle: "نشان نهایی 👑", icon: "Trophy", lessons: [] },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Flat list of every lesson, in order. */
export const ALL_LESSONS: Lesson[] = CURRICULUM.flatMap((s) => s.lessons);

/** Look up a single lesson by id. */
export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

/** A given level's stage. */
export function getStageByLevel(level: CurriculumStage["level"]) {
  return CURRICULUM.find((s) => s.level === level);
}

/** Total lesson count across the whole curriculum. */
export const TOTAL_LESSONS = ALL_LESSONS.length;

/**
 * The golden finale of the learning tree — rendered after C2 on the homepage
 * as a distinct diamond/gold card linking to the certification exam.
 */
export const GRAND_EXAM = {
  href: "/exam",
  oralHref: "/chat/exam-oral",
  title: "آزمون نهایی استادی",
  subtitle: "۴ مهارت، استاندارد IELTS/CEFR — گواهی تسلط بگیر!",
} as const;

/**
 * Get the interactive content (4-step flow) for a lesson.
 * Falls back to undefined for roleplay-only lessons (they go straight to chat).
 */
export function getLessonContent(
  lessonId: string
): import("@/types").LessonContent | undefined {
  const all: Record<string, import("@/types").LessonContent> = {
    ...A0_LESSON_CONTENT,
    ...A1_LESSON_CONTENT,
    ...A2_LESSON_CONTENT,
    ...B1_LESSON_CONTENT,
    ...B2_LESSON_CONTENT,
    ...C1_LESSON_CONTENT,
    ...C2_LESSON_CONTENT,
  };
  return all[lessonId];
}
