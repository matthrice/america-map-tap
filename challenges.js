// Daily challenges: 5 places per day, keyed by local date (YYYY-MM-DD).
// Rounds 1-2 are well known, rounds 3-5 (worth x2/x3) are harder.
// Cities are shown as "Name, ST"; `landmark: true` entries are shown without the state.
window.CHALLENGES = {
  "2026-09-30": [
    { name: "Chicago", state: "IL", lat: 41.8781, lon: -87.6298 },
    { name: "Mount Rushmore", state: "SD", lat: 43.8791, lon: -103.4591, landmark: true },
    { name: "Savannah", state: "GA", lat: 32.0809, lon: -81.0912 },
    { name: "Twin Falls", state: "ID", lat: 42.5629, lon: -114.4609 },
    { name: "Kodiak", state: "AK", lat: 57.79, lon: -152.4072 }
  ],
  "2026-10-01": [
    { name: "Seattle", state: "WA", lat: 47.6062, lon: -122.3321 },
    { name: "Grand Canyon", state: "AZ", lat: 36.0544, lon: -112.1401, landmark: true },
    { name: "Paducah", state: "KY", lat: 37.0834, lon: -88.6 },
    { name: "Presque Isle", state: "ME", lat: 46.6812, lon: -68.0159 },
    { name: "Minot", state: "ND", lat: 48.233, lon: -101.2923 }
  ],
  "2026-10-02": [
    { name: "Miami", state: "FL", lat: 25.7617, lon: -80.1918 },
    { name: "Old Faithful", state: "WY", lat: 44.4605, lon: -110.8281, landmark: true },
    { name: "Joplin", state: "MO", lat: 37.0842, lon: -94.5133 },
    { name: "Taos", state: "NM", lat: 36.4072, lon: -105.5731 },
    { name: "St. Johnsbury", state: "VT", lat: 44.4192, lon: -72.0151 }
  ],
  "2026-10-03": [
    { name: "Los Angeles", state: "CA", lat: 34.0522, lon: -118.2437 },
    { name: "Statue of Liberty", state: "NY", lat: 40.6892, lon: -74.0445, landmark: true },
    { name: "Tupelo", state: "MS", lat: 34.2576, lon: -88.7034 },
    { name: "Laramie", state: "WY", lat: 41.3114, lon: -105.5911 },
    { name: "Kailua-Kona", state: "HI", lat: 19.64, lon: -155.9969 }
  ],
  "2026-10-04": [
    { name: "Denver", state: "CO", lat: 39.7392, lon: -104.9903 },
    { name: "Niagara Falls", state: "NY", lat: 43.0962, lon: -79.0377, landmark: true },
    { name: "Beaufort, SC", state: "SC", lat: 32.4316, lon: -80.6698 },
    { name: "Bemidji", state: "MN", lat: 47.4736, lon: -94.8803 },
    { name: "Yuma", state: "AZ", lat: 32.6927, lon: -114.6277 }
  ],
  "2026-10-05": [
    { name: "Boston", state: "MA", lat: 42.3601, lon: -71.0589 },
    { name: "Las Vegas", state: "NV", lat: 36.1699, lon: -115.1398 },
    { name: "Scottsbluff", state: "NE", lat: 41.8666, lon: -103.6672 },
    { name: "Key West", state: "FL", lat: 24.5551, lon: -81.78 },
    { name: "Wenatchee", state: "WA", lat: 47.4235, lon: -120.3103 }
  ],
  "2026-10-06": [
    { name: "Atlanta", state: "GA", lat: 33.749, lon: -84.388 },
    { name: "Salt Lake City", state: "UT", lat: 40.7608, lon: -111.891 },
    { name: "Erie", state: "PA", lat: 42.1292, lon: -80.0851 },
    { name: "Sitka", state: "AK", lat: 57.0531, lon: -135.33 },
    { name: "Hot Springs, AR", state: "AR", lat: 34.5037, lon: -93.0552 }
  ],
  "2026-10-07": [
    { name: "New Orleans", state: "LA", lat: 29.9511, lon: -90.0715 },
    { name: "Golden Gate Bridge", state: "CA", lat: 37.8199, lon: -122.4783, landmark: true },
    { name: "Marquette", state: "MI", lat: 46.5436, lon: -87.3954 },
    { name: "Gallup", state: "NM", lat: 35.5281, lon: -108.7426 },
    { name: "Aberdeen, SD", state: "SD", lat: 45.4647, lon: -98.4865 }
  ],
  "2026-10-08": [
    { name: "Houston", state: "TX", lat: 29.7604, lon: -95.3698 },
    { name: "Mount Rainier", state: "WA", lat: 46.8523, lon: -121.7603, landmark: true },
    { name: "Scranton", state: "PA", lat: 41.409, lon: -75.6624 },
    { name: "Williston", state: "ND", lat: 48.147, lon: -103.618 },
    { name: "Boone", state: "NC", lat: 36.2168, lon: -81.6746 }
  ],
  "2026-10-09": [
    { name: "Phoenix", state: "AZ", lat: 33.4484, lon: -112.074 },
    { name: "Washington, D.C.", state: "DC", lat: 38.9072, lon: -77.0369, landmark: true },
    { name: "Rochester, MN", state: "MN", lat: 44.0121, lon: -92.4802 },
    { name: "Elko", state: "NV", lat: 40.8324, lon: -115.7631 },
    { name: "Bar Harbor", state: "ME", lat: 44.3876, lon: -68.2039 }
  ],
  "2026-10-10": [
    { name: "Dallas", state: "TX", lat: 32.7767, lon: -96.797 },
    { name: "Portland, OR", state: "OR", lat: 45.5152, lon: -122.6784 },
    { name: "Cape Girardeau", state: "MO", lat: 37.3059, lon: -89.5181 },
    { name: "Kennedy Space Center", state: "FL", lat: 28.5729, lon: -80.649, landmark: true },
    { name: "Bozeman", state: "MT", lat: 45.677, lon: -111.0429 }
  ],
  "2026-10-11": [
    { name: "San Francisco", state: "CA", lat: 37.7749, lon: -122.4194 },
    { name: "Indianapolis", state: "IN", lat: 39.7684, lon: -86.1581 },
    { name: "Wilmington, NC", state: "NC", lat: 34.2257, lon: -77.9447 },
    { name: "Moab", state: "UT", lat: 38.5733, lon: -109.5498 },
    { name: "Bethel, AK", state: "AK", lat: 60.7922, lon: -161.7558 }
  ],
  "2026-10-12": [
    { name: "Times Square", state: "NY", lat: 40.758, lon: -73.9855, landmark: true },
    { name: "Austin", state: "TX", lat: 30.2672, lon: -97.7431 },
    { name: "Eau Claire", state: "WI", lat: 44.8113, lon: -91.4985 },
    { name: "Eureka, CA", state: "CA", lat: 40.8021, lon: -124.1637 },
    { name: "Dodge City", state: "KS", lat: 37.7528, lon: -100.0171 }
  ],
  "2026-10-13": [
    { name: "San Diego", state: "CA", lat: 32.7157, lon: -117.1611 },
    { name: "Cleveland", state: "OH", lat: 41.4993, lon: -81.6944 },
    { name: "Dothan", state: "AL", lat: 31.2232, lon: -85.3905 },
    { name: "Gatlinburg", state: "TN", lat: 35.7143, lon: -83.5102 },
    { name: "Missoula", state: "MT", lat: 46.8721, lon: -113.994 }
  ],
  "2026-10-14": [
    { name: "The Alamo", state: "TX", lat: 29.426, lon: -98.4861, landmark: true },
    { name: "Baltimore", state: "MD", lat: 39.2904, lon: -76.6122 },
    { name: "Guymon", state: "OK", lat: 36.6828, lon: -101.4816 },
    { name: "Lihue", state: "HI", lat: 21.9811, lon: -159.3711 },
    { name: "Mackinac Island", state: "MI", lat: 45.8492, lon: -84.6189 }
  ],
  "2026-10-15": [
    { name: "Orlando", state: "FL", lat: 28.5383, lon: -81.3792 },
    { name: "Des Moines", state: "IA", lat: 41.5868, lon: -93.625 },
    { name: "Bowling Green, KY", state: "KY", lat: 36.9685, lon: -86.4808 },
    { name: "Crater Lake", state: "OR", lat: 42.9446, lon: -122.109, landmark: true },
    { name: "Newport, RI", state: "RI", lat: 41.4901, lon: -71.3128 }
  ],
  "2026-10-16": [
    { name: "Columbus, OH", state: "OH", lat: 39.9612, lon: -82.9988 },
    { name: "Arches National Park", state: "UT", lat: 38.7331, lon: -109.5925, landmark: true },
    { name: "Roanoke", state: "VA", lat: 37.271, lon: -79.9414 },
    { name: "Hattiesburg", state: "MS", lat: 31.3271, lon: -89.2903 },
    { name: "Fairbanks", state: "AK", lat: 64.8378, lon: -147.7164 }
  ],
  "2026-10-17": [
    { name: "Sacramento", state: "CA", lat: 38.5816, lon: -121.4944 },
    { name: "Cincinnati", state: "OH", lat: 39.1031, lon: -84.512 },
    { name: "Fort Myers", state: "FL", lat: 26.6406, lon: -81.8723 },
    { name: "Devils Tower", state: "WY", lat: 44.5902, lon: -104.7146, landmark: true },
    { name: "New Haven", state: "CT", lat: 41.3083, lon: -72.9279 }
  ],
  "2026-10-18": [
    { name: "Buffalo", state: "NY", lat: 42.8864, lon: -78.8784 },
    { name: "El Paso", state: "TX", lat: 31.7619, lon: -106.485 },
    { name: "Durham, NC", state: "NC", lat: 35.994, lon: -78.8986 },
    { name: "Mammoth Lakes", state: "CA", lat: 37.6485, lon: -118.9721 },
    { name: "La Crosse", state: "WI", lat: 43.8014, lon: -91.2396 }
  ],
  "2026-10-19": [
    { name: "Jacksonville", state: "FL", lat: 30.3322, lon: -81.6557 },
    { name: "Pikes Peak", state: "CO", lat: 38.8409, lon: -105.0423, landmark: true },
    { name: "Lafayette, LA", state: "LA", lat: 30.2241, lon: -92.0198 },
    { name: "Mount Washington", state: "NH", lat: 44.2706, lon: -71.3033, landmark: true },
    { name: "Walla Walla", state: "WA", lat: 46.0646, lon: -118.343 }
  ],
  "2026-10-20": [
    { name: "Kitty Hawk", state: "NC", lat: 36.0646, lon: -75.7057 },
    { name: "North Platte", state: "NE", lat: 41.1239, lon: -100.7654 },
    { name: "Mobile", state: "AL", lat: 30.6954, lon: -88.0399 },
    { name: "Winslow", state: "AZ", lat: 35.0242, lon: -110.6974 },
    { name: "Nome", state: "AK", lat: 64.5011, lon: -165.4064 }
  ],
  "2026-10-21": [
    { name: "Palm Springs", state: "CA", lat: 33.8303, lon: -116.5453 },
    { name: "Chattanooga", state: "TN", lat: 35.0456, lon: -85.3097 },
    { name: "Hazard", state: "KY", lat: 37.2495, lon: -83.1932 },
    { name: "Deadwood", state: "SD", lat: 44.3767, lon: -103.7296 },
    { name: "Ocean City, MD", state: "MD", lat: 38.3365, lon: -75.0849 }
  ],
  "2026-10-22": [
    { name: "Corpus Christi", state: "TX", lat: 27.8006, lon: -97.3964 },
    { name: "Green Bay", state: "WI", lat: 44.5133, lon: -88.0133 },
    { name: "Everglades (Flamingo)", state: "FL", lat: 25.1413, lon: -80.924, landmark: true },
    { name: "Pierre", state: "SD", lat: 44.3683, lon: -100.351 },
    { name: "Nantucket", state: "MA", lat: 41.2835, lon: -70.0995 }
  ],
  "2026-10-23": [
    { name: "Tulsa", state: "OK", lat: 36.154, lon: -95.9928 },
    { name: "Bend", state: "OR", lat: 44.0582, lon: -121.3153 },
    { name: "Johnson City, TN", state: "TN", lat: 36.3134, lon: -82.3535 },
    { name: "Carlsbad Caverns", state: "NM", lat: 32.1479, lon: -104.5567, landmark: true },
    { name: "Provincetown", state: "MA", lat: 42.0584, lon: -70.1786 }
  ],
  "2026-10-24": [
    { name: "Grand Rapids", state: "MI", lat: 42.9634, lon: -85.6681 },
    { name: "Amarillo", state: "TX", lat: 35.222, lon: -101.8313 },
    { name: "Selma", state: "AL", lat: 32.4074, lon: -87.0211 },
    { name: "Logan Pass, Glacier NP", state: "MT", lat: 48.6966, lon: -113.7183, landmark: true },
    { name: "Rehoboth Beach", state: "DE", lat: 38.7209, lon: -75.076 }
  ],
  "2026-10-25": [
    { name: "Myrtle Beach", state: "SC", lat: 33.6891, lon: -78.8867 },
    { name: "Big Bend National Park", state: "TX", lat: 29.2498, lon: -103.2502, landmark: true },
    { name: "Hutchinson", state: "KS", lat: 38.0608, lon: -97.9298 },
    { name: "Port Angeles", state: "WA", lat: 48.1181, lon: -123.4307 },
    { name: "Hana", state: "HI", lat: 20.7575, lon: -155.9884 }
  ],
  "2026-10-26": [
    { name: "Salem, MA", state: "MA", lat: 42.5195, lon: -70.8967, theme: "Spooky Week" },
    { name: "Sleepy Hollow", state: "NY", lat: 41.0857, lon: -73.8585 },
    { name: "Roswell", state: "NM", lat: 33.3943, lon: -104.523 },
    { name: "Point Pleasant, WV", state: "WV", lat: 38.8445, lon: -82.1371 },
    { name: "Tombstone", state: "AZ", lat: 31.7129, lon: -110.0676 }
  ],
  "2026-10-27": [
    { name: "Dover, DE", state: "DE", lat: 39.1582, lon: -75.5244 },
    { name: "Lancaster, PA", state: "PA", lat: 40.0379, lon: -76.3055 },
    { name: "Sandpoint", state: "ID", lat: 48.2766, lon: -116.5535 },
    { name: "Natchitoches", state: "LA", lat: 31.7607, lon: -93.0863 },
    { name: "Death Valley", state: "CA", lat: 36.457, lon: -116.866, landmark: true }
  ],
  "2026-10-28": [
    { name: "Gettysburg", state: "PA", lat: 39.8309, lon: -77.2311, theme: "Spooky Week" },
    { name: "Galena", state: "IL", lat: 42.4167, lon: -90.429 },
    { name: "Bangor", state: "ME", lat: 44.8016, lon: -68.7712 },
    { name: "Virginia City, NV", state: "NV", lat: 39.3096, lon: -119.6496 },
    { name: "Galveston", state: "TX", lat: 29.3013, lon: -94.7977 }
  ],
  "2026-10-29": [
    { name: "Montpelier", state: "VT", lat: 44.2601, lon: -72.5754, theme: "State Capitals" },
    { name: "Concord, NH", state: "NH", lat: 43.2081, lon: -71.5376 },
    { name: "Frankfort, KY", state: "KY", lat: 38.2009, lon: -84.8733 },
    { name: "Jefferson City", state: "MO", lat: 38.5767, lon: -92.1735 },
    { name: "Tallahassee", state: "FL", lat: 30.4383, lon: -84.2807 }
  ],
  "2026-10-30": [
    { name: "Charleston, WV", state: "WV", lat: 38.3498, lon: -81.6326, theme: "State Capitals" },
    { name: "Olympia", state: "WA", lat: 47.0379, lon: -122.9007 },
    { name: "Trenton", state: "NJ", lat: 40.2206, lon: -74.7597 },
    { name: "Lansing", state: "MI", lat: 42.7325, lon: -84.5555 },
    { name: "Salem, OR", state: "OR", lat: 44.9429, lon: -123.0351 }
  ],
  "2026-10-31": [
    { name: "Anoka, MN (Halloween Capital)", state: "MN", lat: 45.1977, lon: -93.3872, theme: "Halloween" },
    { name: "Winchester Mystery House", state: "CA", lat: 37.3184, lon: -121.9511, landmark: true },
    { name: "St. Augustine", state: "FL", lat: 29.9012, lon: -81.3124 },
    { name: "Stanley Hotel", state: "CO", lat: 40.383, lon: -105.519, landmark: true },
    { name: "Lily Dale", state: "NY", lat: 42.3514, lon: -79.3259 }
  ]
};
