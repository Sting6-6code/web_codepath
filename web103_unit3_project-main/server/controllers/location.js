import { pool } from '../config/database.js'
export const getLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations')
        res.status(200).json(result.rows)
    } catch (err) {
        console.error('Error fetching locations:', err)
        res.status(409).json({ error: 'Internal server error' })
    }
}

export const getLocationById = async (req, res) => {
    try {
        const locationId = req.params.id
        const result = await pool.query('SELECT * FROM locations WHERE id = $1', [locationId])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.error('Error fetching location by ID:', err)
        res.status(409).json({ error: 'Internal server error' })
    }
}


