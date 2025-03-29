const COMBINATION_INTERPRETATIONS = {
    // Các tổ hợp sao với nhau
    STAR_PAIRS: {
        
        // Các sao khác với Sinh Khí
        "SINH_KHI_SINH_KHI": {
            stars: ["SINH_KHI", "SINH_KHI"],
            description: "tập hợp tăng cường năng lượng quý nhân",
            detailedDescription: [
                "Thường lạc quan, cởi mở, linh hoạt và dễ kết bạn.",
                "Nhận được sự giúp đỡ khi gặp khó khăn, được nhiều người mong muốn vì sự tích cực, dễ hòa đồng và mang lại điều tốt đẹp cho người xung",
                "lý trí, khách quan và bình tĩnh trong hành động.",
                "Quá nhiều năng lượng Sinh Khí có thể dẫn đến thiếu quyết đoán, động lực và gây ra sự lười biếng.",
            ],
        },
        "THIEN_Y_SINH_KHI": {
            stars: ["THIEN_Y", "SINH_KHI"],
            description: "Quý nhân trợ giúp, tài lộc hanh thông, được người khác quý mến và giúp đỡ.",
        },
        "DIEN_NIEN_SINH_KHI": {
            stars: ["DIEN_NIEN", "SINH_KHI"],
            description: "Sự nghiệp vững chắc, có quý nhân dẫn dắt, công việc thuận lợi và phát triển."
        },
        "PHUC_VI_SINH_KHI": {
            stars: ["PHUC_VI", "SINH_KHI"],
            description: "Phục Vị, chờ đợi và giữ nguyên vị trí, với Sinh Khí, tượng trưng cho người yêu đời, lạc quan và không vội vã, tạo ra người có xu hướng lười biếng, không nhiều tham vọng và thích sống hạnh phúc",
            detailedDescription: [
            "thường ở trạng thái thụ động, có thể đang chờ đợi sự giúp đỡ từ người khác. Tuy nhiên, tính cách lạc quan và vui vẻ của Sinh Khí giúp họ dễ kết bạn và gặp được quý nhân phù trợ."
            ]
        },
        "HOA_HAI_SINH_KHI": {
            stars: ["HOA_HAI", "SINH_KHI"],
            description: "Gặp quý nhân nhưng dễ mất tiền, thu nhập cao nhưng chi tiêu lớn."
        },
        "LUC_SAT_SINH_KHI": {
            stars: ["LUC_SAT", "SINH_KHI"],
            description: "Được giúp đỡ trong lĩnh vực dịch vụ, quan hệ xã hội tốt nhưng cẩn thận người không tốt."
        },
        "NGU_QUY_SINH_KHI": {
            stars: ["NGU_QUY", "SINH_KHI"],
            description: "Có quý nhân nhưng tư duy không ổn định, dễ thay đổi, nên cẩn trọng với quyết định."
        },
        "TUYET_MENH_SINH_KHI": {
            stars: ["TUYET_MENH", "SINH_KHI"],
            description: "Gặp quý nhân trong lúc khó khăn, được giúp đỡ nhưng phải nỗ lực nhiều."
        },
    
        // Các sao khác với Thiên Y
        "SINH_KHI_THIEN_Y": {
            stars: ["SINH_KHI", "THIEN_Y"],
            description: "Quý nhân trợ giúp, tài lộc hanh thông, được người khác quý mến và giúp đỡ.",
            detailedDescription: [
                "Thiên Y tượng trưng cho nguồn tiên, Sinh Khí cũng có nghĩa là Quý nhân",
                "nên có thể hiểu là Về mặt tài lộc thì có cao nhân giúp đỡ", 
                "nên tổng số được Thiên Y và  Sinh Khí bảo vệ, bạn không cần phải lo lắng quá nhiều về tài lộc.",
            ]
        },
        "THIEN_Y_THIEN_Y": {
            stars: ["THIEN_Y", "THIEN_Y"],
            description: "tụ tập tăng cường năng lượng tài phú, hiện tượng hôn nhân.",
            detailedDescription: [
                "Đặc điểm chính của từ trường này là sự giàu có tích cực",
                "là người rộng lượng, không thù dai, có tư tưởng rộng rãi và sẽ không quan tâm những vấn đề tầm thường",
                "Trong giao tiếp giữa các cá nhân, dễ xúc động, quá tốt bụng nên dễ bị tổn thương;",
                "Không thiếu tiền nên không quan tâm đến tiền lắm, nếu không chú tâm sẽ bỏ lỡ cơ hội kiếm tiền.",
                "Người có từ trường Thiên Y giỏi quan hệ, đào hoa tích cực",
                "đường tình duyên của họ suôn sẻ hơn, gặp được bạn đời sẽ không khó, sẽ gặp được nhiều người phù hợp.",
                "Vì đặc điểm này của đào hoa mạnh mẽ, mọi mối quan hệ đều sẽ ngọt ngào và tươi đẹp",
                "nhưng cũng cần lưu ý không nên có nhiều từ trường Thiên Y trong dãy số, nếu không sẽ dễ xảy ra nhiều cuộc hôn nhân.",
            ]
        },
        "DIEN_NIEN_THIEN_Y": {
            stars: ["DIEN_NIEN", "THIEN_Y"],
            description: "Tiền tài dồi dào, công việc ổn định, xây dựng được nguồn thu nhập bền vững."
        },
        "PHUC_VI_THIEN_Y": {
            stars: ["PHUC_VI", "THIEN_Y"],
            description: "Thông qua kiên nhẫn kiên trì mà tạo ra tài phú",
            detailedDescription:[
               "Phục Vị có ý nghĩa tiếp tục và tiếp tục năng lượng của từ trường trước đó" , 
               "vì vậy trong sự kết hợp giữa Phục vị và Thiên Y , việc phân tích chủ yếu phụ thuộc vào từ trường trước đó là gì" 
            ]
        },
        "HOA_HAI_THIEN_Y": {
            stars: ["HOA_HAI", "THIEN_Y"],
            description: "Thông qua ăn nói mà kiếm tiền. ăn nói lưu loát, có tài hùng biện và có thể kiếm tiền nhờ tài ăn nói của mình."
        },
        "LUC_SAT_THIEN_Y": {
            stars: ["LUC_SAT", "THIEN_Y"],
            description: "Kiếm tiền tốt trong lĩnh vực dịch vụ, tình cảm tốt nhưng phải cẩn thận với mối quan hệ."
        },
        "NGU_QUY_THIEN_Y": {
            stars: ["NGU_QUY", "THIEN_Y"],
            description: "Dùng sự thay đổi, sáng tạo và những ý tưởng mới để kiếm tiền. Có tài chính nhưng không ổn định, tư duy hay thay đổi, dễ đầu tư mạo hiểm."
        },
        "TUYET_MENH_THIEN_Y": {
            stars: ["TUYET_MENH", "THIEN_Y"],
            description: "Thông qua đầu tư mạo hiểm mà kiếm tiền.Tiền bạc dễ đến nhưng cũng dễ mất, đầu tư nhiều nhưng phải cẩn trọng.",
            detailedDescription:["dùng trí tuệ và sự quyết đoán để kiếm tiền.",
                    "Những người có sự kết hợp này thường rất thông minh, nhạy bén, có khả năng phân tích và đưa ra quyết định nhanh chóng.",
                    " Họ thường thích hợp với những công việc mang tính thách thức và có yếu tố cạnh tranh cao.",
                "Tuy nhiên, cũng có nghĩa là dễ gặp phải những rủi ro và thất bại trong đầu tư.",
                    "Cần phải có sự cân nhắc kỹ lưỡng và lên kế hoạch cụ thể trước khi đưa ra bất kỳ quyết định nào đến tiền bạc.",
                "Về mặt sức khỏe, Tuyệt Mệnh có thể ảnh hưởng đến hệ thống xương khớp và các vấn đề liên quan đến tai nạn bất ngờ.",
                " chú ý bảo vệ sức khỏe và tránh những hoạt động nguy hiểm.",
                ]
        },
    
        // Các sao khác với Diên Niên
        "SINH_KHI_DIEN_NIEN": {
            stars: ["SINH_KHI", "DIEN_NIEN"], 
            description: "Sự nghiệp vững chắc, có quý nhân dẫn dắt, công việc thuận lợi và phát triển.",
        },
        "THIEN_Y_DIEN_NIEN": {
            stars: ["THIEN_Y", "DIEN_NIEN"],
            description: "Tiền tài dồi dào, công việc ổn định, xây dựng được nguồn thu nhập bền vững.",
        },
        "DIEN_NIEN_DIEN_NIEN": {
            stars: ["DIEN_NIEN", "DIEN_NIEN"],
            description: "Sự kết hợp hai lần Diên Niên có thể chỉ ra người có nhiều công việc hoặc nguồn thu nhập, đồng thời bướng bỉnh, không thích nghe lời khuyên nhưng giỏi quản lý tiền bạc.",
            detailedDescription: [
                "người chuyên nghiệp, có năng lực lãnh đạo và yêu cầu cao với bản thân,có tinh thần trách nhiệm cao ",
                "dễ làm việc quá sức và gặp các vấn đề về sức khỏe như đau vai, cổ, mất ngủ.",
                "Ở phụ nữ, năng lượng Diên Niên mạnh có thể tạo ra áp lực lên chồng và ảnh hưởng đến hôn nhân, trừ khi người chồng bao dung.",
                " không biết lắng nghe ý kiến của người khác . Vì vậy , khả năng thích ứng của họ nhìn chung không mạnh lắm" , 
                "vì vậy những người có nghề nghiệp đòi hỏi sự linh hoạt cần lưu ý tránh sử dụng từ trường Diên Niên quá nhiều "
            ]
        },
        "PHUC_VI_DIEN_NIEN": {
            stars: ["PHUC_VI", "DIEN_NIEN"],
            description: "Sự kết hợp giữa Phục Vị và Diên Niên tạo ra người thận trọng nhưng luôn cố gắng hoàn hảo trong công việc",
            detailedDescription :[
                "Họ là người làm việc chăm chỉ, có trách nhiệm và luôn nỗ lực để đạt được sự hoàn hảo trong mọi việc. ",
                "Về mặt tình cảm, họ chân thành và hết lòng với đối phương nhưng dễ bị tổn thương, đồng thời có thể gặp mâu thuẫn trong hôn nhân nếu không hòa hợp.",
                "nhiều căng thẳng và các vấn đề sức khỏe liên quan đến vai, cổ, lưng dưới và giấc ngủ"
            ]
        },
        "HOA_HAI_DIEN_NIEN": {
            stars: ["HOA_HAI", "DIEN_NIEN"],
            description: "Có khả năng chuyên môn tốt nhưng dễ tiêu tiền, nói nhiều, nên tập trung vào chất lượng."
        },
        "LUC_SAT_DIEN_NIEN": {
            stars: ["LUC_SAT", "DIEN_NIEN"],
            description: "Thích hợp làm việc trong ngành dịch vụ, quan hệ khách hàng tốt, nhưng dễ bị lợi dụng."
        },
        "NGU_QUY_DIEN_NIEN": {
            stars: ["NGU_QUY", "DIEN_NIEN"],
            description: "Chuyên môn tốt nhưng tư duy không ổn định, dễ thay đổi công việc hoặc phương hướng."
        },
        "TUYET_MENH_DIEN_NIEN": {
            stars: ["TUYET_MENH", "DIEN_NIEN"],
            description: "Có năng lực chuyên môn nhưng phải nỗ lực nhiều, dốc sức làm việc."
        },
    
        // Các sao khác với Phục Vị
        "SINH_KHI_PHUC_VI": {
            stars: ["SINH_KHI", "PHUC_VI"],
            description: "trí tuệ cảm xúc cao, sự nổi tiếng và lạc quan, cao thượng, thụ động, thận trọng và làm việc tỉ mỉ.",
            detailedDescription:[
                " trí tuệ cảm xúc cao, sự nổi tiếng và lạc quan, cao thượng.",
                " Một nhược điểm là sự lười biếng của Sinh Khí có thể tăng lên khi Phục Vị mạnh, dẫn đến trì hoãn công việc.",
                "Điều này gây bất lợi cho những ai muốn khởi nghiệp hoặc thăng tiến do tính bảo thủ của Phục Vị.",
                "Về mặt tình cảm, họ kiên nhẫn và chậm rãi giải quyết các vấn đề.",
                "Đặc điểm của người có nhiều Phục Vị là bảo thủ, bướng bỉnh, thận trọng quá mức và ngại rủi ro.",
                "Trong sự nghiệp, họ thường chờ đợi thời cơ thích hợp thay vì chủ động.",
            ],
        },
        "THIEN_Y_PHUC_VI": {
            stars: ["THIEN_Y", "PHUC_VI"],
            description: "nguồn tài lộc liên tục và sự tiếp nối của sự giàu có",
            detailedDescription: [
                "Tổ hợp này thường dẫn đến việc tăng lương hoặc có thêm các nguồn thu nhập thụ động khác. ",
                " sự bất an của Phục Vị có thể hướng đến những khía cạnh khác nhau của Thiên Y, đặc biệt là về tài chính. ",
                "từ trường Thiên Y kết hợp Phục Vị có thể không giỏi quản lý tiền bạc và dễ lo lắng về tài chính, dù có xu hướng tiết kiệm. ",
                " Trong các mối quan hệ, họ thường lo lắng về sự được mất và đưa ra phán đoán dựa trên các yếu tố khác.",
                "Do cảm thấy bất an về mặt cảm xúc, thường giỏi nắm bắt chi tiết của đối phương và dễ hoảng sợ bởi những điều nhỏ nhặt, lo lắng về sự được mất.",
            ]
        },
        "DIEN_NIEN_PHUC_VI": {
            stars: ["DIEN_NIEN", "PHUC_VI"],
            description: " sự mạnh mẽ trong công việc, khả năng thực hành tốt và kinh nghiệm dày dặn, giúp họ trở thành người dẫn dắt ý kiến trong lĩnh vực chuyên môn",
            detailedDescription:[
                "Sự kết hợp giữa Diên Niên, tượng trưng cho người mạnh mẽ, chủ động trong công việc nhưng khó tiếp thu ý kiến khác", 
                "và Phục Vị, tượng trưng cho người thích ổn định và thụ động", 
                "có thể tạo ra sự giằng co nội tâm và căng thẳng nếu gặp phải những thay đổi vượt quá khả năng.",
                "mạnh mẽ trong công việc, khó tiếp thu ý kiến người khác trừ khi được chứng minh là tốt hơn ý kiến của họ",
                "chủ động, không thích bị thúc giục, có khả năng thực hiện mục tiêu dứt khoát, là thành viên giá trị",
                "khó chấp nhận những điều mới,"

            ]
        },
        "PHUC_VI_PHUC_VI": {
            stars: ["PHUC_VI", "PHUC_VI"],
            description: "biểu thị trạng thái chờ đợi, ẩn mình, thận trọng quá mức dẫn đến lo lắng, do dự, bỏ lỡ cơ hội và khó chấp nhận thay đổi, tuy nhiên nó cũng mang lại sự kiên nhẫn, khả năng chịu đựng cô đơn và làm tốt các công việc lặp đi lặp lại, có thể dẫn đến thành công sau thời gian dài nỗ lực."
        },
        "HOA_HAI_PHUC_VI": {
            stars: ["HOA_HAI", "PHUC_VI"],
            description: "Họa Hại là tượng trưng cho khả năng hùng biện nhưng cũng dễ gây hấn. Khi kết hợp Phục Vị có nghĩa là tiếp tục",
            detailedDescription:[
                "thể hiện sự thận trọng ban đầu trong giao tiếp nhưng bộc lộ bản chất thật khi quen thuộc hoặc ở trong lĩnh vực chuyên môn",
                "thường xuyên lo lắng về những gì mình nói ra và có xu hướng trì hoãn việc đưa ra quyết định cuối cùng",
                "Từ trường này có tài hùng biện và ăn nói rất hay, nhưng cũng thường xuyên gây cãi vã vì những chuyện vụn vặt trong cuộc sống."

            ]
        },
        "LUC_SAT_PHUC_VI": {
            stars: ["LUC_SAT", "PHUC_VI"],
            description: "Sự kết hợp giữa Lục Sát và Phục Vị tạo ra năng lượng thiếu quyết đoán, sợ khó khăn, làm việc theo cảm xúc, bảo thủ, hướng nội, thiếu an toàn và có xu hướng trì hoãn, đồng thời có thể tăng đào hoa ",
            detailedDescription: [
                "là tổ hợp sợ khó khăn nhất,khó đột phá trong sự nghiệp ",
                "ai đó giới thiệu những điều, đường đi mới cho những người có năng lượng từ trường này thì những người có tổ hợp từ trường này sẽ từ chối",
                "Phục Vị đi theo Lục Sát có nghĩa là đào hoa tiếp tục nên tạo ra nhiều đào hoa trong cuộc sống hơn tổ hợp khác. "
            ]

        },
        "NGU_QUY_PHUC_VI": {
            stars: ["NGU_QUY", "PHUC_VI"],
            description: "Sự kết hợp giữa Ngũ Quỷ, tượng trưng cho người có nhiều ý tưởng và tính nghệ thuật, và Phục Vị, tượng trưng cho sự thụ động và thiếu an toàn, tạo ra người có nhiều ý tưởng nhưng khó thực hiện và thường hối tiếc, thích chờ đợi cơ hội.",
            detailedDescription: [
                "Phục Vị làm cho tư duy của Ngũ Quỷ trở nên sâu sắc, chi tiết và thận trọng hơn", 
                "nhưng cần có năng lượng khác để vượt qua sự trì trệ của Phục Vị.",
                "Tổ hợp này cũng liên quan đến các vấn đề về tim mạch và tuần hoàn máu.",
            ]
        },
        "TUYET_MENH_PHUC_VI": {
            stars: ["TUYET_MENH", "PHUC_VI"],
            description: "Sự kết hợp giữa Tuyệt Mệnh, tượng trưng cho sự nhạy cảm, mạo hiểm nhưng cũng bướng bỉnh và hay đổ lỗi, với Phục Vị, tượng trưng cho sự bảo thủ, thận trọng và lo lắng, tạo xu hướng mất tiền, hành động bị động hơn nhưng cũng suy nghĩ kỹ lưỡng và có khả năng thỏa hiệp hơn."
        },
    
        // Các sao khác với Họa Hại
        "SINH_KHI_HOA_HAI": {
            stars: ["SINH_KHI", "HOA_HAI"],
            description: "Gặp quý nhân nhưng dễ mất tiền, thu nhập cao nhưng chi tiêu lớn.",
        },
        "THIEN_Y_HOA_HAI": {
            stars: ["THIEN_Y", "HOA_HAI"],
            description: "Tài lộc tốt nhưng dễ hao tiền, mọi người thích giao du nhưng tốn kém.",
        },
        "DIEN_NIEN_HOA_HAI": {
            stars: ["DIEN_NIEN", "HOA_HAI"],
            description: "Có khả năng chuyên môn tốt nhưng dễ tiêu tiền, nói nhiều, nên tập trung vào chất lượng."
        },
        "PHUC_VI_HOA_HAI": {
            stars: ["PHUC_VI", "HOA_HAI"],
            description: "nói cứng rắn, tự cho là đúng.",
            detailedDescription:[
                "đứng trước những người không quen biết nhiều, họ sẽ ít nói và sẵn sàng lắng nghe",
                "nhưng một khi đứng trước những người bạn quen hay vào đúng chủ đề chuyên môn họ sẽ nói một cách kiên quyết",
                "Hãy giữ lời nói cẩn thận trong tay của chính bạn."
    
            ]
        },
        "HOA_HAI_HOA_HAI": {
            stars: ["HOA_HAI", "HOA_HAI"],
            description: "Nói thẳng, chiêu cãi vã, cứng rắn, mạnh miệng, cãi lộn, tính khí nóng nảy, hụt hơi, không kiên nhẫn.",
            detailedDescription:[
                "có khả năng linh hoạt trong lời nói, giỏi tạo ra tình huống có lợi cho mình qua lời nói, đặc biệt về công việc và kinh doanh",
                "mua bán hoặc tranh luận, thường dùng lời lẽ cay nghiệt để giành phần thắng, dễ gây tổn thương",
                "tính khí nóng nảy, dễ cáu kỉnh, lời nói gay gắt, bộc lộ cảm xúc mà ít quan tâm đến người khác",
                "có thể gây ra nhiều vấn đề sức khỏe như tích tụ độc tố, ốm yếu, tai nạn và làm cho thể trạng suy yếu theo thời gian",
            ]
        },
        "LUC_SAT_HOA_HAI": {
            stars: ["LUC_SAT", "HOA_HAI"],
            description: "Hao tiền trong các mối quan hệ xã hội, chi tiêu nhiều cho giao tiếp, quan hệ."
        },
        "NGU_QUY_HOA_HAI": {
            stars: ["NGU_QUY", "HOA_HAI"],
            description: "Tư duy không ổn định và hay nói nhiều, dễ phát ngôn bừa bãi gây rắc rối."
        },
        "TUYET_MENH_HOA_HAI": {
            stars: ["TUYET_MENH", "HOA_HAI"],
            description: "Chi tiêu lớn và liều lĩnh, dễ mạo hiểm trong tài chính dẫn đến mất mát."
        },
    
        // Các sao khác với Lục Sát
        "SINH_KHI_LUC_SAT": {
            stars: ["SINH_KHI", "LUC_SAT"],
            description: "Được giúp đỡ trong lĩnh vực dịch vụ, quan hệ xã hội tốt nhưng cẩn thận người không tốt.",
        },
        "THIEN_Y_LUC_SAT": {
            stars: ["THIEN_Y", "LUC_SAT"],
            description: "Kiếm tiền tốt trong lĩnh vực dịch vụ, tình cảm tốt nhưng phải cẩn thận với mối quan hệ.",
            detailedDescription: [
                "Đặc điểm chính của từ trường này là sự giàu có tích cực",
                "là người rộng lượng, không thù dai, có tư tưởng rộng rãi và sẽ không quan tâm những vấn đề tầm thường",
                "Trong giao tiếp giữa các cá nhân, dễ xúc động, quá tốt bụng nên dễ bị tổn thương;",
                "Không thiếu tiền nên không quan tâm đến tiền lắm, nếu không chú tâm sẽ bỏ lỡ cơ hội kiếm tiền.",
                "Người có từ trường Thiên Y giỏi quan hệ, đào hoa tích cực",
                "đường tình duyên của họ suôn sẻ hơn, gặp được bạn đời sẽ không khó, sẽ gặp được nhiều người phù hợp.",
                "Vì đặc điểm này của đào hoa mạnh mẽ, mọi mối quan hệ đều sẽ ngọt ngào và tươi đẹp",
                "nhưng cũng cần lưu ý không nên có nhiều từ trường Thiên Y trong dãy số, nếu không sẽ dễ xảy ra nhiều cuộc hôn nhân.",
            ]
        },
        "DIEN_NIEN_LUC_SAT": {
            stars: ["DIEN_NIEN", "LUC_SAT"],
            description: "Thích hợp làm việc trong ngành dịch vụ, quan hệ khách hàng tốt, nhưng dễ bị lợi dụng."
        },
        "PHUC_VI_LUC_SAT": {
            stars: ["PHUC_VI", "LUC_SAT"],
            description: "Khi Phục Vị kết hợp với Lục Sát, đặc điểm nổi bật nhất là họ sợ mọi thứ và không dám đối mặt với khó khăn.",
            detailedDescription:[
                "Sự kết hợp này có sức kháng cự rất lớn khi đối diện với điều mới."
            ]
        },
        "HOA_HAI_LUC_SAT": {
            stars: ["HOA_HAI", "LUC_SAT"],
            description: "Hao tiền trong các mối quan hệ xã hội, chi tiêu nhiều cho giao tiếp, quan hệ."
        },
        "LUC_SAT_LUC_SAT": {
            stars: ["LUC_SAT", "LUC_SAT"],
            description: "Tăng cường cảm giác sa sút , khuynh hướng tự kỷ . Cảm xúc không ổn định , quan hệ kết nối lại đột nhiên chuyển biến xấu , Đào Hoa kiếp .",
            detailedDescription:[
                "Người có tổ hợp Lục Sát mạnh thông minh, giao tiếp tốt, muốn kiếm nhiều tiền nhưng khó giữ, thường gặp rắc rối và có các mối quan hệ không tốt.",
                "Họ tinh tế, thận trọng, có khả năng quan sát tốt và dễ được người khác chấp nhận, nhờ đó mà hòa đồng.",
                "họ giỏi giao tiếp, có nhiều mối quan hệ, thu thập được thông tin và nguồn lực.",
                "Tuy nhiên, các mối quan hệ của họ thường có mục đích, và dù có mạng lưới rộng, kết quả lại do họ tự đánh giá, rủi ro lớn thường dẫn đến thất bại.",
                "Khi năng lượng Lục Sát chồng chất, họ kiếm tiền bằng nhiều cách nhưng cuối cùng vẫn tiêu hết, gặp vấn đề trong hôn nhân và cảm thấy chán nản cả trong sự nghiệp lẫn tình cảm."
            ]
        },
        "NGU_QUY_LUC_SAT": {
            stars: ["NGU_QUY", "LUC_SAT"],
            description: "Đào hoa nát, dễ có mối quan hệ không rõ ràng, tình cảm phức tạp."
        },
        "TUYET_MENH_LUC_SAT": {
            stars: ["TUYET_MENH", "LUC_SAT"],
            description: "Mối quan hệ xã hội tốn kém, phải nỗ lực nhiều trong giao tiếp nhưng ít kết quả."
        },
    
        // Các sao khác với Ngũ Quỷ
        "SINH_KHI_NGU_QUY": {
            stars: ["SINH_KHI", "NGU_QUY"],
            description: "Có quý nhân nhưng tư duy không ổn định, dễ thay đổi, nên cẩn trọng với quyết định.",
        },
        "THIEN_Y_NGU_QUY": {
            stars: ["THIEN_Y", "NGU_QUY"],
            description: "Có tài chính nhưng không ổn định, tư duy hay thay đổi, dễ đầu tư mạo hiểm.",
        },
        "DIEN_NIEN_NGU_QUY": {
            stars: ["DIEN_NIEN", "NGU_QUY"],
            description: "Chuyên môn tốt nhưng tư duy không ổn định, dễ thay đổi công việc hoặc phương hướng."
        },
        "PHUC_VI_NGU_QUY": {
            stars: ["PHUC_VI", "NGU_QUY"],
            description: "chi tiết, thận trọng,học nhanh, đa nghi, thích cờ bạc",
            detailedDescription:[
                "học nhanh nhưng đa nghi, khó hòa đồng và không tin tưởng người khác",
                "de thay đổi công việc và dựa vào ý tưởng cá nhân",
                "không nên đầu tư mạo hiểm, thích cờ bạc, có may mắn nhưng tiền bạc đến và đi nhanh chóng",
                "cần chú ý đến tim mạch và tuần hoàn máu",
                "ve cảm xúc, dễ thiếu an toàn, thay đổi, bồn chồn và có nguy cơ ngoại tình, ảnh hưởng xấu đến các mối quan hệ",
            ]
        },
        "HOA_HAI_NGU_QUY": {
            stars: ["HOA_HAI", "NGU_QUY"],
            description: "Tư duy không ổn định và hay nói nhiều, dễ phát ngôn bừa bãi gây rắc rối."
        },
        "LUC_SAT_NGU_QUY": {
            stars: ["LUC_SAT", "NGU_QUY"],
            description: "Đào hoa nát, dễ có mối quan hệ không rõ ràng, tình cảm phức tạp."
        },
        "NGU_QUY_NGU_QUY": {
            stars: ["NGU_QUY", "NGU_QUY"],
            description: "rất thông minh, tài giỏi và dễ đạt thành tựu trong công việc, không ổn định nhất , phản ứng nhanh lại gặp khó khăn trắc trở , không ổn định , ý nghĩ hay thay đổi ",
            detailedDescription:[
                "Họ có khả năng suy nghĩ tốt và thường đưa ra những ý kiến giá trị, giúp ích cho sự nghiệp.",
                "Tuy nhiên, họ không phải là người điềm tĩnh và dễ bất mãn nếu không có cơ hội phát triển.",
                "luôn hướng đến những mục tiêu và lý tưởng cao hơn, không thích sự trì trệ",
                "Trong tình yêu, họ có xu hướng chủ động kết thúc mối quan hệ.",
                "Tổ hợp này liên quan đến sự thay đổi, nhiều ý tưởng, thức khuya và các vấn đề về tim mạch, mạch máu não."
            ]
        },
        "TUYET_MENH_NGU_QUY": {
            stars: ["TUYET_MENH", "NGU_QUY"],
            description: "Tư duy bất ổn và liều lĩnh, dễ đưa ra quyết định sai lầm, gây hậu quả nghiêm trọng."
        },
    
        // Các sao khác với Tuyệt Mệnh
        "SINH_KHI_TUYET_MENH": {
            stars: ["SINH_KHI", "TUYET_MENH"],
            description: "Gặp quý nhân trong lúc khó khăn, được giúp đỡ nhưng phải nỗ lực nhiều.",
        },
        "THIEN_Y_TUYET_MENH": {
            stars: ["THIEN_Y", "TUYET_MENH"],
            description: "Tiền bạc dễ đến nhưng cũng dễ mất, đầu tư nhiều nhưng phải cẩn trọng."
        },
        "DIEN_NIEN_TUYET_MENH": {
            stars: ["DIEN_NIEN", "TUYET_MENH"],
            description: "Có năng lực chuyên môn nhưng phải nỗ lực nhiều, dốc sức làm việc."
        },
        "PHUC_VI_TUYET_MENH": {
            stars: ["PHUC_VI", "TUYET_MENH"],
            description: "súc thế xung đông , không xung thì thôi , xông lên trừng thiên . Trong công việc rất liều ",
            detailedDescription:[
                "từ trường Phục Vị có thể triệt tiêu một phần năng lượng tiêu cực do từ trường Tuyệt Mệnh tạo ra",
                "giúp chủ nhân con số lên kế hoạch thông minh và vững vàng , hành động từng bước , thận trọng mà dám chiến đấu , và có thể tránh được nhiều vấn đề rủi ro ."
            ]
        },
        "HOA_HAI_TUYET_MENH": {
            stars: ["HOA_HAI", "TUYET_MENH"],
            description: "Chi tiêu lớn và liều lĩnh, dễ mạo hiểm trong tài chính dẫn đến mất mát.",
            detailedDescription:[
                "Sự kết hợp của hai từ trường hung tinh này tạo ra người cứng rắn, Họa Hại không nhường nhịn về lời nói còn Tuyệt Mệnh thì hành động theo ý mình mà không hối hận.",
                "Khi có tổ hợp này, cần cẩn thận tránh mâu thuẫn với người khác vì dễ mất kiểm soát, nói ra những điều không thể hàn gắn và sau đó hối hận,",
                "đặc biệt cần suy nghĩ kỹ trước khi hành động ở nơi làm việc vì những người này rất nguy hiểm và khó kiểm soát cảm xúc."
            ]
        },
        "LUC_SAT_TUYET_MENH": {
            stars: ["LUC_SAT", "TUYET_MENH"],
            description: "Mối quan hệ xã hội tốn kém, phải nỗ lực nhiều trong giao tiếp nhưng ít kết quả.",
            detailedDescription:[
                "Sự kết hợp giữa từ trường Lục Sát và Tuyệt Mệnh được xem là một trong những tổ hợp xấu nhất ",
                "Từ trường Lục Sát mang đến sự mong manh và bất lực bên trong, dễ dẫn đến cảm xúc tiêu cực, và khi kết hợp với Tuyệt Mệnh, những cảm xúc này bộc lộ ra bên ngoài một cách khó kiểm soát.",
                "Những người này thường nóng nảy, khó kiềm chế cảm xúc, dễ buồn bã và có thể hành động cực đoan khi tình yêu tan vỡ, đồng thời gặp nhiều mâu thuẫn trong giao tiếp. ",
                "Về mặt gia đình, họ có xu hướng không hòa hợp, ít giao tiếp, và có thể có mức độ hoang tưởng, dẫn đến nhiều vụ ly hôn.",
                "Trong chuyện tình cảm, họ dễ dàng chấp nhận mối quan hệ mà không suy nghĩ kỹ và không biết cách duy trì, đồng thời kém trong việc kiểm soát sự cô đơn và khó từ chối."
            ]
        },
        "NGU_QUY_TUYET_MENH": {
            stars: ["NGU_QUY", "TUYET_MENH"],
            description: "Tư duy bất ổn và liều lĩnh, dễ đưa ra quyết định sai lầm, gây hậu quả nghiêm trọng.",
            detailedDescription:[
                "Tổ hợp Ngũ Quỷ + Tuyệt Mệnh trong số điện thoại mang ý nghĩa về sự thay đổi, nhiều ý tưởng, thức khuya",
                " và các vấn đề sức khỏe liên quan đến tim, mạch máu não và gan thận, và gây tai nạn giao thông.",
                "Những người có từ trường này thường tham vọng, không chấp nhận điều bình thường, có ý tưởng thất thường và cạnh tranh mạnh mẽ.",
                "Sự kết hợp này có thể dẫn đến tiêu dùng bốc đồng, quyết định sai lầm trong sự nghiệp và dễ gặp các vấn đề pháp lý, đầu tư thua lỗ dẫn đến nợ nần.",
                " Trong hôn nhân, họ có xu hướng hay thay đổi, bốc đồng, đa nghi và dễ gây bất hòa, thậm chí ly hôn, đặc biệt nếu tổ hợp này ở cuối số điện thoại.",
                " Xét về năng lượng số, Ngũ Quỷ + Tuyệt Mệnh cho thấy sự dũng cảm, kỹ năng lập kế hoạch tốt, ham muốn kiếm tiền nhanh nhưng cũng tiêu tiền như nước, dễ thiếu kiên nhẫn"
            ]
        },
        "TUYET_MENH_TUYET_MENH": {
            stars: ["TUYET_MENH", "TUYET_MENH"],
            description: "Sơ ý chủ quan , kích động , xung động , dễ đi đến cực đoan , dễ phá tài , không nên đánh bạc , không dễ quản lý tài sản .",
            detailedDescription:[
                "nhiều từ trường Tuyệt Mệnh thường có tính khí thất thường, thích mạo hiểm, dễ hành động cực đoan dẫn đến nợ nần và các mối quan hệ không tốt",
                "Đặc trưng của Tuyệt Mệnh là sự phân cực trong suy nghĩ và hành động, khiến họ khó thay đổi nhưng lại làm việc trực tiếp, chăm chỉ và kiếm tiền nhanh chóng. ",
                "Họ có xu hướng lựa chọn giữa công việc rủi ro thấp lợi nhuận thấp nhiều vất vả hoặc rủi ro cao lợi nhuận cao, với mục tiêu chính là kiếm tiền một cách đơn giản.",
                " từ trường Tuyệt Mệnh thường làm những công việc đơn giản để kiếm tiền, đóng góp nguồn lực vật chất và tài chính tùy theo ngành nghề. ",
                "Trong sự nghiệp, họ không thích bị gò bó, dễ phản kháng khi thấy bất công, thông minh nhưng dễ bị phát hiện, thích mạo hiểm và những công việc có rủi ro cao nhưng lợi nhuận lớn.",
                " Trong mối quan hệ, họ thích gây bất ngờ nhưng mối quan hệ tốt cũng nhanh chóng nguội lạnh, bị coi là thực tế và không thích tương tác nhiều, hợp tác kinh doanh có thể tốt hơn. ",
                "họ có thể bỏ qua chi tiết vì lợi ích trước mắt, dễ dẫn đến tranh chấp và dễ mắc nợ trong ngành rủi ro cao, nhưng lại khó khăn trong công việc ổn định, không có rủi ro"
            ]
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
