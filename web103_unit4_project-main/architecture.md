I'll help you generate a complete architecture design for your DIY Delight project! Let me first explore the existing starter code to understand what's already in place.

[10 tools called]

Perfect! I've analyzed the starter code. Now let me create a comprehensive architecture design document for your DIY Delight (Bolt Bucket) project.

---

# 🏎️ Bolt Bucket - DIY Delight 项目完整架构设计

## 📁 完整文件与文件夹结构

```
web103_unit4_project-main/
│
├── 📦 package.json                    # 项目依赖和脚本配置
├── 📦 package-lock.json               # 锁定依赖版本
├── 📖 README.md                       # 项目说明文档
├── .gitignore                         # Git忽略文件配置
│
├── 🖥️  server/                        # 后端服务器
│   ├── server.js                      # Express服务器入口
│   ├── .env                          # 环境变量（需创建，包含数据库配置）
│   │
│   ├── 📂 config/                     # 配置文件夹（需创建）
│   │   ├── database.js               # PostgreSQL数据库连接配置
│   │   └── reset.js                  # 数据库表重置脚本
│   │
│   ├── 📂 controllers/                # 控制器文件夹（需创建）
│   │   ├── cars.js                   # 汽车CRUD操作控制器
│   │   ├── exteriors.js              # 外观选项控制器
│   │   ├── roofs.js                  # 车顶选项控制器
│   │   ├── wheels.js                 # 轮毂选项控制器
│   │   └── interiors.js              # 内饰选项控制器
│   │
│   └── 📂 routes/                     # 路由文件夹（需创建）
│       ├── cars.js                   # 汽车相关路由
│       ├── exteriors.js              # 外观选项路由
│       ├── roofs.js                  # 车顶选项路由
│       ├── wheels.js                 # 轮毂选项路由
│       └── interiors.js              # 内饰选项路由
│
└── 🌐 client/                         # 前端应用
    ├── index.html                     # HTML入口文件
    ├── vite.config.js                 # Vite配置文件
    │
    ├── 📂 public/                     # 静态资源
    │   └── lightning.png              # 网站图标
    │
    └── 📂 src/                        # 源代码目录
        ├── main.jsx                   # React应用入口
        ├── App.jsx                    # 主应用组件（路由配置）
        ├── App.css                    # 应用全局样式
        ├── index.css                  # 基础样式
        │
        ├── 📂 assets/                 # 静态资源
        │   ├── background.jpg         # 背景图片
        │   └── circle-arrow-down-solid.svg  # 图标
        │
        ├── 📂 components/             # 可复用组件
        │   ├── Navigation.jsx         # 导航栏组件
        │   └── CarCard.jsx           # 汽车卡片组件（需创建）
        │
        ├── 📂 css/                    # 组件样式文件
        │   ├── Navigation.css         # 导航栏样式
        │   ├── CreateCar.css         # 创建页面样式（需创建）
        │   ├── ViewCars.css          # 列表页面样式（需创建）
        │   └── CarDetails.css        # 详情页面样式（需创建）
        │
        ├── 📂 pages/                  # 页面组件
        │   ├── CreateCar.jsx          # 创建/定制汽车页面
        │   ├── ViewCars.jsx           # 查看所有汽车列表页面
        │   ├── CarDetails.jsx         # 汽车详情页面
        │   └── EditCar.jsx            # 编辑汽车页面
        │
        ├── 📂 services/               # API服务层（需创建）
        │   ├── CarsAPI.js            # 汽车API调用
        │   ├── ExteriorsAPI.js       # 外观选项API调用
        │   ├── RoofsAPI.js           # 车顶选项API调用
        │   ├── WheelsAPI.js          # 轮毂选项API调用
        │   └── InteriorsAPI.js       # 内饰选项API调用
        │
        └── 📂 utilities/              # 工具函数（需创建）
            ├── validation.js          # 验证功能组合是否有效
            └── calcPrice.js           # 计算汽车总价格
```

---

## 🗄️ 数据库架构设计

### 数据库表结构

