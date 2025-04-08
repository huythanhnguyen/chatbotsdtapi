// server/routes/demoRoutes.js
const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Controller xử lý demo phân tích
const demoController = {
  analyzePhoneNumber: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber || phoneNumber.length < 10) {
        return res.status(400).json({ success: false, error: 'Số điện thoại không hợp lệ' });
      }
      
      // Sử dụng service phân tích thực tế nhưng giới hạn kết quả trả về
      const analysisData = await analysisController.getBasicAnalysis(phoneNumber);
      
      // Tạo phiên tạm thời cho người dùng
      const sessionId = req.session ? req.session.id : `temp_${Date.now()}`;
      
      // Lưu trạng thái đã phân tích vào session
      if (req.session) {
        req.session.hasUsedDemo = true;
      }
      
      return res.json({
        success: true,
        phoneNumber,
        demoResult: true,
        analysisData: {
          // Chỉ trả về dữ liệu cơ bản
          starSequence: analysisData.starSequence.slice(-3), // Chỉ trả về 3 cặp số cuối
          energyLevel: analysisData.energyLevel,
          balance: analysisData.balance,
          // Không trả về dữ liệu chi tiết
        }
      });
    } catch (error) {
      console.error('Demo analysis error:', error);
      return res.status(500).json({ success: false, error: 'Lỗi khi phân tích số điện thoại' });
    }
  }
};

// Route demo không cần xác thực
router.post('/analyze', demoController.analyzePhoneNumber);

module.exports = router;