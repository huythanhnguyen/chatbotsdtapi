// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Tất cả các routes đều yêu cầu xác thực
router.use('/user', authenticate);

// Route: Lấy thông tin cá nhân
router.get('/user/profile', userController.getProfile);

// Route: Cập nhật thông tin cá nhân
router.put('/user/profile', userController.updateProfile);

// Route: Đổi mật khẩu
router.put('/user/change-password', userController.changePassword);

module.exports = router; 