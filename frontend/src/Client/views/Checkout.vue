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
                <label class="block text-sm font-medium mb-2">Phương thức thanh toán</label>
                <select v-model="form.paymentMethod" class="input w-full">
                  <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                  <option value="bank">Chuyển khoản ngân hàng</option>
                  <option value="card">Thẻ tín dụng/ghi nợ</option>
                </select>
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
const form = ref({
  fullName: '',
  phone: '',
  address: '',
  city: '',
  paymentMethod: 'cod',
  note: ''
})

const handleCheckout = async () => {
  if (cartItems.value.length === 0) return

  try {
    submitting.value = true

    // Prepare order data
    const orderData = {
      customerName: form.value.fullName,
      customerPhone: form.value.phone,
      customerAddress: form.value.address,
      customerCity: form.value.city,
      paymentMethod: form.value.paymentMethod,
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
    const response = await orderService.createOrder(orderData)

    if (response.data?.data?.id) {
      // Clear cart after successful order
      cartStore.clearCart()

      // Redirect to order confirmation page
      router.push({
        path: '/order-confirmation',
        query: { orderId: response.data.data.id }
      })
    }
  } catch (e) {
    console.error('Order creation error:', e)
    alert('Tạo đơn hàng thất bại: ' + (e.response?.data?.message || e.message))
  } finally {
    submitting.value = false
  }
}
</script>

