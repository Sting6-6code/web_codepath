# 🚀 全栈开发八股知识必背

## 📚 目录

- [前端基础](#前端基础)
- [React 核心概念](#react-核心概念)
- [JavaScript ES6+](#javascript-es6)
- [HTTP 协议](#http-协议)
- [后端基础](#后端基础)
- [Node.js & Express](#nodejs--express)
- [数据库](#数据库)
- [API 设计](#api-设计)
- [状态管理](#状态管理)
- [性能优化](#性能优化)
- [安全知识](#安全知识)
- [部署运维](#部署运维)
- [常见面试题](#常见面试题)

---

## 🌐 前端基础

### HTML5 新特性

```html
<!-- 语义化标签 -->
<header>
  ,
  <nav>
    ,
    <main>
      ,
      <section>
        ,
        <article>
          ,
          <aside>
            ,
            <footer>
              <!-- 表单增强 -->
              <input type="email" required />
              <input type="date" min="2023-01-01" />
              <input type="range" min="0" max="100" />

              <!-- 多媒体 -->
              <video controls>
                <audio controls>
                  <canvas id="myCanvas"></canvas>
                </audio>
              </video>
            </footer>
          </aside>
        </article>
      </section>
    </main>
  </nav>
</header>
```

### CSS3 核心概念

```css
/* Flexbox 布局 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Grid 布局 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 动画 */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.element {
  animation: slideIn 0.5s ease-in-out;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

### DOM 操作

```javascript
// 选择元素
document.getElementById("id");
document.querySelector(".class");
document.querySelectorAll("div");

// 事件处理
element.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// 创建元素
const div = document.createElement("div");
div.textContent = "Hello World";
parent.appendChild(div);
```

---

## ⚛️ React 核心概念

### 组件生命周期

```javascript
// 函数组件 (Hooks)
import { useState, useEffect } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 组件挂载时执行
    console.log("Component mounted");

    return () => {
      // 组件卸载时执行清理
      console.log("Component unmounted");
    };
  }, []); // 空依赖数组 = componentDidMount

  useEffect(() => {
    // count 变化时执行
    console.log("Count changed:", count);
  }, [count]); // componentDidUpdate

  return <div>{count}</div>;
}
```

### Hooks 详解

```javascript
// useState - 状态管理
const [state, setState] = useState(initialValue);
const [user, setUser] = useState({ name: "", email: "" });

// useEffect - 副作用处理
useEffect(() => {
  fetchData();
}, [dependency]); // 依赖变化时重新执行

// useContext - 上下文
const ThemeContext = createContext();
const theme = useContext(ThemeContext);

// useReducer - 复杂状态管理
const [state, dispatch] = useReducer(reducer, initialState);

// useMemo - 性能优化
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// useCallback - 函数缓存
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 组件通信

```javascript
// Props 传递
function Parent() {
  const [data, setData] = useState("Hello");
  return <Child data={data} onUpdate={setData} />;
}

function Child({ data, onUpdate }) {
  return <button onClick={() => onUpdate("Updated")}>{data}</button>;
}

// Context API
const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value={{ user: "John" }}>
      <UserProfile />
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);
  return <div>{user}</div>;
}
```

---

## 📜 JavaScript ES6+

### 变量声明

```javascript
// let/const vs var
let blockScoped = "block scope";
const constant = "cannot reassign";
var functionScoped = "function scope";

// 解构赋值
const { name, age } = person;
const [first, second] = array;
const { data: userData } = response;

// 模板字符串
const message = `Hello ${name}, you are ${age} years old`;
```

### 函数

```javascript
// 箭头函数
const add = (a, b) => a + b;
const square = (x) => x * x;

// 默认参数
function greet(name = "World") {
  return `Hello ${name}`;
}

// 剩余参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// 展开运算符
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProp: value };
```

### 异步处理

```javascript
// Promise
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// async/await
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Promise.all
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments(),
]);
```

### 数组方法

```javascript
// 常用数组方法
const numbers = [1, 2, 3, 4, 5];

// map - 转换
const doubled = numbers.map((n) => n * 2);

// filter - 过滤
const evens = numbers.filter((n) => n % 2 === 0);

// reduce - 归约
const sum = numbers.reduce((total, n) => total + n, 0);

// find - 查找
const found = numbers.find((n) => n > 3);

// some/every - 条件检查
const hasEven = numbers.some((n) => n % 2 === 0);
const allPositive = numbers.every((n) => n > 0);
```

---

## 🌍 HTTP 协议

### HTTP 方法

```javascript
// GET - 获取资源
fetch("/api/users");

// POST - 创建资源
fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John" }),
});

// PUT - 更新整个资源
fetch("/api/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John", email: "john@example.com" }),
});

// PATCH - 部分更新
fetch("/api/users/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John" }),
});

// DELETE - 删除资源
fetch("/api/users/1", { method: "DELETE" });
```

### HTTP 状态码

```javascript
// 2xx 成功
200 OK - 请求成功
201 Created - 创建成功
204 No Content - 成功但无内容

// 3xx 重定向
301 Moved Permanently - 永久重定向
302 Found - 临时重定向
304 Not Modified - 未修改

// 4xx 客户端错误
400 Bad Request - 请求错误
401 Unauthorized - 未授权
403 Forbidden - 禁止访问
404 Not Found - 未找到
422 Unprocessable Entity - 验证失败

// 5xx 服务器错误
500 Internal Server Error - 服务器内部错误
502 Bad Gateway - 网关错误
503 Service Unavailable - 服务不可用
```

### 请求头

```javascript
// 常用请求头
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token',
  'Accept': 'application/json',
  'User-Agent': 'MyApp/1.0',
  'Cache-Control': 'no-cache'
}

// CORS 相关
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
'Access-Control-Allow-Headers': 'Content-Type, Authorization'
```

---

## 🖥️ 后端基础

### RESTful API 设计

```javascript
// 资源命名
GET / api / users; // 获取用户列表
GET / api / users / 1; // 获取特定用户
POST / api / users; // 创建用户
PUT / api / users / 1; // 更新用户
PATCH / api / users / 1; // 部分更新用户
DELETE / api / users / 1; // 删除用户

// 嵌套资源
GET / api / users / 1 / posts; // 获取用户的文章
POST / api / users / 1 / posts; // 为用户创建文章
```

### 中间件概念

```javascript
// Express 中间件
app.use(express.json()); // 解析 JSON
app.use(express.urlencoded({ extended: true })); // 解析表单数据
app.use(cors()); // CORS 处理
app.use(helmet()); // 安全头

// 自定义中间件
function logger(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
}

app.use(logger);
```

---

## 🟢 Node.js & Express

### Express 基础

```javascript
const express = require("express");
const app = express();

// 路由定义
app.get("/api/users", (req, res) => {
  res.json({ users: [] });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  // 创建用户逻辑
  res.status(201).json({ id: 1, name, email });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### 数据库连接

```javascript
// PostgreSQL with pg
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false },
});

// 查询示例
const getUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};
```

---

## 🗄️ 数据库

### SQL 基础

```sql
-- 创建表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入数据
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');

-- 查询数据
SELECT * FROM users WHERE email = 'john@example.com';
SELECT name, email FROM users ORDER BY created_at DESC LIMIT 10;

-- 更新数据
UPDATE users SET name = 'John Doe' WHERE id = 1;

-- 删除数据
DELETE FROM users WHERE id = 1;

-- 连接查询
SELECT u.name, p.title
FROM users u
JOIN posts p ON u.id = p.user_id;
```

### 数据库设计原则

```sql
-- 1. 主键设计
id SERIAL PRIMARY KEY

-- 2. 外键约束
user_id INTEGER REFERENCES users(id)

-- 3. 索引优化
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_post_user_id ON posts(user_id);

-- 4. 数据类型选择
VARCHAR(255) -- 变长字符串
TEXT -- 长文本
INTEGER -- 整数
DECIMAL(10,2) -- 精确小数
TIMESTAMP -- 时间戳
BOOLEAN -- 布尔值
```

---

## 🔌 API 设计

### 响应格式

```javascript
// 成功响应
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John",
    "email": "john@example.com"
  },
  "message": "User created successfully"
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "value": ""
    }
  }
}

// 分页响应
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### 错误处理

```javascript
// 统一错误处理
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// 使用示例
const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    const user = await User.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
```

---

## 📊 状态管理

### React Context

```javascript
// 创建 Context
const UserContext = createContext();

// Provider 组件
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await authAPI.login(credentials);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 使用 Hook
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
```

### Redux 基础

```javascript
// Action Types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

// Action Creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: Date.now() },
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

// Reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

// Store
const store = createStore(todosReducer);
```

---

## ⚡ 性能优化

### React 性能优化

```javascript
// 1. React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>;
});

// 2. useMemo
const ExpensiveComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
};

// 3. useCallback
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <Child onClick={handleClick} />;
};

// 4. 懒加载
const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 网络优化

```javascript
// 1. 防抖 (Debounce)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 2. 节流 (Throttle)
function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  );
}

