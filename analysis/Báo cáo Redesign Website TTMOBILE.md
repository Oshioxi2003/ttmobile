# Báo cáo Redesign Website T&T MOBILE (TTMOBILE)

## 1. Phân tích thiết kế hiện tại và Đề xuất giao diện mới

### Hiện trạng
*   **Giao diện:** Phục vụ nhiều danh mục (điện thoại, laptop, SIM...) nhưng menu phức tạp, nhiều mục con và thông tin hỗ trợ không trực tiếp phục vụ mua sắm (ví dụ: Blog, Thu mua điện thoại cũ).
*   **Màu sắc:** Kết hợp nhiều tông (nền tối, chữ sáng) gây cảm giác nặng nề.
*   **Chức năng:** Có nút "Mua ngay", "Đặt hàng" và thanh toán qua hướng dẫn (SmartPit), nhưng bố cục chưa tối ưu cho trải nghiệm mua nhanh.

### Đề xuất giao diện mới
*   **Màu sắc chủ đạo:** **Trắng – Xanh dương**.
    *   Màu xanh dương đậm: Tạo cảm giác tin cậy, chuyên nghiệp, an tâm.
    *   Màu trắng: Tăng tính tối giản, rõ ràng, làm nổi bật sản phẩm.
*   **Tối giản hóa:** Loại bỏ mục "Tin tức (Blog)" và "Thu mua" khỏi menu chính để giảm tải thông tin thừa.
*   **Menu cốt lõi:** Chỉ giữ lại Trang Chủ, Sản Phẩm, Hướng Dẫn Mua Hàng, Chính Sách Bảo Hành, và Liên Hệ.

### Thay đổi chức năng mua hàng (Quan trọng)
*   **Bỏ thanh toán trực tuyến:** Theo yêu cầu dự án, quy trình thanh toán online phức tạp sẽ bị loại bỏ hoàn toàn.
*   **Chuyển đổi nút bấm:** Nút "Mua Ngay" được thay bằng **"Liên hệ mua hàng"** hoặc các nút cụ thể **"Mua qua Facebook"**, **"Mua qua Zalo"** ngay dưới giá sản phẩm.
*   **Vị trí liên hệ:** Hotline và icon chat sẽ luôn hiển thị ở Header/Footer để khách dễ tương tác.

---

## 2. Bố cục và Cấu trúc trang

### Trang chủ mới
*   **Header:** Logo, hotline (03-5980-9826), nút Facebook/Zalo hỗ trợ nhanh.
*   **Banner:** Hình ảnh sản phẩm nổi bật (VD: iPhone mới) trên nền sạch sẽ, nút kêu gọi hành động màu xanh dương đậm.
*   **Danh mục sản phẩm:** Hiển thị dạng khối hoặc thanh trượt. Chỉ giới thiệu 4-6 sản phẩm nổi bật/bán chạy nhất mỗi danh mục để tránh rối mắt (nguyên tắc "ít hơn là nhiều hơn").
*   **Hình ảnh:** Phông nền sáng, độ phân giải cao để tăng độ tin cậy.

### Cấu trúc điều hướng (Menu)
Menu được sắp xếp logic để tìm kiếm nhanh chóng:
1.  **Trang Chủ:** Trưng bày danh mục, khuyến mãi.
2.  **Sản Phẩm:** Menu sổ xuống gồm:
    *   Điện thoại (iPhone, Android...)
    *   Tablet (iPad, Android...)
    *   Laptop (MacBook, Windows...)
    *   Đồng hồ (Smartwatch, thời trang)
    *   Phụ kiện & SIM.
3.  **Khuyến Mãi:** Các ưu đãi giảm giá.
4.  **Hướng Dẫn Mua Hàng:** Hướng dẫn liên hệ đặt hàng và thanh toán khi nhận/tại cửa hàng.
5.  **Chính Sách Bảo Hành:** Gộp các chính sách đổi trả, hoàn tiền.
6.  **Liên Hệ:** Thay thế cho trang thanh toán, chứa link Facebook, Zalo, bản đồ cửa hàng.

> **Trên Mobile:** Menu tối giản thành icon (≡), các mục phụ đưa xuống footer.

---

## 3. Sơ đồ luồng người dùng (User Flow) mới

Quy trình mua hàng được rút gọn tối đa để tăng tỷ lệ chuyển đổi:

1.  **Truy cập:** Khách vào trang chủ hoặc tìm kiếm sản phẩm qua thanh tìm kiếm nổi bật.
2.  **Duyệt & Chọn:** Khách xem danh mục, dùng bộ lọc (giá, thương hiệu, tình trạng...) để chọn sản phẩm.
3.  **Xem chi tiết:** Xem ảnh, giá, mô tả. Thay vì thêm vào giỏ, khách nhấn nút **"Liên hệ mua sản phẩm"**.
4.  **Kết nối trực tiếp:** Hệ thống mở popup chọn kênh: Chat Zalo, Chat Messenger, hoặc Gọi điện.
5.  **Chốt đơn (Ngoài web):** Nhân viên tư vấn, xác nhận tình trạng hàng và phương thức thanh toán (COD/Chuyển khoản) qua chat.
6.  **Hoàn tất:** Khách nhận hàng. Web hỗ trợ tính năng "Yêu thích" để lưu sản phẩm quan tâm.

> **Lợi ích:** Loại bỏ các bước đăng nhập, nhập địa chỉ phức tạp; phù hợp với thói quen dùng mạng xã hội của người Việt tại Nhật.

---

## 4. Chiến lược SEO & Tối ưu hóa

