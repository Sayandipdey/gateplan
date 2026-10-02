/* ---------- Plan data (from GATE_ECE_2027_120_Day_Plan.pptx) ---------- */
const START = new Date(2026, 9, 1), DAY = 864e5, END = new Date(2027, 0, 28);
const B = [
"Linear Algebra|Matrix theory, eigenvalues & eigenvectors","Calculus I|Limits, continuity, differentiation, MVTs","Calculus II|Integration, maxima & minima, vector calculus","Differential Equations|First & higher order DEs, PDEs","Probability & Statistics I|Random variables, mean, variance, distributions","Probability & Statistics II|Joint distributions, limit theorems",
"Nodal & Mesh Analysis|DC circuits & basics","Network Theorems|Thevenin, Norton, superposition, max power","Transients & AC Analysis|Transients & AC circuit analysis",
"Transfer Function & Block Diagrams|Block diagrams, signal flow graphs","Time Response Analysis|Steady-state error","Stability & Root Locus|Routh-Hurwitz, root locus","Frequency Response|Bode plot & Nyquist plot","State Space Analysis|State variable models",
"Signals & Systems Basics|+ Continuous Fourier series","Fourier Transforms & Sampling|CTFT, DFT, sampling theorem","Laplace & Z-Transform|Transform techniques","Discrete-Time Signals & Systems|DT signals and LTI systems",
"Diode Circuits & Applications|Clipping, clamping, rectifiers","BJT Biasing & Small Signal|Biasing and small-signal analysis","MOSFET Biasing & Amplifiers|Biasing, small-signal amplifiers","Operational Amplifiers|Op-amps & applications",
"Combinational Logic|Combinational logic circuits","Sequential Logic|Sequential logic circuits","Data Converters & Memory|ADC, DAC + memory elements",
"Semiconductor Physics|Carrier transport phenomena","PN Junction Diode|Physics & characteristics","BJT Device Physics|Device physics & characteristics","MOS Capacitor Physics|MOS capacitor physics","MOSFET Characteristics|Characteristics & non-idealities","Special Devices & IC Fabrication|Special devices, IC fabrication basics",
"Half-Way Buffer & Formula Revision|Mid-term formula revision; complex analysis, computer organization",
"Quantitative Aptitude I|Numbers, %, ratio, work & time","Quantitative Aptitude II|Speed & distance, algebra, geometry, P&C","Verbal Aptitude I|Grammar, vocabulary, sentence completion","Verbal Aptitude II|Reading comprehension, critical reasoning","Analytical Reasoning|DI, clocks, calendars, sequences","Spatial Reasoning|Paper folding, rotation, mirrors, patterns","Mock Practice & Short Tricks|Aptitude mock practice, tricks","PYQ: General Aptitude|Previous year questions 2018-2025",
"Analog Communication|AM & angle modulation (FM/PM)","PCM|Sampling & quantization","Random Processes & Noise|Noise analysis in communication","Digital Modulation Schemes|ASK, FSK, PSK, QAM","Matched Filter & Detection|Probability of error","Information Theory & Coding|Error control coding",
"Statics & Maxwell's Equations|Electro/magnetostatics, Maxwell","EM Waves & Boundary Conditions|Wave propagation, boundary conditions","Transmission Lines|Smith chart analysis","Waveguides|TE/TM modes, cutoff frequencies","Antennas|Gain, directivity, radiation pattern",
"Formula Revision I|EDC + Analog + Digital; current mirrors, diff amps, oscillators","Formula Revision II|Signals + Control + Networks; PID, two-port, FIR/IIR","Full Mock Test 01|Comprehensive error analysis","Full Mock Test 02|Weak-area targeted revision","Full Mock Test 03|Engineering math brush-up","Full Mock Test 04|General aptitude speed test","High-Yield PYQ Review|Top 100 previous year questions","Light Revision & Short Notes|Formula + short notes review","Relax, Strategy & Readiness|Exam strategy, mindset, exam day"
].map(s => s.split("|"));
const SUBJ = [["Engineering Maths",0,5],["Networks",6,8],["Control Systems",9,13],["Signals & Systems",14,17],["Analog Circuits",18,21],["Digital Circuits",22,24],["Electronic Devices",25,30],["Mid-Term Buffer",31,31],["General Aptitude",32,39],["Communications",40,45],["Electromagnetics",46,50],["Revision & Mocks",51,59]];
const PH = [["P1 Foundation & Maths",0,8,"Oct 1–18"],["P2 Signals, Control & Analog",9,21,"Oct 19–Nov 13"],["P3 Digital & EDC",22,31,"Nov 14–Dec 3"],["P4 Aptitude Block",32,39,"Dec 4–19"],["P5 Comms & EMFT",40,50,"Dec 20–Jan 10"],["P6 Revision & Mocks",51,59,"Jan 11–28"]];

