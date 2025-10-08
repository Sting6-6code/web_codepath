//
// in this project, you'll create a virtual community space with an interactive interface that allows users to explore events by location. The user should be able to click on one of at least four locations and view events that have occurred or will occur there. Your virtual community can be real or imagined, but your site should help your target user find interesting stuff to do. Here are some examples:

// Music events
// Dungeon crawling expeditions
// Support groups for different communities
// Protests
// Geocaching spots
// Dromedary herders association meetups
// // This file contains the data for the events in the virtual community space.

/**
 * COMMUNITY_EVENTS: Virtual Community Events Data
 * Target User: Community members looking for interesting, non-traditional activities.
 * Includes at least four locations and diverse event types.
 */
import { LOCATION_IDS } from "./location.js";

// Export community events data array
export const COMMUNITY_EVENTS = [
  // --- ARCANE ATRIUM (Academic/Support) ---
  {
    id: "evt001",
    name: "Void Stalker Support Group",
    locationId: LOCATION_IDS.ARCANE_ATRIUM,
    type: "Support Group",
    date: "2025-10-20",
    time: "7:00 PM - 8:30 PM",
    description:
      "Providing support and comfort to members who have briefly fallen into the Void or witnessed unspeakable entities. Bring your anti-glare goggles.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    isCurrent: true,
  },
  {
    id: "evt002",
    name: "Ancient Rune Interpretation and Practice",
    locationId: LOCATION_IDS.ARCANE_ATRIUM,
    type: "Lecture/Class",
    date: "2025-11-05",
    time: "2:00 PM - 4:00 PM",
    description:
      "Led by Master Mage Lirael, discussing the structure of universal runes from lost civilizations and their modern limitations.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    isCurrent: true,
  },

  // --- SILENT SANCTUARY (Meditation/Introspection) ---
  {
    id: "evt003",
    name: "Seven-Hour Silent Contemplation",
    locationId: LOCATION_IDS.SILENT_SANCTUARY,
    type: "Meditation",
    date: "2025-10-18",
    time: "9:00 AM - 4:00 PM",
    description:
      "A deep, undisturbed session of silence. Please turn off all crystal communication devices. Bring your own mat and water.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    isCurrent: true,
  },
  {
    id: "evt004",
    name: "Midnight Spectral Tour",
    locationId: LOCATION_IDS.SILENT_SANCTUARY,
    type: "Exploration",
    date: "2025-09-28", // Past event
    time: "11:00 PM - 1:00 AM",
    description:
      "Visiting the Sanctuary's lower catacombs, where faint energies of ancient architects remain. Event concluded, recording available.",
    image:
      "https://images.unsplash.com/photo-1532009877282-3340270e0529?w=800&q=80",
    isCurrent: false,
  },

  // --- GOLEM GARAGE (Technology/Creation) ---
  {
    id: "evt005",
    name: "Golem AI Debugging Meetup",
    locationId: LOCATION_IDS.GOLEM_GARAGE,
    type: "Tech Meetup",
    date: "2025-11-12",
    time: "6:30 PM - 9:00 PM",
    description:
      "Bring your misbehaving Golems. We will jointly examine their core algorithms and fix pathfinding bugs. Basic programming experience required.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    isCurrent: true,
  },
  {
    id: "evt006",
    name: "DIY Energy Crystal Workshop",
    locationId: LOCATION_IDS.GOLEM_GARAGE,
    type: "Workshop",
    date: "2025-12-01",
    time: "10:00 AM - 5:00 PM",
    description:
      "Learn how to safely aggregate and shape basic energy crystals. All materials provided by the Garage.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    isCurrent: true,
  },

  // --- DESERT OASIS (Outdoor/Gathering) ---
  {
    id: "evt007",
    name: "Dune Skimmer Race",
    locationId: LOCATION_IDS.DESERT_OASIS,
    type: "Outdoor Sport",
    date: "2025-10-25",
    time: "8:00 AM - 11:00 AM",
    description:
      "A competitive race between the First Dune and the Oasis flagpole using personal propulsion units. Waiver required.",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
    isCurrent: true,
  },
  {
    id: "evt008",
    name: "Dromedary Herders Association Meetup",
    locationId: LOCATION_IDS.DESERT_OASIS,
    type: "Association Meetup",
    date: "2025-12-30",
    time: "7:00 PM - 10:00 PM",
    description:
      "Exchange experiences and discuss the impact of climate on desert transport vehicles.",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    isCurrent: true,
  },
];
