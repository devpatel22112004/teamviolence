import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTrophy, FaUsers, FaCalendar, FaRupeeSign, FaInfoCircle } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const TournamentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [teamData, setTeamData] = useState({
    teamName: '',
    teamLeader: '',
    players: ['', '', '', '']
  })

  const apiBase = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const apiUrl = (path) => (apiBase ? `${apiBase}${path}` : path)

  useEffect(() => {
    fetchTournament()
  }, [id])

  const fetchTournament = async () => {
    try {
      const res = await axios.get(apiUrl(`/api/tournaments/${id}`))
      setTournament(res.data)
    } catch (error) {
      toast.error('Tournament not found')
      navigate('/tournaments')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Please login to register')
      navigate('/login')
      return
    }

    setRegistering(true)
    try {
      if (tournament.type === 'paid') {
        // Initiate Razorpay payment
        const orderRes = await axios.post(apiUrl(`/api/tournaments/${id}/register`), teamData)
        
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderRes.data.amount,
          currency: 'INR',
          name: 'Team VioLencE',
          description: tournament.title,
          order_id: orderRes.data.orderId,
          handler: async (response) => {
            try {
              await axios.post(apiUrl(`/api/tournaments/${id}/verify-payment`), {
                ...response,
                teamData
              })
              toast.success('Registration successful!')
              navigate('/dashboard')
            } catch (error) {
              toast.error('Payment verification failed')
            }
          },
          theme: {
            color: '#ef4444'
          }
        }
        
        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } else {
        // Free tournament registration
        await axios.post(apiUrl(`/api/tournaments/${id}/register`), teamData)
        toast.success('Registration successful!')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setRegistering(false)
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Tournament Header */}
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold mb-4">
                  {tournament.title}
                </h1>
                <p className="text-xl text-primary-500 font-semibold mb-4">
                  {tournament.mode}
                </p>
              </div>
              {tournament.type === 'free' ? (
                <span className="bg-green-500/20 text-green-400 px-6 py-2 rounded-full text-lg font-semibold">
                  FREE ENTRY
                </span>
              ) : (
                <span className="bg-primary-500/20 text-primary-400 px-6 py-2 rounded-full text-lg font-semibold flex items-center">
                  <FaRupeeSign className="mr-1" />
                  {tournament.entryFee} Entry Fee
                </span>
              )}
            </div>

            <p className="text-gray-300 text-lg mb-6">{tournament.description}</p>

            {/* Tournament Info Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-dark-800 rounded-lg p-4">
                <FaTrophy className="text-primary-500 text-3xl mb-2" />
                <div className="text-sm text-gray-400">Prize Pool</div>
                <div className="text-2xl font-bold">₹{tournament.prizePool.toLocaleString()}</div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <FaUsers className="text-primary-500 text-3xl mb-2" />
                <div className="text-sm text-gray-400">Teams Registered</div>
                <div className="text-2xl font-bold">{tournament.registeredTeams}/{tournament.totalSlots}</div>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <FaCalendar className="text-primary-500 text-3xl mb-2" />
                <div className="text-sm text-gray-400">Tournament Date</div>
                <div className="text-xl font-bold">
                  {new Date(tournament.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="card">
            <h2 className="text-2xl font-display font-bold mb-6">
              Register Your Team
            </h2>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Team Name *</label>
                <input
                  type="text"
                  required
                  value={teamData.teamName}
                  onChange={(e) => setTeamData({...teamData, teamName: e.target.value})}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
                  placeholder="Enter your team name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Team Leader IGN *</label>
                <input
                  type="text"
                  required
                  value={teamData.teamLeader}
                  onChange={(e) => setTeamData({...teamData, teamLeader: e.target.value})}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
                  placeholder="Enter team leader's in-game name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Player IGNs *</label>
                {teamData.players.map((player, index) => (
                  <input
                    key={index}
                    type="text"
                    required
                    value={player}
                    onChange={(e) => {
                      const newPlayers = [...teamData.players]
                      newPlayers[index] = e.target.value
                      setTeamData({...teamData, players: newPlayers})
                    }}
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-primary-500"
                    placeholder={`Player ${index + 1} IGN`}
                  />
                ))}
              </div>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 flex items-start">
                <FaInfoCircle className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  {tournament.type === 'paid' ? (
                    <p>You will be redirected to payment gateway after clicking register. Entry fee: ₹{tournament.entryFee}</p>
                  ) : (
                    <p>This is a free tournament. Click register to confirm your participation.</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={registering || tournament.registeredTeams >= tournament.totalSlots}
                className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registering ? 'Processing...' : 
                 tournament.registeredTeams >= tournament.totalSlots ? 'Tournament Full' :
                 tournament.type === 'paid' ? `Pay ₹${tournament.entryFee} & Register` : 'Register Now'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TournamentDetails