### Nghiên cứu từ khóa
Tập trung vào nhu cầu người Việt tại Nhật:
*   **Từ khóa thương hiệu:** "T&T MOBILE", "Hoang Hai Mobile Nhật Bản".
*   **Từ khóa sản phẩm:** "iPhone 17 Nhật Bản", "iPhone cũ giá rẻ ở Nhật", "MacBook Nhật bàn phím tiếng Nhật".
*   **Từ khóa dài (Long-tail):** "iPhone 16 Pro Max quốc tế Softbank", "SIM data Softbank 50GB Nhật".

### Tối ưu On-page
*   **Nội dung:** Viết mô tả ngắn chuẩn SEO cho từng trang danh mục (VD: "Chuyên iPhone mới nhất tại Nhật...").
*   **Meta Tags:** Thẻ Title và Description độc đáo, chứa từ khóa chính và lợi ích (bảo hành, giá tốt).
*   **URL:** Rút gọn, không dấu, chứa từ khóa. VD: `TTMOBILE/products/iphone-17-pro-max` thay vì URL dài chứa ký tự lạ.
*   **Schema & Đánh giá:** Tích hợp dữ liệu cấu trúc (Product schema) và khuyến khích đánh giá sản phẩm để hiện sao trên Google.

### Hiệu suất kỹ thuật
*   **Tốc độ:** Tối ưu hình ảnh (WebP, lazy load), nén mã nguồn (CSS/JS), sử dụng CDN.
*   **Mobile:** Đảm bảo điểm hiệu năng cao, thời gian tải dưới 5 giây để tránh khách bỏ trang.
*   **Cấu trúc:** Xây dựng XML Sitemap và liên kết nội bộ hợp lý.

---

## 5. Phân tích và Cải thiện UX (Trải nghiệm người dùng)

### Vấn đề hiện tại
*   **Quy trình dài:** Yêu cầu đăng ký tài khoản, thanh toán SmartPit không phổ biến.
*   **Thông tin dàn trải:** Quá nhiều thông số kỹ thuật gây mệt mỏi khi cuộn trên mobile.
*   **Thiếu tương tác:** Không có đánh giá sản phẩm, thiếu tính năng so sánh.

### Giải pháp cải thiện UX
1.  **Chat trực tuyến:** Widget Zalo/Messenger luôn hiển thị góc màn hình, giúp khách không phải tìm cách liên hệ.
2.  **Trình bày dạng Tab:** Gom thông tin vào các tab (Mô tả, Thông số, Bảo hành) hoặc accordion trên mobile.
3.  **Bullet points:** Dùng gạch đầu dòng cho các thông tin quan trọng (Tình trạng, Bảo hành, Quà tặng).
4.  **Social Proof:** Hiển thị đánh giá thực tế từ khách hàng hoặc nhúng comment Facebook.
5.  **Gợi ý thông minh:** Thêm mục "Sản phẩm tương tự" và "Phụ kiện mua kèm" (Cross-sell/Up-sell).
6.  **Tín hiệu tin cậy:** Hiển thị cam kết (Hàng chính hãng, Bảo hành dài) và thông tin công ty rõ ràng ở Footer.

---

## 6. Chi tiết Wireframe giao diện đề xuất

### A. Trang Chủ (Home Page)
*   **Header:** Cố định (sticky), có thanh tìm kiếm và menu.
*   **Banner:** Full-width, thông điệp ngắn gọn, nút "Xem Chi Tiết".
*   **Khối danh mục:** 4 khối/hàng (Điện thoại, Laptop, Đồng hồ, Phụ kiện) với icon minh họa.
*   **Sản phẩm nổi bật:** Carousel (băng chuyền) hiển thị thẻ sản phẩm (Ảnh, Tên, Giá, Giá cũ).
*   **Cam kết:** Thanh ngang liệt kê các lợi ích (Bảo hành, Ship nhanh...).
*   **Footer:** Địa chỉ chi nhánh, Link hỗ trợ, Kết nối mạng xã hội.

### B. Trang Danh mục (Category Page)
*   **Tiêu đề & Bộ lọc:** Tiêu đề H1 lớn. Bộ lọc (Filter) theo dòng máy, giá, dung lượng, chi nhánh còn hàng.
*   **Lưới sản phẩm:** Hiển thị 2 cột (mobile) hoặc 3 cột (desktop). Thẻ sản phẩm có nút "Xem chi tiết".
*   **SEO Text:** Đoạn mô tả danh mục nằm dưới cùng hỗ trợ SEO.

### C. Trang Chi tiết Sản phẩm (Product Page)
*   **Breadcrumb:** Đường dẫn nhanh đầu trang.
*   **Thông tin chính:** Tên, Giá, Nhãn tình trạng (Còn hàng/Hết hàng).
*   **Nút hành động (Call-to-Action):** Nút lớn **"Liên hệ mua ngay"** mở modal chọn kênh chat. Nút "Yêu thích" bên cạnh.
*   **Mô tả ngắn:** Dạng bullet point có icon (Tình trạng 100%, Bảo hành 18 tháng...).
*   **Tabs nội dung:**
    *   *Mô tả chi tiết:* Bài viết chuẩn SEO.
    *   *Thông số:* Bảng cấu hình.
    *   *Chính sách:* Quy định bảo hành, đổi trả.
*   **Đánh giá & Hỏi đáp:** Khu vực cho khách review và hỏi đáp nhanh.

### D. Trang Liên hệ (Thay thế Checkout)
*   **Nút kết nối:** Các nút lớn dẫn trực tiếp đến **Zalo Chat**, **Facebook Messenger**, **Hotline**.
*   **Địa chỉ:** Danh sách chi nhánh kèm bản đồ Google Maps.
*   **Giờ làm việc:** Ghi rõ khung giờ hỗ trợ (VD: 9h - 21h).

