# Quy tắc và Hướng dẫn làm việc với Cursor IDE

## Cấu trúc dự án

```
chatbotsdtapi/
├── config/            # Cấu hình ứng dụng
├── controllers/       # Logic xử lý request/response
├── middleware/        # Middleware xác thực, quota, ...
├── models/            # Mô hình MongoDB
├── routes/            # Định nghĩa API routes
├── services/          # Dịch vụ nghiệp vụ
├── constants/         # Hằng số và enum
├── app.js             # Khởi tạo Express app
├── server.js          # Entry point
└── .env               # Biến môi trường
```

## Quy tắc Code

### Kiểu dữ liệu và biến
- Sử dụng `const` cho biến không thay đổi
- Sử dụng `let` cho biến có thể thay đổi
- Đặt tên biến theo kiểu camelCase
- Đặt tên hằng số theo kiểu UPPER_SNAKE_CASE

### Function và phương thức
- Sử dụng cú pháp arrow function cho callbacks
- Đặt tên function theo kiểu camelCase
- Xử lý lỗi bằng try/catch
- Sử dụng async/await thay vì callback hay promise chain

### API Endpoint
- Endpoint viết dạng kebab-case
- Endpoint phải có tiền tố `/api/`
- Sử dụng HTTP method đúng ngữ nghĩa:
  - GET: Lấy dữ liệu
  - POST: Tạo mới
  - PUT: Cập nhật toàn bộ
  - PATCH: Cập nhật một phần
  - DELETE: Xóa

### Response
- Format JSON:
```json
{
  "success": boolean,
  "data": object|array,
  "message": string,
  "error": string|object
}
```

## Cursor IDE Settings

### Mở rộng đề xuất
- Sử dụng `.js` để kích hoạt tính năng gợi ý code Node.js
- Gợi ý tự hoàn thành sẽ được kích hoạt cho các API của MongoDB và Mongoose
- Sử dụng các extensions: ESLint, Prettier, MongoDB for VS Code

### Auto-format và Linters
- Auto-format on save sử dụng Prettier
- ESLint với cấu hình trong `.eslintrc.js`
- Tuân thủ semi-colon và dấu ngoặc nhọn

### Markdown support
- Hỗ trợ hiển thị Markdown preview cho các file .md
- Sử dụng markdown linting để đảm bảo format chuẩn

## Quy trình Phát triển

### Branches
- `main`: Branch chính
- `dev`: Branch phát triển
- `feature/*`: Branch tính năng mới
- `bugfix/*`: Branch sửa lỗi

### Coding và Commit
1. Tạo branch mới từ `dev`
2. Viết code và test
3. Commit với message rõ ràng (sử dụng prefix: feat, fix, docs, chore...)
4. Tạo pull request để merge vào `dev`

### Triển khai
1. Chỉ merge vào `main` khi code đã pass toàn bộ test
2. Sử dụng CI/CD pipeline nếu có
3. Triển khai lên production server

## Debugging với Cursor

### Console.log
- Sử dụng enhanced console logging
```javascript
console.log('user:', { id: user.id, role: user.role });
```

### Error handling
- Sử dụng metadata trong error
```javascript
throw new Error(JSON.stringify({ code: 'VALIDATION_FAILED', fields: ['email'] }));
```

### API Testing
- Sử dụng extension REST Client để test API ngay trong Cursor
- Lưu các request mẫu vào file `.http` hoặc `.rest` 