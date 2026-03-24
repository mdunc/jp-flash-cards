/**
 * Quiz Data for Japanese Flash Cards
 *
 * To add a new category, copy the template below and fill in your questions:
 *
 * {
 *   id: "unique-id",
 *   name: "日本語カテゴリ名",
 *   nameEn: "English Category Name",
 *   icon: "🎌",
 *   color: "#6366f1",           // Accent color for this category
 *   questions: [
 *     {
 *       prompt: "漢字",                        // What the student sees
 *       hint: "English meaning",               // Optional hint shown below prompt
 *       answers: ["ひらがな", "romaji"],        // All accepted answers
 *     },
 *   ]
 * }
 *
 * Answer matching is case-insensitive and ignores extra whitespace.
 * Include hiragana AND romaji forms so students can answer in either.
 */

const QUIZ_DATA = [
  {
    id: "months",
    name: "つき（月）れんしゅう",
    nameEn: "Months",
    icon: "🌸",
    color: "#e05c8a",
    questions: [
      { prompt: "一月", hint: "January",   answers: ["いちがつ", "ichigatsu"] },
      { prompt: "二月", hint: "February",  answers: ["にがつ", "nigatsu"] },
      { prompt: "三月", hint: "March",     answers: ["さんがつ", "sangatsu"] },
      { prompt: "四月", hint: "April",     answers: ["しがつ", "shigatsu"] },
      { prompt: "五月", hint: "May",       answers: ["ごがつ", "gogatsu"] },
      { prompt: "六月", hint: "June",      answers: ["ろくがつ", "rokugatsu"] },
      { prompt: "七月", hint: "July",      answers: ["しちがつ", "shichigatsu"] },
      { prompt: "八月", hint: "August",    answers: ["はちがつ", "hachigatsu"] },
      { prompt: "九月", hint: "September", answers: ["くがつ", "kugatsu"] },
      { prompt: "十月", hint: "October",   answers: ["じゅうがつ", "juugatsu", "jūgatsu"] },
    ]
  },
  {
    id: "counters-tsu",
    name: "〜つ（かず）れんしゅう",
    nameEn: "Counting (~つ)",
    icon: "🍎",
    color: "#f59e0b",
    questions: [
      { prompt: "一つ", hint: "1 thing",    answers: ["ひとつ", "hitotsu"] },
      { prompt: "二つ", hint: "2 things",   answers: ["ふたつ", "futatsu"] },
      { prompt: "三つ", hint: "3 things",   answers: ["みっつ", "mittsu"] },
      { prompt: "四つ", hint: "4 things",   answers: ["よっつ", "yottsu"] },
      { prompt: "五つ", hint: "5 things",   answers: ["いつつ", "itsutsu"] },
      { prompt: "六つ", hint: "6 things",   answers: ["むっつ", "muttsu"] },
      { prompt: "七つ", hint: "7 things",   answers: ["ななつ", "nanatsu"] },
      { prompt: "八つ", hint: "8 things",   answers: ["やっつ", "yattsu"] },
      { prompt: "九つ", hint: "9 things",   answers: ["ここのつ", "kokonotsu"] },
      { prompt: "十",   hint: "10 things",  answers: ["とお", "too", "tō"] },
    ]
  },
  {
    id: "days",
    name: "日（にち）れんしゅう",
    nameEn: "Days of the Month",
    icon: "🌻",
    color: "#10b981",
    questions: [
      { prompt: "一日", hint: "1st",  answers: ["ついたち", "tsuitachi"] },
      { prompt: "二日", hint: "2nd",  answers: ["ふつか", "futsuka"] },
      { prompt: "三日", hint: "3rd",  answers: ["みっか", "mikka"] },
      { prompt: "四日", hint: "4th",  answers: ["よっか", "yokka"] },
      { prompt: "五日", hint: "5th",  answers: ["いつか", "itsuka"] },
      { prompt: "六日", hint: "6th",  answers: ["むいか", "muika"] },
      { prompt: "七日", hint: "7th",  answers: ["なのか", "nanoka"] },
      { prompt: "八日", hint: "8th",  answers: ["ようか", "youka", "yōka"] },
      { prompt: "九日", hint: "9th",  answers: ["ここのか", "kokonoka"] },
      { prompt: "十日", hint: "10th", answers: ["とおか", "tooka", "tōka"] },
    ]
  },
  {
    id: "counters-ko",
    name: "〜こ れんしゅう",
    nameEn: "Counting (~こ)",
    icon: "🍭",
    color: "#8b5cf6",
    questions: [
      { prompt: "一こ", hint: "1 piece",   answers: ["いっこ", "ikko"] },
      { prompt: "二こ", hint: "2 pieces",  answers: ["にこ", "niko"] },
      { prompt: "三こ", hint: "3 pieces",  answers: ["さんこ", "sanko"] },
      { prompt: "四こ", hint: "4 pieces",  answers: ["よんこ", "yonko"] },
      { prompt: "五こ", hint: "5 pieces",  answers: ["ごこ", "goko"] },
      { prompt: "六こ", hint: "6 pieces",  answers: ["ろっこ", "rokko"] },
      { prompt: "七こ", hint: "7 pieces",  answers: ["ななこ", "nanako"] },
      { prompt: "八こ", hint: "8 pieces",  answers: ["はっこ", "hakko"] },
      { prompt: "九こ", hint: "9 pieces",  answers: ["きゅうこ", "kyuuko", "kyūko"] },
      { prompt: "十こ", hint: "10 pieces", answers: ["じゅっこ", "jukko", "じっこ", "jikko"] },
    ]
  },
];
