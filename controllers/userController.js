// server/controllers/userController.js
const User = require('../models/User');
const Analysis = require('../models/Analysis');

/**
 * Lấy thông tin cá nhân của người dùng
 * @route GET /api/user/profile
 * @access Private
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Lấy thông tin người dùng từ database
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    // Đếm số lượng phân tích đã thực hiện
    const analysesCount = await Analysis.countDocuments({ userId });
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        remainingQuestions: user.remainingQuestions,
        isPremium: user.isPremium,
        analysesCount
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin cá nhân',
      error: error.message
    });
  }
};

/**
 * Cập nhật thông tin người dùng
 * @route PUT /api/user/profile
 * @access Private
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const userId = req.user.id;
    
    // Tạo object thông tin cần cập nhật
    const updateData = {};
    if (name) updateData.name = name;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    
    // Không cho phép cập nhật email (cần quy trình riêng)
    if (req.body.email) {
      return res.status(400).json({
        success: false,
        message: 'Không thể thay đổi email qua API này. Vui lòng sử dụng quy trình đổi email.'
      });
    }
    
    // Cập nhật người dùng
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật thông tin',
      error: error.message
    });
  }
};

/**
 * Lấy tất cả các phân tích của người dùng hiện tại
 * @route GET /api/user/analyses
 * @access Private
 */
exports.getUserAnalyses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10, page = 1 } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Tìm tất cả phân tích của người dùng
    const analyses = await Analysis.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Đếm tổng số phân tích
    const total = await Analysis.countDocuments({ userId });
    
    res.json({
      success: true,
      data: analyses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get user analyses error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách phân tích',
      error: error.message
    });
  }
};

/**
 * [ADMIN] Lấy tất cả người dùng
 * @route GET /api/user/all
 * @access Admin
 */
exports.getAllUsers = async (req, res) => {
  try {
    const { limit = 10, page = 1, search = '' } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Tạo query tìm kiếm
    const searchQuery = {};
    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Tìm tất cả người dùng
    const users = await User.find(searchQuery)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Đếm tổng số người dùng
    const total = await User.countDocuments(searchQuery);
    
    // Lấy thông tin phân tích của từng người dùng
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const analysesCount = await Analysis.countDocuments({ userId: user._id });
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
          analysesCount
        };
      })
    );
    
    res.json({
      success: true,
      data: usersWithStats,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách người dùng',
      error: error.message
    });
  }
};

/**
 * [ADMIN] Xóa người dùng
 * @route DELETE /api/user/:id
 * @access Admin
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Kiểm tra người dùng tồn tại
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    // Xóa tất cả phân tích của người dùng
    await Analysis.deleteMany({ userId: id });
    
    // Xóa người dùng
    await User.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Xóa người dùng thành công'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa người dùng',
      error: error.message
    });
  }
};

/**
 * [ADMIN] Vô hiệu hóa người dùng
 * @route PUT /api/user/:id/disable
 * @access Admin
 */
exports.disableUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cập nhật trạng thái người dùng
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { status: 'disabled' } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    res.json({
      success: true,
      message: 'Vô hiệu hóa người dùng thành công',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Disable user error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi vô hiệu hóa người dùng',
      error: error.message
    });
  }
};

/**
 * Đổi mật khẩu
 * @route PUT /api/user/change-password
 * @access Private
 */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Kiểm tra dữ liệu đầu vào
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp mật khẩu hiện tại và mật khẩu mới'
      });
    }

    // Kiểm tra mật khẩu mới có đủ độ dài không
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới phải có ít nhất 6 ký tự'
      });
    }

    // Lấy người dùng với mật khẩu
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu hiện tại không chính xác'
      });
    }

    // Cập nhật mật khẩu mới
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi đổi mật khẩu',
      error: error.message
    });
  }
};