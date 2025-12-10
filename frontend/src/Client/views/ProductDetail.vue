<template>
  <div class="bg-background min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-secondary hover:text-secondary-hover">Trang chủ</router-link>
          <span class="mx-2 text-text-muted">/</span>
          <router-link to="/products" class="text-secondary hover:text-secondary-hover">Điện thoại</router-link>
          <span class="mx-2 text-text-muted">/</span>
          <span class="text-text">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="container-custom py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </div>
      </div>

      <div v-else class="bg-white p-6 lg:p-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <!-- Product Images -->
          <div class="relative">
            <!-- Main Image -->
            <div
              class="relative mb-4 border border-border group"
              @mouseenter="isZooming = true"
              @mouseleave="isZooming = false"
              @mousemove="handleMouseMove"
            >
              <span v-if="product.badge" :class="['badge absolute top-4 left-4 z-10', product.badge === 'HOT' ? 'badge-hot' : 'badge-sale']">
                {{ product.badge }}
              </span>
              <div class="aspect-square flex items-center justify-center p-8">
                <img ref="mainImageEl" :src="normalizeImageUrl(selectedImage)" :alt="product.name" class="max-w-full max-h-full object-contain">
              </div>
              <!-- Zoom Lens -->
              <div
                v-show="isZooming"
                ref="lensEl"
                class="absolute border border-primary bg-white/30 pointer-events-none"
              ></div>
            </div>

            <!-- Zoom Result -->
            <div
              v-show="isZooming"
              ref="zoomResultEl"
              class="absolute top-0 left-full ml-4 w-full h-full border border-border bg-no-repeat pointer-events-none z-20 bg-white"
            ></div>

            <!-- Thumbnails -->
            <div class="flex gap-2 overflow-x-auto">
              <button
                v-for="(img, index) in product.images"
                :key="index"
                @click="selectedImage = normalizeImageUrl(img)"
                :class="[
                  'w-20 h-20 border-2 flex-shrink-0 p-1',
                  selectedImage === normalizeImageUrl(img) ? 'border-primary' : 'border-border hover:border-primary'
                ]"
              >
                <img :src="normalizeImageUrl(img)" :alt="`${product.name} - ${index + 1}`" class="w-full h-full object-contain">
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold text-text mb-4">{{ product.name }}</h1>

            <!-- Price -->
            <div class="flex items-center gap-4 mb-6">
              <span class="text-3xl font-bold text-primary">{{ formatVND(product.price) }}</span>
              <span v-if="product.oldPrice" class="text-xl text-text-muted line-through">{{ formatVND(product.oldPrice) }}</span>
              <span v-if="product.oldPrice" class="badge badge-sale">
                -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
              </span>
            </div>

            <!-- Specs -->
            <div class="border-t border-b border-border py-6 mb-6 space-y-4">
              <div class="flex">
                <span class="text-text-muted w-32">Tình trạng:</span>
                <span class="font-semibold text-success">{{ product.condition }}</span>
              </div>
              <div v-if="product.color" class="flex">
                <span class="text-text-muted w-32">Màu sắc:</span>
                <span class="font-medium">{{ product.color }}</span>
              </div>
              <div v-if="product.batteryHealth" class="flex">
                <span class="text-text-muted w-32">Pin:</span>
                <span class="font-medium">{{ product.batteryHealth }}%</span>
              </div>
              <div v-if="product.warranty" class="flex">
                <span class="text-text-muted w-32">Bảo hành:</span>
                <span class="font-medium">{{ product.warranty }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 mb-6">
              <button @click="showContactModal = true" class="btn btn-primary flex-1">
                Liên hệ tư vấn
              </button>
              <button class="btn btn-secondary px-4" @click="handleAddToWishlist">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <!-- Contact -->
            <div class="bg-background p-4">
              <p class="font-semibold mb-2">{{ siteSettings.purchase_message || 'Liên hệ tư vấn:' }}</p>
              <div class="flex items-center gap-4">
                <a v-if="siteSettings.contact_phone" :href="`tel:${siteSettings.contact_phone}`" class="flex items-center text-primary font-bold">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {{ siteSettings.contact_phone }}
                </a>
                <span v-if="siteSettings.contact_phone && zaloHref !== '#'" class="text-text-muted">|</span>
                <a v-if="zaloHref && zaloHref !== '#'" :href="zaloHref" target="_blank" rel="noopener" class="flex items-center text-secondary hover:text-secondary-hover">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C13.52 4 5 11.52 5 21c0 6.33 3.87 11.8 9.5 14.5L13 44l8.63-4.5c.79.1 1.58.2 2.37.2 10.48 0 19-7.52 19-17S34.48 4 24 4zm-1.2 24.5l-5.5-5.8-10.7 5.8L18.5 16l5.6 5.9L35 16l-12.2 12.5z"/>
                  </svg>
                  Chat Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs: Description, Specs, Reviews -->
      <div v-if="!loading" class="bg-white mt-6 p-6 lg:p-10">
        <div class="border-b border-border mb-6">
          <nav class="flex gap-8">
            <button
              @click="activeTab = 'description'"
              :class="['pb-4 font-semibold', activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text']"
            >
              Mô tả sản phẩm
            </button>
            <button
              @click="activeTab = 'specs'"
              :class="['pb-4 font-semibold', activeTab === 'specs' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text']"
            >
              Thông số kỹ thuật
            </button>
            <button
              @click="activeTab = 'reviews'"
              :class="['pb-4 font-semibold', activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-text']"
            >
              Đánh giá ({{ product.reviewCount }})
            </button>
          </nav>
        </div>

                <!-- Tab Content -->
        <div v-if="activeTab === 'description'">
          <div
            ref="descriptionContainer"
            class="prose max-w-none transition-all duration-500"
            :class="{ 'max-h-60 overflow-hidden relative': !isDescriptionExpanded && isDescriptionLong }"
            v-html="descriptionHtml"
          ></div>
          <div v-if="isDescriptionLong" class="mt-4">
             <button @click="isDescriptionExpanded = !isDescriptionExpanded" class="font-semibold text-primary hover:underline">
              {{ isDescriptionExpanded ? 'Thu gọn' : 'Xem thêm' }}
            </button>
          </div>
        </div>
        <div v-if="activeTab === 'specs'" class="space-y-3">
          <div v-for="(value, key) in product.specs" :key="key" class="flex border-b border-border py-3">
            <span class="w-48 text-text-muted">{{ key }}</span>
            <span class="font-medium">{{ value }}</span>
          </div>
        </div>
        <div v-if="activeTab === 'reviews'" class="py-6">
          <div v-if="loadingReviews" class="text-center text-text-muted py-6">Đang tải đánh giá...</div>

          <div v-else>
            <div v-if="reviews.length === 0" class="text-center text-text-muted py-6">
              Chưa có đánh giá nào cho sản phẩm này.
            </div>

            <div v-else class="space-y-4">
              <div v-for="rv in reviews" :key="rv.id" class="border-b border-border pb-4">
                <div class="flex items-center justify-between">
                  <div class="font-semibold">{{ rv.userName || 'Người dùng' }}</div>
                  <div class="text-yellow-500">
                    <span v-for="n in 5" :key="n">
                      <span v-if="n <= rv.rating">★</span>
                      <span v-else class="text-gray-300">★</span>
                    </span>
                  </div>
                </div>
                <div class="text-sm text-text-muted">{{ new Date(rv.createdAt).toLocaleString() }}</div>
                <p class="mt-2">{{ rv.comment }}</p>
              </div>
            </div>

            <!-- Add Review -->
            <div v-if="isAuthenticated" class="mt-6 border-t border-border pt-6">
              <h3 class="font-semibold mb-3">Viết đánh giá</h3>
              <form @submit.prevent="submitReview" class="space-y-3">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-text-muted">Đánh giá:</label>
                  <button type="button" v-for="n in 5" :key="n" @click="newReview.rating = n" :class="n <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'">★</button>
                </div>
                <textarea v-model="newReview.comment" class="input w-full" rows="3" placeholder="Chia sẻ cảm nhận của bạn..." required></textarea>
                <button class="btn btn-primary" :disabled="submittingReview">
                  <span v-if="submittingReview">Đang gửi...</span>
                  <span v-else>Gửi đánh giá</span>
                </button>
              </form>
            </div>
            <div v-else class="mt-6 text-sm text-text-muted">Vui lòng đăng nhập để viết đánh giá.</div>
          </div>
        </div>
      </div>
      </div>

      <!-- Related Products -->
      <div v-if="!loading && relatedProducts.length > 0" class="mt-8 bg-white p-6 lg:p-10">
        <h2 class="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>

      <!-- Contact Modal -->
      <div v-if="showContactModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" @click.self="showContactModal = false">
        <div class="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
          <h3 class="text-xl font-semibold text-center mb-4">Liên hệ tư vấn</h3>
          <p v-if="siteSettings.purchase_message" class="text-sm text-gray-600 text-center mb-4">{{ siteSettings.purchase_message }}</p>
          <div class="space-y-3">
            <a v-if="facebookMessengerHref && facebookMessengerHref !== '#'" :href="facebookMessengerHref" target="_blank" rel="noopener" class="btn btn-primary w-full flex items-center justify-center gap-2" style="background-color: #0084FF;">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.14 2 11.25c0 2.92 1.45 5.51 3.71 7.24V22l3.38-1.85c.9.25 1.86.38 2.91.38 5.5 0 10-4.14 10-9.25S17.5 2 12 2zm1 12.46l-2.57-2.74-5 2.74 5.5-5.84 2.63 2.74 4.94-2.74-5.5 5.84z"/>
              </svg>
              Chat qua Messenger
            </a>
            <a v-if="zaloHref && zaloHref !== '#'" :href="zaloHref" target="_blank" rel="noopener" class="btn btn-primary w-full flex items-center justify-center gap-2" style="background-color: #0068FF;">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C13.52 4 5 11.52 5 21c0 6.33 3.87 11.8 9.5 14.5L13 44l8.63-4.5c.79.1 1.58.2 2.37.2 10.48 0 19-7.52 19-17S34.48 4 24 4zm-1.2 24.5l-5.5-5.8-10.7 5.8L18.5 16l5.6 5.9L35 16l-12.2 12.5z"/>
              </svg>
              Chat qua Zalo
            </a>
            <a v-if="siteSettings.contact_phone" :href="`tel:${siteSettings.contact_phone}`" class="btn btn-secondary w-full flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Gọi {{ siteSettings.contact_phone }}
            </a>
          </div>
          <button @click="showContactModal = false" class="mt-4 w-full text-center text-sm text-gray-600 hover:underline">Đóng</button>
        </div>
      </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import productService from '@/services/productService'
import reviewService from '@/services/reviewService'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useSiteSettings } from '@/composables/useSiteSettings'
import ProductCard from '@/Client/components/ProductCard.vue'
import edjsHTML from 'editorjs-html'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'

