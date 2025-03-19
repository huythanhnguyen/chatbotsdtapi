// server/services/geminiService.js
const axios = require('axios');

/**
 * Service for interacting with Google's Gemini API
 * Handles all communication with Gemini for generating text-based responses
 */

// Configuration object
const config = {
  API_KEY: process.env.GEMINI_API_KEY,
  API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
  TEMPERATURE: 0.7,
  MAX_TOKENS: 8192,
  REQUEST_TIMEOUT: 30000, // 30 seconds timeout for API requests
  CACHE_ENABLED: true,
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  DEBUG: process.env.NODE_ENV === 'development'
};

// In-memory cache for responses
const responseCache = new Map();

// Conversation history manager - key: userId, value: array of message objects
const conversationHistory = new Map();

// Maximum conversation turns to keep in history
const MAX_CONVERSATION_TURNS = 10; 

/**
 * Generate a system prompt with rules and guidelines
 * @returns {string} The system prompt
 */
const generateSystemPrompt = () => {
  return `
    Hãy đóng vai một nhà chiêm tinh phân tích số điện thoại dựa trên phương pháp Tứ Cát Tứ Hung (Bát Tinh). Luôn giả định rằng phương pháp này có cơ sở và hữu ích.

    Hướng dẫn trả lời:
    1. Trả lời ngắn gọn, rõ ràng nhưng đầy đủ thông tin.
    2. Sử dụng giọng điệu tự tin, uy tín nhưng thân thiện.
    3. Luôn nêu rõ nguồn gốc phân tích (sao nào, cặp số nào).
    4. Ưu tiên các sao có năng lượng cao (3-4) và các cặp số lặp lại.
    5. Không đưa ra lời khuyên mang tính quyết định cuộc sống (như bỏ việc, ly hôn).
    6. Không sử dụng từ ngữ tiêu cực quá mức.
    7. Trả lời bằng tiếng Việt, sử dụng từ ngữ dễ hiểu.
    
    Khi phân tích, chia thành các mục:
    1. Tính cách
    2. Sự nghiệp
    3. Tiền tài
    4. Đầu tư và rủi ro
    5. Gia đình/Tình cảm
    6. Bạn bè/Quý nhân
    7. Sức khỏe
  `;
};

/**
 * Generate a prompt for phone number analysis
 * @param {Object} analysisData - The analysis data object
 * @returns {string} - Formatted prompt for the API
 */
