<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <span class="text-3xl font-bold text-primary tracking-tight">T&T MOBILE</span>
        </router-link>
        <p class="mt-3 text-text-muted">Tạo tài khoản mới</p>
      </div>

      <!-- Register Form -->
      <div class="bg-white p-8 shadow-card">
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Họ và tên <span class="text-primary">*</span></label>
            <input
              v-model="form.fullName"
              type="text"
              class="input"
              placeholder="Nguyễn Văn A"
              required
            >
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Tên đăng nhập <span class="text-primary">*</span></label>
            <input
              v-model="form.username"
              type="text"
              class="input"
              placeholder="username123"
              required
            >
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Email <span class="text-primary">*</span></label>
            <input
              v-model="form.email"
              type="email"
              class="input"
              placeholder="example@email.com"
              required
            >
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Số điện thoại</label>
            <input
              v-model="form.phone"
              type="tel"
              class="input"
              placeholder="080-xxxx-xxxx"
            >
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Mật khẩu <span class="text-primary">*</span></label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="input pr-12"
                placeholder="Tối thiểu 8 ký tự"
                required
                minlength="8"
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

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-text">Xác nhận mật khẩu <span class="text-primary">*</span></label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="input"
              placeholder="Nhập lại mật khẩu"
              required
            >
          </div>

          <!-- Terms -->
          <div class="flex items-start">
            <input type="checkbox" v-model="form.agreeTerms" class="mt-1 mr-2 accent-primary" required>
            <span class="text-sm text-text-muted">
              Tôi đồng ý với
              <a href="#" class="text-secondary hover:text-secondary-hover">Điều khoản dịch vụ</a>
              và
              <a href="#" class="text-secondary hover:text-secondary-hover">Chính sách bảo mật</a>
            </span>
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
            <span v-else>Đăng ký</span>
          </button>
        </form>

        <!-- Login Link -->
        <p class="mt-6 text-center text-sm text-text-muted">
          Đã có tài khoản?
          <router-link to="/login" class="text-secondary hover:text-secondary-hover font-semibold">Đăng nhập</router-link>
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
  fullName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const handleRegister = async () => {
  error.value = ''

  if (form.password !== form.confirmPassword) {
    error.value = 'Mật khẩu không khớp'
    return
  }

  if (form.password.length < 8) {
    error.value = 'Mật khẩu phải có ít nhất 8 ký tự'
    return
  }

  loading.value = true

  try {
    const result = await authStore.register(form)
    if (result.success) {
      router.push('/login')
    } else {
      error.value = result.message || 'Đăng ký thất bại. Vui lòng thử lại.'
    }
  } catch (err) {
    error.value = 'Có lỗi xảy ra. Vui lòng thử lại sau.'
  } finally {
    loading.value = false
  }
}
</script>

