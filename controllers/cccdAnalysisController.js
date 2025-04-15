// const User = require('../models/User'); // No longer needed
// const Analysis = require('../models/Analysis'); // Optional: Logging
const BAT_TINH = require('../constants/batTinh'); 
const COMBINATIONS = require('../constants/combinations.js'); // Corrected import

// --- Helper Functions --- 

/**
 * Normalizes the digit sequence based on CCCD rules:
 * 1. Handles '0': Replaces '0' with the first preceding non-'0' digit (or the last digit of the original 6 if none).
 * 2. Handles '5': Removes '5' from the sequence entirely.
 * @param {string} digits - The 6-digit sequence to normalize.
 * @returns {string} The normalized sequence (may be shorter than 6 digits).
 */
const normalizeCccdSequence = (digits) => {
    let processedDigits = digits.split('');
    const lastOriginalDigit = digits[digits.length - 1]; // Store the last original digit

    // Step 1: Handle '0's
    for (let i = 0; i < processedDigits.length; i++) {
        if (processedDigits[i] === '0') {
            let j = i - 1;
            while (j >= 0 && processedDigits[j] === '0') {
                j--;
            }
            // Use the found non-zero digit or default to the last original digit if no non-zero found before it
            processedDigits[i] = (j >= 0) ? processedDigits[j] : lastOriginalDigit; 
        }
    }

    // Step 2: Handle '5's - Filter them out
    const normalized = processedDigits.filter(digit => digit !== '5').join('');
    
    console.log(`Original 6 digits: ${digits}, After 0 handling: ${processedDigits.join('')}, After 5 removal: ${normalized}`); // Debug log
    return normalized;
}

/**
 * Splits the normalized sequence into overlapping pairs.
 * @param {string} sequence - The normalized sequence (after 0 and 5 handling).
 * @returns {string[]} An array of 2-digit overlapping pairs.
 */
const splitIntoOverlappingPairs = (sequence) => {
    const pairs = [];
    if (!sequence || sequence.length < 2) {
        return pairs; // Cannot form pairs
    }
    for (let i = 0; i < sequence.length - 1; i++) {
        pairs.push(sequence.substring(i, i + 2));
    }
    return pairs;
}

// Get Bát Tinh star info for a single pair (remains the same)
const getStarInfoForPair = (pair) => {
    for (const starKey in BAT_TINH) {
        if (starKey.includes('_ZERO') || starKey.includes('_FIVE')) {
            continue;
        }
        const starData = BAT_TINH[starKey];
        if (starData.numbers && starData.numbers.includes(pair)) {
            return {
                key: starKey, 
                name: starData.name,       
                description: starData.description,
                nature: starData.nature,     
                energy: starData.energy[pair] || null 
            };
        }
    }
    console.warn(`No star definition found for pair: ${pair}`);
    return {
        key: "UNKNOWN",
        name: "Không xác định",
        description: "Không có thông tin",
        nature: "Không xác định",
        energy: null
    };
};

// Get interpretation for a combination of two adjacent stars (remains the same)
const getStarCombinationInfo = (starKey1, starKey2) => {
    const combinationKey = `${starKey1}_${starKey2}`;
    if (COMBINATIONS.STAR_PAIRS && COMBINATIONS.STAR_PAIRS[combinationKey]) {
        const comboData = COMBINATIONS.STAR_PAIRS[combinationKey];
        return {
            combination: `${starKey1} - ${starKey2}`,
            description: comboData.description,
            detailedDescription: comboData.detailedDescription || [] 
        };
    }
    return null; 
}

