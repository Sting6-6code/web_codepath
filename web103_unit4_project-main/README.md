# WEB103 Project 4 - _DIY Delight - Custom Car Builder_

Submitted by: **Siting Wang**

About this web app: **DIY Delight is a custom car builder web application that allows users to create, customize, edit, and manage their dream cars. Users can select from various options including exterior colors, roof types, wheels, and interior materials. The app features real-time price calculation, 3D visual previews with animations, and a complete CRUD (Create, Read, Update, Delete) functionality for managing custom car configurations.**

Time spent: **12** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT \* FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected _OR_ The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] **3D Visual Effects**: Enhanced car preview with 3D transformations, rotating wheels, and animated headlights
- [x] **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- [x] **Real-time Price Updates**: Dynamic price calculation that updates as users select different options
- [x] **Smooth Animations**: Floating car animations, shimmer effects, and hover interactions
- [x] **CORS Configuration**: Properly configured CORS for seamless frontend-backend communication
- [x] **Validation System**: Comprehensive form validation for required fields and incompatible combinations
- [x] **Modern UI/UX**: Glassmorphism effects, gradient backgrounds, and card-based layouts
- [x] **Price Breakdown**: Detailed price breakdown showing individual component costs

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='boltBucket.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->




## API Endpoints

### Cars

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get a specific car by ID
- `POST /api/cars` - Create a new car
- `PATCH /api/cars/:id` - Update an existing car
- `DELETE /api/cars/:id` - Delete a car

### Exteriors

- `GET /api/exteriors` - Get all exterior options
- `GET /api/exteriors/:id` - Get a specific exterior option

### Roofs

- `GET /api/roofs` - Get all roof options
- `GET /api/roofs/:id` - Get a specific roof option

### Wheels

- `GET /api/wheels` - Get all wheel options
- `GET /api/wheels/:id` - Get a specific wheel option

### Interiors

- `GET /api/interiors` - Get all interior options
- `GET /api/interiors/:id` - Get a specific interior option

## Tech Stack

### Frontend

- **React** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations and 3D transforms

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### DevOps

- **Render** - PostgreSQL hosting
- **Nodemon** - Development server auto-restart
- **Concurrently** - Run multiple npm scripts

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (local or Render)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   cd web103_unit4_project-main
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `server/.env` file:

   ```env
   PGUSER=your_database_user
   PGPASSWORD=your_database_password
   PGHOST=your_database_host
   PGPORT=5432
   PGDATABASE=your_database_name
   ```

4. **Initialize the database**

   ```bash
   cd server
   node config/reset.js
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## Project Structure

```
web103_unit4_project-main/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   └── CarCard.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── CreateCar.jsx
│   │   │   ├── EditCar.jsx
│   │   │   ├── CarDetails.jsx
│   │   │   └── ViewCars.jsx
│   │   ├── services/      # API service layer
│   │   │   ├── CarsAPI.js
│   │   │   ├── ExteriorsAPI.js
│   │   │   ├── RoofsAPI.js
│   │   │   ├── WheelsAPI.js
│   │   │   └── InteriorsAPI.js
│   │   ├── utilities/     # Helper functions
│   │   │   ├── calcPrice.js
│   │   │   └── validation.js
│   │   └── App.css        # Global styles
│   └── package.json
├── server/                # Backend Express application
│   ├── config/           # Database configuration
│   │   ├── database.js
│   │   └── reset.js
│   ├── controllers/      # Route controllers
│   │   ├── cars.js
│   │   ├── exteriors.js
│   │   ├── roofs.js
│   │   ├── wheels.js
│   │   └── interiors.js
│   ├── routes/           # API routes
│   │   ├── cars.js
│   │   ├── exteriors.js
│   │   ├── roofs.js
│   │   ├── wheels.js
│   │   └── interiors.js
│   ├── server.js         # Express server setup
│   └── package.json
└── README.md
```

## Features in Detail

### 1. Custom Car Creation

- Select from 5 exterior colors (Red, Blue, Black, White, Silver)
- Choose from 4 roof types (Standard, Sunroof, Convertible, Panoramic)
- Pick from 4 wheel options (16" to 20")
- Select from 5 interior materials and colors
- Real-time visual preview with 3D effects
- Dynamic price calculation

### 2. Car Management

- View all created cars in a responsive grid layout
- Edit existing car configurations
- Delete unwanted cars with confirmation
- View detailed specifications for each car

### 3. Visual Effects

- 3D car body with perspective transforms
- Animated rotating wheels
- Blinking headlights
- Floating animation for car preview
- Shimmer effects on hover
- Smooth transitions and color changes

### 4. Validation

- Required field validation
- Incompatible combination checking
- User-friendly error messages
- Form submission prevention for invalid data

## Challenges Encountered

1. **CORS Configuration**: Initially faced CORS errors when connecting frontend to backend. Solved by installing and properly configuring the `cors` middleware in Express.

2. **SQL Query Errors**: Had syntax errors in the SQL query for fetching cars (extra comma). Fixed by carefully reviewing the query structure and adding missing interior fields.

3. **Database Connection**: Encountered SSL/TLS requirements for Render PostgreSQL. Resolved by adding SSL configuration to the database pool.

4. **API Function Naming**: Had mismatched function names between API services and page components. Standardized naming conventions across the codebase.

5. **3D CSS Animations**: Creating smooth 3D transforms while maintaining performance was challenging. Used CSS transform properties with hardware acceleration.

6. **Port Conflicts**: Multiple instances of the development server caused port conflicts. Implemented cleanup scripts to kill existing processes before starting new ones.

## Future Enhancements

- [ ] Add user authentication and accounts
- [ ] Implement saving favorite configurations
- [ ] Add more customization options (engines, colors, accessories)
- [ ] Integrate payment processing
- [ ] Add social sharing features
- [ ] Implement AR/VR car preview
- [ ] Add comparison feature for multiple configurations
- [ ] Implement search and filter functionality

