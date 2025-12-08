<template>
  <div class="bg-background min-h-screen">
    <div class="container-custom py-8">
      <div class="bg-white p-6">
        <h1 class="text-2xl font-bold mb-6">Tài khoản của tôi</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sidebar -->
          <aside class="border border-border p-4 h-fit">
            <ul class="space-y-2">
              <li><button :class="tabBtn('info')" @click="activeTab='info'">Thông tin cá nhân</button></li>
              <li><button :class="tabBtn('password')" @click="activeTab='password'">Đổi mật khẩu</button></li>
              <li><button :class="tabBtn('addresses')" @click="activeTab='addresses'">Địa chỉ giao hàng</button></li>
              <li><router-link class="text-secondary" to="/orders">Đơn hàng của tôi →</router-link></li>
            </ul>
          </aside>

          <!-- Content -->
          <section class="lg:col-span-2">
            <!-- Info -->
            <div v-if="activeTab==='info'" class="border border-border p-6">
              <h2 class="font-semibold mb-4">Thông tin cá nhân</h2>
              <form @submit.prevent="updateProfile" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm">Họ và tên</label>
                    <input v-model="profile.name" class="input w-full" required />
                  </div>
                  <div>
                    <label class="text-sm">Email</label>
                    <input v-model="profile.email" class="input w-full" type="email" required />
                  </div>
                </div>
                <div>
                  <label class="text-sm">Số điện thoại</label>
                  <input v-model="profile.phone" class="input w-full" />
                </div>
                <button class="btn btn-primary" :disabled="saving">Lưu thay đổi</button>
              </form>
            </div>

            <!-- Password -->
            <div v-else-if="activeTab==='password'" class="border border-border p-6">
              <h2 class="font-semibold mb-4">Đổi mật khẩu</h2>
              <form @submit.prevent="changePassword" class="space-y-4">
                <div>
                  <label class="text-sm">Mật khẩu hiện tại</label>
                  <input v-model="password.oldPassword" type="password" class="input w-full" required />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm">Mật khẩu mới</label>
                    <input v-model="password.newPassword" type="password" class="input w-full" required />
                  </div>
                  <div>
                    <label class="text-sm">Xác nhận mật khẩu mới</label>
                    <input v-model="password.confirm" type="password" class="input w-full" required />
                  </div>
                </div>
                <button class="btn btn-primary" :disabled="saving">Cập nhật mật khẩu</button>
              </form>
            </div>

            <!-- Addresses -->
            <div v-else class="border border-border p-6">
              <h2 class="font-semibold mb-4">Địa chỉ giao hàng</h2>
              <div class="space-y-4">
                <div v-for="addr in addresses" :key="addr.id" class="border border-border p-4 flex items-start justify-between">
                  <div>
                    <div class="font-medium">{{ addr.fullName }} • {{ addr.phone }}</div>
                    <div class="text-sm text-text-muted">{{ addr.address }}, {{ addr.city }}</div>
                  </div>
                  <button class="text-red-600" @click="removeAddress(addr.id)">Xóa</button>
                </div>

                <form @submit.prevent="addAddress" class="space-y-3 border-t border-border pt-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input v-model="newAddr.fullName" placeholder="Họ và tên" class="input w-full" required />
                    <input v-model="newAddr.phone" placeholder="Số điện thoại" class="input w-full" required />
                  </div>
                  <input v-model="newAddr.address" placeholder="Địa chỉ" class="input w-full" required />
                  <input v-model="newAddr.city" placeholder="Thành phố" class="input w-full" required />
                  <button class="btn btn-primary" :disabled="saving">Thêm địa chỉ</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import userService from '@/services/userService'

const auth = useAuthStore()
const activeTab = ref('info')

const saving = ref(false)
const profile = ref({ name: '', email: '', phone: '' })
const addresses = ref([])
const newAddr = ref({ fullName: '', phone: '', address: '', city: '' })
const password = ref({ oldPassword: '', newPassword: '', confirm: '' })

const tabBtn = (tab) => computed(() => (
  'w-full text-left px-3 py-2 ' + (activeTab.value===tab ? 'bg-primary text-white' : 'hover:bg-background')
)).value

const load = async () => {
  try {
    const me = await userService.getProfile()
    const data = me.data?.data || {}
    profile.value = { name: data.name || '', email: data.email || '', phone: data.phone || '' }
    const resAddr = await userService.getAddresses().catch(()=>({data:{data:[]}}))
    addresses.value = resAddr.data?.data || []
  } catch (e) {}
}

const updateProfile = async () => {
  try {
    saving.value = true
    await userService.updateProfile(profile.value)
    alert('Cập nhật thành công')
  } catch (e) {
    alert('Cập nhật thất bại')
  } finally {
    saving.value = false
  }
}

const changePassword = async () => {
  if (password.value.newPassword !== password.value.confirm) {
    return alert('Mật khẩu xác nhận không khớp')
  }
  try {
    saving.value = true
    await userService.updatePassword({ oldPassword: password.value.oldPassword, newPassword: password.value.newPassword })
    password.value = { oldPassword: '', newPassword: '', confirm: '' }
    alert('Đã đổi mật khẩu')
  } catch (e) {
    alert('Đổi mật khẩu thất bại')
  } finally {
    saving.value = false
  }
}

const addAddress = async () => {
  try {
    saving.value = true
    const res = await userService.addAddress(newAddr.value)
    addresses.value.unshift(res.data?.data || newAddr.value)
    newAddr.value = { fullName: '', phone: '', address: '', city: '' }
  } catch (e) {
    alert('Thêm địa chỉ thất bại')
  } finally {
    saving.value = false
  }
}

const removeAddress = async (id) => {
  if (!confirm('Xóa địa chỉ này?')) return
  try {
    await userService.deleteAddress(id)
    addresses.value = addresses.value.filter(a => a.id !== id)
  } catch (e) {
    alert('Xóa địa chỉ thất bại')
  }
}

onMounted(() => {
  auth.loadUserFromStorage?.()
  load()
})
</script>

