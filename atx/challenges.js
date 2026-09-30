// ATX Tap daily challenges: 5 Austin places per day, keyed by local date (YYYY-MM-DD).
// Rounds 1-2 are well known, rounds 3-5 (worth x2/x3) are harder.
// Check coordinates visually with ?review (shows every place on the map).
window.CHALLENGES = {
  "2026-09-30": [
    { name: "Continental Club", lat: 30.2498, lon: -97.7494 },
    { name: "Frost Bank Tower", lat: 30.2666, lon: -97.7422 },
    { name: "Southpark Meadows", lat: 30.1625, lon: -97.7895 },
    { name: "Emma Long Metropolitan Park", lat: 30.3284, lon: -97.8401 },
    { name: "Austin Nature & Science Center", lat: 30.2729, lon: -97.7738 }
  ],
  "2026-10-01": [
    { name: "The Domain", lat: 30.4021, lon: -97.7253 },
    { name: "Circuit of the Americas", lat: 30.1346, lon: -97.6358 },
    { name: "Lakeline Mall", lat: 30.4725, lon: -97.8036 },
    { name: "Seaholm Power Plant", lat: 30.2672, lon: -97.753 },
    { name: "Zilker Botanical Garden", lat: 30.2703, lon: -97.769 }
  ],
  "2026-10-02": [
    { name: "Zilker Park", lat: 30.2669, lon: -97.7729 },
    { name: "\"I love you so much\" mural", lat: 30.2513, lon: -97.7489 },
    { name: "Umlauf Sculpture Garden", lat: 30.2639, lon: -97.7669 },
    { name: "Austin City Hall", lat: 30.265, lon: -97.747 },
    { name: "Emo's", lat: 30.2396, lon: -97.7282 }
  ],
  "2026-10-03": [
    { name: "DKR-Texas Memorial Stadium", lat: 30.2837, lon: -97.7325 },
    { name: "Congress Avenue Bat Bridge", lat: 30.2616, lon: -97.7451 },
    { name: "The Oasis on Lake Travis", lat: 30.4133, lon: -97.9226 },
    { name: "Pease Park", lat: 30.284, lon: -97.7527 },
    { name: "Dirty Martin's", lat: 30.2934, lon: -97.7418 }
  ],
  "2026-10-04": [
    { name: "Pennybacker (360) Bridge", lat: 30.351, lon: -97.796 },
    { name: "Rainey Street", lat: 30.2585, lon: -97.7387 },
    { name: "The Drag (Guadalupe & 24th)", lat: 30.287, lon: -97.7419 },
    { name: "The Independent (\"Jenga Tower\")", lat: 30.2672, lon: -97.7505 },
    { name: "Mexic-Arte Museum", lat: 30.2665, lon: -97.7433 }
  ],
  "2026-10-05": [
    { name: "Moody Center", lat: 30.2818, lon: -97.732 },
    { name: "UT Tower", lat: 30.2862, lon: -97.7394 },
    { name: "Mexican American Cultural Center", lat: 30.2593, lon: -97.7385 },
    { name: "Mansfield Dam", lat: 30.3915, lon: -97.9063 },
    { name: "The Arboretum", lat: 30.394, lon: -97.7496 }
  ],
  "2026-10-06": [
    { name: "Tesla Gigafactory", lat: 30.2222, lon: -97.6167 },
    { name: "Terry Black's BBQ", lat: 30.2588, lon: -97.7547 },
    { name: "Bull Creek District Park", lat: 30.3707, lon: -97.7863 },
    { name: "Chuy's (Barton Springs Rd)", lat: 30.2617, lon: -97.7612 },
    { name: "ACC Highland", lat: 30.3265, lon: -97.7128 }
  ],
  "2026-10-07": [
    { name: "Texas State Capitol", lat: 30.2747, lon: -97.7404 },
    { name: "Mueller Lake Park", lat: 30.2968, lon: -97.7066 },
    { name: "Lions Municipal Golf Course", lat: 30.2886, lon: -97.7697 },
    { name: "Uchi", lat: 30.2566, lon: -97.7606 },
    { name: "Tom Miller Dam", lat: 30.2945, lon: -97.7856 }
  ],
  "2026-10-08": [
    { name: "Stubb's", lat: 30.2685, lon: -97.7361 },
    { name: "LBJ Presidential Library", lat: 30.2858, lon: -97.7292 },
    { name: "Plaza Saltillo", lat: 30.262, lon: -97.727 },
    { name: "Lady Bird Johnson Wildflower Center", lat: 30.1856, lon: -97.8731 },
    { name: "Zach Theatre", lat: 30.261, lon: -97.7572 }
  ],
  "2026-10-09": [
    { name: "Barton Springs Pool", lat: 30.264, lon: -97.7713 },
    { name: "Dirty Sixth (6th & Trinity)", lat: 30.2673, lon: -97.7397 },
    { name: "Camp Mabry", lat: 30.3144, lon: -97.7627 },
    { name: "Red Bud Isle", lat: 30.2903, lon: -97.7862 },
    { name: "Austin High School", lat: 30.2735, lon: -97.7625 }
  ],
  "2026-10-10": [
    { name: "Alamo Drafthouse South Lamar", lat: 30.2562, lon: -97.763 },
    { name: "Franklin Barbecue", lat: 30.2701, lon: -97.7313 },
    { name: "St. Edward's University", lat: 30.2285, lon: -97.755 },
    { name: "Longhorn Dam", lat: 30.2505, lon: -97.7183 },
    { name: "Republic Square", lat: 30.268, lon: -97.747 }
  ],
  "2026-10-11": [
    { name: "Broken Spoke", lat: 30.2413, lon: -97.7838 },
    { name: "Mount Bonnell", lat: 30.3208, lon: -97.7735 },
    { name: "Barton Creek Square", lat: 30.2573, lon: -97.8063 },
    { name: "Central Market North Lamar", lat: 30.307, lon: -97.74 },
    { name: "UFCU Disch-Falk Field", lat: 30.2813, lon: -97.7278 }
  ],
  "2026-10-12": [
    { name: "Whole Foods flagship", lat: 30.2707, lon: -97.7535 },
    { name: "Austin-Bergstrom Airport", lat: 30.1945, lon: -97.6699 },
    { name: "Mozart's Coffee", lat: 30.2957, lon: -97.7843 },
    { name: "Paramount Theatre", lat: 30.269, lon: -97.7426 },
    { name: "Harry Ransom Center", lat: 30.2843, lon: -97.7411 }
  ],
  "2026-10-13": [
    { name: "Pfluger Pedestrian Bridge", lat: 30.2641, lon: -97.7502 },
    { name: "Governor's Mansion", lat: 30.2729, lon: -97.7434 },
    { name: "Waterloo Park", lat: 30.2748, lon: -97.7355 },
    { name: "Oakwood Cemetery", lat: 30.2762, lon: -97.7275 },
    { name: "McKinney Falls State Park", lat: 30.1836, lon: -97.7222 }
  ],
  "2026-10-14": [
    { name: "Q2 Stadium", lat: 30.3877, lon: -97.7195 },
    { name: "Driskill Hotel", lat: 30.2681, lon: -97.7419 },
    { name: "Laguna Gloria", lat: 30.3136, lon: -97.774 },
    { name: "Texas State Cemetery", lat: 30.2652, lon: -97.7266 },
    { name: "Hill Country Galleria", lat: 30.308, lon: -97.939 }
  ],
  "2026-10-15": [
    { name: "Deep Eddy Pool", lat: 30.2767, lon: -97.7727 },
    { name: "Long Center", lat: 30.2598, lon: -97.7515 },
    { name: "Blanton Museum of Art", lat: 30.2808, lon: -97.7375 },
    { name: "Mayfield Park", lat: 30.3128, lon: -97.7718 },
    { name: "Elisabet Ney Museum", lat: 30.3072, lon: -97.7263 }
  ],
  "2026-10-16": [
    { name: "Austin Central Library", lat: 30.2656, lon: -97.7518 },
    { name: "Austin Zoo", lat: 30.2605, lon: -97.9365 },
    { name: "Bullock Texas State History Museum", lat: 30.2803, lon: -97.7391 },
    { name: "Huston-Tillotson University", lat: 30.2644, lon: -97.7231 },
    { name: "Austin Convention Center", lat: 30.2635, lon: -97.7398 }
  ]
};
