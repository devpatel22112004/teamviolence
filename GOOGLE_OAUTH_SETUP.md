# 🔐 Google OAuth Setup Guide

## Problem
You're seeing: **"Access blocked: Authorisation error - Error 401: invalid_client"**

This means your Google OAuth Client ID is not properly configured.

---

## ✅ Solution: Setup Google OAuth in 5 Steps

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Login with your Google account (`patel.dev3372@gmail.com`)

---

### Step 2: Create a New Project (if needed)
1. Click on the project dropdown at the top
2. Click "NEW PROJECT"
3. Name: `Team VioLencE` or `teamviolence`
4. Click "CREATE"

---

### Step 3: Enable Google+ API
1. Go to: https://console.cloud.google.com/apis/library
2. Search for: `Google+ API` or `Google Identity`
3. Click on it and click "ENABLE"

---

### Step 4: Create OAuth 2.0 Credentials

#### 4.1 Configure OAuth Consent Screen
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Select: **External** (for testing)
3. Click "CREATE"

**Fill in the form:**
- **App name:** Team VioLencE
- **User support email:** patel.dev3372@gmail.com
- **App logo:** (optional)
- **Application home page:** http://localhost:3000/teamviolence
- **Authorized domains:** 
  - `localhost` (for local development)
  - Your production domain (when deploying)
- **Developer contact:** patel.dev3372@gmail.com

4. Click "SAVE AND CONTINUE"
5. Skip "Scopes" (just click "SAVE AND CONTINUE")
6. Add test users: `patel.dev3372@gmail.com`
7. Click "SAVE AND CONTINUE"

#### 4.2 Create OAuth Client ID
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "CREATE CREDENTIALS" → "OAuth client ID"
3. Select: **Web application**

**Configure:**
- **Name:** Team VioLencE Web Client
- **Authorized JavaScript origins:**
  ```
  http://localhost:3000
  http://localhost:5000
  https://humble-eureka-jjqwqw5qgw46c5wvv-3000.app.github.dev
  ```
- **Authorized redirect URIs:**
  ```
  http://localhost:3000/teamviolence
  http://localhost:3000/teamviolence/login
  https://humble-eureka-jjqwqw5qgw46c5wvv-3000.app.github.dev/teamviolence
  https://humble-eureka-jjqwqw5qgw46c5wvv-3000.app.github.dev/teamviolence/login
  ```

4. Click "CREATE"

#### 4.3 Copy Your Credentials
You'll see a popup with:
- **Client ID:** `123456789-abc...xyz.apps.googleusercontent.com`
- **Client Secret:** `GOCSPX-...`

**COPY BOTH!** You'll need them.

---

### Step 5: Update Your Environment Variables

#### Backend (.env in `server/`)
```env
MONGODB_URI=mongodb://localhost:27017/teamviolence
JWT_SECRET=your_super_secret_jwt_key_change_this
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com
PORT=5000
NODE_ENV=development
```

#### Frontend (.env in `client/`)
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE.apps.googleusercontent.com
```

**⚠️ Important:** Replace `YOUR_ACTUAL_CLIENT_ID_HERE` with the actual Client ID you copied!

---

## 🚀 Restart Your Application

```bash
# Stop servers
./stop.sh

# Start servers
./start.sh
```

---

## 🧪 Test Google Sign-In

1. Go to: http://localhost:3000/teamviolence/login
2. Click "Sign in with Google"
3. Select your account: `patel.dev3372@gmail.com`
4. Should work now! ✅

---

## 🔍 Troubleshooting

### Still getting "Error 401: invalid_client"?

**Check:**
1. ✅ Client ID is correctly copied (no extra spaces)
2. ✅ .env files are saved
3. ✅ Servers are restarted
4. ✅ Using the correct environment file

**Verify Client ID:**
```bash
# Check backend
cat server/.env | grep GOOGLE_CLIENT_ID

# Check frontend
cat client/.env | grep VITE_GOOGLE_CLIENT_ID
```

### "Access blocked: This app's request is invalid"?

**Fix:**
- Add your email to test users in OAuth consent screen
- Make sure authorized origins/redirects include your current URL

---

## 📝 Quick Command Reference

```bash
# Check environment variables
cat server/.env
cat client/.env

# Restart application
./stop.sh && ./start.sh

# Check server status
./status.sh
```

---

## 🎯 Summary

1. ✅ Create Google Cloud Project
2. ✅ Enable Google+ API
3. ✅ Configure OAuth Consent Screen
4. ✅ Create OAuth Client ID
5. ✅ Add authorized origins/redirects
6. ✅ Copy Client ID to .env files
7. ✅ Restart application
8. ✅ Test login

---

## 📚 Resources

- Google Cloud Console: https://console.cloud.google.com/
- OAuth Setup Guide: https://developers.google.com/identity/protocols/oauth2
- React OAuth: https://www.npmjs.com/package/@react-oauth/google

---

**Need Help?** Check the error in browser console for more details.

**✅ Once configured, Google Sign-In will work perfectly!**
