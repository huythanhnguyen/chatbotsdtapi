// server/controllers/chatController.js
const geminiService = require('../services/geminiService');
const analysisService = require('../services/analysisService');
const userService = require('../services/userService');

// Xử lý tin nhắn chat
exports.handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user ? req.user.id : null;
    console.log("[CONTROLLER] Received message:", req.body.message);
    
    // Sử dụng hàm mới để xử lý tin nhắn
    const response = await geminiService.handleUserMessage(message, userId);
    console.log("[CONTROLLER] Calling geminiService.handleUserMessage");
    return res.json({
      success: true,
      response
    });
  } catch (error) {
    console.error('Chat message error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi xử lý tin nhắn',
      error: error.message
    });
  }
};
/**
 * Controller xử lý các tương tác chat và phân tích số điện thoại
 */
class ChatController {
  /**
   * Xử lý phân tích số điện thoại
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async analyzePhoneNumber(req, res) {
    try {
      const { phoneNumber } = req.body;
      const userId = req.user ? req.user.id : null;
      
      if (!phoneNumber || phoneNumber.length < 10) {
        return res.status(400).json({ error: 'Số điện thoại không hợp lệ' });
      }
      
      // Phân tích số điện thoại
      const analysisData = await analysisService.analyzePhoneNumber(phoneNumber);
      
      // Sử dụng Gemini để tạo phân tích chi tiết với userId để lưu context
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
  }
  
  /**
   * Xử lý câu hỏi của người dùng
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async handleQuestion(req, res) {
    try {
      const { question, phoneNumber, isFollowUp = false } = req.body;
      const userId = req.user ? req.user.id : null;
      
      if (!question) {
        return res.status(400).json({ error: 'Vui lòng nhập câu hỏi' });
      }
      
      let response;
      
      // Kiểm tra xem đây có phải là câu hỏi follow-up hay không
      if (isFollowUp || (userId && geminiService.hasActiveConversation(userId))) {
        // Xử lý câu hỏi follow-up với context trước đó
        response = await geminiService.generateFollowUpResponse(question, userId);
      } else if (phoneNumber) {
        // Câu hỏi đầu tiên về một số điện thoại cụ thể
        const analysisData = await analysisService.analyzePhoneNumber(phoneNumber);
        response = await geminiService.generateResponse(question, analysisData, userId);
      } else {
        // Câu hỏi chung về chiêm tinh học số
        response = await geminiService.generateGeneralInfo(question, userId);
      }
      
      return res.json({
        success: true,
        question,
        response
      });
    } catch (error) {
      console.error('Error handling question:', error);
      return res.status(500).json({ error: 'Lỗi khi xử lý câu hỏi' });
    }
  }
  
  /**
   * Xóa lịch sử hội thoại của người dùng
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async clearConversation(req, res) {
    try {
      const userId = req.user ? req.user.id : null;
      
      if (!userId) {
        return res.status(401).json({ error: 'Người dùng không được xác thực' });
      }
      
      geminiService.clearConversation(userId);
      
      return res.json({
        success: true,
        message: 'Đã xóa lịch sử hội thoại'
      });
    } catch (error) {
      console.error('Error clearing conversation:', error);
      return res.status(500).json({ error: 'Lỗi khi xóa lịch sử hội thoại' });
    }
  }
  
  /**
   * So sánh nhiều số điện thoại
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async comparePhoneNumbers(req, res) {
    try {
      const { phoneNumbers } = req.body;
      const userId = req.user ? req.user.id : null;
      
      if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length < 2) {
        return res.status(400).json({ error: 'Cần ít nhất 2 số điện thoại để so sánh' });
      }
      
      // Phân tích từng số điện thoại
      const analysisDataList = await Promise.all(
        phoneNumbers.map(phone => analysisService.analyzePhoneNumber(phone))
      );
      
      // So sánh các số điện thoại
      const comparison = await geminiService.generateComparison(analysisDataList, userId);
      
      return res.json({
        success: true,
        phoneNumbers,
        comparison
      });
    } catch (error) {
      console.error('Error comparing phone numbers:', error);
      return res.status(500).json({ error: 'Lỗi khi so sánh số điện thoại' });
    }
  }
}

module.exports = new ChatController();