import React, { useState, useEffect } from "react";
import "../css/Event.css";
import dates from "../services/dates";
import EventsAPI from "../services/EventsAPI";

const Event = (props) => {
  const [event, setEvent] = useState([]);
  const [time, setTime] = useState([]);
  const [remaining, setRemaining] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const eventData = await EventsAPI.getEventsById(props.id);
        setEvent(eventData);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await dates.formatTime(event.time);
        setTime(result);
      } catch (error) {
        throw error;
      }
    })();
  }, [event]);

  useEffect(() => {
    (async () => {
      try {
        const timeRemaining = await dates.formatRemainingTime(event.remaining);
        setRemaining(timeRemaining);
        dates.formatNegativeTimeRemaining(remaining, event.id);
      } catch (error) {
        throw error;
      }
    })();
  }, [event]);

  // Check if event has passed
  const isPastEvent = event.remaining && parseFloat(event.remaining) < 0;

  return (
    <article className={`event-information ${isPastEvent ? "past-event" : ""}`}>
      <img src={event.image} alt={event.title} />
      {isPastEvent && <div className="past-event-badge">PAST EVENT</div>}

      <div className="event-information-overlay">
        <div className="text">
          <h3>{event.title}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i> {event.date}{" "}
            <br /> {time}
          </p>
          <p
            id={`remaining-${event.id}`}
            className={isPastEvent ? "past-time" : "upcoming-time"}
          >
            {remaining}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Event;
