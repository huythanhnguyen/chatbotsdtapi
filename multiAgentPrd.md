# Task Master: Phong Thủy Số (Multi-Agent System)

## Tổng quan dự án
Dự án Phong Thủy Số cung cấp các dịch vụ phân tích phong thủy cho số điện thoại, mật khẩu, số tài khoản ngân hàng, và các thông tin cá nhân khác. Bản PRD này mô tả kế hoạch triển khai mô hình Multi-Agent System để nâng cao khả năng phân tích và tư vấn của hệ thống.

## Phạm vi tài liệu
- Mô tả kiến trúc Multi-Agent System cho Phong Thủy Số
- Chi tiết các nhiệm vụ triển khai cho cả frontend và backend
- Quy trình phát triển và timeline

## Quy trình quản lý task
1. Mỗi task được đánh dấu với các thông tin: ID, tiêu đề, mô tả, độ ưu tiên (P0-P3), trạng thái, người được phân công, ngày bắt đầu dự kiến và deadline
2. Các trạng thái task: `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`, `BLOCKED`
3. Cập nhật tiến độ hàng ngày vào progress log

## Giai đoạn 1: Kiến trúc Multi-Agent System

### 1. Thiết kế kiến trúc tổng thể

#### 1.1. Định nghĩa kiến trúc agent
- ID: `ARCH-001`
- Phân loại: Backend
- Mô tả: Thiết kế kiến trúc Agent-to-Agent (A2A) theo ADK framework
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Định nghĩa cấu trúc Root Agent (General Bot)
  - [ ] Định nghĩa cấu trúc Specialist Agents (Expert Bots)
  - [ ] Thiết kế giao thức giao tiếp giữa các agent
  - [ ] Xác định các công cụ (tools) cho từng agent
  - [ ] Lập tài liệu kiến trúc tổng thể

#### 1.2. Thiết kế giao thức A2A
- ID: `ARCH-002`
- Phân loại: Backend
- Mô tả: Phát triển giao thức Agent-to-Agent cho hệ thống
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Định nghĩa cấu trúc message giữa các agent
  - [ ] Thiết kế flow giao tiếp và ủy thác nhiệm vụ
  - [ ] Xác định cơ chế xử lý lỗi và fallback
  - [ ] Định nghĩa API endpoints cho mỗi agent

#### 1.3. Thiết kế cơ sở dữ liệu
- ID: `ARCH-003`
- Phân loại: Backend
- Mô tả: Nâng cấp schema cơ sở dữ liệu để hỗ trợ Multi-Agent
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế schema lưu trữ nội dung hội thoại đa agent
  - [ ] Định nghĩa mô hình dữ liệu cho từng loại agent
  - [ ] Thiết kế cấu trúc lưu trữ context giữa các agent
  - [ ] Định nghĩa các quan hệ và ràng buộc giữa các collection

## Giai đoạn 2: Phát triển Backend

### 2. Root Agent (General Bot)

#### 2.1. Xây dựng Root Agent
- ID: `AGENT-001`
- Phân loại: Backend
- Mô tả: Phát triển General Bot xử lý yêu cầu ban đầu và điều phối các Expert Bot
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Tạo module Root Agent với Gemini API
  - [ ] Xây dựng hệ thống phân tích ý định người dùng (intent detection)
  - [ ] Phát triển cơ chế lưu trữ và quản lý context
  - [ ] Triển khai logic điều phối và ủy thác cho các Expert Bot

#### 2.2. Xây dựng hệ thống quản lý hội thoại
- ID: `AGENT-002`
- Phân loại: Backend
- Mô tả: Phát triển hệ thống quản lý hội thoại multi-agent
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Xây dựng API endpoints quản lý hội thoại
  - [ ] Phát triển cơ chế lưu trữ lịch sử hội thoại nhiều agent
  - [ ] Triển khai hệ thống quản lý turn-taking giữa các agent
  - [ ] Xây dựng cơ chế tổng hợp phản hồi từ nhiều agent

### 3. Expert Bots (Specialist Agents)

#### 3.1. Phát triển Phone Number Bot
- ID: `AGENT-003`
- Phân loại: Backend
- Mô tả: Xây dựng bot chuyên về phân tích phong thủy số điện thoại
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai Phone Bot với instruction chuyên biệt
  - [ ] Phát triển công cụ (tools) phân tích số điện thoại
  - [ ] Xây dựng API endpoints cho Phone Bot
  - [ ] Tối ưu hóa prompt và response templates

