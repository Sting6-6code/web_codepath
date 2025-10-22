我来帮你创建一个详细的MVP构建分步计划！首先让我查看一下architecture.md文件的内容。

[1 tool called]

完美！我已经读取了architecture.md文件。现在我会创建一个详细的MVP构建分步计划，每个任务都非常小、可测试且专注。

---

# 🚀 Bolt Bucket MVP 构建任务清单

## 📋 任务组织原则
- ✅ 每个任务独立且可测试
- ✅ 明确的验收标准
- ✅ 按依赖顺序排列
- ✅ 每个任务完成后立即可验证

---

## 🗄️ 阶段 1：数据库基础设施 (Tasks 1-5)

### **Task 1: 创建数据库连接配置文件**
**目标：** 创建PostgreSQL连接配置

**步骤：**
1. 在 `server/` 目录下创建 `config/` 文件夹
2. 在 `server/config/` 创建 `database.js` 文件
3. 添加以下代码：

```javascript
import pg from 'pg'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)
```

**验收标准：**
- ✅ `server/config/database.js` 文件存在
- ✅ 文件导出 `pool` 对象
- ✅ 配置读取环境变量

**测试方法：**
```bash
# 检查文件是否存在
ls server/config/database.js
```

---

### **Task 2: 创建环境变量文件**
**目标：** 配置数据库连接凭据

**步骤：**
1. 在 `server/` 目录下创建 `.env` 文件
2. 添加以下内容（使用Render数据库的实际值）：

```env
PGUSER="your_render_username"
PGPASSWORD="your_render_password"
PGHOST="your_render_host.oregon-postgres.render.com"
PGPORT=5432
PGDATABASE="your_render_database"
PORT=3000
NODE_ENV=development
```

**验收标准：**
- ✅ `server/.env` 文件存在
- ✅ 所有必需的环境变量已设置
- ✅ `.env` 在 `.gitignore` 中（已存在）

**测试方法：**
```bash
# 检查文件是否存在
ls server/.env
# 检查是否包含所有必需变量
cat server/.env | grep -E "PGUSER|PGPASSWORD|PGHOST"
```

---

### **Task 3: 创建 exteriors 表**
**目标：** 创建外观选项表并插入初始数据

**步骤：**
1. 在 `server/config/` 创建 `reset.js` 文件
2. 添加创建 exteriors 表的代码：

```javascript
import { pool } from './database.js'

const createExteriorsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS exteriors CASCADE;
        
        CREATE TABLE exteriors (
            id SERIAL PRIMARY KEY,
            color VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );
    `
    await pool.query(createTableQuery)
    console.log('✅ Exteriors table created')
}

const seedExteriors = async () => {
    const insertQuery = `
        INSERT INTO exteriors (color, price, hex_code) VALUES
        ('Red', 1000.00, '#FF0000'),
        ('Blue', 1000.00, '#0000FF'),
        ('Black', 1500.00, '#000000'),
        ('White', 900.00, '#FFFFFF'),
        ('Silver', 1200.00, '#C0C0C0')
    `
    await pool.query(insertQuery)
    console.log('✅ Exteriors seeded')
}

const setup = async () => {
    await createExteriorsTable()
    await seedExteriors()
}

setup()
    .then(() => {
        console.log('✅ Exteriors setup complete')
        pool.end()
    })
    .catch(err => {
        console.error('❌ Setup error:', err)
        pool.end()
    })
```

**验收标准：**
- ✅ `server/config/reset.js` 文件存在
- ✅ 运行 `node server/config/reset.js` 成功
- ✅ 数据库中存在 exteriors 表
- ✅ 表中有 5 条数据

**测试方法：**
```bash
cd server
node config/reset.js
```
在PostgreSQL客户端验证：
```sql
SELECT * FROM exteriors;
```

---

### **Task 4: 创建 roofs, wheels, interiors 表**
**目标：** 创建其他配置选项表并插入数据

**步骤：**
1. 修改 `server/config/reset.js`，添加其他表的创建和数据插入：

```javascript
import { pool } from './database.js'

const dropTables = async () => {
    await pool.query(`
        DROP TABLE IF EXISTS cars CASCADE;
        DROP TABLE IF EXISTS exteriors CASCADE;
        DROP TABLE IF EXISTS roofs CASCADE;
        DROP TABLE IF EXISTS wheels CASCADE;
        DROP TABLE IF EXISTS interiors CASCADE;
    `)
    console.log('✅ Tables dropped')
}

const createTables = async () => {
    await pool.query(`
        CREATE TABLE exteriors (
            id SERIAL PRIMARY KEY,
            color VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );
        
        CREATE TABLE roofs (
            id SERIAL PRIMARY KEY,
            type VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        );
        
        CREATE TABLE wheels (
            id SERIAL PRIMARY KEY,
            type VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        );
        
        CREATE TABLE interiors (
            id SERIAL PRIMARY KEY,
            material VARCHAR(100) NOT NULL,
            color VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );
    `)
    console.log('✅ Tables created')
}

const seedData = async () => {
    await pool.query(`
        INSERT INTO exteriors (color, price, hex_code) VALUES
        ('Red', 1000.00, '#FF0000'),
        ('Blue', 1000.00, '#0000FF'),
        ('Black', 1500.00, '#000000'),
        ('White', 900.00, '#FFFFFF'),
        ('Silver', 1200.00, '#C0C0C0');
        
        INSERT INTO roofs (type, price) VALUES
        ('Standard', 0.00),
        ('Sunroof', 1500.00),
        ('Convertible', 3000.00),
        ('Panoramic', 2500.00);
        
        INSERT INTO wheels (type, price) VALUES
        ('Standard 16"', 0.00),
        ('Sport 18"', 1000.00),
        ('Luxury 19"', 1500.00),
        ('Performance 20"', 2000.00);
        
        INSERT INTO interiors (material, color, price, hex_code) VALUES
        ('Fabric', 'Black', 0.00, '#000000'),
        ('Fabric', 'Gray', 200.00, '#808080'),
        ('Leather', 'Black', 1500.00, '#000000'),
        ('Leather', 'Tan', 1700.00, '#D2B48C'),
        ('Premium Leather', 'White', 2500.00, '#FFFFFF');
    `)
    console.log('✅ Data seeded')
}

const setup = async () => {
    await dropTables()
    await createTables()
    await seedData()
}

setup()
    .then(() => {
        console.log('✅ Database setup complete')
        pool.end()
    })
    .catch(err => {
        console.error('❌ Setup error:', err)
        pool.end()
    })
