# 🔐 Team VioLencE Authentication System

## Overview
Your website has a **complete authentication system** with login, registration, logout, and Google OAuth integration.

---

## 📋 **Why Login/Register Was Created**

The **Login/Register** pages serve these purposes:

1. **User Accounts**: Users can create accounts and maintain their profile
2. **Security**: Password-based authentication with JWT tokens (30-day expiry)
3. **Access Control**: Only authenticated users can access the Dashboard and exclusive content
4. **Data Persistence**: User information stored in MongoDB (name, email, phone, created date)
5. **Team Management**: Users can register for tournaments and join Team VioLencE
6. **Premium Experience**: Personalized dashboards and user-specific features

---

## 🔧 **Current Authentication Setup**

### **Frontend Architecture**
- **AuthContext** (React Context API)
- **Login.jsx** - Email/Password login + Google Sign-in button
- **Register.jsx** - Account creation form
- **ProtectedRoute.jsx** - Route protection middleware
- **Dashboard.jsx** - User profile dashboard

### **Backend Architecture**
- **JWT Tokens** - Secure token-based authentication
- **Bcrypt** - Password hashing (10 salt rounds)
- **Auth Routes** - `/api/auth/login`, `/api/auth/register`, `/api/auth/google`, `/api/auth/me`
- **Auth Middleware** - Protects private routes

### **Storage**
- **MongoDB** - User data (name, email, phone, password hash, role, timestamp)
- **LocalStorage** - JWT token (client-side)
- **Session** - Maintained via Authorization header

---

## 🚀 **How Authentication Works**

### **1️⃣ Registration Flow**
```
User fills Register form (name, email, phone, password)
         ↓
Backend hashes password with bcrypt
         ↓
User saved to MongoDB
         ↓
JWT token generated (30-day expiry)
         ↓
Token stored in localStorage
         ↓
User redirected to Dashboard
```

### **2️⃣ Login Flow**
```
User enters email & password
         ↓
Backend finds user by email
         ↓
Password compared with stored hash (bcrypt)
         ↓
If match → JWT token generated
         ↓
Token stored in localStorage
         ↓
User logged in to Dashboard
```

### **3️⃣ Logout Flow**
```
User clicks Logout
         ↓
Token removed from localStorage
         ↓
Authorization header cleared
         ↓
User redirected to Home
         ↓
Session ends
```

### **4️⃣ Google OAuth Flow (Setup Required)**
```
User clicks "Sign in with Google"
         ↓
Google returns ID token
         ↓
Backend verifies token with Google
         ↓
User found/created in database
         ↓
JWT token generated
         ↓
User logged in
```

---

## 🔑 **JWT Token Details**

- **Algorithm**: HS256 (HMAC SHA-256)
- **Expiration**: 30 days
- **Payload**: User ID
- **Stored**: Browser localStorage
- **Sent**: Authorization header (`Bearer {token}`)
- **Secret**: Stored in `.env` (JWT_SECRET)

---

## 📱 **User Data Model**

```javascript
{
  _id: ObjectId,
  name: String,          // Full name
  email: String,         // Unique email
  phone: String,         // Phone number
  password: String,      // Bcrypt hashed
  role: String,          // 'user' or 'admin' (default: 'user')
  googleId: String,      // Google OAuth ID (optional)
  createdAt: Date,       // Registration timestamp
  updatedAt: Date        // Last updated timestamp
}
```

---

## 🛡️ **Security Features**

✅ **Password Hashing** - Bcrypt with 10 salt rounds  
✅ **JWT Tokens** - Secure, time-limited tokens  
✅ **Protected Routes** - ProtectedRoute component validates auth  
✅ **CORS** - Server-side request validation  
✅ **Input Validation** - Email format, password strength checks  
✅ **Error Handling** - No sensitive info leaked in responses  
✅ **Token Refresh** - Auto-check on page load  

---

## 🔗 **Google OAuth Setup Instructions**

### **Step 1: Create Google OAuth Credentials**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web Application)
5. Add authorized redirect URIs:
   - `http://localhost:3000` (development)
   - `http://localhost:3000/teamviolence` (GitHub Pages)
   - Your production domain
6. Copy **Client ID**

### **Step 2: Add to Frontend (.env.local)**
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### **Step 3: Install Google OAuth Package**
```bash
npm install @react-oauth/google
```

