<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Back to Home Button -->
      <div class="mb-6">
        <router-link to="/" class="inline-flex items-center text-gray-600 hover:text-[#08A7B9] transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Về trang chủ
        </router-link>
      </div>
      
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <span class="text-3xl font-bold text-primary tracking-tight">T&T MOBILE</span>
        </router-link>
        <p class="mt-3 text-text-muted">Đăng nhập vào tài khoản của bạn</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white p-8 shadow-card">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="input"
              placeholder="example@email.com"
              required
            >
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Mật khẩu</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="input pr-12"
                placeholder="••••••••"
                required
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" v-model="form.remember" class="mr-2 accent-primary">
              <span class="text-sm text-text">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" class="text-sm text-secondary hover:text-secondary-hover">Quên mật khẩu?</a>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
            {{ error }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full py-4"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </span>
            <span v-else>Đăng nhập</span>
          </button>
        </form>

        

        <!-- Register Link -->
        <p class="mt-8 text-center text-sm text-text-muted">
          Chưa có tài khoản?
          <router-link to="/register" class="text-secondary hover:text-secondary-hover font-semibold">Đăng ký ngay</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import api from '@/services/api'

const router = useRouter()
const cartStore = useCartStore()

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await api.post('/auth/login', {
      email: form.email,
      password: form.password
    })

    if (response.data.success) {
      const { token, user } = response.data.data
      
      // Lưu token và user info vào localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Đồng bộ giỏ hàng local lên server
      await cartStore.syncCartToServer()
      
      // Hiển thị thông báo thành công
      alert('Đăng nhập thành công!')
      
      // Redirect về trang chủ và reload để cập nhật state
      router.push('/').then(() => {
        window.location.reload()
      })
    } else {
      error.value = response.data.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Email hoặc mật khẩu không đúng'
  } finally {
    loading.value = false
  }
}
</script>

