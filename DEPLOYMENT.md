# 🚀 Quick Deployment Guide

## 1️⃣ MongoDB Atlas Setup (5 minutes)

**Free cloud database for your app!**

### Steps:
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create cluster (select FREE tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/teamviolence
   ```

**Done!** ✅ Database is ready.

---

## 2️⃣ Firebase Deployment

### Firebase Database Options:
- **Firestore** (NoSQL like MongoDB) - Built-in
- **Realtime Database** - Built-in
- **Keep MongoDB Atlas** - Recommended! (already setup)

### Deployment Steps:

**Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

**Login:**
```bash
firebase login
```

**Initialize:**
```bash
cd /workspaces/teamviolence/client
firebase init
```

**Select:**
- Hosting
- Build directory: `dist`
- Single-page app: `Yes`

**Deploy:**
```bash
npm run build
firebase deploy
```

### Backend Hosting:
Firebase doesn't host Node.js backend. Use:
- **Render.com** (Free) - Recommended
- **Railway.app** (Free)
- **Vercel** (Serverless)

---

## 3️⃣ Complete Deployment

### Option 1: Firebase + Render (Recommended)
- **Frontend:** Firebase Hosting
- **Backend:** Render.com
- **Database:** MongoDB Atlas

### Option 2: All-in-One
- **Vercel:** Frontend + Backend + MongoDB Atlas

**30 minutes total!** 🎉
