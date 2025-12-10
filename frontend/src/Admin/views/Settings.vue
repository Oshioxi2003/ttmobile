<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Cài đặt</h1>

    <div class="grid grid-cols-1 gap-6">
      <!-- General & Contact Settings -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold mb-4">Cài đặt chung</h2>
        <form class="space-y-4" @submit.prevent="saveSettings">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Tên website</label>
              <input v-model="form.site_name" type="text" class="input" placeholder="T&T Mobile">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Mô tả website</label>
              <input v-model="form.site_description" type="text" class="input" placeholder="Mô tả ngắn">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Logo</label>
            <div class="flex items-center gap-4">
              <div v-if="form.site_logo" class="relative w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                <img :src="logoPreviewUrl" class="w-full h-full object-contain" alt="logo" @error="handleImageError" />
              </div>
              <div v-else class="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <input type="file" accept="image/*" class="input" @change="onLogoSelected">
                <p class="text-xs text-gray-500 mt-1">Kích thước khuyến nghị: 200x60px, định dạng PNG/SVG</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Email liên hệ</label>
              <input v-model="form.contact_email" type="email" class="input" placeholder="info@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Số điện thoại</label>
              <input v-model="form.contact_phone" type="tel" class="input" placeholder="0123-456-789">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Địa chỉ</label>
            <textarea v-model="form.contact_address" class="input h-20" placeholder="Địa chỉ cửa hàng"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Giờ làm việc</label>
              <input v-model="form.working_hours" type="text" class="input" placeholder="8:00 - 22:00 (Thứ 2 - CN)">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Thông điệp mua hàng</label>
              <input v-model="form.purchase_message" type="text" class="input" placeholder="Liên hệ Facebook/Zalo để mua hàng">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Facebook URL</label>
              <input v-model="form.facebook_url" type="url" class="input" placeholder="https://facebook.com/...">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Tên Facebook</label>
              <input v-model="form.facebook_name" type="text" class="input" placeholder="Tên trang">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Zalo Phone</label>
              <input v-model="form.zalo_phone" type="text" class="input" placeholder="0123456789">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Zalo URL</label>
              <input v-model="form.zalo_url" type="url" class="input" placeholder="https://zalo.me/...">
            </div>
          </div>

          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn btn-primary" :disabled="saving">
              <span v-if="saving">Đang lưu…</span>
              <span v-else>Lưu thay đổi</span>
            </button>
            <button type="button" class="btn btn-secondary" @click="loadSettings">Tải lại</button>
          </div>
        </form>
      </div>

      <!-- Account Settings (TODO: backend change password endpoint) -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold mb-4">Tài khoản (sắp ra mắt)</h2>
        <p class="text-sm text-gray-500">Chức năng đổi mật khẩu sẽ được tích hợp khi có API.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const saving = ref(false)
const form = reactive({
  site_name: '',
  site_description: '',
  site_logo: '',
  contact_email: '',
  contact_phone: '',
  contact_address: '',
  working_hours: '',
  purchase_message: '',
  facebook_url: '',
  facebook_name: '',
  zalo_phone: '',
  zalo_url: ''
})

// Helper to resolve asset URL
const resolveAssetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const baseUrl = import.meta.env.VITE_ASSET_BASE || window.location.origin
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`
}

const logoPreviewUrl = computed(() => resolveAssetUrl(form.site_logo))

const loadSettings = async () => {
  try {
    // Load grouped settings
    const [site, contact, social] = await Promise.all([
      api.get('/settings', { params: { group: 'site' } }),
      api.get('/settings', { params: { group: 'contact' } }),
      api.get('/settings', { params: { group: 'social' } })
    ])
    Object.assign(form, site.data.data)
    Object.assign(form, contact.data.data)
    Object.assign(form, social.data.data)
    // Purchase message is in 'purchase' group
    try {
      const purchase = await api.get('/settings', { params: { group: 'purchase' } })
      Object.assign(form, purchase.data.data)
    } catch (_) {}
  } catch (e) {
    console.error('Load settings failed', e)
  }
}

const uploadLogo = async (file) => {
  try {
    const fd = new FormData()
    fd.append('image', file)
    const res = await api.post('/upload/single', fd, { 
      headers: { 'Content-Type': 'multipart/form-data' } 
    })
    console.log('Upload response:', res.data)
    return res.data?.data?.url || res.data?.url
  } catch (error) {
    console.error('Upload logo error:', error)
    throw error
  }
}

const onLogoSelected = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  
  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 2MB')
    e.target.value = ''
    return
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Vui lòng chọn file ảnh')
    e.target.value = ''
    return
  }
  
  try {
    const url = await uploadLogo(file)
    if (url) {
      form.site_logo = url
      console.log('Logo updated:', url)
      alert('Ảnh đã được tải lên. Nhớ bấm "Lưu thay đổi" để lưu cài đặt.')
    }
  } catch (err) {
    console.error('Logo upload failed:', err)
    alert('Tải logo thất bại: ' + (err.response?.data?.message || err.message))
  }
}

const handleImageError = (event) => {
  console.error('Failed to load logo:', form.site_logo)
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"%3E%3Crect fill="%23f3f4f6" width="200" height="60"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="12"%3ELogo Error%3C/text%3E%3C/svg%3E'
}

const saveSettings = async () => {
  try {
    saving.value = true
    // Build payload for updateMultiple
    const payload = {
      site_name: { value: form.site_name, group: 'site' },
      site_description: { value: form.site_description, group: 'site' },
      site_logo: { value: form.site_logo, group: 'site' },
      contact_email: { value: form.contact_email, group: 'contact' },
      contact_phone: { value: form.contact_phone, group: 'contact' },
      contact_address: { value: form.contact_address, group: 'contact' },
      working_hours: { value: form.working_hours, group: 'contact' },
      purchase_message: { value: form.purchase_message, group: 'purchase' },
      facebook_url: { value: form.facebook_url, group: 'social' },
      facebook_name: { value: form.facebook_name, group: 'social' },
      zalo_phone: { value: form.zalo_phone, group: 'social' },
      zalo_url: { value: form.zalo_url, group: 'social' }
    }
    await api.put('/settings', payload)
    alert('Lưu thành công')
  } catch (e) {
    alert('Lưu thất bại')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadSettings()
})
</script>

