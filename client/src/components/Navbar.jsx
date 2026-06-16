import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaTrophy, FaUsers, FaHome, FaUser, FaGamepad, FaSignOutAlt, FaCompass, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import LazyImage from './LazyImage'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navRef = useRef(null)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const { user, logout } = useAuth()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Esports', path: '/violence-esports-tournaments', icon: FaGamepad },
    { name: 'Lineup', path: '/team', icon: FaUsers },
    { name: 'Tournaments', path: '/tournaments', icon: FaTrophy },
    { name: 'Discover', path: '/discovery', icon: FaCompass },
  ]

  const dashboardLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FaUser },
    { name: 'My Teams', path: '/team-management', icon: FaUsers },
    { name: 'Registrations', path: '/my-registrations', icon: FaTrophy },
    { name: 'Profile', path: '/profile', icon: FaUser },
  ]

  const isActive = (path) => location.pathname === path

  const NavLink = ({ link, isHome }) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
      <Link to={link.path}>
        <motion.div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-5 py-2.5 rounded-xl transition-all duration-300 group inline-flex items-center gap-2.5 ${
            isActive(link.path)
              ? isHome
                ? 'text-white'
                : 'text-primary-300'
              : isHome
              ? 'text-gray-200'
              : 'text-gray-300'
          }`}
        >
          {/* Static hover glow (no movement) */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            >
              <div
                className={`absolute w-40 h-40 rounded-full pointer-events-none ${
                  isHome ? 'bg-white/30' : 'bg-primary-400/30'
                } blur-3xl`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </motion.div>
          )}

          {/* Premium glass + glow background */}
          {(isActive(link.path) || isHovering) && (
            <motion.div
              layoutId={`nav-pill-${link.path}`}
              className={`absolute inset-0 rounded-xl ${
                isActive(link.path)
                  ? isHome
                    ? 'bg-gradient-to-br from-white/30 to-white/10 shadow-xl shadow-white/40'
                    : 'bg-gradient-to-br from-primary-500/30 to-primary-500/10 shadow-xl shadow-primary-500/50'
                  : isHome
                  ? 'bg-white/20 shadow-lg shadow-white/30'
                  : 'bg-primary-500/20 shadow-lg shadow-primary-500/40'
              }`}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
          )}

          {/* Animated border glow on hover */}
          {isHovering && (
            <motion.div
              className={`absolute inset-0 rounded-xl border-2 pointer-events-none ${
                isHome ? 'border-white/60' : 'border-primary-400/60'
              }`}
              animate={{
                boxShadow: isHome
                  ? ['0 0 20px rgba(255,255,255,0.5)', '0 0 30px rgba(255,255,255,0.3)']
                  : ['0 0 20px rgba(14,165,233,0.5)', '0 0 30px rgba(14,165,233,0.3)']
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}

          <motion.div
            whileHover={{ rotate: 15, scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="relative z-10"
          >
            <link.icon className="text-lg" />
          </motion.div>
          <span className="text-sm font-extrabold tracking-wide relative z-10">{link.name}</span>
        </motion.div>
      </Link>
    )
  }

  return (
    <>
      <motion.nav
        ref={navRef}
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
        <div className="max-w-full mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 min-h-[80px] gap-6">
            {/* Logo - Fixed Width */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center gap-2 group cursor-pointer">
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
                  <div className={`relative rounded-lg overflow-hidden border transition-all duration-300 ${
                    isHomePage && !scrolled
                      ? 'bg-white/5 border-white/30 group-hover:border-white/60'
                      : 'bg-dark-950 border-primary-500/40 group-hover:border-primary-500/80'
                  }`}>
                    <LazyImage 
                      src="/Line_up/logo.png" 
                      alt="Team VioLencE Logo" 
                      width={56}
                      height={56}
                      loading="eager"
                      fetchpriority="high"
                      className="w-14 h-14 object-cover scale-150"
                    />
                  </div>
                </motion.div>
                <div className="flex flex-col min-w-fit">
                  <span className={`text-lg font-display font-black leading-tight transition-colors duration-300 ${
                    isHomePage && !scrolled ? 'text-white' : 'gradient-text'
                  }`}>
                    Team VioLencE
                  </span>
                  <span className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                    isHomePage && !scrolled ? 'text-gray-300' : 'text-primary-400'
                  }`}>ESPORTS</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex justify-center items-center gap-3 px-4">
              {navLinks.map((link) => (
                <NavLink key={link.path} link={link} isHome={isHomePage && !scrolled} />
              ))}
            </div>

            {/* Right Section - Always Visible */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
              {user ? (
                <>
                  {/* Dashboard Dropdown Button */}
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 font-bold text-sm group ${
                        isHomePage && !scrolled
                          ? 'bg-white/10 text-white border border-white/30 hover:bg-white/15'
                          : 'bg-dark-800/50 text-gray-300 border border-dark-700 hover:border-primary-500/50 hover:text-primary-300'
                      }`}
                    >
                      <FaUser className="text-base" />
                      <span>Account</span>
                      <motion.div
                        animate={{ rotate: dropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="text-xs" />
                      </motion.div>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border backdrop-blur-xl overflow-hidden z-50 ${
                            isHomePage && !scrolled
                              ? 'bg-black/80 border-white/20'
                              : 'bg-dark-900/95 border-primary-500/20'
                          }`}
                        >
                          <div className="py-2">
                            {dashboardLinks.map((link, index) => (
                              <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setDropdownOpen(false)}
                              >
                                <motion.div
                                  whileHover={{ x: 4 }}
                                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                                    isActive(link.path)
                                      ? isHomePage && !scrolled
                                        ? 'bg-white/15 text-white'
                                        : 'bg-primary-500/10 text-primary-400'
                                      : isHomePage && !scrolled
                                      ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                                      : 'text-gray-400 hover:bg-dark-800 hover:text-primary-300'
                                  } ${index !== dashboardLinks.length - 1 ? 'border-b border-dark-700/30' : ''}`}
                                >
                                  <link.icon className="text-sm flex-shrink-0" />
                                  <span className="text-sm font-semibold">{link.name}</span>
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Logout Button - Pill Shape */}
                  <motion.button
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={logout}
                    className={`relative px-3 py-3 rounded-full text-sm font-bold transition-all duration-300 inline-flex items-center justify-center flex-shrink-0 group w-12 h-12 backdrop-blur-md border-2 overflow-hidden ${
                      isHomePage && !scrolled
                        ? 'border-red-400/40 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]'
                        : 'border-red-500/50 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]'
                    }`}
                    title="Logout"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isHomePage && !scrolled 
                          ? 'bg-gradient-to-br from-red-500/30 to-red-600/20' 
                          : 'bg-gradient-to-br from-red-600/40 to-red-500/30'
                      }`}
                    />
                    
                    {/* Glowing border on hover */}
                    {isHomePage && !scrolled ? (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-400/60 opacity-0 group-hover:opacity-100"
                        animate={{
                          boxShadow: ['0 0 15px rgba(248,113,113,0.4)', '0 0 25px rgba(248,113,113,0.2)']
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    ) : (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-500/60 opacity-0 group-hover:opacity-100"
                        animate={{
                          boxShadow: ['0 0 15px rgba(239,68,68,0.5)', '0 0 25px rgba(239,68,68,0.3)']
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                    
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.3 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="relative z-10"
                    >
                      <FaSignOutAlt className={`text-lg ${isHomePage && !scrolled ? 'text-red-300' : 'text-red-400'}`} />
                    </motion.div>
                  </motion.button>
                </>
              ) : (
                <Link to="/login" className="block flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 lg:px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 group whitespace-nowrap ${
                      isHomePage && !scrolled
                        ? 'bg-gradient-to-r from-white to-gray-200 text-black drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white drop-shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                    }`}
                  >
                    <FaUser className="text-base flex-shrink-0" />
                    <span>Login</span>
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2.5 rounded-xl transition-all duration-300 justify-self-end ${
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
