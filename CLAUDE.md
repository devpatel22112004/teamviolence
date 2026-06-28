# CLAUDE.md

Guidance for AI assistants (and developers) working in this repository.

## Project

**Team VioLencE** — a MERN esports platform for a competitive BGMI clan. Players browse tournaments, register squads, view the roster, and follow the clan's story. Visual identity: a dark, cinematic, **violet/magenta neon** theme.

- `client/` — React 18 + Vite + Tailwind frontend
- `server/` — Node + Express + MongoDB (Mongoose) API

## Run / build / verify

```bash
npm run dev            # root: runs API (5000) + client (3000) together
cd client && npm run dev      # frontend only (design work)
cd server && npm run dev      # API only (needs server/.env + MongoDB)
cd client && npm run build    # production build — ALWAYS run to verify changes compile
cd server && npm run seed     # seed sample data
```

Frontend dev runs on **http://localhost:3000** and proxies `/api` → `http://localhost:5000` (see `client/vite.config.js`).

### ⚠️ Tailwind config changes need a full dev-server restart
Editing `client/tailwind.config.js` (colors, etc.) is **not** picked up reliably by HMR — the generated utility classes can stay stale. After changing the Tailwind config or theme tokens, **restart the dev server** (and clear `client/node_modules/.vite`) or run a production build. A stale dev server is the usual reason "my color change isn't showing."

## Design system (read before any UI work)

The theme is centralized — **reuse it, don't hardcode colors**:

- **Theme tokens** live in `client/src/index.css` `:root` as CSS variables: `--brand` (violet), `--brand-2` (magenta), `--surface`, `--surface-border`, `--text-main`, `--text-muted`, `--bg-base`/`--bg-gradient`.
- **Tailwind palette** in `client/tailwind.config.js`: `primary-*` = violet, `accent-*` = magenta/fuchsia, `dark-*` = near-black violet-tinted. Use these instead of literal `cyan/blue/pink/teal` (those were removed for a unified look).
- **Reusable component classes** (defined in `index.css`): `.card`, `.card-modern`, `.card-premium`, `.card-interactive`, `.glass`, `.glass-strong`, `.btn-primary`, `.btn-secondary`, `.btn-modern`, `.gradient-text`, `.neon-glow`. Prefer these for new UI.
- **The site is dark-only.** There is no light mode (it was removed — the cinematic design relies on white text over dark imagery). Don't reintroduce a light theme without rewriting per-page text colors.
- Respect `prefers-reduced-motion` (handled globally in `index.css`). Keep animations cheap: avoid `background-attachment: fixed`, limit `backdrop-blur-3xl/2xl` and large `blur-3xl` counts.

### Shared UI components (`client/src/components/`)
`Navbar`, `Footer`, `ParticleField` (animated hero/auth background), `Countdown` (live tournament timer), `Skeleton`/`SkeletonCard`/`SkeletonGrid` (loaders), `PageTransition` (route fade/slide, wired via `AnimatePresence` in `App.jsx`), `LazyImage`, `ProtectedRoute`, `ScrollToTop`.

## Architecture notes

- **Auth**: JWT in `localStorage`, attached via axios default header in `client/src/context/AuthContext.jsx` (handles login/register/Google login + 2h inactivity session timeout). Backend guard: `server/middleware/auth.js` (`authMiddleware`, `adminMiddleware`).
- **Routing**: `client/src/App.jsx` — public + `ProtectedRoute`-guarded pages, all wrapped in `PageTransition`.
- **Models** (`server/models/`): `User`, `Tournament`, `Registration`, `TeamMember`.
- **API routes** (`server/routes/`): `auth`, `tournaments`, `team`, `users`.
- **Payments**: There is **no payment gateway**. Paid tournament registration is accepted with `paymentStatus: 'pending'` and users are told to pay manually via WhatsApp/Instagram/YouTube. (Razorpay was fully removed — don't re-add references.)
- Some content is **hardcoded mock data** (Home stats/lineup, Team fallback). Tournament data is DB-driven and needs the backend + MongoDB running, or those pages show empty/"unable to load".

## Conventions

- Match the existing style: functional components, Framer Motion for animation, `react-icons/fa`, `react-hot-toast` for notifications.
- After UI changes, **run `cd client && npm run build`** to confirm it compiles before declaring done.
- Plain JavaScript/JSX (no TypeScript).
