import type { LessonContent } from "@/types";

/**
 * FINAL senior-instructor content for the 16 non-roleplay C2 lessons.
 *
 * Compliance: Cambridge C2 Proficiency / Oxford C2. No omissions.
 * 8 units × 3 lessons = 24 total — this completes the A0→C2 learning tree.
 * Lessons 1&2 of each unit are interactive; lesson 3 is roleplay.
 *
 * All grammar rules/examples render through isolated LTR containers in the
 * lesson UI (BidiText / dir="ltr"), and quizzes validate via normalizeText.
 */
export const C2_LESSON_CONTENT: Record<string, LessonContent> = {
  /* ===== Unit 1: Colloquialisms, Slang & Street Wit ===== */
  "c2-1-1": {
    lessonId: "c2-1-1",
    vocabulary: [
      { term: "banter", phonetic: "ˈbæntər", meaning: "گوزی زنانه / شوخی دوستانه", example: "We enjoyed the friendly banter.", emoji: "😄" },
      { term: "dodge a bullet", phonetic: "dɑːdʒ ə ˈbʊlɪt", meaning: "از خطر بزرگ جاخالی دادن", example: "I dodged a bullet by not investing.", emoji: "🏃" },
      { term: "cut corners", phonetic: "kʌt ˈkɔːrnərz", meaning: "سرسری کار کردن / تقلب", example: "They cut corners on safety.", emoji: "✂️" },
      { term: "through the grapevine", phonetic: "ˈɡreɪpvaɪn", meaning: "از راه شایعه / غیررسمی", example: "I heard it through the grapevine.", emoji: "🍇" },
      { term: "hit below the belt", phonetic: "bɪˈloʊ ðə belt", meaning: "ناجوانمردانه حمله کردن", example: "That remark hit below the belt.", emoji: "🥊" },
      { term: "bite the bullet", phonetic: "baɪt ðə ˈbʊlɪt", meaning: "دندان روی جگر گذاشتن", example: "I had to bite the bullet and apologize.", emoji: "😬" },
      { term: "throw shade", phonetic: "θroʊ ʃeɪd", meaning: "کنایه‌ی کنایه‌آمیز پرتاب کردن", example: "She threw shade at her rival.", emoji: "💅" },
      { term: "ghost", phonetic: "ɡoʊst", meaning: "ناپدید شدن (بی‌خداحافظی)", example: "He ghosted me after the date.", emoji: "👻" },
    ],
    grammar: {
      rule: "Ellipsis in native speech: 'Seen him lately?' / 'No point doing that'",
      explanation:
        "بومی‌ها کلمات زائد را حذف می‌کنند: Seen him lately? (به‌جای Have you seen him lately?)، No point doing that (به‌جای There is no point...). این حذف‌ها (ellipsis) نشانه‌ی روانی کامل گفتار بومی‌اند.",
      examples: [
        "Seen him lately? (= Have you seen him lately?)",
        "No point doing that. (= There is no point...)",
        "Sounds good! (= That sounds good)",
        "Been there, done that. (= I have been there...)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«از راه شایعه شنیدم» کدام اصطلاح است؟", options: ["dodge a bullet", "through the grapevine", "throw shade", "banter"], correctIndex: 1, explain: "through the grapevine = از مسیر غیررسمی/شایعه." },
      { id: "q2", kind: "multiple-choice", prompt: "کدام شکل حذف‌شده (ellipsis) بومی است؟", options: ["Have you seen him lately?", "Seen him lately?", "You seen him lately yes?", "Do you seen him?"], correctIndex: 1, explain: "Seen him lately? = حذف Have you." },
      { id: "q3", kind: "word-order", prompt: "بگو: لازم نیست این کارو بکنی (بومی).", words: ["No", "point", "doing", "that"], correctSentence: "No point doing that", explain: "حذف There is — گفتار بومی." },
    ],
    practicePrompt: "Chat casually with a native friend using slang and ellipsis.",
  },

  "c2-1-2": {
    lessonId: "c2-1-2",
    vocabulary: [
      { term: "hang out", phonetic: "hæŋ aʊt", meaning: "وقت گذراندن", example: "Let's hang out this weekend.", emoji: "🎉" },
      { term: "wind up", phonetic: "waɪnd ʌp", meaning: "در نهایت / اذیت کردن (بریتانیایی)", example: "We wound up staying late.", emoji: "🔄" },
      { term: "knackered", phonetic: "ˈnækərd", meaning: "خسته از پا درآمده (بریتانیایی)", example: "I'm absolutely knackered.", emoji: "😴" },
      { term: "gutted", phonetic: "ˈɡʌtɪd", meaning: "به‌شدت ناامید (بریتانیایی)", example: "I was gutted by the news.", emoji: "💔" },
    ],
    grammar: {
      rule: "Minor clauses & tags: 'Nice weather, innit?' / 'You coming?'",
      explanation:
        "جملات کوچک و tag question های بومی: You coming? (به‌جای Are you coming?)، innit (بریتانیایی عامیانه به‌جای isn't it). این ساختارها گفتار را طبیعی و خودمانی می‌کنند.",
      examples: [
        "You coming? (= Are you coming?)",
        "Nice day, innit? (= isn't it — بریتانیایی)",
        "Can't be bothered. (= I can't be bothered)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«You coming?» شکل کاملش چیست؟", options: ["You come?", "Are you coming?", "Do you coming?", "You are come?"], correctIndex: 1, explain: "حذف Are در گفتار بومی." },
      { id: "q2", kind: "multiple-choice", prompt: "«خسته از پا درآمده» در عامیانه بریتانیایی کدام است؟", options: ["gutted", "knackered", "banter", "ghosted"], correctIndex: 1, explain: "knackered = بی‌رمق/خسته شدید." },
      { id: "q3", kind: "word-order", prompt: "بگو: آخر هفته بزن بریم بیرون (خودمانی).", words: ["Let's", "hang", "out", "this", "weekend"], correctSentence: "Let's hang out this weekend", explain: "hang out = وقت گذراندن." },
    ],
    practicePrompt: "Practice casual native speech with ellipsis and slang with the AI.",
  },

  /* ===== Unit 2: Irony, Sarcasm & Linguistic Puns ===== */
  "c2-2-1": {
    lessonId: "c2-2-1",
    vocabulary: [
      { term: "pun", phonetic: "pʌn", meaning: "جوج / بازی با کلمات", example: "A clever pun made everyone laugh.", emoji: "🎭" },
      { term: "tongue-in-cheek", phonetic: "tʌŋ ɪn tʃiːk", meaning: "شوخ‌طبعانه / کنایه‌دار", example: "A tongue-in-cheek remark.", emoji: "😉" },
      { term: "self-deprecating", phonetic: "ˌself ˈdeprɪkeɪtɪŋ", meaning: "خود‌کم‌بینانه (شوخ)", example: "Self-deprecating humor.", emoji: "🙈" },
      { term: "understatement", phonetic: "ˈʌndərsteɪtmənt", meaning: "کم‌گویی (برای تأکید)", example: "'Not bad' for a masterpiece.", emoji: "📉" },
      { term: "sardonic", phonetic: "sɑːrˈdɑːnɪk", meaning: "تمسخرآمیز / تلخ", example: "A sardonic smile.", emoji: "😏" },
      { term: "deadpan", phonetic: "ˈdedpæn", meaning: "با قیافه بی‌حال (شوخ)", example: "He delivered the joke deadpan.", emoji: "😐" },
      { term: "irony", phonetic: "ˈaɪrəni", meaning: "تناقض موقعیتی / کنایه", example: "The irony of a fire station burning down.", emoji: "🙃" },
      { term: "double meaning", phonetic: "ˈdʌbl ˈmiːnɪŋ", meaning: "دوپهلو", example: "A phrase with a double meaning.", emoji: "🔍" },
    ],
    grammar: {
      rule: "Oxymoron & Paradox: Conspicuously absent / Deafening silence",
      explanation:
        "تناقض‌نما (oxymoron) دو متضاد را کنار هم می‌گذارد: deafening silence (سکوت کرکننده)، conspicuously absent (قاچ‌آشکار غایب). این ساختارها ستون طنز و کنایه‌ی چندلایه‌اند.",
      examples: [
        "deafening silence",
        "conspicuously absent",
        "bittersweet victory",
        "alone together",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«سکوت کرکننده» چه آرایه‌ای است؟", options: ["pun", "oxymoron", "understatement", "litotes"], correctIndex: 1, explain: "oxymoron = ترکیب دو متضاد." },
      { id: "q2", kind: "multiple-choice", prompt: "شوخی که فرد با آن خودش را دست می‌گذارد چه نامیده می‌شود؟", options: ["sardonic", "self-deprecating", "deadpan", "tongue-in-cheek"], correctIndex: 1, explain: "self-deprecating = خودکم‌بینانه." },
      { id: "q3", kind: "word-order", prompt: "بگو: پیروزی تلخ‌وشیرین.", words: ["bittersweet", "victory"], correctSentence: "bittersweet victory", explain: "bitter+sweet = oxymoron." },
    ],
    practicePrompt: "Exchange witty banter and improvise with the AI stand-up comedian.",
  },

  "c2-2-2": {
    lessonId: "c2-2-2",
    vocabulary: [
      { term: "sarcastic", phonetic: "sɑːrˈkæstɪk", meaning: "کنایه‌آمیز / ریشخندی", example: "A sarcastic reply.", emoji: "🙄" },
      { term: "wry", phonetic: "raɪ", meaning: "شوخ‌طبعانه تلخ", example: "A wry observation.", emoji: "🍋" },
      { term: "hyperbole", phonetic: "haɪˈpɜːrbəli", meaning: "اغراق", example: "I've told you a million times!", emoji: "📈" },
      { term: "litotes", phonetic: "ˈlaɪtoʊtiːz", meaning: "کم‌گویی دوگانه (نه بد = عالی)", example: "Not bad at all! (= excellent)", emoji: "📉" },
    ],
    grammar: {
      rule: "Litotes & ironic understatement: 'Not the best idea...' meaning 'terrible'",
      explanation:
        "litotes با نفی متضاد، تأکید مثبت می‌سازد: not bad = خوب/عالی، not uncommon = رایج. در کنایه برعکس عمل می‌کنیم: What a lovely day! (در طوفان). تسلط بر این ظرافت‌ها نشانه‌ی C2 است.",
      examples: [
        "Not bad! (= quite good)",
        "He's not unintelligent. (= he's smart)",
        "Oh great, another meeting. (ironic)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«Not bad at all!» با litotes یعنی؟", options: ["متوسط", "خیلی بد", "عالی", "بی‌ربط"], correctIndex: 2, explain: "litotes: نفی متضاد → تأکید مثبت." },
      { id: "q2", kind: "multiple-choice", prompt: "«I've told you a million times» چه آرایه‌ای است؟", options: ["litotes", "hyperbole", "oxymoron", "pun"], correctIndex: 1, explain: "hyperbole = اغراق." },
      { id: "q3", kind: "word-order", prompt: "بگو: او البته به‌هوش نیست (به معنی باهوش).", words: ["He's", "not", "unintelligent"], correctSentence: "He's not unintelligent", explain: "نفی متضاد = تأکید مثبت." },
    ],
    practicePrompt: "Craft sarcastic and understated responses with the AI wit master.",
  },

  /* ===== Unit 3: Rhetoric, Oratory & Persuasive Mastery ===== */
  "c2-3-1": {
    lessonId: "c2-3-1",
    vocabulary: [
      { term: "anaphora", phonetic: "əˈnæfərə", meaning: "تکرار آغاز جمله‌ها", example: "We shall fight... we shall fight...", emoji: "🔁" },
      { term: "chiasmus", phonetic: "kaɪˈæzməs", meaning: "قرینه وارونه", example: "Ask not what your country can do for you...", emoji: "🔄" },
      { term: "antithesis", phonetic: "ænˈtɪθəsɪs", meaning: "تضاد (دو مفهوم متقابل)", example: "It was the best of times, it was the worst...", emoji: "⚖️" },
      { term: "hypophora", phonetic: "haɪˈpɑːfərə", meaning: "پرسش و پاسخ خود", example: "Why do we fight? We fight because...", emoji: "❓" },
      { term: "rhetoric", phonetic: "ˈretərɪk", meaning: "بیان / سخنوری", example: "The art of rhetoric.", emoji: "🎤" },
      { term: "eloquence", phonetic: "ˈeləkwəns", meaning: "شیوایی سخن", example: "Her eloquence moved the crowd.", emoji: "✨" },
      { term: "orator", phonetic: "ˈɔːrətər", meaning: "سخنور", example: "A legendary orator.", emoji: "🏛️" },
      { term: "manifesto", phonetic: "ˌmænɪˈfestəʊ (US -toʊ)", meaning: "بیانیه / مانیفست", example: "The party's manifesto.", emoji: "📜" },
    ],
    grammar: {
      rule: "Tricolon & Balanced Parallelism: 'We shall fight, we shall strive, we shall conquer'",
      explanation:
        "قانون سه‌گانه (tricolon): سه عبارت موازی، ریتم حماسی می‌سازد: We shall fight, we shall strive, we shall conquer. تکرار آغازین (anaphora) + موازی‌سازی متوازن، ستون سخنوری کلاسیک است — از چرچیل تا کندی.",
      examples: [
        "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields. (Churchill)",
        "Government of the people, by the people, for the people. (Lincoln)",
        "Ask not what your country can do for you — ask what you can do for your country. (chiasmus)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«Ask not what your country can do for you — ask what you can do for your country» چه آرایه‌ای است؟", options: ["anaphora", "chiasmus", "litotes", "hypophora"], correctIndex: 1, explain: "chiasmus = قرینه‌ی وارونه (AB-BA)." },
      { id: "q2", kind: "multiple-choice", prompt: "تکرار یک عبارت در آغاز جمله‌های متوالی چه نام دارد؟", options: ["antithesis", "anaphora", "oxymoron", "pun"], correctIndex: 1, explain: "anaphora = تکرار آغازین." },
      { id: "q3", kind: "word-order", prompt: "یک tricolon کامل کن: We shall fight, we shall strive, ...", words: ["we", "shall", "conquer"], correctSentence: "we shall conquer", explain: "سه‌گانه‌ی موازی — الگوی حماسی." },
    ],
    practicePrompt: "Deliver a motivational speech defending a manifesto with the AI audience.",
  },

  "c2-3-2": {
    lessonId: "c2-3-2",
    vocabulary: [
      { term: "cadence", phonetic: "ˈkeɪdns", meaning: "آهنگ/ریتم سخن", example: "A stirring cadence.", emoji: "🎵" },
      { term: "climax", phonetic: "ˈklaɪmæks", meaning: "اوج (ترتیب صعودی)", example: "I came, I saw, I conquered.", emoji: "⛰️" },
      { term: "parallelism", phonetic: "ˈpærəlelɪzəm", meaning: "موازی‌سازی ساختاری", example: "Parallel structure emphasizes.", emoji: "📏" },
      { term: "persuasion", phonetic: "pərˈsweɪʒn", meaning: "متقاعدسازی", example: "The art of persuasion.", emoji: "🎯" },
    ],
    grammar: {
      rule: "Climactic tricolon: 'I came, I saw, I conquered' (ascending order)",
      explanation:
        "ترتیب صعودی (climax) عناصر را از کم به زیاد می‌چیند: I came, I saw, I conquered (آمدم، دیدم، فتح کردم). قدرت جمله در پایان آن نهفته است — تکنیک طلایی سخنوران بزرگ.",
      examples: [
        "I came, I saw, I conquered. (Caesar)",
        "It was beauty that killed the beast — no, it was greed, ambition, and hubris. (climactic)",
        "The good, the bad, the ugly. (tricolon)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«I came, I saw, I conquered» چه الگویی دارد؟", options: ["chiasmus", "climactic tricolon", "litotes", "oxymoron"], correctIndex: 1, explain: "سه‌گانه با ترتیب صعودی." },
      { id: "q2", kind: "multiple-choice", prompt: "ریتم و آهنگ سخن چه نامیده می‌شود؟", options: ["parallelism", "cadence", "climax", "rhetoric"], correctIndex: 1, explain: "cadence = آهنگ کلام." },
      { id: "q3", kind: "word-order", prompt: "یک climax بساز: از ساده به اوج.", words: ["It", "was", "greed", ",", "ambition", ",", "and", "hubris"], correctSentence: "It was greed, ambition, and hubris", explain: "ترتیب صعودی قدرت." },
    ],
    practicePrompt: "Craft a climactic speech with parallel structures for the AI crowd.",
  },

  /* ===== Unit 4: Literary Grandeur & Archaisms ===== */
  "c2-4-1": {
    lessonId: "c2-4-1",
    vocabulary: [
      { term: "brave new world", phonetic: "breɪv nuː wɜːrld", meaning: "دنیای شگفت‌انگیز جدید", example: "Welcome to a brave new world.", emoji: "🌍" },
      { term: "foregone conclusion", phonetic: "ˈfɔːrɡɔːn", meaning: "نتیجه‌ی حتمی از پیش معلوم", example: "The outcome was a foregone conclusion.", emoji: "🏁" },
      { term: "melt into thin air", phonetic: "melt ɪntuː θɪn er", meaning: "ناپدید شدن (مانند هوا)", example: "The dream melted into thin air.", emoji: "💨" },
      { term: "in my heart of hearts", phonetic: "hɑːrt ʌv hɑːrts", meaning: "در عمق قلبم", example: "In my heart of hearts, I knew.", emoji: "❤️" },
      { term: "break the ice", phonetic: "breɪk ði aɪs", meaning: "یخ مجلس را شکستن", example: "He told a joke to break the ice.", emoji: "🧊" },
      { term: "wild-goose chase", phonetic: "waɪld ɡuːs tʃeɪs", meaning: "تعقیب بیهوده", example: "The rumor led us on a wild-goose chase.", emoji: "🪿" },
      { term: "heart of gold", phonetic: "hɑːrt ʌv ɡoʊld", meaning: "قلب مهربان", example: "She has a heart of gold.", emoji: "🥇" },
      { term: "all that glitters is not gold", phonetic: "ˈɡlɪtərz", meaning: "هر که برق زر بود، زر نیست", example: "All that glitters is not gold.", emoji: "✨" },
    ],
    grammar: {
      rule: "Shakespearean legacy in modern English",
      explanation:
        "شکسپیر صدها اصطلاح جاودانه ساخت که هنوز زنده‌اند: break the ice، wild-goose chase، heart of gold، foregone conclusion. شناخت ریشه‌ی این اصطلاحات، عمق فرهنگی سخنور C2 را می‌سازد.",
      examples: [
        "He broke the ice with a witty remark. (شکسپیر)",
        "The investigation became a wild-goose chase. (شکسپیر)",
        "In my heart of hearts, I doubted it. (هملت)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«در عمق قلبم» اصطلاح شکسپیری کدام است؟", options: ["heart of gold", "in my heart of hearts", "brave new world", "break the ice"], correctIndex: 1, explain: "in my heart of hearts — از هملت." },
      { id: "q2", kind: "multiple-choice", prompt: "«تعقیب بیهوده/بی‌نتیجه» کدام اصطلاح است؟", options: ["foregone conclusion", "wild-goose chase", "thin air", "brave new world"], correctIndex: 1, explain: "wild-goose chase = شکار غاز وحشی (بیهوده)." },
      { id: "q3", kind: "word-order", prompt: "بگو: او قلبی از طلا دارد.", words: ["She", "has", "a", "heart", "of", "gold"], correctSentence: "She has a heart of gold", explain: "heart of gold = مهربانِ فطرت." },
    ],
    practicePrompt: "Analyze Shakespeare's legacy in modern English with the AI literature master.",
  },

  "c2-4-2": {
    lessonId: "c2-4-2",
    vocabulary: [
      { term: "Be that as it may", phonetic: "biː ðæt æz ɪt meɪ", meaning: "هرچند که چنین است", example: "Be that as it may, we must proceed.", emoji: "📜" },
      { term: "Come what may", phonetic: "kʌm wʌt meɪ", meaning: "هر چه باشد", example: "I'll finish it, come what may.", emoji: "🛡️" },
      { term: "Far be it from me", phonetic: "fɑːr biː ɪt", meaning: "دور از من (مودبانه)", example: "Far be it from me to criticize...", emoji: "🙏" },
      { term: "albeit", phonetic: "ɔːlˈbiːɪt", meaning: "هرچند", example: "A win, albeit a narrow one.", emoji: "⚖️" },
    ],
    grammar: {
      rule: "Archaic Subjunctive & Poetic Inversion: 'Be that as it may'",
      explanation:
        "ساختارهای کهن با وجه التزامی زنده‌اند: Be that as it may (هرچند چنین باشد)، Come what may (هرچه بیاید)، Far be it from me (دور باد از من). این قالب‌های شاعرانه، نثر رسمی را فاخر می‌کنند.",
      examples: [
        "Be that as it may, the decision stands.",
        "Come what may, I will not yield.",
        "Far be it from me to doubt your judgment.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«هرچه بیاید تسلیم نمی‌شوم» کدام ساختار کهن است؟", options: ["Be that as it may", "Come what may", "Albeit", "Far be it"], correctIndex: 1, explain: "Come what may = هرچه پیش آید." },
      { id: "q2", kind: "multiple-choice", prompt: "«هرچند» رسمی و ادبی کدام واژه است؟", options: ["although", "albeit", "but", "though"], correctIndex: 1, explain: "albeit = هرچند (فاخر)." },
      { id: "q3", kind: "word-order", prompt: "بگو: دور از من است که انتقاد کنم.", words: ["Far", "be", "it", "from", "me", "to", "criticize"], correctSentence: "Far be it from me to criticize", explain: "وجه التزامی کهن." },
    ],
    practicePrompt: "Compose elevated prose with archaic structures with the AI literary master.",
  },

  /* ===== Unit 5: Legalese & High-Stakes Contracts ===== */
  "c2-5-1": {
    lessonId: "c2-5-1",
    vocabulary: [
      { term: "indemnify", phonetic: "ɪnˈdemnɪfaɪ", meaning: "جبران خسارت کردن", example: "The company shall indemnify the client.", emoji: "🛡️" },
      { term: "force majeure", phonetic: "fɔːrs mæˈʒɜːr", meaning: "فورس ماژور / قوه قاهره", example: "The clause covers force majeure events.", emoji: "🌪️" },
      { term: "severability", phonetic: "ˌsevərəˈbɪləti", meaning: "قابلیت تفکیک بندها", example: "The severability clause applies.", emoji: "✂️" },
      { term: "non-disclosure", phonetic: "nɑːn dɪsˈkloʊʒər", meaning: "عدم افشا (NDA)", example: "Sign the non-disclosure agreement.", emoji: "🔒" },
      { term: "in perpetuity", phonetic: "ˌpɜːrpəˈtuːəti", meaning: "برای همیشه / ابدیت", example: "Rights granted in perpetuity.", emoji: "♾️" },
      { term: "liability", phonetic: "ˌlaɪəˈbɪləti", meaning: "مسئولیت حقوقی", example: "The liability is limited.", emoji: "⚖️" },
      { term: "breach", phonetic: "briːtʃ", meaning: "نقض (قرارداد)", example: "A material breach occurred.", emoji: "💥" },
      { term: "waiver", phonetic: "ˈweɪvər", meaning: "اسقاط حق / چشم‌پوشی", example: "Sign the liability waiver.", emoji: "📝" },
    ],
    grammar: {
      rule: "Contractual Adverbs & Provisos: Herein / Whereby / Notwithstanding / Provided that",
      explanation:
        "قیود حقوقی متن قرارداد را می‌سازند: herein (در همین سند)، whereby (که به وسیله آن)، notwithstanding (با وجود)، provided that (به شرط آنکه). این قالب‌ها در اسناد تعهدآور حیاتی‌اند.",
      examples: [
        "The terms set forth herein shall apply.",
        "An agreement whereby both parties commit...",
        "Notwithstanding any contrary provision, ...",
        "Payment is due, provided that the goods pass inspection.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«در همین سند» کدام قید حقوقی است؟", options: ["whereby", "herein", "heretofore", "thereof"], correctIndex: 1, explain: "herein = در این سند." },
      { id: "q2", kind: "multiple-choice", prompt: "«به شرط آنکه» کدام ساختار است؟", options: ["notwithstanding", "whereby", "provided that", "inasmuch as"], correctIndex: 2, explain: "provided that = به شرط آنکه." },
      { id: "q3", kind: "multiple-choice", prompt: "«فورس ماژور / حوادث قهری» کدام است؟", options: ["force majeure", "severability", "waiver", "breach"], correctIndex: 0, explain: "force majeure = قوه قاهره." },
    ],
    practicePrompt: "Review challenging contract clauses with the AI senior legal counsel.",
  },

  "c2-5-2": {
    lessonId: "c2-5-2",
    vocabulary: [
      { term: "preamble", phonetic: "priːˈæmbl", meaning: "مقدمه‌ی سند", example: "The preamble outlines intent.", emoji: "📜" },
      { term: "clause", phonetic: "klɔːz", meaning: "بند (قرارداد)", example: "Clause 5 governs termination.", emoji: "📑" },
      { term: "termination", phonetic: "ˌtɜːrmɪˈneɪʃn", meaning: "خاتمه‌ی قرارداد", example: "Grounds for termination.", emoji: "🏁" },
      { term: "jurisdiction", phonetic: "ˌdʒʊrɪsˈdɪkʃn", meaning: "صلاحیت قضایی", example: "The courts of Geneva retain jurisdiction.", emoji: "🏛️" },
    ],
    grammar: {
      rule: "Legal conditionals: 'Should either party breach...' / 'Save as otherwise provided'",
      explanation:
        "شرطی‌های حقوقی با Should وارونه شروع می‌شوند: Should either party breach this agreement (چنان‌چه یکی از طرفین نقض کند). عبارت Save as otherwise provided (مگر آنکه برخلاف تصریح شده باشد) از قالب‌های استاندارد قرارداد است.",
      examples: [
        "Should either party breach this agreement, the other may terminate.",
        "Save as otherwise provided herein, disputes shall be arbitrated.",
        "No amendment shall be valid unless made in writing.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«چنان‌چه یکی از طرفین نقض کند» کدام شکل حقوقی است؟", options: ["If either party breaches (plain)", "Should either party breach", "Would either party breach", "Either party breach should"], correctIndex: 1, explain: "Should + فاعل + فعل پایه (وارونه حقوقی)." },
      { id: "q2", kind: "multiple-choice", prompt: "«مگر آنکه برخلاف تصریح شده باشد» کدام است؟", options: ["Save as otherwise provided", "Except otherwise", "Unless saving", "Provided except"], correctIndex: 0, explain: "Save as otherwise provided = قالب استاندارد." },
      { id: "q3", kind: "word-order", prompt: "بگو: هیچ اصلاحی معتبر نیست مگر کتباً.", words: ["No", "amendment", "shall", "be", "valid", "unless", "made", "in", "writing"], correctSentence: "No amendment shall be valid unless made in writing", explain: "shall + مجهول + unless." },
    ],
    practicePrompt: "Negotiate contract language with the AI chief counsel.",
  },

  /* ===== Unit 6: High-Stakes Debates & Crisis Communication ===== */
  "c2-6-1": {
    lessonId: "c2-6-1",
    vocabulary: [
      { term: "deflect", phonetic: "dɪˈflekt", meaning: "منحرف کردن (سوال/حمله)", example: "She deflected the question.", emoji: "↪️" },
      { term: "spin doctor", phonetic: "spɪn ˈdɑːktər", meaning: "متخصص جنس‌سازی خبر", example: "The spin doctor reframed the scandal.", emoji: "🌀" },
      { term: "stonewall", phonetic: "ˈstoʊnwɔːl", meaning: "دیوار کشیدن / پاسخ ندادن", example: "The official stonewalled reporters.", emoji: "🧱" },
      { term: "ad hominem", phonetic: "æd ˈhɑːmɪnem", meaning: "حمله به شخص (نه استدلال)", example: "That's an ad hominem attack.", emoji: "🎯" },
      { term: "rebuttal", phonetic: "rɪˈbʌtl", meaning: "پاسخ رد", example: "A swift rebuttal.", emoji: "🛡️" },
      { term: "straw man", phonetic: "strɔː mæn", meaning: "مرد کاهی (تحریف استدلال)", example: "That's a straw man argument.", emoji: "🌾" },
      { term: "double down", phonetic: "ˈdʌbl daʊn", meaning: "پافشاری بیشتر کردن", example: "He doubled down on his claim.", emoji: "⏫" },
      { term: "walk back", phonetic: "wɔːk bæk", meaning: "عقب‌نشینی از اظهار", example: "The spokesperson walked back the statement.", emoji: "↩️" },
    ],
    grammar: {
      rule: "Pivoting & Nuanced Qualification: 'That raises a broader question...'",
      explanation:
        "تکنیک محورچرخانی: پاسخ چندپهلو که سوالی را به عرصه‌ی دلخواه می‌برد: That raises a broader question (این پرسش، مسئله‌ی بزرگ‌تری را طرح می‌کند)، Let me be clear about what I said and didn't say. ابزار دیپلماسی بحران.",
      examples: [
        "That raises a broader question about our priorities.",
        "Let me be clear: at no point did we authorize this.",
        "To the best of my knowledge, that characterization is inaccurate.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "حمله به شخص به‌جای استدلال چه نامیده می‌شود؟", options: ["straw man", "ad hominem", "rebuttal", "stonewall"], correctIndex: 1, explain: "ad hominem = به خود شخص." },
      { id: "q2", kind: "multiple-choice", prompt: "«تحریف استدلال طرف مقابل و رد همان نسخه» چیست؟", options: ["straw man", "spin", "deflect", "double down"], correctIndex: 0, explain: "straw man = مرد کاهی." },
      { id: "q3", kind: "word-order", prompt: "بگو: این پرسش، مسئله‌ی بزرگ‌تری را طرح می‌کند.", words: ["That", "raises", "a", "broader", "question"], correctSentence: "That raises a broader question", explain: "pivot استاندارد رسانه‌ای." },
    ],
    practicePrompt: "Face challenging press questions at a crisis conference with the AI journalists.",
  },

  "c2-6-2": {
    lessonId: "c2-6-2",
    vocabulary: [
      { term: "on the record", phonetic: "ɒn ðə ˈrekərd", meaning: "به‌طور رسمی و قابل استناد", example: "Speaking on the record...", emoji: "🎙️" },
      { term: "off the record", phonetic: "ɔːf ðə ˈrekərd", meaning: "غیررسمی / غیرقابل استناد", example: "This is off the record.", emoji: "🤫" },
      { term: "no comment", phonetic: "noʊ ˈkɑːment", meaning: "اعلام نظری نیست", example: "I have no comment at this time.", emoji: "🔇" },
      { term: "holding statement", phonetic: "ˈhoʊldɪŋ", meaning: "بیانیه‌ی موقت بحران", example: "We issued a holding statement.", emoji: "📄" },
    ],
    grammar: {
      rule: "Diplomatic qualifiers: 'At this time' / 'To the best of my knowledge' / 'It would be premature to...'",
      explanation:
        "تعدیل‌کننده‌های دیپلماتیک که بدون دروغ، در را باز می‌گذارند: at this time (در حال حاضر)، to the best of my knowledge (تا جایی که اطلاع دارم)، it would be premature to speculate (قبل از موعد حدس زدن زود است). ستون مدیریت بحران.",
      examples: [
        "At this time, we cannot confirm the details.",
        "To the best of my knowledge, no laws were broken.",
        "It would be premature to assign blame.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«تا جایی که اطلاع دارم» کدام تعدیل‌کننده است؟", options: ["At this time", "To the best of my knowledge", "No comment", "On the record"], correctIndex: 1, explain: "to the best of my knowledge = تا حد اطلاع من." },
      { id: "q2", kind: "multiple-choice", prompt: "بیانیه‌ی اولیه‌ی موقت در بحران چه نامیده می‌شود؟", options: ["holding statement", "rebuttal", "preamble", "waiver"], correctIndex: 0, explain: "holding statement = بیانیه‌ی نگه‌دارنده." },
      { id: "q3", kind: "word-order", prompt: "بگو: تعیین تقصیر قبل از موعد زود است.", words: ["It", "would", "be", "premature", "to", "assign", "blame"], correctSentence: "It would be premature to assign blame", explain: "premature = قبل از موعد." },
    ],
    practicePrompt: "Handle a hostile press conference using diplomatic qualifiers with the AI press corps.",
  },

  /* ===== Unit 7: Interpretation & Untranslatable Concepts ===== */
  "c2-7-1": {
    lessonId: "c2-7-1",
    vocabulary: [
      { term: "culture-bound idiom", phonetic: "ˈkʌltʃər baʊnd", meaning: "اصطلاح وابسته به فرهنگ", example: "'Kick the bucket' is culture-bound.", emoji: "🌍" },
      { term: "nuance mismatch", phonetic: "ˈnjuːɑːns", meaning: "عدم تطابق ظرافت معنایی", example: "A nuance mismatch arose.", emoji: "🎚️" },
      { term: "pragmatic adaptation", phonetic: "præɡˈmætɪk", meaning: "سازگاری کاربردی", example: "Pragmatic adaptation preserves intent.", emoji: "🔧" },
      { term: "register", phonetic: "ˈredʒɪstər", meaning: "سطح زبانی (رسمی/خودمانی)", example: "Match the register of the source.", emoji: "📐" },
      { term: "calque", phonetic: "kælk", meaning: "ترجمه‌ی تحت‌اللفظی", example: "'Flea market' is a calque.", emoji: "🪰" },
      { term: "loanword", phonetic: "ˈloʊnwɜːrd", meaning: "واژه‌ی وام‌گیری‌شده", example: "'Pyjama' is a loanword.", emoji: "📦" },
      { term: "false friend", phonetic: "fɔːls frend", meaning: "واژه‌ی فریبنده (شبیه اما متفاوت)", example: "'Actually' vs 'aktuell' — false friends.", emoji: "⚠️" },
      { term: "untranslatable", phonetic: "ʌntrænzˈleɪtəbl", meaning: "ترجمه‌ناپذیر", example: "Some concepts are untranslatable.", emoji: "🚫" },
    ],
    grammar: {
      rule: "Semantic Rephrasing & Dynamic Equivalence",
      explanation:
        "ترجمه‌ی هم‌ارز پویا (dynamic equivalence) به‌جای لفظ، اثر را منتقل می‌کند: 'It's raining cats and dogs' → «باران شدید می‌بارد» (نه ترجمه‌ی تحت‌اللفظی). بازآفرینی معنا (semantic rephrasing) قلب مهارت ترجمه‌ی هم‌زمان است.",
      examples: [
        "Source: 'Break a leg!' → Equivalent: 'موفق باشی!' (نه لفظی)",
        "Source: 'It's not my cup of tea' → 'به سلیقه‌ی من نیست'",
        "Calque risk: 'flea market' ≠ 'بازار کک'",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "ترجمه‌ی تحت‌اللفظی که معنای واقعی نمی‌دهد چه نامیده می‌شود؟", options: ["loanword", "calque", "register", "false friend"], correctIndex: 1, explain: "calque = ترجمه‌ی واژه‌به‌واژه." },
      { id: "q2", kind: "multiple-choice", prompt: "واژه‌ای که شبیه واژه‌ی زبان دیگر است اما معنایش فرق دارد؟", options: ["loanword", "calque", "false friend", "register"], correctIndex: 2, explain: "false friend = دوست دروغین." },
      { id: "q3", kind: "multiple-choice", prompt: "ترجمه‌ی هم‌ارز پویا چه را منتقل می‌کند؟", options: ["لفظ", "اثر و کارکرد", "دستور", "فرم"], correctIndex: 1, explain: "dynamic equivalence = انتقال اثر." },
    ],
    practicePrompt: "Simultaneously interpret a speech at a bilingual summit with the AI.",
  },

  "c2-7-2": {
    lessonId: "c2-7-2",
    vocabulary: [
      { term: "source text", phonetic: "sɔːrs tekst", meaning: "متن مبدأ", example: "Analyze the source text.", emoji: "📤" },
      { term: "target text", phonetic: "ˈtɑːrɡɪt", meaning: "متن مقصد", example: "Polish the target text.", emoji: "📥" },
      { term: "gloss", phonetic: "ɡlɒs", meaning: "برگردان موقت/توضیحی", example: "Provide a literal gloss.", emoji: "💡" },
      { term: "equivalence", phonetic: "ɪˈkwɪvələns", meaning: "هم‌ارزی", example: "Seek functional equivalence.", emoji: "⚖️" },
    ],
    grammar: {
      rule: "Restructuring for interpretation: chunking & anticipation",
      explanation:
        "در ترجمه‌ی هم‌زمان، جمله را تکه‌تکه (chunking) بازسازی می‌کنی و ساختار متفاوت زبان مقصد را پیش‌بینی (anticipation) می‌کنی: فعل انتهایی انگلیسی را با معادل ساختاری اولِ جمله‌ی مقصد جابه‌جا می‌کنی.",
      examples: [
        "EN: 'The report, which was published yesterday, ...' → چانک‌بندی فوری",
        "ترتیب اجزا را بازآرایی کن تا گیر نیفتی",
        "پیش‌بینی: قید زمان اول می‌آید → آماده باش",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "تکه‌تکه بازسازی جمله در ترجمه‌ی هم‌زمان چه نامیده می‌شود؟", options: ["glossing", "chunking", "calque", "anticipation"], correctIndex: 1, explain: "chunking = چانک‌بندی." },
      { id: "q2", kind: "multiple-choice", prompt: "پیش‌بینی ساختار زبان مقصد چه نامیده می‌شود؟", options: ["equivalence", "anticipation", "register", "gloss"], correctIndex: 1, explain: "anticipation = پیش‌نگری ساختاری." },
      { id: "q3", kind: "word-order", prompt: "بگو: به‌دنبال هم‌ارزی کارکردی باش.", words: ["Seek", "functional", "equivalence"], correctSentence: "Seek functional equivalence", explain: "functional equivalence = هم‌ارزی کارکردی." },
    ],
    practicePrompt: "Practice simultaneous interpretation techniques with the AI interpreter.",
  },

  /* ===== Unit 8: The Grandmaster's Crucible ===== */
  "c2-8-1": {
    lessonId: "c2-8-1",
    vocabulary: [
      { term: "epitome", phonetic: "ɪˈpɪtəmi", meaning: "جوهره / نمونه‌ی کامل", example: "She is the epitome of grace.", emoji: "💎" },
      { term: "quintessence", phonetic: "kwɪnˈtesns", meaning: "راستین‌نما / خلوص", example: "The quintessence of elegance.", emoji: "🌟" },
      { term: "paradigm", phonetic: "ˈpærədaɪm", meaning: "الگو / پارادایم", example: "A paradigm shift occurred.", emoji: "🔄" },
      { term: "ubiquitous", phonetic: "juːˈbɪkwɪtəs", meaning: "همه‌جا حاضر", example: "Smartphones are ubiquitous.", emoji: "🌐" },
      { term: "ephemeral", phonetic: "ɪˈfemərl", meaning: "زودگذر", example: "Fame is ephemeral.", emoji: "💧" },
      { term: "serendipity", phonetic: "ˌserənˈdɪpəti", meaning: "اقبال خوش تصادفی", example: "By serendipity, they met again.", emoji: "🍀" },
      { term: "eloquent", phonetic: "ˈeləkwənt", meaning: "شیوا / بلیغ", example: "An eloquent defense.", emoji: "🗣️" },
      { term: "juxtapose", phonetic: "ˈdʒʌkstəpoʊz", meaning: "کنار هم قرار دادن (برای تضاد)", example: "Juxtapose the two styles.", emoji: "🔀" },
    ],
    grammar: {
      rule: "Grandmaster synthesis: Inversion + Subjunctive + Cleft in one clause",
      explanation:
        "آزمون نهایی: ترکیب ساختارهای پیشرفته در یک جمله — 'Not only should it be emphasized that... but it is precisely this nuance that...' (وارونگی + التزامی + شکافته). تسلط بر این درهم‌بافی، نشان استادی است.",
      examples: [
        "Not only should the committee insist that the findings be verified, but it is the methodology that demands scrutiny.",
        "Rarely has a work so ephemeral left so permanent a mark.",
        "So profound was the irony that scarcely anyone grasped it.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام جمله ترکیب وارونگی + التزامی را دارد؟", options: ["Not only should he be told, but...", "He should be told not only...", "Not only he should told...", "Should he not only telling..."], correctIndex: 0, explain: "Not only + should + فاعل + be told (التزامی)." },
      { id: "q2", kind: "multiple-choice", prompt: "«زودگذر» کدام واژه است؟", options: ["ubiquitous", "ephemeral", "serendipity", "epitome"], correctIndex: 1, explain: "ephemeral = زودگذر." },
      { id: "q3", kind: "word-order", prompt: "cleft بساز: دقیقاً این ظرافت است که تفسیر را می‌طلبد.", words: ["it", "is", "precisely", "this", "nuance", "that", "demands", "interpretation"], correctSentence: "it is precisely this nuance that demands interpretation", explain: "It is + X + that + ... (شکافته)." },
    ],
    practicePrompt: "Engage in free multi-topic discourse to earn the Grandmaster Badge from the AI.",
  },

  "c2-8-2": {
    lessonId: "c2-8-2",
    vocabulary: [
      { term: "prowess", phonetic: "ˈpraʊəs", meaning: "تسلط / مهارت استثنایی", example: "Linguistic prowess.", emoji: "🏆" },
      { term: "acumen", phonetic: "ˈækjəmən", meaning: "تیزبینی / فراست", example: "Business acumen.", emoji: "🦅" },
      { term: "sagacity", phonetic: "səˈɡæsəti", meaning: "فرزانگی", example: "Her sagacity guided us.", emoji: "🦉" },
      { term: "mastery", phonetic: "ˈmæstəri", meaning: "تسلط مطلق", example: "Mastery of language.", emoji: "👑" },
    ],
    grammar: {
      rule: "Final synthesis: layering every advanced structure at will",
      explanation:
        "درس آخر: توانایی لایه‌لایه کردن همه‌ی ساختارها — وارونگی منفی، وجه التزامی، شکافته، اسمی‌سازی و بندهای پیراسته — بسته به هدف بلاغی. سخنور C2 ساختار را انتخاب نمی‌کند؛ آن را می‌سازد.",
      examples: [
        "Under no circumstances should it be assumed that nuance is superfluous.",
        "What distinguishes mastery is not vocabulary, but the deployment thereof.",
        "Were one to juxtapose restraint with eloquence, one would find the former the rarer gift.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام جمله هر سه عنصر (وارونگی + التزامی + thereof ادبی) را دارد؟", options: ["Under no circumstances should it be assumed that nuance is superfluous.", "We should not assume nuance is superfluous.", "Nuance should not be assumed superfluous by us.", "It is assumed nuance is superfluous."], correctIndex: 0, explain: "وارونگی + should be assumed (التزامی) + صفت فاخر." },
      { id: "q2", kind: "multiple-choice", prompt: "«فرزانگی / خرد عمیق» کدام واژه است؟", options: ["acumen", "prowess", "sagacity", "mastery"], correctIndex: 2, explain: "sagacity = فرزانگی." },
      { id: "q3", kind: "word-order", prompt: "بگو: تسلط را نه واژگان، بلکه کاربرد آن متمایز می‌کند.", words: ["What", "distinguishes", "mastery", "is", "the", "deployment", "thereof"], correctSentence: "What distinguishes mastery is the deployment thereof", explain: "cleft + thereof (رسمی)." },
    ],
    practicePrompt: "Complete the final synthesis challenge to earn your Grandmaster Badge.",
  },
};
