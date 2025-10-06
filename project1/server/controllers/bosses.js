//store the controller functions
import {pool} from '../config/database.js'

const getBosses = async(req,res) =>{
    try{
        const result = await pool.query('SELECT * FROM bosses ORDER BY id ASC')
        res.status(200).json(result.rows)
    }catch(err){
        console.error('Error fetching bosses:', err)
        res.status(409).json({error:'Internal server error'})
    }

}
const getBossById = async(req,res) =>{
    try{
        const {id} = req.params
        const result = await pool.query('SELECT * FROM bosses WHERE id = $1',[id])
        if(result.rows.length === 0){
            return res.status(404).json({error:'Boss not found'})
        }
        res.status(200).json(result.rows[0])
    }catch(err){
        console.error('Error fetching boss:', err)
        res.status(409).json({error:'Internal server error'})
    }
}
export default{
    getBosses,
    getBossById
} 

