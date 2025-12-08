# Code Changes Reference

## New Files Created

### 1. backend/models/review.model.js
Complete Review model with:
- Sequelize ORM definition
- Fields: id, productId, userId, userName, rating, comment
- Associations with Product and User models
- Validation for rating (1-5)

### 2. backend/controllers/review.controller.js
Review API controller with 4 methods:
- `getProductReviews()` - Fetch reviews with pagination
- `createReview()` - Create new review (protected)
- `updateReview()` - Update review (protected)
- `deleteReview()` - Delete review (protected)

### 3. backend/routes/review.routes.js
Review API routes:
- GET /products/:id/reviews (public)
- POST /products/:id/reviews (protected)
- PUT /products/:id/reviews/:reviewId (protected)
- DELETE /products/:id/reviews/:reviewId (protected)

## Modified Files

### backend/models/index.js
**Added:**
```javascript
const Review = require('./review.model');
```

**In exports:**
```javascript
module.exports = {
    // ... existing exports
    Review
};
```

### backend/routes/index.js
**Added:**
```javascript
const reviewRoutes = require('./review.routes');
```

**Added to mounting:**
```javascript
router.use('/', reviewRoutes);
```

### backend/database/seeders.js
**Added import:**
```javascript
const { User, Category, Product, Setting, Banner, Page, Review } = require('../models');
```

**Added seeding logic:**
- Creates 7 sample reviews
- Includes realistic Vietnamese comments
- Assigns reviews to first 4 products
- Uses findOrCreate to prevent duplicates

### frontend/public/manifest.json
**Changed from:**
```json
{
  "icons": [
    {
      "src": "/images/icons/logo.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

**Changed to:**
```json
{
  "icons": [
    {
      "src": "/images/icons/logo.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

## Database Schema Created

```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  userId INT,
  userName VARCHAR(255),
  rating INT,
  comment TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

## Environment Variables Required

Add to `backend/.env`:
```
NODE_ENV=development
SEED_DB=true
DB_ALTER=true
```

## API Response Examples

### GET /products/2/reviews
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productId": 2,
      "userId": null,
      "userName": "Nguyễn Văn A",
      "rating": 5,
      "comment": "Sản phẩm rất tốt...",
      "createdAt": "2024-12-08T05:27:21.000Z",
      "updatedAt": "2024-12-08T05:27:21.000Z"
    }
  ],
  "total": 7,
  "limit": 10,
  "offset": 0
}
```

### POST /products/2/reviews
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "id": 8,
    "productId": 2,
    "userId": 1,
    "userName": "John Doe",
    "rating": 5,
    "comment": "Great product!",
    "createdAt": "2024-12-08T05:27:21.000Z",
    "updatedAt": "2024-12-08T05:27:21.000Z"
  }
}
```

## Error Handling

### 404 Product Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 400 Invalid Rating
```json
{
  "success": false,
  "message": "Rating must be between 1 and 5"
}
```

### 403 Not Authorized
```json
{
  "success": false,
  "message": "Not authorized to update this review"
}
```

## Sample Review Data

7 reviews created by seeder:
1. iPhone 15 Pro Max - 5 stars - "Sản phẩm rất tốt, giao hàng nhanh..."
2. iPhone 15 Pro Max - 4 stars - "Điện thoại hoạt động tốt, pin khoẻ..."
3. iPhone 15 Pro Max - 5 stars - "Chất lượng hình ảnh tuyệt vời..."
4. iPhone 15 Pro - 4 stars - "Máy chạy mượt mà, không lag..."
5. iPhone 15 Pro - 5 stars - "Tuyệt vời! Thiết kế đẹp..."
6. iPhone 14 Pro Max - 4 stars - "Tình trạng như mới..."
7. Samsung Galaxy S24 - 5 stars - "Camera siêu đẹp, zoom 100x..."

## No Frontend Changes Needed

The existing `ProductDetail.vue` component already has:
- Review display UI
- Star rating display
- Review submission form
- Pagination support

All functionality is ready to use with the new backend.

## Testing Commands

```bash
# Get reviews
curl http://localhost:3000/api/v1/products/2/reviews

# Create review (needs auth token)
curl -X POST http://localhost:3000/api/v1/products/2/reviews \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Great!"}'

# Update review
curl -X PUT http://localhost:3000/api/v1/products/2/reviews/1 \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating":4,"comment":"Updated"}'

# Delete review
curl -X DELETE http://localhost:3000/api/v1/products/2/reviews/1 \
  -H "Authorization: Bearer TOKEN"
```

