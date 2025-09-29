//create bosses table
import {pool} from './database.js'
import dotenv from 'dotenv'
dotenv.config({ path:'../.env'})
import bossesData from '../data/bosses.js'






const createTableQuery = `
  DROP TABLE IF EXISTS bosses;
  CREATE TABLE bosses (
    id TEXT PRIMARY KEY,
    name TEXT,
    difficulty TEXT,
    location TEXT,
    health INTEGER,
    rewards TEXT[],
    description TEXT,
    strategy TEXT,
    image TEXT,
    weaknesses TEXT[],
    resistances TEXT[]
  );
`
const createBossesTable = async () => {
    try {
    const res = await pool.query(createTableQuery)
    console.log('Table created successfully')
    return true
}catch (err) {
    console.error('Error creating table:', err)
    return false
}
    
}


//load data into the table
//send data to database,create asynchronous function

const seedBossesTable = async () => {
    //ensure the table be built
    const tableCreated = await createBossesTable()
    if(!tableCreated) {
        console.log('Failed to create bosses table')
        return
    }
    for (const boss of bossesData){
        const insertQuery = `
        INSERT INTO bosses (id, name, difficulty, location, health, rewards, description, strategy, image, weaknesses, resistances)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `




        const values = [
            boss.id, boss.name, boss.difficulty, boss.location, boss.health, boss.rewards, boss.description, boss.strategy, boss.image, boss.weaknesses, boss.resistances
        ]
        try{
            await pool.query(insertQuery, values)
            console.log(`Inserted boss ${boss.name} with id ${boss.id}`)
        }catch (err) {
            console.error(`Error inserting boss ${boss.name} with id ${boss.id}:`, err)
        }
    }
    }

seedBossesTable().catch(err => {
    console.error('❌ Fatal error in database reset:', err);
});