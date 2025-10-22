import { pool } from "./server/config/database.js";

const testDatabase = async () => {
  console.log("🔍 Testing Database Connection...\n");

  try {
    // Test connection
    const connectionTest = await pool.query("SELECT NOW()");
    console.log("✅ Database Connected Successfully!");
    console.log("📅 Server Time:", connectionTest.rows[0].now);
    console.log("\n" + "=".repeat(60) + "\n");

    // Get all tables
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("📋 Tables in Database:");
    tables.rows.forEach((row, index) => {
      console.log(`   ${index + 1}. ${row.table_name}`);
    });
    console.log("\n" + "=".repeat(60) + "\n");

    // Query exteriors
    console.log("🎨 EXTERIORS TABLE:");
    const exteriors = await pool.query("SELECT * FROM exteriors ORDER BY id");
    console.table(exteriors.rows);

    // Query roofs
    console.log("\n🏠 ROOFS TABLE:");
    const roofs = await pool.query("SELECT * FROM roofs ORDER BY id");
    console.table(roofs.rows);

    // Query wheels
    console.log("\n⚙️  WHEELS TABLE:");
    const wheels = await pool.query("SELECT * FROM wheels ORDER BY id");
    console.table(wheels.rows);

    // Query interiors
    console.log("\n💺 INTERIORS TABLE:");
    const interiors = await pool.query("SELECT * FROM interiors ORDER BY id");
    console.table(interiors.rows);

    // Query cars
    console.log("\n🚗 CARS TABLE:");
    const cars = await pool.query(`
      SELECT 
        c.id,
        c.name,
        e.color as exterior_color,
        r.type as roof_type,
        w.type as wheels_type,
        i.material || ' - ' || i.color as interior,
        c.total_price,
        c.created_at
      FROM cars c
      LEFT JOIN exteriors e ON c.exterior_id = e.id
      LEFT JOIN roofs r ON c.roof_id = r.id
      LEFT JOIN wheels w ON c.wheels_id = w.id
      LEFT JOIN interiors i ON c.interior_id = i.id
      ORDER BY c.created_at DESC
    `);

    if (cars.rows.length === 0) {
      console.log("   (No cars created yet)");
    } else {
      console.table(cars.rows);
    }

    console.log("\n" + "=".repeat(60));
    console.log("✅ Database Test Complete!");
    console.log("=".repeat(60) + "\n");
  } catch (error) {
    console.error("❌ Database Error:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await pool.end();
  }
};

testDatabase();
