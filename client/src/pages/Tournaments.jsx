import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTrophy, FaUsers, FaCalendar, FaRupeeSign, FaGift, FaArrowRight, FaFire } from 'react-icons/fa'
import axios from 'axios'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([])
  const [filter, setFilter] = useState('all') // all, free, paid
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      const res = await axios.get('/api/tournaments')
      setTournaments(res.data)
    } catch (error) {
      console.error('Error fetching tournaments:', error)
      setTournaments(defaultTournaments)
    } finally {
      setLoading(false)
    }
  }

  const defaultTournaments = [
    {
      _id: '1',
      title: 'Weekly Squad Championship',
      mode: 'Squad TPP',
      type: 'free',
      entryFee: 0,
      prizePool: 5000,
      totalSlots: 100,
      registeredTeams: 45,
      date: '2026-01-25',
      status: 'open',
      description: 'Free weekly tournament for all skill levels. Prove your worth!',
      badge: '🎮 Weekly'
    },
    {
      _id: '2',
      title: 'Pro League - Season 1',
      mode: 'Squad TPP',
      type: 'paid',
      entryFee: 30,
      prizePool: 10000,
      totalSlots: 50,
      registeredTeams: 28,
      date: '2026-01-28',
      status: 'open',
      description: 'Compete with the best teams for massive prizes!',
      badge: '🔥 Hot'
    },
    {
      _id: '3',
      title: 'TDM Showdown',
      mode: 'TDM 4v4',
      type: 'free',
      entryFee: 0,
      prizePool: 3000,
      totalSlots: 32,
      registeredTeams: 20,
      date: '2026-01-27',
      status: 'open',
      description: 'Fast-paced TDM action. Show your gunplay skills!',
      badge: '⚡ Fast'
    },
    {
      _id: '4',
      title: 'Elite Masters Cup',
      mode: 'Squad TPP',
      type: 'paid',
      entryFee: 50,
      prizePool: 25000,
      totalSlots: 25,
      registeredTeams: 18,
      date: '2026-02-05',
      status: 'open',
      description: 'Premium tournament with the biggest prize pool!',
      badge: '👑 Elite'
    },
  ]

  const filteredTournaments = tournaments.length ? tournaments.filter(t => 
    filter === 'all' ? true : t.type === filter
  ) : defaultTournaments.filter(t => 
    filter === 'all' ? true : t.type === filter
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-dark-950" />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 bg-primary-700/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/40 text-primary-100 text-sm font-bold"
            >
              <FaFire className="text-primary-400 animate-bounce" />
              Live Tournaments
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-tight">
              Join <span className="gradient-text">Tournaments</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Compete in exciting BGMI tournaments with incredible prize pools. Free and paid options available for all skill levels!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { value: 'all', label: '🎮 All Tournaments', icon: '📋' },
            { value: 'free', label: '🎁 Free Entry', icon: '✨' },
            { value: 'paid', label: '💰 Paid Tournaments', icon: '🏆' },
          ].map((tab) => (
            <motion.button
              key={tab.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab.value)}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition-all border-2 uppercase tracking-widest ${
                filter === tab.value
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white border-primary-500 shadow-xl shadow-primary-500/50'
                  : 'bg-dark-800/60 text-gray-300 hover:bg-dark-700 border-dark-700 backdrop-blur-sm'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Tournaments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament._id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-300" />
              
              <div className="relative card-interactive rounded-2xl overflow-hidden">
                {/* Badge */}
                {tournament.badge && (
                  <motion.div
                    initial={{ scale: 0.8, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                  >
                    {tournament.badge}
                  </motion.div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-display font-black group-hover:gradient-text transition-all">
                          {tournament.title}
                        </h3>
                        <p className="text-primary-400 font-bold text-sm uppercase tracking-widest">
                          {tournament.mode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-base leading-relaxed">
                    {tournament.description}
                  </p>

                  {/* Type Badge */}
                  <div>
                    {tournament.type === 'free' ? (
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/70 transition-all"
                      >
                        <FaGift className="mr-2" />
                        FREE ENTRY
                      </motion.span>
                    ) : (
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-primary-500/15 text-primary-300 border border-primary-500/30 hover:border-primary-500/70 transition-all"
                      >
                        <FaRupeeSign className="mr-1 text-lg" />
                        ₹{tournament.entryFee} Entry
                      </motion.span>
                    )}
                  </div>

                  {/* Tournament Details Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* Prize Pool */}
                    <div className="glass-card p-4 rounded-xl border border-primary-500/20 text-center group-hover:border-primary-500/50 transition-all">
                      <FaTrophy className="text-primary-400 text-2xl mx-auto mb-2" />
                      <p className="text-xs text-gray-400 font-bold mb-1">Prize Pool</p>
                      <p className="text-lg font-black gradient-text">₹{tournament.prizePool.toLocaleString()}</p>
                    </div>

                    {/* Slots */}
                    <div className="glass-card p-4 rounded-xl border border-primary-500/20 text-center group-hover:border-primary-500/50 transition-all">
                      <FaUsers className="text-primary-400 text-2xl mx-auto mb-2" />
                      <p className="text-xs text-gray-400 font-bold mb-1">Slots</p>
                      <p className="text-lg font-black gradient-text">{tournament.registeredTeams}/{tournament.totalSlots}</p>
                    </div>

                    {/* Date */}
                    <div className="glass-card p-4 rounded-xl border border-primary-500/20 text-center group-hover:border-primary-500/50 transition-all">
                      <FaCalendar className="text-primary-400 text-2xl mx-auto mb-2" />
                      <p className="text-xs text-gray-400 font-bold mb-1">Date</p>
                      <p className="text-sm font-black gradient-text">{new Date(tournament.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-bold">REGISTRATION PROGRESS</span>
                      <span className="text-primary-400 font-bold">{Math.round((tournament.registeredTeams / tournament.totalSlots) * 100)}%</span>
                    </div>
                    <div className="w-full bg-dark-800/50 rounded-full h-2.5 overflow-hidden border border-dark-700">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(tournament.registeredTeams / tournament.totalSlots) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="bg-gradient-to-r from-primary-600 to-primary-400 h-full rounded-full"
                      />
                    </div>
                  </div>

                  {/* Register Button */}
                  <Link
                    to={`/tournaments/${tournament._id}`}
                    className="btn-primary w-full text-center text-lg font-bold py-4 flex items-center justify-center group/btn"
                  >
                    View Details
                    <FaArrowRight className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredTournaments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <FaTrophy className="text-6xl text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-xl font-semibold">No tournaments found in this category.</p>
            <p className="text-gray-500 mt-2">Check back soon for more exciting events!</p>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 text-center border-primary-500/30 relative overflow-hidden group"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl group-hover:bg-primary-600/20 transition-all" />
            <div className="relative space-y-6">
              <p className="section-label">Ready to Compete?</p>
              <h2 className="text-4xl md:text-5xl font-display font-black">
                Pick Your <span className="gradient-text">Tournament</span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                From free casual matches to elite tournaments with massive prize pools. Find the perfect competition for your skill level.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Tournaments

