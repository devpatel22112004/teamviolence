import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaTrophy,
  FaGamepad,
  FaUsers,
  FaFire,
  FaPlay,
  FaCrown,
  FaBolt,
  FaShieldAlt,
  FaArrowRight
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CLAN_LOGO = '/Line_up/logo.png'

const formatImagePath = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  // Split path, encode each part, then rejoin to handle spaces properly
  return path.split('/').map(part => part ? encodeURIComponent(part) : part).join('/')
}

// Fallback image for loading errors
const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%231f2937" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%236b7280"%3EImage Loading%3C/text%3E%3C/svg%3E'
}

const Home = () => {
  const stats = [
    { icon: FaTrophy, value: '50+', label: 'Tournaments Won' },
    { icon: FaGamepad, value: '1.2K+', label: 'Matches Played' },
    { icon: FaUsers, value: '20', label: 'Pro Players' },
    { icon: FaFire, value: '120K', label: 'Total Finishes' },
  ]

  const lineup = [
    { name: 'Dev Patel', role: 'IGL / Founder', image: '/Line_up/Dev Patel.jpg', impact: 'Calls rotations that break defenses and clutch closes.' },
    { name: 'Umang Rana', role: 'Co-Leader / Flex IGL', image: '/Line_up/Umang Rana.jpg', impact: 'Unpredictable IGL instincts with raw fragging power.' },
    { name: 'Aayush Panchal', role: 'Strategic Analyst', image: '/Line_up/Aayush Panchal.webp', impact: 'Reads patterns, mid-round adjustments, and mental fortitude.' },
    { name: 'Purvang Pandya', role: 'Elite DMR Specialist', image: '/Line_up/Purvang Pandya.jpg', impact: 'Precision long-range knocks that swing momentum instantly.' },
    { name: 'Karan Patel', role: 'Entry Fragger', image: '/Line_up/karan-patel.jpeg', impact: 'Cracks compounds and forces flawless trades.' },
    { name: 'Mehul Darji', role: 'Aggressive Scout & Co-Leader', image: '/Line_up/Mehul Darji.jpg', impact: 'Leads info plays and zone breaks with composure.' },
    { name: 'Harsh Thakor', role: 'Support Anchor', image: '/Line_up/Harsh Thakor.jpg', impact: 'Locks flanks and stabilizes every late circle.' },
  ]

  const slides = [
    {
      tag: 'Swipe Layout 1',
      title: 'Modern Esports Experience',
      subtitle: 'Premium, cinematic, and built for the next generation.',
      image: formatImagePath('/Line_up/Home_Swipe_Layout.webp')
    },
    {
      tag: 'Swipe Layout 2',
      title: 'Elite Teamwork',
      subtitle: 'Synergy, strategy, and relentless execution.',
      image: formatImagePath('/Line_up/Home_Swipe_Layout2.webp')
    },
    {
      tag: 'Swipe Layout 3',
      title: 'Victory Awaits',
      subtitle: 'Join the journey. Witness greatness.',
      image: formatImagePath('/Line_up/Home_Swipe_Layout3.webp')
    },
  ]

  const [activeSlide, setActiveSlide] = useState(0)

  const featuredTournaments = [
    {
      title: 'Elite Masters Cup',
      pool: '₹25,000',
      date: 'Feb 05, 2026',
      type: 'Paid',
      slots: '18/25',
      accent: 'from-primary-500 to-primary-700',
    },
    {
      title: 'Pro League - S1',
      pool: '₹10,000',
      date: 'Jan 28, 2026',
      type: 'Paid',
      slots: '28/50',
      accent: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Weekly Squad Championship',
      pool: '₹5,000',
      date: 'Jan 25, 2026',
      type: 'Free',
      slots: '45/100',
      accent: 'from-emerald-500 to-teal-600',
    },
  ]

  const pillars = [
    { icon: FaCrown, title: 'Big Stage Ready', desc: 'Scrim to LAN polish with calm late-game discipline.' },
    { icon: FaBolt, title: 'Relentless Pace', desc: 'High-tempo entries with synchronized utility and refrags.' },
    { icon: FaShieldAlt, title: 'System Defense', desc: 'Layered setups, info nets, and denial rotations.' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="pt-20 space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[83vh] sm:min-h-[84vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(3,7,18,0.65), rgba(3,7,18,0.60)), url(${slides[activeSlide].image})`,
            backgroundPosition: '20% bottom',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary-500/20 blur-3xl" />
        <div className="absolute right-0 top-24 w-80 h-80 bg-primary-700/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
          >
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs mb-3">Team VioLencE</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-tight sm:leading-[1.05]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-500 to-primary-700">{slides[activeSlide].title}</span>
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl">
                {slides[activeSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link to="/tournaments" className="btn-primary text-sm sm:text-base lg:text-lg inline-flex items-center justify-center px-4 sm:px-6 py-3">
                  <FaPlay className="mr-2" />
                  <span className="whitespace-nowrap">Watch & Register</span>
                </Link>
                <Link to="/team" className="btn-secondary text-sm sm:text-base lg:text-lg inline-flex items-center justify-center px-4 sm:px-6 py-3">
                  <FaUsers className="mr-2" />
                  <span className="whitespace-nowrap">Meet the Roster</span>
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {['LAN ready', 'Tier-1 Scrims', 'Clutch Merch Drop', 'Prime community'].map((tag) => (
                  <span key={tag} className="pill text-xs uppercase tracking-wide">{tag}</span>
                ))}
              </div>
            </div>

            <div className="relative glass-strong rounded-3xl border-primary-500/30 p-6 overflow-hidden">
              <div className="absolute -right-20 -top-16 w-64 h-64 bg-primary-500/20 blur-3xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-primary-500/60 shadow-lg shadow-primary-900/40 bg-dark-900 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={formatImagePath(CLAN_LOGO)}
                        alt="Team VioLencE"
                        onError={handleImageError}
                        className="h-14 w-14 sm:h-18 sm:w-18 object-contain scale-110"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Prime Clan</p>
                      <p className="text-2xl font-display font-bold text-primary-200">VioLencE Collective</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-primary-500/15 text-primary-100 text-xs font-semibold border border-primary-500/30">BGMI</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[{ label: 'Aggression', value: '97%' }, { label: 'Team Sync', value: '95%' }, { label: 'Clutch Rate', value: '92%' }].map((item) => (
                    <div key={item.label} className="bg-dark-900/80 rounded-xl p-4 border border-dark-700/70">
                      <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                      <p className="text-2xl font-bold text-primary-300">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {lineup.slice(0, 5).map((player) => (
                      <img
                        key={player.name}
                        src={formatImagePath(player.image)}
                        alt={player.name}
                        onError={handleImageError}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-primary-500/60 shadow-lg shadow-primary-900/40 object-cover"
                      />
                    ))}
                    <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold border-2 border-primary-500/60">
                      +{Math.max(lineup.length - 5, 0)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Live viewers</p>
                    <p className="text-lg font-semibold text-primary-200">18.6K</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


        </div>
      </section>

      {/* Team Performance Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary-500/25 bg-gradient-to-br from-dark-900 via-dark-950 to-black p-6 sm:p-8 lg:p-10">
          <div className="absolute -left-24 -top-24 w-72 h-72 bg-primary-500/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary-700/10 blur-3xl" />
          <div className="relative space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-4 border-b border-primary-500/20">
              <div>
                <p className="text-xs sm:text-sm text-primary-300 uppercase tracking-widest mb-2">Live Performance</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-primary-200 via-primary-300 to-primary-400 bg-clip-text text-transparent">Team Excellence Metrics</h2>
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-primary-500/20 border border-emerald-500/30"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-emerald-300">Live Tracking</span>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Gameplay Pillars */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100 flex items-center gap-2">
                  <FaBolt className="text-primary-400" />
                  Signature Playstyle
                </h3>
                <div className="grid gap-3">
                  {pillars.map((pillar) => (
                    <motion.div 
                      key={pillar.title} 
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 rounded-xl border border-primary-500/15 bg-gradient-to-br from-dark-800/80 to-dark-900/80 p-4 hover:border-primary-400/40 hover:shadow-lg hover:shadow-primary-500/10 transition-all backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/10 text-primary-300 flex items-center justify-center shrink-0 border border-primary-500/20">
                        <pillar.icon className="text-lg" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h4 className="text-base font-semibold text-gray-100">{pillar.title}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats Showcase */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-display font-bold text-gray-100 flex items-center gap-2">
                  <FaTrophy className="text-amber-400" />
                  Career Achievements
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {stats.map((stat, idx) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group relative rounded-xl border border-primary-500/20 bg-gradient-to-br from-dark-800 to-dark-900 p-4 sm:p-5 hover:border-primary-400/50 hover:shadow-xl hover:shadow-primary-500/20 transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/10 text-primary-300 mb-3 border border-primary-500/20 group-hover:scale-110 transition-transform">
                          <stat.icon className="text-lg sm:text-xl" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-primary-200 to-primary-400 bg-clip-text text-transparent">{stat.value}</div>
                        <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournaments Rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <p className="text-xs sm:text-sm text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <FaTrophy className="text-primary-500" />
              Live & upcoming
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">Featured Tournaments</h2>
            <p className="text-sm sm:text-base text-gray-400 mt-2">Compete at the highest level. Register now.</p>
          </div>
          <Link to="/tournaments" className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105">
            See all <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {featuredTournaments.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group min-w-[280px] sm:min-w-[300px] md:min-w-[340px] snap-start relative overflow-hidden rounded-2xl border border-primary-500/25 bg-gradient-to-br from-dark-900 via-dark-950 to-black p-5 sm:p-6 hover:border-primary-400/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-primary-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.accent} mb-4 shadow-lg`}>
                  {item.type}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-gray-100 group-hover:text-primary-200 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">Join the action. Compete for glory and prizes in premium BGMI tournaments.</p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm mb-6">
                  <div className="p-3 rounded-lg bg-dark-800/60 border border-dark-700 group-hover:border-primary-500/30 transition-colors">
                    <p className="text-gray-400 text-xs mb-1">Prize Pool</p>
                    <p className="text-lg sm:text-xl font-bold text-primary-300">{item.pool}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-800/60 border border-dark-700 group-hover:border-primary-500/30 transition-colors">
                    <p className="text-gray-400 text-xs mb-1">Slots</p>
                    <p className="text-lg sm:text-xl font-bold text-primary-300">{item.slots}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-800/60 border border-dark-700 group-hover:border-primary-500/30 transition-colors">
                    <p className="text-gray-400 text-xs mb-1">Date</p>
                    <p className="text-base font-semibold text-gray-200">{item.date}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-800/60 border border-dark-700 group-hover:border-primary-500/30 transition-colors">
                    <p className="text-gray-400 text-xs mb-1">Format</p>
                    <p className="text-base font-semibold text-gray-200">Squad TPP</p>
                  </div>
                </div>
                <Link to="/tournaments" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm transition-all shadow-lg group-hover:shadow-primary-500/40">
                  Register now <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roster Spotlight - Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <p className="text-xs sm:text-sm text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <FaCrown className="text-amber-400" />
              Prime roster
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold bg-gradient-to-r from-gray-100 via-primary-200 to-primary-400 bg-clip-text text-transparent">Faces behind the tag</h2>
            <p className="text-sm sm:text-base text-gray-400 mt-2">Meet the legends. Click to unlock their full story.</p>
          </div>
          <Link to="/team" className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105">
            View Full Lineup <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Show only first 3 players as teaser on mobile, all on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {lineup.slice(0, 3).map((player, idx) => (
            <Link 
              to="/team"
              key={player.name}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-primary-500/20 bg-gradient-to-br from-dark-900 to-dark-950 hover:border-primary-500/60 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-primary-500/25"
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Image with blur on hover for suspense */}
                <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                  <img 
                    src={formatImagePath(player.image)} 
                    alt={player.name} 
                    onError={handleImageError} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75" 
                  />
                  {/* Suspense overlay hint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
                
                {/* Limited info to create suspense */}
                <div className="p-4 sm:p-5 space-y-2 sm:space-y-3 relative z-10">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold truncate group-hover:text-primary-300 transition-colors">{player.name}</h3>
                      <p className="text-primary-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">{player.role}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <motion.div 
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-500/20 border border-primary-500/40 flex items-center justify-center group-hover:bg-primary-500/30 group-hover:border-primary-500/60 transition-all"
                      >
                        <FaArrowRight className="text-primary-300 text-sm" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Teaser text - short version */}
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {player.impact.split('.')[0]}...
                  </p>
                  
                  {/* Call to action hint */}
                  <div className="flex items-center gap-2 text-primary-300 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></span>
                    Click to see full stats & story
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          
          {/* Mystery card for remaining players - creates suspense */}
          <Link to="/team">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-primary-500/30 bg-gradient-to-br from-dark-900 via-dark-950 to-primary-950/30 hover:border-primary-500/60 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-primary-500/25 h-full min-h-[300px] sm:min-h-[340px] md:min-h-[360px] lg:min-h-[380px]"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-900/20 opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)] animate-pulse" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-500/20 border-2 border-primary-500/40 flex items-center justify-center group-hover:bg-primary-500/30 group-hover:border-primary-500/60 transition-all"
                >
                  <FaUsers className="text-2xl sm:text-3xl text-primary-300" />
                </motion.div>
                
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xl sm:text-2xl font-display font-bold text-white">+{lineup.length - 3} More</p>
                  <p className="text-sm sm:text-base text-primary-300 font-semibold">Elite Players</p>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-400 max-w-[200px]">
                  Discover the full roster with detailed stats, roles, and impact analysis
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs sm:text-sm font-bold hover:from-primary-500 hover:to-primary-600 transition-all shadow-lg hover:shadow-primary-500/50 flex items-center gap-2"
                >
                  <span>View Full Lineup</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </Link>
        </div>
        
        {/* Mobile: Show teaser for remaining players */}
        <div className="mt-6 sm:hidden">
          <Link to="/team">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold hover:from-primary-500 hover:to-primary-600 transition-all shadow-lg hover:shadow-primary-500/50 flex items-center justify-center gap-3"
            >
              <FaUsers className="text-xl" />
              <span>View All {lineup.length} Players</span>
              <FaArrowRight />
            </motion.button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center border-primary-500/25">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-xs sm:text-sm text-primary-200 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Prime drop</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold px-2">
              Ready to queue with Team VioLencE?
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-2">
              Secure your slot in our next event, scrim with the roster, and experience a studio-grade esports platform built for the spotlight.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-2">
              <Link to="/tournaments" className="btn-primary text-sm sm:text-base lg:text-lg inline-flex items-center justify-center">
                <FaTrophy className="mr-2" /> <span>View tournaments</span>
              </Link>
              <Link to="/about" className="btn-secondary text-sm sm:text-base lg:text-lg inline-flex items-center justify-center">
                <FaGamepad className="mr-2" /> <span>Learn the story</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