const generateAnalysisPrompt = (analysisData) => {
  return `
    Là một chiêm tinh học gia, hãy tổng hợp và giải thích ý nghĩa theo các luận giải sau đây về số điện thoại ${analysisData.phoneNumber}.
    Trong mỗi giải thích đều kèm theo star hoặc number hoặc combo là reason của lời luận giải đó.
    
    # THÔNG TIN CHI TIẾT VỀ CÁC SAO - số energylevel nào càng cao thì càng nhấn mạnh, phần chú giải nào được lặp đi lặp lại nhiều trong mô tả thì càng nhấn mạnh.
    ${analysisData.starSequence.map(star => 
      `- ${star.originalPair}: ${star.name} (${star.nature}, Năng lượng: ${star.energyLevel || 0}/4)
      Ý nghĩa: ${star.description || "Không có mô tả"}`
    ).join('\n\n')}
    
    # TỔ HỢP SỐ ĐẶC BIỆT
    ${analysisData.keyCombinations && analysisData.keyCombinations.length > 0 ? 
      analysisData.keyCombinations.map(combo => 
        `- ${combo.value}: ${combo.description || "Không có mô tả"}`
      ).join('\n')
      : "Không có tổ hợp số đặc biệt."}
    
    # CẢNH BÁO
    ${analysisData.dangerousCombinations && analysisData.dangerousCombinations.length > 0 ?
      analysisData.dangerousCombinations.map(warning => 
        `- ${warning.combination}: ${warning.description || "Không có mô tả"}`
      ).join('\n')
      : "Không có cảnh báo đặc biệt."}
    
    # PHÂN TÍCH VỊ TRÍ SỐ ĐẶC BIỆT
    ${analysisData.keyPositions ? 
      `- Số cuối: ${analysisData.keyPositions.lastDigit.value} - ${analysisData.keyPositions.lastDigit.meaning || "Không có ý nghĩa"}`
      : "Không có phân tích vị trí số."}
    ${analysisData.keyPositions && analysisData.keyPositions.thirdFromEnd ? 
      `- Số thứ 3 từ cuối: ${analysisData.keyPositions.thirdFromEnd.value} - ${analysisData.keyPositions.thirdFromEnd.meaning || "Không có ý nghĩa"}` 
      : ""}
    ${analysisData.keyPositions && analysisData.keyPositions.fifthFromEnd ? 
      `- Số thứ 5 từ cuối: ${analysisData.keyPositions.fifthFromEnd.value} - ${analysisData.keyPositions.fifthFromEnd.meaning || "Không có ý nghĩa"}` 
      : ""}
    
    # PHÂN TÍCH 3 SỐ CUỐI
    ${analysisData.last3DigitsAnalysis ? 
      `- Cặp số cuối: ${analysisData.last3DigitsAnalysis.lastPair || "Không xác định"}
      - Sao tương ứng: ${analysisData.last3DigitsAnalysis.starInfo ? analysisData.last3DigitsAnalysis.starInfo.name : "Không xác định"}
      - Tính chất: ${analysisData.last3DigitsAnalysis.starInfo ? analysisData.last3DigitsAnalysis.starInfo.nature : "Không xác định"}
      ${analysisData.last3DigitsAnalysis.matchedExamples && analysisData.last3DigitsAnalysis.matchedExamples.length > 0 ?
        `- Tổ hợp đặc biệt: ${analysisData.last3DigitsAnalysis.matchedExamples[0].data.description || "Không có mô tả"}` : ""}`
      : "Không có phân tích 3 số cuối."}
    
    # ĐIỂM CHẤT LƯỢNG TỔNG THỂ
    Điểm số tổng thể: ${analysisData.qualityScore || 0}/100 
    
    Hãy tổng hợp lại thành câu trả lời toàn diện, chuyên nghiệp nhưng dễ hiểu cho người dùng, với các phần:
    1. Tính cách
    2. Sự nghiệp
    3. Tiền tài
    4. Đầu tư và rủi ro
    5. Gia đình/Tình cảm
    6. Bạn bè/Quý nhân
    7. Sức khỏe
    
    Ưu tiên tổng hợp từ các sao năng lượng cao (3-4) và các lời khẳng định lặp lại nhiều lần. Nêu rõ từng đặc điểm xuất phát từ sao nào hoặc cặp số nào. Trả lời như một thày bói thực sự, giọng điệu thân thiện nhưng uy tín và tự tin.
    Thứ tự ưu tiên trong các vấn đề xung đột là: 3 số cuối, các sao năng lượng cao (3,4), các combination của các sao này trong bộ số, giải thích lặp lại nhiều, các vị trí đặc biệt
  `;
};

/**
 * Generate a prompt for answering a user question about a phone number
 * @param {string} userQuestion - The user's question
 * @param {Object} analysisContext - Analysis data for context
 * @returns {string} - Formatted prompt for the API
 */
