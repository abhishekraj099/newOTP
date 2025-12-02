// Simple in-memory OTP storage
const otpStore = new Map();

// Store OTP (expires in 10 minutes)
const storeOTP = (email, otp) => {
  const expiryTime = Date.now() + (10 * 60 * 1000); // 10 minutes
  otpStore.set(email, { otp, expiryTime });
  
  // Auto-delete after 10 minutes
  setTimeout(() => {
    otpStore.delete(email);
  }, 10 * 60 * 1000);
};

// Get OTP
const getOTP = (email) => {
  const data = otpStore.get(email);
  
  if (!data) return null;
  
  // Check expiry
  if (Date.now() > data.expiryTime) {
    otpStore.delete(email);
    return null;
  }
  
  return data.otp;
};

// Delete OTP
const deleteOTP = (email) => {
  otpStore.delete(email);
};

module.exports = { storeOTP, getOTP, deleteOTP };