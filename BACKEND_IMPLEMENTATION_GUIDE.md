# Backend Implementation Guide - Home Page Customization

## Database Schema

### Featured Products Table

```sql
CREATE TABLE featured_products (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  bg_color ENUM('white', 'background') DEFAULT 'background',
  view_all_link VARCHAR(500),
  view_all_text VARCHAR(100) DEFAULT 'Xem tất cả',
  badge_text VARCHAR(50) DEFAULT 'HOT',
  badge_style VARCHAR(100) DEFAULT 'badge-hot',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE featured_product_items (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  featured_product_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (featured_product_id) REFERENCES featured_products(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_featured_product (featured_product_id, product_id)
);
```

### Promo Banners Table

```sql
CREATE TABLE promo_banners (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link_url VARCHAR(500),
  button_text VARCHAR(100) DEFAULT 'Khám phá ngay',
  button_style VARCHAR(200) DEFAULT 'bg-white text-blue-600 hover:bg-gray-100',
  gradient_class VARCHAR(200) DEFAULT 'bg-gradient-to-r from-blue-600 to-blue-800',
  open_in_new_tab BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Eloquent Models

### FeaturedProduct Model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturedProduct extends Model
{
    protected $fillable = [
        'title',
        'bg_color',
        'view_all_link',
        'view_all_text',
        'badge_text',
        'badge_style',
        'sort_order',
    ];

    public function products()
    {
        return $this->belongsToMany(
            Product::class,
            'featured_product_items',
            'featured_product_id',
            'product_id'
        )->orderBy('featured_product_items.sort_order');
    }

    public function scopeActive($query)
    {
        return $query->orderBy('sort_order');
    }
}
```

### PromoBanner Model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PromoBanner extends Model
{
    protected $fillable = [
        'title',
        'description',
        'link_url',
        'button_text',
        'button_style',
        'gradient_class',
        'open_in_new_tab',
        'sort_order',
    ];

    protected $casts = [
        'open_in_new_tab' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->orderBy('sort_order');
    }
}
```

---

## API Controllers

### HomePageController

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\FeaturedProduct;
use App\Models\PromoBanner;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    // Get all featured products with their products
    public function getFeaturedProducts()
    {
        $sections = FeaturedProduct::with('products')
            ->active()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $sections,
        ]);
    }

    // Get all promo banners
    public function getPromoBanners()
    {
        $banners = PromoBanner::active()->get();

        return response()->json([
            'success' => true,
            'data' => $banners,
        ]);
    }

    // Create featured product (admin only)
    public function createFeaturedProduct(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bg_color' => 'in:white,background',
            'view_all_link' => 'nullable|string|max:500',
            'view_all_text' => 'nullable|string|max:100',
            'badge_text' => 'nullable|string|max:50',
            'badge_style' => 'nullable|string|max:100',
            'productIds' => 'required|array|min:1',
            'productIds.*' => 'integer|exists:products,id',
        ]);

        $section = FeaturedProduct::create($validated);

        // Attach products
        if (isset($validated['productIds'])) {
            $section->products()->attach($validated['productIds']);
        }

        return response()->json([
            'success' => true,
            'data' => $section->load('products'),
        ], 201);
    }

    // Update featured product (admin only)
    public function updateFeaturedProduct(Request $request, FeaturedProduct $section)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'bg_color' => 'in:white,background',
            'view_all_link' => 'nullable|string|max:500',
            'view_all_text' => 'nullable|string|max:100',
            'badge_text' => 'nullable|string|max:50',
            'badge_style' => 'nullable|string|max:100',
            'productIds' => 'array',
            'productIds.*' => 'integer|exists:products,id',
        ]);

        $section->update($validated);

        // Update products if provided
        if (isset($validated['productIds'])) {
            $section->products()->sync($validated['productIds']);
        }

        return response()->json([
            'success' => true,
            'data' => $section->load('products'),
        ]);
    }

    // Delete featured product (admin only)
    public function deleteFeaturedProduct(FeaturedProduct $section)
    {
        $section->delete();

        return response()->json([
            'success' => true,
            'message' => 'Featured product section deleted',
        ]);
    }

    // Create promo banner (admin only)
    public function createPromoBanner(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link_url' => 'nullable|string|max:500',
            'button_text' => 'nullable|string|max:100',
            'button_style' => 'nullable|string|max:200',
            'gradient_class' => 'nullable|string|max:200',
            'open_in_new_tab' => 'boolean',
        ]);

        $banner = PromoBanner::create($validated);

        return response()->json([
            'success' => true,
            'data' => $banner,
        ], 201);
    }

    // Update promo banner (admin only)
    public function updatePromoBanner(Request $request, PromoBanner $banner)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'link_url' => 'nullable|string|max:500',
            'button_text' => 'nullable|string|max:100',
            'button_style' => 'nullable|string|max:200',
            'gradient_class' => 'nullable|string|max:200',
            'open_in_new_tab' => 'boolean',
        ]);

        $banner->update($validated);

        return response()->json([
            'success' => true,
            'data' => $banner,
        ]);
    }

    // Delete promo banner (admin only)
    public function deletePromoBanner(PromoBanner $banner)
    {
        $banner->delete();

        return response()->json([
            'success' => true,
            'message' => 'Promo banner deleted',
        ]);
    }
}
```

