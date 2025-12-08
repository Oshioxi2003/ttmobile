# Quick Reference - Home Page Customization

## 🎯 What Changed?

| Before | After |
|--------|-------|
| Hardcoded iPhone section | Dynamic Featured Products |
| Hardcoded Samsung section | Dynamic Featured Products |
| Hardcoded Promo Banners | Dynamic Promo Banners |
| Need redeploy to change | Admin can change via API |

---

## 📋 Files Modified/Created

### Modified
- ✏️ `frontend/src/Client/views/Home.vue`

### Created
- ✨ `frontend/src/services/homePageService.js`
- 📖 `frontend/ADMIN_CUSTOMIZATION_GUIDE.md`
- [object Object]BACKEND_IMPLEMENTATION_GUIDE.md`
- 📖 `CHANGES_SUMMARY.md`
- 📖 `HOME_PAGE_CUSTOMIZATION_README.md`
- 📖 `QUICK_REFERENCE.md` (this file)

---

## 🔌 API Endpoints

### Featured Products
```
GET    /api/home/featured-products        (public)
POST   /api/home/featured-products        (admin)
PUT    /api/home/featured-products/{id}   (admin)
DELETE /api/home/featured-products/{id}   (admin)
```

### Promo Banners
```
GET    /api/home/promo-banners            (public)
POST   /api/home/promo-banners            (admin)
PUT    /api/home/promo-banners/{id}       (admin)
DELETE /api/home/promo-banners/{id}       (admin)
```

---

## 📊 Data Structure

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
  "products": [...]
}
```

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

---

## 🛠️ Implementation Checklist

### Frontend (✅ DONE)
- [x] Refactor Home.vue
- [x] Create homePageService.js
- [x] Update imports
- [x] Add dynamic rendering
- [x] Remove hardcoded sections

### Backend (TODO)
- [ ] Create migrations
- [ ] Create models
- [ ] Create controller
- [ ] Create routes
- [ ] Create seeder
- [ ] Add middleware

### Admin Panel (TODO)
- [ ] Create featured products management
- [ ] Create promo banners management
- [ ] Add CRUD operations
- [ ] Add drag-to-sort

---

## 🎨 CSS Classes Reference

### Badge Styles
```
badge-hot       (red)
badge-new       (green)
badge-sale      (yellow)
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

## 💻 Frontend Service Usage

```javascript
import homePageService from '@/services/homePageService'

// Fetch
const res = await homePageService.getFeaturedProducts()
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

// Sort
await homePageService.updateFeaturedProductsOrder(orders)
await homePageService.updatePromoBannersOrder(orders)
```

---

## 🔄 Data Flow

```
1. Page Load
   ↓
2. onMounted() Hook
   ├── fetchFeaturedProducts() → API call
   └── fetchPromoBanners() → API call
   ↓
3. Store in Reactive State
   ├── featuredProductSections
   └── promoBanners
   ↓
4. Template Rendering
   ├── v-for section in featuredProductSections
   └── v-for banner in promoBanners
   ↓
5. Display on Page
```

---

## 🚀 Key Features

### Featured Products
- ✅ Dynamic title
- ✅ Dynamic background color
- ✅ Dynamic badge text & style
- ✅ Dynamic "View All" link
- ✅ Multiple sections support
- ✅ Product list per section
- ✅ Sortable sections

### Promo Banners
- ✅ Dynamic title & description
- ✅ Dynamic link (internal/external)
- ✅ Dynamic button text & style
- ✅ Dynamic gradient background
- ✅ Open in new tab option
- ✅ Multiple banners support
- ✅ Sortable banners

---

## 📝 Example: Create Featured Product

```bash
curl -X POST http://localhost/api/home/featured-products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "iPhone",
    "bgColor": "background",
    "viewAllLink": "/products?brand=iPhone",
    "viewAllText": "Xem tất cả",
    "badgeText": "HOT",
    "badgeStyle": "badge-hot",
    "productIds": [1, 2, 3, 4, 5]
  }'
```

---

## 📝 Example: Create Promo Banner

```bash
curl -X POST http://localhost/api/home/promo-banners \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Samsung Galaxy S24 Ultra",
    "description": "AI Phone đầu tiên",
    "linkUrl": "/products?brand=samsung",
    "buttonText": "Khám phá ngay",
    "buttonStyle": "bg-white text-blue-600 hover:bg-gray-100",
    "gradientClass": "bg-gradient-to-r from-blue-600 to-blue-800",
    "openInNewTab": false
  }'
```

---

## 🔗 Documentation Links

| Document | Purpose |
|----------|---------|
| ADMIN_CUSTOMIZATION_GUIDE.md | Admin usage guide |
| BACKEND_IMPLEMENTATION_GUIDE.md | Backend implementation |
| CHANGES_SUMMARY.md | Detailed changes |
| HOME_PAGE_CUSTOMIZATION_README.md | Complete guide |
| QUICK_REFERENCE.md | This file |

---

## ⚡ Quick Start

1. **Backend**: Implement API endpoints (see BACKEND_IMPLEMENTATION_GUIDE.md)
2. **Database**: Run migrations and seeder
3. **Admin Panel**: Create management interface
4. **Test**: Test API endpoints
5. **Deploy**: Deploy backend, then frontend

---

## 🎓 Learning Path

1. Read: `HOME_PAGE_CUSTOMIZATION_README.md` (overview)
2. Read: `ADMIN_CUSTOMIZATION_GUIDE.md` (frontend usage)
3. Read: `BACKEND_IMPLEMENTATION_GUIDE.md` (backend implementation)
4. Implement: Backend API endpoints
5. Test: API endpoints
6. Create: Admin panel interface
7. Deploy: Changes to production

---

## 💡 Tips

- Use CSS classes for styling (no inline styles)
- Support both internal and external links
- Admin can add unlimited sections/banners
- Each section can have different badge styles
- Each banner can have different gradient colors
- Frontend automatically handles responsive layout
- Data is cached on page load for performance

---

## ⚠️ Important

- All public endpoints don't require auth
- Admin endpoints require `auth:sanctum` + `admin` middleware
- Frontend uses `homePageService` for all API calls
- Supports Vue Router links and external links
- Fully customizable via CSS classes

