// Daily challenges: 5 places per day, keyed by local date (YYYY-MM-DD).
// `state` is used for validation (scripts/validate.js) and shown on reveal.
window.CHALLENGES = {
  "2026-09-30": [
    { name: "Chicago, IL", state: "IL", lat: 41.8781, lon: -87.6298 },
    { name: "Mount Rushmore", state: "SD", lat: 43.8791, lon: -103.4591 },
    { name: "Savannah, GA", state: "GA", lat: 32.0809, lon: -81.0912 },
    { name: "Boise, ID", state: "ID", lat: 43.615, lon: -116.2023 },
    { name: "Denali", state: "AK", lat: 63.0692, lon: -151.007 }
  ],
  "2026-10-01": [
    { name: "Seattle, WA", state: "WA", lat: 47.6062, lon: -122.3321 },
    { name: "Grand Canyon Village", state: "AZ", lat: 36.0544, lon: -112.1401 },
    { name: "Nashville, TN", state: "TN", lat: 36.1627, lon: -86.7816 },
    { name: "Portland, ME", state: "ME", lat: 43.6591, lon: -70.2568 },
    { name: "Bismarck, ND", state: "ND", lat: 46.8083, lon: -100.7837 }
  ],
  "2026-10-02": [
    { name: "Miami, FL", state: "FL", lat: 25.7617, lon: -80.1918 },
    { name: "Old Faithful", state: "WY", lat: 44.4605, lon: -110.8281 },
    { name: "Kansas City, MO", state: "MO", lat: 39.0997, lon: -94.5786 },
    { name: "Santa Fe, NM", state: "NM", lat: 35.687, lon: -105.9378 },
    { name: "Burlington, VT", state: "VT", lat: 44.4759, lon: -73.2121 }
  ],
  "2026-10-03": [
    { name: "Los Angeles, CA", state: "CA", lat: 34.0522, lon: -118.2437 },
    { name: "Statue of Liberty", state: "NY", lat: 40.6892, lon: -74.0445 },
    { name: "Memphis, TN", state: "TN", lat: 35.1495, lon: -90.049 },
    { name: "Cheyenne, WY", state: "WY", lat: 41.14, lon: -104.8202 },
    { name: "Honolulu, HI", state: "HI", lat: 21.3069, lon: -157.8583 }
  ],
  "2026-10-04": [
    { name: "Denver, CO", state: "CO", lat: 39.7392, lon: -104.9903 },
    { name: "Niagara Falls", state: "NY", lat: 43.0962, lon: -79.0377 },
    { name: "Charleston, SC", state: "SC", lat: 32.7765, lon: -79.9311 },
    { name: "Duluth, MN", state: "MN", lat: 46.7867, lon: -92.1005 },
    { name: "Tucson, AZ", state: "AZ", lat: 32.2226, lon: -110.9747 }
  ],
  "2026-10-05": [
    { name: "Boston, MA", state: "MA", lat: 42.3601, lon: -71.0589 },
    { name: "Las Vegas, NV", state: "NV", lat: 36.1699, lon: -115.1398 },
    { name: "Omaha, NE", state: "NE", lat: 41.2565, lon: -95.9345 },
    { name: "Key West, FL", state: "FL", lat: 24.5551, lon: -81.78 },
    { name: "Spokane, WA", state: "WA", lat: 47.6588, lon: -117.426 }
  ],
  "2026-10-06": [
    { name: "Atlanta, GA", state: "GA", lat: 33.749, lon: -84.388 },
    { name: "Salt Lake City, UT", state: "UT", lat: 40.7608, lon: -111.891 },
    { name: "Pittsburgh, PA", state: "PA", lat: 40.4406, lon: -79.9959 },
    { name: "Juneau, AK", state: "AK", lat: 58.3019, lon: -134.4197 },
    { name: "Little Rock, AR", state: "AR", lat: 34.7465, lon: -92.2896 }
  ],
  "2026-10-07": [
    { name: "New Orleans, LA", state: "LA", lat: 29.9511, lon: -90.0715 },
    { name: "Golden Gate Bridge", state: "CA", lat: 37.8199, lon: -122.4783 },
    { name: "Detroit, MI", state: "MI", lat: 42.3314, lon: -83.0458 },
    { name: "Albuquerque, NM", state: "NM", lat: 35.0844, lon: -106.6504 },
    { name: "Sioux Falls, SD", state: "SD", lat: 43.5446, lon: -96.7311 }
  ],
  "2026-10-08": [
    { name: "Houston, TX", state: "TX", lat: 29.7604, lon: -95.3698 },
    { name: "Mount Rainier", state: "WA", lat: 46.8523, lon: -121.7603 },
    { name: "Philadelphia, PA", state: "PA", lat: 39.9526, lon: -75.1652 },
    { name: "Fargo, ND", state: "ND", lat: 46.8772, lon: -96.7898 },
    { name: "Asheville, NC", state: "NC", lat: 35.5951, lon: -82.5515 }
  ],
  "2026-10-09": [
    { name: "Phoenix, AZ", state: "AZ", lat: 33.4484, lon: -112.074 },
    { name: "Washington, D.C.", state: "DC", lat: 38.9072, lon: -77.0369 },
    { name: "Minneapolis, MN", state: "MN", lat: 44.9778, lon: -93.265 },
    { name: "Reno, NV", state: "NV", lat: 39.5296, lon: -119.8138 },
    { name: "Bar Harbor, ME", state: "ME", lat: 44.3876, lon: -68.2039 }
  ],
  "2026-10-10": [
    { name: "Dallas, TX", state: "TX", lat: 32.7767, lon: -96.797 },
    { name: "Portland, OR", state: "OR", lat: 45.5152, lon: -122.6784 },
    { name: "St. Louis, MO", state: "MO", lat: 38.627, lon: -90.1994 },
    { name: "Kennedy Space Center", state: "FL", lat: 28.5729, lon: -80.649 },
    { name: "Billings, MT", state: "MT", lat: 45.7833, lon: -108.5007 }
  ],
  "2026-10-11": [
    { name: "San Francisco, CA", state: "CA", lat: 37.7749, lon: -122.4194 },
    { name: "Indianapolis, IN", state: "IN", lat: 39.7684, lon: -86.1581 },
    { name: "Charlotte, NC", state: "NC", lat: 35.2271, lon: -80.8431 },
    { name: "Zion National Park", state: "UT", lat: 37.2982, lon: -113.0263 },
    { name: "Anchorage, AK", state: "AK", lat: 61.2181, lon: -149.9003 }
  ],
  "2026-10-12": [
    { name: "Times Square", state: "NY", lat: 40.758, lon: -73.9855 },
    { name: "Austin, TX", state: "TX", lat: 30.2672, lon: -97.7431 },
    { name: "Milwaukee, WI", state: "WI", lat: 43.0389, lon: -87.9065 },
    { name: "Yosemite Valley", state: "CA", lat: 37.7456, lon: -119.5936 },
    { name: "Wichita, KS", state: "KS", lat: 37.6872, lon: -97.3301 }
  ],
  "2026-10-13": [
    { name: "San Diego, CA", state: "CA", lat: 32.7157, lon: -117.1611 },
    { name: "Cleveland, OH", state: "OH", lat: 41.4993, lon: -81.6944 },
    { name: "Birmingham, AL", state: "AL", lat: 33.5186, lon: -86.8104 },
    { name: "Gatlinburg, TN", state: "TN", lat: 35.7143, lon: -83.5102 },
    { name: "Helena, MT", state: "MT", lat: 46.5891, lon: -112.0391 }
  ],
  "2026-10-14": [
    { name: "The Alamo", state: "TX", lat: 29.426, lon: -98.4861 },
    { name: "Baltimore, MD", state: "MD", lat: 39.2904, lon: -76.6122 },
    { name: "Oklahoma City, OK", state: "OK", lat: 35.4676, lon: -97.5164 },
    { name: "Hilo, HI", state: "HI", lat: 19.7241, lon: -155.0868 },
    { name: "Mackinac Island", state: "MI", lat: 45.8492, lon: -84.6189 }
  ],
  "2026-10-15": [
    { name: "Orlando, FL", state: "FL", lat: 28.5383, lon: -81.3792 },
    { name: "Des Moines, IA", state: "IA", lat: 41.5868, lon: -93.625 },
    { name: "Louisville, KY", state: "KY", lat: 38.2527, lon: -85.7585 },
    { name: "Crater Lake", state: "OR", lat: 42.9446, lon: -122.109 },
    { name: "Providence, RI", state: "RI", lat: 41.824, lon: -71.4128 }
  ],
  "2026-10-16": [
    { name: "Columbus, OH", state: "OH", lat: 39.9612, lon: -82.9988 },
    { name: "Arches National Park", state: "UT", lat: 38.7331, lon: -109.5925 },
    { name: "Richmond, VA", state: "VA", lat: 37.5407, lon: -77.436 },
    { name: "Jackson, MS", state: "MS", lat: 32.2988, lon: -90.1848 },
    { name: "Fairbanks, AK", state: "AK", lat: 64.8378, lon: -147.7164 }
  ],
  "2026-10-17": [
    { name: "Sacramento, CA", state: "CA", lat: 38.5816, lon: -121.4944 },
    { name: "Cincinnati, OH", state: "OH", lat: 39.1031, lon: -84.512 },
    { name: "Tampa, FL", state: "FL", lat: 27.9506, lon: -82.4572 },
    { name: "Devils Tower", state: "WY", lat: 44.5902, lon: -104.7146 },
    { name: "Hartford, CT", state: "CT", lat: 41.7658, lon: -72.6734 }
  ],
  "2026-10-18": [
    { name: "Buffalo, NY", state: "NY", lat: 42.8864, lon: -78.8784 },
    { name: "El Paso, TX", state: "TX", lat: 31.7619, lon: -106.485 },
    { name: "Raleigh, NC", state: "NC", lat: 35.7796, lon: -78.6382 },
    { name: "South Lake Tahoe, CA", state: "CA", lat: 38.9399, lon: -119.9772 },
    { name: "Madison, WI", state: "WI", lat: 43.0731, lon: -89.4012 }
  ],
  "2026-10-19": [
    { name: "Jacksonville, FL", state: "FL", lat: 30.3322, lon: -81.6557 },
    { name: "Colorado Springs, CO", state: "CO", lat: 38.8339, lon: -104.8214 },
    { name: "Baton Rouge, LA", state: "LA", lat: 30.4515, lon: -91.1871 },
    { name: "Mount Washington", state: "NH", lat: 44.2706, lon: -71.3033 },
    { name: "Walla Walla, WA", state: "WA", lat: 46.0646, lon: -118.343 }
  ],
  "2026-10-20": [
    { name: "Kitty Hawk, NC", state: "NC", lat: 36.0646, lon: -75.7057 },
    { name: "Lincoln, NE", state: "NE", lat: 40.8136, lon: -96.7026 },
    { name: "Mobile, AL", state: "AL", lat: 30.6954, lon: -88.0399 },
    { name: "Flagstaff, AZ", state: "AZ", lat: 35.1983, lon: -111.6513 },
    { name: "Nome, AK", state: "AK", lat: 64.5011, lon: -165.4064 }
  ],
  "2026-10-21": [
    { name: "Palm Springs, CA", state: "CA", lat: 33.8303, lon: -116.5453 },
    { name: "Chattanooga, TN", state: "TN", lat: 35.0456, lon: -85.3097 },
    { name: "Lexington, KY", state: "KY", lat: 38.0406, lon: -84.5037 },
    { name: "Rapid City, SD", state: "SD", lat: 44.0805, lon: -103.231 },
    { name: "Annapolis, MD", state: "MD", lat: 38.9784, lon: -76.4922 }
  ],
  "2026-10-22": [
    { name: "Corpus Christi, TX", state: "TX", lat: 27.8006, lon: -97.3964 },
    { name: "Green Bay, WI", state: "WI", lat: 44.5133, lon: -88.0133 },
    { name: "Everglades (Flamingo)", state: "FL", lat: 25.1413, lon: -80.924 },
    { name: "Pierre, SD", state: "SD", lat: 44.3683, lon: -100.351 },
    { name: "Edgartown, Martha's Vineyard", state: "MA", lat: 41.389, lon: -70.5134 }
  ],
  "2026-10-23": [
    { name: "Tulsa, OK", state: "OK", lat: 36.154, lon: -95.9928 },
    { name: "Eugene, OR", state: "OR", lat: 44.0521, lon: -123.0868 },
    { name: "Knoxville, TN", state: "TN", lat: 35.9606, lon: -83.9207 },
    { name: "Carlsbad Caverns", state: "NM", lat: 32.1479, lon: -104.5567 },
    { name: "Provincetown, MA", state: "MA", lat: 42.0584, lon: -70.1786 }
  ],
  "2026-10-24": [
    { name: "Grand Rapids, MI", state: "MI", lat: 42.9634, lon: -85.6681 },
    { name: "Amarillo, TX", state: "TX", lat: 35.222, lon: -101.8313 },
    { name: "Montgomery, AL", state: "AL", lat: 32.3792, lon: -86.3077 },
    { name: "Logan Pass, Glacier NP", state: "MT", lat: 48.6966, lon: -113.7183 },
    { name: "Wilmington, DE", state: "DE", lat: 39.7391, lon: -75.5398 }
  ],
  "2026-10-25": [
    { name: "Myrtle Beach, SC", state: "SC", lat: 33.6891, lon: -78.8867 },
    { name: "Lubbock, TX", state: "TX", lat: 33.5779, lon: -101.8552 },
    { name: "Topeka, KS", state: "KS", lat: 39.0473, lon: -95.6752 },
    { name: "Olympia, WA", state: "WA", lat: 47.0379, lon: -122.9007 },
    { name: "Kahului, Maui", state: "HI", lat: 20.8893, lon: -156.4729 }
  ],
  "2026-10-26": [
    { name: "Salem, MA", state: "MA", lat: 42.5195, lon: -70.8967, theme: "Spooky Week" },
    { name: "Sleepy Hollow, NY", state: "NY", lat: 41.0857, lon: -73.8585 },
    { name: "Roswell, NM", state: "NM", lat: 33.3943, lon: -104.523 },
    { name: "Point Pleasant, WV", state: "WV", lat: 38.8445, lon: -82.1371 },
    { name: "Tombstone, AZ", state: "AZ", lat: 31.7129, lon: -110.0676 }
  ],
  "2026-10-27": [
    { name: "Dover, DE", state: "DE", lat: 39.1582, lon: -75.5244 },
    { name: "Harrisburg, PA", state: "PA", lat: 40.2732, lon: -76.8867 },
    { name: "Coeur d'Alene, ID", state: "ID", lat: 47.6777, lon: -116.7805 },
    { name: "Shreveport, LA", state: "LA", lat: 32.5252, lon: -93.7502 },
    { name: "Death Valley (Furnace Creek)", state: "CA", lat: 36.457, lon: -116.866 }
  ],
  "2026-10-28": [
    { name: "Gettysburg, PA", state: "PA", lat: 39.8309, lon: -77.2311, theme: "Spooky Week" },
    { name: "Springfield, IL", state: "IL", lat: 39.7817, lon: -89.6501 },
    { name: "Augusta, ME", state: "ME", lat: 44.3106, lon: -69.7795 },
    { name: "Carson City, NV", state: "NV", lat: 39.1638, lon: -119.7674 },
    { name: "Galveston, TX", state: "TX", lat: 29.3013, lon: -94.7977 }
  ],
  "2026-10-29": [
    { name: "Montpelier, VT", state: "VT", lat: 44.2601, lon: -72.5754, theme: "State Capitals" },
    { name: "Concord, NH", state: "NH", lat: 43.2081, lon: -71.5376 },
    { name: "Frankfort, KY", state: "KY", lat: 38.2009, lon: -84.8733 },
    { name: "Jefferson City, MO", state: "MO", lat: 38.5767, lon: -92.1735 },
    { name: "Tallahassee, FL", state: "FL", lat: 30.4383, lon: -84.2807 }
  ],
  "2026-10-30": [
    { name: "Charleston, WV", state: "WV", lat: 38.3498, lon: -81.6326, theme: "State Capitals" },
    { name: "Columbia, SC", state: "SC", lat: 34.0007, lon: -81.0348 },
    { name: "Trenton, NJ", state: "NJ", lat: 40.2206, lon: -74.7597 },
    { name: "Lansing, MI", state: "MI", lat: 42.7325, lon: -84.5555 },
    { name: "Salem, OR", state: "OR", lat: 44.9429, lon: -123.0351 }
  ],
  "2026-10-31": [
    { name: "Anoka, MN (Halloween Capital)", state: "MN", lat: 45.1977, lon: -93.3872, theme: "Halloween" },
    { name: "Winchester Mystery House", state: "CA", lat: 37.3184, lon: -121.9511 },
    { name: "St. Augustine, FL", state: "FL", lat: 29.9012, lon: -81.3124 },
    { name: "Stanley Hotel, Estes Park", state: "CO", lat: 40.383, lon: -105.519 },
    { name: "Lily Dale, NY", state: "NY", lat: 42.3514, lon: -79.3259 }
  ]
};