#### 3.2. Phát triển Password Bot
- ID: `AGENT-004`
- Phân loại: Backend
- Mô tả: Xây dựng bot chuyên về mật khẩu hợp phong thủy
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai Password Bot với instruction chuyên biệt
  - [ ] Phát triển công cụ (tools) phân tích và tạo mật khẩu
  - [ ] Xây dựng API endpoints cho Password Bot
  - [ ] Tối ưu hóa prompt và response templates

#### 3.3. Phát triển Bank Account Bot
- ID: `AGENT-005`
- Phân loại: Backend
- Mô tả: Xây dựng bot chuyên về phân tích số tài khoản ngân hàng
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai Bank Account Bot với instruction chuyên biệt
  - [ ] Phát triển công cụ (tools) phân tích số tài khoản
  - [ ] Xây dựng API endpoints cho Bank Account Bot
  - [ ] Tối ưu hóa prompt và response templates

#### 3.4. Phát triển CCCD Bot
- ID: `AGENT-006`
- Phân loại: Backend
- Mô tả: Xây dựng bot chuyên phân tích căn cước công dân
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai CCCD Bot với instruction chuyên biệt
  - [ ] Phát triển công cụ (tools) phân tích CCCD
  - [ ] Xây dựng API endpoints cho CCCD Bot
  - [ ] Tối ưu hóa prompt và response templates

### 4. Integration và APIs

#### 4.1. API Gateway
- ID: `API-001`
- Phân loại: Backend
- Mô tả: Phát triển API Gateway cho hệ thống multi-agent
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế và xây dựng API Gateway
  - [ ] Triển khai xác thực và phân quyền
  - [ ] Cài đặt rate limiting và caching
  - [ ] Thiết lập logging và monitoring

#### 4.2. Webhooks và Event Handling
- ID: `API-002`
- Phân loại: Backend
- Mô tả: Xây dựng hệ thống Webhooks và xử lý sự kiện
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Phát triển cơ chế event broadcasting
  - [ ] Triển khai webhooks cho các sự kiện agent
  - [ ] Xây dựng hệ thống notification
  - [ ] Triển khai message queue cho xử lý bất đồng bộ

## Giai đoạn 3: Phát triển Frontend

### 5. UI/UX cho Multi-Agent System

#### 5.1. Thiết kế Chat Interface
- ID: `UI-001`
- Phân loại: Frontend
- Mô tả: Thiết kế giao diện chat hỗ trợ nhiều agent
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế UI chat với nhận diện agent đang nói
  - [ ] Phát triển các template tin nhắn khác nhau cho từng loại agent
  - [ ] Thiết kế typing indicators cho các agent
  - [ ] Xây dựng giao diện chuyển đổi giữa các chế độ chat

#### 5.2. Agent Selection Dropdown
- ID: `UI-002`
- Phân loại: Frontend
- Mô tả: Thiết kế và triển khai dropdown chọn agent trong AppView
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế UI dropdown menu
  - [ ] Phát triển logic chuyển đổi giữa các agent
  - [ ] Tạo các icon cho từng loại agent
  - [ ] Thiết kế animation chuyển đổi giữa các agent

#### 5.3. Context Visualization
- ID: `UI-003`
- Phân loại: Frontend
- Mô tả: Phát triển giao diện hiển thị context giữa các agent
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế UI hiển thị thông tin được chia sẻ giữa các agent
  - [ ] Phát triển modal hiển thị flow hội thoại
  - [ ] Xây dựng giao diện debug context (dành cho dev)
  - [ ] Tạo UI hiển thị các bước phân tích

### 6. State Management

#### 6.1. Multi-Agent State
- ID: `STATE-001`
- Phân loại: Frontend
- Mô tả: Nâng cấp Pinia store để hỗ trợ multi-agent
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế cấu trúc state cho multi-agent
  - [ ] Phát triển actions và getters cho các agent khác nhau
  - [ ] Xây dựng cơ chế lưu trữ phản hồi của từng agent
  - [ ] Triển khai persistence cho trạng thái hội thoại

