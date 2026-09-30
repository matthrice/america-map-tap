// NYC Tap daily challenges: 5 New York City places per day, keyed by local date (YYYY-MM-DD).
// Rounds 1-2 are well known, rounds 3-5 (worth x2/x3) are harder.
// Check coordinates visually with ?review (shows every place on the map).
window.CHALLENGES = {
  "2026-09-30": [
    { name: "Stonewall Inn", lat: 40.7338, lon: -74.0021 },
    { name: "MoMA", lat: 40.7614, lon: -73.9776 },
    { name: "Astoria Park", lat: 40.7792, lon: -73.9224 },
    { name: "Domino Park", lat: 40.7143, lon: -73.968 },
    { name: "Icahn Stadium (Randall's Island)", lat: 40.7952, lon: -73.9235 }
  ],
  "2026-10-01": [
    { name: "Madison Square Garden", lat: 40.7505, lon: -73.9934 },
    { name: "Coney Island Cyclone", lat: 40.5751, lon: -73.978 },
    { name: "Gracie Mansion", lat: 40.7764, lon: -73.9431 },
    { name: "Green-Wood Cemetery", lat: 40.6582, lon: -73.9945 },
    { name: "Brooklyn Navy Yard", lat: 40.7003, lon: -73.9711 }
  ],
  "2026-10-02": [
    { name: "Grand Central Terminal", lat: 40.7527, lon: -73.9772 },
    { name: "Washington Square Arch", lat: 40.7312, lon: -73.9971 },
    { name: "Rikers Island", lat: 40.7931, lon: -73.886 },
    { name: "Brighton Beach", lat: 40.5776, lon: -73.9614 },
    { name: "Arthur Avenue", lat: 40.8554, lon: -73.8871 }
  ],
  "2026-10-03": [
    { name: "Bethesda Fountain", lat: 40.774, lon: -73.9708 },
    { name: "Charging Bull", lat: 40.7056, lon: -74.0134 },
    { name: "Little Island", lat: 40.742, lon: -74.0103 },
    { name: "Gantry Plaza State Park", lat: 40.7453, lon: -73.9585 },
    { name: "Verrazzano-Narrows Bridge", lat: 40.6066, lon: -74.0447 }
  ],
  "2026-10-04": [
    { name: "Chelsea Market", lat: 40.7424, lon: -74.006 },
    { name: "United Nations", lat: 40.7489, lon: -73.968 },
    { name: "New York Botanical Garden", lat: 40.8623, lon: -73.88 },
    { name: "Forest Hills Stadium", lat: 40.7197, lon: -73.8466 },
    { name: "Rockaway Beach", lat: 40.585, lon: -73.817 }
  ],
  "2026-10-05": [
    { name: "Lincoln Center", lat: 40.7725, lon: -73.9835 },
    { name: "Bronx Zoo", lat: 40.8506, lon: -73.8769 },
    { name: "Hell Gate Bridge", lat: 40.7822, lon: -73.9215 },
    { name: "Chinatown (Mott & Pell)", lat: 40.7147, lon: -73.9982 },
    { name: "Jackson Heights (74th St)", lat: 40.7467, lon: -73.8913 }
  ],
  "2026-10-06": [
    { name: "Chrysler Building", lat: 40.7516, lon: -73.9755 },
    { name: "Yankee Stadium", lat: 40.8296, lon: -73.9262 },
    { name: "Wave Hill", lat: 40.898, lon: -73.9116 },
    { name: "Brooklyn Botanic Garden", lat: 40.6694, lon: -73.9624 },
    { name: "MoMA PS1", lat: 40.7455, lon: -73.9471 }
  ],
  "2026-10-07": [
    { name: "Guggenheim Museum", lat: 40.783, lon: -73.959 },
    { name: "Times Square", lat: 40.758, lon: -73.9855 },
    { name: "Inwood Hill Park", lat: 40.8723, lon: -73.9258 },
    { name: "Ellis Island", lat: 40.6995, lon: -74.0396 },
    { name: "Jamaica Bay Wildlife Refuge", lat: 40.617, lon: -73.8252 }
  ],
  "2026-10-08": [
    { name: "The Vessel (Hudson Yards)", lat: 40.7538, lon: -74.0022 },
    { name: "Rockefeller Center", lat: 40.7587, lon: -73.9787 },
    { name: "Socrates Sculpture Park", lat: 40.7685, lon: -73.9366 },
    { name: "Staten Island Mall", lat: 40.5813, lon: -74.1669 },
    { name: "Governors Island", lat: 40.6895, lon: -74.0168 }
  ],
  "2026-10-09": [
    { name: "Columbia University", lat: 40.8075, lon: -73.9626 },
    { name: "The Met", lat: 40.7794, lon: -73.9632 },
    { name: "Roosevelt Island Tramway", lat: 40.7613, lon: -73.9643 },
    { name: "Union Square", lat: 40.7359, lon: -73.9911 },
    { name: "McCarren Park", lat: 40.7207, lon: -73.951 }
  ],
  "2026-10-10": [
    { name: "Staten Island Ferry (Whitehall)", lat: 40.7013, lon: -74.0132 },
    { name: "Citi Field", lat: 40.7571, lon: -73.8458 },
    { name: "Brooklyn Museum", lat: 40.6712, lon: -73.9636 },
    { name: "Louis Armstrong House", lat: 40.7546, lon: -73.8616 },
    { name: "Snug Harbor", lat: 40.6437, lon: -74.1024 }
  ],
  "2026-10-11": [
    { name: "Barclays Center", lat: 40.6826, lon: -73.9754 },
    { name: "Unisphere", lat: 40.7465, lon: -73.8451 },
    { name: "Little Red Lighthouse", lat: 40.8506, lon: -73.947 },
    { name: "The Cloisters", lat: 40.8649, lon: -73.9317 },
    { name: "Marcus Garvey Park", lat: 40.8045, lon: -73.9435 }
  ],
  "2026-10-12": [
    { name: "Apollo Theater", lat: 40.81, lon: -73.95 },
    { name: "JFK Airport", lat: 40.6413, lon: -73.7781 },
    { name: "City Island", lat: 40.8468, lon: -73.7867 },
    { name: "Strawberry Fields", lat: 40.7757, lon: -73.975 },
    { name: "Orchard Beach", lat: 40.8672, lon: -73.7937 }
  ],
  "2026-10-13": [
    { name: "Flatiron Building", lat: 40.7411, lon: -73.9897 },
    { name: "Grand Army Plaza", lat: 40.674, lon: -73.97 },
    { name: "Flushing (Main St)", lat: 40.7596, lon: -73.8303 },
    { name: "Bryant Park", lat: 40.7536, lon: -73.9832 },
    { name: "Morris-Jumel Mansion", lat: 40.8344, lon: -73.9388 }
  ],
  "2026-10-14": [
    { name: "Brooklyn Bridge", lat: 40.7061, lon: -73.9969 },
    { name: "Empire State Building", lat: 40.7484, lon: -73.9857 },
    { name: "Grant's Tomb", lat: 40.8134, lon: -73.963 },
    { name: "Intrepid Museum", lat: 40.7645, lon: -73.9996 },
    { name: "Museum of the Moving Image", lat: 40.7563, lon: -73.9239 }
  ],
  "2026-10-15": [
    { name: "Statue of Liberty", lat: 40.6892, lon: -74.0445 },
    { name: "LaGuardia Airport", lat: 40.7769, lon: -73.874 },
    { name: "Tompkins Square Park", lat: 40.7265, lon: -73.9818 },
    { name: "Brooklyn Heights Promenade", lat: 40.6962, lon: -73.9977 },
    { name: "IKEA Red Hook", lat: 40.672, lon: -74.011 }
  ],
  "2026-10-16": [
    { name: "Katz's Delicatessen", lat: 40.7223, lon: -73.9874 },
    { name: "One World Trade Center", lat: 40.7127, lon: -74.0134 },
    { name: "Carnegie Hall", lat: 40.7651, lon: -73.9799 },
    { name: "DUMBO (Washington St)", lat: 40.7033, lon: -73.9894 },
    { name: "South Street Seaport", lat: 40.7063, lon: -74.0036 }
  ]
};
