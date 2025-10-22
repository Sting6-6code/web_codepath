#!/bin/bash

echo "🧪 测试汽车定制应用 API"
echo "=========================="

echo "1. 测试获取配置选项..."
echo "外观颜色:"
curl -s http://localhost:3000/api/exteriors | head -3
echo ""

echo "车顶类型:"
curl -s http://localhost:3000/api/roofs | head -3
echo ""

echo "轮毂类型:"
curl -s http://localhost:3000/api/wheels | head -3
echo ""

echo "内饰选项:"
curl -s http://localhost:3000/api/interiors | head -3
echo ""

echo "2. 测试获取汽车列表..."
curl -s http://localhost:3000/api/cars
echo ""

echo "3. 测试创建汽车..."
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Car",
    "exterior_id": 1,
    "roof_id": 1,
    "wheels_id": 1,
    "interior_id": 1,
    "total_price": 1000
  }'
echo ""

echo "✅ 测试完成！"
