# 🎮 Team VioLencE - Complete Developer Handbook

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Architecture](#architecture)
4. [API Reference](#api-reference)
5. [Frontend Guide](#frontend-guide)
6. [Backend Guide](#backend-guide)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Team VioLencE** is a professional esports tournament platform for BGMI (Battlegrounds Mobile India) players.

**Current Status:** MVP (Minimum Viable Product) Complete  
**Version:** 1.0.0  
**Launch Date:** January 2026  

### Key Stats
- 📱 **Frontend:** React 18 + Vite + Tailwind CSS
- ⚙️ **Backend:** Node.js + Express + MongoDB
- 🔒 **Security:** JWT + Bcrypt + Input Validation
- 🎨 **Design:** Premium dark theme with sky blue accents
- 📊 **Database:** MongoDB Atlas or local

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git
- A code editor (VS Code recommended)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/devpatel22112004/teamviolence.git
cd teamviolence

# 2. Install root dependencies
npm install

# 3. Create .env file in server directory
cp server/.env.example server/.env

# 4. Update .env with your values
MONGODB_URI=mongodb://localhost:27017/teamviolence
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
PORT=5000

# 5. Start development
npm run dev
```

### Access Points
- **Frontend:** http://localhost:3000/teamviolence
- **Backend:** http://localhost:5000
- **API Docs:** Coming soon

---

## Architecture

### System Overview
```
┌─────────────────────────────────────────┐
│          Frontend (React)                │
│  ├─ Pages (Home, Auth, Tournaments)    │
│  ├─ Components (Navbar, Cards)         │
│  ├─ Context (AuthContext)              │
│  └─ Services (Axios)                   │
└────────────────┬────────────────────────┘
                 │ HTTP/HTTPS
                 ↓
┌─────────────────────────────────────────┐
│         Backend (Express.js)             │
│  ├─ Routes (auth, tournaments, users)  │
│  ├─ Controllers (Auth, Tournament)      │
│  ├─ Middleware (Auth, Error handling)  │
│  └─ Models (User, Tournament)           │
└────────────────┬────────────────────────┘
                 │ Mongoose ODM
                 ↓
┌─────────────────────────────────────────┐
│       Database (MongoDB)                 │
│  ├─ Users Collection                    │
│  ├─ Tournaments Collection              │
│  └─ Registrations Collection            │
└─────────────────────────────────────────┘
```

### Data Flow Diagram
```
User Input
    ↓
React Component
    ↓
Axios API Call + JWT Token
    ↓
Express Route
    ↓
Authentication Middleware
    ↓
Business Logic
    ↓
MongoDB Query
    ↓
Response (JSON)
    ↓
Update UI State
    ↓
Toast Notification
    ↓
User Sees Result
```

---

## API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Dev Patel",
  "email": "dev@example.com",
  "phone": "9876543210",
  "password": "SecurePass123"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Dev Patel",
    "email": "dev@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "dev@example.com",
  "password": "SecurePass123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}

Response (200):
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Dev Patel",
  "email": "dev@example.com",
  "phone": "9876543210",
  "role": "user"
}
```

### Tournament Endpoints

#### Get All Tournaments
```http
GET /tournaments

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Weekly Squad Championship",
    "mode": "Squad TPP",
    "type": "free",
    "entryFee": 0,
    "prizePool": 5000,
    "totalSlots": 100,
    "registeredTeams": 45,
    "date": "2026-01-25T00:00:00Z",
    "status": "open"
  }
]
```

#### Register for Tournament
```http
POST /tournaments/{tournamentId}/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "teamName": "Alpha Team",
  "leaderName": "Dev Patel",
  "members": ["Player1", "Player2", "Player3", "Player4"]
}

Response (201):
{
  "message": "Successfully registered",
  "registration": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "...",
    "tournamentId": "...",
    "teamName": "Alpha Team",
    "status": "active",
    "registeredAt": "2026-01-24T10:30:00Z"
  }
}
```

#### Get User Registrations
```http
GET /users/registrations
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "tournament": { ... },
    "teamName": "Alpha Team",
    "status": "active"
  }
]
```

---

## Frontend Guide

### Project Structure
```
client/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Homepage with hero & features
│   │   ├── Login.jsx         # Login page
│   │   ├── Register.jsx      # Registration page
│   │   ├── Dashboard.jsx     # User dashboard
│   │   ├── Tournaments.jsx   # Tournament listing & registration
│   │   ├── Team.jsx          # Team showcase
│   │   ├── About.jsx         # About company
│   │   └── TournamentDetails.jsx
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Footer.jsx        # Footer
│   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   └── Loading.jsx
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication state & logic
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                    # Static assets
└── vite.config.js           # Vite configuration
```

### Key Components

#### AuthContext.jsx
Manages user authentication state globally.

```jsx
const { user, login, register, logout, loading } = useAuth()
```

**Methods:**
- `login(email, password)` - Login user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `loginWithGoogle(token)` - Google OAuth login

#### ProtectedRoute.jsx
Wrapper component that checks if user is authenticated.

```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### Using Axios
Axios is pre-configured with JWT token in headers.

```jsx
import axios from 'axios'

// Automatic: Sends Authorization header with JWT token
const response = await axios.get('/api/users/registrations')
```

### Form Handling Example
```jsx
const [formData, setFormData] = useState({ email: '', password: '' })

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await login(formData.email, formData.password)
    toast.success('Login successful!')
  } catch (error) {
    toast.error(error.message)
  }
}
```

### Styling Guide

**Tailwind Classes Used:**
- `btn-modern` - Modern gradient button
- `card-premium` - Premium card with glass effect
- `nav-link` - Navbar link with glossy effect
- `gradient-text` - Text with gradient color
- `glass-strong` - Strong glass morphism
- `section-label` - Section label text

**Custom CSS in index.css:**
```css
.btn-modern { ... }
.card-premium { ... }
.gradient-text { ... }
```

---

## Backend Guide

### Project Structure
```
server/
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── tournaments.js    # Tournament routes
│   ├── users.js         # User routes
│   └── index.js
├── models/
│   ├── User.js          # User schema
│   ├── Tournament.js    # Tournament schema
│   └── Registration.js  # Registration schema
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── index.js             # Server entry point
└── package.json
```

### Models

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String,
  password: String (hashed),
  role: String (default: 'user'),
  googleId: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

#### Tournament Model
```javascript
{
  title: String (required),
  mode: String, // "Squad TPP", "TDM", etc.
  type: String, // "free" or "paid"
  entryFee: Number,
  prizePool: Number,
  totalSlots: Number,
  registeredTeams: Number (auto-incremented),
  date: Date,
  status: String, // "open", "closed"
  description: String,
  createdAt: Date (auto)
}
```

#### Registration Model
```javascript
{
  userId: ObjectId (required),
  tournamentId: ObjectId (required),
  teamName: String,
  leaderName: String,
  members: [String],
  status: String, // "active", "completed"
  registeredAt: Date (auto)
}
```

### Authentication Middleware
```javascript
// Usage in routes
router.get('/me', authMiddleware, (req, res) => {
  // req.user contains decoded JWT payload
  res.json(req.user)
})
```

### Error Handling
```javascript
try {
  // Business logic
} catch (error) {
  console.error(error)
  res.status(500).json({ message: 'Server error' })
}
```

### Creating New Routes
```javascript
const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/auth')

router.post('/', authMiddleware, async (req, res) => {
  try {
    // Your logic here
    res.status(201).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
```

---

## Deployment

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Backend Deployment (Railway or Heroku)

```bash
# Create Procfile
echo "web: node server/index.js" > Procfile

# Deploy to Heroku
heroku create teamviolence-api
git push heroku main
```

### Database (MongoDB Atlas)

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to server/.env:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/teamviolence
```

### Environment Variables Checklist

**Frontend (.env.local):**
```
VITE_GOOGLE_CLIENT_ID=your_google_id
VITE_API_URL=https://api.yoururl.com
```

**Backend (.env):**
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_id
NODE_ENV=production
PORT=5000
```

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** 
- Start MongoDB: `mongod`
- Or use MongoDB Atlas cloud connection

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Token Not Working
**Check:**
1. Token stored in localStorage
2. Authorization header includes "Bearer"
3. Token not expired (30 days)
4. Server can decode JWT

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:** Check CORS configuration in server

### Tailwind Styles Not Loading
```bash
npm run build  # Rebuild
# or
npm run dev    # Restart dev server
```

---

## Performance Optimization

**Current optimizations:**
- ✅ Vite for fast bundling
- ✅ Lazy loading pages
- ✅ Image optimization
- ✅ CSS minification
- ✅ Database indexing

**Future optimizations:**
- [ ] Add caching (Redis)
- [ ] Implement pagination
- [ ] Add request rate limiting
- [ ] Compress API responses
- [ ] CDN for static assets

---

## Security Checklist

- [x] Password hashing (Bcrypt)
- [x] JWT with expiry
- [x] Protected API routes
- [x] Input validation
- [x] CORS enabled
- [ ] Rate limiting (TODO)
- [ ] API key rotation (TODO)
- [ ] Audit logging (TODO)

---

## Support & Resources

**Documentation:**
- QUICK_START.md - Quick reference
- AUTHENTICATION.md - Auth system details
- TOURNAMENT_REGISTRATION.md - Tournament system details
- ROADMAP.md - Future features

**External Resources:**
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com

---

**Version:** 1.0.0  
**Last Updated:** January 24, 2026  
**Maintained by:** Dev Patel