// 3. 缓存
const cache = new Map();

function fetchWithCache(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cache.set(url, data);
      return data;
    });
}
```

---

## 🔒 安全知识

### 前端安全

```javascript
// 1. XSS 防护
const sanitizeHTML = (str) => {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
};

// 2. CSRF 防护
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
fetch("/api/data", {
  headers: {
    "X-CSRF-Token": csrfToken,
  },
});

// 3. 输入验证
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### 后端安全

```javascript
// 1. 密码哈希
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// 2. JWT 认证
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// 3. 输入验证
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
```

---

## 🚀 部署运维

### 环境变量

```bash
# .env 文件
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-secret-key
API_KEY=your-api-key
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### CI/CD 流程

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy
        run: |
          # 部署脚本
          echo "Deploying to production..."
```

---

## 💡 常见面试题

### JavaScript 基础

```javascript
// 1. 闭包
function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// 2. 原型链
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello, I'm ${this.name}`;
};

const person = new Person("John");
console.log(person.sayHello()); // Hello, I'm John

// 3. this 绑定
const obj = {
  name: "John",
  greet: function () {
    console.log(this.name);
  },
  greetArrow: () => {
    console.log(this.name); // undefined (箭头函数不绑定 this)
  },
};

obj.greet(); // John
obj.greetArrow(); // undefined
```

### React 面试题

```javascript
// 1. 组件重新渲染的原因
// - state 变化
// - props 变化
// - 父组件重新渲染
// - context 值变化

