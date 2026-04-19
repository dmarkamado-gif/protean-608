(function () {
  function $(sel, root) { return (root || document).querySelector(sel); }

  function render() {
    const host = $("#stats-bar");
    if (!host) return;
    host.innerHTML =
      '<button class="icon-btn mute-btn" id="mute-btn" title="Toggle sound" aria-label="Toggle sound">' +
        (window.FX && window.FX.isMuted() ? muteIcon() : soundIcon()) +
      '</button>';
    const btn = $("#mute-btn");
    if (btn) btn.addEventListener("click", () => {
      window.FX.setMuted(!window.FX.isMuted());
      render();
    });
  }

  function soundIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
  }
  function muteIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
