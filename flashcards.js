(function () {
  const SECTIONS = ["All", "Core", "Type I", "Type II", "Type III"];
  const state = {
    deck: [],
    idx: 0,
    filter: "All",
    flipped: false
  };

  function $(sel) { return document.querySelector(sel); }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildDeck() {
    let src = window.FLASHCARDS.slice();
    if (state.filter !== "All") src = src.filter((c) => c.section === state.filter);
    state.deck = shuffle(src);
    state.idx = 0;
    state.flipped = false;
  }

  function render() {
    const card = state.deck[state.idx];
    const host = $("#card-host");
    if (!card) {
      host.innerHTML = '<div class="flashcard empty"><p>No cards in this filter.</p></div>';
      return;
    }
    const known = window.Game.get().knownFlashcards.includes(card.id);
    host.innerHTML =
      '<div class="flashcard ' + (state.flipped ? "flipped " : "") + (known ? "known" : "") + '" id="fc">' +
        '<div class="flashcard-inner">' +
          '<div class="flashcard-face flashcard-front">' +
            '<span class="flashcard-tag">' + card.section + '</span>' +
            '<p class="flashcard-text">' + card.front + '</p>' +
            '<span class="flashcard-hint">Click to flip</span>' +
          '</div>' +
          '<div class="flashcard-face flashcard-back">' +
            '<span class="flashcard-tag">Answer</span>' +
            '<p class="flashcard-text">' + card.back + '</p>' +
            '<span class="flashcard-hint">Click to flip back</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    $("#fc").addEventListener("click", () => {
      state.flipped = !state.flipped;
      $("#fc").classList.toggle("flipped");
    });

    $("#card-index").textContent = "Card " + (state.idx + 1) + " of " + state.deck.length;
    $("#card-section").textContent = card.section;

    const known2 = window.Game.get().knownFlashcards.includes(card.id);
    $("#btn-know").textContent = known2 ? "Marked known ✓" : "I know this";
    $("#btn-know").classList.toggle("primary", !known2);

    const total = window.FLASHCARDS.length;
    const knownCount = window.Game.get().knownFlashcards.length;
    $("#fc-progress-text").textContent = knownCount + " / " + total + " known";
    $("#fc-progress-bar").style.width = Math.round((knownCount / total) * 100) + "%";
  }

  function next() {
    state.idx = (state.idx + 1) % state.deck.length;
    state.flipped = false;
    render();
  }
  function prev() {
    state.idx = (state.idx - 1 + state.deck.length) % state.deck.length;
    state.flipped = false;
    render();
  }

  function toggleKnown() {
    const card = state.deck[state.idx];
    if (!card) return;
    const currently = window.Game.get().knownFlashcards.includes(card.id);
    window.Game.markFlashcardKnown(card.id, !currently);
    if (!currently) {
      if (window.FX) {
        window.FX.sfx.correct();
        window.FX.confetti({ intensity: 0.3 });
      }
      const knownCount = window.Game.get().knownFlashcards.length;
      if (knownCount === window.FLASHCARDS.length) {
        window.Game.addXP(100, "flashcards-all");
        if (window.FX) window.FX.confetti();
      }
    }
    render();
  }

  function init() {
    const sel = $("#f-section");
    sel.innerHTML = SECTIONS.map((s) => '<option value="' + s + '">' + s + '</option>').join("");
    sel.value = state.filter;

    sel.addEventListener("change", (e) => {
      state.filter = e.target.value;
      buildDeck();
      render();
    });

    $("#btn-next").addEventListener("click", next);
    $("#btn-prev").addEventListener("click", prev);
    $("#btn-know").addEventListener("click", toggleKnown);
    $("#btn-reset").addEventListener("click", () => {
      window.Game.clearFlashcardProgress();
      render();
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); state.flipped = !state.flipped; render(); }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key.toLowerCase() === "k") toggleKnown();
    });

    buildDeck();
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
