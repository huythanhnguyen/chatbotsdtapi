// server/models/Analysis.js
const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  result: {
    // Lưu kết quả phân tích
    starSequence: Array,
    energyLevel: Object,
    balance: String,
    keyCombinations: Array,
    dangerousCombinations: Array,
    keyPositions: Object,
    last3DigitsAnalysis: Object,
    specialAttribute: String
  },
  geminiResponse: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo index cho tìm kiếm nhanh
analysisSchema.index({ userId: 1, phoneNumber: 1 });
analysisSchema.index({ createdAt: -1 });

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;