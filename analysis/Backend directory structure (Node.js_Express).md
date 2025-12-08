# Cấu trúc Dự án Fullstack: Node.js (Express) & Vue.js (Tailwind)

Tài liệu này mô tả chi tiết cách tổ chức thư mục cho một dự án Fullstack, bao gồm Backend (Node.js/Express theo mô hình MVC) và Frontend (Vue.js chia tách Client/Admin).

---

## 1. Cấu trúc Backend (Node.js/Express)

Backend thường tuân thủ mô hình **MVC** (Model-View-Controller) hoặc MVC-chiều phục vụ API. Các thư mục được phân chia dựa trên trách nhiệm cụ thể:

### Chi tiết các thư mục:
*   **`controllers/`**: Chứa các module xử lý request. Mỗi model hoặc tính năng sẽ có một controller tương ứng (ví dụ: `user.controller.js`, `product.controller.js`). Controller chịu trách nhiệm xử lý logic và trả về dữ liệu (JSON hoặc render view),.
*   **`routes/`**: Định nghĩa các endpoint (API path) và chuyển hướng yêu cầu đến controller tương ứng. Các file route (ví dụ: `user.routes.js`) sẽ được import vào `server.js` (hoặc `app.js`) thông qua `app.use()`,.
*   **`models/`**: Định nghĩa schema dữ liệu hoặc ORM models tương ứng với mỗi bảng trong cơ sở dữ liệu (ví dụ: `User.model.js`),.
*   **`services/`** *(Tùy chọn)*: Chứa logic nghiệp vụ phức tạp được tách biệt khỏi controller để đảm bảo tính gọn nhẹ và dễ bảo trì,.
*   **`middleware/`**: Chứa các hàm trung gian xử lý xác thực (auth), xử lý lỗi toàn cục, logging, hoặc CORS,.
*   **`config/`**: Lưu các file cấu hình hệ thống như thông tin database (`db.config.js`), cấu hình xác thực (`auth.config.js`),.
*   **`database/`**: Nơi khởi tạo kết nối cơ sở dữ liệu (ví dụ: khởi tạo Sequelize hoặc MySQL connection),.
*   **`utils/`** hoặc **`helpers/`**: Chứa các hàm tiện ích dùng chung (Logger, xử lý chuỗi, định dạng ngày tháng),.

### Cấu hình kết nối MySQL
Thông tin kết nối (host, user, pass) nên được lưu trong biến môi trường `.env` và gọi qua file cấu hình trung gian.
*   Ví dụ kết nối bằng thư viện `mysql2` hoặc `Sequelize` được thực hiện trong thư mục `database/` hoặc ngay tại `server.js` dựa trên config đã tải.

---

## 2. Cấu trúc Frontend (Vue.js + Tailwind)

Frontend Vue thường đặt mã nguồn trong thư mục `src/`, tuân thủ chuẩn tách biệt tài nguyên và logic component.

### Các thư mục tiêu chuẩn:
*   **`assets/`**: Lưu tệp tĩnh không gắn với component cụ thể như hình ảnh, font, stylesheet chung.
*   **`components/`**: Các thành phần UI tái sử dụng (Button, Form, Card...) độc lập, phục vụ nhiều trang khác nhau.
*   **`layouts/`**: Chứa bố cục khung trang dùng chung (Header, Footer, Sidebar). Ví dụ: `AdminLayout.vue` (có sidebar) và `MainLayout.vue` (cho khách hàng),.
*   **`views/`** (hoặc `pages/`): Chứa các trang chính tương ứng với các route (ví dụ: `Home.vue`, `Dashboard.vue`).
*   **`router/`**: Cấu hình Vue Router, định nghĩa việc mapping giữa URL và các component trong `views`.
*   **`store/`**: Quản lý trạng thái toàn cục (State Management) nếu dùng Vuex hoặc Pinia (ví dụ: `auth.js`, `user.js`).
*   **`services/`**: *(Tùy chọn)* Chứa logic gọi API (Axios instance).

### Phân tách Client và Admin (Multi-page)
Đối với dự án có cả website người dùng và trang quản trị, mã nguồn nên được tách riêng để dễ quản lý và build.
*   Cấu hình **Multi-page** trong `vue.config.js` cho phép build ra 2 file HTML riêng biệt: `client.html` và `admin.html`.
*   Mỗi phân hệ (Client/Admin) sẽ có `main.js`, `router.js` và `views` riêng biệt.

---

## 3. Tổng hợp Cây thư mục dự án (Fullstack Tree)

Dưới đây là sơ đồ thư mục tổng hợp cho một dự án hoàn chỉnh:

```text
project-root/
├── backend/
│   ├── config/
│   │   ├── db.config.js        # Cấu hình DB
│   │   └── auth.config.js      # Cấu hình JWT/Auth
│   ├── database/
│   │   └── index.js            # Khởi tạo kết nối MySQL
│   ├── controllers/
│   │   └── user.controller.js  # Xử lý logic request
│   ├── routes/
│   │   └── user.routes.js      # Định nghĩa API endpoints
│   ├── models/
│   │   └── user.model.js       # Schema dữ liệu
│   ├── services/
│   │   └── user.service.js     # Logic nghiệp vụ (nếu cần)
│   ├── middleware/
│   │   └── auth.middleware.js  # Middleware xác thực
│   ├── utils/
│   │   └── logger.js
│   ├── server.js               # Entrypoint của Express App
│   ├── .env                    # Biến môi trường (DB_HOST, PORT...)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── Admin/              # Mã nguồn trang Quản trị
    │   │   ├── components/
    │   │   ├── layouts/
    │   │   ├── views/          # VD: Dashboard.vue
    │   │   └── router.js       # Route riêng cho Admin
    │   ├── Client/             # Mã nguồn trang Khách hàng
    │   │   ├── components/
    │   │   ├── layouts/
    │   │   ├── views/          # VD: Home.vue
    │   │   └── router.js       # Route riêng cho Client
    │   ├── assets/             # Tài nguyên chung
    │   ├── store/              # Vuex/Pinia store chung
    │   ├── App.vue
    │   └── main.js
    ├── public/
    │   ├── index.html
    │   └── admin.html
    ├── tailwind.config.js      # Cấu hình Tailwind CSS
    ├── vue.config.js           # Cấu hình Multi-page
    └── package.json
```

---

## 4. Các tệp cấu hình quan trọng

1.  **`.env`**: Chứa biến môi trường nhạy cảm như `DB_HOST`, `JWT_SECRET`, `API_URL`. **Lưu ý:** Không đưa file này lên Git.
2.  **`package.json`**: Định nghĩa scripts (start, build, serve) và dependencies của dự án.
3.  **`vue.config.js`** (hoặc `vite.config.js`): Dùng để tùy chỉnh Vue CLI, thiết lập proxy API, hoặc cấu hình build nhiều trang (multi-entry pages),.
4.  **`tailwind.config.js`**: Cấu hình Tailwind CSS, bao gồm đường dẫn `content` để purge CSS thừa trong các file Vue.

