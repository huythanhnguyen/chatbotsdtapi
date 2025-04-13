const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID người dùng không được để trống'],
    index: true
  },
  amount: {
    type: Number,
    required: [true, 'Số tiền thanh toán không được để trống']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
    index: true
  },
  package: {
    type: String
  },
  questionsAdded: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Tạo index cho userId và status
paymentSchema.index({ userId: 1, status: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment; 