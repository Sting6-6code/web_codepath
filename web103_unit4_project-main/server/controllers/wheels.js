import {pool} from '../config/database.js'


//get all wheels
export const getWheels = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM wheels ORDER BY id")
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Obtain a single wheel based on the ID
export const getWheelById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await pool.query("SELECT * FROM wheels WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({error:'Wheel not found'})
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    }