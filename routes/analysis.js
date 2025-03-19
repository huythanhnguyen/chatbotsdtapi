// server/routes/analysis.js
const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const { authenticate } = require('../middleware/auth');

// Tất cả routes đều yêu cầu xác thực
router.use(authenticate);

// Phân tích số điện thoại
router.post('/analyze', analysisController.analyzePhoneNumber);

// Lấy lịch sử phân tích
router.get('/history', analysisController.getAnalysisHistory);

// Lấy chi tiết một phân tích
router.get('/:id', analysisController.getAnalysisDetail);

// Xóa một phân tích
router.delete('/:id', analysisController.deleteAnalysis);

// Xử lý câu hỏi liên quan đến phân tích số điện thoại
router.post('/question', analysisController.askQuestion);

module.exports = router;