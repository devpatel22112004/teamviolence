import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaTrophy, FaUsers, FaInfoCircle, FaHome, FaUser, FaGamepad, FaSignOutAlt } from 'react-icons/fa'
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

  const dashboardLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FaUser },
    { name: 'My Teams', path: '/team-management', icon: FaUsers },
    { name: 'My Registrations', path: '/my-registrations', icon: FaTrophy },
    { name: 'Profile', path: '/profile', icon: FaUser },
  ]

  const isActive = (path) => location.pathname === path

  const NavLink = ({ link }) => (
    <Link to={link.path}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
          isActive(link.path)
            ? 'text-primary-500 bg-primary-500/10 border border-primary-500/30'
            : 'text-gray-300 hover:text-primary-400 border border-transparent'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 via-primary-600/0 to-primary-600/0 group-hover:from-primary-600/5 group-hover:via-primary-600/10 group-hover:to-primary-600/5 rounded-lg transition-all duration-300" />
        
        <link.icon className="text-base relative z-10" />
        <span className="text-sm font-semibold relative z-10">{link.name}</span>
        
        {isActive(link.path) && (
          <motion.div
            layoutId="navbar-active"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.div>
    </Link>
  )

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-950/80 backdrop-blur-xl shadow-xl shadow-primary-900/5 border-b border-primary-500/10'
            : 'bg-dark-950/40 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition-all duration-300" />
                  <div className="relative bg-dark-950 rounded-lg p-2.5 border border-primary-500/40 group-hover:border-primary-500/80 transition-all duration-300">
                    <FaGamepad className="text-primary-500 text-xl" />
                  </div>
                </motion.div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xl font-display font-black gradient-text leading-tight">
                    Team VioLencE
                  </span>
                  <span className="text-xs font-bold text-primary-400 tracking-widest">ESPORTS</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink key={link.path} link={link} />
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <div className="hidden lg:flex items-center space-x-1 border-l border-dark-700 pl-2 ml-2">
                    {dashboardLinks.map((link) => (
                      <Link key={link.path} to={link.path}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-300 text-xs font-semibold ${
                            isActive(link.path)
                              ? 'text-primary-400 bg-primary-500/10 border border-primary-500/30'
                              : 'text-gray-400 hover:text-primary-400 border border-transparent hover:bg-dark-800/50'
                          }`}
                        >
                          <link.icon />
                          <span className="hidden xl:inline">{link.name}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-primary-400 border border-transparent hover:border-primary-500/30 hover:bg-dark-800 transition-all duration-300"
                  >
                    <FaSignOutAlt className="text-base" />
                    <span className="hidden sm:inline">Logout</span>
                  </motion.button>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
                  >
                    <FaUser className="text-base" />
                    <span>Login</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 text-gray-300 hover:text-primary-500 border border-dark-700 rounded-lg hover:border-primary-500/30 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.div>
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
              transition={{ duration: 0.3 }}
              className="md:hidden bg-dark-950 border-t border-primary-500/10 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(link.path)
                          ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                          : 'text-gray-300 hover:text-primary-400 hover:bg-dark-800 border border-transparent'
                      }`}
                    >
                      <link.icon className="text-lg" />
                      <span className="font-semibold">{link.name}</span>
                    </motion.div>
                  </Link>
                ))}

                {user && (
                  <>
                    <div className="border-t border-dark-700 pt-4 mt-4 space-y-2">
                      <div className="text-xs font-semibold text-primary-400 px-4 py-2">YOUR ACCOUNT</div>
                      {dashboardLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                              isActive(link.path)
                                ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                                : 'text-gray-300 hover:text-primary-400 hover:bg-dark-800 border border-transparent'
                            }`}
                          >
                            <link.icon className="text-lg" />
                            <span className="font-semibold text-sm">{link.name}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                <div className="border-t border-dark-700 pt-4 mt-4 space-y-2">
                  {user ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 font-semibold transition-all duration-300"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </motion.button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
                      >
                        <FaUser />
                        <span>Login</span>
                      </motion.button>
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
