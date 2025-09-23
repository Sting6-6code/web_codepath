const express = require("express");
const path = require("path");
const bosses = require("./data/bosses");

const app = express();
const PORT = process.env.PORT || 3000;

// 设置静态文件目录
app.use(express.static("public"));

// 首页路由 - 显示所有 Boss
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API 路由 - 返回所有 Boss 数据
app.get("/api/bosses", (req, res) => {
  res.json(bosses);
});

// API 路由 - 返回特定 Boss 数据
app.get("/api/bosses/:id", (req, res) => {
  const bossId = req.params.id;
  const boss = bosses.find((b) => b.id === bossId);

  if (!boss) {
    return res.status(404).json({ error: "Boss not found" });
  }

  res.json(boss);
});

// Boss 详情页面路由
app.get("/bosses/:id", (req, res) => {
  const bossId = req.params.id;
  const boss = bosses.find((b) => b.id === bossId);

  if (!boss) {
    return res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  }

  res.sendFile(path.join(__dirname, "public", "boss.html"));
});

// 404 处理
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Boss Guide Listicle is ready!`);
});
