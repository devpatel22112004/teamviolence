import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaTrophy, FaUsers, FaInfoCircle, FaHome, FaUser, FaGamepad } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'About', path: '/about', icon: FaInfoCircle },
    { name: 'Team', path: '/team', icon: FaUsers },
    { name: 'Tournaments', path: '/tournaments', icon: FaTrophy },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Animated Background Blur */}
      {scrolled && (
        <div className="fixed inset-0 top-0 h-32 bg-gradient-to-b from-dark-950/80 to-transparent pointer-events-none z-40" />
      )}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`navbar fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'backdrop-blur-xl shadow-2xl shadow-primary-900/10' 
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300" />
                <div className="relative bg-dark-950 rounded-lg border border-primary-500/40 p-2 group-hover:border-primary-500/70 transition">
                  <FaGamepad className="text-primary-500 text-lg" />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <div className="text-2xl font-display font-black gradient-text">
                  Team VioLencE
                </div>
                <div className="text-xs text-primary-400 font-bold tracking-widest">ESPORTS</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link flex items-center space-x-2 text-sm font-semibold ${
                    isActive(link.path) ? 'active text-white' : 'text-gray-200'
                  }`}
                >
                  <link.icon className="text-lg" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side - Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-primary-400 transition-all hover:bg-dark-800/50"
                  >
                    <FaUser className="text-lg" />
                    <span>Dashboard</span>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="btn-secondary !py-2 !px-6 text-sm"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/login" 
                    className="btn-modern !py-2 !px-6 text-sm"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-primary-500 transition-colors p-2 hover:bg-dark-800 rounded-lg"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-950/95 backdrop-blur-xl border-t border-primary-500/20"
            >
              <div className="px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`nav-link flex items-center space-x-3 text-base font-semibold ${
                      isActive(link.path) ? 'active text-white' : 'text-gray-200'
                    }`}
                  >
                    <link.icon className="text-lg" />
                    <span>{link.name}</span>
                  </Link>
                ))}
                
                <div className="border-t border-dark-800 pt-4 mt-4 space-y-3">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-primary-400 hover:bg-dark-800"
                      >
                        <FaUser className="text-lg" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        className="btn-secondary w-full"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="btn-modern w-full block text-center"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar
