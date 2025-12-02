const { kv } = require('@vercel/kv');

// Store OTP (expires in 10 minutes)
const storeOTP = async (email, otp) => {
  await kv.set(`otp:${email}`, otp, { ex: 600 }); // 600 seconds = 10 minutes
  console.log(`OTP stored for ${email}: ${otp}`);
};

// Get OTP
const getOTP = async (email) => {
  const otp = await kv.get(`otp:${email}`);
  console.log(`OTP retrieved for ${email}: ${otp}`);
  return otp;
};

// Delete OTP
const deleteOTP = async (email) => {
  await kv.del(`otp:${email}`);
  console.log(`OTP deleted for ${email}`);
};

module.exports = { storeOTP, getOTP, deleteOTP };