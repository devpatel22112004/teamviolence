# 🏗️ Architecture Overview - Team VioLencE Website

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER DEVICES                             │
│  🖥️ Desktop    💻 Laptop    📱 Mobile    📱 Tablet               │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ HTTPS
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Components:                                              │  │
│  │  • Navbar (animated)                                      │  │
│  │  • Footer (social links)                                  │  │
│  │  • Protected Routes                                       │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Pages:                                                   │  │
│  │  • Home (hero + stats)                                    │  │
│  │  • About (clan story)                                     │  │
│  │  • Team (player profiles)                                 │  │
│  │  • Tournaments (browse/filter)                            │  │
│  │  • Tournament Details (register/pay)                      │  │
│  │  • Login/Register                                         │  │
│  │  • Dashboard (user panel)                                 │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  State Management:                                        │  │
│  │  • Auth Context (JWT)                                     │  │
│  │  • React Router (navigation)                              │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Styling:                                                 │  │
│  │  • Tailwind CSS (utility-first)                           │  │
│  │  • Framer Motion (animations)                             │  │
│  │  • Custom theme (dark + red)                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ REST API (Axios)
                  │ /api/*
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   NODE.JS + EXPRESS BACKEND                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware:                                              │  │
│  │  • CORS (cross-origin)                                    │  │
│  │  • JWT Auth (protected routes)                            │  │
│  │  • Multer (file uploads)                                  │  │
│  │  • Body Parser (JSON)                                     │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Routes:                                                  │  │
│  │  • /api/auth (login, register, me)                        │  │
│  │  • /api/tournaments (CRUD + register + payment)           │  │
│  │  • /api/team (CRUD team members)                          │  │
│  │  • /api/users (profile, registrations)                    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Models (Mongoose):                                       │  │
│  │  • User (auth + profile)                                  │  │
│  │  • Tournament (details + status)                          │  │
│  │  • Registration (team + payment)                          │  │
│  │  • TeamMember (players + stats)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────┬─────────────────────────────────┬───────────────────────┘
        │                                 │
        │ Mongoose                        │ Razorpay API
        │ Connection                      │ (Payments)
        ▼                                 ▼
┌──────────────────────┐     ┌──────────────────────────┐
│   MONGODB DATABASE   │     │   RAZORPAY GATEWAY       │
│                      │     │                          │
│  Collections:        │     │  • Payment Processing    │
│  • users             │     │  • Order Creation        │
│  • tournaments       │     │  • Verification          │
│  • registrations     │     │  • Test/Live Mode        │
│  • teammembers       │     │  • Webhooks             │
│                      │     │                          │
│  Features:           │     │  Test Card:              │
│  • Indexes           │     │  4111 1111 1111 1111     │
│  • Relationships     │     └──────────────────────────┘
│  • Validation        │
└──────────────────────┘
```

---

## Data Flow Diagrams

### 1. User Registration Flow

```
┌─────────┐    ┌──────────┐    ┌─────────┐    ┌──────────┐
│  User   │───▶│ Register │───▶│  API    │───▶│ MongoDB  │
│         │    │   Form   │    │ /auth/  │    │  users   │
└─────────┘    └──────────┘    │register │    │  table   │
                                └────┬────┘    └──────────┘
                                     │
                                     ▼
                                ┌─────────┐
                                │  Hash   │
                                │Password │
                                │(bcrypt) │
                                └────┬────┘
                                     │
                                     ▼
                                ┌─────────┐
                                │Generate │
                                │  JWT    │
                                │  Token  │
                                └────┬────┘
                                     │
                                     ▼
                                ┌─────────┐
                                │ Return  │
                                │ Token + │
                                │  User   │
                                └─────────┘
```

### 2. Tournament Registration Flow (Paid)

```
┌─────────┐  Select    ┌──────────────┐
│  User   │ Tournament │ Tournament   │
│         │───────────▶│ Details Page │
└─────────┘            └──────┬───────┘
                              │
                        Fill Form
                              │
                              ▼
                       ┌──────────────┐
                       │ Registration │
                       │     Form     │
                       │              │
                       │ • Team Name  │
                       │ • Leader     │
                       │ • 4 Players  │
                       └──────┬───────┘
                              │
                        Click Pay
                              │
                              ▼
                       ┌──────────────┐    ┌─────────────┐
                       │    Backend   │───▶│  Razorpay   │
                       │ Create Order │    │Create Order │
                       └──────┬───────┘    └──────┬──────┘
                              │                   │
                              │◀──────────────────┘
                              │   Order ID
                              ▼
                       ┌──────────────┐
                       │   Razorpay   │
                       │    Popup     │
                       │              │
                       │ Enter Card   │
                       │   Details    │
                       └──────┬───────┘
                              │
                        Payment Success
                              │
                              ▼
                       ┌──────────────┐
                       │   Backend    │
                       │   Verify     │
                       │  Signature   │
                       └──────┬───────┘
                              │
                         Valid?
                              │
                    ┌─────────┴─────────┐
                    │                   │
                  YES                  NO
                    │                   │
                    ▼                   ▼
            ┌──────────────┐    ┌──────────┐
            │   Save to    │    │  Return  │
            │   MongoDB    │    │  Error   │
            │              │    └──────────┘
            │ • Registration│
            │ • Payment ID  │
            │ • Status: OK  │
            └──────┬───────┘
                   │
                   ▼
            ┌──────────────┐
            │  Redirect    │
            │ to Dashboard │
            │              │
            │Show Success  │
            └──────────────┘
```

### 3. Authentication Flow

```
┌─────────┐
│  User   │
│ Enters  │
│  Site   │
└────┬────┘
     │
     ▼
┌─────────────┐
│ Check       │◀────────┐
│ localStorage│         │
│ for Token   │         │
└────┬────────┘         │
     │                  │
  Token?                │
     │                  │
  ┌──┴──┐               │
 YES   NO               │
  │     │               │
  │     └──────▶ Guest Mode
  │
  ▼
┌──────────┐
│ Verify   │
│  Token   │
│ with API │
└────┬─────┘
     │
  Valid?
     │
  ┌──┴──┐
 YES   NO
  │     │
  │     └──────▶ Logout
  │              Clear Token
  │              Redirect Login
  │
  ▼
┌──────────┐
│ Set User │
│  State   │
│          │
│ Allow    │
│ Access   │
└──────────┘
```

---

## Component Hierarchy

```
App.jsx
├── Router
│   ├── AuthProvider (Context)
│   │
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   ├── User Menu
│   │   └── Mobile Menu
│   │
│   ├── Routes
│   │   │
│   │   ├── Home
│   │   │   ├── Hero Section
│   │   │   ├── Stats Section
│   │   │   ├── About Preview
│   │   │   └── CTA Section
│   │   │
│   │   ├── About
│   │   │   ├── Story Section
│   │   │   ├── Values Cards
│   │   │   └── Achievements
│   │   │
│   │   ├── Team
│   │   │   └── Team Member Cards
│   │   │       ├── Image
│   │   │       ├── Stats
│   │   │       └── Social Links
│   │   │
│   │   ├── Tournaments
│   │   │   ├── Filter Tabs
│   │   │   └── Tournament Cards
│   │   │       ├── Details
│   │   │       ├── Progress Bar
│   │   │       └── Register Button
│   │   │
│   │   ├── TournamentDetails
│   │   │   ├── Tournament Info
│   │   │   ├── Stats Grid
│   │   │   └── Registration Form
│   │   │       ├── Team Fields
│   │   │       └── Payment Button
│   │   │
│   │   ├── Login
│   │   │   └── Login Form
│   │   │
│   │   ├── Register
│   │   │   └── Register Form
│   │   │
│   │   └── Dashboard (Protected)
│   │       ├── User Info Card
│   │       └── Registrations List
│   │
│   ├── Footer
│   │   ├── Brand Info
│   │   ├── Quick Links
│   │   ├── Social Icons
│   │   └── Copyright
│   │
│   └── Toast Notifications
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  React, Tailwind CSS, Framer Motion     │
│  • User Interface                       │
│  • Animations                           │
│  • Responsive Design                    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         APPLICATION LAYER               │
│  React Components, Context API          │
│  • Business Logic                       │
│  • State Management                     │
│  • Routing                              │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         API LAYER                       │
│  Axios, REST API                        │
│  • HTTP Requests                        │
│  • Error Handling                       │
│  • Token Management                     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         SERVER LAYER                    │
│  Node.js, Express                       │
│  • Request Handling                     │
│  • Middleware                           │
│  • Authentication                       │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         DATA ACCESS LAYER               │
│  Mongoose ODM                           │
│  • Schema Definition                    │
│  • Queries                              │
│  • Relationships                        │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         DATABASE LAYER                  │
│  MongoDB                                │
│  • Data Storage                         │
│  • Indexing                             │
│  • Replication                          │
└─────────────────────────────────────────┘
```

---

## Security Architecture

```
┌────────────────────────────────────────────┐
│              FRONTEND                      │
│                                            │
│  1. Input Validation                       │
│  2. XSS Prevention                         │
│  3. Token Storage (localStorage)           │
│  4. HTTPS Only                             │
└────────────┬───────────────────────────────┘
             │
             │ Encrypted Connection
             ▼
┌────────────────────────────────────────────┐
│              BACKEND                       │
│                                            │
│  1. JWT Verification                       │
│  2. Password Hashing (bcrypt)              │
│  3. CORS Configuration                     │
│  4. Rate Limiting                          │
│  5. Input Sanitization                     │
│  6. Role-Based Access                      │
└────────────┬───────────────────────────────┘
             │
             │ Secure Connection
             ▼
┌────────────────────────────────────────────┐
│            DATABASE                        │
│                                            │
│  1. Encrypted at Rest                      │
│  2. Access Control                         │
│  3. Backup & Recovery                      │
│  4. IP Whitelist                           │
└────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│               INTERNET                          │
└──────────┬──────────────────┬───────────────────┘
           │                  │
    DNS Records          DNS Records
           │                  │
           ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│     VERCEL       │  │     RENDER       │
│   (Frontend)     │  │    (Backend)     │
│                  │  │                  │
│  • CDN Edge      │  │  • Node.js       │
│  • Auto HTTPS    │  │  • Auto Deploy   │
│  • Env Vars      │  │  • Env Vars      │
└──────────────────┘  └────────┬─────────┘
                               │
                               │ Secure Connection
                               ▼
                      ┌─────────────────┐
                      │  MONGODB ATLAS  │
                      │   (Database)    │
                      │                 │
                      │  • Replica Set  │
                      │  • Auto Backup  │
                      │  • Monitoring   │
                      └─────────────────┘

External Services:
┌──────────────────┐
│    RAZORPAY      │
│  (Payments)      │
│                  │
│  • Gateway       │
│  • Webhooks      │
└──────────────────┘
```

---

## File Structure Visualization

```
teamviolence/
│
├─📁 client/                    Frontend React App
│  ├─📁 public/                 Static files
│  ├─📁 src/
│  │  ├─📁 components/          Reusable components
│  │  │  ├─📄 Navbar.jsx       ⭐ Navigation
│  │  │  ├─📄 Footer.jsx       ⭐ Footer
│  │  │  └─📄 ProtectedRoute   ⭐ Auth guard
│  │  ├─📁 context/
│  │  │  └─📄 AuthContext.jsx  🔐 Auth state
│  │  ├─📁 pages/               Page components
│  │  │  ├─📄 Home.jsx         🏠 Landing
│  │  │  ├─📄 About.jsx        ℹ️ About
│  │  │  ├─📄 Team.jsx         👥 Team
│  │  │  ├─📄 Tournaments.jsx  🏆 List
│  │  │  ├─📄 TournamentDetails 📋 Details
│  │  │  ├─📄 Login.jsx        🔑 Login
│  │  │  ├─📄 Register.jsx     📝 Signup
│  │  │  └─📄 Dashboard.jsx    📊 User panel
│  │  ├─📄 App.jsx             🎯 Main app
│  │  ├─📄 main.jsx            🚀 Entry
│  │  └─📄 index.css           🎨 Styles
│  ├─📄 index.html             📄 HTML
│  ├─📄 vite.config.js         ⚙️ Vite config
│  ├─📄 tailwind.config.js     🎨 Tailwind
│  ├─📄 .env                   🔒 Env vars
│  └─📄 package.json           📦 Dependencies
│
├─📁 server/                    Backend Express API
│  ├─📁 models/                 Database schemas
│  │  ├─📄 User.js             👤 User schema
│  │  ├─📄 Tournament.js       🏆 Tournament
│  │  ├─📄 Registration.js     📋 Registration
│  │  └─📄 TeamMember.js       👥 Team member
│  ├─📁 routes/                 API endpoints
│  │  ├─📄 auth.js             🔐 Auth routes
│  │  ├─📄 tournaments.js      🏆 Tournament API
│  │  ├─📄 team.js             👥 Team API
│  │  └─📄 users.js            👤 User API
│  ├─📁 middleware/
│  │  └─📄 auth.js             🔒 JWT verify
│  ├─📁 uploads/               📸 File storage
│  │  └─📁 team/
│  ├─📄 index.js               🚀 Server entry
│  ├─📄 seed.js                🌱 Sample data
│  ├─📄 .env                   🔒 Env vars
│  ├─📄 .env.example           📝 Template
│  └─📄 package.json           📦 Dependencies
│
├─📁 Documentation/
│  ├─📄 README.md              📖 Main docs
│  ├─📄 QUICKSTART.md          ⚡ Quick setup
│  ├─📄 DEPLOYMENT.md          🚀 Deploy guide
│  ├─📄 SETUP_GUIDE.md         🔧 Detailed setup
│  ├─📄 PROJECT_SUMMARY.md     📝 Overview
│  ├─📄 CHECKLIST.md           ✅ Checklist
│  ├─📄 ARCHITECTURE.md        🏗️ This file
│  └─📄 CONTRIBUTING.md        🤝 Contribute
│
├─📄 setup.sh                  🔧 Setup script
├─📄 package.json              📦 Root package
└─📄 .gitignore                🚫 Git ignore
```

---

## Request/Response Flow Example

### Example: Register for Tournament

```
1. USER CLICKS "REGISTER" BUTTON
   └─▶ TournamentDetails.jsx

2. FORM SUBMISSION
   └─▶ handleRegister(e)
       └─▶ Check if user logged in
           └─▶ If not: redirect to /login
           └─▶ If yes: continue

3. API CALL (if paid tournament)
   └─▶ axios.post('/api/tournaments/:id/register', teamData)
       └─▶ Headers: { Authorization: 'Bearer JWT_TOKEN' }
       └─▶ Body: { teamName, teamLeader, players }

4. BACKEND RECEIVES REQUEST
   └─▶ Express routes/tournaments.js
       └─▶ Middleware: authMiddleware
           └─▶ Verify JWT token
           └─▶ Extract user from token
           └─▶ Attach to req.user

5. CONTROLLER LOGIC
   └─▶ Find tournament by ID
   └─▶ Check if slots available
   └─▶ Check if user already registered
   └─▶ Calculate amount (entry fee)

6. CREATE RAZORPAY ORDER
   └─▶ razorpay.orders.create({
       amount: fee * 100,
       currency: 'INR'
   })
   └─▶ Get order_id back

7. RETURN ORDER TO FRONTEND
   └─▶ res.json({ orderId, amount, currency })

8. FRONTEND RECEIVES ORDER
   └─▶ Initialize Razorpay popup
   └─▶ window.Razorpay({
       key: RAZORPAY_KEY,
       order_id: orderId,
       handler: onSuccess
   })

9. USER COMPLETES PAYMENT
   └─▶ Enter card details
   └─▶ Razorpay processes
   └─▶ Returns: payment_id, order_id, signature

10. VERIFY PAYMENT
    └─▶ axios.post('/api/tournaments/:id/verify-payment', {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        teamData
    })

11. BACKEND VERIFICATION
    └─▶ Create signature hash
    └─▶ Compare with Razorpay signature
    └─▶ If valid: Save registration
    └─▶ Update tournament count
    └─▶ Return success

12. REDIRECT TO DASHBOARD
    └─▶ navigate('/dashboard')
    └─▶ Show success toast
    └─▶ Registration visible in list
```

---

This architecture document provides a complete visual overview of how the Team VioLencE website is structured and how data flows through the system.

**Key Takeaways:**
- Modern MERN stack architecture
- Secure payment integration
- RESTful API design
- Component-based frontend
- Scalable database design
- Production-ready deployment

For implementation details, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
