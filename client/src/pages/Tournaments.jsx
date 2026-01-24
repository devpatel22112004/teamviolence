import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTrophy, FaUsers, FaCalendar, FaRupeeSign, FaGift, FaArrowRight, FaFire, FaTimes, FaCheck } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Tournaments = () => {
  const { user } = useAuth()
  const [tournaments, setTournaments] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    members: ''
  })

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      const res = await axios.get('/api/tournaments')
      setTournaments(res.data)
    } catch (error) {
      console.error('Error fetching tournaments:', error)
      toast.error('Unable to load tournaments. Using demo data.')
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
            className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 px-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/40 text-primary-100 text-xs sm:text-sm font-bold"
            >
              <FaFire className="text-primary-400 animate-bounce" />
              <span>Live Tournaments</span>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black leading-tight">
              Join <span className="gradient-text">Tournaments</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-2">
              Compete in exciting BGMI tournaments with incredible prize pools. Free and paid options available for all skill levels!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
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
              className={`w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base lg:text-lg transition-all border-2 uppercase tracking-wider sm:tracking-widest ${
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
          className="grid gap-6 sm:gap-8 md:grid-cols-2"
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
                      <div className="space-y-2 flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black group-hover:gradient-text transition-all leading-tight break-words">
                          {tournament.title}
                        </h3>
                        <p className="text-primary-400 font-bold text-xs sm:text-sm uppercase tracking-widest">
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
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {/* Prize Pool */}
                    <div className="glass-card p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-primary-500/20 text-center group-hover:border-primary-500/50 transition-all">
                      <FaTrophy className="text-primary-400 text-lg sm:text-xl md:text-2xl mx-auto mb-1 sm:mb-2" />
                      <p className="text-[10px] sm:text-xs text-gray-400 font-bold mb-1">Prize Pool</p>
                      <p className="text-sm sm:text-base md:text-lg font-black gradient-text">₹{tournament.prizePool.toLocaleString()}</p>
                    </div>

                    {/* Slots */}
                    <div className="glass-card p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-primary-500/20 text-center group-hover:border-primary-500/50 transition-all">
                      <FaUsers className="text-primary-400 text-lg sm:text-xl md:text-2xl mx-auto mb-1 sm:mb-2" />
                      <p className="text-[10px] sm:text-xs text-gray-400 font-bold mb-1">Slots</p>
                      <p className="text-sm sm:text-base md:text-lg font-black gradient-text">{tournament.registeredTeams}/{tournament.totalSlots}</p>
                    </div>

                    {/* Date */}
                    <div className="glass-card p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-primary-500/20 text-center group-hover:border-primary-500/50 transition-all">
                      <FaCalendar className="text-primary-400 text-lg sm:text-xl md:text-2xl mx-auto mb-1 sm:mb-2" />
                      <p className="text-[10px] sm:text-xs text-gray-400 font-bold mb-1">Date</p>
                      <p className="text-xs sm:text-sm font-black gradient-text">{new Date(tournament.date).toLocaleDateString('en-IN', {
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedTournament(tournament)
                      setShowRegisterModal(true)
                    }}
                    className="btn-modern w-full text-center text-lg font-bold py-4 flex items-center justify-center group/btn"
                  >
                    Register Now
                    <FaArrowRight className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
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

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegisterModal && selectedTournament && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !registering && setShowRegisterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gradient-to-br from-dark-800 to-dark-950 rounded-2xl border border-primary-500/30 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTournament.title}</h2>
                  <p className="text-primary-100 text-sm">{selectedTournament.mode}</p>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowRegisterModal(false)}
                  className="text-white hover:text-primary-100"
                >
                  <FaTimes size={24} />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {/* Tournament Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-xs font-semibold">ENTRY FEE</p>
                    <p className="text-white text-lg font-bold">
                      {selectedTournament.entryFee === 0 ? 'FREE' : `₹${selectedTournament.entryFee}`}
                    </p>
                  </div>
                  <div className="bg-dark-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-xs font-semibold">PRIZE POOL</p>
                    <p className="text-green-400 text-lg font-bold">₹{selectedTournament.prizePool.toLocaleString()}</p>
                  </div>
                  <div className="bg-dark-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-xs font-semibold">SLOTS</p>
                    <p className="text-primary-400 text-lg font-bold">{selectedTournament.totalSlots - selectedTournament.registeredTeams}</p>
                  </div>
                  <div className="bg-dark-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-xs font-semibold">DATE</p>
                    <p className="text-white text-lg font-bold">{new Date(selectedTournament.date).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Registration Form */}
                {user ? (
                  selectedTournament.type === 'paid' ? (
                    <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-6 text-center space-y-4">
                      <p className="text-amber-100 font-semibold text-lg">💰 Paid Tournament</p>
                      <p className="text-amber-200 text-sm">
                        This is a paid tournament requiring payment processing. 
                      </p>
                      <p className="text-amber-200 text-sm">
                        For now, please register for FREE tournaments to test the system.
                      </p>
                      <p className="text-amber-300 text-xs font-bold">
                        Paid tournaments will be available soon!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Team Name</label>
                        <input
                          type="text"
                          required
                          value={formData.teamName}
                          onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                          className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                          placeholder="Enter your team name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Team Leader</label>
                        <input
                          type="text"
                          required
                          value={formData.leaderName}
                          onChange={(e) => setFormData({...formData, leaderName: e.target.value})}
                          className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                          placeholder="Enter leader name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">Team Members (comma separated)</label>
                        <textarea
                          value={formData.members}
                          onChange={(e) => setFormData({...formData, members: e.target.value})}
                          className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                          placeholder="Player1, Player2, Player3, Player4"
                          rows="3"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={registering}
                        className="w-full btn-modern py-3 flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        <FaCheck size={16} />
                        <span>{registering ? 'Registering...' : 'Register Now'}</span>
                      </button>
                    </form>
                  )
                ) : (
                  <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 text-center">
                    <p className="text-amber-100 font-semibold">Login required</p>
                    <p className="text-amber-200 text-sm mt-2">Please login to register for tournaments</p>
                    <Link to="/login" className="btn-modern w-full mt-4 py-2 text-sm">
                      Go to Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  async function handleRegister(e) {
    e.preventDefault()
    
    if (!user) {
      toast.error('Please login to register')
      return
    }

    // Validation
    if (!formData.teamName.trim()) {
      toast.error('Team name is required')
      return
    }
    if (!formData.leaderName.trim()) {
      toast.error('Team leader name is required')
      return
    }
    
    const players = formData.members.split(',').map(m => m.trim()).filter(m => m)
    if (players.length === 0) {
      toast.error('At least one player name is required')
      return
    }

    // Check if tournament ID is valid
    if (!selectedTournament || !selectedTournament._id) {
      toast.error('Invalid tournament selected')
      return
    }

    setRegistering(true)
    try {
      const res = await axios.post(`/api/tournaments/${selectedTournament._id}/register`, {
        teamName: formData.teamName.trim(),
        teamLeader: formData.leaderName.trim(),
        players: players
      })
      
      toast.success('✅ Successfully registered for tournament!')
      setShowRegisterModal(false)
      setFormData({ teamName: '', leaderName: '', members: '' })
      
      // Refresh tournaments
      fetchTournaments()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed'
      toast.error(errorMsg)
      console.error('Registration error:', error)
    } finally {
      setRegistering(false)
    }
  }
}

export default Tournaments



