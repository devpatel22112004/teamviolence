const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const { authMiddleware } = require('../middleware/auth')

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword
    })

    await user.save()

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' })
  }
})

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    role: req.user.role,
    createdAt: req.user.createdAt
  })
})

// Forgot password (generate OTP and send email)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      // Don't reveal if user exists (security)
      return res.json({ message: 'If the account exists, a password reset code has been sent to your email.' })
    }

    // Rate limiting - prevent spam (max 3 attempts per 15 minutes)
    if (user.resetPasswordAttempts >= 3 && 
        user.resetPasswordLastAttempt && 
        Date.now() - user.resetPasswordLastAttempt < 15 * 60 * 1000) {
      return res.status(429).json({ 
        message: 'Too many reset attempts. Please try again after 15 minutes.' 
      })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Hash OTP for storage
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

    // Also generate secure token for URL-based reset (backup method)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Update user with both OTP and token
    user.resetPasswordOTP = otpHash
    user.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
    user.resetPasswordToken = resetTokenHash
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000 // 30 minutes for token
    user.resetPasswordAttempts = (user.resetPasswordAttempts || 0) + 1
    user.resetPasswordLastAttempt = Date.now()
    await user.save()

    // Send email with OTP
    try {
      const emailUser = process.env.EMAIL_USER
      const emailPass = process.env.EMAIL_PASSWORD
        ? process.env.EMAIL_PASSWORD.replace(/\s+/g, '')
        : ''

      if (!emailUser || !emailPass) {
        console.error('Email credentials missing: set EMAIL_USER and EMAIL_PASSWORD')
        return res.status(500).json({ message: 'Email service is not configured' })
      }

      // Configure email transporter
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass
        }
      })

      await transporter.verify()

      // Premium email template
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0f1e; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1f35 0%, #0f1524 100%); border-radius: 20px; overflow: hidden; border: 1px solid rgba(14, 165, 233, 0.2); }
            .header { background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%); padding: 40px 20px; text-align: center; }
            .logo { font-size: 32px; font-weight: 900; color: white; margin: 0; }
            .content { padding: 40px 30px; color: #e5e7eb; }
            .otp-box { background: rgba(14, 165, 233, 0.1); border: 2px solid #0ea5e9; border-radius: 15px; padding: 30px; text-align: center; margin: 30px 0; }
            .otp-code { font-size: 48px; font-weight: 900; color: #0ea5e9; letter-spacing: 8px; font-family: 'Courier New', monospace; }
            .otp-label { font-size: 14px; color: #9ca3af; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }
            .warning { background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .footer { padding: 30px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid rgba(255,255,255,0.1); }
            .btn { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%); color: white; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 20px 0; }
            .info { background: rgba(14, 165, 233, 0.05); padding: 15px; border-radius: 8px; margin: 15px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="logo">🎮 Team VioLencE</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Password Reset Request</p>
            </div>
            <div class="content">
              <h2 style="color: white; font-size: 24px; margin-top: 0;">Hello, ${user.name}!</h2>
              <p style="font-size: 16px; line-height: 1.6;">We received a request to reset your password for your Team VioLencE account.</p>
              
              <div class="otp-box">
                <div class="otp-label">Your Password Reset Code</div>
                <div class="otp-code">${otp}</div>
              </div>

              <div class="info">
                ⏰ <strong>This code will expire in 10 minutes</strong><br>
                🔒 For your security, never share this code with anyone
              </div>

              <p style="font-size: 15px; line-height: 1.6;">To reset your password:</p>
              <ol style="font-size: 15px; line-height: 1.8;">
                <li>Go to the password reset page</li>
                <li>Enter this 6-digit code: <strong style="color: #0ea5e9;">${otp}</strong></li>
                <li>Set your new password</li>
              </ol>

              <div class="warning">
                ⚠️ <strong>Didn't request this?</strong><br>
                If you didn't request a password reset, please ignore this email and your password will remain unchanged. Your account is safe.
              </div>

              <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">
                Having trouble? Contact our support team or visit our help center.
              </p>
            </div>
            <div class="footer">
              <p style="margin: 0;">© 2026 Team VioLencE. All rights reserved.</p>
              <p style="margin: 10px 0 0;">This is an automated security email. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `

      const mailOptions = {
        from: `"Team VioLencE" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: '🔐 Password Reset Code - Team VioLencE',
        html: emailHTML,
        text: `Hello ${user.name},\n\nYour password reset code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.\n\nTeam VioLencE`
      }

      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      return res.status(500).json({ message: 'Failed to send reset email. Please try again later.' })
    }

    res.json({
      message: 'Password reset code has been sent to your email. Please check your inbox.',
      // For development/testing only - remove in production
      ...(process.env.NODE_ENV === 'development' && { resetToken, otp })
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ message: 'Error generating reset code' })
  }
})

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' })
    }

    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const user = await User.findOne({
      email,
      resetPasswordOTP: otpHash,
      resetPasswordOTPExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP code' })
    }

    // OTP verified successfully
    res.json({ 
      message: 'OTP verified successfully',
      verified: true
    })
  } catch (error) {
    console.error('OTP verification error:', error)
    res.status(500).json({ message: 'Error verifying OTP' })
  }
})

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' })
    }

    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const user = await User.findOne({
      email,
      resetPasswordOTP: otpHash,
      resetPasswordOTPExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP code' })
    }

    // OTP verified successfully
    res.json({ 
      message: 'OTP verified successfully',
      verified: true
    })
  } catch (error) {
    console.error('OTP verification error:', error)
    res.status(500).json({ message: 'Error verifying OTP' })
  }
})

// Reset password (use OTP or token)
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    res.json({ message: 'Password reset successful' })
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' })
  }
})

// Google OAuth Login
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body

    if (!credential) {
      return res.status(400).json({ message: 'Google credential required' })
    }

    // Verify Google token
    const { OAuth2Client } = require('google-auth-library')
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    
    const payload = ticket.getPayload()
    const { email, name, picture, sub: googleId } = payload

    // Check if user exists
    let user = await User.findOne({ email })

    if (user) {
      // User exists, update Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId
        await user.save()
      }
    } else {
      // Create new user with Google data
      user = new User({
        name,
        email,
        googleId,
        profilePicture: picture,
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
        phone: '' // Google doesn't provide phone
      })
      await user.save()
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error during Google login' })
  }
})

module.exports = router
