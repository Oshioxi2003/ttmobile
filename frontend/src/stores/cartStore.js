import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  // Thêm sản phẩm vào giỏ
  const addToCart = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        ...product,
        quantity
      })
    }
  }

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  // Cập nhật số lượng
  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  // Xóa tất cả sản phẩm
  const clearCart = () => {
    items.value = []
  }

  // Tính tổng giá
  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
  })

  // Tính số lượng sản phẩm
  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount
  }
})

