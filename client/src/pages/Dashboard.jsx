import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaTrophy, FaUser, FaCalendar, FaCheckCircle, FaClock, FaEdit,
  FaTimes, FaGamepad, FaUsers, FaMedal, FaArrowRight, FaBolt, FaPlus,
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const STAT_DEFS = [
  { key: 'totalTournaments',     label: 'Total Tournaments', icon: FaGamepad, color: 'cyan',    gradient: 'from-cyan-500/20 to-cyan-500/5' },
  { key: 'activeTournaments',    label: 'Active',            icon: FaTrophy,  color: 'lime',    gradient: 'from-lime-500/20 to-lime-500/5' },
  { key: 'completedTournaments', label: 'Completed',         icon: FaMedal,   color: 'amber',   gradient: 'from-amber-500/20 to-amber-500/5' },
]

export default function Dashboard() {
  const { user, setUser } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [updating, setUpdating] = useState(false)
  const [stats, setStats] = useState({ totalTournaments: 0, activeTournaments: 0, completedTournaments: 0 })

  useEffect(() => { fetchRegistrations() }, [])

  useEffect(() => {
    if (user) setEditData({ name: user.name || '', phone: user.phone || '' })
  }, [user])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('/api/users/registrations')
      setRegistrations(res.data)
      const total = res.data.length
      const active = res.data.filter((r) => new Date(r.tournament.date) > new Date()).length
      setStats({ totalTournaments: total, activeTournaments: active, completedTournaments: total - active })
    } catch {
      /* silent */
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const res = await axios.put('/api/users/profile', editData)
      setUser(res.data.user)
      toast.success('Profile updated')
      setEditMode(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  const cancelEdit = () => {
    setEditMode(false)
    setEditData({ name: user?.name || '', phone: user?.phone || '' })
  }

  return (
    <div className="pt-20 pb-12">
      {/* Hero */}
      <Section aurora className="overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <Avatar
            name={user?.name}
            size="2xl"
            ring="aurora"
            className="shrink-0"
          />
          <div className="flex-1 min-w-0">
            <Badge variant="cyan" pulse size="md">Member Dashboard</Badge>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-black leading-[1.1]">
              Welcome, <span className="gradient-text">{user?.name}</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Manage your tournament registrations, edit your profile, and track your journey.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button as={Link} to="/tournaments" variant="primary" size="md" iconLeft={<FaBolt />}>
              Browse Tournaments
            </Button>
            <Button as={Link} to="/team-management" variant="secondary" size="md" iconLeft={<FaUsers />}>
              My Teams
            </Button>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section contained={false} className="!py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {STAT_DEFS.map((s, i) => {
              const Icon = s.icon
              return (
                <MotionCard key={s.key} delay={i * 0.08}>
                  <Card variant="premium" className={`p-6 bg-gradient-to-br ${s.gradient} group`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{s.label}</p>
                        <p className="font-mono font-black text-4xl text-white mt-1">{stats[s.key]}</p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl glass grid place-items-center group-hover:scale-110 transition">
                        <Icon className="text-cyan-300 text-2xl" />
                      </div>
                    </div>
                  </Card>
                </MotionCard>
              )
            })}
          </div>
        </div>
      </Section>

      {/* Profile + Registrations */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Profile */}
          <MotionCard>
            <Card variant="premium" className="p-6 sm:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-black text-white flex items-center gap-2">
                  <FaUser className="text-cyan-300" /> Profile
                </h2>
                {!editMode && (
                  <Button variant="secondary" size="sm" onClick={() => setEditMode(true)} iconLeft={<FaEdit />}>
                    Edit
                  </Button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {editMode ? (
                  <motion.form
                    key="edit"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={handleUpdateProfile}
                    className="space-y-4"
                  >
                    <Input
                      label="Name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      required
                    />
                    <Input
                      type="tel"
                      label="Phone"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Email</label>
                        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-sm">{user?.email}</div>
                        <p className="text-[10px] text-gray-500 mt-1">Cannot be changed</p>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Member Since</label>
                        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-sm">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" size="md" loading={updating} fullWidth>Save Changes</Button>
                      <Button type="button" size="md" variant="ghost" onClick={cancelEdit} iconLeft={<FaTimes />}>Cancel</Button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="view"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-3"
                  >
                    <ProfileField label="Name" value={user?.name} />
                    <ProfileField label="Email" value={user?.email} />
                    <ProfileField label="Phone" value={user?.phone || 'Not provided'} />
                    <ProfileField
                      label="Member Since"
                      value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </MotionCard>

          {/* Quick actions */}
          <MotionCard delay={0.1}>
            <Card variant="conic" className="p-6 sm:p-8 h-full">
              <h2 className="text-xl font-display font-black text-white flex items-center gap-2">
                <FaBolt className="text-amber-300" /> Quick Actions
              </h2>
              <p className="text-sm text-gray-400 mt-1">Jump into the action</p>

              <div className="mt-6 space-y-3">
                <QuickAction to="/tournaments"        icon={FaTrophy}   title="Browse Tournaments"   desc="Find your next match" />
                <QuickAction to="/team-management"     icon={FaUsers}    title="Manage Team"           desc="Build or join a roster" />
                <QuickAction to="/my-registrations"    icon={FaGamepad}  title="My Registrations"      desc="Track all your entries" />
                <QuickAction to="/profile"             icon={FaUser}     title="Public Profile"        desc="How others see you" />
              </div>
            </Card>
          </MotionCard>
        </div>
      </Section>

      {/* Registrations */}
      <Section>
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-2xl font-display font-black text-white flex items-center gap-2">
            <FaTrophy className="text-cyan-300" /> My Registrations
            <span className="text-sm font-normal text-gray-400">({registrations.length} total)</span>
          </h2>
          <Button as={Link} to="/tournaments" size="sm" variant="secondary" iconLeft={<FaPlus />}>
            Register for more
          </Button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <div key={i} className="glass rounded-2xl p-6 h-44 animate-pulse" />
            ))}
          </div>
        ) : registrations.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {registrations.map((reg, i) => (
              <MotionCard key={reg._id} delay={i * 0.05}>
                <Card variant="premium" hoverLift className="p-5 group">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-white text-lg leading-tight line-clamp-1 group-hover:gradient-text transition-all">
                        {reg.tournament.title}
                      </h3>
                      <p className="text-cyan-300 text-xs font-bold mt-1 flex items-center gap-1.5">
                        <FaUsers /> {reg.teamName}
                      </p>
                    </div>
                    {reg.paymentStatus === 'completed' ? (
                      <Badge variant="lime" size="sm" icon={FaCheckCircle}>Paid</Badge>
                    ) : (
                      <Badge variant="amber" size="sm" icon={FaClock}>Pending</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Mini icon={FaCalendar} label="Date" value={new Date(reg.tournament.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
                    <Mini icon={FaBolt} label="Entry" value={reg.tournament.entryFee === 0 ? 'FREE' : `₹${reg.tournament.entryFee}`} accent />
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs">
                    <div>
                      <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Leader</span>
                      <p className="text-cyan-200 font-bold">{reg.teamLeader}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Members</span>
                      <p className="text-gray-300 truncate">{reg.players?.join(', ')}</p>
                    </div>
                  </div>
                </Card>
              </MotionCard>
            ))}
          </div>
        ) : (
          <Card variant="glass" className="p-12 text-center">
            <FaTrophy className="text-7xl text-gray-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-display font-black text-white">No tournaments yet</h3>
            <p className="text-gray-400 mt-2">Join your first tournament and start competing.</p>
            <div className="mt-6">
              <Button as={Link} to="/tournaments" size="md" iconRight={<FaArrowRight />}>
                Browse Tournaments
              </Button>
            </div>
          </Card>
        )}
      </Section>
    </div>
  )
}

function ProfileField({ label, value }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{label}</p>
      <p className="text-white font-bold truncate">{value || '—'}</p>
    </div>
  )
}

function QuickAction({ to, icon: Icon, title, desc }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-xl glass border border-white/5 hover:border-cyan-500/30 transition group"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-500/20 grid place-items-center shrink-0 group-hover:scale-110 transition">
        <Icon className="text-cyan-300" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm">{title}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      <FaArrowRight className="text-cyan-300 text-xs group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}

function Mini({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
      <Icon className={accent ? 'text-amber-300' : 'text-cyan-300'} />
      <div className="min-w-0">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold leading-none">{label}</p>
        <p className="text-white font-bold text-sm truncate">{value}</p>
      </div>
    </div>
  )
}