// --- Main Analysis Function --- 
const analyzeCccdNumbers = (cccdNumber) => {
  console.log(`Analyzing CCCD: ${cccdNumber}`); 

  // 1. Extract last 6 digits.
  const lastSix = cccdNumber.slice(-6);

  // 2. Normalize the sequence (handles '0' and removes '5').
  const normalized = normalizeCccdSequence(lastSix);

  // 3. Split the *normalized* sequence into overlapping pairs.
  const pairs = splitIntoOverlappingPairs(normalized);

  // --- Analysis --- 
  const analysisData = {
      pairsAnalysis: [],       // Analysis of each individual pair
      combinationsAnalysis: [], // Analysis of adjacent star combinations
      summary: ''               // Overall summary text
  };

  // Check if any pairs could be formed
  if (pairs.length === 0) {
      analysisData.summary = `Không thể tạo cặp số nào từ chuỗi chuẩn hóa '${normalized}' để phân tích.`;
      if (normalized.length < 2) {
         analysisData.summary += ` (Chuỗi chuẩn hóa quá ngắn).`;
      } else {
         analysisData.summary += ` (Kiểm tra lại logic chuẩn hóa).`;
      }
  } else {
      // 4. Analyze each individual pair
      pairs.forEach((pair, index) => {
          const starInfo = getStarInfoForPair(pair);
          analysisData.pairsAnalysis.push({
              pairNumber: index + 1,
              digits: pair,
              starKey: starInfo.key, 
              star: starInfo.name,
              meaning: starInfo.description, 
              nature: starInfo.nature,      
              energyLevel: starInfo.energy   
          });
      });

      // 5. Analyze combinations of adjacent stars (if more than one pair exists)
      if (analysisData.pairsAnalysis.length > 1) {
          for (let i = 0; i < analysisData.pairsAnalysis.length - 1; i++) {
              const star1Info = analysisData.pairsAnalysis[i];
              const star2Info = analysisData.pairsAnalysis[i + 1];
              
              if (star1Info.starKey !== "UNKNOWN" && star2Info.starKey !== "UNKNOWN") {
                  const combinationInfo = getStarCombinationInfo(star1Info.starKey, star2Info.starKey);
                  if (combinationInfo) {
                      analysisData.combinationsAnalysis.push({
                          combinationNumber: i + 1, 
                          stars: `${star1Info.star} (${star1Info.digits}) + ${star2Info.star} (${star2Info.digits})`,
                          meaning: combinationInfo.description,
                          details: combinationInfo.detailedDescription
                      });
                  } else {
                      console.log(`No combination defined for ${star1Info.starKey}_${star2Info.starKey}`);
                  }
              } else {
                  console.log(`Skipping combination ${i+1} due to unknown star(s).`);
              }
          }
      }

      // 6. Generate Summary
      const starSequence = analysisData.pairsAnalysis.map(p => p.star).join(' -> ');
      analysisData.summary = `Phân tích dựa trên chuỗi số chuẩn hóa '${normalized}' (${pairs.length} cặp số, ${analysisData.combinationsAnalysis.length} kết hợp). Chuỗi sao: ${starSequence}.`;
      if (pairs.length < 5 && digits.includes('5')) { // Check original digits for 5
         analysisData.summary += ` (Lưu ý: Số cặp số ít hơn 5 do có số 5 trong 6 số cuối).` 
      }
  }

  // --- Return Structure --- 
  return {
    originalNumber: cccdNumber,
    lastSixDigits: lastSix,
    normalizedSequence: normalized, // Sequence after 0 and 5 handling
    pairs: pairs, // Overlapping pairs from normalized sequence
    analysis: {
        individualPairs: analysisData.pairsAnalysis, 
        starCombinations: analysisData.combinationsAnalysis,
        overallSummary: analysisData.summary 
    }
  };
};

// --- API Endpoint --- 
exports.analyzeCccd = async (req, res) => {
  try {
    const { cccdNumber } = req.body;

    // Validation
    if (!cccdNumber || typeof cccdNumber !== 'string' || !/^\d+$/.test(cccdNumber) || (cccdNumber.length !== 9 && cccdNumber.length !== 12)) {
      return res.status(400).json({ message: 'Số CCCD/CMND không hợp lệ. Vui lòng cung cấp đủ 9 số CMND cũ hoặc 12 số CCCD mới.' });
    }

    // Perform Analysis
    const analysisResult = analyzeCccdNumbers(cccdNumber);

    // Send Response
    res.status(200).json({ success: true, data: analysisResult });

  } catch (error) {
    console.error('Error analyzing CCCD:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ khi phân tích CCCD.' });
  }
};
