import { createContext, useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// Session timeout in milliseconds (2 hours)
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const sessionTimeoutRef = useRef(null)
  const lastActivityRef = useRef(Date.now())

  // Reset session timer on user activity
  const resetSessionTimer = () => {
    lastActivityRef.current = Date.now()
    
    // Clear existing timeout
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current)
    }

    // Only set timer if user is logged in
    if (user) {
      sessionTimeoutRef.current = setTimeout(() => {
        console.log('Session expired due to inactivity')
        logoutDueToTimeout()
      }, SESSION_TIMEOUT)
    }
  }

  // Logout due to timeout
  const logoutDueToTimeout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('sessionStartTime')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    alert('Your session has expired due to inactivity. Please log in again.')
  }

  // Handle page visibility (detect if user closes/leaves page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page hidden - store session end time
        localStorage.setItem('sessionHidden', Date.now().toString())
      } else {
        // Page visible again - check if session should be cleared
        const hiddenTime = localStorage.getItem('sessionHidden')
        if (hiddenTime) {
          const timeDiff = Date.now() - parseInt(hiddenTime)
          // If hidden for more than 30 minutes, logout
          if (timeDiff > 30 * 60 * 1000) {
            logoutDueToTimeout()
          } else {
            // Still valid, reset timer
            resetSessionTimer()
          }
          localStorage.removeItem('sessionHidden')
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [user])

  // Track user activity (mouse, keyboard, touch)
  useEffect(() => {
    if (!user) return

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      resetSessionTimer()
    }

    events.forEach(event => {
      window.addEventListener(event, handleActivity)
    })

    // Set initial timer
    resetSessionTimer()

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current)
      }
    }
  }, [user])

  // Handle page unload (user closes browser/tab)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        localStorage.setItem('sessionEndTime', Date.now().toString())
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [user])

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    const sessionEndTime = localStorage.getItem('sessionEndTime')

    // If session was ended previously, don't restore
    if (sessionEndTime) {
      localStorage.removeItem('token')
      localStorage.removeItem('sessionEndTime')
      setLoading(false)
      return
    }

    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await axios.get('/api/auth/me')
        setUser(res.data)
        localStorage.setItem('sessionStartTime', Date.now().toString())
        resetSessionTimer()
      } catch (error) {
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('sessionStartTime', Date.now().toString())
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
    setUser(res.data.user)
    resetSessionTimer()
    return res.data
  }

  const register = async (userData) => {
    const res = await axios.post('/api/auth/register', userData)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('sessionStartTime', Date.now().toString())
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
    setUser(res.data.user)
    resetSessionTimer()
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('sessionStartTime')
    localStorage.removeItem('sessionHidden')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current)
    }
  }

  const loginWithGoogle = async (credential) => {
    const res = await axios.post('/api/auth/google', { credential })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('sessionStartTime', Date.now().toString())
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
    setUser(res.data.user)
    resetSessionTimer()
    return res.data
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
