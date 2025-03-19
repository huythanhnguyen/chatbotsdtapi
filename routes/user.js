// server/routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Tất cả routes đều yêu cầu xác thực
router.use(authenticate);

// Cập nhật thông tin người dùng
router.put('/profile', userController.updateProfile);

// Lấy danh sách phân tích của người dùng hiện tại
router.get('/analyses', userController.getUserAnalyses);

// ADMIN ROUTES - Require admin privileges
// Lấy tất cả người dùng (admin only)
router.get('/all', isAdmin, userController.getAllUsers);

// Xóa người dùng (admin only)
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;