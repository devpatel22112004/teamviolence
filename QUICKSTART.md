# 🎯 Quick Start Guide

Welcome to Team VioLencE website setup!

## ⚡ Fast Setup (3 Steps)

### 1️⃣ Run Setup Script
```bash
./setup.sh
```

This installs all dependencies and creates necessary folders.

### 2️⃣ Configure Environment

**MongoDB Setup:**
- **Easy way:** Use [MongoDB Atlas](https://mongodb.com/atlas) (Free, cloud-based)
- **Local way:** Install and run MongoDB locally

**Razorpay Setup:**
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API keys from Dashboard
3. Use TEST keys for development

**Edit `server/.env`:**
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/teamviolence
JWT_SECRET=make_this_a_very_long_random_string
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxx
PORT=5000
NODE_ENV=development
```

**Edit `client/.env`:**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
```

### 3️⃣ Start Development
```bash
npm run dev
```

Opens:
- 🎨 Frontend: http://localhost:3000
- ⚙️ Backend: http://localhost:5000

## 📱 What You Get

✅ **Home Page** - Premium hero section  
✅ **Team Page** - Player profiles  
✅ **Tournaments** - Browse & register  
✅ **Auth System** - Login/Register  
✅ **Dashboard** - User management  
✅ **Payments** - Razorpay integration  
✅ **Admin Panel** - Manage content  

## 🎨 Customize

### Change Team Name
Edit `client/src/components/Navbar.jsx` and `Footer.jsx`

### Add Team Members
Use admin account to POST to `/api/team` or add via MongoDB

### Change Colors
Edit `client/tailwind.config.js`:
```javascript
primary: {
  500: '#ef4444', // Your color
}
```

## 🚀 Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment options:
- **Easy:** Vercel + Render (Free)
- **Medium:** Netlify + Railway (Free)
- **Pro:** AWS/DigitalOcean ($5+/month)

## 🆘 Need Help?

**Common Issues:**

❓ **"Cannot connect to MongoDB"**  
→ Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)

❓ **"Payment not working"**  
→ Verify Razorpay keys are correct and in TEST mode

❓ **"Port already in use"**  
→ Change PORT in server/.env

❓ **"Module not found"**  
→ Run `npm run install-all` again

## 📚 Learn More

- Full README: [README.md](README.md)
- Deployment Guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- API Documentation: Check README.md → API Endpoints

## 🎮 Features to Add

Your website is ready! Consider adding:
- [ ] More team members
- [ ] Tournament schedules
- [ ] Match results
- [ ] Live streaming links
- [ ] Clan statistics
- [ ] Gallery photos

## 📧 Support

Questions? Create an issue on GitHub or contact the clan admin.

---

**Happy Gaming! 🎮🔥**

*Made for Team VioLencE - Dominating BGMI since day one!*
