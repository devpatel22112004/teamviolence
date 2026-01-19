const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const TeamMember = require('../models/TeamMember')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/team/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('Only image files are allowed'))
  }
})

// Get all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(members)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members' })
  }
})

// Get team member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id)
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' })
    }
    res.json(member)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member' })
  }
})

// Create team member (Admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), async (req, res) => {
  try {
    const memberData = {
      ...req.body,
      socials: JSON.parse(req.body.socials || '{}')
    }
    
    if (req.file) {
      memberData.image = `/uploads/team/${req.file.filename}`
    }

    const member = new TeamMember(memberData)
    await member.save()
    res.status(201).json(member)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating team member' })
  }
})

// Update team member (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      socials: JSON.parse(req.body.socials || '{}')
    }
    
    if (req.file) {
      updateData.image = `/uploads/team/${req.file.filename}`
    }

    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' })
    }
    
    res.json(member)
  } catch (error) {
    res.status(500).json({ message: 'Error updating team member' })
  }
})

// Delete team member (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id)
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' })
    }
    res.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member' })
  }
})

module.exports = router
