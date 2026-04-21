(function () {
  const STORAGE_KEY = "epa608_progress_v1";

  const DEFAULT = {
    xp: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    bestStreak: 0,
    currentStreak: 0,
    quizzesCompleted: 0,
    perfectQuizzes: 0,
    lightningBest: 0,
    dailyDate: null,
    dailyStreak: 0,
    sectionsPassed: [],
    knownFlashcards: [],
    badges: []
  };

  const BADGES = [
    { id: "first-correct", name: "First Correct", icon: "spark", desc: "Answer your first question correctly.", test: (s) => s.questionsCorrect >= 1 },
    { id: "streak-5", name: "Heating Up", icon: "flame", desc: "Get 5 correct answers in a row.", test: (s) => s.bestStreak >= 5 },
    { id: "streak-10", name: "On a Roll", icon: "flame", desc: "Get 10 correct answers in a row.", test: (s) => s.bestStreak >= 10 },
    { id: "streak-25", name: "Locked In", icon: "flame", desc: "Get 25 correct answers in a row.", test: (s) => s.bestStreak >= 25 },
    { id: "volume-25", name: "Warming Up", icon: "gauge", desc: "Answer 25 total questions.", test: (s) => s.questionsAnswered >= 25 },
    { id: "volume-100", name: "Seasoned", icon: "gauge", desc: "Answer 100 total questions.", test: (s) => s.questionsAnswered >= 100 },
    { id: "volume-250", name: "Technician", icon: "gauge", desc: "Answer 250 total questions.", test: (s) => s.questionsAnswered >= 250 },
    { id: "accuracy-90", name: "Sharpshooter", icon: "target", desc: "Maintain 90% accuracy after 30+ questions.", test: (s) => s.questionsAnswered >= 30 && s.questionsCorrect / s.questionsAnswered >= 0.9 },
    { id: "quiz-first", name: "First Pass", icon: "check", desc: "Complete your first practice quiz.", test: (s) => s.quizzesCompleted >= 1 },
    { id: "quiz-10", name: "Diligent", icon: "check", desc: "Complete 10 practice quizzes.", test: (s) => s.quizzesCompleted >= 10 },
    { id: "quiz-perfect", name: "Perfectionist", icon: "trophy", desc: "Score 100% on any practice quiz.", test: (s) => s.perfectQuizzes >= 1 },
    { id: "lightning-20", name: "Quick Draw", icon: "bolt", desc: "Score 20+ on the 60-second round.", test: (s) => s.lightningBest >= 20 },
    { id: "lightning-40", name: "Lightning", icon: "bolt", desc: "Score 40+ on the 60-second round.", test: (s) => s.lightningBest >= 40 },
    { id: "daily-3", name: "Habit Forming", icon: "calendar", desc: "Complete 3 daily drills in a row.", test: (s) => s.dailyStreak >= 3 },
    { id: "daily-7", name: "Week Strong", icon: "calendar", desc: "Complete 7 daily drills in a row.", test: (s) => s.dailyStreak >= 7 },
    { id: "cards-10", name: "Flash Start", icon: "cards", desc: "Mark 10 flashcards as known.", test: (s) => s.knownFlashcards.length >= 10 },
    { id: "cards-all", name: "Card Shark", icon: "cards", desc: "Mark all 36 flashcards as known.", test: (s) => s.knownFlashcards.length >= 36 },
    { id: "section-core", name: "Core Certified", icon: "shield", desc: "Pass a Core practice quiz (70%+).", test: (s) => s.sectionsPassed.includes("Core") },
    { id: "section-i", name: "Type I Ready", icon: "shield", desc: "Pass a Type I practice quiz.", test: (s) => s.sectionsPassed.includes("Type I") },
    { id: "section-ii", name: "Type II Ready", icon: "shield", desc: "Pass a Type II practice quiz.", test: (s) => s.sectionsPassed.includes("Type II") },
    { id: "section-iii", name: "Type III Ready", icon: "shield", desc: "Pass a Type III practice quiz.", test: (s) => s.sectionsPassed.includes("Type III") },
    { id: "universal", name: "Universal", icon: "crown", desc: "Pass all four section quizzes.", test: (s) => ["Core","Type I","Type II","Type III"].every(k => s.sectionsPassed.includes(k)) },
    { id: "level-5", name: "Level 5", icon: "star", desc: "Reach level 5.", test: (s) => getLevel(s.xp) >= 5 },
    { id: "level-10", name: "Level 10", icon: "star", desc: "Reach level 10.", test: (s) => getLevel(s.xp) >= 10 }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT };
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULT, ...parsed };
      if (!Array.isArray(merged.badges)) merged.badges = [];
      if (!Array.isArray(merged.sectionsPassed)) merged.sectionsPassed = [];
      if (!Array.isArray(merged.knownFlashcards)) merged.knownFlashcards = [];
      return merged;
    } catch (e) {
      return { ...DEFAULT };
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  const state = load();
  const listeners = [];

  function emit(event, data) {
    listeners.forEach((fn) => { try { fn(event, data); } catch (e) {} });
  }

  function getLevel(xp) { return Math.floor(Math.sqrt((xp || 0) / 100)) + 1; }
  function xpForLevel(level) { return Math.pow(level - 1, 2) * 100; }
  function progressInLevel() {
    const lvl = getLevel(state.xp);
    const base = xpForLevel(lvl);
    const next = xpForLevel(lvl + 1);
    return { level: lvl, current: state.xp - base, needed: next - base, total: state.xp };
  }

  function addXP(amount, reason) {
    if (!amount) return;
    const oldLevel = getLevel(state.xp);
    state.xp += amount;
    const newLevel = getLevel(state.xp);
    save();
    emit("xp", { amount, reason, total: state.xp });
    if (newLevel > oldLevel) emit("levelup", { level: newLevel });
    checkBadges();
  }

  function recordAnswer(correct, section) {
    state.questionsAnswered++;
    if (correct) {
      state.questionsCorrect++;
      state.currentStreak++;
      if (state.currentStreak > state.bestStreak) state.bestStreak = state.currentStreak;
      let xp = 10;
      if (state.currentStreak >= 10) xp += 10;
      else if (state.currentStreak >= 5) xp += 5;
      addXP(xp, "correct");
    } else {
      state.currentStreak = 0;
    }
    save();
    emit("answer", { correct, section, streak: state.currentStreak });
    checkBadges();
  }

  function resetStreak() {
    state.currentStreak = 0;
    save();
    emit("streak", { streak: 0 });
  }

  function recordQuizFinish(result) {
    state.quizzesCompleted++;
    const { length, correct, section } = result;
    const pct = length ? correct / length : 0;
    if (pct >= 0.7) addXP(25, "quiz-pass");
    if (pct === 1 && length >= 5) state.perfectQuizzes++;
    if (pct >= 0.7 && section && !state.sectionsPassed.includes(section)) {
      state.sectionsPassed.push(section);
    }
    save();
    emit("quiz", result);
    checkBadges();
  }

  function recordLightning(score) {
    if (score > state.lightningBest) {
      state.lightningBest = score;
      save();
    }
    emit("lightning", { score, best: state.lightningBest });
    checkBadges();
  }

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function dailyCompleted() { return state.dailyDate === todayKey(); }

  function markDailyComplete() {
    const key = todayKey();
    if (state.dailyDate === key) return false;
    const prev = state.dailyDate;
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const yesterday = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    state.dailyStreak = (prev === yesterday) ? (state.dailyStreak || 0) + 1 : 1;
    state.dailyDate = key;
    addXP(15, "daily");
    save();
    emit("daily", { date: key, streak: state.dailyStreak });
    checkBadges();
    return true;
  }

  function markFlashcardKnown(id, known) {
    const idx = state.knownFlashcards.indexOf(id);
    if (known && idx === -1) {
      state.knownFlashcards.push(id);
      addXP(3, "flashcard");
    }
    if (!known && idx !== -1) state.knownFlashcards.splice(idx, 1);
    save();
    emit("flashcard", { id, known, total: state.knownFlashcards.length });
    checkBadges();
  }

  function clearFlashcardProgress() {
    state.knownFlashcards = [];
    save();
    emit("flashcard", { cleared: true, total: 0 });
  }

  // Deterministic daily seed — same questions for all users on a given day
  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashDate(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h >>> 0;
  }
  function dailySeed() { return hashDate(todayKey()); }
  function dailyPick(arr, n) {
    const rng = mulberry32(dailySeed());
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  }

  function checkBadges() {
    const earned = [];
    for (const b of BADGES) {
      if (state.badges.includes(b.id)) continue;
      try {
        if (b.test(state)) {
          state.badges.push(b.id);
          earned.push(b);
        }
      } catch (e) {}
    }
    if (earned.length) {
      save();
      earned.forEach((b) => emit("badge", b));
    }
  }

  function getBadges() {
    return BADGES.map((b) => ({
      id: b.id,
      name: b.name,
      desc: b.desc,
      icon: b.icon,
      earned: state.badges.includes(b.id)
    }));
  }

  function resetProgress() {
    Object.assign(state, JSON.parse(JSON.stringify(DEFAULT)));
    save();
    emit("reset", {});
  }

  function on(fn) { listeners.push(fn); }
  function get() { return { ...state }; }

  // Catch up any legacy state that already meets badge thresholds
  checkBadges();

  window.Game = {
    on, get,
    getLevel, xpForLevel, progressInLevel,
    addXP, recordAnswer, recordQuizFinish, recordLightning, resetStreak,
    dailyCompleted, markDailyComplete, dailyPick, todayKey,
    markFlashcardKnown, clearFlashcardProgress,
    getBadges, resetProgress, BADGES
  };
})();
