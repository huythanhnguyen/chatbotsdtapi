const User = require('../models/User');
const Payment = require('../models/Payment');

/**
 * Lấy số câu hỏi còn lại của người dùng
 * @route GET /api/payments/remaining-questions
 * @access Private
 */
const getRemainingQuestions = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin quota thành công',
      data: {
        remainingQuestions: user.remainingQuestions,
        isPremium: user.isPremium
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy số câu hỏi còn lại:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy thông tin quota'
    });
  }
};

/**
 * Tạo yêu cầu thanh toán mới
 * @route POST /api/payments
 * @access Private
 */
const createPayment = async (req, res) => {
  try {
    const { amount, package, questionsAdded } = req.body;
    const userId = req.user.id;

    // Kiểm tra dữ liệu đầu vào
    if (!amount || !package) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin thanh toán'
      });
    }

    // Tạo yêu cầu thanh toán mới
    const payment = await Payment.create({
      userId,
      amount,
      package,
      questionsAdded,
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo yêu cầu thanh toán thành công',
      data: payment
    });
  } catch (error) {
    console.error('Lỗi khi tạo yêu cầu thanh toán:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi tạo yêu cầu thanh toán'
    });
  }
};

/**
 * Hoàn tất thanh toán (dùng cho test và mock)
 * @route PUT /api/payments/:id/complete
 * @access Private
 */
const completePayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Tìm thanh toán
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thanh toán'
      });
    }
    
    // Kiểm tra trạng thái thanh toán
    if (payment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Thanh toán này đã được hoàn tất trước đó'
      });
    }
    
    // Kiểm tra xem user có quyền cập nhật thanh toán này không
    if (payment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền cập nhật thanh toán này'
      });
    }
    
    // Cập nhật thanh toán
    payment.status = 'completed';
    payment.completedAt = Date.now();
    await payment.save();
    
    // Cập nhật thông tin người dùng
    const user = await User.findById(payment.userId);
    
    if (user) {
      // Nếu là gói premium
      if (payment.package.includes('premium')) {
        user.isPremium = true;
      }
      
      // Thêm số câu hỏi
      if (payment.questionsAdded) {
        user.remainingQuestions += payment.questionsAdded;
      }
      
      await user.save();
    }
    
    return res.status(200).json({
      success: true,
      message: 'Hoàn tất thanh toán thành công',
      data: {
        payment,
        user: {
          remainingQuestions: user.remainingQuestions,
          isPremium: user.isPremium
        }
      }
    });
  } catch (error) {
    console.error('Lỗi khi hoàn tất thanh toán:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi hoàn tất thanh toán'
    });
  }
};

/**
 * Lấy lịch sử thanh toán của người dùng
 * @route GET /api/payments
 * @access Private
 */
const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    let query = { userId };
    
    // Lọc theo trạng thái nếu có
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Phân trang
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Đếm tổng số thanh toán
    const total = await Payment.countDocuments(query);
    
    // Lấy danh sách thanh toán
    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    return res.status(200).json({
      success: true,
      message: 'Lấy lịch sử thanh toán thành công',
      data: {
        payments,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử thanh toán:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy lịch sử thanh toán'
    });
  }
};

module.exports = {
  getRemainingQuestions,
  createPayment,
  completePayment,
  getPaymentHistory
}; 