#### 6.2. Real-time Updates
- ID: `STATE-002`
- Phân loại: Frontend
- Mô tả: Triển khai cơ chế cập nhật real-time cho multi-agent
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai WebSocket connection
  - [ ] Phát triển cơ chế lắng nghe sự kiện từ các agent
  - [ ] Xây dựng animation loading/typing cho từng agent
  - [ ] Thiết kế cơ chế thông báo khi agent mới tham gia

### 7. Tool Integration

#### 7.1. Phone Analysis Tool
- ID: `TOOL-001`
- Phân loại: Frontend
- Mô tả: Nâng cấp công cụ phân tích số điện thoại
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế lại UI phân tích số điện thoại
  - [ ] Tích hợp với Phone Bot API
  - [ ] Phát triển hiển thị kết quả phân tích chi tiết
  - [ ] Xây dựng tính năng so sánh các số điện thoại

#### 7.2. Password Tool
- ID: `TOOL-002`
- Phân loại: Frontend
- Mô tả: Nâng cấp công cụ tạo mật khẩu
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế lại UI tạo mật khẩu
  - [ ] Tích hợp với Password Bot API
  - [ ] Phát triển hiển thị các lựa chọn mật khẩu
  - [ ] Xây dựng tính năng đánh giá mật khẩu hiện tại

#### 7.3. Bank Account Tool
- ID: `TOOL-003`
- Phân loại: Frontend
- Mô tả: Nâng cấp công cụ phân tích số tài khoản
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế lại UI phân tích số tài khoản
  - [ ] Tích hợp với Bank Account Bot API
  - [ ] Phát triển hiển thị kết quả phân tích chi tiết
  - [ ] Xây dựng tính năng gợi ý số tài khoản

#### 7.4. CCCD Tool
- ID: `TOOL-004`
- Phân loại: Frontend
- Mô tả: Nâng cấp công cụ phân tích CCCD
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế lại UI phân tích CCCD
  - [ ] Tích hợp với CCCD Bot API
  - [ ] Phát triển hiển thị kết quả phân tích chi tiết
  - [ ] Đảm bảo bảo mật thông tin nhạy cảm

## Giai đoạn 4: Tích hợp và Thanh toán

### 8. Tích hợp thanh toán thực tế

#### 8.1. Cổng thanh toán PayOS
- ID: `PAY-001`
- Phân loại: Backend
- Mô tả: Tích hợp cổng thanh toán PayOS vào hệ thống
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Đăng ký tài khoản merchant PayOS
  - [ ] Triển khai SDK/API của PayOS vào backend
  - [ ] Xây dựng endpoint xử lý callback
  - [ ] Kiểm thử quá trình thanh toán end-to-end

#### 8.2. Quản lý giao dịch
- ID: `PAY-002`
- Phân loại: Backend
- Mô tả: Xây dựng hệ thống quản lý giao dịch toàn diện
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Nâng cấp database schema để lưu thông tin giao dịch
  - [ ] Xây dựng API quản lý giao dịch
  - [ ] Tạo tính năng xuất hóa đơn điện tử
  - [ ] Thêm chức năng thông báo email/SMS sau giao dịch

#### 8.3. UI Thanh toán
- ID: `PAY-003`
- Phân loại: Frontend
- Mô tả: Nâng cấp giao diện thanh toán
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế lại UI thanh toán và bảng giá
  - [ ] Xây dựng flow thanh toán mới tích hợp PayOS
  - [ ] Phát triển UI hiển thị trạng thái giao dịch
  - [ ] Thiết kế trang xác nhận và thông báo thanh toán

#### 8.4. Gói thanh toán và subscription
- ID: `PAY-004`
- Phân loại: Backend+Frontend
- Mô tả: Phát triển hệ thống gói thanh toán và subscription
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế database schema cho subscription
  - [ ] Xây dựng API quản lý subscription
  - [ ] Phát triển UI hiển thị và quản lý subscription
  - [ ] Triển khai cơ chế nhắc nhở gia hạn

## Giai đoạn 5: Bảo mật và Hiệu suất

### 9. Bảo mật

#### 9.1. Tăng cường xác thực
- ID: `SEC-001`
- Phân loại: Backend
- Mô tả: Tăng cường hệ thống xác thực người dùng
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai 2FA (Xác thực hai yếu tố)
  - [ ] Nâng cấp JWT security
  - [ ] Triển khai CSRF protection
  - [ ] Thêm tính năng đăng nhập đáng ngờ

