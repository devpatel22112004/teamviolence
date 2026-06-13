import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaTrophy, FaUsers, FaCalendar, FaRupeeSign, FaGift, FaArrowRight,
  FaFire, FaTimes, FaLock, FaStar, FaRocket, FaBolt, FaCheckCircle, FaChartLine
} from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Card, { MotionCard } from '../components/ui/Card'
import Section from '../components/ui/Section'
import Badge from '../components/ui/Badge'
import { apiUrl } from '../utils/api'

// ============================== TournamentCard ==============================
const TournamentCard = memo(({ tournament, onRegister }) => {
  const filled = (tournament.registeredTeams / tournament.totalSlots) * 100
  const isFull = tournament.registeredTeams >= tournament.totalSlots

  const getStatus = useCallback(() => {
    if (filled >= 100) return { label: 'FULL',         color: 'text-red-400',    bg: 'bg-red-500' }
    if (filled >= 80)  return { label: 'FILLING FAST', color: 'text-orange-400', bg: 'bg-orange-500' }
    if (filled >= 50)  return { label: 'POPULAR',      color: 'text-lime-400',   bg: 'bg-lime-500' }
    return                  { label: 'AVAILABLE',    color: 'text-cyan-400',   bg: 'bg-cyan-500' }
  }, [filled])

  const getRarity = useCallback(() => {
    if (tournament.badge === 'ELITE' || tournament.prizePool > 50000) return { tone: 'cyan',   icon: '⚡' }
    if (tournament.badge === 'PRO'   || tournament.prizePool > 20000) return { tone: 'amber',  icon: '✨' }
    return { tone: 'violet', icon: '🎯' }
  }, [tournament.badge, tournament.prizePool])

  const status = getStatus()
  const rarity = getRarity()
  const prizeText = tournament.prizePool / 100000 >= 1
    ? Math.round(tournament.prizePool / 100000) + 'L'
    : Math.round(tournament.prizePool / 1000) + 'K'

  const ringTone = {
    cyan:   'border-cyan-500/40 hover:border-cyan-400 hover:shadow-glow-cyan',
    violet: 'border-violet-500/40 hover:border-violet-400 hover:shadow-glow-violet',
    amber:  'border-amber-500/40 hover:border-amber-400 hover:shadow-glow-amber',
  }[rarity.tone]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <Card variant="premium" hoverLift className={['p-5 sm:p-6 h-full flex flex-col', ringTone].join(' ')}>
        {/* Status + Rarity */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge variant={status.label === 'FULL' ? 'red' : status.label === 'POPULAR' ? 'lime' : 'cyan'} pulse={status.label !== 'FULL'}>
            {status.label}
          </Badge>
          {tournament.badge && (
            <Badge variant={rarity.tone === 'amber' ? 'amber' : rarity.tone === 'cyan' ? 'cyan' : 'violet'}>
              {tournament.badge}
            </Badge>
          )}
        </div>

        {/* Title + mode */}
        <div className="mb-4 flex-1">
          <h3 className="text-xl sm:text-2xl font-display font-black text-white leading-tight mb-2 group-hover:gradient-text transition-all">
            {tournament.title}
          </h3>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
            <FaBolt className="text-cyan-300 text-[10px]" />
            <p className="text-cyan-200 font-bold text-[10px] uppercase tracking-widest">{tournament.mode}</p>
          </div>
        </div>

        {/* Special note */}
        {tournament.specialNote && (
          <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-center mb-4">
            <p className="text-[11px] font-bold flex items-center justify-center gap-1.5">
              <span>⚡</span> {tournament.specialNote}
            </p>
          </div>
        )}

        {/* Prize ladder */}
        {tournament.prizeBreakdown && (
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 mb-4">
            <div className="flex items-center justify-between gap-1.5">
              {[
                { place: '1st', amount: tournament.prizeBreakdown.first,         emoji: '🥇', tone: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40' },
                { place: '2nd', amount: tournament.prizeBreakdown.second,        emoji: '🥈', tone: 'from-slate-400/20 to-slate-500/10 border-slate-500/40' },
                { place: '3rd', amount: tournament.prizeBreakdown.third,         emoji: '🥉', tone: 'from-orange-500/20 to-red-500/10 border-orange-500/40' },
                { place: 'MVP', amount: tournament.prizeBreakdown.highestKiller, emoji: '🔥', tone: 'from-red-500/20 to-pink-500/10 border-red-500/40' },
              ].map((p, i, arr) => (
                <>
                  <div key={p.place} className="flex-1 text-center">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${p.tone} border mb-1`}>
                      <span className="text-sm">{p.emoji}</span>
                    </div>
                    <p className="font-mono font-black text-[10px] text-white">
                      ₹{p.amount / 1000 > 99 ? Math.round(p.amount / 100000) + 'L' : Math.round(p.amount / 1000) + 'K'}
                    </p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{p.place}</p>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-10 bg-white/[0.06]" />}
                </>
              ))}
            </div>
          </div>
        )}

        {/* Stat grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2.5 text-center">
            <FaTrophy className="text-cyan-300 mx-auto mb-1 text-sm" />
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">POOL</p>
            <p className="font-mono font-bold text-xs text-white mt-0.5">₹{prizeText}</p>
          </div>
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2.5 text-center">
            <FaUsers className="text-violet-300 mx-auto mb-1 text-sm" />
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">SLOTS</p>
            <p className={`font-mono font-bold text-xs mt-0.5 ${tournament.registeredTeams >= tournament.totalSlots ? 'text-red-400' : 'text-white'}`}>
              {tournament.registeredTeams}/{tournament.totalSlots}
            </p>
          </div>
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2.5 text-center">
            <FaCalendar className="text-pink-300 mx-auto mb-1 text-sm" />
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">DATE</p>
            <p className="font-mono font-bold text-xs text-white mt-0.5">{new Date(tournament.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Registration</span>
            <span className="font-mono font-black text-xs gradient-text-static">{Math.round(filled)}%</span>
          </div>
          <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden border border-white/[0.04]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${filled}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>

        {/* Entry fee */}
        <div className="mb-4">
          {tournament.type === 'free' ? (
            <Badge variant="lime" size="lg" className="w-full justify-center">
              <FaGift className="text-xs" /> FREE ENTRY
            </Badge>
          ) : (
            <Badge variant="violet" size="lg" className="w-full justify-center">
              <FaRupeeSign className="text-xs" /> ENTRY · ₹{tournament.entryFee}
            </Badge>
          )}
        </div>

        {/* CTA */}
        <Button
          variant={isFull ? 'secondary' : 'primary'}
          fullWidth
          onClick={() => onRegister(tournament)}
          disabled={isFull}
          iconLeft={isFull ? <FaLock /> : <FaRocket />}
          iconRight={!isFull ? <FaArrowRight /> : undefined}
        >
          {isFull ? 'FULL' : 'REGISTER'}
        </Button>
      </Card>
    </motion.div>
  )
})
TournamentCard.displayName = 'TournamentCard'

// ============================== StatCard ==============================
const StatCard = memo(({ icon: Icon, label, value, color, delay = 0 }) => (
  <MotionCard delay={delay}>
    <Card variant="premium" hoverLift className="p-5 sm:p-6 text-center">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${color} shadow-lg mb-3`}>
        <Icon className="text-xl text-white" />
      </div>
      <p className="font-mono font-black text-3xl sm:text-4xl text-white tracking-tight">{value}</p>
      <p className="text-[10px] sm:text-xs text-gray-400 font-bold tracking-widest uppercase mt-1">{label}</p>
    </Card>
  </MotionCard>
))
StatCard.displayName = 'StatCard'

// ============================== Tournaments ==============================
const Tournaments = () => {
  const { user } = useAuth()
  const [tournaments, setTournaments] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [formData, setFormData] = useState({ teamName: '', leaderName: '', members: '' })

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true)
      try {
        const res = await axios.get(apiUrl('/api/tournaments'))
        if (Array.isArray(res.data)) setTournaments(res.data)
      } catch {
        toast.error('Unable to load tournaments.')
        setTournaments([])
      } finally {
        setLoading(false)
      }
    }
    fetchTournaments()
  }, [])

  const filteredTournaments = useMemo(() => {
    return tournaments
      .filter(t => filter === 'all' ? true : t.type === filter)
      .sort((a, b) => {
        if (sortBy === 'popular') return b.registeredTeams - a.registeredTeams
        if (sortBy === 'prize')   return b.prizePool - a.prizePool
        if (sortBy === 'date')    return new Date(a.date) - new Date(b.date)
        return 0
      })
  }, [tournaments, filter, sortBy])

  const stats = useMemo(() => ({
    totalPrizePool: tournaments.reduce((s, t) => s + (t.prizePool || 0), 0),
    totalSlots:     tournaments.reduce((s, t) => s + (t.totalSlots || 0), 0),
    liveCount:      tournaments.filter(t => t.status === 'open').length,
  }), [tournaments])

  const handleFilterChange = useCallback((v) => setFilter(v), [])
  const handleSortChange = useCallback((e) => setSortBy(e.target.value), [])
  const handleRegisterClick = useCallback((t) => { setSelectedTournament(t); setShowRegisterModal(true) }, [])
  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }, [])
  const handleCloseModal = useCallback(() => {
    if (!registering) setShowRegisterModal(false)
  }, [registering])

  async function handleRegister(e) {
    e.preventDefault()
    if (!user)        { toast.error('Please login'); return }
    if (!formData.teamName.trim() || !formData.leaderName.trim()) { toast.error('All fields required'); return }
    const players = formData.members.split(',').map(m => m.trim()).filter(Boolean)
    if (players.length === 0) { toast.error('Add at least one player'); return }
    if (!selectedTournament?._id) { toast.error('Invalid tournament'); return }

    const teamData = { teamName: formData.teamName.trim(), teamLeader: formData.leaderName.trim(), players }
    setRegistering(true)
    try {
      const res = await axios.post(apiUrl(`/api/tournaments/${selectedTournament._id}/register`), teamData)
      toast.success(res.data?.message || '✅ Registered!')
      setShowRegisterModal(false)
      setFormData({ teamName: '', leaderName: '', members: '' })
      const r = await axios.get(apiUrl('/api/tournaments'))
      if (Array.isArray(r.data)) setTournaments(r.data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-16 h-16">
          <FaTrophy className="w-full h-full text-cyan-500 opacity-50" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-20 min-h-screen relative">
      {/* ============================ HERO ============================ */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-pink-500/8 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <MotionCard>
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-white/[0.04] border border-cyan-500/30 backdrop-blur-xl">
                <FaFire className="text-cyan-400 animate-pulse" />
                <span className="text-cyan-200 font-black text-xs sm:text-sm tracking-[0.2em] uppercase">Premium Tournaments</span>
                <FaRocket className="text-violet-400" />
              </div>
            </MotionCard>
            <MotionCard delay={0.1}>
              <h1 className="text-display-1">
                <span className="text-white">Discover Your Next</span>
                <span className="block gradient-text mt-2">BATTLE GROUND</span>
              </h1>
            </MotionCard>
            <MotionCard delay={0.2}>
              <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">Join elite tournaments with massive prizes. Squad battles and exclusive events await.</p>
            </MotionCard>
            <MotionCard delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button variant="primary" size="lg" iconLeft={<FaGift />} onClick={() => handleFilterChange('free')}>
                  Free tournaments
                </Button>
                <Button variant="secondary" size="lg" iconLeft={<FaTrophy />} onClick={() => handleFilterChange('paid')}>
                  Premium events
                </Button>
              </div>
            </MotionCard>
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 mb-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          <StatCard icon={FaFire}      label="Live Events"   value={stats.liveCount}                                color="from-orange-500 via-red-500 to-pink-600"   delay={0} />
          <StatCard icon={FaTrophy}    label="Prize Pool"    value={`₹${(stats.totalPrizePool / 100000).toFixed(1)}L`} color="from-amber-500 via-yellow-500 to-orange-600" delay={0.1} />
          <StatCard icon={FaUsers}     label="Total Slots"   value={stats.totalSlots}                              color="from-cyan-500 via-blue-500 to-violet-600"   delay={0.2} />
          <StatCard icon={FaChartLine} label="Game Modes"    value="4+"                                             color="from-violet-500 via-pink-500 to-rose-600"    delay={0.3} />
        </div>
      </section>

      {/* ============================ FILTER ============================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {[
              { v: 'all',  l: 'All Tournaments', icon: '🎮', tone: 'from-slate-700 to-slate-800' },
              { v: 'free', l: 'Free Entry',      icon: '🎁', tone: 'from-emerald-600 to-green-600' },
              { v: 'paid', l: 'Premium',         icon: '🏆', tone: 'from-violet-600 to-pink-600' },
            ].map((t) => {
              const active = filter === t.v
              return (
                <button
                  key={t.v}
                  onClick={() => handleFilterChange(t.v)}
                  className={[
                    'relative px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all overflow-hidden',
                    active
                      ? `bg-gradient-to-r ${t.tone} text-white border-2 border-white/20 shadow-lg scale-105`
                      : 'bg-white/[0.04] text-gray-300 border-2 border-white/[0.08] hover:border-white/20 hover:scale-105',
                  ].join(' ')}
                >
                  {active && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />}
                  <span className="relative">{t.icon} {t.l}</span>
                </button>
              )
            })}
          </div>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-gray-200 font-bold text-sm focus:outline-none focus:border-cyan-400/60 transition-all"
          >
            <option value="popular">Sort: Most popular</option>
            <option value="prize">Sort: Highest prize</option>
            <option value="date">Sort: Coming soon</option>
          </select>
        </div>
      </section>

      {/* ============================ GRID ============================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredTournaments.length > 0 ? (
          <div className="grid gap-6 sm:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTournaments.map((t) => (
              <TournamentCard key={t._id} tournament={t} onRegister={handleRegisterClick} />
            ))}
          </div>
        ) : (
          <MotionCard className="text-center py-20">
            <div className="text-6xl mb-4 opacity-30">🏆</div>
            <p className="text-gray-400 text-xl font-bold mb-2">No tournaments found</p>
            <p className="text-gray-500">Check back soon!</p>
          </MotionCard>
        )}
      </section>

      {/* ============================ CTA ============================ */}
      <Section contained>
        <MotionCard>
          <div className="relative overflow-hidden card-conic rounded-3xl">
            <div className="card-strong rounded-3xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0.95) 0%, rgba(3,7,18,0.98) 100%)' }}>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10" />
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-display-3 text-white mb-3">Ready to <span className="gradient-text">DOMINATE?</span></h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-6">Register for free tournaments and climb to elite premium events.</p>
              <Button variant="primary" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} iconRight={<FaArrowRight />}>
                Back to top
              </Button>
            </div>
          </div>
        </MotionCard>
      </Section>

      {/* ============================ MODAL ============================ */}
      <AnimatePresence>
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto card-conic rounded-2xl"
            >
              <div className="card-strong rounded-2xl" style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0.98) 0%, rgba(3,7,18,1) 100%)' }}>
                <div className="bg-gradient-to-r from-cyan-600/30 to-violet-600/30 border-b border-white/10 p-6 sm:p-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white">{selectedTournament.title}</h2>
                    <p className="text-cyan-200 text-xs font-bold mt-1 uppercase tracking-widest">{selectedTournament.mode}</p>
                  </div>
                  <button onClick={handleCloseModal} disabled={registering} className="text-white hover:text-cyan-300 transition-colors disabled:opacity-50" aria-label="Close">
                    <FaTimes size={22} />
                  </button>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    <div className="rounded-xl bg-white/[0.04] border border-cyan-500/20 p-3 text-center">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">ENTRY</p>
                      <p className="font-mono font-black text-lg text-white mt-0.5">
                        {selectedTournament.entryFee === 0 ? 'FREE' : `₹${selectedTournament.entryFee}`}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] border border-violet-500/20 p-3 text-center">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">PRIZE</p>
                      <p className="font-mono font-black text-lg text-violet-300 mt-0.5">
                        ₹{selectedTournament.prizePool / 100000 >= 1 ? Math.round(selectedTournament.prizePool / 100000) + 'L' : Math.round(selectedTournament.prizePool / 1000) + 'K'}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] border border-pink-500/20 p-3 text-center">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">SLOTS</p>
                      <p className="font-mono font-black text-lg text-pink-300 mt-0.5">{selectedTournament.totalSlots - selectedTournament.registeredTeams}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] border border-emerald-500/20 p-3 text-center">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">DATE</p>
                      <p className="font-mono font-black text-sm text-emerald-300 mt-0.5">{new Date(selectedTournament.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>

                  {selectedTournament.prizeBreakdown && (
                    <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <FaTrophy className="text-amber-400" />
                        <p className="text-amber-300 font-black uppercase tracking-widest text-xs">Prize Distribution</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                        {[
                          { lbl: '1st',   amt: selectedTournament.prizeBreakdown.first,         emoji: '🥇', tone: 'bg-amber-500/20 border-amber-500/40' },
                          { lbl: '2nd',   amt: selectedTournament.prizeBreakdown.second,        emoji: '🥈', tone: 'bg-slate-500/20 border-slate-500/40' },
                          { lbl: '3rd',   amt: selectedTournament.prizeBreakdown.third,         emoji: '🥉', tone: 'bg-orange-500/20 border-orange-500/40' },
                          { lbl: 'Killer',amt: selectedTournament.prizeBreakdown.highestKiller, emoji: '🔥', tone: 'bg-red-500/20 border-red-500/40' },
                        ].map((p) => (
                          <div key={p.lbl} className={`rounded-lg ${p.tone} border p-3 text-center`}>
                            <p className="text-2xl mb-1">{p.emoji}</p>
                            <p className="text-[10px] text-gray-300 font-bold uppercase">{p.lbl}</p>
                            <p className="font-mono font-black text-xs text-white">₹{p.amt.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTournament.specialNote && (
                    <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-3 text-center">
                      <p className="text-cyan-200 text-sm font-bold">{selectedTournament.specialNote}</p>
                    </div>
                  )}

                  {user ? (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-300 mb-1.5 uppercase tracking-widest">Team Name</label>
                        <input
                          type="text" name="teamName" required value={formData.teamName} onChange={handleFormChange}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          placeholder="Enter team name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-300 mb-1.5 uppercase tracking-widest">Leader</label>
                        <input
                          type="text" name="leaderName" required value={formData.leaderName} onChange={handleFormChange}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          placeholder="Your in-game nickname"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-300 mb-1.5 uppercase tracking-widest">Members (comma separated)</label>
                        <textarea
                          name="members" value={formData.members} onChange={handleFormChange}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-pink-400/60 focus:ring-2 focus:ring-pink-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all resize-none text-sm"
                          placeholder="Player1, Player2, Player3, Player4"
                          rows="3"
                        />
                      </div>

                      {selectedTournament.type === 'paid' && (
                        <div className="rounded-xl bg-amber-500/10 border border-amber-500/40 p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💰</span>
                            <p className="text-amber-200 font-black text-sm">PAYMENT REQUIRED</p>
                          </div>
                          <p className="text-amber-100 text-xs">Entry Fee: <span className="font-mono font-bold">₹{selectedTournament.entryFee}</span></p>
                          <p className="text-amber-200/80 text-xs">📲 To complete payment, contact us on WhatsApp / Instagram / YouTube / Discord.</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={registering}
                        iconLeft={<FaRocket />}
                      >
                        {registering ? 'REGISTERING...' : selectedTournament.type === 'paid' ? `PAY ₹${selectedTournament.entryFee} & REGISTER` : 'REGISTER NOW'}
                      </Button>
                    </form>
                  ) : (
                    <div className="rounded-xl bg-red-500/10 border-2 border-red-500/40 p-6 text-center space-y-3">
                      <FaLock className="text-4xl text-red-400 mx-auto" />
                      <p className="text-red-200 font-black text-lg">LOGIN REQUIRED</p>
                      <p className="text-red-300 text-xs">Please login to register for this tournament</p>
                      <Link to="/login" className="block">
                        <Button variant="primary" fullWidth>Go to Login</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tournaments
