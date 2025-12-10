<template>
  <div class="bg-gradient-to-br from-gray-900 via-[#08A7B9] to-gray-900 min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-black/20 backdrop-blur-md border-b border-white/10">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-[#08A7B9] hover:text-white transition-colors">Trang chủ</router-link>
          <span class="mx-2 text-white/40">/</span>
          <span class="text-white font-medium">Về chúng tôi</span>
        </nav>
      </div>
    </div>

    <!-- Hero Section with 3D Effects -->
    <div class="relative overflow-hidden py-32">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-[#08A7B9]/30 rounded-full blur-[128px] animate-float"></div>
        <div class="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#08A7B9]/20 rounded-full blur-[128px] animate-float-delayed"></div>
        <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-[#08A7B9]/20 rounded-full blur-[128px] animate-pulse"></div>
      </div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div class="container-custom relative z-10 text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-[#08A7B9]/20 backdrop-blur-xl border border-white/20 rounded-full">
          <div class="w-2 h-2 bg-[#08A7B9] rounded-full animate-pulse"></div>
          <span class="text-white/90 text-sm font-semibold tracking-wide">🚀 Tin Cậy Bởi Hàng Nghìn Khách Hàng</span>
        </div>

        <!-- Main Title with Gradient -->
        <h1 class="text-6xl md:text-8xl font-black mb-6 leading-tight">
          <span class="bg-gradient-to-r from-white via-[#08A7B9] to-white bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
            {{ siteSettings.site_name || 'T-T Mobile' }}
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
          {{ siteSettings.site_description || 'Chuyên cung cấp điện thoại, đồng hồ thông minh chính hãng với giá tốt nhất tại Nhật Bản.' }}
        </p>

        <!-- 3D Cards Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div class="group relative">
            <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
            <div class="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div class="text-4xl font-black text-[#08A7B9]">10+</div>
              <div class="text-white/70 text-sm mt-2">Năm Kinh Nghiệm</div>
            </div>
          </div>
          
          <div class="group relative">
            <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
            <div class="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div class="text-4xl font-black text-[#08A7B9]">50K+</div>
              <div class="text-white/70 text-sm mt-2">Khách Hàng</div>
            </div>
          </div>
          
          <div class="group relative">
            <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
            <div class="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div class="text-4xl font-black text-[#08A7B9]">99%</div>
              <div class="text-white/70 text-sm mt-2">Hài Lòng</div>
            </div>
          </div>
          
          <div class="group relative">
            <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
            <div class="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div class="text-4xl font-black text-[#08A7B9]">5★</div>
              <div class="text-white/70 text-sm mt-2">Đánh Giá</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-custom py-20">
      <!-- Milestones Section with 3D Timeline -->
      <section class="mb-24">
        <div class="text-center mb-16">
          <div class="inline-block px-6 py-2 bg-[#08A7B9]/20 backdrop-blur-xl border border-white/20 rounded-full mb-6">
            <span class="text-[#08A7B9] text-sm font-bold">📈 LỊCH SỬ PHÁT TRIỂN</span>
          </div>
          <h2 class="text-5xl font-black text-white mb-4">
            Hành Trình Của Chúng Tôi
          </h2>
          <p class="text-white/60 text-lg">Từ những bước đi đầu tiên đến thành công hôm nay</p>
        </div>
        
        <div class="relative">
          <!-- Vertical Timeline Line -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#08A7B9] transform -translate-x-1/2"></div>
          
          <div class="space-y-24">
            <!-- Timeline Item -->
            <div v-for="(milestone, index) in milestones" :key="index" 
                 class="relative flex items-center">
              
              <!-- Desktop Layout -->
              <div class="hidden md:flex items-center w-full">
                <!-- Left Side Content (for even indices - 0, 2, 4) -->
                <div v-if="index % 2 === 0" class="w-[calc(50%-80px)] pr-12">
                  <div class="group relative">
                    <div class="absolute inset-0 bg-[#08A7B9]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
                    <div class="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:scale-[1.02] transition-all">
                      <div class="inline-flex items-center justify-center w-16 h-16 bg-[#08A7B9] rounded-2xl mb-8 shadow-2xl">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                        </svg>
                      </div>
                      <h3 class="text-3xl font-black text-white mb-6">{{ milestone.title }}</h3>
                      <p class="text-white/70 leading-relaxed text-lg">{{ milestone.description }}</p>
                      <div class="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-500/30 rounded-tr-2xl"></div>
                      <div class="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-blue-500/30 rounded-bl-2xl"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Empty space for left when content is on right -->
                <div v-else class="w-[calc(50%-80px)]"></div>
                
                <!-- Center Year Badge with connection dots -->
                <div class="relative flex items-center justify-center w-40 shrink-0 z-20">
                  <!-- Left dot -->
                  <div v-if="index % 2 === 0" class="absolute left-0 w-3 h-3 bg-[#08A7B9] rounded-full shadow-lg shadow-[#08A7B9]/50"></div>
                  
                  <!-- Year Badge -->
                  <div class="group relative">
                    <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div class="relative bg-[#08A7B9] px-6 py-3 rounded-2xl border-4 border-gray-900 hover:scale-110 transition-transform">
                      <div class="text-2xl font-black text-white drop-shadow-lg whitespace-nowrap">{{ milestone.year }}</div>
                    </div>
                  </div>
                  
                  <!-- Right dot -->
                  <div v-if="index % 2 !== 0" class="absolute right-0 w-3 h-3 bg-[#08A7B9] rounded-full shadow-lg shadow-[#08A7B9]/50"></div>
                </div>
                
                <!-- Right Side Content (for odd indices - 1, 3) -->
                <div v-if="index % 2 !== 0" class="w-[calc(50%-80px)] pl-12">
                  <div class="group relative">
                    <div class="absolute inset-0 bg-[#08A7B9]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
                    <div class="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 hover:scale-[1.02] transition-all">
                      <div class="inline-flex items-center justify-center w-16 h-16 bg-[#08A7B9] rounded-2xl mb-8 shadow-2xl">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                        </svg>
                      </div>
                      <h3 class="text-3xl font-black text-white mb-6">{{ milestone.title }}</h3>
                      <p class="text-white/70 leading-relaxed text-lg">{{ milestone.description }}</p>
                      <div class="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-500/30 rounded-tr-2xl"></div>
                      <div class="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-blue-500/30 rounded-bl-2xl"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Empty space for right when content is on left -->
                <div v-else class="w-[calc(50%-80px)]"></div>
              </div>
              
              <!-- Mobile Layout -->
              <div class="md:hidden w-full space-y-6">
                <!-- Year Badge -->
                <div class="flex justify-center">
                  <div class="group relative">
                    <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div class="relative bg-[#08A7B9] px-8 py-4 rounded-2xl border-4 border-gray-900">
                      <div class="text-2xl font-black text-white drop-shadow-lg">{{ milestone.year }}</div>
                    </div>
                  </div>
                </div>
                
                <!-- Content Card -->
                <div class="group relative">
                  <div class="absolute inset-0 bg-[#08A7B9]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
                  <div class="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
                    <div class="inline-flex items-center justify-center w-14 h-14 bg-[#08A7B9] rounded-2xl mb-6 shadow-2xl">
                      <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-black text-white mb-5">{{ milestone.title }}</h3>
                    <p class="text-white/70 leading-relaxed text-base">{{ milestone.description }}</p>
                    <div class="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#08A7B9]/30 rounded-tr-2xl"></div>
                    <div class="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#08A7B9]/30 rounded-bl-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values Section with 3D Cards -->
      <section class="mb-24">
        <div class="text-center mb-16">
          <div class="inline-block px-6 py-2 bg-[#08A7B9]/20 backdrop-blur-xl border border-white/20 rounded-full mb-6">
            <span class="text-[#08A7B9] text-sm font-bold">💎 CÁC GIÁ TRỊ CỐT LÕI</span>
          </div>
          <h2 class="text-5xl font-black text-white mb-4">
            Triết Lý Kinh Doanh
          </h2>
          <p class="text-white/60 text-lg max-w-2xl mx-auto">
            Những giá trị này là kim chỉ nam cho mọi hành động và quyết định của chúng tôi
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(value, index) in coreValues" :key="index" 
               class="group relative perspective-1000">
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-[#08A7B9]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100"></div>
            
            <!-- Card with 3D Transform -->
            <div class="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all transform-gpu group-hover:rotate-y-6 group-hover:scale-105 duration-500">
              <!-- Icon with Gradient Background -->
              <div class="relative mb-6">
                <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl"></div>
                <div class="relative w-20 h-20 bg-[#08A7B9] rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.icon"/>
                  </svg>
                </div>
              </div>
              
              <h3 class="text-2xl font-black text-white mb-3">{{ value.title }}</h3>
              <p class="text-white/70 leading-relaxed">{{ value.description }}</p>
              
              <!-- Number Badge -->
              <div class="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20">
                <span class="text-xl font-black text-[#08A7B9]">
                  0{{ index + 1 }}
                </span>
              </div>

              <!-- Decorative Elements -->
              <div class="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-[#08A7B9]/30 rounded-bl-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission & Vision with 3D Cards -->
      <section class="mb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Mission Card -->
          <div class="group relative perspective-1000">
            <div class="absolute inset-0 bg-[#08A7B9] rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all opacity-50"></div>
            <div class="relative bg-[#08A7B9]/90 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/20 hover:scale-[1.02] transition-transform overflow-hidden">
              <!-- Animated Background Pattern -->
              <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div class="relative z-10">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                  <h2 class="text-4xl font-black text-white">Sứ Mệnh</h2>
                </div>
                <p class="text-white/90 text-lg leading-relaxed">
                  Mang đến những sản phẩm công nghệ chất lượng cao với giá cả hợp lý, 
                  cùng dịch vụ chăm sóc khách hàng tận tâm, góp phần nâng cao chất lượng 
                  cuộc sống cho cộng đồng người Việt tại Nhật Bản.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Vision Card -->
          <div class="group relative perspective-1000">
            <div class="absolute inset-0 bg-[#08A7B9] rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all opacity-50"></div>
            <div class="relative bg-[#08A7B9]/80 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/20 hover:scale-[1.02] transition-transform overflow-hidden">
              <!-- Animated Background Pattern -->
              <div class="absolute inset-0 opacity-10">
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>
              
              <div class="relative z-10">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <h2 class="text-4xl font-black text-white">Tầm Nhìn</h2>
                </div>
                <p class="text-white/90 text-lg leading-relaxed">
                  Trở thành thương hiệu điện thoại và công nghệ hàng đầu được cộng đồng 
                  người Việt tin tưởng tại Nhật Bản, không ngừng mở rộng và phát triển 
                  để phục vụ tốt hơn nhu cầu của khách hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Contact Section -->
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-[#08A7B9]/20 rounded-[3rem] blur-3xl"></div>
        <div class="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-12 md:p-16 text-center overflow-hidden">
          <!-- Animated Background -->
          <div class="absolute inset-0 opacity-30">
            <div class="absolute top-0 left-1/4 w-96 h-96 bg-[#08A7B9]/30 rounded-full blur-[128px] animate-pulse"></div>
            <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-[#08A7B9]/30 rounded-full blur-[128px] animate-pulse delay-700"></div>
          </div>

          <div class="relative z-10">
            <div class="inline-block px-6 py-2 bg-[#08A7B9]/20 backdrop-blur-xl border border-white/20 rounded-full mb-6">
              <span class="text-[#08A7B9] text-sm font-bold">💬 HỖ TRỢ 24/7</span>
            </div>

            <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
              Sẵn Sàng Hỗ Trợ Bạn
            </h2>
            <p class="text-white/70 text-xl mb-10 max-w-2xl mx-auto">
              Đội ngũ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>

            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a :href="`tel:${siteSettings.contact_phone}`" class="group relative">
                <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div class="relative px-10 py-5 bg-[#08A7B9] rounded-2xl font-bold text-white text-lg hover:scale-105 transition-transform inline-flex items-center shadow-2xl">
                  <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {{ siteSettings.contact_phone || '080-xxxx-xxxx' }}
                </div>
              </a>

              <a :href="`mailto:${siteSettings.contact_email}`" class="group relative">
                <div class="absolute inset-0 bg-[#08A7B9] rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div class="relative px-10 py-5 bg-black/40 backdrop-blur-xl border-2 border-[#08A7B9]/50 rounded-2xl font-bold text-white text-lg hover:scale-105 transition-transform inline-flex items-center">
                  <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  {{ siteSettings.contact_email || 'info@ttmobile.com' }}
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteSettings } from '@/composables/useSiteSettings'

const { siteSettings, loadSettings } = useSiteSettings()

// Load settings on mount
loadSettings()

const milestones = ref([
  {
    year: '2016',
    title: 'Khởi Đầu',
    description: 'Thành lập T-T Mobile với mong muốn cung cấp điện thoại chính hãng, giá tốt cho cộng đồng người Việt tại Nhật Bản. Bắt đầu từ một cửa hàng nhỏ với đội ngũ nhiệt huyết.'
  },
  {
    year: '2018',
    title: 'Mở Rộng Dịch Vụ',
    description: 'Mở rộng sang mảng kinh doanh phụ kiện, đồng hồ thông minh và các thiết bị công nghệ. Khách hàng ngày càng tin tưởng và ủng hộ.'
  },
  {
    year: '2020',
    title: 'Phát Triển Vượt Bậc',
    description: 'Khai trương thêm 2 chi nhánh mới, xây dựng hệ thống website và dịch vụ ship hàng toàn quốc. Đội ngũ nhân viên tăng lên gấp 3 lần.'
  },
  {
    year: '2023',
    title: 'Chuyển Đổi Số',
    description: 'Ra mắt nền tảng thương mại điện tử hiện đại, tích hợp AI hỗ trợ khách hàng, thanh toán đa dạng. Trở thành một trong những thương hiệu điện thoại hàng đầu.'
  },
  {
    year: '2025',
    title: 'Phát Triển Bền Vững',
    description: 'Tiếp tục mở rộng với 5 chi nhánh phủ khắp các khu vực trọng điểm. Cam kết phát triển bền vững, bảo vệ môi trường và đóng góp cho cộng đồng.'
  }
])

const coreValues = ref([
  {
    title: 'Uy Tín',
    description: 'Sản phẩm chính hãng, nguồn gốc rõ ràng, cam kết chất lượng.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    title: 'Tận Tâm',
    description: 'Chăm sóc khách hàng chu đáo, hỗ trợ nhiệt tình 24/7.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    title: 'Chuyên Nghiệp',
    description: 'Quy trình làm việc chuyên nghiệp, đội ngũ am hiểu sản phẩm.',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    title: 'Sáng Tạo',
    description: 'Không ngừng cải tiến dịch vụ, áp dụng công nghệ mới.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  }
])
</script>

<style scoped>
/* 3D Perspective */
.perspective-1000 {
  perspective: 1000px;
}

.transform-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-40px);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Grid Pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* 3D Transform */
.group:hover .rotate-y-6 {
  transform: perspective(1000px) rotateY(6deg);
}

/* Delay for animations */
.delay-700 {
  animation-delay: 0.7s;
}

/* Hover scale with GPU acceleration */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02) translateZ(0);
}

.hover\:scale-105:hover {
  transform: scale(1.05) translateZ(0);
}

.hover\:scale-110:hover {
  transform: scale(1.1) translateZ(0);
}
</style>
