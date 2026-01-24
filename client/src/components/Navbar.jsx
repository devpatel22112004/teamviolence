import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaTrophy, FaUsers, FaInfoCircle, FaHome, FaUser, FaGamepad, FaSignOutAlt, FaCompass } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Discover', path: '/about', icon: FaCompass },
    { name: 'Teams', path: '/team', icon: FaUsers },
    { name: 'Tournaments', path: '/tournaments', icon: FaTrophy },
  ]

  const dashboardLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FaUser },
    { name: 'My Teams', path: '/team-management', icon: FaUsers },
    { name: 'Registrations', path: '/my-registrations', icon: FaTrophy },
    { name: 'Profile', path: '/profile', icon: FaUser },
  ]

  const isActive = (path) => location.pathname === path

  const NavLink = ({ link, isHome }) => (
    <Link to={link.path}>
      <motion.div
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-300 group ${
          isActive(link.path)
            ? isHome
              ? 'text-white bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-600/40'
              : 'text-primary-400 bg-primary-500/15 border border-primary-500/40'
            : isHome
            ? 'text-gray-200 hover:text-white hover:bg-white/5 border border-white/10'
            : 'text-gray-300 hover:text-primary-300 border border-transparent'
        }`}
      >
        <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-all duration-300 ${
          isHome ? 'bg-white' : 'bg-primary-600'
        }`} />
        
        <motion.div
          whileHover={{ rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative z-10"
        >
          <link.icon className={`text-lg ${isActive(link.path) && isHome ? 'text-white' : ''}`} />
        </motion.div>
        <span className="text-sm font-bold relative z-10 tracking-wide">{link.name}</span>
        
        {isActive(link.path) && (
          <motion.div
            layoutId="navbar-active"
            className={`absolute -bottom-1.5 left-0 right-0 h-1 rounded-full ${
              isHome
                ? 'bg-white shadow-lg shadow-white/50'
                : 'bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg shadow-primary-600/40'
            }`}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
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
        className={`fixed w-full z-50 transition-all duration-500 ${
          isHomePage && !scrolled
            ? 'bg-transparent'
            : isHomePage && scrolled
            ? 'bg-black/70 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-white/10'
            : scrolled
            ? 'bg-dark-950/80 backdrop-blur-xl shadow-xl shadow-primary-900/5 border-b border-primary-500/10'
            : 'bg-dark-950/40 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative"
                >
                  <div className={`absolute -inset-2 rounded-xl blur opacity-0 group-hover:opacity-70 transition-all duration-300 ${
                    isHomePage && !scrolled
                      ? 'bg-gradient-to-r from-white to-gray-300'
                      : 'bg-gradient-to-r from-primary-600 to-primary-500'
                  }`} />
                  <div className={`relative rounded-lg p-2.5 border transition-all duration-300 ${
                    isHomePage && !scrolled
                      ? 'bg-white/5 border-white/30 group-hover:border-white/60'
                      : 'bg-dark-950 border-primary-500/40 group-hover:border-primary-500/80'
                  }`}>
                    <FaGamepad className={`text-xl transition-colors duration-300 ${
                      isHomePage && !scrolled ? 'text-white' : 'text-primary-500'
                    }`} />
                  </div>
                </motion.div>
                <div className="hidden sm:flex flex-col">
                  <span className={`text-xl font-display font-black leading-tight transition-colors duration-300 ${
                    isHomePage && !scrolled ? 'text-white' : 'gradient-text'
                  }`}>
                    Team VioLencE
                  </span>
                  <span className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                    isHomePage && !scrolled ? 'text-gray-300' : 'text-primary-400'
                  }`}>ESPORTS LEAGUE</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink key={link.path} link={link} isHome={isHomePage && !scrolled} />
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  <div className={`hidden lg:flex items-center space-x-1 transition-colors duration-300 ${
                    isHomePage && !scrolled ? 'border-l border-white/20 pl-2 ml-2' : 'border-l border-dark-700 pl-2 ml-2'
                  }`}>
                    {dashboardLinks.map((link) => (
                      <Link key={link.path} to={link.path}>
                        <motion.div
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-300 text-xs font-bold ${
                            isActive(link.path)
                              ? isHomePage && !scrolled
                                ? 'text-white bg-white/15 border border-white/30'
                                : 'text-primary-400 bg-primary-500/10 border border-primary-500/30'
                              : isHomePage && !scrolled
                              ? 'text-gray-200 hover:text-white border border-white/10 hover:bg-white/10'
                              : 'text-gray-400 hover:text-primary-400 border border-transparent hover:bg-dark-800/50'
                          }`}
                        >
                          <motion.div whileHover={{ rotate: 10 }}>
                            <link.icon />
                          </motion.div>
                          <span className="hidden xl:inline">{link.name}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                      isHomePage && !scrolled
                        ? 'text-white hover:text-gray-100 border border-white/20 hover:border-white/40 hover:bg-white/10'
                        : 'text-gray-300 hover:text-primary-400 border border-transparent hover:border-primary-500/30 hover:bg-dark-800'
                    }`}
                  >
                    <FaSignOutAlt className="text-base" />
                    <span className="hidden sm:inline">Logout</span>
                  </motion.button>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                      isHomePage && !scrolled
                        ? 'bg-gradient-to-r from-white to-gray-200 text-black hover:shadow-lg hover:shadow-white/50'
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-lg hover:shadow-primary-500/50'
                    }`}
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
              className={`md:hidden p-2.5 rounded-lg transition-all duration-300 ${
                isHomePage && !scrolled
                  ? 'text-white hover:text-gray-200 border border-white/20 hover:border-white/40 hover:bg-white/10'
                  : 'text-gray-300 hover:text-primary-500 border border-dark-700 hover:border-primary-500/30'
              }`}
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
              className={`md:hidden transition-all duration-300 border-t backdrop-blur-xl ${
                isHomePage && !scrolled
                  ? 'bg-black/70 border-white/10'
                  : 'bg-dark-950 border-primary-500/10'
              }`}
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
                          ? isHomePage && !scrolled
                            ? 'bg-white/15 text-white border border-white/30'
                            : 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                          : isHomePage && !scrolled
                          ? 'text-gray-200 hover:text-white hover:bg-white/10 border border-white/10'
                          : 'text-gray-300 hover:text-primary-400 hover:bg-dark-800 border border-transparent'
                      }`}
                    >
                      <motion.div whileHover={{ rotate: 10 }} className="text-lg">
                        <link.icon />
                      </motion.div>
                      <span className="font-bold">{link.name}</span>
                    </motion.div>
                  </Link>
                ))}

                {user && (
                  <>
                    <div className={`border-t pt-4 mt-4 space-y-2 transition-colors duration-300 ${
                      isHomePage && !scrolled ? 'border-white/20' : 'border-dark-700'
                    }`}>
                      <div className={`text-xs font-bold px-4 py-2 tracking-wider transition-colors duration-300 ${
                        isHomePage && !scrolled ? 'text-gray-300' : 'text-primary-400'
                      }`}>YOUR ACCOUNT</div>
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
                                ? isHomePage && !scrolled
                                  ? 'bg-white/15 text-white border border-white/30'
                                  : 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                                : isHomePage && !scrolled
                                ? 'text-gray-200 hover:text-white hover:bg-white/10 border border-white/10'
                                : 'text-gray-300 hover:text-primary-400 hover:bg-dark-800 border border-transparent'
                            }`}
                          >
                            <motion.div whileHover={{ rotate: 10 }} className="text-lg">
                              <link.icon />
                            </motion.div>
                            <span className="font-semibold text-sm">{link.name}</span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                <div className={`border-t pt-4 mt-4 space-y-2 transition-colors duration-300 ${
                  isHomePage && !scrolled ? 'border-white/20' : 'border-dark-700'
                }`}>
                  {user ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
                        isHomePage && !scrolled
                          ? 'bg-white/15 text-white hover:bg-white/25 border border-white/30'
                          : 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30'
                      }`}
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
                        className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
                          isHomePage && !scrolled
                            ? 'bg-white text-black hover:shadow-lg hover:shadow-white/50'
                            : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-lg hover:shadow-primary-500/50'
                        }`}
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
