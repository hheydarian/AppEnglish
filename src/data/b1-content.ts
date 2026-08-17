import type { LessonContent } from "@/types";

/**
 * FULL senior-instructor content for the 16 non-roleplay B1 lessons.
 *
 * Compliance: Oxford English File Intermediate. No omissions.
 * 8 units × 3 lessons = 24 total. Lessons 1&2 of each unit are interactive;
 * lesson 3 is roleplay (no entry here — launches straight to AI chat).
 */
export const B1_LESSON_CONTENT: Record<string, LessonContent> = {
  /* ===== Unit 1: Personality & Relationships ===== */
  "b1-1-1": {
    lessonId: "b1-1-1",
    vocabulary: [
      { term: "generous", phonetic: "ˈdʒenərəs", meaning: "سخاوتمند", example: "He is very generous.", emoji: "🤲" },
      { term: "reliable", phonetic: "rɪˈlaɪəbl", meaning: "قابل اعتماد", example: "She is a reliable friend.", emoji: "🤝" },
      { term: "stubborn", phonetic: "ˈstʌbərn", meaning: "خودسر/لجباز", example: "Don't be so stubborn!", emoji: "😤" },
      { term: "sensitive", phonetic: "ˈsensətɪv", meaning: "حساس", example: "He's sensitive about his weight.", emoji: "💞" },
      { term: "ambitious", phonetic: "æmˈbɪʃəs", meaning: "بلندپرواز", example: "She is very ambitious.", emoji: "🚀" },
      { term: "easygoing", phonetic: "ˈiːziˌɡoʊɪŋ", meaning: "بی‌دغدغه/آسان‌گیر", example: "My boss is easygoing.", emoji: "😎" },
      { term: "honest", phonetic: "ˈɑːnɪst", meaning: "صادق", example: "Tell me the honest truth.", emoji: "💯" },
      { term: "moody", phonetic: "ˈmuːdi", meaning: "متقلب‌مزاج", example: "He gets moody sometimes.", emoji: "☁️" },
    ],
    grammar: {
      rule: "Personality adjectives + modifiers: really / quite / a bit",
      explanation:
        "برای توصیف شخصیت از صفات استفاده می‌کنیم و می‌توانیم شدت را با really (خیلی)، quite (تا حدی)، a bit (کمی) تغییر دهیم: She's really generous. He's a bit stubborn.",
      examples: ["She's really reliable.", "He's quite ambitious.", "My brother is a bit moody."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«قابل اعتماد» کدام صفت است؟", options: ["stubborn", "reliable", "moody", "generous"], correctIndex: 1, explain: "reliable = قابل اعتماد." },
      { id: "q2", kind: "word-order", prompt: "بگو: او خیلی سخاوتمند است.", words: ["really", "She", "is", "generous", "."], correctSentence: "She is really generous.", explain: "ترتیب: Subject + is + modifier + adjective." },
      { id: "q3", kind: "multiple-choice", prompt: "مخالف «easygoing» (آسان‌گیر) چیست؟", options: ["relaxed", "stubborn", "kind", "honest"], correctIndex: 1, explain: "stubborn (لجباز) نقطه‌ی مقابل easygoing است." },
    ],
    practicePrompt: "Describe your best friend's personality to the AI using adjectives.",
  },

  "b1-1-2": {
    lessonId: "b1-1-2",
    vocabulary: [
      { term: "get along with", phonetic: "ɡet əˈlɒŋ wɪθ", meaning: "کنار آمدن با", example: "I get along with my sister.", emoji: "😊" },
      { term: "look up to", phonetic: "lʊk ʌp tuː", meaning: "تحسین کردن/قدردانی", example: "I look up to my father.", emoji: "⬆️" },
      { term: "grow up", phonetic: "ɡroʊ ʌp", meaning: "بزرگ شدن", example: "I grew up in Tehran.", emoji: "🌱" },
      { term: "fall out with", phonetic: "fɔːl aʊt wɪθ", meaning: "دعوا کردن/به هم خوردن", example: "They fell out with each other.", emoji: "💔" },
      { term: "make up", phonetic: "meɪk ʌp", meaning: "آشتی کردن", example: "We made up the next day.", emoji: "🤝" },
      { term: "take after", phonetic: "teɪk ˈæftər", meaning: "شبیه بودن به (وراثت)", example: "She takes after her mother.", emoji: "👨‍👩‍👧" },
      { term: "bring up", phonetic: "brɪŋ ʌp", meaning: "بزرگ کردن/تربیت", example: "She was brought up by her aunt.", emoji: "👶" },
      { term: "count on", phonetic: "kaʊnt ɒn", meaning: "تکیه کردن به", example: "You can count on me.", emoji: "🤝" },
    ],
    grammar: {
      rule: "Phrasal Verbs: verb + particle (up / out / on / after)",
      explanation:
        "افعال عبارتی از فعل + حرف اضافه/قید تشکیل می‌شوند و معنی جدیدی می‌گیرند: get along = کنار آمدن، look up to = تحسین کردن. معنی کل با معنی اجزای آن متفاوت است!",
      examples: ["I get along with my coworkers.", "She takes after her dad.", "They fell out over money."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«با کسی کنار میایم» یعنی؟", options: ["fall out with", "get along with", "look up to", "bring up"], correctIndex: 1, explain: "get along with = کنار آمدن با کسی." },
      { id: "q2", kind: "multiple-choice", prompt: "«آشتی کردن» کدام فعل عبارتی است؟", options: ["make up", "grow up", "count on", "take after"], correctIndex: 0, explain: "make up = آشتی کردن (بعد از دعوا)." },
      { id: "q3", kind: "word-order", prompt: "بگو: من در تهران بزرگ شدم.", words: ["up", "I", "in", "grew", "Tehran", "."], correctSentence: "I grew up in Tehran.", explain: "grow up = بزرگ شدن. گذشته: grew up." },
    ],
    practicePrompt: "Tell the AI about your family relationships using phrasal verbs.",
  },

  /* ===== Unit 2: Housing & Obligation ===== */
  "b1-2-1": {
    lessonId: "b1-2-1",
    vocabulary: [
      { term: "rent", phonetic: "rent", meaning: "اجاره", example: "I pay rent every month.", emoji: "🏠" },
      { term: "landlord", phonetic: "ˈlændlɔːrd", meaning: "صاحب‌خانه", example: "My landlord is nice.", emoji: "👨" },
      { term: "deposit", phonetic: "dɪˈpɑːzɪt", meaning: "ودیعه/پول پیش", example: "I paid a deposit of $500.", emoji: "💰" },
      { term: "tenant", phonetic: "ˈtenənt", meaning: "مستأجر", example: "The tenant is moving out.", emoji: "🧳" },
      { term: "lease", phonetic: "liːs", meaning: "قرارداد اجاره", example: "I signed a one-year lease.", emoji: "📄" },
      { term: "utilities", phonetic: "juːˈtɪlɪtiz", meaning: "قبض‌ها (آب/برق/گاز)", example: "Utilities are not included.", emoji: "💡" },
      { term: "furnished", phonetic: "ˈfɜːrnɪʃt", meaning: "مبله", example: "It's a furnished apartment.", emoji: "🛋️" },
      { term: "suburb", phonetic: "ˈsʌbɜːrb", meaning: "حومه شهر", example: "I live in the suburbs.", emoji: "🏘️" },
    ],
    grammar: {
      rule: "must / have to / don't have to / mustn't",
      explanation:
        "must و have to یعنی «باید» (ضرورت). mustn't یعنی «ممنوع/نباید». don't have to یعنی «لازم نیست» (اختیاری). این تفاوت بسیار مهم است!",
      examples: ["You must pay the rent. (الزامی)", "You don't have to park outside. (اختیاری)", "You mustn't smoke here. (ممنوع)"],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام یعنی «ممنوع»؟", options: ["don't have to", "mustn't", "have to", "should"], correctIndex: 1, explain: "mustn't = ممنوع/نباید." },
      { id: "q2", kind: "multiple-choice", prompt: "«لازم نیست» کدام است؟", options: ["must", "mustn't", "don't have to", "have to"], correctIndex: 2, explain: "don't have to = لازم نیست (اختیاری)." },
      { id: "q3", kind: "word-order", prompt: "بگو: تو باید اجاره رو پرداخت کنی.", words: ["must", "You", "pay", "the", "rent", "."], correctSentence: "You must pay the rent.", explain: "must برای الزام." },
    ],
    practicePrompt: "Discuss renting an apartment with the AI — ask about lease, deposit, and rules.",
  },

  "b1-2-2": {
    lessonId: "b1-2-2",
    vocabulary: [
      { term: "must", phonetic: "mʌst", meaning: "باید (الزامی شخصی)", example: "I must call my mom.", emoji: "⚠️" },
      { term: "have to", phonetic: "hæv tuː", meaning: "مجبورم (قانونی)", example: "I have to wear a uniform.", emoji: "📋" },
      { term: "mustn't", phonetic: "ˈmʌsənt", meaning: "ممنوع/نباید", example: "You mustn't be late.", emoji: "🚫" },
      { term: "don't have to", phonetic: "doʊnt hæv tuː", meaning: "لازم نیست", example: "You don't have to come.", emoji: "🤷" },
      { term: "should", phonetic: "ʃʊd", meaning: "بهتر است (توصیه)", example: "You should rest.", emoji: "✅" },
    ],
    grammar: {
      rule: "must (internal) vs have to (external) — nuance matters!",
      explanation:
        "must معمولاً برای الزام شخصی و درونی استفاده می‌شود (احساس شخصی)، در حالی که have to برای الزام بیرونی (قوانین، مقررات) به کار می‌رود. در گذشته فقط had to داریم (must گذشته ندارد).",
      examples: ["I must study more. (احساس شخصی)", "I have to wear a tie at work. (قانون شرکت)", "I had to work late yesterday."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "گذشته‌ی must/have to چیست؟", options: ["musted", "had to", "must have", "having to"], correctIndex: 1, explain: "must گذشته ندارد — از had to استفاده می‌کنیم." },
      { id: "q2", kind: "word-order", prompt: "بگو: تو نباید دیر کنی (ممنوع).", words: ["mustn't", "You", "be", "late", "."], correctSentence: "You mustn't be late.", explain: "mustn't = ممنوع." },
      { id: "q3", kind: "multiple-choice", prompt: "کدام جمله درست است؟ «تو لازم نیست بیای»", options: ["You mustn't come.", "You don't have to come.", "You must not to come.", "You haven't to come."], correctIndex: 1, explain: "don't have to = لازم نیست." },
    ],
    practicePrompt: "Tell the AI about rules in your home or workplace using must/have to.",
  },

  /* ===== Unit 3: Airport & Conditionals ===== */
  "b1-3-1": {
    lessonId: "b1-3-1",
    vocabulary: [
      { term: "boarding pass", phonetic: "ˈbɔːrdɪŋ pæs", meaning: "کارت سوار شدن", example: "Here's your boarding pass.", emoji: "🚌" },
      { term: "gate", phonetic: "ɡeɪt", meaning: "گیت پرواز", example: "Gate 12 is over there.", emoji: "🚪" },
      { term: "departure lounge", phonetic: "dɪˈpɑːrtʃər laʊndʒ", meaning: "سالن انتظار", example: "Wait in the departure lounge.", emoji: "🪑" },
      { term: "customs", phonetic: "ˈkʌstəmz", meaning: "گمرک", example: "Go through customs.", emoji: "🛃" },
      { term: "baggage claim", phonetic: "ˈbæɡɪdʒ kleɪm", meaning: "تحویل بار", example: "Meet me at baggage claim.", emoji: "🧳" },
      { term: "duty-free", phonetic: "ˈduːti friː", meaning: "فروشگاه معاف از مالیات", example: "I bought perfume duty-free.", emoji: "🛍️" },
      { term: "delay", phonetic: "dɪˈleɪ", meaning: "تأخیر", example: "The flight has a delay.", emoji: "⏰" },
      { term: "carry-on", phonetic: "ˈkæri ɒn", meaning: "چمدان دستی", example: "One carry-on per passenger.", emoji: "🎒" },
    ],
    grammar: {
      rule: "First Conditional: If + present, will + verb",
      explanation:
        "شرطی نوع اول برای موقعیت‌های واقعی و محتمل استفاده می‌شود: If it rains, I will stay home. اگر شرط محقق شود، نتیجه اتفاق می‌افتد.",
      examples: ["If we hurry, we'll catch the flight.", "If the flight is delayed, I will call you.", "You'll miss the plane if you don't run."],
    },
    quiz: [
      { id: "q1", kind: "word-order", prompt: "بگو: اگر عجله کنیم، پرواز رو گیر میاریم.", words: ["If", "we", "hurry", ",", "we'll", "catch", "the", "flight", "."], correctSentence: "If we hurry, we'll catch the flight.", explain: "شرطی اول: If + present, will + verb." },
      { id: "q2", kind: "multiple-choice", prompt: "کدام جمله شرطی اول درست است؟", options: ["If it will rain, I stay.", "If it rains, I will stay.", "If it rain, I will staying.", "If it rains, I stayed."], correctIndex: 1, explain: "If + present simple, will + verb." },
      { id: "q3", kind: "multiple-choice", prompt: "«گمرک» به انگلیسی؟", options: ["gate", "customs", "delay", "carry-on"], correctIndex: 1, explain: "customs = گمرک." },
    ],
    practicePrompt: "Practice airport check-in vocabulary with the AI.",
  },

  "b1-3-2": {
    lessonId: "b1-3-2",
    vocabulary: [
      { term: "If + present", phonetic: "ɪf", meaning: "اگر + حال", example: "If you study, you'll pass.", emoji: "📚" },
      { term: "will + verb", phonetic: "wɪl", meaning: "خواهم + فعل", example: "I will help you.", emoji: "🤝" },
      { term: "unless", phonetic: "ənˈles", meaning: "مگر اینکه", example: "I'll go unless it rains.", emoji: "🚫" },
      { term: "as long as", phonetic: "æz lɒŋ æz", meaning: "تا زمانی که", example: "As long as you're happy.", emoji: "☺️" },
    ],
    grammar: {
      rule: "If + present simple, will/won't + base verb",
      explanation:
        "در شرطی اول، بعد از If همیشه زمان حال ساده می‌آید (نه آینده!). در قسمت نتیجه will/won't استفاده می‌کنیم. می‌توانیم unless به جای if not استفاده کنیم: I'll go unless it rains = I'll go if it doesn't rain.",
      examples: ["If you call me, I'll answer.", "Unless you hurry, you'll miss the bus.", "As long as you try, you'll succeed."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["If you will study, you pass.", "If you study, you will pass.", "If you studied, you will pass.", "If you studying, you pass."], correctIndex: 1, explain: "بعد از If حال ساده: If you study." },
      { id: "q2", kind: "word-order", prompt: "بگو: مگر اینکه بارون بیاد، میرم بیرون.", words: ["I'll", "go", "out", "unless", "it", "rains", "."], correctSentence: "I'll go out unless it rains.", explain: "unless = if not." },
      { id: "q3", kind: "multiple-choice", prompt: "«unless» یعنی؟", options: ["اگر", "مگر اینکه (if not)", "چون", "تا"], correctIndex: 1, explain: "unless = if not = مگر اینکه." },
    ],
    practicePrompt: "Make first conditional sentences about travel with the AI.",
  },

  /* ===== Unit 4: Hotels & Indirect Questions ===== */
  "b1-4-1": {
    lessonId: "b1-4-1",
    vocabulary: [
      { term: "reception", phonetic: "rɪˈsepʃn", meaning: "پذیرش هتل", example: "Go to reception.", emoji: "🛎️" },
      { term: "check in / out", phonetic: "tʃek ɪn / aʊt", meaning: "تحویل گرفتن/تخلیه کردن اتاق", example: "Check-in is at 3 PM.", emoji: "🔑" },
      { term: "complaint", phonetic: "kəmˈpleɪnt", meaning: "شکایت", example: "I have a complaint.", emoji: "😠" },
      { term: "refund", phonetic: "ˈriːfʌnd", meaning: "بازگشت پول", example: "I'd like a refund.", emoji: "💵" },
      { term: "air conditioning", phonetic: "er kənˈdɪʃənɪŋ", meaning: "تهویه مطبوع", example: "The AC is broken.", emoji: "❄️" },
      { term: "room service", phonetic: "ruːm ˈsɜːrvɪs", meaning: "سرویس اتاق", example: "I'll call room service.", emoji: "🍽️" },
      { term: "suite", phonetic: "swiːt", meaning: "سوئیت", example: "We booked a suite.", emoji: "🏨" },
      { term: "manager", phonetic: "ˈmænɪdʒər", meaning: "مدیر", example: "I need to see the manager.", emoji: "👨‍💼" },
    ],
    grammar: {
      rule: "Indirect Questions: Could you tell me...? / I'd like to know...",
      explanation:
        "برای مودب‌تر پرسیدن سوال، از سوالات غیرمستقیم استفاده می‌کنیم: Could you tell me where the pool is? (نه where is the pool). در سوال غیرمستقیم، ترتیب کلمات از حالت سوالی به حالت خبری برمی‌گردد.",
      examples: ["Could you tell me what time breakfast is?", "I'd like to know if the Wi-Fi is free.", "Do you know where the gym is?"],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام سوال غیرمستقیم درست است؟", options: ["Could you tell me where is the pool?", "Could you tell me where the pool is?", "Could you tell me where the pool?", "Could you tell me where pool is the?"], correctIndex: 1, explain: "در سوال غیرمستقیم ترتیب خبری است: where the pool is." },
      { id: "q2", kind: "word-order", prompt: "بگو: می‌خوام بدونم وای‌فای رایگانه؟", words: ["I'd", "like", "to", "know", "if", "the", "Wi-Fi", "is", "free", "."], correctSentence: "I'd like to know if the Wi-Fi is free.", explain: "سوال غیرمستقیم با if برای yes/no." },
      { id: "q3", kind: "multiple-choice", prompt: "«شکایت» به انگلیسی؟", options: ["refund", "complaint", "manager", "suite"], correctIndex: 1, explain: "complaint = شکایت." },
    ],
    practicePrompt: "Complain politely to the hotel manager using indirect questions.",
  },

  "b1-4-2": {
    lessonId: "b1-4-2",
    vocabulary: [
      { term: "Could you tell me...?", phonetic: "kʊd juː", meaning: "ممکنه بهم بگی...؟", example: "Could you tell me the time?", emoji: "🤔" },
      { term: "I was wondering...", phonetic: "aɪ wɒz ˈwʌndərɪŋ", meaning: "تعجب می‌کردم اگر...", example: "I was wondering if you could help.", emoji: "💭" },
      { term: "Do you happen to know...?", phonetic: "duː juː", meaning: "اتفاقاً نمی‌دونی...؟", example: "Do you happen to know the price?", emoji: "❓" },
      { term: "I'd like to know...", phonetic: "aɪd laɪk", meaning: "دوست دارم بدونم...", example: "I'd like to know the check-out time.", emoji: "ℹ️" },
    ],
    grammar: {
      rule: "Indirect Question = polite phrase + statement word order",
      explanation:
        "سوالات غیرمستقیم مودبانه‌تر هستند. ساختار: عبارت مودبانه + جمله‌ی خبری (بدون معکوس کردن فاعل و فعل). برای سوالات yes/no از if یا whether استفاده کن.",
      examples: ["Could you tell me where the restaurant is?", "I was wondering if the room has AC.", "Do you know what time breakfast starts?"],
    },
    quiz: [
      { id: "q1", kind: "word-order", prompt: "بگو: ممکنه بگی صبحونه کی شروع میشه؟", words: ["Could", "you", "tell", "me", "what", "time", "breakfast", "starts", "?"], correctSentence: "Could you tell me what time breakfast starts?", explain: "ترتیب خبری در سوال غیرمستقیم." },
      { id: "q2", kind: "multiple-choice", prompt: "برای سوال yes/no غیرمستقیم از چه استفاده می‌کنیم؟", options: ["what", "where", "if / whether", "when"], correctIndex: 2, explain: "برای yes/no از if یا whether استفاده می‌شود." },
      { id: "q3", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["Do you know where is he?", "Do you know where he is?", "Do you know where is he?", "Do you know where he?"], correctIndex: 1, explain: "ترتیب خبری: where he is." },
    ],
    practicePrompt: "Ask the AI polite questions about a hotel using indirect questions.",
  },

  /* ===== Unit 5: Job Interviews & Present Perfect Continuous ===== */
  "b1-5-1": {
    lessonId: "b1-5-1",
    vocabulary: [
      { term: "resume / CV", phonetic: "ˈrezəmeɪ", meaning: "رزومه", example: "I updated my resume.", emoji: "📄" },
      { term: "strengths", phonetic: "streŋθs", meaning: "نقاط قوت", example: "My strength is teamwork.", emoji: "💪" },
      { term: "weaknesses", phonetic: "ˈwiːknəsɪz", meaning: "نقاط ضعف", example: "My weakness is perfectionism.", emoji: "📉" },
      { term: "experience", phonetic: "ɪkˈspɪriəns", meaning: "تجربه کاری", example: "I have 5 years of experience.", emoji: "💼" },
      { term: "qualifications", phonetic: "ˌkwɑːlɪfɪˈkeɪʃnz", meaning: "مدارک/صلاحیت‌ها", example: "My qualifications are strong.", emoji: "🎓" },
      { term: "team player", phonetic: "tiːm ˈpleɪər", meaning: "کار تیمی", example: "I'm a team player.", emoji: "🤝" },
      { term: "salary", phonetic: "ˈsæləri", meaning: "حقوق", example: "What's the salary?", emoji: "💰" },
      { term: "references", phonetic: "ˈrefrənsɪz", meaning: "معرف‌ها", example: "I have two references.", emoji: "📇" },
    ],
    grammar: {
      rule: "Present Perfect Continuous: have/has been + verb-ing",
      explanation:
        "این زمان برای کارهایی که در گذشته شروع شده و تا الان ادامه دارند استفاده می‌شود: I have been working here for 3 years. تأکید بر مدت زمان است.",
      examples: ["I have been studying English for 5 years.", "She has been working since 8 AM.", "How long have you been waiting?"],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟ «من ۳ سال است کار می‌کنم»", options: ["I have been working for 3 years.", "I am working for 3 years.", "I have working for 3 years.", "I been working for 3 years."], correctIndex: 0, explain: "have been + verb-ing: have been working." },
      { id: "q2", kind: "word-order", prompt: "بگو: او از ۸ صبح مشغول مطالعه است.", words: ["has", "She", "been", "studying", "since", "8", "AM", "."], correctSentence: "She has been studying since 8 AM.", explain: "has been + verb-ing + since." },
      { id: "q3", kind: "multiple-choice", prompt: "«معرف» به انگلیسی؟", options: ["resume", "reference", "salary", "strength"], correctIndex: 1, explain: "reference = معرف." },
    ],
    practicePrompt: "Practice a job interview with the AI — talk about your experience and strengths.",
  },

  "b1-5-2": {
    lessonId: "b1-5-2",
    vocabulary: [
      { term: "have been doing", phonetic: "hæv biːn", meaning: "مدتی است که می‌کنم", example: "I've been learning English.", emoji: "📚" },
      { term: "has been working", phonetic: "hæz biːn", meaning: "او مدتی است کار می‌کند", example: "He's been working hard.", emoji: "💼" },
      { term: "for", phonetic: "fɔːr", meaning: "برای (مدت)", example: "for 2 hours / for a week", emoji: "⏱️" },
      { term: "since", phonetic: "sɪns", meaning: "از (نقطه زمانی)", example: "since Monday / since 2020", emoji: "📅" },
    ],
    grammar: {
      rule: "have/has been + verb-ing → focus on duration",
      explanation:
        "حال کامل استمراری بر مدت یک فعالیت تأکید می‌کند. with for + مدت زمان (for 3 years) و since + نقطه زمانی (since 2020). تفاوت با حال کامل: I have read 3 books (نتیجه) vs I have been reading all day (فرآیند).",
      examples: ["I've been working here since January.", "They've been arguing for an hour.", "How long have you been living here?"],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام حرف برای مدت زمان استفاده می‌شود؟", options: ["since", "for", "from", "at"], correctIndex: 1, explain: "for + مدت: for 3 years." },
      { id: "q2", kind: "word-order", prompt: "بگو: من ۵ سال است انگلیسی یاد می‌گیرم.", words: ["I've", "been", "learning", "English", "for", "5", "years", "."], correctSentence: "I've been learning English for 5 years.", explain: "have been + verb-ing + for + duration." },
      { id: "q3", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["I have been study since 2 hours.", "I have been studying for 2 hours.", "I have being studying for 2 hours.", "I been studying for 2 hours."], correctIndex: 1, explain: "have been + verb-ing." },
    ],
    practicePrompt: "Tell the AI how long you've been doing your hobbies using present perfect continuous.",
  },

  /* ===== Unit 6: Technology & Passive Voice ===== */
  "b1-6-1": {
    lessonId: "b1-6-1",
    vocabulary: [
      { term: "software", phonetic: "ˈsɒftwer", meaning: "نرم‌افزار", example: "This software is free.", emoji: "💾" },
      { term: "device", phonetic: "dɪˈvaɪs", meaning: "دستگاه/دستگاه هوشمند", example: "Charge your device.", emoji: "📱" },
      { term: "download", phonetic: "ˈdaʊnloʊd", meaning: "دانلود کردن", example: "Download the app.", emoji: "⬇️" },
      { term: "update", phonetic: "ʌpˈdeɪt", meaning: "به‌روزرسانی", example: "Update your software.", emoji: "🔄" },
      { term: "artificial intelligence", phonetic: "ɑːrtɪˈfɪʃl", meaning: "هوش مصنوعی", example: "AI is changing the world.", emoji: "🤖" },
      { term: "social media", phonetic: "ˈsoʊʃl", meaning: "شبکه‌های اجتماعی", example: "I use social media daily.", emoji: "📲" },
      { term: "password", phonetic: "ˈpæswɜːrd", meaning: "رمز عبور", example: "Change your password.", emoji: "🔑" },
      { term: "online / offline", phonetic: "ˈɒnlaɪn", meaning: "آنلاین/آفلاین", example: "Are you online?", emoji: "🌐" },
    ],
    grammar: {
      rule: "Passive Voice: be + past participle",
      explanation:
        "در مجهول، تأکید بر عمل است نه فاعل: The app was downloaded by millions. ساخته می‌شود با be + شکل گذشته‌ی سوم فعل (past participle): is made, was built, has been done.",
      examples: ["The phone was invented in 1973.", "This website is visited by millions.", "The data has been stolen."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "مجهول «People speak English» چیست؟", options: ["English is spoken.", "English speaks.", "English is speaking.", "English was speak."], correctIndex: 0, explain: "مجهول: is + past participle: is spoken." },
      { id: "q2", kind: "word-order", prompt: "بگو: این اپ میلیون‌ها بار دانلود شده.", words: ["has", "This", "app", "been", "downloaded", "millions", "of", "times", "."], correctSentence: "This app has been downloaded millions of times.", explain: "has been + past participle." },
      { id: "q3", kind: "multiple-choice", prompt: "«هوش مصنوعی» به انگلیسی؟", options: ["social media", "artificial intelligence", "software", "device"], correctIndex: 1, explain: "artificial intelligence = هوش مصنوعی." },
    ],
    practicePrompt: "Discuss technology and AI with the AI tutor using passive voice.",
  },

  "b1-6-2": {
    lessonId: "b1-6-2",
    vocabulary: [
      { term: "is made", phonetic: "ɪz meɪd", meaning: "ساخته می‌شود", example: "This car is made in Japan.", emoji: "🚗" },
      { term: "was invented", phonetic: "wɒz ɪnˈventɪd", meaning: "اختراع شد", example: "The phone was invented by Bell.", emoji: "📞" },
      { term: "is spoken", phonetic: "ɪz ˈspoʊkən", meaning: "صحبت می‌شود", example: "English is spoken worldwide.", emoji: "🗣️" },
      { term: "are produced", phonetic: "ɑːr prəˈduːst", meaning: "تولید می‌شوند", example: "Cars are produced here.", emoji: "🏭" },
      { term: "by", phonetic: "baɪ", meaning: "توسط (عامل مجهول)", example: "It was written by Shakespeare.", emoji: "✍️" },
    ],
    grammar: {
      rule: "Active → Passive: move object to subject, add be + past participle",
      explanation:
        "برای مجهول کردن: مفعول به جای فاعل می‌نشیند و be + شکل سوم فعل اضافه می‌شود. زمان فعل be با زمان جمله تطابق دارد: present (is/are)، past (was/were)، perfect (has/have been).",
      examples: ["Shakespeare wrote Hamlet → Hamlet was written by Shakespeare.", "They make cars here → Cars are made here.", "Someone has stolen my phone → My phone has been stolen."],
    },
    quiz: [
      { id: "q1", kind: "word-order", prompt: "مجهول کن: تلفن توسط بل اختراع شد.", words: ["was", "The", "phone", "invented", "by", "Bell", "."], correctSentence: "The phone was invented by Bell.", explain: "was + past participle + by." },
      { id: "q2", kind: "multiple-choice", prompt: "مجهول «They built this house» چیست؟", options: ["This house was built.", "This house built.", "This house is building.", "This house was build."], correctIndex: 0, explain: "was + past participle: was built." },
      { id: "q3", kind: "multiple-choice", prompt: "در مجهول، کلمه‌ی «توسط» چیست؟", options: ["with", "by", "from", "of"], correctIndex: 1, explain: "by برای ذکر عامل در مجهول." },
    ],
    practicePrompt: "Turn active sentences into passive with the AI tutor.",
  },

  /* ===== Unit 7: Opinions & Reported Speech ===== */
  "b1-7-1": {
    lessonId: "b1-7-1",
    vocabulary: [
      { term: "In my opinion", phonetic: "ɪn maɪ əˈpɪnjən", meaning: "به نظر من", example: "In my opinion, it's wrong.", emoji: "💭" },
      { term: "I strongly believe", phonetic: "aɪ strɒŋli bɪˈliːv", meaning: "قویاً باور دارم", example: "I strongly believe in fairness.", emoji: "💪" },
      { term: "On the other hand", phonetic: "ɒn ðə ˈʌðər hænd", meaning: "از طرف دیگر", example: "On the other hand, it's expensive.", emoji: "⚖️" },
      { term: "I disagree", phonetic: "aɪ ˌdɪsəˈɡriː", meaning: "مخالفم", example: "I disagree with you.", emoji: "❌" },
      { term: "That's a good point", phonetic: "ðæts ə ɡʊd pɔɪnt", meaning: "این نکته‌ی خوبیه", example: "That's a good point, but...", emoji: "👍" },
      { term: "To be honest", phonetic: "tuː biː ˈɑːnɪst", meaning: "راستش رو بخوای", example: "To be honest, I don't like it.", emoji: "🤷" },
      { term: "It depends", phonetic: "ɪt dɪˈpendz", meaning: "بستگی داره", example: "It depends on the price.", emoji: "🤔" },
      { term: "I'd say that", phonetic: "aɪd seɪ", meaning: "من می‌گم که", example: "I'd say that it's worth it.", emoji: "🗣️" },
    ],
    grammar: {
      rule: "Expressing opinions: In my opinion / I believe / To be honest",
      explanation:
        "برای بیان نظر از عبارات مقدماتی استفاده می‌کنیم: In my opinion (به نظر من)، I strongly believe (قویاً باور دارم). برای مخالفت مودبانه: I see your point, but... یا That's true, however...",
      examples: ["In my opinion, technology helps education.", "I disagree because it's too expensive.", "On the other hand, it saves time."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "برای مخالفت مودبانه از چه استفاده می‌کنیم؟", options: ["I strongly believe", "I disagree, but I see your point", "That's wrong!", "No!"], correctIndex: 1, explain: "مخالفت مودبانه: I disagree, but I see your point." },
      { id: "q2", kind: "word-order", prompt: "بگو: به نظر من تکنولوژی به آموزش کمک می‌کنه.", words: ["In", "my", "opinion", ",", "technology", "helps", "education", "."], correctSentence: "In my opinion, technology helps education.", explain: "عبارت مقدماتی + نظر." },
      { id: "q3", kind: "multiple-choice", prompt: "«بستگی داره» به انگلیسی؟", options: ["I disagree", "It depends", "On the other hand", "To be honest"], correctIndex: 1, explain: "It depends = بستگی داره." },
    ],
    practicePrompt: "Debate a topic with the AI using opinion expressions.",
  },

  "b1-7-2": {
    lessonId: "b1-7-2",
    vocabulary: [
      { term: "He said that...", phonetic: "hiː sed", meaning: "او گفت که...", example: "He said that he was tired.", emoji: "🗣️" },
      { term: "She told me", phonetic: "ʃiː toʊld miː", meaning: "او به من گفت", example: "She told me she was happy.", emoji: "💬" },
      { term: "They asked if", phonetic: "ðeɪ æskt", meaning: "آن‌ها پرسیدند آیا", example: "They asked if I was ready.", emoji: "❓" },
      { term: "backshift", phonetic: "bækʃɪft", meaning: "تغییر زمان به عقب", example: "am → was, will → would", emoji: "⏪" },
    ],
    grammar: {
      rule: "Reported Speech: said + (that) + tense shifts back",
      explanation:
        "در نقل قول غیرمستقیم، زمان فعل یک مرحله به عقب برمی‌گردد (backshift): present → past، will → would، can → could. کلمه‌ی that اختیاری است. ضمیرها هم تغییر می‌کنند.",
      examples: ["\"I am tired\" → He said he was tired.", "\"I will help\" → She said she would help.", "\"Can you swim?\" → He asked if I could swim."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "نقل قول: «I am happy» → او گفت؟", options: ["He said he is happy.", "He said he was happy.", "He said I was happy.", "He say he happy."], correctIndex: 1, explain: "am → was (backshift)." },
      { id: "q2", kind: "multiple-choice", prompt: "«I will come» → در نقل قول؟", options: ["She said she will come.", "She said she would come.", "She said she comes.", "She said she came."], correctIndex: 1, explain: "will → would (backshift)." },
      { id: "q3", kind: "word-order", prompt: "بگو: او به من گفت که خسته است.", words: ["told", "He", "me", "he", "was", "tired", "."], correctSentence: "He told me he was tired.", explain: "told + object + (that) + shifted clause." },
    ],
    practicePrompt: "Report what someone said to the AI using reported speech.",
  },

  /* ===== Unit 8: Wishes & Second Conditional ===== */
  "b1-8-1": {
    lessonId: "b1-8-1",
    vocabulary: [
      { term: "goal", phonetic: "ɡoʊl", meaning: "هدف", example: "My goal is to travel.", emoji: "🎯" },
      { term: "dream job", phonetic: "driːm dʒɑːb", meaning: "شغل رویایی", example: "This is my dream job.", emoji: "💼" },
      { term: "achieve", phonetic: "əˈtʃiːv", meaning: "دست یافتن/تحقق", example: "I want to achieve my goals.", emoji: "🏆" },
      { term: "succeed", phonetic: "səkˈsiːd", meaning: "موفق شدن", example: "She succeeded in her exam.", emoji: "⭐" },
      { term: "save up", phonetic: "seɪv ʌp", meaning: "پس‌انداز کردن", example: "I'm saving up for a car.", emoji: "🐷" },
      { term: "career", phonetic: "kəˈrɪr", meaning: "مسیر شغلی", example: "I want a career in tech.", emoji: "📈" },
      { term: "retire", phonetic: "rɪˈtaɪər", meaning: "بازنشسته شدن", example: "My dad retired at 60.", emoji: "🏖️" },
      { term: "ambition", phonetic: "æmˈbɪʃn", meaning: "جاه‌طلبی/آرزو", example: "Her ambition is to be a doctor.", emoji: "🚀" },
    ],
    grammar: {
      rule: "Second Conditional: If + past, would + verb (hypothetical)",
      explanation:
        "شرطی نوع دوم برای موقعیت‌های غیرواقعی یا خیالی استفاده می‌شود: If I were rich, I would travel the world. توجه: در شرطی دوم بعد از If از were (نه was) برای همه ضمایر استفاده می‌شود.",
      examples: ["If I had more time, I would learn French.", "If I were you, I would accept the job.", "She would travel if she had money."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام شرطی دوم درست است؟", options: ["If I am rich, I travel.", "If I were rich, I would travel.", "If I was rich, I will travel.", "If I rich, I would traveled."], correctIndex: 1, explain: "If + past (were), would + verb." },
      { id: "q2", kind: "word-order", prompt: "بگو: اگر من جای تو بودم، این کار رو می‌کردم.", words: ["If", "I", "were", "you", ",", "I", "would", "do", "it", "."], correctSentence: "If I were you, I would do it.", explain: "If + were + would + verb." },
      { id: "q3", kind: "multiple-choice", prompt: "«هدف» به انگلیسی؟", options: ["dream", "goal", "career", "ambition"], correctIndex: 1, explain: "goal = هدف." },
    ],
    practicePrompt: "Talk about your dreams and goals using second conditional with the AI.",
  },

  "b1-8-2": {
    lessonId: "b1-8-2",
    vocabulary: [
      { term: "I wish I were...", phonetic: "aɪ wɪʃ", meaning: "ای کاش بودم...", example: "I wish I were taller.", emoji: "🌟" },
      { term: "I wish I could...", phonetic: "aɪ wɪʃ aɪ kʊd", meaning: "ای کاش می‌تونستم...", example: "I wish I could fly.", emoji: "🕊️" },
      { term: "If only", phonetic: "ɪf ˈoʊnli", meaning: "ای کاش (تأکیدی‌تر)", example: "If only I had more money.", emoji: "💭" },
      { term: "would rather", phonetic: "wʊd ˈræðər", meaning: "ترجیح می‌دم", example: "I'd rather stay home.", emoji: "🏠" },
    ],
    grammar: {
      rule: "I wish + past simple → hypothetical present",
      explanation:
        "برای آرزو درباره‌ی وضعیت فعلی (غیر واقعی) از I wish + زمان گذشته استفاده می‌کنیم: I wish I were rich (ای کاش ثروتمند بودم). For abilities: I wish I could + فعل. If only برای تأکید بیشتر استفاده می‌شود.",
      examples: ["I wish I were taller.", "I wish I could speak French.", "If only I had more free time.", "I'd rather travel than work."],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«ای کاش بلندتر بودم» چطور گفته می‌شود؟", options: ["I wish I am taller.", "I wish I were taller.", "I wish I will be taller.", "I wish I be taller."], correctIndex: 1, explain: "I wish + past: were taller." },
      { id: "q2", kind: "word-order", prompt: "بگو: ای کاش می‌تونستم پرواز کنم.", words: ["I", "wish", "I", "could", "fly", "."], correctSentence: "I wish I could fly.", explain: "I wish + could + verb." },
      { id: "q3", kind: "multiple-choice", prompt: "«ترجیح می‌دم» با چه ساخته می‌شود؟", options: ["I prefer", "I'd rather", "I wish", "If only"], correctIndex: 1, explain: "would rather = ترجیح می‌دم." },
    ],
    practicePrompt: "Tell the AI your wishes and dreams using 'I wish' and 'If only'.",
  },
};