---

## Routes

```php
// routes/api.php

Route::prefix('home')->group(function () {
    // Public routes
    Route::get('featured-products', [HomePageController::class, 'getFeaturedProducts']);
    Route::get('promo-banners', [HomePageController::class, 'getPromoBanners']);

    // Admin routes
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('featured-products', [HomePageController::class, 'createFeaturedProduct']);
        Route::put('featured-products/{section}', [HomePageController::class, 'updateFeaturedProduct']);
        Route::delete('featured-products/{section}', [HomePageController::class, 'deleteFeaturedProduct']);

        Route::post('promo-banners', [HomePageController::class, 'createPromoBanner']);
        Route::put('promo-banners/{banner}', [HomePageController::class, 'updatePromoBanner']);
        Route::delete('promo-banners/{banner}', [HomePageController::class, 'deletePromoBanner']);
    });
});
```

---

## Seeder Example

```php
<?php

namespace Database\Seeders;

use App\Models\FeaturedProduct;
use App\Models\PromoBanner;
use Illuminate\Database\Seeder;

class HomePageSeeder extends Seeder
{
    public function run()
    {
        // Create featured product sections
        $iphone = FeaturedProduct::create([
            'title' => 'iPhone',
            'bg_color' => 'background',
            'view_all_link' => '/products?brand=iPhone',
            'view_all_text' => 'Xem tất cả',
            'badge_text' => 'HOT',
            'badge_style' => 'badge-hot',
            'sort_order' => 1,
        ]);

        $samsung = FeaturedProduct::create([
            'title' => 'Samsung',
            'bg_color' => 'white',
            'view_all_link' => '/products?brand=Samsung',
            'view_all_text' => 'Xem tất cả',
            'badge_text' => 'NEW',
            'badge_style' => 'badge-new',
            'sort_order' => 2,
        ]);

        // Create promo banners
        PromoBanner::create([
            'title' => 'Samsung Galaxy S24 Ultra',
            'description' => 'AI Phone đầu tiên',
            'link_url' => '/products?brand=samsung',
            'button_text' => 'Khám phá ngay',
            'button_style' => 'bg-white text-blue-600 hover:bg-gray-100',
            'gradient_class' => 'bg-gradient-to-r from-blue-600 to-blue-800',
            'open_in_new_tab' => false,
            'sort_order' => 1,
        ]);

        PromoBanner::create([
            'title' => 'Xiaomi 14 Ultra',
            'description' => 'Camera Leica đỉnh cao',
            'link_url' => '/products?brand=xiaomi',
            'button_text' => 'Xem ngay',
            'button_style' => 'bg-white text-orange-600 hover:bg-gray-100',
            'gradient_class' => 'bg-gradient-to-r from-orange-500 to-red-600',
            'open_in_new_tab' => false,
            'sort_order' => 2,
        ]);
    }
}
```

