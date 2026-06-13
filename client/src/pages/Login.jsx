import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import AuthLayout from '../components/AuthLayout'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!formData.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await login(formData.email, formData.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title={<>Welcome <span className="gradient-text">Back</span></>}
      subtitle="Sign in to your Team VioLencE account"
      highlight="Welcome to"
      altLink={{ to: '/register', label: 'Create one', prompt: "Don't have an account?" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Card variant="premium" className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              type="email"
              label="Email Address"
              iconLeft={FaEnvelope}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              type="password"
              label="Password"
              iconLeft={FaLock}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-400/30" />
                Remember me
              </label>
              <Link to="/login" className="text-cyan-300 hover:text-cyan-200 font-semibold">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={loading}
              iconRight={!loading && <FaArrowRight />}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Decorative divider */}
          <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <span className="flex-1 h-px bg-white/10" />
            Secure
            <span className="flex-1 h-px bg-white/10" />
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Protected with industry-standard encryption.
          </p>
        </Card>
      </motion.div>
    </AuthLayout>
  )
}
