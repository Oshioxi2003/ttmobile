import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import wishlistService from '@/services/wishlistService'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const loading = ref(false)

  const count = computed(() => items.value.length)

  const fetch = async () => {
    try {
      loading.value = true
      const res = await wishlistService.getMyWishlist()
      items.value = res.data?.data || []
    } catch (e) {
      items.value = []
    } finally {
      loading.value = false
    }
  }

  const add = async (product) => {
    await wishlistService.addToWishlist(product.id)
    if (!items.value.find(p => p.id === product.id)) items.value.unshift(product)
  }

  const remove = async (productId) => {
    await wishlistService.removeFromWishlist(productId)
    items.value = items.value.filter(p => p.id !== productId)
  }

  const exists = (productId) => items.value.some(p => p.id === productId)

  return { items, loading, count, fetch, add, remove, exists }
})

