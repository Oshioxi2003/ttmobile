# Home Page Customization - Complete Guide

## 🎯 Objective

Cho phép admin custom **Featured Products** và **Promo Banners** trên Home page thông qua API mà không cần hardcode hoặc deploy lại.

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Home.vue Component                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  onMounted() {                                                │
│    fetchFeaturedProducts()  ──→  API: /home/featured-products
│    fetchPromoBanners()      ──→  API: /home/promo-banners    │
│  }                                                            │
│                                                               │
│  Template:                                                    │
│  ├── v-for section in featuredProductSections               │
│  │   └── v-for product in section.products                  │
│  │       └── Product Card (dynamic badge, colors)           │
│  │                                                            │
│  └── v-for banner in promoBanners                           │
│      └── Promo Banner (dynamic gradient, button)            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── Client/
│   │   └── views/
│   │       └── Home.vue (✅ MODIFIED)
│   │
│   └── services/
│       └── homePageService.js (✅ CREATED)
│
├── ADMIN_CUSTOMIZATION_GUIDE.md (✅ CREATED)
│
BACKEND_IMPLEMENTATION_GUIDE.md (✅ CREATED)
CHANGES_SUMMARY.md (✅ CREATED)
HOME_PAGE_CUSTOMIZATION_README.md (✅ THIS FILE)
```

---

## 🔧 Implementation Steps

### Step 1: Frontend (Already Done ✅)

**Files Modified:**
- `frontend/src/Client/views/Home.vue`
  - Removed hardcoded iPhone/Samsung sections
  - Removed hardcoded Promo Banners
  - Added dynamic Featured Products rendering
  - Added dynamic Promo Banners rendering
  - Updated imports and functions

**Files Created:**
- `frontend/src/services/homePageService.js`
  - Service for API calls
  - Public endpoints: getFeaturedProducts(), getPromoBanners()
  - Admin endpoints: create, update, delete, sort order

### Step 2: Backend (TODO)

**Create Database Tables:**
- `featured_products` - Store section configurations
- `featured_product_items` - Store product associations
- `promo_banners` - Store banner configurations

**Create Eloquent Models:**
- `FeaturedProduct` - Model with products relationship
- `PromoBanner` - Model for banners

**Create API Controller:**
- `HomePageController`
  - Public methods: getFeaturedProducts(), getPromoBanners()
  - Admin methods: create, update, delete, sort order

**Create Routes:**
- `GET /api/home/featured-products` - Public
- `POST /api/home/featured-products` - Admin
- `PUT /api/home/featured-products/{id}` - Admin
- `DELETE /api/home/featured-products/{id}` - Admin
- `GET /api/home/promo-banners` - Public
- `POST /api/home/promo-banners` - Admin
- `PUT /api/home/promo-banners/{id}` - Admin
- `DELETE /api/home/promo-banners/{id}` - Admin

**Create Seeder:**
- `HomePageSeeder` - Initial data for featured products and banners

### Step 3: Admin Panel (TODO)

Create admin interface to manage:
- Featured Products sections
- Promo Banners

---

## 📖 API Documentation

### Featured Products

#### GET /api/home/featured-products
**Response:**
```json
{
  "success": true,
  "data": [
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
          "isFeatured": true
        }
      ]
    }
  ]
}
```

#### POST /api/home/featured-products (Admin)
**Request:**
```json
{
  "title": "iPhone",
  "bgColor": "background",
  "viewAllLink": "/products?brand=iPhone",
  "viewAllText": "Xem tất cả",
  "badgeText": "HOT",
  "badgeStyle": "badge-hot",
  "productIds": [1, 2, 3, 4, 5]
}
```

### Promo Banners

#### GET /api/home/promo-banners
**Response:**
```json
{
  "success": true,
  "data": [
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
  ]
}
```

#### POST /api/home/promo-banners (Admin)
**Request:**
```json
{
  "title": "Samsung Galaxy S24 Ultra",
  "description": "AI Phone đầu tiên",
  "linkUrl": "/products?brand=samsung",
  "buttonText": "Khám phá ngay",
  "buttonStyle": "bg-white text-blue-600 hover:bg-gray-100",
  "gradientClass": "bg-gradient-to-r from-blue-600 to-blue-800",
  "openInNewTab": false
}
```

---

## 🎨 Customization Options

### Featured Products Section

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| title | string | "iPhone" | Section title |
| bgColor | enum | "background" | "white" or "background" |
| viewAllLink | string | "/products?brand=iPhone" | Link to view all |
| viewAllText | string | "Xem tất cả" | Button text |
| badgeText | string | "HOT" | Badge text on products |
| badgeStyle | string | "badge-hot" | CSS class for badge |
| products | array | [...] | Product list |

### Promo Banner

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| title | string | "Samsung Galaxy S24 Ultra" | Banner title |
| description | string | "AI Phone đầu tiên" | Short description |
| linkUrl | string | "/products?brand=samsung" | Internal or external link |
| buttonText | string | "Khám phá ngay" | CTA button text |
| buttonStyle | string | "bg-white text-blue-600..." | CSS classes |
| gradientClass | string | "bg-gradient-to-r..." | CSS gradient class |
| openInNewTab | boolean | false | Open link in new tab |

---

## 🚀 Frontend Usage

### In Home.vue

```vue
<template>
  <!-- Featured Products - Dynamic -->
  <template v-for="section in featuredProductSections" :key="section.id">
    <section class="section" :class="section.bgColor === 'white' ? 'bg-white' : 'bg-background'">
      <h2>{{ section.title }}</h2>
      <div v-for="product in section.products" :key="product.id">
        <!-- Product card with dynamic badge -->
        <span :class="section.badgeStyle">{{ section.badgeText }}</span>
      </div>
    </section>
  </template>

  <!-- Promo Banners - Dynamic -->
  <div v-for="banner in promoBanners" :key="banner.id" :class="banner.gradientClass">
    <h3>{{ banner.title }}</h3>
    <p>{{ banner.description }}</p>
    <a :href="banner.linkUrl" :class="banner.buttonStyle">
      {{ banner.buttonText }}
    </a>
  </div>
