import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import ParticleField from '../components/ParticleField'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await login(formData.email, formData.password)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
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
              <FaLock className="text-2xl text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              Welcome <span className="gradient-text">Back</span>
            </h1>
            <p className="text-[color:var(--text-muted)] text-xs sm:text-sm">Login to your Team VioLencE account</p>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[color:var(--text-muted)]">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-primary-500/5 border border-primary-500/25 rounded-xl pl-12 pr-4 py-3 text-[color:var(--text-main)] placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-neon transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-[color:var(--text-muted)]">Password</label>
              </div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-primary-500/5 border border-primary-500/25 rounded-xl pl-12 pr-4 py-3 text-[color:var(--text-main)] placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-neon transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-modern w-full text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-500 hover:text-primary-400 font-semibold transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
