import type { LessonContent } from "@/types";

/**
 * FULL senior-instructor content for the 16 non-roleplay C1 lessons.
 *
 * Compliance: Cambridge C1 Advanced / Oxford C1. No omissions.
 * 8 units × 3 lessons = 24 total. Lessons 1&2 of each unit are interactive;
 * lesson 3 is roleplay (no entry here — launches straight to AI chat).
 *
 * All grammar rules/examples render through isolated LTR containers in the
 * lesson UI (BidiText / dir="ltr"), and quizzes validate via normalizeText.
 */
export const C1_LESSON_CONTENT: Record<string, LessonContent> = {
  /* ===== Unit 1: Diplomacy, Hedging & Subjunctive ===== */
  "c1-1-1": {
    lessonId: "c1-1-1",
    vocabulary: [
      { term: "It is plausible that...", phonetic: "ˈplɔːzəbl", meaning: "محتمل است که...", example: "It is plausible that costs will rise.", emoji: "🤔" },
      { term: "arguably", phonetic: "ˈɑːrɡjuəbli", meaning: "به‌طور قابل دفاع / احتمالاً", example: "He is arguably the best candidate.", emoji: "⚖️" },
      { term: "tentative", phonetic: "ˈtentətɪv", meaning: "محتاطانه / آزمایشی", example: "We reached a tentative agreement.", emoji: "📝" },
      { term: "prudent", phonetic: "ˈpruːdnt", meaning: "محتاط / دوراندیش", example: "It would be prudent to wait.", emoji: "🛡️" },
      { term: "conceivably", phonetic: "kənˈsiːvəbli", meaning: "قابل تصور است که", example: "Conceivably, the deal may fail.", emoji: "💭" },
      { term: "to some extent", phonetic: "ɪkˈstent", meaning: "تا حدی", example: "To some extent, I agree.", emoji: "📏" },
      { term: "purportedly", phonetic: "pɜːrˈpɔːrtɪdli", meaning: "به ادعای / ظاهراً", example: "The report was purportedly leaked.", emoji: "❓" },
      { term: "mitigate", phonetic: "ˈmɪtɪɡeɪt", meaning: "کاهش دادن / تسکین", example: "We must mitigate the risks.", emoji: "🔻" },
    ],
    grammar: {
      rule: "Subjunctive: I recommend that he be... / It is imperative that she take...",
      explanation:
        "وجه التزامی رسمی بعد از افعال و صفاتی مثل recommend, insist, imperative, essential استفاده می‌شود و فعل به شکل پایه می‌آید (بدون s و بدون زمان): I recommend that he be present (نه is). در دیپلماسی و متون رسمی بسیار رایج است.",
      examples: [
        "I recommend that he be present at the meeting.",
        "It is imperative that she take immediate action.",
        "The board insisted that the report be revised.",
        "It is essential that everyone be informed.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام وجه التزامی درست است؟", options: ["I recommend that he is present.", "I recommend that he be present.", "I recommend that he am present.", "I recommend that he been present."], correctIndex: 1, explain: "وجه التزامی: فعل پایه بدون s — that he be." },
      { id: "q2", kind: "multiple-choice", prompt: "«ضروری است که او اقدام فوری کند» کدام است؟", options: ["It is imperative that she takes action.", "It is imperative that she take action.", "It is imperative that she taking action.", "It is imperative she took action."], correctIndex: 1, explain: "imperative that + فعل پایه (take)." },
      { id: "q3", kind: "word-order", prompt: "بگو: به‌طور قابل دفاع، او بهترین نامزد است.", words: ["He", "is", "arguably", "the", "best", "candidate"], correctSentence: "He is arguably the best candidate", explain: "arguably = به‌طور قابل دفاع." },
    ],
    practicePrompt: "Practice diplomatic hedging language with the AI mediator.",
  },

  "c1-1-2": {
    lessonId: "c1-1-2",
    vocabulary: [
      { term: "stipulate", phonetic: "ˈstɪpjuleɪt", meaning: "تصریح کردن (در قرارداد)", example: "The contract stipulates a deadline.", emoji: "📜" },
      { term: "concession", phonetic: "kənˈseʃn", meaning: "امتیاز دادن", example: "We made a small concession.", emoji: "🤝" },
      { term: "leverage", phonetic: "ˈlevərɪdʒ", meaning: "اهرم فشار / قدرت چانه‌زنی", example: "We lost our leverage.", emoji: "⚖️" },
      { term: "common ground", phonetic: "ˈkɑːmən ɡraʊnd", meaning: "نقطه اشتراک", example: "We found common ground.", emoji: "🟢" },
    ],
    grammar: {
      rule: "Subjunctive after demand/insist/suggest + that-clause",
      explanation:
        "بعد از demand, insist, suggest, propose, request در ساختار that، فعل پایه می‌آید: We demand that he resign. They suggested that the terms be revised. در مذاکرات دیپلماتیک ابزار اصلی بیان خواسته‌ی رسمی است.",
      examples: [
        "We demand that the terms be revised.",
        "They insisted that he step down.",
        "She proposed that both parties sign.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["We demand that he resigns.", "We demand that he resign.", "We demand that he to resign.", "We demand he resigning."], correctIndex: 1, explain: "demand that + فعل پایه (resign)." },
      { id: "q2", kind: "word-order", prompt: "بگو: پیشنهاد کردند که شرایط اصلاح شود.", words: ["They", "suggested", "that", "the", "terms", "be", "revised"], correctSentence: "They suggested that the terms be revised", explain: "suggest that + فعل پایه مجهول (be revised)." },
      { id: "q3", kind: "multiple-choice", prompt: "«نقطه اشتراک» در مذاکره چه نامیده می‌شود؟", options: ["concession", "common ground", "leverage", "stipulation"], correctIndex: 1, explain: "common ground = نقطه اشتراک." },
    ],
    practicePrompt: "Mediate a commercial dispute using diplomatic language with the AI.",
  },

  /* ===== Unit 2: Philosophy, Consciousness & AI Ethics ===== */
  "c1-2-1": {
    lessonId: "c1-2-1",
    vocabulary: [
      { term: "epistemology", phonetic: "ɪˌpɪstəˈmɑːlədʒi", meaning: "معرفت‌شناسی", example: "Epistemology studies knowledge.", emoji: "📚" },
      { term: "sentience", phonetic: "ˈsenʃəns", meaning: "خردمندی / احساس‌داری", example: "Does AI have sentience?", emoji: "🧠" },
      { term: "determinism", phonetic: "dɪˈtɜːrmɪnɪzəm", meaning: "جبرگرایی", example: "Determinism questions free will.", emoji: "⛓️" },
      { term: "paradigm shift", phonetic: "ˈpærədaɪm", meaning: "تحول بنیادین / تغییر پارادایم", example: "AI caused a paradigm shift.", emoji: "🔄" },
      { term: "consciousness", phonetic: "ˈkɑːnʃəsnəs", meaning: "آگاهی", example: "The nature of consciousness.", emoji: "💭" },
      { term: "autonomy", phonetic: "ɔːˈtɑːnəmi", meaning: "خودمختاری", example: "Autonomous weapons raise concerns.", emoji: "🤖" },
      { term: "moral agency", phonetic: "ˈmɔːrəl ˈeɪdʒənsi", meaning: "عاملیت اخلاقی", example: "Can AI have moral agency?", emoji: "⚖️" },
      { term: "existential risk", phonetic: "ˌeɡzɪˈstenʃl", meaning: "ریسک وجودی", example: "AI poses existential risks.", emoji: "⚠️" },
    ],
    grammar: {
      rule: "Inverted Conditionals: Had we anticipated... / Were it not for...",
      explanation:
        "شرطی‌های رسمی بدون if: Had we anticipated this (اگر این را پیش‌بینی کرده بودیم)، Were it not for funding (اگر سرمایه نبود). ساختاری ادبی و آکادمیک که در فلسفه و متون تحلیلی فراوان است.",
      examples: [
        "Had we anticipated this, we would have acted differently.",
        "Were it not for funding, the project would fail.",
        "Should the system become autonomous, we must intervene.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام شرطی وارونه درست است؟", options: ["Had we anticipated this, we would act.", "Had we anticipated this, we would have acted.", "Have we anticipated this, we acted.", "If had we anticipated, we act."], correctIndex: 1, explain: "Had + فاعل + p.p. → would have + p.p." },
      { id: "q2", kind: "multiple-choice", prompt: "«اگر سرمایه نبود» کدام است؟", options: ["Were it not for funding", "Was it not for funding", "Were not it for funding", "It were not for funding"], correctIndex: 0, explain: "Were it not for + اسم." },
      { id: "q3", kind: "multiple-choice", prompt: "«تحول بنیادین در تفکر» چه نامیده می‌شود؟", options: ["sentience", "paradigm shift", "determinism", "autonomy"], correctIndex: 1, explain: "paradigm shift = تغییر پارادایم." },
    ],
    practicePrompt: "Debate AI ethics using inverted conditionals with the AI researcher.",
  },

  "c1-2-2": {
    lessonId: "c1-2-2",
    vocabulary: [
      { term: "ethics", phonetic: "ˈeθɪks", meaning: "اخلاق (علم)", example: "AI ethics is a new field.", emoji: "⚖️" },
      { term: "dilemma", phonetic: "dɪˈlemə", meaning: "دوراهی / معمای اخلاقی", example: "The trolley dilemma.", emoji: "🔀" },
      { term: "algorithm", phonetic: "ˈælɡərɪðəm", meaning: "الگوریتم", example: "The algorithm is biased.", emoji: "💻" },
      { term: "unprecedented", phonetic: "ʌnˈpresɪdentɪd", meaning: "بی‌سابقه", example: "AI poses unprecedented challenges.", emoji: "🆕" },
    ],
    grammar: {
      rule: "Formal conditionals with should / were to / had",
      explanation:
        "سه سطح رسمیت شرطی: Should the system fail (رسمی)، Were the system to fail (رسمی‌تر)، Had the system failed (گذشته). این ساختارها در متون حقوقی و فلسفی درباره احتمالات استفاده می‌شوند.",
      examples: [
        "Should the system fail, we must intervene.",
        "Were the AI to become sentient, what rights would it have?",
        "Had we acted sooner, the risk would be lower.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["Should the system fail, we intervene.", "Should the system fails, we intervene.", "Should the system to fail, we intervene.", "Should fail the system, we intervene."], correctIndex: 0, explain: "Should + فاعل + فعل پایه." },
      { id: "q2", kind: "word-order", prompt: "بگو: اگر هوش مصنوعی خردمند شود، چه حقوقی خواهد داشت؟", words: ["Were", "the", "AI", "to", "become", "sentient", ",", "what", "rights", "would", "it", "have", "?"], correctSentence: "Were the AI to become sentient, what rights would it have?", explain: "Were + فاعل + to + فعل." },
      { id: "q3", kind: "multiple-choice", prompt: "«بی‌سابقه» کدام است؟", options: ["unprecedented", "unpredicted", "unimagined", "unmatched"], correctIndex: 0, explain: "unprecedented = بی‌سابقه." },
    ],
    practicePrompt: "Discuss AI dilemmas using formal conditionals with the AI philosopher.",
  },

  /* ===== Unit 3: Geopolitics & Climate Diplomacy ===== */
  "c1-3-1": {
    lessonId: "c1-3-1",
    vocabulary: [
      { term: "sovereignty", phonetic: "ˈsɑːvrənti", meaning: "حاکمیت", example: "National sovereignty matters.", emoji: "🏛️" },
      { term: "net-zero", phonetic: "net ˈzɪroʊ", meaning: "خالص صفر (آلایندگی)", example: "We committed to net-zero by 2050.", emoji: "🌱" },
      { term: "geopolitical leverage", phonetic: "ˌdʒiːoʊpəˈlɪtɪkl", meaning: "اهرم ژئوپلیتیک", example: "Energy gives geopolitical leverage.", emoji: "🌍" },
      { term: "multilateral", phonetic: "ˌmʌltiˈlætərəl", meaning: "چندجانبه", example: "Multilateral agreements.", emoji: "🤝" },
      { term: "sanctions", phonetic: "ˈsæŋkʃnz", meaning: "تحریم‌ها", example: "Sanctions were imposed.", emoji: "🚫" },
      { term: "emissions", phonetic: "ɪˈmɪʃnz", meaning: "انتشارات / آلایندگی", example: "Cutting emissions is vital.", emoji: "🏭" },
      { term: "treaty", phonetic: "ˈtriːti", meaning: "معاهده", example: "The Paris climate treaty.", emoji: "📜" },
      { term: "deterrence", phonetic: "dɪˈtɜːrəns", meaning: "بازدارندگی", example: "Nuclear deterrence.", emoji: "🛡️" },
    ],
    grammar: {
      rule: "Compound participles & formal discourse markers",
      explanation:
        "صفت‌های فاعلی مرکب (weather-beaten, policy-driven) و پیوندهای رسمی (notwithstanding, insofar as) متن دیپلماتیک را فشرده و رسمی می‌کنند: Notwithstanding the objections, the treaty was signed.",
      examples: [
        "Notwithstanding the objections, the treaty was signed.",
        "Insofar as emissions fall, targets will be met.",
        "The policy-driven approach succeeded.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«با وجود اعتراضات» کدام پیوند رسمی است؟", options: ["Despite of", "Notwithstanding", "Although that", "Even"], correctIndex: 1, explain: "Notwithstanding + اسم (رسمی)." },
      { id: "q2", kind: "multiple-choice", prompt: "«تا جایی که» در متون رسمی کدام است؟", options: ["as far as", "insofar as", "so long", "up to"], correctIndex: 1, explain: "insofar as = تا جایی که (رسمی)." },
      { id: "q3", kind: "multiple-choice", prompt: "«تعهد خالص صفر» در حوزه اقلیم چیست؟", options: ["sovereignty", "net-zero", "sanctions", "deterrence"], correctIndex: 1, explain: "net-zero = خالص صفر." },
    ],
    practicePrompt: "Deliver a diplomatic speech on climate using formal discourse markers.",
  },

  "c1-3-2": {
    lessonId: "c1-3-2",
    vocabulary: [
      { term: "consequently", phonetic: "ˈkɑːnsɪkwentli", meaning: "در نتیجه", example: "Consequently, talks collapsed.", emoji: "➡️" },
      { term: "nonetheless", phonetic: "ˌnʌnðəˈles", meaning: "با این حال", example: "Nonetheless, we proceed.", emoji: "🔄" },
      { term: "whereby", phonetic: "werˈbaɪ", meaning: "که به وسیله آن", example: "A system whereby nations comply.", emoji: "🔗" },
      { term: "henceforth", phonetic: "ˌhensˈfɔːrθ", meaning: "از این پس", example: "Henceforth, sanctions apply.", emoji: "📅" },
    ],
    grammar: {
      rule: "Formal connectors in diplomatic discourse",
      explanation:
        "پیوندهای سطح بالا متن رسمی را می‌سازند: consequently (نتیجه)، nonetheless (تضاد)، whereby (رابطه ابزاری)، henceforth (زمان). در اسناد بین‌المللی و بیانیه‌ها ضروری‌اند.",
      examples: [
        "Consequently, the summit was postponed.",
        "Nonetheless, dialogue must continue.",
        "A mechanism whereby disputes are resolved peacefully.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«از این پس» کدام است؟", options: ["henceforth", "whereby", "nonetheless", "consequently"], correctIndex: 0, explain: "henceforth = از این پس." },
      { id: "q2", kind: "word-order", prompt: "بگو: در نتیجه، اجلاس به تعویق افتاد.", words: ["Consequently", ",", "the", "summit", "was", "postponed"], correctSentence: "Consequently, the summit was postponed", explain: "consequently + جمله." },
      { id: "q3", kind: "multiple-choice", prompt: "«که به وسیله آن» کدام رابطه را بیان می‌کند؟", options: ["زمان", "ابزار/روش", "تضاد", "نتیجه"], correctIndex: 1, explain: "whereby = که به وسیله آن (ابزار)." },
    ],
    practicePrompt: "Draft UN resolution clauses using formal connectors with the AI diplomat.",
  },

  /* ===== Unit 4: Macroeconomics & FinTech ===== */
  "c1-4-1": {
    lessonId: "c1-4-1",
    vocabulary: [
      { term: "liquidity", phonetic: "lɪˈkwɪdəti", meaning: "نقدشوندگی", example: "The market lacks liquidity.", emoji: "💧" },
      { term: "systemic risk", phonetic: "sɪˈstemɪk", meaning: "ریسک سیستمی", example: "Banks pose systemic risk.", emoji: "⚠️" },
      { term: "fiscal stimulus", phonetic: "ˈfɪskl ˈstɪmjələs", meaning: "محرك مالی", example: "The government announced fiscal stimulus.", emoji: "💸" },
      { term: "quantitative easing", phonetic: "ˈkwɑːntɪteɪtɪv", meaning: "تسهیل كمّی", example: "QE inflated asset prices.", emoji: "📈" },
      { term: "blockchain", phonetic: "ˈblɑːktʃeɪn", meaning: "زنجیره بلوک", example: "Blockchain decentralizes trust.", emoji: "⛓️" },
      { term: "volatility", phonetic: "ˌvɑːləˈtɪləti", meaning: "نوسان‌پذیری", example: "Crypto volatility is extreme.", emoji: "📊" },
      { term: "default", phonetic: "dɪˈfɔːlt", meaning: "نکول / عدم پرداخت", example: "The country defaulted on debt.", emoji: "🔻" },
      { term: "bubble", phonetic: "ˈbʌbl", meaning: "حباب اقتصادی", example: "The housing bubble burst.", emoji: "🫧" },
    ],
    grammar: {
      rule: "Fronting & Negative Inversion: Under no circumstances will we...",
      explanation:
        "جابه‌جایی تأکیدی: وقتی عبارت منفی اول جمله بیاید، وارونگی رخ می‌دهد: Under no circumstances will we accept (نه we will). در بیانیه‌های رسمی مالی و حقوقی ابزار تأکید اصلی است.",
      examples: [
        "Under no circumstances will we accept these terms.",
        "Not until the audit is complete will funds be released.",
        "At no point did the bank mislead investors.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام وارونگی درست است؟", options: ["Under no circumstances we will accept.", "Under no circumstances will we accept.", "Under no circumstances we accept will.", "Under no circumstances accepted we will."], correctIndex: 1, explain: "عبارت منفی اول + will + فاعل." },
      { id: "q2", kind: "word-order", prompt: "بگو: هرگز بانک سرمایه‌گذاران را گمراه نکرد.", words: ["At", "no", "point", "did", "the", "bank", "mislead", "investors"], correctSentence: "At no point did the bank mislead investors", explain: "At no point + did + فاعل + فعل." },
      { id: "q3", kind: "multiple-choice", prompt: "«ریسک کل سیستم مالی» چه نامیده می‌شود؟", options: ["liquidity", "systemic risk", "volatility", "default"], correctIndex: 1, explain: "systemic risk = ریسک سیستمی." },
    ],
    practicePrompt: "Present a risk strategy using negative inversion to the AI board.",
  },

  "c1-4-2": {
    lessonId: "c1-4-2",
    vocabulary: [
      { term: "portfolio", phonetic: "pɔːrtˈfoʊlioʊ", meaning: "سبد سرمایه", example: "Diversify the portfolio.", emoji: "💼" },
      { term: "hedging", phonetic: "ˈhedʒɪŋ", meaning: "پوشش ریسک", example: "Hedging reduces exposure.", emoji: "🛡️" },
      { term: "exposure", phonetic: "ɪkˈspoʊʒər", meaning: "میزان در معرض ریسک بودن", example: "Our exposure is limited.", emoji: "🎯" },
      { term: "due diligence", phonetic: "duː ˈdɪlɪdʒəns", meaning: "بررسی و تحقیق لازم", example: "We performed due diligence.", emoji: "🔍" },
    ],
    grammar: {
      rule: "Fronting for emphasis: What concerns me is... / So severe was the crisis...",
      explanation:
        "جابه‌جایی برای تأکید در ارائه‌های مالی: What concerns me is liquidity (آنچه مرا نگران می‌کند نقدشوندگی است). So severe was the crisis that markets froze (بحران چنان شدید بود که...).",
      examples: [
        "What concerns me most is liquidity.",
        "So severe was the crisis that markets froze.",
        "Such was the demand that prices doubled.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["So severe was the crisis that markets froze.", "So severe the crisis was that markets froze.", "So was severe the crisis that markets froze.", "So severe was the crisis markets froze."], correctIndex: 0, explain: "So + صفت + was + فاعل + that." },
      { id: "q2", kind: "multiple-choice", prompt: "«بررسی و تحقیق لازم قبل از معامله» چه نامیده می‌شود؟", options: ["hedging", "exposure", "due diligence", "portfolio"], correctIndex: 2, explain: "due diligence = بررسی لازم." },
      { id: "q3", kind: "word-order", prompt: "بگو: آنچه بیشتر مرا نگران می‌کند نقدشوندگی است.", words: ["What", "concerns", "me", "most", "is", "liquidity"], correctSentence: "What concerns me most is liquidity", explain: "cleft برای تأکید." },
    ],
    practicePrompt: "Present to the investment board using fronted emphatic structures.",
  },

  /* ===== Unit 5: Neuroscience & Behavioral Cognition ===== */
  "c1-5-1": {
    lessonId: "c1-5-1",
    vocabulary: [
      { term: "cognitive dissonance", phonetic: "ˈkɑːɡnətɪv ˈdɪsənəns", meaning: "ناهماهنگی شناختی", example: "Cognitive dissonance causes discomfort.", emoji: "🌀" },
      { term: "neuroplasticity", phonetic: "ˌnʊroʊplæˈstɪsəti", meaning: "عصب‌پلاستیسیته", example: "Neuroplasticity enables learning.", emoji: "🧠" },
      { term: "bias", phonetic: "ˈbaɪəs", meaning: "سوگیری", example: "Confirmation bias skews judgment.", emoji: "⚖️" },
      { term: "resilience", phonetic: "rɪˈzɪliəns", meaning: "تاب‌آوری", example: "Resilience can be trained.", emoji: "🌱" },
      { term: "dopamine", phonetic: "ˈdoʊpəmiːn", meaning: "دوپامین", example: "Dopamine drives reward.", emoji: "⚡" },
      { term: "cortex", phonetic: "ˈkɔːrteks", meaning: "قشر مغز", example: "The prefrontal cortex.", emoji: "🧩" },
      { term: "trigger", phonetic: "ˈtrɪɡər", meaning: "محرك / فعال‌کننده", example: "Stress triggers responses.", emoji: "🔔" },
      { term: "habit loop", phonetic: "ˈhæbɪt luːp", meaning: "چرخه عادت", example: "The habit loop: cue-routine-reward.", emoji: "🔁" },
    ],
    grammar: {
      rule: "Complex Impersonal Passives: It is widely purported that... / There is believed to be...",
      explanation:
        "مجهول غیرشخصی آکادمیک برای انتقال ادعای علمی بدون ذکر عامل: It is widely purported that (به‌طور گسترده ادعا می‌شود)، There is believed to be (باور بر وجود ... است). در مقالات نوروساینس فراوان است.",
      examples: [
        "It is widely purported that neuroplasticity declines with age.",
        "There is believed to be a link between dopamine and habit.",
        "It has been demonstrated that bias affects decisions.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام مجهول آکادمیک درست است؟", options: ["It widely is purported that...", "It is widely purported that...", "It is purported widely that... is", "Widely it purported that..."], correctIndex: 1, explain: "It + is + قید + p.p. + that." },
      { id: "q2", kind: "multiple-choice", prompt: "«باور بر وجود ارتباطی است» کدام است؟", options: ["There is believed to be a link.", "There believes a link.", "It is believed a link is.", "There is believing a link."], correctIndex: 0, explain: "There is believed to be + اسم." },
      { id: "q3", kind: "multiple-choice", prompt: "«ناهماهنگی شناختی» کدام است؟", options: ["neuroplasticity", "cognitive dissonance", "habit loop", "dopamine"], correctIndex: 1, explain: "cognitive dissonance = ناهماهنگی شناختی." },
    ],
    practicePrompt: "Analyze a psychology case using academic passives with the AI neuroscientist.",
  },

  "c1-5-2": {
    lessonId: "c1-5-2",
    vocabulary: [
      { term: "empirical", phonetic: "ɪmˈpɪrɪkl", meaning: "تجربی / مبتنی بر مشاهده", example: "Empirical evidence supports it.", emoji: "🔬" },
      { term: "correlation", phonetic: "ˌkɔːrəˈleɪʃn", meaning: "همبستگی", example: "Correlation isn't causation.", emoji: "📉" },
      { term: "placebo effect", phonetic: "pləˈsiːboʊ", meaning: "اثر دارونما", example: "The placebo effect is strong.", emoji: "💊" },
      { term: "longitudinal", phonetic: "ˌlɔːndʒəˈtuːdɪnl", meaning: "درازمدت (مطالعه)", example: "A longitudinal study.", emoji: "📏" },
    ],
    grammar: {
      rule: "Academic hedging + passive: The data suggest... / Findings are interpreted as...",
      explanation:
        "در نگارش علمی از مجهول و تعدیل کلام استفاده می‌شود: The data suggest (نه proves)، findings are interpreted as (یافته‌ها چنین تفسیر می‌شوند). این ظرافت، ادعای علمی را دقیق می‌کند.",
      examples: [
        "The data suggest a strong correlation.",
        "Findings are interpreted as evidence of neuroplasticity.",
        "It could be argued that the sample was biased.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام بیان علمی محتاطانه است؟", options: ["The data proves it.", "The data suggest a correlation.", "It is definitely true.", "Science confirms 100%."], correctIndex: 1, explain: "suggest (نه prove) = تعدیل علمی." },
      { id: "q2", kind: "multiple-choice", prompt: "«همبستگی علیت نیست» چه اصطلاحی را یادآور می‌شود؟", options: ["placebo", "correlation vs causation", "longitudinal", "empirical"], correctIndex: 1, explain: "correlation ≠ causation." },
      { id: "q3", kind: "word-order", prompt: "بگو: یافته‌ها به‌عنوان مدرک تفسیر می‌شوند.", words: ["Findings", "are", "interpreted", "as", "evidence"], correctSentence: "Findings are interpreted as evidence", explain: "are interpreted as = تفسیر می‌شوند به‌عنوان." },
    ],
    practicePrompt: "Interpret study results with academic hedging alongside the AI expert.",
  },

  /* ===== Unit 6: Literary Devices, Irony & Nuance ===== */
  "c1-6-1": {
    lessonId: "c1-6-1",
    vocabulary: [
      { term: "double entendre", phonetic: "ˌduːbl ɑːnˈtɑːndrə", meaning: "دوپهلو (جمله)", example: "A witty double entendre.", emoji: "🎭" },
      { term: "metaphorical", phonetic: "ˌmetəˈfɔːrɪkl", meaning: "استعاری", example: "A metaphorical journey.", emoji: "🌌" },
      { term: "satirical", phonetic: "səˈtɪrɪkl", meaning: "طنزآمیز / هجوی", example: "A satirical novel.", emoji: "😏" },
      { term: "nuance", phonetic: "ˈnjuːɑːns", meaning: "ظرافت / تفاوت جزئی", example: "The nuance of his irony.", emoji: "🎚️" },
      { term: "irony", phonetic: "ˈaɪrəni", meaning: "کنایه / تضن", example: "The irony is striking.", emoji: "🙃" },
      { term: "allegory", phonetic: "ˈæləɡɔːri", meaning: "تمثیل", example: "The novel is an allegory.", emoji: "📖" },
      { term: "juxtaposition", phonetic: "ˌdʒʌkstəpəˈzɪʃn", meaning: "هم‌نهی / قرینه‌سازی", example: "The juxtaposition of styles.", emoji: "🔀" },
      { term: "ambiguity", phonetic: "ˌæmbɪˈɡjuːəti", meaning: "ابهام", example: "Deliberate ambiguity.", emoji: "❓" },
    ],
    grammar: {
      rule: "Nominalization: the rapid deterioration of... / the implementation of...",
      explanation:
        "اسمی‌سازی فعل/صفت را به اسم تبدیل می‌کند و متن را فشرده و آکادمیک می‌سازد: deteriorate → the deterioration of (تضعیفِ)، implement → the implementation of (اجراىِ). ابزار اصلی نقد ادبی و نگارش سطح بالا.",
      examples: [
        "The rapid deterioration of the protagonist mirrors society.",
        "The author's deliberate ambiguity invites interpretation.",
        "The juxtaposition of tones creates irony.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "اسمی‌شده‌ی «deteriorate» کدام است؟", options: ["deteriorative", "deterioration", "deteriorating", "deteriorated"], correctIndex: 1, explain: "the deterioration of = تضعیفِ." },
      { id: "q2", kind: "multiple-choice", prompt: "«قرینه‌سازی دو سبک برای ایجاد تضاد» چه نامیده می‌شود؟", options: ["allegory", "juxtaposition", "irony", "nuance"], correctIndex: 1, explain: "juxtaposition = هم‌نهی." },
      { id: "q3", kind: "word-order", prompt: "بگو: ابهام عمدی نویسنده تفسیر را دعوت می‌کند.", words: ["The", "author's", "deliberate", "ambiguity", "invites", "interpretation"], correctSentence: "The author's deliberate ambiguity invites interpretation", explain: "اسم‌سازی + فعل مفرد." },
    ],
    practicePrompt: "Critique a novel using nominalization with the AI literary critic.",
  },

  "c1-6-2": {
    lessonId: "c1-6-2",
    vocabulary: [
      { term: "compelling", phonetic: "kəmˈpelɪŋ", meaning: "گیرا / قانع‌کننده", example: "A compelling narrative.", emoji: "⭐" },
      { term: "understated", phonetic: "ˌʌndərˈsteɪtɪd", meaning: "کم‌گوی / ظریف", example: "Her understated prose.", emoji: "🌸" },
      { term: "evocative", phonetic: "ɪˈvɑːkətɪv", meaning: "برانگیزاننده (احساس)", example: "Evocative imagery.", emoji: "🎨" },
      { term: "layered", phonetic: "ˈleɪərd", meaning: "لایه‌لایه / چندلایه", example: "A layered metaphor.", emoji: "🧅" },
    ],
    grammar: {
      rule: "Reduced relative + participle: The novel (which was) hailed as...",
      explanation:
        "کوتاه‌سازی نسبی در نقد ادبی: The novel hailed as a masterpiece (رمانی که شاهکار خوانده شد). این ساختار متن نقد را فشرده و حرفه‌ای می‌کند.",
      examples: [
        "The novel hailed as a masterpiece disappointed critics.",
        "The imagery evoking childhood is central.",
        "A story layered with meaning.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام کوتاه‌سازی درست است؟", options: ["The novel hailed as a masterpiece", "The novel which hailed as", "The novel hailing as a masterpiece", "The novel was hailed as"], correctIndex: 0, explain: "which was hailed → hailed." },
      { id: "q2", kind: "multiple-choice", prompt: "«نثر کم‌گوی و ظریف» کدام صفت است؟", options: ["compelling", "understated", "evocative", "layered"], correctIndex: 1, explain: "understated = کم‌گوی." },
      { id: "q3", kind: "word-order", prompt: "بگو: تصویرسازی برانگیزاننده‌ی کودکی محوری است.", words: ["The", "imagery", "evoking", "childhood", "is", "central"], correctSentence: "The imagery evoking childhood is central", explain: "evoking = کوتاه‌شده‌ی which evokes." },
    ],
    practicePrompt: "Analyze literary devices in a contemporary work with the AI critic.",
  },

  /* ===== Unit 7: Sustainable Urbanism & Futurism ===== */
  "c1-7-1": {
    lessonId: "c1-7-1",
    vocabulary: [
      { term: "biophilic", phonetic: "ˌbaɪoʊˈfɪlɪk", meaning: "دوستدار طبیعت (طراحی)", example: "Biophilic design reduces stress.", emoji: "🌿" },
      { term: "urban sprawl", phonetic: "ˈɜːrbən sprɔːl", meaning: "گسترش بی‌رویه شهری", example: "Urban sprawl consumes farmland.", emoji: "🏙️" },
      { term: "carbon footprint", phonetic: "ˈkɑːrbən ˈfʊtprɪnt", meaning: "ردپای کربن", example: "Cut your carbon footprint.", emoji: "👣" },
      { term: "infrastructure", phonetic: "ˈɪnfrəstrʌktʃər", meaning: "زیرساخت", example: "Aging infrastructure.", emoji: "🏗️" },
      { term: "renewable", phonetic: "rɪˈnuːəbl", meaning: "تجدیدپذیر", example: "Renewable energy sources.", emoji: "☀️" },
      { term: "resilient city", phonetic: "rɪˈzɪliənt", meaning: "شهر تاب‌آور", example: "A resilient city adapts.", emoji: "🌆" },
      { term: "green retrofit", phonetic: "riːtroʊˈfɪt", meaning: "بهسازی سبز", example: "A green retrofit of old buildings.", emoji: "🔧" },
      { term: "smart grid", phonetic: "smɑːrt ɡrɪd", meaning: "شبکه هوشمند", example: "Smart grids balance load.", emoji: "⚡" },
    ],
    grammar: {
      rule: "Reduced Adverbial Clauses: When evaluating the proposal... / While designing the park...",
      explanation:
        "بندهای قیدی پیراسته‌شده: When evaluating the proposal (هنگام ارزیابی پیشنهاد) به‌جای When we evaluate. فاعل حذف می‌شود وقتی با فاعل جمله اصلی یکی است. در معماری و شهرسازی رسمی بسیار استفاده می‌شود.",
      examples: [
        "When evaluating the proposal, consider the carbon footprint.",
        "While designing the park, architects used biophilic principles.",
        "If adopted, the plan will reduce sprawl.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام بند قیدی پیراسته درست است؟", options: ["When evaluating the proposal, consider it.", "When we evaluating the proposal, consider it.", "When evaluate the proposal, consider it.", "When evaluated the proposal, consider it."], correctIndex: 0, explain: "When + verb-ing (فاعل حذف شده)." },
      { id: "q2", kind: "multiple-choice", prompt: "«طراحی که طبیعت را وارد فضا می‌کند» چه نامیده می‌شود؟", options: ["urban sprawl", "biophilic", "smart grid", "retrofit"], correctIndex: 1, explain: "biophilic = دوستدار طبیعت." },
      { id: "q3", kind: "word-order", prompt: "بگو: اگر تصویب شود، طرح گسترش بی‌رویه را کم می‌کند.", words: ["If", "adopted", ",", "the", "plan", "will", "reduce", "sprawl"], correctSentence: "If adopted, the plan will reduce sprawl", explain: "If + p.p. (پیراسته مجهول)." },
    ],
    practicePrompt: "Defend a smart-city project using reduced clauses at the city council.",
  },

  "c1-7-2": {
    lessonId: "c1-7-2",
    vocabulary: [
      { term: "sustainable", phonetic: "səˈsteɪnəbl", meaning: "پایدار", example: "Sustainable development.", emoji: "♻️" },
      { term: "mitigation", phonetic: "ˌmɪtɪˈɡeɪʃn", meaning: "کاهش اثرات زیان‌بار", example: "Climate mitigation strategies.", emoji: "🔻" },
      { term: "adaptation", phonetic: "ˌædæpˈteɪʃn", meaning: "سازگاری", example: "Adaptation to rising seas.", emoji: "🌊" },
      { term: "ecosystem", phonetic: "ˈiːkoʊsɪstəm", meaning: "اکوسیستم", example: "A healthy ecosystem.", emoji: "🌳" },
    ],
    grammar: {
      rule: "Concessive + reduced: Although controversial, the plan... / Despite being costly...",
      explanation:
        "ساختارهای اعطایی فشرده: Although controversial (با بحث‌برانگیز بودن)، Despite being costly (با گران بودن). برای شناسایی اعتراض احتمالی و پاسخ به آن در ارائه‌های شهری.",
      examples: [
        "Although controversial, the plan passed.",
        "Despite being costly, retrofits pay off.",
        "While promising, the technology is untested.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "کدام درست است؟", options: ["Although controversial, the plan passed.", "Although controversy, the plan passed.", "Although is controversial, the plan passed.", "Although been controversial, passed."], correctIndex: 0, explain: "Although + صفت (پیراسته)." },
      { id: "q2", kind: "multiple-choice", prompt: "«با گران بودن، به صرفه است» کدام است؟", options: ["Despite costly, it pays off.", "Despite being costly, it pays off.", "Despite of cost, it pays.", "Despite to be costly, pays."], correctIndex: 1, explain: "Despite + being + صفت." },
      { id: "q3", kind: "multiple-choice", prompt: "«کاهش اثرات زیان‌بار اقلیمی» کدام است؟", options: ["adaptation", "mitigation", "ecosystem", "retrofit"], correctIndex: 1, explain: "mitigation = کاهش اثرات." },
    ],
    practicePrompt: "Present sustainability arguments using concessive structures.",
  },

  /* ===== Unit 8: Scholarly Discourse & Defense ===== */
  "c1-8-1": {
    lessonId: "c1-8-1",
    vocabulary: [
      { term: "empirical", phonetic: "ɪmˈpɪrɪkl", meaning: "تجربی", example: "Empirical methods.", emoji: "🔬" },
      { term: "methodology", phonetic: "ˌmeθəˈdɑːlədʒi", meaning: "روش‌شناسی", example: "A robust methodology.", emoji: "🧪" },
      { term: "discrepancy", phonetic: "dɪsˈkrepənsi", meaning: "مغایرت / ناهمخوانی", example: "A discrepancy in the data.", emoji: "⚠️" },
      { term: "hypothesis", phonetic: "haɪˈpɑːθəsɪs", meaning: "فرضیه", example: "The hypothesis was confirmed.", emoji: "💡" },
      { term: "peer review", phonetic: "pɪr rɪˈvjuː", meaning: "داوری تخصصی", example: "The paper passed peer review.", emoji: "👥" },
      { term: "validity", phonetic: "vəˈlɪdəti", meaning: "روایی", example: "Threats to validity.", emoji: "✅" },
      { term: "sample size", phonetic: "ˈsæmpl saɪz", meaning: "حجم نمونه", example: "The sample size was small.", emoji: "📊" },
      { term: "replicate", phonetic: "ˈreplɪkeɪt", meaning: "تکرار کردن (آزمایش)", example: "The study was replicated.", emoji: "🔁" },
    ],
    grammar: {
      rule: "High-level causal connectors: Notwithstanding / Inasmuch as / Hitherto",
      explanation:
        "پیوندهای علّی و منطقی سطح بالا در نگارش آکادمیک: Notwithstanding the limitations (با وجود محدودیت‌ها)، Inasmuch as the data permit (به آن میزان که داده‌ها اجازه می‌دهند)، Hitherto (تاکنون). در دفاعیه لازم‌اند.",
      examples: [
        "Notwithstanding the limitations, the findings are significant.",
        "Inasmuch as the data permit, we generalize cautiously.",
        "Hitherto, this phenomenon remained unexplained.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«تاکنون» کدام واژه رسمی است؟", options: ["hitherto", "heretofore", "until now", "all of these"], correctIndex: 3, explain: "هر سه درست‌اند اما hitherto رایج‌ترین در آکادمیاست." },
      { id: "q2", kind: "multiple-choice", prompt: "«به آن میزان که داده‌ها اجازه می‌دهند» کدام است؟", options: ["Insofar as the data permit", "As much the data permit", "So far as data permitting", "Inasmuch as the data permit"], correctIndex: 3, explain: "Inasmuch as = به آن میزان که (رسمی)." },
      { id: "q3", kind: "word-order", prompt: "بگو: با وجود محدودیت‌ها، یافته‌ها قابل توجه‌اند.", words: ["Notwithstanding", "the", "limitations", ",", "the", "findings", "are", "significant"], correctSentence: "Notwithstanding the limitations, the findings are significant", explain: "Notwithstanding + اسم." },
    ],
    practicePrompt: "Defend a research proposal using high-level connectors with the AI committee.",
  },

  "c1-8-2": {
    lessonId: "c1-8-2",
    vocabulary: [
      { term: "cite", phonetic: "saɪt", meaning: "استناد کردن", example: "Cite your sources.", emoji: "📑" },
      { term: "rebut", phonetic: "rɪˈbʌt", meaning: "رد کردن (استدلال)", example: "She rebutted the criticism.", emoji: "🛡️" },
      { term: "concede", phonetic: "kənˈsiːd", meaning: "پذیرفتن (نکته مقابل)", example: "I concede the point.", emoji: "🤝" },
      { term: "substantiate", phonetic: "səbˈstænʃieɪt", meaning: "مستند کردن / اثبات", example: "Substantiate your claims.", emoji: "🔨" },
    ],
    grammar: {
      rule: "Argumentative structures: While I concede X, Y outweighs it",
      explanation:
        "ساختار دفاعیه: امتیاز دادن + رد: While I concede the sample was small (با وجود پذیرش کوچکی نمونه)، the effect size substantiates the hypothesis (اندازه اثر فرضیه را مستند می‌کند). این چارچوب، استدلال را متوازن و متقاعدکننده می‌کند.",
      examples: [
        "While I concede the limitations, the findings are robust.",
        "Although the criticism is valid, it can be rebutted with new data.",
        "Notwithstanding your point, the evidence substantiates our claim.",
      ],
    },
    quiz: [
      { id: "q1", kind: "multiple-choice", prompt: "«با وجود پذیرش نکته شما...» کدام ساختار است؟", options: ["While I concede your point...", "While I concede to your point is...", "While conceding I your point...", "While I your point concede..."], correctIndex: 0, explain: "concede + مفعول." },
      { id: "q2", kind: "multiple-choice", prompt: "«مستند کردن ادعا» کدام فعل است؟", options: ["rebut", "concede", "substantiate", "cite"], correctIndex: 2, explain: "substantiate = مستند/مثبت کردن." },
      { id: "q3", kind: "word-order", prompt: "بگو: اگرچه نقد درست است، با داده‌های جدید قابل رد است.", words: ["Although", "the", "criticism", "is", "valid", ",", "it", "can", "be", "rebutted"], correctSentence: "Although the criticism is valid, it can be rebutted", explain: "امتیاز + رد با مجهول." },
    ],
    practicePrompt: "Defend your thesis against committee questions using argumentative structures.",
  },
};
