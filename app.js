// server/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const demoRoutes = require('./routes/demoRoutes');
const cccdAnalysisRoutes = require('./routes/cccdAnalysisRoutes'); // Import CCCD routes

const app = express();

// General CORS configuration (consider reviewing if corsOptions below is sufficient)
app.use(cors({
  origin: '*',  // Consider restricting this in production
  credentials: true
}));

app.use(express.json());

// Debug endpoint kiểm tra
app.get('/api/debug', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working',
    endpoints: [
      '/api/auth',
      '/api/analysis',
      '/api/user',
      '/api/payments',
      '/api/admin',
      '/api/demo',
      '/api/cccd' // Added CCCD endpoint group
    ]
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payments', paymentRoutes); // Đổi tiền tố thành '/api/payments'
app.use('/api/admin', adminRoutes);
app.use('/api/demo', demoRoutes); // Demo routes
app.use('/api/cccd', cccdAnalysisRoutes); // Use CCCD routes


// Cấu hình CORS chi tiết (Applied later, potentially overriding the general one)
const corsOptions = {
  origin: ['https://phong-thuy-so.onrender.com', 'http://localhost:5173'], // Thêm domain của frontend
  credentials: true, // Cho phép gửi cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow standard methods
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply detailed CORS options
app.use(cors(corsOptions));

// Error handling middleware (Should generally be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


module.exports = app;
