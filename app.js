// server/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Cập nhật cấu hình CORS tại đây
app.use(cors({
  origin: '*',  // Cho phép tất cả các nguồn
  credentials: true
}));

app.use(express.json());

// Debug endpoint kiểm tra
app.get('/api/debug', (req, res) => {
  res.status(200).json({
    success: true, 
    message: 'API is working',
    endpoints: [
      '/api/payments/user/questions',
      '/api/payments/create',
      '/api/payments/history'
    ]
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payments', paymentRoutes); // Đổi tiền tố thành '/api/payments'
app.use('/api/admin', adminRoutes);
// Demo routes không cần xác thực
const demoRoutes = require('./routes/demoRoutes');
app.use('/api/demo', demoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Cấu hình CORS chi tiết
const corsOptions = {
  origin: ['https://phong-thuy-so.onrender.com', 'http://localhost:5173'], // Thêm domain của frontend
  credentials: true, // Cho phép gửi cookies
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Áp dụng cấu hình CORS mới
app.use(cors(corsOptions));

module.exports = app;
