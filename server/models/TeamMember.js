const mongoose = require('mongoose')

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  kills: {
    type: Number,
    default: 0
  },
  winRate: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  image: String,
  socials: {
    discord: String,
    instagram: String,
    youtube: String,
    twitch: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('TeamMember', teamMemberSchema)