#### 1. **cars** 表（自定义汽车）
```sql
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    exterior_id INTEGER REFERENCES exteriors(id),
    roof_id INTEGER REFERENCES roofs(id),
    wheels_id INTEGER REFERENCES wheels(id),
    interior_id INTEGER REFERENCES interiors(id),
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. **exteriors** 表（外观选项）
```sql
CREATE TABLE exteriors (
    id SERIAL PRIMARY KEY,
    color VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    hex_code VARCHAR(7) NOT NULL,  -- 例如: #FF0000
    image_url TEXT
);
```

#### 3. **roofs** 表（车顶选项）
```sql
CREATE TABLE roofs (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,  -- 例如: convertible, sunroof, standard
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT
);
```

#### 4. **wheels** 表（轮毂选项）
```sql
CREATE TABLE wheels (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,  -- 例如: sport, luxury, standard
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT
);
```

#### 5. **interiors** 表（内饰选项）
```sql
CREATE TABLE interiors (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,  -- 例如: leather, fabric, premium
    color VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    hex_code VARCHAR(7) NOT NULL
);
```

#### 6. **incompatible_combos** 表（不兼容的组合）
```sql
CREATE TABLE incompatible_combos (
    id SERIAL PRIMARY KEY,
    feature_type_1 VARCHAR(50) NOT NULL,  -- exterior, roof, wheels, interior
    feature_id_1 INTEGER NOT NULL,
    feature_type_2 VARCHAR(50) NOT NULL,
    feature_id_2 INTEGER NOT NULL,
    reason TEXT
);
```

---

## 🔧 各部分详细说明

### **后端 (Server)**

#### **1. server.js** - Express服务器入口
**作用：**
- 启动Express服务器
- 配置中间件（JSON解析、CORS、静态文件）
- 挂载API路由
- 处理生产环境的React构建文件

**关键代码：**
```javascript
import express from 'express'
import carsRouter from './routes/cars.js'
import exteriorsRouter from './routes/exteriors.js'
// ... 其他路由导入

app.use('/api/cars', carsRouter)
app.use('/api/exteriors', exteriorsRouter)
// ... 其他路由挂载
```

---

#### **2. config/database.js** - 数据库连接
**作用：**
- 配置PostgreSQL连接池
- 从环境变量读取数据库凭据
- 导出pool供其他模块使用

**关键代码：**
```javascript
import pg from 'pg'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false }
}

export const pool = new pg.Pool(config)
```

---

#### **3. config/reset.js** - 数据库重置脚本
**作用：**
- 创建所有必需的表
- 插入初始数据（外观、车顶、轮毂、内饰选项）
- 插入不兼容组合数据

**示例代码：**
```javascript
import { pool } from './database.js'

const createTables = async () => {
    // 创建表的SQL语句
    await pool.query(`
        DROP TABLE IF EXISTS cars CASCADE;
        DROP TABLE IF EXISTS exteriors CASCADE;
        -- ... 其他表
        
        CREATE TABLE exteriors (...);
        CREATE TABLE roofs (...);
        -- ... 创建所有表
    `)
}

const seedData = async () => {
    // 插入初始数据
    await pool.query(`
        INSERT INTO exteriors (color, price, hex_code) VALUES
        ('Red', 1000.00, '#FF0000'),
        ('Blue', 1000.00, '#0000FF'),
        ('Black', 1500.00, '#000000')
    `)
    // ... 其他数据
}

createTables()
    .then(seedData)
    .then(() => console.log('Database reset complete'))
```

---

#### **4. controllers/** - 控制器层
**作用：** 处理业务逻辑，与数据库交互

**cars.js 示例：**
```javascript
import { pool } from '../config/database.js'

