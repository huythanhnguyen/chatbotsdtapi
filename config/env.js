/**
 * Tập trung quản lý các biến môi trường và cung cấp giá trị mặc định
 */

const config = {
  // Cấu hình server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  
  // Cấu hình database
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/chatbotsdtapi',
  
  // Cấu hình JWT
  JWT_SECRET: process.env.JWT_SECRET || 'sdtapisecret123456',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '30d',
  
  // Cấu hình Gemini API
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  
  // Cấu hình quota và thanh toán
  FREE_MODE: process.env.FREE_MODE === 'true',
  TRIAL_QUESTIONS: parseInt(process.env.TRIAL_QUESTIONS || '5', 10),
};

module.exports = config; 