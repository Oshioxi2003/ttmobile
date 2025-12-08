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
              <img v-if="form.site_logo" :src="form.site_logo" class="w-16 h-16 object-cover rounded bg-gray-100" alt="logo" />
              <input type="file" accept="image/*" class="input" @change="onLogoSelected">
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
import { reactive, ref, onMounted } from 'vue'
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
  const fd = new FormData()
  fd.append('image', file)
  const res = await api.post('/upload/single', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  return res.data?.data?.url
}

const onLogoSelected = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    const url = await uploadLogo(file)
    if (url) form.site_logo = url
  } catch (err) {
    alert('Tải logo thất bại')
  }
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

