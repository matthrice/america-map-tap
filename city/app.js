(() => {
  "use strict";

  // Per-city settings come from window.CITY (set in each city's index.html).
  const CITY = window.CITY;
  const MULTIPLIERS = [1, 1, 2, 3, 3];
  const EARTH_MI = 3958.8;
  const STORAGE_KEY = CITY.storageKey;
  const START_BOUNDS = CITY.startBounds; // initial view
  const MAX_BOUNDS = CITY.maxBounds; // how far you can pan

  const $ = (id) => document.getElementById(id);

  // ---------- Dates ----------
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseKey = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
  const prettyDate = (k, opts = { month: "short", day: "numeric", year: "numeric" }) =>
    parseKey(k).toLocaleDateString(undefined, opts);

  const params = new URLSearchParams(location.search);
  const reviewMode = params.has("review");
  const todayKey = dateKey(new Date());
  const available = Object.keys(window.CHALLENGES).filter((k) => k <= todayKey).sort();
  const requested = params.get("d");
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
  // A saved game only counts if the day's places haven't changed since it was played.
  const sig = places.map((p) => p.name).join("|");
  const game = (dayKey && store[dayKey]?.sig === sig && store[dayKey]) || { guesses: [], sig };

  // ---------- Scoring ----------
  const rad = (d) => (d * Math.PI) / 180;
  function distanceMi(a, b) {
    const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
      Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2;
    return 2 * EARTH_MI * Math.asin(Math.sqrt(h));
  }
  // City scale. Full marks within ~500 ft, then decays: 0.5 mi → 77, 1 mi → 55, 2 mi → 28, 4 mi → 7.
  const roundScore = (mi) => Math.min(100, Math.round(100 * Math.exp(-Math.max(0, mi - 0.1) / 1.5)));
  const total = (guesses) => guesses.reduce((s, g, i) => s + g.score * MULTIPLIERS[i], 0);
  const tier = (score) => (score >= 80 ? "good" : score >= 40 ? "ok" : "bad");
  const tierEmoji = { good: "🟢", ok: "🟡", bad: "🔴" };
  const fmtDist = (mi) => (mi < 0.1 ? `${Math.round((mi * 5280) / 10) * 10} ft` : `${mi < 10 ? mi.toFixed(2) : Math.round(mi)} mi`);

  // ---------- Setup check ----------
  const token = window.MAPBOX_TOKEN || "";
  if (!window.mapboxgl || !token.startsWith("pk.")) {
    const el = document.createElement("div");
    el.id = "setup";
    el.innerHTML = window.mapboxgl
      ? `<div><h2>Map not configured</h2><p>Add a Mapbox public token (starts with <code>pk.</code>) to <code>city/config.js</code>.</p></div>`
      : `<div><h2>Map failed to load</h2><p>Couldn't reach Mapbox. Check your connection and reload.</p></div>`;
    $("stage").appendChild(el);
    $("prompt-name").textContent = "";
    return;
  }

  // ---------- Map ----------
  // Drag to pan, wheel/pinch to zoom, click/tap (Mapbox skips clicks that were drags) to guess.
  mapboxgl.accessToken = token;
  const map = new mapboxgl.Map({
    container: "map",
    style: CITY.mapStyle || "mapbox://styles/mapbox/streets-v12",
    bounds: START_BOUNDS,
    maxBounds: MAX_BOUNDS,
    dragRotate: false,
    pitchWithRotate: false,
    doubleClickZoom: false,
    touchPitch: false
  });
  map.touchZoomRotate.disableRotation();

  // Hide every label except street names/shields, so place names don't give answers away.
  map.on("style.load", () => {
    for (const layer of map.getStyle().layers) {
      if (layer.type === "symbol" && !layer.id.startsWith("road-")) {
        map.setLayoutProperty(layer.id, "visibility", "none");
      }
    }
    map.addSource("links", { type: "geojson", data: emptyFC() });
    map.addLayer({
      id: "links", type: "line", source: "links",
      layout: { "line-cap": "round" },
      paint: {
        "line-color": getComputedStyle(document.documentElement).getPropertyValue("--orange").trim() || "#e2692a",
        "line-width": 3, "line-dasharray": [2, 1.5]
      }
    });
  });

  const topPad = () => $("top").getBoundingClientRect().bottom - $("stage").getBoundingClientRect().top + 16;
  const fitPadding = () => ({ top: Math.min(topPad(), map.getContainer().clientHeight * 0.5), bottom: 40, left: 40, right: 40 });
  $("reset-zoom").onclick = () => map.fitBounds(START_BOUNDS, { padding: 20, duration: 600 });

  const emptyFC = () => ({ type: "FeatureCollection", features: [] });
  const lineFeature = (a, b) => ({ type: "Feature", geometry: { type: "LineString", coordinates: [[a.lon, a.lat], [b.lon, b.lat]] } });

  // ---------- Marks ----------
  let markers = [];
  let lineAnim = 0;

  function addMarker(cls, pt, label, delay) {
    const el = document.createElement("div");
    el.className = `pin ${cls}`;
    if (delay) el.style.setProperty("--delay", `${delay}ms`);
    if (label) {
      const l = document.createElement("div");
      l.className = "label";
      l.textContent = label;
      el.appendChild(l);
    }
    markers.push(new mapboxgl.Marker({ element: el }).setLngLat([pt.lon, pt.lat]).addTo(map));
  }

  function ripple(pt) {
    const el = document.createElement("div");
    el.className = "ripple";
    const m = new mapboxgl.Marker({ element: el }).setLngLat([pt.lon, pt.lat]).addTo(map);
    setTimeout(() => m.remove(), 700);
  }

  function setLinks(features) {
    map.getSource("links")?.setData({ type: "FeatureCollection", features });
  }

  function clearMarks() {
    cancelAnimationFrame(lineAnim);
    markers.forEach((m) => m.remove());
    markers = [];
    setLinks([]);
  }

  // Select effect: ripple, guess pin pops, line draws to the answer, answer pops with its name.
  function animateReveal(g, p) {
    const LINE_DELAY = 150, LINE_MS = 450;
    ripple(g);
    addMarker("guess", g);
    const t0 = performance.now() + LINE_DELAY;
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const step = (now) => {
      const t = Math.min(1, Math.max(0, (now - t0) / LINE_MS));
      const e = ease(t);
      setLinks([lineFeature(g, { lon: g.lon + (p.lon - g.lon) * e, lat: g.lat + (p.lat - g.lat) * e })]);
      if (t < 1) lineAnim = requestAnimationFrame(step);
    };
    lineAnim = requestAnimationFrame(step);
    addMarker("answer", p, p.name, LINE_DELAY + LINE_MS);
  }

  // After a guess, zoom out (never in) just enough to show both the guess and the answer.
  function showBoth(a, b) {
    const { clientWidth: w, clientHeight: h } = map.getContainer();
    const top = topPad();
    const inView = [a, b].every((pt) => {
      const { x, y } = map.project([pt.lon, pt.lat]);
      return x > 40 && x < w - 40 && y > top && y < h - 40;
    });
    if (inView) return;
    const cam = map.cameraForBounds([[a.lon, a.lat], [b.lon, b.lat]], { padding: fitPadding() });
    if (!cam) return;
    map.easeTo({ ...cam, zoom: Math.min(cam.zoom, map.getZoom()), duration: 600 });
  }

  // ---------- Game flow ----------
  let revealed = false;
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
      if (i === (revealed ? round() - 1 : round())) d.classList.add("current");
      el.appendChild(d);
    });
  }

  function setPrompt() {
    const i = revealed ? round() - 1 : round();
    $("prompt-label").textContent = `Round ${i + 1} of ${places.length}`;
    $("prompt-name").textContent = places[i].name;
  }

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
    setAction("", false, null);
  }

  map.on("click", (e) => {
    if (!dayKey || reviewMode) return;
    // After a reveal, tapping the map moves on (same as the Next button).
    if (revealed) { if (round() < places.length) startRound(); return; }
    if (round() >= places.length) return;
    guess({ lon: e.lngLat.lng, lat: e.lngLat.lat });
  });

  function guess(pt) {
    const i = round();
    const p = places[i];
    const mi = distanceMi(pt, p);
    const score = roundScore(mi);
    game.guesses.push({ lat: +pt.lat.toFixed(5), lon: +pt.lon.toFixed(5), mi: +mi.toFixed(3), score });
    persist();
    revealed = true;
    clearMarks();
    animateReveal(pt, p);
    showBoth(pt, p);
    renderRounds();
    setPrompt();
    const pts = score * MULTIPLIERS[i];
    $("result").innerHTML =
      `<b>${fmtDist(mi)}</b> away · ` +
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
    const feats = [];
    places.forEach((p, i) => {
      const g = game.guesses[i];
      feats.push(lineFeature(g, p));
      addMarker("guess", g);
      addMarker("answer", p, p.name);
    });
    setLinks(feats);
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
    let streak = 0;
    const d = new Date();
    if (!store[dateKey(d)]?.done) d.setDate(d.getDate() - 1);
    while (store[dateKey(d)]?.done) { streak++; d.setDate(d.getDate() - 1); }
    return { played: done.length, avg, best, streak };
  }

  function shareText() {
    return [
      `${CITY.shareTitle} · ${prettyDate(dayKey, { month: "short", day: "numeric" })}`,
      game.guesses.map((g) => `${tierEmoji[tier(g.score)]}${g.score}`).join(" "),
      `Final score: ${total(game.guesses)}`,
      location.origin + location.pathname
    ].join("\n");
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
    const s = Math.floor((next - now) / 1000);
    $("countdown").textContent = window.CHALLENGES[dateKey(next)]
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
  map.on("load", () => {
    if (reviewMode) {
      // ?review: every scheduled place on the map, to eyeball coordinates.
      $("rounds").innerHTML = "";
      $("prompt-label").textContent = "Review mode";
      $("prompt-name").textContent = "All places";
      Object.values(window.CHALLENGES).flat().forEach((p) => addMarker("answer", p, p.name));
      return;
    }
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
