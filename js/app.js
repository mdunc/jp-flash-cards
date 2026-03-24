(function () {
  "use strict";

  const RING_CIRCUMFERENCE = 2 * Math.PI * 52; // matches SVG r=52

  // ===== State =====
  const state = {
    category: null,
    questions: [],
    current: 0,
    userAnswers: [],
    score: 0,
  };

  // ===== DOM =====
  const $ = (id) => document.getElementById(id);
  const screens = {
    home: $("home-screen"),
    quiz: $("quiz-screen"),
    results: $("results-screen"),
  };

  // ===== Theme =====
  function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefer = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", prefer);
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  // ===== Per-question hint =====
  function revealHint() {
    $("hint-reveal").classList.add("used");
    $("question-hint").classList.add("visible");
  }

  function resetHint() {
    $("hint-reveal").classList.remove("used");
    $("question-hint").classList.remove("visible");
  }

  // ===== Category accent color =====
  function setCategoryColor(color) {
    document.documentElement.style.setProperty("--cat-color", color || "#6366f1");
  }

  // ===== Screens =====
  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  // ===== Home =====
  function renderCategories() {
    const list = $("category-list");
    list.innerHTML = QUIZ_DATA.map(
      (cat) => `
      <button class="category-card" data-id="${cat.id}" style="--card-accent: ${cat.color}">
        <span class="category-icon">${cat.icon}</span>
        <div class="category-info">
          <div class="category-name">${cat.name}</div>
          <div class="category-meta">${cat.nameEn}</div>
        </div>
        <span class="category-count">${cat.questions.length}問</span>
      </button>`
    ).join("");

    list.addEventListener("click", (e) => {
      const card = e.target.closest(".category-card");
      if (!card) return;
      startQuiz(card.dataset.id);
    });
  }

  // ===== Quiz =====
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderDots(total) {
    const container = $("progress-dots");
    container.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("div");
      dot.className = "progress-dot";
      container.appendChild(dot);
    }
  }

  function updateDot(index, result) {
    const dots = $("progress-dots").children;
    if (dots[index]) {
      dots[index].classList.remove("current");
      dots[index].classList.add(result);
    }
  }

  function highlightCurrentDot(index) {
    const dots = $("progress-dots").children;
    // Remove current from all
    Array.from(dots).forEach((d) => d.classList.remove("current"));
    if (dots[index]) {
      dots[index].classList.add("current");
    }
  }

  function startQuiz(categoryId) {
    const cat = QUIZ_DATA.find((c) => c.id === categoryId);
    if (!cat) return;

    state.category = cat;
    state.questions = shuffle(cat.questions);
    state.current = 0;
    state.userAnswers = [];
    state.score = 0;

    setCategoryColor(cat.color);
    $("quiz-category-name").textContent = cat.nameEn;
    renderDots(state.questions.length);

    showScreen("quiz");
    showQuestion();
  }

  function showQuestion() {
    const q = state.questions[state.current];
    const total = state.questions.length;

    $("question-counter").textContent = `${state.current + 1} / ${total}`;
    highlightCurrentDot(state.current);

    // Question with entrance animation
    const card = $("question-card");
    card.classList.remove("flash-correct", "flash-incorrect", "shake");
    $("question-prompt").textContent = q.prompt;
    $("question-hint").textContent = q.hint || "";
    resetHint();

    // Animate question content
    $("question-prompt").classList.remove("question-enter");
    void $("question-prompt").offsetWidth; // force reflow
    $("question-prompt").classList.add("question-enter");

    // Reset input
    const input = $("answer-input");
    input.value = "";
    input.disabled = false;
    input.focus();

    // Reset buttons
    $("submit-btn").style.display = "";
    $("next-btn").classList.remove("visible");
    $("next-btn").classList.add("hidden");

    // Reset feedback
    const fb = $("feedback");
    fb.classList.add("hidden");
    fb.classList.remove("correct", "incorrect");
  }

  function normalizeAnswer(str) {
    return str.toLowerCase().trim().replace(/\s+/g, "");
  }

  function checkAnswer() {
    const input = $("answer-input");
    const userRaw = input.value;
    const userNorm = normalizeAnswer(userRaw);
    const q = state.questions[state.current];

    if (!userNorm) return;

    const isCorrect = q.answers.some(
      (a) => normalizeAnswer(a) === userNorm
    );

    state.userAnswers.push({ question: q, answer: userRaw, correct: isCorrect });
    if (isCorrect) state.score++;

    // Update dot
    updateDot(state.current, isCorrect ? "correct" : "incorrect");

    // Flash card border
    const card = $("question-card");
    card.classList.add(isCorrect ? "flash-correct" : "flash-incorrect");
    if (!isCorrect) {
      card.classList.add("shake");
    }

    // Show feedback
    const fb = $("feedback");
    fb.classList.remove("hidden", "correct", "incorrect");
    fb.classList.add(isCorrect ? "correct" : "incorrect");

    $("feedback-icon").textContent = isCorrect ? "✓" : "✗";
    $("feedback-text").textContent = isCorrect ? " Correct!" : " Incorrect";

    const correctDiv = $("correct-answer");
    if (isCorrect) {
      correctDiv.textContent = "";
    } else {
      const hiragana = q.answers[0];
      const romaji = q.answers.length > 1 ? q.answers[1] : "";
      correctDiv.textContent = romaji
        ? `${hiragana}（${romaji}）`
        : hiragana;
    }

    // Disable input, show next
    input.disabled = true;
    $("submit-btn").style.display = "none";
    $("next-btn").classList.remove("hidden");
    $("next-btn").classList.add("visible");
    $("next-btn").focus();
  }

  function nextQuestion() {
    state.current++;
    if (state.current >= state.questions.length) {
      showResults();
    } else {
      showQuestion();
    }
  }

  // ===== Results =====
  function showResults() {
    const total = state.questions.length;
    const pct = Math.round((state.score / total) * 100);

    let msg;
    if (pct === 100)     msg = "完璧！ Perfect!";
    else if (pct >= 80)  msg = "すごい！ Great job!";
    else if (pct >= 60)  msg = "いいね！ Good effort!";
    else                 msg = "がんばって！ Keep practicing!";
    $("results-message").textContent = msg;

    // Score
    $("score-number").textContent = state.score;
    $("score-total").textContent = total;

    // Animate score ring
    const ringFill = $("score-ring-fill");
    ringFill.style.strokeDashoffset = RING_CIRCUMFERENCE; // reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const offset = RING_CIRCUMFERENCE * (1 - state.score / total);
        ringFill.style.strokeDashoffset = offset;
      });
    });

    // Breakdown
    const list = $("results-list");
    list.innerHTML = state.userAnswers
      .map((r) => {
        const cls = r.correct ? "correct" : "incorrect";
        const icon = r.correct ? "✓" : "✗";
        const correctText = r.correct
          ? ""
          : `<span class="result-correct-answer">→ ${r.question.answers[0]}</span>`;
        return `
        <div class="result-item ${cls}">
          <span class="result-icon">${icon}</span>
          <span class="result-prompt">${r.question.prompt}</span>
          <span class="result-user-answer">${r.answer || "—"} ${correctText}</span>
        </div>`;
      })
      .join("");

    showScreen("results");
  }

  // ===== Events =====
  function init() {
    initTheme();
    renderCategories();

    $("theme-toggle").addEventListener("click", toggleTheme);
    $("hint-reveal").addEventListener("click", revealHint);

    $("answer-form").addEventListener("submit", (e) => {
      e.preventDefault();
      checkAnswer();
    });

    $("next-btn").addEventListener("click", nextQuestion);

    $("back-btn").addEventListener("click", () => {
      setCategoryColor(null);
      showScreen("home");
    });

    $("retry-btn").addEventListener("click", () => {
      startQuiz(state.category.id);
    });

    $("home-btn").addEventListener("click", () => {
      setCategoryColor(null);
      showScreen("home");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !$("next-btn").classList.contains("hidden")) {
        e.preventDefault();
        nextQuestion();
      }
    });
  }

  init();
})();
