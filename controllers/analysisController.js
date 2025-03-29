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
exports.askQuestion = async (req, res) => {
  try {
    const { phoneNumber, question, type = 'question', phoneNumbers } = req.body;
    const userId = req.user ? req.user._id : null;
    
    console.log("Request data:", { phoneNumber, question, type, phoneNumbers, userId });
    
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
        
      case 'followup':
        // Xử lý câu hỏi theo dõi - dựa vào phân tích gần nhất
        console.log("Processing follow-up question");
        
        // Nếu cung cấp số điện thoại, tìm phân tích của số đó
        let analysisRecord;
        
        if (phoneNumber) {
          analysisRecord = await Analysis.findOne({ 
            phoneNumber,
            userId
          }).sort({ createdAt: -1 });
        } else {
          // Nếu không cung cấp số, tìm phân tích gần nhất
          analysisRecord = await Analysis.findOne({ userId }).sort({ createdAt: -1 });
        }
        
        if (!analysisRecord) {
          console.log("No existing analysis found for follow-up");
          return res.status(404).json({
            success: false,
            message: 'Không tìm thấy phân tích trước đó để trả lời câu hỏi. Vui lòng phân tích một số điện thoại trước.'
          });
        }
        
        console.log(`Using existing analysis for phone ${analysisRecord.phoneNumber} for follow-up`);
        
        // Sử dụng phương thức follow-up response
        const followUpResponse = await geminiService.generateFollowUpResponse(
          question, 
          userId, 
          analysisRecord.result
        );
        
        return res.status(200).json({
          success: true,
          analysis: {
            answer: followUpResponse,
            phoneNumber: analysisRecord.phoneNumber,
            question,
            type: 'followup'
          }
        });
        
      case 'general':
        // Xử lý câu hỏi chung, không liên quan đến số điện thoại cụ thể
        console.log("Processing general question about numerology");
        
        const generalResponse = await geminiService.generateGeneralInfo(question, userId);
        
        return res.status(200).json({
          success: true,
          analysis: {
            answer: generalResponse,
            question,
            type: 'general'
          }
        });
        
      case 'question':
      default:
        // Xử lý câu hỏi về một số điện thoại cụ thể (mặc định)
        
        // Xử lý khi không có số điện thoại trong request
        if (!phoneNumber) {
          console.log("No phone number provided for question, using most recent analysis");
          
          // Tìm phân tích gần nhất của người dùng
          const latestAnalysisRecord = await Analysis.findOne({ userId }).sort({ createdAt: -1 });
          
          if (!latestAnalysisRecord) {
            // Nếu không có phân tích nào, xử lý như câu hỏi chung
            console.log("No existing analysis found, treating as general question");
            const fallbackResponse = await geminiService.generateGeneralInfo(question, userId);
            
            return res.status(200).json({
              success: true,
              analysis: {
                answer: fallbackResponse,
                question,
                type: 'general'
              }
            });
          }
          
          // Sử dụng phân tích gần nhất
          console.log(`Using most recent analysis for phone ${latestAnalysisRecord.phoneNumber}`);
          
          // Kiểm tra xem có thuộc tính result không
          if (!latestAnalysisRecord.result) {
            console.error("Analysis record is missing result property:", latestAnalysisRecord);
            return res.status(500).json({
              success: false,
              message: 'Lỗi: Dữ liệu phân tích thiếu thông tin cần thiết'
            });
          }
          
          const recentQuestionResponse = await geminiService.generateResponse(
            question, 
            latestAnalysisRecord.result, 
            userId
          );
          
          return res.status(200).json({
            success: true,
            analysis: {
              answer: recentQuestionResponse,
              phoneNumber: latestAnalysisRecord.phoneNumber,
              question,
              type: 'question'
            }
          });
        }
        
        // Tìm phân tích cho số điện thoại cụ thể
        const analysisRecord = await Analysis.findOne({ 
          phoneNumber,
          userId
        }).sort({ createdAt: -1 });
        
        if (!analysisRecord) {
          console.log(`No existing analysis found for phone ${phoneNumber}, creating new analysis`);
          // Thực hiện phân tích mới nếu không tìm thấy
          const analysisData = await analysisService.analyzePhoneNumber(phoneNumber);
          
          // Tạo bản ghi phân tích mới
          const newAnalysis = new Analysis({
            userId,
            phoneNumber,
            result: analysisData
          });
          
          await newAnalysis.save();
          console.log(`Created new analysis for phone ${phoneNumber}`);
          
          const newAnalysisResponse = await geminiService.generateResponse(question, analysisData, userId);
          
          return res.status(200).json({
            success: true,
            analysis: {
              answer: newAnalysisResponse,
              phoneNumber,
              question,
              isNewAnalysis: true,
              type: 'question'
            }
          });
        }
        
        console.log(`Found existing analysis for phone ${phoneNumber}, generating response`);
        
        // Kiểm tra xem có thuộc tính result không
        if (!analysisRecord.result) {
          console.error("Analysis record is missing result property:", analysisRecord);
          return res.status(500).json({
            success: false,
            message: 'Lỗi: Dữ liệu phân tích thiếu thông tin cần thiết'
          });
        }
        
        // Sử dụng GeminiService để tạo phản hồi
        const questionResponse = await geminiService.generateResponse(question, analysisRecord.result, userId);
        
        // Trả về kết quả
        return res.status(200).json({
          success: true,
          analysis: {
            answer: questionResponse,
            phoneNumber,
            question,
            type: 'question'
          }
        });
    }
  } catch (error) {
    console.error('Error processing question:', error);
    console.error(error.stack); // Log stack trace
    return res.status(500).json({
      success: false,
      message: 'Lỗi xử lý câu hỏi',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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