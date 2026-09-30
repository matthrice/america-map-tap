(() => {
  "use strict";

  const MULTIPLIERS = [1, 1, 2, 3, 3];
  const EARTH_MI = 3958.8;
  const STORAGE_KEY = "maptap-usa-v2";

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

  // Cities show their state ("Boise, ID"); landmarks and names that already have one don't.
  const label = (p) => (p.landmark || p.name.includes(", ") ? p.name : `${p.name}, ${p.state}`);

  // ---------- Scoring ----------
  const distanceMi = (a, b) => d3.geoDistance([a.lon, a.lat], [b.lon, b.lat]) * EARTH_MI;
  // Full marks within 15 mi, then decays: ~50 mi → 89, ~225 mi → 50, ~700 mi → 11.
  const roundScore = (mi) => Math.min(100, Math.round(100 * Math.exp(-Math.max(0, mi - 15) / 300)));
  const total = (guesses) => guesses.reduce((s, g, i) => s + g.score * MULTIPLIERS[i], 0);
  const tier = (score) => (score >= 80 ? "good" : score >= 40 ? "ok" : "bad");
  const tierEmoji = { good: "🟢", ok: "🟡", bad: "🔴" };
  const fmtMi = (mi) => (mi < 10 ? mi.toFixed(1) : Math.round(mi).toLocaleString()) + " mi";

  // ---------- Map ----------
  // The SVG viewBox frames the whole map, so the browser does the fitting; no JS
  // size measurement. The zoom transform is in viewBox units (identity = whole map).
  // Drag to pan, wheel/pinch to zoom, click/tap (without dragging) to guess.
  const VIEW = [-60, -70, 1020, 750]; // map + room for the floating prompt/panel (matches the viewBox)
  const SLACK = 250; // how far past the map edges you can drag
  const zoom = d3.zoom()
    .clickDistance(5)
    .scaleExtent([0.8, 15])
    .translateExtent([[VIEW[0] - SLACK, VIEW[1] - SLACK], [VIEW[0] + VIEW[2] + SLACK, VIEW[1] + VIEW[3] + SLACK]])
    .on("zoom", (e) => {
      if (e.sourceEvent?.type === "mousemove") svg.classed("dragging", true);
      zoomLayer.attr("transform", e.transform);
      rescaleMarks();
    })
    .on("end", () => svg.classed("dragging", false));
  svg.call(zoom).on("dblclick.zoom", null);
  $("reset-zoom").onclick = () => svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);

  // Map units per screen pixel, so pins/labels stay a constant on-screen size.
  function unit() {
    const m = zoomLayer.node().getScreenCTM();
    return m && m.a > 0 ? 1 / m.a : 1;
  }

  // After a guess, zoom out (never in) just enough to show both the guess and the answer.
  function showBoth(a, b) {
    const pa = projection([a.lon, a.lat]), pb = projection([b.lon, b.lat]);
    if (!pa || !pb) return;
    const [x0, y0, w, h] = VIEW;
    const pad = 150;
    const cur = d3.zoomTransform(svg.node());
    const inView = [pa, pb].every((pt) => {
      const [x, y] = cur.apply(pt);
      return x > x0 + pad && x < x0 + w - pad && y > y0 + pad && y < y0 + h - pad;
    });
    if (inView) return;
    const bw = Math.abs(pa[0] - pb[0]) || 1, bh = Math.abs(pa[1] - pb[1]) || 1;
    const s = Math.max(0.8, Math.min(cur.k, (w - 2 * pad) / bw, (h - 2 * pad) / bh));
    const mx = (pa[0] + pb[0]) / 2, my = (pa[1] + pb[1]) / 2;
    svg.transition().duration(500).call(zoom.transform,
      d3.zoomIdentity.translate(x0 + w / 2 - s * mx, y0 + h / 2 - s * my).scale(s));
  }

  function rescaleMarks() {
    const u = unit();
    marksLayer.selectAll("circle:not(.ripple)").attr("r", 8 * u).attr("stroke-width", 2.5 * u);
    marksLayer.selectAll("line").attr("stroke-width", 2.5 * u).attr("stroke-dasharray", `${6 * u} ${5 * u}`);
    marksLayer.selectAll("text").attr("font-size", 17 * u).attr("stroke-width", 5 * u).attr("dy", -14 * u);
  }

  async function drawMap() {
    const us = await (await fetch("data/states-albers-10m.json")).json();
    // Country outline only (no state lines) to keep it challenging.
    statesLayer.append("path")
      .datum(topojson.feature(us, us.objects.nation))
      .attr("class", "state")
      .attr("d", d3.geoPath());
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
      if (g) { d.classList.add(tier(g.score)); d.textContent = g.score; }
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
    $("prompt-name").textContent = label(p);
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
    drawPin("answer-pin", p, withLabel ? label(p) : null);
  }

  // Select effect: ripple at the tap, guess pin pops, line draws to the answer, answer pops.
  function animateReveal() {
    const guessPin = marksLayer.select(".guess-pin");
    const answerPin = marksLayer.select(".answer-pin");
    const line = marksLayer.select(".link-line");
    const label = marksLayer.select(".answer-label");
    const u = unit(), r = 8 * u;
    marksLayer.insert("circle", ":first-child").attr("class", "ripple")
      .attr("cx", guessPin.attr("cx")).attr("cy", guessPin.attr("cy"))
      .attr("r", r).attr("stroke-width", 3 * u).style("opacity", 0.8)
      .transition().duration(650).ease(d3.easeCubicOut)
      .attr("r", 44 * u).style("opacity", 0).remove();
    guessPin.attr("r", 0).transition().duration(250).ease(d3.easeBackOut.overshoot(3)).attr("r", r);
    const lineMs = 450;
    if (!line.empty()) {
      const [x1, y1, x2, y2] = ["x1", "y1", "x2", "y2"].map((a) => line.attr(a));
      line.attr("x2", x1).attr("y2", y1)
        .transition().delay(150).duration(lineMs).ease(d3.easeCubicInOut)
        .attr("x2", x2).attr("y2", y2);
    }
    answerPin.attr("r", 0).transition().delay(150 + lineMs).duration(300)
      .ease(d3.easeBackOut.overshoot(3)).attr("r", r)
      .on("end", rescaleMarks); // re-sync sizes if the view zoomed meanwhile
    label.style("opacity", 0).transition().delay(150 + lineMs).duration(250).style("opacity", 1);
  }

  function clearMarks() { marksLayer.selectAll("*").remove(); }

  function setAction(text, enabled, handler) {
    const b = $("action-btn");
    b.textContent = text;
    b.style.display = enabled ? "" : "none";
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
    if (!dayKey) return;
    // After a reveal, tapping the map moves on (same as the Next button).
    if (revealed) { if (round() < places.length) startRound(); return; }
    if (round() >= places.length) return;
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
    animateReveal();
    showBoth(pt, p);
    renderRounds();
    setPrompt();
    const pts = score * MULTIPLIERS[i];
    $("result").innerHTML =
      `<b>${fmtMi(mi)}</b> away · ` +
      `<b>${score}</b>${MULTIPLIERS[i] > 1 ? ` ×${MULTIPLIERS[i]} = <b>${pts}</b>` : ""} pts`;
    if (round() < places.length) {
      setAction("Next place →", true, startRound);
      $("prompt-label").textContent += " · tap map for next";
    } else setAction("See results", true, finish);
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
