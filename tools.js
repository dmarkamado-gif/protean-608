/* HVAC Field Tools — PT chart, superheat/subcool calc, unit converter.
 * Saturation pressure tables are approximate (typical training-chart values).
 * Units: pressure in psig, temperature in °F.
 */
window.HVACTools = (function () {
  "use strict";

  // Saturation pressure (psig) at 10 °F increments from -40 to 150 °F.
  // These are reference values — accurate within roughly ±1 psi for use as a study aid.
  const PT = {
    "R-22":    { "-40":0.5,  "-30":4.9,  "-20":10.1, "-10":16.5, "0":24.0,  "10":32.8, "20":43.0, "30":54.9, "40":68.5, "50":84.0, "60":101.6,"70":121.4,"80":143.6,"90":168.4,"100":195.9,"110":226.4,"120":260.0,"130":296.8,"140":337.3,"150":381.5 },
    "R-410A":  { "-40":10.8, "-30":18.9, "-20":28.3, "-10":39.7, "0":53.3,  "10":69.4, "20":87.7, "30":109.2,"40":133.8,"50":161.9,"60":194.0,"70":230.7,"80":272.5,"90":319.8,"100":373.4,"110":433.9,"120":502.1,"130":579.0,"140":665.4,"150":762.6 },
    "R-32":    { "-40":13.1, "-30":22.2, "-20":32.9, "-10":45.7, "0":60.7,  "10":78.2, "20":98.4, "30":121.7,"40":148.3,"50":178.6,"60":212.9,"70":251.6,"80":295.0,"90":343.5,"100":397.5,"110":457.6,"120":524.4,"130":598.3,"140":680.0,"150":770.2 },
    "R-454B":  { "-40":11.7, "-30":20.4, "-20":30.6, "-10":42.7, "0":56.9,  "10":73.6, "20":92.9, "30":115.3,"40":140.8,"50":170.0,"60":203.1,"70":240.4,"80":282.4,"90":329.4,"100":381.8,"110":440.0,"120":504.4,"130":575.4,"140":653.5,"150":739.1 },
    "R-134a":  { "-40":-7.2, "-30":-3.5, "-20":0.6,  "-10":6.6,  "0":12.3,  "10":18.7, "20":26.0, "30":34.5, "40":44.4, "50":55.7, "60":68.4, "70":82.7, "80":98.8, "90":116.7,"100":136.7,"110":158.8,"120":183.3,"130":210.3,"140":240.1,"150":272.8 },
    "R-1234yf":{ "-40":-6.5, "-30":-2.5, "-20":1.8,  "-10":7.5,  "0":14.0,  "10":21.4, "20":29.9, "30":39.5, "40":50.5, "50":63.0, "60":77.1, "70":93.0, "80":110.8,"90":130.7,"100":152.9,"110":177.6,"120":205.0,"130":235.2,"140":268.6,"150":305.4 },
    "R-404A":  { "-40":4.3,  "-30":12.4, "-20":21.9, "-10":33.0, "0":46.0,  "10":61.0, "20":78.3, "30":98.0, "40":120.4,"50":145.6,"60":173.9,"70":205.5,"80":240.7,"90":279.7,"100":322.9,"110":370.6,"120":423.1,"130":480.9,"140":544.5,"150":614.5 },
    "R-123":   { "-40":-14.1,"-30":-13.6,"-20":-12.9,"-10":-11.9,"0":-10.6, "10":-8.8, "20":-6.5, "30":-3.6, "40":0.1,  "50":4.8,  "60":10.6, "70":17.7, "80":26.3, "90":36.5, "100":48.5, "110":62.5, "120":78.7, "130":97.3, "140":118.4,"150":142.4 }
  };

  // Refrigerant metadata for the spec table.
  const REFDATA = [
    { id:"R-22",     kind:"HCFC", gwp:1810, odp:0.055, ashrae:"A1", color:"Light green",  critT:"205 °F", critP:"721 psia", glide:"0 °F",   status:"Phased out (2020)", apps:"Legacy residential & light commercial A/C" },
    { id:"R-410A",   kind:"HFC",  gwp:2088, odp:0,     ashrae:"A1", color:"Rose",          critT:"158 °F", critP:"714 psia", glide:"<0.3 °F", status:"Phasing down",      apps:"Residential A/C & heat pumps (legacy new installs)" },
    { id:"R-32",     kind:"HFC",  gwp:675,  odp:0,     ashrae:"A2L",color:"Off-white",     critT:"172 °F", critP:"839 psia", glide:"0 °F",   status:"Current",           apps:"Mini-splits & residential A/C" },
    { id:"R-454B",   kind:"HFO blend", gwp:466, odp:0, ashrae:"A2L",color:"Horizon blue",  critT:"172 °F", critP:"773 psia", glide:"~1.5 °F", status:"Current",          apps:"Residential & light commercial A/C" },
    { id:"R-134a",   kind:"HFC",  gwp:1430, odp:0,     ashrae:"A1", color:"Light sky blue",critT:"214 °F", critP:"589 psia", glide:"0 °F",   status:"Phasing down",      apps:"MVAC (legacy), chillers, refrigeration" },
    { id:"R-1234yf", kind:"HFO",  gwp:4,    odp:0,     ashrae:"A2L",color:"White/red band",critT:"202 °F", critP:"489 psia", glide:"0 °F",   status:"Current",           apps:"Automotive A/C (MVAC)" },
    { id:"R-404A",   kind:"HFC",  gwp:3922, odp:0,     ashrae:"A1", color:"Orange",        critT:"162 °F", critP:"541 psia", glide:"~0.9 °F", status:"Phasing down",      apps:"Commercial low- & med-temp refrigeration" },
    { id:"R-123",    kind:"HCFC", gwp:79,   odp:0.02,  ashrae:"B1", color:"Light gray",    critT:"362 °F", critP:"531 psia", glide:"0 °F",   status:"Limited service",   apps:"Low-pressure centrifugal chillers" }
  ];

  // Linear-interpolate saturated pressure for a given temperature.
  function satPressure(refr, tempF) {
    const table = PT[refr];
    if (!table) return null;
    const t = Number(tempF);
    if (!isFinite(t)) return null;
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    if (t <= keys[0]) return table[keys[0]];
    if (t >= keys[keys.length - 1]) return table[keys[keys.length - 1]];
    for (let i = 0; i < keys.length - 1; i++) {
      const lo = keys[i], hi = keys[i + 1];
      if (t >= lo && t <= hi) {
        const f = (t - lo) / (hi - lo);
        return table[lo] + f * (table[hi] - table[lo]);
      }
    }
    return null;
  }

  // Reverse lookup: given pressure, find saturated temperature.
  function satTemp(refr, pressurePsig) {
    const table = PT[refr];
    if (!table) return null;
    const p = Number(pressurePsig);
    if (!isFinite(p)) return null;
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    const lo = table[keys[0]];
    const hi = table[keys[keys.length - 1]];
    if (p <= lo) return keys[0];
    if (p >= hi) return keys[keys.length - 1];
    for (let i = 0; i < keys.length - 1; i++) {
      const pLo = table[keys[i]], pHi = table[keys[i + 1]];
      if (p >= pLo && p <= pHi) {
        const f = (p - pLo) / (pHi - pLo);
        return keys[i] + f * (keys[i + 1] - keys[i]);
      }
    }
    return null;
  }

  function fmt(n, digits) {
    if (n == null || !isFinite(n)) return "—";
    return Number(n).toFixed(digits == null ? 1 : digits);
  }

  // ---------- PT Chart Widget ----------
  function mountPTChart(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;
    const refrs = Object.keys(PT);
    host.innerHTML = `
      <div class="tool-panel">
        <div class="tool-panel-head">
          <span class="tool-tag">INSTRUMENT</span>
          <h3>PT Chart Lookup</h3>
          <p class="tool-sub">Saturation pressure at any coil temperature. Linear-interpolated from standard reference data.</p>
        </div>
        <div class="pt-body">
          <div class="pt-controls">
            <label>Refrigerant
              <select id="pt-refr">${refrs.map(r => `<option value="${r}">${r}</option>`).join("")}</select>
            </label>
            <label>Temperature (°F)
              <input type="range" id="pt-temp" min="-40" max="150" step="1" value="40">
            </label>
            <div class="pt-temp-row">
              <input type="number" id="pt-temp-num" min="-40" max="150" step="1" value="40">
              <span class="pt-unit">°F</span>
            </div>
          </div>
          <div class="pt-readout">
            <div class="pt-gauge">
              <svg viewBox="0 0 180 180" aria-hidden="true">
                <defs>
                  <linearGradient id="gaugeArc" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#2f6dad"/>
                    <stop offset="0.5" stop-color="#e3d3ae"/>
                    <stop offset="1" stop-color="#b64220"/>
                  </linearGradient>
                </defs>
                <circle cx="90" cy="90" r="78" fill="#f6f9fc" stroke="#1d1810" stroke-width="2"/>
                <circle cx="90" cy="90" r="72" fill="none" stroke="#cfd8e0" stroke-width="1"/>
                <path d="M 30 120 A 72 72 0 1 1 150 120" fill="none" stroke="url(#gaugeArc)" stroke-width="5" stroke-linecap="round"/>
                <g id="pt-ticks" stroke="#3a2f22" stroke-width="1.3"></g>
                <g id="pt-labels" font-family="ui-monospace, Menlo, monospace" font-size="7" fill="#1d1810" text-anchor="middle"></g>
                <line id="pt-needle" x1="90" y1="90" x2="90" y2="30" stroke="#b64220" stroke-width="2.8" stroke-linecap="round" transform="rotate(-135 90 90)"/>
                <circle cx="90" cy="90" r="5" fill="#1d1810"/>
                <circle cx="90" cy="90" r="2" fill="#e3d3ae"/>
                <text x="90" y="150" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="7" fill="#3a2f22">PSIG</text>
              </svg>
            </div>
            <div class="pt-digital">
              <div class="pt-line"><span class="pt-k">PRESSURE</span><span class="pt-v" id="pt-p">—</span><span class="pt-u">psig</span></div>
              <div class="pt-line"><span class="pt-k">SAT. TEMP</span><span class="pt-v" id="pt-t">—</span><span class="pt-u">°F</span></div>
              <div class="pt-line"><span class="pt-k">ABS. PRESS</span><span class="pt-v" id="pt-pa">—</span><span class="pt-u">psia</span></div>
              <div class="pt-line"><span class="pt-k">kPa (abs)</span><span class="pt-v" id="pt-kpa">—</span><span class="pt-u">kPa</span></div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Gauge ticks — 0..500 psig scale, 270° sweep.
    const ticks = document.getElementById("pt-ticks");
    const labels = document.getElementById("pt-labels");
    const SWEEP = 270, START = -135;
    for (let i = 0; i <= 10; i++) {
      const a = START + (SWEEP * i) / 10;
      const rad = (a - 90) * Math.PI / 180;
      const x1 = 90 + 68 * Math.cos(rad);
      const y1 = 90 + 68 * Math.sin(rad);
      const x2 = 90 + 76 * Math.cos(rad);
      const y2 = 90 + 76 * Math.sin(rad);
      const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
      tick.setAttribute("x1", x1); tick.setAttribute("y1", y1);
      tick.setAttribute("x2", x2); tick.setAttribute("y2", y2);
      ticks.appendChild(tick);
      if (i % 2 === 0) {
        const lx = 90 + 60 * Math.cos(rad);
        const ly = 90 + 60 * Math.sin(rad) + 2.5;
        const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.setAttribute("x", lx); t.setAttribute("y", ly);
        t.textContent = String(i * 50);
        labels.appendChild(t);
      }
    }

    const refrSel = document.getElementById("pt-refr");
    const tempRange = document.getElementById("pt-temp");
    const tempNum = document.getElementById("pt-temp-num");
    const needle = document.getElementById("pt-needle");
    const pOut = document.getElementById("pt-p");
    const tOut = document.getElementById("pt-t");
    const paOut = document.getElementById("pt-pa");
    const kpaOut = document.getElementById("pt-kpa");

    function recalc() {
      const refr = refrSel.value;
      const t = Number(tempNum.value);
      const p = satPressure(refr, t);
      if (p == null) return;
      const clamped = Math.max(0, Math.min(500, p));
      const angle = START + (SWEEP * clamped) / 500;
      needle.setAttribute("transform", `rotate(${angle} 90 90)`);
      pOut.textContent = fmt(p, 1);
      tOut.textContent = fmt(t, 0);
      paOut.textContent = fmt(p + 14.7, 1);
      kpaOut.textContent = fmt((p + 14.7) * 6.895, 1);
    }

    tempRange.addEventListener("input", () => { tempNum.value = tempRange.value; recalc(); });
    tempNum.addEventListener("input", () => { tempRange.value = tempNum.value; recalc(); });
    refrSel.addEventListener("change", recalc);
    recalc();
  }

  // ---------- Superheat / Subcool Calculator ----------
  function mountSuperheatCalc(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;
    const refrs = Object.keys(PT);
    host.innerHTML = `
      <div class="tool-panel">
        <div class="tool-panel-head">
          <span class="tool-tag">DIAGNOSTIC</span>
          <h3>Superheat &amp; Subcool</h3>
          <p class="tool-sub">Enter suction or liquid-line pressure and temperature. Verdict compares to typical target ranges.</p>
        </div>
        <div class="sh-body">
          <div class="sh-side sh-suction">
            <div class="sh-head"><span class="sh-dot sh-dot-cold"></span>SUCTION · Superheat</div>
            <label>Refrigerant
              <select class="sh-refr" data-side="sh"></select>
            </label>
            <label>Suction pressure (psig)
              <input type="number" class="sh-press" data-side="sh" value="118" step="0.1">
            </label>
            <label>Suction line temp (°F)
              <input type="number" class="sh-temp" data-side="sh" value="55" step="0.1">
            </label>
            <div class="sh-result">
              <div class="sh-line"><span class="sh-k">Sat. temp</span><span class="sh-v" data-out="sh-sat">—</span><span class="sh-u">°F</span></div>
              <div class="sh-line sh-big"><span class="sh-k">Superheat</span><span class="sh-v" data-out="sh-val">—</span><span class="sh-u">°F</span></div>
              <div class="sh-verdict" data-out="sh-verdict">—</div>
            </div>
          </div>
          <div class="sh-divider" aria-hidden="true"></div>
          <div class="sh-side sh-liquid">
            <div class="sh-head"><span class="sh-dot sh-dot-hot"></span>LIQUID · Subcool</div>
            <label>Refrigerant
              <select class="sh-refr" data-side="sc"></select>
            </label>
            <label>Liquid pressure (psig)
              <input type="number" class="sh-press" data-side="sc" value="340" step="0.1">
            </label>
            <label>Liquid line temp (°F)
              <input type="number" class="sh-temp" data-side="sc" value="82" step="0.1">
            </label>
            <div class="sh-result">
              <div class="sh-line"><span class="sh-k">Sat. temp</span><span class="sh-v" data-out="sc-sat">—</span><span class="sh-u">°F</span></div>
              <div class="sh-line sh-big"><span class="sh-k">Subcool</span><span class="sh-v" data-out="sc-val">—</span><span class="sh-u">°F</span></div>
              <div class="sh-verdict" data-out="sc-verdict">—</div>
            </div>
          </div>
        </div>
        <p class="sh-note">Targets shown are typical fixed-orifice / TXV ballparks (~8–20 °F SH, ~8–15 °F SC). Manufacturer charging card overrides these.</p>
      </div>
    `;

    host.querySelectorAll("select.sh-refr").forEach(sel => {
      sel.innerHTML = refrs.map(r => `<option value="${r}" ${r === "R-410A" ? "selected" : ""}>${r}</option>`).join("");
    });

    function run(side) {
      const refr = host.querySelector(`select.sh-refr[data-side="${side}"]`).value;
      const press = Number(host.querySelector(`input.sh-press[data-side="${side}"]`).value);
      const temp = Number(host.querySelector(`input.sh-temp[data-side="${side}"]`).value);
      const sat = satTemp(refr, press);
      const diff = (side === "sh") ? (temp - sat) : (sat - temp);
      host.querySelector(`[data-out="${side}-sat"]`).textContent = fmt(sat, 1);
      host.querySelector(`[data-out="${side}-val"]`).textContent = fmt(diff, 1);
      const verdict = host.querySelector(`[data-out="${side}-verdict"]`);
      verdict.classList.remove("ok", "low", "high");
      let label = "—";
      if (isFinite(diff)) {
        if (side === "sh") {
          if (diff < 5)       { label = "LOW · possible overcharge / floodback risk"; verdict.classList.add("low"); }
          else if (diff > 25) { label = "HIGH · undercharge or restriction"; verdict.classList.add("high"); }
          else                { label = "IN RANGE · typical 8–20 °F"; verdict.classList.add("ok"); }
        } else {
          if (diff < 5)       { label = "LOW · undercharge or non-condensables"; verdict.classList.add("low"); }
          else if (diff > 20) { label = "HIGH · overcharge or condenser issue"; verdict.classList.add("high"); }
          else                { label = "IN RANGE · typical 8–15 °F"; verdict.classList.add("ok"); }
        }
      }
      verdict.textContent = label;
    }

    host.querySelectorAll("select.sh-refr, input.sh-press, input.sh-temp").forEach(el => {
      el.addEventListener("input", () => run(el.dataset.side));
      el.addEventListener("change", () => run(el.dataset.side));
    });
    run("sh");
    run("sc");
  }

  // ---------- Unit Converter ----------
  function mountUnitConverter(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;
    host.innerHTML = `
      <div class="tool-panel">
        <div class="tool-panel-head">
          <span class="tool-tag">CONVERSION</span>
          <h3>Field Unit Converter</h3>
          <p class="tool-sub">Live two-way conversion for the values you touch every day.</p>
        </div>
        <div class="uc-grid">
          <div class="uc-row">
            <span class="uc-name">Temperature</span>
            <label><input type="number" step="0.1" data-uc="f" value="75"><span>°F</span></label>
            <span class="uc-arrow">⇌</span>
            <label><input type="number" step="0.1" data-uc="c" value="23.9"><span>°C</span></label>
          </div>
          <div class="uc-row">
            <span class="uc-name">Pressure</span>
            <label><input type="number" step="0.1" data-uc="psi" value="100"><span>psi</span></label>
            <span class="uc-arrow">⇌</span>
            <label><input type="number" step="0.1" data-uc="kpa" value="689.5"><span>kPa</span></label>
          </div>
          <div class="uc-row">
            <span class="uc-name">Vacuum</span>
            <label><input type="number" step="1" data-uc="mic" value="500"><span>microns</span></label>
            <span class="uc-arrow">⇌</span>
            <label><input type="number" step="0.01" data-uc="torr" value="0.5"><span>torr</span></label>
          </div>
          <div class="uc-row">
            <span class="uc-name">Refrigerant mass</span>
            <label><input type="number" step="0.01" data-uc="lb" value="10"><span>lb</span></label>
            <span class="uc-arrow">⇌</span>
            <label><input type="number" step="0.01" data-uc="kg" value="4.54"><span>kg</span></label>
          </div>
          <div class="uc-row">
            <span class="uc-name">Capacity</span>
            <label><input type="number" step="100" data-uc="btu" value="12000"><span>BTU/h</span></label>
            <span class="uc-arrow">⇌</span>
            <label><input type="number" step="0.01" data-uc="ton" value="1"><span>tons</span></label>
          </div>
        </div>
      </div>
    `;

    const get = key => host.querySelector(`input[data-uc="${key}"]`);
    const pairs = [
      ["f", "c", v => (v - 32) * 5 / 9,   v => v * 9 / 5 + 32],
      ["psi", "kpa", v => v * 6.894757,   v => v / 6.894757],
      ["mic", "torr", v => v / 1000,      v => v * 1000],
      ["lb",  "kg",  v => v * 0.45359237, v => v / 0.45359237],
      ["btu", "ton", v => v / 12000,      v => v * 12000]
    ];
    pairs.forEach(([a, b, fwd, rev]) => {
      const aEl = get(a), bEl = get(b);
      aEl.addEventListener("input", () => { bEl.value = fmt(fwd(Number(aEl.value)), a === "btu" ? 2 : 2); });
      bEl.addEventListener("input", () => { aEl.value = fmt(rev(Number(bEl.value)), b === "ton" ? 0 : 2); });
    });
  }

  // ---------- Refrigerant Spec Table ----------
  function mountRefTable(containerId) {
    const host = document.getElementById(containerId);
    if (!host) return;
    const rows = REFDATA.map(r => `
      <tr data-kind="${r.kind.split(" ")[0]}">
        <td class="rt-id">${r.id}</td>
        <td><span class="rt-kind rt-k-${r.kind.split(" ")[0]}">${r.kind}</span></td>
        <td class="rt-num">${r.gwp}</td>
        <td class="rt-num">${r.odp}</td>
        <td><span class="rt-safety rt-s-${r.ashrae}">${r.ashrae}</span></td>
        <td>${r.color}</td>
        <td class="rt-num">${r.critT}</td>
        <td class="rt-num">${r.critP}</td>
        <td class="rt-num">${r.glide}</td>
        <td class="rt-status">${r.status}</td>
        <td class="rt-apps">${r.apps}</td>
      </tr>
    `).join("");
    host.innerHTML = `
      <div class="tool-panel rt-panel">
        <div class="tool-panel-head">
          <span class="tool-tag">REFERENCE</span>
          <h3>Refrigerant Data at a Glance</h3>
          <p class="tool-sub">The numbers you'll write on a service ticket — GWP, ODP, safety class, cylinder color, critical point, glide, and where it lives.</p>
        </div>
        <div class="rt-scroll">
          <table class="rt-table">
            <thead><tr>
              <th>Refrigerant</th><th>Class</th><th>GWP</th><th>ODP</th><th>ASHRAE 34</th>
              <th>Cyl. color</th><th>T<sub>crit</sub></th><th>P<sub>crit</sub></th><th>Glide</th>
              <th>Status</th><th>Typical use</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  return {
    mountPTChart,
    mountSuperheatCalc,
    mountUnitConverter,
    mountRefTable,
    satPressure,
    satTemp
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("pt-chart"))    window.HVACTools.mountPTChart("pt-chart");
  if (document.getElementById("sh-calc"))     window.HVACTools.mountSuperheatCalc("sh-calc");
  if (document.getElementById("uc-widget"))   window.HVACTools.mountUnitConverter("uc-widget");
  if (document.getElementById("ref-table"))   window.HVACTools.mountRefTable("ref-table");
});
