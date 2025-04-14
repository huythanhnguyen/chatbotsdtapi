# Tài liệu Mô tả Sản phẩm - Phong Thủy Số Chatbot API

## Tổng quan

Phong Thủy Số Chatbot API là một dịch vụ backend cung cấp các API cho ứng dụng phong thủy số học để phân tích số điện thoại và trả lời các câu hỏi liên quan đến phong thủy. Hệ thống sử dụng công nghệ AI (Gemini) để phân tích và trả lời câu hỏi người dùng về ý nghĩa phong thủy của số điện thoại.

## Mô hình kinh doanh

- **Mô hình Freemium**: Người dùng được cấp số lượng câu hỏi dùng thử miễn phí (mặc định là 5 câu)
- **Gói thanh toán**: Người dùng có thể mua thêm câu hỏi hoặc nâng cấp lên tài khoản Premium
- **Phiên demo**: Cung cấp phân tích cơ bản không cần đăng ký tài khoản

## Kiến trúc hệ thống

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **AI Service**: Google Gemini API

## Tính năng chính

### 1. Xác thực người dùng
- Đăng ký tài khoản mới
- Đăng nhập/đăng xuất
- Đổi mật khẩu
- Quên mật khẩu/đặt lại mật khẩu
- Xác thực token

### 2. Phân tích số điện thoại
- Phân tích chi tiết số điện thoại dựa trên nguyên lý phong thủy số học
- Xác định trình tự sao, mức năng lượng, cân bằng và các tổ hợp đặc biệt
- Lấy lịch sử phân tích
- Xóa phân tích cũ

### 3. Chatbot câu hỏi
- Đặt câu hỏi về phân tích số điện thoại
- Hỗ trợ các câu hỏi tiếp theo (follow-up questions)
- Xóa lịch sử hội thoại

### 4. Quản lý thanh toán
- Kiểm tra số câu hỏi còn lại
- Tạo giao dịch thanh toán mới
- Hoàn thành thanh toán
- Xem lịch sử thanh toán

### 5. Quản trị hệ thống
- Bật/tắt chế độ miễn phí cho toàn hệ thống
- Thêm câu hỏi cho người dùng cụ thể
- Đặt trạng thái premium cho người dùng
- Xem cấu hình hệ thống

### 6. Demo không cần đăng nhập
- Phân tích số điện thoại giới hạn (chỉ hiển thị dữ liệu cơ bản)

## API Endpoints

### Xác thực (Authentication)
```
POST /api/auth/register         - Đăng ký người dùng mới
POST /api/auth/login            - Đăng nhập
GET /api/auth/verify-token      - Xác thực token
GET /api/auth/me                - Lấy thông tin người dùng hiện tại
POST /api/auth/change-password  - Đổi mật khẩu
POST /api/auth/forgot-password  - Yêu cầu đặt lại mật khẩu
POST /api/auth/reset-password   - Đặt lại mật khẩu với token
POST /api/auth/logout           - Đăng xuất
```

### Phân tích số điện thoại
```
POST /api/analysis/analyze      - Phân tích số điện thoại
GET /api/analysis/history       - Lấy lịch sử phân tích
GET /api/analysis/:id           - Lấy chi tiết một phân tích
DELETE /api/analysis/:id        - Xóa một phân tích
POST /api/analysis/question     - Xử lý câu hỏi liên quan đến phân tích
```

### Chatbot
```
POST /api/chat/analyze          - Phân tích số điện thoại (yêu cầu xác thực và quota)
POST /api/chat/question         - Xử lý câu hỏi (yêu cầu xác thực và quota)
POST /api/chat/clear            - Xóa lịch sử hội thoại
```

### Thanh toán
```
GET /api/payments/user/questions    - Lấy số câu hỏi còn lại của người dùng
POST /api/payments/payment/create   - Tạo giao dịch thanh toán mới
POST /api/payments/payment/complete/:id - Hoàn thành thanh toán
GET /api/payments/payment/history   - Lấy lịch sử thanh toán
```

### Quản trị viên
```
POST /api/admin/free-mode           - Bật/tắt chế độ miễn phí cho toàn hệ thống
POST /api/admin/add-questions/:userId - Thêm câu hỏi cho user
POST /api/admin/set-premium/:userId - Đặt trạng thái premium cho user
GET /api/admin/system-config        - Lấy cấu hình hệ thống
```

### Demo
```
POST /api/demo/analyze              - Phân tích số điện thoại demo (không cần xác thực)
```

## Mô hình dữ liệu

### User
- ID
- Tên
- Email
- Mật khẩu (được mã hóa)
- Vai trò (user/admin)
- Số điện thoại
- Số câu hỏi còn lại
- Trạng thái Premium
- Ngày tạo
- Lần đăng nhập cuối

### Payment
- ID
- User ID
- Số tiền
- Trạng thái (pending/completed/failed)
- Gói dịch vụ
- Số câu hỏi được thêm
- Ngày tạo
- Ngày hoàn thành

### Analysis
- ID
- User ID
- Số điện thoại
- Kết quả phân tích (trình tự sao, mức năng lượng, cân bằng, tổ hợp sao, ...)
- Phản hồi từ Gemini
- Ngày tạo

## Hạn chế & Giới hạn
- Mỗi người dùng được cấp số lượng câu hỏi dùng thử ban đầu
- Người dùng cần mua thêm câu hỏi để tiếp tục sử dụng dịch vụ sau khi hết câu hỏi miễn phí
- Phiên demo chỉ cung cấp phân tích hạn chế về số điện thoại 