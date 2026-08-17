import type { LessonContent } from "@/types";

/**
 * FULL senior-instructor content for the 16 non-roleplay B2 lessons.
 *
 * Compliance: Cambridge English: First / Oxford Upper-Intermediate.
 * 8 units × 3 lessons = 24 total. Lessons 1&2 of each unit are interactive;
 * lesson 3 is roleplay (no entry here — launches straight to AI chat).
 *
 * All grammar rules/examples render through isolated LTR containers in the
 * lesson UI (BidiText / dir="ltr"), and quizzes validate via normalizeText.
 */
export const B2_LESSON_CONTENT: Record<string, LessonContent> = {
  /* ===== Unit 1: Psychology & Human Behavior ===== */
  "b2-1-1": {
    lessonId: "b2-1-1",
    vocabulary: [
      { term: "overwhelmed", phonetic: "ˌoʊvərˈwelmd", meaning: "مغلوب احساسات / تحت فشار شدید", example: "I felt overwhelmed by the workload.", emoji: "😵" },
      { term: "empathy", phonetic: "ˈempəθi", meaning: "همدلی", example: "She showed great empathy.", emoji: "💞" },
      { term: "intuition", phonetic: "ˌɪntjuˈɪʃn", meaning: "شهود / درک درونی", example: "My intuition told me to leave.", emoji: "🧠" },
      { term: "resilient", phonetic: "rɪˈzɪliənt", meaning: "تاب‌آور / انعطاف‌پذیر", example: "Children are remarkably resilient.", emoji: "🌱" },
      { term: "self-conscious", phonetic: "ˌself ˈkɑːnʃəs", meaning: "خودآگاه / خجالتی", example: "He felt self-conscious on stage.", emoji: "😳" },
      { term: "impulsive", phonetic: "ɪmˈpʌlsɪv", meaning: "تهوری / تکانه‌ای", example: "She made an impulsive decision.", emoji: "⚡" },
      { term: "mindful", phonetic: "ˈmaɪndfl", meaning: "آگاه / با حوصله", example: "Be mindful of your words.", emoji: "🧘" },
      { term: "vulnerable", phonetic: "ˈvʌlnərəbl", meaning: "آسیب‌پذیر", example: "He felt vulnerable after the loss.", emoji: "🛡️" },
    ],
    grammar: {
      rule: "Past Modals: must have / can't have / could have / shouldn't have + past participle",
      explanation:
        "افعال مدال گذشته برای حدس و سرزنش استفاده می‌شوند: must have (حتماً بوده)، can't have (ممکن نیست بوده)، could have (می‌توانست ولی نشد)، shouldn't have (نباید می‌کرد — سرزنش).",
      examples: [
        "She must have forgotten the meeting. (حدس قوی)",
        "You can't have finished already! (باورنکردنی)",
        "I could have studied medicine, but I chose art. (فرصت از دست رفته)",
        "You shouldn't have said that. (سرزنش)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«حتماً فراموش کرده» کدام ساختار است؟", options: ["must forget", "must have forgotten", "should forget", "could forget"], correctIndex: 1, explain: "must have + past participle برای حدس قوی درباره گذشته." },
      { id: "q2", kind: "multiple-choice", prompt: "برای سرزنش «نباید می‌گفتی» کدام درست است؟", options: ["didn't should say", "shouldn't have said", "shouldn't say", "mustn't have said"], correctIndex: 1, explain: "shouldn't have + past participle برای سرزنش عمل گذشته." },
      { id: "q3", kind: "word-order", prompt: "بگو: او می‌توانست موفق شود ولی تلاش نکرد.", words: ["could", "have", "succeeded", "but", "didn't", "try"], correctSentence: "could have succeeded but didn't try", explain: "could have + past participle = فرصت از دست رفته." },
    ],
    practicePrompt: "Analyze a past decision with the AI using past modals (should have / could have).",
  },

  "b2-1-2": {
    lessonId: "b2-1-2",
    vocabulary: [
      { term: "regret", phonetic: "rɪˈɡret", meaning: "پشیمانی", example: "I regret not studying harder.", emoji: "😔" },
      { term: "blame", phonetic: "bleɪm", meaning: "سرزنش / تقصیر", example: "Don't blame yourself.", emoji: "👉" },
      { term: "hindsight", phonetic: "ˈhaɪndsaɪt", meaning: "بعد از ماجرا (دانستن)", example: "In hindsight, it was a mistake.", emoji: "🔍" },
      { term: "cope with", phonetic: "koʊp wɪθ", meaning: "کنار آمدن با", example: "How do you cope with stress?", emoji: "🧯" },
    ],
    grammar: {
      rule: "Past modals of deduction: must have / might have / can't have",
      explanation:
        "برای نتیجه‌گیری درباره گذشته: must have (قطعیت)، might/may have (احتمال)، can't have (رد قطعی). این ساختارها در تحلیل احساسی تصمیمات گذشته بسیار پرکاربردند.",
      examples: [
        "He must have been exhausted. (قطعی)",
        "She might have missed the train. (احتمال)",
        "They can't have known the truth. (رد قطعی)",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«ممکن است قطار را از دست داده باشد» کدام است؟", options: ["must have missed", "might have missed", "can't have missed", "should miss"], correctIndex: 1, explain: "might have برای احتمال در گذشته." },
      { id: "q2", kind: "word-order", prompt: "بگو: او نمی‌توانسته حقیقت را بداند.", words: ["can't", "have", "known", "the", "truth"], correctSentence: "can't have known the truth", explain: "can't have + p.p. برای رد قطعی." },
      { id: "q3", kind: "multiple-choice", prompt: "کلمه‌ی «پشیمانی» کدام است؟", options: ["hindsight", "regret", "blame", "cope"], correctIndex: 1, explain: "regret = پشیمانی." },
    ],
    practicePrompt: "Discuss a decision you regret using past modals with the AI counselor.",
  },

  /* ===== Unit 2: Business & Negotiations ===== */
  "b2-2-1": {
    lessonId: "b2-2-1",
    vocabulary: [
      { term: "stakeholder", phonetic: "ˈsteɪkhoʊldər", meaning: "ذی‌نفع", example: "We consulted all stakeholders.", emoji: "🤝" },
      { term: "leverage", phonetic: "ˈlevərɪdʒ", meaning: "قدرت چانه‌زنی / اهرم فشار", example: "We have little leverage in the deal.", emoji: "⚖️" },
      { term: "counter-offer", phonetic: "ˈkaʊntər ˈɔːfər", meaning: "پیشنهاد متقابل", example: "They made a counter-offer.", emoji: "↩️" },
      { term: "ROI", phonetic: "ɑːr oʊ aɪ", meaning: "بازگشت سرمایه", example: "The ROI was impressive.", emoji: "📈" },
      { term: "deadline", phonetic: "ˈdedlaɪn", meaning: "مهلت / ضرب‌الاجل", example: "The deadline is Friday.", emoji: "⏰" },
      { term: "merger", phonetic: "ˈmɜːrdʒər", meaning: "ادغام شرکت‌ها", example: "The merger was approved.", emoji: "🏢" },
      { term: "incentive", phonetic: "ɪnˈsentɪv", meaning: "مشوق / انگیزه", example: "Bonuses are strong incentives.", emoji: "🎯" },
      { term: "compromise", phonetic: "ˈkɑːmprəmaɪz", meaning: "مصالحه", example: "We reached a compromise.", emoji: "🤝" },
    ],
    grammar: {
      rule: "Mixed Conditionals: If + past perfect, would + verb (present result)",
      explanation:
        "شرطی ترکیبی زمان شرط و نتیجه را مخلوط می‌کند: If I had taken that job (گذشته), I would be rich now (حال). برای پیامدهای فعلیِ تصمیمات گذشته استفاده می‌شود — ابزار اصلی مذاکره و تحلیل کسب‌وکار.",
      examples: [
        "If I had taken that job, I would be a manager now.",
        "If we had invested in 2010, we would be millionaires today.",
        "She wouldn't be so tired if she hadn't worked all night.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام شرطی ترکیبی درست است؟", options: ["If I took that job, I would be rich now.", "If I had taken that job, I would be rich now.", "If I had taken that job, I would have been rich yesterday.", "If I take that job, I would be rich now."], correctIndex: 1, explain: "Mixed: If + past perfect → would + حال." },
      { id: "q2", kind: "word-order", prompt: "بگو: اگر در ۲۰۱۰ سرمایه‌گذاری کرده بودیم، الان میلیاردر بودیم.", words: ["If", "we", "had", "invested", "in", "2010", ",", "we", "would", "be", "millionaires", "now"], correctSentence: "If we had invested in 2010, we would be millionaires now", explain: "شرط گذشته + نتیجه حال." },
      { id: "q3", kind: "multiple-choice", prompt: "«پیشنهاد متقابل» در مذاکره چه نامیده می‌شود؟", options: ["merger", "counter-offer", "incentive", "leverage"], correctIndex: 1, explain: "counter-offer = پیشنهاد متقابل." },
    ],
    practicePrompt: "Negotiate a contract with the AI sales manager using business terms.",
  },

  "b2-2-2": {
    lessonId: "b2-2-2",
    vocabulary: [
      { term: "negotiate", phonetic: "nɪˈɡoʊʃieɪt", meaning: "مذاکره کردن", example: "We negotiated a better price.", emoji: "💬" },
      { term: "proposal", phonetic: "prəˈpoʊzl", meaning: "پیشنهاد رسمی", example: "Your proposal sounds reasonable.", emoji: "📑" },
      { term: "terms", phonetic: "tɜːrmz", meaning: "شرایط (قرارداد)", example: "The terms are unacceptable.", emoji: "📜" },
      { term: "discount", phonetic: "ˈdɪskaʊnt", meaning: "تخفیف", example: "Can you offer a discount?", emoji: "🏷️" },
    ],
    grammar: {
      rule: "Mixed conditional type 2: If + past simple, would have + p.p. (past result)",
      explanation:
        "نوع دیگر شرطی ترکیبی: شرط در حال، نتیجه در گذشته: If I were more experienced (الان), I would have gotten the job (آن موقع). برای تحلیل رابطه‌ی وضعیت فعلی با نتایج گذشته.",
      examples: [
        "If I were fluent in English, I would have signed the contract.",
        "If he wasn't so busy, he would have joined the meeting.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟ «اگر بانکا بودم، قرارداد را امضا کرده بودم»", options: ["If I was fluent, I signed it.", "If I were fluent, I would have signed it.", "If I am fluent, I would sign it.", "If I were fluent, I will sign it."], correctIndex: 1, explain: "شرط حال (were) + نتیجه گذشته (would have signed)." },
      { id: "q2", kind: "word-order", prompt: "بگو: ما به مصالحه رسیدیم.", words: ["We", "reached", "a", "compromise"], correctSentence: "We reached a compromise", explain: "reach a compromise = به مصالحه رسیدن." },
      { id: "q3", kind: "multiple-choice", prompt: "«قدرت چانه‌زنی» کدام کلمه است؟", options: ["discount", "leverage", "terms", "proposal"], correctIndex: 1, explain: "leverage = اهرم فشار / قدرت چانه‌زنی." },
    ],
    practicePrompt: "Practice mixed conditionals in a salary negotiation with the AI.",
  },

  /* ===== Unit 3: Law, Crime & Ethics ===== */
  "b2-3-1": {
    lessonId: "b2-3-1",
    vocabulary: [
      { term: "verdict", phonetic: "ˈvɜːrdɪkt", meaning: "رأی دادگاه", example: "The verdict was guilty.", emoji: "⚖️" },
      { term: "testimony", phonetic: "ˈtestɪmoʊni", meaning: "شهادت", example: "Her testimony was crucial.", emoji: "🗣️" },
      { term: "smuggling", phonetic: "ˈsmʌɡlɪŋ", meaning: "قاچاق", example: "He was accused of smuggling.", emoji: "📦" },
      { term: "defense", phonetic: "dɪˈfens", meaning: "دفاع / وکالت مدافع", example: "The defense presented evidence.", emoji: "🛡️" },
      { term: "prosecution", phonetic: "ˌprɑːsɪˈkjuːʃn", meaning: "تعقیب قضایی / دادستان", example: "The prosecution rests.", emoji: "⚖️" },
      { term: "evidence", phonetic: "ˈevɪdəns", meaning: "مدرک", example: "There is no evidence.", emoji: "🔍" },
      { term: "allegedly", phonetic: "əˈledʒɪdli", meaning: "به ادعای / ظاهراً", example: "He allegedly stole the money.", emoji: "❓" },
      { term: "acquitted", phonetic: "əˈkwɪtɪd", meaning: "تبرئه شده", example: "She was acquitted of all charges.", emoji: "✅" },
    ],
    grammar: {
      rule: "Advanced Passives: It is believed that... / He is said to be...",
      explanation:
        "مجهول خبری برای انتقال اطلاعات بدون ذکر منبع: It is believed that... (باور بر این است)، He is said to be... (ظاهراً او ... است). این ساختار در متون حقوقی و خبری بسیار رایج است.",
      examples: [
        "It is believed that the suspect fled the country.",
        "He is said to have connections with the mafia.",
        "The evidence was allegedly destroyed.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«باور بر این است که او فرار کرده» کدام است؟", options: ["It believes he fled.", "It is believed that he fled.", "He is believing to flee.", "It was believe he fled."], correctIndex: 1, explain: "It is believed that + جمله." },
      { id: "q2", kind: "multiple-choice", prompt: "«تبرئه شده» کدام کلمه است؟", options: ["verdict", "acquitted", "testimony", "evidence"], correctIndex: 1, explain: "acquitted = تبرئه شده." },
      { id: "q3", kind: "word-order", prompt: "بگو: مدرک ظاهراً نابود شده است.", words: ["The", "evidence", "was", "allegedly", "destroyed"], correctSentence: "The evidence was allegedly destroyed", explain: "was + allegedly + past participle." },
    ],
    practicePrompt: "Defend a client in a mock trial with the AI judge using legal vocabulary.",
  },

  "b2-3-2": {
    lessonId: "b2-3-2",
    vocabulary: [
      { term: "have something done", phonetic: "hæv", meaning: "کاری را انجام داده‌شدن (توسط دیگری)", example: "I had my car repaired.", emoji: "🔧" },
      { term: "get something done", phonetic: "ɡet", meaning: "کاری را انجام دادن (توسط دیگری)", example: "She got her hair cut.", emoji: "💇" },
      { term: "causative", phonetic: "ˈkɔːzətɪv", meaning: "ساختار علّی", example: "Have/get + object + p.p.", emoji: "⚙️" },
    ],
    grammar: {
      rule: "Causative: have/get + object + past participle",
      explanation:
        "ساختار علّی وقتی استفاده می‌شود که کاری توسط شخص دیگری انجام شود: I had my house painted (خانه‌ام را نقاشی کردند). تفاوت have (رسمی‌تر) و get (محاوره‌ای‌تر).",
      examples: [
        "I had my phone fixed yesterday.",
        "She's getting her car serviced.",
        "We need to have the contract reviewed.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«دندانه را ترمیم کردم (دندانپزشکی)» کدام است؟", options: ["I fixed my tooth.", "I had my tooth fixed.", "I have my tooth fix.", "I got fix my tooth."], correctIndex: 1, explain: "have + object + past participle." },
      { id: "q2", kind: "word-order", prompt: "بگو: او دارد ماشینش را سرویس می‌کند.", words: ["She's", "getting", "her", "car", "serviced"], correctSentence: "She's getting her car serviced", explain: "get + object + p.p." },
      { id: "q3", kind: "multiple-choice", prompt: "ساختار علّی برای چه استفاده می‌شود؟", options: ["کار خودم انجام دادم", "کار توسط دیگری انجام شد", "کار در آینده", "کار غیرممکن"], correctIndex: 1, explain: "causative = خدمت گرفتن از دیگران." },
    ],
    practicePrompt: "Use causative structures to describe services you've arranged with the AI.",
  },

  /* ===== Unit 4: Media & Critical Thinking ===== */
  "b2-4-1": {
    lessonId: "b2-4-1",
    vocabulary: [
      { term: "sensationalism", phonetic: "senˈseɪʃənəlɪzəm", meaning: "احساسات‌فروشی رسانه‌ای", example: "The article is pure sensationalism.", emoji: "📰" },
      { term: "bias", phonetic: "ˈbaɪəs", meaning: "سوگیری / جانبداری", example: "The report shows clear bias.", emoji: "⚖️" },
      { term: "misleading", phonetic: "mɪsˈliːdɪŋ", meaning: "گمراه‌کننده", example: "The headline is misleading.", emoji: "❌" },
      { term: "propaganda", phonetic: "ˌprɑːpəˈɡændə", meaning: "تبلیغات سیاسی / پروپاگندا", example: "It's state propaganda.", emoji: "📢" },
      { term: "credible", phonetic: "ˈkredəbl", meaning: "معتبر / قابل اعتماد", example: "Is this source credible?", emoji: "✅" },
      { term: "fact-check", phonetic: "fækt tʃek", meaning: "راستی‌آزمایی", example: "Always fact-check the news.", emoji: "🔍" },
      { term: "clickbait", phonetic: "ˈklɪkbeɪt", meaning: "تیتر فریبنده", example: "That's just clickbait.", emoji: "🖱️" },
      { term: "coverage", phonetic: "ˈkʌvərɪdʒ", meaning: "پوشش خبری", example: "The media coverage was extensive.", emoji: "📡" },
    ],
    grammar: {
      rule: "Reporting Verbs: claim / deny / urge / insist on + gerund",
      explanation:
        "به جای said می‌توان از افعال گزاره‌ای متنوع استفاده کرد: claim (ادعا کرد)، deny (رد کرد)، urge (ترغیب کرد)، insist on (پافشاری کرد). بعد از deny و insist on اگر فعل بیاید، شکل ing می‌گیرد.",
      examples: [
        "The minister denied knowing about the scandal.",
        "She insisted on paying the bill.",
        "Experts urge the public to stay calm.",
        "He claimed that the report was false.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«او دانستن از رسوایی را رد کرد» کدام است؟", options: ["He denied to know.", "He denied knowing.", "He denied know.", "He denied knew."], correctIndex: 1, explain: "deny + gerund (knowing)." },
      { id: "q2", kind: "multiple-choice", prompt: "«او پافشاری کرد که پول را بپردازد» کدام است؟", options: ["She insisted to pay.", "She insisted on paying.", "She insisted pay.", "She insisted on pay."], correctIndex: 1, explain: "insist on + gerund." },
      { id: "q3", kind: "multiple-choice", prompt: "«تیتر فریبنده برای کلیک گرفتن» چه نامیده می‌شود؟", options: ["coverage", "clickbait", "bias", "propaganda"], correctIndex: 1, explain: "clickbait = تیتر فریبنده." },
    ],
    practicePrompt: "Analyze a news article's credibility with the AI media analyst.",
  },

  "b2-4-2": {
    lessonId: "b2-4-2",
    vocabulary: [
      { term: "allege", phonetic: "əˈledʒ", meaning: "ادعا کردن (بدون اثبات)", example: "The report alleges corruption.", emoji: "❓" },
      { term: "admit", phonetic: "ədˈmɪt", meaning: "پذیرفتن / اعتراف کردن", example: "He admitted the mistake.", emoji: "🙇" },
      { term: "suggest", phonetic: "səˈdʒest", meaning: "پیشنهاد دادن", example: "She suggested a new approach.", emoji: "💡" },
      { term: "accuse", phonetic: "əˈkjuːz", meaning: "متهم کردن", example: "They accused him of lying.", emoji: "👉" },
    ],
    grammar: {
      rule: "Reporting verb patterns: verb + to-inf / gerund / that-clause",
      explanation:
        "هر فعل گزاره‌ای الگوی خاصی دارد: admit + gerund (admitted stealing)، accuse somebody of + gerund، urge + object + to-infinitive، suggest + that-clause. یادگیری این الگوها برای نوشتن آکادمیک ضروری است.",
      examples: [
        "He admitted making a mistake.",
        "They accused her of hiding evidence.",
        "The report suggests that prices will rise.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟ «او را به دروغگویی متهم کردند»", options: ["They accused her to lie.", "They accused her of lying.", "They accused her that she lied.", "They accused her lie."], correctIndex: 1, explain: "accuse + somebody + of + gerund." },
      { id: "q2", kind: "word-order", prompt: "بگو: او اشتباه کردن را پذیرفت.", words: ["He", "admitted", "making", "a", "mistake"], correctSentence: "He admitted making a mistake", explain: "admit + gerund." },
      { id: "q3", kind: "multiple-choice", prompt: "«راستی‌آزمایی» کدام است؟", options: ["bias", "fact-check", "coverage", "allege"], correctIndex: 1, explain: "fact-check = راستی‌آزمایی." },
    ],
    practicePrompt: "Report what officials said using varied reporting verbs with the AI.",
  },

  /* ===== Unit 5: Biotech & Modern Medicine ===== */
  "b2-5-1": {
    lessonId: "b2-5-1",
    vocabulary: [
      { term: "clinical trial", phonetic: "ˈklɪnɪkl ˈtraɪəl", meaning: "کارآزمایی بالینی", example: "The drug passed clinical trials.", emoji: "🏥" },
      { term: "breakthrough", phonetic: "ˈbreɪkθruː", meaning: "پیشرفت بزرگ / دستاورد", example: "A major breakthrough in cancer research.", emoji: "🔬" },
      { term: "genetic", phonetic: "dʒəˈnetɪk", meaning: "ژنتیکی / وراثتی", example: "Genetic engineering raises questions.", emoji: "🧬" },
      { term: "diagnosis", phonetic: "ˌdaɪəɡˈnoʊsɪs", meaning: "تشخیص پزشکی", example: "The diagnosis was early.", emoji: "🩺" },
      { term: "vaccine", phonetic: "vækˈsiːn", meaning: "واکسن", example: "The vaccine is effective.", emoji: "💉" },
      { term: "therapy", phonetic: "ˈθerəpi", meaning: "درمان / درمان‌گرى", example: "Physical therapy helped.", emoji: "💆" },
      { term: "ethical", phonetic: "ˈeθɪkl", meaning: "اخلاقی", example: "Is genetic editing ethical?", emoji: "🤔" },
      { term: "AI in diagnosis", phonetic: "eɪ aɪ", meaning: "هوش مصنوعی در تشخیص", example: "AI improves diagnosis accuracy.", emoji: "🤖" },
    ],
    grammar: {
      rule: "Inversion: Not only did we... / Seldom have I seen...",
      explanation:
        "وارونگی برای تأکید رسمی: وقتی عبارت منفی یا محدودکننده اول جمله بیاید، فعل کمکی قبل از فاعل می‌آید: Not only did we discover the gene (نه we discovered). این ساختار در متون علمی و رسمی فراوان است.",
      examples: [
        "Not only did they find the mutation, but they also cured it.",
        "Seldom have I seen such a breakthrough.",
        "Never before has medicine advanced so quickly.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام وارونگی درست است؟", options: ["Not only we discovered the gene.", "Not only did we discover the gene.", "Not only we did discover the gene.", "Not only discovered we the gene."], correctIndex: 1, explain: "بعد از Not only، کمکی (did) قبل از فاعل می‌آید." },
      { id: "q2", kind: "word-order", prompt: "بگو: هرگز چنین پیشرفتی ندیده‌ام.", words: ["Seldom", "have", "I", "seen", "such", "progress"], correctSentence: "Seldom have I seen such progress", explain: "Seldom + have + I + seen (وارونگی)." },
      { id: "q3", kind: "multiple-choice", prompt: "«کارآزمایی بالینی» کدام است؟", options: ["breakthrough", "clinical trial", "therapy", "diagnosis"], correctIndex: 1, explain: "clinical trial = کارآزمایی بالینی." },
    ],
    practicePrompt: "Discuss AI in medicine using inversion structures with the AI scientist.",
  },

  "b2-5-2": {
    lessonId: "b2-5-2",
    vocabulary: [
      { term: "no sooner", phonetic: "noʊ ˈsuːnər", meaning: "به محض اینکه", example: "No sooner had we arrived...", emoji: "⏱️" },
      { term: "rarely", phonetic: "ˈrerli", meaning: "به‌ندرت", example: "Rarely do we see such results.", emoji: "📉" },
      { term: "under no circumstances", phonetic: "ˈʌndər", meaning: "تحت هیچ شرایطی", example: "Under no circumstances should you...", emoji: "🚫" },
    ],
    grammar: {
      rule: "Inversion after negative/restrictive adverbs",
      explanation:
        "بعد از عبارات منفی مثل never، rarely، seldom، no sooner، under no circumstances وقتی اول جمله بیایند، وارونگی رخ می‌دهد: Rarely do we see (نه we see). No sooner had we arrived (نه we had arrived).",
      examples: [
        "No sooner had the trial started than results appeared.",
        "Rarely does a discovery change everything.",
        "Under no circumstances should this data be shared.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["Rarely we see this.", "Rarely do we see this.", "Rarely we do see this.", "Rarely does we see this."], correctIndex: 1, explain: "Rarely + do + we + see." },
      { id: "q2", kind: "word-order", prompt: "بگو: به محض رسیدن، باران بارید.", words: ["No", "sooner", "had", "we", "arrived", "than", "it", "rained"], correctSentence: "No sooner had we arrived than it rained", explain: "No sooner + had + فاعل + p.p. + than." },
      { id: "q3", kind: "multiple-choice", prompt: "وارونگی برای چه منظوری است؟", options: ["سرعت", "تأکید رسمی", "سادگی", "محاوره"], correctIndex: 1, explain: "وارونگی ابزار تأکید در نگارش رسمی است." },
    ],
    practicePrompt: "Describe scientific discoveries using inversion with the AI researcher.",
  },

  /* ===== Unit 6: Arts, Culture & Criticism ===== */
  "b2-6-1": {
    lessonId: "b2-6-1",
    vocabulary: [
      { term: "masterpiece", phonetic: "ˈmæstərpiːs", meaning: "شاهکار", example: "The film is a masterpiece.", emoji: "🎨" },
      { term: "aesthetic", phonetic: "esˈθetɪk", meaning: "زیبایی‌شناختی", example: "The building has aesthetic value.", emoji: "🏛️" },
      { term: "contemporary", phonetic: "kənˈtempəreri", meaning: "معاصر", example: "Contemporary art challenges us.", emoji: "🖼️" },
      { term: "interpretation", phonetic: "ɪnˌtɜːrprɪˈteɪʃn", meaning: "تفسیر / تأویل", example: "Her interpretation is unique.", emoji: "💭" },
      { term: "provocative", phonetic: "prəˈvɑːkətɪv", meaning: "تحریک‌آمیز", example: "A provocative novel.", emoji: "🔥" },
      { term: "compelling", phonetic: "kəmˈpelɪŋ", meaning: "مسحورکننده / قانع‌کننده", example: "A compelling performance.", emoji: "⭐" },
      { term: "nuanced", phonetic: "ˈnjuːɑːnst", meaning: "دارای ظرافت / پلکانی", example: "A nuanced critique.", emoji: "🎚️" },
      { term: "acclaimed", phonetic: "əˈkleɪmd", meaning: "تحسین‌شده", example: "The acclaimed director.", emoji: "🏆" },
    ],
    grammar: {
      rule: "Participle Clauses: Having finished..., Being tired..., Praised by...",
      explanation:
        "جملات واره‌ای (participle) جملات را کوتاه و رسمی می‌کنند: Having finished the book (بعد از تمام کردن کتاب)، Having been praised (بعد از تحسین شدن). این ساختار در نقد هنری و نگارش آکادمیک فراوان است.",
      examples: [
        "Having finished the novel, she wrote her review.",
        "Having been praised by critics, the film became a hit.",
        "Exhausted by the performance, the actor collapsed.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام جمله واره‌ای درست است؟", options: ["Finished the book, she wrote.", "Having finished the book, she wrote.", "Having finish the book, she wrote.", "Have finished, she wrote."], correctIndex: 1, explain: "Having + past participle برای عمل قبل‌تر." },
      { id: "q2", kind: "word-order", prompt: "بگو: بعد از تحسین شدن توسط منتقدان، فیلم موفق شد.", words: ["Having", "been", "praised", "by", "critics", ",", "the", "film", "succeeded"], correctSentence: "Having been praised by critics, the film succeeded", explain: "Having been + p.p. برای مجهول." },
      { id: "q3", kind: "multiple-choice", prompt: "«شاهکار» کدام است؟", options: ["contemporary", "masterpiece", "aesthetic", "nuanced"], correctIndex: 1, explain: "masterpiece = شاهکار." },
    ],
    practicePrompt: "Review a famous book or film with the AI art critic using participle clauses.",
  },

  "b2-6-2": {
    lessonId: "b2-6-2",
    vocabulary: [
      { term: "review", phonetic: "rɪˈvjuː", meaning: "نقد / بررسی", example: "The review was positive.", emoji: "📝" },
      { term: "portray", phonetic: "pɔːrˈtreɪ", meaning: "به تصویر کشیدن", example: "The film portrays real events.", emoji: "🎬" },
      { term: "evoke", phonetic: "ɪˈvoʊk", meaning: "برانگیختن (احساس)", example: "The music evokes nostalgia.", emoji: "🎵" },
      { term: "captivate", phonetic: "ˈkæptɪveɪt", meaning: "مسحور کردن", example: "The audience was captivated.", emoji: "✨" },
    ],
    grammar: {
      rule: "Reduced relative clauses: The book (which was) written by...",
      explanation:
        "جملات نسبی را می‌توان کوتاه کرد: The book which was written by him → The book written by him. این کوتاه‌سازی متن را رسمی‌تر و روان‌تر می‌کند — ابزار کلیدی نقد ادبی.",
      examples: [
        "The novel written in 1920 became a classic.",
        "The actors performing tonight are acclaimed.",
        "The painting stolen last year was recovered.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام کوتاه‌سازی درست است؟", options: ["The book wrote by him", "The book written by him", "The book writing by him", "The book which wrote by him"], correctIndex: 1, explain: "کوتاه‌شده‌ی which was written → written." },
      { id: "q2", kind: "multiple-choice", prompt: "«برانگیختن احساس» کدام فعل است؟", options: ["portray", "evoke", "captivate", "review"], correctIndex: 1, explain: "evoke = برانگیختن." },
      { id: "q3", kind: "word-order", prompt: "بگو: رمانی که در ۱۹۲۰ نوشته شد کلاسیک شد.", words: ["The", "novel", "written", "in", "1920", "became", "a", "classic"], correctSentence: "The novel written in 1920 became a classic", explain: "novel + written (کوتاه‌شده)." },
    ],
    practicePrompt: "Critique an artwork using reduced relative clauses with the AI critic.",
  },

  /* ===== Unit 7: Global Economy & Finance ===== */
  "b2-7-1": {
    lessonId: "b2-7-1",
    vocabulary: [
      { term: "inflation", phonetic: "ɪnˈfleɪʃn", meaning: "تورم", example: "Inflation is rising.", emoji: "📈" },
      { term: "volatility", phonetic: "ˌvɑːləˈtɪləti", meaning: "نوسان‌پذیری", example: "Market volatility worries investors.", emoji: "📊" },
      { term: "assets", phonetic: "ˈæsets", meaning: "دارایی‌ها / سرمایه", example: "Diversify your assets.", emoji: "💎" },
      { term: "decentralized", phonetic: "diːˈsentrəlaɪzd", meaning: "غیرمتمرکز", example: "Decentralized finance is growing.", emoji: "🌐" },
      { term: "recession", phonetic: "rɪˈseʃn", meaning: "رکود اقتصادی", example: "The recession hit hard.", emoji: "📉" },
      { term: "portfolio", phonetic: "pɔːrtˈfoʊlioʊ", meaning: "سبد سرمایه", example: "Review your portfolio.", emoji: "💼" },
      { term: "cryptocurrency", phonetic: "ˈkrɪptoʊkɜːrənsi", meaning: "ارز دیجیتال", example: "Cryptocurrency is volatile.", emoji: "🪙" },
      { term: "diversify", phonetic: "daɪˈvɜːrsɪfaɪ", meaning: "تنوع بخشیدن", example: "Diversify your investments.", emoji: "🔀" },
    ],
    grammar: {
      rule: "Wishes & Regrets: I wish / If only / It's time we + past",
      explanation:
        "برای حسرت و آرزو: I wish + past simple (ای کاش الان)، If only (تأکیدی‌تر)، It's time we + past (وقتش رسیده که). در بافت مالی برای حسرت تصمیمات سرمایه‌گذاری استفاده می‌شود.",
      examples: [
        "I wish I had invested in Bitcoin in 2015.",
        "If only we had sold before the crash!",
        "It's time we diversified our portfolio.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«ای کاش در بیت‌کوین سرمایه‌گذاری کرده بودم» کدام است؟", options: ["I wish I invested.", "I wish I had invested.", "I wish I would invest.", "I wish I have invested."], correctIndex: 1, explain: "حسرت گذشته: wish + past perfect." },
      { id: "q2", kind: "multiple-choice", prompt: "«وقتش رسیده که تنوع بدهیم» کدام است؟", options: ["It's time we diversify.", "It's time we diversified.", "It's time we will diversify.", "It's time we diversifying."], correctIndex: 1, explain: "It's time + past simple (معنای حال)." },
      { id: "q3", kind: "multiple-choice", prompt: "«نوسان‌پذیری بازار» کدام است؟", options: ["inflation", "volatility", "recession", "assets"], correctIndex: 1, explain: "volatility = نوسان‌پذیری." },
    ],
    practicePrompt: "Discuss investment regrets and plans with the AI financial advisor.",
  },

  "b2-7-2": {
    lessonId: "b2-7-2",
    vocabulary: [
      { term: "regret", phonetic: "rɪˈɡret", meaning: "حسرت / پشیمانی", example: "I regret investing late.", emoji: "😔" },
      { term: "hedge", phonetic: "hedʒ", meaning: "پوشش ریسک", example: "Gold is a hedge against inflation.", emoji: "🛡️" },
      { term: "speculate", phonetic: "ˈspekjuleɪt", meaning: "سفته‌بازی کردن", example: "Don't speculate with savings.", emoji: "🎲" },
      { term: "yield", phonetic: "jiːld", meaning: "بازدهی", example: "The yield is 5%.", emoji: "💰" },
    ],
    grammar: {
      rule: "would rather + base verb / would rather have + p.p.",
      explanation:
        "would rather برای ترجیح: I'd rather invest in stocks (الان). برای گذشته: I'd rather have invested in gold (ای کاش کرده بودم — حسرت). تفاوت ظریف با wish: rather ترجیح بین گزینه‌ها را بیان می‌کند.",
      examples: [
        "I'd rather invest in index funds.",
        "I'd rather have sold last year. (حسرت)",
        "Would you rather save or invest?",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«ای کاش پارسال فروخته بودم» با rather کدام است؟", options: ["I'd rather sell.", "I'd rather have sold.", "I'd rather sold.", "I'd rather selling."], correctIndex: 1, explain: "حسرت: would rather have + p.p." },
      { id: "q2", kind: "word-order", prompt: "بگو: ترجیح می‌دهم در صندوق‌های شاخصی سرمایه‌گذاری کنم.", words: ["I'd", "rather", "invest", "in", "index", "funds"], correctSentence: "I'd rather invest in index funds", explain: "would rather + base verb." },
      { id: "q3", kind: "multiple-choice", prompt: "«پوشش ریسک در برابر تورم» کدام است؟", options: ["yield", "hedge", "speculate", "portfolio"], correctIndex: 1, explain: "hedge = پوشش ریسک." },
    ],
    practicePrompt: "Talk to the AI advisor about would rather choices in investing.",
  },

  /* ===== Unit 8: Public Speaking & Nuanced Debate ===== */
  "b2-8-1": {
    lessonId: "b2-8-1",
    vocabulary: [
      { term: "furthermore", phonetic: "ˈfɜːrðərmɔːr", meaning: "علاوه بر این", example: "Furthermore, the data shows...", emoji: "➕" },
      { term: "in contrast", phonetic: "ɪn ˈkɑːntræst", meaning: "در مقابل / در تضاد", example: "In contrast, sales fell.", emoji: "↔️" },
      { term: "inevitably", phonetic: "ɪnˈevɪtəbli", meaning: "به ناچار /不可避免", example: "Change will inevitably come.", emoji: "⏳" },
      { term: "paradoxically", phonetic: "ˌpærəˈdɑːksɪkli", meaning: "پارادوکس‌وار", example: "Paradoxically, less is more.", emoji: "🌀" },
      { term: "nevertheless", phonetic: "ˌnevərðəˈles", meaning: "با این حال", example: "Nevertheless, we proceeded.", emoji: "🔄" },
      { term: "consequently", phonetic: "ˈkɑːnsɪkwentli", meaning: "در نتیجه", example: "Consequently, costs rose.", emoji: "➡️" },
      { term: "admittedly", phonetic: "ədˈmɪtɪdli", meaning: "البته / اعترافاً", example: "Admittedly, it's risky.", emoji: "🤝" },
      { term: "to summarize", phonetic: "tə ˈsʌməraɪz", meaning: "خلاصه اینکه", example: "To summarize, we agree.", emoji: "📋" },
    ],
    grammar: {
      rule: "Discourse markers: linking formal arguments",
      explanation:
        "پیوندهای منطقی، استدلال را ساختار می‌دهند: furthermore (افزودن)، in contrast (مقایسه)، consequently (نتیجه)، nevertheless (تضاد)، admittedly (امتیاز دادن). در سخنرانی و مناظره‌ی رسمی حیاتی‌اند.",
      examples: [
        "The plan is expensive; nevertheless, it is necessary.",
        "Furthermore, studies support this approach.",
        "Admittedly, the risks exist; consequently, we must prepare.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "برای «افزودن دلیل» کدام پیوند مناسب است؟", options: ["in contrast", "furthermore", "nevertheless", "to summarize"], correctIndex: 1, explain: "furthermore = علاوه بر این (افزودن)." },
      { id: "q2", kind: "multiple-choice", prompt: "«با این حال» برای بیان چه است؟", options: ["افزودن", "تضاد/مقاومت در برابر نتیجه", "نتیجه‌گیری", "مقایسه"], correctIndex: 1, explain: "nevertheless = با این حال (تضاد)." },
      { id: "q3", kind: "word-order", prompt: "بگو: در نتیجه، هزینه‌ها افزایش یافت.", words: ["Consequently", ",", "costs", "rose"], correctSentence: "Consequently, costs rose", explain: "consequently = در نتیجه." },
    ],
    practicePrompt: "Structure a formal debate argument using discourse markers with the AI.",
  },

  "b2-8-2": {
    lessonId: "b2-8-2",
    vocabulary: [
      { term: "What surprised me was...", phonetic: "wʌt sərˈpraɪzd", meaning: "چیزی که غافلگیرم کرد...", example: "What surprised me was the result.", emoji: "😲" },
      { term: "It was X that...", phonetic: "ɪt wɒz", meaning: "دقیقاً X بود که...", example: "It was the team that won.", emoji: "🎯" },
      { term: "All I need is...", phonetic: "ɔːl aɪ niːd", meaning: "تنها چیزی که لازم دارم...", example: "All I need is time.", emoji: "⏰" },
      { term: "emphasis", phonetic: "ˈemfəsɪs", meaning: "تأکید", example: "Cleft adds emphasis.", emoji: "❗" },
    ],
    grammar: {
      rule: "Cleft Sentences: What... was... / It was... that...",
      explanation:
        "جملات شکافته برای تأکید روی بخش خاصی از جمله: What surprised me was the price (قیمت غافلگیرم کرد نه چیز دیگر). It was the team that won (تیم بود که برد). ابزار اصلی سخنرانی تأثیرگذار.",
      examples: [
        "What I need is more time.",
        "It was Sarah who solved the problem.",
        "All I want is a fair chance.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام جمله شکافته درست است؟", options: ["What surprised me was the result.", "What surprised me the result was.", "What the result surprised me.", "Was surprised me the result."], correctIndex: 0, explain: "What + subject + verb + was + focus." },
      { id: "q2", kind: "word-order", prompt: "بگو: دقیقاً تیم بود که مشکل را حل کرد.", words: ["It", "was", "the", "team", "that", "solved", "the", "problem"], correctSentence: "It was the team that solved the problem", explain: "It was + X + that + بقیه جمله." },
      { id: "q3", kind: "multiple-choice", prompt: "جملات شکافته برای چه استفاده می‌شوند؟", options: ["سادگی", "تأکید روی بخش خاص", "سؤال کردن", "نفی"], correctIndex: 1, explain: "cleft sentences = ابزار تأکید." },
    ],
    practicePrompt: "Emphasize your key arguments in a debate using cleft sentences with the AI.",
  },
};
