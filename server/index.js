const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

// Load environment variables
dotenv.config()

// Import routes
const authRoutes = require('./routes/auth')
const tournamentRoutes = require('./routes/tournaments')
const teamRoutes = require('./routes/team')
const userRoutes = require('./routes/users')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files for uploads
app.use('/uploads', express.static('uploads', {
  maxAge: '7d'
}))

// Serve frontend static files (built React app)
app.use(express.static(path.join(__dirname, '../client/dist'), {
  maxAge: '30d',
  immutable: true
}))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tournaments', tournamentRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Team VioLencE API is running' })
})

// Serve index.html for all non-API routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// MongoDB Connection (without deprecated options)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message)
    console.log('💡 Tip: Make sure MongoDB Atlas connection string is correct in .env file')
  })

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
