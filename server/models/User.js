const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  profilePicture: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  resetPasswordOTP: {
    type: String
  },
  resetPasswordOTPExpires: {
    type: Date
  },
  resetPasswordAttempts: {
    type: Number,
    default: 0
  },
  resetPasswordLastAttempt: {
    type: Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