#### 9.2. Bảo mật dữ liệu
- ID: `SEC-002`
- Phân loại: Backend
- Mô tả: Tăng cường bảo mật dữ liệu người dùng
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai mã hóa dữ liệu nhạy cảm
  - [ ] Xây dựng cơ chế xóa dữ liệu tự động
  - [ ] Triển khai kiểm soát quyền truy cập chi tiết
  - [ ] Xây dựng cơ chế audit log

### 10. Hiệu suất

#### 10.1. Backend Optimization
- ID: `PERF-001`
- Phân loại: Backend
- Mô tả: Tối ưu hóa hiệu suất backend
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Triển khai caching (Redis)
  - [ ] Tối ưu hóa database queries
  - [ ] Xây dựng cơ chế auto-scaling
  - [ ] Triển khai cơ chế rate limiting

#### 10.2. Frontend Optimization
- ID: `PERF-002`
- Phân loại: Frontend
- Mô tả: Tối ưu hóa hiệu suất frontend
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Tối ưu hóa kích thước bundle
  - [ ] Triển khai lazy loading components
  - [ ] Cải thiện rendering performance
  - [ ] Triển khai prefetch và preload

## Giai đoạn 6: Quản trị và Analytics

### 11. Trang quản trị admin

#### 11.1. Admin Dashboard
- ID: `ADMIN-001`
- Phân loại: Frontend
- Mô tả: Xây dựng trang quản trị admin
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế UI dashboard admin
  - [ ] Xây dựng trang quản lý người dùng
  - [ ] Phát triển trang quản lý giao dịch
  - [ ] Triển khai trang cấu hình hệ thống

#### 11.2. API Admin
- ID: `ADMIN-002`
- Phân loại: Backend
- Mô tả: Xây dựng API cho trang quản trị
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Phát triển API quản lý người dùng
  - [ ] Xây dựng API quản lý giao dịch
  - [ ] Triển khai API cấu hình hệ thống
  - [ ] Xây dựng cơ chế phân quyền chi tiết

### 12. Analytics

#### 12.1. User Analytics
- ID: `ANALYTICS-001`
- Phân loại: Backend+Frontend
- Mô tả: Xây dựng hệ thống phân tích hành vi người dùng
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế schema lưu trữ event
  - [ ] Xây dựng API thu thập dữ liệu
  - [ ] Phát triển dashboard thống kê
  - [ ] Xây dựng hệ thống báo cáo tự động

#### 12.2. Agent Performance Analytics
- ID: `ANALYTICS-002`
- Phân loại: Backend+Frontend
- Mô tả: Xây dựng hệ thống đánh giá hiệu suất các agent
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế metrics đánh giá hiệu suất agent
  - [ ] Xây dựng hệ thống thu thập và lưu trữ metrics
  - [ ] Phát triển dashboard hiển thị metrics
  - [ ] Triển khai hệ thống cảnh báo khi hiệu suất thấp

## Timeline và Milestones

### Milestone 1: Kiến trúc cơ bản (T + 1.5 tháng)
- Hoàn thành thiết kế kiến trúc tổng thể
- Triển khai Root Agent và ít nhất một Expert Bot
- Xây dựng giao thức A2A cơ bản
- Phát triển UI chat cơ bản

### Milestone 2: Multi-Agent Core (T + 3 tháng)
- Hoàn thành tất cả Expert Bots
- Triển khai đầy đủ giao diện người dùng
- Hoàn thiện hệ thống state management
- Tích hợp các công cụ phân tích

### Milestone 3: Thanh toán và Bảo mật (T + 4.5 tháng)
- Tích hợp cổng thanh toán PayOS
- Hoàn thiện hệ thống quản lý giao dịch
- Triển khai các tính năng bảo mật
- Tối ưu hóa hiệu suất hệ thống

### Milestone 4: Quản trị và Phát hành (T + 6 tháng)
- Hoàn thiện trang quản trị admin
- Triển khai hệ thống analytics
- Thực hiện kiểm thử cuối cùng
- Phát hành phiên bản đầy đủ

## Yêu cầu kỹ thuật

