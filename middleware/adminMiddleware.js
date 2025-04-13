/**
 * Middleware kiểm tra quyền admin
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const isAdmin = (req, res, next) => {
  // Kiểm tra xem user đã đăng nhập chưa
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Vui lòng đăng nhập để tiếp tục'
    });
  }

  // Kiểm tra quyền admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền truy cập chức năng này'
    });
  }

  // Nếu là admin, cho phép truy cập
  next();
};

module.exports = {
  isAdmin
}; 