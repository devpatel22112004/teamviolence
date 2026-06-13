import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaTrophy, FaCalendar, FaUsers, FaRupeeSign, FaTimes,
  FaCheckCircle, FaClock, FaArrowRight, FaBolt,
} from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const STATUS = {
  completed: { variant: 'lime',  label: 'Confirmed', Icon: FaCheckCircle },
  pending:   { variant: 'amber', label: 'Pending',   Icon: FaClock },
  failed:    { variant: 'red',   label: 'Failed',    Icon: FaTimes },
}

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchMyRegistrations() }, [])

  const fetchMyRegistrations = async () => {
    try {
      const res = await axios.get('/api/tournaments/my/registrations')
      setRegistrations(res.data)
    } catch (error) {
      toast.error('Unable to load your registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (reg) => {
    if (!window.confirm(`Cancel your registration for "${reg.tournamentTitle}"?`)) return
    try {
      await axios.delete(`/api/tournaments/registrations/${reg._id}`)
      toast.success('Registration cancelled')
      fetchMyRegistrations()
    } catch {
      toast.error('Failed to cancel')
    }
  }

  return (
    <div className="pt-20 pb-12">
      {/* Hero */}
      <Section aurora className="overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="cyan" size="md">My Registrations</Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.05]">
              Tournament <span className="gradient-text">Registrations</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Track every event you've entered — payment status, team details, and quick actions.
            </p>
          </div>
          {!loading && registrations.length > 0 && (
            <div className="glass rounded-2xl px-5 py-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total</p>
              <p className="font-mono font-black text-3xl text-white">{registrations.length}</p>
            </div>
          )}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => <div key={i} className="glass rounded-2xl p-6 h-40 animate-pulse" />)}
          </div>
        ) : registrations.length > 0 ? (
          <div className="relative">
            {/* Vertical timeline rail (desktop) */}
            <div className="hidden md:block absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/40 via-violet-500/30 to-transparent" />

            <div className="space-y-4">
              {registrations.map((reg, i) => {
                const status = STATUS[reg.paymentStatus] || STATUS.pending
                const StatusIcon = status.Icon
                return (
                  <MotionCard key={reg._id} delay={i * 0.05}>
                    <div className="relative md:pl-16">
                      {/* Timeline dot */}
                      <div className="hidden md:grid absolute left-0 top-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 p-[2px]">
                        <div className="w-full h-full rounded-2xl bg-surface-1 grid place-items-center">
                          <StatusIcon className="text-cyan-300" />
                        </div>
                      </div>

                      <Card variant="premium" className="p-5 sm:p-6 group">
                        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                          <div className="min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                              <Badge variant={status.variant} size="sm" icon={StatusIcon}>
                                {status.label}
                              </Badge>
                              {reg.entryFee === 0 ? (
                                <Badge variant="cyan" size="sm">FREE</Badge>
                              ) : (
                                <Badge variant="amber" size="sm" icon={FaRupeeSign}>{reg.entryFee}</Badge>
                              )}
                            </div>
                            <h3 className="mt-3 text-xl font-display font-black text-white leading-tight group-hover:gradient-text transition-all truncate">
                              {reg.tournamentTitle}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">{reg.tournamentMode}</p>

                            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                              <Field icon={FaUsers}   label="Team"     value={reg.teamName} />
                              <Field icon={FaCalendar} label="Registered" value={new Date(reg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} />
                            </div>

                            <div className="mt-3">
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1.5">Players</p>
                              <div className="flex flex-wrap gap-1.5">
                                {reg.players?.map((p, idx) => (
                                  <span key={idx} className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-cyan-500/10 text-cyan-200 border border-cyan-500/20">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex md:flex-col gap-2 md:w-40">
                            <Button
                              size="sm" variant="ghost" fullWidth
                              onClick={() => handleCancel(reg)}
                              className="!text-red-300 hover:!bg-red-500/10"
                              iconLeft={<FaTimes />}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </MotionCard>
                )
              })}
            </div>
          </div>
        ) : (
          <Card variant="glass" className="p-12 text-center">
            <FaTrophy className="text-7xl text-gray-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-display font-black text-white">No registrations yet</h3>
            <p className="text-gray-400 mt-2">Browse upcoming tournaments and grab your slot.</p>
            <div className="mt-6">
              <Button as={Link} to="/tournaments" size="md" iconLeft={<FaBolt />} iconRight={<FaArrowRight />}>
                Browse Tournaments
              </Button>
            </div>
          </Card>
        )}
      </Section>
    </div>
  )
}

function Field({ icon: Icon, label, value }) {
  return (
    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
        <Icon className="text-cyan-300" /> {label}
      </p>
      <p className="text-white font-bold truncate text-sm mt-0.5">{value}</p>
    </div>
  )
}
