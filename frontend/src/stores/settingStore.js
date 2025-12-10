import { defineStore } from 'pinia'
import { ref } from 'vue'
import settingService from '@/services/settingService'

function normalizeSettings(raw) {
  // Accept { key: value } or [{ key, value }] or [{ name, value }]
  if (!raw) return {}
  if (Array.isArray(raw)) {
    const out = {}
    for (const item of raw) {
      const k = item?.key || item?.name
      const v = item?.value ?? item?.val ?? item?.content
      if (k != null) out[k] = v
    }
    return out
  }
  // Assume object
  return { ...raw }
}

export const useSettingStore = defineStore('settings', () => {
  const data = ref({})
  const loading = ref(false)
  const loaded = ref(false)
  const lastFetchTime = ref(0)
  const CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache

  const get = (key, fallback = '') => {
    const val = data.value?.[key]
    return val == null || val === '' ? fallback : val
  }

  const fetch = async (opts = {}) => {
    const force = !!opts.force
    const now = Date.now()
    
    // Return cached data if still valid
    if (!force && loaded.value && (now - lastFetchTime.value) < CACHE_TTL) {
      return
    }
    
    if (loading.value) return // Prevent duplicate requests
    
    try {
      loading.value = true
      const raw = await settingService.getPublicSettings()
      data.value = normalizeSettings(raw)
      loaded.value = true
      lastFetchTime.value = Date.now()
    } catch (e) {
      // giữ nguyên defaults, cho phép gọi lại sau
      loaded.value = false
    } finally {
      loading.value = false
    }
  }

  return { data, loading, loaded, fetch, get }
})

