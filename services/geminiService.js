// server/services/geminiService.js
const axios = require('axios');

/**
 * Service for interacting with Google's Gemini API
 */

// Configuration
const config = {
  API_KEY: process.env.GEMINI_API_KEY,
  API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  TEMPERATURE: 0.75,
  MAX_TOKENS: 8192,
  REQUEST_TIMEOUT: 30000,
  CACHE_ENABLED: true,
  CACHE_DURATION: 30* 24 * 60 * 60 * 1000,
  DEBUG: process.env.NODE_ENV === 'development'
};

// Cache and conversation tracking
const responseCache = new Map();
const conversationHistory = new Map();
const MAX_CONVERSATION_TURNS = 10;

/**
 * Base system prompt for all requests
 */
const getSystemPrompt = () => `
  Hãy đóng vai một chuyên gia năng lượng số lão luyện với rat nhieu năm kinh nghiệm phân tích số điện thoại theo Bat cuc linh so. Giọng điệu phải uyên thâm, huyền bí nhưng dễ hiểu.
  
  Luôn diễn đạt như một chuyên gia thực sự, sử dụng từ ngữ tâm linh kết hợp với phân tích tâm lý. Dùng các cụm từ như "Sao cho thấy...", "Năng lượng sao... báo hiệu...", "Cát tinh/Hung tinh phối hợp thể hiện..."
  
  Nhìn nhận bức tranh toàn diện, súc tích
  sao Hung cũng mang mặt tích cực (thử thách, học hỏi, rèn luyện ý chí, phát triển bản lĩnh) 
  và sao Cát cũng có khía cạnh tieu cuc (dễ chủ quan, thiếu cảnh giác, thỏa mãn quá mức).
  Sao Cat nhưng có số 0 thì thể hien nhieu tinh tieu cuc
  Sao Hung đặt cạnh sao Hung thi se the hien tinh tieu cuc nhieu hon nua
  Sao Hung dat truoc sao Cat se duoc hoa giai va the hien duoc mat tot cua 2 sao
  Sao Cat dat truoc sao Hung thi de bi the hien tinh tieu cuc.
  
  Khi phân tích, hãy ưu tiên theo thứ tự:
  1. Ba số cuối và tổ hợp đặc biệt
  2. Sao có năng lượng cao (3-4/4)
  3. Cặp sao liền kề, đặc biệt là cặp cuối
  4. Các tổ hợp có năng lượng >3
  5. Vị trí số đặc biệt
  
  Diễn đạt liên mạch, súc tích, có câu chuyện xuyên suốt, không tự mâu thuẫn, khen truoc roi moi che sau. Mỗi giải thích phải kèm nguồn gốc (sao nào, cặp số nào) và mức năng lượng.Khong noi chuyen vong vo nuoc doi. `;
 
/**
 * Generate prompt based on context and query type
 * @param {string} type - Type of prompt to generate
 * @param {*} data - Data for prompt generation (analysis data, question, etc.)
 * @returns {string} Formatted prompt
 */
