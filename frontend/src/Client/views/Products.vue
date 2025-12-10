<template>
  <div class="bg-background min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-secondary hover:text-secondary-hover">Trang chủ</router-link>
          <span class="mx-2 text-text-muted">/</span>
          <span v-if="selectedCategory" class="text-text-muted">{{ selectedCategory.name }}</span>
          <span v-else-if="searchQuery" class="text-text-muted">Tìm kiếm: "{{ searchQuery }}"</span>
          <span v-else class="text-text">Sản phẩm</span>
        </nav>
      </div>
    </div>

    <div class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar Filters -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="bg-white p-6 sticky top-4">
            <h2 class="text-lg font-bold mb-4 pb-3 border-b border-border">Bộ lọc</h2>

            <!-- Categories -->
            <div class="mb-6">
              <h3 class="font-semibold mb-3 flex items-center justify-between cursor-pointer" @click="toggleSection('categories')">
                <span>Danh mục</span>
                <svg :class="['w-4 h-4 transition-transform', expandedSections.categories ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </h3>
              <div v-show="expandedSections.categories" class="space-y-2">
                <label v-for="category in categories" :key="category.id" class="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    :value="category.id"
                    v-model="filters.categoryId"
                    @change="applyFilters"
                    name="categoryFilter"
                    class="mr-2 text-primary focus:ring-primary"
                  >
                  <span class="text-sm group-hover:text-primary">{{ category.name }}</span>
                </label>
              </div>
            </div>

            <!-- Brands -->
            <!-- <div class="mb-6">
              <h3 class="font-semibold mb-3 flex items-center justify-between cursor-pointer" @click="toggleSection('brands')">
                <span>Thương hiệu</span>
                <svg :class="['w-4 h-4 transition-transform', expandedSections.brands ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </h3>
              <div v-show="expandedSections.brands" class="space-y-2">
                <label v-for="brand in brands" :key="brand" class="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    :value="brand"
                    v-model="filters.brands"
                    @change="applyFilters"
                    class="mr-2 rounded text-primary focus:ring-primary"
                  >
                  <span class="text-sm group-hover:text-primary">{{ brand }}</span>
                </label>
              </div>
            </div> -->

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-semibold mb-3 flex items-center justify-between cursor-pointer" @click="toggleSection('price')">
                <span>Giá</span>
                <svg :class="['w-4 h-4 transition-transform', expandedSections.price ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </h3>
              <div v-show="expandedSections.price" class="space-y-2">
                <label v-for="range in priceRanges" :key="range.value" class="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    :value="range.value"
                    v-model="filters.priceRange"
                    @change="applyFilters"
                    name="priceRange"
                    class="mr-2 text-primary focus:ring-primary"
                  >
                  <span class="text-sm group-hover:text-primary">{{ range.label }}</span>
                </label>
              </div>
            </div>

            <!-- Condition -->
            <div class="mb-6">
              <h3 class="font-semibold mb-3 flex items-center justify-between cursor-pointer" @click="toggleSection('condition')">
                <span>Tình trạng</span>
                <svg :class="['w-4 h-4 transition-transform', expandedSections.condition ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </h3>
              <div v-show="expandedSections.condition" class="space-y-2">
                <label v-for="cond in conditions" :key="cond.value" class="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    :value="cond.value"
                    v-model="filters.condition"
                    @change="applyFilters"
                    name="conditionFilter"
                    class="mr-2 text-primary focus:ring-primary"
                  >
                  <span class="text-sm group-hover:text-primary">{{ cond.label }}</span>
                </label>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="w-full btn btn-outline text-sm py-2"
            >
              Xóa bộ lọc
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Header -->
          <div class="bg-white p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 class="text-2xl font-bold mb-1">
                <span v-if="selectedCategory">{{ selectedCategory.name }}</span>
                <span v-else-if="searchQuery">Kết quả tìm kiếm: "{{ searchQuery }}"</span>
                <span v-else>Tất cả sản phẩm</span>
              </h1>
              <p class="text-text-muted text-sm">{{ totalProducts }} sản phẩm</p>
            </div>

            <!-- Sort -->
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-text-muted whitespace-nowrap">Sắp xếp:</label>
              <select
                v-model="sortBy"
                @change="applyFilters"
                class="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Mặc định</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="newest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
              </select>
            </div>
          </div>

          <!-- Active Filters Tags -->
          <div v-if="hasActiveFilters" class="bg-white p-4 mb-6">
            <div class="flex flex-wrap gap-2">
              <span v-for="(cat, idx) in selectedCategories" :key="`cat-${cat.id}`" class="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {{ cat.name }}
                <button @click="removeFilter('category', cat.id)" class="hover:text-primary-hover">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
              <span v-for="brand in filters.brands" :key="`brand-${brand}`" class="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                {{ brand }}
                <button @click="removeFilter('brand', brand)" class="hover:text-secondary-hover">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
              <span v-if="filters.priceRange" class="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {{ priceRanges.find(p => p.value === filters.priceRange)?.label }}
                <button @click="removeFilter('price')" class="hover:text-green-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
              <span v-for="cond in selectedConditions" :key="`cond-${cond.value}`" class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {{ cond.label }}
                <button @click="removeFilter('condition', cond.value)" class="hover:text-blue-800">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="bg-white p-8">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div v-for="i in 8" :key="i" class="animate-pulse">
                <div class="aspect-square bg-gray-200 mb-4"></div>
                <div class="h-4 bg-gray-200 mb-2"></div>
                <div class="h-4 bg-gray-200 w-2/3"></div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="products.length > 0" class="bg-white p-6">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                @add-to-cart="handleAddToCart"
                @add-to-wishlist="handleAddToWishlist"
                @quick-view="handleQuickView"
              />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8 flex justify-center">
              <nav class="flex items-center gap-2">
                <button
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-2 border border-border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>

                <button
                  v-for="page in displayedPages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-4 py-2 border rounded',
                    page === currentPage
                      ? 'bg-primary text-white border-primary'
                      : 'border-border hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>

                <button
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-2 border border-border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </nav>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-white p-12 text-center">
            <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <h3 class="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
            <p class="text-text-muted mb-4">Thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
            <button @click="clearFilters" class="btn btn-primary">
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import ProductCard from '../components/ProductCard.vue'
import productService from '@/services/productService'
import categoryService from '@/services/categoryService'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// Data
const products = ref([])
const categories = ref([])
const brands = ref([])
const loading = ref(true)
const totalProducts = ref(0)
const currentPage = ref(1)
const pageSize = ref(16)
const totalPages = ref(1)
const sortBy = ref('')
const searchQuery = ref('')

