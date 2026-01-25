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

const CLAN_LOGO = encodeURI('/uploads/team/Clan Logo.png')

const Home = () => {
  const stats = [
    { icon: FaTrophy, value: '50+', label: 'Tournaments Won' },
    { icon: FaGamepad, value: '1.2K+', label: 'Matches Played' },
    { icon: FaUsers, value: '20', label: 'Pro Players' },
    { icon: FaFire, value: '120K', label: 'Total Finishes' },
  ]

  const lineup = [
    { name: 'Dev Patel', role: 'IGL / Founder', image: '/uploads/team/Dev Patel.jpg', impact: 'Calls rotations that break defenses and clutch closes.' },
    { name: 'Umang Rana', role: 'Co-Leader / Flex IGL', image: '/uploads/team/Umang Rana.jpg', impact: 'Unpredictable IGL instincts with raw fragging power.' },
    { name: 'Aayush Panchal', role: 'Strategic Analyst', image: '/uploads/team/Aayush Panchal.webp', impact: 'Reads patterns, mid-round adjustments, and mental fortitude.' },
    { name: 'Purvang Pandya', role: 'Elite DMR Specialist', image: '/uploads/team/Purvang Pandya.jpg', impact: 'Precision long-range knocks that swing momentum instantly.' },
    { name: 'Karan Patel', role: 'Entry Fragger', image: '/uploads/team/Karan Patel.jpeg', impact: 'Cracks compounds and forces flawless trades.' },
    { name: 'Mehul Darji', role: 'Aggressive Scout & Co-Leader', image: '/uploads/team/Mehul Darji.jpg', impact: 'Leads info plays and zone breaks with composure.' },
    { name: 'Harsh Thakor', role: 'Support Anchor', image: '/uploads/team/Harsh Thakor.jpg', impact: 'Locks flanks and stabilizes every late circle.' },
  ]

  const slides = [
    {
      tag: 'Prime Drop',
      title: 'Cinematic esports built for BGMI.',
      subtitle: 'Rotations, clutches, and finishes presented like a premium series. Dive into every call and frag.',
      image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80'
    },
    {
      tag: 'LAN Ready',
      title: 'Tier-1 execution with fearless entries.',
      subtitle: 'Aggro takes, perfect refrags, and late-game ice. Made for stage lights and streams.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80'
    },
    {
      tag: 'Community First',
      title: 'Scrims, watch parties, and prime drops.',
      subtitle: 'Queue with us, learn our systems, and experience a high-gloss esports platform built for fans.',
      image: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1600&q=80'
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
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(3,7,18,0.92), rgba(3,7,18,0.88)), url(${slides[activeSlide].image})`
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-40" />
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
              <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-100 text-sm font-semibold">
                <FaBolt className="text-primary-400" />
                <span>{slides[activeSlide].tag}</span>
              </div>
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
                    <img
                      src={CLAN_LOGO}
                      alt="Team VioLencE"
                      className="h-16 w-16 rounded-full border border-primary-500/60 shadow-lg shadow-primary-900/40 object-contain bg-dark-900 p-2"
                    />
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
                        src={player.image}
                        alt={player.name}
                        className="h-12 w-12 rounded-full border-2 border-primary-500/60 shadow-lg shadow-primary-900/40 object-cover"
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

          <div className="mt-8 flex items-center gap-2">
            {slides.map((_, idx) => {
              const isActive = idx === activeSlide
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  aria-current={isActive}
                  className={`h-3 rounded-full transition-all duration-300 border ${
                    isActive
                      ? 'w-12 bg-primary-400 border-primary-300 shadow-[0_0_0_3px_rgba(59,130,246,0.25)]'
                      : 'w-3 bg-dark-800 border-dark-700 hover:border-primary-400'
                  }`}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Systems & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary-500/25 bg-gradient-to-br from-dark-900 via-dark-950 to-black p-6 sm:p-8">
          <div className="absolute -left-24 -top-24 w-72 h-72 bg-primary-500/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary-700/10 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-6 sm:gap-8 items-start">
            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">Signature System</h2>
                <span className="text-xs sm:text-sm text-primary-300 inline-flex items-center rounded-full px-3 py-1 bg-primary-500/10 border border-primary-500/30"><FaShieldAlt className="mr-2" /> Anti-tilt protocols</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="flex items-start gap-3 rounded-2xl border border-primary-500/15 bg-dark-900/60 p-4 hover:border-primary-400/50 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-primary-500/15 text-primary-200 flex items-center justify-center shrink-0">
                      <pillar.icon />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-100">{pillar.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary-500/20 bg-dark-900/70 p-5 sm:p-6 shadow-lg shadow-primary-900/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Live Form</p>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-gray-100">Numbers that matter</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-primary-500/15 text-primary-100 border border-primary-500/30">Updated</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-dark-700 bg-gradient-to-br from-dark-800 to-dark-900 p-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/15 text-primary-200 mb-3 text-base">
                      <stat.icon />
                    </div>
                    <div className="text-2xl font-black text-primary-200">{stat.value}</div>
                    <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournaments Rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">Live & upcoming</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">Featured Tournaments</h2>
          </div>
          <Link to="/tournaments" className="text-primary-300 hover:text-primary-200 font-semibold flex items-center text-xs sm:text-sm">
            See all <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {featuredTournaments.map((item) => (
            <div
              key={item.title}
              className="min-w-[260px] sm:min-w-[280px] md:min-w-[320px] snap-start glass-strong rounded-2xl p-4 sm:p-6 border-primary-500/25"
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${item.accent} mb-4`}>
                {item.type}
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-6">Prize pool, slots, and check-ins — all in one premium dashboard.</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Prize Pool</p>
                  <p className="text-lg font-semibold text-primary-200">{item.pool}</p>
                </div>
                <div>
                  <p className="text-gray-400">Slots</p>
                  <p className="text-lg font-semibold text-primary-200">{item.slots}</p>
                </div>
                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="text-lg font-semibold text-primary-200">{item.date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Format</p>
                  <p className="text-lg font-semibold text-primary-200">Squad TPP</p>
                </div>
              </div>
              <Link to="/tournaments" className="mt-6 inline-flex items-center text-primary-200 font-semibold">Register now <FaArrowRight className="ml-2" /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* Roster Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest">Prime roster</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">Faces behind the tag</h2>
          </div>
          <Link to="/team" className="text-primary-300 hover:text-primary-200 font-semibold flex items-center text-xs sm:text-sm">
            Full lineup <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lineup.map((player, idx) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-br from-dark-900 to-dark-950 hover:border-primary-500/40 transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all" />
              <img src={player.image} alt={player.name} className="h-56 sm:h-60 w-full object-cover" />
              <div className="p-5 space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{player.name}</h3>
                    <p className="text-primary-300 text-sm">{player.role}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-primary-500/15 text-primary-100 border border-primary-500/30">Core</span>
                </div>
                <p className="text-gray-400 text-sm">{player.impact}</p>
              </div>
            </motion.div>
          ))}
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
