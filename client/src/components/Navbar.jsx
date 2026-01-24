import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaTrophy, FaUsers, FaInfoCircle, FaHome, FaUser, FaGamepad, FaSignOutAlt, FaCompass } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isInsideNav, setIsInsideNav] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()
  const { user, logout } = useAuth()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        const isInside = e.clientY >= rect.top && e.clientY <= rect.bottom
        setIsInsideNav(isInside)
        
        if (isInside) {
          setMousePos({ x: e.clientX, y: e.clientY - rect.top })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
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

  const NavLink = ({ link, isHome }) => {
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setHoverPos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      })
    }

    return (
      <Link to={link.path}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.09, y: -3 }}
          whileTap={{ scale: 0.96 }}
          className={`relative px-5 py-2.5 rounded-xl transition-all duration-300 group inline-flex items-center gap-3 ${
            isActive(link.path)
              ? isHome
                ? 'text-white'
                : 'text-primary-300'
              : isHome
              ? 'text-gray-200'
              : 'text-gray-300'
          }`}
        >
          {/* Cursor-tracking spotlight */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
            >
              <div
                className={`absolute w-32 h-32 rounded-full pointer-events-none ${
                  isHome ? 'bg-white/20' : 'bg-primary-400/20'
                } blur-2xl`}
                style={{
                  left: `${hoverPos.x + 50}px`,
                  top: `${hoverPos.y + 50}px`,
                  filter: 'blur(20px)',
                }}
              />
            </motion.div>
          )}

          {/* Premium gradient background on active/hover */}
          {(isActive(link.path) || isHovering) && (
            <motion.div
              layoutId={`nav-pill-${link.path}`}
              className={`absolute inset-0 rounded-xl ${
                isActive(link.path)
                  ? isHome
                    ? 'bg-gradient-to-br from-white/20 to-white/5 shadow-lg shadow-white/20'
                    : 'bg-gradient-to-br from-primary-500/20 to-primary-500/5 shadow-lg shadow-primary-500/30'
                  : isHome
                  ? 'bg-white/10 shadow-lg shadow-white/20'
                  : 'bg-primary-500/10 shadow-lg shadow-primary-500/25'
              }`}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
          )}

          {/* Border glow on hover */}
          <motion.div
            className={`absolute inset-0 rounded-xl border pointer-events-none ${
              isActive(link.path)
                ? isHome
                  ? 'border-white/40'
                  : 'border-primary-400/40'
                : isHome
                ? 'border-white/20'
                : 'border-primary-500/20'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />

          <motion.div
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="relative z-10"
          >
            <link.icon className="text-lg" />
          </motion.div>
          <span className="text-sm font-extrabold tracking-wide relative z-10">
            {link.name}
          </span>
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
        {/* Cursor-tracking ambient glow background - constrained to navbar */}
        {isInsideNav && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background: isHomePage && !scrolled
                ? `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 80%)`
                : `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(14,165,233,0.04), transparent 80%)`
            }}
            transition={{ default: { duration: 0 } }}
          />
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 gap-4 lg:gap-6">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center gap-3 group cursor-pointer">
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

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex justify-center items-center gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.path} link={link} isHome={isHomePage && !scrolled} />
              ))}
            </div>

            {/* Right Section - Prevent Overflow */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 overflow-hidden">
              {user ? (
                <>
                  <div className={`hidden lg:flex items-center gap-2 transition-colors duration-300 ${
                    isHomePage && !scrolled ? 'border-l border-white/20 pl-3 ml-0' : 'border-l border-dark-700 pl-3 ml-0'
                  }`}>
                    {dashboardLinks.map((link) => (
                      <Link key={link.path} to={link.path}>
                        <motion.div
                          whileHover={{ scale: 1.07, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          className={`relative px-3 py-2 rounded-xl transition-all duration-300 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 flex-shrink-0 ${
                            isActive(link.path)
                              ? isHomePage && !scrolled
                                ? 'text-white'
                                : 'text-primary-300'
                              : isHomePage && !scrolled
                              ? 'text-gray-200'
                              : 'text-gray-400'
                          }`}
                        >
                          {(isActive(link.path)) && (
                            <motion.div
                              layoutId={`dash-pill-${link.path}`}
                              className={`absolute inset-0 rounded-xl ${
                                isHomePage && !scrolled
                                  ? 'bg-white/15 shadow-lg shadow-white/15'
                                  : 'bg-primary-500/10 shadow-lg shadow-primary-500/20'
                              }`}
                              transition={{ type: 'spring', stiffness: 200 }}
                            />
                          )}
                          <motion.div whileHover={{ rotate: 12 }} className="relative z-10">
                            <link.icon className="text-sm flex-shrink-0" />
                          </motion.div>
                          <span className="relative z-10 whitespace-nowrap hidden xl:inline">{link.name}</span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className={`relative px-3 lg:px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 inline-flex items-center gap-2 flex-shrink-0 ${
                      isHomePage && !scrolled
                        ? 'text-white hover:text-gray-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                        : 'text-red-400 hover:text-red-300 drop-shadow-[0_0_12px_rgba(239,68,68,0.35)]'
                    }`}
                  >
                    <motion.div
                      className={`absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                        isHomePage && !scrolled ? 'bg-white/15' : 'bg-red-500/15'
                      }`}
                    />
                    <FaSignOutAlt className="text-base relative z-10 flex-shrink-0" />
                    <span className="hidden sm:inline relative z-10">Logout</span>
                  </motion.button>
                </>
              ) : (
                <Link to="/login" className="block flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 lg:px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 inline-flex items-center gap-2 ${
                      isHomePage && !scrolled
                        ? 'bg-gradient-to-r from-white to-gray-200 text-black drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]'
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white drop-shadow-[0_0_12px_rgba(14,165,233,0.35)]'
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
              className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
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
