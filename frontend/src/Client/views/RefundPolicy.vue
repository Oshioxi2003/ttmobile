<template>
  <div class="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-primary hover:text-primary-700 transition-colors">Trang chủ</router-link>
          <span class="mx-2 text-gray-400">/</span>
          <span class="text-gray-700 font-medium">Chính sách đổi trả & hoàn tiền</span>
        </nav>
      </div>
    </div>

    <!-- Hero Header with 3D Effect -->
    <div class="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-purple-600 py-20">
      <div class="absolute inset-0 bg-grid-white/10"></div>
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      <div class="container-custom relative z-10 text-center">
        <div class="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
          💯 Cam kết hoàn tiền 100%
        </div>
        <h1 class="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
          Chính Sách Đổi Trả
        </h1>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          Mua hàng an tâm với chính sách đổi trả linh hoạt trong 7 ngày
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container-custom py-16 -mt-10 relative z-20">
      <!-- Quick Benefits -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-500">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="font-bold text-lg text-gray-800 mb-2">7 Ngày Đổi Trả</h3>
          <p class="text-sm text-gray-600">Không hài lòng? Đổi trả dễ dàng</p>
        </div>

        <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <h3 class="font-bold text-lg text-gray-800 mb-2">Hoàn Tiền 100%</h3>
          <p class="text-sm text-gray-600">Lỗi NSX - hoàn tiền đầy đủ</p>
        </div>

        <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-purple-500">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
          </div>
          <h3 class="font-bold text-lg text-gray-800 mb-2">Đổi Sản Phẩm</h3>
          <p class="text-sm text-gray-600">Đổi sang mẫu khác miễn phí</p>
        </div>

        <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-orange-500">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="font-bold text-lg text-gray-800 mb-2">Xử Lý Nhanh</h3>
          <p class="text-sm text-gray-600">1-2 ngày giải quyết</p>
        </div>
      </div>

      <div class="max-w-5xl mx-auto">
        <!-- Main Content Card -->
        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <!-- Section 1 -->
          <section class="p-8 md:p-12 border-l-8 border-green-500 bg-gradient-to-r from-green-50 to-white">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  1
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-black text-gray-800 mb-4">Điều Kiện Đổi Trả</h2>
                <div class="space-y-4">
                  <div class="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-400 hover:shadow-lg transition-shadow">
                    <h3 class="font-bold text-lg text-gray-800 mb-2 flex items-center">
                      <span class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 text-green-600">✓</span>
                      Sản phẩm lỗi do nhà sản xuất
                    </h3>
                    <p class="text-gray-600 ml-11">Hoàn tiền 100% hoặc đổi sản phẩm mới, miễn phí vận chuyển 2 chiều</p>
                  </div>

                  <div class="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
                    <h3 class="font-bold text-lg text-gray-800 mb-2 flex items-center">
                      <span class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600">✓</span>
                      Sản phẩm không đúng mô tả
                    </h3>
                    <p class="text-gray-600 ml-11">Đổi trả trong 7 ngày kể từ ngày nhận hàng, miễn phí ship</p>
                  </div>

                  <div class="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-400 hover:shadow-lg transition-shadow">
                    <h3 class="font-bold text-lg text-gray-800 mb-2 flex items-center">
                      <span class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600">✓</span>
                      Khách hàng đổi ý
                    </h3>
                    <p class="text-gray-600 ml-11">Sản phẩm chưa qua sử dụng, còn nguyên hộp, đầy đủ phụ kiện. Khách chịu phí ship</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"></div>

          <!-- Section 2 -->
          <section class="p-8 md:p-12 border-l-8 border-blue-500 bg-gradient-to-r from-blue-50 to-white">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  2
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-black text-gray-800 mb-6">Quy Trình Đổi Trả</h2>
                <div class="relative">
                  <div class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                  
                  <div class="space-y-6">
                    <div class="flex gap-6 relative">
                      <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                        01
                      </div>
                      <div class="flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-xl text-gray-800 mb-2">Liên Hệ Hỗ Trợ</h3>
                        <p class="text-gray-600">Gọi hotline <a :href="`tel:${siteSettings.contact_phone}`" class="text-primary font-bold">{{ siteSettings.contact_phone }}</a> hoặc email <a :href="`mailto:${siteSettings.contact_email}`" class="text-primary font-bold">{{ siteSettings.contact_email }}</a></p>
                      </div>
                    </div>

                    <div class="flex gap-6 relative">
                      <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                        02
                      </div>
                      <div class="flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-xl text-gray-800 mb-2">Cung Cấp Thông Tin</h3>
                        <p class="text-gray-600">Mã đơn hàng, hình ảnh sản phẩm lỗi, video unbox (nếu có)</p>
                      </div>
                    </div>

                    <div class="flex gap-6 relative">
                      <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                        03
                      </div>
                      <div class="flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-xl text-gray-800 mb-2">Xác Nhận Đổi Trả</h3>
                        <p class="text-gray-600">Bộ phận CSKH xác nhận trong vòng 2-4 giờ làm việc</p>
                      </div>
                    </div>

                    <div class="flex gap-6 relative">
                      <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                        04
                      </div>
                      <div class="flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-xl text-gray-800 mb-2">Gửi Sản Phẩm</h3>
                        <p class="text-gray-600">Đóng gói cẩn thận, gửi về địa chỉ được cung cấp</p>
                      </div>
                    </div>

                    <div class="flex gap-6 relative">
                      <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                        05
                      </div>
                      <div class="flex-1 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-xl text-gray-800 mb-2">Nhận Tiền/Hàng Mới</h3>
                        <p class="text-gray-600">Hoàn tiền trong 3-5 ngày làm việc hoặc nhận sản phẩm mới</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>

          <!-- Section 3 -->
          <section class="p-8 md:p-12 border-l-8 border-purple-500 bg-gradient-to-r from-purple-50 to-white">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  3
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-black text-gray-800 mb-6">Trường Hợp KHÔNG Được Đổi Trả</h2>
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="bg-red-50 border-2 border-red-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                    <div class="flex items-start gap-3">
                      <span class="text-2xl">❌</span>
                      <div>
                        <h3 class="font-bold text-gray-800 mb-1">Sản phẩm đã qua sử dụng</h3>
                        <p class="text-sm text-gray-600">Có dấu hiệu đã kích hoạt, cài đặt</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-red-50 border-2 border-red-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                    <div class="flex items-start gap-3">
                      <span class="text-2xl">❌</span>
                      <div>
                        <h3 class="font-bold text-gray-800 mb-1">Thiếu phụ kiện</h3>
                        <p class="text-sm text-gray-600">Không đầy đủ hộp, sách HD, phụ kiện</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-red-50 border-2 border-red-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                    <div class="flex items-start gap-3">
                      <span class="text-2xl">❌</span>
                      <div>
                        <h3 class="font-bold text-gray-800 mb-1">Hư hỏng do người dùng</h3>
                        <p class="text-sm text-gray-600">Rơi vỡ, vào nước, cháy nổ</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-red-50 border-2 border-red-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                    <div class="flex items-start gap-3">
                      <span class="text-2xl">❌</span>
                      <div>
                        <h3 class="font-bold text-gray-800 mb-1">Quá thời hạn 7 ngày</h3>
                        <p class="text-sm text-gray-600">Tính từ ngày nhận hàng</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"></div>

          <!-- Section 4 -->
          <section class="p-8 md:p-12 border-l-8 border-orange-500 bg-gradient-to-r from-orange-50 to-white">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  4
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-black text-gray-800 mb-6">Chính Sách Hoàn Tiền</h2>
                <div class="space-y-4">
                  <div class="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-2xl shadow-xl text-white">
                    <div class="flex items-center gap-4 mb-3">
                      <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <h3 class="text-2xl font-bold">Hoàn Tiền Nhanh Chóng</h3>
                    </div>
                    <ul class="space-y-2 text-white/90">
                      <li class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-white rounded-full"></span>
                        <span>Chuyển khoản ngân hàng: 1-2 ngày làm việc</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-white rounded-full"></span>
                        <span>Ví điện tử (Momo, ZaloPay): 24 giờ</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-white rounded-full"></span>
                        <span>Thẻ tín dụng: 3-5 ngày làm việc (tùy ngân hàng)</span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-2xl shadow-xl text-white">
                    <div class="flex items-center gap-4 mb-3">
                      <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <h3 class="text-2xl font-bold">Bảo Lưu Đơn Hàng</h3>
                    </div>
                    <p class="text-white/90">Nếu sản phẩm thay thế tạm hết hàng, chúng tôi sẽ bảo lưu đơn hàng và ưu tiên giao cho bạn khi có hàng về (tối đa 15 ngày)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- CTA Section -->
        <div class="mt-12 bg-gradient-to-br from-primary via-secondary to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
          <div class="relative p-12 text-center">
            <div class="absolute inset-0">
              <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
            <div class="relative z-10">
              <h2 class="text-3xl md:text-4xl font-black text-white mb-4">Cần Hỗ Trợ Đổi Trả?</h2>
              <p class="text-xl text-white/90 mb-8">Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn 24/7</p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a :href="`tel:${siteSettings.contact_phone}`" class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                  <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  {{ siteSettings.contact_phone || '080-xxxx-xxxx' }}
                </a>
                <a :href="`mailto:${siteSettings.contact_email}`" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-2xl font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-xl">
                  <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Gửi Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSiteSettings } from '@/composables/useSiteSettings'

const { siteSettings, loadSettings } = useSiteSettings()

// Load settings on mount
loadSettings()
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.bg-grid-white\/10 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
</style>
