// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/env');

// Lấy số lượng câu hỏi dùng thử từ cấu hình
const defaultTrialQuestions = config.TRIAL_QUESTIONS;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên không được để trống'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email không được để trống'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
  },
  password: {
    type: String,
    required: [true, 'Mật khẩu không được để trống'],
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
    select: false // Không trả về password khi query
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  remainingQuestions: {
    type: Number,
    default: defaultTrialQuestions
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Middleware: Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function(next) {
  // Chỉ hash mật khẩu nếu nó được sửa đổi (hoặc mới)
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Tạo salt và hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method: So sánh mật khẩu
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Method: Cập nhật thời gian đăng nhập
  userSchema.methods.updateLastLogin = async function() {
    this.lastLogin = Date.now();
    return this.save();
  };
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;