import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Discovery from './pages/Discovery'
import Tournaments from './pages/Tournaments'
import TournamentDetails from './pages/TournamentDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TeamManagement from './pages/TeamManagement'
import MyRegistrations from './pages/MyRegistrations'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'

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
              <Routes>
                <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/discovery" element={<Discovery />} />
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
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151'
              }
            }}
          />
        </div>
      </Router>
      </AuthProvider>
  )
}

export default App
