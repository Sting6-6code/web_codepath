import crypto from "crypto";

// 使用 crypto 模块创建一个 SHA-256 哈希
const hash = crypto.createHash("sha256").update("test").digest("hex");

// 输出哈希值
console.log('SHA-256 hash of "test":', hash);
