<template>
  <div class="min-h-screen flex flex-col bg-background">
    <!-- Top Bar - Red -->
    <div class="header-top">
      <div class="container-custom">
        <div class="flex items-center justify-between py-2 text-sm">
          <div class="flex items-center space-x-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {{ siteSettings.contact_phone || '080-xxxx-xxxx' }}
            </span>
            <span class="hidden md:flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              {{ siteSettings.contact_email || 'info@ttmobile.com' }}
            </span>
            <span v-if="siteSettings.working_hours" class="hidden lg:flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              {{ siteSettings.working_hours }}
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="isLoggedIn">
              <span class="text-gray-900 font-medium">Xin chào, <span class="text-[#000]">{{ userName }}</span></span>
              <button @click="handleLogout" class="text-gray-900 hover:text-red-600 font-medium transition-colors">Đăng xuất</button>
            </template>
            <template v-else>
              <router-link to="/login" class="text-gray-900 hover:text-[#08A7B9] font-medium transition-colors">Đăng nhập</router-link>
              <router-link to="/register" class="text-gray-900 hover:text-[#08A7B9] font-medium transition-colors">Đăng ký</router-link>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header - White -->
    <header class="header-main sticky top-0 z-50">
      <div class="container-custom">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <router-link to="/" class="flex-shrink-0">
            <img
              v-if="siteSettings.site_logo"
              :src="siteSettings.site_logo"
              :alt="siteSettings.site_name"
              class="h-10 md:h-12 w-auto object-contain"
            >
            <span
              v-else
              class="text-2xl md:text-3xl font-bold text-primary tracking-tight"
            >
              {{ siteSettings.site_name }}
            </span>
          </router-link>

          <!-- Search Bar -->
          <div class="hidden md:flex flex-1 max-w-xl mx-8">
            <div class="relative w-full">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                class="input-search w-full border border-border rounded-none pr-12"
                @keyup.enter="handleSearch"
              >
              <button @click="handleSearch" class="absolute right-0 top-0 h-full px-4 bg-primary text-white hover:bg-primary-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Right Icons -->
          <div class="flex items-center space-x-4">
            <!-- Wishlist -->
            <router-link to="/wishlist" class="relative p-2 hover:text-primary transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{{ wishlistCount }}</span>
            </router-link>

            <!-- Cart -->
            <router-link to="/cart" class="relative p-2 hover:text-primary transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{{ cartCount }}</span>
            </router-link>

            <!-- Mobile Menu -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Navigation (Admin configurable) -->
        <nav class="hidden md:block border-t border-border">
          <ul class="flex items-center space-x-8 py-3">
            <li>
              <router-link to="/" class="nav-link-dark">Trang chủ</router-link>
            </li>
            <li v-for="(m, i) in navItems" :key="i" class="relative group">
              <router-link :to="m.path || '/'" class="nav-link-dark flex items-center gap-2">
                <img v-if="m.iconImage" :src="asset(m.iconImage)" class="w-5 h-5 object-contain" width="48" height="48" alt="icon" />
                <span class="uppercase">{{ m.label }}</span>
                <svg v-if="m.hasDropdown || m.dropdownEnabled" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </router-link>
              <div v-if="m.hasDropdown || m.dropdownEnabled" class="absolute left-0 top-full bg-white border border-gray-100 rounded-xl shadow-xl hidden group-hover:block group-focus-within:block p-6 min-w-[760px] z-50">
                <div class="grid gap-6" :class="`grid-cols-${clampCols(m.columns)}`">
                  <div v-for="(col, ci) in m.parsedCols" :key="ci" class="pr-8 border-r border-gray-100 last:border-r-0 last:pr-0">
                    <h5 v-if="m.colHeadings && m.colHeadings[ci]" class="font-bold text-[#07B2BD] mb-2">{{ m.colHeadings[ci] }}</h5>
                    <ul class="space-y-3 text-sm">
                      <li v-for="(link, li) in col" :key="li">
                        <template v-if="link.children && link.children.length">
                          <router-link :to="link.href" class="block text-[#07B2BD] font-bold uppercase tracking-wide mb-2 hover:text-[#05919A]">{{ link.text }}</router-link>
                          <ul class="space-y-2">
                            <li v-for="(sub, si) in link.children" :key="si" class="flex items-start gap-2">
                              <span class="mt-2 block w-1 h-1 rounded-full bg-gray-300"></span>
                              <router-link :to="sub.path || sub.href || '#'" class="block text-gray-900 font-semibold hover:text-primary">{{ sub.label || sub.text }}</router-link>
                            </li>
                          </ul>
                        </template>
                        <template v-else>
                          <router-link :to="link.href" class="block text-[#07B2BD] font-bold hover:text-[#05919A]">{{ link.text }}</router-link>
                        </template>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 z-50 bg-black/50" @click="mobileMenuOpen = false">
      <div class="absolute right-0 top-0 h-full w-80 bg-white shadow-xl" @click.stop>
        <div class="p-4 border-b border-border flex items-center justify-between">
          <span class="font-bold text-primary">Menu</span>
          <button @click="mobileMenuOpen = false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav class="p-4">
          <router-link to="/" class="block py-3 border-b border-border" @click="mobileMenuOpen = false">Trang chủ</router-link>
          <div v-for="(m,i) in navItems" :key="i" class="border-b border-border">
            <button v-if="m.hasDropdown || m.dropdownEnabled" type="button" class="w-full flex items-center justify-between py-3">
              <span class="flex items-center gap-2" @click="toggleMobile(i)">
                <img v-if="m.iconImage" :src="asset(m.iconImage)" class="w-12 h-12 object-contain" width="48" height="48" alt="icon" />
                <span class="uppercase">{{ m.label }}</span>
              </span>
              <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': mobileOpen[i] }" fill="none" stroke="currentColor" viewBox="0 0 24 24" @click="toggleMobile(i)">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <router-link v-else :to="m.path || '/'" class="block py-3" @click="mobileMenuOpen = false">
              <span class="flex items-center gap-2">
                <img v-if="m.iconImage" :src="asset(m.iconImage)" class="w-12 h-12 object-contain" width="48" height="48" alt="icon" />
                <span class="uppercase">{{ m.label }}</span>
              </span>
            </router-link>
            <div v-if="(m.hasDropdown || m.dropdownEnabled) && mobileOpen[i]" class="pl-3 pb-3">
              <div v-for="(col,ci) in m.parsedCols" :key="ci" class="mt-2">
                <h5 v-if="m.colHeadings && m.colHeadings[ci]" class="font-bold text-[#07B2BD] mb-1">{{ m.colHeadings[ci] }}</h5>
                <ul class="space-y-1">
                  <li v-for="(link,li) in col" :key="li">
                    <template v-if="link.children && link.children.length">
                      <router-link :to="link.href" class="block text-[#07B2BD] font-bold uppercase py-1 hover:text-[#05919A]">{{ link.text }}</router-link>
                      <ul class="pl-3 mt-1 space-y-1">
                        <li v-for="(sub, si) in link.children" :key="si">
                          <router-link :to="sub.path || sub.href || '#'" class="block text-gray-900 font-semibold py-1" @click="mobileMenuOpen = false">{{ sub.label || sub.text }}</router-link>
                        </li>
                      </ul>
                    </template>
                    <router-link v-else :to="link.href" class="text-[#07B2BD] font-bold block py-1 hover:text-[#05919A]" @click="mobileMenuOpen = false">{{ link.text }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Floating Contact Buttons -->
    <div class="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
     
      

      <!-- Facebook Button -->
      <a 
        v-if="siteSettings.facebook_url"
        :href="siteSettings.facebook_url" 
        target="_blank"
        class="floating-btn floating-btn-facebook group"
        aria-label="Facebook"
      >
        <svg class="w-7 h-7" fill="white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span class="floating-btn-tooltip">Facebook</span>
      </a>

      <!-- Zalo Button -->
      <a 
        :href="zaloHref" 
        target="_blank"
        class="floating-btn floating-btn-zalo group"
        aria-label="Chat Zalo"
      >
        <svg class="w-7 h-7" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2962ff" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path>
          <path fill="#eee" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path>
          <path fill="#2962ff" d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"></path>
          <path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path>
          <path fill="#2962ff" d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"></path>
          <path fill="#2962ff" d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"></path>
        </svg>
        <span class="floating-btn-tooltip">Chat Zalo</span>
      </a>

      <!-- Phone Button -->
      <a 
        :href="`tel:${siteSettings.contact_phone || '0379640501'}`"
        class="floating-btn floating-btn-phone group"
        aria-label="Gọi điện"
      >
        <svg class="w-7 h-7" fill="white" viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
        </svg>
        <span class="floating-btn-tooltip">Gọi ngay</span>
      </a>
    </div>

    <!-- Footer -->
    <footer class="footer py-12">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- About -->
          <div>
            <h4 class="footer-heading">Về {{ siteSettings.site_name }}</h4>
            <p class="text-text-light text-sm leading-relaxed">
              {{ siteSettings.site_description || 'Chuyên cung cấp điện thoại, đồng hồ thông minh chính hãng với giá tốt nhất.' }}
            </p>
            <div class="flex space-x-4 mt-4">
              <!-- Facebook -->
              <a v-if="siteSettings.facebook_url" :href="siteSettings.facebook_url" target="_blank" rel="noopener" class="text-text-light hover:text-primary" :title="siteSettings.facebook_name || 'Facebook'">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <!-- Zalo -->
              <a v-if="zaloHref && zaloHref !== '#'" :href="zaloHref" target="_blank" rel="noopener" class="text-text-light hover:text-primary" title="Zalo">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path fill="#2962ff" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path><path fill="#eee" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path><path fill="#2962ff" d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"></path><path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path><path fill="#2962ff" d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"></path><path fill="#2962ff" d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"></path>
</svg>
              </a>
            </div>
          </div>

          <!-- Categories - Auto-generated from database -->
          <div v-if="footerCategories.length > 0">
            <h4 class="footer-heading">Danh mục</h4>
            <ul class="space-y-2 text-sm">
              <li v-for="category in footerCategories" :key="category.id">
                <router-link :to="`/collections/${category.slug}`" class="text-text hover:text-primary">
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Footer Pages Column 1 -->
          <div v-if="footerPagesCol1.length > 0">
            <h4 class="footer-heading">{{ footerPagesCol1[0]?.columnLabel || 'Thông tin' }}</h4>
            <ul class="space-y-2 text-sm">
              <li v-for="page in footerPagesCol1" :key="page.id">
                <router-link :to="`/pages/${page.slug}`" class="text-text hover:text-primary">
                  {{ page.title }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Support / Footer Pages Column 2 -->
          <div>
            <h4 class="footer-heading">Hỗ trợ</h4>
            <!-- <ul class="space-y-2 text-sm">
              <li><router-link to="/pages/about-us" class="text-text hover:text-primary">Về chúng tôi</router-link></li>
              <li><router-link to="/pages/privacy-policy" class="text-text hover:text-primary">Chính sách bảo mật</router-link></li>
              <li><router-link to="/pages/shipping-policy" class="text-text hover:text-primary">Chính sách vận chuyển</router-link></li>
              <li><router-link to="/pages/refund-policy" class="text-text hover:text-primary">Chính sách đổi trả</router-link></li>
              <li v-for="page in footerPagesCol2" :key="page.id">
                <router-link :to="`/pages/${page.slug}`" class="text-text hover:text-primary">
                  {{ page.title }}
                </router-link>
              </li>
            </ul> -->
          </div>

          <!-- Contact -->
          <div>
            <h4 class="footer-heading">Liên hệ</h4>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start">
                <svg class="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-text">{{ siteSettings.contact_address || 'Tokyo, Japan' }}</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span class="text-text">{{ siteSettings.contact_phone || '080-xxxx-xxxx' }}</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span class="text-text">{{ siteSettings.contact_email || 'info@ttmobile.com' }}</span>
              </li>
              <li v-if="siteSettings.working_hours" class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-text">{{ siteSettings.working_hours }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-text-light">
          <p>&copy; 2025 {{ siteSettings.site_name }}. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useSiteSettings } from '@/composables/useSiteSettings'
import { useSettingStore } from '@/stores/settingStore'
import { resolveAssetUrl as asset } from '@/utils/assets'
import categoryService from '@/services/categoryService'
import api from '@/services/api'

const router = useRouter()
const mobileMenuOpen = ref(false)
const searchQuery = ref('')

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { siteSettings, loadSettings } = useSiteSettings()
const settingStore = useSettingStore()

// Build nav items from settings (key: nav_config as JSON)
const navConfig = ref([])
const rawNav = computed(() => {
  // Prefer explicitly loaded navConfig, fallback to public settings store
  if (Array.isArray(navConfig.value) && navConfig.value.length) return navConfig.value
  const json = settingStore.get?.('nav_config', '[]')
  try { return JSON.parse(json || '[]') } catch { return [] }
})

const clampCols = (n) => Math.min(Math.max(Number(n) || 1, 1), 5)

// category map for auto-generated collections
const categories = ref([])
const catMap = computed(() => {
  const map = {}
  const add = (arr=[]) => arr.forEach(c => {
    map[c.slug] = { name: c.name, sortOrder: c.sortOrder ?? 999 }
    if (Array.isArray(c.children)) add(c.children)
  })
  add(categories.value)
  return map
})

const distribute = (arr, n) => {
  const out = Array.from({ length: n }, () => [])
  arr.forEach((v, i) => out[i % n].push(v))
  return out
}

const navItems = computed(() => {
  const items = Array.isArray(rawNav.value) ? rawNav.value : []
  return items.map((it) => {
    let count = clampCols(it.columns)
    if ((!it?.columns || isNaN(Number(it.columns))) && Array.isArray(it.children) && it.children.length) {
      count = clampCols(Math.min(4, it.children.length))
    }

    // 1) Collections mode (auto from category slugs)
    if (it.type === 'collections') {
      const slugs = Array.isArray(it.collectionSlugs) ? it.collectionSlugs : []
      const ordered = it.collectionSortMode === 'custom'
        ? [...slugs]
        : [...slugs].sort((a,b) => (catMap.value[a]?.sortOrder ?? 999) - (catMap.value[b]?.sortOrder ?? 999))
      const groups = distribute(ordered, count)
      const cols = groups.map(g => g.map(slug => ({ text: catMap.value[slug]?.name || slug, href: `/collections/${slug}`, children: [] })))
      const hasDropdown = cols.some(col => (col?.length || 0) > 0)
      return { ...it, columns: count, parsedCols: cols, hasDropdown }
    }

    // 2) Tree mode (children array from Admin Menu builder) - organize as columns
    if (Array.isArray(it.children) && it.children.length) {
      // Group children into columns, preserve tree structure
      const cols = distribute(it.children, count)
      const parsedCols = cols.map(col => col.map(child => ({
        text: child.label || '',
        href: child.path || '#',
        children: Array.isArray(child.children) ? child.children : []
      })))
      const hasDropdown = true
      return { ...it, columns: count, parsedCols, hasDropdown }
    }

    // 3) Manual mode (cols as multiline text)
    const cols = []
    for (let i = 0; i < count; i++) {
      const text = (it.cols?.[i] || '').split('\n').filter(Boolean)
      const links = text.map((line) => {
        const [t, u] = line.split('|').map((s) => (s || '').trim())
        return { text: t || '', href: u || '#', children: [] }
      })
      cols.push(links)
    }
    const hasDropdown = Boolean(it.dropdownEnabled) || cols.some(col => (col?.length || 0) > 0)
    return { ...it, columns: count, parsedCols: cols, hasDropdown }
  })
})

// Mobile dropdown state
const mobileOpen = ref({})
const toggleMobile = (i) => {
  mobileOpen.value[i] = !mobileOpen.value[i]
}

// Build Zalo link from admin settings (prefer explicit URL, fallback to phone)
const zaloHref = computed(() => {
  const url = siteSettings.value?.zalo_url
  if (url && typeof url === 'string') return url
  const phone = siteSettings.value?.zalo_phone || siteSettings.value?.contact_phone
  if (!phone) return '#'
  const digits = String(phone).replace(/[^0-9]/g, '')
  if (!digits) return '#'
  return `https://zalo.me/${digits}`
})

const cartCount = computed(() => cartStore.itemCount)
const wishlistCount = computed(() => wishlistStore.count)

// Auth state
const isLoggedIn = ref(false)
const userName = ref('')

const checkAuthState = () => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr)
      isLoggedIn.value = true
      userName.value = user.full_name || user.username || user.email || 'Khách'
    } catch (e) {
      isLoggedIn.value = false
      userName.value = ''
    }
  } else {
    isLoggedIn.value = false
    userName.value = ''
  }
}

