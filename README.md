# 🎮 Team VioLencE - BGMI Tournament Platform

A comprehensive tournament management system for BGMI (Battlegrounds Mobile India) esports tournaments.

![Status](https://img.shields.io/badge/status-active-success.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Connected-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ installed
- MongoDB running (local or Atlas)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/devpatel22112004/teamviolence.git
cd teamviolence

# Install all dependencies
npm install
cd server && npm install
cd ../client && npm install
cd ..

# Configure environment variables (see below)

# Seed database with test data
cd server && npm run seed

# Start servers
./start.sh
```

### Environment Setup

**Backend (.env in server/):**
```env
MONGODB_URI=mongodb://localhost:27017/teamviolence
JWT_SECRET=your_super_secret_jwt_key_change_this
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
NODE_ENV=development
```

**Frontend (.env in client/):**
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### Access Application

- **Frontend:** http://localhost:3000/teamviolence/
- **Backend:** http://localhost:5000

**Test Credentials:**
- User: `user@test.com` / `user123`
- Admin: `admin@teamviolence.com` / `admin123`

---

## ✨ Features

### User Features
- 🎮 Browse & view tournaments
- 📝 Register for tournaments
- 👥 Team management
- 💳 Secure payment processing (Razorpay)
- 📊 View registration history
- 👤 User profile management
- 🔐 Secure authentication (JWT + Google OAuth)

### Admin Features
- ➕ Create & manage tournaments
- 📊 View all registrations
- 👥 Manage team members
- ✅ Approve/reject registrations

### Technical Features
- 🔒 JWT-based authentication
- 🌐 RESTful API architecture
- 📱 Fully responsive design
- ⚡ Real-time updates
- 🎨 Modern UI with Tailwind CSS
- 🎭 Smooth animations with Framer Motion

---

## 🛠️ Tech Stack

### Frontend
- React 18, Vite, Tailwind CSS
- Framer Motion, React Router v6
- Axios, Context API

### Backend
- Node.js, Express.js
- MongoDB with Mongoose
- JWT, bcryptjs, Multer
- Razorpay SDK, Google Auth

---

## 📁 Project Structure

```
teamviolence/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Auth context
│   │   └── App.jsx       # Main app
│   └── package.json
├── server/                # Express backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── index.js          # Server entry
│   └── seed.js           # Database seeder
├── start.sh              # Start servers
├── stop.sh               # Stop servers
├── status.sh             # Check status
└── README.md             # This file
```

---

## 🔧 Available Scripts

### Helper Scripts
```bash
./start.sh           # Start both servers
./stop.sh            # Stop all servers
./status.sh          # Check server status
```

### Backend (server/)
```bash
npm start            # Start server
npm run dev          # Start with nodemon
npm run seed         # Seed database
```

### Frontend (client/)
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `GET /api/tournaments/:id` - Get tournament
- `POST /api/tournaments` - Create (admin)
- `PUT /api/tournaments/:id` - Update (admin)
- `POST /api/tournaments/:id/register` - Register

### Team & Users
- `GET /api/team/members` - Get team members
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile

---

## 🛑 Troubleshooting

### Port Already in Use
```bash
./stop.sh
```

### Database Connection Error
- Check MongoDB is running
- Verify `.env` connection string

### Module Not Found
```bash
npm install
cd server && npm install
cd ../client && npm install
```

---

## 📝 License

MIT License

---

## 👨‍💻 Developer

**Dev Patel**
- GitHub: [@devpatel22112004](https://github.com/devpatel22112004)

---

**Made with ❤️ for the BGMI Esports Community**