```

**验收标准：**
- ✅ 运行脚本成功
- ✅ 4个表都创建成功（exteriors, roofs, wheels, interiors）
- ✅ 每个表都有数据

**测试方法：**
```bash
node server/config/reset.js
```
验证每个表：
```sql
SELECT COUNT(*) FROM exteriors; -- 应该返回 5
SELECT COUNT(*) FROM roofs;     -- 应该返回 4
SELECT COUNT(*) FROM wheels;    -- 应该返回 4
SELECT COUNT(*) FROM interiors; -- 应该返回 5
```

---

### **Task 5: 创建 cars 表**
**目标：** 创建主汽车表，关联所有配置选项

**步骤：**
1. 修改 `server/config/reset.js` 的 `createTables` 函数，添加 cars 表：

```javascript
const createTables = async () => {
    await pool.query(`
        CREATE TABLE exteriors (
            id SERIAL PRIMARY KEY,
            color VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );
        
        CREATE TABLE roofs (
            id SERIAL PRIMARY KEY,
            type VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        );
        
        CREATE TABLE wheels (
            id SERIAL PRIMARY KEY,
            type VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
        );
        
        CREATE TABLE interiors (
            id SERIAL PRIMARY KEY,
            material VARCHAR(100) NOT NULL,
            color VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            hex_code VARCHAR(7) NOT NULL
        );
        
        CREATE TABLE cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior_id INTEGER REFERENCES exteriors(id),
            roof_id INTEGER REFERENCES roofs(id),
            wheels_id INTEGER REFERENCES wheels(id),
            interior_id INTEGER REFERENCES interiors(id),
            total_price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log('✅ All tables created')
}
```

**验收标准：**
- ✅ cars 表创建成功
- ✅ 外键约束设置正确
- ✅ 可以查询空的 cars 表

**测试方法：**
```bash
node server/config/reset.js
```
```sql
SELECT * FROM cars; -- 应该返回空结果
\d cars -- 查看表结构，确认外键存在
```

---

## 🔧 阶段 2：后端 Controllers (Tasks 6-10)

### **Task 6: 创建 exteriors controller**
**目标：** 实现获取所有外观选项的功能

**步骤：**
1. 在 `server/` 目录下创建 `controllers/` 文件夹
2. 创建 `server/controllers/exteriors.js` 文件：

```javascript
import { pool } from '../config/database.js'

// 获取所有外观选项
export const getExteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM exteriors ORDER BY id')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// 根据ID获取单个外观选项
export const getExteriorById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM exteriors WHERE id = $1', [id])
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Exterior not found' })
        }
        
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
```

**验收标准：**
- ✅ `server/controllers/exteriors.js` 文件存在
- ✅ 导出 `getExteriors` 函数
- ✅ 导出 `getExteriorById` 函数
- ✅ 包含错误处理

**测试方法：**
```bash
# 检查文件语法
node --check server/controllers/exteriors.js
```

---

### **Task 7: 创建 roofs, wheels, interiors controllers**
**目标：** 实现其他配置选项的 controllers

**步骤：**
创建三个文件，每个文件结构类似：

**`server/controllers/roofs.js`:**
```javascript
import { pool } from '../config/database.js'

export const getRoofs = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM roofs ORDER BY id')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getRoofById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM roofs WHERE id = $1', [id])
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Roof not found' })
        }
        
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
```

**`server/controllers/wheels.js`:** (类似结构，替换表名)
**`server/controllers/interiors.js`:** (类似结构，替换表名)

**验收标准：**
- ✅ 三个 controller 文件都存在
- ✅ 每个文件导出两个函数（getAll 和 getById）
- ✅ 所有文件语法正确

**测试方法：**
```bash
node --check server/controllers/roofs.js
node --check server/controllers/wheels.js
node --check server/controllers/interiors.js
```

---

### **Task 8: 创建 cars controller - GET 操作**
**目标：** 实现获取汽车列表和单个汽车的功能

**步骤：**
创建 `server/controllers/cars.js`：

```javascript
import { pool } from '../config/database.js'

// 获取所有汽车（带关联信息）
export const getCars = async (req, res) => {
    try {
        const results = await pool.query(`
            SELECT 
                c.*,
                e.color as exterior_color,
                e.hex_code as exterior_hex,
                e.price as exterior_price,
                r.type as roof_type,
                r.price as roof_price,
                w.type as wheels_type,
                w.price as wheels_price,
                i.material as interior_material,
                i.color as interior_color,
                i.hex_code as interior_hex,
                i.price as interior_price
            FROM cars c
            LEFT JOIN exteriors e ON c.exterior_id = e.id
            LEFT JOIN roofs r ON c.roof_id = r.id
            LEFT JOIN wheels w ON c.wheels_id = w.id
            LEFT JOIN interiors i ON c.interior_id = i.id
            ORDER BY c.created_at DESC
        `)
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// 根据ID获取单个汽车（带关联信息）
export const getCarById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query(`
            SELECT 
                c.*,
                e.color as exterior_color,
                e.hex_code as exterior_hex,
                e.price as exterior_price,
                r.type as roof_type,
                r.price as roof_price,
                w.type as wheels_type,
                w.price as wheels_price,
                i.material as interior_material,
                i.color as interior_color,
                i.hex_code as interior_hex,
                i.price as interior_price
            FROM cars c
            LEFT JOIN exteriors e ON c.exterior_id = e.id
            LEFT JOIN roofs r ON c.roof_id = r.id
            LEFT JOIN wheels w ON c.wheels_id = w.id
            LEFT JOIN interiors i ON c.interior_id = i.id
            WHERE c.id = $1
        `, [id])
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
```

**验收标准：**
- ✅ `server/controllers/cars.js` 文件存在
- ✅ `getCars` 函数使用 JOIN 查询
- ✅ `getCarById` 函数包含 404 处理
- ✅ 语法检查通过

**测试方法：**
```bash
node --check server/controllers/cars.js
```

---

### **Task 9: 创建 cars controller - POST 操作**
**目标：** 实现创建新汽车的功能

**步骤：**
在 `server/controllers/cars.js` 添加：

```javascript
// 创建新汽车
export const createCar = async (req, res) => {
    try {
        const { name, exterior_id, roof_id, wheels_id, interior_id, total_price } = req.body
        
        // 验证必填字段
        if (!name || !exterior_id || !roof_id || !wheels_id || !interior_id || !total_price) {
            return res.status(400).json({ error: 'All fields are required' })
        }
        
        const results = await pool.query(
            `INSERT INTO cars (name, exterior_id, roof_id, wheels_id, interior_id, total_price)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [name, exterior_id, roof_id, wheels_id, interior_id, total_price]
        )
        
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
```

**验收标准：**
- ✅ `createCar` 函数存在
- ✅ 包含字段验证
- ✅ 使用 RETURNING 返回新创建的记录
- ✅ 返回 201 状态码

**测试方法：**
```bash
node --check server/controllers/cars.js
```

---

### **Task 10: 创建 cars controller - PATCH 和 DELETE 操作**
**目标：** 实现更新和删除汽车的功能

**步骤：**
在 `server/controllers/cars.js` 添加：

```javascript
// 更新汽车
export const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { name, exterior_id, roof_id, wheels_id, interior_id, total_price } = req.body
        
        // 验证至少有一个字段要更新
        if (!name && !exterior_id && !roof_id && !wheels_id && !interior_id && !total_price) {
            return res.status(400).json({ error: 'At least one field is required for update' })
        }
        
        const results = await pool.query(
            `UPDATE cars 
             SET name = COALESCE($1, name),
                 exterior_id = COALESCE($2, exterior_id),
                 roof_id = COALESCE($3, roof_id),
                 wheels_id = COALESCE($4, wheels_id),
                 interior_id = COALESCE($5, interior_id),
                 total_price = COALESCE($6, total_price)
             WHERE id = $7
             RETURNING *`,
            [name, exterior_id, roof_id, wheels_id, interior_id, total_price, id]
        )
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// 删除汽车
export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        
        const results = await pool.query(
            'DELETE FROM cars WHERE id = $1 RETURNING *',
            [id]
        )
        
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        
        res.status(200).json({ message: 'Car deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
```

**验收标准：**
- ✅ `updateCar` 函数使用 COALESCE 实现部分更新
- ✅ `deleteCar` 函数返回成功消息
- ✅ 两个函数都包含 404 处理
- ✅ 语法检查通过

**测试方法：**
```bash
node --check server/controllers/cars.js
```

---

## 🛣️ 阶段 3：后端 Routes (Tasks 11-15)

### **Task 11: 创建 exteriors routes**
**目标：** 为外观选项创建路由

**步骤：**
1. 在 `server/` 目录下创建 `routes/` 文件夹
2. 创建 `server/routes/exteriors.js`：

```javascript
import express from 'express'
import { getExteriors, getExteriorById } from '../controllers/exteriors.js'

const router = express.Router()

router.get('/', getExteriors)
router.get('/:id', getExteriorById)

export default router
```

**验收标准：**
- ✅ `server/routes/exteriors.js` 文件存在
- ✅ 导入正确的 controller 函数
- ✅ 定义两个路由（GET / 和 GET /:id）
- ✅ 导出 router

**测试方法：**
```bash
node --check server/routes/exteriors.js
```

---

### **Task 12: 创建 roofs, wheels, interiors routes**
**目标：** 为其他配置选项创建路由

**步骤：**
创建三个路由文件：

**`server/routes/roofs.js`:**
```javascript
import express from 'express'
import { getRoofs, getRoofById } from '../controllers/roofs.js'

const router = express.Router()

router.get('/', getRoofs)
router.get('/:id', getRoofById)

export default router
```

**`server/routes/wheels.js`** 和 **`server/routes/interiors.js`** 类似结构

**验收标准：**
- ✅ 三个路由文件都存在
- ✅ 每个文件导入正确的 controller
- ✅ 每个文件定义两个路由
- ✅ 语法检查通过

**测试方法：**
```bash
node --check server/routes/roofs.js
node --check server/routes/wheels.js
node --check server/routes/interiors.js
```

---

### **Task 13: 创建 cars routes**
**目标：** 为汽车 CRUD 操作创建完整路由

**步骤：**
创建 `server/routes/cars.js`：

```javascript
import express from 'express'
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/cars.js'

const router = express.Router()

router.get('/', getCars)
router.get('/:id', getCarById)
router.post('/', createCar)
router.patch('/:id', updateCar)
router.delete('/:id', deleteCar)

export default router
```

**验收标准：**
- ✅ `server/routes/cars.js` 文件存在
- ✅ 导入所有 5 个 controller 函数
- ✅ 定义 5 个路由（GET, GET/:id, POST, PATCH/:id, DELETE/:id）
- ✅ 语法检查通过

**测试方法：**
```bash
node --check server/routes/cars.js
```

---

### **Task 14: 更新 server.js 挂载所有路由**
**目标：** 将所有路由连接到 Express 应用

**步骤：**
修改 `server/server.js`：

```javascript
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'

// 导入路由
import carsRouter from './routes/cars.js'
import exteriorsRouter from './routes/exteriors.js'
import roofsRouter from './routes/roofs.js'
import wheelsRouter from './routes/wheels.js'
import interiorsRouter from './routes/interiors.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// 挂载路由
app.use('/api/cars', carsRouter)
app.use('/api/exteriors', exteriorsRouter)
app.use('/api/roofs', roofsRouter)
app.use('/api/wheels', wheelsRouter)
app.use('/api/interiors', interiorsRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`🚗 Server listening on http://localhost:${PORT}`)
})
```

**验收标准：**
- ✅ 导入所有 5 个路由
- ✅ 使用正确的 API 路径挂载每个路由
- ✅ 服务器可以启动
- ✅ 无语法错误

**测试方法：**
```bash
cd server
node server.js
# 服务器应该启动并显示监听消息
```

---

### **Task 15: 测试所有后端 API 端点**
**目标：** 验证所有 API 端点正常工作

**步骤：**
使用 curl 或 Postman 测试每个端点：

**测试 exteriors:**
```bash
curl http://localhost:3000/api/exteriors
curl http://localhost:3000/api/exteriors/1
```

**测试 roofs:**
```bash
curl http://localhost:3000/api/roofs
curl http://localhost:3000/api/roofs/1
```

**测试 wheels:**
```bash
curl http://localhost:3000/api/wheels
curl http://localhost:3000/api/wheels/1
```

**测试 interiors:**
```bash
curl http://localhost:3000/api/interiors
curl http://localhost:3000/api/interiors/1
```

**测试 cars - GET:**
```bash
curl http://localhost:3000/api/cars
```

**测试 cars - POST:**
```bash
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Car",
    "exterior_id": 1,
    "roof_id": 1,
    "wheels_id": 1,
    "interior_id": 1,
    "total_price": 2900.00
  }'
