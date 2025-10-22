# PostgreSQL Database Connection Guide

## 📋 Database Information

- **Database Name**: `drive_system`
- **Host**: `dpg-d3s1s23e5dus738ilbkg-a.oregon-postgres.render.com`
- **Port**: `5432`
- **Username**: `drive_system_user`

## 🔧 Connection Methods

### Method 1: Using psql Command Line (Recommended)

**Direct Connection String:**

```bash
psql "postgresql://drive_system_user:RigE3CTQAzxNtl7DjIbeTks95KDOncFf@dpg-d3s1s23e5dus738ilbkg-a.oregon-postgres.render.com:5432/drive_system?sslmode=require"
```

### Method 2: Using psql Interactive Prompts

When prompted by psql, enter **ONLY** the following values:

```
Server [localhost]: dpg-d3s1s23e5dus738ilbkg-a.oregon-postgres.render.com
Database [postgres]: drive_system
Port [5432]: 5432
Username [postgres]: drive_system_user
Password: RigE3CTQAzxNtl7DjIbeTks95KDOncFf
```

**⚠️ IMPORTANT**: Do NOT paste the full connection string at the "Server" prompt!

### Method 3: Using API to Query Data

```bash
# Get all exteriors
curl http://localhost:3000/api/exteriors

# Get all roofs
curl http://localhost:3000/api/roofs

# Get all wheels
curl http://localhost:3000/api/wheels

# Get all interiors
curl http://localhost:3000/api/interiors

# Get all cars
curl http://localhost:3000/api/cars
```

## 📊 Database Tables

### Available Tables:

1. `exteriors` - Exterior color options
2. `roofs` - Roof type options
3. `wheels` - Wheel options
4. `interiors` - Interior material and color options
5. `cars` - Custom car configurations

## 🔍 Sample SQL Queries

### View All Exteriors

```sql
SELECT * FROM exteriors ORDER BY id;
```

### View All Roofs

```sql
SELECT * FROM roofs ORDER BY id;
```

### View All Wheels

```sql
SELECT * FROM wheels ORDER BY id;
```

### View All Interiors

```sql
SELECT * FROM interiors ORDER BY id;
```

### View All Cars with Details

```sql
SELECT
  c.id,
  c.name,
  e.color as exterior_color,
  e.hex_code as exterior_hex,
  r.type as roof_type,
  w.type as wheels_type,
  i.material || ' - ' || i.color as interior,
  c.total_price,
  c.created_at
FROM cars c
LEFT JOIN exteriors e ON c.exterior_id = e.id
LEFT JOIN roofs r ON c.roof_id = r.id
LEFT JOIN wheels w ON c.wheels_id = w.id
LEFT JOIN interiors i ON c.interior_id = i.id
ORDER BY c.created_at DESC;
```

## 📸 Current Database Content

### Exteriors (5 options)

| ID  | Color  | Price   | Hex Code |
| --- | ------ | ------- | -------- |
| 1   | Red    | 1000.00 | #FF0000  |
| 2   | Blue   | 1000.00 | #0000FF  |
| 3   | Black  | 1500.00 | #000000  |
| 4   | White  | 900.00  | #FFFFFF  |
| 5   | Silver | 1200.00 | #C0C0C0  |

### Roofs (4 options)

| ID  | Type        | Price   |
| --- | ----------- | ------- |
| 1   | Standard    | 0.00    |
| 2   | Sunroof     | 1500.00 |
| 3   | Convertible | 3000.00 |
| 4   | Panoramic   | 2500.00 |

### Wheels (4 options)

| ID  | Type            | Price   |
| --- | --------------- | ------- |
| 1   | Standard 16"    | 0.00    |
| 2   | Sport 18"       | 1000.00 |
| 3   | Luxury 19"      | 1500.00 |
| 4   | Performance 20" | 2000.00 |

### Interiors (5 options)

| ID  | Material        | Color | Price   | Hex Code |
| --- | --------------- | ----- | ------- | -------- |
| 1   | Fabric          | Black | 0.00    | #000000  |
| 2   | Fabric          | Gray  | 200.00  | #808080  |
| 3   | Leather         | Black | 1500.00 | #000000  |
| 4   | Leather         | Tan   | 1700.00 | #D2B48C  |
| 5   | Premium Leather | White | 2500.00 | #FFFFFF  |

## 🎯 For README Screenshots

### 1. Render Dashboard Screenshot

- Go to: https://dashboard.render.com
- Navigate to your PostgreSQL database
- Take a screenshot showing the database is active and running

### 2. Database Content Screenshot

Run these commands and take screenshots:

```bash
# Start psql connection
psql "postgresql://drive_system_user:RigE3CTQAzxNtl7DjIbeTks95KDOncFf@dpg-d3s1s23e5dus738ilbkg-a.oregon-postgres.render.com:5432/drive_system?sslmode=require"

# Then run these queries:
SELECT * FROM exteriors;
SELECT * FROM roofs;
SELECT * FROM wheels;
SELECT * FROM interiors;
SELECT * FROM cars;
```

## 🚀 Testing the Connection

### Using the Test Script

```bash
cd /Users/wangsiting/CodePath_web_AS/web_codepath/web103_unit4_project-main
node test-database.js
```

### Using API Endpoints

```bash
# Make sure your server is running
npm run dev

# In another terminal, test the endpoints
curl http://localhost:3000/api/exteriors | jq
curl http://localhost:3000/api/roofs | jq
curl http://localhost:3000/api/wheels | jq
curl http://localhost:3000/api/interiors | jq
curl http://localhost:3000/api/cars | jq
```

## 📝 Notes

- The database is hosted on Render.com
- SSL connection is required
- All tables are properly seeded with initial data
- CORS is configured to allow frontend-backend communication
- The database uses PostgreSQL 15+

## 🔐 Security

- **Never commit `.env` files to Git**
- Database credentials are stored in environment variables
- SSL/TLS encryption is enabled for all connections
- Production database is separate from development

## 🆘 Troubleshooting

### Error: "server does not support SSL"

- **Solution**: Make sure SSL configuration is enabled in `database.js`

### Error: "EADDRINUSE"

- **Solution**: Kill existing processes: `pkill -f "node server.js"`

### Error: "Failed to fetch"

- **Solution**: Check CORS configuration in `server.js`

### Error: "Connection timeout"

- **Solution**: Check if Render database is active and credentials are correct
