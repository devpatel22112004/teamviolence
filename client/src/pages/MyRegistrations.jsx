import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTrophy, FaCalendar, FaUsers, FaRupeeSign, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const MyRegistrations = () => {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyRegistrations()
  }, [])

  const fetchMyRegistrations = async () => {
    try {
      const res = await axios.get('/api/tournaments/my/registrations')
      setRegistrations(res.data)
    } catch (error) {
      // Error loading registrations
      toast.error('Unable to load your registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) {
      return
    }

    try {
      await axios.delete(`/api/tournaments/registrations/${registrationId}`)
      toast.success('Registration cancelled successfully')
      fetchMyRegistrations()
    } catch (error) {
      toast.error('Failed to cancel registration')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
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
            My Tournament <span className="gradient-text">Registrations</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Track all your tournament registrations and manage your teams
          </p>
        </motion.div>

        {/* Registrations List */}
        {registrations.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {registrations.map((reg, index) => (
              <motion.div
                key={reg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-500/20 transition-all"
              >
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  {/* Tournament Info */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <p className="text-primary-400 text-sm font-bold uppercase tracking-widest mb-2">
                        Tournament
                      </p>
                      <h3 className="text-2xl font-display font-black gradient-text">
                        {reg.tournamentTitle}
                      </h3>
                      <p className="text-gray-400 mt-2">{reg.tournamentMode}</p>
                    </div>

                    {/* Team Details */}
                    <div className="space-y-3">
                      <p className="text-primary-400 text-sm font-bold uppercase tracking-widest">
                        Team Information
                      </p>
                      <div className="bg-dark-800/50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400">Team Name:</span>
                          <span className="text-white font-semibold">{reg.teamName}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400">Team Leader:</span>
                          <span className="text-white font-semibold">{reg.teamLeader}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400">Players:</span>
                          <div className="text-right">
                            {reg.players.map((player, idx) => (
                              <div key={idx} className="text-white text-sm">{player}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="md:col-span-1 space-y-6">
                    {/* Stats Grid */}
                    <div className="space-y-3">
                      <div className="glass-card p-4 rounded-lg border border-primary-500/20">
                        <p className="text-gray-400 text-xs font-bold mb-1">ENTRY FEE</p>
                        <p className="text-lg font-black gradient-text">
                          {reg.entryFee === 0 ? 'FREE' : `₹${reg.entryFee}`}
                        </p>
                      </div>

                      <div className="glass-card p-4 rounded-lg border border-primary-500/20">
                        <p className="text-gray-400 text-xs font-bold mb-1">STATUS</p>
                        <p className={`text-lg font-bold ${
                          reg.paymentStatus === 'completed'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}>
                          {reg.paymentStatus.charAt(0).toUpperCase() + reg.paymentStatus.slice(1)}
                        </p>
                      </div>

                      <div className="glass-card p-4 rounded-lg border border-primary-500/20">
                        <p className="text-gray-400 text-xs font-bold mb-1">REGISTERED</p>
                        <p className="text-sm font-semibold text-white">
                          {new Date(reg.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Cancel Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCancelRegistration(reg._id)}
                      className="w-full btn-danger py-3 flex items-center justify-center space-x-2"
                    >
                      <FaTimes size={16} />
                      <span>Cancel Registration</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 card rounded-2xl"
          >
            <FaTrophy className="text-6xl text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-xl font-semibold">No registrations yet</p>
            <p className="text-gray-500 mt-2">Register for tournaments to see them here</p>
            <Link to="/tournaments">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-6 btn-modern py-3 px-8"
              >
                Browse Tournaments
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MyRegistrations
