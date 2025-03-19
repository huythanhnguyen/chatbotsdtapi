// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  try {
    // Bỏ qua quá trình xác thực, luôn cho phép truy cập
    // Tạo một user mặc định
    req.user = {
      _id: '1',
      username: 'guest',
      email: 'guest@example.com',
      role: 'user',
      createdAt: new Date()
    };
    
    // Tiếp tục với request
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    // Vẫn cho phép request đi tiếp ngay cả khi có lỗi
    req.user = {
      _id: '1',
      username: 'guest',
      email: 'guest@example.com',
      role: 'user',
      createdAt: new Date()
    };
    next();
  }
};

// Middleware kiểm tra quyền admin - luôn cho phép truy cập
exports.isAdmin = (req, res, next) => {
  // Luôn cho phép truy cập, bỏ qua kiểm tra quyền admin
  next();
};
