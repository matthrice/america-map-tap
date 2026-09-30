(() => {
  "use strict";

  const MULTIPLIERS = [1, 1, 2, 3, 3];
  const EARTH_MI = 3958.8;
  const STORAGE_KEY = "maptap-usa-v1";

  // us-atlas "states-albers-10m" is pre-projected with exactly this projection.
  const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);

  const $ = (id) => document.getElementById(id);
  const svg = d3.select("#map");
  const zoomLayer = svg.append("g");
  const statesLayer = zoomLayer.append("g");
  const marksLayer = zoomLayer.append("g");

  // ---------- Dates ----------
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseKey = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
  const prettyDate = (k, opts = { month: "short", day: "numeric", year: "numeric" }) =>
    parseKey(k).toLocaleDateString(undefined, opts);

  const todayKey = dateKey(new Date());
  const available = Object.keys(window.CHALLENGES).filter((k) => k <= todayKey).sort();
  const requested = new URLSearchParams(location.search).get("d");
  const dayKey = requested && available.includes(requested) ? requested
    : available.includes(todayKey) ? todayKey
    : null;
  const places = dayKey ? window.CHALLENGES[dayKey] : [];

  // ---------- Storage ----------
  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }
  function saveStore(s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* private mode */ }
  }
  const store = loadStore();
  const game = (dayKey && store[dayKey]) || { guesses: [] };

  // ---------- Scoring ----------
  const distanceMi = (a, b) => d3.geoDistance([a.lon, a.lat], [b.lon, b.lat]) * EARTH_MI;
  // 0 mi → 100, ~30 mi → 90, ~210 mi → 50, ~700 mi → 3.
  const roundScore = (mi) => Math.max(0, Math.round(100 * Math.exp(-mi / 300)));
  const total = (guesses) => guesses.reduce((s, g, i) => s + g.score * MULTIPLIERS[i], 0);
  const tier = (score) => (score >= 80 ? "good" : score >= 40 ? "ok" : "bad");
  const tierEmoji = { good: "🟢", ok: "🟡", bad: "🔴" };
  const fmtMi = (mi) => (mi < 10 ? mi.toFixed(1) : Math.round(mi).toLocaleString()) + " mi";

  // ---------- Map ----------
  // Map content lives in projected coordinates; the zoom transform maps it to screen pixels.
  // Drag to pan, wheel/pinch to zoom, click/tap (without dragging) to guess.
  const BOUNDS = [[-60, 10], [960, 610]]; // lower 48 + Alaska/Hawaii insets
  const SLACK = 250; // how far past the map edges you can drag
  let k = 1; // current zoom scale
  let minK = 1;
  const zoom = d3.zoom()
    .clickDistance(5)
    .translateExtent([[BOUNDS[0][0] - SLACK, BOUNDS[0][1] - SLACK], [BOUNDS[1][0] + SLACK, BOUNDS[1][1] + SLACK]])
    .on("zoom", (e) => {
      k = e.transform.k;
      zoomLayer.attr("transform", e.transform);
      rescaleMarks();
    });
  svg.call(zoom).on("dblclick.zoom", null);

  // Initial view: whole map on wide screens; on tall/narrow (phone) screens zoom in
  // up to 1.6x so the map fills more of the height — drag to reach the coasts.
  function fitTransform() {
    const { width, height } = svg.node().getBoundingClientRect();
    const [[x0, y0], [x1, y1]] = BOUNDS;
    const contain = Math.min(width / (x1 - x0), height / (y1 - y0));
    const s = Math.min(height / (y1 - y0), contain * 1.6);
    const [cx, cy] = s > contain ? [487.5, 305] : [(x0 + x1) / 2, (y0 + y1) / 2];
    return d3.zoomIdentity.translate(width / 2 - s * cx, height / 2 - s * cy).scale(s);
  }
  function fullScale() {
    const { width, height } = svg.node().getBoundingClientRect();
    const [[x0, y0], [x1, y1]] = BOUNDS;
    return Math.min(width / (x1 - x0), height / (y1 - y0));
  }
  function resetView(animate) {
    const t = fitTransform();
    minK = Math.min(t.k, fullScale()) * 0.8;
    zoom.extent([[0, 0], [svg.node().clientWidth, svg.node().clientHeight]]).scaleExtent([minK, t.k * 15]);
    (animate ? svg.transition().duration(400) : svg).call(zoom.transform, t);
  }
  $("reset-zoom").onclick = () => resetView(true);
  // Refit only when the width changes, so mobile address-bar show/hide doesn't reset the view.
  let lastWidth = 0;
  new ResizeObserver(() => {
    const w = svg.node().clientWidth;
    if (w !== lastWidth) { lastWidth = w; resetView(false); }
  }).observe(svg.node());

  function rescaleMarks() {
    marksLayer.selectAll("circle").attr("r", 7 / k).attr("stroke-width", 2 / k);
    marksLayer.selectAll("line").attr("stroke-width", 2 / k).attr("stroke-dasharray", `${5 / k} ${4 / k}`);
    marksLayer.selectAll("text").attr("font-size", 15 / k).attr("stroke-width", 4 / k).attr("dy", -12 / k);
  }

  async function drawMap() {
    const us = await (await fetch("data/states-albers-10m.json")).json();
    const path = d3.geoPath();
    statesLayer.selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .join("path")
      .attr("class", "state")
      .attr("d", path);
  }

  // ---------- Game flow ----------
  let revealed = false; // showing result for the current round

  const round = () => game.guesses.length;

  function renderRounds() {
    const el = $("rounds");
    el.innerHTML = "";
    places.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "round-dot";
      const g = game.guesses[i];
      if (g) { d.classList.add("done"); d.textContent = g.score; }
      else { d.textContent = `×${MULTIPLIERS[i]}`; }
      if (i === round() && !revealed) d.classList.add("current");
      if (revealed && i === round() - 1) d.classList.add("current");
      el.appendChild(d);
    });
  }

  function setPrompt() {
    const i = revealed ? round() - 1 : round();
    const p = places[i];
    const theme = places.find((x) => x.theme)?.theme;
    $("prompt-label").textContent = `Round ${i + 1} of ${places.length}` + (theme ? ` · ${theme}` : "");
    $("prompt-name").textContent = p.name;
  }

  function drawPin(cls, pt, label) {
    const xy = projection([pt.lon, pt.lat]);
    if (!xy) return null;
    marksLayer.append("circle").attr("class", cls).attr("cx", xy[0]).attr("cy", xy[1]);
    if (label) {
      marksLayer.append("text").attr("class", "answer-label")
        .attr("x", xy[0]).attr("y", xy[1]).attr("text-anchor", "middle").text(label);
    }
    return xy;
  }

  function drawRound(i, withLabel) {
    const g = game.guesses[i], p = places[i];
    const a = projection([g.lon, g.lat]), b = projection([p.lon, p.lat]);
    if (a && b) marksLayer.append("line").attr("class", "link-line")
      .attr("x1", a[0]).attr("y1", a[1]).attr("x2", b[0]).attr("y2", b[1]);
    drawPin("guess-pin", g);
    drawPin("answer-pin", p, withLabel ? p.name : null);
  }

  function clearMarks() { marksLayer.selectAll("*").remove(); }

  function setAction(text, enabled, handler) {
    const b = $("action-btn");
    b.textContent = text;
    b.style.visibility = enabled ? "visible" : "hidden";
    b.onclick = handler;
  }

  function startRound() {
    revealed = false;
    clearMarks();
    renderRounds();
    setPrompt();
    $("result").textContent = "";
    setAction("Tap the map to guess", false, null);
  }

  svg.on("click", (event) => {
    if (!dayKey || revealed || round() >= places.length) return;
    const [x, y] = d3.pointer(event, zoomLayer.node());
    const ll = projection.invert([x, y]);
    if (!ll) return;
    guess({ lon: ll[0], lat: ll[1] });
  });

  function guess(pt) {
    const i = round();
    const p = places[i];
    const mi = distanceMi(pt, p);
    const score = roundScore(mi);
    game.guesses.push({ lat: +pt.lat.toFixed(4), lon: +pt.lon.toFixed(4), mi: +mi.toFixed(1), score });
    persist();
    revealed = true;
    clearMarks();
    drawRound(i, true);
    rescaleMarks();
    renderRounds();
    setPrompt();
    const pts = score * MULTIPLIERS[i];
    $("result").innerHTML =
      `<b>${fmtMi(mi)}</b> away · ` +
      `<b>${score}</b>${MULTIPLIERS[i] > 1 ? ` ×${MULTIPLIERS[i]} = <b>${pts}</b>` : ""} pts`;
    if (round() < places.length) setAction("Next place →", true, startRound);
    else setAction("See results", true, finish);
  }

  function persist() {
    game.done = game.guesses.length === places.length;
    if (game.done) game.total = total(game.guesses);
    store[dayKey] = game;
    saveStore(store);
  }

  function finish() {
    revealed = true;
    clearMarks();
    places.forEach((_, i) => drawRound(i, false));
    rescaleMarks();
    renderRounds();
    $("prompt-label").textContent = `${prettyDate(dayKey)} · complete`;
    $("prompt-name").textContent = `${total(game.guesses)} / 1000`;
    $("result").textContent = "";
    setAction("Show results", true, showSummary);
    showSummary();
  }

  // ---------- Summary / share ----------
  function computeStats() {
    const done = Object.entries(store).filter(([, g]) => g.done);
    const avg = done.length ? Math.round(done.reduce((s, [, g]) => s + g.total, 0) / done.length) : 0;
    const best = done.reduce((m, [, g]) => Math.max(m, g.total), 0);
    // Streak: consecutive completed days ending today (or yesterday).
    let streak = 0;
    const d = new Date();
    if (!store[dateKey(d)]?.done) d.setDate(d.getDate() - 1);
    while (store[dateKey(d)]?.done) { streak++; d.setDate(d.getDate() - 1); }
    return { played: done.length, avg, best, streak };
  }

  function shareText() {
    const lines = [
      `🇺🇸 MapTap USA · ${prettyDate(dayKey, { month: "short", day: "numeric" })}`,
      game.guesses.map((g) => `${tierEmoji[tier(g.score)]}${g.score}`).join(" "),
      `Final score: ${total(game.guesses)}`,
      location.origin + location.pathname
    ];
    return lines.join("\n");
  }

  function showSummary() {
    $("final-score").textContent = total(game.guesses);
    const s = computeStats();
    $("stats").innerHTML =
      `<div><b>${s.played}</b>played</div><div><b>${s.avg}</b>average</div>` +
      `<div><b>${s.best}</b>best</div><div><b>${s.streak}</b>streak</div>`;
    $("summary").showModal();
  }

  $("share-btn").onclick = async () => {
    const text = shareText();
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) await navigator.share({ text });
      else { await navigator.clipboard.writeText(text); toast("Copied to clipboard"); }
    } catch { /* cancelled */ }
  };

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function tickCountdown() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const hasNext = window.CHALLENGES[dateKey(next)];
    const s = Math.floor((next - now) / 1000);
    $("countdown").textContent = hasNext
      ? `Next challenge in ${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`
      : "No more challenges scheduled yet — check back soon!";
  }
  setInterval(tickCountdown, 1000);
  tickCountdown();

  // ---------- Archive / help ----------
  $("archive-btn").onclick = () => {
    const ul = $("archive-list");
    ul.innerHTML = "";
    [...available].reverse().forEach((key) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = key === todayKey ? "./" : `?d=${key}`;
      const g = store[key];
      a.innerHTML = `<span>${prettyDate(key, { weekday: "short", month: "short", day: "numeric" })}` +
        `${key === todayKey ? " · today" : ""}</span>` +
        `<span class="score">${g?.done ? g.total : g?.guesses?.length ? "in progress" : "—"}</span>`;
      li.appendChild(a);
      ul.appendChild(li);
    });
    if (!available.length) ul.innerHTML = "<li>No challenges yet.</li>";
    $("archive").showModal();
  };
  $("help-btn").onclick = () => $("help").showModal();
  for (const d of document.querySelectorAll("dialog")) {
    d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
  }

  // ---------- Header border ----------
  // Inline SVG flag (flag emoji doesn't render on Windows).
  const FLAG = '<svg viewBox="0 0 19 10" preserveAspectRatio="none"><rect width="19" height="10" fill="#b22234"/>' +
    [1, 3, 5, 7, 9].map((y) => `<rect y="${(y * 10) / 13}" width="19" height="${10 / 13}" fill="#fff"/>`).join("") +
    '<rect width="7.6" height="5.38" fill="#3c3b6e"/></svg>';
  $("freedom-strip").innerHTML = Array.from({ length: 60 }, (_, i) =>
    ["<span>🦅</span>", FLAG, "<span>🌭</span>", FLAG][i % 4]).join("");

  // ---------- Boot ----------
  drawMap().then(() => {
    if (!dayKey) {
      $("rounds").innerHTML = "";
      $("prompt-label").textContent = "No challenge today";
      $("prompt-name").textContent = "Check the archive";
      setAction("Open archive", true, () => $("archive-btn").click());
      return;
    }
    $("date-label").textContent = prettyDate(dayKey) + (dayKey === todayKey ? "" : " (archive)");
    if (round() >= places.length) finish();
    else {
      startRound();
      if (!store.seenHelp) { store.seenHelp = true; saveStore(store); $("help").showModal(); }
    }
  });
})();
