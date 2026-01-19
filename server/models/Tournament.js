const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    enum: ['Squad TPP', 'Squad FPP', 'Duo TPP', 'Duo FPP', 'Solo TPP', 'Solo FPP', 'TDM 4v4', 'TDM 8v8']
  },
  type: {
    type: String,
    required: true,
    enum: ['free', 'paid']
  },
  entryFee: {
    type: Number,
    default: 0
  },
  prizePool: {
    type: Number,
    required: true
  },
  totalSlots: {
    type: Number,
    required: true
  },
  registeredTeams: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'ongoing', 'completed'],
    default: 'open'
  },
  rules: [String],
  prizes: [{
    position: String,
    amount: Number
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Tournament', tournamentSchema)
