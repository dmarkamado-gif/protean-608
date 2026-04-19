(function () {
  const SECTIONS = ["All", "Core", "Type I", "Type II", "Type III"];
  const LETTERS = ["A", "B", "C", "D", "E"];

  const state = {
    mode: "study",        // "study" | "lightning" | "daily"
    pool: [],
    current: 0,
    answers: [],
    revealed: [],
    filter: "All",
    length: 15,
    finished: false,
    onlyMissed: false,
    lastMissedIds: [],
    sessionCorrect: 0,
    // lightning
    lightningEndAt: 0,
    lightningScore: 0,
    lightningTimer: null,
    lightningTotal: 0
  };

  const $ = (sel) => document.querySelector(sel);

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function allQuestions() {
    return window.QUIZ_QUESTIONS.map((q, i) => ({ ...q, _id: i }));
  }

  function buildPool() {
    let source = allQuestions();
    if (state.mode === "daily") {
      source = window.Game.dailyPick(source, 5);
      state.filter = "All";
    } else {
      if (state.filter !== "All") source = source.filter((q) => q.section === state.filter);
      if (state.onlyMissed && state.lastMissedIds.length) {
        source = source.filter((q) => state.lastMissedIds.includes(q._id));
      }
      source = shuffle(source).slice(0, state.length);
    }
    state.pool = source;
    state.current = 0;
    state.answers = new Array(source.length).fill(null);
    state.revealed = new Array(source.length).fill(false);
    state.finished = false;
    state.sessionCorrect = 0;
  }

  function renderStreak() {
    const wrap = $("#streak-meter");
    if (!wrap) return;
    const streak = window.Game.get().currentStreak;
    const pct = Math.min(100, (streak / 20) * 100);
    wrap.innerHTML =
      '<div class="streak-label"><span class="streak-flame">' + flameIcon(streak) + '</span>' +
      '<span>Streak: <strong>' + streak + '</strong></span></div>' +
      '<div class="streak-bar"><span style="width:' + pct + '%"></span></div>';
  }

  function flameIcon(streak) {
    if (streak >= 20) return "▲▲▲";
    if (streak >= 10) return "▲▲";
    if (streak >= 5)  return "▲";
    return "·";
  }

  function updateProgress() {
    if (state.mode === "lightning") return;
    const total = state.pool.length;
    const answered = state.answers.filter((a) => a !== null).length;
    const pct = total ? (answered / total) * 100 : 0;
    const bar = $("#progress-bar");
    const txt = $("#progress-text");
    if (bar) bar.style.width = pct + "%";
    if (txt) txt.textContent = answered + " / " + total + " answered";
  }

  function renderControls() {
    const section = $("#f-section");
    if (section) {
      section.innerHTML = SECTIONS.map((s) => '<option value="' + s + '">' + s + '</option>').join("");
      section.value = state.filter;
    }
    const length = $("#f-length");
    if (length) length.value = state.length;
    const missedBtn = $("#btn-missed");
    if (missedBtn) {
      missedBtn.disabled = state.lastMissedIds.length === 0;
      missedBtn.textContent = state.lastMissedIds.length
        ? "Only review missed (" + state.lastMissedIds.length + ")"
        : "Only review missed";
    }
  }

  function renderQuestion() {
    const q = state.pool[state.current];
    if (!q) return;

    const quizArea = $("#quiz-area");
    quizArea.classList.remove("hide");
    quizArea.classList.toggle("lightning-mode", state.mode === "lightning");

    $("#q-section").textContent = q.section;
    $("#q-index").textContent =
      state.mode === "lightning"
        ? "Answered: " + state.lightningScore
        : "Question " + (state.current + 1) + " of " + state.pool.length;
    $("#q-stem").textContent = q.stem;

    const chosen = state.answers[state.current];
    const revealed = state.revealed[state.current];

    const choicesEl = $("#q-choices");
    choicesEl.innerHTML = "";
    q.choices.forEach((text, i) => {
      const li = document.createElement("li");
      li.dataset.index = i;
      li.innerHTML =
        '<span class="choice-letter">' + LETTERS[i] + '.</span><span>' + text + "</span>";

      if (chosen === i && !revealed) li.classList.add("selected");
      if (revealed) {
        if (i === q.answer) li.classList.add("correct");
        else if (i === chosen) li.classList.add("incorrect");
      }
      li.addEventListener("click", () => onChoose(i, li));
      choicesEl.appendChild(li);
    });

    const expl = $("#q-explanation");
    if (revealed && state.mode !== "lightning") {
      expl.innerHTML =
        "<strong>Correct answer: " + LETTERS[q.answer] + ".</strong> " + q.explanation;
      expl.classList.add("show");
    } else {
      expl.classList.remove("show");
      expl.innerHTML = "";
    }

    const btnCheck = $("#btn-check");
    const btnPrev  = $("#btn-prev");
    const btnNext  = $("#btn-next");
    if (state.mode === "lightning") {
      btnCheck.classList.add("hide");
      btnPrev.classList.add("hide");
      btnNext.classList.add("hide");
    } else {
      btnCheck.classList.remove("hide");
      btnPrev.classList.remove("hide");
      btnNext.classList.remove("hide");
      btnCheck.disabled = chosen === null || revealed;
      btnPrev.disabled = state.current === 0;
      btnNext.textContent = state.current === state.pool.length - 1 ? "Finish" : "Next";
    }
    updateProgress();
    renderStreak();
  }

  function onChoose(i, li) {
    const q = state.pool[state.current];
    if (state.mode === "lightning") {
      // immediate score & advance
      const isCorrect = i === q.answer;
      state.answers[state.current] = i;
      state.revealed[state.current] = true;
      state.lightningTotal++;
      if (isCorrect) {
        state.lightningScore++;
        state.lightningEndAt += 1000; // +1s
        window.Game.recordAnswer(true, q.section);
        if (window.FX) {
          window.FX.sfx.correct();
          window.FX.confetti({
            intensity: 0.5,
            x: li.getBoundingClientRect().left + li.offsetWidth / 2,
            y: li.getBoundingClientRect().top
          });
        }
      } else {
        state.lightningEndAt -= 2000; // -2s
        window.Game.recordAnswer(false, q.section);
        if (window.FX) {
          window.FX.sfx.wrong();
          window.FX.shake($("#quiz-area"));
        }
      }
      // flash briefly then advance
      setTimeout(() => {
        state.current++;
        if (state.current >= state.pool.length) {
          // re-shuffle more questions
          state.pool = state.pool.concat(shuffle(allQuestions()));
          state.answers.length = state.pool.length;
          state.revealed.length = state.pool.length;
        }
        renderQuestion();
      }, 320);
      return;
    }
    if (state.revealed[state.current]) return;
    state.answers[state.current] = i;
    renderQuestion();
  }

  function check() {
    if (state.answers[state.current] === null) return;
    const q = state.pool[state.current];
    const chosen = state.answers[state.current];
    const isCorrect = chosen === q.answer;
    state.revealed[state.current] = true;

    window.Game.recordAnswer(isCorrect, q.section);
    if (isCorrect) {
      state.sessionCorrect++;
      if (window.FX) {
        window.FX.sfx.correct();
        const streak = window.Game.get().currentStreak;
        const choiceEl = document.querySelector('#q-choices li[data-index="' + chosen + '"]');
        const rect = choiceEl ? choiceEl.getBoundingClientRect() : null;
        window.FX.confetti({
          intensity: Math.min(2, 0.6 + streak * 0.15),
          x: rect ? rect.left + rect.width / 2 : undefined,
          y: rect ? rect.top : undefined
        });
        if (streak > 0 && streak % 5 === 0) window.FX.sfx.streak();
      }
    } else {
      if (window.FX) {
        window.FX.sfx.wrong();
        window.FX.shake($("#q-choices"));
      }
    }
    renderQuestion();
  }

  function next() {
    if (state.current < state.pool.length - 1) {
      state.current++;
      renderQuestion();
    } else {
      finish();
    }
  }
  function prev() {
    if (state.current > 0) {
      state.current--;
      renderQuestion();
    }
  }

  function finish() {
    const total = state.pool.length;
    let correct = 0;
    const bySection = {};
    const missedIds = [];

    state.pool.forEach((q, i) => {
      const chosen = state.answers[i];
      const isCorrect = chosen === q.answer;
      if (isCorrect) correct++;
      else missedIds.push(q._id);
      if (!bySection[q.section]) bySection[q.section] = { correct: 0, total: 0 };
      bySection[q.section].total++;
      if (isCorrect) bySection[q.section].correct++;
    });

    state.finished = true;
    state.lastMissedIds = missedIds;

    const pct = total ? Math.round((correct / total) * 100) : 0;
    const pass = pct >= 70;

    window.Game.recordQuizFinish({
      section: state.mode === "daily" ? "All" : state.filter,
      length: total,
      correct
    });
    if (state.mode === "daily" && pass) window.Game.markDailyComplete();
    if (window.FX) {
      window.FX.sfx.finish();
      if (pct === 100) window.FX.confetti({ intensity: 2.5 });
      else if (pass) window.FX.confetti({ intensity: 1.2 });
    }

    const breakdown = Object.entries(bySection)
      .map(([sec, s]) => {
        const p = Math.round((s.correct / s.total) * 100);
        return '<div class="score-pill"><div class="label">' + sec + "</div><div>" +
          s.correct + "/" + s.total + " · <strong>" + p + "%</strong></div></div>";
      })
      .join("");

    $("#quiz-area").classList.add("hide");
    const scoreEl = $("#score-area");
    scoreEl.innerHTML =
      '<div class="score-card">' +
        '<div class="score-big">' + pct + '%</div>' +
        '<div class="' + (pass ? "pass" : "fail") + '">' +
          (pass ? "Passing score" : "Not yet at 70% — keep drilling") +
        '</div>' +
        '<div class="score-breakdown">' + breakdown + '</div>' +
        '<div class="session-stats">' +
          'Best streak this round: <strong>' + window.Game.get().bestStreak + '</strong> · ' +
          'Total XP: <strong>' + window.Game.get().xp + '</strong>' +
        '</div>' +
        '<div class="actions" style="justify-content:center">' +
          '<button class="btn primary" id="btn-retry">New Practice Test</button>' +
          (missedIds.length
            ? '<button class="btn" id="btn-review-missed">Review Missed (' + missedIds.length + ')</button>'
            : "") +
          '<button class="btn" id="btn-lightning">Try a 60-second round</button>' +
        '</div>' +
      '</div>';
    scoreEl.classList.remove("hide");
    $("#btn-retry").addEventListener("click", restart);
    const mb = $("#btn-review-missed");
    if (mb) mb.addEventListener("click", () => { state.onlyMissed = true; restart(); });
    $("#btn-lightning").addEventListener("click", startLightning);
    renderControls();
    renderStreak();
  }

  function restart() {
    state.mode = "study";
    buildPool();
    $("#score-area").classList.add("hide");
    $("#quiz-area").classList.remove("hide");
    renderQuestion();
    renderControls();
  }

  // ---- Lightning Round ----
  function startLightning() {
    state.mode = "lightning";
    state.filter = "All";
    state.lightningScore = 0;
    state.lightningTotal = 0;
    state.pool = shuffle(allQuestions());
    state.current = 0;
    state.answers = new Array(state.pool.length).fill(null);
    state.revealed = new Array(state.pool.length).fill(false);
    state.finished = false;
    state.lightningEndAt = Date.now() + 60000;

    $("#score-area").classList.add("hide");
    $("#quiz-area").classList.remove("hide");
    document.querySelector(".quiz-controls").classList.add("hide");
    const timerEl = document.getElementById("lightning-timer");
    if (!timerEl) {
      const t = document.createElement("div");
      t.id = "lightning-timer";
      t.className = "lightning-timer";
      $("#quiz-area").prepend(t);
    }
    tickLightning();
    state.lightningTimer = setInterval(tickLightning, 100);
    renderQuestion();
  }

  function tickLightning() {
    const remaining = state.lightningEndAt - Date.now();
    const el = document.getElementById("lightning-timer");
    if (!el) return;
    const secs = Math.max(0, remaining / 1000);
    const pct = Math.max(0, Math.min(100, (secs / 60) * 100));
    el.innerHTML =
      '<div class="lt-top"><span>60-second round</span>' +
      '<span>Score <strong>' + state.lightningScore + '</strong></span>' +
      '<span>' + secs.toFixed(1) + 's left</span></div>' +
      '<div class="lt-bar"><span style="width:' + pct + '%"></span></div>';
    if (remaining <= 0) endLightning();
  }

  function endLightning() {
    clearInterval(state.lightningTimer);
    state.lightningTimer = null;
    window.Game.recordLightning(state.lightningScore);
    if (window.FX) {
      window.FX.sfx.finish();
      if (state.lightningScore >= 15) window.FX.confetti({ intensity: 2 });
    }
    $("#quiz-area").classList.add("hide");
    document.querySelector(".quiz-controls").classList.remove("hide");
    const best = window.Game.get().lightningBest;
    const newBest = state.lightningScore >= best;
    const scoreEl = $("#score-area");
    scoreEl.innerHTML =
      '<div class="score-card">' +
        '<div class="score-big">' + state.lightningScore + "</div>" +
        '<div class="muted">correct in 60 seconds · ' + state.lightningTotal + " attempted</div>" +
        (newBest && state.lightningScore > 0 ? '<div class="pass" style="margin-top:6px">New personal best</div>' : '') +
        '<div class="session-stats">All-time best: <strong>' + best + '</strong></div>' +
        '<div class="actions" style="justify-content:center">' +
          '<button class="btn primary" id="btn-lightning-again">Go again</button>' +
          '<button class="btn" id="btn-back-study">Back to study mode</button>' +
        '</div>' +
      '</div>';
    scoreEl.classList.remove("hide");
    $("#btn-lightning-again").addEventListener("click", startLightning);
    $("#btn-back-study").addEventListener("click", restart);
    const timerEl = document.getElementById("lightning-timer");
    if (timerEl) timerEl.remove();
  }

  // ---- Daily Drill ----
  function startDaily() {
    state.mode = "daily";
    buildPool();
    $("#score-area").classList.add("hide");
    $("#quiz-area").classList.remove("hide");
    document.querySelector(".quiz-controls").classList.add("hide");
    renderQuestion();
  }

  function init() {
    renderControls();
    renderStreak();

    $("#f-section").addEventListener("change", (e) => {
      state.filter = e.target.value;
      state.onlyMissed = false;
      restart();
    });
    $("#f-length").addEventListener("change", (e) => {
      const n = parseInt(e.target.value, 10);
      state.length = isNaN(n) || n < 1 ? 15 : Math.min(n, 50);
      state.onlyMissed = false;
      restart();
    });
    $("#btn-missed").addEventListener("click", () => {
      state.onlyMissed = true;
      restart();
    });
    $("#btn-reset").addEventListener("click", () => {
      state.onlyMissed = false;
      restart();
    });
    $("#btn-check").addEventListener("click", check);
    $("#btn-next").addEventListener("click", next);
    $("#btn-prev").addEventListener("click", prev);

    const lb = $("#btn-start-lightning");
    if (lb) lb.addEventListener("click", startLightning);
    const db = $("#btn-start-daily");
    if (db) db.addEventListener("click", startDaily);

    // Respond to URL flags
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "lightning") { startLightning(); return; }
    if (params.get("mode") === "daily") { startDaily(); return; }

    buildPool();
    renderQuestion();

    // Update streak meter whenever answers happen
    window.Game.on((event) => { if (event === "answer" || event === "streak") renderStreak(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
