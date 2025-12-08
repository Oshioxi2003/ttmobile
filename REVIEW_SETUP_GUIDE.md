# Review System Setup Guide

## Overview
This guide explains the changes made to implement the Review system for the T&T Mobile application.

## Files Created/Modified

### Backend Files Created:
1. **`backend/models/review.model.js`** - Review database model with Sequelize
2. **`backend/controllers/review.controller.js`** - Review API endpoints controller
3. **`backend/routes/review.routes.js`** - Review API routes

### Backend Files Modified:
1. **`backend/models/index.js`** - Added Review model import and export
2. **`backend/routes/index.js`** - Added review routes mounting
3. **`backend/database/seeders.js`** - Added review seeding with sample data

### Frontend Files Modified:
1. **`frontend/public/manifest.json`** - Fixed icon configuration

## API Endpoints

### Get Product Reviews
```
GET /api/v1/products/:id/reviews
Query Parameters:
  - limit: number (default: 10)
  - offset: number (default: 0)

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productId": 1,
      "userId": null,
      "userName": "Nguyễn Văn A",
      "rating": 5,
      "comment": "Sản phẩm rất tốt...",
      "createdAt": "2024-12-08T...",
      "updatedAt": "2024-12-08T..."
    }
  ],
  "total": 7,
  "limit": 10,
  "offset": 0
}
```

### Create Review (Protected)
```
POST /api/v1/products/:id/reviews
Headers:
  - Authorization: Bearer <token>

Body:
{
  "rating": 5,
  "comment": "Great product!",
  "userName": "John Doe" (optional)
}

Response:
{
  "success": true,
  "message": "Review created successfully",
  "data": { ... }
}
```

### Update Review (Protected)
```
PUT /api/v1/products/:id/reviews/:reviewId
Headers:
  - Authorization: Bearer <token>

Body:
{
  "rating": 4,
  "comment": "Updated comment"
}
```

### Delete Review (Protected)
```
DELETE /api/v1/products/:id/reviews/:reviewId
Headers:
  - Authorization: Bearer <token>
```

## Setup Instructions

### 1. Database Migration
The Review model will be automatically created when the server starts in development mode.

### 2. Seed Sample Data
To populate the database with sample reviews, set the environment variable:

```bash
# In backend/.env
SEED_DB=true
DB_ALTER=true
```

Then restart the backend server. The seeder will:
- Create the `reviews` table
- Add 7 sample reviews for the first 4 products
- Include realistic Vietnamese product reviews

### 3. Verify Setup
Check if reviews are working:

```bash
# Get reviews for product ID 2
curl http://localhost:3000/api/v1/products/2/reviews
```

## Sample Review Data

The seeder includes 7 sample reviews:
- 3 reviews for iPhone 15 Pro Max (ratings: 5, 4, 5)
- 2 reviews for iPhone 15 Pro (ratings: 4, 5)
- 1 review for iPhone 14 Pro Max Like New (rating: 4)
- 1 review for Samsung Galaxy S24 Ultra (rating: 5)

All reviews include realistic Vietnamese comments about product quality, delivery, and value.

## Frontend Integration

The frontend already has:
- `reviewService.js` - Service for API calls
- `ProductDetail.vue` - Component displaying reviews
- Review submission form for authenticated users

No frontend changes are needed - the existing code will work with the new backend.

## Troubleshooting

### 404 Error on /api/v1/products/:id/reviews
- Ensure backend server is restarted after adding review routes
- Check that the product ID exists in the database

### No Reviews Showing
- Set `SEED_DB=true` in `.env` and restart server
- Check database connection is working

### Manifest Icon Warning
- Fixed in `manifest.json` by adding `"purpose": "any"` to icon entries
- Clear browser cache if warning persists

## Environment Variables

Add to `backend/.env`:
```
SEED_DB=true          # Enable database seeding on startup
DB_ALTER=true         # Allow Sequelize to alter tables
NODE_ENV=development  # Required for seeding
```

## Notes

- Reviews can be created by both authenticated and anonymous users
- Only the review creator or admin can update/delete reviews
- Reviews are ordered by creation date (newest first)
- Rating must be between 1-5
- Comment is required for all reviews

