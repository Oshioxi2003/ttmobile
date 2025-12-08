<template>
  <div>
    <!-- Hero Banners (public) - Split layout: 1 big left, 2 small right -->
    <section class="container mx-auto px-4 py-6">
      <!-- Loading -->
      <div v-if="heroLoading" class="h-56 md:h-72 lg:h-[360px] flex items-center justify-center text-gray-500 bg-gray-100 rounded-xl animate-pulse">
        Đang tải banner...
      </div>

      <!-- Error -->
      <div v-else-if="heroError" class="text-red-600">
        {{ heroError }}
      </div>

      <!-- Empty -->
      <div v-else-if="heroBanners.length === 0" class="text-gray-500">
        Chưa có banner.
      </div>

      <!-- Split grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Left big banner (2 cols if right banners exist, else span all 3) -->
        <a
          v-if="leftBanner"
          :href="leftBanner.link || '#'"
          :class="[rightSmallBanners.length ? 'lg:col-span-2' : 'lg:col-span-3', 'block rounded-xl overflow-hidden shadow-lg border bg-white']"
          :aria-label="leftBanner.title || 'Banner'"
        >
          <component :is="isVideo(leftBanner.image) ? 'video' : 'img'"
                     :src="asset(leftBanner.image)"
                     :alt="leftBanner.title || 'banner image'"
                     class="w-full h-56 md:h-72 lg:h-[360px] object-cover"
                     v-bind="isVideo(leftBanner.image) ? { autoplay: true, muted: true, loop: true, playsinline: true } : {}" />
        </a>

        <!-- Right two small banners (admin-configurable) -->
        <div v-if="rightSmallBanners.length" class="flex flex-col gap-4 lg:gap-4 mt-3 lg:mt-0">
          <template v-for="(b, i) in rightSmallBanners" :key="i">
            <!-- Clickable wrapper chooses router-link for internal links, <a> for external, or <div> when no link -->
            <component
              :is="b.linkUrl ? (isExternal(b.linkUrl) ? 'a' : 'router-link') : 'div'"
              :to="!isExternal(b.linkUrl || '') ? b.linkUrl : undefined"
              :href="isExternal(b.linkUrl || '') ? b.linkUrl : undefined"
              :target="isExternal(b.linkUrl || '') && (b.openInNewTab ?? true) ? '_blank' : undefined"
              :rel="isExternal(b.linkUrl || '') && (b.openInNewTab ?? true) ? 'noopener' : undefined"
              class="block rounded-lg overflow-hidden shadow-lg border bg-white transition-opacity hover:opacity-95"
              :aria-label="`Mở banner: ${b.title || (i===0?'Small Banner 1':'Small Banner 2')}`"
            >
              <img
                :src="asset(b.imageUrl)"
                :alt="b.title || (i===0?'Small Banner 1':'Small Banner 2')"
                loading="lazy"
                decoding="async"
                width="480"
                height="270"
                class="w-full aspect-video object-cover"
                @error="onImgErr"
              />
            </component>
          </template>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-8 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <router-link to="/products?brand=iphone" class="flex flex-col items-center p-4 hover:shadow-card transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-text" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-center">iPhone</span>
          </router-link>
          <router-link to="/products?brand=samsung" class="flex flex-col items-center p-4 hover:shadow-card transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-text" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.5 2C4.12 2 3 3.12 3 4.5v15C3 20.88 4.12 22 5.5 22h13c1.38 0 2.5-1.12 2.5-2.5v-15C21 3.12 19.88 2 18.5 2h-13zM12 20c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-center">Samsung</span>
          </router-link>
          <router-link to="/products?brand=xiaomi" class="flex flex-col items-center p-4 hover:shadow-card transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-2">
              <span class="text-xl font-bold text-text">Mi</span>
            </div>
            <span class="text-sm font-semibold text-center">Xiaomi</span>
          </router-link>
          <router-link to="/products?category=tablet" class="flex flex-col items-center p-4 hover:shadow-card transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-text" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-center">Tablet</span>
          </router-link>
          <router-link to="/products?category=watch" class="flex flex-col items-center p-4 hover:shadow-card transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-text" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12zM6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-center">Đồng hồ</span>
          </router-link>
          <router-link to="/products?category=accessories" class="flex flex-col items-center p-4 hover:shadow-card transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-2">
              <svg class="w-8 h-8 text-text" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <span class="text-sm font-semibold text-center">Phụ kiện</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products - iPhone -->
    <section class="section bg-background">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">iPhone</h2>
          <router-link to="/products?category=iPhone" class="text-secondary hover:text-secondary-hover font-semibold text-sm uppercase">
            Xem tất cả →
          </router-link>
        </div>
        <div v-if="loadingIphone" class="text-center py-12">
          <div class="inline-block animate-spin">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
        </div>
        <div v-else class="product-grid">
          <div v-for="product in iphoneProducts" :key="product.id" class="product-card">
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

    <!-- Promo Banner -->
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
    </section>

    <!-- Featured Products - Samsung -->
    <section class="section bg-white">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">Samsung</h2>
          <router-link to="/products?brand=Samsung" class="text-secondary hover:text-secondary-hover font-semibold text-sm uppercase">
            Xem tất cả →
          </router-link>
        </div>
        <div v-if="loadingSamsung" class="text-center py-12">
          <div class="inline-block animate-spin">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
        </div>
        <div v-else class="product-grid">
          <div v-for="product in samsungProducts" :key="product.id" class="product-card">
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

    <!-- Featured Products - XIAOMI -->
    <section class="section bg-white">
      <div class="container-custom">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-title mb-0">Samsung</h2>
          <router-link to="/products?brand=Samsung" class="text-secondary hover:text-secondary-hover font-semibold text-sm uppercase">
            Xem tất cả →
          </router-link>
        </div>
        <div v-if="loadingSamsung" class="text-center py-12">
          <div class="inline-block animate-spin">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
        </div>
        <div v-else class="product-grid">
          <div v-for="product in samsungProducts" :key="product.id" class="product-card">
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
import { useCartStore } from '@/stores/cartStore'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'

