const express = require('express');
const { authenticate } = require('../middleware/auth');
const { 
  getRemainingQuestions, 
  createPayment, 
  completePayment, 
  getPaymentHistory 
} = require('../controllers/paymentController');

const router = express.Router();

// Route: Lấy số câu hỏi còn lại của người dùng
router.get('/user/questions', authenticate, getRemainingQuestions);

// Route: Tạo giao dịch thanh toán mới
router.post('/payment/create', authenticate, createPayment);

// Route: Hoàn thành thanh toán (chỉ dùng cho test)
router.post('/payment/complete/:id', authenticate, completePayment);

// Route: Lấy lịch sử thanh toán
router.get('/payment/history', authenticate, getPaymentHistory);

module.exports = router; 