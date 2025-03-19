const BAT_TINH = {
    // Tứ cát tỉnh - Four Auspicious Stars
    SINH_KHI: {
        name: "Sinh Khí",
        description: "Vui vẻ, quý nhân, dẫn đạo lực",
        detailedDescription: `Tính cách lạc quan, nhìn mọi thứ rất thoáng, là người yên vui, lấy tâm bình tĩnh, bình thản để đối đãi, mọi thứ tuỳ duyên, không so đo cưỡng cầu.
- Thích trợ giúp người khác, có nhiều nhân duyên và bạn bè tốt, bằng hữu nhiều. Không thích so đo và cứng nhắc.
- Thường là người hoà giải, am hiểu giao tiếp tốt, kết nối giỏi. Dễ tiếp nhận thông tin mới.
- Quý nhân mang tiền tài đến, có rất nhiều khoản tiền bất ngờ, thậm chí trúng số.
- Tuy nhiên là người hơi lười thay đổi, an phận gặp sao yên vậy, không có chủ kiến.
- Sự nghiệp gặp được nhiều quý nhân, gặp gữ thì hoá lành. Thích hợp làm công tác xã hội, PR.
- Tình cảm không cưỡng cầu, tuỳ duyên, không so đo, mối quan hệ hài hoà, hôn nhân tương ứng ngọt ngào.
- Sức khỏe cần lưu ý về bệnh dạ dày, tai mắt mũi.
- Từ trường đem dữ hoá lành, trong nguy hiểm chắc chắn sẽ có hy vọng thoát khỏi.`,
        numbers: ["14", "41", "67", "76", "39", "93", "28", "82"],
        energy: {
            "14": 4, "41": 4,  // Mức năng lượng cao nhất
            "67": 3, "76": 3,  // Mức năng lượng cao
            "39": 2, "93": 2,  // Mức năng lượng trung bình
            "28": 1, "82": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["14", "41", "67", "76"], // Động số, đại quý nhân (năng lượng 3,4)
            LOW: ["39", "93", "28", "82"]   // Tĩnh số, tiểu quý nhân (năng lượng 1,2)
        },
        position: "Nên ở giữa", // Recommended position in number
        nature: "Cát" // Auspicious
    },
    
    // SINH_KHI có số 0
    SINH_KHI_ZERO: {
        name: "Sinh Khí hoa hung",
        description: "Sinh Khí có số 0: Quí nhân hoá tiểu nhân, chiêu nạp người xấu về bên mình",
        detailedDescription: `Tính cách lạc quan, nhìn mọi thứ rất thoáng, là người yên vui, lấy tâm bình tĩnh, bình thản để đối đãi, mọi thứ tuỳ duyên, không so đo cưỡng cầu.
- Thích trợ giúp người khác, có nhiều nhân duyên và bạn bè tốt, bằng hữu nhiều. Không thích so đo và cứng nhắc.
- Người tưởng tốt hóa ra có ý đồ xấu, người giúp đỡ lại khiến gặp rắc rối.
- Dễ gặp phải người hai mặt, bề ngoài tốt nhưng có ý đồ lợi dụng.
- Cần thận trọng khi tin tưởng người khác, đặc biệt là người mới quen.
- Quý nhân có thể biến thành tiểu nhân, thường gặp phải người không thật lòng.`,
        numbers: ["104", "140", "401", "410", "607", "670", "706", "760",
                  "309", "390", "903", "930", "208", "280", "802", "820"],
        energy: {
            "140": 4.5, "410": 4.5, // Mức năng lượng cao nhất
            "104": 4, "401": 4, // Mức năng lượng cao nhất
            "670": 3.5, "760": 3.5,
            "607": 3, "706": 3,  // Mức năng lượng cao
            "930": 2.5, "390": 2.5,  // Mức năng lượng trung bình
            "903": 2, "309": 2,  // Mức năng lượng trung bình
            "820": 1, "280": 1,   // Mức năng lượng thấp
            "802": 1, "208": 1   // Mức năng lượng thấp
        },
        position: "Nên ở giữa", 
        nature: "Cát hóa hung" // cát hóa hung
    },
    
    THIEN_Y: {
        name: "Thiên Y",
        description: "Tiền tài, tình cảm, hồi báo",
        detailedDescription: `Là tin tức trọng yếu khi một người muốn cầu tài hoặc tiêu tai bệnh tật. Thông minh, thiện lương, hào phóng, thích giúp đỡ người khác.
- Tính tình rất giản đơn, không có tâm cơ thâm hiểm, hạnh phúc đôi lứa, hạnh phúc vợ chồng đều đoan chính.
- Tiền kiếm được chân chính nhưng vì quá thiện lương cũng không thích so đo nên rất dễ bị lừa và lợi dụng.
- Không màng danh lợi, không quá quan trọng đồng tiền, những khoản tiền nhỏ thường không chú ý nhiều.
- Tiền tài đổ về từ tứ phương tám hướng, được hưởng sự đầy đủ, hạnh phúc.
- Sự nghiệp có thể thành đại sự, lừng lẫy, trở thành ông chủ, lãnh đạo hoặc cánh tay đắc lực của doanh nghiệp.
- Tình cảm chân chính, dễ kết hôn và dễ gặp đối tượng lý tưởng, tình cảm ân ái, ngọt ngào và lãng mạn.
- Sức khỏe cần lưu ý vấn đề về huyết áp, tuần hoàn máu, bệnh tai mắt mũi.
- Nhiều quý nhân lớn tuổi hơn, các bậc chú bác anh chị giúp đỡ che chở, bạn bè nhiều.`,
        numbers: ["13", "31", "68", "86", "49", "94", "27", "72"],
        energy: {
            "13": 4, "31": 4,  // Mức năng lượng cao nhất
            "68": 3, "86": 3,  // Mức năng lượng cao
            "49": 2, "94": 2,  // Mức năng lượng trung bình
            "27": 1, "72": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["13", "31", "68", "86"], // Động số, đại tài (năng lượng 3,4)
            LOW: ["49", "94", "27", "72"]   // Tĩnh số, tiểu tài (năng lượng 1,2)
        },
        position: "Nên ở hậu phương", // Recommended position
        nature: "Cát" // Auspicious
    },
    
    // THIEN_Y có số 0
    THIEN_Y_ZERO: {
        name: "Thiên Y hoa hung",
        description: "Thiên Y có số 0: Đang có tiền thành mất tiền, lớn mất lớn, ít mất ít",
        detailedDescription: `Thông minh, thiện lương, hào phóng, thích giúp đỡ người khác.
- Tính tình rất giản đơn, không có tâm cơ thâm hiểm, hạnh phúc đôi lứa, hạnh phúc vợ chồng đều đoan chính.
- Tiền kiếm được chân chính nhưng vì quá thiện lương cũng không thích so đo nên rất dễ bị lừa và lợi dụng.
- Không màng danh lợi, không quá quan trọng đồng tiền, những khoản tiền nhỏ thường không chú ý nhiều.
- Tiền tài đang được hưởng sẽ giảm sút hoặc mất đi.
- Vận may về tài chính có thể suy giảm đáng kể.
- Có thể có các tổn thất tài chính không lường trước được.`,
        numbers: ["103", "130", "301", "310", "608", "680", "806", "860",
                 "409", "490", "904", "940", "207", "270", "702", "720"],
        energy: {
            "130": 4.5, "310": 4.5, // Mức năng lượng cao nhất
            "103": 4, "301": 4, // Mức năng lượng cao nhất
            "680": 3.5, "860": 3.5,
            "608": 3, "806": 3,  // Mức năng lượng cao
            "940": 2.5, "490": 2.5,  // Mức năng lượng trung bình
            "904": 2, "409": 2,  // Mức năng lượng trung bình
            "720": 1, "270": 1,   // Mức năng lượng thấp
            "702": 1, "207": 1   // Mức năng lượng thấp
        },
        position: "Nên ở hậu phương",
        nature: "Cát hóa hung" // 
    },
    
    DIEN_NIEN: {
        name: "Diên Niên",
        description: "Năng lực chuyên nghiệp, công việc",
        detailedDescription: `Thường là lãnh đạo, chúa tể một phương, không dễ thuyết phục, trừ khi ai đó năng lực cao hơn hẳn.
- Là người có trách nhiệm, tâm lý vững vàng, lập trường ổn định, có cam đảm và đảm đương được.
- Rất trọng chữ tín, đề cao trách nhiệm, đã nói là làm, tính tình kiên trì, nói 1 không 2.
- Tâm địa thiện lương, kĩ tính không ẩu, xử lý công việc theo chính nghĩa, bảo vệ chính nghĩa.
- Hay thích tiết kiệm tiền bạc, tính toán cẩn thận không ẩu, biết tiêu sài đúng nơi đúng chỗ.
- Tài vận: Vất vả kiếm tiền, giữ tiền tốt, thích tính toán chi tiết tỉ mỉ, kĩ lưỡng. Quản lý tài sản rất kĩ.
- Sự nghiệp: có năng lực chuyên nghiệp, làm lãnh đạo và kỹ thuật, mọi thứ tự thân, làm việc khá mệt nhọc.
- Tình cảm: yêu cầu cao, tìm kiếm đối tượng rất khó khăn kĩ tính, đặt rất nặng công việc, cực kì chung thuỷ.
- Sức khỏe: vất vả lâu ngày sinh bệnh tật, bệnh vai cổ gáy, giấc ngủ không tốt, tóc rụng nhiều, tinh thần áp lực.
- Khuyết điểm: Sĩ diện, cái tôi mạnh, hay ung dung tự đắc ý, lý lẽ cứng nhắc, cố chấp, cực khổ, lao lực.`,
        numbers: ["19", "91", "78", "87", "34", "43", "26", "62"],
        energy: {
            "19": 4, "91": 4,  // Mức năng lượng cao nhất
            "78": 3, "87": 3,  // Mức năng lượng cao
            "34": 2, "43": 2,  // Mức năng lượng trung bình
            "26": 1, "62": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["19", "91", "78", "87"], // Động số, đại lãnh đạo (năng lượng 3,4)
            LOW: ["34", "43", "26", "62"]   // Tĩnh số, tiểu lãnh đạo (năng lượng 1,2)
        },
        position: "Nên ở hậu phương", // Recommended position
        nature: "Cát" // Auspicious
    },
    
    // DIEN_NIEN có số 0
    DIEN_NIEN_ZERO: {
        name: "Diên Niên hoa hung",
        description: "Diên Niên có số 0: Làm việc nỗ lực mãi không thành, công việc cứ bị cản trở",
        detailedDescription: `Thường là lãnh đạo, chúa tể một phương, không dễ thuyết phục, trừ khi ai đó năng lực cao hơn hẳn.
- Là người có trách nhiệm, tâm lý vững vàng, lập trường ổn định, có cam đảm và đảm đương được.
- Diên Niên có số 0: Làm việc nỗ lực mãi không thành, công việc cứ bị cản trở.
- Mọi công sức bỏ ra thường không đạt được kết quả như mong muốn.
- Thường xuyên gặp chướng ngại, trở ngại trong công việc và sự nghiệp.
- Áp lực công việc lớn nhưng kết quả không tương xứng với nỗ lực bỏ ra.
- Khó thăng tiến trong sự nghiệp, dễ bị người khác cản trở.`,
        numbers: ["109", "190", "901", "910", "708", "780", "807", "870",
                  "304", "340", "403", "430", "206", "260", "602", "620"],
        energy: {
            "190": 4.5, "910": 4.5, // Mức năng lượng cao nhất
            "109": 4, "901": 4, // Mức năng lượng cao nhất
            "780": 3.5, "870": 3.5,
            "708": 3, "807": 3,  // Mức năng lượng cao
            "340": 2.5, "430": 2.5,  // Mức năng lượng trung bình
            "304": 2, "403": 2,  // Mức năng lượng trung bình
            "260": 1, "620": 1,   // Mức năng lượng thấp
            "206": 1, "602": 1   // Mức năng lượng thấp
        },
        position: "Nên ở hậu phương",
        nature: "Cát hóa hung" // 
    },
    
    PHUC_VI: {
        name: "Phục Vị",
        description: "chiu dung, kho thay doi",
        detailedDescription: `Giỏi chịu đựng, có nghị lực hơn người, tiếng nói có sức ảnh hưởng, tiềm ẩn năng lực rất lớn.
- Lập trường vững vàng, không dễ biến động, không thích bị nói đạo lý, mà phải làm gương tốt.
- Thường lo lắng, không có cảm giác an toàn, khó đưa ra lựa chọn và rất cần sự cổ vũ động viên.
- Sợ mạo hiểm, sợ tổn thương, hay bị chờ đợi quá lâu mất cơ hội. Quá bảo thủ chờ đợi, không dám hành động.
- Tài vận: kiếm tiền khổ sở, phải đánh đổi nhiều vất vả, thích cầm tiền cố định và thu nhập ổn định.
- Sự nghiệp: gò bó theo khuôn phép, khó thay đổi, thích hợp với công việc có tính ổn định cao.
- Sức khỏe: bệnh về tim, não, lo nghĩ, hao tổn năng lượng ở 2 vùng này nhiều.
- Đặc điểm: theo hung thì thì hung, theo cát thì cát. Hoặc người có vận số tốt thì sẽ tốt, người có vận số xấu thì càng trở lên chậm trễ.
- Tình cảm: không tự ý chủ động yêu đương, cần có cảm giác yêu thương an toàn, tâm thái luôn đa nghi, thấp thỏm lo âu.
- Người nhà sẽ là quý nhân tốt nhất.`,
        numbers: ["11", "22", "33", "44", "66", "77", "88", "99"],
        energy: {
            "11": 4, "22": 4, "33": 1, "44": 1,
            "66": 2, "77": 2, "88": 3, "99": 3
        },
        level: {
            HIGH: ["11", "22", "88", "99"], // Động số (năng lượng 3,4)
            LOW: ["66", "77", "33", "44"]   // Tĩnh số (năng lượng 1,2)
        },
        position: "Không nên có", // Should not appear in auspicious combinations
        nature: "Cát/Hung" // Can be both auspicious or inauspicious
    },
    
    // PHUC_VI có số 0
    PHUC_VI_ZERO: {
        name: "Phục Vị",
        description: "Phục Vị có số 0: Trì trệ, chờ đợi, không thay đổi, dễ bỏ lỡ cơ hội",
        detailedDescription: `Giỏi chịu đựng, có nghị lực hơn người, tiếng nói có sức ảnh hưởng, tiềm ẩn năng lực rất lớn.
- Lập trường vững vàng, không dễ biến động, không thích bị nói đạo lý, mà phải làm gương tốt.
- Khó hòa nhập với môi trường mới, thích giữ nguyên hiện trạng.
- Lo lắng quá mức, thường xuyên bỏ lỡ cơ hội tốt.
- Sự nghiệp khó phát triển, dễ rơi vào tình trạng bế tắc.
- Dễ bỏ lỡ những cơ hội tốt vì quá thận trọng và không dám quyết định.`,
        numbers: ["110", "220", "330", "440", "660", "770", "880", "990",
                  "101", "202", "303", "404", "606", "707", "808", "909"],
        energy: {
            "110": 4.5, "220": 4.5, // Giảm năng lượng so với gốc
            "990": 3.5, "880": 3.5,
            "101": 4, "202": 4,
            "808": 3, "909": 3,
            "707": 2, "606": 2,
            "303": 1, "404": 1,
            "330": 1.5, "440": 1.5 // Giảm mạnh năng lượng
        },
        position: "Không nên có",
        nature: "Cát/Hung hóa hung" // Thường thiên về Hung khi có số 0
    },
    
    // Tứ hung tỉnh - Four Inauspicious Stars
    HOA_HAI: {
        name: "Họa Hại",
        description: "Khẩu tài, chi tiêu lớn, lấy miệng là nghiệp",
        detailedDescription: `Miệng lưỡi lưu loát, hùng biện giỏi, biết ăn nói, dùng miệng để kiếm ra tiền, ăn nói khéo léo, dễ đi vào lòng người.
- Phù hợp làm thầy giáo, chuyên gia đào tạo, giảng dạy, lấy nghiệp ăn nói để kiếm ra tiền tài.
- Tính tình nóng nảy nên hay cãi vã thị phi, ít người yêu mến, hay ốm yếu. Thẳng thắn, mạnh miệng, thích sĩ diện.
- Hay gây gổ, làm mọi người khẩu phục và tâm không phục, thích để tâm vào chuyện vụn vặt.
- Tài vận: mở miệng là có tiền, dễ vì cãi vã mà mất tiền, khó giữ tiền.
- Tình cảm: đầu tiên thì ngon ngọt, sau đó thì dễ cãi vã thị phi, ly hôn.
- Sức khỏe: bệnh ở khoang miệng, yếu hầu, họng, tuyến bạch huyết, lồng ngực, hao tổn nguyên khí.
- Không có quý nhân, nhiều thị phi.
- Học tập: rất giỏi học về ngôn ngữ, ngành nghề cần lấy tài ăn nói để kiếm ra tiền rất phù hợp.`,
        numbers: ["17", "71", "89", "98", "46", "64", "23", "32"],
        energy: {
            "17": 4, "71": 4,  // Mức năng lượng cao nhất
            "89": 3, "98": 3,  // Mức năng lượng cao
            "46": 2, "64": 2,  // Mức năng lượng trung bình
            "23": 1, "32": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["17", "71", "89", "98"], // Năng lượng 3,4
            LOW: ["46", "64", "23", "32"]   // Năng lượng 1,2
        },
        nature: "Hung" // Inauspicious
    },
    
    // HOA_HAI có số 0
    HOA_HAI_ZERO: {
        name: "Họa Hại",
        description: "Họa Hại có số 0: Ân bệnh, không bộc phát, nếu bộc phát sẽ rất nhanh",
        detailedDescription: `Miệng lưỡi lưu loát, hùng biện giỏi, biết ăn nói, dùng miệng để kiếm ra tiền, ăn nói khéo léo, dễ đi vào lòng người.
- Phù hợp làm thầy giáo, chuyên gia đào tạo, giảng dạy, lấy nghiệp ăn nói để kiếm ra tiền tài.
- Họa Hại có số 0: Ân bệnh, không bộc phát, nếu bộc phát sẽ rất nhanh. Họa thị phi, kiện cáo, cãi vã, có thể gây kiện cáo kéo dài.
- Có nguy cơ mắc bệnh tiềm ẩn không phát hiện sớm, khi phát bệnh thì diễn biến nhanh, nghiêm trọng.
- Dễ gặp phải rắc rối về pháp lý, tranh chấp, kiện tụng kéo dài.
- Dễ vướng vào các cuộc tranh cãi, thị phi không đáng có.
- Lời nói có thể gây ra hậu quả nghiêm trọng không lường trước.`,
        numbers: ["107", "170", "701", "710", "809", "890", "908", "980",
                  "406", "460", "604", "640", "203", "230", "302", "320"],
        energy: {
            "170": 4.5, "710": 4.5, // Mức năng lượng cao nhất (tiêu cực)
            "107": 4, "701": 4, // Mức năng lượng cao nhất (tiêu cực)
            "890": 3.5, "980": 3.5,
            "809": 3, "908": 3,  // Mức năng lượng cao
            "460": 2.5, "640": 2.5,  // Mức năng lượng trung bình
            "406": 2, "604": 2,  // Mức năng lượng trung bình
            "230": 1.5, "320": 1.5,   // Mức năng lượng thấp
            "203": 1, "302": 1   // Mức năng lượng thấp
        },
        nature: "Hung hóa hung" // Năng lượng Hung tăng cường
    },
    
    LUC_SAT: {
        name: "Lục Sát",
        description: "Giao tế, phục vụ, cửa hàng, nữ nhân",
        detailedDescription: `Kinh nghiệm bản thân tốt, nhân duyên tốt, nhất là với người khác phái, am hiểu giao tiếp, tiếp đãi và thiết lập mối quan hệ.
- Đi ra ngoài biết cách giao thiệp, có thể là giao thiệp với nước ngoài. Tư duy tinh tế tỉ mỉ, giàu tình cảm.
- Khuyết điểm: Hay nhạy cảm đa nghi, thích tưởng tượng và hay suy diễn, không quá quyết chắc chắn được.
- Năng lực chịu đựng rất kém. Hay do dự, quá cẩn thận. Rất dễ u buồn, tự kỉ thậm chí tự sát.
- Tình cảm: tình cảm phong phú đặc sắc, duyên với người khác phái rất mạnh, tính nết cẩn thận và nhạy cảm, hay khổ vì tình.
- Tài vận: dựa vào mối quan hệ để kiếm tiền tốt, tiêu tiền cho gia đình và cũng không giữ được tiền.
- Sự nghiệp: quan hệ xã hội, ngoại giao, nghề phục vụ hoặc làm đẹp, nghành nghề liên quan đến nữ tính, nghệ thuật.
- Sức khỏe: bệnh về da, dạ dày, buồng trứng, nóng nảy, tự kỉ, u uất tinh thần.
- Dễ được nhưng dễ mất, rất nhiều cơ hội sinh tiền tài, khéo léo có tiền, thích chưng diện, ăn mặc thời thượng.`,
        numbers: ["16", "61", "47", "74", "38", "83", "92", "29"],
        energy: {
            "16": 4, "61": 4,  // Mức năng lượng cao nhất
            "47": 3, "74": 3,  // Mức năng lượng cao
            "38": 2, "83": 2,  // Mức năng lượng trung bình
            "92": 1, "29": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["16", "61", "47", "74"], // Năng lượng 3,4
            LOW: ["38", "83", "92", "29"]   // Năng lượng 1,2
        },
        nature: "Hung" // Inauspicious
    },
    
    // LUC_SAT có số 0
    LUC_SAT_ZERO: {
        name: "Lục Sát hoa hung",
        description: "Lục Sát có số 0: U buồn tình cảm, ly thân/ly hôn, mất tiền cho nữ nhân",
        detailedDescription: `Kinh nghiệm bản thân tốt, nhân duyên tốt, nhất là với người khác phái, am hiểu giao tiếp.
- Tình cảm dễ gặp trắc trở, u buồn, không như ý.
- Nguy cơ cao về đổ vỡ hôn nhân, chia tay, ly thân.
- Cẩn thận khi cho nữ giới vay tiền hoặc đầu tư vào dự án của phụ nữ.
- Có thể mất tiền vì các mối quan hệ tình cảm hoặc với phụ nữ.
- Tâm trạng dễ u uất, tự kỷ, trầm cảm khi gặp vấn đề về tình cảm.`,
        numbers: ["106", "160", "601", "610", "407", "470", "704", "740",
                  "308", "380", "803", "830", "209", "290", "902", "920"],
        energy: {
            "160": 4.5, "610": 4.5, // Mức năng lượng cao nhất
            "106": 4, "601": 4, // Mức năng lượng cao nhất
            "470": 3.5, "740": 3.5,
            "407": 3, "704": 3,  // Mức năng lượng cao
            "380": 2.5, "830": 2.5,  // Mức năng lượng trung bình
            "308": 2, "803": 2,  // Mức năng lượng trung bình
            "290": 1.5, "920": 1.5,   // Mức năng lượng thấp
            "209": 1, "902": 1   // Mức năng lượng thấp
        },
        nature: "Hung hóa hung" // Năng lượng Hung mạnh hơn
    },
    
    NGU_QUY: {
        name: "Ngũ Quỷ",
        description: "Trí óc, biến động, không ổn định, tư duy",
        detailedDescription: `Thông minh, đa nghĩ, phản ứng nhanh, rất tài hoa hơn người, nhiều tài năng trời phú.
- Tài vận: buôn bán, tâm linh tôn giáo là hợp lý.
- Sự nghiệp: thường xuyên biến động, không chịu an phận, nên đi nhiều và làm các công việc buôn bán.
- Tình cảm: Hay thay đổi, hay có tình tay ba, dễ ngoại tình, ly hôn. Tính cách rất đa nghi, không tin tưởng ai và không tâm sự cho ai.
- Sức khỏe: dễ có bệnh tim, tuần hoàn máu, tai ương ngoài ý muốn. Bệnh tật rất dễ bộc phát, khi phát ra thì nặng.
- Vì bản tình hay nghi ngờ, không tin người nên rất thiếu quý nhân.
- Quản lý tài sản: quản lý rất mờ ám, công việc nếu có liên quan đến tiền thì khá ám muội.
- Đối với ngũ quỷ phải hoàn toàn tán đồng, lắng nghe và tôn trọng, nếu không kiên nhẫn hoặc gây trở ngại sẽ bị phản ứng ngược lại.
- Học tập: phản ứng nhanh nhẹn, có khả năng suy luận, có năng lực cực mạnh trong phương diện thưởng thức nghệ thuật.`,
        numbers: ["18", "81", "79", "97", "36", "63", "24", "42"],
        energy: {
            "18": 4, "81": 4,  // Mức năng lượng cao nhất
            "79": 3, "97": 3,  // Mức năng lượng cao
            "36": 2, "63": 2,  // Mức năng lượng trung bình
            "24": 1, "42": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["18", "81", "79", "97"], // Năng lượng 3,4
            LOW: ["36", "63", "24", "42"]   // Năng lượng 1,2
        },
        nature: "Hung" // Inauspicious
    },
    
    // NGU_QUY có số 0
    NGU_QUY_ZERO: {
        name: "Ngũ Quỷ hoa hung",
        description: "Ngũ Quỷ có số 0: Hay có tiêu cực, áp lực, thăng trầm biến động, dễ mất tiền",
        detailedDescription: `Thông minh, đa nghĩ, phản ứng nhanh, rất tài hoa hơn người, nhiều tài năng trời phú.
- Thường xuyên gặp trở ngại, khó khăn bất ngờ trong cuộc sống và công việc.
- Tâm trạng thường không ổn định, dễ bị căng thẳng, áp lực, bi quan.
- Có nguy cơ cao về tai nạn, mất mát tài sản, đầu tư thất bại.
- Tư duy tiêu cực, lo lắng quá mức, dễ dẫn đến các quyết định sai lầm.
- Không nên đầu tư mạo hiểm, dễ gặp rủi ro lớn.`,
        numbers: ["108", "180", "801", "810", "709", "790", "907", "970",
                  "306", "360", "603", "630", "204", "240", "402", "420"],
        energy: {
            "180": 4.5, "810": 4.5, // Mức năng lượng cao nhất (tiêu cực)
            "108": 4, "801": 4, // Mức năng lượng cao nhất (tiêu cực)
            "790": 3.5, "970": 3.5,
            "709": 3, "907": 3,  // Mức năng lượng cao
            "360": 2.5, "630": 2.5,  // Mức năng lượng trung bình
            "306": 2, "603": 2,  // Mức năng lượng trung bình
            "240": 1.5, "420": 1.5,   // Mức năng lượng thấp
            "204": 1, "402": 1   // Mức năng lượng thấp
        },
        nature: "Hung hóa hung" // Năng lượng hung cực mạnh
    },
    
    TUYET_MENH: {
        name: "Tuyệt Mệnh",
        description: "Dốc sức, đầu tư, hành động, phá tài",
        detailedDescription: `Phản ứng nhanh, sự nhạy cảm rất mạnh mẽ, tâm địa mềm mỏng và thiện lương, rất dễ tin người.
- Dám mạo hiểm, có chí phấn đấu cố gắng. Tính cách thẳng thắn, trọng tình nghĩa, dễ kích động, rất nỗ lực phấn đấu.
- Thích đầu tư, dễ có tài sản cố định nhưng thiếu tài sản, đầu tư cẩn thận mất mát.
- Có sức phán đoán nhạy cảm, cần nhận được sự tán đồng, cá tính xung động, táo bạo, mạo hiểm, kiên trì.
- Khuyết điểm: Rất dễ tin người, Không giữ được tiền, dễ bị mất của, phá tài. Tính tình bảo thủ, tự cho mình là nhất.
- Tài vận: Không giữ được tiền, xuất tiền nhanh, dễ phá của phá tài, cần người hỗ trợ giữ tiền.
- Sự nghiệp: Làm về đầu tư tài chính, liều lĩnh, cổ phiếu hoặc tự mình lập nghiệp, mạo hiểm.
- Tình cảm: Dũng cảm đòi hỏi, nhưng sự cân bằng và cân đối kém, nên bất lợi cho hôn nhân, dễ ly hôn.
- Sức khỏe: Bệnh gan, thận, tiểu đường, tai nạn xe cộ, chết ngoài ý muốn, ung thư.
- Không có quý nhân tương trợ, mọi thứ tự thân, dễ có kiện cáo, dính dáng đến tranh chấp, hoặc hầu toà.`,
        numbers: ["12", "21", "69", "96", "84", "48", "73", "37"],
        energy: {
            "12": 4, "21": 4,  // Mức năng lượng cao nhất
            "69": 3, "96": 3,  // Mức năng lượng cao
            "84": 2, "48": 2,  // Mức năng lượng trung bình
            "73": 1, "37": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["12", "21", "69", "96"], // Năng lượng 3,4
            LOW: ["84", "48", "73", "37"]   // Năng lượng 1,2
        },
        nature: "Hung" // Inauspicious
    },
    
    // TUYET_MENH có số 0
    TUYET_MENH_ZERO: {
        name: "Tuyệt Mệnh hoa hung",
        description: "Tuyệt Mệnh có số 0: Đầu tư thất bại, bệnh dễ phát nặng, dễ có tai nạn xe cộ",
        detailedDescription: `Phản ứng nhanh, sự nhạy cảm rất mạnh mẽ, tâm địa mềm mỏng và thiện lương, rất dễ tin người.
- Sức khỏe dễ gặp vấn đề nghiêm trọng, bệnh tật nặng.
- Đầu tư thường mang lại kết quả không tốt, thua lỗ.
- Cần đặc biệt chú ý khi tham gia giao thông vì nguy cơ tai nạn cao.
- Nếu là nữ, có thể gặp khó khăn trong việc mang thai hoặc nuôi dạy con cái.
- Tiền bạc tiêu hao nhanh, khó tích lũy, dễ mất tài sản lớn.`,
        numbers: ["102", "120", "201", "210", "609", "690", "906", "960",
                  "408", "480", "804", "840", "307", "370", "703", "730"],
        energy: {
            "120": 4.5, "210": 4.5, // Mức năng lượng cao nhất (tiêu cực)
            "102": 4, "201": 4, // Mức năng lượng cao nhất (tiêu cực)
            "690": 3.5, "960": 3.5,
            "609": 3, "906": 3,  // Mức năng lượng cao
            "480": 2.5, "840": 2.5,  // Mức năng lượng trung bình
            "408": 2, "804": 2,  // Mức năng lượng trung bình
            "370": 1.5, "730": 1.5,   // Mức năng lượng thấp
            "307": 1, "703": 1   // Mức năng lượng thấp
        },
        nature: "Hung hóa hung" // Năng lượng hung cực mạnh
    }
};
module.exports = BAT_TINH;
