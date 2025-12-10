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

      <nav class="p-4 overflow-y-auto h-[calc(100%-72px)] relative pb-20">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              exact
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path === '/' ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">📊</span> Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/products"
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path.startsWith('/products') ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">📱</span> Sản phẩm
            </router-link>
          </li>
          <li>
            <router-link
              to="/users"
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path.startsWith('/users') ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">👥</span> Người dùng
            </router-link>
          </li>
          <li>
            <router-link
              to="/pages"
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path.startsWith('/pages') ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">📄</span> Trang tĩnh
            </router-link>
          </li>
          <li>
            <router-link
              to="/menu-navbar"
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path.startsWith('/menu-navbar') ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">📋</span> Menu Navbar
            </router-link>
          </li>
          <li>
            <router-link
              to="/banners"
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path.startsWith('/banners') ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">🖼️</span> Banners
            </router-link>
          </li>
          <li>
            <router-link
              to="/categories"
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path.startsWith('/categories') ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">📦</span> Danh mục
            </router-link>
          </li>

          <li>
            <router-link
              to="/settings"
              class="flex items-center px-4 py-2 rounded-xl transition-all duration-200"
              :class="$route.path.startsWith('/settings') ? 'bg-[#08A7B9] text-white shadow-lg' : 'hover:bg-gray-800'"
              @click="handleNavClick"
            >
              <span class="mr-3">⚙️</span> Cài đặt
            </router-link>
          </li>
        </ul>

        <!-- Switch to Client Button -->
        <div class="absolute bottom-4 left-4 right-4">
          <a
            href="/"
            target="_blank"
            class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#08A7B9] to-[#06919A] text-white font-medium hover:from-[#06919A] hover:to-[#057A82] transition-all shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span>Xem trang Client</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
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
      <main class="flex-1 p-4 lg:p-6 overflow-auto">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const mobileOpen = ref(false)
const isNavigating = ref(false)

const toggleMobile = (val = !mobileOpen.value) => {
  mobileOpen.value = val
}

// Watch route changes for loading state
watch(() => route.path, () => {
  isNavigating.value = false
}, { immediate: true })

// Handle navigation click
const handleNavClick = () => {
  isNavigating.value = true
  toggleMobile(false)
}

const currentPageTitle = computed(() => {
  const titles = {
    'Dashboard': 'Tổng quan',
    'Products': 'Quản lý sản phẩm',
    'ProductCreate': 'Thêm sản phẩm mới',
    'ProductEdit': 'Chỉnh sửa sản phẩm',
    'Users': 'Quản lý người dùng',
    'Pages': 'Quản lý trang',
    'PageCreate': 'Thêm trang mới',
    'PageEdit': 'Chỉnh sửa trang',
    'Settings': 'Cài đặt hệ thống',
    'MenuNavbar': 'Quản lý menu',
    'Banners': 'Quản lý banners',
    'Categories': 'Quản lý danh mục'
  }
  return titles[route.name] || route.name || 'Dashboard'
})

const handleLogout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
/* Smooth transitions */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Smooth scrolling */
* {
  scroll-behavior: smooth;
}
</style>

