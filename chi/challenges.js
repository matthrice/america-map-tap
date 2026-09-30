// Chicago Tap daily challenges: 5 Chicago places per day, keyed by local date (YYYY-MM-DD).
// Rounds 1-2 are well known, rounds 3-5 (worth x2/x3) are harder.
// Check coordinates visually with ?review (shows every place on the map).
window.CHALLENGES = {
  "2026-09-30": [
    { name: "Water Tower", lat: 41.8972, lon: -87.6245 },
    { name: "Chinatown Gate", lat: 41.8527, lon: -87.632 },
    { name: "Chicago Cultural Center", lat: 41.8838, lon: -87.625 },
    { name: "Brookfield Zoo", lat: 41.8352, lon: -87.833 },
    { name: "Allstate Arena", lat: 42.0054, lon: -87.8886 }
  ],
  "2026-10-01": [
    { name: "The Bean", lat: 41.8827, lon: -87.6233 },
    { name: "Chicago Board of Trade", lat: 41.8777, lon: -87.6323 },
    { name: "Chicago History Museum", lat: 41.9119, lon: -87.6317 },
    { name: "Lincoln Park Conservatory", lat: 41.9244, lon: -87.6355 },
    { name: "Robie House", lat: 41.7897, lon: -87.5959 }
  ],
  "2026-10-02": [
    { name: "Midway Airport", lat: 41.7868, lon: -87.7522 },
    { name: "North Avenue Beach", lat: 41.9146, lon: -87.6247 },
    { name: "DuSable Black History Museum", lat: 41.7917, lon: -87.6071 },
    { name: "Lane Tech", lat: 41.9474, lon: -87.6873 },
    { name: "Northerly Island", lat: 41.8563, lon: -87.609 }
  ],
  "2026-10-03": [
    { name: "McCormick Place", lat: 41.8514, lon: -87.6158 },
    { name: "Shedd Aquarium", lat: 41.8676, lon: -87.614 },
    { name: "Promontory Point", lat: 41.7945, lon: -87.5796 },
    { name: "Humboldt Park Boathouse", lat: 41.9048, lon: -87.7016 },
    { name: "Old Post Office", lat: 41.8752, lon: -87.6391 }
  ],
  "2026-10-04": [
    { name: "Union Station", lat: 41.8786, lon: -87.6403 },
    { name: "Navy Pier", lat: 41.8917, lon: -87.6086 },
    { name: "Loyola University", lat: 41.999, lon: -87.658 },
    { name: "Frank Lloyd Wright Home & Studio", lat: 41.8942, lon: -87.7995 },
    { name: "Oz Park", lat: 41.9195, lon: -87.6446 }
  ],
  "2026-10-05": [
    { name: "Chicago Theatre", lat: 41.8855, lon: -87.6272 },
    { name: "Garfield Park Conservatory", lat: 41.8863, lon: -87.7173 },
    { name: "Logan Square Monument", lat: 41.9296, lon: -87.7074 },
    { name: "Andersonville (Clark & Foster)", lat: 41.976, lon: -87.6683 },
    { name: "South Shore Cultural Center", lat: 41.7614, lon: -87.568 }
  ],
  "2026-10-06": [
    { name: "O'Hare Airport", lat: 41.9742, lon: -87.9073 },
    { name: "Field Museum", lat: 41.8663, lon: -87.617 },
    { name: "Portillo's (Clark & Ontario)", lat: 41.8935, lon: -87.6311 },
    { name: "DePaul University", lat: 41.9253, lon: -87.6551 },
    { name: "Pullman Clock Tower", lat: 41.6926, lon: -87.6104 }
  ],
  "2026-10-07": [
    { name: "Wicker Park (Six Corners)", lat: 41.9103, lon: -87.6776 },
    { name: "Tribune Tower", lat: 41.8904, lon: -87.6235 },
    { name: "Baha'i House of Worship", lat: 42.0741, lon: -87.6848 },
    { name: "Pequod's Pizza", lat: 41.9219, lon: -87.6645 },
    { name: "Ping Tom Memorial Park", lat: 41.8573, lon: -87.6352 }
  ],
  "2026-10-08": [
    { name: "Rate Field (Sox Park)", lat: 41.8299, lon: -87.6338 },
    { name: "The Second City", lat: 41.9115, lon: -87.6352 },
    { name: "Green Mill", lat: 41.969, lon: -87.6597 },
    { name: "Lincoln Square", lat: 41.9685, lon: -87.689 },
    { name: "Union Stock Yards Gate", lat: 41.8185, lon: -87.644 }
  ],
  "2026-10-09": [
    { name: "Northwestern University", lat: 42.0565, lon: -87.6753 },
    { name: "United Center", lat: 41.8807, lon: -87.6742 },
    { name: "Harold Washington Library", lat: 41.8763, lon: -87.6282 },
    { name: "Greektown", lat: 41.8784, lon: -87.6473 },
    { name: "Obama Presidential Center", lat: 41.7849, lon: -87.582 }
  ],
  "2026-10-10": [
    { name: "Wrigley Field", lat: 41.9484, lon: -87.6553 },
    { name: "Art Institute of Chicago", lat: 41.8796, lon: -87.6237 },
    { name: "Devon Avenue", lat: 41.9978, lon: -87.695 },
    { name: "Rosehill Cemetery", lat: 41.9882, lon: -87.6782 },
    { name: "Marina City", lat: 41.8876, lon: -87.6285 }
  ],
  "2026-10-11": [
    { name: "National Museum of Mexican Art", lat: 41.8561, lon: -87.6728 },
    { name: "Lincoln Park Zoo", lat: 41.9211, lon: -87.634 },
    { name: "Ohio Street Beach", lat: 41.8932, lon: -87.613 },
    { name: "Oak Street Beach", lat: 41.903, lon: -87.6246 },
    { name: "Little Village Arch", lat: 41.8445, lon: -87.713 }
  ],
  "2026-10-12": [
    { name: "Buckingham Fountain", lat: 41.8758, lon: -87.6189 },
    { name: "Merchandise Mart", lat: 41.8885, lon: -87.6354 },
    { name: "Graceland Cemetery", lat: 41.9575, lon: -87.6594 },
    { name: "Rush University Medical Center", lat: 41.8745, lon: -87.669 },
    { name: "Fulton Market", lat: 41.8866, lon: -87.6484 }
  ],
  "2026-10-13": [
    { name: "Museum of Science and Industry", lat: 41.7906, lon: -87.5831 },
    { name: "Wrigley Building", lat: 41.8894, lon: -87.6245 },
    { name: "Newberry Library", lat: 41.8994, lon: -87.6311 },
    { name: "Chicago Harbor Lighthouse", lat: 41.8894, lon: -87.5908 },
    { name: "Midway Plaisance", lat: 41.7865, lon: -87.597 }
  ],
  "2026-10-14": [
    { name: "Montrose Beach", lat: 41.9636, lon: -87.6387 },
    { name: "John Hancock Center", lat: 41.8988, lon: -87.6229 },
    { name: "Lake Point Tower", lat: 41.8917, lon: -87.6164 },
    { name: "Maggie Daley Park", lat: 41.8826, lon: -87.6189 },
    { name: "Rainbow Beach", lat: 41.7576, lon: -87.5497 }
  ],
  "2026-10-15": [
    { name: "Adler Planetarium", lat: 41.8663, lon: -87.6068 },
    { name: "Willis Tower", lat: 41.8789, lon: -87.6359 },
    { name: "Marquette Park", lat: 41.7703, lon: -87.7011 },
    { name: "Holy Name Cathedral", lat: 41.896, lon: -87.6278 },
    { name: "UIC", lat: 41.8708, lon: -87.6505 }
  ],
  "2026-10-16": [
    { name: "Soldier Field", lat: 41.8623, lon: -87.6167 },
    { name: "University of Chicago", lat: 41.7886, lon: -87.5966 },
    { name: "Chicago Botanic Garden", lat: 42.1498, lon: -87.7894 },
    { name: "IIT Crown Hall", lat: 41.833, lon: -87.6273 },
    { name: "Belmont Harbor", lat: 41.942, lon: -87.636 }
  ]
};
