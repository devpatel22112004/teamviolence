import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaUser, FaPhone, FaUserPlus } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import ParticleField from '../components/ParticleField'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await register(formData)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6">
      <ParticleField />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong p-6 sm:p-10 neon-glow">
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
              className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-neon"
            >
              <FaUserPlus className="text-2xl text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              Join <span className="gradient-text">Team VioLencE</span>
            </h1>
            <p className="text-[color:var(--text-muted)] text-xs sm:text-sm">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[color:var(--text-muted)]">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-primary-500/5 border border-primary-500/25 rounded-xl pl-12 pr-4 py-3 text-[color:var(--text-main)] placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-neon transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[color:var(--text-muted)]">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-primary-500/5 border border-primary-500/25 rounded-xl pl-12 pr-4 py-3 text-[color:var(--text-main)] placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-neon transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[color:var(--text-muted)]">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-primary-500/5 border border-primary-500/25 rounded-xl pl-12 pr-4 py-3 text-[color:var(--text-main)] placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-neon transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[color:var(--text-muted)]">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-primary-500/5 border border-primary-500/25 rounded-xl pl-12 pr-4 py-3 text-[color:var(--text-main)] placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-neon transition-all"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[color:var(--text-muted)]">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-primary-500/5 border border-primary-500/25 rounded-xl pl-12 pr-4 py-3 text-[color:var(--text-main)] placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-neon transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-modern w-full text-lg disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-400 font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
