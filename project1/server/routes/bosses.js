// /server/routes/bosses.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bossesController from "../controllers/bosses.js"; // 确保此路径正确

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 1. 获取所有 bosses: 对应 bossesController.getBosses
router.get('/', bossesController.getBosses);

// 2. 获取单个 Boss: 对应 bossesController.getBossById
// 路由参数 :id 会自动传递给 getBossById 函数
router.get("/:id", bossesController.getBossById);

export default router;