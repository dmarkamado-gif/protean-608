(function () {
  function $(sel, root) { return (root || document).querySelector(sel); }

  function soundIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
  }
  function muteIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  }

  function levelChipMarkup() {
    const p = window.Game.progressInLevel();
    const pct = p.needed ? Math.min(100, Math.round((p.current / p.needed) * 100)) : 0;
    const circ = 2 * Math.PI * 16;
    const dash = (pct / 100) * circ;
    const badgeCount = window.Game.get().badges.length;
    return (
      '<a href="index.html#progress" class="level-chip" id="level-chip" title="Level ' + p.level + ' · ' + p.current + '/' + p.needed + ' XP · ' + badgeCount + ' badges">' +
        '<svg class="level-ring" viewBox="0 0 40 40" aria-hidden="true">' +
          '<circle cx="20" cy="20" r="16" fill="none" stroke="rgba(165,67,27,0.18)" stroke-width="3"/>' +
          '<circle cx="20" cy="20" r="16" fill="none" stroke="url(#lvlGrad)" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + dash.toFixed(2) + ' ' + circ.toFixed(2) + '" transform="rotate(-90 20 20)"/>' +
          '<defs><linearGradient id="lvlGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9751e"/><stop offset="1" stop-color="#a5431b"/></linearGradient></defs>' +
        '</svg>' +
        '<span class="level-num">' + p.level + '</span>' +
      '</a>'
    );
  }

  function render() {
    const host = $("#stats-bar");
    if (!host) return;
    host.innerHTML =
      levelChipMarkup() +
      '<button class="icon-btn mute-btn" id="mute-btn" title="Toggle sound" aria-label="Toggle sound">' +
        (window.FX && window.FX.isMuted() ? muteIcon() : soundIcon()) +
      '</button>';
    const btn = $("#mute-btn");
    if (btn) btn.addEventListener("click", () => {
      window.FX.setMuted(!window.FX.isMuted());
      render();
    });
    ensureToastHost();
  }

  function ensureToastHost() {
    if (!document.getElementById("toast-host")) {
      const h = document.createElement("div");
      h.id = "toast-host";
      h.className = "toast-host";
      document.body.appendChild(h);
    }
  }

  function icon(name) {
    const icons = {
      spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></svg>',
      flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5c0-2.5 2-3 2-6.5 0-2 4 2 4 6.5a3.5 3.5 0 0 1-7 0z"/><path d="M12 22a7 7 0 0 0 7-7c0-2.5-1-4.5-2-6-1-1.5-2-2.5-2-4 0 0-1.5 1-3 2.5-2 2-2.5 3-3.5 4.5-1 1.5-2.5 3-2.5 5.5a6 6 0 0 0 6 5z"/></svg>',
      gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 13l5-3"/><path d="M12 5V3"/><path d="M4.5 7.5L6 9"/><path d="M19.5 7.5L18 9"/></svg>',
      target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 4h3v3a3 3 0 0 1-3 3"/><path d="M7 4H4v3a3 3 0 0 0 3 3"/></svg>',
      bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="13" height="16" rx="2"/><path d="M8 5V3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2"/></svg>',
      shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20"/><path d="M3 7l4 6 5-8 5 8 4-6v11H3V7z"/></svg>',
      star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 9.5 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.5 9 9 12 2"/></svg>'
    };
    return icons[name] || icons.spark;
  }

  function toast({ title, body, icon: iconName, kind }) {
    ensureToastHost();
    const host = document.getElementById("toast-host");
    const el = document.createElement("div");
    el.className = "toast toast-" + (kind || "default");
    el.innerHTML =
      '<div class="toast-ic">' + icon(iconName || "spark") + '</div>' +
      '<div class="toast-body"><div class="toast-title">' + title + '</div>' +
        (body ? '<div class="toast-sub">' + body + '</div>' : '') +
      '</div>';
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("in"));
    setTimeout(() => {
      el.classList.remove("in");
      el.classList.add("out");
      setTimeout(() => el.remove(), 400);
    }, 3600);
  }

  function renderPanel() {
    const host = document.getElementById("progress-panel");
    if (!host) return;
    const g = window.Game;
    const s = g.get();
    const p = g.progressInLevel();
    const circ = 2 * Math.PI * 40;
    const pct = p.needed ? Math.min(100, (p.current / p.needed) * 100) : 0;
    const dash = (pct / 100) * circ;

    const ringFg = document.getElementById("pp-ring-fg");
    if (ringFg) ringFg.setAttribute("stroke-dasharray", dash.toFixed(2) + " " + circ.toFixed(2));
    setText("pp-level", p.level);
    setText("pp-xp-current", p.current);
    setText("pp-xp-next", p.needed);
    setText("pp-total-xp", s.xp);
    setText("pp-questions", s.questionsAnswered);
    const acc = s.questionsAnswered ? Math.round((s.questionsCorrect / s.questionsAnswered) * 100) + "%" : "—";
    setText("pp-accuracy", acc);
    setText("pp-streak", s.bestStreak);
    setText("pp-quizzes", s.quizzesCompleted);
    setText("pp-lightning", s.lightningBest);

    const barFill = document.getElementById("pp-bar-fill");
    if (barFill) barFill.style.width = pct.toFixed(1) + "%";

    const grid = document.getElementById("badge-grid");
    if (grid) {
      const badges = g.getBadges();
      const earned = badges.filter(b => b.earned).length;
      setText("pp-earned", earned);
      setText("pp-total", badges.length);
      grid.innerHTML = badges.map(b =>
        '<div class="badge-card ' + (b.earned ? "earned" : "locked") + '" title="' + (b.earned ? b.name + ": " + b.desc : "Locked — " + b.desc) + '">' +
          '<div class="badge-ic">' + icon(b.icon) + '</div>' +
          '<div class="badge-name">' + b.name + '</div>' +
        '</div>'
      ).join("");
    }

    const resetBtn = document.getElementById("pp-reset");
    if (resetBtn && !resetBtn._bound) {
      resetBtn._bound = true;
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset all progress? This clears XP, streaks, badges, and known flashcards.")) {
          g.resetProgress();
        }
      });
    }
  }
  function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }

  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) return;
    const selector = "section.block, .cylinder-card, .modern-card, .badge-card, .about-card, .hero-card";
    const nodes = document.querySelectorAll(selector);
    let i = 0;
    nodes.forEach((el) => {
      el.classList.add("scroll-reveal");
      el.style.setProperty("--reveal-delay", (i * 70) + "ms");
      i = (i + 1) % 6;
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach((el) => io.observe(el));
  }

  function initHeaderScroll() {
    const header = document.querySelector("header.site");
    if (!header) return;
    const update = () => {
      if (window.scrollY > 6) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initNavActive() {
    const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("nav.primary a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === here || (here === "" && href === "index.html")) {
        a.classList.add("is-active");
      }
    });
  }

  function initBadgeStagger() {
    const host = document.getElementById("badge-grid");
    if (!host) return;
    const apply = () => {
      const cards = host.querySelectorAll(".badge-card");
      cards.forEach((c, idx) => c.style.setProperty("--i", idx));
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(host, { childList: true });
  }

  function initCountUp() {
    const ids = ["pp-total-xp", "pp-questions", "pp-streak", "pp-quizzes", "pp-lightning", "pp-earned"];
    let last = {};
    const flash = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const val = el.textContent;
        if (last[id] !== undefined && last[id] !== val) {
          el.classList.remove("count-flash");
          void el.offsetWidth;
          el.classList.add("count-flash");
        }
        last[id] = val;
      });
    };
    flash();
    if (window.Game && window.Game.on) {
      window.Game.on(() => setTimeout(flash, 0));
    }
  }

  function init() {
    render();
    renderPanel();
    initScrollReveal();
    initHeaderScroll();
    initNavActive();
    initBadgeStagger();
    initCountUp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  if (window.Game && window.Game.on) {
    window.Game.on((evt, data) => {
      if (evt === "xp") {
        render();
        renderPanel();
      } else if (evt === "levelup") {
        toast({ title: "Level " + data.level + "!", body: "Keep at it.", icon: "star", kind: "levelup" });
        if (window.FX && window.FX.levelup) window.FX.levelup();
        renderPanel();
      } else if (evt === "badge") {
        toast({ title: "Badge earned: " + data.name, body: data.desc, icon: data.icon, kind: "badge" });
        if (window.FX && window.FX.correct) window.FX.correct();
        renderPanel();
      } else if (evt === "reset") {
        render();
        renderPanel();
      } else if (evt === "answer" || evt === "quiz" || evt === "lightning" || evt === "daily" || evt === "flashcard") {
        renderPanel();
      }
    });
  }

  window.Stats = { render, renderPanel, toast };
})();
