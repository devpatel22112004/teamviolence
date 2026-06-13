import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaUsers, FaEdit, FaTrash, FaTimes, FaPlus,
  FaUserShield, FaCrown, FaArrowRight, FaCalendar,
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Section from '../components/ui/Section'
import Card, { MotionCard } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function TeamManagement() {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingTeam, setEditingTeam] = useState(null)
  const [editFormData, setEditFormData] = useState({ teamName: '', leaderName: '', members: '' })

  useEffect(() => { fetchRegistrations() }, [])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('/api/users/registrations')
      setRegistrations(res.data)
    } catch (error) {
      toast.error('Failed to load teams')
    } finally {
      setLoading(false)
    }
  }

  const handleEditTeam = (reg) => {
    setEditingTeam(reg._id)
    setEditFormData({
      teamName: reg.teamName,
      leaderName: reg.teamLeader,
      members: reg.players.join(', '),
    })
  }

  const handleUpdateTeam = async (e, registrationId) => {
    e.preventDefault()
    try {
      const membersArray = editFormData.members.split(',').map((m) => m.trim()).filter(Boolean)
      await axios.put(`/api/tournaments/registrations/${registrationId}`, {
        teamName: editFormData.teamName,
        leaderName: editFormData.leaderName,
        members: membersArray,
      })
      toast.success('Team updated')
      setEditingTeam(null)
      fetchRegistrations()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    }
  }

  const handleCancelRegistration = async (reg) => {
    if (!confirm(`Cancel your registration for "${reg.tournament.title}"?`)) return
    try {
      await axios.delete(`/api/tournaments/registrations/${reg._id}`)
      toast.success('Registration cancelled')
      fetchRegistrations()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cancel failed')
    }
  }

  return (
    <div className="pt-20 pb-12">
      {/* Hero */}
      <Section aurora className="overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="cyan" size="md">Roster HQ</Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-display font-black leading-[1.05]">
              Team <span className="gradient-text">Management</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Edit your roster, swap players, and manage your registered teams — all in one place.
            </p>
          </div>
          <Button as={Link} to="/tournaments" size="md" iconLeft={<FaPlus />}>
            Register New Team
          </Button>
        </div>
      </Section>

      {/* Team list */}
      <Section>
        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[0, 1].map((i) => <div key={i} className="glass rounded-2xl p-6 h-48 animate-pulse" />)}
          </div>
        ) : registrations.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-5">
            {registrations.map((reg, i) => (
              <MotionCard key={reg._id} delay={i * 0.06}>
                <Card variant="premium" className="overflow-hidden h-full">
                  {/* Card header */}
                  <div className="px-5 py-4 flex items-center justify-between gap-3 border-b border-white/5">
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-white text-base leading-tight truncate group-hover:gradient-text">
                        {reg.tournament.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                        <FaCalendar className="text-cyan-300" />
                        {new Date(reg.tournament.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    {reg.paymentStatus === 'completed' ? (
                      <Badge variant="lime" size="sm">Confirmed</Badge>
                    ) : (
                      <Badge variant="amber" size="sm">Pending</Badge>
                    )}
                  </div>

                  <div className="p-5">
                    <AnimatePresence mode="wait">
                      {editingTeam === reg._id ? (
                        <motion.form
                          key="edit"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          onSubmit={(e) => handleUpdateTeam(e, reg._id)}
                          className="space-y-4"
                        >
                          <Input
                            label="Team Name"
                            value={editFormData.teamName}
                            onChange={(e) => setEditFormData({ ...editFormData, teamName: e.target.value })}
                            required
                          />
                          <Input
                            label="Team Leader"
                            value={editFormData.leaderName}
                            onChange={(e) => setEditFormData({ ...editFormData, leaderName: e.target.value })}
                            required
                          />
                          <Input
                            as="textarea"
                            label="Team Members (comma-separated)"
                            value={editFormData.members}
                            onChange={(e) => setEditFormData({ ...editFormData, members: e.target.value })}
                            hint="Player1, Player2, Player3, Player4"
                            required
                          />
                          <div className="flex gap-3 pt-1">
                            <Button type="submit" size="md" fullWidth>Save Changes</Button>
                            <Button type="button" size="md" variant="ghost" onClick={() => setEditingTeam(null)} iconLeft={<FaTimes />}>
                              Cancel
                            </Button>
                          </div>
                        </motion.form>
                      ) : (
                        <motion.div
                          key="view"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                        >
                          <div className="space-y-3">
                            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
                                <FaCrown className="text-amber-300" /> Team Name
                              </p>
                              <p className="text-cyan-200 font-bold truncate">{reg.teamName}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
                                  <FaUserShield className="text-violet-300" /> Leader
                                </p>
                                <p className="text-white font-bold truncate text-sm">{reg.teamLeader}</p>
                              </div>
                              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
                                  <FaUsers className="text-cyan-300" /> Roster Size
                                </p>
                                <p className="text-white font-bold text-sm">{reg.players.length} Players</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                                <FaUsers className="text-lime-300" /> Members
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {reg.players.map((p, idx) => (
                                  <span key={idx} className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-200 border border-cyan-500/20">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-5 pt-4 border-t border-white/5">
                            <Button size="sm" variant="secondary" onClick={() => handleEditTeam(reg)} iconLeft={<FaEdit />} fullWidth>
                              Edit Team
                            </Button>
                            <Button
                              size="sm" variant="ghost" onClick={() => handleCancelRegistration(reg)}
                              className="!text-red-300 hover:!bg-red-500/10"
                              iconLeft={<FaTrash />}
                            >
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </MotionCard>
            ))}
          </div>
        ) : (
          <Card variant="glass" className="p-12 text-center">
            <FaUsers className="text-7xl text-gray-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-display font-black text-white">No teams yet</h3>
            <p className="text-gray-400 mt-2">Register for a tournament to build your first team.</p>
            <div className="mt-6">
              <Button as={Link} to="/tournaments" size="md" iconLeft={<FaPlus />} iconRight={<FaArrowRight />}>
                Browse Tournaments
              </Button>
            </div>
          </Card>
        )}
      </Section>
    </div>
  )
}
