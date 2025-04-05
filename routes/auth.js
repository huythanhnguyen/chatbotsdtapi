// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Đăng ký người dùng mới
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

// Xác thực token
router.get('/verify-token', authenticate, authController.verifyToken);

// Lấy thông tin người dùng hiện tại
router.get('/me', authenticate, authController.getCurrentUser);

// Đổi mật khẩu
router.post('/change-password', authenticate, authController.changePassword);

// Quên mật khẩu - yêu cầu đặt lại
router.post('/forgot-password', authController.forgotPassword);

// Đặt lại mật khẩu với token
router.post('/reset-password', authController.resetPassword);

// Đăng xuất
router.post('/logout', authenticate, authController.logout);

module.exports = router;