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

// Xử lý câu hỏi liên quan đến phân tích số điện thoại
exports.askQuestion = async (req, res) => {
  try {
    const { phoneNumber, question, type = 'question', phoneNumbers } = req.body;
    
    // Đảm bảo userId luôn có giá trị hoặc null
    const userId = req.user && req.user._id ? req.user._id : 
                  (req.user && req.user.id ? req.user.id : null);
    
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
            followupRecord = await Analysis.findOne({ 
              phoneNumber: phoneNumber.replace(/\D/g, ''),
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
          
          // Thay đổi cách xử lý follow-up: sử dụng generateResponse trực tiếp với context đầy đủ
          // thay vì sử dụng generateFollowUpResponse
          console.log('Using direct generateResponse for follow-up question');
          
          // Log để debug
          console.log('Analysis data structure:', 
            JSON.stringify({
              hasStarSequence: !!followupRecord.result.starSequence,
              hasEnergyLevel: !!followupRecord.result.energyLevel,
              hasKeyCombinations: !!followupRecord.result.keyCombinations,
              phoneNumber: followupRecord.result.phoneNumber || followupRecord.phoneNumber
            })
          );
          
          // Đảm bảo phoneNumber được thiết lập trong context
          const analysisContext = {
            ...followupRecord.result,
            phoneNumber: followupRecord.result.phoneNumber || followupRecord.phoneNumber
          };
          
          // Sử dụng generateResponse trực tiếp
          const followUpResponse = await geminiService.generateResponse(
            question, 
            analysisContext, 
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
        
      case 'general':
        // Xử lý câu hỏi chung, không liên quan đến số điện thoại cụ thể
        console.log("Processing general question about numerology");
        
        try {
          const generalResponse = await geminiService.generateGeneralInfo(question, userId);
          
          return res.status(200).json({
            success: true,
            analysis: {
              answer: generalResponse,
              question,
              type: 'general'
            }
          });
        } catch (generalError) {
          console.error('Error processing general question:', generalError);
          return res.status(500).json({
            success: false,
            message: 'Lỗi khi xử lý câu hỏi chung',
            error: generalError.message
          });
        }
        
      case 'question':
      default:
        // Xử lý câu hỏi về một số điện thoại cụ thể (mặc định)
        try {
          // Xử lý khi không có số điện thoại trong request
          if (!phoneNumber) {
            console.log("No phone number provided for question, using most recent analysis");
            
            // Tìm phân tích gần nhất của người dùng
            const latestAnalysisRecord = userId ? 
              await Analysis.findOne({ userId }).sort({ createdAt: -1 }) : null;
            
            if (!latestAnalysisRecord) {
              // Nếu không có phân tích nào, xử lý như câu hỏi chung
              console.log("No existing analysis found, treating as general question");
              const fallbackResponse = await geminiService.generateGeneralInfo(question, userId);
              
              return res.status(200).json({
                success: true,
                analysis: {
                  answer: fallbackResponse,
                  question,
                  type: 'general',
                  note: 'Chuyển sang câu hỏi chung do không tìm thấy phân tích trước đó'
                }
              });
            }
            
            // Sử dụng phân tích gần nhất
            console.log(`Using most recent analysis for phone ${latestAnalysisRecord.phoneNumber}`);
            
            // Kiểm tra xem có thuộc tính result không
            if (!latestAnalysisRecord.result) {
              console.log("Analysis record is missing result property, using general response");
              const fallbackResponse = await geminiService.generateGeneralInfo(question, userId);
              
              return res.status(200).json({
                success: true,
                analysis: {
                  answer: fallbackResponse,
                  question,
                  type: 'general',
                  note: 'Chuyển sang câu hỏi chung do bản ghi phân tích thiếu thông tin'
                }
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
          const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
          const existingAnalysisRecord = userId ? 
            await Analysis.findOne({ 
              phoneNumber: cleanPhoneNumber,
              userId
            }).sort({ createdAt: -1 }) : null;
          
          if (!existingAnalysisRecord) {
            console.log(`No existing analysis found for phone ${cleanPhoneNumber}, creating new analysis`);
            // Thực hiện phân tích mới nếu không tìm thấy
            const analysisData = await analysisService.analyzePhoneNumber(cleanPhoneNumber);
            
            // Nếu user đã đăng nhập, lưu phân tích vào CSDL
            if (userId) {
              // Tạo bản ghi phân tích mới
              const newAnalysis = new Analysis({
                userId,
                phoneNumber: cleanPhoneNumber,
                result: analysisData
              });
              
              await newAnalysis.save();
              console.log(`Created new analysis for phone ${cleanPhoneNumber}`);
            }
            
            const newAnalysisResponse = await geminiService.generateResponse(question, analysisData, userId);
            
            return res.status(200).json({
              success: true,
              analysis: {
                answer: newAnalysisResponse,
                phoneNumber: cleanPhoneNumber,
                question,
                isNewAnalysis: true,
                type: 'question'
              }
            });
          }
          
          console.log(`Found existing analysis for phone ${cleanPhoneNumber}, generating response`);
          
          // Kiểm tra xem có thuộc tính result không
          if (!existingAnalysisRecord.result) {
            console.log("Analysis record is missing result property, creating new analysis");
            
            // Thực hiện phân tích mới
            const newAnalysisData = await analysisService.analyzePhoneNumber(cleanPhoneNumber);
            
            // Cập nhật bản ghi hiện có nếu có userId
            if (userId) {
              existingAnalysisRecord.result = newAnalysisData;
              await existingAnalysisRecord.save();
              console.log(`Updated analysis for phone ${cleanPhoneNumber}`);
            }
            
            const newResponse = await geminiService.generateResponse(question, newAnalysisData, userId);
            
            return res.status(200).json({
              success: true,
              analysis: {
                answer: newResponse,
                phoneNumber: cleanPhoneNumber,
                question,
                isUpdatedAnalysis: true,
                type: 'question'
              }
            });
          }
          
          // Sử dụng GeminiService để tạo phản hồi
          const questionResponse = await geminiService.generateResponse(question, existingAnalysisRecord.result, userId);
          
          // Trả về kết quả
          return res.status(200).json({
            success: true,
            analysis: {
              answer: questionResponse,
              phoneNumber: cleanPhoneNumber,
              question,
              type: 'question'
            }
          });
        } catch (questionError) {
          console.error('Error processing question about phone number:', questionError);
          
          // Thử xử lý câu hỏi như một câu hỏi chung
          try {
            console.log("Falling back to general question handling");
            const fallbackResponse = await geminiService.generateGeneralInfo(question, userId);
            
            return res.status(200).json({
              success: true,
              analysis: {
                answer: fallbackResponse,
                question,
                type: 'general',
                note: 'Chuyển sang câu hỏi chung do lỗi khi xử lý câu hỏi về số điện thoại'
              }
            });
          } catch (fallbackError) {
            console.error('Error in fallback processing:', fallbackError);
            return res.status(500).json({
              success: false,
              message: 'Lỗi khi xử lý câu hỏi và không thể sử dụng phương án dự phòng',
              error: questionError.message
            });
          }
        }
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