### Backend
- Node.js v16+ với Express
- MongoDB cho cơ sở dữ liệu chính
- Redis cho caching và pub/sub
- Gemini API cho các agent
- Docker cho containerization
- API RESTful + WebSockets

### Frontend
- Vue.js 3 với Composition API
- Pinia cho state management
- Vue Router cho routing
- TailwindCSS cho styling
- WebSockets cho real-time updates

## Quản lý rủi ro

| Rủi ro | Mức độ ảnh hưởng | Khả năng xảy ra | Giải pháp giảm thiểu |
|--------|------------------|-----------------|----------------------|
| Độ trễ API cao khi nhiều agent hoạt động | Cao | Trung bình | Tối ưu hóa caching, sử dụng message queue |
| Chi phí API Gemini tăng cao | Trung bình | Cao | Thiết lập hạn mức sử dụng, tối ưu hóa prompt |
| Khó khăn khi tích hợp cổng thanh toán | Cao | Thấp | Lên kế hoạch dự phòng, kiểm thử sớm |
| Phân chia context không hiệu quả giữa các agent | Cao | Trung bình | Thiết kế kỹ lưỡng giao thức A2A, kiểm thử edge cases |
| Khó khăn trong việc duy trì trạng thái nhất quán | Cao | Cao | Triển khai hệ thống quản lý trạng thái tập trung |

## Phụ lục A: Tham chiếu API

### Root Agent API

#### POST /api/v1/chat
- **Mô tả**: Endpoint chính để người dùng gửi tin nhắn và nhận phản hồi từ hệ thống multi-agent
- **Tham số**:
  ```json
  {
    "message": "Phân tích số điện thoại 0912345678",
    "conversation_id": "conv123",
    "user_id": "user456"
  }
  ```
- **Phản hồi**:
  ```json
  {
    "response": "Tôi sẽ phân tích số điện thoại 0912345678 cho bạn...",
    "agent_id": "general_bot",
    "conversation_id": "conv123",
    "next_steps": [
      {
        "agent_id": "phone_bot",
        "status": "processing"
      }
    ]
  }
  ```

#### GET /api/v1/conversations/:id
- **Mô tả**: Lấy lịch sử hội thoại
- **Phản hồi**:
  ```json
  {
    "conversation_id": "conv123",
    "messages": [
      {
        "role": "user",
        "content": "Phân tích số điện thoại 0912345678",
        "timestamp": "2023-06-15T14:30:00Z"
      },
      {
        "role": "assistant",
        "content": "Tôi sẽ phân tích số điện thoại 0912345678 cho bạn...",
        "agent_id": "general_bot",
        "timestamp": "2023-06-15T14:30:05Z"
      }
    ]
  }
  ```

### Expert Bot APIs

#### POST /api/v1/agents/phone/analyze
- **Mô tả**: Phân tích số điện thoại theo quy tắc phong thủy
- **Tham số**:
  ```json
  {
    "phone_number": "0912345678",
    "user_info": {
      "birth_date": "1990-01-01",
      "purpose": "business"
    }
  }
  ```
- **Phản hồi**:
  ```json
  {
    "analysis": {
      "overall_score": 8.5,
      "pairs": [
        {
          "pair": "12",
          "meaning": "Thiên Tài - Cát",
          "description": "Tượng trưng cho may mắn và thành công về tài lộc"
        },
        ...
      ],
      "recommendations": [
        "Số điện thoại này rất tốt cho mục đích kinh doanh",
        ...
      ]
    }
  }
  ```

#### POST /api/v1/agents/password/generate
- **Mô tả**: Tạo mật khẩu phù hợp phong thủy
- **Tham số**:
  ```json
  {
    "length": 12,
    "purpose": "wealth",
    "user_info": {
      "birth_date": "1990-01-01",
      "element": "water"
    }
  }
  ```
- **Phản hồi**:
  ```json
  {
    "passwords": [
      {
        "value": "Wealth1368$#",
        "score": 9.2,
        "strength": "strong",
        "analysis": {
          "phongtui_score": 9.5,
          "security_score": 8.8,
          "pairs": [
            {
              "pair": "13",
              "meaning": "Sinh Khí - Cát",
              "description": "Tượng trưng cho sự tăng trưởng và phát triển"
            },
            ...
          ]
        }
      },
      ...
    ]
  }
  ```

