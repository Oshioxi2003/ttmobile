<template>
  <div class="bg-background min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-secondary hover:text-secondary-hover">Trang chủ</router-link>
          <span class="mx-2 text-text-muted">/</span>
          <span class="text-text">Chính sách vận chuyển</span>
        </nav>
      </div>
    </div>

    <!-- Header -->
    <div class="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
      <div class="container-custom text-center">
        <h1 class="text-4xl font-bold text-primary mb-4">Chính Sách Vận Chuyển</h1>
        <p class="text-text-light">Thông tin về phí ship, thời gian và điều kiện giao hàng</p>
      </div>
    </div>

    <!-- Content -->
    <div class="container-custom py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Quick Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-border text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg text-primary mb-2">Miễn Phí Ship</h3>
            <p class="text-sm text-text-light">Đơn hàng từ ¥5,000</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-border text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg text-primary mb-2">Giao Nhanh</h3>
            <p class="text-sm text-text-light">2-3 ngày làm việc</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-border text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="font-bold text-lg text-primary mb-2">Bảo Hiểm</h3>
            <p class="text-sm text-text-light">100% giá trị hàng</p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-border p-8 md:p-12">
          <!-- Section 1 -->
          <section class="mb-10">
            <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
              <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Khu Vực Giao Hàng
            </h2>
            <div class="pl-11 space-y-4">
              <p class="text-text leading-relaxed">
                {{ siteSettings.site_name || 'T-T Mobile' }} cung cấp dịch vụ giao hàng trên toàn lãnh thổ Nhật Bản:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-primary/5 p-4 rounded-lg">
                  <h3 class="font-semibold text-primary mb-2">🌟 Khu vực nội thành Tokyo</h3>
                  <p class="text-sm text-text">Giao hàng trong 1-2 ngày</p>
                </div>
                <div class="bg-primary/5 p-4 rounded-lg">
                  <h3 class="font-semibold text-primary mb-2">🚚 Các tỉnh lân cận</h3>
                  <p class="text-sm text-text">Osaka, Kyoto, Chiba, Saitama: 2-3 ngày</p>
                </div>
                <div class="bg-primary/5 p-4 rounded-lg">
                  <h3 class="font-semibold text-primary mb-2">📦 Các tỉnh xa</h3>
                  <p class="text-sm text-text">Hokkaido, Okinawa: 3-5 ngày</p>
                </div>
                <div class="bg-primary/5 p-4 rounded-lg">
                  <h3 class="font-semibold text-primary mb-2">🏢 Nhận tại cửa hàng</h3>
                  <p class="text-sm text-text">Miễn phí, có sẵn ngay</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 2 -->
          <section class="mb-10">
            <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
              <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Phí Vận Chuyển
            </h2>
            <div class="pl-11 space-y-4">
              <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                  <thead>
                    <tr class="bg-primary text-white">
                      <th class="border border-primary p-3 text-left">Giá trị đơn hàng</th>
                      <th class="border border-primary p-3 text-left">Tokyo & lân cận</th>
                      <th class="border border-primary p-3 text-left">Tỉnh xa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-border p-3">Dưới ¥3,000</td>
                      <td class="border border-border p-3">¥800</td>
                      <td class="border border-border p-3">¥1,200</td>
                    </tr>
                    <tr class="bg-gray-50">
                      <td class="border border-border p-3">¥3,000 - ¥4,999</td>
                      <td class="border border-border p-3">¥500</td>
                      <td class="border border-border p-3">¥800</td>
                    </tr>
                    <tr>
                      <td class="border border-border p-3 font-semibold">¥5,000 trở lên</td>
                      <td class="border border-border p-3 text-green-600 font-bold">MIỄN PHÍ</td>
                      <td class="border border-border p-3 text-green-600 font-bold">MIỄN PHÍ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
                <p class="text-text">
                  <strong>Lưu ý:</strong> Sản phẩm cồng kềnh (TV, tủ lạnh) có thể phát sinh phí vận chuyển đặc biệt. 
                  Vui lòng liên hệ để được báo giá chính xác.
                </p>
              </div>
            </div>
          </section>

          <!-- Section 3 -->
          <section class="mb-10">
            <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
              <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Thời Gian Giao Hàng
            </h2>
            <div class="pl-11 space-y-4">
              <p class="text-text leading-relaxed">Thời gian xử lý và giao hàng:</p>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <strong class="text-text">Xử lý đơn hàng:</strong>
                    <span class="text-text-light"> 1-2 giờ trong giờ làm việc (9:00 - 18:00)</span>
                  </div>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                  </svg>
                  <div>
                    <strong class="text-text">Giao hàng chuẩn:</strong>
                    <span class="text-text-light"> 2-3 ngày làm việc</span>
                  </div>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <strong class="text-text">Giao hàng nhanh (có phụ thu):</strong>
                    <span class="text-text-light"> Trong ngày hoặc 1 ngày (khu vực hỗ trợ)</span>
                  </div>
                </li>
              </ul>
              <div class="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm">
                <p class="text-text">
                  <strong>📅 Đặt hàng trước 14:00</strong> trong ngày thường để được xử lý và giao trong ngày hôm sau (áp dụng nội thành Tokyo).
                </p>
              </div>
            </div>
          </section>

          <!-- Section 4 -->
          <section class="mb-10">
            <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
              <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
              Theo Dõi Đơn Hàng
            </h2>
            <div class="pl-11 space-y-4">
              <p class="text-text leading-relaxed">
                Sau khi đơn hàng được gửi đi, bạn sẽ nhận được:
              </p>
              <ul class="list-disc list-inside space-y-2 text-text">
                <li>Email xác nhận với mã vận đơn (tracking number)</li>
                <li>Link theo dõi trực tiếp qua đối tác vận chuyển (Yamato, Sagawa, Japan Post)</li>
                <li>Thông báo SMS khi giao hàng thành công</li>
              </ul>
              <div class="bg-primary/5 p-4 rounded-lg">
                <p class="text-sm text-text">
                  🔍 Bạn cũng có thể theo dõi đơn hàng trong phần <router-link to="/profile" class="text-primary font-semibold hover:underline">Tài khoản</router-link> của mình.
                </p>
              </div>
            </div>
          </section>

          <!-- Section 5 -->
          <section class="mb-10">
            <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
              <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
              Điều Kiện Giao Hàng
            </h2>
            <div class="pl-11 space-y-4">
              <ul class="space-y-3">
                <li class="flex items-start">
                  <span class="text-primary font-bold mr-3">✓</span>
                  <div>
                    <strong class="text-text">Kiểm tra kỹ hàng:</strong>
                    <span class="text-text-light"> Vui lòng kiểm tra ngay khi nhận hàng. Nếu có lỗi, từ chối nhận và liên hệ ngay với chúng tôi.</span>
                  </div>
                </li>
                <li class="flex items-start">
                  <span class="text-primary font-bold mr-3">✓</span>
                  <div>
                    <strong class="text-text">Địa chỉ chính xác:</strong>
                    <span class="text-text-light"> Đảm bảo địa chỉ giao hàng đầy đủ, chính xác. Phí phát sinh do sai địa chỉ sẽ do khách hàng chịu.</span>
                  </div>
                </li>
                <li class="flex items-start">
                  <span class="text-primary font-bold mr-3">✓</span>
                  <div>
                    <strong class="text-text">Không nhận hàng:</strong>
                    <span class="text-text-light"> Nếu không nhận hàng sau 3 lần giao, đơn hàng sẽ bị hủy và không hoàn tiền phí ship.</span>
                  </div>
                </li>
                <li class="flex items-start">
                  <span class="text-primary font-bold mr-3">✓</span>
                  <div>
                    <strong class="text-text">Hàng dễ vỡ:</strong>
                    <span class="text-text-light"> Đóng gói cẩn thận với bọt khí, hộp carton chắc chắn và dán nhãn "DỄ VỠ".</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- Section 6 -->
          <section class="mb-10">
            <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
              <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
              Đổi Trả & Hoàn Tiền
            </h2>
            <div class="pl-11 space-y-4">
              <p class="text-text leading-relaxed">
                Xem chi tiết tại <router-link to="/pages/refund-policy" class="text-primary font-semibold hover:underline">Chính sách đổi trả</router-link>. 
                Tóm tắt:
              </p>
              <ul class="list-disc list-inside space-y-2 text-text">
                <li>Đổi trả trong vòng 7 ngày nếu lỗi nhà sản xuất (miễn phí ship)</li>
                <li>Hoàn tiền 100% nếu sản phẩm không đúng mô tả</li>
                <li>Khách hàng chịu phí ship nếu đổi ý (sản phẩm chưa sử dụng, còn nguyên hộp)</li>
              </ul>
            </div>
          </section>

          <!-- Contact Section -->
          <section class="bg-primary/5 p-6 rounded-lg">
            <h2 class="text-xl font-bold text-primary mb-4">Cần Hỗ Trợ?</h2>
            <p class="text-text mb-4">
              Liên hệ bộ phận chăm sóc khách hàng để được tư vấn về vận chuyển:
            </p>
            <div class="space-y-2 text-text">
              <p class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <strong>Hotline:</strong> 
                <a :href="`tel:${siteSettings.contact_phone}`" class="ml-2 text-primary hover:underline">
                  {{ siteSettings.contact_phone || '080-xxxx-xxxx' }}
                </a>
              </p>
              <p class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <strong>Email:</strong>
                <a :href="`mailto:${siteSettings.contact_email}`" class="ml-2 text-primary hover:underline">
                  {{ siteSettings.contact_email || 'support@ttmobile.com' }}
                </a>
              </p>
            </div>
          </section>
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