### **Step 4: Wrap App with Google Provider**
In `main.jsx`:
```jsx
import { GoogleOAuthProvider } from '@react-oauth/google'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
  </GoogleOAuthProvider>
)
```

### **Step 5: Update Login.jsx**
```jsx
import { GoogleLogin } from '@react-oauth/google'

<GoogleLogin
  onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse.credential)}
  onError={() => toast.error('Google login failed')}
/>
```

### **Step 6: Backend Google Verification**
```bash
npm install google-auth-library
```

In `server/routes/auth.js`:
```javascript
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post('/google', async (req, res) => {
  const { googleToken } = req.body
  
  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    
    const payload = ticket.getPayload()
    const { email, name, picture } = payload
    
    // Find or create user
    let user = await User.findOne({ email })
    if (!user) {
      user = new User({ email, name, googleId: payload.sub })
      await user.save()
    }
    
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    
    res.json({ token, user })
  } catch (error) {
    res.status(400).json({ message: 'Invalid Google token' })
  }
})
```

### **Step 7: Add GOOGLE_CLIENT_ID to .env**
```
GOOGLE_CLIENT_ID=your_google_client_id_here
```

---

## 📝 **API Endpoints**

### **POST** `/api/auth/register`
Register new user
```json
Request:
{
  "name": "Dev Patel",
  "email": "dev@example.com",
  "phone": "9876543210",
  "password": "SecurePass123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "123...",
    "name": "Dev Patel",
    "email": "dev@example.com",
    "phone": "9876543210",
    "role": "user"
  }
}
```

### **POST** `/api/auth/login`
Login with email & password
```json
Request:
{
  "email": "dev@example.com",
  "password": "SecurePass123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### **POST** `/api/auth/google`
Login with Google OAuth
```json
Request:
{
  "googleToken": "eyJhbGc..."
}

Response:
{
  "token": "eyJhbGc...",
  "user": { ... }
}
```

### **GET** `/api/auth/me`
Get current user (requires token)
```
Headers: Authorization: Bearer {token}

Response:
{
  "id": "123...",
  "name": "Dev Patel",
  "email": "dev@example.com",
  ...
}
```

---

## 🎯 **User Flows**

### **Navbar Links Based on Auth State**

**When NOT logged in:**
- Home
- About
- Team
- Tournaments
- **Login** button

**When logged in:**
- Home
- About
- Team
- Tournaments
- Dashboard (user profile)
- **Logout** button

---

## ⚠️ **Common Issues & Solutions**

### **"MongoDB Connection Error"**
- Start MongoDB locally or use MongoDB Atlas
- Update connection string in `.env`

### **"Invalid credentials" on login**
- Check if user exists in database
- Verify password is correct

### **Token not persisting**
- Check if localStorage is enabled
- Verify token is being set on login

### **Google OAuth not working**
- Verify Google Client ID in .env
- Check OAuth 2.0 credentials in Google Cloud Console
- Ensure redirect URIs are whitelisted

---

## 🔄 **Testing Authentication**

### **Test Register**
1. Go to `/register`
2. Fill form with new email
3. Submit
4. Should redirect to Dashboard

### **Test Login**
1. Go to `/login`
2. Use registered email & password
3. Submit
4. Should redirect to Dashboard

### **Test Logout**
1. Click Logout in navbar
2. Should redirect to Home
3. Check localStorage is cleared

### **Test Protected Routes**
1. Without login, try accessing `/dashboard`
2. Should redirect to `/login`

---

## 📚 **Files Involved**

**Frontend:**
- `src/context/AuthContext.jsx` - Auth state management
- `src/pages/Login.jsx` - Login page
- `src/pages/Register.jsx` - Registration page
- `src/pages/Dashboard.jsx` - User dashboard
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/components/Navbar.jsx` - Navbar with auth buttons

**Backend:**
- `routes/auth.js` - Auth endpoints
- `models/User.js` - User schema
- `middleware/auth.js` - Auth middleware
- `.env` - JWT_SECRET, GOOGLE_CLIENT_ID

---

## ✅ **Next Steps**

1. ✅ Register functionality working
2. ✅ Login functionality working
3. ✅ Logout working
4. ⏳ Google OAuth - Follow setup guide above
5. ⏳ Email verification (optional)
6. ⏳ Password reset (optional)
7. ⏳ Two-factor authentication (optional)

---

**Questions?** Ask me anytime! 🚀
