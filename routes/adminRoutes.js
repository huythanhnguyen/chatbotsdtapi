const express = require('express');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');
const { 
  toggleFreeMode, 
  addQuestionsToUser, 
  setPremiumStatus, 
  getSystemConfig 
} = require('../controllers/adminController');

const router = express.Router();

// Bảo vệ tất cả các routes /api/admin với middleware authenticate và isAdmin
router.use(authenticate, isAdmin);

// Route: Bật/tắt chế độ miễn phí cho toàn hệ thống
router.post('/free-mode', toggleFreeMode);

// Route: Thêm câu hỏi cho user
router.post('/add-questions/:userId', addQuestionsToUser);

// Route: Đặt trạng thái premium cho user
router.post('/set-premium/:userId', setPremiumStatus);

// Route: Lấy cấu hình hệ thống
router.get('/system-config', getSystemConfig);

module.exports = router; 