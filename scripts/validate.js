// Validates challenges.js: 5 places/day, no repeats, each point inside its state.
// Usage: node scripts/validate.js
const fs = require("fs");
const path = require("path");
const d3 = require("../vendor/d3.min.js");
const topojson = require("../vendor/topojson-client.min.js");

const root = path.join(__dirname, "..");
const window = {};
new Function("window", fs.readFileSync(path.join(root, "challenges.js"), "utf8"))(window);
const us = JSON.parse(fs.readFileSync(path.join(__dirname, "states-10m.json"), "utf8"));
const states = topojson.feature(us, us.objects.states).features;
const FIPS = { AL:"01",AK:"02",AZ:"04",AR:"05",CA:"06",CO:"08",CT:"09",DE:"10",DC:"11",FL:"12",GA:"13",HI:"15",ID:"16",IL:"17",IN:"18",IA:"19",KS:"20",KY:"21",LA:"22",ME:"23",MD:"24",MA:"25",MI:"26",MN:"27",MS:"28",MO:"29",MT:"30",NE:"31",NV:"32",NH:"33",NJ:"34",NM:"35",NY:"36",NC:"37",ND:"38",OH:"39",OK:"40",OR:"41",PA:"42",RI:"44",SC:"45",SD:"46",TN:"47",TX:"48",UT:"49",VT:"50",VA:"51",WA:"53",WV:"54",WI:"55",WY:"56" };
const MI = 3958.8;

let errors = 0, warns = 0;
const seen = new Map();
for (const [date, places] of Object.entries(window.CHALLENGES)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { console.error(`bad date ${date}`); errors++; }
  if (places.length !== 5) { console.error(`${date}: ${places.length} places`); errors++; }
  for (const p of places) {
    if (seen.has(p.name)) { console.error(`${date}: duplicate "${p.name}" (also ${seen.get(p.name)})`); errors++; }
    seen.set(p.name, date);
    const st = states.find(f => f.id === FIPS[p.state]);
    if (!st) { console.error(`${date}: unknown state ${p.state}`); errors++; continue; }
    const pt = [p.lon, p.lat];
    if (d3.geoContains(st, pt)) continue;
    // Coastal/island points may fall just outside the simplified outline.
    const near = d3.geoDistance(pt, d3.geoCentroid(st)) * MI;
    const edge = Math.min(...st.geometry.coordinates.flat(st.geometry.type === "MultiPolygon" ? 2 : 1).map(c => d3.geoDistance(pt, c) * MI));
    if (edge < 15) { console.warn(`${date}: "${p.name}" ${edge.toFixed(1)} mi outside ${p.state} outline (ok)`); warns++; }
    else { console.error(`${date}: "${p.name}" not in ${p.state} (${edge.toFixed(0)} mi from edge, ${near.toFixed(0)} from centroid)`); errors++; }
  }
}
console.log(`${Object.keys(window.CHALLENGES).length} days, ${seen.size} places, ${warns} warnings, ${errors} errors`);
process.exit(errors ? 1 : 0);
