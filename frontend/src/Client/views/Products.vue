<template>
  <div class="bg-background min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-secondary hover:text-secondary-hover">Trang chủ</router-link>
          <span class="mx-2 text-text-muted">/</span>
          <span class="text-text">{{ categoryTitle }}</span>
        </nav>
      </div>
    </div>

    <div class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="bg-white p-6 sticky top-24">
            <h3 class="font-bold text-lg mb-4 text-primary">Bộ lọc</h3>

            <!-- Category Filter -->
            <div class="mb-6">
              <h4 class="font-semibold mb-3 text-text">Danh mục</h4>
              <ul class="space-y-2">
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.categories" value="iphone" class="mr-2 accent-primary">
                    <span class="text-sm">iPhone</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.categories" value="samsung" class="mr-2 accent-primary">
                    <span class="text-sm">Samsung</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.categories" value="xiaomi" class="mr-2 accent-primary">
                    <span class="text-sm">Xiaomi</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.categories" value="oppo" class="mr-2 accent-primary">
                    <span class="text-sm">OPPO</span>
                  </label>
                </li>
              </ul>
            </div>

            <!-- Price Filter -->
            <div class="mb-6">
              <h4 class="font-semibold mb-3 text-text">Khoảng giá</h4>
              <ul class="space-y-2">
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="filters.priceRange" value="" name="price" class="mr-2 accent-primary">
                    <span class="text-sm">Tất cả</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="filters.priceRange" value="0-50000" name="price" class="mr-2 accent-primary">
                    <span class="text-sm">Dưới 50.000 ₫</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="filters.priceRange" value="50000-100000" name="price" class="mr-2 accent-primary">
                    <span class="text-sm">50.000 ₫ - 100.000 ₫</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="filters.priceRange" value="100000-200000" name="price" class="mr-2 accent-primary">
                    <span class="text-sm">100.000 ₫ - 200.000 ₫</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="filters.priceRange" value="200000+" name="price" class="mr-2 accent-primary">
                    <span class="text-sm">Trên 200.000 ₫</span>
                  </label>
                </li>
              </ul>
            </div>

            <!-- Condition Filter -->
            <div class="mb-6">
              <h4 class="font-semibold mb-3 text-text">Tình trạng</h4>
              <ul class="space-y-2">
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.conditions" value="new" class="mr-2 accent-primary">
                    <span class="text-sm">Mới 100%</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.conditions" value="like-new" class="mr-2 accent-primary">
                    <span class="text-sm">Like New 99%</span>
                  </label>
                </li>
                <li>
                  <label class="flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.conditions" value="used" class="mr-2 accent-primary">
                    <span class="text-sm">Đã sử dụng</span>
                  </label>
                </li>
              </ul>
            </div>

            <button @click="resetFilters" class="btn btn-secondary w-full text-sm">
              Xóa bộ lọc
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
          <!-- Header -->
          <div class="bg-white p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 class="text-2xl font-bold text-primary">{{ categoryTitle }}</h1>
              <p class="text-text-muted text-sm">{{ products.length }} sản phẩm</p>
            </div>
            <div class="flex items-center gap-4">
              <select v-model="sortBy" class="input w-auto text-sm py-2">
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
                <option value="popular">Phổ biến nhất</option>
              </select>
              <div class="flex border border-border">
                <button
                  @click="viewMode = 'grid'"
                  :class="['p-2', viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-text']"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="['p-2', viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-text']"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-else-if="products.length > 0" :class="viewMode === 'grid' ? 'product-grid' : 'space-y-4'">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="handleAddToCart"
              @add-to-wishlist="handleAddToWishlist"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p class="text-text-muted">Không tìm thấy sản phẩm nào</p>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-10">
            <nav class="flex items-center gap-1">
              <button class="px-3 py-2 border border-border bg-white hover:bg-background text-sm">
                ←
              </button>
              <button class="px-4 py-2 bg-primary text-white text-sm font-semibold">1</button>
              <button class="px-4 py-2 border border-border bg-white hover:bg-background text-sm">2</button>
              <button class="px-4 py-2 border border-border bg-white hover:bg-background text-sm">3</button>
              <span class="px-2 text-text-muted">...</span>
              <button class="px-4 py-2 border border-border bg-white hover:bg-background text-sm">10</button>
              <button class="px-3 py-2 border border-border bg-white hover:bg-background text-sm">
                →
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import productService from '@/services/productService'
import categoryService from '@/services/categoryService'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'

const route = useRoute()

const viewMode = ref('grid')
const sortBy = ref('newest')
const loading = ref(false)
const products = ref([])
const selectedCategory = ref(null)

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const filters = ref({
  categories: [],
  priceRange: '',
  conditions: []
})

const categoryTitle = computed(() => {
  if (selectedCategory.value?.name) return selectedCategory.value.name
  const brand = route.query.brand
  if (brand) return brand
  return 'Tất cả sản phẩm'
})

const resolveCategoryId = async () => {
  // Priority: collections/:slug -> query.category (slug)
  if (route.params.slug) {
    try {
      const res = await categoryService.getCategoryBySlug(route.params.slug)
      selectedCategory.value = res.data?.data || null
      return selectedCategory.value?.id || null
    } catch { selectedCategory.value = null; return null }
  }
  if (route.query.category) {
    try {
      const res = await categoryService.getCategoryBySlug(route.query.category)
      selectedCategory.value = res.data?.data || null
      return selectedCategory.value?.id || null
    } catch { selectedCategory.value = null; return null }
  }
  selectedCategory.value = null
  return null
}

const fetchProducts = async () => {
  try {
    loading.value = true
    const params = { limit: 20, page: 1 }

    // Handle search query
    if (route.query.search) {
      params.search = route.query.search
    }

    // Handle brand filter
    if (route.query.brand) {
      params.brand = route.query.brand
    }

    // Handle category filter
    const catId = await resolveCategoryId()
    if (catId) params.categoryId = catId

    // Handle price range filter
    if (filters.value.priceRange) {
      const [min, max] = filters.value.priceRange.split('-')
      if (min) params.minPrice = parseInt(min)
      if (max && max !== '+') params.maxPrice = parseInt(max)
    }

    // Handle sort
    if (sortBy.value === 'price-asc') {
      params.sort = 'price'
      params.order = 'asc'
    } else if (sortBy.value === 'price-desc') {
      params.sort = 'price'
      params.order = 'desc'
    } else if (sortBy.value === 'popular') {
      params.sort = 'popularity'
      params.order = 'desc'
    } else {
      params.sort = 'createdAt'
      params.order = 'desc'
    }

    const res = await productService.getProducts(params)
    products.value = res.data?.data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    products.value = []
  } finally {
    loading.value = false
  }
}

const resetFilters = () => {
  filters.value = {
    categories: [],
    priceRange: '',
    conditions: []
  }
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product, 1)
}

const handleAddToWishlist = async (product) => {
  try {
    await wishlistStore.add(product)
  } catch (e) {
    alert('Không thể thêm vào yêu thích')
  }
}

onMounted(() => {
  fetchProducts()
})

watch(
  () => [route.params.slug, route.query, sortBy.value, filters.value.priceRange],
  () => {
    fetchProducts()
  }
)
</script>

