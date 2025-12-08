# Admin Customization Guide - Home Page

## Tổng Quan

Home page hiện tại hỗ trợ admin custom 2 phần chính:
1. **Featured Products** - Các section sản phẩm nổi bật
2. **Promo Banners** - Các banner quảng cáo

## API Endpoints

### Featured Products

**GET** `/api/home/featured-products`
- Lấy danh sách tất cả featured product sections

**POST** `/api/home/featured-products`
- Tạo mới featured product section

**PUT** `/api/home/featured-products/{id}`
- Cập nhật featured product section

**DELETE** `/api/home/featured-products/{id}`
- Xóa featured product section

**PUT** `/api/home/featured-products/sort-order`
- Cập nhật thứ tự hiển thị

### Promo Banners

**GET** `/api/home/promo-banners`
- Lấy danh sách tất cả promo banners

**POST** `/api/home/promo-banners`
- Tạo mới promo banner

**PUT** `/api/home/promo-banners/{id}`
- Cập nhật promo banner

**DELETE** `/api/home/promo-banners/{id}`
- Xóa promo banner

**PUT** `/api/home/promo-banners/sort-order`
- Cập nhật thứ tự hiển thị

---

## Data Structure

### Featured Product Section

```json
{
  "id": 1,
  "title": "iPhone",
  "bgColor": "background",
  "viewAllLink": "/products?brand=iPhone",
  "viewAllText": "Xem tất cả",
  "badgeText": "HOT",
  "badgeStyle": "badge-hot",
  "sortOrder": 1,
  "products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      "price": 25000000,
      "thumbnail": "/images/iphone-15-pro-max.jpg",
      "image": "/images/iphone-15-pro-max-full.jpg",
      "isFeatured": true
    }
  ]
}
```

**Các trường:**
- `id` (integer) - ID duy nhất
- `title` (string) - Tiêu đề section (ví dụ: "iPhone", "Samsung")
- `bgColor` (string) - Màu nền: "white" hoặc "background"
- `viewAllLink` (string) - Link "Xem tất cả" (ví dụ: "/products?brand=iPhone")
- `viewAllText` (string) - Text nút "Xem tất cả" (mặc định: "Xem tất cả")
- `badgeText` (string) - Text badge trên sản phẩm (ví dụ: "HOT", "NEW")
- `badgeStyle` (string) - CSS class cho badge (ví dụ: "badge-hot", "badge-new")
- `sortOrder` (integer) - Thứ tự hiển thị
- `products` (array) - Danh sách sản phẩm (tối đa 5-6 sản phẩm)

---

### Promo Banner

```json
{
  "id": 1,
  "title": "Samsung Galaxy S24 Ultra",
  "description": "AI Phone đầu tiên",
  "linkUrl": "/products?brand=samsung",
  "buttonText": "Khám phá ngay",
  "buttonStyle": "bg-white text-blue-600 hover:bg-gray-100",
  "gradientClass": "bg-gradient-to-r from-blue-600 to-blue-800",
  "openInNewTab": false,
  "sortOrder": 1
}
```

**Các trường:**
- `id` (integer) - ID duy nhất
- `title` (string) - Tiêu đề banner
- `description` (string) - Mô tả ngắn
- `linkUrl` (string) - URL link (internal hoặc external)
- `buttonText` (string) - Text nút CTA (mặc định: "Khám phá ngay")
- `buttonStyle` (string) - CSS class cho nút
- `gradientClass` (string) - CSS class cho gradient background
- `openInNewTab` (boolean) - Mở link trong tab mới (mặc định: true)
- `sortOrder` (integer) - Thứ tự hiển thị

---

## CSS Classes Reference

### Badge Styles
```
badge-hot      - Badge HOT (màu đỏ)
badge-new      - Badge NEW (màu xanh)
badge-sale     - Badge SALE (màu vàng)
```

### Button Styles
```
bg-white text-blue-600 hover:bg-gray-100
bg-white text-orange-600 hover:bg-gray-100
bg-white text-green-600 hover:bg-gray-100
```

### Gradient Classes
```
bg-gradient-to-r from-blue-600 to-blue-800
bg-gradient-to-r from-orange-500 to-red-600
bg-gradient-to-r from-green-500 to-teal-600
bg-gradient-to-r from-purple-600 to-pink-600
```

---

## Example API Requests

### Create Featured Product Section

```bash
POST /api/home/featured-products
Content-Type: application/json

{
  "title": "iPhone",
  "bgColor": "background",
  "viewAllLink": "/products?brand=iPhone",
  "viewAllText": "Xem tất cả",
  "badgeText": "HOT",
  "badgeStyle": "badge-hot",
  "sortOrder": 1,
  "productIds": [1, 2, 3, 4, 5]
}
```

### Create Promo Banner

```bash
POST /api/home/promo-banners
Content-Type: application/json

{
  "title": "Samsung Galaxy S24 Ultra",
  "description": "AI Phone đầu tiên",
  "linkUrl": "/products?brand=samsung",
  "buttonText": "Khám phá ngay",
  "buttonStyle": "bg-white text-blue-600 hover:bg-gray-100",
  "gradientClass": "bg-gradient-to-r from-blue-600 to-blue-800",
  "openInNewTab": false,
  "sortOrder": 1
}
```

### Update Sort Order

```bash
PUT /api/home/featured-products/sort-order
Content-Type: application/json

{
  "orders": [
    { "id": 1, "sortOrder": 1 },
    { "id": 2, "sortOrder": 2 },
    { "id": 3, "sortOrder": 3 }
  ]
}
```

---

## Frontend Component Usage

### Service Methods

```javascript
import homePageService from '@/services/homePageService'

// Fetch featured products
const res = await homePageService.getFeaturedProducts()

// Fetch promo banners
const res = await homePageService.getPromoBanners()

// Create
await homePageService.createFeaturedProduct(data)
await homePageService.createPromoBanner(data)

// Update
await homePageService.updateFeaturedProduct(id, data)
await homePageService.updatePromoBanner(id, data)

// Delete
await homePageService.deleteFeaturedProduct(id)
await homePageService.deletePromoBanner(id)

// Update sort order
await homePageService.updateFeaturedProductsOrder(orders)
await homePageService.updatePromoBannersOrder(orders)
```

---

## Notes

- Featured Products sections được render động từ API
- Promo Banners được render động từ API
- Tất cả dữ liệu được cache ở client-side
- Admin có thể thêm/xóa/sửa sections mà không cần deploy lại
- Hỗ trợ internal links (router-link) và external links (a tag)

