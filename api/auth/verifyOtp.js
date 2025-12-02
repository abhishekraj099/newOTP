const express = require('express');
const router = express.Router();
const { getOTP, deleteOTP } = require('../../lib/otpStore');

// Verify OTP Route
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and OTP are required' 
      });
    }
    
    // Get stored OTP (NOW WITH AWAIT)
    const storedOTP = await getOTP(email);
    
    if (!storedOTP) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found'
      });
    }
    
    // Verify OTP
    if (storedOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
    
    // Delete OTP after successful verification (NOW WITH AWAIT)
    await deleteOTP(email);
    
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      email: email
    });
    
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to verify OTP',
      error: error.message 
    });
  }
});

module.exports = router;