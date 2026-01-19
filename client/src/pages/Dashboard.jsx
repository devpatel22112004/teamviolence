import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaUser, FaCalendar, FaCheckCircle, FaClock } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Dashboard = () => {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('/api/users/registrations')
      setRegistrations(res.data)
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Welcome, <span className="text-primary-500">{user?.name}</span>
          </h1>
          <p className="text-gray-400">Manage your tournament registrations and profile</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center">
            <FaUser className="text-primary-500 mr-3" />
            Profile Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <p className="text-lg font-semibold">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone</label>
              <p className="text-lg font-semibold">{user?.phone}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Member Since</label>
              <p className="text-lg font-semibold">
                {new Date(user?.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tournament Registrations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center">
            <FaTrophy className="text-primary-500 mr-3" />
            My Tournament Registrations
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
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold mb-2">
                        {reg.tournament.title}
                      </h3>
                      <p className="text-primary-500 font-semibold mb-2">
                        Team: {reg.teamName}
                      </p>
                      <div className="flex items-center text-gray-400 text-sm">
                        <FaCalendar className="mr-2" />
                        {new Date(reg.tournament.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {reg.paymentStatus === 'completed' ? (
                        <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                          <FaCheckCircle className="mr-2" />
                          Confirmed
                        </span>
                      ) : (
                        <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                          <FaClock className="mr-2" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-dark-800">
                    <p className="text-sm text-gray-400 mb-2">Team Leader: {reg.teamLeader}</p>
                    <p className="text-sm text-gray-400">
                      Players: {reg.players.join(', ')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <FaTrophy className="text-6xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No tournament registrations yet</p>
              <a href="/tournaments" className="btn-primary inline-block mt-6">
                Browse Tournaments
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
