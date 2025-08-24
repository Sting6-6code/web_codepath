# WEB103 Prework - _🌟 Creatorverse_

Submitted by: **Siting Wang**

About this web app: **A content creator discovery platform where users can explore, add, edit, and manage their favorite content creators. Built with React and Supabase, featuring a modern glassmorphism UI design.**

Time spent: **10+** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] ~~Picocss is used to style HTML elements~~ (Used custom CSS with glassmorphism design instead)
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

- [x] **Modern Glassmorphism UI Design** - Beautiful gradient backgrounds with glass-like cards
- [x] **Comprehensive Form Validation** - Real-time validation with helpful error messages
- [x] **Loading States & Error Handling** - Professional loading spinners and error feedback
- [x] **Responsive Design** - Mobile-friendly layout that works on all devices
- [x] **Image Fallbacks** - Graceful handling when creator images fail to load
- [x] **Confirmation Dialogs** - Safety prompts before deleting creators
- [x] **Environment Variables** - Secure credential management for Supabase
- [x] **Professional Navigation** - Smooth transitions between pages

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='licecap.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with LiceCap

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

## 🔧 Setup Instructions

**IMPORTANT:** Before running this app, you need to:

### 1. Environment Variables

Create a `.env` file in the project root with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_KEY=your_supabase_anon_key_here
```

### 2. Supabase Database Setup

Create a table called `creators` with these columns:

- `id` (int8, primary key, auto-increment)
- `created_at` (timestamptz, default: now())
- `name` (text, required)
- `url` (text, required)
- `description` (text, required)
- `imageURL` (text, optional)

### 3. Run the Application

```bash
npm install
npm run dev
```

### 4. Add Sample Data

To demonstrate the "at least five content creators" requirement, add some sample creators using the "Add New Creator" button. The app will display them in a beautiful card layout.

## 🌟 Key Features Implemented

- **Full CRUD Operations** - Create, read, update, delete creators
- **Modern React Architecture** - Functional components with hooks
- **Supabase Integration** - Real-time database with proper error handling
- **Beautiful UI Design** - Glassmorphism aesthetic with smooth animations
- **Form Validation** - Comprehensive validation with user-friendly error messages
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Professional UX** - Loading states, confirmations, and intuitive navigation

## 🚀 Technologies Used

- **Frontend:** React 19, React Router DOM
- **Backend:** Supabase (PostgreSQL database)
- **Styling:** Custom CSS with glassmorphism design
- **Build Tool:** Vite
- **State Management:** React hooks (useState, useEffect)

## License

Copyright [2024] [Siting Wang]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
