// Load env ONLY in local mode
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: __dirname + '/api/.env.local' });
}

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const sendOtpRoute = require('./api/auth/sendOtp');
const verifyOtpRoute = require('./api/auth/verifyOtp');

// Use Routes
app.use('/api/auth', sendOtpRoute);
app.use('/api/auth', verifyOtpRoute);

// Health Check Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Simple Email OTP API is running',
    status: 'OK'
  });
});

// Start Server (Vercel ignores the port, but needed for local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
