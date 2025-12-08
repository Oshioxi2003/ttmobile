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
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/login" class="hover:opacity-80">Đăng nhập</router-link>
            <router-link to="/register" class="hover:opacity-80">Đăng ký</router-link>
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
            <router-link to="/checkout" class="relative p-2 hover:text-primary transition-colors">
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
              <a v-if="siteSettings.facebook_url" :href="siteSettings.facebook_url" target="_blank" rel="noopener" class="text-text-light hover:text-primary">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <!-- Zalo -->
              <a v-if="zaloHref && zaloHref !== '#'" :href="zaloHref" target="_blank" rel="noopener" class="text-text-light hover:text-primary">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <!-- Extra icon preserved as fallback -->
              <a href="#" class="text-text-light hover:text-primary">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Links / Footer Pages Column 1 -->
          <div>
            <h4 class="footer-heading">Danh mục</h4>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/collections/iphone" class="text-text hover:text-primary">iPhone</router-link></li>
              <li><router-link to="/collections/samsung" class="text-text hover:text-primary">Samsung</router-link></li>
              <li><router-link to="/collections/smartwatch" class="text-text hover:text-primary">Đồng hồ thông minh</router-link></li>
              <li><router-link to="/collections/accessories" class="text-text hover:text-primary">Phụ kiện</router-link></li>
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
            <ul class="space-y-2 text-sm">
              <li><router-link to="/pages/about" class="text-text hover:text-primary">Về chúng tôi</router-link></li>
              <li><a href="#" class="text-text hover:text-primary">Liên hệ</a></li>
              <li><a href="#" class="text-text hover:text-primary">Chính sách bảo hành</a></li>
              <li><router-link to="/policies/refund-policy" class="text-text hover:text-primary">Chính sách đổi trả</router-link></li>
              <li v-for="page in footerPagesCol2" :key="page.id">
                <router-link :to="`/pages/${page.slug}`" class="text-text hover:text-primary">
                  {{ page.title }}
                </router-link>
              </li>
            </ul>
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
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-text-light">
          <p>&copy; 2024 {{ siteSettings.site_name }}. All rights reserved.</p>
          <div class="flex items-center space-x-4 mt-4 md:mt-0">
            <!-- Payment Icons (SVG inline) -->
            <svg class="h-8" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="50" height="32" rx="4" fill="#1A1F71"/>
              <path d="M21.5 21H19L20.5 11H23L21.5 21ZM17.5 11L15.1 18L14.8 16.5L14 12C14 12 13.9 11 12.5 11H8.1L8 11.2C8 11.2 9.6 11.5 11.4 12.6L13.5 21H16.1L20 11H17.5ZM35.5 21H38L35.8 11H33.8C32.6 11 32.3 12 32.3 12L28.5 21H31.1L31.6 19.5H34.8L35.5 21ZM32.3 17.5L33.7 13.5L34.5 17.5H32.3ZM29.5 13.5L29.8 12C29.8 12 28.5 11.5 27.1 11.5C25.6 11.5 22.5 12.2 22.5 15C22.5 17.6 26 17.6 26 19C26 20.4 22.8 20 21.5 19L21.1 20.6C21.1 20.6 22.5 21.2 24.5 21.2C26.5 21.2 29.5 20 29.5 17.5C29.5 14.9 26 14.7 26 13.5C26 12.3 28.5 12.5 29.5 13.5Z" fill="white"/>
            </svg>
            <svg class="h-8" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="50" height="32" rx="4" fill="#F5F5F5"/>
              <circle cx="20" cy="16" r="10" fill="#EB001B"/>
              <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
              <path d="M25 8.5C27.4 10.3 29 13 29 16C29 19 27.4 21.7 25 23.5C22.6 21.7 21 19 21 16C21 13 22.6 10.3 25 8.5Z" fill="#FF5F00"/>
            </svg>
            <svg class="h-8" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="50" height="32" rx="4" fill="#003087"/>
              <path d="M19.5 12H16.5C16.2 12 16 12.2 15.9 12.5L14.5 20.5C14.5 20.7 14.6 20.8 14.8 20.8H16.2C16.5 20.8 16.7 20.6 16.8 20.3L17.2 17.8C17.2 17.5 17.5 17.3 17.8 17.3H18.9C21 17.3 22.2 16.2 22.5 14.2C22.6 13.3 22.5 12.6 22.1 12.1C21.6 11.5 20.7 12 19.5 12ZM19.9 14.3C19.7 15.6 18.8 15.6 17.9 15.6H17.4L17.8 13.3C17.8 13.2 17.9 13.1 18 13.1H18.3C18.9 13.1 19.5 13.1 19.8 13.5C20 13.7 20 14 19.9 14.3ZM28.5 14.2H27.1C27 14.2 26.9 14.3 26.9 14.4L26.8 14.8L26.7 14.6C26.4 14.2 25.7 14 25.1 14C23.3 14 21.8 15.4 21.5 17.3C21.3 18.2 21.5 19.1 22 19.7C22.5 20.3 23.2 20.5 24 20.5C25.3 20.5 26 19.7 26 19.7L25.9 20.1C25.9 20.3 26 20.4 26.2 20.4H27.4C27.7 20.4 27.9 20.2 28 19.9L28.8 14.5C28.9 14.4 28.7 14.2 28.5 14.2ZM26.4 17.4C26.2 18.3 25.5 18.9 24.6 18.9C24.2 18.9 23.8 18.7 23.6 18.5C23.4 18.2 23.3 17.8 23.4 17.4C23.5 16.5 24.3 15.9 25.1 15.9C25.5 15.9 25.9 16.1 26.1 16.3C26.4 16.6 26.5 17 26.4 17.4ZM35.5 14.2H34.1C33.9 14.2 33.8 14.3 33.7 14.5L31.7 17.5L30.9 14.6C30.8 14.3 30.6 14.2 30.3 14.2H28.9C28.7 14.2 28.6 14.4 28.6 14.6L30.1 19.7L28.7 21.6C28.6 21.8 28.7 22 28.9 22H30.3C30.5 22 30.6 21.9 30.7 21.8L35.7 14.7C35.9 14.4 35.7 14.2 35.5 14.2Z" fill="white"/>
            </svg>
          </div>
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

// Footer pages from Pages.vue integration
const footerPages = ref([])
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

onMounted(async () => {
  // Preload public settings (cached) to avoid redundant requests
  try { await settingStore.fetch() } catch {}
  // Load site settings
  await loadSettings()

  // Try to load NAV from public site settings (site.nav_config) to avoid hitting admin-only endpoint
  try {
    const raw = siteSettings.value?.nav_config || settingStore.get?.('nav_config', '[]') || '[]'
    try { navConfig.value = JSON.parse(raw || '[]') } catch { navConfig.value = [] }
  } catch {}

  // Load categories for auto-generated collections in nav
  try {
    const catRes = await categoryService.getCategories()
    categories.value = catRes.data?.data || []
  } catch {}

  // Contact/social come from settingStore.fetch() via useSiteSettings; avoid duplicate direct calls

  // Load footer pages from admin Pages management (non-blocking)
  try {
    await loadFooterPages()
  } catch (error) {
    console.error('Error loading footer pages:', error)
  }

  // Try to load wishlist if user is authenticated
  if (localStorage.getItem('token')) {
    wishlistStore.fetch().catch(() => {})
  }
})
</script>