// 2. useEffect 依赖数组
useEffect(() => {
  // 每次渲染都执行
});

useEffect(() => {
  // 只在挂载时执行
}, []);

useEffect(() => {
  // 当 count 变化时执行
}, [count]);

// 3. 受控组件 vs 非受控组件
// 受控组件
function ControlledInput() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

// 非受控组件
function UncontrolledInput() {
  const inputRef = useRef();
  return <input ref={inputRef} />;
}
```

### 算法题

```javascript
// 1. 两数之和
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// 2. 反转链表
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// 3. 合并两个有序数组
function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}
```

### 系统设计

```javascript
// 1. 短链接系统
// - 生成短码: base62 编码
// - 存储映射: Redis + 数据库
// - 重定向: 301/302 状态码

// 2. 聊天系统
// - WebSocket 实时通信
// - 消息队列: Redis Pub/Sub
// - 离线消息: 数据库存储

// 3. 缓存策略
// - Cache-Aside: 先查缓存，未命中查数据库
// - Write-Through: 同时写缓存和数据库
// - Write-Behind: 先写缓存，异步写数据库
```

---

## 📝 总结

### 学习路径

1. **基础阶段**: HTML/CSS/JavaScript
2. **框架阶段**: React/Vue/Angular
3. **后端阶段**: Node.js/Python/Java
4. **数据库阶段**: SQL/NoSQL
5. **进阶阶段**: 性能优化/安全/部署

### 实践建议

- 多做项目，理论结合实践
- 阅读源码，理解底层原理
- 参与开源项目，提升代码质量
- 写技术博客，总结学习心得
- 关注技术趋势，持续学习

### 面试准备

- 准备项目经历，能详细讲解
- 熟悉常见算法，多刷 LeetCode
- 了解系统设计，掌握设计模式
- 准备技术问题，能深入讨论
- 练习表达能力，清晰阐述思路

---

**记住：技术是工具，解决问题才是目的！** 🎯
