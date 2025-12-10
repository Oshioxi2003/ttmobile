import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import wishlistService from '@/services/wishlistService'

const WISHLIST_STORAGE_KEY = 'wishlist_items'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])
  const loading = ref(false)

  const count = computed(() => items.value.length)

  // Load from localStorage on init
  const loadLocalWishlist = () => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (stored) {
        items.value = JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to load wishlist from localStorage:', e)
      items.value = []
    }
  }

  // Save to localStorage
  const saveLocalWishlist = () => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items.value))
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e)
    }
  }

  // Fetch from server (only when authenticated)
  const fetch = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      loadLocalWishlist()
      return
    }

    try {
      loading.value = true
      const res = await wishlistService.getMyWishlist()
      items.value = res.data?.data || []
      saveLocalWishlist()
    } catch (e) {
      console.error('Failed to fetch wishlist from server:', e)
      loadLocalWishlist()
    } finally {
      loading.value = false
    }
  }

  // Add to wishlist
  const add = async (product) => {
    const token = localStorage.getItem('token')
    
    // Add to local state first
    if (!items.value.find(p => p.id === product.id)) {
      items.value.unshift(product)
      saveLocalWishlist()
    }

    // Sync with server if authenticated
    if (token) {
      try {
        await wishlistService.addToWishlist(product.id)
      } catch (e) {
        console.error('Failed to sync wishlist to server:', e)
      }
    }
  }

  // Remove from wishlist
  const remove = async (productId) => {
    const token = localStorage.getItem('token')
    
    // Remove from local state first
    items.value = items.value.filter(p => p.id !== productId)
    saveLocalWishlist()

    // Sync with server if authenticated
    if (token) {
      try {
        await wishlistService.removeFromWishlist(productId)
      } catch (e) {
        console.error('Failed to sync wishlist removal to server:', e)
      }
    }
  }

  // Clear wishlist
  const clear = () => {
    items.value = []
    saveLocalWishlist()
  }

  // Check if product exists in wishlist
  const exists = (productId) => items.value.some(p => p.id === productId)

  // Sync local wishlist to server after login
  const syncToServer = async () => {
    const token = localStorage.getItem('token')
    if (!token || items.value.length === 0) return

    try {
      // Get server wishlist
      const res = await wishlistService.getMyWishlist()
      const serverItems = res.data?.data || []
      
      // Merge local items with server items (avoid duplicates)
      const localIds = items.value.map(p => p.id)
      const serverIds = serverItems.map(p => p.id)
      
      // Add local items that aren't on server
      for (const item of items.value) {
        if (!serverIds.includes(item.id)) {
          try {
            await wishlistService.addToWishlist(item.id)
          } catch (e) {
            console.error('Failed to sync item to server:', e)
          }
        }
      }
      
      // Fetch updated wishlist
      await fetch()
    } catch (e) {
      console.error('Failed to sync wishlist to server:', e)
    }
  }

  // Initialize from localStorage
  loadLocalWishlist()

  return { items, loading, count, fetch, add, remove, clear, exists, syncToServer }
})

