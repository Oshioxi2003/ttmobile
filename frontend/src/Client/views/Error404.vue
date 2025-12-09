<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary">404</h1>
        <div class="text-6xl mb-4">😕</div>
      </div>
      
      <h2 class="text-3xl font-bold text-text mb-4">Không tìm thấy trang</h2>
      <p class="text-text-muted mb-8">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="goBack" class="btn btn-secondary">
          ← Quay lại
        </button>
        <router-link to="/" class="btn btn-primary">
          🏠 Về trang chủ
        </router-link>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-text-muted mb-4">Bạn có thể quan tâm:</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <router-link to="/products" class="text-sm text-secondary hover:text-secondary-hover">
            Sản phẩm
          </router-link>
          <span class="text-gray-300">|</span>
          <router-link to="/products?category=phone" class="text-sm text-secondary hover:text-secondary-hover">
            Điện thoại
          </router-link>
          <span class="text-gray-300">|</span>
          <router-link to="/products?category=laptop" class="text-sm text-secondary hover:text-secondary-hover">
            Laptop
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 2) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>