```

**测试 cars - PATCH:**
```bash
curl -X PATCH http://localhost:3000/api/cars/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Test Car"}'
```

**测试 cars - DELETE:**
```bash
curl -X DELETE http://localhost:3000/api/cars/1
```

**验收标准：**
- ✅ 所有 GET 端点返回 200 和数据
- ✅ POST 端点返回 201 和新创建的数据
- ✅ PATCH 端点返回 200 和更新后的数据
- ✅ DELETE 端点返回 200 和成功消息
- ✅ 无效 ID 返回 404
- ✅ 缺少必填字段返回 400

---

## 🎨 阶段 4：前端服务层 (Tasks 16-21)

### **Task 16: 创建 ExteriorsAPI 服务**
**目标：** 封装外观选项的 API 调用

**步骤：**
1. 在 `client/src/` 目录下创建 `services/` 文件夹
2. 创建 `client/src/services/ExteriorsAPI.js`：

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const getAllExteriors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/exteriors`)
        if (!response.ok) {
            throw new Error('Failed to fetch exteriors')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching exteriors:', error)
        throw error
    }
}

export const getExterior = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/exteriors/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch exterior')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching exterior:', error)
        throw error
    }
}
```

**验收标准：**
- ✅ `client/src/services/ExteriorsAPI.js` 文件存在
- ✅ 导出两个函数
- ✅ 包含错误处理
- ✅ 使用环境变量或默认 URL

**测试方法：**
在浏览器控制台测试：
```javascript
import { getAllExteriors } from './services/ExteriorsAPI.js'
getAllExteriors().then(console.log)
```

---

### **Task 17: 创建 RoofsAPI, WheelsAPI, InteriorsAPI 服务**
**目标：** 为其他配置选项创建 API 服务

**步骤：**
创建三个类似的文件：

**`client/src/services/RoofsAPI.js`:**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const getAllRoofs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/roofs`)
        if (!response.ok) throw new Error('Failed to fetch roofs')
        return await response.json()
    } catch (error) {
        console.error('Error fetching roofs:', error)
        throw error
    }
}

