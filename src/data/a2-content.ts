import type { LessonContent } from "@/types";

/**
 * FULL senior-instructor content for the 8 non-roleplay A2 lessons.
 *
 * Compliance: Oxford / Cambridge A2 (Pre-Intermediate). No omissions.
 *
 * Each lesson has the 4-step flow: vocabulary → grammar → quiz → practice.
 * Roleplay lessons (a2-1-3, a2-2-3, a2-3-3, a2-4-3) have no entry here —
 * they launch straight into a live AI chat via their persona.
 */
export const A2_LESSON_CONTENT: Record<string, LessonContent> = {
  /* ====================================================================== */
  /*  Unit 1 — Lesson 1: 20 irregular past verbs                            */
  /* ====================================================================== */
  "a2-1-1": {
    lessonId: "a2-1-1",
    vocabulary: [
      { term: "went", phonetic: "went", meaning: "رفت (go)", example: "I went to Paris.", emoji: "🚶" },
      { term: "saw", phonetic: "sɔː", meaning: "دید (see)", example: "She saw a movie.", emoji: "👀" },
      { term: "ate", phonetic: "eɪt", meaning: "خورد (eat)", example: "We ate pizza.", emoji: "🍕" },
      { term: "bought", phonetic: "bɔːt", meaning: "خرید (buy)", example: "He bought a car.", emoji: "🛒" },
      { term: "felt", phonetic: "felt", meaning: "احساس کرد (feel)", example: "I felt happy.", emoji: "😊" },
      { term: "came", phonetic: "keɪm", meaning: "آمد (come)", example: "They came late.", emoji: "🚪" },
      { term: "took", phonetic: "tʊk", meaning: "گرفت/برداشت (take)", example: "She took a photo.", emoji: "📸" },
      { term: "gave", phonetic: "ɡeɪv", meaning: "داد (give)", example: "He gave me a gift.", emoji: "🎁" },
      { term: "made", phonetic: "meɪd", meaning: "ساخت/درست کرد (make)", example: "I made dinner.", emoji: "🍲" },
      { term: "said", phonetic: "sed", meaning: "گفت (say)", example: "She said hello.", emoji: "💬" },
      { term: "found", phonetic: "faʊnd", meaning: "پیدا کرد (find)", example: "I found my keys!", emoji: "🔑" },
      { term: "told", phonetic: "toʊld", meaning: "به کسی گفت (tell)", example: "He told a joke.", emoji: "🗣️" },
      { term: "left", phonetic: "left", meaning: "ترک کرد/رفت (leave)", example: "We left at 8.", emoji: "🚗" },
      { term: "met", phonetic: "met", meaning: "ملاقات کرد (meet)", example: "I met Sara yesterday.", emoji: "🤝" },
      { term: "ran", phonetic: "ræn", meaning: "دوید (run)", example: "He ran fast.", emoji: "🏃" },
      { term: "lost", phonetic: "lɔːst", meaning: "گم کرد (lose)", example: "I lost my phone.", emoji: "📵" },
      { term: "had", phonetic: "hæd", meaning: "داشت (have)", example: "We had fun.", emoji: "🎉" },
      { term: "got", phonetic: "ɡɑːt", meaning: "گرفت/شد (get)", example: "She got a letter.", emoji: "✉️" },
      { term: "drank", phonetic: "dræŋk", meaning: "نوشید (drink)", example: "I drank tea.", emoji: "🍵" },
      { term: "slept", phonetic: "slept", meaning: "خوابید (sleep)", example: "He slept 8 hours.", emoji: "😴" },
    ],
    grammar: {
      rule: "Irregular past: went / saw / ate — no -ed ending",
      explanation:
        "برخی افعال در گذشته بی‌قاعده هستند — شکل گذشته‌ی آن‌ها را باید حفظ کنی. این افعال در جمله‌ی مثبت مستقیم استفاده می‌شوند: I went, She saw. برای منفی و سوال، از did استفاده کن: I didn't go (نه didn't went!).",
      examples: ["I went to school. (مثبت)", "I didn't go to school. (منفی)", "Did you go to school? (سوال)"],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "گذشته‌ی «buy» کدام است؟",
        options: ["buyed", "bought", "buyt", "boughted"],
        correctIndex: 1,
        explain: "buy یک فعل بی‌قاعده است: buy → bought.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: ما دیروز پیتزا خوردیم.",
        words: ["We", "ate", "pizza", "yesterday", "."],
        correctSentence: "We ate pizza yesterday.",
        explain: "ترتیب گذشته: Subject + past verb + object + زمان.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "منفی «من رفتم» کدام است؟",
        options: ["I didn't went.", "I didn't go.", "I not went.", "I don't went."],
        correctIndex: 1,
        explain: "بعد از didn't فعل به شکل پایه برمی‌گردد: didn't go.",
      },
    ],
    practicePrompt: "Tell the AI about your last vacation using irregular past verbs.",
  },

  /* ====================================================================== */
  /*  Unit 1 — Lesson 2: Past negative & questions                          */
  /* ====================================================================== */
  "a2-1-2": {
    lessonId: "a2-1-2",
    vocabulary: [
      { term: "Did you...?", phonetic: "dɪd juː", meaning: "آیا تو ...؟ (گذشته)", example: "Did you see the film?", emoji: "❓" },
      { term: "I didn't...", phonetic: "aɪ dɪdnt", meaning: "من ... نکردم", example: "I didn't watch TV.", emoji: "🚫" },
      { term: "Was / Were", phonetic: "wɒz / wɜːr", meaning: "بود/بودند", example: "I was happy. They were late.", emoji: "📍" },
      { term: "Wasn't / Weren't", phonetic: "ˈwɒznt / ˈwɜːrnt", meaning: "نبود/نبودند", example: "She wasn't there.", emoji: "🚫" },
    ],
    grammar: {
      rule: "(?) Did + subject + verb? · (-) didn't + verb",
      explanation:
        "در گذشته، برای سوال Did اول می‌آید: Did you go? برای منفی از didn't استفاده کن: I didn't go. مهم: بعد از did/didn't فعل همیشه به شکل پایه برمی‌گردد (نه شکل گذشته). برای فعل be از Was/Were استفاده می‌کنیم.",
      examples: ["Did you eat breakfast? — Yes, I did.", "I didn't watch TV last night.", "She wasn't at home."],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "سوال بساز: آیا تو فیلم رو دیدی؟",
        words: ["Did", "you", "see", "the", "film", "?"],
        correctSentence: "Did you see the film?",
        explain: "ترتیب: Did + subject + base verb + ...?",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "کدام جمله درست است؟",
        options: ["I didn't went out.", "I didn't go out.", "I not went out.", "I didn't went."],
        correctIndex: 1,
        explain: "بعد از didn't فعل پایه می‌آید: didn't go.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "گذشته‌ی منفی «او آنجا بود» چیست؟",
        options: ["She didn't was there.", "She wasn't there.", "She weren't there.", "She not was there."],
        correctIndex: 1,
        explain: "برای فعل be در گذشته: was/wasn't (مفرد)، were/weren't (جمع).",
      },
    ],
    practicePrompt: "Ask the AI about their past weekend using Did you...? questions.",
  },

  /* ====================================================================== */
  /*  Unit 2 — Lesson 1: Travel & future plans vocab                        */
  /* ====================================================================== */
  "a2-2-1": {
    lessonId: "a2-2-1",
    vocabulary: [
      { term: "book a hotel", phonetic: "bʊk ə hoʊˈtel", meaning: "رزرو هتل", example: "I want to book a hotel.", emoji: "🏨" },
      { term: "pack bags", phonetic: "pæk bæɡz", meaning: "جمع کردن چمدان", example: "I need to pack my bags.", emoji: "🧳" },
      { term: "flight ticket", phonetic: "flaɪt ˈtɪkɪt", meaning: "بلیط پرواز", example: "I bought a flight ticket.", emoji: "🎫" },
      { term: "passport", phonetic: "ˈpæspɔːrt", meaning: "پاسپورت", example: "Don't forget your passport.", emoji: "📘" },
      { term: "departure", phonetic: "dɪˈpɑːrtʃər", meaning: "حرکت/پرواز", example: "Departure is at 6 AM.", emoji: "🛫" },
      { term: "arrival", phonetic: "əˈraɪvəl", meaning: "ورود/رسیدن", example: "Our arrival is at 10.", emoji: "🛬" },
      { term: "destination", phonetic: "ˌdestɪˈneɪʃn", meaning: "مقصد", example: "Paris is our destination.", emoji: "📍" },
      { term: "suitcase", phonetic: "ˈsuːtkeɪs", meaning: "چمدان", example: "My suitcase is heavy.", emoji: "🧳" },
      { term: "check-in", phonetic: "tʃek ɪn", meaning: "چک‌این", example: "Check-in is at 3 PM.", emoji: "🏨" },
      { term: "souvenir", phonetic: "ˌsuːvəˈnɪr", meaning: "یادگاری", example: "I bought a souvenir.", emoji: "🎁" },
    ],
    grammar: {
      rule: "be going to + verb → future plans",
      explanation:
        "برای برنامه‌های قطعی آینده از be going to استفاده کن: I am going to travel. She is going to pack. They are going to fly. این ساختار یعنی «قصد دارم/می‌خواهم...».",
      examples: ["I am going to visit Paris.", "She is going to book a hotel.", "We are going to fly tomorrow."],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "بگو: من قصد دارم هتل رزرو کنم.",
        words: ["am", "I", "going", "to", "book", "a", "hotel", "."],
        correctSentence: "I am going to book a hotel.",
        explain: "ساختار: Subject + am/is/are + going to + verb.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "«من قصد دارم بلیط بخرم» — کدام درست است؟",
        options: ["I going to buy a ticket.", "I am going to buy a ticket.", "I am go to buy a ticket.", "I going buy a ticket."],
        correctIndex: 1,
        explain: "ساختار be going to: I am going to + verb.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "«چمدان» به انگلیسی چیست؟",
        options: ["passport", "suitcase", "ticket", "souvenir"],
        correctIndex: 1,
        explain: "suitcase = چمدان.",
      },
    ],
    practicePrompt: "Tell the AI about your next travel plans using 'be going to'.",
  },

  /* ====================================================================== */
  /*  Unit 2 — Lesson 2: Comparatives & superlatives                        */
  /* ====================================================================== */
  "a2-2-2": {
    lessonId: "a2-2-2",
    vocabulary: [
      { term: "bigger than", phonetic: "ˈbɪɡər ðæn", meaning: "بزرگ‌تر از", example: "London is bigger than Paris.", emoji: "📏" },
      { term: "smaller than", phonetic: "ˈsmɔːlər ðæn", meaning: "کوچک‌تر از", example: "My room is smaller.", emoji: "📐" },
      { term: "more expensive", phonetic: "mɔːr ɪkˈspensɪv", meaning: "گران‌تر", example: "This car is more expensive.", emoji: "💰" },
      { term: "better than", phonetic: "ˈbetər ðæn", meaning: "بهتر از", example: "Tea is better than coffee.", emoji: "⭐" },
      { term: "worse than", phonetic: "wɜːrs ðæn", meaning: "بدتر از", example: "Today is worse than yesterday.", emoji: "📉" },
      { term: "the biggest", phonetic: "ðə ˈbɪɡɪst", meaning: "بزرگ‌ترین", example: "China is the biggest country.", emoji: "🏆" },
      { term: "the most famous", phonetic: "ðə moʊst ˈfeɪməs", meaning: "معروف‌ترین", example: "Paris is the most famous city.", emoji: "🌟" },
      { term: "the best", phonetic: "ðə best", meaning: "بهترین", example: "This is the best pizza!", emoji: "🥇" },
    ],
    grammar: {
      rule: "Comparative: adj + er / more + adj · Superlative: the + adj + est / the most + adj",
      explanation:
        "برای مقایسه‌ی دو چیز از تفضیلی استفاده کن: bigger, faster, more expensive. برای برترین در یک گروه از عالی استفاده کن: the biggest, the most famous, the best. صفات کوتاه +er/est می‌گیرند، صفات بلند با more/most.",
      examples: ["London is bigger than Paris.", "This is the most expensive hotel.", "She is the best student."],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "تفضیلی «expensive» کدام است؟",
        options: ["expensiveer", "more expensive", "expensiver", "most expensive"],
        correctIndex: 1,
        explain: "صفات بلند (۳ سیلاب یا بیشتر) با more مقایسه می‌شوند: more expensive.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: لندن از پاریس بزرگ‌تر است.",
        words: ["bigger", "London", "is", "than", "Paris", "."],
        correctSentence: "London is bigger than Paris.",
        explain: "ساختار: Subject + is + comparative + than + object.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "عالی «good» کدام است؟",
        options: ["the goodest", "the most good", "the best", "the better"],
        correctIndex: 2,
        explain: "good بی‌قاعده است: better → the best.",
      },
    ],
    practicePrompt: "Compare two cities or two foods using comparatives with the AI.",
  },

  /* ====================================================================== */
  /*  Unit 3 — Lesson 1: Body parts & health                                 */
  /* ====================================================================== */
  "a2-3-1": {
    lessonId: "a2-3-1",
    vocabulary: [
      { term: "headache", phonetic: "ˈhedeɪk", meaning: "سردرد", example: "I have a headache.", emoji: "🤕" },
      { term: "fever", phonetic: "ˈfiːvər", meaning: "تب", example: "She has a fever.", emoji: "🌡️" },
      { term: "sore throat", phonetic: "sɔːr θroʊt", meaning: "گلودرد", example: "I have a sore throat.", emoji: "😷" },
      { term: "cough", phonetic: "kɒf", meaning: "سرفه", example: "He has a bad cough.", emoji: "🤧" },
      { term: "stomachache", phonetic: "ˈstʌməkeɪk", meaning: "درد شکم", example: "I have a stomachache.", emoji: "🤢" },
      { term: "cold", phonetic: "koʊld", meaning: "سرماخوردگی", example: "I caught a cold.", emoji: "🤧" },
      { term: "medicine", phonetic: "ˈmedsən", meaning: "دارو", example: "Take this medicine.", emoji: "💊" },
      { term: "appointment", phonetic: "əˈpɔɪntmənt", meaning: "نوبت/وقت ویزیت", example: "I have a doctor's appointment.", emoji: "📅" },
      { term: "temperature", phonetic: "ˈtemprətʃər", meaning: "دمای بدن", example: "Let me check your temperature.", emoji: "🌡️" },
      { term: "rest", phonetic: "rest", meaning: "استراحت", example: "You need to rest.", emoji: "🛏️" },
    ],
    grammar: {
      rule: "I have a + illness → I have a headache / a cold / a fever",
      explanation:
        "برای گفتن اینکه مریض هستی از ساختار I have a + اسم بیماری استفاده کن: I have a headache. I have a cold. برای توصیه از should استفاده می‌کنیم: You should rest.",
      examples: ["I have a terrible headache.", "She has a fever and a cough.", "You should take some medicine."],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "«من سردرد دارم» چطور گفته می‌شود؟",
        options: ["I am headache.", "I have a headache.", "I have headache.", "My head hurts me."],
        correctIndex: 1,
        explain: "ساختار: I have a + illness.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: تو باید استراحت کنی.",
        words: ["should", "You", "rest", "."],
        correctSentence: "You should rest.",
        explain: "ساختار توصیه: Subject + should + verb.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "«دارو» به انگلیسی چیست؟",
        options: ["temperature", "medicine", "appointment", "fever"],
        correctIndex: 1,
        explain: "medicine = دارو.",
      },
    ],
    practicePrompt: "Describe your symptoms to the AI doctor and get advice.",
  },

  /* ====================================================================== */
  /*  Unit 3 — Lesson 2: Should / shouldn't (advice)                        */
  /* ====================================================================== */
  "a2-3-2": {
    lessonId: "a2-3-2",
    vocabulary: [
      { term: "should", phonetic: "ʃʊd", meaning: "باید/بهتر است (توصیه)", example: "You should rest.", emoji: "✅" },
      { term: "shouldn't", phonetic: "ˈʃʊdnt", meaning: "نباید/بهتر نیست", example: "You shouldn't smoke.", emoji: "🚫" },
      { term: "drink water", phonetic: "drɪŋk ˈwɔːtər", meaning: "آب بنوش", example: "You should drink water.", emoji: "💧" },
      { term: "see a doctor", phonetic: "siː ə ˈdɑːktər", meaning: "به پزشک مراجعه کن", example: "You should see a doctor.", emoji: "👨‍⚕️" },
      { term: "stay in bed", phonetic: "steɪ ɪn bed", meaning: "در رختخواب بمان", example: "You should stay in bed.", emoji: "🛏️" },
    ],
    grammar: {
      rule: "should / shouldn't + verb → giving advice",
      explanation:
        "برای توصیه کردن از should (مثبت) یا shouldn't (منفی) استفاده کن. بعد از آن‌ها فعل به شکل پایه می‌آید: You should rest. You shouldn't eat junk food. این ساختار برای نصیحت و پیشنهاد استفاده می‌شود.",
      examples: ["You should drink more water.", "You shouldn't go to work today.", "She should see a doctor."],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "بگو: تو نباید سیگار بکشی.",
        words: ["shouldn't", "You", "smoke", "."],
        correctSentence: "You shouldn't smoke.",
        explain: "ترتیب: Subject + shouldn't + verb.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "دوستم تب دارد. چه توصیه‌ای می‌کنم؟",
        options: ["You should eat ice cream.", "You should see a doctor.", "You shouldn't rest.", "You should run."],
        correctIndex: 1,
        explain: "وقتی کسی تب دارد، باید به پزشک مراجعه کند.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "کدام جمله درست است؟",
        options: ["You should to rest.", "You should resting.", "You should rest.", "You shoulds rest."],
        correctIndex: 2,
        explain: "بعد از should فعل پایه بدون to می‌آید: should rest.",
      },
    ],
    practicePrompt: "Give health advice to the AI using should/shouldn't.",
  },

  /* ====================================================================== */
  /*  Unit 4 — Lesson 1: Life experiences vocab                              */
  /* ====================================================================== */
  "a2-4-1": {
    lessonId: "a2-4-1",
    vocabulary: [
      { term: "try new food", phonetic: "traɪ nuː fuːd", meaning: "غذای جدید امتحان کردن", example: "I love to try new food.", emoji: "🍱" },
      { term: "travel abroad", phonetic: "ˈtrævl əˈbrɔːd", meaning: "سفر به خارج", example: "Have you traveled abroad?", emoji: "🌍" },
      { term: "climb a mountain", phonetic: "klaɪm ə ˈmaʊntɪn", meaning: "کوهنوردی", example: "I climbed a mountain.", emoji: "⛰️" },
      { term: "ride a horse", phonetic: "raɪd ə hɔːrs", meaning: "سوارکاری", example: "She rode a horse.", emoji: "🐎" },
      { term: "skydiving", phonetic: "ˈskaɪdaɪvɪŋ", meaning: "چتربازی", example: "Skydiving is exciting!", emoji: "🪂" },
      { term: "scuba diving", phonetic: "ˈskuːbə daɪvɪŋ", meaning: "غواصی", example: "I tried scuba diving.", emoji: "🤿" },
      { term: "learn a language", phonetic: "lɜːrn ə ˈlæŋɡwɪdʒ", meaning: "یادگیری زبان", example: "I'm learning English!", emoji: "🗣️" },
      { term: "meet someone famous", phonetic: "miːt ˈsʌmwʌn ˈfeɪməs", meaning: "ملاقات آدم معروف", example: "I met a famous singer.", emoji: "⭐" },
      { term: "win a prize", phonetic: "wɪn ə praɪz", meaning: "برنده شدن جایزه", example: "She won a prize!", emoji: "🏆" },
      { term: "lose weight", phonetic: "luːz weɪt", meaning: "کاهش وزن", example: "He lost 5 kilos.", emoji: "⚖️" },
    ],
    grammar: {
      rule: "Present Perfect: have/has + past participle",
      explanation:
        "برای صحبت از تجربیات زندگی از حال کامل استفاده کن: I have visited Paris. She has tried sushi. برای سوال: Have you ever...? برای منفی: I haven't (have not). این زمان یعنی «تا حالا» یا «در مقطعی از زندگی‌ام».",
      examples: ["I have visited 10 countries.", "She has never eaten sushi.", "Have you ever been to London?"],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "کدام جمله درست است؟ «من پاریس را دیده‌ام»",
        options: ["I have saw Paris.", "I have seen Paris.", "I has seen Paris.", "I have see Paris."],
        correctIndex: 1,
        explain: "حال کامل: have + past participle (seen).",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: آیا تا به حال سوشی خوریی؟",
        words: ["Have", "you", "ever", "eaten", "sushi", "?"],
        correctSentence: "Have you ever eaten sushi?",
        explain: "ترتیب: Have + subject + ever + past participle?",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "منفی «من دیده‌ام» چیست؟",
        options: ["I haven't saw it.", "I haven't seen it.", "I don't have seen it.", "I hasn't seen it."],
        correctIndex: 1,
        explain: "haven't + past participle (seen).",
      },
    ],
    practicePrompt: "Tell the AI about exciting experiences you've had using present perfect.",
  },

  /* ====================================================================== */
  /*  Unit 4 — Lesson 2: Present perfect deep-dive                           */
  /* ====================================================================== */
  "a2-4-2": {
    lessonId: "a2-4-2",
    vocabulary: [
      { term: "Have you ever...?", phonetic: "hæv juː ˈevər", meaning: "تا به حال ...؟", example: "Have you ever traveled alone?", emoji: "❓" },
      { term: "I have never...", phonetic: "aɪ hæv ˈnevər", meaning: "من هیچ‌وقت ...", example: "I have never eaten sushi.", emoji: "🚫" },
      { term: "already", phonetic: "ɔːlˈredi", meaning: "قبلاً/از پیش", example: "I've already seen it.", emoji: "✅" },
      { term: "yet", phonetic: "jet", meaning: "هنوز (سوالی/منفی)", example: "Have you eaten yet? I haven't yet.", emoji: "⏳" },
      { term: "just", phonetic: "dʒʌst", meaning: "همین الان", example: "I've just finished.", emoji: "⏰" },
      { term: "since / for", phonetic: "sɪns / fɔːr", meaning: "از / برای", example: "I've lived here since 2020. For 4 years.", emoji: "📅" },
    ],
    grammar: {
      rule: "have/has + past participle + ever/never/already/yet/just",
      explanation:
        "کلمات کلیدی حال کامل: ever (تا به حال)، never (هیچ‌وقت)، already (قبلاً)، yet (هنوز — در سوال/منفی)، just (همین الان). since با نقطه‌ی زمانی (since Monday) و for با مدت (for 3 days) استفاده می‌شود.",
      examples: ["Have you ever been to Italy?", "I've already done my homework.", "She hasn't arrived yet.", "I've just eaten."],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "بگو: من هیچ‌وقت سوشی نخورده‌ام.",
        words: ["have", "I", "never", "eaten", "sushi", "."],
        correctSentence: "I have never eaten sushi.",
        explain: "ترتیب: Subject + have/has + never + past participle.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "کدام کلمه برای سوال مناسب است؟ «Have you finished ___?»",
        options: ["already", "yet", "since", "never"],
        correctIndex: 1,
        explain: "yet در سوالی و منفی استفاده می‌شود.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "«من ۲۰۲۰ از اینجا زندگی می‌کنم» — کدام درست است؟",
        options: ["I've lived here for 2020.", "I've lived here since 2020.", "I've lived here from 2020.", "I've lived here at 2020."],
        correctIndex: 1,
        explain: "since با نقطه‌ی زمانی (since 2020)، for با مدت (for 4 years).",
      },
    ],
    practicePrompt: "Ask the AI 'Have you ever...?' questions about life experiences.",
  },
};
