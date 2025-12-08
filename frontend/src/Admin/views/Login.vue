<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white">Admin Panel</h1>
        <p class="mt-2 text-gray-400">T&T MOBILE</p>
      </div>

      <div class="card p-6">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="input"
              placeholder="admin@example.com"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Mật khẩu</label>
            <input
              v-model="form.password"
              type="password"
              class="input"
              placeholder="••••••••"
              required
            >
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            <span v-if="loading">Đang đăng nhập…</span>
            <span v-else>Đăng nhập</span>
          </button>

          <p class="text-xs text-gray-500 text-center">API: {{ apiBase }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')
const apiBase = computed(() => import.meta.env.VITE_API_URL || '/api/v1')

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true
  const result = await authStore.login(form)
  loading.value = false

  if (result.success) {
    if (authStore.isAdmin) {
      router.push('/')
    } else {
      errorMessage.value = 'Bạn không có quyền truy cập trang Admin'
      authStore.logout()
    }
  } else {
    errorMessage.value = result.message || 'Đăng nhập thất bại'
  }
}
</script>

