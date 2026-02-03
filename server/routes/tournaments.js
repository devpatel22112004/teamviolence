const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')
const Tournament = require('../models/Tournament')
const Registration = require('../models/Registration')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')



// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ date: 1 })
    res.json(tournaments)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournaments' })
  }
})

// Get tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' })
    }
    res.json(tournament)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournament' })
  }
})

// Register for tournament
router.post('/:id/register', authMiddleware, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
    
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' })
    }

    if (tournament.registeredTeams >= tournament.totalSlots) {
      return res.status(400).json({ message: 'Tournament is full' })
    }

    const { teamName, teamLeader, players } = req.body

    // Validation
    if (!teamName || teamName.trim() === '') {
      return res.status(400).json({ message: 'Team name is required' })
    }
    if (!teamLeader || teamLeader.trim() === '') {
      return res.status(400).json({ message: 'Team leader name is required' })
    }
    if (!players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({ message: 'At least one player is required' })
    }

    // Check if already registered
    const existingReg = await Registration.findOne({
      user: req.user._id,
      tournament: tournament._id
    })

    if (existingReg) {
      return res.status(400).json({ message: 'You are already registered for this tournament' })
    }

    const registration = new Registration({
      user: req.user._id,
      tournament: tournament._id,
      tournamentTitle: tournament.title,
      tournamentMode: tournament.mode,
      tournamentType: tournament.type,
      entryFee: tournament.entryFee,
      teamName,
      teamLeader,
      players,
      paymentStatus: tournament.type === 'paid' ? 'pending' : 'completed',
      amount: tournament.type === 'paid' ? tournament.entryFee : 0
    })

    await registration.save()
    
    tournament.registeredTeams += 1
    await tournament.save()

    res.status(201).json({
      message: tournament.type === 'paid'
        ? 'Registration submitted. Please contact us on WhatsApp/Instagram/YouTube to complete payment.'
        : 'Registration successful',
      registration
    })
  } catch (error) {
    res.status(500).json({ message: 'Error registering for tournament', error: error.message })
  }
})

// Verify payment and complete registration
router.post('/:id/verify-payment', authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, teamData } = req.body

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex')

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' })
    }

    const tournament = await Tournament.findById(req.params.id)
    
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' })
    }

    // Create registration
    const registration = new Registration({
      user: req.user._id,
      tournament: tournament._id,
      tournamentTitle: tournament.title,
      tournamentMode: tournament.mode,
      tournamentType: tournament.type,
      entryFee: tournament.entryFee,
      teamName: teamData.teamName,
      teamLeader: teamData.teamLeader,
      players: teamData.players,
      paymentStatus: 'completed',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: tournament.entryFee
    })

    await registration.save()
    
    tournament.registeredTeams += 1
    await tournament.save()

    res.json({ message: 'Payment verified and registration complete', registration })
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment' })
  }
})

// Create tournament (Admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tournament = new Tournament(req.body)
    await tournament.save()
    res.status(201).json(tournament)
  } catch (error) {
    res.status(500).json({ message: 'Error creating tournament' })
  }
})

// Update tournament (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' })
    }
    res.json(tournament)
  } catch (error) {
    res.status(500).json({ message: 'Error updating tournament' })
  }
})

// Delete tournament (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id)
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' })
    }
    res.json({ message: 'Tournament deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tournament' })
  }
})

// Update tournament registration (team management)
router.put('/registrations/:id', authMiddleware, async (req, res) => {
  try {
    const { teamName, leaderName, members } = req.body

    const registration = await Registration.findById(req.params.id)
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' })
    }

    // Check if user owns this registration
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this registration' })
    }

    // Update registration
    registration.teamName = teamName
    registration.teamLeader = leaderName
    registration.players = members
    await registration.save()

    res.json({
      message: 'Team updated successfully',
      registration
    })
  } catch (error) {
    res.status(500).json({ message: 'Error updating registration' })
  }
})

// Cancel tournament registration
router.delete('/registrations/:id', authMiddleware, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate('tournament')
    
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' })
    }

    // Check if user owns this registration
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this registration' })
    }

    // Update tournament registered count
    const tournament = await Tournament.findById(registration.tournament._id)
    if (tournament) {
      tournament.registeredTeams = Math.max(0, tournament.registeredTeams - 1)
      await tournament.save()
    }

    // Delete registration
    await Registration.findByIdAndDelete(req.params.id)

    res.json({ message: 'Registration cancelled successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling registration' })
  }
})

// Get user's tournament registrations
router.get('/my/registrations', authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('tournament')
      .sort({ createdAt: -1 })
    
    res.json(registrations)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations' })
  }
})

module.exports = router
