import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

const dropTables = async () => {
  await pool.query(`
        DROP TABLE IF EXISTS cars CASCADE;
        DROP TABLE IF EXISTS exteriors CASCADE;
        DROP TABLE IF EXISTS roofs CASCADE;
        DROP TABLE IF EXISTS wheels CASCADE;
        DROP TABLE IF EXISTS interiors CASCADE;
    `);
  console.log("✅ Tables dropped");
};

const createTables = async () => {
  await pool.query(`
        CREATE TABLE exteriors (
            id SERIAL PRIMARY KEY,
            color VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );
        
        CREATE TABLE roofs (
            id SERIAL PRIMARY KEY,
            type VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        );
        
        CREATE TABLE wheels (
            id SERIAL PRIMARY KEY,
            type VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        );
        
        CREATE TABLE interiors (
            id SERIAL PRIMARY KEY,
            material VARCHAR(100) NOT NULL,
            color VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );
        
        CREATE TABLE cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior_id INTEGER REFERENCES exteriors(id),
            roof_id INTEGER REFERENCES roofs(id),
            wheels_id INTEGER REFERENCES wheels(id),
            interior_id INTEGER REFERENCES interiors(id),
            total_price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
    `);
  console.log("✅ All tables created");

  
};

const seedData = async () => {
  await pool.query(`
        INSERT INTO exteriors (color, price, hex_code) VALUES
        ('Red', 1000.00, '#FF0000'),
        ('Blue', 1000.00, '#0000FF'),
        ('Black', 1500.00, '#000000'),
        ('White', 900.00, '#FFFFFF'),
        ('Silver', 1200.00, '#C0C0C0');
        
        INSERT INTO roofs (type, price) VALUES
        ('Standard', 0.00),
        ('Sunroof', 1500.00),
        ('Convertible', 3000.00),
        ('Panoramic', 2500.00);
        
        INSERT INTO wheels (type, price) VALUES
        ('Standard 16"', 0.00),
        ('Sport 18"', 1000.00),
        ('Luxury 19"', 1500.00),
        ('Performance 20"', 2000.00);
        
        INSERT INTO interiors (material, color, price, hex_code) VALUES
        ('Fabric', 'Black', 0.00, '#000000'),
        ('Fabric', 'Gray', 200.00, '#808080'),
        ('Leather', 'Black', 1500.00, '#000000'),
        ('Leather', 'Tan', 1700.00, '#D2B48C'),
        ('Premium Leather', 'White', 2500.00, '#FFFFFF');
    `);
  console.log("✅ Data seeded");
};

const setup = async () => {
  await dropTables();
  await createTables();
  await seedData();
};

setup()
  .then(() => {
    console.log("🎉 Database setup complete!");
    pool.end();
  })
  .catch((err) => {
    console.error("❌ Setup error:", err);
    pool.end();
  });
