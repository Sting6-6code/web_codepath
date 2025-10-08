import { LOCATION_IDS, COMMUNITY_EVENTS } from '../data/events';

/**
 * Locations API Service
 * Mimics fetching location data from a backend API.
 */

// Simulates fetching the list of all available location IDs
export const getAllLocationIds = () => {
    // Returns the keys of the LOCATION_IDS object as an array
    return Object.values(LOCATION_IDS);
};

// Simulates fetching the human-readable names for all locations
// Note: This requires manually defining the names, as they are not stored in events.js
export const getLocationDetails = () => {
    // We map the IDs to display names for the interface
    const locationMapping = {
        [LOCATION_IDS.ARCANE_ATRIUM]: 'Arcane Atrium (Lecture Hall)',
        [LOCATION_IDS.SILENT_SANCTUARY]: 'Silent Sanctuary (Meditation)',
        [LOCATION_IDS.GOLEM_GARAGE]: 'Golem Garage (Tech Workshop)',
        [LOCATION_IDS.DESERT_OASIS]: 'Desert Oasis (Outdoor Meetup)',
    };

    return Object.entries(LOCATION_IDS).map(([key, id]) => ({
        id: id,
        name: locationMapping[id] || key,
    }));
};
