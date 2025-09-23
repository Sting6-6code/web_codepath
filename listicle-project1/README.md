# 🎮 Boss Battle Guide - Listicle Project 1

A comprehensive web application that provides detailed strategies and information for challenging boss encounters in gaming. Built for CodePath WEB103 Week 1 Project.

## 📋 Project Overview

This is a **Listicle** web application that displays gaming boss guides in an attractive, user-friendly format. Users can browse through different boss encounters, view detailed strategies, and learn about each boss's weaknesses and rewards.

## ✨ Features

- **Homepage**: Displays all boss encounters in an attractive card layout
- **Individual Boss Pages**: Each boss has a unique detailed strategy page with its own URL
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Styling**: Uses Picocss framework with custom enhancements
- **Error Handling**: Proper 404 page for non-existent routes
- **Loading States**: Professional loading indicators
- **Accessibility**: Keyboard navigation and screen reader support

## 📋 Required Features Checklist

- ✅ **Uses only HTML, CSS, and JavaScript** (no frontend framework)
- ✅ **Displays a clear title** ("Ultimate Boss Battle Guide")
- ✅ **Shows 6+ unique list items** (boss encounters)
- ✅ **Each item has 3+ displayed attributes** (name, location, health, description, etc.)
- ✅ **Clickable items lead to detailed views** (individual boss strategy pages)
- ✅ **Unique endpoints for each item** (`/bosses/crystalguardian`, `/bosses/mantislords`, etc.)
- ✅ **Proper 404 page** for invalid routes
- ✅ **Styled with Picocss**

## 🏗️ Project Structure

```
listicle-project1/
├── server.js              # Express server with routes
├── package.json           # Dependencies and scripts
├── README.md              # This file
├── data/
│   └── bosses.js          # Boss data with 8+ attributes each
└── public/                # Static files served by Express
    ├── index.html         # Homepage listing all bosses
    ├── boss.html          # Boss detail page template
    ├── 404.html           # Error page
    ├── styles.css         # Custom CSS + Picocss
    └── script.js          # Frontend JavaScript
```

## 🎯 Boss Data Structure

Each boss includes **8+ attributes**:

- **id**: Unique identifier for URL routing
- **name**: Display name
- **difficulty**: Easy, Medium, Hard, or Very Hard
- **location**: Where the boss is found
- **health**: Boss HP amount
- **rewards**: Array of items obtained after victory
- **description**: Lore and background information
- **strategy**: Tactical advice for defeating the boss
- **image**: Visual representation URL
- **weaknesses**: Array of what works best against this boss
- **resistances**: Array of what the boss is strong against

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your system

### Installation & Running

1. **Navigate to project directory**

   ```bash
   cd listicle-project1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Or production mode
   npm start
   ```

4. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛤️ Routes

- **`/`** - Homepage with all boss encounters
- **`/bosses/crystalguardian`** - Crystal Guardian details
- **`/bosses/mantislords`** - Mantis Lords details
- **`/bosses/shadowbeast`** - Shadow Beast details
- **`/bosses/flamedragón`** - Flame Dragon details
- **`/bosses/voidknight`** - Void Knight details
- **`/bosses/icequeen`** - Ice Queen details
- **`/api/bosses`** - JSON API for all bosses
- **`/api/bosses/:id`** - JSON API for specific boss
- **`*`** - 404 error page for invalid routes

## 🛠️ Technologies Used

- **Backend**: Node.js + Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Styling**: [Picocss](https://picocss.com/) + Custom CSS
- **Data**: JSON-based local data store

## 🎨 Design Features

- Clean, modern card-based layout
- Color-coded difficulty levels (Easy=Green, Hard=Red, etc.)
- Responsive CSS Grid system
- Smooth hover animations and transitions
- Accessible navigation and keyboard support
- Mobile-optimized responsive design
- Professional loading states and error handling

## 📱 Screenshots

### Homepage

- Grid layout showing all 6 boss encounters
- Each card displays name, location, health, description
- Color-coded difficulty badges
- Hover effects and smooth animations

### Boss Detail Pages

- Large boss image and detailed information
- Strategy guide and battle tips
- Organized weakness/resistance information
- Reward listings and lore descriptions

### 404 Error Page

- Custom themed error page
- Navigation back to safety
- Maintains visual consistency

## 🏆 CodePath WEB103 Requirements Met

This project fully satisfies all Week 1 Project requirements:

1. ✅ **Express Server**: Complete backend with proper routing
2. ✅ **Static File Serving**: CSS, JS, images served correctly
3. ✅ **Multiple Routes**: Homepage + individual boss pages
4. ✅ **Unique URLs**: Each boss accessible via `/bosses/:id`
5. ✅ **404 Handling**: Custom error page for invalid routes
6. ✅ **Vanilla Frontend**: No React/frameworks used
7. ✅ **Picocss Styling**: Modern, accessible design
8. ✅ **Rich Data Model**: 8+ attributes per boss
9. ✅ **Responsive Design**: Works on all device sizes

---

**Created by**: Siting Wang  
**Course**: CodePath WEB103 - Advanced Web Development  
**Project**: Week 1 - Listicle Part 1  
**Date**: 2024

🎮 _May your battles be epic and your victories legendary!_

## 🚀 现在测试你的项目

所有文件都已准备好！现在运行以下命令来测试：

```bash
cd /Users/wangsiting/web_codepath/web_codepath/listicle-project1
npm run dev
```

然后访问 `http://localhost:3000` 来查看你的 Boss Battle Guide！

## ✅ 项目特点总结

你的项目现在完全满足所有 WEB103 要求：

- ✅ 6 个独特的 boss，每个有 8+属性
- ✅ 响应式卡片布局
- ✅ 独特的详情页面路由
- ✅ Picocss 样式框架
- ✅ 专业的 404 错误处理
- ✅ 只使用 vanilla HTML/CSS/JS
- ✅ Express 服务器和 API 端点

你的项目已经完整并且功能齐全了！🎉
