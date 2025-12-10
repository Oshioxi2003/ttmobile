<template>
  <div>
    <!-- Hero Banners (public) - Split layout: 1 big left, 2 small right -->
    <section class="section bg-white">
      <div class="container-custom">
        <!-- Loading -->
        <div v-if="heroLoading" class="h-64 md:h-80 lg:h-[400px] flex items-center justify-center text-gray-500 bg-gray-100 rounded-lg animate-pulse">
          Đang tải banner...
        </div>

        <!-- Error -->
        <div v-else-if="heroError" class="text-red-600 text-center py-8">
          {{ heroError }}
        </div>

        <!-- Empty -->
        <div v-else-if="heroBanners.length === 0" class="text-gray-500 text-center py-8">
          Chưa có banner.
        </div>

        <!-- Split grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:h-[400px]">
          <!-- Left big banner (2 cols if right banners exist, else span all 3) -->
          <a
            v-if="leftBanner"
            :href="leftBanner.link || '#'"
            :class="[rightSmallBanners.length ? 'lg:col-span-2' : 'lg:col-span-3', 'block rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-shadow bg-gray-100 relative group h-64 lg:h-full']"
            :aria-label="leftBanner.title || 'Banner'"
          >
            <div class="relative w-full h-full overflow-hidden">
              <component :is="isVideo(leftBanner.image) ? 'video' : 'img'"
                         :src="asset(leftBanner.image)"
                         :alt="leftBanner.title || 'banner image'"
                         class="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                         v-bind="isVideo(leftBanner.image) ? { autoplay: true, muted: true, loop: true, playsinline: true } : {}" />
            </div>
          </a>

          <!-- Right two small banners (admin-configurable) -->
          <div v-if="rightSmallBanners.length" class="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:h-full">
            <template v-for="(b, i) in rightSmallBanners" :key="i">
              <!-- Clickable wrapper chooses router-link for internal links, <a> for external, or <div> when no link -->
              <component
                :is="b.link ? (isExternal(b.link) ? 'a' : 'router-link') : 'div'"
                :to="!isExternal(b.link || '') ? b.link : undefined"
                :href="isExternal(b.link || '') ? b.link : undefined"
                :target="isExternal(b.link || '') && (b.openInNewTab ?? true) ? '_blank' : undefined"
                :rel="isExternal(b.link || '') && (b.openInNewTab ?? true) ? 'noopener' : undefined"
                class="block rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-shadow bg-gray-100 relative group h-48 lg:h-full"
                :aria-label="`Mở banner: ${b.title || (i===0?'Small Banner 1':'Small Banner 2')}`"
              >
                <div class="relative w-full h-full overflow-hidden">
                  <img
                    :src="asset(b.image)"
                    :alt="b.title || (i===0?'Small Banner 1':'Small Banner 2')"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                    @error="onImgErr"
                  />
                </div>
              </component>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-8 bg-white">
      <div class="container-custom">
        <div v-if="loadingCategories" class="flex justify-center py-8">
          <div class="inline-block animate-spin">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="`/products?category=${category.id}`"
            class="flex flex-col items-center p-4 hover:shadow-card transition-shadow rounded-lg"
          >
            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-2 overflow-hidden">
              <img
                v-if="category.image"
                :src="asset(category.image)"
                :alt="category.name"
                class="w-full h-full object-cover"
              />
              <svg v-else class="w-8 h-8 text-text" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-center">{{ category.name }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products - Điện thoại -->
    <section class="section bg-background" v-if="brands.length > 0 && brands[0]">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">{{ brands[0] }}</h2>
          <router-link :to="`/products?brand=${brands[0]}`" class="text-secondary hover:text-secondary-hover font-semibold text-sm uppercase">
            Xem tất cả →
          </router-link>
        </div>
        <div v-if="loadingPhones" class="text-center py-12">
          <div class="inline-block animate-spin">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
        </div>
        <div v-else class="product-grid">
          <div v-for="product in phoneProducts" :key="product.id" class="product-card">
            <router-link :to="`/products/${product.id}`">
              <div class="relative mb-4">
                <span v-if="product.isFeatured" class="badge absolute top-2 left-2 z-10 badge-hot">
                  HOT
                </span>
                <img :src="asset(product.thumbnail || product.image)" :alt="product.name" class="w-full aspect-square object-contain">
              </div>
              <h3 class="font-semibold text-text mb-2 line-clamp-2 min-h-[48px]">{{ product.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="price">{{ formatVND(product.price) }}</span>
              </div>
            </router-link>
            <button @click="handleAddToCart(product)" class="btn btn-primary w-full mt-3 text-xs py-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Promo Banner
    <section class="py-8">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white relative overflow-hidden">
            <h3 class="text-2xl font-bold mb-2">Samsung Galaxy S24 Ultra</h3>
            <p class="mb-4 opacity-90">AI Phone đầu tiên</p>
            <router-link to="/products?brand=samsung" class="btn bg-white text-blue-600 hover:bg-gray-100 text-sm">
              Khám phá ngay
            </router-link>
          </div>
          <div class="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 text-white relative overflow-hidden">
            <h3 class="text-2xl font-bold mb-2">Xiaomi 14 Ultra</h3>
            <p class="mb-4 opacity-90">Camera Leica đỉnh cao</p>
            <router-link to="/products?brand=xiaomi" class="btn bg-white text-orange-600 hover:bg-gray-100 text-sm">
              Xem ngay
            </router-link>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Featured Products - Tablet -->
    <section class="section bg-white" v-if="brands.length > 1 && brands[1]">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">{{ brands[1] }}</h2>
          <router-link :to="`/products?brand=${brands[1]}`" class="text-secondary hover:text-secondary-hover font-semibold text-sm uppercase">
            Xem tất cả →
          </router-link>
        </div>
        <div v-if="loadingTablet" class="text-center py-12">
          <div class="inline-block animate-spin">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
        </div>
        <div v-else class="product-grid">
          <div v-for="product in tabletProducts" :key="product.id" class="product-card">
            <router-link :to="`/products/${product.id}`">
              <div class="relative mb-4">
                <span v-if="product.isFeatured" class="badge absolute top-2 left-2 z-10 badge-hot">
                  NEW
                </span>
                <img :src="asset(product.thumbnail || product.image)" :alt="product.name" class="w-full aspect-square object-contain">
              </div>
              <h3 class="font-semibold text-text mb-2 line-clamp-2 min-h-[48px]">{{ product.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="price">{{ formatVND(product.price) }}</span>
              </div>
            </router-link>
            <button @click="handleAddToCart(product)" class="btn btn-primary w-full mt-3 text-xs py-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products - Phụ kiện (Accessories) -->
    <section v-if="accessoriesProducts.length > 0 && brands.length > 2 && brands[2]" class="section bg-background">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">{{ brands[2] }}</h2>
          <router-link :to="`/products?brand=${brands[2]}`" class="text-secondary hover:text-secondary-hover font-semibold text-sm uppercase">
            Xem tất cả →
          </router-link>
        </div>
        <div class="product-grid">
          <div v-for="product in accessoriesProducts" :key="product.id" class="product-card">
            <router-link :to="`/products/${product.id}`">
              <div class="relative mb-4">
                <span v-if="product.isFeatured" class="badge absolute top-2 left-2 z-10 badge-hot">HOT</span>
                <img :src="asset(product.thumbnail || product.image)" :alt="product.name" class="w-full aspect-square object-contain">
              </div>
              <h3 class="font-semibold text-text mb-2 line-clamp-2 min-h-[48px]">{{ product.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="price">{{ formatVND(product.price) }}</span>
              </div>
            </router-link>
            <button @click="handleAddToCart(product)" class="btn btn-primary w-full mt-3 text-xs py-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products - LAPTOP -->
    <section v-if="laptopProducts.length > 0 && brands.length > 3 && brands[3]" class="section bg-white">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">{{ brands[3] }}</h2>
          <router-link :to="`/products?brand=${brands[3]}`" class="text-secondary hover:text-secondary-hover font-semibold text-sm uppercase">
            Xem tất cả →
          </router-link>
        </div>
        <div class="product-grid">
          <div v-for="product in laptopProducts" :key="product.id" class="product-card">
            <router-link :to="`/products/${product.id}`">
              <div class="relative mb-4">
                <span v-if="product.isFeatured" class="badge absolute top-2 left-2 z-10 badge-hot">HOT</span>
                <img :src="asset(product.thumbnail || product.image)" :alt="product.name" class="w-full aspect-square object-contain">
              </div>
              <h3 class="font-semibold text-text mb-2 line-clamp-2 min-h-[48px]">{{ product.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="price">{{ formatVND(product.price) }}</span>
              </div>
            </router-link>
            <button @click="handleAddToCart(product)" class="btn btn-primary w-full mt-3 text-xs py-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section bg-background">
      <div class="container-custom">
        <h2 class="section-title text-center">Tại sao chọn T&T MOBILE?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-6 text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">100% Chính hãng</h3>
            <p class="text-text-light text-sm">Cam kết sản phẩm chính hãng, có bảo hành đầy đủ</p>
          </div>
          <div class="bg-white p-6 text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Giá tốt nhất</h3>
            <p class="text-text-light text-sm">Giá cạnh tranh nhất thị trường Nhật Bản</p>
          </div>
          <div class="bg-white p-6 text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Giao hàng nhanh</h3>
            <p class="text-text-light text-sm">Giao hàng toàn Nhật trong 1-3 ngày</p>
          </div>
          <div class="bg-white p-6 text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg mb-2">Hỗ trợ tiếng Việt</h3>
            <p class="text-text-light text-sm">Đội ngũ tư vấn người Việt, hỗ trợ 24/7</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import productService from '@/services/productService'
import categoryService from '@/services/categoryService'
import { useCartStore } from '@/stores/cartStore'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'

import bannerService from '@/services/bannerService'
import { useSiteSettings } from '@/composables/useSiteSettings'
import { useSettingStore } from '@/stores/settingStore'

// ----- Header/Footer settings (loaded and cached) -----
const { loadSettings } = useSiteSettings()
const settingStore = useSettingStore()

async function preloadHeaderFooterSettings() {
  // Load public settings (cached via settingStore + localStorage)
  try {
    await settingStore.fetch()
  } catch {}

  // Load site settings (cached via useSiteSettings)
  try {
    await loadSettings()
  } catch {}

  // Contact/social is provided via settingStore.fetch() (merged in useSiteSettings).
  // Avoid direct calls here to prevent duplicate /settings/purchase-contact requests.
}

// ----- Page-specific data -----
const heroBanners = ref([])
const heroLoading = ref(false)
const heroError = ref('')

const isVideo = (src) => /\.mp4(\?.*)?$/i.test(String(src || ''))
const isExternal = (url='') => /^https?:\/\//i.test(String(url)) && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?\//i.test(String(url))
const onImgErr = (e) => {
  try { e.target.onerror = null } catch {}
  // tiny transparent gif keeps layout stable
  e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  e.target.classList.add('bg-gray-100')
}

const leftBanner = computed(() => heroBanners.value[0] || null)

const rightSmallBanners = ref([])

// Categories
const categories = ref([])
const loadingCategories = ref(false)

// Brands - Dynamic from database
const brands = ref([])
const loadingBrands = ref(false)

// Featured products by category
const phoneProducts = ref([])
const tabletProducts = ref([])
const accessoriesProducts = ref([])
const laptopProducts = ref([])

// Loading states
const loadingPhones = ref(false)
const loadingTablet = ref(false)
const loadingAccessories = ref(false)
const loadingLaptop = ref(false)

const cartStore = useCartStore()

const handleAddToCart = (product) => {
  cartStore.addToCart(product, 1)
}

const loadHeroBanners = async () => {
  heroLoading.value = true;
  heroError.value = '';
  try {
    const res = await bannerService.getHeroBanners();
    heroBanners.value = res.data?.data || [];
    console.log('Hero banners loaded:', heroBanners.value);
  } catch (e) {
    heroError.value = e?.response?.data?.message || e.message || 'Failed to load banners';
    heroBanners.value = [];
  } finally {
    heroLoading.value = false;
  }
};

const fetchRightSmallBanners = async () => {
  try {
    const res = await bannerService.getBannersByPosition('right-small');
    rightSmallBanners.value = res.data?.data || [];
    console.log('Right small banners loaded:', rightSmallBanners.value);
  } catch (e) {
    console.error('Failed to load right small banners:', e);
    rightSmallBanners.value = [];
  }
};

const loadCategories = async () => {
  loadingCategories.value = true
  try {
    const response = await categoryService.getCategories()
    categories.value = response.data?.data || []
  } catch (error) {
    console.error('Failed to load categories:', error)
    categories.value = []
  } finally {
    loadingCategories.value = false
  }
}

const loadBrands = async () => {
  loadingBrands.value = true
  try {
    const response = await productService.getBrands()
    brands.value = response.data?.data || []
    
    // After loading brands, fetch featured products for each brand (max 4 brands)
    const topBrands = brands.value.slice(0, 4)
    if (topBrands[0]) fetchFeatured({ params: { brand: topBrands[0] }, listRef: phoneProducts, loadingRef: loadingPhones })
    if (topBrands[1]) fetchFeatured({ params: { brand: topBrands[1] }, listRef: tabletProducts, loadingRef: loadingTablet })
    if (topBrands[2]) fetchFeatured({ params: { brand: topBrands[2] }, listRef: accessoriesProducts, loadingRef: loadingAccessories })
    if (topBrands[3]) fetchFeatured({ params: { brand: topBrands[3] }, listRef: laptopProducts, loadingRef: loadingLaptop })
  } catch (error) {
    console.error('Failed to load brands:', error)
    brands.value = []
  } finally {
    loadingBrands.value = false
  }
}

const safeArray = (v) => {
  const data = v?.data?.data ?? v?.data ?? v
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.items)) return data.items
  return []
}

const fetchFeatured = async ({ params, listRef, loadingRef, fallbackParams }) => {
  try {
    loadingRef.value = true
    const res = await productService.getProducts({ ...params, limit: 5 })
    let list = safeArray(res)
    // Fallback if configured and result is empty
    if ((!Array.isArray(list) || list.length === 0) && fallbackParams) {
      try {
        const res2 = await productService.getProducts({ ...fallbackParams, limit: 5 })
        list = safeArray(res2)
      } catch (e) {
        // ignore, keep empty list
      }
    }
    listRef.value = Array.isArray(list) ? list : []
  } catch (e) {
    console.error('Failed to load featured products:', e)
    listRef.value = []
  } finally {
    loadingRef.value = false
  }
}

onMounted(() => {
  // Preload header/footer settings; MainLayout consumes the same reactive objects
  preloadHeaderFooterSettings()

  loadHeroBanners();
  fetchRightSmallBanners();
  loadCategories();
  loadBrands();

  // Featured blocks - Using brand instead of category
  // Will be populated dynamically after brands are loaded
});
</script>

