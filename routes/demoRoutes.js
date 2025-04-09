// server/routes/demoRoutes.js
const demoController = {
  analyzePhoneNumber: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      
      // Đảm bảo có số điện thoại
      if (!phoneNumber || phoneNumber.length < 10) {
        return res.status(400).json({ success: false, error: 'Số điện thoại không hợp lệ' });
      }
      
      // Trả về phản hồi giả để kiểm tra
      return res.json({
        success: true,
        phoneNumber,
        analysisData: {
          // Một số dữ liệu giả đơn giản
          energyLevel: { cat: 3, hung: 2, total: 5 },
          balance: "BALANCED",
          starSequence: [
            { 
              originalPair: "67", 
              name: "Sinh Khí", 
              nature: "Cát", 
              energyLevel: 3 
            }
          ]
        }
      });
      
    } catch (error) {
      console.error('Demo analysis error:', error);
      return res.status(500).json({ success: false, error: 'Lỗi khi phân tích số điện thoại' });
    }
  }
};
const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Controller xử lý demo phân tích
// Sử dụng controller demo đã được khai báo ở trên
// Cập nhật phương thức analyzePhoneNumber
demoController.analyzePhoneNumber = async (req, res) => {
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
};

// Route demo không cần xác thực
router.post('/analyze', demoController.analyzePhoneNumber);
// Tạo controller demo riêng
const demoController = {
  analyzePhoneNumber: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber || phoneNumber.length < 10) {
        return res.status(400).json({ success: false, error: 'Số điện thoại không hợp lệ' });
      }
      
      // Sử dụng phương thức phân tích trực tiếp từ analysisService thay vì qua controller
      const analysisService = require('../services/analysisService');
      const analysisData = await analysisService.analyzePhoneNumberWithoutSaving(phoneNumber);
      
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

module.exports = router;