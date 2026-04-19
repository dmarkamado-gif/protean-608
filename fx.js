(function () {
  const MUTE_KEY = "epa608_muted";
  let muted = false;
  try { muted = localStorage.getItem(MUTE_KEY) === "1"; } catch (e) {}

  let audioCtx;
  function ctx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) {}
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(freq, dur, type, vol, delay) {
    if (muted) return;
    const c = ctx();
    if (!c) return;
    const start = c.currentTime + (delay || 0);
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol || 0.18, start + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  const SFX = {
    correct() {
      tone(523, 0.09, "sine",  0.2);
      tone(784, 0.16, "sine",  0.2, 0.07);
    },
    wrong() {
      tone(196, 0.15, "square", 0.13);
      tone(165, 0.18, "square", 0.12, 0.08);
    },
    streak() {
      tone(880, 0.08, "triangle", 0.18);
      tone(1175, 0.12, "triangle", 0.18, 0.06);
    },
    levelup() {
      tone(523, 0.1, "sine", 0.2);
      tone(659, 0.1, "sine", 0.2, 0.1);
      tone(784, 0.1, "sine", 0.2, 0.2);
      tone(1047, 0.25, "sine", 0.25, 0.3);
    },
    tick() { tone(900, 0.03, "square", 0.08); },
    tickLow() { tone(500, 0.03, "square", 0.08); },
    finish() {
      tone(523, 0.12, "sine", 0.2);
      tone(784, 0.2, "sine", 0.22, 0.1);
    }
  };

  function isMuted() { return muted; }
  function setMuted(m) {
    muted = !!m;
    try { localStorage.setItem(MUTE_KEY, muted ? "1" : "0"); } catch (e) {}
  }

  // ---- Confetti ----
  function confetti(options) {
    const opts = options || {};
    const intensity = opts.intensity || 1;
    const originX = opts.x != null ? opts.x : window.innerWidth / 2;
    const originY = opts.y != null ? opts.y : window.innerHeight / 2;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const c = canvas.getContext("2d");

    const palette = ["#3ea6ff", "#7ee3c0", "#ffb454", "#ff6b6b", "#5ee07a", "#c084fc", "#ffffff"];
    const count = Math.min(260, Math.floor(50 * intensity));
    const parts = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 5;
      parts.push({
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        w: Math.random() * 5 + 4,
        h: Math.random() * 8 + 4,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        life: 1
      });
    }

    let frame = 0;
    function step() {
      frame++;
      c.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      for (const p of parts) {
        p.vx *= 0.99;
        p.vy = p.vy * 0.99 + 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.008;
        if (p.life <= 0 || p.y > canvas.height + 80) continue;
        alive++;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.globalAlpha = Math.max(0, p.life);
        c.fillStyle = p.color;
        c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        c.restore();
      }
      if (alive > 0 && frame < 360) requestAnimationFrame(step);
      else canvas.remove();
    }
    requestAnimationFrame(step);
  }

  // ---- Toast ----
  function toast(title, subtitle, kind) {
    const el = document.createElement("div");
    el.className = "toast " + (kind ? "toast-" + kind : "");
    el.innerHTML =
      '<div class="toast-title">' + title + "</div>" +
      (subtitle ? '<div class="toast-sub">' + subtitle + "</div>" : "");
    let host = document.getElementById("toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "toast-host";
      document.body.appendChild(host);
    }
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 350);
    }, 3400);
  }

  // ---- Shake element ----
  function shake(el) {
    if (!el) return;
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  }

  window.FX = { sfx: SFX, confetti, toast, shake, isMuted, setMuted };
})();
