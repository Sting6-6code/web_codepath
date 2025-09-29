import express from "express";
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
import path from "path";
import { fileURLToPath } from "url";
import bossesRoutes from "./routes/bosses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 静态资源 — 指向 client 根目录与 public 目录
app.use(express.static(path.join(__dirname, "../client")));
app.use("/public", express.static(path.join(__dirname, "../client/public")));

// API 前缀
app.use("/api/bosses", bossesRoutes);

// 首页
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// 详情页（前端渲染）
app.get("/bosses/:id", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// 兜底（前端路由也交给 index.html 处理）
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