export const getRoof = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/roofs/${id}`)
        if (!response.ok) throw new Error('Failed to fetch roof')
        return await response.json()
    } catch (error) {
        console.error('Error fetching roof:', error)
        throw error
    }
}
```

**`client/src/services/WheelsAPI.js`** 和 **`client/src/services/InteriorsAPI.js`** 类似

**验收标准：**
- ✅ 三个 API 服务文件都存在
- ✅ 每个文件导出两个函数
- ✅ 包含错误处理

---

### **Task 18: 创建 CarsAPI 服务 - GET 操作**
**目标：** 实现获取汽车的 API 调用

**步骤：**
创建 `client/src/services/CarsAPI.js`：

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const getAllCars = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cars`)
        if (!response.ok) {
            throw new Error('Failed to fetch cars')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching cars:', error)
        throw error
    }
}

export const getCar = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cars/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch car')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching car:', error)
        throw error
    }
}
```

**验收标准：**
- ✅ `client/src/services/CarsAPI.js` 文件存在
- ✅ 导出 `getAllCars` 和 `getCar` 函数
- ✅ 包含错误处理

---

### **Task 19: 创建 CarsAPI 服务 - POST, PATCH, DELETE 操作**
**目标：** 实现创建、更新、删除汽车的 API 调用

**步骤：**
在 `client/src/services/CarsAPI.js` 添加：

```javascript
export const createCar = async (carData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        })
        
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to create car')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error creating car:', error)
        throw error
    }
}

export const updateCar = async (id, carData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        })
        
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to update car')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error updating car:', error)
        throw error
    }
}

export const deleteCar = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
            method: 'DELETE'
        })
        
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to delete car')
        }
        
        return await response.json()
    } catch (error) {
        console.error('Error deleting car:', error)
        throw error
    }
}
```

**验收标准：**
- ✅ 导出三个新函数
- ✅ 每个函数使用正确的 HTTP 方法
- ✅ POST 和 PATCH 包含 JSON headers
- ✅ 包含详细的错误处理

---

### **Task 20: 创建 calcPrice 工具函数**
**目标：** 实现价格计算功能

**步骤：**
1. 在 `client/src/` 目录下创建 `utilities/` 文件夹
2. 创建 `client/src/utilities/calcPrice.js`：

