# 🚀 Deployment Guide - Team VioLencE Website

This guide provides multiple deployment options for your MERN stack esports website.

---

## 📋 Deployment Options Overview

| Option | Frontend | Backend | Database | Cost | Difficulty |
|--------|----------|---------|----------|------|------------|
| **Option 1** | Vercel | Render | MongoDB Atlas | Free | ⭐ Easy |
| **Option 2** | Netlify | Railway | MongoDB Atlas | Free | ⭐ Easy |
| **Option 3** | Vercel | Vercel | MongoDB Atlas | Free-Paid | ⭐⭐ Medium |
| **Option 4** | AWS/DigitalOcean | AWS/DigitalOcean | MongoDB Atlas | Paid | ⭐⭐⭐ Advanced |

**Recommended for Beginners: Option 1 (Vercel + Render + MongoDB Atlas)**

---

## 🎯 OPTION 1: Vercel + Render + MongoDB Atlas (RECOMMENDED)

### Why This Option?
✅ Free tier available  
✅ Easy to setup  
✅ Auto-deployment from GitHub  
✅ Good performance  
✅ SSL certificates included

### Step-by-Step Guide

#### Part A: Setup MongoDB Atlas (Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new project

2. **Create Database Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select region closest to your users (e.g., Mumbai for India)
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and strong password
   - Save credentials securely!

4. **Setup Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Save this - you'll need it later!

#### Part B: Deploy Backend to Render

1. **Prepare Your Code**
   - Make sure your code is pushed to GitHub
   - Ensure `server/package.json` has start script:
   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub
   - Authorize Render to access your repositories

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: teamviolence-api
     - **Root Directory**: server
     - **Environment**: Node
     - **Build Command**: npm install
     - **Start Command**: npm start
     - **Plan**: Free

4. **Add Environment Variables**
   Click "Advanced" and add:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key_here_make_it_long
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., https://teamviolence-api.onrender.com)

#### Part C: Deploy Frontend to Vercel

1. **Update Frontend Config**
   
   Edit `client/vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: 'https://your-render-backend-url.onrender.com',
           changeOrigin: true
         }
       }
     }
   })
   ```

2. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Import your repository

3. **Configure Vercel Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: client
     - **Build Command**: npm run build
     - **Output Directory**: dist

4. **Add Environment Variables**
   In Vercel dashboard:
   ```
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   VITE_API_URL=https://your-render-backend-url.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Your site will be live at: https://teamviolence.vercel.app

#### Part D: Connect Frontend to Backend

Update `client/src/context/AuthContext.jsx` to use environment variable:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '';

// Use API_URL for all axios calls
axios.get(`${API_URL}/api/auth/me`)
```

---

## 🎯 OPTION 2: Netlify + Railway + MongoDB Atlas

### Why This Option?
✅ Netlify has great CDN  
✅ Railway is beginner-friendly  
✅ Similar to Option 1

### Steps:

#### Part A: MongoDB Atlas
Same as Option 1 Part A

#### Part B: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Select server directory
   - Add environment variables (same as Option 1)
   - Railway will auto-deploy

4. **Generate Domain**
   - Go to Settings → Generate Domain
   - Copy your backend URL

#### Part C: Deploy Frontend to Netlify

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Add New Site**
   - Click "Add new site" → "Import existing project"
   - Choose your GitHub repository

3. **Configure Build**
   - **Base directory**: client
   - **Build command**: npm run build
   - **Publish directory**: client/dist

4. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add your Razorpay key

5. **Deploy**
   - Click "Deploy site"
   - Your site will be live!

---

## 🎯 OPTION 3: Full Vercel Deployment

### Why This Option?
✅ Everything in one platform  
✅ Serverless functions for backend  
⚠️ Requires code restructuring

### Steps:

1. **Restructure Backend as Serverless Functions**
   Create `api/` folder in root:
   ```
   /api
     /auth.js
     /tournaments.js
     /team.js
   ```

2. **Deploy to Vercel**
   - Import repository
   - Vercel auto-detects configuration
   - Add environment variables
   - Deploy

*Note: This option is more advanced and requires API route refactoring*

---

## 🎯 OPTION 4: VPS/Cloud Server (AWS, DigitalOcean)

### Why This Option?
✅ Full control  
✅ Better for scaling  
⚠️ Requires server management  
💰 Costs money ($5-10/month minimum)

### Quick Overview:

1. **Setup Server**
   - Create Ubuntu server on DigitalOcean/AWS
   - Install Node.js, MongoDB, Nginx

2. **Deploy Backend**
   - Clone repository
   - Install dependencies
   - Setup PM2 for process management
   - Configure Nginx reverse proxy

3. **Deploy Frontend**
   - Build React app
   - Serve with Nginx
   - Setup SSL with Let's Encrypt

4. **Configure Domain**
   - Point domain to server IP
   - Setup DNS records

*Full tutorial: This requires advanced knowledge*

---

## 🔧 Post-Deployment Setup

### 1. Setup Razorpay Webhooks

1. Go to Razorpay Dashboard
2. Settings → Webhooks
3. Add webhook URL: `https://your-backend-url.com/api/webhooks/razorpay`
4. Select events: payment.captured, payment.failed
5. Save webhook secret

### 2. Create Admin User

Run this in your MongoDB:
```javascript
db.users.updateOne(
  { email: "your-admin-email@gmail.com" },
  { $set: { role: "admin" } }
)
```

### 3. Add Sample Data

Use API endpoints or MongoDB Compass to add:
- Tournament data
- Team member profiles
- Clan information

### 4. Test Payment Flow

1. Use Razorpay test mode
2. Test card: 4111 1111 1111 1111
3. Verify payment capture
4. Check registration in dashboard

### 5. Setup Custom Domain (Optional)

#### For Vercel:
1. Buy domain from GoDaddy/Namecheap
2. Vercel Settings → Domains
3. Add custom domain
4. Update DNS records as shown

#### For Render:
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## 📊 Deployment Comparison

### Free Tier Limits:

**Vercel:**
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ⚠️ 100GB bandwidth/month on free

**Render:**
- ✅ Free tier available
- ⚠️ Spins down after 15min inactivity
- ⚠️ 750 hours/month free

**Railway:**
- ✅ $5 free credit monthly
- ✅ No sleep/spin down
- ⚠️ Pay after credits used

**Netlify:**
- ✅ 100GB bandwidth
- ✅ Automatic HTTPS
- ✅ Great CDN

---

## 🐛 Common Issues & Solutions

### Issue 1: API not connecting
**Solution:** Check CORS settings in server, ensure backend URL is correct

### Issue 2: Payment not working
**Solution:** Verify Razorpay keys are correct, check webhook setup

### Issue 3: MongoDB connection failed
**Solution:** Check IP whitelist in Atlas, verify connection string

### Issue 4: Build failing on Vercel
**Solution:** Check build logs, ensure all dependencies in package.json

### Issue 5: Images not loading
**Solution:** Use absolute URLs, check upload directory permissions

---

## 📝 Environment Variables Checklist

### Backend (.env):
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] RAZORPAY_KEY_ID
- [ ] RAZORPAY_KEY_SECRET
- [ ] PORT
- [ ] NODE_ENV

### Frontend (.env):
- [ ] VITE_RAZORPAY_KEY_ID
- [ ] VITE_API_URL (if using separate backend)

---

## 🎉 You're Done!

Your website should now be live! 

**Next Steps:**
1. Test all features
2. Add your team members
3. Create tournaments
4. Share with your clan!

**Need Help?**
- Check deployment platform documentation
- Create GitHub issue
- Contact support

---

**Good luck with your esports website! 🎮🔥**
