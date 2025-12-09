<template>
  <div class="bg-background min-h-screen">
    <div class="container-custom py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 bg-white p-6">
          <h1 class="text-2xl font-bold mb-4">Thanh toán</h1>

          <form @submit.prevent="handleCheckout" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Họ và tên</label>
                <input v-model="form.fullName" type="text" class="input w-full" required>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Số điện thoại</label>
                <input v-model="form.phone" type="tel" class="input w-full" required>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Địa chỉ</label>
              <input v-model="form.address" type="text" class="input w-full" required>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Thành phố</label>
                <input v-model="form.city" type="text" class="input w-full" required>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Email (tùy chọn)</label>
                <input v-model="form.email" type="email" class="input w-full">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Ghi chú</label>
              <textarea v-model="form.note" class="input w-full" rows="3" placeholder="Lưu ý giao hàng..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="submitting || cartItems.length === 0">
              <span v-if="submitting">Đang tạo đơn...</span>
              <span v-else>Đặt hàng</span>
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="bg-white p-6 h-fit">
          <h2 class="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
          <div v-if="cartItems.length === 0" class="text-text-muted">Giỏ hàng trống</div>
          <div v-else class="space-y-4">
            <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img :src="asset(item.thumbnail || item.image)" alt="thumb" class="w-12 h-12 object-cover border"/>
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-sm text-text-muted">x{{ item.quantity }}</p>
                </div>
              </div>
              <div class="font-semibold">{{ formatVND(item.price * item.quantity) }}</div>
            </div>

            <div class="border-t border-border pt-4 space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span>Tạm tính</span>
                <span>{{ formatVND(subtotal) }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span>Phí vận chuyển</span>
                <span>{{ formatVND(shippingFee) }}</span>
              </div>
              <div class="flex items-center justify-between text-lg font-bold">
                <span>Tổng</span>
                <span>{{ formatVND(total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <div v-if="showContactModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="closeModal">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Đơn hàng đã được ghi nhận!</h3>
          <p class="text-gray-600 mb-6">Cảm ơn bạn đã đặt hàng. Để được hỗ trợ nhanh nhất, vui lòng liên hệ:</p>
          
          <div class="space-y-3 mb-6">
            <a href="tel:0379640501" class="flex items-center justify-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              <div class="text-left">
                <div class="text-xs text-gray-500">Điện thoại</div>
                <div class="font-semibold">0379640501</div>
              </div>
            </a>

            <a href="https://zalo.me/0379640501" target="_blank" class="flex items-center justify-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.145 2 11.25c0 2.858 1.355 5.416 3.486 7.152L4.5 22l3.892-1.787C9.562 20.73 10.754 21 12 21c5.523 0 10-4.145 10-9.25S17.523 2 12 2z"/>
              </svg>
              <div class="text-left">
                <div class="text-xs text-gray-500">Zalo</div>
                <div class="font-semibold">0379640501</div>
              </div>
            </a>

            <a href="https://www.facebook.com/profile.php?id=61569896720638" target="_blank" class="flex items-center justify-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <div class="text-left">
                <div class="text-xs text-gray-500">Facebook</div>
                <div class="font-semibold">T&T Mobile</div>
              </div>
            </a>
          </div>

          <button @click="closeModal" class="btn btn-primary w-full">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'
import orderService from '@/services/orderService'

const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.total)
const shippingFee = computed(() => (cartItems.value.length > 0 ? 500 : 0))
const total = computed(() => subtotal.value + shippingFee.value)

const submitting = ref(false)
const showContactModal = ref(false)
const form = ref({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  note: ''
})

const closeModal = () => {
  showContactModal.value = false
  // Clear cart and redirect to home
  cartStore.clearCart()
  router.push('/')
}

const handleCheckout = async () => {
  if (cartItems.value.length === 0) return

  try {
    submitting.value = true

    // Prepare order data
    const orderData = {
      customerName: form.value.fullName,
      customerPhone: form.value.phone,
      customerEmail: form.value.email,
      customerAddress: form.value.address,
      customerCity: form.value.city,
      paymentMethod: 'pending', // Chờ xác nhận qua liên hệ
      note: form.value.note,
      items: cartItems.value.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: subtotal.value,
      shippingFee: shippingFee.value,
      total: total.value
    }

    // Create order via API
    await orderService.createOrder(orderData)

    // Show contact modal
    showContactModal.value = true
  } catch (e) {
    console.error('Order creation error:', e)
    alert('Ghi nhận đơn hàng thất bại: ' + (e.response?.data?.message || e.message))
  } finally {
    submitting.value = false
  }
}
</script>