```javascript
// 计算汽车总价
export const calculateTotalPrice = (exterior, roof, wheels, interior) => {
    const exteriorPrice = exterior ? parseFloat(exterior.price) : 0
    const roofPrice = roof ? parseFloat(roof.price) : 0
    const wheelsPrice = wheels ? parseFloat(wheels.price) : 0
    const interiorPrice = interior ? parseFloat(interior.price) : 0
    
    const total = exteriorPrice + roofPrice + wheelsPrice + interiorPrice
    return total.toFixed(2)
}

// 获取单个选项价格
export const getOptionPrice = (option) => {
    return option ? parseFloat(option.price) : 0
}

// 格式化价格显示
export const formatPrice = (price) => {
    return `$${parseFloat(price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`
}
```

**验收标准：**
- ✅ `client/src/utilities/calcPrice.js` 文件存在
- ✅ 导出 `calculateTotalPrice` 函数
- ✅ 导出 `getOptionPrice` 函数
- ✅ 导出 `formatPrice` 函数
- ✅ 处理 null/undefined 值

**测试方法：**
在浏览器控制台测试：
```javascript
import { calculateTotalPrice } from './utilities/calcPrice.js'
const total = calculateTotalPrice(
    {price: 1000}, 
    {price: 1500}, 
    {price: 1000}, 
    {price: 1500}
)
console.log(total) // 应该输出 "5000.00"
```

---

### **Task 21: 创建 validation 工具函数**
**目标：** 实现验证功能

**步骤：**
创建 `client/src/utilities/validation.js`：

```javascript
// 验证必填字段
export const validateRequiredFields = (carData) => {
    const { name, exterior_id, roof_id, wheels_id, interior_id } = carData
    
    if (!name || name.trim() === '') {
        return { valid: false, message: 'Car name is required' }
    }
    
    if (!exterior_id) {
        return { valid: false, message: 'Please select an exterior color' }
    }
    
    if (!roof_id) {
        return { valid: false, message: 'Please select a roof type' }
    }
    
    if (!wheels_id) {
        return { valid: false, message: 'Please select wheel type' }
    }
    
    if (!interior_id) {
        return { valid: false, message: 'Please select an interior' }
    }
    
    return { valid: true }
}

// 验证组合是否兼容（简单示例）
export const validateCombination = (selections) => {
    const { roof_id, wheels_id } = selections
    
    // 示例：convertible roof (id=3) 不能配 standard wheels (id=1)
    if (roof_id === 3 && wheels_id === 1) {
        return { 
            valid: false, 
            message: 'Convertible roof requires upgraded wheels (Sport or better)' 
        }
    }
    
    return { valid: true }
}
```

**验收标准：**
- ✅ `client/src/utilities/validation.js` 文件存在
- ✅ 导出 `validateRequiredFields` 函数
- ✅ 导出 `validateCombination` 函数
- ✅ 验证所有必填字段
- ✅ 返回统一的结果格式

---

## 🌐 阶段 5：前端页面实现 (Tasks 22-29)

### **Task 22: 实现 ViewCars 页面 - 基本结构**
**目标：** 创建显示汽车列表的页面基本结构

**步骤：**
修改 `client/src/pages/ViewCars.jsx`：

```javascript
import React, { useState, useEffect } from 'react'
import { getAllCars } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true)
                const data = await getAllCars()
                setCars(data)
                setError(null)
            } catch (err) {
                setError('Failed to load cars')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchCars()
    }, [])
    
    if (loading) return <div className="loading">Loading cars...</div>
    if (error) return <div className="error">{error}</div>
    
    return (
        <div className="view-cars">
            <h1>My Custom Cars</h1>
            {cars.length === 0 ? (
                <p>No cars yet. Create your first custom car!</p>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <div key={car.id} className="car-card-placeholder">
                            <h3>{car.name}</h3>
                            <p>Price: ${car.total_price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
```

**验收标准：**
- ✅ 页面可以加载
- ✅ 显示加载状态
- ✅ 显示错误状态
- ✅ 显示汽车列表或空状态
- ✅ 使用 useEffect 获取数据

**测试方法：**
1. 启动前端：`npm run dev`
2. 访问 `http://localhost:5173/customcars`
3. 应该看到汽车列表或空状态消息

---

### **Task 23: 创建 CarCard 组件**
**目标：** 创建可复用的汽车卡片组件

**步骤：**
创建 `client/src/components/CarCard.jsx`：

```javascript
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car, onDelete }) => {
    const navigate = useNavigate()
    
    const handleViewDetails = () => {
        navigate(`/customcars/${car.id}`)
    }
    
    const handleEdit = () => {
        navigate(`/edit/${car.id}`)
    }
    
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${car.name}"?`)) {
            onDelete(car.id)
        }
    }
    
    return (
        <div className="car-card">
            <div 
                className="car-preview"
                style={{ backgroundColor: car.exterior_hex }}
                onClick={handleViewDetails}
            >
                <div className="car-visual">
                    <div className="car-body"></div>
                </div>
            </div>
            
            <div className="car-info">
                <h3>{car.name}</h3>
                <div className="car-specs">
                    <p>🎨 {car.exterior_color}</p>
                    <p>🏠 {car.roof_type}</p>
                    <p>⚙️ {car.wheels_type}</p>
                    <p>💺 {car.interior_material} ({car.interior_color})</p>
                </div>
                <p className="car-price">${car.total_price}</p>
                
                <div className="car-actions">
                    <button onClick={handleEdit} className="btn-edit">Edit</button>
                    <button onClick={handleDelete} className="btn-delete">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default CarCard
```

**验收标准：**
- ✅ `client/src/components/CarCard.jsx` 文件存在
- ✅ 显示汽车所有信息
- ✅ 包含编辑和删除按钮
- ✅ 点击卡片跳转到详情页
- ✅ 删除前显示确认对话框

---

### **Task 24: 完善 ViewCars 页面 - 使用 CarCard**
**目标：** 在 ViewCars 中使用 CarCard 组件并实现删除功能

**步骤：**
修改 `client/src/pages/ViewCars.jsx`：

```javascript
import React, { useState, useEffect } from 'react'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import CarCard from '../components/CarCard'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetchCars()
    }, [])
    
    const fetchCars = async () => {
        try {
            setLoading(true)
            const data = await getAllCars()
            setCars(data)
            setError(null)
        } catch (err) {
            setError('Failed to load cars')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    
    const handleDelete = async (id) => {
        try {
            await deleteCar(id)
            // 从状态中移除已删除的汽车
            setCars(cars.filter(car => car.id !== id))
        } catch (err) {
            alert('Failed to delete car')
            console.error(err)
        }
    }
    
    if (loading) return <div className="loading">Loading cars...</div>
    if (error) return <div className="error">{error}</div>
    
    return (
        <div className="view-cars">
            <h1>My Custom Cars</h1>
            {cars.length === 0 ? (
                <div className="empty-state">
                    <p>No cars yet. Create your first custom car!</p>
                    <a href="/" className="btn-primary">Customize a Car</a>
                </div>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <CarCard 
                            key={car.id} 
                            car={car} 
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
```

**验收标准：**
- ✅ 使用 CarCard 组件显示汽车
- ✅ 删除功能正常工作
- ✅ 删除后列表自动更新
- ✅ 空状态显示创建按钮

**测试方法：**
1. 访问 `/customcars`
2. 查看汽车卡片
3. 点击删除按钮，确认汽车被删除

---

### **Task 25: 实现 CreateCar 页面 - 加载选项**
**目标：** 加载所有配置选项并显示

**步骤：**
修改 `client/src/pages/CreateCar.jsx`：

```javascript
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllExteriors } from '../services/ExteriorsAPI'
import { getAllRoofs } from '../services/RoofsAPI'
import { getAllWheels } from '../services/WheelsAPI'
import { getAllInteriors } from '../services/InteriorsAPI'
import '../App.css'

const CreateCar = () => {
    const navigate = useNavigate()
    
    // 配置选项
    const [exteriors, setExteriors] = useState([])
    const [roofs, setRoofs] = useState([])
    const [wheels, setWheels] = useState([])
    const [interiors, setInteriors] = useState([])
    
    // 用户选择
    const [carName, setCarName] = useState('')
    const [selectedExterior, setSelectedExterior] = useState(null)
    const [selectedRoof, setSelectedRoof] = useState(null)
    const [selectedWheels, setSelectedWheels] = useState(null)
    const [selectedInterior, setSelectedInterior] = useState(null)
    
    // UI 状态
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true)
                const [exteriorsData, roofsData, wheelsData, interiorsData] = await Promise.all([
                    getAllExteriors(),
                    getAllRoofs(),
                    getAllWheels(),
                    getAllInteriors()
                ])
                
                setExteriors(exteriorsData)
                setRoofs(roofsData)
                setWheels(wheelsData)
                setInteriors(interiorsData)
                setError(null)
            } catch (err) {
                setError('Failed to load options')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchOptions()
    }, [])
    
    if (loading) return <div className="loading">Loading options...</div>
    if (error) return <div className="error">{error}</div>
    
    return (
        <div className="create-car">
            <h1>Customize Your Car</h1>
            
            <div className="customizer-layout">
                {/* 汽车预览区域 */}
                <div className="car-preview-section">
                    <div 
                        className="car-visual-large"
                        style={{ backgroundColor: selectedExterior?.hex_code || '#ccc' }}
                    >
                        <p>Car Preview</p>
                    </div>
                </div>
                
                {/* 配置选项区域 */}
                <div className="options-section">
                    <h2>Configuration</h2>
                    
                    <div className="option-group">
                        <label>Car Name:</label>
                        <input 
                            type="text"
                            value={carName}
                            onChange={(e) => setCarName(e.target.value)}
                            placeholder="Enter car name"
                        />
                    </div>
                    
                    <div className="option-group">
                        <h3>Exterior Color</h3>
                        <div className="options-grid">
                            {exteriors.map(exterior => (
                                <div
                                    key={exterior.id}
                                    className={`option-card ${selectedExterior?.id === exterior.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedExterior(exterior)}
                                >
                                    <div 
                                        className="color-swatch"
                                        style={{ backgroundColor: exterior.hex_code }}
                                    ></div>
                                    <p>{exterior.color}</p>
                                    <p>${exterior.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <p>Roofs: {roofs.length}, Wheels: {wheels.length}, Interiors: {interiors.length}</p>
                </div>
            </div>
        </div>
    )
}

export default CreateCar
```

**验收标准：**
- ✅ 加载所有配置选项
- ✅ 显示外观颜色选项
- ✅ 可以选择外观颜色
- ✅ 预览区域根据选择变化背景色
- ✅ 显示加载和错误状态

**测试方法：**
1. 访问 `/`
2. 查看是否加载了配置选项
3. 点击外观颜色，查看预览区域是否变化

---

### **Task 26: 完善 CreateCar 页面 - 显示所有选项**
**目标：** 显示所有配置选项（车顶、轮毂、内饰）

**步骤：**
在 `client/src/pages/CreateCar.jsx` 的 options-section 中添加：

```javascript
{/* 在 Exterior Color 选项组后面添加 */}

<div className="option-group">
    <h3>Roof Type</h3>
    <div className="options-grid">
        {roofs.map(roof => (
            <div
                key={roof.id}
                className={`option-card ${selectedRoof?.id === roof.id ? 'selected' : ''}`}
                onClick={() => setSelectedRoof(roof)}
            >
                <p>{roof.type}</p>
                <p>${roof.price}</p>
            </div>
        ))}
    </div>
</div>

<div className="option-group">
    <h3>Wheels</h3>
    <div className="options-grid">
        {wheels.map(wheel => (
            <div
                key={wheel.id}
                className={`option-card ${selectedWheels?.id === wheel.id ? 'selected' : ''}`}
                onClick={() => setSelectedWheels(wheel)}
            >
                <p>{wheel.type}</p>
                <p>${wheel.price}</p>
            </div>
        ))}
    </div>
</div>

<div className="option-group">
    <h3>Interior</h3>
    <div className="options-grid">
        {interiors.map(interior => (
            <div
                key={interior.id}
                className={`option-card ${selectedInterior?.id === interior.id ? 'selected' : ''}`}
                onClick={() => setSelectedInterior(interior)}
            >
                <div 
                    className="color-swatch"
                    style={{ backgroundColor: interior.hex_code }}
                ></div>
                <p>{interior.material}</p>
                <p>{interior.color}</p>
                <p>${interior.price}</p>
            </div>
        ))}
    </div>
</div>
```

**验收标准：**
- ✅ 显示所有 4 种配置选项
- ✅ 每种选项可以选择
- ✅ 选中的选项有视觉反馈（selected 类）
- ✅ 显示每个选项的价格

**测试方法：**
1. 访问 `/`
2. 尝试选择每种配置选项
3. 验证选中状态显示正确

---

### **Task 27: 完善 CreateCar 页面 - 实时价格计算和提交**
**目标：** 实现价格计算和创建汽车功能

**步骤：**
在 `client/src/pages/CreateCar.jsx` 中添加：

```javascript
import { calculateTotalPrice, formatPrice } from '../utilities/calcPrice'
import { validateRequiredFields, validateCombination } from '../utilities/validation'
import { createCar } from '../services/CarsAPI'

// 在组件内添加
const [totalPrice, setTotalPrice] = useState(0)
const [submitting, setSubmitting] = useState(false)
const [validationError, setValidationError] = useState('')

// 添加 useEffect 监听选择变化并计算价格
useEffect(() => {
    if (selectedExterior || selectedRoof || selectedWheels || selectedInterior) {
        const price = calculateTotalPrice(
            selectedExterior,
            selectedRoof,
            selectedWheels,
            selectedInterior
        )
        setTotalPrice(price)
    }
}, [selectedExterior, selectedRoof, selectedWheels, selectedInterior])

// 添加提交处理函数
const handleSubmit = async () => {
    // 清除之前的错误
    setValidationError('')
    
    // 验证必填字段
    const carData = {
        name: carName,
        exterior_id: selectedExterior?.id,
        roof_id: selectedRoof?.id,
        wheels_id: selectedWheels?.id,
        interior_id: selectedInterior?.id
    }
    
    const requiredValidation = validateRequiredFields(carData)
    if (!requiredValidation.valid) {
        setValidationError(requiredValidation.message)
        return
    }
    
    // 验证组合
    const combinationValidation = validateCombination({
        roof_id: selectedRoof.id,
        wheels_id: selectedWheels.id
    })
    if (!combinationValidation.valid) {
        setValidationError(combinationValidation.message)
        return
    }
    
    // 提交创建
    try {
        setSubmitting(true)
        const newCar = await createCar({
            ...carData,
            total_price: parseFloat(totalPrice)
        })
        
        // 跳转到详情页
        navigate(`/customcars/${newCar.id}`)
    } catch (err) {
        setValidationError('Failed to create car: ' + err.message)
    } finally {
        setSubmitting(false)
    }
}

// 在 options-section 末尾添加
{validationError && (
    <div className="error-message">{validationError}</div>
)}

<div className="price-summary">
    <h3>Total Price</h3>
    <p className="total-price">{formatPrice(totalPrice)}</p>
    
    <div className="price-breakdown">
        {selectedExterior && <p>Exterior: ${selectedExterior.price}</p>}
        {selectedRoof && <p>Roof: ${selectedRoof.price}</p>}
        {selectedWheels && <p>Wheels: ${selectedWheels.price}</p>}
        {selectedInterior && <p>Interior: ${selectedInterior.price}</p>}
    </div>
</div>

<button 
    className="btn-create"
    onClick={handleSubmit}
    disabled={submitting}
>
    {submitting ? 'Creating...' : 'Create Car'}
</button>
```

**验收标准：**
- ✅ 选择选项时价格实时更新
- ✅ 显示价格明细
- ✅ 验证必填字段
- ✅ 验证不兼容组合
- ✅ 成功创建后跳转到详情页
- ✅ 显示验证错误消息

**测试方法：**
1. 不填写任何字段，点击创建，应该显示错误
2. 填写所有字段，查看价格是否正确计算
3. 创建汽车，应该成功并跳转

---

### **Task 28: 实现 CarDetails 页面**
**目标：** 显示单个汽车的详细信息

**步骤：**
修改 `client/src/pages/CarDetails.jsx`：

```javascript
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import '../App.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetchCar()
    }, [id])
    
    const fetchCar = async () => {
        try {
            setLoading(true)
            const data = await getCar(id)
            setCar(data)
            setError(null)
        } catch (err) {
            setError('Failed to load car details')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    
    const handleEdit = () => {
        navigate(`/edit/${id}`)
    }
    
    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${car.name}"?`)) {
            try {
                await deleteCar(id)
                navigate('/customcars')
            } catch (err) {
                alert('Failed to delete car')
                console.error(err)
            }
        }
    }
    
    const handleBack = () => {
        navigate('/customcars')
    }
    
    if (loading) return <div className="loading">Loading car details...</div>
    if (error) return <div className="error">{error}</div>
    if (!car) return <div className="error">Car not found</div>
    
    return (
        <div className="car-details">
            <button onClick={handleBack} className="btn-back">← Back to List</button>
            
            <h1>{car.name}</h1>
            
            <div className="details-layout">
                <div className="details-preview">
                    <div 
                        className="car-visual-large"
                        style={{ backgroundColor: car.exterior_hex }}
                    >
                        <div className="car-body-3d">
                            <p>3D Car Preview</p>
                        </div>
                    </div>
                </div>
                
                <div className="details-info">
                    <h2>Specifications</h2>
                    
                    <div className="spec-item">
                        <span className="spec-label">Exterior:</span>
                        <span className="spec-value">
                            <span 
                                className="color-dot"
                                style={{ backgroundColor: car.exterior_hex }}
                            ></span>
                            {car.exterior_color} (${car.exterior_price})
                        </span>
                    </div>
                    
                    <div className="spec-item">
                        <span className="spec-label">Roof:</span>
                        <span className="spec-value">{car.roof_type} (${car.roof_price})</span>
                    </div>
                    
                    <div className="spec-item">
                        <span className="spec-label">Wheels:</span>
                        <span className="spec-value">{car.wheels_type} (${car.wheels_price})</span>
                    </div>
                    
                    <div className="spec-item">
                        <span className="spec-label">Interior:</span>
                        <span className="spec-value">
                            <span 
                                className="color-dot"
                                style={{ backgroundColor: car.interior_hex }}
                            ></span>
                            {car.interior_material} - {car.interior_color} (${car.interior_price})
                        </span>
                    </div>
                    
                    <div className="total-price-display">
                        <h3>Total Price</h3>
                        <p className="price-large">{formatPrice(car.total_price)}</p>
                    </div>
                    
                    <div className="details-actions">
                        <button onClick={handleEdit} className="btn-edit">Edit Configuration</button>
                        <button onClick={handleDelete} className="btn-delete">Delete Car</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails
```

**验收标准：**
- ✅ 根据 URL 参数加载汽车
- ✅ 显示完整的汽车配置信息
- ✅ 显示价格明细
- ✅ 编辑按钮跳转到编辑页面
- ✅ 删除按钮工作正常
- ✅ 返回按钮跳转到列表页

**测试方法：**
1. 从列表页点击汽车卡片
2. 验证显示正确的汽车信息
3. 测试编辑、删除、返回按钮

---

### **Task 29: 实现 EditCar 页面**
**目标：** 实现编辑现有汽车的功能

**步骤：**
修改 `client/src/pages/EditCar.jsx`：

```javascript
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, updateCar } from '../services/CarsAPI'
import { getAllExteriors } from '../services/ExteriorsAPI'
import { getAllRoofs } from '../services/RoofsAPI'
import { getAllWheels } from '../services/WheelsAPI'
import { getAllInteriors } from '../services/InteriorsAPI'
import { calculateTotalPrice, formatPrice } from '../utilities/calcPrice'
import { validateRequiredFields, validateCombination } from '../utilities/validation'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    // 配置选项
    const [exteriors, setExteriors] = useState([])
    const [roofs, setRoofs] = useState([])
    const [wheels, setWheels] = useState([])
    const [interiors, setInteriors] = useState([])
    
    // 用户选择
    const [carName, setCarName] = useState('')
    const [selectedExterior, setSelectedExterior] = useState(null)
    const [selectedRoof, setSelectedRoof] = useState(null)
    const [selectedWheels, setSelectedWheels] = useState(null)
    const [selectedInterior, setSelectedInterior] = useState(null)
    
    // UI 状态
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [validationError, setValidationError] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    
    // 加载汽车数据和选项
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [carData, exteriorsData, roofsData, wheelsData, interiorsData] = await Promise.all([
                    getCar(id),
                    getAllExteriors(),
                    getAllRoofs(),
                    getAllWheels(),
                    getAllInteriors()
                ])
                
                // 设置选项
                setExteriors(exteriorsData)
                setRoofs(roofsData)
                setWheels(wheelsData)
                setInteriors(interiorsData)
                
                // 预填充表单
                setCarName(carData.name)
                setSelectedExterior(exteriorsData.find(e => e.id === carData.exterior_id))
                setSelectedRoof(roofsData.find(r => r.id === carData.roof_id))
                setSelectedWheels(wheelsData.find(w => w.id === carData.wheels_id))
                setSelectedInterior(interiorsData.find(i => i.id === carData.interior_id))
                
                setError(null)
            } catch (err) {
                setError('Failed to load car data')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [id])
    
    // 计算价格
    useEffect(() => {
        if (selectedExterior || selectedRoof || selectedWheels || selectedInterior) {
            const price = calculateTotalPrice(
                selectedExterior,
                selectedRoof,
                selectedWheels,
                selectedInterior
            )
            setTotalPrice(price)
        }
    }, [selectedExterior, selectedRoof, selectedWheels, selectedInterior])
    
    // 提交更新
    const handleSubmit = async () => {
        setValidationError('')
        
        const carData = {
            name: carName,
            exterior_id: selectedExterior?.id,
            roof_id: selectedRoof?.id,
            wheels_id: selectedWheels?.id,
            interior_id: selectedInterior?.id
        }
        
        const requiredValidation = validateRequiredFields(carData)
        if (!requiredValidation.valid) {
            setValidationError(requiredValidation.message)
            return
        }
        
        const combinationValidation = validateCombination({
            roof_id: selectedRoof.id,
            wheels_id: selectedWheels.id
        })
        if (!combinationValidation.valid) {
            setValidationError(combinationValidation.message)
            return
        }
        
        try {
            setSubmitting(true)
            await updateCar(id, {
                ...carData,
                total_price: parseFloat(totalPrice)
            })
            navigate(`/customcars/${id}`)
        } catch (err) {
            setValidationError('Failed to update car: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }
    
    const handleCancel = () => {
        navigate(`/customcars/${id}`)
    }
    
    if (loading) return <div className="loading">Loading...</div>
    if (error) return <div className="error">{error}</div>
    
    return (
        <div className="edit-car">
            <h1>Edit Car Configuration</h1>
            
            <div className="customizer-layout">
                <div className="car-preview-section">
                    <div 
                        className="car-visual-large"
                        style={{ backgroundColor: selectedExterior?.hex_code || '#ccc' }}
                    >
                        <p>Car Preview</p>
                    </div>
                </div>
                
                <div className="options-section">
                    <h2>Update Configuration</h2>
                    
                    <div className="option-group">
                        <label>Car Name:</label>
                        <input 
                            type="text"
                            value={carName}
                            onChange={(e) => setCarName(e.target.value)}
                        />
                    </div>
                    
                    {/* 复制 CreateCar 中的所有选项组 */}
                    {/* Exteriors, Roofs, Wheels, Interiors */}
                    
                    {validationError && (
                        <div className="error-message">{validationError}</div>
                    )}
                    
                    <div className="price-summary">
                        <h3>Total Price</h3>
                        <p className="total-price">{formatPrice(totalPrice)}</p>
                    </div>
                    
                    <div className="form-actions">
                        <button 
                            className="btn-save"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button 
                            className="btn-cancel"
                            onClick={handleCancel}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCar
```

**验收标准：**
- ✅ 加载现有汽车数据
- ✅ 预填充所有字段
- ✅ 可以修改配置
- ✅ 价格实时更新
- ✅ 保存更改并跳转到详情页
- ✅ 取消按钮返回详情页

**测试方法：**
1. 从详情页点击编辑
2. 验证表单预填充正确
3. 修改配置并保存
4. 验证更改已保存

---

## 🎨 阶段 6：基础样式 (Tasks 30-31)

### **Task 30: 添加基础 CSS 样式**
**目标：** 为应用添加基本的可用样式

**步骤：**
修改 `client/src/App.css`，添加以下样式：

```css
/* 全局样式 */
* {
    box-sizing: border-box;
}

.app {
    min-height: 100vh;
}

/* 加载和错误状态 */
.loading, .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
}

.error {
    color: #d32f2f;
}

.error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
}

/* ViewCars 页面 */
.view-cars {
    padding: 2rem;
}

.cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.empty-state {
    text-align: center;
    padding: 3rem;
}

/* CarCard 组件 */
.car-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
}

.car-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.car-preview {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.car-info {
    padding: 1rem;
}

.car-specs p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
}

.car-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1976d2;
    margin: 1rem 0;
}

.car-actions {
    display: flex;
    gap: 0.5rem;
}

.car-actions button {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-edit {
    background-color: #1976d2;
    color: white;
}

.btn-delete {
    background-color: #d32f2f;
    color: white;
}

/* CreateCar / EditCar 页面 */
.create-car, .edit-car {
    padding: 2rem;
}

.customizer-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.car-preview-section {
    position: sticky;
    top: 2rem;
    height: fit-content;
}

.car-visual-large {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
}

.options-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.option-group label,
.option-group h3 {
    margin-bottom: 0.5rem;
}

.option-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
}

.option-card {
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
}

.option-card:hover {
    border-color: #1976d2;
}

.option-card.selected {
    border-color: #1976d2;
    background-color: #e3f2fd;
}

.color-swatch {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto 0.5rem;
    border: 2px solid #ddd;
}

.price-summary {
    background-color: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
}

.total-price {
    font-size: 2rem;
    font-weight: bold;
    color: #1976d2;
}

.price-breakdown {
    margin-top: 1rem;
    font-size: 0.9rem;
}

.btn-create, .btn-save {
    width: 100%;
    padding: 1rem;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
}

.btn-create:hover, .btn-save:hover {
    background-color: #1565c0;
}

.btn-create:disabled, .btn-save:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* CarDetails 页面 */
.car-details {
    padding: 2rem;
}

.btn-back {
    padding: 0.5rem 1rem;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.details-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.spec-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
}

.color-dot {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 0.5rem;
    border: 1px solid #ddd;
    vertical-align: middle;
}

.total-price-display {
    background-color: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;
    text-align: center;
}

.price-large {
    font-size: 2.5rem;
    font-weight: bold;
    color: #1976d2;
}

.details-actions {
    display: flex;
    gap: 1rem;
}

.details-actions button {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .customizer-layout,
    .details-layout {
        grid-template-columns: 1fr;
    }
    
    .cars-grid {
        grid-template-columns: 1fr;
    }
}
```

**验收标准：**
- ✅ 所有页面显示正常
- ✅ 卡片布局工作正常
- ✅ 选项选择有视觉反馈
- ✅ 响应式设计在移动设备上工作
- ✅ 按钮样式一致

**测试方法：**
1. 访问所有页面
2. 检查样式是否正确应用
3. 调整浏览器窗口大小测试响应式

---

### **Task 31: 完善视觉效果 - 汽车预览增强**
**目标：** 改进汽车预览的视觉效果

**步骤：**
在 `client/src/App.css` 添加：

```css
/* 增强的汽车视觉效果 */
.car-visual {
    width: 80%;
    height: 80%;
    position: relative;
}

.car-body {
    width: 100%;
    height: 60%;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 40px 40px 20px 20px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.car-body::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 40%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
}

.car-body-3d {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 动画效果 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.car-card,
.option-card {
    animation: fadeIn 0.3s ease-out;
}
```

在 `CreateCar.jsx` 和 `EditCar.jsx` 的预览区域，将 `<p>Car Preview</p>` 改为：

```javascript
<div className="car-visual">
    <div className="car-body"></div>
</div>
```

**验收标准：**
- ✅ 汽车预览有基本的3D效果
- ✅ 背景色平滑过渡
- ✅ 卡片有淡入动画
- ✅ 整体视觉效果提升

---

## ✅ 阶段 7：最终测试和修复 (Tasks 32-34)

### **Task 32: 端到端测试 - 创建流程**
**目标：** 测试完整的创建汽车流程

**测试步骤：**
1. 启动服务器：`cd server && node server.js`
2. 启动前端：`npm run dev`
3. 访问 `http://localhost:5173/`
4. 填写汽车名称
5. 选择所有配置选项
6. 验证价格计算正确
7. 点击创建
8. 验证跳转到详情页
9. 验证汽车信息显示正确

**验收标准：**
- ✅ 整个流程无错误
- ✅ 价格计算准确
- ✅ 数据保存到数据库
- ✅ 页面跳转正常

---

### **Task 33: 端到端测试 - 查看、编辑、删除流程**
**目标：** 测试查看、编辑和删除功能

**测试步骤：**
1. 访问 `/customcars`
2. 验证显示所有创建的汽车
3. 点击汽车卡片，验证跳转到详情页
4. 在详情页点击编辑
5. 修改配置
6. 保存更改
7. 验证更改已保存
8. 删除汽车
9. 验证汽车被删除并返回列表

**验收标准：**
- ✅ 列表正确显示所有汽车
- ✅ 详情页显示正确
- ✅ 编辑功能工作正常
- ✅ 删除功能工作正常
- ✅ 所有跳转正确

---

### **Task 34: 验证错误处理和边界情况**
**目标：** 测试错误处理和边界情况

**测试场景：**
1. 创建汽车时不填写名称
2. 创建汽车时不选择任何选项
3. 尝试访问不存在的汽车ID
4. 测试不兼容的配置组合
5. 关闭服务器时前端的错误显示
6. 创建名称很长的汽车
7. 快速连续点击创建按钮

**验收标准：**
- ✅ 所有验证错误正确显示
- ✅ 404 错误正确处理
- ✅ 网络错误有友好提示
- ✅ 防止重复提交
- ✅ 边界情况不会导致崩溃

---

## 🎉 完成检查清单

完成所有任务后，验证以下功能：

### 数据库
- [ ] PostgreSQL 数据库连接成功
- [ ] 所有表创建正确
- [ ] 外键关系正确设置
- [ ] 初始数据已填充

### 后端 API
- [ ] GET /api/exteriors 返回所有外观选项
- [ ] GET /api/roofs 返回所有车顶选项
- [ ] GET /api/wheels 返回所有轮毂选项
- [ ] GET /api/interiors 返回所有内饰选项
- [ ] GET /api/cars 返回所有汽车（带关联信息）
- [ ] GET /api/cars/:id 返回单个汽车
- [ ] POST /api/cars 创建新汽车
- [ ] PATCH /api/cars/:id 更新汽车
- [ ] DELETE /api/cars/:id 删除汽车

### 前端功能
- [ ] 导航栏显示并可切换页面
- [ ] CreateCar: 显示所有配置选项
- [ ] CreateCar: 价格实时计算
- [ ] CreateCar: 视觉预览更新
- [ ] CreateCar: 验证功能工作
- [ ] CreateCar: 成功创建汽车
- [ ] ViewCars: 显示汽车列表
- [ ] ViewCars: 删除功能工作
- [ ] CarDetails: 显示完整信息
- [ ] CarDetails: 编辑和删除按钮工作
- [ ] EditCar: 预填充现有数据
- [ ] EditCar: 保存更新

### 用户体验
- [ ] 所有页面样式美观
- [ ] 加载状态显示清晰
- [ ] 错误消息友好
- [ ] 响应式设计工作
- [ ] 动画流