import express from "express";
import path from "path";
import bossesData from "../data/bosses.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 获取所有 Boss
router.get("/", (req, res) => {
  res.json(bossesData);
});

// 获取单个 Boss
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const boss = bossesData.find((b) => b.id === id);

  if (!boss) {
    return res.status(404).json({
      error: "Boss not found",
      message: `No boss found with ID: ${id}`,
    });
  }

  res.json(boss);
});

export default router;
