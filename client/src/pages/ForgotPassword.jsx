import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaArrowRight, FaKey, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [step, setStep] = useState(1) // 1 = Enter Email, 2 = Enter OTP
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const apiBase = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const apiUrl = (path) => (apiBase ? `${apiBase}${path}` : path)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Email is required')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(apiUrl('/api/auth/forgot-password'), { email: email.trim() })
      toast.success(res.data.message || 'Password reset code sent to your email')
      setStep(2) // Move to OTP input step
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset code')
    } finally {
      setLoading(false)
    }
  }

  const handleOTPVerify = async (e) => {
    e.preventDefault()
    if (!otp.trim() || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code')
      return
    }

    setLoading(true)
    try {
      await axios.post(apiUrl('/api/auth/verify-otp'), { email, otp: otp.trim() })
      toast.success('OTP verified! Redirecting to reset password...')
      // Redirect to reset password page with email and OTP
      window.location.href = `/reset-password?email=${encodeURIComponent(email)}&otp=${otp.trim()}`
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP code')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setLoading(true)
    try {
      const res = await axios.post(apiUrl('/api/auth/forgot-password'), { email })
      toast.success('New code sent to your email')
    } catch (error) {
      toast.error('Failed to resend code')
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
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? 'bg-primary-500 text-white' : 'bg-dark-700 text-gray-500'
              }`}>
                {step > 1 ? <FaCheckCircle /> : '1'}
              </div>
              <div className={`w-12 h-1 rounded ${
                step >= 2 ? 'bg-primary-500' : 'bg-dark-700'
              }`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? 'bg-primary-500 text-white' : 'bg-dark-700 text-gray-500'
              }`}>
                2
              </div>
              <div className={`w-12 h-1 rounded bg-dark-700`} />
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-dark-700 text-gray-500">
                3
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                {step === 1 ? (
                  <><span className="text-white">Forgot</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">Password</span></>
                ) : (
                  <><span className="text-white">Verify</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">OTP</span></>
                )}
              </h1>
              <p className="text-gray-400 text-sm">
                {step === 1 
                  ? 'Enter your email to receive a 6-digit verification code' 
                  : 'Enter the 6-digit code sent to your email'}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-200">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-dark-800/60 border border-primary-500/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-dark-800 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-lg transition-all shadow-lg hover:shadow-primary-500/50 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Reset Code <FaArrowRight />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOTPVerify} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-200">6-Digit Code</label>
                  <div className="relative">
                    <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full bg-dark-800/60 border border-primary-500/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-dark-800 transition-all text-center text-2xl font-mono tracking-widest"
                      placeholder="000000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Code sent to {email}</p>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-lg transition-all shadow-lg hover:shadow-primary-500/50 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? 'Verifying...' : (
                    <>
                      Verify & Continue <FaArrowRight />
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-primary-400 hover:text-primary-300 font-semibold transition-colors disabled:opacity-50"
                  >
                    Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setOtp(''); }}
                    className="text-gray-400 hover:text-gray-300 font-semibold transition-colors"
                  >
                    Change Email
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Remembered your password?{' '}
                <Link to="/login" className="text-primary-500 hover:text-primary-400 font-semibold transition-colors">
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