// Filter state
const filters = ref({
  categoryId: null,
  brands: [],
  priceRange: '',
  condition: ''
})

// Expanded sections
const expandedSections = ref({
  categories: true,
  brands: true,
  price: true,
  condition: true
})

// Price ranges
const priceRanges = [
  { label: 'Dưới 5 triệu', value: '0-5000000' },
  { label: '5 - 10 triệu', value: '5000000-10000000' },
  { label: '10 - 15 triệu', value: '10000000-15000000' },
  { label: '15 - 20 triệu', value: '15000000-20000000' },
  { label: 'Trên 20 triệu', value: '20000000-999999999' }
]

// Conditions
const conditions = [
  { label: 'Mới 100%', value: 'new' },
  { label: 'Như mới', value: 'like_new' },
  { label: 'Tốt', value: 'good' },
  { label: 'Khá', value: 'fair' }
]

// Computed
const selectedCategory = computed(() => {
  if (filters.value.categoryId) {
    return categories.value.find(c => c.id === filters.value.categoryId)
  }
  return null
})

const selectedCategories = computed(() => {
  if (filters.value.categoryId) {
    const cat = categories.value.find(c => c.id === filters.value.categoryId)
    return cat ? [cat] : []
  }
  return []
})

const selectedConditions = computed(() => {
  if (filters.value.condition) {
    const cond = conditions.find(c => c.value === filters.value.condition)
    return cond ? [cond] : []
  }
  return []
})

const hasActiveFilters = computed(() => {
  return filters.value.categoryId ||
         filters.value.brands.length > 0 ||
         filters.value.priceRange ||
         filters.value.condition ||
         searchQuery.value
})