/* ---------- Motivation ---------- */
const Q = [
["I can do this all day.","Captain America"],
["Whatever it takes.","Avengers: Endgame"],
["Sometimes you gotta run before you can walk.","Tony Stark"],
["Dormammu, I've come to bargain.","Doctor Strange"],
["I'm with you till the end of the line.","Captain America"],
["With great power comes great responsibility.","Spider-Man"],
["Part of the journey is the end.","Tony Stark"],
["Avengers, assemble.","Captain America"],
["Heroes don't wait for the problem to shrink. They walk straight at it.","Hero mindset"],
["Steve got back up every single time. Open the next block.","Hero mindset"],
["Tony built it in a cave, from scraps. You have a full plan and 120 days.","Hero mindset"],
["Thor lost his hammer and still won. One bad day doesn't cancel the plan.","Hero mindset"],
["No Avenger skipped the hard fight. Do today's topic first.","Hero mindset"],
["Two days, one topic. That's how a hero gets built.","Hero mindset"]
];

/* ---------- State (localStorage) ---------- */
const KEY = "gate2027-progress-v1";
let st = { done: {}, q: -1 };
try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
let filter = "all";

/* ---------- Helpers ---------- */
const $ = id => document.getElementById(id);
const M = d => d.toLocaleDateString("en", { month: "short" });
const midnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const dayNum = () => Math.round((midnight() - START) / DAY) + 1;
const rng = i => { const a = new Date(2026, 9, 1 + 2 * i), b = new Date(2026, 9, 2 + 2 * i);
  return `${M(a)} ${a.getDate()}–${M(a) === M(b) ? "" : M(b) + " "}${b.getDate()}`; };
const subjOf = i => SUBJ.find(s => i >= s[1] && i <= s[2])[0];
const cnt = (a, b) => { let n = 0; for (let i = a; i <= b; i++) if (st.done[i]) n++; return n; };
const bar = (name, a, b, extra) => { const n = cnt(a, b), t = b - a + 1;
  return `<div class="row"><div><span>${name}</span><small>${extra ? extra + " · " : ""}${n}/${t}</small></div><div class="track"><div class="fill" style="width:${n / t * 100}%"></div></div></div>`; };
function toast(t) { const el = $("toast"); el.textContent = t; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 1800); }

/* ---------- Render ---------- */
function showQuote(fresh) {
  let i = st.q;
  if (fresh || i < 0 || i >= Q.length) { do { i = Math.floor(Math.random() * Q.length); } while (i === st.q && Q.length > 1); st.q = i; save(); }
  $("quote").textContent = Q[i][0];
  $("who").textContent = Q[i][1] === "Hero mindset" ? "Hero mindset" : "— " + Q[i][1];
  $("quote").style.animation = "none"; void $("quote").offsetWidth; $("quote").style.animation = "";
}

