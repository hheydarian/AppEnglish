import type { LessonContent } from "@/types";

/**
 * FULL senior-instructor content for the 8 non-roleplay A1 lessons.
 *
 * Compliance: Oxford English File Elementary. No omissions — every word,
 * job, family member, verb, and grammar rule the spec requires is present.
 *
 * Each lesson has the 4-step flow: vocabulary → grammar → quiz → practice.
 * Roleplay lessons (a1-1-3, a1-2-3, a1-3-3, a1-4-3) have no entry here —
 * they launch straight into a live AI chat via their persona.
 */
export const A1_LESSON_CONTENT: Record<string, LessonContent> = {
  /* ====================================================================== */
  /*  Unit 1 — Lesson 1: 50 daily routine words (split into flashcards)      */
  /* ====================================================================== */
  "a1-1-1": {
    lessonId: "a1-1-1",
    vocabulary: [
      // morning
      { term: "wake up", phonetic: "weɪk ʌp", meaning: "بیدار شدن", example: "I wake up at 7.", emoji: "⏰" },
      { term: "get up", phonetic: "ɡet ʌp", meaning: "بلند شدن از خواب", example: "I get up at 7:15.", emoji: "🛏️" },
      { term: "brush my teeth", phonetic: "brʌʃ maɪ tiːθ", meaning: "مسواک زدن", example: "I brush my teeth.", emoji: "🪥" },
      { term: "take a shower", phonetic: "teɪk ə ˈʃaʊər", meaning: "دوش گرفتن", example: "I take a shower.", emoji: "🚿" },
      { term: "get dressed", phonetic: "ɡet drest", meaning: "لباس پوشیدن", example: "I get dressed.", emoji: "👕" },
      { term: "have breakfast", phonetic: "hæv ˈbrekfəst", meaning: "صبحانه خوردن", example: "I have breakfast at 8.", emoji: "🍳" },
      { term: "have coffee", phonetic: "hæv ˈkɔːfi", meaning: "قهوه خوردن", example: "I have coffee in the morning.", emoji: "☕" },
      // day
      { term: "go to work", phonetic: "ɡoʊ tuː wɜːrk", meaning: "به سر کار رفتن", example: "I go to work at 9.", emoji: "🏢" },
      { term: "go to school", phonetic: "ɡoʊ tuː skuːl", meaning: "به مدرسه/دانشگاه رفتن", example: "She goes to school.", emoji: "🎒" },
      { term: "study", phonetic: "ˈstʌdi", meaning: "درس خواندن", example: "I study English.", emoji: "📚" },
      { term: "work", phonetic: "wɜːrk", meaning: "کار کردن", example: "I work in an office.", emoji: "💻" },
      { term: "have lunch", phonetic: "hæv lʌntʃ", meaning: "ناهار خوردن", example: "We have lunch at 1.", emoji: "🍽️" },
      { term: "meet friends", phonetic: "miːt frendz", meaning: "ملاقات دوستان", example: "I meet my friends.", emoji: "🧑‍🤝‍🧑" },
      { term: "check email", phonetic: "tʃek ˈiːmeɪl", meaning: "چک کردن ایمیل", example: "I check my email.", emoji: "📧" },
      { term: "drive", phonetic: "draɪv", meaning: "رانندگی کردن", example: "I drive to work.", emoji: "🚗" },
      // evening
      { term: "come home", phonetic: "kʌm hoʊm", meaning: "به خانه آمدن", example: "I come home at 6.", emoji: "🏠" },
      { term: "cook dinner", phonetic: "kʊk ˈdɪnər", meaning: "شام پختن", example: "I cook dinner.", emoji: "🍲" },
      { term: "have dinner", phonetic: "hæv ˈdɪnər", meaning: "شام خوردن", example: "We have dinner at 8.", emoji: "🍜" },
      { term: "watch TV", phonetic: "wɑːtʃ tiː viː", meaning: "تلویزیون تماشا کردن", example: "I watch TV.", emoji: "📺" },
      { term: "read", phonetic: "riːd", meaning: "خواندن", example: "I read a book.", emoji: "📖" },
      { term: "listen to music", phonetic: "ˈlɪsn tuː ˈmjuːzɪk", meaning: "گوش دادن به موسیقی", example: "I listen to music.", emoji: "🎵" },
      // night
      { term: "go to bed", phonetic: "ɡoʊ tuː bed", meaning: "به رختخواب رفتن", example: "I go to bed at 11.", emoji: "😴" },
      { term: "sleep", phonetic: "sliːp", meaning: "خوابیدن", example: "I sleep 8 hours.", emoji: "💤" },
      // common verbs
      { term: "eat", phonetic: "iːt", meaning: "خوردن", example: "I eat at noon.", emoji: "🍴" },
      { term: "drink", phonetic: "drɪŋk", meaning: "نوشیدن", example: "I drink water.", emoji: "🥤" },
      { term: "walk", phonetic: "wɔːk", meaning: "پیاده‌روی", example: "I walk every day.", emoji: "🚶" },
      { term: "talk", phonetic: "tɔːk", meaning: "صحبت کردن", example: "We talk a lot.", emoji: "💬" },
      { term: "call", phonetic: "kɔːl", meaning: "تماس گرفتن", example: "I call my mom.", emoji: "📱" },
      { term: "shop", phonetic: "ʃɑːp", meaning: "خرید کردن", example: "I shop on Fridays.", emoji: "🛍️" },
      { term: "clean", phonetic: "kliːn", meaning: "تمیز کردن", example: "I clean my room.", emoji: "🧹" },
      { term: "wash", phonetic: "wɑːʃ", meaning: "شستن", example: "I wash the dishes.", emoji: "🧼" },
      { term: "exercise", phonetic: "ˈeksərsaɪz", meaning: "ورزش کردن", example: "I exercise in the morning.", emoji: "🏃" },
      { term: "play", phonetic: "pleɪ", meaning: "بازی کردن", example: "Kids play outside.", emoji: "⚽" },
      { term: "write", phonetic: "raɪt", meaning: "نوشتن", example: "I write emails.", emoji: "✍️" },
      { term: "buy", phonetic: "baɪ", meaning: "خریدن", example: "I buy bread.", emoji: "🛒" },
      { term: "start", phonetic: "stɑːrt", meaning: "شروع کردن", example: "Work starts at 9.", emoji: "▶️" },
      { term: "finish", phonetic: "ˈfɪnɪʃ", meaning: "تمام کردن", example: "I finish at 5.", emoji: "🏁" },
      { term: "open", phonetic: "ˈoʊpən", meaning: "باز کردن", example: "I open the door.", emoji: "🚪" },
      { term: "close", phonetic: "kloʊz", meaning: "بستن", example: "Close the window.", emoji: "🪟" },
      { term: "love", phonetic: "lʌv", meaning: "دوست داشتن", example: "I love coffee.", emoji: "❤️" },
      // time adverbs
      { term: "every day", phonetic: "ˈevri deɪ", meaning: "هر روز", example: "I study every day.", emoji: "📅" },
      { term: "always", phonetic: "ˈɔːlweɪz", meaning: "همیشه", example: "I always walk.", emoji: "💯" },
      { term: "usually", phonetic: "ˈjuːʒuəli", meaning: "معمولاً", example: "I usually wake up early.", emoji: "🔆" },
      { term: "sometimes", phonetic: "ˈsʌmtaɪmz", meaning: "گاهی اوقات", example: "I sometimes eat out.", emoji: "🎲" },
      { term: "never", phonetic: "ˈnevər", meaning: "هرگز", example: "I never smoke.", emoji: "🚫" },
      { term: "in the morning", phonetic: "ɪn ðə ˈmɔːrnɪŋ", meaning: "صبح‌ها", example: "I run in the morning.", emoji: "🌅" },
      { term: "in the evening", phonetic: "ɪn ðə ˈiːvnɪŋ", meaning: "عصرها", example: "I relax in the evening.", emoji: "🌆" },
      { term: "on weekends", phonetic: "ɑːn ˈwiːkendz", meaning: "آخر هفته‌ها", example: "I rest on weekends.", emoji: "🎉" },
      { term: "early", phonetic: "ˈɜːrli", meaning: "زود", example: "I wake up early.", emoji: "🕒" },
      { term: "late", phonetic: "leɪt", meaning: "دیر", example: "Don't be late!", emoji: "🕗" },
    ],
    grammar: {
      rule: "Present Simple: I / you / we / they + verb  ·  he / she / it + verb+s",
      explanation:
        "برای سخن از کارهای روزمره از زمان حال ساده استفاده می‌کنیم. بعد از I, you, we, they فعل تغییر نمی‌کند؛ ولی بعد از he, she, it یک s اضافه می‌کنیم: I work → He works. برای منفی از don't / doesn't استفاده کن: I don't work. She doesn't work.",
      examples: [
        "I work every day.",
        "She works in a hospital.",
        "We don't work on Fridays.",
        "He doesn't drink coffee.",
      ],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "کدام جمله درست است؟",
        options: ["She work hard.", "She works hard.", "She working hard.", "She don't work hard."],
        correctIndex: 1,
        explain: "بعد از she فعل s می‌گیرد: She works.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: من هر روز بیدار می‌شوم.",
        words: ["wake", "I", "up", "every", "day", "."],
        correctSentence: "I wake up every day.",
        explain: "ترتیب: I + wake + up + every + day.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "جمله منفی «او قهوه نمی‌خورد» چیست؟",
        options: ["She don't drink coffee.", "She doesn't drinks coffee.", "She doesn't drink coffee.", "She not drink coffee."],
        correctIndex: 2,
        explain: "بعد از doesn't فعل بدون s می‌آید: She doesn't drink.",
      },
    ],
    practicePrompt: "Tell the AI about your daily routine — when you wake up, work, and relax.",
  },

  /* ====================================================================== */
  /*  Unit 1 — Lesson 2: Present Simple grammar deep-dive                    */
  /* ====================================================================== */
  "a1-1-2": {
    lessonId: "a1-1-2",
    vocabulary: [
      { term: "don't", phonetic: "doʊnt", meaning: "نمی‌ (I/you/we/they)", example: "I don't smoke.", emoji: "🚫" },
      { term: "doesn't", phonetic: "ˈdʌznt", meaning: "نمی‌ (he/she/it)", example: "She doesn't smoke.", emoji: "🚫" },
      { term: "Do you...?", phonetic: "duː juː", meaning: "آیا تو ...؟", example: "Do you like tea?", emoji: "❓" },
      { term: "Does he...?", phonetic: "dʌz hiː", meaning: "آیا او ...؟", example: "Does he work here?", emoji: "❓" },
      { term: "always / never", phonetic: "ˈɔːlweɪz / ˈnevər", meaning: "همیشه / هرگز", example: "I always smile. I never lie.", emoji: "💯" },
    ],
    grammar: {
      rule: "(?) Do/Does ... ?  ·  (-) don't / doesn't  ·  (+) verb(+s)",
      explanation:
        "برای سوال در حال ساده Do یا Does اول می‌آید: Do you work? Does she work? برای منفی از don't / doesn't استفاده کن. فراموش نکن: وقتی does یا doesn't می‌آید، فعل اصلی s نمی‌گیرد.",
      examples: [
        "(+) I work. / She works.",
        "(-) I don't work. / She doesn't work.",
        "(?) Do you work? / Does she work?",
      ],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "سوال بساز: آیا تو قهوه دوست داری؟",
        words: ["Do", "you", "like", "coffee", "?"],
        correctSentence: "Do you like coffee?",
        explain: "ترتیب سوالی: Do + subject + verb + ...?",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "کدام درست است؟",
        options: ["Does she likes tea?", "Does she like tea?", "Do she like tea?", "Does she like tea."],
        correctIndex: 1,
        explain: "بعد از Does، فعل s نمی‌گیرد و علامت سوال آخر می‌آید.",
      },
      {
        id: "q3",
        kind: "word-order",
        prompt: "بگو: او هرگز دیر نمی‌کند.",
        words: ["never", "She", "late", "is", "."],
        correctSentence: "She is never late.",
        explain: "قید frequency بعد از فعل be می‌آید: She is never late.",
      },
    ],
    practicePrompt: "Ask the AI about their daily habits using Do/Does questions.",
  },

  /* ====================================================================== */
  /*  Unit 2 — Lesson 1: Family + Jobs                                       */
  /* ====================================================================== */
  "a1-2-1": {
    lessonId: "a1-2-1",
    vocabulary: [
      // family
      { term: "father", phonetic: "ˈfɑːðər", meaning: "پدر", example: "My father is a doctor.", emoji: "👨" },
      { term: "mother", phonetic: "ˈmʌðər", meaning: "مادر", example: "My mother is kind.", emoji: "👩" },
      { term: "parents", phonetic: "ˈperənts", meaning: "پدر و مادر", example: "My parents live in Tehran.", emoji: "👪" },
      { term: "brother", phonetic: "ˈbrʌðər", meaning: "برادر", example: "I have one brother.", emoji: "👦" },
      { term: "sister", phonetic: "ˈsɪstər", meaning: "خواهر", example: "My sister is a student.", emoji: "👧" },
      { term: "son", phonetic: "sʌn", meaning: "پسر", example: "Their son is 5.", emoji: "🧒" },
      { term: "daughter", phonetic: "ˈdɔːtər", meaning: "دختر", example: "Her daughter is cute.", emoji: "👧" },
      { term: "husband", phonetic: "ˈhʌzbənd", meaning: "شوهر", example: "My husband is a teacher.", emoji: "💍" },
      { term: "wife", phonetic: "waɪf", meaning: "همسر (زن)", example: "His wife is a nurse.", emoji: "💍" },
      { term: "uncle", phonetic: "ˈʌŋkəl", meaning: "عمو/دایی", example: "My uncle lives abroad.", emoji: "🧔" },
      { term: "aunt", phonetic: "ænt", meaning: "عمه/خاله", example: "My aunt cooks well.", emoji: "👩" },
      { term: "cousin", phonetic: "ˈkʌzn", meaning: "پسر/دخترخاله/عمو/دایی", example: "My cousin is my age.", emoji: "🧑" },
      { term: "grandfather", phonetic: "ˈɡrænfɑːðər", meaning: "پدربزرگ", example: "My grandfather is 80.", emoji: "👴" },
      { term: "grandmother", phonetic: "ˈɡrænmʌðər", meaning: "مادربزرگ", example: "My grandmother tells stories.", emoji: "👵" },
      // jobs
      { term: "doctor", phonetic: "ˈdɑːktər", meaning: "پزشک", example: "She is a doctor.", emoji: "👨‍⚕️" },
      { term: "teacher", phonetic: "ˈtiːtʃər", meaning: "معلم", example: "He is a teacher.", emoji: "👨‍🏫" },
      { term: "engineer", phonetic: "ˌendʒɪˈnɪr", meaning: "مهندس", example: "I am an engineer.", emoji: "👷" },
      { term: "nurse", phonetic: "nɜːrs", meaning: "پرستار", example: "She is a nurse.", emoji: "👩‍⚕️" },
      { term: "student", phonetic: "ˈstuːdnt", meaning: "دانش‌آموز", example: "I am a student.", emoji: "🧑‍🎓" },
      { term: "lawyer", phonetic: "ˈlɔːyər", meaning: "وکیل", example: "He is a lawyer.", emoji: "👨‍⚖️" },
      { term: "chef", phonetic: "ʃef", meaning: "آشپز", example: "My uncle is a chef.", emoji: "👨‍🍳" },
      { term: "driver", phonetic: "ˈdraɪvər", meaning: "راننده", example: "He is a taxi driver.", emoji: "🚕" },
      { term: "artist", phonetic: "ˈɑːrtɪst", meaning: "هنرمند", example: "She is an artist.", emoji: "🎨" },
      { term: "police officer", phonetic: "pəˈliːs ˈɑːfɪsər", meaning: "پلیس", example: "He is a police officer.", emoji: "👮" },
      { term: "businessman", phonetic: "ˈbɪznəsmæn", meaning: "بازرگان", example: "My father is a businessman.", emoji: "💼" },
      { term: "secretary", phonetic: "ˈsekrəteri", meaning: "منشی", example: "She is a secretary.", emoji: "👩‍💼" },
      { term: "farmer", phonetic: "ˈfɑːrmər", meaning: "کشاورز", example: "My grandfather is a farmer.", emoji: "👨‍🌾" },
      { term: "writer", phonetic: "ˈraɪtər", meaning: "نویسنده", example: "She is a writer.", emoji: "✍️" },
      { term: "musician", phonetic: "mjuːˈzɪʃn", meaning: "موسیقی‌دان", example: "He is a musician.", emoji: "🎼" },
      { term: "dentist", phonetic: "ˈdentɪst", meaning: "دندان‌پزشک", example: "I visit the dentist.", emoji: "🦷" },
    ],
    grammar: {
      rule: "Possessives: my / your / his / her / our / their",
      explanation:
        "برای نشان دادن ملکیت از صفات ملکی استفاده می‌کنیم: my (من)، your (تو)، his (او-مرد)، her (او-زن)، our (ما)، their (آن‌ها). توجه: his برای مرد و her برای زن است.",
      examples: ["My father is a doctor.", "Her brother is a teacher.", "Their son is a student.", "Our parents are kind."],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "«پدر من پزشک است» — کدام درست است؟",
        options: ["My father is a doctor.", "I father is a doctor.", "Me father is a doctor.", "Mine father is a doctor."],
        correctIndex: 0,
        explain: "صفت ملکی my قبل از اسم می‌آید: My father.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "از کلمه‌ی his برای کی استفاده می‌کنیم؟",
        options: ["برای یک زن", "برای یک مرد", "برای چند نفر", "برای خودم"],
        correctIndex: 1,
        explain: "his = او (مرد). her = او (زن).",
      },
      {
        id: "q3",
        kind: "word-order",
        prompt: "بگو: برادرش (خواهرِ یک زن) معلم است.",
        words: ["brother", "Her", "is", "a", "teacher", "."],
        correctSentence: "Her brother is a teacher.",
        explain: "برای برادر یک زن از her استفاده می‌کنیم.",
      },
    ],
    practicePrompt: "Describe your family members and their jobs to the AI.",
  },

  /* ====================================================================== */
  /*  Unit 2 — Lesson 2: Possessives + descriptive adjectives               */
  /* ====================================================================== */
  "a1-2-2": {
    lessonId: "a1-2-2",
    vocabulary: [
      { term: "tall", phonetic: "tɔːl", meaning: "قدبلند", example: "He is tall.", emoji: "📐" },
      { term: "short", phonetic: "ʃɔːrt", meaning: "قدکوتاه / کوتاه", example: "She is short.", emoji: "📏" },
      { term: "kind", phonetic: "kaɪnd", meaning: "مهربان", example: "My mom is kind.", emoji: "🤗" },
      { term: "busy", phonetic: "ˈbɪzi", meaning: "سرگیر / مشغول", example: "He is always busy.", emoji: "📅" },
      { term: "funny", phonetic: "ˈfʌni", meaning: "خنده‌دار / بامزه", example: "My brother is funny.", emoji: "😂" },
      { term: "smart", phonetic: "smɑːrt", meaning: "باهوش", example: "She is very smart.", emoji: "🧠" },
      { term: "young", phonetic: "jʌŋ", meaning: "جوان", example: "My sister is young.", emoji: "🌱" },
      { term: "old", phonetic: "oʊld", meaning: "پیر / قدیمی", example: "My grandfather is old.", emoji: "👴" },
      { term: "beautiful", phonetic: "ˈbjuːtɪfl", meaning: "زیبا", example: "She is beautiful.", emoji: "🌹" },
      { term: "handsome", phonetic: "ˈhænsəm", meaning: "خوش‌تیپ (مرد)", example: "He is handsome.", emoji: "💅" },
    ],
    grammar: {
      rule: "Subject + be + adjective  ·  He is tall. / She is kind.",
      explanation:
        "برای توصیف یک نفر، فعل be (am/is/are) را قبل از صفت می‌آوریم: He is tall. She is kind. در زبان فارسی نمی‌گوییم «او بلند قد است» ولی در انگلیسی این‌گونه است.",
      examples: ["He is tall and smart.", "My mother is kind and busy.", "Her sister is funny.", "Our father is handsome."],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "«او مهربان است» چطور گفته می‌شود؟",
        options: ["She kind.", "She is kind.", "She does kind.", "She has kind."],
        correctIndex: 1,
        explain: "صفت بعد از فعل be می‌آید: She is kind.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: مادرم پر مشغله است.",
        words: ["mother", "My", "is", "busy", "."],
        correctSentence: "My mother is busy.",
        explain: "ترتیب: My + mother + is + adjective.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "مخالف «young» کدام است؟",
        options: ["tall", "old", "kind", "busy"],
        correctIndex: 1,
        explain: "young (جوان) ↔ old (پیر).",
      },
    ],
    practicePrompt: "Describe your family members' personalities to the AI using adjectives.",
  },

  /* ====================================================================== */
  /*  Unit 3 — Lesson 1: Past simple verbs (regular & irregular)            */
  /* ====================================================================== */
  "a1-3-1": {
    lessonId: "a1-3-1",
    vocabulary: [
      // regular
      { term: "played", phonetic: "pleɪd", meaning: "بازی کرد", example: "I played football.", emoji: "⚽" },
      { term: "visited", phonetic: "ˈvɪzɪtɪd", meaning: "دیدار کرد", example: "We visited our grandparents.", emoji: "🏠" },
      { term: "watched", phonetic: "wɑːtʃt", meaning: "تماشا کرد", example: "I watched a movie.", emoji: "🎬" },
      { term: "worked", phonetic: "wɜːrkt", meaning: "کار کرد", example: "She worked late.", emoji: "💼" },
      { term: "studied", phonetic: "ˈstʌdid", meaning: "درس خواند", example: "I studied all night.", emoji: "📚" },
      { term: "listened", phonetic: "ˈlɪsnd", meaning: "گوش داد", example: "He listened to music.", emoji: "🎵" },
      { term: "cooked", phonetic: "kʊkt", meaning: "غذا پخت", example: "Mom cooked dinner.", emoji: "🍳" },
      { term: "cleaned", phonetic: "kliːnd", meaning: "تمیز کرد", example: "I cleaned my room.", emoji: "🧹" },
      { term: "walked", phonetic: "wɔːkt", meaning: "پیاده روی کرد", example: "We walked home.", emoji: "🚶" },
      { term: "talked", phonetic: "tɔːkt", meaning: "صحبت کرد", example: "We talked for hours.", emoji: "💬" },
      // irregular
      { term: "went", phonetic: "went", meaning: "رفت", example: "I went to school.", emoji: "🚶‍♂️" },
      { term: "saw", phonetic: "sɔː", meaning: "دید", example: "I saw a movie.", emoji: "👀" },
      { term: "ate", phonetic: "eɪt", meaning: "خورد", example: "We ate pizza.", emoji: "🍕" },
      { term: "drank", phonetic: "dræŋk", meaning: "نوشید", example: "I drank tea.", emoji: "🥤" },
      { term: "had", phonetic: "hæd", meaning: "داشت/صرف کرد", example: "I had breakfast.", emoji: "🍽️" },
      { term: "made", phonetic: "meɪd", meaning: "ساخت/درست کرد", example: "She made a cake.", emoji: "🎂" },
      { term: "took", phonetic: "tʊk", meaning: "گرفت/برداشت", example: "I took a taxi.", emoji: "🚕" },
      { term: "got up", phonetic: "ɡɑːt ʌp", meaning: "بلند شد", example: "I got up at 7.", emoji: "⏰" },
      { term: "bought", phonetic: "bɔːt", meaning: "خرید", example: "I bought a book.", emoji: "🛍️" },
      { term: "came", phonetic: "keɪm", meaning: "آمد", example: "She came home late.", emoji: "🏠" },
    ],
    grammar: {
      rule: "Past Simple: (+) verb+ed / irregular  ·  (-) didn't + verb",
      explanation:
        "برای سخن از گذشته، افعال باقاعده +ed می‌گیرند (work → worked). افعال بی‌قاعده تغییر شکل می‌دهند (go → went). برای منفی از didn't + فعل اصلی استفاده کن: I didn't go.",
      examples: [
        "I worked yesterday. (باقاعده)",
        "She went to Paris. (بی‌قاعده)",
        "We didn't watch TV.",
        "Did you see the movie?",
      ],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "گذشته‌ی «go» کدام است؟",
        options: ["goed", "went", "gone", "going"],
        correctIndex: 1,
        explain: "go یک فعل بی‌قاعده است: go → went.",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: من دیروز به سینما رفتم.",
        words: ["I", "went", "to", "the", "cinema", "yesterday", "."],
        correctSentence: "I went to the cinema yesterday.",
        explain: "ترتیب گذشته: Subject + past verb + ... + زمان.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "منفی «او تلویزیون دید» چیست؟",
        options: ["She didn't watched TV.", "She didn't watch TV.", "She doesn't watch TV.", "She not watched TV."],
        correctIndex: 1,
        explain: "بعد از didn't، فعل به شکل پایه برمی‌گردد: didn't watch.",
      },
    ],
    practicePrompt: "Tell the AI what you did last weekend using past simple verbs.",
  },

  /* ====================================================================== */
  /*  Unit 3 — Lesson 2: Past simple + time expressions                      */
  /* ====================================================================== */
  "a1-3-2": {
    lessonId: "a1-3-2",
    vocabulary: [
      { term: "yesterday", phonetic: "ˈjestərdeɪ", meaning: "دیروز", example: "I saw him yesterday.", emoji: "📅" },
      { term: "last week", phonetic: "læst wiːk", meaning: "هفته‌ی گذشته", example: "We went last week.", emoji: "🗓️" },
      { term: "last night", phonetic: "læst naɪt", meaning: "دیشب", example: "I worked last night.", emoji: "🌙" },
      { term: "two days ago", phonetic: "tuː deɪz əˈɡoʊ", meaning: "دو روز پیش", example: "I arrived two days ago.", emoji: "⏳" },
      { term: "in 2020", phonetic: "ɪn", meaning: "در سال ۲۰۲۰", example: "I moved in 2020.", emoji: "📅" },
      { term: "this morning", phonetic: "ðɪs ˈmɔːrnɪŋ", meaning: "صبح امروز", example: "I saw him this morning.", emoji: "🌅" },
    ],
    grammar: {
      rule: "Past simple + when?  →  yesterday / last / ago",
      explanation:
        "برای اشاره به زمان در گذشته از yesterday، last (week/month/year) یا ago (دو روز پیش = two days ago) استفاده کن. این کلمات معمولاً آخر جمله می‌آیند.",
      examples: ["I saw her yesterday.", "We met last week.", "He left two hours ago."],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "بگو: ما هفته‌ی گذشته به سفر رفتیم.",
        words: ["We", "went", "on", "a", "trip", "last", "week", "."],
        correctSentence: "We went on a trip last week.",
        explain: "عبارت زمانی (last week) آخر جمله می‌آید.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "«دو روز پیش» چطور گفته می‌شود؟",
        options: ["last two days", "two days ago", "before two days", "yesterday two"],
        correctIndex: 1,
        explain: "ago بعد از مدت زمان می‌آید: two days ago.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "کدام جمله از نظر گرامری درست است؟",
        options: ["I see him yesterday.", "I saw him yesterday.", "I seen him yesterday.", "I am saw him yesterday."],
        correctIndex: 1,
        explain: "دیروز → گذشته ساده → saw (گذشته‌ی see).",
      },
    ],
    practicePrompt: "Tell the AI a short story about your last vacation using past tense + time words.",
  },

  /* ====================================================================== */
  /*  Unit 4 — Lesson 1: Shopping, clothes & prices                          */
  /* ====================================================================== */
  "a1-4-1": {
    lessonId: "a1-4-1",
    vocabulary: [
      { term: "shirt", phonetic: "ʃɜːrt", meaning: "پیراهن مردانه", example: "A blue shirt.", emoji: "👕" },
      { term: "T-shirt", phonetic: "tiː ʃɜːrt", meaning: "تی‌شرت", example: "A white T-shirt.", emoji: "👚" },
      { term: "pants", phonetic: "pænts", meaning: "شلوار", example: "Black pants.", emoji: "👖" },
      { term: "dress", phonetic: "dres", meaning: "لباس زنانه", example: "A red dress.", emoji: "👗" },
      { term: "shoes", phonetic: "ʃuːz", meaning: "کفش", example: "New shoes.", emoji: "👟" },
      { term: "hat", phonetic: "hæt", meaning: "کلاه", example: "A nice hat.", emoji: "🎩" },
      { term: "jacket", phonetic: "ˈdʒækɪt", meaning: "ژاکت / کت", example: "A warm jacket.", emoji: "🧥" },
      { term: "bag", phonetic: "bæɡ", meaning: "کیف", example: "A leather bag.", emoji: "👜" },
      { term: "How much is it?", phonetic: "haʊ mʌtʃ ɪz ɪt", meaning: "چند است؟", example: "How much is this shirt?", emoji: "💰" },
      { term: "cheap", phonetic: "tʃiːp", meaning: "ارزان", example: "It's cheap.", emoji: "💵" },
      { term: "expensive", phonetic: "ɪkˈspensɪv", meaning: "گران", example: "It's too expensive.", emoji: "💎" },
      { term: "size", phonetic: "saɪz", meaning: "سایز", example: "What size do you wear?", emoji: "📏" },
      { term: "shop / store", phonetic: "ʃɑːp / stɔːr", meaning: "مغازه", example: "I go to the shop.", emoji: "🏬" },
      { term: "sale", phonetic: "seɪl", meaning: "حراج", example: "It's on sale.", emoji: "🏷️" },
    ],
    grammar: {
      rule: "How much + is/are + item?  →  It's $20. / They're $50.",
      explanation:
        "برای پرسیدن قیمت از How much استفاده کن: How much is this shirt? پاسخ: It's 20 dollars. برای کلمات جمع از are استفاده می‌کنیم: How much are these shoes?",
      examples: ["How much is this dress? — It's $40.", "How much are these shoes? — They're $50.", "Is it on sale?"],
    },
    quiz: [
      {
        id: "q1",
        kind: "multiple-choice",
        prompt: "برای پرسیدن قیمت کفش‌ها (جمع) کدام درست است؟",
        options: ["How much is these shoes?", "How much are these shoes?", "How many are the shoes?", "What price shoes?"],
        correctIndex: 1,
        explain: "برای جمع از are استفاده می‌کنیم: How much are these shoes?",
      },
      {
        id: "q2",
        kind: "word-order",
        prompt: "بگو: این پیراهن خیلی گران است.",
        words: ["shirt", "This", "is", "too", "expensive", "."],
        correctSentence: "This shirt is too expensive.",
        explain: "ترتیب: This + item + is + adjective.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "«این در حراج است» چطور گفته می‌شود؟",
        options: ["It's on sale.", "It's in sale.", "It's for sale.", "It has sale."],
        correctIndex: 0,
        explain: "عبارت درست: It's on sale.",
      },
    ],
    practicePrompt: "Roleplay buying clothes with the AI — ask prices and sizes.",
  },

  /* ====================================================================== */
  /*  Unit 4 — Lesson 2: Prepositions of place + directions                  */
  /* ====================================================================== */
  "a1-4-2": {
    lessonId: "a1-4-2",
    vocabulary: [
      { term: "next to", phonetic: "nekst tuː", meaning: "کنار / مجاور", example: "The bank is next to the cafe.", emoji: "↔️" },
      { term: "in front of", phonetic: "ɪn frʌnt ʌv", meaning: "روبروی / جلوی", example: "The car is in front of the house.", emoji: "⬅️" },
      { term: "behind", phonetic: "bɪˈhaɪnd", meaning: "پشت", example: "The garden is behind the house.", emoji: "➡️" },
      { term: "between", phonetic: "bɪˈtwiːn", meaning: "بین", example: "The shop is between two banks.", emoji: "↔️" },
      { term: "opposite", phonetic: "ˈɑːpəzɪt", meaning: "مقابل", example: "The school is opposite the park.", emoji: "🔁" },
      { term: "on the corner", phonetic: "ɑːn ðə ˈkɔːrnər", meaning: "در گوشه خیابان", example: "The cafe is on the corner.", emoji: "📐" },
      { term: "turn left", phonetic: "tɜːrn left", meaning: "به چپ بپیچ", example: "Turn left at the bank.", emoji: "⬅️" },
      { term: "turn right", phonetic: "tɜːrn raɪt", meaning: "به راست بپیچ", example: "Turn right at the lights.", emoji: "➡️" },
      { term: "go straight", phonetic: "ɡoʊ streɪt", meaning: "مستقیم برو", example: "Go straight ahead.", emoji: "⬆️" },
      { term: "go past", phonetic: "ɡoʊ pæst", meaning: "رد شو از کنار", example: "Go past the bank.", emoji: "🚶" },
      { term: "next to", phonetic: "nekst tuː", meaning: "کنار", example: "Sit next to me.", emoji: "🪑" },
      { term: "Where is...?", phonetic: "wer ɪz", meaning: "کجاست؟", example: "Where is the station?", emoji: "📍" },
    ],
    grammar: {
      rule: "Where is the X?  →  It's next to / in front of / behind Y.",
      explanation:
        "برای پرسیدن آدرس می‌پرسیم Where is the bank? و با حروف اضافه‌ی مکان پاسخ می‌دهیم: It's next to the cafe. / It's in front of the hotel. برای دستور مسیر: turn left, turn right, go straight.",
      examples: [
        "Where is the bank? — It's next to the cafe.",
        "Turn left at the lights, then go straight.",
        "The hotel is opposite the park.",
      ],
    },
    quiz: [
      {
        id: "q1",
        kind: "word-order",
        prompt: "بگو: بانک کنار کافه است.",
        words: ["bank", "The", "is", "next", "to", "the", "cafe", "."],
        correctSentence: "The bank is next to the cafe.",
        explain: "ترتیب: Subject + is + prep + object.",
      },
      {
        id: "q2",
        kind: "multiple-choice",
        prompt: "برای دستور «به چپ بپیچ» کدام درست است؟",
        options: ["Left turn.", "Turn to left.", "Turn left.", "You left turn."],
        correctIndex: 2,
        explain: "دستور مسیر: Turn + direction.",
      },
      {
        id: "q3",
        kind: "multiple-choice",
        prompt: "مخالف «in front of» کدام است؟",
        options: ["next to", "behind", "between", "on the corner"],
        correctIndex: 1,
        explain: "in front of (جلوی) ↔ behind (پشت).",
      },
    ],
    practicePrompt: "Ask the AI for directions in a city and follow them.",
  },
};
