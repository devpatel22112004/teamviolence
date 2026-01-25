# 🚀 Deploy to Render (Simple One-Click Setup)

## ✨ New Approach: Single Deployment!

**No need to deploy frontend and backend separately!** Everything runs from one Node.js app:
- ✅ Backend API runs at `https://teamviolence.onrender.com/api/*`
- ✅ Frontend served at `https://teamviolence.onrender.com/*`
- ✅ Same database: MongoDB Atlas
- ✅ Auto-deploy from GitHub on every push

---

## 📋 Prerequisites

✅ **MongoDB Atlas** - Already configured with connection string  
✅ **GitHub repo** - devpatel22112004/teamviolence (main branch)  
✅ **Render account** - Free signup at https://render.com

---

## 🎯 Deploy in 3 Steps

### **Step 1: Sign Up for Render**
1. Go to https://render.com
2. Click **"Sign up"**
3. Connect with your **GitHub account** (devpatel22112004)
4. Authorize access to your repositories

### **Step 2: Create Web Service**
1. Click **"New +"** → **"Web Service"**
2. Select repository: **`devpatel22112004/teamviolence`**
3. Configure:
   - **Name**: `teamviolence`
   - **Root Directory**: `server` ⚠️ **Important!**
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     cd ../client && npm run build && cd ../server && npm install
     ```
   - **Start Command**: 
     ```bash
     npm start
     ```
   - **Instance Type**: Free

4. **Add Environment Variables** (click "Advanced"):
   ```
   MONGODB_URI=mongodb+srv://pateldev3372_db_user:devpatel_2211@cluster.jtxntwe.mongodb.net/teamviolence?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   GOOGLE_CLIENT_ID=551574442149-ulva1q1rmqdo2pcvfadtjn9p0lc00qs6.apps.googleusercontent.com
   NODE_ENV=production
   ```

5. Click **"Create Web Service"**
6. Wait 3-5 minutes for deployment to complete

### **Step 3: Your Live Site! 🎉**
Once deployed, your site will be live at:
```
https://teamviolence.onrender.com
```

- **Frontend**: https://teamviolence.onrender.com ✅
- **API**: https://teamviolence.onrender.com/api/health ✅
- **Auto-deploy**: Every push to `main` auto-deploys! 🔄

---

## ⚙️ How It Works

```
GitHub (main branch)
        ↓
  Render detects push
        ↓
  Builds client: npm run build
        ↓
  Installs server: npm install
        ↓
  Starts server: npm start
        ↓
  Server serves:
  - API routes at /api/*
  - Frontend (dist folder) at /*
        ↓
  MongoDB Atlas ↔ Server ↔ Browser
```

---

## 🔄 Auto-Deploy from GitHub

Every time you push to `main`:
```bash
git add -A
git commit -m "Make some changes"
git push origin main
```

Render automatically:
1. Detects the push
2. Rebuilds the frontend
3. Reinstalls dependencies
4. Restarts the server
5. Site updates in 2-3 minutes! ✨

---

## 📊 Monitoring

1. Go to Render Dashboard
2. Click on your service: `teamviolence`
3. **Logs** tab: See real-time server output
4. **Deployments** tab: See deployment history
5. **Metrics** tab: Monitor CPU, memory, bandwidth

---

## 🐛 Troubleshooting

### "Build failed"
Check the logs in Render dashboard under **Logs** tab.

### "MongoDB connection refused"
Verify in `.env` that `MONGODB_URI` is correct and MongoDB Atlas allows Render's IP (0.0.0.0/0 should be allowed).

### "Frontend not loading"
- Check that `/workspaces/teamviolence/client/dist` exists
- Verify `base: '/'` in `client/vite.config.js`

### "API calls failing"
Frontend automatically uses `/api/*` (same domain), no need for separate URL.

---

## ✅ Verification Checklist

- [ ] Render account created
- [ ] GitHub connected
- [ ] Web service deployed
- [ ] Site loads at `https://teamviolence.onrender.com`
- [ ] Login works
- [ ] Tournaments page loads
- [ ] API calls working
- [ ] Database connected

---

## 🚀 You're Live!

Your website is now **live** with:
- ✅ Cloud database (MongoDB Atlas)
- ✅ Unified backend + frontend
- ✅ Auto-deploy from GitHub
- ✅ 24/7 uptime
- ✅ Free tier (forever!)

**Share your link:** `https://teamviolence.onrender.com`
