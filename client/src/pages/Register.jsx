import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaEnvelope, FaLock, FaUser, FaPhone, FaArrowRight, FaCheck,
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import AuthLayout from '../components/AuthLayout'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (k) => (e) => setFormData((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.phone) e.phone = 'Phone is required'
    else if (!/^[0-9+\-\s()]{7,}$/.test(formData.phone)) e.phone = 'Enter a valid phone'
    if (!formData.password) e.password = 'Password is required'
    else if (formData.password.length < 6) e.password = 'At least 6 characters'
    if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords don't match"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  // Live strength meter
  const strength = scorePassword(formData.password)
  const strengthLabel = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'][strength]
  const strengthColor = ['bg-red-500/40', 'bg-red-500', 'bg-amber-500', 'bg-cyan-500', 'bg-lime-500'][strength]

  return (
    <AuthLayout
      title={<>Join <span className="gradient-text">Team VioLencE</span></>}
      subtitle="Create your account to register for tournaments and track your journey."
      highlight="Start Your"
      highlightAccent="Journey"
      altLink={{ to: '/login', label: 'Sign in', prompt: 'Already have an account?' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Card variant="premium" className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Full Name"
              iconLeft={FaUser}
              value={formData.name}
              onChange={update('name')}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              type="email"
              label="Email"
              iconLeft={FaEnvelope}
              value={formData.email}
              onChange={update('email')}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              type="tel"
              label="Phone Number"
              iconLeft={FaPhone}
              value={formData.phone}
              onChange={update('phone')}
              error={errors.phone}
              autoComplete="tel"
            />
            <div>
              <Input
                type="password"
                label="Password"
                iconLeft={FaLock}
                value={formData.password}
                onChange={update('password')}
                error={errors.password}
                autoComplete="new-password"
              />
              {formData.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${i < strength ? strengthColor : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                    Strength: {strengthLabel}
                  </p>
                </div>
              )}
            </div>
            <Input
              type="password"
              label="Confirm Password"
              iconLeft={FaLock}
              value={formData.confirmPassword}
              onChange={update('confirmPassword')}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <label className="flex items-start gap-2 text-xs text-gray-400 cursor-pointer pt-1">
              <input type="checkbox" className="mt-0.5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-400/30" />
              <span>
                I agree to the <span className="text-cyan-300 font-semibold">Terms of Service</span> and{' '}
                <span className="text-cyan-300 font-semibold">Privacy Policy</span>.
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={loading}
              iconRight={!loading && <FaArrowRight />}
              iconLeft={!loading && <FaCheck />}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </AuthLayout>
  )
}

function scorePassword(p) {
  if (!p) return 0
  if (p.length < 6) return 1
  let s = 1
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++
  if (/[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) s++
  return Math.min(4, s)
}
