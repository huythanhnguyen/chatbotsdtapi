// server/controllers/analysisController.js
const Analysis = require('../models/Analysis');
const analysisService = require('../services/analysisService');
const geminiService = require('../services/geminiService');

// Phân tích số điện thoại
exports.analyzePhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userId = req.user.id;

    // Kiểm tra xem số đã được phân tích trước đó chưa
    let existingAnalysis = await Analysis.findOne({ 
      userId, 
      phoneNumber: phoneNumber.replace(/\D/g, '') 
    }).sort({ createdAt: -1 });

    // Nếu đã phân tích trong vòng 24 giờ qua, trả về kết quả có sẵn
    if (existingAnalysis && 
        (new Date() - new Date(existingAnalysis.createdAt)) < 24 * 60 * 60 * 1000) {
      return res.json({
        success: true,
        analysis: existingAnalysis,
        cached: true
      });
    }

    // Thực hiện phân tích
    const analysisResult = analysisService.analyzePhoneNumber(phoneNumber);
    
    if (analysisResult.error) {
      return res.status(400).json({
        success: false,
        message: analysisResult.error
      });
    }

    // Lấy phân tích từ Gemini API
    const geminiResponse = await geminiService.generateAnalysis(analysisResult);

    // Lưu kết quả vào database
    const newAnalysis = new Analysis({
      userId,
      phoneNumber: phoneNumber.replace(/\D/g, ''),
      result: analysisResult,
      geminiResponse
    });

    await newAnalysis.save();

    res.json({
      success: true,
      analysis: newAnalysis,
      cached: false
    });
  } catch (error) {
    console.error('Phone analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi phân tích số điện thoại',
      error: error.message
    });
  }
};

// Lấy lịch sử phân tích
exports.getAnalysisHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const userId = req.user.id;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const history = await Analysis.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Analysis.countDocuments({ userId });

    res.json({
      success: true,
      history,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get analysis history error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy lịch sử phân tích',
      error: error.message
    });
  }
};

// Lấy chi tiết một phân tích
exports.getAnalysisDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await Analysis.findOne({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phân tích'
      });
    }

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Get analysis detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết phân tích',
      error: error.message
    });
  }
};
// server/controllers/analysisController.js


// Xử lý câu hỏi liên quan đến phân tích số điện thoại
exports.askQuestion = async (req, res) => {
    try {
        const { phoneNumber, question } = req.body;
        const userId = req.user._id;

        // Kiểm tra dữ liệu đầu vào
        if (!phoneNumber || !question) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp số điện thoại và câu hỏi'
            });
        }

        // Tìm phân tích gần nhất cho số điện thoại này
        const analysis = await Analysis.findOne({ 
            phoneNumber,
            userId
        }).sort({ createdAt: -1 });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy phân tích cho số điện thoại này'
            });
        }

        // Sử dụng GeminiService để tạo phản hồi
        const answer = await geminiService.generateResponse(question, analysis);

        // Trả về kết quả
        return res.status(200).json({
            success: true,
            analysis: {
                answer,
                phoneNumber,
                question
            }
        });
    } catch (error) {
        console.error('Error processing question:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi xử lý câu hỏi',
            error: error.message
        });
    }
};

// Xóa một phân tích
exports.deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await Analysis.findOneAndDelete({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phân tích'
      });
    }

    res.json({
      success: true,
      message: 'Đã xóa phân tích thành công'
    });
  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa phân tích',
      error: error.message
    });
  }
};