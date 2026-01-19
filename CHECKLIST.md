# ✅ Setup Checklist - Team VioLencE Website

Use this checklist to ensure everything is setup correctly!

---

## 📋 Pre-Setup Checklist

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor ready (VS Code recommended)
- [ ] Terminal/Command prompt ready

---

## 🔧 Installation Checklist

- [ ] Navigated to project directory
- [ ] Run `./setup.sh` successfully
- [ ] No errors in installation
- [ ] `node_modules` folder created in root
- [ ] `node_modules` folder created in `/client`
- [ ] `node_modules` folder created in `/server`
- [ ] `server/uploads/team` directory created

---

## 🗄️ MongoDB Setup Checklist

### For MongoDB Atlas:
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user with password
- [ ] Added IP address (0.0.0.0/0) to whitelist
- [ ] Copied connection string
- [ ] Replaced `<password>` in connection string
- [ ] Tested connection

### For Local MongoDB:
- [ ] MongoDB installed
- [ ] MongoDB service running
- [ ] Can connect to `mongodb://localhost:27017`

---

## 💳 Razorpay Setup Checklist

- [ ] Created Razorpay account
- [ ] Verified email
- [ ] Logged into dashboard
- [ ] Generated TEST API keys (not live)
- [ ] Copied Key ID
- [ ] Copied Key Secret
- [ ] Keys are in TEST mode

---

## ⚙️ Environment Configuration Checklist

### Server Environment (server/.env):
- [ ] File `server/.env` exists
- [ ] `MONGODB_URI` is set (correct connection string)
- [ ] `JWT_SECRET` is set (long random string)
- [ ] `RAZORPAY_KEY_ID` is set (starts with rzp_test_)
- [ ] `RAZORPAY_KEY_SECRET` is set
- [ ] `PORT=5000` is set
- [ ] `NODE_ENV=development` is set
- [ ] No extra spaces or quotes around values
- [ ] File is saved

### Client Environment (client/.env):
- [ ] File `client/.env` exists
- [ ] `VITE_RAZORPAY_KEY_ID` is set
- [ ] Same key as server RAZORPAY_KEY_ID
- [ ] File is saved

---

## 🧪 Testing Checklist

### Backend Test:
- [ ] Terminal in `/server` directory
- [ ] Run `npm run dev`
- [ ] Server starts without errors
- [ ] Shows "MongoDB Connected"
- [ ] Shows "Server running on port 5000"
- [ ] Can access http://localhost:5000/api/health
- [ ] Returns `{"status":"OK"...}` message

### Database Seed:
- [ ] Terminal in `/server` directory
- [ ] Run `npm run seed`
- [ ] Creates admin user
- [ ] Creates test user
- [ ] Creates team members
- [ ] Creates tournaments
- [ ] Shows success message
- [ ] No errors

### Frontend Test:
- [ ] Terminal in `/client` directory (or new terminal)
- [ ] Run `npm run dev`
- [ ] Vite starts successfully
- [ ] Shows "Local: http://localhost:3000"
- [ ] Browser opens automatically (or open manually)
- [ ] Home page loads
- [ ] No console errors

### Full Integration Test:
- [ ] All pages load (Home, About, Team, Tournaments)
- [ ] Team page shows seeded members
- [ ] Tournaments page shows seeded tournaments
- [ ] Can click on tournament to view details
- [ ] Login page accessible
- [ ] Can login with test user (user@test.com / user123)
- [ ] Redirects to dashboard after login
- [ ] Dashboard shows user info
- [ ] Can logout
- [ ] Can login with admin (admin@teamviolence.com / admin123)

---

## 💰 Payment Test Checklist

- [ ] Logged in as user
- [ ] Opened paid tournament
- [ ] Filled registration form
- [ ] Clicked register/pay button
- [ ] Razorpay popup appears
- [ ] Can see correct amount
- [ ] Used test card: 4111 1111 1111 1111
- [ ] Payment processed
- [ ] Redirected to dashboard
- [ ] Registration appears in dashboard
- [ ] Status shows "Confirmed"

---

## 📱 Responsive Test Checklist

- [ ] Desktop view (1920x1080) looks good
- [ ] Laptop view (1366x768) looks good
- [ ] Tablet view (768x1024) looks good
- [ ] Mobile view (375x667) looks good
- [ ] Navigation menu works on mobile
- [ ] All buttons clickable on touch
- [ ] Text readable on small screens
- [ ] Images load properly
- [ ] No horizontal scroll

---

## 🎨 Customization Checklist

