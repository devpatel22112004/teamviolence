import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUsers, FaEdit, FaTrash, FaTimes, FaPlus, FaUserShield, FaCrown } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const TeamManagement = () => {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingTeam, setEditingTeam] = useState(null)
  const [editFormData, setEditFormData] = useState({
    teamName: '',
    leaderName: '',
    members: ''
  })

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('/api/users/registrations')
      setRegistrations(res.data)
    } catch (error) {
      console.error('Error fetching registrations:', error)
      toast.error('Failed to load registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleEditTeam = (reg) => {
    setEditingTeam(reg._id)
    setEditFormData({
      teamName: reg.teamName,
      leaderName: reg.teamLeader,
      members: reg.players.join(', ')
    })
  }

  const handleUpdateTeam = async (e, registrationId) => {
    e.preventDefault()
    
    try {
      const membersArray = editFormData.members.split(',').map(m => m.trim()).filter(m => m)
      
      await axios.put(`/api/tournaments/registrations/${registrationId}`, {
        teamName: editFormData.teamName,
        leaderName: editFormData.leaderName,
        members: membersArray
      })
      
      toast.success('✅ Team updated successfully!')
      setEditingTeam(null)
      fetchRegistrations()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update team')
    }
  }

  const handleCancelRegistration = async (registrationId, tournamentTitle) => {
    if (!confirm(`Are you sure you want to cancel your registration for "${tournamentTitle}"?`)) {
      return
    }

    try {
      await axios.delete(`/api/tournaments/registrations/${registrationId}`)
      toast.success('❌ Registration cancelled successfully')
      fetchRegistrations()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel registration')
    }
  }

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Team <span className="gradient-text">Management</span>
          </h1>
          <p className="text-gray-400 text-lg">View and manage your tournament teams</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : registrations.length > 0 ? (
          <div className="space-y-8">
            {registrations.map((reg, index) => (
              <motion.div
                key={reg._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-premium"
              >
                {/* Tournament Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-700/50">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{reg.tournament.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(reg.tournament.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  {reg.paymentStatus === 'completed' ? (
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                      ✓ Confirmed
                    </span>
                  ) : (
                    <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">
                      ⏳ Pending Payment
                    </span>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {editingTeam === reg._id ? (
                    /* Edit Form */
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => handleUpdateTeam(e, reg._id)}
                      className="space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">
                            <FaCrown className="inline mr-2" />
                            Team Name
                          </label>
                          <input
                            type="text"
                            value={editFormData.teamName}
                            onChange={(e) => setEditFormData({ ...editFormData, teamName: e.target.value })}
                            className="w-full bg-dark-800/50 border border-primary-500/30 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">
                            <FaUserShield className="inline mr-2" />
                            Team Leader
                          </label>
                          <input
                            type="text"
                            value={editFormData.leaderName}
                            onChange={(e) => setEditFormData({ ...editFormData, leaderName: e.target.value })}
                            className="w-full bg-dark-800/50 border border-primary-500/30 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          <FaUsers className="inline mr-2" />
                          Team Members (comma-separated)
                        </label>
                        <textarea
                          value={editFormData.members}
                          onChange={(e) => setEditFormData({ ...editFormData, members: e.target.value })}
                          className="w-full bg-dark-800/50 border border-primary-500/30 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors h-24"
                          placeholder="Player1, Player2, Player3, Player4"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate player names with commas</p>
                      </div>
                      <div className="flex space-x-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="btn-modern flex-1"
                        >
                          Save Changes
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setEditingTeam(null)}
                          className="px-6 py-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <FaTimes />
                          <span>Cancel</span>
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : (
                    /* Team Display */
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-4 mb-6">
                        <div className="bg-dark-800/30 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <FaCrown className="text-accent-500 mr-2" />
                            <h4 className="text-sm text-gray-400">Team Name</h4>
                          </div>
                          <p className="text-xl font-bold text-primary-400">{reg.teamName}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-dark-800/30 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <FaUserShield className="text-primary-500 mr-2" />
                              <h4 className="text-sm text-gray-400">Team Leader</h4>
                            </div>
                            <p className="text-lg font-semibold">{reg.teamLeader}</p>
                          </div>

                          <div className="bg-dark-800/30 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <FaUsers className="text-cyan-500 mr-2" />
                              <h4 className="text-sm text-gray-400">Team Size</h4>
                            </div>
                            <p className="text-lg font-semibold">{reg.players.length} Players</p>
                          </div>
                        </div>

                        <div className="bg-dark-800/30 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <FaUsers className="text-green-500 mr-2" />
                            <h4 className="text-sm text-gray-400">Team Members</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {reg.players.map((player, idx) => (
                              <span
                                key={idx}
                                className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {player}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEditTeam(reg)}
                          className="btn-modern flex-1 flex items-center justify-center space-x-2"
                        >
                          <FaEdit />
                          <span>Edit Team</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCancelRegistration(reg._id, reg.tournament.title)}
                          className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <FaTrash />
                          <span>Cancel</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-premium text-center py-16"
          >
            <FaUsers className="text-7xl text-gray-600 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold mb-2">No Teams Yet</h3>
            <p className="text-gray-400 text-lg mb-8">Register for a tournament to create your first team!</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/tournaments"
              className="btn-modern inline-block"
            >
              <FaPlus className="inline mr-2" />
              Browse Tournaments
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TeamManagement