import bannerService from '@/services/bannerService'
import { useSiteSettings } from '@/composables/useSiteSettings'
import { useSettingStore } from '@/stores/settingStore'

// ----- Header/Footer settings (loaded and cached) -----
const { siteSettings, loadSettings } = useSiteSettings()
const settingStore = useSettingStore()
const navConfig = ref([])

async function preloadHeaderFooterSettings() {
  // Load public settings (cached via settingStore + localStorage)
  try {
    await settingStore.fetch()
  } catch {}

  // Load site settings (cached via useSiteSettings)
  try {
    await loadSettings()
  } catch {}

  // Parse NAV config from either site or store
  try {
    const raw = siteSettings.value?.nav_config || settingStore.get?.('nav_config', '[]') || '[]'
    try { navConfig.value = JSON.parse(raw || '[]') } catch { navConfig.value = [] }
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

const iphoneProducts = ref([])
const samsungProducts = ref([])
const loadingIphone = ref(false)
const loadingSamsung = ref(false)
const cartStore = useCartStore()

const fetchIphoneProducts = async () => {
  try {
    loadingIphone.value = true
    const res = await productService.getProductsByBrand('iPhone', { limit: 5 })
    iphoneProducts.value = res.data?.data || []
  } catch (error) {
    console.error('Error fetching iPhone products:', error)
    iphoneProducts.value = []
  } finally {
    loadingIphone.value = false
  }
}

const fetchSamsungProducts = async () => {
  try {
    loadingSamsung.value = true
    const res = await productService.getProductsByBrand('Samsung', { limit: 5 })
    samsungProducts.value = res.data?.data || []
  } catch (error) {
    console.error('Error fetching Samsung products:', error)
    samsungProducts.value = []
  } finally {
    loadingSamsung.value = false
  }
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product, 1)
}

const loadHeroBanners = async () => {
  heroLoading.value = true;
  heroError.value = '';
  try {
    const res = await bannerService.getHeroBanners();
    heroBanners.value = res.data?.data || [];
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
  } catch (e) {
    console.error('Failed to load right small banners:', e);
    rightSmallBanners.value = [];
  }
};

onMounted(() => {
  // Preload header/footer settings; MainLayout consumes the same reactive objects
  preloadHeaderFooterSettings()

  loadHeroBanners();
  fetchRightSmallBanners();
  fetchIphoneProducts();
  fetchSamsungProducts();
});
</script>

