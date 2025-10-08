import { COMMUNITY_EVENTS } from '../data/events';

/**
 * Events API Service
 * Mimics fetching event data from a backend API.
 */

// Simulates an API call to get all events
export const getAllEvents = () => {
    // In a real application, this would be: 
    //fetch('/api/events').then(res => res.json());
    
    // For this project, we return the imported data directly.
    return COMMUNITY_EVENTS;
};

// Simulates an API call to get events filtered by a specific location ID
export const getEventsByLocation = (locationId) => {
    if (!locationId) {
        // If no ID is provided, return all events
        return COMMUNITY_EVENTS;
    }
    
    // Filter the events array where the event's locationId matches the requested ID
    const filteredEvents = COMMUNITY_EVENTS.filter(
        event => event.locationId === locationId
    );
    
    // Note: In a real backend, the API would handle the filtering via a query parameter.
    return filteredEvents;
};

// Simulates fetching a single event by its ID
export const getEventById = (id) => {
    return COMMUNITY_EVENTS.find(event => event.id === id);
};