const handleLogout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isLoggedIn.value = false
    userName.value = ''
    cartStore.clearCart()
    wishlistStore.clear()
    router.push('/')
  }
}

// Search functionality
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() }
    })
    searchQuery.value = ''
  }
}

// Footer data
const footerPages = ref([])
const footerCategories = ref([])

const footerPagesCol1 = computed(() => {
  const pages = Array.isArray(footerPages.value) ? footerPages.value : []
  return pages.filter(p => p.footerColumn === 1 || p.footerColumn === '1').sort((a, b) => (a.footerOrder || 999) - (b.footerOrder || 999))
})
const footerPagesCol2 = computed(() => {
  const pages = Array.isArray(footerPages.value) ? footerPages.value : []
  return pages.filter(p => p.footerColumn === 2 || p.footerColumn === '2').sort((a, b) => (a.footerOrder || 999) - (b.footerOrder || 999))
})

const loadFooterPages = async () => {
  try {
    // Use public endpoint to avoid 401
    const res = await api.get('/pages/footer', { skipAuthRedirect: true })
    // Handle various response structures and ensure we always get an array
    let pages = res.data?.data || res.data || []
    // If pages is not an array, try to extract it or default to empty array
    if (!Array.isArray(pages)) {
      pages = Array.isArray(pages?.pages) ? pages.pages : []
    }
    footerPages.value = pages
  } catch (e) {
    console.error('Failed to load footer pages:', e)
    // Ensure footerPages is always an array, even on error
    footerPages.value = []
  }
}

