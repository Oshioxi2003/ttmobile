<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
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
          <span class="text-3xl font-bold text-[#08A7B9] tracking-tight">T&T MOBILE</span>
        </router-link>
        <p class="mt-3 text-gray-600">Tạo tài khoản mới</p>
      </div>

      <!-- Register Form -->
      <div class="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-800">Họ và tên <span class="text-[#08A7B9]">*</span></label>
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
            <label class="block text-sm font-semibold mb-2 text-gray-800">Tên đăng nhập <span class="text-[#08A7B9]">*</span></label>
            <input
              v-model="form.username"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08A7B9] focus:border-transparent outline-none"
              placeholder="username123"
              required
            >
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-800">Email <span class="text-[#08A7B9]">*</span></label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08A7B9] focus:border-transparent outline-none"
              placeholder="example@email.com"
              required
            >
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-800">Số điện thoại</label>
            <input
              v-model="form.phone"
              type="tel"
              class="input"
              placeholder="080-xxxx-xxxx"
            >
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-800">Mật khẩu <span class="text-[#08A7B9]">*</span></label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08A7B9] focus:border-transparent outline-none"
                placeholder="Tối thiểu 8 ký tự"
                required
                minlength="8"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
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
            <label class="block text-sm font-semibold mb-2 text-gray-800">Xác nhận mật khẩu <span class="text-[#08A7B9]">*</span></label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08A7B9] focus:border-transparent outline-none"
              placeholder="Nhập lại mật khẩu"
              required
            >
          </div>

          <!-- Terms -->
          <div class="flex items-start">
            <input type="checkbox" v-model="form.agreeTerms" class="mt-1 mr-2 accent-[#08A7B9]" required>
            <span class="text-sm text-gray-600">
              Tôi đồng ý với
              <a href="#" class="text-[#08A7B9] hover:underline">Điều khoản dịch vụ</a>
              và
              <a href="#" class="text-[#08A7B9] hover:underline">Chính sách bảo mật</a>
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
            class="w-full py-4 bg-[#08A7B9] hover:bg-[#07969F] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <p class="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?
          <router-link to="/login" class="text-[#08A7B9] hover:underline font-semibold">Đăng nhập</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL || '/api/v1'

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
    const response = await axios.post(`${apiUrl}/auth/register`, {
      full_name: form.fullName,
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password
    })
    
    if (response.data.success) {
      alert('Đăng ký thành công! Vui lòng đăng nhập.')
      router.push('/login')
    } else {
      error.value = response.data.message || 'Đăng ký thất bại. Vui lòng thử lại.'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.'
  } finally {
    loading.value = false
  }
}
</script>

