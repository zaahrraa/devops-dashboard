#!/bin/bash

# start-app.sh - Start port-forward and open browser

echo "🚀 Starting app..."
echo ""

# Kill any existing port-forward on port 3000
echo "🔄 Checking for existing port-forward..."
pkill -f "kubectl port-forward.*3000:80" 2>/dev/null || echo "✅ No existing port-forward found"
echo ""

# Start port-forward in background
echo "🔌 Starting port-forward..."
kubectl port-forward service/dashboard-service 3000:80 &
PORT_FORWARD_PID=$!
echo -e "${GREEN}✅ Port-forward started (PID: $PORT_FORWARD_PID)${NC}"
echo ""

# Wait a moment for it to start
sleep 2

# Open browser
echo "🌐 Opening browser..."
start http://localhost:3000

echo ""
echo -e "${GREEN}✅ App is running at: http://localhost:3000${NC}"
echo ""
echo "📋 To stop the app, run:"
echo "   kill $PORT_FORWARD_PID"
echo "   OR press Ctrl+C if running in foreground"
echo ""