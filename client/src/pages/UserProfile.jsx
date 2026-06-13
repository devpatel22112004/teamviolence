import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaUser, FaEdit, FaSave, FaTimes, FaLock, FaSignOutAlt,
  FaTrophy, FaCheckCircle, FaClock, FaEnvelope, FaPhone, FaCalendar,
} from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const TABS = [
  { id: 'overview', label: 'Overview', icon: FaUser },
  { id: 'settings', label: 'Settings', icon: FaEdit },
  { id: 'security', label: 'Security', icon: FaLock },
]

export default function UserProfile() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registrations, setRegistrations] = useState([])
  const [fetchingReg, setFetchingReg] = useState(true)

  const [profileData, setProfileData] = useState({ name: '', email: '', phone: '' })
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  useEffect(() => {
    if (!user) return
    setProfileData({ name: user.name || '', email: user.email || '', phone: user.phone || '' })
    fetchRegistrations()
  }, [user])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('/api/tournaments/my/registrations')
      setRegistrations(res.data)
    } catch {
      /* silent */
    } finally {
      setFetchingReg(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    if (!profileData.name.trim() || !profileData.phone.trim()) {
      toast.error('Name and phone are required')
      return
    }
    setLoading(true)
    try {
      await axios.put('/api/users/profile', profileData)
      toast.success('Profile updated')
      setIsEditing(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('All fields are required')
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('At least 6 characters')
      return
    }
    setLoading(true)
    try {
      await axios.put('/api/users/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      })
      toast.success('Password changed')
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
      setShowPasswordChange(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Change failed')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400">Please log in to view your profile</p>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-12">
      {/* Hero — profile header */}
      <Section aurora className="overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <Avatar name={user.name} size="2xl" ring="aurora" className="shrink-0" />
          <div className="flex-1 min-w-0">
            <Badge variant={user.role === 'admin' ? 'amber' : 'cyan'} size="md">
              {user.role === 'admin' ? '👑 Admin' : '🎮 Player'}
            </Badge>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-black leading-[1.1]">
              {user.name}
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5"><FaEnvelope className="text-cyan-300" /> {user.email}</span>
              {user.phone && <span className="flex items-center gap-1.5"><FaPhone className="text-cyan-300" /> {user.phone}</span>}
            </p>
          </div>
          <Button variant="danger" size="md" onClick={logout} iconLeft={<FaSignOutAlt />}>
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10">
          {TABS.map((t) => {
            const Icon = t.icon
            const active = activeTab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => { setActiveTab(t.id); setIsEditing(false); setShowPasswordChange(false) }}
                className={`relative px-4 py-3 text-sm font-bold flex items-center gap-2 transition ${
                  active ? 'text-cyan-300' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="text-sm" />
                {t.label}
                {active && (
                  <motion.span
                    layoutId="profile-tab"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400"
                  />
                )}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Tab content */}
      <Section>
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-[1fr_1.4fr] gap-6"
            >
              {/* Profile card */}
              <MotionCard>
                <Card variant="premium" className="p-6 sm:p-8 h-full">
                  <h2 className="text-lg font-display font-black text-white">Account</h2>
                  <div className="mt-5 space-y-3">
                    <Field icon={FaUser}    label="Name"           value={user.name} />
                    <Field icon={FaEnvelope} label="Email"          value={user.email} />
                    <Field icon={FaPhone}    label="Phone"          value={user.phone || 'Not set'} />
                    <Field icon={FaCalendar} label="Member Since"
                      value={user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                    />
                  </div>
                </Card>
              </MotionCard>

              {/* Registrations */}
              <MotionCard delay={0.08}>
                <Card variant="premium" className="p-6 sm:p-8 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
                      <FaTrophy className="text-cyan-300" /> Your Registrations
                    </h2>
                    <span className="font-mono text-sm text-gray-400">{registrations.length}</span>
                  </div>

                  {fetchingReg ? (
                    <div className="space-y-2">
                      {[0, 1, 2].map((i) => <div key={i} className="glass rounded-xl p-3 h-16 animate-pulse" />)}
                    </div>
                  ) : registrations.length > 0 ? (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 -mr-2">
                      {registrations.map((reg) => (
                        <div key={reg._id} className="px-4 py-3 rounded-xl glass border border-white/5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-display font-bold text-white text-sm truncate">{reg.tournamentTitle}</p>
                              <p className="text-[11px] text-cyan-300 mt-0.5">{reg.teamName}</p>
                              <p className="text-[10px] text-gray-500 mt-1">
                                {new Date(reg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                            {reg.paymentStatus === 'completed'
                              ? <Badge variant="lime" size="sm" icon={FaCheckCircle}>Confirmed</Badge>
                              : <Badge variant="amber" size="sm" icon={FaClock}>Pending</Badge>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <FaTrophy className="text-5xl text-gray-600 mx-auto mb-3 opacity-50" />
                      <p className="text-sm text-gray-400">No tournament registrations yet</p>
                    </div>
                  )}
                </Card>
              </MotionCard>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            >
              <Card variant="premium" className="p-6 sm:p-8 max-w-2xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
                    <FaEdit className="text-cyan-300" /> Edit Profile
                  </h2>
                  {!isEditing && (
                    <Button size="sm" variant="secondary" iconLeft={<FaEdit />} onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      required
                    />
                    <Input
                      type="email" label="Email" value={profileData.email} disabled
                    />
                    <Input
                      type="tel"
                      label="Phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      required
                    />
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" size="md" loading={loading} iconLeft={<FaSave />} fullWidth>
                        Save Changes
                      </Button>
                      <Button type="button" size="md" variant="ghost" onClick={() => setIsEditing(false)} iconLeft={<FaTimes />}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <Field icon={FaUser}    label="Full Name" value={profileData.name} />
                    <Field icon={FaEnvelope} label="Email"     value={profileData.email} />
                    <Field icon={FaPhone}    label="Phone"     value={profileData.phone || 'Not set'} />
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            >
              <Card variant="premium" className="p-6 sm:p-8 max-w-2xl">
                <h2 className="text-lg font-display font-black text-white flex items-center gap-2 mb-5">
                  <FaLock className="text-cyan-300" /> Security
                </h2>

                {showPasswordChange ? (
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <Input
                      type="password" label="Current Password"
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                      required
                    />
                    <Input
                      type="password" label="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      hint="At least 6 characters"
                      required
                    />
                    <Input
                      type="password" label="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                    />
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" size="md" loading={loading} iconLeft={<FaSave />} fullWidth>
                        Update Password
                      </Button>
                      <Button type="button" size="md" variant="ghost" onClick={() => setShowPasswordChange(false)} iconLeft={<FaTimes />}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Keep your account secure by using a strong, unique password. Change it regularly.
                    </p>
                    <Button size="md" onClick={() => setShowPasswordChange(true)} iconLeft={<FaLock />}>
                      Change Password
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  )
}

function Field({ icon: Icon, label, value }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
        <Icon className="text-cyan-300" /> {label}
      </p>
      <p className="text-white font-bold truncate text-sm">{value || '—'}</p>
    </div>
  )
}
