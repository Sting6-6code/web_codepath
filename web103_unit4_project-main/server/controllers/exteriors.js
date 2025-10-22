import { pool } from '../config/database.js'

//get all exteriors
export const getExteriors = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM exteriors ORDER BY id")
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Obtain a single appearance option based on the ID
export const getExteriorById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await pool.query("SELECT * FROM exteriors WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({error:'Exterior not found'})
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    }

