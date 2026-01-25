# Render Deployment Guide

## 🚀 Step-by-Step Setup

### **Step 1: Create Free MongoDB Atlas Database**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Sign Up** (free account)
3. **Create a free cluster** (M0 Sandbox)
4. **Create a user:**
   - Database Access → Add Database User
   - Username: `admin`
   - Password: Generate a strong password (save it!)
5. **Get connection string:**
   - Cluster → Connect → Drivers → Copy connection string
   - Format: `mongodb+srv://admin:PASSWORD@cluster.mongodb.net/teamviolence?retryWrites=true&w=majority`
   - Replace `PASSWORD` with your actual password
6. **Allow all IPs:**
   - Network Access → Add IP Address → Allow From Anywhere (0.0.0.0/0)

### **Step 2: Prepare Your Repo**

Update `server/.env`:
```
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/teamviolence?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

Commit locally:
```bash
cd /workspaces/teamviolence
git add -A
git commit -m "Setup for Render deployment"
git push origin main
```

### **Step 3: Deploy Backend to Render**

1. Go to [Render.com](https://render.com)
2. **Sign up** with GitHub (authorize your account)
3. **New → Web Service**
4. **Connect your GitHub repo:** `devpatel22112004/teamviolence`
5. **Configuration:**
   - Name: `teamviolence-api`
   - Environment: `Node`
   - Build Command: `cd server && npm install && npm run build` (or `npm install` if no build script)
   - Start Command: `cd server && npm start`
   - Region: Choose closest to you
6. **Add environment variables:**
   - Click "Advanced" → Environment
   - Add `MONGODB_URI` = your MongoDB connection string
   - Add `NODE_ENV` = `production`
7. **Free Plan:** Select "Free" tier
8. **Create Web Service**

Render will auto-deploy! Wait 2-3 minutes. You'll get a URL like: `https://teamviolence-api.onrender.com`

### **Step 4: Deploy Frontend to Render (Static)**

1. In Render dashboard: **New → Static Site**
2. **Connect GitHub repo:** `devpatel22112004/teamviolence`
3. **Configuration:**
   - Name: `teamviolence-web`
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`
4. **Create Static Site**

Frontend will deploy! URL: `https://teamviolence-web.onrender.com`

### **Step 5: Connect Frontend to Backend**

Update `client/.env`:
```
VITE_API_URL=https://teamviolence-api.onrender.com
```

In `client/src/` or API setup file, use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

Commit and push—**both sites auto-update!**

### **Step 6: Auto-Deploy on GitHub Push**

✅ Already set up! Just push to `main`:
```bash
git add -A
git commit -m "Your changes"
git push origin main
```

Render automatically redeploys within 1-2 minutes!

## 📊 Monitor Your Sites

- **Backend:** https://dashboard.render.com → Select `teamviolence-api` → see logs/status
- **Frontend:** https://dashboard.render.com → Select `teamviolence-web` → see logs/status

## 🎯 What You Get (All Free)

✅ MongoDB Atlas Database (512 MB free)  
✅ Render Backend Hosting (auto-deploy on push)  
✅ Render Frontend Hosting (auto-deploy on push)  
✅ Free SSL certificates  
✅ Auto-redeploy from GitHub  
✅ Logs and monitoring  

## ⚡ Common Issues

**Site shows blank page?**
- Check browser console for API errors
- Make sure `VITE_API_URL` is correct
- Check Render logs for backend errors

**Backend won't start?**
- Verify `MONGODB_URI` is in Render environment variables
- Check server logs in Render dashboard

**Still can't connect?**
- Verify MongoDB Atlas allows your Render IP (it should with 0.0.0.0/0)
- Test locally first with `npm run dev`

## 🔄 Workflow

```
You make changes locally
         ↓
Commit and git push origin main
         ↓
GitHub notifies Render
         ↓
Render auto-builds and deploys (2-3 min)
         ↓
Your site updates live! 🚀
```

Done! Your site is live with zero downtime updates! 🎉
