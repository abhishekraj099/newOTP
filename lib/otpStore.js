// Simple in-memory storage for local testing
const otpStore = new Map();

// Store OTP (expires in 10 minutes)
const storeOTP = async (email, otp) => {
  otpStore.set(email, { otp, expires: Date.now() + 600000 }); // 600000ms = 10 minutes
  console.log(`OTP stored for ${email}: ${otp}`);
  
  // Auto-delete after 10 minutes
  setTimeout(() => {
    otpStore.delete(email);
    console.log(`OTP expired and deleted for ${email}`);
  }, 600000);
};

// Get OTP
const getOTP = async (email) => {
  const data = otpStore.get(email);
  
  if (!data) {
    console.log(`OTP not found for ${email}`);
    return null;
  }
  
  // Check if expired
  if (Date.now() > data.expires) {
    otpStore.delete(email);
    console.log(`OTP expired for ${email}`);
    return null;
  }
  
  console.log(`OTP retrieved for ${email}: ${data.otp}`);
  return data.otp;
};

// Delete OTP
const deleteOTP = async (email) => {
  otpStore.delete(email);
  console.log(`OTP deleted for ${email}`);
};

module.exports = { storeOTP, getOTP, deleteOTP };