function renderTop() {
  const d = dayNum(), idx = Math.floor((d - 1) / 2), done = Object.keys(st.done).length;
  let m;
  if (d < 1) m = `Day 1 starts in <b>${1 - d} day${d < 0 ? "s" : ""}</b>. First mission: <b>${B[0][0]}</b>. Run toward it.`;
  else if (idx > 59) m = `The 120 days are over. Clear any blocks left and walk in ready.`;
  else m = `Day ${d} mission: <b>${B[idx][0]}</b>${st.done[idx] ? ". Already cleared. Stay ahead." : ". Don't avoid it. Open it and start."}`;
  $("mission").innerHTML = m;

  let late = 0; for (let i = 0; i < 60; i++) if (2 * i + 2 < d && !st.done[i]) late++;
  const days = new Set(Object.values(st.done).map(t => new Date(t).toDateString()));
  let streak = 0, c = new Date(); if (!days.has(c.toDateString())) c.setDate(c.getDate() - 1);
  while (days.has(c.toDateString())) { streak++; c.setDate(c.getDate() - 1); }
  const left = Math.max(0, Math.ceil((END - midnight()) / DAY));
  const S = (v, l, k = "") => `<div class="stat ${k}"><strong>${v}</strong><span>${l}</span></div>`;
  $("stats").innerHTML = S(Math.round(done / 60 * 100) + "%", "overall progress", done === 60 ? "good" : "") + S(`${done}/60`, "blocks cleared") +
    S(streak, "day streak", streak ? "good" : "") + S(late, "blocks behind schedule", late ? "warn" : "") + S(left, "days until Jan 28");
}

function renderLists() {
  $("phases").innerHTML = PH.map(p => bar(p[0], p[1], p[2], p[3])).join("");
  $("subjects").innerHTML = SUBJ.map(s => bar(s[0], s[1], s[2])).join("");
  $("filters").innerHTML = [["all", "All"], ["pending", "Pending"], ["done", "Done"]].map(f => `<button data-f="${f[0]}" class="${filter === f[0] ? "on" : ""}">${f[1]}</button>`).join("");
  const d = dayNum(); let html = "";
  PH.forEach(p => {
    let rows = "";
    for (let i = p[1]; i <= p[2]; i++) {
      const dn = !!st.done[i]; if ((filter === "done" && !dn) || (filter === "pending" && dn)) continue;
      const today = Math.floor((d - 1) / 2) === i, late = 2 * i + 2 < d;
      rows += `<label class="blk ${dn ? "done" : ""} ${today ? "today" : ""} ${late ? "late" : ""}"><input type="checkbox" data-i="${i}" ${dn ? "checked" : ""}><span class="box"></span><span class="dt">${rng(i)}</span><span class="tt"><b>${B[i][0]}</b><small>${B[i][1]}</small></span><span class="sb">${subjOf(i)}</span></label>`;
    }
    if (rows) html += `<div class="phase-h">${p[0]} · ${p[3]}</div>${rows}`;
  });
  $("blocks").innerHTML = html || `<p class="phase-h">Nothing here yet.</p>`;
}
const render = () => { renderTop(); renderLists(); };

/* ---------- Events ---------- */
$("blocks").addEventListener("change", e => {
  const i = e.target.dataset.i; if (i === undefined) return;
  if (e.target.checked) { st.done[i] = Date.now(); toast(Object.keys(st.done).length === 60 ? "All 60 blocks cleared. You did it." : ["Mission complete.", "One more problem down.", "Next one. Let's go."][Math.floor(Math.random() * 3)]); }
  else delete st.done[i];
  save(); render();
});
$("filters").addEventListener("click", e => { if (e.target.dataset.f) { filter = e.target.dataset.f; renderLists(); } });
$("another").onclick = () => showQuote(true);
$("reset").onclick = () => { if (confirm("Clear all saved progress? This cannot be undone.")) { st.done = {}; save(); render(); } };

showQuote(true);  // a new quote every time the page opens
render();
