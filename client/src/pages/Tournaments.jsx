import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTrophy, FaUsers, FaCalendar, FaRupeeSign, FaGift } from 'react-icons/fa'
import axios from 'axios'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([])
  const [filter, setFilter] = useState('all') // all, free, paid
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      const res = await axios.get('/api/tournaments')
      setTournaments(res.data)
    } catch (error) {
      console.error('Error fetching tournaments:', error)
      // Fallback to default tournaments
      setTournaments(defaultTournaments)
    } finally {
      setLoading(false)
    }
  }

  const defaultTournaments = [
    {
      _id: '1',
      title: 'Weekly Squad Championship',
      mode: 'Squad TPP',
      type: 'free',
      entryFee: 0,
      prizePool: 5000,
      totalSlots: 100,
      registeredTeams: 45,
      date: '2026-01-25',
      status: 'open',
      description: 'Free weekly tournament for all skill levels. Prove your worth!'
    },
    {
      _id: '2',
      title: 'Pro League - Season 1',
      mode: 'Squad TPP',
      type: 'paid',
      entryFee: 30,
      prizePool: 10000,
      totalSlots: 50,
      registeredTeams: 28,
      date: '2026-01-28',
      status: 'open',
      description: 'Compete with the best teams for massive prizes!'
    },
    {
      _id: '3',
      title: 'TDM Showdown',
      mode: 'TDM 4v4',
      type: 'free',
      entryFee: 0,
      prizePool: 3000,
      totalSlots: 32,
      registeredTeams: 20,
      date: '2026-01-27',
      status: 'open',
      description: 'Fast-paced TDM action. Show your gunplay skills!'
    },
    {
      _id: '4',
      title: 'Elite Masters Cup',
      mode: 'Squad TPP',
      type: 'paid',
      entryFee: 50,
      prizePool: 25000,
      totalSlots: 25,
      registeredTeams: 18,
      date: '2026-02-05',
      status: 'open',
      description: 'Premium tournament with the biggest prize pool!'
    },
  ]

  const filteredTournaments = tournaments.filter(t => 
    filter === 'all' ? true : t.type === filter
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-primary-500">Tournaments</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join exciting BGMI tournaments. Free and paid options available for all skill levels!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { value: 'all', label: 'All Tournaments' },
            { value: 'free', label: 'Free' },
            { value: 'paid', label: 'Paid' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                filter === tab.value
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tournaments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:scale-105"
            >
              {/* Tournament Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    {tournament.title}
                  </h3>
                  <p className="text-primary-500 font-semibold">{tournament.mode}</p>
                </div>
                {tournament.type === 'free' ? (
                  <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <FaGift className="mr-2" />
                    FREE
                  </span>
                ) : (
                  <span className="bg-primary-500/20 text-primary-400 px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {tournament.entryFee}
                  </span>
                )}
              </div>

              <p className="text-gray-400 mb-6">{tournament.description}</p>

              {/* Tournament Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <FaTrophy className="text-primary-500 mr-3" />
                  <span>Prize Pool: ₹{tournament.prizePool.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaUsers className="text-primary-500 mr-3" />
                  <span>Slots: {tournament.registeredTeams}/{tournament.totalSlots}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaCalendar className="text-primary-500 mr-3" />
                  <span>{new Date(tournament.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-dark-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-primary-700 h-2 rounded-full transition-all"
                    style={{ width: `${(tournament.registeredTeams / tournament.totalSlots) * 100}%` }}
                  />
                </div>
              </div>

              {/* Register Button */}
              <Link
                to={`/tournaments/${tournament._id}`}
                className="btn-primary w-full text-center"
              >
                View Details & Register
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No tournaments found in this category.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Tournaments
