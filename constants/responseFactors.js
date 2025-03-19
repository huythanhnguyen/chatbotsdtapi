// Hệ số trọng số phân tích 
const responseFactors = {
    // Hệ số ảnh hưởng theo vị trí
    POSITION_WEIGHTS: {
        START: 1.0,    // Vị trí đầu (1-3)
        MIDDLE: 1.0,   // Vị trí giữa (4-7)
        END: 1.5       // Vị trí cuối (8-10)
    },
    
    // Hệ số ảnh hưởng theo độ tuổi người dùng
    AGE_WEIGHTS: {
        UNDER_25: [1.0, 1.0, 1.5],  // [đầu, giữa, cuối]
        AGE_25_40: [1.0, 1.0, 1.5],  // Người trưởng thành: hiện tại quan trọng nhất
        OVER_40: [1.0, 1.0, 1.5]     // Người lớn tuổi: tương lai quan trọng hơn
    },
    
    // Hệ số ảnh hưởng theo thời gian dùng số điện thoại
    USAGE_WEIGHTS: {
        UNDER_1: 1,    // Dưới 1 năm
        AGE_1_3: 1.5,  // 1-3 năm
        OVER_3: 2      // Trên 3 năm
    },
    
    // Ngưỡng "Ứng Nghiệm"
    THRESHOLDS: {
        VERY_HIGH: 0.8,
        HIGH: 0.6,
        MODERATE: 0.4,
        LOW: 0.2
    },
    
    // Hệ số ảnh hưởng dựa trên feedback người dùng
    FEEDBACK_WEIGHT: 0.15, // Mỗi lượt like/dislike ảnh hưởng 15%
    
    // Hệ số ứng nghiệm cho từng sao
    STAR_RESPONSE_FACTORS: {
        // Các sao cát
        "SINH_KHI": 1.0,    // Sinh Khí có xu hướng thể hiện rõ trong thực tế
        "THIEN_Y": 1.0,     // Thiên Y thể hiện khá rõ
        "DIEN_NIEN": 1.0,   // Diên Niên thể hiện rõ trong công việc
        "PHUC_VI": 1.0,     // Phục Vị ít thể hiện hơn
        
        // Các sao hung
        "HOA_HAI": 1.0,     // Họa Hại thể hiện khá rõ
        "LUC_SAT": 1.0,     // Lục Sát thể hiện rõ trong quan hệ
        "NGU_QUY": 1.0,     // Ngũ Quỷ thể hiện ít rõ ràng hơn
        "TUYET_MENH": 1.0   // Tuyệt Mệnh thể hiện rõ trong thử thách
    },
    
    // Hệ số ứng nghiệm cho các tổ hợp đặc biệt
    SPECIAL_PATTERN_RESPONSE: {
        "608": 1.0,  // Tổ hợp "tình cảm ngầm" thể hiện rất rõ
        "413": 1.0,  // "Quý nhân trợ giúp" thể hiện rõ
        // Các mẫu đặc biệt khác...
    }
};
module.exports = responseFactors;