const displayedPages = computed(() => {
  const pages = []
  const maxPages = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
  let end = Math.min(totalPages.value, start + maxPages - 1)
  
  if (end - start < maxPages - 1) {
    start = Math.max(1, end - maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

const applyFilters = () => {
  currentPage.value = 1
  fetchProducts()
  updateUrl()
}

const clearFilters = () => {
  filters.value = {
    categoryId: null,
    brands: [],
    priceRange: '',
    condition: ''
  }
  sortBy.value = ''
  searchQuery.value = ''
  currentPage.value = 1
  fetchProducts()
  router.push({ path: '/products' })
}

const removeFilter = (type, value) => {
  if (type === 'category') {
    filters.value.categoryId = null
  } else if (type === 'brand') {
    filters.value.brands = filters.value.brands.filter(b => b !== value)
  } else if (type === 'price') {
    filters.value.priceRange = ''
  } else if (type === 'condition') {
    filters.value.condition = ''
  }
  applyFilters()
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchProducts()
    updateUrl()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const updateUrl = () => {
  const query = {}
  
  if (filters.value.categoryId) {
    query.category = filters.value.categoryId
  }
  
  if (filters.value.brands.length > 0) {
    query.brand = filters.value.brands.join(',')
  }
  
  if (filters.value.priceRange) {
    query.price = filters.value.priceRange
  }
  
  if (filters.value.condition) {
    query.condition = filters.value.condition
  }
  
  if (sortBy.value) {
    query.sort = sortBy.value
  }
  
  if (searchQuery.value) {
    query.search = searchQuery.value
  }
  
  if (currentPage.value > 1) {
    query.page = currentPage.value
  }
  
  router.push({ path: '/products', query })
}

const parseFiltersFromUrl = () => {
  const query = route.query
  
  // Category
  if (query.category) {
    const catId = parseInt(query.category)
    filters.value.categoryId = isNaN(catId) ? null : catId
  }
  
  // Brand
  if (query.brand) {
    filters.value.brands = query.brand.split(',')
  }
  
  // Price
  if (query.price) {
    filters.value.priceRange = query.price
  }
  
  // Condition
  if (query.condition) {
    filters.value.condition = query.condition
  }
  
  // Sort
  if (query.sort) {
    sortBy.value = query.sort
  }
  
  // Search
  if (query.search) {
    searchQuery.value = query.search
  }
  
  // Page
  if (query.page) {
    currentPage.value = parseInt(query.page) || 1
  }
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      limit: pageSize.value
    }
    
    // Category filter
    if (filters.value.categoryId) {
      params.categoryId = filters.value.categoryId
    }
    
    // Brand filter
    if (filters.value.brands.length > 0) {
      params.brand = filters.value.brands.join(',')
    }
    
    // Price range filter
    if (filters.value.priceRange) {
      const [min, max] = filters.value.priceRange.split('-')
      params.minPrice = min
      params.maxPrice = max
    }
    
    // Condition filter
    if (filters.value.condition) {
      params.condition = filters.value.condition
    }
    
    // Search
    if (searchQuery.value) {
      params.search = searchQuery.value
    }
    
    // Sort
    if (sortBy.value) {
      const [field, order] = sortBy.value.split('-')
      params.sortBy = field
      params.sortOrder = order || 'asc'
    }
    
    const response = await productService.getProducts(params)
    products.value = response.data.data || []
    totalProducts.value = response.data.pagination?.total || 0
    totalPages.value = response.data.pagination?.totalPages || Math.ceil(totalProducts.value / pageSize.value)
  } catch (error) {
    console.error('Error fetching products:', error)
    products.value = []
    totalProducts.value = 0
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await categoryService.getCategories()
    categories.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    categories.value = []
  }
}

const fetchBrands = async () => {
  try {
    const response = await productService.getBrands()
    brands.value = response.data || []
  } catch (error) {
    console.error('Error fetching brands:', error)
    brands.value = []
  }
}

const handleAddToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.thumbnail || product.image,
    quantity: 1
  })
}

const handleAddToWishlist = async (product) => {
  // TODO: Implement wishlist functionality
  console.log('Add to wishlist:', product)
}

const handleQuickView = (product) => {
  // TODO: Implement quick view modal
  console.log('Quick view:', product)
}

// Watch route changes
watch(() => route.query, () => {
  parseFiltersFromUrl()
  fetchProducts()
}, { deep: true })

// Initialize
onMounted(async () => {
  parseFiltersFromUrl()
  await Promise.all([
    fetchCategories(),
    fetchBrands(),
    fetchProducts()
  ])
})
</script>

<style scoped>
/* Custom scrollbar for sidebar */
aside {
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: #f1f1f1;
}

aside::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
