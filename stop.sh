#!/bin/bash

# Team VioLencE - Stop Script
# This script stops all running servers

echo "🛑 Stopping Team VioLencE servers..."
echo ""

# Kill all teamviolence processes
pkill -f "node.*teamviolence" 2>/dev/null && echo "✅ Stopped all Node processes"

# Kill processes on specific ports
fuser -k 5000/tcp 2>/dev/null && echo "✅ Freed port 5000"
fuser -k 3000/tcp 2>/dev/null && echo "✅ Freed port 3000"

sleep 1

# Verify
if ! netstat -tulpn 2>/dev/null | grep -qE "5000|3000"; then
    echo ""
    echo "✅ All servers stopped successfully"
else
    echo ""
    echo "⚠️  Some processes may still be running"
    echo "    Check: netstat -tulpn | grep -E '5000|3000'"
fi

echo ""
