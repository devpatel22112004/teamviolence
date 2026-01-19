const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  teamLeader: {
    type: String,
    required: true,
    trim: true
  },
  players: [{
    type: String,
    required: true
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: String,
  orderId: String,
  amount: Number
}, {
  timestamps: true
})

module.exports = mongoose.model('Registration', registrationSchema)
