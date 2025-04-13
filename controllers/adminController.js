const User = require('../models/User');
const config = require('../config/env');

// Biến lưu trữ cấu hình hệ thống (trong thực tế nên dùng database hoặc file cấu hình)
let systemConfig = {
  freeMode: config.FREE_MODE,
  defaultQuestions: config.TRIAL_QUESTIONS,
  premiumPrice: 100000,
  questionPackages: [
    { name: 'basic', count: 10, price: 20000 },
    { name: 'standard', count: 50, price: 80000 },
    { name: 'premium', count: 100, price: 150000 },
  ]
};

/**
 * Bật/tắt chế độ miễn phí cho toàn hệ thống
 * @route POST /api/admin/free-mode
 * @access Admin
 */
const toggleFreeMode = async (req, res) => {
  try {
    const { freeMode } = req.body;
    
    // Nếu không có tham số freeMode, đảo ngược trạng thái hiện tại
    if (freeMode === undefined) {
      systemConfig.freeMode = !systemConfig.freeMode;
    } else {
      // Nếu có tham số, sử dụng giá trị được cung cấp
      systemConfig.freeMode = Boolean(freeMode);
    }
    
    // Cập nhật biến môi trường (nếu có thể)
    if (process.env) {
      process.env.FREE_MODE = systemConfig.freeMode.toString();
    }
    
    return res.status(200).json({
      success: true,
      message: `Đã ${systemConfig.freeMode ? 'bật' : 'tắt'} chế độ miễn phí`,
      data: {
        freeMode: systemConfig.freeMode
      }
    });
  } catch (error) {
    console.error('Lỗi khi chuyển đổi chế độ miễn phí:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi chuyển đổi chế độ miễn phí'
    });
  }
};

/**
 * Thêm câu hỏi cho user cụ thể
 * @route POST /api/admin/add-questions/:userId
 * @access Admin
 */
const addQuestionsToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { questions } = req.body;
    
    // Kiểm tra dữ liệu đầu vào
    if (!userId || !questions || questions <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp ID người dùng và số câu hỏi hợp lệ'
      });
    }
    
    // Tìm user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    // Thêm số câu hỏi
    const previousQuestions = user.remainingQuestions;
    user.remainingQuestions += parseInt(questions, 10);
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: 'Đã thêm câu hỏi thành công',
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        previousQuestions,
        addedQuestions: parseInt(questions, 10),
        newTotal: user.remainingQuestions
      }
    });
  } catch (error) {
    console.error('Lỗi khi thêm câu hỏi cho người dùng:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi thêm câu hỏi cho người dùng'
    });
  }
};

/**
 * Đặt trạng thái premium cho user
 * @route POST /api/admin/set-premium/:userId
 * @access Admin
 */
const setPremiumStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isPremium } = req.body;
    
    // Kiểm tra dữ liệu đầu vào
    if (!userId || isPremium === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp ID người dùng và trạng thái premium'
      });
    }
    
    // Tìm user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    // Đặt trạng thái premium
    const previousStatus = user.isPremium;
    user.isPremium = Boolean(isPremium);
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: `Đã ${user.isPremium ? 'nâng cấp' : 'hạ cấp'} tài khoản thành công`,
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        previousStatus,
        currentStatus: user.isPremium
      }
    });
  } catch (error) {
    console.error('Lỗi khi đặt trạng thái premium:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi đặt trạng thái premium'
    });
  }
};

/**
 * Lấy cấu hình hiện tại của hệ thống
 * @route GET /api/admin/system-config
 * @access Admin
 */
const getSystemConfig = async (req, res) => {
  try {
    // Trả về cấu hình hiện tại
    return res.status(200).json({
      success: true,
      message: 'Lấy cấu hình hệ thống thành công',
      data: systemConfig
    });
  } catch (error) {
    console.error('Lỗi khi lấy cấu hình hệ thống:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy cấu hình hệ thống'
    });
  }
};

module.exports = {
  toggleFreeMode,
  addQuestionsToUser,
  setPremiumStatus,
  getSystemConfig
}; 