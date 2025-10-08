import { pool } from "./database.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { LOCATIONS } from "../data/location.js";
import { COMMUNITY_EVENTS } from "../data/events.js";

const createTablesQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;
    
    CREATE TABLE IF NOT EXISTS locations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        zip TEXT,
        image TEXT
    );
    
    CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        location_id TEXT REFERENCES locations(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        type TEXT,
        date DATE,
        time TEXT,
        description TEXT,
        image TEXT,
        is_current BOOLEAN DEFAULT true
    );
`;

const createTables = async () => {
  try {
    await pool.query(createTablesQuery);
    console.log("✅ Tables created successfully");
    return true;
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    return false;
  }
};

const seedLocationTable = async () => {
  console.log("🌱 Seeding locations...");
  for (const location of LOCATIONS) {
    try {
      await pool.query(
        "INSERT INTO locations (id, name, description, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          location.id,
          location.name,
          location.description,
          location.address,
          location.city,
          location.state,
          location.zip,
          location.image,
        ]
      );
      console.log(`  ✅ Inserted location: ${location.name}`);
    } catch (err) {
      console.error(
        `  ❌ Error inserting location ${location.id}:`,
        err.message
      );
    }
  }
  console.log("✅ Locations seeded successfully\n");
};

const seedEventTable = async () => {
  console.log("🌱 Seeding events...");
  for (const event of COMMUNITY_EVENTS) {
    try {
      await pool.query(
        "INSERT INTO events (id, location_id, name, type, date, time, description, image, is_current) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          event.id,
          event.locationId,
          event.name,
          event.type,
          event.date,
          event.time,
          event.description,
          event.image,
          event.isCurrent,
        ]
      );
      console.log(`  ✅ Inserted event: ${event.name}`);
    } catch (err) {
      console.error(`  ❌ Error inserting event ${event.id}:`, err.message);
    }
  }
  console.log("✅ Events seeded successfully\n");
};

const resetDatabase = async () => {
  try {
    console.log("🔄 Resetting database...\n");

    // 1. 创建表
    const tablesCreated = await createTables();
    if (!tablesCreated) {
      throw new Error("Failed to create tables");
    }

    // 2. 先插入 locations（因为 events 依赖它）
    await seedLocationTable();

    // 3. 再插入 events
    await seedEventTable();

    console.log("🎉 Database reset completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Fatal error in database reset:", err);
    process.exit(1);
  }
};

// 执行重置
resetDatabase();
