import { pool } from "../config/database.js";

//Get all cars
export const getCars = async (req, res) => {
  try {
    const results = await pool.query(`
            SELECT 
                c.*,
                e.color as exterior_color,
                e.hex_code as exterior_hex,
                e.price as exterior_price,
                r.type as roof_type,
                r.price as roof_price,
                w.type as wheels_type,
                w.price as wheels_price,
                i.material as interior_material,
                i.color as interior_color,
                i.hex_code as interior_hex,
                i.price as interior_price
            FROM cars c
            LEFT JOIN exteriors e ON c.exterior_id = e.id
            LEFT JOIN roofs r ON c.roof_id = r.id
            LEFT JOIN wheels w ON c.wheels_id = w.id
            LEFT JOIN interiors i ON c.interior_id = i.id
            ORDER BY c.created_at DESC
        `);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT 
                c.*,
                e.color as exterior_color,
                e.hex_code as exterior_hex,
                e.price as exterior_price,
                r.type as roof_type,
                r.price as roof_price,
                w.type as wheels_type,
                w.price as wheels_price,
                i.material as interior_material,
                i.color as interior_color,
                i.hex_code as interior_hex,
                i.price as interior_price
            FROM cars c
            LEFT JOIN exteriors e ON c.exterior_id = e.id
            LEFT JOIN roofs r ON c.roof_id = r.id
            LEFT JOIN wheels w ON c.wheels_id = w.id
            LEFT JOIN interiors i ON c.interior_id = i.id
            WHERE c.id = $1
        `,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Post a new car
export const createCar = async (req, res) => {
  try {
    const { name, exterior_id, roof_id, wheels_id, interior_id, total_price } =
      req.body;
    if (
      !name ||
      !exterior_id ||
      !roof_id ||
      !wheels_id ||
      !interior_id ||
      !total_price
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const results = await pool.query(
      `
                INSERT INTO cars (name, exterior_id, roof_id, wheels_id, interior_id, total_price)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `,
      [name, exterior_id, roof_id, wheels_id, interior_id, total_price]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Patch a car(update a car
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, exterior_id, roof_id, wheels_id, interior_id, total_price } =
      req.body;
    if (
      !name ||
      !exterior_id ||
      !roof_id ||
      !wheels_id ||
      !interior_id ||
      !total_price
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const results = await pool.query(
      `
                UPDATE cars
                SET name = $1, exterior_id = $2, roof_id = $3, wheels_id = $4, interior_id = $5, total_price = $6
                WHERE id = $7
                RETURNING *
            `,
      [name, exterior_id, roof_id, wheels_id, interior_id, total_price, id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete a car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      `
                DELETE FROM cars WHERE id = $1 RETURNING *
            `,
      [id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
