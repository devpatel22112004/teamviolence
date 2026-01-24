# 🎯 Quick Start Guide - Team VioLencE

## Current Project Status

### ✅ **Completed Features**
1. **User Authentication**
   - Register with email/phone/password
   - Login with email/password  
   - Logout functionality
   - JWT tokens (30-day session)
   - Password hashing with bcrypt
   - Protected routes

2. **Beautiful UI/UX**
   - Premium design with modern effects
   - Sky blue gradient with black background
   - Responsive navbar with glossy pill buttons
   - Smooth animations and transitions
   - Professional color scheme

3. **Tournament System**
   - Browse all tournaments
   - Filter by free/paid
   - View tournament details (slots, prizes, date)
   - Register for tournaments
   - Real-time slot tracking
   - Registration confirmation

4. **Core Pages**
   - Home page with hero section
   - About us page
   - Team showcase
   - Tournaments listing
   - User dashboard (basic)

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Frontend: http://localhost:3000/teamviolence
# Backend: http://localhost:5000
```

---

## 📁 Project Structure

```
teamviolence/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── App.jsx        # Main app
│   │   └── index.css      # Global styles
│   └── package.json
│
├── server/                # Node.js backend
│   ├── routes/           # API endpoints
│   ├── models/           # MongoDB schemas
│   ├── middleware/       # Auth middleware
│   ├── index.js         # Server entry
│   └── package.json
│
├── AUTHENTICATION.md     # Auth system guide
├── TOURNAMENT_REGISTRATION.md  # Registration system guide
├── ROADMAP.md           # Future features
└── package.json         # Root dependencies
```

---

## 🔑 Key Files to Know

| File | Purpose |
|------|---------|
| `client/src/context/AuthContext.jsx` | User authentication state |
| `client/src/pages/Login.jsx` | Login page with email/password |
| `client/src/pages/Register.jsx` | Registration page |
| `client/src/pages/Tournaments.jsx` | Tournament listing & registration |
| `client/src/pages/Dashboard.jsx` | User profile & registrations |
| `client/src/components/Navbar.jsx` | Navigation with auth buttons |
| `server/routes/auth.js` | Login/register endpoints |
| `server/routes/tournaments.js` | Tournament endpoints |
| `client/src/index.css` | Global styles & Tailwind |

---

## 🎮 User Workflows

### **Registration Flow**
```
/register → Fill form → Submit → Token stored → /dashboard
```

### **Login Flow**
```
/login → Enter credentials → Submit → Token stored → /dashboard
```

### **Tournament Registration Flow**
```
/tournaments → Click "Register Now" → Fill team info → Confirm → Success
```

---

## 🔗 API Endpoints

### **Authentication**
```
POST   /api/auth/register      - Create new user
POST   /api/auth/login         - Login user
POST   /api/auth/google        - Google OAuth (setup needed)
GET    /api/auth/me            - Get current user (requires token)
```

### **Tournaments**
```
GET    /api/tournaments        - Get all tournaments
GET    /api/tournaments/:id    - Get single tournament
POST   /api/tournaments/:id/register - Register for tournament
```

### **Users**
```
GET    /api/users/registrations - Get user's tournament registrations
```

---

## 🛠️ Environment Variables

Create `.env` file in server directory:

```
MONGODB_URI=mongodb://localhost:27017/teamviolence
JWT_SECRET=your_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
GOOGLE_CLIENT_ID=your_google_oauth_id
NODE_ENV=development
PORT=5000
```

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tailwind CSS responsive classes
- ✅ Works on all screen sizes
- ✅ Touch-friendly buttons
- ✅ Optimized performance

---

## 🎨 Design System

**Colors:**
- Primary: Sky Blue (#0ea5e9)
- Accent: Orange (#f97316)
- Dark: Black (#10131a)
- Text: White (#ffffff)

**Typography:**
- Display: Montserrat (bold, headings)
- Body: Inter (regular, body text)

**Components:**
- btn-modern: Modern gradient button
- card-premium: Premium card with glass effect
- nav-link: Navbar pill buttons
- modal: Registration modal

---

## 🔐 Authentication Details

**JWT Token:**
- Expires in: 30 days
- Stored in: Browser localStorage
- Sent in: Authorization header
- Format: `Bearer {token}`

**Password Security:**
- Hashing: Bcrypt (10 salt rounds)
- Comparison: Safe bcrypt comparison
- Storage: Never stored in plain text

---

## 📊 Database Schema (MongoDB)

**User Schema:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (bcrypt hashed),
  role: String ('user' | 'admin'),
  googleId: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

**Tournament Schema:**
```javascript
{
  _id: ObjectId,
  title: String,
  mode: String,
  type: String ('free' | 'paid'),
  entryFee: Number,
  prizePool: Number,
  totalSlots: Number,
  registeredTeams: Number,
  date: Date,
  status: String ('open' | 'closed'),
  description: String,
  createdAt: Date
}
```

**Registration Schema:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  tournamentId: ObjectId,
  teamName: String,
  leaderName: String,
  members: [String],
  status: String ('active' | 'completed'),
  registeredAt: Date
}
```

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Start MongoDB locally or use MongoDB Atlas |
| Port 3000 already in use | Change port in vite.config.js |
| Port 5000 already in use | Kill process with `lsof -i :5000` |
| Styles not loading | Clear cache: `npm run build` |
| Token expired | Auto-refresh on app load via AuthContext |

---

## 📚 Documentation Files

- `AUTHENTICATION.md` - Complete auth system guide
- `TOURNAMENT_REGISTRATION.md` - Registration system guide  
- `ROADMAP.md` - Future features & priority list
- `README.md` - Project overview

---

## 🎯 Next Priority Features

1. **Enhanced Dashboard** - User profile, registration history, stats
2. **Payment Integration** - Razorpay for paid tournaments
3. **Team Management** - Create/manage teams and squads
4. **Leaderboards** - Global rankings and stats
5. **Admin Panel** - Manage tournaments and users
6. **Email Notifications** - Registration confirmations
7. **Real-time Updates** - WebSocket for live slot updates

---

## 💡 Pro Tips

- Use `toast` for user feedback (already configured)
- All API calls use axios with auto Authorization header
- Use Framer Motion for animations (already imported)
- Tailwind classes work globally (no CSS needed usually)
- Keep sensitive data in `.env` never in code
- Test authentication on `/dashboard` (protected route)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally
3. Commit with clear messages: `git commit -m "Add feature"`
4. Push to repository: `git push origin feature/name`
5. Create pull request on GitHub

---

## 📞 Need Help?

Check these docs in order:
1. `AUTHENTICATION.md` - For auth questions
2. `TOURNAMENT_REGISTRATION.md` - For tournament questions
3. `ROADMAP.md` - For feature planning
4. Code comments in files - For implementation details

---

**Happy Coding! 🚀**

Made with ❤️ by your Team VioLencE Development Team
