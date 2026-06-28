# 🎮 Team VioLencE — BGMI Esports Platform

A modern, premium tournament platform for **Team VioLencE**, a competitive BGMI (Battlegrounds Mobile India) esports clan. Browse tournaments, register your squad, explore the roster, and follow the clan's journey — all in a fast, animated, mobile-friendly web app.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Stack](https://img.shields.io/badge/stack-MERN-7c3aed.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🧩 Tech Stack

**Frontend** — React 18 · Vite · Tailwind CSS · Framer Motion · React Router v6 · Axios
**Backend** — Node.js · Express · MongoDB (Mongoose) · JWT auth · Google OAuth · Nodemailer · Multer

The whole app is JavaScript end-to-end. The frontend lives in `client/`, the API in `server/`.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- A MongoDB database (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- Git

### 1. Clone & install
```bash
git clone https://github.com/devpatel22112004/teamviolence.git
cd teamviolence

# Install root, server, and client dependencies
npm run install-all
```

### 2. Configure environment variables

**`server/.env`**
```env
MONGODB_URI=mongodb://localhost:27017/teamviolence
JWT_SECRET=change_this_to_a_long_random_string
PORT=5000
NODE_ENV=development

# Optional — only needed for the matching features
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com   # Google login
EMAIL_SERVICE=gmail                                                  # password-reset emails
EMAIL_USER=you@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**`client/.env`** (optional — only for Google login)
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

> Copy `server/.env.example` and `client/.env.example` as starting points.

### 3. Seed sample data (optional)
```bash
cd server && npm run seed && cd ..
```

### 4. Run it

```bash
# Runs the API (port 5000) and the frontend (port 3000) together
npm run dev
```

Then open **http://localhost:3000**.

> 💡 You can run just the frontend with `cd client && npm run dev` — useful for design work. Data-driven pages (tournaments) need the backend + MongoDB running to show content.

**Seeded test credentials**
- User: `user@test.com` / `user123`
- Admin: `admin@teamviolence.com` / `admin123`

---

## ✨ Features

**For players**
- 🏆 Browse tournaments with live countdown timers, prize breakdowns, and slot tracking
- 📝 Register a squad (free entry; paid entries are coordinated via WhatsApp/Instagram/YouTube)
- 👥 Manage your team registrations and view registration history
- 👤 Profile management with password change
- 🔐 Email/password auth, Google login, and OTP-based password reset

**For the clan**
- 🧑‍🤝‍🧑 Roster showcase (organizers & content creators) with detailed player profiles
- 🗺️ "The VioLencE Journey" interactive timeline
- 📈 SEO-optimized landing pages

**Design & UX**
- 🟣 Premium violet/neon visual theme
- 🌗 Light / dark mode toggle
- ✨ Animated hero, particle effects, smooth page transitions, skeleton loaders
- 📱 Mobile-responsive across phones, tablets, and desktop

---

## 📁 Project Structure

```
teamviolence/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/          # Navbar, Footer, ThemeToggle, Countdown, ParticleField, Skeleton, …
│   │   ├── pages/              # Home, Tournaments, Team, Discovery, Login, Dashboard, …
│   │   ├── context/           # AuthContext, ThemeContext
│   │   ├── App.jsx            # Routes + global providers
│   │   └── index.css         # Design system (theme tokens, components)
│   └── tailwind.config.js     # Color palette, animations
├── server/                     # Express API
│   ├── models/                # User, Tournament, Registration, TeamMember
│   ├── routes/                # auth, tournaments, team, users
│   ├── middleware/            # JWT auth + admin guard
│   ├── index.js               # Server entry
│   └── seed.js                # Database seeder
└── package.json                # Root scripts (dev, build, install-all)
```

---

## 🔧 Scripts

**Root**
```bash
npm run dev          # Run API + frontend together
npm run build        # Build the frontend for production
npm run install-all  # Install root + server + client deps
```

**Backend (`server/`)** — `npm run dev` (nodemon) · `npm start` · `npm run seed`
**Frontend (`client/`)** — `npm run dev` · `npm run build` · `npm run preview`

---

## 📡 Key API Endpoints

**Auth** — `POST /api/auth/register` · `POST /api/auth/login` · `POST /api/auth/google` · `POST /api/auth/forgot-password` · `POST /api/auth/verify-otp` · `POST /api/auth/reset-password`

**Tournaments** — `GET /api/tournaments` · `GET /api/tournaments/:id` · `POST /api/tournaments/:id/register` · `GET /api/tournaments/my/registrations` · admin: `POST|PUT|DELETE /api/tournaments/:id`

**Team** — `GET /api/team` · admin: `POST|PUT|DELETE /api/team/:id`

**Users** — `GET|PUT /api/users/profile` · `PUT /api/users/change-password` · `GET /api/users/registrations`

---

## 🛑 Troubleshooting

- **Tournaments page is empty** → the backend isn't running or `MONGODB_URI` is wrong. Start the API and check `server/.env`.
- **Port already in use** → stop the existing process, or change `PORT` / Vite's port.
- **Module not found** → run `npm run install-all`.

---

## 📝 License

MIT © **Dev Patel** — GitHub: [@devpatel22112004](https://github.com/devpatel22112004)

**Made with 💜 for the BGMI Esports community.**
