(function () {
  const FX = window.FX || { sfx: {}, confetti() {}, toast() {}, shake() {} };
  const Game = window.Game;

  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") el.className = attrs[k];
      else if (k === "html") el.innerHTML = attrs[k];
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), attrs[k]);
      else el.setAttribute(k, attrs[k]);
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach((c) => {
        if (c == null) return;
        if (typeof c === "string") el.appendChild(document.createTextNode(c));
        else el.appendChild(c);
      });
    }
    return el;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const stage = () => document.getElementById("drill-stage");

  function clearStage() { stage().innerHTML = ""; }

  function bar(info) {
    return h("div", { class: "drill-bar" }, [
      h("div", { html: info.left || "" }),
      h("div", { html: info.right || "" })
    ]);
  }

  function chip(text) { return '<span class="chip">' + text + "</span>"; }

  // =========================================================================
  // GAME 1: Pressure Match
  // =========================================================================
  const PM_CHOICES = ["0 psig", "10 in. Hg", "25 mm Hg abs", "4 in. Hg"];
  const PM_ANGLES = { "0 psig": -60, "4 in. Hg": -30, "10 in. Hg": 20, "25 mm Hg abs": 55 };

  const PM_SCENARIOS = [
    { eq: "High-pressure system, charge less than 200 lbs", target: "0 psig",
      why: "Under 200 lb you only need to pull down to atmospheric — 0 psig." },
    { eq: "High-pressure system, charge of 200 lbs or more", target: "10 in. Hg",
      why: "Larger charges need a deeper pull — 10 in. Hg vacuum." },
    { eq: "Very-high-pressure system (R-410A, R-13, R-503)", target: "0 psig",
      why: "Very-high-pressure recovers to 0 psig — same as small high-pressure." },
    { eq: "Low-pressure chiller (R-11, R-123)", target: "25 mm Hg abs",
      why: "Low-pressure systems already run below atmospheric — deep vacuum to 25 mm Hg absolute." },
    { eq: "Small appliance, system-dependent recovery", target: "4 in. Hg",
      why: "Passive recovery uses the unit's compressor — target is 4 in. Hg after two access points." },
    { eq: "Small appliance, self-contained (active) recovery", target: "4 in. Hg",
      why: "Active recovery on small appliances: 4 in. Hg or 90% recovery efficiency." },
    { eq: "Leaking system that can't reach required vacuum", target: "0 psig",
      why: "The leak waiver: if the unit can't hold vacuum, you only need 0 psig before opening." },
    { eq: "Supermarket R-404A rack, 180 lb charge", target: "0 psig",
      why: "High-pressure under 200 lb → 0 psig." },
    { eq: "Residential heat pump (R-410A), 8 lb charge", target: "0 psig",
      why: "Very-high-pressure (R-410A) recovers to 0 psig." },
    { eq: "450 lb R-22 rooftop unit", target: "10 in. Hg",
      why: "R-22 is high-pressure; ≥200 lb means 10 in. Hg vacuum." }
  ];

  const pressureMatch = {
    roundIdx: 0, correct: 0, queue: [],
    mount() {
      this.roundIdx = 0; this.correct = 0;
      this.queue = shuffle(PM_SCENARIOS).slice(0, 10);
      this.renderRound();
    },
    renderRound() {
      clearStage();
      if (this.roundIdx >= this.queue.length) return this.finish();
      const s = this.queue[this.roundIdx];
      const choices = shuffle(PM_CHOICES);

      const gauge = h("div", { html:
        '<svg class="pm-gauge" viewBox="0 0 200 200" aria-hidden="true">' +
          '<circle cx="100" cy="100" r="92" fill="#3a2f22" stroke="#1d1810" stroke-width="2"/>' +
          '<circle cx="100" cy="100" r="82" fill="#fffaee" stroke="#1d1810" stroke-width="1.5"/>' +
          '<path d="M 35 130 A 72 72 0 0 1 75 50" stroke="#5e7a3a" stroke-width="7" fill="none"/>' +
          '<path d="M 75 50 A 72 72 0 0 1 135 55" stroke="#d9a21b" stroke-width="7" fill="none"/>' +
          '<path d="M 135 55 A 72 72 0 0 1 165 130" stroke="#a5431b" stroke-width="7" fill="none"/>' +
          '<line class="needle" x1="100" y1="100" x2="100" y2="40" stroke="#a5431b" stroke-width="3" stroke-linecap="round"/>' +
          '<circle cx="100" cy="100" r="7" fill="#1d1810"/>' +
          '<circle cx="100" cy="100" r="3" fill="#a5431b"/>' +
        '</svg>'
      });

      const choiceEls = choices.map((c) => h("button", {
        class: "pm-choice",
        "data-c": c,
        onclick: () => this.answer(c, choiceEls, s)
      }, c));

      stage().appendChild(bar({
        left: "Round " + (this.roundIdx + 1) + " of " + this.queue.length,
        right: chip("✔ " + this.correct) + chip("XP " + Game.get().xp)
      }));
      stage().appendChild(gauge);
      stage().appendChild(h("div", { class: "pm-scenario" }, [
        h("div", { class: "eq-label" }, "Equipment"),
        h("div", { class: "eq-text" }, s.eq),
        h("div", { class: "eq-label", style: "margin-top:10px" }, "Recovery target?")
      ]));
      const grid = h("div", { class: "pm-choices" });
      choiceEls.forEach((b) => grid.appendChild(b));
      stage().appendChild(grid);
    },
    answer(picked, choiceEls, s) {
      const correct = picked === s.target;
      choiceEls.forEach((b) => {
        const c = b.getAttribute("data-c");
        b.disabled = true;
        if (c === s.target) b.classList.add("show-answer");
        if (c === picked && !correct) b.classList.add("wrong");
      });
      const needle = document.querySelector(".pm-gauge .needle");
      if (needle) {
        needle.style.transform = "rotate(" + PM_ANGLES[s.target] + "deg)";
      }
      if (correct) {
        this.correct++;
        Game.recordAnswer(true, "Core");
        (FX.sfx.correct || function(){})();
      } else {
        Game.recordAnswer(false, "Core");
        (FX.sfx.wrong || function(){})();
      }
      stage().appendChild(h("div", { class: "pm-explanation", html:
        (correct ? "<strong>Correct.</strong> " : "<strong>Not quite.</strong> ") + s.why
      }));
      const nextBtn = h("button", { class: "btn primary", onclick: () => {
        this.roundIdx++; this.renderRound();
      } }, this.roundIdx + 1 >= this.queue.length ? "See results" : "Next");
      stage().appendChild(h("div", { class: "pm-next" }, nextBtn));
    },
    finish() {
      clearStage();
      const perfect = this.correct === this.queue.length;
      const bonus = perfect ? 50 : 20;
      if (perfect) {
        FX.confetti && FX.confetti();
        (FX.sfx.finish || function(){})();
      }
      Game.addXP(bonus, "drill-pressure");
      stage().appendChild(h("div", { class: "drill-result" }, [
        h("h3", null, perfect ? "Flawless." : (this.correct >= 7 ? "Solid work." : "Keep drilling.")),
        h("div", { class: "score-big" }, this.correct + " / " + this.queue.length),
        h("div", { class: "score-sub" }, perfect ? "+" + bonus + " XP · perfect run" : "+" + bonus + " XP"),
        h("div", { class: "pm-next" }, [
          h("button", { class: "btn primary", onclick: () => pressureMatch.mount() }, "Play again"),
          document.createTextNode(" "),
          h("button", { class: "btn", onclick: () => clearStage() }, "Back to practice")
        ])
      ]));
    }
  };

  // =========================================================================
  // GAME 2: Timeline Order
  // =========================================================================
  const TL_EVENTS = [
    { year: 1987, event: "Montreal Protocol signed" },
    { year: 1992, event: "CFC/HCFC venting banned" },
    { year: 1993, event: "Recovery-equipment certification required" },
    { year: 1995, event: "HFC venting banned" },
    { year: 2020, event: "R-22 production ban + AIM Act" }
  ];

  const timelineDrill = {
    sorted: [], pool: [], placed: [], wrongCount: 0,
    mount() {
      this.sorted = TL_EVENTS.slice().sort((a, b) => a.year - b.year);
      this.pool = shuffle(TL_EVENTS);
      this.placed = [];
      this.wrongCount = 0;
      this.render();
    },
    render() {
      clearStage();
      stage().appendChild(bar({
        left: "Place events earliest → latest",
        right: chip("placed " + this.placed.length + "/" + this.sorted.length) +
               chip("misses " + this.wrongCount)
      }));
      stage().appendChild(h("p", { class: "tl-prompt" },
        "Tap the event you think comes next in chronological order."));

      const poolEl = h("div", { class: "tl-pool" });
      this.pool.forEach((ev) => {
        const placed = this.placed.some((p) => p.year === ev.year);
        const btn = h("button", {
          class: "tl-tile" + (placed ? " placed" : ""),
          "data-year": ev.year,
          onclick: () => !placed && this.pick(ev, btn)
        }, [
          h("span", { class: "year" }, String(ev.year)),
          h("span", { class: "event" }, ev.event)
        ]);
        if (placed) btn.disabled = true;
        poolEl.appendChild(btn);
      });
      stage().appendChild(poolEl);

      const placedEl = h("div", { class: "tl-placed" });
      if (this.placed.length === 0) {
        placedEl.appendChild(h("span", {
          style: "font-family: var(--mono); color: var(--muted); font-size: 0.8rem;"
        }, " your order will build here "));
      }
      this.placed.forEach((ev) => {
        placedEl.appendChild(h("span", { class: "tl-tile placed", style: "min-width: 110px;" }, [
          h("span", { class: "year" }, String(ev.year)),
          h("span", { class: "event" }, ev.event)
        ]));
      });
      stage().appendChild(placedEl);
    },
    pick(ev, btn) {
      const expected = this.sorted[this.placed.length];
      if (ev.year === expected.year) {
        this.placed.push(ev);
        (FX.sfx.correct || function(){})();
        if (this.placed.length === this.sorted.length) this.finish();
        else this.render();
      } else {
        btn.classList.add("wrong");
        this.wrongCount++;
        (FX.sfx.wrong || function(){})();
        setTimeout(() => btn.classList.remove("wrong"), 450);
      }
    },
    finish() {
      this.render();
      setTimeout(() => {
        clearStage();
        const flawless = this.wrongCount === 0;
        const bonus = flawless ? 40 : 15;
        if (flawless) {
          FX.confetti && FX.confetti();
          (FX.sfx.finish || function(){})();
        }
        Game.addXP(bonus, "drill-timeline");
        stage().appendChild(h("div", { class: "drill-result" }, [
          h("h3", null, flawless ? "Perfect order." : "You got there."),
          h("div", { class: "score-big" }, this.sorted.length + " / " + this.sorted.length),
          h("div", { class: "score-sub" },
            flawless ? "+" + bonus + " XP · zero misses" : this.wrongCount + " misses · +" + bonus + " XP"),
          h("div", { class: "pm-next" }, [
            h("button", { class: "btn primary", onclick: () => timelineDrill.mount() }, "Play again"),
            document.createTextNode(" "),
            h("button", { class: "btn", onclick: () => clearStage() }, "Back to practice")
          ])
        ]));
      }, 600);
    }
  };

  // =========================================================================
  // GAME 3: Refrigerant Sort
  // =========================================================================
  const RS_BUCKETS = [
    { id: "CFC",  name: "CFC",  desc: "Chlorofluorocarbons" },
    { id: "HCFC", name: "HCFC", desc: "Hydrochlorofluoro." },
    { id: "HFC",  name: "HFC",  desc: "Hydrofluorocarbons" },
    { id: "HFO",  name: "HFO",  desc: "Hydrofluoroolefins" }
  ];
  const RS_REFS = [
    { name: "R-11",     cat: "CFC"  },
    { name: "R-12",     cat: "CFC"  },
    { name: "R-502",    cat: "CFC"  },
    { name: "R-22",     cat: "HCFC" },
    { name: "R-123",    cat: "HCFC" },
    { name: "R-134a",   cat: "HFC"  },
    { name: "R-410A",   cat: "HFC"  },
    { name: "R-404A",   cat: "HFC"  },
    { name: "R-1234yf", cat: "HFO"  },
    { name: "R-1234ze", cat: "HFO"  }
  ];

  const refrigerantSort = {
    pool: [], placed: {}, selected: null, wrongCount: 0,
    mount() {
      this.pool = shuffle(RS_REFS);
      this.placed = {}; RS_BUCKETS.forEach((b) => this.placed[b.id] = []);
      this.selected = null;
      this.wrongCount = 0;
      this.render();
    },
    render() {
      clearStage();
      const remaining = this.pool.filter((r) => !this.isPlaced(r));
      stage().appendChild(bar({
        left: "Tap a refrigerant, then its class",
        right: chip("placed " + (this.pool.length - remaining.length) + "/" + this.pool.length) +
               chip("misses " + this.wrongCount)
      }));

      const poolEl = h("div", { class: "rs-pool" });
      if (remaining.length === 0) {
        poolEl.appendChild(h("span", {
          style: "font-family: var(--mono); color: var(--muted); font-size: 0.85rem;"
        }, "all placed — see results"));
      }
      remaining.forEach((r) => {
        const tile = h("button", {
          class: "rs-tile" + (this.selected && this.selected.name === r.name ? " selected" : ""),
          onclick: () => this.select(r)
        }, r.name);
        poolEl.appendChild(tile);
      });
      stage().appendChild(poolEl);

      const buckets = h("div", { class: "rs-buckets" });
      RS_BUCKETS.forEach((b) => {
        const el = h("div", {
          class: "rs-bucket" + (this.selected ? " active" : ""),
          onclick: () => this.drop(b)
        }, [
          h("h4", null, b.name),
          h("div", { class: "desc" }, b.desc),
          h("div", { class: "slots" }, this.placed[b.id].map((r) =>
            h("span", { class: "slot" }, r.name)
          ))
        ]);
        buckets.appendChild(el);
      });
      stage().appendChild(buckets);

      if (remaining.length === 0) {
        setTimeout(() => this.finish(), 600);
      }
    },
    select(r) {
      this.selected = r;
      this.render();
    },
    isPlaced(r) {
      return Object.values(this.placed).some((arr) => arr.some((x) => x.name === r.name));
    },
    drop(bucket) {
      if (!this.selected) return;
      if (this.selected.cat === bucket.id) {
        this.placed[bucket.id].push(this.selected);
        this.selected = null;
        (FX.sfx.correct || function(){})();
        this.render();
      } else {
        this.wrongCount++;
        const tile = [].find.call(document.querySelectorAll(".rs-tile.selected"), () => true);
        if (tile) {
          tile.classList.add("wrong");
          setTimeout(() => tile && tile.classList.remove("wrong"), 400);
        }
        (FX.sfx.wrong || function(){})();
      }
    },
    finish() {
      clearStage();
      const flawless = this.wrongCount === 0;
      const bonus = flawless ? 45 : 20;
      if (flawless) {
        FX.confetti && FX.confetti();
        (FX.sfx.finish || function(){})();
      }
      Game.addXP(bonus, "drill-sort");
      stage().appendChild(h("div", { class: "drill-result" }, [
        h("h3", null, flawless ? "Every one, no misses." : "Sorted."),
        h("div", { class: "score-big" }, this.pool.length + " placed"),
        h("div", { class: "score-sub" },
          flawless ? "+" + bonus + " XP · perfect sort" : this.wrongCount + " misses · +" + bonus + " XP"),
        h("div", { class: "pm-next" }, [
          h("button", { class: "btn primary", onclick: () => refrigerantSort.mount() }, "Play again"),
          document.createTextNode(" "),
          h("button", { class: "btn", onclick: () => clearStage() }, "Back to practice")
        ])
      ]));
    }
  };

  window.Drills = { pressureMatch, timelineDrill, refrigerantSort };
})();
