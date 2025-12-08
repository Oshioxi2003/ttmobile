<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4">
    <div class="max-w-md w-full">
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

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-text-muted">Hoặc đăng nhập với</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center px-4 py-3 border border-border hover:bg-background transition-colors">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button class="flex items-center justify-center px-4 py-3 border border-border hover:bg-background transition-colors">
            <svg class="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

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
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

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
    const result = await authStore.login(form)
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
    }
  } catch (err) {
    error.value = 'Có lỗi xảy ra. Vui lòng thử lại sau.'
  } finally {
    loading.value = false
  }
}
</script>

