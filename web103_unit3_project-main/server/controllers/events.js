//store the controller functions
import { pool } from "../config/database.js";

export const getEvents = async (req, res) => {
  try {
    const locationId = req.query.location;

    let result;
    const selectQuery = `
      SELECT 
        id, 
        location_id, 
        name as title, 
        type, 
        date, 
        time, 
        description, 
        image, 
        is_current,
        EXTRACT(EPOCH FROM (date::timestamp - CURRENT_TIMESTAMP)) * 1000 as remaining
      FROM events
    `;

    if (locationId) {
      // 如果提供了location参数，按location筛选
      result = await pool.query(
        selectQuery + " WHERE location_id = $1 ORDER BY date",
        [locationId]
      );
    } else {
      // 否则返回所有events
      result = await pool.query(selectQuery + " ORDER BY date");
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const result = await pool.query(
      `SELECT 
        id, 
        location_id, 
        name as title, 
        type, 
        date, 
        time, 
        description, 
        image, 
        is_current,
        EXTRACT(EPOCH FROM (date::timestamp - CURRENT_TIMESTAMP)) * 1000 as remaining
      FROM events 
      WHERE id = $1`,
      [eventId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventsByLocation = async (req, res) => {
  try {
    const locationId = req.query.location || req.params.locationId;

    if (!locationId) {
      return res.status(400).json({ error: "Location ID is required" });
    }

    const result = await pool.query(
      `SELECT 
        id, 
        location_id, 
        name as title, 
        type, 
        date, 
        time, 
        description, 
        image, 
        is_current,
        EXTRACT(EPOCH FROM (date::timestamp - CURRENT_TIMESTAMP)) * 1000 as remaining
      FROM events 
      WHERE location_id = $1 
      ORDER BY date`,
      [locationId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching events by location:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
