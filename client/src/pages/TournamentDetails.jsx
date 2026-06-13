import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  FaTrophy, FaUsers, FaCalendar, FaRupeeSign, FaInfoCircle,
  FaArrowLeft, FaShareAlt, FaRocket, FaLock, FaBolt, FaCheckCircle,
  FaWhatsapp, FaDiscord, FaInstagram, FaYoutube, FaClock, FaShieldAlt
} from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Card, { MotionCard } from '../components/ui/Card'
import Section from '../components/ui/Section'
import Badge from '../components/ui/Badge'
import { apiUrl } from '../utils/api'

// Tiny countdown component
function CountdownTimer({ targetDate }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(targetDate).getTime() - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff / 3600000) % 24)
  const mins = Math.floor((diff / 60000) % 60)
  const secs = Math.floor((diff / 1000) % 60)
  return (
    <div className="grid grid-cols-4 gap-2">
      {[
        { v: days,  l: 'days' },
        { v: hours, l: 'hrs' },
        { v: mins,  l: 'min' },
        { v: secs,  l: 'sec' },
      ].map((u) => (
        <div key={u.l} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-2 text-center">
          <p className="font-mono font-black text-2xl gradient-text-static">{String(u.v).padStart(2, '0')}</p>
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{u.l}</p>
        </div>
      ))}
    </div>
  )
}

const TournamentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [teamData, setTeamData] = useState({ teamName: '', teamLeader: '', players: ['', '', '', ''] })

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await axios.get(apiUrl(`/api/tournaments/${id}`))
        setTournament(res.data)
      } catch {
        toast.error('Tournament not found')
        navigate('/tournaments')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id, navigate])

  const filled = useMemo(() => {
    if (!tournament) return 0
    return Math.round((tournament.registeredTeams / tournament.totalSlots) * 100)
  }, [tournament])
  const isFull = tournament && tournament.registeredTeams >= tournament.totalSlots

  const handleChange = (i, value) => {
    setTeamData(prev => {
      const next = [...prev.players]
      next[i] = value
      return { ...prev, players: next }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) { toast.error('Please login'); return }
    if (!teamData.teamName.trim() || !teamData.teamLeader.trim()) { toast.error('Team name and leader are required'); return }
    const players = teamData.players.map(p => p.trim()).filter(Boolean)
    if (players.length === 0) { toast.error('Add at least one player'); return }

    setRegistering(true)
    try {
      const res = await axios.post(apiUrl(`/api/tournaments/${id}/register`), {
        teamName: teamData.teamName.trim(),
        teamLeader: teamData.teamLeader.trim(),
        players,
      })
      toast.success(res.data?.message || '✅ Registered successfully!')
      const r = await axios.get(apiUrl(`/api/tournaments/${id}`))
      setTournament(r.data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setRegistering(false)
    }
  }

  const handleShare = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: tournament.title, text: 'Join this tournament on Team VioLencE', url })
    } else {
      navigator.clipboard?.writeText(url)
      toast.success('Link copied to clipboard!')
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

  if (!tournament) return null

  return (
    <div className="pt-20 min-h-screen">
      {/* HERO STRIP */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/8 via-transparent to-transparent" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute -top-10 -right-20 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={() => navigate('/tournaments')}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-300 transition-colors mb-6 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to tournaments
          </button>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant={tournament.status === 'open' ? 'lime' : 'red'} pulse>
                  {tournament.status?.toUpperCase() || 'OPEN'}
                </Badge>
                <Badge variant="cyan"><FaBolt className="text-[10px]" /> {tournament.mode}</Badge>
                {tournament.badge && <Badge variant="amber">{tournament.badge}</Badge>}
              </div>
              <h1 className="text-display-2 text-white mb-3">{tournament.title}</h1>
              {tournament.description && (
                <p className="text-gray-300 text-base sm:text-lg max-w-3xl">{tournament.description}</p>
              )}
            </div>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 flex items-center justify-center transition-all"
              aria-label="Share"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
      </section>

      {/* BODY */}
      <Section contained>
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            {tournament.prizeBreakdown && (
              <MotionCard>
                <Card variant="premium" className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <FaTrophy className="text-amber-300 text-xl" />
                    <h2 className="text-xl sm:text-2xl font-display font-black text-white">Prize Pool</h2>
                  </div>
                  <div className="mb-5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Pool</p>
                    <p className="font-mono font-black text-4xl gradient-text-static">₹{tournament.prizePool.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { lbl: '1st',    amt: tournament.prizeBreakdown.first,         emoji: '🥇', tone: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40' },
                      { lbl: '2nd',    amt: tournament.prizeBreakdown.second,        emoji: '🥈', tone: 'from-slate-400/20 to-slate-500/10 border-slate-500/40' },
                      { lbl: '3rd',    amt: tournament.prizeBreakdown.third,         emoji: '🥉', tone: 'from-orange-500/20 to-red-500/10 border-orange-500/40' },
                      { lbl: 'Killer', amt: tournament.prizeBreakdown.highestKiller, emoji: '🔥', tone: 'from-red-500/20 to-pink-500/10 border-red-500/40' },
                    ].map((p) => (
                      <div key={p.lbl} className={`rounded-xl bg-gradient-to-br ${p.tone} border p-4 text-center`}>
                        <p className="text-3xl mb-1">{p.emoji}</p>
                        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{p.lbl}</p>
                        <p className="font-mono font-black text-lg text-white">₹{p.amt.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </MotionCard>
            )}

            {tournament.specialNote && (
              <MotionCard>
                <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/30 p-4 text-center">
                  <p className="text-cyan-200 font-bold text-sm">⚡ {tournament.specialNote}</p>
                </div>
              </MotionCard>
            )}

            <MotionCard>
              <Card variant="premium" className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <FaInfoCircle className="text-cyan-300 text-xl" />
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white">Tournament Info</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <div className="flex items-center gap-2 text-cyan-300 mb-2">
                      <FaCalendar className="text-sm" />
                      <p className="text-[10px] uppercase font-bold tracking-widest">Date</p>
                    </div>
                    <p className="text-white font-bold">{new Date(tournament.date).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <div className="flex items-center gap-2 text-violet-300 mb-2">
                      <FaUsers className="text-sm" />
                      <p className="text-[10px] uppercase font-bold tracking-widest">Format</p>
                    </div>
                    <p className="text-white font-bold">{tournament.mode}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <div className="flex items-center gap-2 text-emerald-300 mb-2">
                      <FaRupeeSign className="text-sm" />
                      <p className="text-[10px] uppercase font-bold tracking-widest">Entry Fee</p>
                    </div>
                    <p className="text-white font-bold">{tournament.entryFee === 0 ? 'FREE' : `₹${tournament.entryFee}`}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <div className="flex items-center gap-2 text-pink-300 mb-2">
                      <FaShieldAlt className="text-sm" />
                      <p className="text-[10px] uppercase font-bold tracking-widest">Verified</p>
                    </div>
                    <p className="text-white font-bold flex items-center gap-1.5"><FaCheckCircle className="text-emerald-400" /> Secure via Razorpay</p>
                  </div>
                </div>
              </Card>
            </MotionCard>

            {tournament.rules?.length > 0 && (
              <MotionCard>
                <Card variant="premium" className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white mb-4">Rules</h2>
                  <ul className="space-y-2.5">
                    {tournament.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </MotionCard>
            )}

            <MotionCard>
              <Card variant="premium" className="p-5 sm:p-6">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Need help? Contact us</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { icon: FaWhatsapp,  label: 'WhatsApp', href: 'https://chat.whatsapp.com/BRydZHpa1ARDNp2DTdBrlu', tone: 'hover:border-emerald-400/40 hover:bg-emerald-500/10' },
                    { icon: FaDiscord,   label: 'Discord',  href: 'https://discord.gg/amN9D8SrN8',                    tone: 'hover:border-indigo-400/40 hover:bg-indigo-500/10' },
                    { icon: FaInstagram, label: 'Instagram',href: 'https://www.instagram.com/teamviolenceesports?igsh=MTRhOTRzMDR4aHQ2Mw==', tone: 'hover:border-pink-400/40 hover:bg-pink-500/10' },
                    { icon: FaYoutube,   label: 'YouTube',  href: 'https://www.youtube.com/channel/UCb1hDeIuyEwrltpCf-0dw9w', tone: 'hover:border-red-400/40 hover:bg-red-500/10' },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        'rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 flex items-center gap-2 text-gray-300 hover:text-white transition-all text-sm font-bold',
                        c.tone,
                      ].join(' ')}
                    >
                      <c.icon />
                      {c.label}
                    </a>
                  ))}
                </div>
              </Card>
            </MotionCard>
          </div>

          {/* RIGHT: sticky register card */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <MotionCard>
              <div className="card-conic rounded-2xl">
                <div className="card-strong rounded-2xl p-5 sm:p-6" style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0.95) 0%, rgba(3,7,18,0.98) 100%)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <FaClock className="text-cyan-300" />
                    <h3 className="text-lg font-display font-black text-white">Starts in</h3>
                  </div>
                  <CountdownTimer targetDate={tournament.date} />

                  <div className="my-5 divider-gradient" />

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Slots Filled</span>
                      <span className="font-mono font-black text-sm gradient-text-static">{filled}%</span>
                    </div>
                    <div className="w-full bg-white/[0.04] rounded-full h-2 overflow-hidden border border-white/[0.04]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${filled}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1.5 font-mono">
                      {tournament.registeredTeams} / {tournament.totalSlots} teams
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 text-center">
                      <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">ENTRY</p>
                      <p className="font-mono font-black text-sm text-white mt-0.5">
                        {tournament.entryFee === 0 ? 'FREE' : `₹${tournament.entryFee}`}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 text-center">
                      <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">PRIZE</p>
                      <p className="font-mono font-black text-sm text-cyan-300 mt-0.5">
                        ₹{tournament.prizePool / 100000 >= 1 ? Math.round(tournament.prizePool / 100000) + 'L' : Math.round(tournament.prizePool / 1000) + 'K'}
                      </p>
                    </div>
                  </div>

                  {isFull ? (
                    <Button variant="secondary" fullWidth disabled iconLeft={<FaLock />}>Tournament Full</Button>
                  ) : user ? (
                    <Button variant="primary" fullWidth size="lg" onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })} iconLeft={<FaRocket />}>
                      Register now
                    </Button>
                  ) : (
                    <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/login')} iconLeft={<FaLock />}>
                      Login to register
                    </Button>
                  )}
                </div>
              </div>
            </MotionCard>

            {tournament.specialNote && (
              <MotionCard delay={0.1}>
                <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
                  <p className="text-[10px] text-amber-300 font-bold uppercase tracking-widest mb-1">Special</p>
                  <p className="text-amber-100 text-sm">{tournament.specialNote}</p>
                </div>
              </MotionCard>
            )}
          </aside>
        </div>

        {/* INLINE REGISTER FORM */}
        {user && !isFull && (
          <div id="register-form" className="mt-8 max-w-3xl mx-auto scroll-mt-24">
            <MotionCard>
              <Card variant="conic" className="p-6 sm:p-10">
                <div className="card-strong rounded-xl p-6 sm:p-8" style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0.95) 0%, rgba(3,7,18,0.98) 100%)' }}>
                  <div className="text-center mb-6">
                    <Badge variant="cyan" className="mb-2">REGISTER YOUR TEAM</Badge>
                    <h2 className="text-display-3 text-white">Lock in your <span className="gradient-text">slot</span></h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-300 mb-1.5 uppercase tracking-widest">Team Name</label>
                        <input
                          type="text" required value={teamData.teamName}
                          onChange={(e) => setTeamData(p => ({ ...p, teamName: e.target.value }))}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          placeholder="Enter team name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-300 mb-1.5 uppercase tracking-widest">Team Leader</label>
                        <input
                          type="text" required value={teamData.teamLeader}
                          onChange={(e) => setTeamData(p => ({ ...p, teamLeader: e.target.value }))}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          placeholder="Your nickname"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-300 mb-1.5 uppercase tracking-widest">Players (in-game names)</label>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {teamData.players.map((p, i) => (
                          <input
                            key={i}
                            type="text"
                            value={p}
                            onChange={(e) => handleChange(i, e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 focus:border-pink-400/60 focus:ring-2 focus:ring-pink-400/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                            placeholder={`Player ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    {tournament.type === 'paid' && (
                      <div className="rounded-xl bg-amber-500/10 border border-amber-500/40 p-4">
                        <p className="text-amber-200 font-bold text-sm">💰 Payment of ₹{tournament.entryFee} required after registration. We'll contact you on WhatsApp / Discord.</p>
                      </div>
                    )}
                    <Button type="submit" variant="primary" size="lg" fullWidth loading={registering} iconLeft={<FaRocket />}>
                      {registering ? 'REGISTERING...' : tournament.type === 'paid' ? `PAY ₹${tournament.entryFee} & REGISTER` : 'CONFIRM REGISTRATION'}
                    </Button>
                  </form>
                </div>
              </Card>
            </MotionCard>
          </div>
        )}
      </Section>
    </div>
  )
}

export default TournamentDetails