- [ ] Updated team name in Navbar
- [ ] Updated team name in Footer
- [ ] Updated page title in index.html
- [ ] Added clan logo (optional)
- [ ] Changed colors (optional)
- [ ] Added real team members
- [ ] Added real tournaments
- [ ] Updated social media links
- [ ] Updated contact information

---

## 🚀 Pre-Deployment Checklist

### Code Ready:
- [ ] All features tested locally
- [ ] No console errors
- [ ] No server errors
- [ ] Payment flow works
- [ ] All pages accessible
- [ ] Forms validate properly
- [ ] Authentication works

### Accounts Ready:
- [ ] GitHub account created
- [ ] Code pushed to GitHub repository
- [ ] MongoDB Atlas cluster ready
- [ ] Razorpay account active
- [ ] Deployment platform account (Vercel/Render/etc)

### Environment Variables:
- [ ] Listed all required variables
- [ ] Have values for production
- [ ] Separate test and live Razorpay keys
- [ ] MongoDB production connection string ready

### Documentation:
- [ ] Read DEPLOYMENT.md
- [ ] Chosen deployment option
- [ ] Understand deployment steps
- [ ] Know how to add environment variables on platform

---

## 📊 Deployment Checklist

### MongoDB Atlas (Production):
- [ ] Cluster is in production mode
- [ ] Database user created for production
- [ ] Strong password used
- [ ] IP whitelist configured
- [ ] Connection string copied

### Backend Deployment (Render/Railway):
- [ ] Account created
- [ ] Repository connected
- [ ] Root directory set to `/server`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All environment variables added
- [ ] Using production values
- [ ] Deployment successful
- [ ] Backend URL copied

### Frontend Deployment (Vercel/Netlify):
- [ ] Account created
- [ ] Repository connected
- [ ] Root directory set to `/client`
- [ ] Framework detected (Vite)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables added
- [ ] VITE_API_URL points to backend
- [ ] Deployment successful
- [ ] Frontend URL accessible

### Final Checks:
- [ ] Website loads in browser
- [ ] All pages accessible
- [ ] Can register new account
- [ ] Can login
- [ ] Can view tournaments
- [ ] Can register for tournament
- [ ] Payment works in live mode
- [ ] No CORS errors
- [ ] Mobile view works
- [ ] SSL certificate active (https://)

---

## 🎉 Post-Deployment Checklist

### Razorpay Live Mode:
- [ ] Completed Razorpay KYC
- [ ] Activated live mode
- [ ] Generated LIVE API keys
- [ ] Updated environment variables
- [ ] Tested live payment
- [ ] Setup webhooks (optional)

### Content:
- [ ] Added real team members
- [ ] Added team photos
- [ ] Created upcoming tournaments
- [ ] Updated about page
- [ ] Added social media links
- [ ] Updated contact information

### SEO & Marketing:
- [ ] Updated meta descriptions
- [ ] Added Open Graph tags (optional)
- [ ] Shared on social media
- [ ] Added to clan Discord/WhatsApp
- [ ] Announced to followers

### Maintenance:
- [ ] Setup database backups
- [ ] Monitor server logs
- [ ] Check payment transactions
- [ ] Update content regularly
- [ ] Respond to user registrations

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

- [ ] Checked browser console for errors
- [ ] Checked server terminal for errors
- [ ] Verified all environment variables
- [ ] Restarted both servers
- [ ] Cleared browser cache
- [ ] Tried in incognito/private window
- [ ] Checked MongoDB connection
- [ ] Verified Razorpay keys
- [ ] Read error messages carefully
- [ ] Checked SETUP_GUIDE.md
- [ ] Searched error on Google
- [ ] Asked for help (GitHub issue)

---

## ✅ Success Indicators

You know everything is working when:

✅ Both servers start without errors  
✅ Can access all pages  
✅ Can register and login  
✅ Can see tournaments  
✅ Payment flow completes  
✅ Dashboard shows data  
✅ Mobile view works  
✅ No console errors  
✅ Backend API responds  
✅ Database stores data  

---

## 🎯 Ready to Launch?

If you've checked everything above:

🎉 **Congratulations! Your website is ready!**

**Next:**
1. Announce to your clan
2. Start accepting registrations
3. Host your first tournament
4. Grow your community

---

## 📞 Need Help?

- 📖 Read: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- 🚀 Deploy: [DEPLOYMENT.md](DEPLOYMENT.md)
- ⚡ Quick: [QUICKSTART.md](QUICKSTART.md)
- 📝 Overview: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

**Print this checklist and check items as you go! ✅**

**Good luck with your esports website! 🎮🔥**
