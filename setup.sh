#!/bin/bash

echo "🎮 Team VioLencE Website - Setup Script"
echo "======================================="
echo ""

# Colors
RED='\033[0;31m'

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v18 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"
echo ""

# Check npm
echo -e "${YELLOW}Checking npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v) found${NC}"
echo ""

# Install root dependencies
echo -e "${YELLOW}📦 Installing root dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Root dependencies installed${NC}"
echo ""

# Install client dependencies
echo -e "${YELLOW}📦 Installing client dependencies...${NC}"
cd client
npm install
echo -e "${GREEN}✅ Client dependencies installed${NC}"
cd ..
echo ""

# Install server dependencies
echo -e "${YELLOW}📦 Installing server dependencies...${NC}"
cd server
npm install
echo -e "${GREEN}✅ Server dependencies installed${NC}"
cd ..
echo ""

# Create upload directories
echo -e "${YELLOW}📁 Creating upload directories...${NC}"
mkdir -p server/uploads/team
echo -e "${GREEN}✅ Upload directories created${NC}"
echo ""

# Check for .env files
echo -e "${YELLOW}🔍 Checking environment files...${NC}"

if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}⚠️  server/.env not found. Creating from example...${NC}"
    cp server/.env.example server/.env
    echo -e "${YELLOW}📝 Please edit server/.env and add your credentials${NC}"
else
    echo -e "${GREEN}✅ server/.env exists${NC}"
fi

if [ ! -f "client/.env" ]; then
    echo -e "${YELLOW}⚠️  client/.env not found. Creating...${NC}"
    echo "VITE_RAZORPAY_KEY_ID=your_razorpay_key_here" > client/.env
    echo -e "${YELLOW}📝 Please edit client/.env and add your Razorpay key${NC}"
else
    echo -e "${GREEN}✅ client/.env exists${NC}"
fi
echo ""

# Final message
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo ""
echo "1. Setup MongoDB:"
echo "   - Local: Make sure MongoDB is running"
echo "   - Atlas: Get connection string from https://mongodb.com/atlas"
echo ""
echo "2. Edit environment files:"
echo "   - server/.env (MongoDB URI, JWT Secret, Razorpay keys)"
echo "   - client/.env (Razorpay key)"
echo ""
echo "3. Start development servers:"
echo "   npm run dev"
echo ""
echo "4. Open in browser:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo ""
echo -e "${GREEN}📖 For detailed instructions, see DOCUMENTATION.md${NC}"
echo ""
echo -e "${GREEN}Good luck! 🎮🔥${NC}"
