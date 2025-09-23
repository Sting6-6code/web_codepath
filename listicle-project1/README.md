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

