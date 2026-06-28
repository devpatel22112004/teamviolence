import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Discovery from './pages/Discovery'
import Tournaments from './pages/Tournaments'
import TournamentDetails from './pages/TournamentDetails'
import ViolenceEsports from './pages/ViolenceEsports'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TeamManagement from './pages/TeamManagement'
import MyRegistrations from './pages/MyRegistrations'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'

const p = (Component) => (
  <PageTransition>
    <Component />
  </PageTransition>
)

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={p(Home)} />
        <Route path="/about" element={p(About)} />
        <Route path="/team" element={p(Team)} />
        <Route path="/discovery" element={p(Discovery)} />
        <Route path="/violence-esports-tournaments" element={p(ViolenceEsports)} />
        <Route path="/tournaments" element={p(Tournaments)} />
        <Route path="/tournaments/:id" element={p(TournamentDetails)} />
        <Route path="/login" element={p(Login)} />
        <Route path="/register" element={p(Register)} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-management"
          element={
            <ProtectedRoute>
              <PageTransition><TeamManagement /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-registrations"
          element={
            <ProtectedRoute>
              <PageTransition><MyRegistrations /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition><UserProfile /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="min-h-screen flex flex-col">
          {/* Ensure every route starts at the top */}
          <ScrollToTop behavior="smooth" />
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(21, 15, 38, 0.95)',
                color: '#f5f3ff',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                backdropFilter: 'blur(12px)'
              },
              success: { iconTheme: { primary: '#8b5cf6', secondary: '#fff' } },
              error: { iconTheme: { primary: '#e935e0', secondary: '#fff' } }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
