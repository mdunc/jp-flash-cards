# Japanese Flash Cards

A lightweight quiz app for studying Japanese kanji readings and counters. No build step, no dependencies — just open `index.html` in a browser.

## Features

- Quiz categories for months, counters, days of the month, and more
- Accepts answers in hiragana or romaji
- Per-question English hints (hidden by default)
- Shuffled question order each attempt
- Score ring and full results breakdown at the end
- Dark/light theme (follows system preference, with manual toggle)
- Works offline via `file://` or hosted on GitHub Pages

## Getting Started

Open `index.html` directly in your browser, or serve the folder with any static server:

```sh
# Python
python3 -m http.server

# Node
npx serve .
```

For GitHub Pages, push the repo and enable Pages from the repository settings — no configuration needed.

## Adding or Editing Quizzes

All quiz data lives in a single file: `data/quizzes.js`. Open it in any text editor.

### Add a new category

Add a new object to the `QUIZ_DATA` array:

```js
{
  id: "greetings",                    // Unique ID (lowercase, no spaces)
  name: "あいさつ れんしゅう",           // Japanese category name
  nameEn: "Greetings",               // English category name
  icon: "👋",                         // Emoji shown on the category card
  color: "#3b82f6",                   // Accent color (any hex color)
  questions: [
    {
      prompt: "おはよう",               // What the student sees
      hint: "Good morning",           // English hint (optional, revealed on click)
      answers: ["ohayou", "ohayō"],   // All accepted answers
    },
    // ... more questions
  ]
}
```

### Add questions to an existing category

Find the category in `data/quizzes.js` and add entries to its `questions` array:

```js
{ prompt: "十一月", hint: "November", answers: ["じゅういちがつ", "juuichigatsu"] },
```

### Answer matching

- Matching is **case-insensitive** and ignores extra whitespace
- List every accepted form: include both hiragana and romaji so students can answer in either
- For words with long vowels, include common romanization variants (e.g. `"juugatsu"` and `"jūgatsu"`)

## Project Structure

```
index.html          Main app (single page)
css/styles.css      All styling and theming
js/app.js           Quiz logic
data/quizzes.js     Quiz data — edit this to add content
```