// Normalize various image URL formats
const normalizeImageUrl = (rawUrl = '') => {
  if (!rawUrl) return ''
  let url = String(rawUrl).trim()
  
  // If already full URL, return as is
  if (/^https?:\/\//i.test(url)) return url
  
  // Remove any query parameters with 'image='
  if (url.includes('image=')) {
    const match = url.match(/image=([^&]+)/)
    if (match) url = decodeURIComponent(match[1])
  }
  
  // Remove any duplicate origin
  url = url.replace(/^https?:\/\/[^/]+/, '')
  
  // Ensure it starts with /
  if (!url.startsWith('/')) {
    url = '/' + url
  }
  
  // Use asset utility to resolve proper URL
  return asset(url)
}


const route = useRoute()
const { siteSettings, loadSettings } = useSiteSettings()

const showContactModal = ref(false)
const activeTab = ref('description')
const selectedColor = ref('')
const selectedStorage = ref('')
const loading = ref(false)
const isZooming = ref(false)
const mainImageEl = ref(null)
const lensEl = ref(null)
const zoomResultEl = ref(null)

const product = ref({
  id: null,
  name: '',
  price: 0,
  condition: '',
  warranty: '',
  color: '',
  batteryHealth: null,
  colors: [],
  storages: [],
  images: [],
  description: '',
  specs: {},
  reviewCount: 0
})

const selectedImage = ref('')
const wishlistStore = useWishlistStore()

const isAuthenticated = computed(() => !!localStorage.getItem('token'))

// Build Zalo link from settings
const zaloHref = computed(() => {
  const url = siteSettings.value?.zalo_url
  if (url && typeof url === 'string') return url
  const phone = siteSettings.value?.zalo_phone || siteSettings.value?.contact_phone
  if (!phone) return '#'
  const digits = String(phone).replace(/[^0-9]/g, '')
  if (!digits) return '#'
  return `https://zalo.me/${digits}`
})

// Build Facebook Messenger link
const facebookMessengerHref = computed(() => {
  const url = siteSettings.value?.facebook_url
  if (!url || typeof url !== 'string') return '#'
  // Extract Facebook page ID or username from URL
  const match = url.match(/facebook\.com\/([^/?]+)/)
  if (match && match[1]) {
    return `https://m.me/${match[1]}`
  }
  return url
})

const reviews = ref([])
const loadingReviews = ref(false)
const newReview = ref({ rating: 5, comment: '' })
const submittingReview = ref(false)
const relatedProducts = ref([])
const isDescriptionExpanded = ref(false)
const isDescriptionLong = ref(false)
const descriptionContainer = ref(null)

// Custom parser cho Editor.js blocks
const parseEditorJsData = (data) => {
  if (!data || !Array.isArray(data.blocks)) return '';

  return data.blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${block.data.text || ''}</p>`;

      case 'header':
        const level = block.data.level || 2;
        return `<h${level}>${block.data.text || ''}</h${level}>`;

      case 'list':
        const listTag = block.data.style === 'ordered' ? 'ol' : 'ul';
        const items = (block.data.items || []).map(item => `<li>${item}</li>`).join('');
        return `<${listTag}>${items}</${listTag}>`;

      case 'image': {
        const rawUrl = block.data.url || block.data.file?.url || '';
        if (!rawUrl) return '';
        
        let imgUrl = rawUrl;
        // Check if it's already a full URL
        if (!/^https?:\/\//i.test(imgUrl)) {
          // Extract path if it contains 'image='
          if (imgUrl.includes('image=')) {
            const match = imgUrl.match(/image=([^&]+)/);
            if (match) imgUrl = decodeURIComponent(match[1]);
          }
          // Ensure leading slash
          if (!imgUrl.startsWith('/')) imgUrl = '/' + imgUrl;
          imgUrl = asset(imgUrl);
        }
        
        const imgCaption = block.data.caption || '';
        return `<figure class="my-4">
          <img src="${imgUrl}" alt="${imgCaption}" class="w-full rounded-lg" />
          ${imgCaption ? `<figcaption class="text-sm text-gray-600 mt-2 text-center">${imgCaption}</figcaption>` : ''}
        </figure>`;
      }

      case 'code':
        return `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>${block.data.code || ''}</code></pre>`;

      case 'quote':
        return `<blockquote class="border-l-4 border-primary pl-4 italic text-gray-700 my-4">${block.data.text || ''}</blockquote>`;

      case 'delimiter':
        return '<hr class="my-6" />';

      case 'table': {
        const rows = (block.data.content || []).map(row => {
          const cells = row.map(cell => `<td class=\"border border-gray-300 px-3 py-2\">${cell}</td>`).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
        return `<table class=\"w-full border-collapse border border-gray-300\">${rows}</table>`;
      }

      case 'embed': {
        const service = block.data.service;
        const source = block.data.source || block.data.embed || '';
        const caption = block.data.caption || '';
        if (service === 'youtube' && source) {
          // Normalize YouTube embed
          const url = new URL(source, window.location.origin);
          const videoId = url.searchParams.get('v') || source.split('/').pop();
          return `<div class=\"my-4 aspect-video\"><iframe class=\"w-full h-full\" src=\"https://www.youtube.com/embed/${videoId}\" frameborder=\"0\" allowfullscreen></iframe>${caption ? `<div class=\"text-xs text-gray-500 mt-1\">${caption}</div>` : ''}</div>`;
        }
        // Generic iframe
        if (source) {
          return `<div class=\"my-4\"><iframe class=\"w-full min-h-[320px]\" src=\"${source}\" frameborder=\"0\" allowfullscreen></iframe>${caption ? `<div class=\"text-xs text-gray-500 mt-1\">${caption}</div>` : ''}</div>`;
        }
        return '';
      }

      default:
        return '';
    }
  }).join('');
};

