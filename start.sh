#!/bin/bash

# Team VioLencE - Quick Start Script
# This script starts both backend and frontend servers

echo "🎮 Starting Team VioLencE..."
echo ""

# Kill any existing processes on ports 5000 and 3000
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*teamviolence" 2>/dev/null || true
fuser -k 5000/tcp 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
sleep 2

# Start backend
echo "🚀 Starting Backend Server (port 5000)..."
cd /workspaces/teamviolence/server
nohup node index.js > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
sleep 3

# Check if backend started successfully
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend server started successfully"
else
    echo "❌ Backend server failed to start. Check /tmp/backend.log"
    exit 1
fi

# Start frontend
echo "🎨 Starting Frontend Server (port 3000)..."
cd /workspaces/teamviolence/client
nohup npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 4

# Check if frontend started successfully
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/teamviolence/ | grep -q "200"; then
    echo "✅ Frontend server started successfully"
else
    echo "❌ Frontend server failed to start. Check /tmp/frontend.log"
    exit 1
fi

echo ""
echo "========================================="
echo "✅ Team VioLencE is RUNNING!"
echo "========================================="
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:3000/teamviolence/"
echo "   Backend:  http://localhost:5000"
echo "   Health:   http://localhost:5000/api/health"
echo ""
echo "👤 Test Login Credentials:"
echo "   Email:    user@test.com"
echo "   Password: user123"
echo ""
echo "   Admin:    admin@teamviolence.com"
echo "   Password: admin123"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f /tmp/backend.log"
echo "   Frontend: tail -f /tmp/frontend.log"
echo ""
echo "🛑 To stop servers:"
echo "   pkill -f 'node.*teamviolence'"
echo ""
