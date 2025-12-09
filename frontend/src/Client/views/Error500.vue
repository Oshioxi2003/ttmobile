<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-orange-500">500</h1>
        <div class="text-6xl mb-4">⚠️</div>
      </div>
      
      <h2 class="text-3xl font-bold text-text mb-4">Lỗi máy chủ</h2>
      <p class="text-text-muted mb-8">
        Đã xảy ra lỗi trên máy chủ. Chúng tôi đang khắc phục sự cố. Vui lòng thử lại sau.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="reload" class="btn btn-secondary">
          🔄 Tải lại trang
        </button>
        <router-link to="/" class="btn btn-primary">
          🏠 Về trang chủ
        </router-link>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-text-muted mb-2">
          Liên hệ hỗ trợ:
        </p>
        <div class="flex flex-col gap-2">
          <a href="tel:0379640501" class="text-sm text-secondary hover:text-secondary-hover">
            📞 0379640501
          </a>
          <a href="https://zalo.me/0379640501" target="_blank" class="text-sm text-secondary hover:text-secondary-hover">
            💬 Zalo: 0379640501
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const reload = () => {
  window.location.reload()
}
</script>
