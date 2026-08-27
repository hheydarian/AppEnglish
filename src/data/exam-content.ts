import type { MasteryExam } from "@/types";

/**
 * The Grand Mastery Exam — ZabanYar's final certification.
 *
 * Modeled on IELTS/TOEFL task types across four skills:
 *   1. Listening (TTS narration, 2× US + 2× UK accents)
 *   2. Use of English (advanced grammar & lexicon)
 *   3. Syntax (sentence arrangement, validated with normalizeText)
 *   4. Speaking (3-tier oral interview with The Chief Examiner)
 *
 * Tone: formal-but-warm exam copy; Persian prompts, English stimuli —
 * every English string renders inside an isolated LTR container in the UI.
 */
export const MASTERY_EXAM: MasteryExam = {
  /* ==================================================================== */
  /*  Section 1 — Listening & Accent Comprehension (4 tasks, 8 questions)  */
  /* ==================================================================== */
  listening: [
    {
      id: "lsn-1",
      accent: "us",
      context: "پیام اعلام فرودگاه — به لهجه‌ی آمریکایی 🇺🇸 گوش بده",
      passage:
        "Attention, please. Flight UA forty-two to Chicago is now boarding at gate B seven. Passengers seated in rows one through fifteen may board at this time. We kindly remind all travelers that carry-on liquids must fit inside a one-quart bag. The final boarding call will be announced in twenty minutes.",
      questions: [
        {
          id: "lsn-1-q1",
          prompt: "پرواز به کدام شهر اعزام می‌شود؟",
          options: ["Boston", "Chicago", "Denver", "Seattle"],
          correctIndex: 1,
        },
        {
          id: "lsn-1-q2",
          prompt: "کدام ردیف‌ها هم‌اکنون می‌توانند سوار شوند؟",
          options: ["Rows 1–15", "Rows 16–30", "All rows", "Business class only"],
          correctIndex: 0,
        },
      ],
    },
    {
      id: "lsn-2",
      accent: "us",
      context: "تک‌گویی یک کارآفرین — به لهجه‌ی آمریکایی 🇺🇸 گوش بده",
      passage:
        "When I started my first company, I made every mistake in the book. I hired too fast, I chased every shiny opportunity, and I nearly ran out of money twice. But looking back, those failures taught me something no business school ever could: resilience matters more than brilliance. If I had played it safe, I would never have learned what I was truly capable of.",
      questions: [
        {
          id: "lsn-2-q1",
          prompt: "بنا بر گوینده، مهم‌تر از نبوغ چه چیزی است؟",
          options: ["Luck", "Resilience", "Capital", "Talent"],
          correctIndex: 1,
        },
        {
          id: "lsn-2-q2",
          prompt: "گوینده چه اشتباهی را ذکر می‌کند؟",
          options: [
            "Hiring too fast and chasing every opportunity",
            "Refusing outside investment",
            "Ignoring his customers",
            "Studying business too long",
          ],
          correctIndex: 0,
        },
      ],
    },
    {
      id: "lsn-3",
      accent: "uk",
      context: "گفت‌وگوی دانشگاهی — به لهجه‌ی بریتانیایی 🇬🇧 گوش بده",
      passage:
        "Good morning, everyone. Today's lecture examines the Industrial Revolution, which, contrary to popular belief, unfolded at a rather gradual pace. Whilst steam power transformed textile production, it wasn't until the arrival of the railways that ordinary lives were fundamentally altered. Historians now argue the revolution was less a sudden explosion and more a steady tide.",
      questions: [
        {
          id: "lsn-3-q1",
          prompt: "برخلاف باور رایج، انقلاب صنعتی چگونه رخ داد؟",
          options: [
            "Suddenly, like an explosion",
            "At a gradual pace, like a steady tide",
            "Only after the railways",
            "Over a single decade",
          ],
          correctIndex: 1,
        },
        {
          id: "lsn-3-q2",
          prompt: "مورخان چه چیزی را دگرگون‌کننده‌ی زندگی عادی مردم می‌دانند؟",
          options: ["Steam power", "Textile mills", "The railways", "Coal mining"],
          correctIndex: 2,
        },
      ],
    },
    {
      id: "lsn-4",
      accent: "uk",
      context: "گزارش رادیویی محیط زیست — به لهجه‌ی بریتانیایی 🇬🇧 گوش بده",
      passage:
        "Here in the Norfolk wetlands, a remarkable recovery is underway. The beaver, hunted to extinction in Britain four centuries ago, has been quietly reintroduced — and the effects are astonishing. Their dams have created new ponds, which in turn have attracted rare birds and amphibians. Conservationists describe the species as nature's engineers, restoring habitats no human team could replicate so swiftly.",
      questions: [
        {
          id: "lsn-4-q1",
          prompt: "به سگ‌های آبی چه لقبی داده‌اند؟",
          options: ["Nature's engineers", "River kings", "Wetland doctors", "Silent builders"],
          correctIndex: 0,
        },
        {
          id: "lsn-4-q2",
          prompt: "سدهای سگ آبی چه نتیجه‌ای داشته است؟",
          options: [
            "Flooding of farmland",
            "New ponds attracting rare birds and amphibians",
            "Extinction of local fish",
            "Drier wetlands",
          ],
          correctIndex: 1,
        },
      ],
    },
  ],

  /* ==================================================================== */
  /*  Section 2 — Use of English & Lexicon (10 questions)                  */
  /* ==================================================================== */
  useOfEnglish: [
    {
      id: "ue-1",
      prompt: "The committee insisted that the report ___ before Friday.",
      options: ["is submitted", "be submitted", "was submitted", "would submit"],
      correctIndex: 1,
    },
    {
      id: "ue-2",
      prompt: "Not only ___ the deadline, but she also exceeded every expectation.",
      options: ["she met", "did she meet", "she did meet", "met she"],
      correctIndex: 1,
    },
    {
      id: "ue-3",
      prompt: "If I ___ that job offer, I would be living in Tokyo now.",
      options: ["accepted", "had accepted", "would accept", "have accepted"],
      correctIndex: 1,
    },
    {
      id: "ue-4",
      prompt: "The negotiations ___ completely after weeks of stalemate.",
      options: ["broke in", "broke off", "broke down", "broke up"],
      correctIndex: 2,
    },
    {
      id: "ue-5",
      prompt: "The findings ___ serious doubts about the methodology.",
      options: ["raise", "rise", "lift", "grow"],
      correctIndex: 0,
    },
    {
      id: "ue-6",
      prompt: "___ the persistence of the team that ultimately secured the contract.",
      options: ["What was", "There was", "It was", "That was"],
      correctIndex: 2,
    },
    {
      id: "ue-7",
      prompt: "___ his indisputable talent, the board declined to renew his contract.",
      options: ["Despite of", "Notwithstanding", "Although", "However"],
      correctIndex: 1,
    },
    {
      id: "ue-8",
      prompt: "She ___ ever having signed the document.",
      options: ["refused", "denied", "rejected", "declined"],
      correctIndex: 1,
    },
    {
      id: "ue-9",
      prompt: "We ___ the premises thoroughly inspected before signing the lease.",
      options: ["had", "made", "got to", "took"],
      correctIndex: 0,
    },
    {
      id: "ue-10",
      prompt: "You ___ told me earlier — I could have helped.",
      options: ["must have", "should have", "would have", "could"],
      correctIndex: 1,
    },
  ],

  /* ==================================================================== */
  /*  Section 3 — Syntax & Sentence Arrangement (5 tasks)                  */
  /* ==================================================================== */
  syntax: [
    {
      id: "syn-1",
      prompt: "جمله‌ی رسمی با وارونگی منفی بساز:",
      words: ["Under", "no", "circumstances", "should", "the", "data", "be", "shared"],
      correctSentence: "Under no circumstances should the data be shared",
    },
    {
      id: "syn-2",
      prompt: "ترکیب وارونگی + نقص را کامل کن:",
      words: ["Not", "only", "did", "the", "scheme", "collapse", ",", "but", "it", "also", "bankrupted", "the", "firm"],
      correctSentence: "Not only did the scheme collapse, but it also bankrupted the firm",
    },
    {
      id: "syn-3",
      prompt: "وجه التزامی رسمی را بچین:",
      words: ["It", "is", "imperative", "that", "every", "candidate", "be", "notified"],
      correctSentence: "It is imperative that every candidate be notified",
    },
    {
      id: "syn-4",
      prompt: "شرطی وارونه‌ی گذشته را بساز:",
      words: ["Had", "the", "audit", "been", "thorough", ",", "the", "fraud", "would", "have", "surfaced"],
      correctSentence: "Had the audit been thorough, the fraud would have surfaced",
    },
    {
      id: "syn-5",
      prompt: "جمله‌ی شکافته‌ی استادی را مرتب کن:",
      words: ["What", "distinguishes", "mastery", "is", "the", "deployment", "of", "precise", "vocabulary"],
      correctSentence: "What distinguishes mastery is the deployment of precise vocabulary",
    },
  ],

  /* ==================================================================== */
  /*  Section 4 — AI Oral Proficiency Interview (3 tiers)                  */
  /* ==================================================================== */
  oral: [
    {
      id: "oral-1",
      tier: "describe",
      question: "Describe a decision you once made that significantly changed the direction of your life. What did you choose, and what happened as a result?",
      questionFa: "تصمیمی که مسیر زندگی‌ات را عوض کرد را توصیف کن — چه انتخابی کردی و نتیجه چه شد؟",
    },
    {
      id: "oral-2",
      tier: "analyze",
      question: "Analyze why effective communication so often breaks down across cultures. Identify two or three underlying causes and explain how they interact.",
      questionFa: "تحلیل کن چرا ارتباط مؤثر میان فرهنگ‌ها اغلب شکست می‌خورد — دو سه علت ریشه‌ای و تعاملشان را توضیح بده.",
    },
    {
      id: "oral-3",
      tier: "evaluate",
      question: "In your considered view, is mastery of a language the same thing as mastery of thought? Weigh both sides and conclude with a reasoned position.",
      questionFa: "آیا تسلط بر زبان همان تسلط بر اندیشه است؟ دو سو را بسنج و با استدلال نتیجه بگیر.",
    },
  ],
};

/** Total objective (auto-gradable) points across sections 1–3. */
export const EXAM_OBJECTIVE_POINTS =
  MASTERY_EXAM.listening.reduce((n, t) => n + t.questions.length, 0) +
  MASTERY_EXAM.useOfEnglish.length +
  MASTERY_EXAM.syntax.length;
