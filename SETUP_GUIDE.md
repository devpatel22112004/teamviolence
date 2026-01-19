# 🎮 Complete Setup & Usage Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the App](#running-the-app)
5. [Testing](#testing)
6. [Customization](#customization)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, make sure you have:

### Required Software
- **Node.js** v18+ ([Download](https://nodejs.org))
- **npm** or **yarn** package manager
- **MongoDB** (Local or Atlas account)
- **Git** for version control

### Required Accounts (Free)
- **MongoDB Atlas** - [Sign up](https://mongodb.com/atlas)
- **Razorpay** - [Sign up](https://razorpay.com) (for payments)
- **GitHub** account (for deployment)

### Check Your Setup
```bash
node --version    # Should be v18 or higher
npm --version     # Should be v9 or higher
git --version     # Any recent version
```

---

## Installation

### Step 1: Get the Code
```bash
cd /workspaces/teamviolence
```

### Step 2: Run Setup Script
```bash
./setup.sh
```

This will:
- Install all dependencies (root, client, server)
- Create upload directories
- Generate .env template files

### Step 3: Verify Installation
```bash
# Check if node_modules exists in all directories
ls node_modules        # Root
ls client/node_modules # Client
ls server/node_modules # Server
```

---

## Configuration

### A. MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended)

1. **Create Account**
   - Go to https://mongodb.com/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region (Mumbai for India)
   - Click "Create"

3. **Setup Security**
   - **Database Access**: Create username & password
   - **Network Access**: Add IP (0.0.0.0/0 for all)

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://user:pass123@cluster.mongodb.net/teamviolence`

#### Option 2: Local MongoDB
```bash
# Install MongoDB on Ubuntu
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Connection string
mongodb://localhost:27017/teamviolence
```

### B. Razorpay Setup

1. **Create Account**
   - Go to https://razorpay.com
   - Sign up for free

2. **Get API Keys**
   - Go to Dashboard → Settings → API Keys
   - Generate Test Keys (for development)
   - Copy Key ID and Secret

### C. Environment Variables

#### Server Configuration
Edit `server/.env`:
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teamviolence

# JWT Secret (Generate random string)
JWT_SECRET=abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx

# Razorpay (Test Keys)
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=abcdefghijklmnop1234567890

# Server
PORT=5000
NODE_ENV=development
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Client Configuration
Edit `client/.env`:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
```

---

## Running the App

### Development Mode

#### Option 1: Run Both Together
```bash
# From root directory
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Production Build
```bash
# Build frontend
cd client
npm run build

# Start backend in production
cd ../server
NODE_ENV=production npm start
```

---

## Testing

### 1. Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"Team VioLencE API is running"}
```

### 2. Seed Test Data
```bash
cd server
npm run seed
```

This creates:
- Admin account: `admin@teamviolence.com` / `admin123`
- Test user: `user@test.com` / `user123`
- Sample tournaments
- Sample team members

### 3. Test Frontend
1. Open http://localhost:3000
2. Check all pages load
3. Test login with seeded accounts
4. Browse tournaments
5. Check team page

### 4. Test Payment (Test Mode)
1. Register for a paid tournament
2. Use Razorpay test card: `4111 1111 1111 1111`
3. CVV: Any 3 digits
4. Expiry: Any future date
5. Verify registration in dashboard

### 5. Test Responsive Design
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on different screen sizes

---

## Customization

### Update Team Name
1. Edit `client/src/components/Navbar.jsx`:
```jsx
Team VioLencE → Your Team Name
```

2. Edit `client/src/components/Footer.jsx`
3. Edit `client/index.html` (title)

### Change Theme Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#ef4444',  // Change to your color
    600: '#dc2626',
    700: '#b91c1c',
  }
}
```

Popular color codes:
- Red: #ef4444 (current)
- Blue: #3b82f6
- Purple: #a855f7
- Green: #22c55e
- Orange: #f97316

### Add Your Logo
1. Add logo image to `client/public/`
2. Update `client/src/components/Navbar.jsx`:
```jsx
<img src="/logo.png" alt="Logo" className="h-10" />
```

### Add Team Members
Two ways:

**Method 1: Via Seed Script**
Edit `server/seed.js` and run `npm run seed`

**Method 2: Via API** (requires admin login)
```bash
curl -X POST http://localhost:5000/api/team \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Player Name",
    "role": "Assaulter",
    "kills": 5000,
    "winRate": 75,
    "description": "Player bio",
    "socials": {
      "instagram": "https://instagram.com/player"
    }
  }'
```

### Add Tournaments
Same process as team members - use seed script or API.

### Customize Pages
- **Home**: Edit `client/src/pages/Home.jsx`
- **About**: Edit `client/src/pages/About.jsx`
- **Team**: Edit `client/src/pages/Team.jsx`

---

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

### Quick Deploy Options:

**1. Vercel + Render (Easiest)**
- Frontend on Vercel (free)
- Backend on Render (free)
- Database on MongoDB Atlas (free)

**2. Railway + Netlify**
- Both on free tier
- Easy GitHub integration

**3. Full VPS**
- DigitalOcean/AWS
- Full control
- $5-10/month

### Pre-Deployment Checklist
- [ ] MongoDB Atlas setup
- [ ] Environment variables configured
- [ ] Razorpay keys added
- [ ] Test all features locally
- [ ] Build frontend successfully
- [ ] Backend starts without errors
- [ ] Git repository pushed to GitHub

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find module"
**Solution:**
```bash
npm run install-all
```

#### 2. "MongoDB connection error"
**Possible causes:**
- Wrong connection string
- IP not whitelisted in Atlas
- MongoDB not running (local)

**Solution:**
```bash
# Check .env file
cat server/.env | grep MONGODB_URI

# Test connection
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_URI').then(() => console.log('Connected!')).catch(e => console.log(e))"
```

#### 3. "Port 3000/5000 already in use"
**Solution:**
```bash
# Find process using port
lsof -ti:3000
lsof -ti:5000

# Kill process
kill -9 $(lsof -ti:3000)

# Or change port in .env
```

#### 4. "Payment not working"
**Check:**
- Razorpay keys are correct
- Using TEST keys in development
- Razorpay script loaded in HTML
- Browser console for errors

#### 5. "Images not showing"
**Solution:**
```bash
# Ensure upload directory exists
mkdir -p server/uploads/team

# Check file permissions
chmod 755 server/uploads/team
```

#### 6. "CORS error"
**Solution:**
Edit `server/index.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

#### 7. "JWT must be provided"
**Cause:** Not logged in or token expired

**Solution:**
- Login again
- Check token in localStorage
- Verify JWT_SECRET is same

### Debug Mode

Enable detailed logging:

**Backend:**
```javascript
// server/index.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})
```

**Frontend:**
```javascript
// client/src/context/AuthContext.jsx
console.log('API Response:', response)
```

### Still Having Issues?

1. Check server logs
2. Check browser console
3. Verify environment variables
4. Test with Postman
5. Create GitHub issue

---

## Useful Commands

```bash
# Install dependencies
npm run install-all

# Start development
npm run dev

# Seed database
cd server && npm run seed

# Build for production
npm run build

# Check for updates
npm outdated

# Update packages
npm update

# Clear cache
npm cache clean --force
rm -rf node_modules
npm install
```

---

## Next Steps

1. ✅ Setup complete
2. ✅ Test everything locally
3. 📝 Add your content (team, tournaments)
4. 🎨 Customize design
5. 🚀 Deploy to production
6. 📱 Share with your clan!

---

## Resources

- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [Razorpay Docs](https://razorpay.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)

---

**Need more help? Check other docs:**
- [README.md](README.md) - Overview
- [QUICKSTART.md](QUICKSTART.md) - Quick setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing

**Good luck! 🎮🔥**