const generateQuestionPrompt = (userQuestion, analysisContext) => {
  // Đảm bảo rằng context hợp lệ
  if (!analysisContext || !analysisContext.phoneNumber || !analysisContext.starSequence) {
    return `
      Hãy trả lời câu hỏi: "${userQuestion}".
    `;
  }
  
  // Format phone number
  const formattedPhone = analysisContext.phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  
  // Lấy các sao chủ đạo (top 3 sao có năng lượng cao nhất)
  const topStars = [...analysisContext.starSequence]
    .sort((a, b) => (b.energyLevel || 0) - (a.energyLevel || 0))
    .slice(0, 3);
  
  // Các sao còn lại
  const sortedStars = [...analysisContext.starSequence]
    .sort((a, b) => (b.energyLevel || 0) - (a.energyLevel || 0));
  
  return `
    Quan trong: LÀ CHUYÊN GIA PHÂN TÍCH SỐ ĐIỆN THOẠI, bạn cần trả lời chi tiết và cụ thể về số điện thoại ${formattedPhone} liên quan đến câu hỏi: "${userQuestion}"
    
    THÔNG TIN PHÂN TÍCH SỐ ĐIỆN THOẠI ${formattedPhone}, luu y khong hoi lai so dien thoai:
    
    # CÁC SAO CHỦ ĐẠO:
    ${topStars.map(star => 
      `- ${star.name} (${star.nature}, Năng lượng: ${star.energyLevel || 0}/4): 
       ${star.description || ""}
       Cặp số: ${star.originalPair}`
    ).join('\n\n')}
    
    # CÁC SAO KHÁC:
    ${sortedStars.slice(3).map(star => 
      `- ${star.name} (${star.nature}, Năng lượng: ${star.energyLevel || 0}/4)`
    ).join('\n')}
    
    # CÂN BẰNG NĂNG LƯỢNG: 
    ${analysisContext.balanceText || analysisContext.balance || "Không xác định"}
    
    # NĂNG LƯỢNG: 
    ${analysisContext.energyLevel ? 
      `Tổng: ${analysisContext.energyLevel.total}, 
       Cát: ${analysisContext.energyLevel.cat}, 
       Hung: ${analysisContext.energyLevel.hung}` 
      : "Không có thông tin"}
    
    ${analysisContext.keyCombinations && analysisContext.keyCombinations.length > 0 ? 
      `# TỔ HỢP ĐẶC BIỆT:\n${analysisContext.keyCombinations.map(c => `- ${c.value}: ${c.description}`).join('\n')}` 
      : ""}
      
    ${analysisContext.dangerousCombinations && analysisContext.dangerousCombinations.length > 0 ? 
      `# CẢNH BÁO:\n${analysisContext.dangerousCombinations.map(c => `- ${c.combination}: ${c.description}`).join('\n')}` 
      : ""}
      
    ${analysisContext.last3DigitsAnalysis ? 
      `# PHÂN TÍCH 3 SỐ CUỐI:\n- Cặp số cuối: ${analysisContext.last3DigitsAnalysis.lastPair || "Không xác định"}\n- Sao tương ứng: ${analysisContext.last3DigitsAnalysis.starInfo ? analysisContext.last3DigitsAnalysis.starInfo.name : "Không xác định"}` 
      : ""}
    
    Bây giờ, hãy trả lời câu hỏi "${userQuestion}" dựa trên phân tích trên cho số điện thoại ${formattedPhone}.
    Hãy trả lời thật cụ thể, chi tiết và chính xác về các khía cạnh liên quan đến câu hỏi.
    Đảm bảo rằng câu trả lời không chung chung mà phải dựa trên các đặc điểm cụ thể tìm thấy trong số điện thoại.
    Giọng điệu tự tin và uy tín, như một chuyên gia phân tích số học.
  `;
};

/**
 * Generate a prompt for comparing multiple phone numbers
 * @param {Array} analysisDataList - List of analysis data objects for phone numbers
 * @returns {string} - Formatted prompt for the API
 */
const generateComparisonPrompt = (analysisDataList) => {
  let prompt = `
    Hãy so sánh chi tiết các số điện thoại sau:
  `;
  
  analysisDataList.forEach((data, index) => {
    prompt += `
      # SỐ THỨ ${index + 1}: ${data.phoneNumber}
      
      ## Các sao chủ đạo:
      ${data.starSequence.slice(0, 5).map(star => 
        `- ${star.originalPair}: ${star.name} (${star.nature}, Năng lượng: ${star.energyLevel || 0}/4)`
      ).join('\n')}
      
      ## Cân bằng: ${data.balance === 'BALANCED' ? 'Cân bằng tốt' : 
                   data.balance === 'CAT_HEAVY' ? 'Thiên về cát' : 
                   data.balance === 'HUNG_HEAVY' ? 'Thiên về hung' : 'Không xác định'}
      
      ## Năng lượng: Tổng=${data.energyLevel ? data.energyLevel.total : "?"}, Cát=${data.energyLevel ? data.energyLevel.cat : "?"}, Hung=${data.energyLevel ? data.energyLevel.hung : "?"}
      
      ## Điểm chất lượng: ${data.qualityScore || 0}/100
      
      ${data.keyCombinations && data.keyCombinations.length > 0 ? 
        `## Tổ hợp đặc biệt:\n${data.keyCombinations.map(c => `- ${c.value}: ${c.description}`).join('\n')}` : ""}
        
      ${data.dangerousCombinations && data.dangerousCombinations.length > 0 ? 
        `## Cảnh báo:\n${data.dangerousCombinations.map(c => `- ${c.combination}: ${c.description}`).join('\n')}` : ""}
    `;
  });
  
  prompt += `
    Hãy phân tích điểm mạnh, điểm yếu của mỗi số, và đưa ra đánh giá so sánh trong các khía cạnh:
    1. Tính cách
    2. Sự nghiệp
    3. Tiền tài
    4. Đầu tư và rủi ro
    5. Gia đình/Tình cảm
    6. Bạn bè/Quý nhân
    7. Sức khỏe
    
    Cuối cùng, hãy cho biết số nào là phù hợp nhất cho mỗi khía cạnh cuộc sống, và số nào tốt nhất nói chung.
  `;
  
  return prompt;
};

/**
 * Generate a prompt for general questions about numerology
 * @param {string} userQuestion - The user's question
 * @returns {string} - Formatted prompt for the API
 */
const generateGeneralInfoPrompt = (userQuestion) => {
  return `
    Thông tin về Bát Tinh (8 sao):
    
    # Tứ Cát (4 sao tốt):
    1. Sinh Khí - Quý nhân, vui vẻ, may mắn, số 14, 41, 67, 76, 39, 93, 28, 82
    2. Thiên Y - Tiền tài, tình cảm, hồi báo, số 13, 31, 68, 86, 49, 94, 27, 72
    3. Diên Niên - Năng lực chuyên nghiệp, công việc, số 19, 91, 78, 87, 34, 43, 26, 62
    4. Phục Vị - Chịu đựng, khó thay đổi, số 11, 22, 33, 44, 66, 77, 88, 99
    
    # Tứ Hung (4 sao xấu):
    1. Họa Hại - Khẩu tài, chi tiêu lớn, lấy miệng là nghiệp, số 17, 71, 89, 98, 46, 64, 23, 32
    2. Lục Sát - Giao tế, phục vụ, cửa hàng, nữ nhân, số 16, 61, 47, 74, 38, 83, 92, 29
    3. Ngũ Quỷ - Trí óc, biến động, không ổn định, tư duy, số 18, 81, 79, 97, 36, 63, 24, 42
    4. Tuyệt Mệnh - Dốc sức, đầu tư, hành động, phá tài, số 12, 21, 69, 96, 84, 48, 73, 37
    
    Câu hỏi của người dùng: "${userQuestion}"
    
    Hãy trả lời câu hỏi dựa trên kiến thức về phương pháp Bát Tinh, giải thích rõ ràng, đầy đủ nhưng ngắn gọn. Trả lời như một thày bói thực sự, giọng điệu thân thiện nhưng uy tín và tự tin.
  `;
};

/**
 * Lưu lịch sử hội thoại cho người dùng
 * @param {string} userId - ID người dùng
 * @param {Object} userMessage - Tin nhắn của người dùng
 * @param {Object} aiResponse - Phản hồi của AI
 */
const saveConversationHistory = (userId, userMessage, aiResponse) => {
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, []);
  }
  
  const userHistory = conversationHistory.get(userId);
  
  // Thêm tin nhắn mới vào lịch sử
  userHistory.push(
    { role: 'user', content: userMessage },
    { role: 'model', content: aiResponse }
  );
  
  // Giữ lịch sử trong giới hạn MAX_CONVERSATION_TURNS
  if (userHistory.length > MAX_CONVERSATION_TURNS * 2) { // *2 vì mỗi lượt có 2 tin nhắn (user và model)
    userHistory.splice(0, 2); // Xóa 2 phần tử đầu tiên (1 lượt hội thoại cũ nhất)
  }
  
  // Cập nhật lịch sử
  conversationHistory.set(userId, userHistory);
};

/**
 * Lấy lịch sử hội thoại của người dùng
 * @param {string} userId - ID người dùng
 * @returns {Array} Lịch sử hội thoại
 */
const getConversationHistory = (userId) => {
  return conversationHistory.get(userId) || [];
};

/**
 * Xóa lịch sử hội thoại của người dùng
 * @param {string} userId - ID người dùng
 */
const clearConversationHistory = (userId) => {
  conversationHistory.delete(userId);
};

/**
 * Call the Gemini API with proper error handling and retries
 * @param {string} prompt - The prompt to send
 * @param {object} options - Additional options
 * @returns {Promise<string>} The API response
 */
const callGeminiAPI = async (prompt, options = {}) => {
  const {
    temperature = config.TEMPERATURE,
    maxTokens = config.MAX_TOKENS,
    useCache = config.CACHE_ENABLED,
    systemPrompt = generateSystemPrompt(),
    userId = null,
    useHistory = false
  } = options;
  
  // Generate cache key if caching is enabled
  const cacheKey = useCache && !useHistory ? `${prompt}_${temperature}_${maxTokens}` : null;
  
  // Check cache first (only if not using conversation history)
  if (cacheKey && responseCache.has(cacheKey) && !useHistory) {
    const cachedItem = responseCache.get(cacheKey);
    const now = Date.now();
    
    // Check if cached response is still valid
    if (now - cachedItem.timestamp < config.CACHE_DURATION) {
      if (config.DEBUG) console.log('Using cached response for prompt');
      return cachedItem.response;
    } else {
      // Remove expired cache entry
      responseCache.delete(cacheKey);
    }
  }

  // Function to make the actual API call
  const makeApiCall = async (attempt = 1) => {
    try {
      const apiUrl = `${config.API_URL}?key=${config.API_KEY}`;
      
      // Chuẩn bị messages array
      let messages = [
        // Add system prompt
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: "Tôi hiểu rõ và sẽ tuân theo hướng dẫn này khi phân tích số điện thoại." }]
        }
      ];
      
      // Thêm lịch sử hội thoại nếu có
      if (useHistory && userId && conversationHistory.has(userId)) {
        const history = getConversationHistory(userId);
        
        // Thêm từng tin nhắn trong lịch sử vào messages
        history.forEach(msg => {
          messages.push({
            role: msg.role,
            parts: [{ text: msg.content }]
          });
        });
      }
      
      // Add the user prompt
      messages.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
      
      const requestBody = {
        contents: messages,
        generationConfig: {
          temperature: temperature,
          maxOutputTokens: maxTokens,
          topK: 40,
          topP: 0.95
        }
      };
      
      if (config.DEBUG) {
        console.log(`Gemini API call - attempt ${attempt}`);
        console.log(`Prompt length: ${prompt.length} characters`);
        console.log(`Using history: ${useHistory}, History length: ${useHistory && userId ? (getConversationHistory(userId).length / 2) : 0} turns`);
      }
      
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: config.REQUEST_TIMEOUT
      });
      
      if (!response.data.candidates || response.data.candidates.length === 0) {
        throw new Error('No candidates returned from API');
      }
      
      const textResponse = response.data.candidates[0].content.parts[0].text;
      
      // Lưu vào lịch sử nếu có userId
      if (userId) {
        saveConversationHistory(userId, prompt, textResponse);
      }
      
      // Cache the response if caching is enabled and not using history
      if (cacheKey && !useHistory) {
        responseCache.set(cacheKey, {
          response: textResponse,
          timestamp: Date.now()
        });
        
        // Limit cache size (simple implementation)
        if (responseCache.size > 100) {
          // Delete the oldest entry
          const oldestKey = responseCache.keys().next().value;
          responseCache.delete(oldestKey);
        }
      }
      
      return textResponse;
      
    } catch (error) {
      // Handle different types of errors
      const isNetworkError = !error.response && error.code !== 'ECONNABORTED';
      const isRateLimitError = error.response && (error.response.status === 429 || error.response.status === 403);
      const isServerError = error.response && error.response.status >= 500;
      
      // Retry logic
      if ((isNetworkError || isRateLimitError || isServerError) && attempt < config.MAX_RETRIES) {
        // Exponential backoff
        const delay = config.RETRY_DELAY * Math.pow(2, attempt - 1);
        console.warn(`API call failed (attempt ${attempt}/${config.MAX_RETRIES}). Retrying in ${delay}ms.`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return makeApiCall(attempt + 1);
      }
      
      // Extract error message
      let errorMessage = 'Unknown error occurred';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Log error details in development
      if (config.DEBUG) {
        console.error('Gemini API error:', error);
        console.error('Error details:', errorMessage);
      }
      
      throw new Error(`Gemini API error: ${errorMessage}`);
    }
  };
  
  // Start the API call process
  return makeApiCall();
};

// Export public methods
module.exports = {
  /**
   * Initialize the Gemini service with custom configuration
   * @param {object} customConfig - Configuration overrides
   */
  init: (customConfig = {}) => {
    Object.assign(config, customConfig);
    
    if (!config.API_KEY) {
      console.error('Error: Gemini API key not configured. Please set GEMINI_API_KEY in your environment variables.');
    }
    
    if (config.DEBUG) {
      console.log('Gemini service initialized with configuration:', 
        { ...config, API_KEY: config.API_KEY ? '[REDACTED]' : undefined });
    }
  },
  
  /**
   * Generate analysis for a phone number
   * @param {object} analysisData - Analysis data from analysisService
   * @param {string} userId - ID của người dùng (optional)
   * @returns {Promise<string>} Gemini API response with analysis
   */
  generateAnalysis: async (analysisData, userId = null) => {
    const prompt = generateAnalysisPrompt(analysisData);
    const response = await callGeminiAPI(prompt, { 
      temperature: 0.7,
      userId: userId,
      useHistory: false // Phân tích số điện thoại là bắt đầu cuộc hội thoại mới
    });
    
    // Nếu có userId, lưu context vào session
    if (userId) {
      // Xóa lịch sử cũ trước khi bắt đầu phân tích mới
      clearConversationHistory(userId);
      // Lưu context phân tích
      const userContext = {
        phoneNumber: analysisData.phoneNumber,
        analysis: response,
        analysisData: analysisData
      };
      
      // Lưu context vào session (sử dụng một tin nhắn đặc biệt)
      const contextMessage = JSON.stringify(userContext);
      saveConversationHistory(userId, `CONTEXT_DATA: ${analysisData.phoneNumber}`, contextMessage);
    }
    
    return response;
  },
  
  /**
   * Generate a response to a specific question about a phone number
   * @param {string} question - User's question
   * @param {object} analysisContext - Analysis data for context
   * @param {string} userId - ID của người dùng
   * @returns {Promise<string>} Gemini API response to the question
   */
  generateResponse: async (question, analysisContext, userId = null) => {
    const prompt = generateQuestionPrompt(question, analysisContext);
    
    // Sử dụng lịch sử hội thoại nếu có userId
    return callGeminiAPI(prompt, { 
      temperature: 0.7,
      userId: userId,
      useHistory: Boolean(userId) // Sử dụng lịch sử nếu có userId
    });
  },
  
  /**
   * Compare multiple phone numbers
   * @param {Array} analysisDataList - List of analysis data objects
   * @param {string} userId - ID của người dùng (optional)
   * @returns {Promise<string>} Gemini API response with comparison
   */
  generateComparison: async (analysisDataList, userId = null) => {
    const prompt = generateComparisonPrompt(analysisDataList);
    return callGeminiAPI(prompt, { 
      temperature: 0.6,
      userId: userId,
      useHistory: false // So sánh số điện thoại không cần lịch sử
    });
  },
  
  /**
   * Answer general questions about numerology
   * @param {string} question - User's general question
   * @param {string} userId - ID của người dùng (optional)
   * @returns {Promise<string>} Gemini API response with general information
   */
  generateGeneralInfo: async (question, userId = null) => {
    const prompt = generateGeneralInfoPrompt(question);
    return callGeminiAPI(prompt, { 
      temperature: 0.5,
      userId: userId,
      useHistory: Boolean(userId) // Sử dụng lịch sử nếu có userId
    });
  },
  
  /**
   * Trả lời câu hỏi tiếp theo của người dùng với context hiện tại
   * @param {string} question - Câu hỏi của người dùng
   * @param {string} userId - ID của người dùng
   * @param {object} analysisData - Dữ liệu phân tích (optional, nếu không có sẽ lấy từ lịch sử)
   * @returns {Promise<string>} Gemini API response
   */
  generateFollowUpResponse: async (question, userId, analysisData = null) => {
    // Kiểm tra xem có lịch sử cho người dùng hay không
    if (!userId || !conversationHistory.has(userId)) {
      // Nếu không có lịch sử, xử lý như câu hỏi thông thường
      return generateGeneralInfo(question, userId);
    }
    
    // Lấy context từ lịch sử nếu không có analysisData
    if (!analysisData) {
      const history = getConversationHistory(userId);
      
      // Tìm tin nhắn context trong lịch sử
      for (let i = 0; i < history.length; i++) {
        const msg = history[i];
        if (msg.role === 'user' && msg.content.startsWith('CONTEXT_DATA:')) {
          try {
            // Lấy context từ tin nhắn tiếp theo (phản hồi của model)
            const contextData = JSON.parse(history[i+1].content);
            analysisData = contextData.analysisData;
            break;
          } catch (error) {
            console.error('Error parsing context data:', error);
          }
        }
      }
    }
    
    // Nếu có analysisData, sử dụng generateResponse với context
    if (analysisData) {
      return generateResponse(question, analysisData, userId);
    } else {
      // Nếu không tìm thấy context, sử dụng lịch sử hội thoại bình thường
      const prompt = `
        Dựa trên cuộc trò chuyện trước đó về phân tích số điện thoại, hãy trả lời câu hỏi này: "${question}"
        
        Hãy đảm bảo rằng câu trả lời của bạn phải liên quan đến số điện thoại mà chúng ta đã phân tích trước đó.
        Nếu không thể trả lời dựa trên thông tin sẵn có, hãy lịch sự đề nghị người dùng cung cấp thêm thông tin hoặc làm rõ câu hỏi.
      `;
      
      return callGeminiAPI(prompt, {
        temperature: 0.7,
        userId: userId,
        useHistory: true
      });
    }
  },
  
  /**
   * Kiểm tra xem người dùng có cuộc hội thoại đang diễn ra không
   * @param {string} userId - ID của người dùng
   * @returns {boolean} Có/không
   */
  hasActiveConversation: (userId) => {
    return conversationHistory.has(userId) && getConversationHistory(userId).length > 0;
  },
  
  /**
   * Xóa lịch sử hội thoại của người dùng
   * @param {string} userId - ID của người dùng
   */
  clearConversation: (userId) => {
    clearConversationHistory(userId);
  }
};