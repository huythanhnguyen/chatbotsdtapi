// server/controllers/analysisController.js
const Analysis = require('../models/Analysis');
const analysisService = require('../services/analysisService');
const geminiService = require('../services/geminiService');

// Phân tích số điện thoại
exports.analyzePhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userId = req.user.id;
    
    // Method phân tích cơ bản không lưu vào database
    exports.getBasicAnalysis = async (phoneNumber) => {
      try {
        // Dùng service phân tích số nhưng không lưu kết quả
        const result = await analysisService.analyzePhoneNumberWithoutSaving(phoneNumber);
        return result;
      } catch (error) {
        console.error('Error in basic analysis:', error);
        throw error;
      }
    };

    // Đảm bảo phoneNumber là chuỗi
    const phoneNumberStr = String(phoneNumber || '');

    // Kiểm tra xem số đã được phân tích trước đó chưa
    let existingAnalysis = await Analysis.findOne({ 
      userId, 
      phoneNumber: phoneNumberStr.replace(/\D/g, '') 
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
    const analysisResult = analysisService.analyzePhoneNumber(phoneNumberStr);
    
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
      phoneNumber: phoneNumberStr.replace(/\D/g, ''),
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

// Xử lý câu hỏi liên quan đến phân tích số điện thoại
exports.askQuestion = async (req, res) => {
  try {
    const { phoneNumber, question, type = 'question', phoneNumbers } = req.body;
    
    // Đảm bảo userId luôn có giá trị hoặc null
    const userId = req.user && req.user._id ? req.user._id : 
                  (req.user && req.user.id ? req.user.id : null);
    
    console.log("[DEBUG] Sending question with payload:", {
      phoneNumber,
      question,
      type,
      phoneNumbers
    });
    
    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp câu hỏi'
      });
    }
    
    // Xử lý dựa trên loại câu hỏi
    switch (type) {
      case 'compare': 
        // Xử lý so sánh nhiều số điện thoại
        if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length < 2) {
          return res.status(400).json({
            success: false,
            message: 'Cần ít nhất 2 số điện thoại để so sánh'
          });
        }
        
        console.log(`Comparing phone numbers: ${phoneNumbers.join(', ')}`);
        
        try {
          // Phân tích từng số điện thoại
          const analysisDataList = await Promise.all(
            phoneNumbers.map(phone => analysisService.analyzePhoneNumber(phone))
          );
          
          // So sánh các số điện thoại
          const comparisonResponse = await geminiService.generateComparison(analysisDataList, userId);
          
          return res.status(200).json({
            success: true,
            analysis: {
              answer: comparisonResponse,
              phoneNumbers,
              question,
              type: 'comparison'
            }
          });
        } catch (compareError) {
          console.error('Error in phone comparison:', compareError);
          // Thử xử lý câu hỏi như một câu hỏi chung
          const fallbackResponse = await geminiService.generateGeneralInfo(question, userId);
          return res.status(200).json({
            success: true,
            analysis: {
              answer: fallbackResponse,
              question,
              type: 'general',
              note: 'Chuyển sang câu hỏi chung do lỗi khi so sánh'
            }
          });
        }
        
      case 'followup':
        // Xử lý câu hỏi theo dõi - dựa vào phân tích gần nhất
        console.log("Processing follow-up question");
        
        try {
          // Nếu cung cấp số điện thoại, tìm phân tích của số đó
          let followupRecord;
          
          if (phoneNumber) {
            // Đảm bảo phoneNumber là chuỗi
            const phoneNumberStr = String(phoneNumber || '');
            followupRecord = await Analysis.findOne({ 
              phoneNumber: phoneNumberStr.replace(/\D/g, ''),
              userId
            }).sort({ createdAt: -1 });
          } else {
            // Nếu không cung cấp số, tìm phân tích gần nhất
            followupRecord = await Analysis.findOne({ userId }).sort({ createdAt: -1 });
          }
          
          if (!followupRecord) {
            console.log("No existing analysis found for follow-up, switching to general question");
            // Chuyển sang xử lý câu hỏi chung nếu không tìm thấy phân tích trước đó
            const generalResponse = await geminiService.generateGeneralInfo(question, userId);
            return res.status(200).json({
              success: true,
              analysis: {
                answer: generalResponse,
                question,
                type: 'general',
                note: 'Chuyển sang câu hỏi chung do không tìm thấy phân tích trước đó'
              }
            });
          }
          
          console.log(`Using existing analysis for phone ${followupRecord.phoneNumber} for follow-up`);
          
          // Đảm bảo result tồn tại
          if (!followupRecord.result) {
            console.log("Analysis record is missing result property, using general response");
            const generalResponse = await geminiService.generateGeneralInfo(question, userId);
            return res.status(200).json({
              success: true,
              analysis: {
                answer: generalResponse,
                question,
                type: 'general',
                note: 'Chuyển sang câu hỏi chung do bản ghi phân tích thiếu thông tin'
              }
            });
          }
          
          // Chuẩn bị dữ liệu cho câu hỏi
          // Đảm bảo các thuộc tính cần thiết đều tồn tại
          const analysisData = {
            question: question,
            phoneNumber: followupRecord.phoneNumber,
            ...followupRecord.result  // Spread operator để đưa tất cả thuộc tính vào
          };
          
          // Log chi tiết để debug
          console.log(`Follow-up analysis data:`, {
            phoneNumber: analysisData.phoneNumber,
            hasStarSequence: !!analysisData.starSequence,
            starSequenceIsArray: Array.isArray(analysisData.starSequence),
            starSequenceLength: Array.isArray(analysisData.starSequence) ? analysisData.starSequence.length : 'N/A',
            hasEnergyLevel: !!analysisData.energyLevel,
            hasKeyCombinations: !!analysisData.keyCombinations,
          });
          
          // Sử dụng generateResponse trực tiếp với dữ liệu đã chuẩn bị
          const followUpResponse = await geminiService.generateResponse(
            question, 
            analysisData,  // Truyền toàn bộ dữ liệu phân tích kèm câu hỏi
            userId
          );
          
          return res.status(200).json({
            success: true,
            analysis: {
              answer: followUpResponse,
              phoneNumber: followupRecord.phoneNumber,
              question,
              type: 'followup'
            }
          });
        } catch (followupError) {
          console.error('Error in follow-up processing:', followupError);
          console.error(followupError.stack);  // Log stack trace for more detail
          
          // Thử xử lý câu hỏi như một câu hỏi chung
          const fallbackResponse = await geminiService.generateGeneralInfo(question, userId);
          return res.status(200).json({
            success: true,
            analysis: {
              answer: fallbackResponse,
              question,
              type: 'general',
              note: 'Chuyển sang câu hỏi chung do lỗi khi xử lý follow-up'
            }
          });
        }
        
      // Các trường hợp xử lý khác giữ nguyên...
      
      default:
        // Xử lý câu hỏi khác...
        // [Giữ nguyên code xử lý của case 'question' và default]
        // ...
    }
  } catch (error) {
    console.error('Error processing question:', error);
    console.error(error.stack); // Log stack trace
    
    // Cố gắng trả về một phản hồi chung nếu có lỗi
    try {
      const generalResponse = await geminiService.generateGeneralInfo(
        req.body.question || "Vui lòng cho tôi biết về chiêm tinh học số", 
        req.user?.id || req.user?._id || null
      );
      
      return res.status(200).json({
        success: true,
        analysis: {
          answer: generalResponse,
          question: req.body.question || "Không có câu hỏi cụ thể",
          type: 'general',
          note: 'Đã xảy ra lỗi khi xử lý câu hỏi ban đầu, đây là phản hồi chung'
        }
      });
    } catch (fallbackError) {
      // Nếu cả phương án dự phòng cũng thất bại, trả về lỗi
      return res.status(500).json({
        success: false,
        message: 'Lỗi xử lý câu hỏi',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
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

// Thêm vào file server/controllers/analysisController.js

// Method phân tích cơ bản không lưu vào database
exports.getBasicAnalysis = async (phoneNumber) => {
  try {
    // Dùng service phân tích số nhưng không lưu kết quả
    const result = await analysisService.analyzePhoneNumberWithoutSaving(phoneNumber);
    return result;
  } catch (error) {
    console.error('Error in basic analysis:', error);
    throw error;
  }
};