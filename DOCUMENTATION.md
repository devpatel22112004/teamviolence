# 🎮 Team VioLencE - Complete Documentation

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)

> **Professional BGMI Esports Website** - Complete documentation for setup, deployment, and development.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Quick Start](#-quick-start)
3. [Features](#-features)
4. [Tech Stack](#-tech-stack)
5. [Project Structure](#-project-structure)
6. [Installation](#-installation)
7. [Configuration](#-configuration)
8. [Development](#-development)
9. [API Documentation](#-api-documentation)
10. [Deployment](#-deployment)
11. [Troubleshooting](#-troubleshooting)
12. [Contributing](#-contributing)

---

## 🎯 Project Overview

Team VioLencE is a complete, production-ready MERN stack esports website featuring:
- Premium Netflix/Prime-style UI with smooth animations
- Tournament management system (free & paid)
- Razorpay payment gateway integration
- User authentication and dashboard
- Team showcase with player profiles
- Fully responsive design

---

## ⚡ Quick Start

### 1️⃣ Run Setup Script
```bash
./setup.sh
```

### 2️⃣ Configure Environment

**Server (`server/.env`):**
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/teamviolence
JWT_SECRET=your_very_long_random_secret_key_here
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxx
PORT=5000
NODE_ENV=development
```

**Client (`client/.env`):**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
```

### 3️⃣ Start Development
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## ✨ Features

### Frontend Features
- ✅ **Modern Premium UI** - Netflix/Amazon Prime style design
- ✅ **Fully Responsive** - Mobile, tablet, desktop optimized
- ✅ **Smooth Animations** - Framer Motion transitions
- ✅ **7 Complete Pages**: Home, About, Team, Tournaments, Details, Auth, Dashboard
- ✅ **Interactive Components** - Animated cards, buttons, forms

### Backend Features
- ✅ **REST API** - Complete CRUD operations
- ✅ **JWT Authentication** - Secure user auth
- ✅ **Payment Integration** - Razorpay with auto-verification
- ✅ **Tournament System** - Free & paid tournaments
- ✅ **File Upload** - Team photos with Multer
- ✅ **Admin Panel** - Content management

### Database Features
- ✅ **4 Models**: Users, Tournaments, Registrations, Team Members
- ✅ **Data Relationships** - Proper linking between collections
- ✅ **Seed Script** - Sample data for testing
- ✅ **Validation** - Schema validation with Mongoose

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router v6
- Axios

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Razorpay
- Multer

---

## 📁 Project Structure

```
teamviolence/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Navigation with animations
│   │   │   ├── Footer.jsx    # Footer with social links
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── About.jsx     # About clan
│   │   │   ├── Team.jsx      # Team members
│   │   │   ├── Tournaments.jsx
│   │   │   ├── TournamentDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                    # Express Backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Tournament.js
│   │   ├── Registration.js
│   │   └── TeamMember.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tournaments.js
│   │   ├── team.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── index.js
│   ├── seed.js
│   └── package.json
│
├── DOCUMENTATION.md          # This file
├── package.json
└── setup.sh
```

---

## 📦 Installation

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB account (Atlas or local)
- Razorpay account (for payments)

### Step 1: Clone Repository
```bash
cd /workspaces/teamviolence
```

### Step 2: Run Setup
```bash
chmod +x setup.sh
./setup.sh
```

This will:
- Install all dependencies
- Create necessary directories
- Setup project structure

### Step 3: Verify Installation
```bash
# Check dependencies
ls node_modules
ls client/node_modules
ls server/node_modules
```

---

## ⚙️ Configuration

### MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://mongodb.com/atlas)
2. Create free cluster (M0 tier)
3. Setup database user and password
4. Whitelist IP: 0.0.0.0/0
5. Get connection string
6. Replace `<password>` with your password

#### Option 2: Local MongoDB
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start service
sudo systemctl start mongodb

# Connection string
MONGODB_URI=mongodb://localhost:27017/teamviolence
```

### Razorpay Setup
1. Sign up at [Razorpay](https://razorpay.com)
2. Go to Dashboard → API Keys
3. Generate TEST keys
4. Copy Key ID and Secret
5. Add to environment variables

### Environment Variables

Create `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teamviolence
JWT_SECRET=create_a_very_long_random_string_at_least_32_characters
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
PORT=5000
NODE_ENV=development
```

Create `client/.env`:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

---

## 💻 Development

### Start Development Server
```bash
npm run dev
```

This starts both frontend and backend concurrently.

### Run Separately
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

### Seed Database
```bash
cd server
npm run seed
```

Creates:
- Admin user (admin@teamviolence.com / Admin@123)
- Test user (test@teamviolence.com / Test@123)
- Sample team members
- Sample tournaments

### Build for Production
```bash
npm run build
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password@123",
  "bgmiId": "12345678",
  "phoneNumber": "9876543210"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password@123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Tournament Endpoints

#### Get All Tournaments
```http
GET /api/tournaments
```

#### Get Single Tournament
```http
GET /api/tournaments/:id
```

#### Register for Tournament
```http
POST /api/tournaments/:id/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "teamName": "Alpha Squad",
  "teamMembers": [
    {
      "inGameName": "Player1",
      "bgmiId": "12345678"
    }
  ]
}
```

#### Verify Payment
```http
POST /api/tournaments/:id/verify-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_order_id": "order_xxxxx",
  "razorpay_signature": "xxxxx",
  "registrationId": "registration_id"
}
```

### Team Endpoints

#### Get Team Members
```http
GET /api/team
```

### User Endpoints

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Get User Registrations
```http
GET /api/users/registrations
Authorization: Bearer <token>
```

---

## 🚀 Deployment

### Recommended: Vercel + Render + MongoDB Atlas

#### Part 1: MongoDB Atlas
1. Create account and cluster (M0 free)
2. Setup database access
3. Whitelist IP: 0.0.0.0/0
4. Get connection string

#### Part 2: Deploy Backend (Render)
1. Create account at [Render](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configuration:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables
5. Deploy

#### Part 3: Deploy Frontend (Vercel)
1. Create account at [Vercel](https://vercel.com)
2. Import GitHub repository
3. Configuration:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variables
4. Deploy

### Alternative Options

#### Netlify + Railway
- Frontend: [Netlify](https://netlify.com)
- Backend: [Railway](https://railway.app)

#### AWS / DigitalOcean
- Full control
- Requires server management
- $5-20/month

---

## 🔧 Troubleshooting

### Common Issues

#### "Cannot connect to MongoDB"
- Check connection string format
- Verify password is correct
- Check IP whitelist (0.0.0.0/0)
- Ensure network access is configured

#### "Payment not working"
- Verify Razorpay keys are TEST keys
- Check keys match in both .env files
- Use test card: 4111 1111 1111 1111

#### "Port already in use"
- Change PORT in server/.env
- Kill existing process:
```bash
lsof -ti:5000 | xargs kill -9
```

#### "Module not found"
- Re-run setup:
```bash
npm run install-all
```

#### CORS Errors
- Check backend CORS configuration
- Verify frontend URL is allowed
- Add to server/index.js:
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

### Debug Mode

Enable detailed logging:
```env
# server/.env
DEBUG=*
NODE_ENV=development
```

---

## 🤝 Contributing

We welcome contributions!

### How to Contribute

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes**
4. **Test locally**
5. **Commit changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open Pull Request**

### Code Style
- Use ES6+ features
- Follow existing patterns
- Add comments for complex logic
- Keep functions focused

### Testing Checklist
- [ ] Test on desktop and mobile
- [ ] Verify all features work
- [ ] Test payment flow (test mode)
- [ ] Check console for errors
- [ ] Verify API responses

---

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

Need help? Here are your options:

1. **Documentation** - Check this file first
2. **Issues** - Open GitHub issue
3. **Discussions** - Ask in GitHub Discussions

---

## 🎮 Credits

Built with ❤️ for Team VioLencE BGMI Clan

**Tech Stack:**
- React, Vite, Tailwind CSS, Framer Motion
- Node.js, Express, MongoDB, Mongoose
- JWT, Razorpay, Multer

---

## 📝 Changelog

### Version 1.0.0
- Initial release
- Complete MERN stack implementation
- Payment integration
- Tournament system
- User authentication
- Responsive design

---

**Last Updated:** January 2026

**Status:** Production Ready ✅

**Website:** Coming Soon 🚀
