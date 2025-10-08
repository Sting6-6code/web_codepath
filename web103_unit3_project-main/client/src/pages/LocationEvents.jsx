import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Event from "../components/Event";
import LocationAPI from "../services/LocationAPI";
import "../css/LocationEvents.css";

// 路由路径到 location ID 的映射
const ROUTE_TO_LOCATION_ID = {
  "/echolounge": "arcane_atrium",
  "/houseofblues": "silent_sanctuary",
  "/pavilion": "golem_garage",
  "/americanairlines": "desert_oasis",
};

const LocationEvents = () => {
  const location = useLocation();
  const id = ROUTE_TO_LOCATION_ID[location.pathname]; // 从路径获取 location ID
  const [locationData, setLocation] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // 获取 location 信息
        const locationData = await LocationAPI.getLocationById(id);
        setLocation(locationData);

        // 获取该 location 的 events
        const eventsData = await LocationAPI.getEventsByLocation(id);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error loading location events:", error);
      }
    })();
  }, [id]);

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={locationData.image} alt={locationData.name} />
        </div>

        <div className="location-info">
          <h2>{locationData.name}</h2>
          <p>
            {locationData.address}, {locationData.city}, {locationData.state}{" "}
            {locationData.zip}
          </p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.name}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
