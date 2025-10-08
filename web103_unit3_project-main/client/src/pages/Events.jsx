import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import EventsAPI from "../services/EventsAPI";
import LocationAPI from "../services/LocationAPI";
import "../css/LocationEvents.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    // 获取所有地点
    (async () => {
      try {
        const locationsData = await LocationAPI.getAllLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    })();
  }, []);

  useEffect(() => {
    // 根据选中的地点获取事件
    (async () => {
      try {
        let eventsData;
        if (selectedLocation === "all") {
          eventsData = await EventsAPI.getAllEvents();
        } else {
          eventsData = await LocationAPI.getEventsByLocation(selectedLocation);
        }
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    })();
  }, [selectedLocation]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="all-events">
      <header>
        <h2>All Events</h2>
        <div className="filter-container">
          <label htmlFor="location-filter">Filter by Location: </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={handleLocationChange}
            className="location-select"
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {selectedLocation === "all"
              ? "No events scheduled yet!"
              : "No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default Events;
