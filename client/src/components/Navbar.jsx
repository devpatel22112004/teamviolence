import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  FaBars, FaTimes, FaTrophy, FaUsers, FaHome, FaUser, FaGamepad,
  FaSignOutAlt, FaCompass, FaChevronDown, FaDiscord, FaWhatsapp
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import LazyImage from './LazyImage'
import { formatImagePath } from '../utils/images'
import Button from './ui/Button'
import Avatar from './ui/Avatar'

const CLAN_LOGO = '/Line_up/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navRef = useRef(null)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const { user, logout } = useAuth()
  const isHomePage = location.pathname === '/'

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const navLinks = [
    { name: 'Home',        path: '/',                              icon: FaHome },
    { name: 'Esports',     path: '/violence-esports-tournaments',  icon: FaGamepad },
    { name: 'Lineup',      path: '/team',                          icon: FaUsers },
    { name: 'Tournaments', path: '/tournaments',                   icon: FaTrophy },
    { name: 'Discover',    path: '/discovery',                     icon: FaCompass },
  ]

  const dashboardLinks = [
    { name: 'Dashboard',     path: '/dashboard',         icon: FaUser },
    { name: 'My Teams',      path: '/team-management',   icon: FaUsers },
    { name: 'Registrations', path: '/my-registrations',  icon: FaTrophy },
    { name: 'Profile',       path: '/profile',           icon: FaUser },
  ]

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname === path

  const NavLink = ({ link }) => {
    const [h, setH] = useState(false)
    const active = isActive(link.path)
    return (
      <Link
        to={link.path}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        className="relative inline-flex"
      >
        <motion.span
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={[
            'relative inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300',
            active ? 'text-white' : 'text-gray-300 hover:text-white',
          ].join(' ')}
        >
          {/* Animated background pill */}
          {(active || h) && (
            <motion.span
              layoutId="nav-pill"
              className={[
                'absolute inset-0 rounded-xl -z-10',
                active
                  ? 'bg-gradient-to-br from-cyan-500/20 to-violet-500/10 border border-cyan-400/40 shadow-glow-cyan'
                  : 'bg-white/[0.06] border border-white/10',
              ].join(' ')}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            />
          )}
          {/* Active underline */}
          {active && (
            <motion.span
              layoutId="nav-underline"
              className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-6 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 shadow-glow-cyan"
            />
          )}
          <link.icon className="text-base" />
          <span>{link.name}</span>
        </motion.span>
      </Link>
    )
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 shadow-glow-cyan pointer-events-none"
      />

      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isHomePage && !scrolled
            ? 'bg-transparent'
            : 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/30',
        ].join(' ')}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20 min-h-[80px] gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background: 'conic-gradient(from 0deg, #22d3ee, #a855f7, #ec4899, #22d3ee)', filter: 'blur(14px)' }} />
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-cyan-400/40 group-hover:border-cyan-400 bg-[#030712] shadow-glow-cyan"
                >
                  <LazyImage
                    src={formatImagePath(CLAN_LOGO)}
                    alt="Team VioLencE"
                    width={56}
                    height={56}
                    loading="eager"
                    className="w-full h-full object-cover scale-150"
                  />
                </motion.div>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-display font-black text-base sm:text-lg gradient-text-static">Team VioLencE</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 mt-0.5">ESPORTS</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => <NavLink key={link.path} link={link} />)}
            </div>

            {/* Right section */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {/* Quick socials */}
              <div className="hidden xl:flex items-center gap-2 mr-1">
                <a href="https://discord.gg/amN9D8SrN8" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-indigo-300 hover:border-indigo-400/40 hover:bg-indigo-500/10 transition-all"
                   aria-label="Discord">
                  <FaDiscord className="text-sm" />
                </a>
                <a href="https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/10 transition-all"
                   aria-label="WhatsApp">
                  <FaWhatsapp className="text-sm" />
                </a>
              </div>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-400/40 transition-all"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    <Avatar src={user.profilePicture} name={user.name} size="sm" ring="cyan" fallbackTone="cyan" />
                    <span className="text-sm font-bold text-white max-w-[120px] truncate">{user.name?.split(' ')[0] || 'Account'}</span>
                    <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FaChevronDown className="text-[10px] text-gray-400" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border border-white/10 bg-[#0b1220]/95 backdrop-blur-xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                          <Avatar src={user.profilePicture} name={user.name} size="md" ring="cyan" fallbackTone="cyan" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="py-1">
                          {dashboardLinks.map((link, i) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              onClick={() => setDropdownOpen(false)}
                              className={[
                                'flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors',
                                isActive(link.path)
                                  ? 'text-cyan-300 bg-cyan-500/10'
                                  : 'text-gray-300 hover:text-white hover:bg-white/[0.04]',
                                i !== 0 ? 'border-t border-white/[0.04]' : '',
                              ].join(' ')}
                            >
                              <link.icon className="text-sm" />
                              <span>{link.name}</span>
                            </Link>
                          ))}
                        </div>
                        <button
                          onClick={() => { setDropdownOpen(false); logout() }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-300 hover:bg-red-500/10 border-t border-white/5 transition-colors"
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="primary" size="md" iconLeft={<FaUser />}>Login</Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white"
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 top-20 bg-[#030712]/98 backdrop-blur-xl overflow-y-auto"
            >
              <div className="px-4 sm:px-6 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={[
                        'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all',
                        isActive(link.path)
                          ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/10 text-white border border-cyan-400/40'
                          : 'text-gray-300 hover:bg-white/[0.04] hover:text-white border border-transparent',
                      ].join(' ')}
                    >
                      <link.icon className="text-base text-cyan-400" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}

                {user && (
                  <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
                    <p className="px-4 py-2 text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Your Account</p>
                    {dashboardLinks.map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navLinks.length + i) * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={[
                            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                            isActive(link.path) ? 'text-cyan-300 bg-cyan-500/10' : 'text-gray-300 hover:bg-white/[0.04] hover:text-white',
                          ].join(' ')}
                        >
                          <link.icon className="text-sm" />
                          <span>{link.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
                  {user ? (
                    <Button variant="danger" fullWidth onClick={() => { logout(); setIsOpen(false) }} iconLeft={<FaSignOutAlt />}>
                      Logout
                    </Button>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                      <Button variant="primary" fullWidth iconLeft={<FaUser />}>Login</Button>
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-3 pt-4">
                    <a href="https://discord.gg/amN9D8SrN8" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300 hover:bg-indigo-500/20 transition-all"
                       aria-label="Discord">
                      <FaDiscord />
                    </a>
                    <a href="https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu" target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300 hover:bg-emerald-500/20 transition-all"
                       aria-label="WhatsApp">
                      <FaWhatsapp />
                    </a>
                  </div>
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
