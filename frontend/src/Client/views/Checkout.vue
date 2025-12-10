<template>
  <div class="bg-background min-h-screen">
    <div class="container-custom py-8">
      <!-- Cart Title -->
      <h1 class="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>

      <!-- Empty Cart -->
      <div v-if="cartItems.length === 0" class="bg-white p-12 text-center">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <p class="text-xl text-text-muted mb-4">Giỏ hàng của bạn đang trống</p>
        <router-link to="/products" class="btn btn-primary inline-block">Tiếp tục mua sắm</router-link>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items List -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartItems" :key="item.id || item.product_id" class="bg-white p-4 flex gap-4">
            <!-- Product Image -->
            <router-link :to="`/products/${item.id || item.product_id}`">
              <img 
                :src="getProductImage(item)" 
                :alt="item.name"
                @error="handleImageError"
                class="w-24 h-24 object-contain border hover:opacity-80 transition-opacity"
              >
            </router-link>
            
            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="font-semibold text-lg mb-1">{{ item.name }}</h3>
              <p class="text-primary font-bold text-xl mb-2">{{ formatVND(item.price || item.current_price) }}</p>
              
              <!-- Quantity Controls -->
              <div class="flex items-center gap-3">
                <div class="flex items-center border border-gray-300">
                  <button 
                    @click="decreaseQuantity(item)" 
                    class="px-3 py-1 hover:bg-gray-100"
                    :disabled="loading"
                  >-</button>
                  <input 
                    type="number" 
                    :value="item.quantity" 
                    @change="updateItemQuantity(item, $event.target.value)"
                    class="w-16 text-center border-x border-gray-300 py-1"
                    min="1"
                    :disabled="loading"
                  >
                  <button 
                    @click="increaseQuantity(item)" 
                    class="px-3 py-1 hover:bg-gray-100"
                    :disabled="loading"
                  >+</button>
                </div>
                
                <button 
                  @click="removeItem(item)" 
                  class="text-red-600 hover:text-red-700 text-sm font-medium"
                  :disabled="loading"
                >
                  Xóa
                </button>
              </div>
            </div>
            
            <!-- Item Total -->
            <div class="text-right">
              <p class="font-bold text-lg">{{ formatVND((item.price || item.current_price) * item.quantity) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white p-6 h-fit space-y-4">
          <h2 class="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
          
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span>Tạm tính ({{ itemCount }} sản phẩm)</span>
              <span>{{ formatVND(subtotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span>Phí vận chuyển</span>
              <span class="text-gray-500">Liên hệ</span>
            </div>
          </div>

          <div class="border-t border-border pt-4">
            <div class="flex items-center justify-between text-lg font-bold">
              <span>Tổng tạm tính</span>
              <span class="text-primary">{{ formatVND(subtotal) }}</span>
            </div>
          </div>

          <button 
            @click="showContactModal = true" 
            class="btn btn-primary w-full py-4 text-lg"
            :disabled="loading"
          >
            Thanh toán
          </button>

          <router-link to="/products" class="btn bg-gray-200 hover:bg-gray-300 text-gray-800 w-full py-3 text-center block">
            Tiếp tục mua sắm
          </router-link>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <div v-if="showContactModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="closeModal">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-[#08A7B9] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-[#08A7B9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-2 text-gray-900">Liên hệ để đặt hàng</h3>
          <p class="text-gray-600 mb-6">Vui lòng liên hệ với chúng tôi qua các kênh sau để hoàn tất đơn hàng:</p>
          
          <div class="space-y-3 mb-6">
            <a :href="`tel:${contactPhone}`" class="flex items-center justify-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#08A7B9] hover:bg-[#08A7B9] hover:bg-opacity-5 transition-all group">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-[#08A7B9] group-hover:bg-opacity-20">
                <svg class="w-6 h-6 text-green-600 group-hover:text-[#08A7B9]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-xs text-gray-500 font-medium">Hotline</div>
                <div class="font-bold text-gray-900">{{ contactPhone }}</div>
              </div>
            </a>

            <a :href="zaloUrl" target="_blank" class="flex items-center justify-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#08A7B9] hover:bg-[#08A7B9] hover:bg-opacity-5 transition-all group">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-[#08A7B9] group-hover:bg-opacity-20">
                <svg class="w-6 h-6 text-blue-600 group-hover:text-[#08A7B9]" fill="currentColor" viewBox="0 0 48 48">
                  <path fill="currentColor" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path>
                  <path fill="#FFF" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-xs text-gray-500 font-medium">Chat Zalo</div>
                <div class="font-bold text-gray-900">{{ zaloPhone }}</div>
              </div>
            </a>

            <a :href="facebookUrl" target="_blank" class="flex items-center justify-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#08A7B9] hover:bg-[#08A7B9] hover:bg-opacity-5 transition-all group">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-[#08A7B9] group-hover:bg-opacity-20">
                <svg class="w-6 h-6 text-blue-700 group-hover:text-[#08A7B9]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div class="text-left">
                <div class="text-xs text-gray-500 font-medium">Nhắn tin Facebook</div>
                <div class="font-bold text-gray-900">{{ facebookName }}</div>
              </div>
            </a>
          </div>

          <button @click="closeModal" class="btn bg-gray-200 hover:bg-gray-300 text-gray-800 w-full py-3">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useSiteSettings } from '@/composables/useSiteSettings'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'

const cartStore = useCartStore()
const { siteSettings, loadSettings } = useSiteSettings()

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.total)
const itemCount = computed(() => cartStore.itemCount)
const loading = computed(() => cartStore.loading)

const showContactModal = ref(false)

// Computed để lấy thông tin liên hệ từ settings
const contactPhone = computed(() => siteSettings.value?.contact_phone || '0379640501')
const zaloPhone = computed(() => siteSettings.value?.zalo_phone || siteSettings.value?.contact_phone || '0379640501')
const zaloUrl = computed(() => {
  const url = siteSettings.value?.zalo_url
  if (url && typeof url === 'string') return url
  const phone = zaloPhone.value
  if (!phone) return 'https://zalo.me/0379640501'
  const digits = String(phone).replace(/[^0-9]/g, '')
  return digits ? `https://zalo.me/${digits}` : 'https://zalo.me/0379640501'
})
const facebookUrl = computed(() => siteSettings.value?.facebook_url || 'https://www.facebook.com/profile.php?id=61569896720638')
const facebookName = computed(() => siteSettings.value?.facebook_name || 'T&T Mobile')

// Lấy URL ảnh từ nhiều trường có thể có (giống Home.vue)
const getProductImage = (item) => {
  // Debug: Log item để xem cấu trúc
  console.log('Cart item:', item)
  
  // Ưu tiên giống Home.vue: thumbnail || image
  const imagePath = item.thumbnail || item.image || item.thumbnail_image || item.main_image
  
  if (!imagePath) {
    console.warn('No image found for item:', item)
    return 'https://placehold.co/150x150/e0e0e0/666666?text=No+Image'
  }
  
  return asset(imagePath)
}

// Xử lý lỗi ảnh
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/150x150/e0e0e0/666666?text=No+Image'
}

const closeModal = () => {
  showContactModal.value = false
}

const increaseQuantity = async (item) => {
  const productId = item.id || item.product_id
  await cartStore.updateQuantity(productId, item.quantity + 1)
}

const decreaseQuantity = async (item) => {
  const productId = item.id || item.product_id
  if (item.quantity > 1) {
    await cartStore.updateQuantity(productId, item.quantity - 1)
  }
}

const updateItemQuantity = async (item, newQuantity) => {
  const productId = item.id || item.product_id
  const qty = parseInt(newQuantity)
  if (qty >= 1) {
    await cartStore.updateQuantity(productId, qty)
  }
}

const removeItem = async (item) => {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    const productId = item.id || item.product_id
    await cartStore.removeFromCart(productId)
  }
}

onMounted(async () => {
  await loadSettings()
})
</script>

