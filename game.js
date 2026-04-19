(function () {
  const STORAGE_KEY = "epa608_progress_v1";

  const DEFAULT = {
    xp: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    bestStreak: 0,
    currentStreak: 0,
    quizzesCompleted: 0,
    lightningBest: 0,
    dailyDate: null,
    knownFlashcards: []
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT };
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULT, ...parsed };
      delete merged.badges;
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
  }

  function resetStreak() {
    state.currentStreak = 0;
    save();
    emit("streak", { streak: 0 });
  }

  function recordQuizFinish(result) {
    state.quizzesCompleted++;
    const { length, correct } = result;
    const pct = length ? correct / length : 0;
    if (pct >= 0.7) addXP(25, "quiz-pass");
    save();
    emit("quiz", result);
  }

  function recordLightning(score) {
    if (score > state.lightningBest) {
      state.lightningBest = score;
      save();
    }
    emit("lightning", { score, best: state.lightningBest });
  }

  function todayKey() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function dailyCompleted() { return state.dailyDate === todayKey(); }

  function markDailyComplete() {
    const key = todayKey();
    if (state.dailyDate === key) return false;
    state.dailyDate = key;
    save();
    emit("daily", { date: key });
    return true;
  }

  function markFlashcardKnown(id, known) {
    const idx = state.knownFlashcards.indexOf(id);
    if (known && idx === -1) state.knownFlashcards.push(id);
    if (!known && idx !== -1) state.knownFlashcards.splice(idx, 1);
    save();
    emit("flashcard", { id, known, total: state.knownFlashcards.length });
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

  function on(fn) { listeners.push(fn); }
  function get() { return { ...state }; }

  window.Game = {
    on, get,
    getLevel, xpForLevel, progressInLevel,
    addXP, recordAnswer, recordQuizFinish, recordLightning, resetStreak,
    dailyCompleted, markDailyComplete, dailyPick, todayKey,
    markFlashcardKnown, clearFlashcardProgress
  };
})();
