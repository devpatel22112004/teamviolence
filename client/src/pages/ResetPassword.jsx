import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaLock, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const email = searchParams.get('email')
  const otp = searchParams.get('otp')
  
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const apiBase = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const apiUrl = (path) => (apiBase ? `${apiBase}${path}` : path)

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6">
        <div className="text-center">
          <p className="text-red-400 text-lg font-bold mb-4">Invalid reset link</p>
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-primary-500 hover:text-primary-400 font-semibold transition-colors"
          >
            Request new password reset
          </button>
        </div>
      </div>
    )
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!newPassword.trim()) {
      toast.error('New password is required')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await axios.post(apiUrl('/api/auth/reset-password'), {
        email,
        otp,
        newPassword: newPassword.trim()
      })
      toast.success('Password reset successful!')
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-primary-500/25 bg-gradient-to-br from-dark-900/95 via-dark-950/95 to-dark-900/95 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/15 blur-3xl" />
          
          <div className="relative">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
                  <FaCheckCircle className="text-3xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h2>
                <p className="text-gray-400 mb-6">You will be redirected to login shortly...</p>
                <div className="flex gap-2 justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                    <span className="text-white">Set New</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">Password</span>
                  </h1>
                  <p className="text-gray-400 text-sm">Create a strong password for your account</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">New Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-dark-800/60 border border-primary-500/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-dark-800 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Minimum 6 characters required</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-200">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-dark-800/60 border border-primary-500/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-dark-800 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-lg transition-all shadow-lg hover:shadow-primary-500/50 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Resetting...' : (
                      <>
                        Reset Password <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPassword
