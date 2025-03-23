// server/services/analysisService.js
/**
 * Service for analyzing phone numbers based on the "Bát Tinh" (Eight Stars) method
 * Contains all the logic for analyzing phone numbers according to the Vietnamese numerology
 */

// Import necessary modules
const BAT_TINH = require('../constants/batTinh');
const COMBINATION_INTERPRETATIONS = require('../constants/combinations');
const RESPONSE_FACTORS = require('../constants/responseFactors');
const DIGIT_MEANINGS = require('../constants/digitMeanings');

// Helper Functions
/**
 * Format a phone number for display
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} Formatted phone number
 */
exports.formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};

/**
 * Get CSS class for star nature
 * @param {string} nature - Nature of the star ('Cát', 'Hung', etc)
 * @returns {string} CSS class name
 */
exports.getStarNatureClass = (nature) => {
    if (nature === 'Cát') return 'auspicious';
    if (nature === 'Hung') return 'inauspicious';
    return 'unknown';
};

/**
 * Normalize a phone number according to analysis rules
 * @param {string} phoneNumber - Phone number to normalize
 * @returns {object} Normalized number and special sequence information
 */
exports.normalizePhoneNumber = (phoneNumber) => {
    // Remove non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // 01 - Still remove the leading 0 if present
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }
    // 02 - normalize consecutive 0 and 5 digits
    let normalized = "";
    let prev = "";
    for (let i = 0; i < cleaned.length; i++) {
      const currentDigit = cleaned[i];
      
      // Skip if this is a repeat of 0 or 5
      if ((currentDigit === "0" || currentDigit === "5") && currentDigit === prev) {
        continue;
      }
      
      normalized += currentDigit;
      prev = currentDigit;
    }
    
    // 03 & 04 - Track special patterns with 0 and 5
    const specialSequences = {
        zeroPatterns: this.findSpecialDigitPatterns(cleaned, '0'),
        fivePatterns: this.findSpecialDigitPatterns(cleaned, '5')
    };
    
    return {
        normalizedNumber: normalized,
        originalNumber: cleaned,
        specialSequences
    };
};

/**
 * Find special 3-digit patterns containing a specific digit
 * @param {string} number - Phone number to analyze
 * @param {string} specialDigit - Special digit to look for ('0' or '5')
 * @returns {Array} Array of special patterns found
 */
exports.findSpecialDigitPatterns = (number, specialDigit) => {
    const patterns = [];
    
    for (let i = 0; i < number.length - 2; i++) {
        const triplet = number.substring(i, i+3);
        
        // Check if the triplet contains the special digit
        if (triplet.includes(specialDigit)) {
            let effect = specialDigit === '0' ? 'hoa_hung' : 'duoc_tang_cuong';
            let description = specialDigit === '0' 
                ? "Làm giảm năng lượng" 
                : "Tăng cường năng lượng";
            
            patterns.push({
                pattern: triplet,
                position: `${i+1}-${i+3}`,
                type: effect,
                description
            });
        }
    }
    
    return patterns;
};

/**
 * Generate digit pairs from a phone number
 * @param {string} digits - Digits to process
 * @returns {Array} Array of digit pairs
 */
exports.generatePairs = (digits) => {
    // Ensure digits is a string
    digits = String(digits);
    
    // Remove leading 0 if present
    if (digits.startsWith('0')) {
        digits = digits.substring(1);
    }
    
    const pairs = [];
    let i = 0;
    
    while (i < digits.length - 1) {
        // Skip if current digit is 0 or 5
        if (digits[i] === '0' || digits[i] === '5') {
            i++;
            continue;
        }
        
        const current = digits[i];
        const next = digits[i + 1];
        
        // Form regular pair (next digit is not 0 or 5)
        if (next !== '0' && next !== '5') {
            pairs.push(current + next);
            i += 1; // Move by 1 for overlapping pairs
        } 
        // Special sequence (next digit is 0 or 5)
        else {
            let j = i + 1;
            let group = current;
            
            // Collect all consecutive 0s and 5s
            while (j < digits.length && (digits[j] === '0' || digits[j] === '5')) {
                group += digits[j];
                j++;
            }
            
            // Add next non-0/5 digit if available
            if (j < digits.length) {
                group += digits[j];
                j++; // Move past this digit
            }
            
            pairs.push(group);
            i = j - 1; // Start from the last included digit
        }
    }
    
    // Special handling for remaining digits
    if (i < digits.length) {
        // Find the last pair
        const lastPair = pairs[pairs.length - 1];
        
        // If last pair's last digit matches the current position,
        // add remaining digits to the final group
        const lastDigitPosition = digits.indexOf(lastPair[lastPair.length - 1], 
                                               Math.max(0, i - lastPair.length));
        
        if (lastDigitPosition + 1 === i) {
            let remaining = "";
            for (let j = i; j < digits.length; j++) {
                remaining += digits[j];
            }
            
            // If the remaining digits end with 0 or 5, add as a group
            if (remaining.length > 0 && (remaining.endsWith('0') || remaining.endsWith('5'))) {
                // Combine with previous pair if previous pair ends with first digit of remaining
                if (pairs.length > 0 && digits[i-1] === remaining[0]) {
                    pairs[pairs.length - 1] += remaining.substring(1);
                } else {
                    pairs.push(remaining);
                }
            }
        }
    }
    
    // Apply the new rule for the final processing of pairs
    this.processLastGroup(pairs, digits);
    
    return pairs;
};

/**
 * Process the last group of pairs according to special rules
 * @param {Array} pairs - Array of digit pairs
 * @param {string} originalDigits - Original digits
 */
exports.processLastGroup = (pairs, originalDigits) => {
    if (pairs.length < 2) return;
    
    const lastGroup = pairs[pairs.length - 1];
    
    if (lastGroup.length > 1 && 
        !['0', '5'].includes(lastGroup[0]) && 
        [...lastGroup.substring(1)].every(digit => digit === '0' || digit === '5')) {
        
        const trailingZerosAndFives = lastGroup.substring(1);
        pairs.pop();
        
        if (pairs.length > 0) {
            pairs[pairs.length - 1] += trailingZerosAndFives;
        }
    }
};

/**
 * Map digit pairs to Bat Tinh stars
 * @param {string} phoneNumber - Phone number to analyze
 * @returns {object} Mapping result with stars and attributes
 */
exports.mapToBatTinh = (phoneNumber) => {
    // Generate pairs using the existing function
    const pairs = this.generatePairs(phoneNumber);
    
    // Check for special digits
    const hasZero = phoneNumber.includes('0');
    const hasFive = phoneNumber.includes('5');
    
    // Count occurrences of special digits
    const zeroCount = (phoneNumber.match(/0/g) || []).length;
    const fiveCount = (phoneNumber.match(/5/g) || []).length;
    
    let specialAttribute = "";
    let specialEffectDescription = "";
    let energyModifier = 0;
    
    if (hasZero) {
        specialAttribute = "zero";
        specialEffectDescription = "Số 0 làm giảm năng lượng của các sao";
    } 
    
    if (hasFive) {
        specialAttribute = specialAttribute ? "zero_five" : "five";
        if (specialEffectDescription) {
            specialEffectDescription += ", Số 5 tăng cường năng lượng";
        } else {
            specialEffectDescription = "Số 5 tăng cường năng lượng của các sao";
        }
        energyModifier += fiveCount * 1; // Mỗi số 5 tăng 1 đơn vị năng lượng
    }
    
    // Process each pair to map to Bat Tinh
    const mappedResults = pairs.map(pair => {
        // Count special digits in this pair
        const zeroesInPair = (pair.match(/0/g) || []).length;
        const fivesInPair = (pair.match(/5/g) || []).length;
        
        // Remove all 0s and 5s from the pair for basic mapping
        const cleanPair = pair.split('').filter(digit => digit !== '0' && digit !== '5').join('');
        
        // First handle special case for _ZERO variants when there's exactly one zero
        if (zeroesInPair === 1) {
            for (const [starKey, starObj] of Object.entries(BAT_TINH)) {
                // Check if this is a special zero star (e.g., SINH_KHI_ZERO)
                if (starKey.endsWith('_ZERO') && starObj.numbers && starObj.numbers.includes(pair)) {
                    // Get base star name (remove _ZERO suffix)
                    const baseStarKey = starKey.replace('_ZERO', '');
                    
                    // Get energy level from the special zero star object
                    let energyLevel = 0;
                    if (starObj.energy && starObj.energy[pair]) {
                        energyLevel = starObj.energy[pair];
                    }
                    
                    // Add energy for each 5 in the pair
                    if (fivesInPair > 0) {
                        energyLevel += fivesInPair * 1;
                    }
                    
                    const level = this.getStarLevel(energyLevel);
                    
                    return {
                        originalPair: pair,
                        mappedPair: cleanPair,
                        star: baseStarKey, // Use the base star name
                        name: starObj.name,
                        nature: starObj.nature || "Unknown",
                        level,
                        energyLevel,
                        specialAttribute: fivesInPair > 0 ? "zero_five" : "zero",
                        specialEffect: starObj.description,
                        detailedDescription: starObj.detailedDescription,
                        description: starObj.description,
                        isZeroVariant: true, // Flag to indicate this is a zero variant
                        zeroCount: zeroesInPair,
                        fiveCount: fivesInPair
                    };
                }
            }
        } else if (zeroesInPair > 1) {
            // For more than one zero, look for _ZERO variants first
            for (const [starKey, starObj] of Object.entries(BAT_TINH)) {
                // Only check special zero star variants
                if (starKey.endsWith('_ZERO') && starObj.numbers) {
                    // Create a test pair with only one zero to check against the patterns
                    const testPair = pair.replace(/0/g, function(match, offset, string) {
                        return offset === pair.indexOf('0') ? '0' : '';
                    });
                    
                    if (starObj.numbers.some(num => {
                        // Check if the test pair matches any pattern when removing extra zeros
                        const cleanTestPair = testPair.replace(/0/g, '');
                        const cleanNum = num.replace(/0/g, '');
                        return cleanTestPair === cleanNum && num.includes('0');
                    })) {
                        // Found a matching _ZERO pattern
                        const baseStarKey = starKey.replace('_ZERO', '');
                        
                        // Base energy from the first zero effect
                        let energyLevel = 0;
                        // Get a matching number pattern from the numbers array
                        const matchingPattern = starObj.numbers.find(num => {
                            const cleanNum = num.replace(/0/g, '');
                            return cleanPair === cleanNum;
                        });
                        
                        if (matchingPattern && starObj.energy && starObj.energy[matchingPattern]) {
                            energyLevel = starObj.energy[matchingPattern];
                        }
                        
                        // Add energy for additional zeros (beyond the first one)
                        if (zeroesInPair > 1) {
                            energyLevel += (zeroesInPair - 1) * 1;
                        }
                        
                        // Add energy for each 5 in the pair
                        if (fivesInPair > 0) {
                            energyLevel += fivesInPair * 1;
                        }
                        
                        const level = this.getStarLevel(energyLevel);
                        
                        return {
                            originalPair: pair,
                            mappedPair: cleanPair,
                            star: baseStarKey,
                            name: starObj.name,
                            nature: starObj.nature || "Unknown",
                            level,
                            energyLevel,
                            specialAttribute: fivesInPair > 0 ? "zero_five" : "zero",
                            specialEffect: `${starObj.description}, mỗi số 0 thêm tăng năng lượng 1 đơn vị`,
                            detailedDescription: starObj.detailedDescription,
                            description: starObj.description,
                            isZeroVariant: true,
                            zeroCount: zeroesInPair, 
                            fiveCount: fivesInPair
                        };
                    }
                }
            }
        }
        
        // If the cleaned pair has exactly 2 digits, proceed with regular mapping
        if (cleanPair.length === 2) {
            const reversedPair = cleanPair[1] + cleanPair[0];
            
            // Check against BAT_TINH dictionary
            for (const [starKey, starObj] of Object.entries(BAT_TINH)) {
                // Skip special case stars with _ZERO suffix
                if (starKey.endsWith('_ZERO')) {
                    continue;
                }
                
                if (starObj.numbers && (starObj.numbers.includes(cleanPair) || starObj.numbers.includes(reversedPair))) {
                    // Get base energy level from the star
                    const baseEnergyLevel = this.getEnergyLevel(starKey, cleanPair, reversedPair);
                    
                    // Calculate modified energy level based on special digits
                    let energyLevel = baseEnergyLevel;
                    
                    if (zeroesInPair > 0) {
                        // If there's a zero, we should look for the _ZERO variant
                        const zeroVariantKey = `${starKey}_ZERO`;
                        
                        if (BAT_TINH[zeroVariantKey]) {
                            // Use _ZERO variant and add energy for additional zeros
                            if (zeroesInPair > 1) {
                                energyLevel += (zeroesInPair - 1) * 1;
                            }
                        } else {
                            // There's no specific _ZERO variant, handle generically
                            energyLevel *= 0.7; // Reduce base energy by 30%
                        }
                    }
                    
                    // Add energy for each 5 in the pair
                    if (fivesInPair > 0) {
                        energyLevel += fivesInPair * 1;
                    }
                    
                    const level = this.getStarLevel(energyLevel);
                    
                    // Set special effect descriptions
                    let specialEffect = "";
                    if (zeroesInPair > 0) {
                        specialEffect = zeroesInPair === 1 ? 
                            "Số 0 làm biến đổi đặc tính" : 
                            `Có ${zeroesInPair} số 0, mỗi số 0 thêm tăng năng lượng 1 đơn vị`;
                    }
                    
                    if (fivesInPair > 0) {
                        specialEffect = specialEffect ? 
                            `${specialEffect}, mỗi số 5 tăng năng lượng 1 đơn vị` : 
                            `Mỗi số 5 tăng năng lượng 1 đơn vị`;
                    }
                    
                    return {
                        originalPair: pair,
                        mappedPair: cleanPair,
                        star: starKey,
                        name: starObj.name,
                        nature: starObj.nature || "Unknown",
                        level,
                        energyLevel,
                        baseEnergyLevel,  // Keep original for reference
                        specialAttribute: zeroesInPair > 0 ? (fivesInPair > 0 ? "zero_five" : "zero") : 
                                         (fivesInPair > 0 ? "five" : ""),
                        specialEffect,
                        detailedDescription: starObj.detailedDescription,
                        description: starObj.description,
                        isZeroVariant: zeroesInPair > 0,
                        zeroCount: zeroesInPair,
                        fiveCount: fivesInPair
                    };
                }
            }
        }
        
        // Default case if no mapping found
        return {
            originalPair: pair,
            mappedPair: cleanPair,
            star: "UNKNOWN",
            name: "Không xác định",
            nature: "Unknown",
            level: "UNKNOWN",
            energyLevel: 0,
            specialAttribute: (zeroesInPair > 0 || fivesInPair > 0) ? 
                             (zeroesInPair > 0 ? (fivesInPair > 0 ? "zero_five" : "zero") : "five") : "",
            specialEffect: "",
            detailedDescription: "",
            description: "",
            zeroCount: zeroesInPair,
            fiveCount: fivesInPair
        };
    });
    
    return {
        pairs,
        mappedResults,
        specialAttribute,
        specialEffectDescription,
        zeroCount,
        fiveCount,
        energyModifier
    };
};

/**
 * Get energy level from BAT_TINH constants
 * @param {string} starKey - Star key in BAT_TINH
 * @param {string} pair - Digit pair
 * @param {string} reversedPair - Reversed digit pair
 * @returns {number} Energy level
 */
exports.getEnergyLevel = (starKey, pair, reversedPair) => {
    const star = BAT_TINH[starKey];
    if (!star || !star.energy) return 0;
    
    // Get energy value from mapping (if exists)
    if (star.energy[pair]) {
        return star.energy[pair];
    }
    
    if (reversedPair && star.energy[reversedPair]) {
        return star.energy[reversedPair];
    }
    
    return 0;
};

/**
 * Convert energy level to descriptive level
 * @param {number} energyLevel - Energy level value
 * @returns {string} Descriptive level
 */
exports.getStarLevel = (energyLevel) => {
    // Map energy levels to descriptive levels
    switch (true) {
        case energyLevel >= 4: return "VERY_HIGH";
        case energyLevel >= 3: return "HIGH";
        case energyLevel >= 2: return "MEDIUM";
        case energyLevel >= 1: return "LOW";
        default: return "UNKNOWN";
    }
};

/**
 * Calculate energy levels from star sequence
 * @param {Array} starSequence - Array of stars
 * @returns {object} Energy level information
 */
exports.calculateEnergyLevel = (starSequence) => {
    let totalEnergy = 0;
    let catEnergy = 0;
    let hungEnergy = 0;
    
    for (const star of starSequence) {
        if (star.nature === "Cát") {
            catEnergy += star.energyLevel;
            totalEnergy += star.energyLevel;
        } else if (star.nature === "Hung") {
            hungEnergy += star.energyLevel;
            totalEnergy += -star.energyLevel;
        }
    }
    
    return {
        total: totalEnergy,
        cat: catEnergy,
        hung: hungEnergy,
        ratio: totalEnergy > 0 ? catEnergy / totalEnergy : 0
    };
};

/**
 * Count star types in sequence
 * @param {Array} starSequence - Array of stars
 * @returns {object} Count of different star types
 */
exports.countStarTypes = (starSequence) => {
    const counts = {
        CAT: 0,
        HUNG: 0,
        UNKNOWN: 0
    };
    
    for (const star of starSequence) {
        if (star.nature === "Cát") counts.CAT++;
        else if (star.nature === "Hung") counts.HUNG++;
        else counts.UNKNOWN++;
    }
    
    return counts;
};

/**
 * Check balance between cat and hung stars
 * @param {Array} starSequence - Array of stars
 * @returns {string} Balance type
 */
exports.checkBalance = (starSequence) => {
    const counts = this.countStarTypes(starSequence);
    const total = counts.CAT + counts.HUNG;
    
    if (total === 0) return "UNKNOWN";
    
    const catRatio = counts.CAT / total;
    
    if (catRatio > 0.7) return "CAT_HEAVY";
    if (catRatio < 0.3) return "HUNG_HEAVY";
    
    return "BALANCED";
};

/**
 * Get descriptive text for balance type
 * @param {string} balance - Balance type
 * @returns {string} Descriptive text
 */
exports.getBalanceText = (balance) => {
    switch (balance) {
        case 'CAT_HEAVY':
            return 'Quá nhiều sao cát (>70%)';
        case 'HUNG_HEAVY':
            return 'Quá nhiều sao hung (>70%)';
        case 'BALANCED':
            return 'Cân bằng tốt giữa sao cát và hung';
        default:
            return 'Không xác định';
    }
};

/**
 * Analyze a pair of digits
 * @param {string} pair - Digit pair
 * @returns {object} Analysis result
 */
exports.analyzePair = (pair) => {
    const reversedPair = pair[1] + pair[0];
    
    for (const [starKey, starObj] of Object.entries(BAT_TINH)) {
        if (starObj.numbers && (starObj.numbers.includes(pair) || starObj.numbers.includes(reversedPair))) {
            const energyLevel = this.getEnergyLevel(starKey, pair, reversedPair);
            return {
                pair,
                star: starKey,
                name: starObj.name,
                description: starObj.description,
                nature: starObj.nature || "Unknown",
                energyLevel
            };
        }
    }
    
    return {
        pair,
        star: "UNKNOWN",
        name: "Không xác định",
        description: "",
        nature: "Unknown",
        energyLevel: 0
    };
};

/**
 * Get combination description for two stars
 * @param {string} star1 - First star
 * @param {string} star2 - Second star
 * @returns {object} Combination description
 */
exports.getStarCombination = (star1, star2) => {
    if (star1 === "UNKNOWN" || star2 === "UNKNOWN") {
        return null;
    }
    
    // Create key for the combination (sorted alphabetically)
    const comboKey = [star1, star2].sort().join("_");
    
    // Check in COMBINATION_INTERPRETATIONS.STAR_PAIRS
    if (COMBINATION_INTERPRETATIONS.STAR_PAIRS[comboKey]) {
        const combo = COMBINATION_INTERPRETATIONS.STAR_PAIRS[comboKey];
        return {
            key: comboKey,
            name: `${BAT_TINH[star1].name} + ${BAT_TINH[star2].name}`,
            description: combo.description,
            detailedDescription: [combo.detailedDescription]
        };
    }
    
    // Check in COMBINATION_INTERPRETATIONS.SPECIFIC_COMBINATIONS
    for (const [key, combo] of Object.entries(COMBINATION_INTERPRETATIONS.SPECIFIC_COMBINATIONS)) {
        if (key === comboKey) {
            return {
                key: comboKey,
                name: `${BAT_TINH[star1].name} + ${BAT_TINH[star2].name}`,
                description: combo.description,
                detailedDescription: combo.detailedDescription || [] // Thay meanings thành detailedDescription
            };
        }
    }
    
    // If not found, create a custom interpretation
    const interpretation = this.interpretStarCombination(star1, star2);
    
    return {
        key: comboKey,
        name: `${BAT_TINH[star1].name} + ${BAT_TINH[star2].name}`,
        description: `Tổ hợp của ${BAT_TINH[star1].name} và ${BAT_TINH[star2].name}`,
        detailedDescription: [interpretation] // Thay meanings thành detailedDescription
    };
};

/**
 * Interpret star combination meaning (fallback interpretation)
 * @param {string} star1 - First star
 * @param {string} star2 - Second star
 * @returns {string} Interpretation text
 */
exports.interpretStarCombination = (star1, star2) => {
    // Try to find in COMBINATION_INTERPRETATIONS.STAR_PAIRS
    const comboKey = [star1, star2].sort().join("_");
    if (COMBINATION_INTERPRETATIONS.STAR_PAIRS[comboKey]) {
        return COMBINATION_INTERPRETATIONS.STAR_PAIRS[comboKey].description;
    }
    
    // Basic interpretations based on nature
    const star1Nature = BAT_TINH[star1]?.nature || "Unknown";
    const star2Nature = BAT_TINH[star2]?.nature || "Unknown";
    
    if (star1Nature === "Cát" && star2Nature === "Cát") {
        return `Tổ hợp hai sao tốt: ${BAT_TINH[star1].name} và ${BAT_TINH[star2].name} tạo ra năng lượng tích cực và bổ trợ cho nhau.`;
    } else if (star1Nature === "Hung" && star2Nature === "Hung") {
        return `Tổ hợp hai sao xấu: ${BAT_TINH[star1].name} và ${BAT_TINH[star2].name} tạo ra năng lượng tiêu cực mạnh, cần cẩn trọng.`;
    } else {
        return `Tổ hợp cân bằng giữa sao tốt và sao xấu: ${BAT_TINH[star1].name} và ${BAT_TINH[star2].name} tạo ra sự cân bằng giữa thuận lợi và khó khăn.`;
    }
};
/**
 * Phân tích tổ hợp giữa các sao liền kề trong chuỗi sao
 * @param {Array} starSequence - Mảng các đối tượng sao đã phân tích
 * @returns {Array} Mảng các tổ hợp sao liền kề và ý nghĩa
 */
exports.analyzeConsecutivePairCombinations = (starSequence) => {
    const combinations = [];
    
    // Xử lý từng cặp sao liền kề
    for (let i = 0; i < starSequence.length - 1; i++) {
      const currentStar = starSequence[i];
      const nextStar = starSequence[i + 1];
      
      // Bỏ qua nếu một trong hai sao là UNKNOWN
      if (currentStar.star === "UNKNOWN" || nextStar.star === "UNKNOWN") {
        continue;
      }
      
      // Sử dụng hàm getStarCombination hiện có để lấy thông tin tổ hợp
      const combination = this.getStarCombination(currentStar.star, nextStar.star);
      
      if (combination) {
        // Thêm thông tin về tổng năng lượng của cặp sao
        const totalEnergy = currentStar.energyLevel + nextStar.energyLevel;
        const isPositive = (currentStar.nature === "Cát" && nextStar.nature === "Cát");
        const isNegative = (currentStar.nature === "Hung" && nextStar.nature === "Hung");
        
        // Kiểm tra xem đây có phải là cặp cuối cùng không
        const isLastPair = (i === starSequence.length - 2);
        
        combinations.push({
          firstStar: {
            name: currentStar.name,
            nature: currentStar.nature,
            originalPair: currentStar.originalPair,
            energyLevel: currentStar.energyLevel
          },
          secondStar: {
            name: nextStar.name,
            nature: nextStar.nature,
            originalPair: nextStar.originalPair,
            energyLevel: nextStar.energyLevel
          },
          key: combination.key,
          description: combination.description,
          detailedDescription: combination.detailedDescription || [], 
          totalEnergy: totalEnergy,
          isPositive: isPositive,
          isNegative: isNegative,
          position: `${i+1}-${i+2}`, // Vị trí trong chuỗi sao
          isLastPair: isLastPair // Đánh dấu nếu là cặp cuối cùng
        });
      }
    }
    
    return combinations;
  };

/**
 * Identify dangerous combinations
 * @param {object} pair1 - First pair
 * @param {object} pair2 - Second pair
 * @returns {Array} Dangerous combinations
 */
exports.identifyDangerousCombinations = (pair1, pair2) => {
    const dangers = [];
    
    // Check for specific dangerous combinations in COMBINATION_INTERPRETATIONS
    const comboKey = [pair1.star, pair2.star].sort().join("_");
    
    // Known dangerous combinations
    const dangerousCombos = {
        "LUC_SAT_NGU_QUY": {
            type: "ĐÀO HOA NÁT",
            description: "Lục Sát + Ngũ Quỷ: dễ có duyên với người khác phái, tình cảm không ổn định, đào hoa nát."
        },
        "NGU_QUY_TUYET_MENH": {
            type: "NGUY HIỂM SỨC KHỎE",
            description: "Tuyệt mệnh + Ngũ quỷ: dễ dẫn phát sức khỏe kém, có nguy cơ mắc bệnh nặng."
        },
        "HOA_HAI_TUYET_MENH": {
            type: "PHÁ TÀI",
            description: "Họa hại + Tuyệt mệnh: tiêu hao tài sản nghiêm trọng, dễ mất tiền lớn, đầu tư thất bại."
        }
    };
    
    // Check if this combination is in our dangerous list
    if (dangerousCombos[comboKey]) {
        dangers.push(dangerousCombos[comboKey]);
    }
    
    // Check if both are hung stars
    if (pair1.nature === "Hung" && pair2.nature === "Hung" && dangers.length === 0) {
        dangers.push({
            type: "HUNG TÍNH CAO",
            description: "Hai sao hung kết hợp: Năng lượng tiêu cực mạnh, cần cẩn trọng trong quyết định và hành động."
        });
    }
    
    return dangers;
};

/**
 * Check for special 3-digit combinations
 * @param {string} phoneNumber - Phone number
 * @returns {object} Special combinations info
 */
exports.checkSpecialLastThreeDigits = (phoneNumber) => {
    // Get last 3 digits
    const last3Digits = phoneNumber.slice(-3);
    
    // Check in SPECIFIC_COMBINATIONS
    for (const [key, combo] of Object.entries(COMBINATION_INTERPRETATIONS.SPECIFIC_COMBINATIONS)) {
        if (combo.numbers && combo.numbers.includes(last3Digits)) {
            return {
                isSpecial: true,
                combo: {
                    ...combo,
                    detailedDescription: combo.detailedDescription || []
                }
            };
        }
    }
    
    // Check for specific sequences ("tình cảm ngầm")
    if (COMBINATION_INTERPRETATIONS.SPECIFIC_COMBINATIONS.SPECIAL_ENDING.numbers.includes(last3Digits)) {
        return {
            isSpecial: true,
            description: "Tình cảm ngầm: xuất hiện tình cảm ngầm, tình ngoài giá thú, tình tay ba.",
            detailedDescription: ["Có khả năng tồn tại mối quan hệ ngoài luồng, tình cảm không rõ ràng, có thể dẫn đến nhiều phức tạp trong đời sống."]
        };
    }
    
    return {
        isSpecial: false
    };
};

/**
 * Find key three-digit combinations in a phone number
 * @param {string} phoneNumber - Phone number
 * @returns {Array} Key combinations
 */
exports.findKeyCombinations = (phoneNumber) => {
    const digits = phoneNumber.toString().replace(/\s+/g, '').split('');
    const combinations = [];
    
    // Check 3-digit combinations
    for (let i = 0; i < digits.length - 2; i++) {
        const triplet = digits[i] + digits[i + 1] + digits[i + 2];
        // Consider reversed triplet as well
        const reversedTriplet = digits[i + 2] + digits[i + 1] + digits[i];
        
        // Check wealth codes from THREE_DIGIT_PATTERNS
        for (const [wealthKey, wealthValue] of Object.entries(COMBINATION_INTERPRETATIONS.THREE_DIGIT_PATTERNS.WEALTH_CODES)) {
            const wealthCodes = wealthValue.codes || [];
            
            if (wealthCodes.includes(triplet) || wealthCodes.includes(reversedTriplet)) {
                combinations.push({
                    type: "WEALTH",
                    code: wealthKey,
                    value: triplet,
                    position: `${i+1}-${i+3}`,
                    description: wealthValue.description,
                    detailedDescription: wealthValue.detailedDescription || ""
                });
            }
        }
        
        // Check career codes from THREE_DIGIT_PATTERNS
        for (const [careerKey, careerValue] of Object.entries(COMBINATION_INTERPRETATIONS.THREE_DIGIT_PATTERNS.CAREER_CODES)) {
            const careerCodes = careerValue.codes || [];
            
            if (careerCodes.includes(triplet) || careerCodes.includes(reversedTriplet)) {
                combinations.push({
                    type: "CAREER",
                    code: careerKey,
                    value: triplet,
                    position: `${i+1}-${i+3}`,
                    description: careerValue.description,
                    detailedDescription: careerValue.detailedDescription || ""
                });
            }
        }
        
        // Check marriage codes from THREE_DIGIT_PATTERNS
        for (const [marriageType, marriageData] of Object.entries(COMBINATION_INTERPRETATIONS.THREE_DIGIT_PATTERNS.MARRIAGE_CODES)) {
            const marriageCodes = marriageData.codes || [];
            
            if (marriageCodes.includes(triplet) || marriageCodes.includes(reversedTriplet)) {
                combinations.push({
                    type: "MARRIAGE",
                    code: marriageType,
                    value: triplet,
                    position: `${i+1}-${i+3}`,
                    description: marriageData.description,
                    detailedDescription: marriageData.detailedDescription || ""
                });
            }
        }
    }
    
    return combinations;
};

/**
 * Analyze positions of specific digits in the number
 * @param {string} phoneNumber - Phone number
 * @returns {object} Key positions analysis
 */
exports.analyzeKeyPositions = (phoneNumber) => {
    const digits = phoneNumber.toString().replace(/\s+/g, '').split('');
    const result = {};
    
    // Last digit
    const lastDigit = digits[digits.length - 1];
    result.lastDigit = {
        value: lastDigit,
        meaning: DIGIT_MEANINGS.SINGLE_DIGIT_MEANINGS[lastDigit] || "Không xác định",
        position: "Vị trí cuối cùng"
    };
    
    // Third from end
    if (digits.length >= 3) {
        const thirdFromEnd = digits[digits.length - 3];
        result.thirdFromEnd = {
            value: thirdFromEnd,
            meaning: DIGIT_MEANINGS.THIRD_FROM_END_MEANINGS[thirdFromEnd] || "Không xác định",
            position: "Vị trí thứ 3 từ cuối"
        };
    }
    
    // Fifth from end
    if (digits.length >= 5) {
        const fifthFromEnd = digits[digits.length - 5];
        result.fifthFromEnd = {
            value: fifthFromEnd,
            meaning: DIGIT_MEANINGS.FIFTH_FROM_END_MEANINGS[fifthFromEnd] || "Không xác định",
            position: "Vị trí thứ 5 từ cuối"
        };
    }
    
    return result;
};

/**
 * Check for dangerous combinations in a phone number
 * @param {string} phoneNumber - Phone number
 * @returns {Array} Dangerous combinations
 */
exports.checkDangerousCombinations = (phoneNumber) => {
    const digits = phoneNumber.toString().replace(/\s+/g, '').split('');
    const dangerousCombinations = [];
    
    // Check 3-digit combinations
    for (let i = 0; i < digits.length - 2; i++) {
        const triplet = digits[i] + digits[i + 1] + digits[i + 2];
        const reversedTriplet = digits[i + 2] + digits[i + 1] + digits[i];
        
        // Lục Sát + Ngũ Quỷ (618, 816)
        if (triplet === '618' || triplet === '816' || 
            reversedTriplet === '618' || reversedTriplet === '816') {
            dangerousCombinations.push({
                combination: triplet,
                position: `${i+1}-${i+3}`,
                description: "Lục Sát + Ngũ Quỷ: dễ có duyên với người khác phái, nát Đào Hoa",
                detailedDescription: "Đào hoa nát, tình cảm không ổn định, có thể có nhiều mối quan hệ phức tạp."
            });
        }
        
        // Tuyệt mệnh + Ngũ quỷ (218, 812)
        if (triplet === '218' || triplet === '812' || 
            reversedTriplet === '218' || reversedTriplet === '812') {
            dangerousCombinations.push({
                combination: triplet,
                position: `${i+1}-${i+3}`,
                description: "Tuyệt mệnh + Ngũ quỷ: dễ dẫn phát sức khỏe kém, ung thư, bệnh nan y",
                detailedDescription: "Rủi ro sức khỏe cao, cần chú ý đến các vấn đề về tim mạch và các bệnh mạn tính."
            });
        }
        
        // Tình cảm ngầm (103, 301, 608, 806)
        const ngamCombos = COMBINATION_INTERPRETATIONS.SPECIFIC_COMBINATIONS.SPECIAL_ENDING.numbers;
        if (ngamCombos.includes(triplet) || ngamCombos.includes(reversedTriplet)) {
            dangerousCombinations.push({
                combination: triplet,
                position: `${i+1}-${i+3}`,
                description: "Tình cảm ngầm: xuất hiện tình cảm ngầm, tình ngoài giá thú, tình tay ba",
                detailedDescription: "Có nguy cơ tình cảm phức tạp, quan hệ ngoài luồng, dễ gây đổ vỡ gia đình."
            });
        }
        
        // Check for other dangerous combinations in SPECIFIC_COMBINATIONS
        for (const [comboKey, combo] of Object.entries(COMBINATION_INTERPRETATIONS.SPECIFIC_COMBINATIONS)) {
            if (combo.numbers && combo.numbers.includes(triplet)) {
                // Only add dangerous combinations
                if (comboKey.includes("TUYET_MENH_NGU_QUY") || 
                    comboKey.includes("LUC_SAT_NGU_QUY") || 
                    comboKey.includes("HOA_HAI_TUYET_MENH")) {
                    dangerousCombinations.push({
                        combination: triplet,
                        position: `${i+1}-${i+3}`,
                        description: combo.description,
                        detailedDescription: Array.isArray(combo.detailedDescription) ? 
                                  combo.detailedDescription.join(" ") : combo.detailedDescription
                    });
                }
            }
        }
    }
    
    // Check 2-digit combinations
    for (let i = 0; i < digits.length - 1; i++) {
        const pair = digits[i] + digits[i + 1];
        const reversedPair = digits[i + 1] + digits[i];
        
        // 19, 91 not suitable for women
        if (pair === '19' || pair === '91' || 
            reversedPair === '19' || reversedPair === '91') {
            dangerousCombinations.push({
                combination: pair,
                position: `${i+1}-${i+2}`,
                description: "19/91: Không thích hợp nữ nhân dùng, dễ trở thành nữ cường nhân",
                detailedDescription: "Phụ nữ sẽ có cá tính mạnh, cứng rắn, thiên về công việc, có thể bỏ bê gia đình."
            });
        }
    }
    
    // Check for too many 0s
    const zeroCount = digits.filter(d => d === '0').length-1;
    if (zeroCount >= 2) {
        dangerousCombinations.push({
            combination: "0 (xuất hiện " + zeroCount + " lần)",
            position: "Nhiều vị trí",
            description: "Quá nhiều số 0: hao tổn tiết nguyên khí, sức khỏe dễ mệt nhọc",
            detailedDescription: "Năng lượng suy giảm, thể trạng dễ mệt mỏi, công việc đầu tư nhiều nhưng hiệu quả thấp."
        });
    }
    
    // Check if last digit is 0
    if (digits[digits.length - 1] === '0') {
        dangerousCombinations.push({
            combination: digits[digits.length - 1],
            position: "Cuối",
            description: "Số đuôi 0: tứ đại giai không, cuối cùng là không",
            detailedDescription: "Mọi nỗ lực cuối cùng có thể không mang lại kết quả như mong đợi, dễ trống rỗng."
        });
    }
    
    return dangerousCombinations;
};

/**
 * Analyze the last three digits of a phone number
 * @param {string} phoneNumber - Phone number
 * @returns {object} Analysis of the last three digits
 */
exports.analyzeLastThreeDigits = (phoneNumber) => {
    // Get the last 3 digits
    const last3Digits = phoneNumber.slice(-3);
    
    // Create digit pairs from last 3 digits
    const firstPair = last3Digits.substring(0, 2);
    const secondPair = last3Digits.substring(1, 3);
    
    // Analyze each pair
    const firstPairInfo = this.analyzePair(firstPair);
    const secondPairInfo = this.analyzePair(secondPair);
    
    // Check if this is a special combination in SPECIFIC_COMBINATIONS
    let specialCombination = null;
    for (const [comboKey, combo] of Object.entries(COMBINATION_INTERPRETATIONS.SPECIFIC_COMBINATIONS)) {
        if (combo.numbers && combo.numbers.includes(last3Digits)) {
            specialCombination = {
                key: comboKey,
                description: combo.description,
                detailedDescription: combo.detailedDescription || []
            };
            break;
        }
    }
    
    // Check for star combination if both pairs have recognized stars
    let starCombination = null;
    if (firstPairInfo.star !== "UNKNOWN" && secondPairInfo.star !== "UNKNOWN") {
        starCombination = this.getStarCombination(firstPairInfo.star, secondPairInfo.star);
    }
    
    return {
        lastThreeDigits: last3Digits,
        firstPair: {
            pair: firstPair,
            starInfo: firstPairInfo
        },
        secondPair: {
            pair: secondPair,
            starInfo: secondPairInfo
        },
        specialCombination: specialCombination,
        starCombination: starCombination,
        hasSpecialMeaning: specialCombination !== null || 
                          (starCombination !== null && starCombination.key in COMBINATION_INTERPRETATIONS.STAR_PAIRS)
    };
};

/**
 * Analyze the effects of special digits 0 and 5
 * @param {string} phoneNumber - Phone number
 * @returns {object} Special digit effects
 */
exports.analyzeSpecialDigits = (phoneNumber) => {
    const digits = phoneNumber.split('');
    const results = {
        zeroEffects: [],
        fiveEffects: []
    };
    
    // Check for digit 0 effects
    for (let i = 0; i < digits.length - 2; i++) {
        const triplet = digits.slice(i, i+3).join('');
        if (triplet.includes('0')) {
            // Analyze effects of 0 in this triplet
            const cleanPair = triplet.replace(/0/g, '');
            if (cleanPair.length === 2) {
                const pairInfo = this.analyzePair(cleanPair);
                if (pairInfo.star !== "UNKNOWN") {
                    const zeroVariantKey = `${pairInfo.star}_ZERO`;
                    if (BAT_TINH[zeroVariantKey]) {
                        results.zeroEffects.push({
                            position: `${i+1}-${i+3}`,
                            digits: triplet,
                            star: pairInfo.star,
                            description: BAT_TINH[zeroVariantKey].description,
                            effect: 'zero_variant'
                        });
                    } else {
                        results.zeroEffects.push({
                            position: `${i+1}-${i+3}`,
                            digits: triplet,
                            star: pairInfo.star,
                            description: `Số 0 làm giảm năng lượng của sao ${pairInfo.name}`,
                            effect: 'generic_reduction'
                        });
                    }
                }
            }
        }
    }
    
    // Check for digit 5 effects
    for (let i = 0; i < digits.length - 2; i++) {
        const triplet = digits.slice(i, i+3).join('');
        if (triplet.includes('5')) {
            // Analyze effects of 5 in this triplet
            const cleanPair = triplet.replace(/5/g, '');
            if (cleanPair.length === 2) {
                const pairInfo = this.analyzePair(cleanPair);
                if (pairInfo.star !== "UNKNOWN") {
                    results.fiveEffects.push({
                        position: `${i+1}-${i+3}`,
                        digits: triplet,
                        star: pairInfo.star,
                        description: `Số 5 tăng cường năng lượng của sao ${pairInfo.name}`,
                        enhancement: true
                    });
                }
            }
        }
    }
    
    return results;
};

/**
 * Apply response factors to analysis based on user context
 * @param {object} analysisData - Analysis data
 * @param {object} userContext - Optional user context
 * @returns {object} Enhanced analysis
 */
exports.applyResponseFactors = (analysisData, userContext = {}) => {
    // Default context if not provided
    const context = {
        age: 'AGE_25_40',
        usageDuration: 'UNDER_1',
        ...userContext
    };
    
    // Copy the analysis data to avoid modifying the original
    const adjustedAnalysis = JSON.parse(JSON.stringify(analysisData));
    
    // Apply position weights to stars
    adjustedAnalysis.starSequence.forEach((star, index) => {
        const position = index < 3 ? 'START' : (index >= 6 ? 'END' : 'MIDDLE');
        star.weightedEnergy = star.energyLevel * RESPONSE_FACTORS.POSITION_WEIGHTS[position];
    });
    
    // Apply age and usage weights to overall interpretation
    const ageWeights = RESPONSE_FACTORS.AGE_WEIGHTS[context.age];
    const usageMultiplier = RESPONSE_FACTORS.USAGE_WEIGHTS[context.usageDuration];
    
    adjustedAnalysis.weightedEnergyLevel = {
        start: (adjustedAnalysis.energyLevel.cat * ageWeights[0]) - 
              (adjustedAnalysis.energyLevel.hung * ageWeights[0]),
        middle: (adjustedAnalysis.energyLevel.cat * ageWeights[1]) - 
               (adjustedAnalysis.energyLevel.hung * ageWeights[1]),
        end: (adjustedAnalysis.energyLevel.cat * ageWeights[2]) - 
            (adjustedAnalysis.energyLevel.hung * ageWeights[2]),
        total: adjustedAnalysis.energyLevel.total * usageMultiplier
    };
    
    // Determine response level based on thresholds
    const responseRatio = Math.abs(adjustedAnalysis.weightedEnergyLevel.total) / 
                         (adjustedAnalysis.starSequence.length * 4); // 4 is max energy level
    
    if (responseRatio >= RESPONSE_FACTORS.THRESHOLDS.VERY_HIGH) {
        adjustedAnalysis.responseLevel = 'VERY_HIGH';
    } else if (responseRatio >= RESPONSE_FACTORS.THRESHOLDS.HIGH) {
        adjustedAnalysis.responseLevel = 'HIGH';
    } else if (responseRatio >= RESPONSE_FACTORS.THRESHOLDS.MODERATE) {
        adjustedAnalysis.responseLevel = 'MODERATE';
    } else if (responseRatio >= RESPONSE_FACTORS.THRESHOLDS.LOW) {
        adjustedAnalysis.responseLevel = 'LOW';
    } else {
        adjustedAnalysis.responseLevel = 'VERY_LOW';
    }
    
    // Also apply star-specific response factors
    adjustedAnalysis.starSequence.forEach(star => {
        if (star.star in RESPONSE_FACTORS.STAR_RESPONSE_FACTORS) {
            star.responseFactor = RESPONSE_FACTORS.STAR_RESPONSE_FACTORS[star.star];
            star.adjustedEnergy = star.weightedEnergy * star.responseFactor;
        }
    });
    
    return adjustedAnalysis;
};

/**
 * Calculate the overall quality score for a phone number
 * @param {object} analysisData - Analysis data
 * @returns {number} Quality score (0-100)
 */
exports.calculateQualityScore = (analysisData) => {
    // Base score from energy balance
    let score = 50; // Start at neutral
    
    // Adjust based on energy level
    score += analysisData.energyLevel.total * 5;
    
    // Adjust based on cát/hung balance
    if (analysisData.balance === 'CAT_HEAVY') {
        score += 20;
    } else if (analysisData.balance === 'HUNG_HEAVY') {
        score -= 20;
    }
    
    // Adjust for special combinations
    if (analysisData.keyCombinations && analysisData.keyCombinations.length > 0) {
        // Positive combinations in wealth and career
        const positiveCount = analysisData.keyCombinations.filter(combo => 
            combo.type === 'WEALTH' || combo.type === 'CAREER').length;
        
        score += positiveCount * 5;
    }
    
    // Penalize for dangerous combinations
    if (analysisData.dangerousCombinations && analysisData.dangerousCombinations.length > 0) {
        score -= analysisData.dangerousCombinations.length * 8;
    }
    
    // Adjust for special digits
    score += (analysisData.fiveCount || 0) * 3;  // 5 is generally positive
    score -= (analysisData.zeroCount || 0) * 2;  // 0 is generally negative
    
    // Ensure score is within 0-100 range
    return Math.max(0, Math.min(100, score));
};

/**
 * Main function to analyze a phone number
 * @param {string} phoneNumber - Phone number to analyze
 * @param {object} userContext - Optional user context
 * @returns {object} Complete analysis
 */
exports.analyzePhoneNumber = (phoneNumber, userContext = {}) => {
    // Clean input
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    if (cleanNumber.length < 10) {
        return { error: "Số điện thoại phải có ít nhất 10 chữ số." };
    }
    
    // Apply normalization
    const normResult = this.normalizePhoneNumber(cleanNumber);
    const normalizedNumber = normResult.normalizedNumber;
    
    if (!normalizedNumber || normalizedNumber.length < 2) {
        return { error: "Sau khi chuẩn hóa, số điện thoại quá ngắn để phân tích." };
    }
    
    // Get Bat Tinh mapping with improved handling of 0 and 5
    const batTinhResult = this.mapToBatTinh(cleanNumber);
    
    // Extract star sequence
    const starSequence = batTinhResult.mappedResults;
    
    // Calculate energy levels with adjustments for special digits
    const energyLevel = this.calculateEnergyLevel(starSequence);
    
    // Apply energy modifier from special digits
    if (batTinhResult.energyModifier) {
        energyLevel.cat += batTinhResult.energyModifier;
        energyLevel.total += batTinhResult.energyModifier;
    }
    
    // Find key combinations
    const keyCombinations = this.findKeyCombinations(cleanNumber);
    
    // Analyze key positions
    const keyPositions = this.analyzeKeyPositions(cleanNumber);
    
    // Check balance between cát and hung stars
    const balance = this.checkBalance(starSequence);
    
    // Count star types
    const starCounts = this.countStarTypes(starSequence);
    
    // Check for dangerous combinations
    const dangerousCombinations = this.checkDangerousCombinations(cleanNumber);
    
    // Analyze last three digits for special patterns
    const last3DigitsAnalysis = this.analyzeLastThreeDigits(cleanNumber);
    
    // Check for special last 3 digits combinations
    const specialLast3 = this.checkSpecialLastThreeDigits(cleanNumber);
    
    // Check for effects of 0 and 5
    const specialDigitEffects = this.analyzeSpecialDigits(cleanNumber);
    
   // Tạo base analysis result
    const analysisResult = {
        phoneNumber: cleanNumber,
        normalizedNumber: normalizedNumber,
        starSequence: starSequence,
        energyLevel: energyLevel,
        keyCombinations: keyCombinations,
        keyPositions: keyPositions,
        balance: balance,
        balanceText: this.getBalanceText(balance),
        starCounts: starCounts,
        dangerousCombinations: dangerousCombinations,
        last3DigitsAnalysis: last3DigitsAnalysis,
        specialLast3: specialLast3,
        specialDigitEffects: specialDigitEffects,
        specialAttribute: batTinhResult.specialAttribute,
        specialEffectDescription: batTinhResult.specialEffectDescription,
        zeroCount: batTinhResult.zeroCount,
        fiveCount: batTinhResult.fiveCount,
        energyModifier: batTinhResult.energyModifier,
        qualityScore: 0 // Will calculate below
    };
    
    // Thêm phân tích về tổ hợp cặp sao liền kề
    analysisResult.starCombinations = this.analyzeConsecutivePairCombinations(starSequence);
    
    // Calculate quality score
    analysisResult.qualityScore = this.calculateQualityScore(analysisResult);
    
    // Apply response factors for context-sensitive analysis
    const enhancedAnalysis = this.applyResponseFactors(analysisResult, userContext);
    
    return enhancedAnalysis;
};

/**
 * Analyze compatibility of a phone number with a specific purpose
 * @param {string} phoneNumber - Phone number
 * @param {string} targetType - Target type (business, romance, wealth, health)
 * @returns {object} Compatibility analysis
 */
exports.analyzeCompatibility = (phoneNumber, targetType) => {
    const analysis = this.analyzePhoneNumber(phoneNumber);
    if (analysis.error) return analysis;
    
    const compatibility = { score: 0, strengths: [], weaknesses: [] };
    
    // Different target types need different star combinations
    switch (targetType) {
        case 'business':
            // Business needs Diên Niên, Sinh Khí, avoid Họa Hại
            compatibility.desiredStars = ['DIEN_NIEN', 'SINH_KHI'];
            compatibility.avoidStars = ['HOA_HAI'];
            break;
            
        case 'romance':
            // Romance benefits from Thiên Y, avoid Ngũ Quỷ, Lục Sát combinations
            compatibility.desiredStars = ['THIEN_Y'];
            compatibility.avoidStars = ['NGU_QUY', 'LUC_SAT'];
            break;
            
        case 'wealth':
            // Wealth likes Thiên Y, avoid Tuyệt Mệnh
            compatibility.desiredStars = ['THIEN_Y', 'SINH_KHI'];
            compatibility.avoidStars = ['TUYET_MENH'];
            break;
            
        case 'health':
            // Health benefits from balance, avoid Tuyệt Mệnh, Ngũ Quỷ
            compatibility.desiredStars = ['SINH_KHI'];
            compatibility.avoidStars = ['TUYET_MENH', 'NGU_QUY'];
            break;
            
        default:
            // General purpose
            compatibility.desiredStars = ['SINH_KHI', 'THIEN_Y'];
            compatibility.avoidStars = ['HOA_HAI', 'TUYET_MENH'];
    }
    
    // Calculate compatibility score
    let score = 50; // Start neutral
    
    // Check for desired stars
    for (const star of analysis.starSequence) {
        if (compatibility.desiredStars.includes(star.star)) {
            score += star.energyLevel * 5;
            compatibility.strengths.push(`Có sao ${star.name} (${star.originalPair}) hỗ trợ cho ${targetType}`);
        }
        
        if (compatibility.avoidStars.includes(star.star)) {
            score -= star.energyLevel * 5;
            compatibility.weaknesses.push(`Có sao ${star.name} (${star.originalPair}) không tốt cho ${targetType}`);
        }
    }
    
    // Check for specific combinations
    for (const combo of analysis.keyCombinations || []) {
        if (targetType === 'business' && combo.type === 'CAREER') {
            score += 10;
            compatibility.strengths.push(`Có tổ hợp nghề nghiệp ${combo.value}: ${combo.description}`);
        }
        
        if (targetType === 'wealth' && combo.type === 'WEALTH') {
            score += 10;
            compatibility.strengths.push(`Có tổ hợp tài lộc ${combo.value}: ${combo.description}`);
        }
        
        if (targetType === 'romance' && combo.type === 'MARRIAGE') {
            // Check if it's positive marriage energy
            if (combo.code === 'CHINH_DAO_HOA') {
                score += 10;
                compatibility.strengths.push(`Có tổ hợp tình duyên tốt ${combo.value}: ${combo.description}`);
            } else {
                score -= 10;
                compatibility.weaknesses.push(`Có tổ hợp tình duyên không thuận ${combo.value}: ${combo.description}`);
            }
        }
    }
    
    // Check special last 3 digits for specific applications
    if (analysis.specialLast3 && analysis.specialLast3.isSpecial) {
        if (targetType === 'romance' && analysis.specialLast3.description.includes('tình cảm ngầm')) {
            score -= 15;
            compatibility.weaknesses.push('Ba số cuối có nghĩa tình cảm ngầm, không tốt cho tình duyên chính thức');
        }
    }
    
    // Adjust for overall energy balance
    if (analysis.balance === 'BALANCED') {
        score += 10;
        compatibility.strengths.push('Cân bằng tốt giữa năng lượng cát hung');
    } else if (analysis.balance === 'CAT_HEAVY') {
        score += 5;
        compatibility.strengths.push('Thiên về năng lượng tốt, nhưng có thể thiếu thử thách để phát triển');
    } else if (analysis.balance === 'HUNG_HEAVY') {
        score -= 15;
        compatibility.weaknesses.push('Quá nhiều năng lượng tiêu cực, có thể gặp nhiều khó khăn');
    }
    
    // Special handling for digit 0 - usually negative
    if (analysis.zeroCount > 0) {
        score -= analysis.zeroCount * 3;
        compatibility.weaknesses.push(`Có ${analysis.zeroCount} số 0 làm giảm năng lượng`);
    }
    
    // Special handling for digit 5 - usually positive
    if (analysis.fiveCount > 0) {
        score += analysis.fiveCount * 2;
        compatibility.strengths.push(`Có ${analysis.fiveCount} số 5 tăng cường năng lượng`);
    }
    
    // Ensure score is within 0-100 range
    compatibility.score = Math.max(0, Math.min(100, score));
    
    // Determine compatibility level
    if (compatibility.score >= 80) {
        compatibility.level = 'Rất Tốt';
        compatibility.description = `Số điện thoại này rất phù hợp cho ${targetType}`;
    } else if (compatibility.score >= 65) {
        compatibility.level = 'Tốt';
        compatibility.description = `Số điện thoại này phù hợp cho ${targetType}`;
    } else if (compatibility.score >= 50) {
        compatibility.level = 'Trung Bình';
        compatibility.description = `Số điện thoại này có thể dùng cho ${targetType} nhưng không đặc biệt tốt`;
    } else if (compatibility.score >= 35) {
        compatibility.level = 'Thấp';
        compatibility.description = `Số điện thoại này không thật sự phù hợp cho ${targetType}`;
    } else {
        compatibility.level = 'Kém';
        compatibility.description = `Số điện thoại này không nên dùng cho ${targetType}`;
    }
    
    return compatibility;
};