const loadFooterCategories = async () => {
  try {
    const res = await categoryService.getCategories()
    const allCategories = res.data?.data || []
    // Only show active top-level categories (or first 6 categories) in footer
    footerCategories.value = allCategories
      .filter(c => c.isActive !== false && !c.parentId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .slice(0, 6)
  } catch (e) {
    console.error('Failed to load footer categories:', e)
    footerCategories.value = []
  }
}

onMounted(async () => {
  // Check auth state
  checkAuthState()
  
  // Load site settings once (uses settingStore internally with cache)
  await loadSettings()
  // Load footer data from admin (non-blocking)
  try {
    await Promise.all([
      loadFooterPages(),
      loadFooterCategories()
    ])
  } catch (error) {
    console.error('Error loading footer data:', error)
  }

  // Try to load cart and wishlist if user is authenticated
  const token = localStorage.getItem('token')
  if (token && isLoggedIn.value) {
    try {
      await cartStore.fetchCart()
    } catch (error) {
      console.log('Cart not available')
    }
    try {
      await wishlistStore.syncToServer()
    } catch (error) {
      console.log('Wishlist sync not available')
    }
  } else {
    // Load wishlist from localStorage for non-authenticated users
    wishlistStore.fetch()
  }
})
</script>

<style scoped>
/* Floating Contact Buttons */
.floating-btn {
  @apply w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 relative;
}

.floating-btn-facebook {
  @apply bg-blue-700;
}

.floating-btn-admin {
  @apply bg-gray-800;
}

.floating-btn-zalo {
  @apply bg-white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.floating-btn-phone {
  @apply bg-green-600;
}

/* Shake animation on hover */
.floating-btn:hover {
  @apply shadow-2xl scale-110;
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0) scale(1.1); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px) scale(1.1); }
  20%, 40%, 60%, 80% { transform: translateX(3px) scale(1.1); }
}

/* Tooltip */
.floating-btn-tooltip {
  @apply absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200;
}

.floating-btn:hover .floating-btn-tooltip {
  @apply opacity-100;
}

/* Pulse effect */
.floating-btn::before {
  content: '';
  @apply absolute inset-0 rounded-full opacity-0 transition-opacity duration-300;
}

.floating-btn-facebook::before {
  @apply bg-blue-500;
  animation: pulse-facebook 2s infinite;
}

.floating-btn-admin::before {
  @apply bg-gray-600;
  animation: pulse-admin 2s infinite;
}

.floating-btn-zalo::before {
  background: #2962ff;
  animation: pulse-zalo 2s infinite;
}

.floating-btn-phone::before {
  @apply bg-green-400;
  animation: pulse-phone 2s infinite;
}

@keyframes pulse-facebook {
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.15); }
}

@keyframes pulse-admin {
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.15); }
}

@keyframes pulse-zalo {
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.15); }
}

@keyframes pulse-phone {
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.15); }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .floating-btn {
    @apply w-12 h-12;
  }
  
  .floating-btn svg {
    @apply w-6 h-6;
  }
}
</style>

