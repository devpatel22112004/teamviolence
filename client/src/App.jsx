import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import SplashLoader from './components/SplashLoader'
import PageTransition from './components/PageTransition'
import ErrorBoundary from './components/ErrorBoundary'
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

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <SplashLoader />
        <div className="min-h-screen flex flex-col relative">
          <ScrollToTop behavior="auto" />
          <Navbar />
          <main id="main-content" className="flex-grow">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/discovery" element={<Discovery />} />
                <Route path="/violence-esports-tournaments" element={<ViolenceEsports />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/tournaments/:id" element={<TournamentDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/team-management"
                  element={
                    <ProtectedRoute>
                      <TeamManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-registrations"
                  element={
                    <ProtectedRoute>
                      <MyRegistrations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(11, 18, 32, 0.95)',
                color: '#fff',
                border: '1px solid rgba(34, 211, 238, 0.30)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.08)',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
              },
              success: {
                iconTheme: { primary: '#22d3ee', secondary: '#030712' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