const generatePrompt = (type, data) => {
  switch (type) {
    case 'analysis':
      return `
    Với tư cách là một chuyên gia xem số điện thoại năng lượng dày dạn kinh nghiệm, hãy phân tích số điện thoại ${data.phoneNumber} như một bản đồ năng lượng.
    
    Tổng hợp thông tin dưới đây thành một luận giải súc tích, thâm sâu, mạch lạc. Đảm bảo luận giải nhất quán, không mâu thuẫn và phản ánh đúng bản chất của số điện thoại này.
    
    Mỗi ý luận giải phải viện dẫn nguồn gốc sao/cặp số và mức năng lượng của chúng. Sử dụng ngôn từ bat cuc linh so kết hợp với tâm lý học để diễn đạt trôi chảy như một vị thầy thực sự đang tư vấn.

    Hay noi so dien thoai nay dang the hien 


    
    Ưu tiên phân tích:
    - Ba số cuối và các tổ hợp đặc biệt (quan trọng nhất)
    - Sao có năng lượng cao (3-4/4)
    - Cặp sao liền kề, đặc biệt là cặp cuối cùng
    - Tổ hợp có năng lượng tổng hợp cao
    - Các vị trí số đặc biệt
    
    Phân tích theo các lĩnh vực sau đây bằng giọng điệu uyên thâm nhưng gần gũi:
    
    **Tổng quan**
    **1. Tính cách và Tiềm năng**: Thể hiện bản chất, tài năng tiềm ẩn, và điểm mạnh sau do noi den cac diem yếu
    **2. Sự nghiệp và Đường đời**: Con đường sự nghiệp, vai trò phù hợp, cách phát triển
    **3. Tài lộc và Vận may**: Mối quan hệ với tiền bạc, cơ hội tài chính, tài khí
    **4. Đầu tư và Quản lý rủi ro**: Cach dau tu, cơ hội đầu tư, nguy co va cách phòng ngừa
    **5. Gia đình và Tình duyên**: Mối quan hệ tình cảm, gia đình, kết nối với người thân
    **6. Nhân duyên và Quý nhân**: Mối quan hệ xã hội, người trợ giúp, cách kết nối
    **7. Sức khỏe và Năng lượng sống**: Điểm cần chú ý về sức khỏe
    **8. Điểm lưu ý đặc biệt**: những vấn đề khác và  lời khuyên bổ sung
    Khi mo ta trong cac doan nay, dung ** de bold va xuong dong section, tranh dung * hoac ** de bold chu. chi bold cac section nhu ben tren. 
        

        # THÔNG TIN CHI TIẾT VỀ CÁC SAO
        ${data.starSequence.map(star => 
          `- ${star.originalPair}: ${star.name} (${star.nature}, Năng lượng: ${star.energyLevel || 0}/4)
          Ý nghĩa: ${star.detailedDescription || "Không có mô tả"}`
        ).join('\n\n')}
        
        # TỔ HỢP CÁC SAO LIỀN KỀ
        ${data.starCombinations && data.starCombinations.length > 0 ?
          data.starCombinations.map(combo => 
            `- ${combo.firstStar.name} (${combo.firstStar.originalPair}) + ${combo.secondStar.name} (${combo.secondStar.originalPair}) [Năng lượng: ${combo.totalEnergy || 0}/8]
            Tính chất: ${combo.isPositive ? "Tích cực" : (combo.isNegative ? "Tiêu cực" : "Trung tính")}
            ${combo.isLastPair ? "**CẶP SAO CUỐI CÙNG - RẤT QUAN TRỌNG**" : ""}
            Ý nghĩa: ${combo.description || "Không có mô tả"}
            ${combo.detailedDescription && combo.detailedDescription.length > 0 ? 
              `Chi tiết: ${Array.isArray(combo.detailedDescription) ? 
                combo.detailedDescription.join(' ') : 
                combo.detailedDescription}` : ""}`
          ).join('\n\n')
          : "Không có tổ hợp sao liền kề đáng chú ý."}
        
        # TỔ HỢP SỐ ĐẶC BIỆT
        ${data.keyCombinations && data.keyCombinations.length > 0 ? 
          data.keyCombinations.map(combo => 
            `- ${combo.value}: ${combo.description || "Không có mô tả"}`
          ).join('\n')
          : "Không có tổ hợp số đặc biệt."}
        
        # CẢNH BÁO
        ${data.dangerousCombinations && data.dangerousCombinations.length > 0 ?
          data.dangerousCombinations.map(warning => 
            `- ${warning.combination}: ${warning.description || "Không có mô tả"}`
          ).join('\n')
          : "Không có cảnh báo đặc biệt."}

        # PHÂN TÍCH VỊ TRÍ SỐ ĐẶC BIỆT
        ${data.keyPositions ? 
          `- Số cuối: ${data.keyPositions.lastDigit.value} - ${data.keyPositions.lastDigit.meaning || "Không có ý nghĩa"}`
          : "Không có phân tích vị trí số."}
        ${data.keyPositions && data.keyPositions.thirdFromEnd ? 
          `- Số thứ 3 từ cuối: ${data.keyPositions.thirdFromEnd.value} - ${data.keyPositions.thirdFromEnd.meaning || "Không có ý nghĩa"}` 
          : ""}
        ${data.keyPositions && data.keyPositions.fifthFromEnd ? 
          `- Số thứ 5 từ cuối: ${data.keyPositions.fifthFromEnd.value} - ${data.keyPositions.fifthFromEnd.meaning || "Không có ý nghĩa"}` 
          : ""}
        
        # PHÂN TÍCH 3 SỐ CUỐI
        ${data.last3DigitsAnalysis ? 
          `- Cặp số cuối: ${data.last3DigitsAnalysis.lastThreeDigits || "Không xác định"}
          - Sao tương ứng: ${data.last3DigitsAnalysis.firstPair?.starInfo?.name || "Không xác định"}
          - Tính chất: ${data.last3DigitsAnalysis.firstPair?.starInfo?.nature || "Không xác định"}`
          : "Không có phân tích 3 số cuối."}
         

              `;
      
    case 'question':
      const formattedPhone = data.analysisContext?.phoneNumber?.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3') || '';
      
      return `
    Với tư cách là một chuyên gia xem số điện thoại năng lượng dày dạn kinh nghiệm, hãy trả lời câu hỏi về số ${formattedPhone}: "${data.question}"
    
    Khi trả lời, hãy sử dụng giọng điệu của một chuyên gia xem số điện thoại năng lượng dày dạn kinh nghiệm - uyên thâm, huyền bí nhưng gần gũi. Sử dụng các cụm từ như, "Tôi thấy sao... báo hiệu...", "Dòng năng lượng từ các con số cho thấy..."
    
    Đảm bảo trả lời:
    - Rõ ràng và trực tiếp với câu hỏi
    - Dựa chặt chẽ vào thông tin phân tích sẵn có
    - Sử dụng thuật ngữ chiêm tinh học kết hợp tâm lý học
    - Đề cập cụ thể đến các sao/cặp số liên quan và năng lượng của chúng

       
        THÔNG TIN PHÂN TÍCH SỐ ĐIỆN THOẠI ${formattedPhone}:
        
 # THÔNG TIN CHI TIẾT VỀ CÁC SAO
        ${data.starSequence.map(star => 
          `- ${star.originalPair}: ${star.name} (${star.nature}, Năng lượng: ${star.energyLevel || 0}/4)
          Ý nghĩa: ${star.detailedDescription || "Không có mô tả"}`
        ).join('\n\n')}
        
        # TỔ HỢP SỐ ĐẶC BIỆT
        ${data.keyCombinations && data.keyCombinations.length > 0 ? 
          data.keyCombinations.map(combo => 
            `- ${combo.value}: ${combo.detailedDescription || "Không có mô tả"}`
          ).join('\n')
          : "Không có tổ hợp số đặc biệt."}
        
        # CẢNH BÁO
        ${data.dangerousCombinations && data.dangerousCombinations.length > 0 ?
          data.dangerousCombinations.map(warning => 
            `- ${warning.combination}: ${warning.description || "Không có mô tả"}`
          ).join('\n')
          : "Không có cảnh báo đặc biệt."}
        
        # PHÂN TÍCH VỊ TRÍ SỐ ĐẶC BIỆT
        ${data.keyPositions ? 
          `- Số cuối: ${data.keyPositions.lastDigit.value} - ${data.keyPositions.lastDigit.meaning || "Không có ý nghĩa"}`
          : "Không có phân tích vị trí số."}
        ${data.keyPositions && data.keyPositions.thirdFromEnd ? 
          `- Số thứ 3 từ cuối: ${data.keyPositions.thirdFromEnd.value} - ${data.keyPositions.thirdFromEnd.meaning || "Không có ý nghĩa"}` 
          : ""}
        ${data.keyPositions && data.keyPositions.fifthFromEnd ? 
          `- Số thứ 5 từ cuối: ${data.keyPositions.fifthFromEnd.value} - ${data.keyPositions.fifthFromEnd.meaning || "Không có ý nghĩa"}` 
          : ""}
        
        # PHÂN TÍCH 3 SỐ CUỐI
        ${data.last3DigitsAnalysis ? 
          `- Cặp số cuối: ${data.last3DigitsAnalysis.lastThreeDigits || "Không xác định"}
          - Sao tương ứng: ${data.last3DigitsAnalysis.firstPair?.starInfo?.name || "Không xác định"}
          - Tính chất: ${data.last3DigitsAnalysis.firstPair?.starInfo?.nature || "Không xác định"}`
          : "Không có phân tích 3 số cuối."}
        
        Hãy trả lời câu hỏi "${data.question}" dựa trên phân tích trên. Cụ thể, chi tiết và chính xác về các khía cạnh liên quan đến câu hỏi.
      `;
      
    case 'comparison':
      let prompt = `Hãy so sánh chi tiết các số điện thoại sau:\n\n`;
      
      data.forEach((analysisData, index) => {
        prompt += `
          # SỐ THỨ ${index + 1}: ${analysisData.phoneNumber}
          
          ## Các sao chủ đạo:
          ${analysisData.starSequence.slice(0, 5).map(star => 
            `- ${star.originalPair}: ${star.name} (${star.nature}, Năng lượng: ${star.energyLevel || 0}/4)`
          ).join('\n')}
          
          ## Cân bằng: ${analysisData.balance === 'BALANCED' ? 'Cân bằng tốt' : 
                      analysisData.balance === 'CAT_HEAVY' ? 'Thiên về cát' : 
                      analysisData.balance === 'HUNG_HEAVY' ? 'Thiên về hung' : 'Không xác định'}
          
          ## Năng lượng: Tổng=${analysisData.energyLevel?.total || "?"}, 
                       Cát=${analysisData.energyLevel?.cat || "?"}, 
                       Hung=${analysisData.energyLevel?.hung || "?"}
          
          ## Điểm chất lượng: ${analysisData.qualityScore || 0}/100
          
          ${analysisData.keyCombinations && analysisData.keyCombinations.length > 0 ? 
            `## Tổ hợp đặc biệt:\n${analysisData.keyCombinations.map(c => `- ${c.value}: ${c.description}`).join('\n')}` : ""}
            
          ${analysisData.dangerousCombinations && analysisData.dangerousCombinations.length > 0 ? 
            `## Cảnh báo:\n${analysisData.dangerousCombinations.map(c => `- ${c.combination}: ${c.description}`).join('\n')}` : ""}
        `;
      });
      
      prompt += `
        Phân tích điểm mạnh, điểm yếu của mỗi số, và đánh giá trong các khía cạnh:
        1. Tính cách
        2. Sự nghiệp
        3. Tiền tài
        4. Đầu tư và rủi ro
        5. Gia đình/Tình cảm
        6. Bạn bè/Quý nhân
        7. Sức khỏe
        
        Cuối cùng, cho biết số nào phù hợp nhất cho mỗi khía cạnh và số nào tốt nhất nói chung.
      `;
        // Log prompt được tạo ra
    console.log('\n========= GENERATED PROMPT =========');
    console.log(prompt);
    console.log('===================================\n');
        return prompt;
      
    case 'general':
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
        
        # Sao Cat hoa hung se the hien mat xau cua cac sao cat
        # Sao Hung hoa Hung (so 0, sao Hung canh sao Hung) the hien mat xau cua cac sao
        
        Câu hỏi: "${data}"
        
        Trả lời dựa trên kiến thức về phương pháp Bát Tinh, ngắn gọn và đầy đủ.
      `;
      
    case 'followUp':
      return `
        Dựa trên cuộc trò chuyện trước đó về phân tích số điện thoại, hãy trả lời câu hỏi: "${data}"
        
        Đảm bảo câu trả lời phải liên quan đến số điện thoại đã phân tích.
        Nếu không thể trả lời dựa trên thông tin sẵn có, hãy đề nghị người dùng cung cấp thêm thông tin.
      `;
      
    default:
      return data;
  }
};

/**
 * Manage conversation history
 */
const conversationManager = {
  save: (userId, userMessage, aiResponse) => {
    if (!userId) return;
    
    if (!conversationHistory.has(userId)) {
      conversationHistory.set(userId, []);
    }
    
    const userHistory = conversationHistory.get(userId);
    
    userHistory.push(
      { role: 'user', content: userMessage },
      { role: 'model', content: aiResponse }
    );
    
    // Keep history within MAX_CONVERSATION_TURNS limit
    if (userHistory.length > MAX_CONVERSATION_TURNS * 2) {
      userHistory.splice(0, 2);
    }
    
    conversationHistory.set(userId, userHistory);
  },
  
  get: (userId) => conversationHistory.get(userId) || [],
  
  clear: (userId) => conversationHistory.delete(userId),
  
  hasActiveConversation: (userId) => conversationHistory.has(userId) && conversationHistory.get(userId).length > 0,
  
  // Get analysis context from history
  getContextFromHistory: (userId) => {
    if (!userId || !conversationHistory.has(userId)) return null;
    
    const history = conversationHistory.get(userId);
    for (let i = 0; i < history.length; i++) {
      const msg = history[i];
      if (msg.role === 'user' && msg.content.startsWith('CONTEXT_DATA:')) {
        try {
          const contextData = JSON.parse(history[i+1].content);
          return contextData.analysisData;
        } catch (error) {
          console.error('Error parsing context data:', error);
          return null;
        }
      }
    }
    return null;
  }
};

/**
 * Call the Gemini API with error handling and retries
 */
const callGeminiAPI = async (prompt, options = {}) => {
  const {
    temperature = config.TEMPERATURE,
    maxTokens = config.MAX_TOKENS,
    useCache = config.CACHE_ENABLED,
    systemPrompt = getSystemPrompt(),
    userId = null,
    useHistory = false
  } = options;
  
  // Cache handling
  const cacheKey = useCache && !useHistory ? `${prompt}_${temperature}_${maxTokens}` : null;
  
  if (cacheKey && responseCache.has(cacheKey) && !useHistory) {
    const cachedItem = responseCache.get(cacheKey);
    if (Date.now() - cachedItem.timestamp < config.CACHE_DURATION) {
      return cachedItem.response;
    }
    responseCache.delete(cacheKey);
  }

  // API call with retry logic
  const makeApiCall = async (attempt = 1) => {
    try {
      const apiUrl = `${config.API_URL}?key=${config.API_KEY}`;
      
      // Prepare messages array
      let messages = [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Tôi hiểu và sẽ tuân theo hướng dẫn này." }] }
      ];
      
      // Add conversation history if needed
      if (useHistory && userId) {
        const history = conversationManager.get(userId);
        history.forEach(msg => {
          messages.push({
            role: msg.role,
            parts: [{ text: msg.content }]
          });
        });
      }
      
      // Add current user prompt
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
        // Hiển thị thông tin chi tiết về prompt
        console.log(`\n=============== GEMINI API CALL - ATTEMPT ${attempt} ===============`);
        console.log(`Prompt length: ${prompt.length} characters`);
        console.log(`Using history: ${useHistory}, History length: ${useHistory && userId ? (getConversationHistory(userId).length / 2) : 0} turns`);
        console.log(`\n=============== PROMPT CONTENT ===============`);
        console.log(prompt); // Hiển thị toàn bộ nội dung prompt
        console.log(`\n=============== END PROMPT CONTENT ===============\n`);      }
      
      const response = await axios.post(apiUrl, requestBody, {
        headers: { 'Content-Type': 'application/json' },
        timeout: config.REQUEST_TIMEOUT
      });
      
      if (!response.data.candidates || response.data.candidates.length === 0) {
        throw new Error('No candidates returned from API');
      }
      
      const textResponse = response.data.candidates[0].content.parts[0].text;
      
      // Save to conversation history if userId provided
      if (userId) {
        conversationManager.save(userId, prompt, textResponse);
      }
      
      // Cache the response if applicable
      if (cacheKey && !useHistory) {
        responseCache.set(cacheKey, {
          response: textResponse,
          timestamp: Date.now()
        });
        
        // Limit cache size
        if (responseCache.size > 100) {
          const oldestKey = responseCache.keys().next().value;
          responseCache.delete(oldestKey);
        }
      }
      
      return textResponse;
      
    } catch (error) {
      // Handle different error types
      const isNetworkError = !error.response && error.code !== 'ECONNABORTED';
      const isRateLimitError = error.response && (error.response.status === 429 || error.response.status === 403);
      const isServerError = error.response && error.response.status >= 500;
      
      // Retry logic
      if ((isNetworkError || isRateLimitError || isServerError) && attempt < config.MAX_RETRIES) {
        const delay = config.RETRY_DELAY * Math.pow(2, attempt - 1);
        console.warn(`API call failed (attempt ${attempt}/${config.MAX_RETRIES}). Retrying in ${delay}ms.`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return makeApiCall(attempt + 1);
      }
      
      // Error handling
      let errorMessage = 'Unknown error occurred';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      if (config.DEBUG) {
        console.error('Gemini API error:', error);
      }
      
      throw new Error(`Gemini API error: ${errorMessage}`);
    }
  };
  
  return makeApiCall();
};

// Export public methods
module.exports = {
  /**
   * Initialize the service with custom configuration
   */
  init: (customConfig = {}) => {
    Object.assign(config, customConfig);
    
    if (!config.API_KEY) {
      console.error('Error: Gemini API key not configured');
    }
  },
  
  /**
   * Generate analysis for a phone number
   */
  generateAnalysis: async (analysisData, userId = null) => {
    // Clear previous conversation if starting new analysis
    if (userId) {
      conversationManager.clear(userId);
    }
    
    const prompt = generatePrompt('analysis', analysisData);
    const response = await callGeminiAPI(prompt, { 
      temperature: 0.7,
      userId: userId,
      useHistory: false
    });
    
    // Save analysis context for future questions
    if (userId) {
      const userContext = {
        phoneNumber: analysisData.phoneNumber,
        analysis: response,
        analysisData: analysisData
      };
      
      const contextMessage = JSON.stringify(userContext);
      conversationManager.save(userId, `CONTEXT_DATA: ${analysisData.phoneNumber}`, contextMessage);
    }
    
    return response;
  },
  
  /**
   * Generate response to a specific question about a phone number
   */
  generateResponse: async (question, analysisContext, userId = null) => {
    const prompt = generatePrompt('question', {
      question,
      analysisContext
    });
    
    return callGeminiAPI(prompt, { 
      temperature: 0.7,
      userId: userId,
      useHistory: Boolean(userId)
    });
  },
  
  /**
   * Handle follow-up questions using context from previous interactions
   */
  generateFollowUpResponse: async (question, userId, analysisData = null) => {
    // If no history or user ID, treat as a general question
    if (!userId || !conversationManager.hasActiveConversation(userId)) {
      return this.generateGeneralInfo(question, userId);
    }
    
    // Get context from history if not provided
    if (!analysisData) {
      analysisData = conversationManager.getContextFromHistory(userId);
    }
    
    // If we have analysis data, use it for detailed context
    if (analysisData) {
      // Create a rich context prompt with all analysis details
      const prompt = generatePrompt('followUp', {
        question: question,
        analysisData: analysisData
      });
      
      return callGeminiAPI(prompt, {
        temperature: 0.7,
        userId: userId,
        useHistory: true
      });
    } else {
      // Use basic follow-up prompt if no specific context available
      const prompt = generatePrompt('followUp', {
        question: question
      });
      
      return callGeminiAPI(prompt, {
        temperature: 0.7,
        userId: userId,
        useHistory: true
      });
    }
  },
  
  /**
   * Compare multiple phone numbers
   */
  generateComparison: async (analysisDataList, userId = null) => {
    const prompt = generatePrompt('comparison', analysisDataList);
    return callGeminiAPI(prompt, { 
      temperature: 0.6,
      userId: userId,
      useHistory: false
    });
  },
  
  /**
   * Answer general questions about numerology
   */
  generateGeneralInfo: async (question, userId = null) => {
    const prompt = generatePrompt('general', question);
    return callGeminiAPI(prompt, { 
      temperature: 0.5,
      userId: userId,
      useHistory: Boolean(userId)
    });
  },
  
  /**
   * Check if there's an active conversation for a user
   */
  hasActiveConversation: (userId) => conversationManager.hasActiveConversation(userId),
  
  /**
   * Clear conversation history for a user
   */
  clearConversation: (userId) => conversationManager.clear(userId)
};
