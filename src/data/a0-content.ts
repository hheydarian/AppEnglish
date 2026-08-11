import type { LessonContent } from "@/types";

/**
 * FULL senior-instructor content for every non-roleplay A0 lesson.
 *
 * Compliance: Oxford Starter / Cambridge A0. NO omissions — every letter,
 * number, color, object, and greeting the spec requires is present.
 *
 * Each lesson has the 4-step flow: vocabulary → grammar → quiz → practice.
 * Tone is warm and friendly; explanations are short and in Persian, rendered
 * through <BidiText> so mixed Persian/English stays correctly ordered.
 *
 * Roleplay lessons (a0-1-3, a0-2-3, a0-4-3) have NO entry here — they launch
 * straight into a live AI chat via their scenarioId.
 */
export const A0_LESSON_CONTENT: Record<string, LessonContent> = {
  /* ====================================================================== */
  /*  Unit 1 — Lesson 1: COMPLETE Alphabet (all 26 letters)                  */
  /* ====================================================================== */
  "a0-1-1": {
    lessonId: "a0-1-1",
    vocabulary: [
      { term: "A a", phonetic: "eɪ", meaning: "حرف A — اِی", example: "A for Apple 🍎", emoji: "🍎" },
      { term: "B b", phonetic: "biː", meaning: "حرف B — بی", example: "B for Ball ⚽", emoji: "⚽" },
      { term: "C c", phonetic: "siː", meaning: "حرف C — سی", example: "C for Cat 🐱", emoji: "🐱" },
      { term: "D d", phonetic: "diː", meaning: "حرف D — دی", example: "D for Dog 🐶", emoji: "🐶" },
      { term: "E e", phonetic: "iː", meaning: "حرف E — ایی", example: "E for Egg 🥚", emoji: "🥚" },
      { term: "F f", phonetic: "ef", meaning: "حرف F — اِف", example: "F for Fish 🐟", emoji: "🐟" },
      { term: "G g", phonetic: "dʒiː", meaning: "حرف G — جی", example: "G for Goat 🐐", emoji: "🐐" },
      { term: "H h", phonetic: "eɪtʃ", meaning: "حرف H — اِچ", example: "H for Hat 🎩", emoji: "🎩" },
      { term: "I i", phonetic: "aɪ", meaning: "حرف I — آی", example: "I for Ice cream 🍦", emoji: "🍦" },
      { term: "J j", phonetic: "dʒeɪ", meaning: "حرف J — جِی", example: "J for Juice 🧃", emoji: "🧃" },
      { term: "K k", phonetic: "keɪ", meaning: "حرف K — کِی", example: "K for Kite 🪁", emoji: "🪁" },
      { term: "L l", phonetic: "el", meaning: "حرف L — اِل", example: "L for Lion 🦁", emoji: "🦁" },
      { term: "M m", phonetic: "em", meaning: "حرف M — اِم", example: "M for Monkey 🐵", emoji: "🐵" },
      { term: "N n", phonetic: "en", meaning: "حرف N — اِن", example: "N for Nose 👃", emoji: "👃" },
      { term: "O o", phonetic: "oʊ", meaning: "حرف O — اُو", example: "O for Orange 🍊", emoji: "🍊" },
      { term: "P p", phonetic: "piː", meaning: "حرف P — پی", example: "P for Pen 🖊️", emoji: "🖊️" },
      { term: "Q q", phonetic: "kjuː", meaning: "حرف Q — کیو", example: "Q for Queen 👑", emoji: "👑" },
      { term: "R r", phonetic: "ɑːr", meaning: "حرف R — آر", example: "R for Rabbit 🐰", emoji: "🐰" },
      { term: "S s", phonetic: "es", meaning: "حرف S — اِس", example: "S for Sun ☀️", emoji: "☀️" },
      { term: "T t", phonetic: "tiː", meaning: "حرف T — تی", example: "T for Tree 🌳", emoji: "🌳" },
      { term: "U u", phonetic: "juː", meaning: "حرف U — یو", example: "U for Umbrella ☂️", emoji: "☂️" },
      { term: "V v", phonetic: "viː", meaning: "حرف V — وی", example: "V for Van 🚐", emoji: "🚐" },
      { term: "W w", phonetic: "ˈdʌbəl.juː", meaning: "حرف W — دابلیو", example: "W for Watch ⌚", emoji: "⌚" },
      { term: "X x", phonetic: "eks", meaning: "حرف X — اِکس", example: "X for X-ray 🩻", emoji: "🩻" },
      { term: "Y y", phonetic: "waɪ", meaning: "حرف Y — وای", example: "Y for Yellow 💛", emoji: "💛" },
      { term: "Z z", phonetic: "ziː", meaning: "حرف Z — زِد (US) / زِد (UK)", example: "Z for Zebra 🦓", emoji: "🦓" },
    ],
    grammar: {
      rule: "Vowels: A · E · I · O · U  (5) — the rest are Consonants (21)",
      explanation:
        "۲۶ حرف الفبای انگلیسی داریم. ۵ تای اون‌ها صدادار (Vowels) هستن: A, E, I, O, U. بقیه بی‌صدا (Consonants) نامیده می‌شن. صدادارها قلب تلفظ انگلیسی‌ان — یاد بگیرشون!",
      examples: ["A for Apple 🍎", "E for Egg 🥚", "I for Ice cream 🍦", "O for Orange 🍊", "U for Umbrella ☂️"],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "کدام حرف صدادار (Vowel) نیست؟",
        options: ["A", "E", "B", "O"],
        correctIndex: 2,
        explain: "B یک حرف بی‌صدا (Consonant) است. A, E, O همگی صدادارند.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "حرف 'C' چطور تلفظ می‌شود؟",
        options: ["siː (سی)", "eɪ (ای)", "diː (دی)", "biː (بی)"],
        correctIndex: 0,
        explain: "C تلفظ می‌شه «سی» (siː). مثل کلمه‌ی Cat.",
      },
      {
        id: "q3",
        kind: "word-order",
        prompt: "۵ حرف صدادار رو به ترتیب الفبا بچین:",
        words: ["E", "A", "U", "I", "O"],
        correctSentence: "A E I O U",
        explain: "صدادارها به ترتیب الفبا: A, E, I, O, U.",
      },
    ],
    practicePrompt: "Practice saying the alphabet with the AI tutor.",
  },

  /* ====================================================================== */
  /*  Unit 1 — Lesson 2: COMPLETE Greetings & Responses                      */
  /* ====================================================================== */
  "a0-1-2": {
    lessonId: "a0-1-2",
    vocabulary: [
      { term: "Hello", phonetic: "həˈloʊ", meaning: "سلام (رسمی و دوستانه)", example: "Hello! How are you?", emoji: "👋" },
      { term: "Hi", phonetic: "haɪ", meaning: "سلام (غیررسمی)", example: "Hi! Nice to meet you.", emoji: "🙂" },
      { term: "Good morning", phonetic: "ɡʊd ˈmɔːrnɪŋ", meaning: "صبح بخیر", example: "Good morning, teacher!", emoji: "🌅" },
      { term: "Good afternoon", phonetic: "ɡʊd ˌæftərˈnuːn", meaning: "بعدازظهر بخیر", example: "Good afternoon, everyone!", emoji: "☀️" },
      { term: "Good evening", phonetic: "ɡʊd ˈiːvnɪŋ", meaning: "عصر بخیر", example: "Good evening, sir.", emoji: "🌆" },
      { term: "How are you?", phonetic: "haʊ ɑːr juː", meaning: "حالت چطوره؟", example: "Hi! How are you today?", emoji: "🤗" },
      { term: "I'm fine, thanks", phonetic: "aɪm faɪn θæŋks", meaning: "خوبم، ممنون", example: "— How are you? — I'm fine, thanks!", emoji: "😊" },
      { term: "I'm good", phonetic: "aɪm ɡʊd", meaning: "خوبم", example: "— How are you? — I'm good!", emoji: "👍" },
      { term: "Great!", phonetic: "ɡreɪt", meaning: "عالی!", example: "— How are you? — Great!", emoji: "🎉" },
      { term: "Goodbye", phonetic: "ɡʊdˈbaɪ", meaning: "خداحافظ", example: "Goodbye! See you later.", emoji: "👋" },
      { term: "Bye", phonetic: "baɪ", meaning: "خداحافظ (کوتاه)", example: "Bye! Have a nice day.", emoji: "👋" },
      { term: "See you later", phonetic: "siː juː ˈleɪtər", meaning: "بعداً می‌بینمت", example: "See you later, friend!", emoji: "🤝" },
      { term: "Have a nice day", phonetic: "hæv ə naɪs deɪ", meaning: "روز خوبی داشته باشی", example: "Thank you! Have a nice day.", emoji: "🌟" },
    ],
    grammar: {
      rule: "How are you? → I'm fine, thanks! / I'm good! / Great!",
      explanation:
        "وقتی کسی می‌پرسه How are you?، رایج‌ترین جواب‌ها اینا هستن: I'm fine, thanks یا I'm good یا Great!. کوتاه، ساده و مودبانه — هر کدوم رو که دوست داری بگو!",
      examples: [
        "— How are you? — I'm fine, thanks!",
        "— How are you? — I'm good!",
        "— How are you? — Great!",
      ],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "کلمات رو مرتب کن تا یه سلام درست بشه:",
        words: ["are", "How", "you", "?"],
        correctSentence: "How are you?",
        explain: "ترتیب درست: How + are + you + ?",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "ساعت ۸ صبح است. چه باید بگویی؟",
        options: ["Good evening", "Good morning", "Goodbye", "Good afternoon"],
        correctIndex: 1,
        explain: "صبح‌ها می‌گیم Good morning.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "وقتی می‌خوای خداحافظ کنی، کدوم درسته؟",
        options: ["Hello", "Hi", "See you later", "How are you"],
        correctIndex: 2,
        explain: "See you later یعنی «بعداً می‌بینمت» — یکی از راه‌های خداحافظی.",
      },
    ],
    practiceScenarioId: "casual-chat",
    practicePrompt: "Greet the AI and ask how they are doing.",
  },

  /* ====================================================================== */
  /*  Unit 2 — Lesson 1: COMPLETE Numbers 1 to 20                            */
  /* ====================================================================== */
  "a0-2-1": {
    lessonId: "a0-2-1",
    vocabulary: [
      { term: "one", phonetic: "wʌn", meaning: "۱ — یک", example: "I have one cat.", emoji: "1️⃣" },
      { term: "two", phonetic: "tuː", meaning: "۲ — دو", example: "Two coffees, please.", emoji: "2️⃣" },
      { term: "three", phonetic: "θriː", meaning: "۳ — سه", example: "Three apples.", emoji: "3️⃣" },
      { term: "four", phonetic: "fɔːr", meaning: "۴ — چهار", example: "Four books.", emoji: "4️⃣" },
      { term: "five", phonetic: "faɪv", meaning: "۵ — پنج", example: "Give me five! ✋", emoji: "5️⃣" },
      { term: "six", phonetic: "sɪks", meaning: "۶ — شش", example: "Six pens.", emoji: "6️⃣" },
      { term: "seven", phonetic: "ˈsevn", meaning: "۷ — هفت", example: "Seven days a week.", emoji: "7️⃣" },
      { term: "eight", phonetic: "eɪt", meaning: "۸ — هشت", example: "Eight chairs.", emoji: "8️⃣" },
      { term: "nine", phonetic: "naɪn", meaning: "۹ — نه", example: "Nine is my lucky number.", emoji: "9️⃣" },
      { term: "ten", phonetic: "ten", meaning: "۱۰ — ده", example: "I am ten years old.", emoji: "🔟" },
      { term: "eleven", phonetic: "ɪˈlevn", meaning: "۱۱ — یازده", example: "Eleven players.", emoji: "🔢" },
      { term: "twelve", phonetic: "twelv", meaning: "۱۲ — دوازده", example: "Twelve months.", emoji: "🔢" },
      { term: "thirteen", phonetic: "θɜːrˈtiːn", meaning: "۱۳ — سیزده", example: "Thirteen cards.", emoji: "🔢" },
      { term: "fourteen", phonetic: "fɔːrˈtiːn", meaning: "۱۴ — چهارده", example: "Fourteen days.", emoji: "🔢" },
      { term: "fifteen", phonetic: "fɪfˈtiːn", meaning: "۱۵ — پانزده", example: "Fifteen minutes.", emoji: "🔢" },
      { term: "sixteen", phonetic: "sɪksˈtiːn", meaning: "۱۶ — شانزده", example: "Sixteen years old.", emoji: "🔢" },
      { term: "seventeen", phonetic: "sevnˈtiːn", meaning: "۱۷ — هفده", example: "Seventeen students.", emoji: "🔢" },
      { term: "eighteen", phonetic: "eɪˈtiːn", meaning: "۱۸ — هجده", example: "Eighteen flowers.", emoji: "🔢" },
      { term: "nineteen", phonetic: "naɪnˈtiːn", meaning: "۱۹ — نوزده", example: "Nineteen books.", emoji: "🔢" },
      { term: "twenty", phonetic: "ˈtwenti", meaning: "۲۰ — بیست", example: "Twenty dollars.", emoji: "💯" },
    ],
    grammar: {
      rule: "I am + age → I'm 20.   (13–19 end in \"-teen\")",
      explanation:
        "برای گفتن سن‌ت کافیه بگی I am + عدد. تو محاوره معمولاً می‌گن I'm 20 (کوتاه‌شده‌ی I am). نکته‌ی جالب: اعداد ۱۳ تا ۱۹ همگی به -teen ختم می‌شن — به همین خاطر به نوجوان‌ها teenager می‌گن!",
      examples: ["I am twenty.", "I'm 15 years old.", "She is seventeen.", "He is a teenager."],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "عدد «سه» به انگلیسی چیست؟",
        options: ["two", "three", "ten", "one"],
        correctIndex: 1,
        explain: "سه = three (θriː).",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: من بیست سال دارم.",
        words: ["am", "I", "twenty", "."],
        correctSentence: "I am twenty.",
        explain: "ساختار: I + am + number.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "کدام عدد به -teen ختم می‌شود؟",
        options: ["twenty", "twelve", "fifteen", "ten"],
        correctIndex: 2,
        explain: "fifteen (۱۵) یکی از اعداد -teen هست. twelve و ten و twenty جزو این گروه نیستن.",
      },
    ],
    practicePrompt: "Practice counting and telling your age to the AI tutor.",
  },

  /* ====================================================================== */
  /*  Unit 2 — Lesson 2: Personal Information (self-introduction)            */
  /* ====================================================================== */
  "a0-2-2": {
    lessonId: "a0-2-2",
    vocabulary: [
      { term: "My name is...", phonetic: "maɪ neɪm ɪz", meaning: "اسم من ... است", example: "My name is Sara.", emoji: "🪪" },
      { term: "I am...", phonetic: "aɪ æm", meaning: "من ... هستم", example: "I am a student.", emoji: "🙋" },
      { term: "I'm ... years old", phonetic: "aɪm ... jɪrz oʊld", meaning: "من ... سال دارم", example: "I'm 20 years old.", emoji: "🎂" },
      { term: "I am from Iran", phonetic: "aɪ æm frʌm ɪræn", meaning: "من از ایران هستم", example: "I am from Iran.", emoji: "🇮🇷" },
      { term: "I live in...", phonetic: "aɪ lɪv ɪn", meaning: "من در ... زندگی می‌کنم", example: "I live in Tehran.", emoji: "🏙️" },
      { term: "Nice to meet you", phonetic: "naɪs tuː miːt juː", meaning: "از آشنایی با تو خوشحالم", example: "Nice to meet you!", emoji: "🤝" },
    ],
    grammar: {
      rule: "I am + name / age / job / place",
      explanation:
        "با I am (کوتاه: I'm) می‌تونی اسم، سن، شغل یا مکان‌ت رو بگی. یکی از پرکاربردترین ساختارهای انگلیسیه! همه چیز با I'm شروع می‌شه.",
      examples: ["I'm Sara. (اسم)", "I'm 20 years old. (سن)", "I'm a student. (شغل)", "I'm from Iran. (مکان)"],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "خودت رو معرفی کن (اسم علی):",
        words: ["name", "My", "Ali", "is", "."],
        correctSentence: "My name is Ali.",
        explain: "ترتیب: My + name + is + NAME.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: من از ایران هستم.",
        words: ["from", "I", "Iran", "am", "."],
        correctSentence: "I am from Iran.",
        explain: "ترتیب: I + am + from + COUNTRY.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "«از آشنایی با تو خوشحالم» چطور گفته می‌شه؟",
        options: ["Goodbye", "Nice to meet you", "How are you", "Thank you"],
        correctIndex: 1,
        explain: "Nice to meet you یک عبارت مودبانه و رایج هنگام معرفیه.",
      },
    ],
    practiceScenarioId: "casual-chat",
    practicePrompt: "Introduce yourself to a new AI friend: name, age, and city.",
  },

  /* ====================================================================== */
  /*  Unit 3 — Lesson 1: COMPLETE Colors (10) & Objects (10)                */
  /* ====================================================================== */
  "a0-3-1": {
    lessonId: "a0-3-1",
    vocabulary: [
      // 10 colors
      { term: "red", phonetic: "red", meaning: "قرمز", example: "A red apple.", emoji: "🔴" },
      { term: "blue", phonetic: "bluː", meaning: "آبی", example: "The sky is blue.", emoji: "🔵" },
      { term: "green", phonetic: "ɡriːn", meaning: "سبز", example: "Green grass.", emoji: "🟢" },
      { term: "yellow", phonetic: "ˈjeloʊ", meaning: "زرد", example: "A yellow sun.", emoji: "🟡" },
      { term: "black", phonetic: "blæk", meaning: "مشکی", example: "A black cat.", emoji: "⚫" },
      { term: "white", phonetic: "waɪt", meaning: "سفید", example: "White snow.", emoji: "⚪" },
      { term: "orange", phonetic: "ˈɔːrɪndʒ", meaning: "نارنجی", example: "An orange shirt.", emoji: "🟠" },
      { term: "pink", phonetic: "pɪŋk", meaning: "صورتی", example: "A pink flower.", emoji: "🩷" },
      { term: "purple", phonetic: "ˈpɜːrpəl", meaning: "بنفش", example: "A purple bag.", emoji: "🟣" },
      { term: "brown", phonetic: "braʊn", meaning: "قهوه‌ای", example: "A brown bear.", emoji: "🟤" },
      // 10 objects
      { term: "book", phonetic: "bʊk", meaning: "کتاب", example: "I read a book.", emoji: "📕" },
      { term: "pen", phonetic: "pen", meaning: "خودکار", example: "Write with a pen.", emoji: "🖊️" },
      { term: "chair", phonetic: "tʃer", meaning: "صندلی", example: "Sit on the chair.", emoji: "🪑" },
      { term: "table", phonetic: "ˈteɪbəl", meaning: "میز", example: "The book is on the table.", emoji: "🍽️" },
      { term: "phone", phonetic: "foʊn", meaning: "گوشی", example: "My phone is new.", emoji: "📱" },
      { term: "car", phonetic: "kɑːr", meaning: "ماشین", example: "A red car.", emoji: "🚗" },
      { term: "house", phonetic: "haʊs", meaning: "خانه", example: "My house is big.", emoji: "🏠" },
      { term: "door", phonetic: "dɔːr", meaning: "در", example: "Open the door.", emoji: "🚪" },
      { term: "window", phonetic: "ˈwɪndoʊ", meaning: "پنجره", example: "Look out the window.", emoji: "🪟" },
      { term: "bag", phonetic: "bæɡ", meaning: "کیف", example: "My bag is heavy.", emoji: "🎒" },
    ],
    grammar: {
      rule: "a / an + color + object  →  a red car,  an orange bag",
      explanation:
        "صفت همیشه قبل از اسم میاد: a + red + car = یک ماشین قرمز. اگر کلمه‌ی بعدی با حرف صدادار شروع بشه، به جای a از an استفاده می‌کنیم: an orange, an apple.",
      examples: ["a blue door (آبی)", "a green chair (سبز)", "an orange bag (نارنجی)", "a red car (قرمز)"],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "کلمه‌ی «صندلی» کدامه؟",
        options: ["door", "chair", "red", "blue"],
        correctIndex: 1,
        explain: "chair = صندلی.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: یک در آبی",
        words: ["door", "blue", "a"],
        correctSentence: "a blue door",
        explain: "ترتیب صفت + اسم: a + blue + door.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "کدام راور درسته؟ «یک پرتقال»",
        options: ["a orange", "an orange", "the orange", "orange a"],
        correctIndex: 1,
        explain: "چون orange با حرف صدادار o شروع می‌شه، می‌گیم an orange.",
      },
    ],
    practicePrompt: "Describe objects and their colors to the AI tutor.",
  },

  /* ====================================================================== */
  /*  Unit 3 — Lesson 2: This / That / These / Those (demonstratives)       */
  /* ====================================================================== */
  "a0-3-2": {
    lessonId: "a0-3-2",
    vocabulary: [
      { term: "this", phonetic: "ðɪs", meaning: "این (نزدیک، مفرد)", example: "This is my book.", emoji: "👉" },
      { term: "that", phonetic: "ðæt", meaning: "آن (دور، مفرد)", example: "That is a car.", emoji: "🖐️" },
      { term: "these", phonetic: "ðiːz", meaning: "این‌ها (نزدیک، جمع)", example: "These are my pens.", emoji: "✌️" },
      { term: "those", phonetic: "ðoʊz", meaning: "آن‌ها (دور، جمع)", example: "Those are birds.", emoji: "🤲" },
    ],
    grammar: {
      rule: "This / These = near · That / Those = far   (singular → plural)",
      explanation:
        "برای چیزهای نزدیک از This (مفرد) یا These (جمع) استفاده کن. برای چیزهای دور از That (مفرد) یا Those (جمع) استفاده کن. اگر جنس قابل شمارش باشه، بعد از a/an میاد: This is a book.",
      examples: [
        "This is a pen. (نزدیک، مفرد)",
        "That is a house. (دور، مفرد)",
        "These are books. (نزدیک، جمع)",
        "Those are cars. (دور، جمع)",
      ],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "برای اشاره به یک شیء دور از ما، کدام درسته؟",
        options: ["This", "That", "These", "Those"],
        correctIndex: 1,
        explain: "برای شیء دور و مفرد، از That استفاده می‌کنیم.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: این (نزدیک) یک کتاب است.",
        words: ["is", "This", "a", "book", "."],
        correctSentence: "This is a book.",
        explain: "ترتیب: This + is + a + book.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "جمع This کدام است؟",
        options: ["That", "Those", "These", "It"],
        correctIndex: 2,
        explain: "شکل جمع This، کلمه‌ی These هست (نزدیک، جمع).",
      },
    ],
    practicePrompt: "Point at objects near and far using This/That with the AI.",
  },

  /* ====================================================================== */
  /*  Unit 4 — Lesson 1: Food & Drinks (8 items)                            */
  /* ====================================================================== */
  "a0-4-1": {
    lessonId: "a0-4-1",
    vocabulary: [
      { term: "water", phonetic: "ˈwɔːtər", meaning: "آب", example: "A glass of water.", emoji: "💧" },
      { term: "coffee", phonetic: "ˈkɔːfi", meaning: "قهوه", example: "I'd like a coffee.", emoji: "☕" },
      { term: "tea", phonetic: "tiː", meaning: "چای", example: "A cup of tea, please.", emoji: "🍵" },
      { term: "milk", phonetic: "mɪlk", meaning: "شیر", example: "I drink milk every day.", emoji: "🥛" },
      { term: "bread", phonetic: "bred", meaning: "نان", example: "I eat bread for breakfast.", emoji: "🍞" },
      { term: "sandwich", phonetic: "ˈsænwɪtʃ", meaning: "ساندویچ", example: "A cheese sandwich.", emoji: "🥪" },
      { term: "menu", phonetic: "ˈmenjuː", meaning: "منو / فهرست غذا", example: "Can I see the menu?", emoji: "📋" },
      { term: "bill", phonetic: "bɪl", meaning: "صورتحساب", example: "The bill, please.", emoji: "🧾" },
    ],
    grammar: {
      rule: "Please + Thank you = magic words! 🪄",
      explanation:
        "Please برای درخواست مودبانه و Thank you برای تشکر استفاده می‌شه. این دو کلمه کلید دل‌بردن تو انگلیسی‌ان! هیچ‌وقت فراموش‌شون نکن.",
      examples: ["Coffee, please.", "Thank you!", "Water, please.", "Thank you very much!"],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "کلمه‌ی «ممنون» کدامه؟",
        options: ["please", "thank you", "hello", "goodbye"],
        correctIndex: 1,
        explain: "Thank you = ممنون.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: یک قهوه، لطفاً.",
        words: ["a", "coffee", ",", "please", "."],
        correctSentence: "a coffee, please.",
        explain: "ترتیب رایج سفارش: a + item + please.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "می‌خوای منو رو ببینی. چه می‌گی؟",
        options: ["The bill, please", "Can I see the menu?", "Thank you", "Goodbye"],
        correctIndex: 1,
        explain: "Can I see the menu? یعنی «منو رو می‌تونم ببینم؟».",
      },
    ],
    practicePrompt: "Order a drink politely from the AI café tutor.",
  },

  /* ====================================================================== */
  /*  Unit 4 — Lesson 2: Polite Requests (Can I have / I'd like / How much) */
  /* ====================================================================== */
  "a0-4-2": {
    lessonId: "a0-4-2",
    vocabulary: [
      { term: "I'd like...", phonetic: "aɪd laɪk", meaning: "من ... می‌خوام", example: "I'd like a tea.", emoji: "🙋" },
      { term: "Can I have...?", phonetic: "kæn aɪ hæv", meaning: "میشه ... بهم بدی؟", example: "Can I have water?", emoji: "🤲" },
      { term: "How much is it?", phonetic: "haʊ mʌtʃ ɪz ɪt", meaning: "چند پولشه؟", example: "How much is the coffee?", emoji: "💰" },
      { term: "Here you go", phonetic: "hɪr juː ɡoʊ", meaning: "بفرما (بیا، بگیر)", example: "— Here you go. — Thank you!", emoji: "👐" },
      { term: "Excuse me", phonetic: "ɪkˈskjuːz miː", meaning: "ببخشید (جلب توجه)", example: "Excuse me, where is the cafe?", emoji: "🚶" },
    ],
    grammar: {
      rule: "I'd like + item · Can I have + item · How much is it?",
      explanation:
        "سه الگوی مودبانه و پرکاربرد: I'd like a coffee (من یه قهوه می‌خوام) یا Can I have a coffee? (میشه یه قهوه بدی؟) برای درخواست، و How much is it? (چند پولشه؟) برای پرسیدن قیمت. هر سه طبیعی و مودبانه‌ان!",
      examples: [
        "I'd like a tea.",
        "Can I have water, please?",
        "How much is it?",
        "Here you go. — Thank you!",
      ],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "بگو: من یک آب می‌خوام.",
        words: ["I'd", "water", "like", "a", "."],
        correctSentence: "I'd like a water.",
        explain: "ترتیب: I'd + like + a + item.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "می‌خوای قیمت رو بدونی. چه می‌پرسی؟",
        options: ["Here you go", "Can I have?", "How much is it?", "Thank you"],
        correctIndex: 2,
        explain: "How much is it? یعنی «چند پولشه؟».",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "وقتی کسی چیزی بهت می‌ده، می‌گی:",
        options: ["Excuse me", "Here you go", "Goodbye", "Hello"],
        correctIndex: 1,
        explain: "وقتی چیزی رو به کسی می‌دی می‌گی: Here you go (بفرما/بیا بگیر).",
      },
    ],
    practiceScenarioId: "cafe-ordering",
    practicePrompt: "Walk into the AI café and order a drink using I'd like / Can I have.",
  },
};
