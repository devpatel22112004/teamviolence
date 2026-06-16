import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEdit, FaSave, FaTimes, FaLock } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const UserProfile = () => {
  const { user, logout } = useAuth()
  const [isEditing, isEditingState] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registrations, setRegistrations] = useState([])
  const [fetchingReg, setFetchingReg] = useState(true)

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      })
      fetchRegistrations()
    }
  }, [user])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('/api/tournaments/my/registrations')
      setRegistrations(res.data)
    } catch (error) {
      // Error fetching user registrations
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
      toast.success('Profile updated successfully!')
      isEditingState(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('All password fields are required')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await axios.put('/api/users/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      })
      toast.success('Password changed successfully!')
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
      setShowPasswordChange(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-gray-400">Please log in to view your profile</p>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-gray-300 text-lg">Manage your account and view your registrations</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1"
          >
            <div className="card rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUser className="text-white text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-primary-400 font-semibold mb-4 capitalize">
                {user.role === 'admin' ? '👑 Admin' : '🎮 Player'}
              </p>
              <div className="space-y-3 mb-6">
                <div className="text-sm">
                  <p className="text-gray-400 mb-1">Email</p>
                  <p className="text-white font-semibold break-all">{user.email}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400 mb-1">Phone</p>
                  <p className="text-white font-semibold">{user.phone || 'Not set'}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => logout()}
                className="w-full btn-secondary py-2 text-sm"
              >
                Logout
              </motion.button>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Edit Profile Section */}
            <div className="card rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <FaEdit className="text-primary-400" />
                  <span>Edit Profile</span>
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isEditingState(!isEditing)}
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <FaEdit className="text-xl" />
                </motion.button>
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Email (Cannot change)</label>
                    <input
                      type="email"
                      disabled
                      value={profileData.email}
                      className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 btn-modern py-2 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <FaSave size={14} />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => isEditingState(false)}
                      className="flex-1 btn-secondary py-2 flex items-center justify-center space-x-2"
                    >
                      <FaTimes size={14} />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Full Name</p>
                    <p className="text-white font-semibold text-lg">{profileData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white font-semibold">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white font-semibold">{profileData.phone || 'Not set'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Change Password Section */}
            <div className="card rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <FaLock className="text-primary-400" />
                  <span>Security</span>
                </h3>
              </div>

              {showPasswordChange ? (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                      className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full bg-dark-700 border border-primary-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 btn-modern py-2 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <FaSave size={14} />
                      <span>{loading ? 'Updating...' : 'Update Password'}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setShowPasswordChange(false)}
                      className="flex-1 btn-secondary py-2 flex items-center justify-center space-x-2"
                    >
                      <FaTimes size={14} />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                </form>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPasswordChange(true)}
                  className="w-full btn-secondary py-3 flex items-center justify-center space-x-2"
                >
                  <FaLock size={16} />
                  <span>Change Password</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Registrations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h3 className="text-3xl font-display font-black mb-6">
            Your <span className="gradient-text">Registrations</span>
          </h3>

          {fetchingReg ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : registrations.length > 0 ? (
            <div className="grid gap-4">
              {registrations.map((reg, index) => (
                <motion.div
                  key={reg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-6 rounded-xl border border-primary-500/20 hover:border-primary-500/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{reg.tournamentTitle}</h4>
                      <p className="text-gray-400 text-sm mb-2">
                        Team: <span className="text-primary-400 font-semibold">{reg.teamName}</span>
                      </p>
                      <p className="text-gray-500 text-xs">
                        Registered: {new Date(reg.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2 rounded-lg font-semibold ${
                        reg.paymentStatus === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {reg.paymentStatus === 'completed' ? '✅ Registered' : '⏳ Pending'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center rounded-xl">
              <p className="text-gray-400">No tournament registrations yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default UserProfile
