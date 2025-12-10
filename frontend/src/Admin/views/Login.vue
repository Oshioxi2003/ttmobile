<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-[#08A7B9]">Admin Panel</h1>
        <p class="mt-2 text-gray-300 text-lg">T&T MOBILE</p>
      </div>

      <div class="bg-white rounded-lg shadow-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-800">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08A7B9] focus:border-transparent outline-none"
              placeholder="admin@example.com"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-800">Mật khẩu</label>
            <input
              v-model="form.password"
              type="password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08A7B9] focus:border-transparent outline-none"
              placeholder="••••••••"
              required
            >
          </div>

          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {{ errorMessage }}
          </div>

          <button type="submit" class="w-full py-3 bg-[#08A7B9] hover:bg-[#07969F] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" :disabled="loading">
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang đăng nhập...
            </span>
            <span v-else>Đăng nhập</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
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

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const result = await authStore.login({
      email: form.email,
      password: form.password
    })

    if (result.success) {
      // Fetch user info to verify admin role
      await authStore.fetchUser()
      
      // Check if user is admin
      if (authStore.isAdmin) {
        // Redirect to admin dashboard
        router.push('/')
      } else {
        errorMessage.value = 'Bạn không có quyền truy cập trang Admin'
        authStore.logout()
      }
    } else {
      errorMessage.value = result.message || 'Đăng nhập thất bại'
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Email hoặc mật khẩu không đúng'
  } finally {
    loading.value = false
  }
}
</script>

