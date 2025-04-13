// server/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');
const analysisService = require('../services/analysisService');
const { authenticate } = require('../middleware/auth');
const { checkQuota } = require('../middleware/quotaMiddleware');

// Middleware kiểm tra session
const checkSession = (req, res, next) => {
  if (!req.session) {
    req.session = {};
  }
  if (!req.session.userId) {
    req.session.userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }
  next();
};

// Route phân tích số điện thoại - yêu cầu xác thực và kiểm tra quota
router.post('/analyze', authenticate, checkQuota, async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userId = req.user ? req.user.id : null;
    
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ' });
    }
    
    // Phân tích số điện thoại
    const analysisData = await analysisService.analyzePhoneNumber(phoneNumber);
    
    // Lưu dữ liệu phân tích vào session
    req.session.currentPhoneNumber = phoneNumber;
    req.session.analysisData = analysisData;
    
    // Sử dụng Gemini để tạo phân tích chi tiết
    const analysis = await geminiService.generateAnalysis(analysisData, userId);
    
    return res.json({
      success: true,
      phoneNumber,
      analysis,
      analysisData
    });
  } catch (error) {
    console.error('Error analyzing phone number:', error);
    return res.status(500).json({ error: 'Lỗi khi phân tích số điện thoại' });
  }
});

// Route xử lý câu hỏi - yêu cầu xác thực và kiểm tra quota
router.post('/question', authenticate, checkQuota, async (req, res) => {
  try {
    const { question, phoneNumber } = req.body;
    const userId = req.user ? req.user.id : null;
    
    if (!question) {
      return res.status(400).json({ error: 'Vui lòng nhập câu hỏi' });
    }
    
    let response;
    let analysisData;
    
    // Kiểm tra xem đã có phân tích trước đó trong session chưa
    const hasExistingAnalysis = req.session.currentPhoneNumber && req.session.analysisData;
    
    // Nếu có số điện thoại mới, ưu tiên sử dụng số mới
    if (phoneNumber && phoneNumber !== req.session.currentPhoneNumber) {
      // Phân tích số điện thoại mới
      analysisData = await analysisService.analyzePhoneNumber(phoneNumber);
      req.session.currentPhoneNumber = phoneNumber;
      req.session.analysisData = analysisData;
      
      // Gửi câu hỏi với số điện thoại mới
      response = await geminiService.generateResponse(question, analysisData, userId);
    } 
    // Nếu là câu hỏi follow-up (không có số điện thoại mới nhưng có phân tích trong session)
    else if (hasExistingAnalysis) {
      // Sử dụng phân tích có sẵn trong session
      analysisData = req.session.analysisData;
      
      // Gửi câu hỏi follow-up với context từ phiên trước
      response = await geminiService.generateFollowUpResponse(question, userId, analysisData);
    } 
    // Nếu không có phân tích trước đó và không có số điện thoại mới
    else {
      // Xử lý như câu hỏi chung về chiêm tinh học số
      response = await geminiService.generateGeneralInfo(question, userId);
    }
    
    return res.json({
      success: true,
      question,
      phoneNumber: req.session.currentPhoneNumber,
      response
    });
  } catch (error) {
    console.error('Error handling question:', error);
    return res.status(500).json({ error: 'Lỗi khi xử lý câu hỏi' });
  }
});

// Route xóa lịch sử hội thoại - yêu cầu xác thực (không cần kiểm tra quota)
router.post('/clear', authenticate, (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    
    if (!userId) {
      return res.status(401).json({ error: 'Người dùng không được xác thực' });
    }
    
    // Xóa dữ liệu phân tích khỏi session
    delete req.session.currentPhoneNumber;
    delete req.session.analysisData;
    
    // Xóa lịch sử hội thoại
    geminiService.clearConversation(userId);
    
    return res.json({
      success: true,
      message: 'Đã xóa lịch sử hội thoại'
    });
  } catch (error) {
    console.error('Error clearing conversation:', error);
    return res.status(500).json({ error: 'Lỗi khi xóa lịch sử hội thoại' });
  }
});

module.exports = router;