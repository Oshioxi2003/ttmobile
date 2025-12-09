<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-red-500">403</h1>
        <div class="text-6xl mb-4">🚫</div>
      </div>
      
      <h2 class="text-3xl font-bold text-text mb-4">Truy cập bị từ chối</h2>
      <p class="text-text-muted mb-8">
        Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập với tài khoản có quyền phù hợp.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/login" class="btn btn-secondary">
          🔐 Đăng nhập
        </router-link>
        <router-link to="/" class="btn btn-primary">
          🏠 Về trang chủ
        </router-link>
      </div>
      
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-text-muted">
          Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với chúng tôi.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
