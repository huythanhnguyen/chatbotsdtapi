const COMBINATION_INTERPRETATIONS = {
    // Các tổ hợp sao với nhau
    STAR_PAIRS: {
        // Kết hợp giữa các sao Cát
        "DIEN_NIEN_SINH_KHI": {
            stars: ["DIEN_NIEN", "SINH_KHI"],
            description: "Sự nghiệp vững chắc, có quý nhân dẫn dắt, công việc thuận lợi và phát triển."
        },
        "DIEN_NIEN_THIEN_Y": {
            stars: ["DIEN_NIEN", "THIEN_Y"],
            description: "Tiền tài dồi dào, công việc ổn định, xây dựng được nguồn thu nhập bền vững."
        },
        "SINH_KHI_THIEN_Y": {
            stars: ["SINH_KHI", "THIEN_Y"],
            description: "Quý nhân trợ giúp, tài lộc hanh thông, được người khác quý mến và giúp đỡ."
        },
        
        // Kết hợp giữa Cát và Hung
        "DIEN_NIEN_HOA_HAI": {
            stars: ["DIEN_NIEN", "HOA_HAI"],
            description: "Có khả năng chuyên môn tốt nhưng dễ tiêu tiền, nói nhiều, nên tập trung vào chất lượng."
        },
        "DIEN_NIEN_LUC_SAT": {
            stars: ["DIEN_NIEN", "LUC_SAT"],
            description: "Thích hợp làm việc trong ngành dịch vụ, quan hệ khách hàng tốt, nhưng dễ bị lợi dụng."
        },
        "DIEN_NIEN_NGU_QUY": {
            stars: ["DIEN_NIEN", "NGU_QUY"],
            description: "Chuyên môn tốt nhưng tư duy không ổn định, dễ thay đổi công việc hoặc phương hướng."
        },
        "DIEN_NIEN_TUYET_MENH": {
            stars: ["DIEN_NIEN", "TUYET_MENH"],
            description: "Có năng lực chuyên môn nhưng phải nỗ lực nhiều, dốc sức làm việc."
        },
        "HOA_HAI_SINH_KHI": {
            stars: ["HOA_HAI", "SINH_KHI"],
            description: "Gặp quý nhân nhưng dễ mất tiền, thu nhập cao nhưng chi tiêu lớn."
        },
        "HOA_HAI_THIEN_Y": {
            stars: ["HOA_HAI", "THIEN_Y"],
            description: "Tài lộc tốt nhưng dễ hao tiền, mọi người thích giao du nhưng tốn kém."
        },
        "LUC_SAT_SINH_KHI": {
            stars: ["LUC_SAT", "SINH_KHI"],
            description: "Được giúp đỡ trong lĩnh vực dịch vụ, quan hệ xã hội tốt nhưng cẩn thận người không tốt."
        },
        "LUC_SAT_THIEN_Y": {
            stars: ["LUC_SAT", "THIEN_Y"],
            description: "Kiếm tiền tốt trong lĩnh vực dịch vụ, tình cảm tốt nhưng phải cẩn thận với mối quan hệ."
        },
        "NGU_QUY_SINH_KHI": {
            stars: ["NGU_QUY", "SINH_KHI"],
            description: "Có quý nhân nhưng tư duy không ổn định, dễ thay đổi, nên cẩn trọng với quyết định."
        },
        "NGU_QUY_THIEN_Y": {
            stars: ["NGU_QUY", "THIEN_Y"],
            description: "Có tài chính nhưng không ổn định, tư duy hay thay đổi, dễ đầu tư mạo hiểm."
        },
        "SINH_KHI_TUYET_MENH": {
            stars: ["SINH_KHI", "TUYET_MENH"],
            description: "Gặp quý nhân trong lúc khó khăn, được giúp đỡ nhưng phải nỗ lực nhiều."
        },
        "THIEN_Y_TUYET_MENH": {
            stars: ["THIEN_Y", "TUYET_MENH"],
            description: "Tiền bạc dễ đến nhưng cũng dễ mất, đầu tư nhiều nhưng phải cẩn trọng."
        },
        
        // Kết hợp giữa các sao Hung
        "HOA_HAI_LUC_SAT": {
            stars: ["HOA_HAI", "LUC_SAT"],
            description: "Hao tiền trong các mối quan hệ xã hội, chi tiêu nhiều cho giao tiếp, quan hệ."
        },
        "HOA_HAI_NGU_QUY": {
            stars: ["HOA_HAI", "NGU_QUY"],
            description: "Tư duy không ổn định và hay nói nhiều, dễ phát ngôn bừa bãi gây rắc rối."
        },
        "HOA_HAI_TUYET_MENH": {
            stars: ["HOA_HAI", "TUYET_MENH"],
            description: "Chi tiêu lớn và liều lĩnh, dễ mạo hiểm trong tài chính dẫn đến mất mát."
        },
        "LUC_SAT_NGU_QUY": {
            stars: ["LUC_SAT", "NGU_QUY"],
            description: "Đào hoa nát, dễ có mối quan hệ không rõ ràng, tình cảm phức tạp."
        },
        "LUC_SAT_TUYET_MENH": {
            stars: ["LUC_SAT", "TUYET_MENH"],
            description: "Mối quan hệ xã hội tốn kém, phải nỗ lực nhiều trong giao tiếp nhưng ít kết quả."
        },
        "NGU_QUY_TUYET_MENH": {
            stars: ["NGU_QUY", "TUYET_MENH"],
            description: "Tư duy bất ổn và liều lĩnh, dễ đưa ra quyết định sai lầm, gây hậu quả nghiêm trọng."
        }
    },
    
    // Các tổ hợp 3 số đặc biệt
    THREE_DIGIT_PATTERNS: {
        // Tổ hợp về tài vận
        WEALTH_CODES: {
            "QUY_NHAN_TRO_GIUP": {
                codes: ["931", "413"],
                description: "Quý nhân trợ giúp",
                detailedDescription: "Thông qua quý nhân mà mang tiền tài đến, nhờ quý nhân mà có cơ hội kiếm tiền, phát tài. Có hiện tượng kết hôn, có tình cảm, hạnh phúc."
            },
            "CHUYEN_NGHIEP": {
                codes: ["913", "431"],
                description: "Chuyên nghiệp công việc",
                detailedDescription: "Công việc năng lực bình thường lại đem lại nhiều tiền, công việc đem lại nhiều may mắn. Tự mình làm chủ, tự lập nghiệp, số tiền kiếm được cũng rất tốt và công việc tương đối vất vả."
            },
            "NGANH_DICH_VU": {
                codes: ["613", "749"],
                description: "Ngành dịch vụ",
                detailedDescription: "Thông qua ngành dịch vụ, công việc tỉ mỉ, có thể là phạm vi lớn để kiếm tiền lớn. Hoặc thông qua ngành dịch vụ, công việc tỉ mỉ lớn, quy mô lớn nhưng kiếm tiền vừa đủ hoặc nhỏ so với quy mô."
            },
            "LAY_MIENG_NGHIEP": {
                codes: ["231", "713"],
                description: "Lấy miệng là nghiệp",
                detailedDescription: "Thông qua tài ăn nói hùng biện hay và khéo léo để kiếm số tiền lớn. Phù hợp với công việc yêu cầu giao tiếp và thuyết trình."
            },
            "TAI_HOA_TRI_TUE": {
                codes: ["813", "368"],
                description: "Tài hoa trí tuệ",
                detailedDescription: "Thông qua ý tưởng tài hoa, tài năng hơn người mà kiếm tiền, công việc cần sự linh hoạt động não, thông minh sáng tạo, kiếm được khoản tiền lớn. Phát tài nhanh chóng, nhưng cần lưu ý tính hợp pháp và đạo đức."
            },
            "NO_LUC_PHAN_DAU": {
                codes: ["213", "968"],
                description: "Nỗ lực phấn đấu",
                detailedDescription: "Thông qua sự cố gắng, nỗ lực bản thân lớn để kiếm ra số tiền lớn. Đầu tư để kiếm tiền. Đầu tư lớn nhận được kết quả cũng thắng lớn. Người làm đại sự, càng làm càng có tiền."
            }
        },
        
        // Tổ hợp về sự nghiệp
        CAREER_CODES: {
            "QUY_NHAN_CONG_VIEC": {
                codes: ["419", "678"],
                description: "Quý nhân mang đến công việc",
                detailedDescription: "Thông qua quý nhân đem công việc tốt đến. Sẽ làm lãnh đạo hoặc thầy giáo, học hành tốt, thăng quan, cường thế. Được quý nhân nâng đỡ, tương trợ. Có thể là chủ quản đơn vị. Năng lực cao, được quý nhân công nhận."
            },
            "KIEM_TIEN_TOT": {
                codes: ["319", "134"],
                description: "Kiếm tiền công việc tốt",
                detailedDescription: "Số 134, 319, 687, 862 là kiếm tiền từ công việc tốt nhất, gặp nhiều may mắn và cơ hội tiền bạc trong công việc, công việc đem lại tiền bạc lâu bền và nhiều, kiếm tiền rất tốt."
            },
            "DICH_VU": {
                codes: ["619", "743"],
                description: "Công việc ngành dịch vụ",
                detailedDescription: "Làm công tác hành chính hợp phục vụ, sẽ xử lý tốt quan hệ với nữ nhân và mối quan hệ xã hội. Phù hợp với ngành dịch vụ cần giao tiếp."
            },
            "MIENG_LA_NGHIEP": {
                codes: ["719", "987"],
                description: "Công việc lấy miệng là nghiệp",
                detailedDescription: "Có năng lực ăn nói trong công việc, năng lực và ăn nói đều tốt, chủ yếu công việc liên quan đến ăn nói. Phù hợp làm giáo viên, MC, diễn giả, công việc cần giao tiếp."
            },
            "TAI_HOA_TRI_OC": {
                codes: ["819", "978"],
                description: "Công việc tài hoa trí óc",
                detailedDescription: "Công việc cần cường độ linh hoạt của não, có lý tưởng và khát vọng, rất giỏi phát hiện những điều người khác không thấy. Thường làm việc rất vất vả, cày đêm, dưa vào năng lực bản thân để lên chức vị. Có thể là công việc làm việc với nước ngoài."
            },
            "CHAY_BEN_NGOAI": {
                codes: ["219", "691"],
                description: "Công việc bên ngoài chạy phấn đấu",
                detailedDescription: "Rất cố gắng, rất phấn đấu, nếu làm thuê rất dễ được đề bạt và thăng tiến. Đối với kinh doanh, đầu tư mở rộng quy mô, sự nghiệp lên bổng xuống trầm. Công việc cần lá gan lớn, sự mạnh mẽ liều lĩnh, liên quan đến đầu tư quản lý tài sản."
            }
        },
        
        // Tổ hợp về tình duyên
        MARRIAGE_CODES: {
            "CHINH_DAO_HOA": {
                description: "Chính Đào Hoa (chính hôn nhân)",
                codes: ["413", "768", "131", "686"],
                detailedDescription: "Có nhiều bằng hữu bạn bè thân tín, hôn nhân, đoạn hôn nhân này lại vô cùng vui vẻ tốt đẹp. Có hiện tượng kết hôn, tình cảm ân ái, ngọt ngào và lãng mạn."
            },
            "THIEN_DAO_HOA": {
                description: "Thiên Đào Hoa (bất lợi hôn nhân)",
                codes: ["618", "816", "108", "318"],
                detailedDescription: "Hôn nhân không thuận, tình duyên trắc trở, ly hôn. Cảm xúc biến hoá vô hạn, luôn luôn không cảm giác an toàn. Có thể có tình cảm ngầm, tình ngoài giá thú, tình tay ba."
            }
        }
    },
    
    // Tổ hợp từ LAST_THREE_COMBINATIONS
    SPECIFIC_COMBINATIONS: {
        // Ngũ quỷ + Thiên y
        "NGU_QUY_THIEN_Y": {
            code: "NGU_QUY_THIEN_Y",
            stars: ["NGU_QUY", "THIEN_Y"],
            numbers: ["813", "186", "794", "972", "631", "368", "249", "427"],
            description: "Ngũ quỷ biến hóa đa đoan, ý tưởng nhiều, có tính đột phát, thức đêm, tim không tốt. Thiên y là tài phú và hôn nhân.",
            detailedDescription: [
                "Chưa lập gia đình dễ xuất hiện hiện tượng kết hôn rất nhanh, đột ngột.",
                "Ngũ quỷ vận tài, nhanh chóng phát tài, tiền gì cũng kiếm, tiền gì cũng dám kiếm.",
                "Thường sinh ra bệnh nhà giàu, như bệnh tim, tắc mạch máu tim.",
                "Thường là dựa vào kiến thức mà kiếm tiền, ví dụ như làm kế hoạch.",
                "Thường hay tăng ca, thức đêm, thích hợp các việc liên quan đến internet."
            ]
        },
        
        // Ngũ quỷ + Diên niên
        "NGU_QUY_DIEN_NIEN": {
            code: "NGU_QUY_DIEN_NIEN",
            stars: ["NGU_QUY", "DIEN_NIEN"],
            numbers: ["819", "187", "791", "978", "634", "362", "243", "426"],
            description: "Ngũ quỷ biến hóa đa đoan, ý tưởng nhiều, có tính đột phát, thức đêm, tim không tốt. Diên niên là trách nhiệm, lực lãnh đạo, quyền uy, vất vả.",
            detailedDescription: [
                "Giỏi về phát hiện sự vật người khác không cách nào dự báo, có thể biến ý nghĩ thành sự thật.",
                "Thường vất vả hơn nhiều so với một Ngũ quỷ hoặc Diên niên, quanh năm suốt tháng thức đêm làm việc.",
                "Thường phát bệnh tim, đột tử. Có nguy cơ đột tử trong quán net hoặc khi tăng ca.",
                "Dựa vào bản thân để thượng vị, đạt vị trí lãnh đạo."
            ]
        },
        
        // Ngũ quỷ + Ngũ quỷ
        "NGU_QUY_NGU_QUY": {
            code: "NGU_QUY_NGU_QUY",
            stars: ["NGU_QUY", "NGU_QUY"],
            numbers: ["181", "818", "797", "979", "363", "636", "242", "424", "187", "798", "813", "361", "247", "792", "367", "793", "814", "418", "879", "897", "836", "863", "824", "842", "916", "619", "736", "637", "942", "249"],
            description: "Ngũ quỷ biến hóa đa đoan, ý tưởng nhiều, thức đêm, bệnh tim.",
            detailedDescription: [
                "Rất khôn khéo, thích tính toán người khác, nhưng vì quá thông minh, ngược lại thường bắt không được cơ hội.",
                "Thường đầu tư thất bại, hạng mục bỏ dở nửa chừng.",
                "Hôn nhân hay thay đổi, đa nghi, thường xuyên thức đêm hoặc sống về đêm, dễ dẫn đến ly hôn.",
                "Ảnh hưởng tim, bệnh tim. Bị quỷ phụ thân, hành vi khó hiểu.",
                "Tiền tài tiêu không thể hiểu, chỉ tiêu nhiều, phá tài trong nháy mắt, nợ nhiều."
            ]
        },
        
        // Họa hại + Ngũ quỷ
        "HOA_HAI_NGU_QUY": {
            code: "HOA_HAI_NGU_QUY",
            stars: ["HOA_HAI", "NGU_QUY"],
            numbers: ["718", "179", "981", "897", "463", "642", "236"],
            description: "Họa hại là nói chuyện, mạnh miệng, thích sĩ diện. Ngũ quỷ là đa nghi, nhạy cảm, biến hóa đa đoan.",
            detailedDescription: [
                "Nói đặc biệt nhiều, lý do đặc biệt nhiều, luôn có thể tìm tới lý do để phản bác, chất vấn.",
                "Không cần thiết lãng phí thời gian thuyết phục họ, dù nói thẳng họ, cũng là ngoài thắng mà trong thì thua."
            ]
        },
        
        // Tuyệt mệnh + Ngũ quỷ
        "TUYET_MENH_NGU_QUY": {
            code: "TUYET_MENH_NGU_QUY",
            stars: ["TUYET_MENH", "NGU_QUY"],
            numbers: ["124", "218", "697", "963", "842", "481", "379", "736"],
            description: "Tuyệt mệnh là cực đoan, tuyệt đối hóa, xung động, đầu tư. Ngũ quỷ là đa nghi, nhạy cảm, biến hóa đa đoan.",
            detailedDescription: [
                "Tài vận: Nỗ lực liều lĩnh, thông minh phản ứng nhanh, thích đầu tư, dễ xuất tiền phá tài.",
                "Tình cảm: Dũng cảm truy cầu, kinh hỉ và kinh hãi cùng tồn tại, tình cảm dễ lung lay.",
                "Sức khỏe: Chú ý gan mật, thận, dễ đột phát bệnh tim ngoài ý muốn."
            ]
        },
        
        // Tuyệt mệnh + Diên niên
        "TUYET_MENH_DIEN_NIEN": {
            code: "TUYET_MENH_DIEN_NIEN",
            stars: ["TUYET_MENH", "DIEN_NIEN"],
            numbers: ["219", "691", "487", "734", "378", "962", "843"],
            description: "Tuyệt mệnh là cực đoan, tuyệt đối hóa, xung động, đầu tư. Diên niên là lãnh đạo, quyền uy, chú ý sự nghiệp, nỗ lực vất vả.",
            detailedDescription: [
                "Rất cố gắng, rất phấn đấu, nếu làm thuê rất dễ được đề bạt và thăng tiến.",
                "Đối với kinh doanh, đầu tư mở rộng quy mô, sự nghiệp lên bổng xuống trầm.",
                "Nếu là nữ đã có chồng, đây là âm dương sai chỗ, vừa khổ vừa mệt, trả giá nhiều hồi báo ít.",
                "Dùng mười năm trở lên đa số là ly hôn, hôn nhân không hạnh phúc."
            ]
        },
        
        // Tuyệt mệnh + Sinh khí
        "TUYET_MENH_SINH_KHI": {
            code: "TUYET_MENH_SINH_KHI",
            stars: ["TUYET_MENH", "SINH_KHI"],
            numbers: ["214", "967", "482", "376", "739", "693", "128", "841"],
            description: "Tuyệt mệnh là cực đoan, tuyệt đối hóa, xung động, đầu tư. Sinh khí là cát tinh, là vui vẻ, sảng khoái, thỏa mãn.",
            detailedDescription: [
                "Đầu tư rất vui vẻ, hưởng thụ quá trình này.",
                "Tiền vui vẻ cho bạn bè vay, bạn bè nhận trợ giúp khiến mình rất hài lòng.",
                "Tuyệt mệnh nặng nghĩa khí, Sinh khí nhiều bạn bè, thường tập hợp ăn uống, dạ dày thường có vấn đề."
            ]
        },
        
        // Họa hại + Lục Sát
        "HOA_HAI_LUC_SAT": {
            code: "HOA_HAI_LUC_SAT",
            stars: ["HOA_HAI", "LUC_SAT"],
            numbers: ["716", "174", "983", "892", "461", "647", "238", "329"],
            description: "Họa hại là nói chuyện, phàn nàn, cãi lộn, sĩ diện. Lục Sát là phiền muộn không vui.",
            detailedDescription: [
                "Thường cảm thấy hối hận về ngôn ngữ hành vi của chính mình, không cẩn thận nói nhầm, dẫn đến hối hận.",
                "Cực kỳ coi trọng mặt mũi, thường vì sĩ diện mà phá tài, nhưng lại không có ý đòi lại.",
                "Nói năng chua ngoa nhưng tấm lòng như đậu hũ, hảo tâm giúp chuyện xấu.",
                "Phiền lòng nhiều việc, gặp người không tử tế, dẫn đến phàn nàn không vui. Loại hình này thường nóng tính, dạ dày không tốt."
            ]
        },
        
        // Sinh khí + Lục Sát
        "SINH_KHI_LUC_SAT": {
            code: "SINH_KHI_LUC_SAT",
            stars: ["SINH_KHI", "LUC_SAT"],
            numbers: ["829", "674", "938"],
            description: "Sinh khí là bằng hữu nhiều, nhiều quý nhân, vui vẻ. Lục sát là người khác phái, không vui, phiền muộn, hối hận.",
            detailedDescription: [
                "Từ tin tức rất vui vẻ đến không vui, bằng hữu biến cừu nhân, trở mặt thành thù.",
                "Bị bằng hữu lừa gạt, bị thua thiệt, vì bạn mà phiền não.",
                "Bằng hữu khác phái biến tình nhân..."
            ]
        },
        
        // Tuyệt mệnh + Lục Sát
        "TUYET_MENH_LUC_SAT": {
            code: "TUYET_MENH_LUC_SAT",
            stars: ["TUYET_MENH", "LUC_SAT"],
            numbers: [],
            description: "Tuyệt mệnh là gấp, cực đoan, hành động mạnh, quyết đoán, đầu tư. Lục Sát là không vui, phiền muộn.",
            detailedDescription: [
                "Vì quyết định của mình mà cảm thấy hối hận, không vui.",
                "Đầu tư thất bại, mắc nợ, không vui, phiền muộn.",
                "Phát sinh xung đột với người khác, không vui, hối hận."
            ]
        },
        
        // Họa hại + Phục vị
        "HOA_HAI_PHUC_VI": {
            code: "HOA_HAI_PHUC_VI",
            stars: ["HOA_HAI", "PHUC_VI"],
            numbers: ["988", "899", "895", "985", "17", "177", "711", "175", "466", "644"],
            description: "Họa hại là nói chuyện, phàn nàn, cãi lộn, sĩ diện. Phục vị là trùng lặp, trì trệ.",
            detailedDescription: [
                "Khẩu tài rất tốt, trong gia đình thường xuyên vì việc nhỏ mà cãi nhau, lại sĩ diện.",
                "Mặc kệ đúng sai, tuyệt không nhượng bộ, nhất định phải chiếm thượng phong.",
                "Nói nhiều tất nói hớ, họa từ miệng mà ra. Thường là tranh thắng, khiến đối phương mệt mỏi."
            ]
        },
        
        // Lục Sát + Phục vị
        "LUC_SAT_PHUC_VI": {
            code: "LUC_SAT_PHUC_VI",
            stars: ["LUC_SAT", "PHUC_VI"],
            numbers: ["611", "744", "388", "299", "166", "477", "833", "922"],
            description: "Lục Sát là phiền muộn không vui. Phục vị là trùng lặp, trì trệ.",
            detailedDescription: [
                "Chỉ do dự, tiếp tục không ngừng Đào Hoa.",
                "Trong tất cả tổ hợp từ trường là 'Sợ khó' mạnh nhất, trong sự nghiệp khó đột phá.",
                "Từ chối ngay những cơ hội mới, vạch ra những khó khăn khiến việc đó khó có thể thành công.",
                "Đa sầu đa cảm, ý chí không kiên định.",
                "Đàn ông có tổ hợp từ trường này cơ hồ đều nghiện thuốc, nội tâm yếu ớt, dễ trống rỗng."
            ]
        },
        
        // Các số cuối đặc biệt
        "SPECIAL_ENDING": {
            code: "SPECIAL_ENDING",
            stars: [],
            numbers: ["608", "806", "103", "301"],
            description: "Các số cuối đặc biệt với ý nghĩa quan trọng.",
            detailedDescription: [
                "Tình cảm ngầm: xuất hiện tình cảm ngầm, tình ngoài giá thú, tình tay ba."
            ]
        }
    },
    
    // Ảnh hưởng đặc biệt của số 0 và 5
    SPECIAL_DIGIT_EFFECTS: {

    }
};
module.exports = COMBINATION_INTERPRETATIONS;