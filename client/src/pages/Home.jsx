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

const Home = () => {
  const stats = [
    { icon: FaTrophy, value: '50+', label: 'Tournaments Won' },
    { icon: FaGamepad, value: '1.2K+', label: 'Matches Played' },
    { icon: FaUsers, value: '20', label: 'Pro Players' },
    { icon: FaFire, value: '120K', label: 'Total Finishes' },
  ]

  const lineup = [
    { name: 'Dev Patel', role: 'IGL / Assaulter', image: '/images/dev-patel.jpg', impact: 'Clutch calls. Relentless closes.' },
    { name: 'Harsh Thakor', role: 'Entry Fragger', image: '/images/harsh-thakor.jpg', impact: 'First in. First knock.' },
    { name: 'Karan Patel', role: 'Support', image: '/images/karan-patel.jpeg', impact: 'Anchor with unbreakable holds.' },
    { name: 'Mehul Darji', role: 'Scout', image: '/images/mehul-darji.jpg', impact: 'Reads rotations before they happen.' },
    { name: 'Purvang Pandya', role: 'Sniper', image: '/images/purvang-pandya.jpg', impact: 'DMR ice-cold openings.' },
    { name: 'Umang Rana', role: 'Flex', image: '/images/umang-rana.jpg', impact: 'Adaptive win-condition player.' },
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
                <p className="text-gray-400 uppercase tracking-[0.3em] text-xs mb-3">Team VioLencE</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.05]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-500 to-primary-700">{slides[activeSlide].title}</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                {slides[activeSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/tournaments" className="btn-primary text-lg inline-flex items-center">
                  <FaPlay className="mr-2" />
                  Watch & Register
                </Link>
                <Link to="/team" className="btn-secondary text-lg inline-flex items-center">
                  <FaUsers className="mr-2" />
                  Meet the Roster
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
                      src="/images/team-violence-logo.png"
                      alt="Team VioLencE"
                      className="h-16 w-16 rounded-2xl border border-primary-500/50 shadow-lg shadow-primary-900/40"
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

          <div className="mt-8 flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${idx === activeSlide ? 'w-10 bg-primary-400' : 'w-3 bg-gray-600'}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars + Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Signature System</h2>
              <span className="text-sm text-primary-300 flex items-center"><FaShieldAlt className="mr-2" /> Anti-tilt protocols</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="glass rounded-2xl p-5 border-primary-500/10 hover:border-primary-500/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/15 text-primary-200 flex items-center justify-center mb-4">
                    <pillar.icon />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border-primary-500/15">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-100">Numbers that matter</h3>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Live form</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-dark-900/80 rounded-xl p-4 border border-dark-800">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/15 text-primary-200 mb-2">
                    <stat.icon />
                  </div>
                  <div className="text-2xl font-bold text-primary-200">{stat.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tournaments Rail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Live & upcoming</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Featured Tournaments</h2>
          </div>
          <Link to="/tournaments" className="text-primary-300 hover:text-primary-200 font-semibold flex items-center text-sm">
            See all <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {featuredTournaments.map((item) => (
            <div
              key={item.title}
              className="min-w-[280px] md:min-w-[320px] snap-start glass-strong rounded-2xl p-6 border-primary-500/25"
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Prime roster</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Faces behind the tag</h2>
          </div>
          <Link to="/team" className="text-primary-300 hover:text-primary-200 font-semibold flex items-center text-sm">
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
              <img src={player.image} alt={player.name} className="h-52 w-full object-cover" />
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
        <div className="glass-strong rounded-3xl p-10 text-center border-primary-500/25">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-sm text-primary-200 uppercase tracking-[0.3em]">Prime drop</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Ready to queue with Team VioLencE?
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Secure your slot in our next event, scrim with the roster, and experience a studio-grade esports platform built for the spotlight.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/tournaments" className="btn-primary text-lg inline-flex items-center">
                <FaTrophy className="mr-2" /> View tournaments
              </Link>
              <Link to="/about" className="btn-secondary text-lg inline-flex items-center">
                <FaGamepad className="mr-2" /> Learn the story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
