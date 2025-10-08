import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getLocations, getLocationById } from "../controllers/location.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", getLocations);

router.get("/:id", getLocationById);

export default router;
