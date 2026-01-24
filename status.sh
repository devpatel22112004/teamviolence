#!/bin/bash

# Team VioLencE - Status Check Script
# This script checks if servers are running properly

echo "=== Team VioLencE Status Check ==="
echo ""

# Check backend
echo "🔍 Backend (http://localhost:5000):"
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is RUNNING"
    curl -s http://localhost:5000/api/health | python3 -m json.tool
else
    echo "❌ Backend is NOT running"
    echo "   Start with: cd server && node index.js"
fi

echo ""

# Check frontend
echo "🔍 Frontend (http://localhost:3000/teamviolence):"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/teamviolence/ 2>/dev/null)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Frontend is RUNNING"
    echo "   HTTP Status: $HTTP_CODE"
else
    echo "❌ Frontend is NOT running or returned error"
    echo "   HTTP Status: $HTTP_CODE"
    echo "   Start with: cd client && npm run dev"
fi

echo ""

# Check MongoDB
echo "🔍 MongoDB:"
if ps aux | grep -v grep | grep -q mongod; then
    echo "✅ MongoDB is RUNNING"
else
    echo "❌ MongoDB is NOT running"
fi

echo ""
echo "======================================="

# Show running processes
BACKEND_PROC=$(ps aux | grep -E "node.*server.*index\.js" | grep -v grep | wc -l)
FRONTEND_PROC=$(ps aux | grep -E "vite.*teamviolence" | grep -v grep | wc -l)

if [ $BACKEND_PROC -gt 0 ] && [ $FRONTEND_PROC -gt 0 ]; then
    echo "✅ Status: ALL SYSTEMS OPERATIONAL"
    echo ""
    echo "🌐 Access Your App:"
    echo "   👉 http://localhost:3000/teamviolence/"
    echo ""
    echo "👤 Test Credentials:"
    echo "   User:  user@test.com / user123"
    echo "   Admin: admin@teamviolence.com / admin123"
else
    echo "⚠️  Status: SOME SYSTEMS DOWN"
    echo ""
    echo "To start servers, run:"
    echo "   ./start.sh"
fi

echo ""
