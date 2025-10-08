import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

// Enable SSL for remote databases
const isRemoteDB =
  process.env.PGHOST &&
  (process.env.PGHOST.includes("render.com") ||
    process.env.PGHOST.includes("heroku.com") ||
    process.env.PGHOST.includes("amazonaws.com") ||
    !process.env.PGHOST.includes("localhost"));

if (process.env.NODE_ENV === "production" || isRemoteDB) {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

export const pool = new pg.Pool(config);
