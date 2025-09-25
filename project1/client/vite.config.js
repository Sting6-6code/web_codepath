import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // 将前端开发环境下的 API 请求代理到后端服务
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
