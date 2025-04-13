const User = require('../models/User');
const config = require('../config/env');

/**
 * Middleware kiểm tra quota của người dùng
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const checkQuota = async (req, res, next) => {
  try {
    // Kiểm tra FREE_MODE từ cấu hình
    const freeMode = config.FREE_MODE;
    
    // Nếu đang ở chế độ FREE_MODE, bỏ qua kiểm tra quota
    if (freeMode) {
      return next();
    }
    
    // Lấy thông tin user từ req.user (được set bởi auth middleware)
    const userId = req.user.id;
    
    // Nếu không có userId, trả về lỗi
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy thông tin người dùng'
      });
    }
    
    // Lấy thông tin user từ database
    const user = await User.findById(userId);
    
    // Nếu không tìm thấy user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    // Nếu user là premium, cho phép sử dụng không giới hạn
    if (user.isPremium) {
      return next();
    }
    
    // Kiểm tra số câu hỏi còn lại
    if (user.remainingQuestions > 0) {
      // Giảm số câu hỏi còn lại và lưu vào database
      user.remainingQuestions -= 1;
      await user.save();
      
      return next();
    }
    
    // Nếu hết quota, trả về lỗi 402 Payment Required
    return res.status(402).json({
      success: false,
      message: 'Bạn đã hết quota. Vui lòng nâng cấp tài khoản hoặc mua thêm câu hỏi để tiếp tục sử dụng dịch vụ.',
      remainingQuestions: 0
    });
    
  } catch (error) {
    console.error('Lỗi kiểm tra quota:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi kiểm tra quota'
    });
  }
};

module.exports = {
  checkQuota
}; 