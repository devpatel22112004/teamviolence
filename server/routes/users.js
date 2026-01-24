const express = require('express')
const router = express.Router()
const Registration = require('../models/Registration')
const User = require('../models/User')
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

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone } = req.body

    // Validate inputs
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' })
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true, runValidators: true }
    ).select('-password')

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        profilePicture: updatedUser.profilePicture,
        createdAt: updatedUser.createdAt
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ message: 'Error updating profile' })
  }
})

module.exports = router