const descriptionHtml = computed(() => {
  const raw = product.value.description;
  if (!raw) return '<p>Chưa có mô tả</p>';
  
  try {
    let data;
    let parseAttempts = 0;
    let currentValue = raw;
    
    // Try to parse up to 3 times for deeply nested JSON strings
    while (parseAttempts < 3 && typeof currentValue === 'string') {
      const trimmed = currentValue.trim();
      
      // Check if it looks like JSON
      if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
        // It's plain text
        return `<p>${currentValue}</p>`;
      }
      
      try {
        currentValue = JSON.parse(trimmed);
        parseAttempts++;
      } catch (e) {
        // If parse fails, it's either malformed JSON or plain text
        if (parseAttempts === 0) {
          return `<p>${raw}</p>`;
        }
        break;
      }
    }
    
    data = currentValue;
    
    // Now check if it's Editor.js format
    if (data && typeof data === 'object' && data.blocks && Array.isArray(data.blocks)) {
      if (data.blocks.length === 0) {
        return '<p>Chưa có mô tả</p>';
      }
      
      // Use editorjs-html with custom image handler
      const parser = edjsHTML({
        paragraph: (block) => {
          const text = block.data?.text || '';
          return text ? `<p>${text}</p>` : '';
        },
        header: (block) => {
          const level = block.data?.level || 2;
          const text = block.data?.text || '';
          return text ? `<h${level}>${text}</h${level}>` : '';
        },
        list: (block) => {
          const style = block.data?.style || 'unordered';
          const items = block.data?.items || [];
          if (items.length === 0) return '';
          const tag = style === 'ordered' ? 'ol' : 'ul';
          const itemsHtml = items.map(item => `<li>${item}</li>`).join('');
          return `<${tag}>${itemsHtml}</${tag}>`;
        },
        image: (block) => {
          const rawUrl = block.data?.url || block.data?.file?.url || '';
          if (!rawUrl) return '';
          
          let imgUrl = rawUrl;
          if (!/^https?:\/\//i.test(imgUrl)) {
            if (imgUrl.includes('image=')) {
              const match = imgUrl.match(/image=([^&]+)/);
              if (match) imgUrl = decodeURIComponent(match[1]);
            }
            if (!imgUrl.startsWith('/')) imgUrl = '/' + imgUrl;
            imgUrl = asset(imgUrl);
          }
          
          const caption = block.data?.caption || '';
          return `<figure class="my-4"><img src="${imgUrl}" alt="${caption}" class="w-full rounded-lg" />${caption ? `<figcaption class="text-sm text-gray-600 mt-2 text-center">${caption}</figcaption>` : ''}</figure>`;
        },
        quote: (block) => {
          const text = block.data?.text || '';
          return text ? `<blockquote class="border-l-4 border-primary pl-4 italic text-gray-700 my-4">${text}</blockquote>` : '';
        },
        delimiter: () => '<hr class="my-6" />',
        table: (block) => {
          const content = block.data?.content || [];
          if (content.length === 0) return '';
          const rows = content.map(row => {
            const cells = row.map(cell => `<td class="border border-gray-300 px-3 py-2">${cell}</td>`).join('');
            return `<tr>${cells}</tr>`;
          }).join('');
          return `<table class="w-full border-collapse border border-gray-300">${rows}</table>`;
        },
        code: (block) => {
          const code = block.data?.code || '';
          return code ? `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>${code}</code></pre>` : '';
        },
        embed: (block) => {
          const service = block.data?.service;
          const source = block.data?.source || block.data?.embed || '';
          const caption = block.data?.caption || '';
          
          if (!source) return '';
          
          if (service === 'youtube') {
            let videoId = '';
            try {
              const url = new URL(source);
              videoId = url.searchParams.get('v') || source.split('/').pop();
            } catch {
              videoId = source.split('/').pop();
            }
            return `<div class="my-4 aspect-video"><iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>${caption ? `<div class="text-xs text-gray-500 mt-1">${caption}</div>` : ''}</div>`;
          }
          
          return `<div class="my-4"><iframe class="w-full min-h-[320px]" src="${source}" frameborder="0" allowfullscreen></iframe>${caption ? `<div class="text-xs text-gray-500 mt-1">${caption}</div>` : ''}</div>`;
        }
      });
      
      try {
        const parsed = parser.parse(data);
        const htmlFromLib = Array.isArray(parsed) ? parsed.join('') : parsed;
        if (htmlFromLib && htmlFromLib.trim()) {
          return htmlFromLib;
        }
      } catch (parserError) {
        console.error('Parser error:', parserError);
      }
      
      // Fallback to custom parser
      return parseEditorJsData(data);
    }
    
    // If it's an object but not Editor.js format
    if (typeof data === 'object') {
      return `<p>Định dạng mô tả không hợp lệ</p>`;
    }
    
    // If it's still a string after parsing
    return `<p>${data}</p>`;
    
  } catch (e) {
    console.error('Error parsing description:', e, 'Raw data:', raw);
    // Last resort fallback
    return `<p>Không thể hiển thị mô tả</p>`;
  }
});

watch(descriptionHtml, async (html) => {
  if (html) {
    await nextTick();
    if (descriptionContainer.value && descriptionContainer.value.scrollHeight > 240) { // 240px is max-h-60
      isDescriptionLong.value = true;
    } else {
      isDescriptionLong.value = false;
    }
  }
});

const fetchRelatedProducts = async () => {
  if (!product.value.categoryId) return
  try {
    const params = {
      limit: 5,
      categoryId: product.value.categoryId,
      exclude: product.value.id
    }
    const res = await productService.getProducts(params)
    relatedProducts.value = res.data?.data || []
  } catch (error) {
    console.error('Error fetching related products:', error)
    relatedProducts.value = []
  }
}

const fetchProduct = async () => {
  try {
    loading.value = true
    const res = await productService.getProductById(route.params.id)
    const data = res.data?.data

    if (data) {
      // Store description as-is from backend
      product.value = {
        ...data,
        colors: data.colors || [],
        storages: data.storages || [],
        images: Array.isArray(data.images) ? data.images : (data.thumbnail ? [data.thumbnail] : []),
        specs: data.specs || data.specifications || {},
        description: data.description || '' // Keep original format
      }

      // Normalize thumbnail
      if (product.value.thumbnail) {
        product.value.thumbnail = normalizeImageUrl(product.value.thumbnail);
      }

      // Normalize all images
      if (product.value.images && product.value.images.length > 0) {
        product.value.images = product.value.images.map(img => normalizeImageUrl(img));
      } else if (product.value.thumbnail) {
        product.value.images = [product.value.thumbnail];
      }

      // Set selected image
      selectedImage.value = product.value.images[0] || '';
      
      // Set default selections
      selectedColor.value = product.value.colors[0]?.name || '';
      selectedStorage.value = product.value.storages[0] || '';
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    alert('Không thể tải thông tin sản phẩm');
  } finally {
    loading.value = false;
    fetchRelatedProducts();
  }
}

const fetchReviews = async () => {
  try {
    loadingReviews.value = true
    const res = await reviewService.getProductReviews(route.params.id)
    reviews.value = res.data?.data || []
  } catch (e) {
    reviews.value = []
  } finally {
    loadingReviews.value = false
  }
}

const submitReview = async () => {
  try {
    submittingReview.value = true
    await reviewService.createReview(route.params.id, newReview.value)
    newReview.value = { rating: 5, comment: '' }
    await fetchReviews()
    product.value.reviewCount = reviews.value.length
  } catch (e) {
    alert('Gửi đánh giá thất bại')
  } finally {
    submittingReview.value = false
  }
}



const handleAddToWishlist = async () => {
  try {
    await wishlistStore.add({ 
      id: product.value.id, 
      name: product.value.name, 
      price: product.value.price, 
      thumbnail: product.value.thumbnail || product.value.images?.[0] 
    })
    alert('Đã thêm vào danh sách yêu thích')
  } catch (e) {
    console.error('Add to wishlist error:', e)
    alert('Không thể thêm vào yêu thích')
  }
}

const handleMouseMove = (e) => {
  if (!mainImageEl.value || !lensEl.value || !zoomResultEl.value) return

  const img = mainImageEl.value
  const lens = lensEl.value
  const result = zoomResultEl.value

  const { left: imgX, top: imgY, width: imgWidth, height: imgHeight } = img.getBoundingClientRect()
  const lensSize = 100 // Size of the lens
  lens.style.width = `${lensSize}px`
  lens.style.height = `${lensSize}px`

  const ratioX = result.offsetWidth / lens.offsetWidth
  const ratioY = result.offsetHeight / lens.offsetHeight

  result.style.backgroundImage = `url(${normalizeImageUrl(selectedImage.value)})`
  result.style.backgroundSize = `${imgWidth * ratioX}px ${imgHeight * ratioY}px`

  let x = e.clientX - imgX
  let y = e.clientY - imgY

  // Prevent lens from going out of bounds
  if (x > imgWidth - lensSize / 2) x = imgWidth - lensSize / 2
  if (x < lensSize / 2) x = lensSize / 2
  if (y > imgHeight - lensSize / 2) y = imgHeight - lensSize / 2
  if (y < lensSize / 2) y = lensSize / 2

  lens.style.left = `${x - lensSize / 2}px`
  lens.style.top = `${y - lensSize / 2}px`

  result.style.backgroundPosition = `-${(x - lensSize / 2) * ratioX}px -${(y - lensSize / 2) * ratioY}px`
}

watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchProduct()
    fetchReviews()
  }
})

onMounted(async () => {
  await loadSettings()
  fetchProduct()
  fetchReviews()
})
</script>

