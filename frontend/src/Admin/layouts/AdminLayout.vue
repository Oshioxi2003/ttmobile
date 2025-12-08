<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Mobile overlay -->
    <div
      class="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
      v-show="mobileOpen"
      @click="toggleMobile(false)"
    />

    <!-- Sidebar -->
    <aside
      class="z-40 fixed inset-y-0 left-0 w-72 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static"
      :class="mobileOpen ? 'translate-x-0' : '-translate-x-full'"
      aria-label="Sidebar"
    >
      <div class="p-5 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold">T&T Mobile Admin</h1>
          <p class="text-sm text-gray-400">Bảng điều khiển</p>
        </div>
        <button class="lg:hidden px-2 py-1 rounded-lg hover:bg-gray-800" @click="toggleMobile(false)" aria-label="Đóng menu">
          ✖
        </button>
      </div>

      <nav class="p-4 overflow-y-auto h-[calc(100%-72px)]">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="flex items-center px-4 py-2 rounded-xl transition-colors"
              :class="$route.path === '/' ? 'bg-gray-700' : 'hover:bg-gray-800'"
              @click="toggleMobile(false)"
            >
              <span class="mr-3">📊</span> Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/products"
              class="flex items-center px-4 py-2 rounded-xl transition-colors"
              :class="$route.path.startsWith('/products') ? 'bg-gray-700' : 'hover:bg-gray-800'"
              @click="toggleMobile(false)"
            >
              <span class="mr-3">📱</span> Sản phẩm
            </router-link>
          </li>
          <li>
            <router-link
              to="/users"
              class="flex items-center px-4 py-2 rounded-xl transition-colors"
              :class="$route.path.startsWith('/users') ? 'bg-gray-700' : 'hover:bg-gray-800'"
              @click="toggleMobile(false)"
            >
              <span class="mr-3">👥</span> Người dùng
            </router-link>
          </li>
          <li>
            <router-link
              to="/pages"
              class="flex items-center px-4 py-2 rounded-xl transition-colors"
              :class="$route.path.startsWith('/pages') ? 'bg-gray-700' : 'hover:bg-gray-800'"
              @click="toggleMobile(false)"
            >
              <span class="mr-3">📄</span> Trang tĩnh
            </router-link>
          </li>
          <li>
            <router-link
              to="/menu-navbar"
              class="flex items-center px-4 py-2 rounded-xl transition-colors"
              :class="$route.path.startsWith('/menu-navbar') ? 'bg-gray-700' : 'hover:bg-gray-800'"
              @click="toggleMobile(false)"
            >
              <span class="mr-3">📋</span> Menu Navbar
            </router-link>
          </li>
          <li>
            <router-link
              to="/banners"
              class="flex items-center px-4 py-2 rounded-xl transition-colors"
              :class="$route.path.startsWith('/banners') ? 'bg-gray-700' : 'hover:bg-gray-800'"
              @click="toggleMobile(false)"
            >
              <span class="mr-3">🖼️</span> Banners
            </router-link>
          </li>

          <li>
            <router-link
              to="/settings"
              class="flex items-center px-4 py-2 rounded-xl transition-colors"
              :class="$route.path.startsWith('/settings') ? 'bg-gray-700' : 'hover:bg-gray-800'"
              @click="toggleMobile(false)"
            >
              <span class="mr-3">⚙️</span> Cài đặt
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col lg:ml-0">
      <!-- Top Header -->
      <header class="bg-white/90 backdrop-blur shadow-sm border-b border-gray-100 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-20">
        <div class="flex items-center gap-3">
          <button class="lg:hidden px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50" @click="toggleMobile(true)" aria-label="Mở menu">
            ☰
          </button>
          <h2 class="text-lg lg:text-xl font-semibold">{{ currentPageTitle }}</h2>
        </div>
        <div class="flex items-center space-x-3 lg:space-x-4">
          <span class="text-gray-600 hidden sm:inline">{{ authStore.user?.fullName }}</span>
          <button @click="handleLogout" class="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
            Đăng xuất
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const mobileOpen = ref(false)
const toggleMobile = (val = !mobileOpen.value) => {
  mobileOpen.value = val
}

const currentPageTitle = computed(() => {
  return route.name || 'Dashboard'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

