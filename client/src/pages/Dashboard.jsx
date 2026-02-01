import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrophy, FaUser, FaCalendar, FaCheckCircle, FaClock, FaEdit, FaTimes, FaGamepad, FaUsers, FaMedal } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user, setUser } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  })
  const [updating, setUpdating] = useState(false)
  const [stats, setStats] = useState({
    totalTournaments: 0,
    activeTournaments: 0,
    completedTournaments: 0
  })

  useEffect(() => {
    fetchRegistrations()
  }, [])

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('/api/users/registrations')
      setRegistrations(res.data)
      
      // Calculate stats
      const total = res.data.length
      const active = res.data.filter(r => new Date(r.tournament.date) > new Date()).length
      const completed = total - active
      
      setStats({
        totalTournaments: total,
        activeTournaments: active,
        completedTournaments: completed
      })
    } catch (error) {
      // Error fetching registration stats
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
      toast.success('✅ Profile updated successfully!')
      setEditMode(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2 break-words">
            Welcome, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400">Manage your tournament registrations and profile</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-premium bg-gradient-to-br from-primary-500/20 to-cyan-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Tournaments</p>
                <p className="text-4xl font-bold text-primary-500">{stats.totalTournaments}</p>
              </div>
              <FaGamepad className="text-5xl text-primary-500/30" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-premium bg-gradient-to-br from-green-500/20 to-emerald-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active</p>
                <p className="text-4xl font-bold text-green-500">{stats.activeTournaments}</p>
              </div>
              <FaTrophy className="text-5xl text-green-500/30" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-premium bg-gradient-to-br from-orange-500/20 to-amber-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Completed</p>
                <p className="text-4xl font-bold text-orange-500">{stats.completedTournaments}</p>
              </div>
              <FaMedal className="text-5xl text-orange-500/30" />
            </div>
          </motion.div>
        </div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card-premium mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold flex items-center">
              <FaUser className="text-primary-500 mr-3" />
              Profile Information
            </h2>
            {!editMode && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditMode(true)}
                className="btn-modern text-sm flex items-center space-x-2"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {editMode ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleUpdateProfile}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full bg-dark-800/50 border border-primary-500/30 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full bg-dark-800/50 border border-primary-500/30 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Email</label>
                    <input
                      type="email"
                      value={user?.email}
                      disabled
                      className="w-full bg-dark-800/30 border border-dark-700 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Member Since</label>
                    <input
                      type="text"
                      value={new Date(user?.createdAt).toLocaleDateString('en-IN')}
                      disabled
                      className="w-full bg-dark-800/30 border border-dark-700 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={updating}
                    className="btn-modern flex-1"
                  >
                    {updating ? 'Updating...' : 'Save Changes'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      setEditMode(false)
                      setEditData({ name: user?.name || '', phone: user?.phone || '' })
                    }}
                    className="px-6 py-3 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="bg-dark-800/30 rounded-lg p-4">
                  <label className="text-sm text-gray-400 block mb-2">Name</label>
                  <p className="text-lg font-semibold">{user?.name}</p>
                </div>
                <div className="bg-dark-800/30 rounded-lg p-4">
                  <label className="text-sm text-gray-400 block mb-2">Email</label>
                  <p className="text-lg font-semibold">{user?.email}</p>
                </div>
                <div className="bg-dark-800/30 rounded-lg p-4">
                  <label className="text-sm text-gray-400 block mb-2">Phone</label>
                  <p className="text-lg font-semibold">{user?.phone || 'Not provided'}</p>
                </div>
                <div className="bg-dark-800/30 rounded-lg p-4">
                  <label className="text-sm text-gray-400 block mb-2">Member Since</label>
                  <p className="text-lg font-semibold">
                    {new Date(user?.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tournament Registrations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center">
            <FaTrophy className="text-primary-500 mr-3" />
            My Tournament Registrations
            <span className="ml-3 text-sm font-normal text-gray-400">({registrations.length} total)</span>
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : registrations.length > 0 ? (
            <div className="space-y-6">
              {registrations.map((reg, index) => (
                <motion.div
                  key={reg._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card-premium hover:scale-[1.01] transition-transform duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 lg:mb-0 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">
                            {reg.tournament.title}
                          </h3>
                          <p className="text-primary-500 font-semibold flex items-center">
                            <FaUsers className="mr-2" />
                            Team: {reg.teamName}
                          </p>
                        </div>
                        <div className="lg:hidden">
                          {reg.paymentStatus === 'completed' ? (
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                              <FaCheckCircle className="mr-1" />
                              Paid
                            </span>
                          ) : (
                            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                              <FaClock className="mr-1" />
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-dark-800/50 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Tournament Date</p>
                          <div className="flex items-center text-sm font-semibold">
                            <FaCalendar className="mr-2 text-primary-500" />
                            {new Date(reg.tournament.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        <div className="bg-dark-800/50 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Entry Fee</p>
                          <p className="text-sm font-bold text-accent-500">
                            {reg.tournament.entryFee === 0 ? 'FREE' : `₹${reg.tournament.entryFee}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden lg:flex items-center space-x-4 ml-8">
                      {reg.paymentStatus === 'completed' ? (
                        <span className="bg-green-500/20 text-green-400 px-6 py-3 rounded-xl text-sm font-semibold flex items-center whitespace-nowrap">
                          <FaCheckCircle className="mr-2" />
                          Confirmed
                        </span>
                      ) : (
                        <span className="bg-yellow-500/20 text-yellow-400 px-6 py-3 rounded-xl text-sm font-semibold flex items-center whitespace-nowrap">
                          <FaClock className="mr-2" />
                          Payment Pending
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-dark-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Team Leader</p>
                        <p className="text-sm font-semibold text-primary-400">{reg.teamLeader}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Team Members</p>
                        <p className="text-sm font-semibold">{reg.players.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium text-center py-16"
            >
              <FaTrophy className="text-7xl text-gray-600 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold mb-2">No Tournaments Yet</h3>
              <p className="text-gray-400 text-lg mb-8">Join your first tournament and start competing!</p>
              <Link to="/tournaments">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-modern inline-block"
                >
                  Browse Tournaments
                </motion.button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
