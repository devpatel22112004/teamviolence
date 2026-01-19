const express = require('express')
const router = express.Router()
const Registration = require('../models/Registration')
const { authMiddleware } = require('../middleware/auth')

// Get user's tournament registrations
router.get('/registrations', authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('tournament')
      .sort({ createdAt: -1 })
    res.json(registrations)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations' })
  }
})

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      createdAt: req.user.createdAt
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' })
  }
})

module.exports = router
