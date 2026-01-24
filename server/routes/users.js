const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
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

// Change password
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body

    // Validation
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Both passwords are required' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' })
    }

    // Get user with password
    const user = await User.findById(req.user._id)

    // Verify old password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await User.findByIdAndUpdate(
      req.user._id,
      { password: hashedPassword },
      { new: true }
    )

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ message: 'Error changing password' })
  }
})

module.exports = router
