<template>
  <div class="bg-background min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-secondary hover:text-secondary-hover">Trang chủ</router-link>
          <span class="mx-2 text-text-muted">/</span>
          <span class="text-text">Chính sách bảo mật</span>
        </nav>
      </div>
    </div>

    <!-- Header -->
    <div class="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
      <div class="container-custom text-center">
        <h1 class="text-4xl font-bold text-primary mb-4">Chính Sách Bảo Mật</h1>
        <p class="text-text-light">Cập nhật lần cuối: {{ lastUpdated }}</p>
      </div>
    </div>

    <!-- Content -->
    <div class="container-custom py-12">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-border p-8 md:p-12">
        <!-- Introduction -->
        <div class="mb-8">
          <p class="text-text leading-relaxed">
            {{ siteSettings.site_name || 'T-T Mobile' }} cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng. 
            Chính sách này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn.
          </p>
        </div>

        <!-- Section 1 -->
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
            <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
            Thu Thập Thông Tin
          </h2>
          <div class="pl-11 space-y-4">
            <p class="text-text leading-relaxed">
              Chúng tôi thu thập các loại thông tin sau:
            </p>
            <ul class="list-disc list-inside space-y-2 text-text">
              <li><strong>Thông tin cá nhân:</strong> Họ tên, địa chỉ email, số điện thoại, địa chỉ giao hàng</li>
              <li><strong>Thông tin thanh toán:</strong> Thông tin thẻ tín dụng, phương thức thanh toán (được mã hóa an toàn)</li>
              <li><strong>Thông tin đơn hàng:</strong> Lịch sử mua sắm, sản phẩm yêu thích, giỏ hàng</li>
              <li><strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, thiết bị, cookie</li>
            </ul>
          </div>
        </section>

        <!-- Section 2 -->
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
            <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
            Mục Đích Sử Dụng Thông Tin
          </h2>
          <div class="pl-11 space-y-4">
            <p class="text-text leading-relaxed">
              Thông tin của bạn được sử dụng cho các mục đích sau:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-primary/5 p-4 rounded-lg">
                <h3 class="font-semibold text-primary mb-2">Xử Lý Đơn Hàng</h3>
                <p class="text-sm text-text">Xác nhận, đóng gói và giao hàng đến bạn</p>
              </div>
              <div class="bg-primary/5 p-4 rounded-lg">
                <h3 class="font-semibold text-primary mb-2">Hỗ Trợ Khách Hàng</h3>
                <p class="text-sm text-text">Giải đáp thắc mắc và xử lý khiếu nại</p>
              </div>
              <div class="bg-primary/5 p-4 rounded-lg">
                <h3 class="font-semibold text-primary mb-2">Cải Thiện Dịch Vụ</h3>
                <p class="text-sm text-text">Phân tích hành vi để nâng cao trải nghiệm</p>
              </div>
              <div class="bg-primary/5 p-4 rounded-lg">
                <h3 class="font-semibold text-primary mb-2">Gửi Thông Báo</h3>
                <p class="text-sm text-text">Khuyến mãi, sản phẩm mới, cập nhật</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
            <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
            Bảo Mật Thông Tin
          </h2>
          <div class="pl-11 space-y-4">
            <p class="text-text leading-relaxed">
              Chúng tôi áp dụng các biện pháp bảo mật tiên tiến:
            </p>
            <ul class="space-y-3">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <strong class="text-text">Mã hóa SSL/TLS:</strong>
                  <span class="text-text-light"> Toàn bộ dữ liệu truyền tải được mã hóa</span>
                </div>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <strong class="text-text">Tường lửa:</strong>
                  <span class="text-text-light"> Bảo vệ máy chủ khỏi truy cập trái phép</span>
                </div>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <strong class="text-text">Giới hạn quyền truy cập:</strong>
                  <span class="text-text-light"> Chỉ nhân viên được ủy quyền mới có thể truy cập</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- Section 4 -->
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
            <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
            Chia Sẻ Thông Tin
          </h2>
          <div class="pl-11 space-y-4">
            <p class="text-text leading-relaxed">
              Chúng tôi <strong>KHÔNG</strong> bán hoặc cho thuê thông tin cá nhân của bạn. 
              Thông tin chỉ được chia sẻ với:
            </p>
            <ul class="list-disc list-inside space-y-2 text-text">
              <li>Đối tác vận chuyển (để giao hàng)</li>
              <li>Cổng thanh toán (để xử lý giao dịch)</li>
              <li>Cơ quan pháp luật (khi có yêu cầu hợp pháp)</li>
            </ul>
          </div>
        </section>

        <!-- Section 5 -->
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
            <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
            Quyền Của Khách Hàng
          </h2>
          <div class="pl-11 space-y-4">
            <p class="text-text leading-relaxed">Bạn có các quyền sau:</p>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <ul class="space-y-2 text-text">
                <li>✓ Truy cập và xem thông tin cá nhân của bạn</li>
                <li>✓ Yêu cầu chỉnh sửa hoặc cập nhật thông tin</li>
                <li>✓ Yêu cầu xóa tài khoản và dữ liệu</li>
                <li>✓ Từ chối nhận email marketing (có thể hủy đăng ký bất cứ lúc nào)</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Section 6 -->
        <section class="mb-10">
          <h2 class="text-2xl font-bold text-primary mb-4 flex items-center">
            <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
            Cookie và Công Nghệ Theo Dõi
          </h2>
          <div class="pl-11 space-y-4">
            <p class="text-text leading-relaxed">
              Website sử dụng cookie để cải thiện trải nghiệm. Cookie giúp:
            </p>
            <ul class="list-disc list-inside space-y-2 text-text">
              <li>Ghi nhớ đăng nhập và giỏ hàng</li>
              <li>Phân tích lưu lượng truy cập</li>
              <li>Cá nhân hóa nội dung</li>
            </ul>
            <p class="text-text-light text-sm">
              Bạn có thể tắt cookie trong cài đặt trình duyệt, nhưng một số tính năng có thể không hoạt động đúng.
            </p>
          </div>
        </section>

        <!-- Contact -->
        <section class="bg-primary/5 p-6 rounded-lg">
          <h2 class="text-xl font-bold text-primary mb-4">Liên Hệ</h2>
          <p class="text-text mb-4">
            Nếu bạn có thắc mắc về chính sách bảo mật, vui lòng liên hệ:
          </p>
          <div class="space-y-2 text-text">
            <p><strong>Email:</strong> {{ siteSettings.contact_email || 'privacy@ttmobile.com' }}</p>
            <p><strong>Điện thoại:</strong> {{ siteSettings.contact_phone || '080-xxxx-xxxx' }}</p>
            <p><strong>Địa chỉ:</strong> {{ siteSettings.contact_address || 'Tokyo, Japan' }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteSettings } from '@/composables/useSiteSettings'

const { siteSettings, loadSettings } = useSiteSettings()

// Load settings on mount
loadSettings()

const lastUpdated = ref('10/12/2025')
</script>
