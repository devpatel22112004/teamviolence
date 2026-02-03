import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTrophy, FaUsers, FaCalendar, FaRupeeSign, FaGift, FaArrowRight, FaFire, FaTimes, FaCheck, FaLock, FaStar, FaRocket } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

// Memoized Tournament Card Component
const TournamentCard = memo(({ tournament, onRegister }) => {
  const filled = (tournament.registeredTeams / tournament.totalSlots) * 100
  const isFull = tournament.registeredTeams >= tournament.totalSlots
  
  const getStatus = useCallback(() => {
    if (filled >= 100) return { label: 'FULL', color: 'text-red-400', bg: 'bg-red-500' }
    if (filled >= 80) return { label: 'FILLING FAST', color: 'text-orange-400', bg: 'bg-orange-500' }
    if (filled >= 50) return { label: 'POPULAR', color: 'text-green-400', bg: 'bg-green-500' }
    return { label: 'AVAILABLE', color: 'text-cyan-400', bg: 'bg-cyan-500' }
  }, [filled])

  const getRarity = useCallback(() => {
    if (tournament.badge === 'ELITE' || tournament.prizePool > 50000) {
      return { bg: 'from-purple-600 to-pink-600', border: 'border-purple-500/50', icon: '⭐' }
    }
    if (tournament.badge === 'PRO' || tournament.prizePool > 20000) {
      return { bg: 'from-amber-600 to-orange-600', border: 'border-amber-500/50', icon: '✨' }
    }
    return { bg: 'from-cyan-600 to-blue-600', border: 'border-cyan-500/50', icon: '🎯' }
  }, [tournament.badge, tournament.prizePool])

  const status = getStatus()
  const rarity = getRarity()
  const prizeText = tournament.prizePool / 100000 >= 1 ? Math.round(tournament.prizePool / 100000) + 'L' : Math.round(tournament.prizePool / 1000) + 'K'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.4 }}
      className="group relative h-full"
    >
      {/* Premium Glow Effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${rarity.bg} rounded-[24px] opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700`} />
      
      {/* Main Card - Compact Design */}
      <div className={`relative bg-gradient-to-br from-slate-900/98 via-slate-950/95 to-black/98 backdrop-blur-3xl border-2 ${rarity.border} rounded-[20px] overflow-hidden p-5 sm:p-6 h-full flex flex-col transition-all duration-500 hover:border-white/40 hover:translate-y-[-4px] shadow-2xl hover:shadow-3xl`}>
        
        {/* Header with Status & Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-slate-800/90 to-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-lg`}>
              <div className={`w-2.5 h-2.5 rounded-full ${status.bg} shadow-lg animate-pulse`} />
              <span className={`${status.color} tracking-wider`}>{status.label}</span>
            </div>
          </div>

          {(tournament.badge || tournament.prizePool > 20000) && (
            <div className="text-3xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">{rarity.icon}</div>
          )}
        </div>

        {/* Title & Description - Compact */}
        <div className="mb-3.5 flex-1">
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
            {tournament.title}
          </h3>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <p className="text-cyan-300 font-bold text-xs uppercase tracking-widest">
              {tournament.mode}
            </p>
          </div>
        </div>

        {/* Special Note - Compact */}
        {tournament.specialNote && (
          <div className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/25 to-orange-500/25 border border-amber-500/60 text-center mb-3.5 overflow-hidden group/note">
            <p className="relative text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5">
              <span>⚡</span>
              {tournament.specialNote}
            </p>
          </div>
        )}

        {/* Premium Prize Distribution - Horizontal Compact */}
        {tournament.prizeBreakdown && (
          <div className="mb-3.5 relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-[16px] p-4 overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              {/* 1st Place */}
              <div className="flex-1 text-center">
                <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-yellow-500/20 border border-amber-500/60 mb-2">
                  <span className="text-lg">🥇</span>
                </div>
                <p className="text-amber-200 font-black text-xs">₹{tournament.prizeBreakdown.first / 1000 > 99 ? Math.round(tournament.prizeBreakdown.first / 100000) + 'L' : Math.round(tournament.prizeBreakdown.first / 1000) + 'K'}</p>
                <p className="text-gray-500 text-[10px] font-bold">1st</p>
              </div>
              
              <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent" />

              {/* 2nd Place */}
              <div className="flex-1 text-center">
                <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-500/30 to-slate-500/20 border border-gray-500/60 mb-2">
                  <span className="text-lg">🥈</span>
                </div>
                <p className="text-gray-200 font-black text-xs">₹{tournament.prizeBreakdown.second / 1000 > 99 ? Math.round(tournament.prizeBreakdown.second / 100000) + 'L' : Math.round(tournament.prizeBreakdown.second / 1000) + 'K'}</p>
                <p className="text-gray-500 text-[10px] font-bold">2nd</p>
              </div>

              <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent" />

              {/* 3rd Place */}
              <div className="flex-1 text-center">
                <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/20 border border-orange-500/60 mb-2">
                  <span className="text-lg">🥉</span>
                </div>
                <p className="text-orange-200 font-black text-xs">₹{tournament.prizeBreakdown.third / 1000 > 99 ? Math.round(tournament.prizeBreakdown.third / 100000) + 'L' : Math.round(tournament.prizeBreakdown.third / 1000) + 'K'}</p>
                <p className="text-gray-500 text-[10px] font-bold">3rd</p>
              </div>

              <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent" />

              {/* Highest Killer */}
              <div className="flex-1 text-center">
                <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500/30 to-pink-500/20 border border-red-500/60 mb-2">
                  <span className="text-lg">🔥</span>
                </div>
                <p className="text-red-200 font-black text-xs">₹{tournament.prizeBreakdown.highestKiller / 1000 > 99 ? Math.round(tournament.prizeBreakdown.highestKiller / 100000) + 'L' : Math.round(tournament.prizeBreakdown.highestKiller / 1000) + 'K'}</p>
                <p className="text-gray-500 text-[10px] font-bold">MVP</p>
              </div>
            </div>
          </div>
        )}

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
          <div className="relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-3 backdrop-blur-sm overflow-hidden group/stat hover:border-purple-400/50 transition-all">
            <FaTrophy className="relative mx-auto text-purple-400 mb-1.5 text-lg group-hover/stat:scale-110 transition-transform" />
            <p className="relative text-gray-400 font-black text-[9px] tracking-widest mb-0.5">POOL</p>
            <p className="relative text-white font-black text-sm">₹{prizeText}</p>
          </div>

          <div className="relative bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-xl p-3 backdrop-blur-sm overflow-hidden group/stat hover:border-cyan-400/50 transition-all">
            <FaUsers className="relative mx-auto text-cyan-400 mb-1.5 text-lg group-hover/stat:scale-110 transition-transform" />
            <p className="relative text-gray-400 font-black text-[9px] tracking-widest mb-0.5">SLOTS</p>
            <p className={`relative font-black text-sm ${tournament.registeredTeams >= tournament.totalSlots ? 'text-red-400' : 'text-white'}`}>
              {tournament.registeredTeams}/{tournament.totalSlots}
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/30 rounded-xl p-3 backdrop-blur-sm overflow-hidden group/stat hover:border-pink-400/50 transition-all">
            <FaCalendar className="relative mx-auto text-pink-400 mb-1.5 text-lg group-hover/stat:scale-110 transition-transform" />
            <p className="relative text-gray-400 font-black text-[9px] tracking-widest mb-0.5">DATE</p>
            <p className="relative text-white font-black text-sm">{new Date(tournament.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
          </div>
        </div>

        {/* Registration Progress - Compact */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-gray-400 font-black text-xs uppercase tracking-wider">Registration</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-black text-sm">
              {Math.round((tournament.registeredTeams / tournament.totalSlots) * 100)}%
            </span>
          </div>
          <div className="relative w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-slate-700/80 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(tournament.registeredTeams / tournament.totalSlots) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>

        {/* Entry Fee Badge - Compact */}
        <div className="mb-4">
          {tournament.type === 'free' ? (
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500/25 to-green-500/25 text-emerald-200 border border-emerald-500/70 w-full justify-center overflow-hidden group/entry shadow-lg">
              <FaGift className="relative text-sm text-emerald-300 group-hover/entry:scale-110 transition-transform" />
              <span className="relative tracking-wider">FREE ENTRY</span>
            </div>
          ) : (
            <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-500/25 to-pink-500/25 text-purple-200 border border-purple-500/70 w-full justify-center overflow-hidden group/entry shadow-lg">
              <FaRupeeSign className="relative text-sm text-purple-300 group-hover/entry:scale-110 transition-transform" />
              <span className="relative tracking-wider">₹{tournament.entryFee}</span>
            </div>
          )}
        </div>

        {/* Register Button - Compact */}
        <button
          onClick={() => onRegister(tournament)}
          disabled={isFull}
          className={`relative w-full font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-xs overflow-hidden group/btn ${
            isFull
              ? 'bg-gradient-to-r from-slate-800/80 to-slate-900/80 text-gray-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/40 hover:shadow-cyan-500/60 active:scale-98 border border-cyan-400/50 hover:border-cyan-300/70'
          } transition-all duration-300`}
        >
          {!isFull && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />}
          {isFull ? (
            <>
              <FaLock className="relative text-xs" />
              <span className="relative">FULL</span>
            </>
          ) : (
            <>
              <FaRocket className="relative text-xs group-hover/btn:rotate-45 transition-transform duration-300" />
              <span className="relative">REGISTER</span>
              <FaArrowRight className="relative text-xs group-hover/btn:translate-x-0.5 transition-transform duration-300" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
})

TournamentCard.displayName = 'TournamentCard'

// Memoized Stats Card
const StatCard = memo(({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="relative group"
  >
    {/* Glow Effect */}
    <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-500`} />
    
    {/* Card */}
    <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-950/90 to-black/95 backdrop-blur-2xl border-2 border-white/10 rounded-2xl p-6 sm:p-7 text-center group-hover:border-white/30 transition-all duration-300 shadow-2xl">
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r ${color} blur-xl opacity-30 rounded-full`} />
        <Icon className="relative w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
      </div>
      <p className="text-white font-black text-3xl sm:text-4xl mb-2 drop-shadow-lg">{value}</p>
      <p className="text-gray-400 text-xs sm:text-sm font-black tracking-[0.2em] uppercase">{label}</p>
    </div>
  </motion.div>
))

StatCard.displayName = 'StatCard'

const Tournaments = () => {
  const { user } = useAuth()
  const [tournaments, setTournaments] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    members: ''
  })

  const apiBase = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const apiUrl = useCallback((path) => (apiBase ? `${apiBase}${path}` : path), [apiBase])

  const fetchTournaments = useCallback(async () => {
    try {
      const res = await axios.get(apiUrl('/api/tournaments'))
      setTournaments(res.data)
    } catch (error) {
      toast.error('Unable to load tournaments.')
      setTournaments([])
    } finally {
      setLoading(false)
    }
  }, [apiUrl])

  useEffect(() => {
    fetchTournaments()
  }, [fetchTournaments])

  // Memoized filtered and sorted tournaments
  const filteredTournaments = useMemo(() => {
    return tournaments
      .filter(t => filter === 'all' ? true : t.type === filter)
      .sort((a, b) => {
        if (sortBy === 'popular') return b.registeredTeams - a.registeredTeams
        if (sortBy === 'prize') return b.prizePool - a.prizePool
        if (sortBy === 'date') return new Date(a.date) - new Date(b.date)
        return 0
      })
  }, [tournaments, filter, sortBy])

  // Memoized stats calculations
  const stats = useMemo(() => ({
    totalPrizePool: tournaments.reduce((sum, t) => sum + (t.prizePool || 0), 0),
    totalSlots: tournaments.reduce((sum, t) => sum + (t.totalSlots || 0), 0),
    liveCount: tournaments.filter(t => t.status === 'open').length
  }), [tournaments])

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value)
  }, [])

  const handleRegisterClick = useCallback((tournament) => {
    setSelectedTournament(tournament)
    setShowRegisterModal(true)
  }, [])

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleCloseModal = useCallback(() => {
    if (!registering) {
      setShowRegisterModal(false)
    }
  }, [registering])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16"
        >
          <FaTrophy className="w-full h-full text-cyan-500 opacity-50" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen will-change-auto">
      {/* HERO SECTION */}
      <section className="relative py-28 sm:py-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_70%)]" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center justify-center space-x-3 px-6 sm:px-8 py-3 rounded-full backdrop-blur-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30"
            >
              <FaFire className="text-cyan-400 text-xl animate-pulse" />
              <span className="text-cyan-200 font-black text-sm sm:text-base tracking-[0.2em] uppercase">Premium Tournaments</span>
              <FaRocket className="text-purple-400 text-xl" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1]"
            >
              <span className="text-white">Discover Your Next</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-3">
                BATTLE GROUND
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            >
              Join elite tournaments with massive prizes. Squad battles & exclusive events await.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            >
              <button
                onClick={() => handleFilterChange('free')}
                className="relative px-10 py-4 rounded-2xl font-black text-base overflow-hidden group active:scale-95 transition-all shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 group-hover:from-emerald-500 group-hover:to-green-500 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center space-x-2.5 text-white">
                  <FaGift className="text-xl" />
                  <span className="tracking-wider">FREE TOURNAMENTS</span>
                </div>
              </button>
              <button
                onClick={() => handleFilterChange('paid')}
                className="relative px-10 py-4 rounded-2xl font-black text-base overflow-hidden group active:scale-95 transition-all shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-purple-500 group-hover:to-pink-500 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center space-x-2.5 text-white">
                  <FaTrophy className="text-xl" />
                  <span className="tracking-wider">PREMIUM EVENTS</span>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 mb-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          <StatCard icon={FaFire} label="Live Events" value={stats.liveCount} color="from-orange-500 via-red-500 to-pink-600" />
          <StatCard icon={FaTrophy} label="Prize Pool" value={`₹${(stats.totalPrizePool / 100000).toFixed(1)}L`} color="from-yellow-500 via-amber-500 to-orange-600" />
          <StatCard icon={FaUsers} label="Total Slots" value={stats.totalSlots} color="from-cyan-500 via-blue-500 to-purple-600" />
          <StatCard icon={FaStar} label="Game Modes" value="4+" color="from-purple-500 via-pink-500 to-rose-600" />
        </div>
      </section>

      {/* FILTER & SORT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'all', label: '🎮 All Tournaments', gradient: 'from-slate-700 to-slate-800' },
              { value: 'free', label: '🎁 Free Entry', gradient: 'from-emerald-600 to-green-600' },
              { value: 'paid', label: '🏆 Premium', gradient: 'from-purple-600 to-pink-600' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleFilterChange(tab.value)}
                className={`relative px-6 sm:px-8 py-3 rounded-2xl font-black text-sm transition-all overflow-hidden group ${
                  filter === tab.value
                    ? `bg-gradient-to-r ${tab.gradient} text-white border-2 border-white/30 shadow-2xl scale-105`
                    : 'bg-slate-800/60 text-gray-300 border-2 border-slate-700 hover:border-slate-600 backdrop-blur-sm hover:scale-105'
                } uppercase tracking-wider`}
              >
                {filter === tab.value && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-gray-200 font-bold text-sm focus:outline-none focus:border-cyan-500 transition-all"
          >
            <option value="popular">Popular</option>
            <option value="prize">High Prize</option>
            <option value="date">Coming Soon</option>
          </select>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredTournaments.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTournaments.map((tournament) => (
              <TournamentCard
                key={tournament._id}
                tournament={tournament}
                onRegister={handleRegisterClick}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4 opacity-30">🏆</div>
            <p className="text-gray-400 text-xl font-bold mb-2">No tournaments found</p>
            <p className="text-gray-500">Check back soon!</p>
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 border border-cyan-500/30 group"
        >
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </div>

          <div className="relative text-center space-y-6">
            <div className="text-5xl">🚀</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">DOMINATE?</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Register for free tournaments and climb to elite premium events.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black rounded-xl text-lg transition-all shadow-lg shadow-cyan-500/40 active:scale-95"
            >
              <FaArrowRight />
              BACK TO TOP
            </button>
          </div>
        </motion.div>
      </section>

      {/* MODAL */}
      <AnimatePresence mode="wait">
        {showRegisterModal && selectedTournament && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/30"
            >
              <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-6 sm:p-8 flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedTournament.title}</h2>
                  <p className="text-cyan-100 text-sm font-bold mt-1 uppercase">{selectedTournament.mode}</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  disabled={registering}
                  className="text-white hover:text-cyan-100 transition-colors disabled:opacity-50"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-700/60 border border-cyan-500/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-xs font-bold uppercase mb-1">ENTRY</p>
                    <p className="text-white text-lg font-black">
                      {selectedTournament.entryFee === 0 ? 'FREE' : `₹${selectedTournament.entryFee}`}
                    </p>
                  </div>
                  <div className="bg-slate-700/60 border border-purple-500/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-xs font-bold uppercase mb-1">PRIZE</p>
                    <p className="text-purple-300 text-lg font-black">₹{selectedTournament.prizePool / 100000 >= 1 ? Math.round(selectedTournament.prizePool / 100000) + 'L' : Math.round(selectedTournament.prizePool / 1000) + 'K'}</p>
                  </div>
                  <div className="bg-slate-700/60 border border-pink-500/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-xs font-bold uppercase mb-1">SLOTS</p>
                    <p className="text-pink-300 text-lg font-black">{selectedTournament.totalSlots - selectedTournament.registeredTeams}</p>
                  </div>
                  <div className="bg-slate-700/60 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-xs font-bold uppercase mb-1">DATE</p>
                    <p className="text-green-300 text-sm font-black">{new Date(selectedTournament.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>

                {selectedTournament.prizeBreakdown && (
                  <div className="bg-slate-700/40 border border-yellow-500/30 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <FaTrophy className="text-yellow-400 text-xl" />
                      <p className="text-yellow-300 font-black uppercase">PRIZES</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-3 text-center">
                        <p className="text-amber-300 font-black text-2xl">🥇</p>
                        <p className="text-amber-200 text-xs font-bold mt-1">1st</p>
                        <p className="text-amber-100 font-black text-sm">₹{selectedTournament.prizeBreakdown.first.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-500/20 border border-gray-500/50 rounded-lg p-3 text-center">
                        <p className="text-gray-300 font-black text-2xl">🥈</p>
                        <p className="text-gray-300 text-xs font-bold mt-1">2nd</p>
                        <p className="text-gray-200 font-black text-sm">₹{selectedTournament.prizeBreakdown.second.toLocaleString()}</p>
                      </div>
                      <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3 text-center">
                        <p className="text-orange-300 font-black text-2xl">🥉</p>
                        <p className="text-orange-300 text-xs font-bold mt-1">3rd</p>
                        <p className="text-orange-100 font-black text-sm">₹{selectedTournament.prizeBreakdown.third.toLocaleString()}</p>
                      </div>
                      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
                        <p className="text-red-300 font-black text-2xl">🔥</p>
                        <p className="text-red-300 text-xs font-bold mt-1">Killer</p>
                        <p className="text-red-100 font-black text-sm">₹{selectedTournament.prizeBreakdown.highestKiller.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTournament.specialNote && (
                  <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                    <p className="text-blue-300 font-bold text-center">{selectedTournament.specialNote}</p>
                  </div>
                )}

                {user ? (
                  <form onSubmit={handleRegister} className="space-y-5">
                      <div>
                        <label className="block text-sm font-black text-gray-200 mb-2 uppercase">Team Name</label>
                        <input
                          type="text"
                          name="teamName"
                          required
                          value={formData.teamName}
                          onChange={handleFormChange}
                          className="w-full bg-slate-700/60 border-2 border-cyan-500/30 focus:border-cyan-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all"
                          placeholder="Enter team name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-gray-200 mb-2 uppercase">Leader</label>
                        <input
                          type="text"
                          name="leaderName"
                          required
                          value={formData.leaderName}
                          onChange={handleFormChange}
                          className="w-full bg-slate-700/60 border-2 border-purple-500/30 focus:border-purple-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all"
                          placeholder="Your nickname"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-gray-200 mb-2 uppercase">Members</label>
                        <textarea
                          name="members"
                          value={formData.members}
                          onChange={handleFormChange}
                          className="w-full bg-slate-700/60 border-2 border-pink-500/30 focus:border-pink-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all resize-none"
                          placeholder="Player1, Player2, Player3, Player4"
                          rows="3"
                        />
                      </div>
                      {selectedTournament.type === 'paid' && (
                        <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4">
                          <p className="text-amber-200 text-sm text-center">
                            💰 Entry Fee: ₹{selectedTournament.entryFee}
                            {selectedTournament.specialNote && (
                              <span className="block mt-1 text-xs">⚡ {selectedTournament.specialNote}</span>
                            )}
                            <span className="block mt-1 text-xs">Contact us on WhatsApp/Instagram/YouTube to complete payment.</span>
                          </p>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={registering}
                        className="w-full font-black py-4 rounded-xl flex items-center justify-center gap-3 uppercase text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                      >
                        <FaRocket />
                        <span>{registering ? 'REGISTERING...' : selectedTournament.type === 'paid' ? `PAY ₹${selectedTournament.entryFee} & REGISTER` : 'REGISTER'}</span>
                      </button>
                    </form>
                ) : (
                  <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-6 text-center space-y-4">
                    <FaLock className="text-4xl text-red-400 mx-auto" />
                    <p className="text-red-100 font-black text-xl">LOGIN REQUIRED</p>
                    <p className="text-red-200 text-sm">Please login to register</p>
                    <Link to="/login" className="inline-block w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black py-3 rounded-lg transition-all uppercase">
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
      toast.error('Please login')
      return
    }

    if (!formData.teamName.trim() || !formData.leaderName.trim()) {
      toast.error('All fields required')
      return
    }

    const players = formData.members.split(',').map(m => m.trim()).filter(m => m)
    if (players.length === 0) {
      toast.error('Add at least one player')
      return
    }

    if (!selectedTournament?._id) {
      toast.error('Invalid tournament')
      return
    }

    const teamData = {
      teamName: formData.teamName.trim(),
      teamLeader: formData.leaderName.trim(),
      players
    }

    setRegistering(true)
    try {
      const res = await axios.post(apiUrl(`/api/tournaments/${selectedTournament._id}/register`), teamData)

      toast.success(res.data?.message || '✅ Registered!')
      setShowRegisterModal(false)
      setFormData({ teamName: '', leaderName: '', members: '' })
      fetchTournaments()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setRegistering(false)
    }
  }
}

export default Tournaments
