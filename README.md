# MapTap USA

Daily US geography game (inspired by maptap.gg). Five places a day — tap where each one is. Closer = more points; rounds weighted ×1, ×1, ×2, ×3, ×3 (1000 max).

Static site, no build step. Open `index.html` via any static server:

```
python3 -m http.server
```

## Challenges

`challenges.js` holds one entry per date (`YYYY-MM-DD`, player's local time), 5 places each. Only today and past dates are playable (`?d=YYYY-MM-DD` for archive).

Validate after editing (checks 5/day, no duplicates, each point lies in its state):

```
node scripts/validate.js
```

## Deploy

Served directly from the repo root. One-time setup: **Settings → Pages → Source: Deploy from a branch**, pick the branch, folder `/ (root)`.

Map data: [us-atlas](https://github.com/topojson/us-atlas) (Census Bureau). Libraries: d3, topojson-client (vendored).

## City games (`atx/`, `nyc/`, `chi/`)

ATX Tap (Austin), NYC Tap and Chicago Tap run on Mapbox (street names shown, place labels hidden). Shared code lives in `city/` (`app.js`, `city.css`, `config.js` with the Mapbox public token). Each city folder (`atx/`, `nyc/`, `chi/`) has its own `index.html` (with a small `window.CITY` settings block: save key, map area, map style), `challenges.js`, and a theme stylesheet. Open e.g. `chi/?review` to see every place on the map and check coordinates.

## Bet Tap (`bet/`)

World-map betting game on a Mapbox globe (no labels). 7 places a day, the same for everyone: day N takes the next 7 places from one fixed shuffle of `bet/places.js`. Start with 1,000 chips; each place has a line (`r`, miles) and a payout (`pays`, profit × bet). Bet, tap, win or lose; cash out any time. Uses the shared Mapbox token in `city/config.js`.