</template>

<script setup>
import homePageService from '@/services/homePageService'

const featuredProductSections = ref([])
const promoBanners = ref([])

const fetchFeaturedProducts = async () => {
  const res = await homePageService.getFeaturedProducts()
  featuredProductSections.value = res.data?.data || []
}

const fetchPromoBanners = async () => {
  const res = await homePageService.getPromoBanners()
  promoBanners.value = res.data?.data || []
}

onMounted(() => {
  fetchFeaturedProducts()
  fetchPromoBanners()
})
</script>
```

---

## ✅ Benefits

1. **Admin Control** - Admin can manage content without code
2. **No Redeploy** - Changes don't require frontend deployment
3. **Flexibility** - Unlimited sections and banners
4. **Customization** - Each section can have custom colors, badges, links
5. **Maintainability** - Clean, organized code
6. **Scalability** - Easy to extend with new features

---

## 📚 Documentation Files

1. **ADMIN_CUSTOMIZATION_GUIDE.md**
   - API endpoints
   - Data structure
   - CSS classes reference
   - Example requests

2. **BACKEND_IMPLEMENTATION_GUIDE.md**
   - Database schema
   - Eloquent models
   - Controller code
   - Routes
   - Seeder example

3. **CHANGES_SUMMARY.md**
   - Detailed list of changes
   - Before/after comparison
   - Implementation checklist

---

## 🔗 Related Files

- **Frontend Component**: `frontend/src/Client/views/Home.vue`
- **Frontend Service**: `frontend/src/services/homePageService.js`
- **Admin Guide**: `frontend/ADMIN_CUSTOMIZATION_GUIDE.md`
- **Backend Guide**: `BACKEND_IMPLEMENTATION_GUIDE.md`
- **Changes**: `CHANGES_SUMMARY.md`

---

## ⚠️ Important Notes

- All public endpoints don't require authentication
- Admin endpoints require `auth:sanctum` and `admin` middleware
- Frontend caches data on page load
- Supports both internal (router-link) and external (a tag) links
- Gradient and button styles are fully customizable via CSS classes

---

## 🎓 Next Steps

1. Review the implementation guides
2. Implement backend API endpoints
3. Create admin panel interface
4. Test API endpoints
5. Deploy backend changes
6. Deploy frontend changes
7. Create initial data via seeder

---

## 📞 Support

For questions or issues, refer to:
- `ADMIN_CUSTOMIZATION_GUIDE.md` for frontend/admin usage
- `BACKEND_IMPLEMENTATION_GUIDE.md` for backend implementation
- `CHANGES_SUMMARY.md` for detailed changes

