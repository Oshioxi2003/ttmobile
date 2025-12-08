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
                <img ref="mainImageEl" :src="asset(selectedImage)" :alt="product.name" class="max-w-full max-h-full object-contain">
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
                @click="selectedImage = img"
                :class="[
                  'w-20 h-20 border-2 flex-shrink-0 p-1',
                  selectedImage === img ? 'border-primary' : 'border-border hover:border-primary'
                ]"
              >
                <img :src="asset(img)" :alt="`${product.name} - ${index + 1}`" class="w-full h-full object-contain">
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
              <div class="flex">
                <span class="text-text-muted w-32">Màu sắc:</span>
                <div class="flex gap-2">
                  <button
                    v-for="color in product.colors"
                    :key="color.name"
                    @click="selectedColor = color.name"
                    :class="[
                      'px-3 py-1 border text-sm',
                      selectedColor === color.name ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary'
                    ]"
                  >
                    {{ color.name }}
                  </button>
                </div>
              </div>
              <div class="flex">
                <span class="text-text-muted w-32">Dung lượng:</span>
                <div class="flex gap-2">
                  <button
                    v-for="storage in product.storages"
                    :key="storage"
                    @click="selectedStorage = storage"
                    :class="[
                      'px-3 py-1 border text-sm',
                      selectedStorage === storage ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary'
                    ]"
                  >
                    {{ storage }}
                  </button>
                </div>
              </div>
              <div class="flex">
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
              <p class="font-semibold mb-2">Liên hệ tư vấn:</p>
              <div class="flex items-center gap-4">
                <a href="tel:080-xxxx-xxxx" class="flex items-center text-primary font-bold">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  080-xxxx-xxxx
                </a>
                <span class="text-text-muted">|</span>
                <a href="#" class="flex items-center text-secondary hover:text-secondary-hover">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
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
          <div class="space-y-3">
            <a href="https://m.me/your-facebook-page-id" target="_blank" class="btn btn-primary w-full" style="background-color: #0084FF;">
              Chat qua Messenger
            </a>
            <a href="https://zalo.me/your-zalo-number" target="_blank" class="btn btn-primary w-full" style="background-color: #0068FF;">
              Chat qua Zalo
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
import ProductCard from '@/Client/components/ProductCard.vue'
import edjsHTML from 'editorjs-html'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'

const route = useRoute()

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

const reviews = ref([])
const loadingReviews = ref(false)
const newReview = ref({ rating: 5, comment: '' })
const submittingReview = ref(false)
const relatedProducts = ref([])
const isDescriptionExpanded = ref(false)
const isDescriptionLong = ref(false)
const descriptionContainer = ref(null)

const edjsParser = edjsHTML();
const descriptionHtml = computed(() => {
  if (!product.value.description) return '';
  try {
    const data = JSON.parse(product.value.description);
    if (data && Array.isArray(data.blocks)) {
      return edjsParser.parse(data).join('');
    }
  } catch (e) {
    return `<p>${product.value.description}</p>`;
  }
  return '';
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
      product.value = {
        ...data,
        colors: data.colors || [],
        storages: data.storages || [],
        images: data.images || [data.thumbnail],
        specs: data.specs || {}
      }

      selectedImage.value = product.value.images[0] || ''
      selectedColor.value = product.value.colors[0]?.name || ''
      selectedStorage.value = product.value.storages[0] || ''
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
    fetchRelatedProducts()
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
    await wishlistStore.add({ id: product.value.id, name: product.value.name, price: product.value.price, thumbnail: product.value.thumbnail || product.value.images?.[0] })
  } catch (e) {
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

  result.style.backgroundImage = `url(${asset(selectedImage.value)})`
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

onMounted(() => {
  fetchProduct()
  fetchReviews()
})
</script>

