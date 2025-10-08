import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getEvents,
  getEventById,
  getEventsByLocation,
} from "../controllers/events.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", getEvents);
router.get("/location/:locationId", getEventsByLocation);
router.get("/:id", getEventById);

export default router;
