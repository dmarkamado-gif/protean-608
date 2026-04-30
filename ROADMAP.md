# Protean 608 — implementation roadmap

Strategic direction for the site, derived from a competitive analysis of
the official ESCO Institute EPA 608 page (`escogroup.org/training/epa608.aspx`)
in April 2026. ESCO owns the regulatory moat (issues real certs, writes the
manual, runs proctored exams). Protean's moat is being the modern,
discoverable, mobile-first prep layer that funnels candidates into ESCO's
(or any approved certifier's) exam.

The items below target the gaps ESCO has left open. Implement in priority
order — not all at once. Verify each in the http-server preview before
moving on. Don't break the existing study-page wider-container override or
the progression tab in `practice.html`.

---

## Tier 1 — high-leverage, low-effort

### 1. R-32 / R-454B / A2L hub page
ESCO doesn't lead with the modern refrigerant era; this is the single
biggest 2024–2026 content gap. Create a new `a2l.html` (or a dedicated
section on `study.html`) covering:
- A2L classification (mildly flammable) and what it changes for techs
- R-32, R-454B, R-1234yf — GWP, applications, recovery quirks
- AIM Act HFC phasedown timeline (2022 baseline → 85% reduction by 2036)
- Leak-detection equipment ratings for A2Ls
- Tools/spark-source restrictions
- Cylinder color codes for new refrigerants
Link from `study.html` and the home hero. Add JSON-LD FAQ schema.

### 2. "How long to study" / prep-time calculator
ESCO has no answer to this top-Googled question. Add an interactive widget
on `practice.html` or `index.html`:
- Input: hours/week available, target cert (Core only, Core+Type II, Universal)
- Output: estimated weeks-to-test-ready, suggested daily plan
Use plain JS, store the plan in `localStorage`, surface progress against it.

### 3. Comparison table — ESCO vs Mainstream vs RSES vs HVAC Excellence
ESCO doesn't compare itself to other approved certifiers; you should. On
`resources.html` add a sortable HTML table with columns: certifier, online
proctored y/n, price range, languages, retake policy, card delivery time,
mobile-friendly y/n. Link out to each. Wins the "where to take EPA 608" SERP.

### 4. FAQ schema on every page
Add JSON-LD `FAQPage` structured data to `study.html`, `practice.html`,
`index.html`. Cover: how long to study, how much does it cost, how often do
I recertify, can I take it on my phone, what happens if I fail. Each entry's
`<a>` link should jump to the answer in-page.

### 5. "Updated [Month YYYY]" badge per page
ESCO's manual edition number doesn't help users gauge freshness. Add a small
mono-uppercase "Last reviewed: [Month YYYY]" badge in the header or near
each section heading. Bump it whenever you edit a page.

---

## Tier 2 — conversion + trust

### 6. Pass rate / readiness indicator
Use existing `practice.html` scoring data (`stats.js`) to show a "you're
test-ready when" gate: "Pass 3 consecutive 25-question Core mocks at ≥80%."
Display readiness state per section as a green/amber/red dot in the
progression tab.

### 7. Refund / retake explainer
Small block on `resources.html` explaining ESCO's retake policy (per
section, fee per retake) — info ESCO buries. Cite source.

### 8. Social proof counter
"X technicians have used Protean to prep" on the home hero. Sourced from
localStorage activity (count distinct daily-drill completions) or a static
rolling number you update monthly. Honest about methodology in a tooltip.

### 9. Mobile-first study path callout
ESCO's e-learning isn't marketed for phones. Add a "Study on your phone"
CTA on the home hero deep-linking into `flashcards.html`.

### 10. Certificate verification linker
ESCO has `/training/certifiedepa608.aspx` for cert lookup. Add a small block
on `resources.html`: "Already certified? Verify your card →" linking out.

---

## Tier 3 — content depth (long-tail SEO)

### 11. Per-refrigerant deep pages
One page per major refrigerant: `r-410a.html`, `r-32.html`, `r-454b.html`,
`r-1234yf.html`, `r-22.html`, `r-11.html`, `r-123.html`. Each covers:
classification, GWP, replacement timeline, recovery target pressure, common
applications, exam questions you'll see.

### 12. CFR section explainer pages
Pages for 40 CFR 82 Subpart F broken down: leak repair thresholds (now
10/20/30%), recovery requirements, sales restrictions, cylinder rules.
Plain-English summary + the actual citation. Cross-link from `study.html`.

### 13. Glossary as standalone page
Currently embedded in `study.html`. Promote to `glossary.html` with anchor
links, link every term in study text to its glossary anchor. Schema.org
`DefinedTerm` structured data.

### 14. Failure-mode content
"What candidates miss on the 608" — absolute words, R-22 vs R-410A cylinder
colors, recovery target traps, leak-rate math. Long form, 2000+ words,
citations to CFR.

### 15. Spanish parity
ESCO has Spanish materials. Add `study.html` → `study-es.html` with the same
structure translated, hreflang tags. Use ESCO's Spanish material titles to
validate terminology.

---

## Tier 4 — engagement + retention

### 16. Daily streak email/Telegram opt-in
Skip if no server. Otherwise: the existing `telegram-claude-bot` could send
a daily flashcard or one-question drill to subscribers.

### 17. Spaced repetition layer for flashcards
`flashcards.html` currently shows random cards. Implement SM-2 or Leitner:
track per-card familiarity in localStorage, show due cards first.

### 18. Mock exam timer + lockout
"Sit a full mock exam" already exists. Add a real countdown clock per
section (~90 sec/question), visible timer at top, no answer-checking until
submit. Closer to ESCO's actual test conditions.

### 19. "What changed this year" diff page
Annual reg updates, EPA rule changes, new refrigerant approvals at
`updates.html`. Date-stamped entries. RSS feed.

### 20. PDF cheatsheet generator
`cheatsheet.html` exists. Add a "Download as PDF" button using
`window.print()` with a print-only stylesheet. Single-page, foldable to
wallet size.

---

## Discoverability / technical layer

### 21. Sitemap + robots.txt (✅ shipped; refresh as pages change)
`sitemap.xml` lists every public page with `lastmod`. `robots.txt`
explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
Inverse of ESCO's Cloudflare wall — we want LLMs crawling us.

### 22. Open Graph + Twitter Card images per page
Generate per-page OG images (1200×630). `study.html`, `practice.html`,
each refrigerant page.

### 23. Performance budget
Audit each page with Lighthouse. Target: LCP < 2.5s on 3G, CLS < 0.1, total
page weight < 300KB excluding hero images.

### 24. Accessibility pass
Every interactive element keyboard-reachable, focus-visible styles
consistent, aria-labels on icon-only buttons, semantic landmark roles.

### 25. AI-assistant discoverability test
Verify ChatGPT, Claude, Perplexity surface protean-608 when asked "what's a
good free EPA 608 study site." This is the moat ESCO ceded — own it.

---

## Working agreements

- One item per session, not a batch
- Verify each via the http-server preview (`preview_eval` against DOM)
- Keep the existing visual language: amber bubbles, terracotta accent,
  serif/mono pairing, no emojis
- Add semantic HTML and JSON-LD before adding visual polish
- Don't break the existing study-page wider-container override or the
  progression tab in `practice.html`
- Commit after each completed feature
