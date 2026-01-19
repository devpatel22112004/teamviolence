# 🎮 Team VioLencE - Professional BGMI Esports Website

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)

A premium, fully responsive esports website for Team VioLencE BGMI clan featuring tournament management, payment gateway integration, team showcase, and modern Netflix/Prime-style UI with smooth animations.

## ✨ Features

- 🏆 **Tournament System** - Free & Paid tournaments with Razorpay payment integration
- 👥 **Team Showcase** - Display player profiles with stats and social links
- 💳 **Payment Gateway** - Automated payment verification
- 🎨 **Premium UI** - Netflix/Prime-style design with Framer Motion animations
- 🔐 **Authentication** - Secure JWT-based auth system
- 📱 **Fully Responsive** - Works on all devices

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router  
**Backend:** Node.js, Express, MongoDB, JWT, Razorpay  

## 📦 Quick Start

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Setup Environment Variables

**Server (.env in /server):**
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
PORT=5000
```

**Client (.env in /client):**
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### 3. Create Upload Directory
```bash
mkdir -p server/uploads/team
```

### 4. Run Development Server
```bash
npm run dev
```

Opens:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📚 Project Structure

```
teamviolence/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── package.json
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
└── package.json
```

## 🔧 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `POST /api/tournaments/:id/register` - Register for tournament
- `POST /api/tournaments/:id/verify-payment` - Verify payment

### Team
- `GET /api/team` - Get team members

### Users
- `GET /api/users/registrations` - Get user registrations
- `GET /api/users/profile` - Get user profile

## 📱 Pages


## 📚 Documentation

- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture & diagrams
- ✅ [CHECKLIST.md](CHECKLIST.md) - Complete setup checklist

## 🎮 Screenshots

Your website includes:
- Modern hero section with animations
- Tournament listing with filters
- Team member showcase
- User dashboard
- Payment integration
- Mobile responsive design

## 🔐 Security

- JWT authentication
- Password hashing
- Protected routes
- Payment verification
- CORS configuration

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - Free to use for your clan

---

**Need Help?** Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions and troubleshooting.
