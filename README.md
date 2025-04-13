# Chatbot SDK API

API backend cho ứng dụng phân tích số điện thoại với hệ thống thanh toán và quản lý quota người dùng.

## Tính năng chính

- Xác thực người dùng: đăng ký, đăng nhập, quản lý thông tin cá nhân
- Phân tích số điện thoại theo phương pháp Tứ Cát Tứ Hung
- Hệ thống thanh toán và quản lý quota: người dùng có số lượng câu hỏi giới hạn
- API cho phép nâng cấp tài khoản và mua thêm câu hỏi
- Phân quyền admin để quản lý hệ thống

## Cài đặt và chạy local

### Yêu cầu

- Node.js (v14 trở lên)
- MongoDB

### Các bước cài đặt

1. Clone repository
   ```
   git clone <repository-url>
   cd chatbotsdtapi
   ```

2. Cài đặt dependencies
   ```
   npm install
   ```

3. Cài đặt biến môi trường
   ```
   cp .env.example .env
   ```
   Sau đó mở file `.env` và cập nhật các giá trị phù hợp.

4. Khởi động server
   ```
   npm start
   ```

Server sẽ chạy tại http://localhost:5000 (hoặc port được cấu hình trong .env)

## Triển khai lên môi trường production

### Chuẩn bị

1. Đảm bảo đã cập nhật file `.gitignore` để loại trừ các file nhạy cảm
2. Tạo các biến môi trường cần thiết trên host của bạn

### Các bước triển khai

1. Đẩy code lên GitHub
   ```
   git add .
   git commit -m "Chuẩn bị triển khai production"
   git push origin main
   ```

2. Triển khai lên server (ví dụ: Render, Heroku, hoặc VPS)
   - Với Render/Heroku: Kết nối repository GitHub và thiết lập các biến môi trường
   - Với VPS: Clone repository, cài đặt dependencies, thiết lập biến môi trường và chạy với PM2

3. Thiết lập database MongoDB Atlas hoặc MongoDB trên server

4. Cấu hình CORS trong `app.js` để chỉ cho phép các domain cụ thể

## API Endpoints

### Xác thực
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/verify-token` - Xác thực token

### Người dùng
- `GET /api/user/profile` - Lấy thông tin cá nhân
- `PUT /api/user/profile` - Cập nhật thông tin cá nhân
- `PUT /api/user/change-password` - Đổi mật khẩu

### Phân tích số điện thoại
- `POST /api/analysis/phone` - Phân tích số điện thoại

### Thanh toán và Quota
- `GET /api/user/questions` - Lấy số câu hỏi còn lại
- `POST /api/payment/create` - Tạo giao dịch thanh toán
- `POST /api/payment/complete/:id` - Hoàn tất thanh toán
- `GET /api/payment/history` - Lấy lịch sử thanh toán

### Admin
- `POST /api/admin/free-mode` - Bật/tắt chế độ miễn phí
- `POST /api/admin/add-questions/:userId` - Thêm câu hỏi cho user
- `POST /api/admin/set-premium/:userId` - Cập nhật trạng thái premium

## Bảo mật

- JWT được sử dụng cho xác thực
- Mật khẩu được mã hóa bằng bcrypt
- API được bảo vệ bởi middleware xác thực
- Biến môi trường được sử dụng để lưu trữ thông tin nhạy cảm 