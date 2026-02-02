import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFire, FaTrophy, FaUsers, FaRocket, FaChartLine, FaStar, FaCheck, FaArrowRight, FaGamepad } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Discovery = () => {
  const [activeYear, setActiveYear] = useState('2025')

  const journey = [
    {
      year: '2019',
      title: '🌱 Genesis - The Basement Dreams',
      phase: 'STRUGGLE TO SURVIVAL',
      summary: 'Where it all began. A group of passionate gamers with nothing but love for the game.',
      highlights: [
        'Zero budget, pure passion',
        'Competing as individuals',
        'Learning the ropes of esports',
        'Building initial community'
      ],
      stats: { events: '2', members: '5', investment: '₹0' },
      color: 'from-orange-500 to-red-500',
      gradient: 'via-orange-700'
    },
    {
      year: '2020',
      title: '💪 Pandemic Pivot - The Online Revolution',
      phase: 'GRIND TO GROWTH',
      summary: 'When the world locked down, we leveled up. Online tournaments became our playground.',
      highlights: [
        'First organized online tournaments',
        'Self-funded with personal savings',
        'Growing player base weekly',
        'Building credibility in community'
      ],
      stats: { events: '12', members: '150', investment: '₹50K' },
      color: 'from-yellow-500 to-orange-500',
      gradient: 'via-yellow-600'
    },
    {
      year: '2021-2022',
      title: '🚀 Breakthrough - Recognition Arrives',
      phase: 'GROWTH TO PROFESSIONALISM',
      summary: 'Hard work pays off. First sponsor deals, first real prize pools, first pro teams.',
      highlights: [
        'First ₹1L+ prize pool tournament',
        'Professional team formations',
        'Sponsor partnerships',
        'Streaming infrastructure setup'
      ],
      stats: { events: '24', members: '800', investment: '₹5L' },
      color: 'from-green-500 to-cyan-500',
      gradient: 'via-green-600'
    },
    {
      year: '2023-2024',
      title: '👑 Premium Era - The Big League',
      phase: 'PROFESSIONAL TO PREMIUM',
      summary: 'From grassroots to international standard. VioLencE becomes a household name.',
      highlights: [
        'Multiple ₹5L+ tournaments',
        'International partnerships',
        'Professional management team',
        'Media coverage and sponsorships'
      ],
      stats: { events: '40', members: '3000', investment: '₹50L+' },
      color: 'from-purple-500 to-pink-500',
      gradient: 'via-purple-600'
    },
    {
      year: '2025',
      title: '⭐ The Glory - Present & Future',
      phase: 'EXCELLENCE & EXPANSION',
      summary: 'Today we stand as India\'s premier esports tournament organizer. The future is limitless.',
      highlights: [
        'World-class tournament infrastructure',
        'Multiple professional teams',
        '₹1Cr+ total prize distributions',
        'Global recognition and partnerships'
      ],
      stats: { events: '50+', members: '5000+', investment: '₹1Cr+' },
      color: 'from-cyan-500 to-blue-500',
      gradient: 'via-cyan-600'
    }
  ]

  const milestones = [
    { year: '2019', event: 'Founded', emoji: '🎮' },
    { year: '2020', event: 'First Tournament', emoji: '🏆' },
    { year: '2021', event: 'Pro Teams Formed', emoji: '👥' },
    { year: '2022', event: '₹5L+ Prize Pool', emoji: '💰' },
    { year: '2023', event: 'International Reach', emoji: '🌍' },
    { year: '2025', event: 'Premier Status', emoji: '👑' }
  ]

  const stats = [
    { icon: FaTrophy, label: 'Tournaments', value: '50+', trend: '↑ 300%' },
    { icon: FaUsers, label: 'Community', value: '5000+', trend: '↑ 1000x' },
    { icon: FaRocket, label: 'Prize Pool', value: '₹1Cr+', trend: '↑ Infinity' },
    { icon: FaGamepad, label: 'Pro Teams', value: '8+', trend: '↑ Growing' }
  ]

  const values = [
    {
      icon: '🔥',
      title: 'Passion First',
      desc: 'We live and breathe competitive gaming. Every event is crafted with pure passion.',
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: '👥',
      title: 'Community Focused',
      desc: 'Our players are our family. We grow together, win together, celebrate together.',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      desc: 'Excellence is non-negotiable. World-class infrastructure, streaming, and experience.',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: '⚔️',
      title: 'Fair & Transparent',
      desc: 'Every tournament is fair, every result is honest. Your trust is our foundation.',
      color: 'from-green-500/20 to-emerald-500/20'
    }
  ]

  const activeJourney = journey.find(j => j.year === activeYear)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-24 pb-20 px-4 sm:px-6">
      {/* Premium Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-20"
      >
        <div className="relative text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-40 rounded-full w-24 h-24" />
              <div className="relative text-7xl">🎮</div>
            </div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">VioLencE</span> Story
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            From basement gamers to premium tournament organizer. Six years of struggle, growth, and glory.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-300 font-bold text-sm">
              ✨ Since 2019
            </div>
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-purple-300 font-bold text-sm">
              🏆 Industry Leaders
            </div>
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-300 font-bold text-sm">
              📈 300% Growth
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-16"
      >
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {journey.map((item, idx) => (
            <motion.button
              key={item.year}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveYear(item.year)}
              className={`px-5 sm:px-7 py-3 sm:py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300 ${
                activeYear === item.year
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-2xl shadow-cyan-500/50'
                  : 'bg-slate-800/60 text-gray-300 border border-slate-700/60 hover:border-slate-600'
              }`}
            >
              {item.year}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Active Year Details */}
      {activeJourney && (
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className={`relative bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-black/95 backdrop-blur-3xl border-2 border-gradient rounded-[28px] overflow-hidden p-8 sm:p-12`}
            style={{
              borderImage: `linear-gradient(135deg, var(--tw-gradient-stops)) 1`,
              '--tw-gradient-stops': `${activeJourney.color.split(' ')[0].replace('from-', '')}ff, transparent`
            }}
          >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${activeJourney.color} opacity-5 rounded-[28px]`} />

            <div className="relative">
              {/* Phase Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${activeJourney.color} text-white font-black text-sm mb-6 shadow-lg`}
              >
                <span className="text-lg">{activeJourney.phase.split(' ')[0] === 'STRUGGLE' ? '📊' : '✨'}</span>
                {activeJourney.phase}
              </motion.div>

              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{activeJourney.title}</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{activeJourney.summary}</p>

              {/* Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {activeJourney.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all"
                  >
                    <div className="text-cyan-400 text-xl mt-1">✓</div>
                    <p className="text-gray-200 font-semibold">{highlight}</p>
                  </motion.div>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-700/50">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className={`text-3xl font-black bg-gradient-to-r ${activeJourney.color} text-transparent bg-clip-text mb-2`}>
                    {activeJourney.stats.events}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Events</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className={`text-3xl font-black bg-gradient-to-r ${activeJourney.color} text-transparent bg-clip-text mb-2`}>
                    {activeJourney.stats.members}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Members</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className={`text-3xl font-black bg-gradient-to-r ${activeJourney.color} text-transparent bg-clip-text mb-2`}>
                    {activeJourney.stats.investment}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Investment</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-4">
          By The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Numbers</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">Our impact across 6 incredible years</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-slate-700/50 rounded-2xl p-8 text-center hover:border-slate-600 transition-all">
                  <Icon className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                  <p className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-3">{stat.label}</p>
                  <p className="text-green-400 font-black text-sm">{stat.trend}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="text-4xl sm:text-5xl font-black text-white text-center mb-4">
          What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Stand For</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">The pillars of Team VioLencE</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300" />
              <div className={`relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all ${value.color}`}>
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-black text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative bg-gradient-to-r from-slate-900/95 via-purple-900/50 to-slate-900/95 backdrop-blur-3xl border-2 border-purple-500/50 rounded-[28px] overflow-hidden p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-5 transition-opacity" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl mb-6 inline-block"
            >
              🚀
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Be Part of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">The Story?</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of gamers in India's premier esports community. Compete, win, and write your own success story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tournaments"
                className="relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-black text-white uppercase tracking-wider text-sm overflow-hidden group bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all border border-cyan-400/50 hover:border-cyan-300/70"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <FaRocket className="relative text-base" />
                <span className="relative">Explore Tournaments</span>
                <FaArrowRight className="relative text-base" />
              </Link>

              <Link
                to="/register"
                className="relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-black text-white uppercase tracking-wider text-sm overflow-hidden group bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-slate-700/80 hover:border-slate-600/80 transition-all"
              >
                <FaCheck className="relative text-base" />
                <span className="relative">Join Now</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Discovery
