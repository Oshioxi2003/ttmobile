# Hướng dẫn Thiết kế UI/UX: Bố cục, Điều hướng và Nguyên tắc

## 1. Bố cục (Layout) và Điều hướng

### Website người dùng (Frontend)
*   **Thanh điều hướng:** Đa số sử dụng thanh ngang ở đầu trang với logo bên trái, menu ở giữa, và biểu tượng tiện ích (giỏ hàng, đăng nhập) bên phải.
*   **Cấu trúc trang:**
    *   **Header:** Thường kèm banner/hero và thanh tìm kiếm nổi bật.
    *   **Nội dung chính:** Trình bày theo lưới (grid) hoặc các khối (block) như danh sách sản phẩm/bài viết.
    *   **Sidebar/Popup:** Chứa bộ lọc hoặc tìm kiếm bổ trợ.
    *   **Footer:** Thông tin liên hệ, mạng xã hội.
*   **Breadcrumb:** Nên hiển thị đường dẫn phân cấp để người dùng biết vị trí hiện tại.

### Dashboard quản trị (Admin Panel)
*   **Bố cục:** Thường dùng layout nhiều cột với sidebar dọc bên trái (240–300px khi mở, 48–64px khi thu gọn) chứa menu chính.
*   **Header:** Chứa công cụ tìm kiếm nhanh, thông báo và hồ sơ người dùng.
*   **Nội dung chính:** Chia lưới nhiều cột để hiển thị biểu đồ, bảng số liệu hoặc form nhập liệu.
*   **Phong cách:** Ưu tiên sự đơn giản, màu sắc tối giản, sử dụng khoảng trắng hợp lý để tránh rối mắt và giúp người quản trị dễ thao tác.

## 2. Hành trình người dùng (User Flow)

*   **Website người dùng:**
    *   Luồng điển hình: Trang chủ → Danh mục → Chi tiết Sản phẩm → Giỏ hàng → Thanh toán → Xác nhận.
    *   Yêu cầu: Nút kêu gọi hành động (CTA) rõ ràng, thông báo trạng thái ở mỗi bước, và quy trình mua hàng liền mạch.
*   **Dashboard quản trị:**
    *   Luồng điển hình: Đăng nhập → Dashboard tổng quan (KPI/Biểu đồ) → Danh sách (Sản phẩm/Đơn hàng) → Chi tiết (Form/Bảng).
    *   Yêu cầu: Luồng đi tuyến tính, hạn chế bước thừa để tối ưu tốc độ tác vụ.

## 3. Sự khác biệt UX: Website Người dùng vs. Admin Dashboard

| Tiêu chí | Website Người dùng (Frontend) | Dashboard Quản trị (Admin) |
| :--- | :--- | :--- |
| **Mục tiêu** | Thu hút, gây ấn tượng, dẫn dắt mua hàng/đăng ký. | Hiệu suất công việc, thao tác nhanh và chính xác. |
| **Trình bày** | Nội dung tiếp thị, hình ảnh phong phú, animation nhẹ. | Biểu đồ, bảng số liệu, thống kê, báo cáo ngắn gọn. |
| **Tương tác** | Dẫn dắt từng bước (information scent), CTA nổi bật. | Nhiều công cụ điều khiển (lọc, tìm kiếm nâng cao), thao tác dữ liệu lớn. |
| **Phản hồi** | Chào đón, khích lệ (VD: "Thêm giỏ hàng thành công"). | Thông báo nhắc nhở, đầy đủ, tập trung vào trạng thái hệ thống. |

## 4. Tiêu chuẩn thiết kế

### Màu sắc
*   **Phân cấp màu:**
    *   *Brand:* Màu chủ đạo cho nút, link.
    *   *Text Strong/Weak:* Màu chữ chính và phụ.
    *   *Stroke Strong/Weak:* Đường viền chính và phân cách.
    *   *Fill:* Nền phụ.
*   **Tương phản:** Đảm bảo tỷ lệ tương phản ít nhất 4.5:1 (WCAG AA) giữa chữ và nền để dễ đọc.

### Typography
*   **Font chữ:** Ưu tiên *sans-serif* (Roboto, Inter, Helvetica) vì tính dễ đọc trên web.
*   **Kích thước:**
    *   Body text: Khoảng 16px (16–18px).
    *   Heading: Tăng theo tỷ lệ 1.25–1.5x (VD: H1 ~32–48px).
*   **Khoảng cách dòng (Line-height):** Khoảng 1.4–1.6 lần cỡ chữ.

### Khoảng cách (Spacing)
*   **Hệ thống lưới:** Sử dụng quy ước *8px-base* (các số đo chia hết cho 8) để nhất quán và dễ responsive.
*   **Khoảng trắng:** Dùng khoảng đệm giữa các nhóm thông tin để tránh rối mắt và dẫn dắt sự tập trung.

## 5. Thành phần UI (Components) phổ biến

*   **Điều khiển Form:** Input, dropdown, date picker, checkbox, switch, button.
*   **Bảng (Table):** Hiển thị dữ liệu lớn, kèm phân trang (pagination), lọc và sắp xếp.
*   **Modal/Drawer:** Cửa sổ bật lên để xác nhận hoặc sidebar trượt để chỉnh sửa nhanh.
*   **Thông báo:** Toast banner (góc màn hình) hoặc Alert box cho các trạng thái thành công/lỗi.
*   **Điều hướng phụ:** Tabs, Accordion, Breadcrumb.
*   **Tiến trình:** Progress bar hoặc spinner khi tải dữ liệu.

## 6. Nguyên tắc thiết kế cốt lõi

1.  **Phân cấp thị giác (Visual Hierarchy):** Dùng cỡ chữ, độ đậm, màu sắc để làm nổi bật thông tin quan trọng; tránh nhồi nhét quá nhiều yếu tố (dùng *progressive disclosure*).
2.  **Tương phản (Contrast):** Màu sắc nổi bật cho nút/link quan trọng nhưng không làm giảm khả năng đọc.
3.  **Tính nhất quán (Consistency):** Đồng nhất về kiểu dáng, màu sắc, vị trí của các thành phần trong toàn bộ hệ thống.
4.  **Khả năng truy cập (Accessibility):** Tuân thủ WCAG, có thẻ ALT cho ảnh, hỗ trợ điều hướng bằng bàn phím (focus outline), đảm bảo tương phản màu.
5.  **Phản hồi (Feedback):** Hệ thống cần phản hồi mọi hành động (loading, thông báo kết quả) để người dùng biết trạng thái.
6.  **Đơn giản hóa:** Chỉ giữ lại chức năng thiết yếu, ẩn các chức năng phụ để giảm tải nhận thức cho người dùng.

## 7. Công cụ và Thư viện hỗ trợ

*   **Công cụ thiết kế:** Figma (phổ biến nhất), Sketch, Adobe XD.
*   **Thư viện UI (Frontend):**
    *   *Dựa trên CSS Framework:* Tailwind UI, DaisyUI, Flowbite.
    *   *Component Libraries:* Material-UI, Ant Design, Chakra UI.
    *   *Headless/Accessible:* Headless UI, Radix UI, ShadCN UI.

