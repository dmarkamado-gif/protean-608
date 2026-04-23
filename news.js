// Loads news.json (same-origin, CSP-safe) and renders the "Regulatory updates"
// card on the homepage. Fails silently if the JSON is missing or empty —
// the static fallback markup in index.html stays visible.

(function () {
  const HOST = document.getElementById("reg-news");
  if (!HOST) return;

  const LIST = HOST.querySelector(".reg-news-list");
  const META = HOST.querySelector(".reg-news-meta");
  if (!LIST) return;

  function fmtDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T12:00:00Z");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function fmtUpdated(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function badge(type) {
    if (!type) return "";
    const map = {
      "Rule":         "rule",
      "Proposed Rule":"proposed",
      "Notice":       "notice"
    };
    const cls = map[type] || "other";
    return '<span class="reg-news-badge reg-news-badge-' + cls + '">' + type + '</span>';
  }

  fetch("news.json", { cache: "no-cache" })
    .then((r) => r.ok ? r.json() : null)
    .then((data) => {
      if (!data || !Array.isArray(data.items) || data.items.length === 0) return;
      LIST.innerHTML = data.items.slice(0, 5).map((it) =>
        '<li class="reg-news-item">' +
          '<div class="reg-news-top">' +
            '<time datetime="' + (it.date || "") + '">' + fmtDate(it.date) + '</time>' +
            badge(it.type) +
          '</div>' +
          '<a class="reg-news-title" href="' + it.url + '" target="_blank" rel="noopener">' +
            it.title +
          '</a>' +
          (it.abstract ? '<p class="reg-news-abstract">' + it.abstract + '</p>' : '') +
        '</li>'
      ).join("");
      if (META && data.lastUpdated) {
        META.textContent = "Updated " + fmtUpdated(data.lastUpdated) + " · source: " + (data.source || "Federal Register");
      }
    })
    .catch(() => { /* swallow — the static fallback text stays visible */ });
})();
