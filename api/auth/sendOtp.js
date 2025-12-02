const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { storeOTP } = require('../../lib/otpStore');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

// Send OTP Route
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: 'Email is required' 
      });
    }
    
    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP
    storeOTP(email, otp);
    
    // Email options
    const mailOptions = {
      from: process.env.MAIL_EMAIL,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your OTP Code</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log(`OTP sent to ${email}: ${otp}`);
    
    res.status(200).json({
      success: true,
      message: 'OTP sent to your email'
    });
    
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send OTP',
      error: error.message 
    });
  }
});

module.exports = router;