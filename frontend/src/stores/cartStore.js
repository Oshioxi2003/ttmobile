import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || '/api/v1'
const CART_STORAGE_KEY = 'guest_cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)
  let fetchTimeout = null
  const lastFetchTime = ref(0)
  const FETCH_DEBOUNCE = 1000 // 1 second debounce

  // Load giỏ hàng từ localStorage khi khởi tạo
  const loadLocalCart = () => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        items.value = JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e)
    }
  }

  // Lưu giỏ hàng vào localStorage
  const saveLocalCart = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e)
    }
  }

  // Tự động lưu khi items thay đổi
  watch(items, () => {
    if (!localStorage.getItem('token')) {
      saveLocalCart()
    }
  }, { deep: true })

  // Hiển thị thông báo
  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-0 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      type === 'warning' ? 'bg-yellow-500' : 
      'bg-blue-500'
    }`
    notification.style.minWidth = '300px'
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-medium">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)'
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  // Lấy giỏ hàng từ server (cho user đã đăng nhập)
  const fetchCart = async () => {
    try {
      loading.value = true
      const token = localStorage.getItem('token')
      
      if (!token) {
        loadLocalCart()
        return
      }

      const response = await axios.get(`${apiUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        items.value = response.data.data.items || []
      }
    } catch (error) {
      console.error('Fetch cart error:', error)
      if (error.response?.status === 401) {
        loadLocalCart()
      }
    } finally {
      loading.value = false
    }
  }

  // Đồng bộ giỏ hàng local lên server khi đăng nhập
  const syncCartToServer = async () => {
    const token = localStorage.getItem('token')
    if (!token || items.value.length === 0) return

    try {
      loading.value = true
      // Gửi từng item lên server
      for (const item of items.value) {
        await axios.post(
          `${apiUrl}/cart`,
          {
            product_id: item.id || item.product_id,
            quantity: item.quantity
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
      }
      // Xóa giỏ hàng local sau khi sync
      localStorage.removeItem(CART_STORAGE_KEY)
      // Load lại giỏ hàng từ server
      await fetchCart()
    } catch (error) {
      console.error('Sync cart error:', error)
    } finally {
      loading.value = false
    }
  }

  // Thêm sản phẩm vào giỏ (cả guest và user)
  const addToCart = async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem('token')
      
      // Nếu không đăng nhập - lưu local
      if (!token) {
        const existingItem = items.value.find(item => 
          (item.id === product.id || item.product_id === product.id)
        )
        
        if (existingItem) {
          existingItem.quantity += quantity
        } else {
          items.value.push({
            id: product.id,
            product_id: product.id,
            name: product.name,
            price: product.sale_price || product.price,
            current_price: product.sale_price || product.price,
            thumbnail: product.thumbnail || product.image || product.thumbnail_image,
            image: product.image || product.thumbnail || product.thumbnail_image,
            quantity: quantity,
            stock: product.stock
          })
        }
        
        showNotification('✓ Đã thêm sản phẩm vào giỏ hàng', 'success')
        return true
      }

      // Nếu đã đăng nhập - gọi API
      loading.value = true
      
      const response = await axios.post(
        `${apiUrl}/cart`,
        {
          product_id: product.id,
          quantity: quantity
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data.success) {
        items.value = response.data.data.items || []
        showNotification('✓ Đã thêm sản phẩm vào giỏ hàng', 'success')
        return true
      }
    } catch (error) {
      console.error('Add to cart error:', error)
      const message = error.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ'
      showNotification(message, 'error')
      return false
    } finally {
      loading.value = false
    }
  }

  // Cập nhật số lượng
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        showNotification('Số lượng phải lớn hơn 0', 'warning')
        return false
      }

      const token = localStorage.getItem('token')
      
      // Nếu không đăng nhập - cập nhật local
      if (!token) {
        const item = items.value.find(item => 
          item.id === productId || item.product_id === productId
        )
        if (item) {
          item.quantity = quantity
          showNotification('✓ Đã cập nhật số lượng', 'success')
          return true
        }
        return false
      }

      // Nếu đã đăng nhập - gọi API
      loading.value = true
      
      const response = await axios.put(
        `${apiUrl}/cart/${productId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data.success) {
        items.value = response.data.data.items || []
        showNotification('✓ Đã cập nhật số lượng', 'success')
        return true
      }
    } catch (error) {
      console.error('Update quantity error:', error)
      const message = error.response?.data?.message || 'Không thể cập nhật số lượng'
      showNotification(message, 'error')
      return false
    } finally {
      loading.value = false
    }
  }

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token')
      
      // Nếu không đăng nhập - xóa local
      if (!token) {
        items.value = items.value.filter(item => 
          item.id !== productId && item.product_id !== productId
        )
        showNotification('✓ Đã xóa sản phẩm khỏi giỏ hàng', 'success')
        return true
      }

      // Nếu đã đăng nhập - gọi API
      loading.value = true
      
      const response = await axios.delete(
        `${apiUrl}/cart/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data.success) {
        items.value = response.data.data.items || []
        showNotification('✓ Đã xóa sản phẩm khỏi giỏ hàng', 'success')
        return true
      }
    } catch (error) {
      console.error('Remove from cart error:', error)
      const message = error.response?.data?.message || 'Không thể xóa sản phẩm'
      showNotification(message, 'error')
      return false
    } finally {
      loading.value = false
    }
  }

  // Xóa tất cả sản phẩm
  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Nếu không đăng nhập - xóa local
      if (!token) {
        items.value = []
        localStorage.removeItem(CART_STORAGE_KEY)
        showNotification('✓ Đã xóa toàn bộ giỏ hàng', 'success')
        return true
      }

      // Nếu đã đăng nhập - gọi API
      loading.value = true
      
      const response = await axios.delete(
        `${apiUrl}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data.success) {
        items.value = []
        showNotification('✓ Đã xóa toàn bộ giỏ hàng', 'success')
        return true
      }
    } catch (error) {
      console.error('Clear cart error:', error)
      items.value = []
      return false
    } finally {
      loading.value = false
    }
  }

  // Tính tổng giá
  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      const price = item.price || item.sale_price || item.current_price || 0
      return sum + (price * item.quantity)
    }, 0)
  })

  // Tính số lượng sản phẩm
  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // Load giỏ hàng khi khởi tạo
  loadLocalCart()

  return {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCart,
    syncCartToServer,
    total,
    itemCount,
    showNotification
  }
})
    