#### POST /api/v1/agents/bank/analyze
- **Mô tả**: Phân tích số tài khoản ngân hàng
- **Tham số**:
  ```json
  {
    "account_number": "0123456789",
    "bank_name": "VCB",
    "user_info": {
      "birth_date": "1990-01-01",
      "purpose": "savings"
    }
  }
  ```
- **Phản hồi**:
  ```json
  {
    "analysis": {
      "overall_score": 7.8,
      "pairs": [
        {
          "pair": "56",
          "meaning": "Diên Niên - Cát",
          "description": "Tượng trưng cho sự ổn định, bền vững lâu dài"
        },
        ...
      ],
      "recommendations": [
        "Số tài khoản này phù hợp cho tiết kiệm dài hạn",
        ...
      ]
    }
  }
  ```

## Phụ lục B: Cấu trúc Agent Protocol

### Cấu trúc gói tin A2A

```json
{
  "header": {
    "message_id": "msg123",
    "source_agent": "general_bot",
    "target_agent": "phone_bot",
    "timestamp": "2023-06-15T14:30:00Z",
    "conversation_id": "conv123",
    "user_id": "user456"
  },
  "payload": {
    "query": "Phân tích số điện thoại 0912345678",
    "intent": "phone_analysis",
    "parameters": {
      "phone_number": "0912345678"
    },
    "context": {
      "user_info": {
        "birth_date": "1990-01-01",
        "purpose": "business"
      },
      "conversation_history": [
        {
          "role": "user",
          "content": "Phân tích số điện thoại 0912345678"
        }
      ]
    }
  },
  "control": {
    "response_format": "detailed",
    "priority": "normal",
    "max_tokens": 2048,
    "timeout": 30
  }
}
```

### Cấu trúc phản hồi Agent

```json
{
  "header": {
    "message_id": "resp123",
    "source_agent": "phone_bot",
    "target_agent": "general_bot",
    "in_response_to": "msg123",
    "timestamp": "2023-06-15T14:30:05Z",
    "conversation_id": "conv123"
  },
  "payload": {
    "response": {
      "content": "Kết quả phân tích số điện thoại 0912345678:\n- Tổng điểm: 8.5/10\n- Cặp số 12: Thiên Tài (Cát)...",
      "formatted_content": {
        "overall_score": 8.5,
        "pairs": [
          {
            "pair": "12",
            "meaning": "Thiên Tài - Cát",
            "description": "Tượng trưng cho may mắn và thành công về tài lộc"
          }
        ]
      }
    },
    "next_actions": [
      {
        "type": "suggestion",
        "content": "Bạn có muốn so sánh với một số điện thoại khác không?"
      }
    ]
  },
  "metadata": {
    "processing_time": 1.2,
    "token_count": 512,
    "confidence_score": 0.95
  }
}
```

## Phụ lục C: Cấu hình Agent Prompt

### Root Agent (General Bot) Prompt Template

```
Bạn là trợ lý Phong Thủy Số thông minh.

Nhiệm vụ chính:
- Trò chuyện với người dùng để hiểu nhu cầu
- Phân tích yêu cầu và điều phối các bot chuyên ngành

Quy tắc ủy thác:
- Nếu người dùng hỏi về phân tích số điện thoại, ủy thác cho phone_analysis_bot
- Nếu người dùng cần tư vấn mật khẩu, ủy thác cho password_bot
- Nếu người dùng hỏi về số tài khoản, ủy thác cho bank_account_bot
- Nếu người dùng hỏi về CCCD, ủy thác cho cccd_bot
- Với các câu hỏi chung về phong thủy, hãy trả lời trong phạm vi kiến thức của bạn

Quy tắc phản hồi:
- Giữ giọng điệu thân thiện, chuyên nghiệp
- Tóm tắt thông tin từ các bot chuyên ngành một cách dễ hiểu
- Gợi ý các dịch vụ phù hợp khác nếu phù hợp

Lưu ý đặc biệt:
- Khi chuyển tiếp đến expert bot, luôn chuyển theo đúng định dạng giao thức A2A
- Khi nhận phản hồi từ expert bot, tóm tắt kết quả một cách ngắn gọn, dễ hiểu
- Luôn truy xuất đầy đủ thông tin cần thiết từ người dùng
```