// 获取所有汽车
export const getCars = async (req, res) => {
    try {
        const results = await pool.query(`
            SELECT c.*, e.color as exterior_color, r.type as roof_type,
                   w.type as wheels_type, i.material as interior_material
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

// 根据ID获取单个汽车
export const getCarById = async (req, res) => {
    const { id } = req.params
    // ... 实现逻辑
}

// 创建新汽车
export const createCar = async (req, res) => {
    const { name, exterior_id, roof_id, wheels_id, interior_id, total_price } = req.body
    // ... 实现逻辑
}

// 更新汽车
export const updateCar = async (req, res) => {
    const { id } = req.params
    // ... 实现逻辑
}

// 删除汽车
export const deleteCar = async (req, res) => {
    const { id } = req.params
    // ... 实现逻辑
}
```

**exteriors.js / roofs.js / wheels.js / interiors.js 类似结构：**
- `getAll<Feature>s()` - 获取所有选项
- `get<Feature>ById()` - 根据ID获取单个选项

---

#### **5. routes/** - 路由层
**作用：** 定义API端点，连接HTTP请求和控制器函数

**cars.js 示例：**
```javascript
import express from 'express'
import { getCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/cars.js'

const router = express.Router()

router.get('/', getCars)              // GET /api/cars
router.get('/:id', getCarById)        // GET /api/cars/:id
router.post('/', createCar)           // POST /api/cars
router.patch('/:id', updateCar)       // PATCH /api/cars/:id
router.delete('/:id', deleteCar)      // DELETE /api/cars/:id

export default router
```

---

### **前端 (Client)**

#### **6. main.jsx** - React入口
**作用：**
- 渲染React应用
- 包裹BrowserRouter进行路由管理

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
```

---

#### **7. App.jsx** - 主应用组件
**作用：**
- 配置应用路由
- 渲染导航栏
- 渲染当前页面组件

**现有路由：**
- `/` - CreateCar（定制页面）
- `/customcars` - ViewCars（列表页面）
- `/customcars/:id` - CarDetails（详情页面）
- `/edit/:id` - EditCar（编辑页面）

---

#### **8. services/** - API服务层
**作用：** 封装所有API调用，前端组件通过这些函数与后端通信

**CarsAPI.js 示例：**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// 获取所有汽车
export const getAllCars = async () => {
    const response = await fetch(`${API_BASE_URL}/api/cars`)
    return await response.json()
}

// 获取单个汽车
export const getCar = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/cars/${id}`)
    return await response.json()
}

// 创建汽车
export const createCar = async (carData) => {
    const response = await fetch(`${API_BASE_URL}/api/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    })
    return await response.json()
}

// 更新汽车
export const updateCar = async (id, carData) => {
    const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    })
    return await response.json()
}

// 删除汽车
export const deleteCar = async (id) => {
    await fetch(`${API_BASE_URL}/api/cars/${id}`, {
        method: 'DELETE'
    })
}
```

**ExteriorsAPI.js / RoofsAPI.js / WheelsAPI.js / InteriorsAPI.js 类似：**
```javascript
export const getAllExteriors = async () => { /* ... */ }
export const getExterior = async (id) => { /* ... */ }
// 其他API类似
```

---

#### **9. utilities/** - 工具函数

**calcPrice.js** - 价格计算
```javascript
// 计算汽车总价
export const calculateTotalPrice = (exterior, roof, wheels, interior) => {
    const exteriorPrice = exterior ? parseFloat(exterior.price) : 0
    const roofPrice = roof ? parseFloat(roof.price) : 0
    const wheelsPrice = wheels ? parseFloat(wheels.price) : 0
    const interiorPrice = interior ? parseFloat(interior.price) : 0
    
    return (exteriorPrice + roofPrice + wheelsPrice + interiorPrice).toFixed(2)
}

// 获取单个选项价格
export const getOptionPrice = (option) => {
    return option ? parseFloat(option.price) : 0
}
```

**validation.js** - 验证功能组合
```javascript
// 验证选项组合是否有效
export const validateCombination = async (selections) => {
    const { exterior_id, roof_id, wheels_id, interior_id } = selections
    
    // 示例：敞篷车顶不能配天窗
    const incompatibleCombos = [
        { roof: 1, wheels: 3, message: '敞篷车顶不能配赛车轮毂' },
        // ... 更多规则
    ]
    
    for (const combo of incompatibleCombos) {
        if (roof_id === combo.roof && wheels_id === combo.wheels) {
            return { valid: false, message: combo.message }
        }
    }
    
    return { valid: true }
}

// 检查必填字段
export const validateRequiredFields = (carData) => {
    const { name, exterior_id, roof_id, wheels_id, interior_id } = carData
    
    if (!name || !exterior_id || !roof_id || !wheels_id || !interior_id) {
        return { valid: false, message: '请填写所有必填字段' }
    }
    
    return { valid: true }
}
```

---

#### **10. pages/** - 页面组件

**CreateCar.jsx** - 创建/定制页面
**状态管理：**
```javascript
const [carName, setCarName] = useState('')
const [selectedExterior, setSelectedExterior] = useState(null)
const [selectedRoof, setSelectedRoof] = useState(null)
const [selectedWheels, setSelectedWheels] = useState(null)
const [selectedInterior, setSelectedInterior] = useState(null)

const [exteriors, setExteriors] = useState([])
const [roofs, setRoofs] = useState([])
const [wheels, setWheels] = useState([])
const [interiors, setInteriors] = useState([])

const [totalPrice, setTotalPrice] = useState(0)
const [errorMessage, setErrorMessage] = useState('')
```

**功能：**
- 加载所有可选配置（useEffect）
- 显示配置选项（外观、车顶、轮毂、内饰）
- 实时更新总价格
- 实时更新汽车视觉效果（颜色、样式）
- 验证并提交创建请求

---

**ViewCars.jsx** - 列表页面
**状态管理：**
```javascript
const [cars, setCars] = useState([])
const [loading, setLoading] = useState(true)
```

**功能：**
- 获取并显示所有已创建的汽车
- 每个汽车卡片显示：名称、配置、价格
- 点击卡片跳转到详情页
- 提供编辑和删除按钮

---

**CarDetails.jsx** - 详情页面
**状态管理：**
```javascript
const [car, setCar] = useState(null)
const [loading, setLoading] = useState(true)
```

**功能：**
- 根据URL参数加载特定汽车
- 显示完整的汽车配置信息
- 提供编辑按钮（跳转到编辑页面）
- 提供删除按钮（删除后返回列表）

---

**EditCar.jsx** - 编辑页面
**状态管理：** 与CreateCar类似

**功能：**
- 加载现有汽车数据
- 预填充表单
- 允许修改配置
- 实时更新价格和视觉效果
- 验证并提交更新请求

---

#### **11. components/** - 可复用组件

**Navigation.jsx** - 导航栏
- 显示应用标题
- 提供页面切换链接

**CarCard.jsx** （需创建）- 汽车卡片
```javascript
const CarCard = ({ car, onEdit, onDelete }) => {
    return (
        <div className="car-card">
            <h3>{car.name}</h3>
            <div className="car-preview" style={{ backgroundColor: car.exterior_color }}>
                {/* 汽车视觉预览 */}
            </div>
            <p>外观: {car.exterior_color}</p>
            <p>车顶: {car.roof_type}</p>
            <p>轮毂: {car.wheels_type}</p>
            <p>内饰: {car.interior_material}</p>
            <p className="price">${car.total_price}</p>
            <div className="actions">
                <button onClick={() => onEdit(car.id)}>编辑</button>
                <button onClick={() => onDelete(car.id)}>删除</button>
            </div>
        </div>
    )
}
```

---

## 🔄 数据流与服务连接

### **1. 创建汽车流程**
```
用户在CreateCar页面选择配置
    ↓
useState更新状态 (selectedExterior, selectedRoof, etc.)
    ↓
useEffect监听状态变化
    ↓
调用calcPrice.calculateTotalPrice()计算价格
    ↓
更新totalPrice状态，页面实时显示
    ↓
用户点击"创建"按钮
    ↓
调用validation.validateCombination()验证
    ↓
验证通过 → 调用CarsAPI.createCar()
    ↓
前端发送POST请求到 /api/cars
    ↓
后端routes/cars.js接收请求
    ↓
调用controllers/cars.createCar()
    ↓
执行SQL INSERT语句插入数据库
    ↓
返回新创建的汽车数据
    ↓
前端跳转到ViewCars页面或CarDetails页面
```

---

### **2. 查看汽车列表流程**
```
用户访问 /customcars
    ↓
ViewCars组件挂载
    ↓
useEffect调用CarsAPI.getAllCars()
    ↓
前端发送GET请求到 /api/cars
    ↓
后端routes/cars.js接收请求
    ↓
调用controllers/cars.getCars()
    ↓
执行SQL SELECT查询（JOIN多个表）
    ↓
返回汽车列表JSON数据
    ↓
前端setState(cars)更新状态
    ↓
渲染CarCard组件显示每辆汽车
```

---

### **3. 编辑汽车流程**
```
用户在ViewCars或CarDetails点击"编辑"
    ↓
跳转到 /edit/:id
    ↓
EditCar组件挂载
    ↓
useEffect调用CarsAPI.getCar(id)加载现有数据
    ↓
预填充表单
    ↓
用户修改配置
    ↓
useState更新状态
    ↓
用户点击"保存"
    ↓
验证 → 调用CarsAPI.updateCar(id, data)
    ↓
前端发送PATCH请求到 /api/cars/:id
    ↓
后端执行SQL UPDATE语句
    ↓
返回更新后的数据
    ↓
前端跳转到详情页
```

---

### **4. 删除汽车流程**
```
用户在ViewCars或CarDetails点击"删除"
    ↓
显示确认对话框
    ↓
用户确认 → 调用CarsAPI.deleteCar(id)
    ↓
前端发送DELETE请求到 /api/cars/:id
    ↓
后端执行SQL DELETE语句
    ↓
返回成功状态
    ↓
前端从列表中移除该汽车或跳转到列表页
```

---

## 📊 状态管理位置

### **组件级状态（useState）**

| 组件 | 状态 | 用途 |
|------|------|------|
| **CreateCar** | `carName, selectedExterior, selectedRoof, selectedWheels, selectedInterior` | 用户当前选择的配置 |
| | `exteriors, roofs, wheels, interiors` | 可选配置选项 |
| | `totalPrice` | 实时计算的总价 |
| | `errorMessage` | 验证错误信息 |
| **ViewCars** | `cars` | 所有汽车列表 |
| | `loading` | 加载状态 |
| **CarDetails** | `car` | 单个汽车详细信息 |
| | `loading` | 加载状态 |
| **EditCar** | 与CreateCar相同 | 编辑时的配置状态 |

### **服务器状态（PostgreSQL数据库）**
- 所有持久化数据存储在数据库
- 包括：汽车、外观、车顶、轮毂、内饰选项
- 通过API获取和修改

### **无需全局状态管理**
由于应用规模较小，不需要Redux或Context API。每个页面独立管理自己的状态。

---

## 🌐 API端点总览

### **汽车相关**
| 方法 | 端点 | 功能 | 请求体 |
|------|------|------|--------|
| GET | `/api/cars` | 获取所有汽车 | - |
| GET | `/api/cars/:id` | 获取单个汽车 | - |
| POST | `/api/cars` | 创建新汽车 | `{ name, exterior_id, roof_id, wheels_id, interior_id, total_price }` |
| PATCH | `/api/cars/:id` | 更新汽车 | `{ name?, exterior_id?, roof_id?, wheels_id?, interior_id?, total_price? }` |
| DELETE | `/api/cars/:id` | 删除汽车 | - |

### **配置选项相关**
| 方法 | 端点 | 功能 |
|------|------|------|
| GET | `/api/exteriors` | 获取所有外观选项 |
| GET | `/api/exteriors/:id` | 获取单个外观选项 |
| GET | `/api/roofs` | 获取所有车顶选项 |
| GET | `/api/roofs/:id` | 获取单个车顶选项 |
| GET | `/api/wheels` | 获取所有轮毂选项 |
| GET | `/api/wheels/:id` | 获取单个轮毂选项 |
| GET | `/api/interiors` | 获取所有内饰选项 |
| GET | `/api/interiors/:id` | 获取单个内饰选项 |

---

## 🎨 UI/UX设计要点

### **CreateCar页面布局**
```
┌─────────────────────────────────────────┐
│  Navigation Bar                          │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │              │  │ 配置面板         │ │
│  │  汽车视觉    │  │                  │ │
│  │  预览区域    │  │ 名称: [_______] │ │
│  │  (动态变化)  │  │                  │ │
│  │              │  │ 外观: ⚪⚫🔴🔵   │ │
│  │              │  │ 车顶: ☐☐☐      │ │
│  │              │  │ 轮毂: ☐☐☐      │ │
│  │              │  │ 内饰: ☐☐☐      │ │
│  │              │  │                  │ │
│  └──────────────┘  │ 总价: $X,XXX    │ │
│                    │                  │ │
│                    │ [创建汽车]       │ │
│                    └─────────────────┘ │
└─────────────────────────────────────────┘
```

### **ViewCars页面布局**
```
┌─────────────────────────────────────────┐
│  Navigation Bar                          │
├─────────────────────────────────────────┤
│  我的定制汽车                            │
│                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │ Car 1  │  │ Car 2  │  │ Car 3  │    │
│  │ [图片] │  │ [图片] │  │ [图片] │    │
│  │ $X,XXX │  │ $X,XXX │  │ $X,XXX │    │
│  │[编辑]  │  │[编辑]  │  │[编辑]  │    │
│  │[删除]  │  │[删除]  │  │[删除]  │    │
│  └────────┘  └────────┘  └────────┘    │
└─────────────────────────────────────────┘
```

---

## 🚀 实现步骤建议

### **第1阶段：数据库设置**
1. ✅ 创建Render PostgreSQL数据库
2. ✅ 创建`server/config/database.js`
3. ✅ 创建`server/.env`并配置
4. ✅ 创建`server/config/reset.js`并运行
5. ✅ 验证表和数据创建成功

### **第2阶段：后端API**
6. ✅ 创建所有controllers
7. ✅ 创建所有routes
8. ✅ 在`server.js`中导入并挂载路由
9. ✅ 使用Postman/Insomnia测试API

### **第3阶段：前端服务层**
10. ✅ 创建`client/src/services/`文件夹
11. ✅ 实现所有API调用函数
12. ✅ 创建`client/src/utilities/`工具函数

### **第4阶段：前端页面**
13. ✅ 实现`CreateCar.jsx`
14. ✅ 实现`ViewCars.jsx`
15. ✅ 实现`CarDetails.jsx`
16. ✅ 实现`EditCar.jsx`
17. ✅ 创建`CarCard.jsx`组件

### **第5阶段：样式和优化**
18. ✅ 添加CSS样式
19. ✅ 实现汽车视觉预览动态变化
20. ✅ 添加加载状态和错误处理
21. ✅ 测试所有功能

---

## ⚠️ 关键注意事项

### **错误处理**
- 所有API调用使用try-catch
- 显示用户友好的错误信息
- 验证不兼容的配置组合

### **性能优化**
- 使用连接查询（JOIN）减少数据库查询次数
- 前端缓存配置选项数据
- 使用防抖（debounce）优化实时价格计算

### **数据验证**
- 前端验证：即时反馈
- 后端验证：安全保障
- 数据库约束：数据完整性

---

## 📝 环境变量配置

### **server/.env**
```env
# PostgreSQL数据库配置（从Render获取）
PGUSER="your_username"
PGPASSWORD="your_password"
PGHOST="hostname.oregon-postgres.render.com"
PGPORT=5432
PGDATABASE="your_database_name"

# 服务器配置
PORT=3000
NODE_ENV=development
```

### **client/.env** (可选)
```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## 🎯 功能检查清单

- [ ] ✅ 使用React显示API数据
- [ ] ✅ 连接PostgreSQL数据库
- [ ] ✅ 查看多个可定制功能
- [ ] ✅ 每个功能有多个选项
- [ ] ✅ 选择选项时更新视觉图标
- [ ] ✅ 价格动态变化
- [ ] ✅ 视觉界面响应定制功能
- [ ] ✅ 提交选择保存到数据库
- [ ] ✅ 不兼容组合显示错误信息
- [ ] ✅ 查看所有已创建汽车列表
- [ ] ✅ 从列表编辑汽车
- [ ] ✅ 从列表删除汽车
- [ ] ✅ 从详情页更新/删除汽车

---

这就是完整的架构设计！按照这个结构实现，你将拥有一个功能完整、结构清晰的汽车定制应用。如果有任何问题，随时问我！🚗💨