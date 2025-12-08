<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-500 mt-1">Chào mừng quay lại, quản trị viên</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
        v-for="card in statCards"
        :key="card.title"
        class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-gray-600 text-sm font-medium mb-2">{{ card.title }}</p>
            <p class="text-3xl font-bold text-gray-900">{{ loading ? '…' : card.value }}</p>
          </div>
          <div class="text-4xl ml-4 opacity-80">{{ card.icon }}</div>
        </div>
        <div class="mt-4 h-1 bg-gradient-to-r from-primary to-primary-700 rounded-full" style="width: 40%"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Products -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900">🔥 Sản phẩm nổi bật</h2>
            <p class="text-sm text-gray-500 mt-1">Top views</p>
          </div>
          <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold" v-if="!loading">{{ topProducts.length }}</span>
        </div>
        <div v-if="loading" class="text-gray-400 text-center py-8">Đang tải…</div>
        <div v-else class="space-y-3">
          <div
            v-for="p in topProducts"
            :key="p.id"
            class="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center gap-3 flex-1">
              <img :src="p.thumbnail || '/images/placeholder.png'" alt="thumb" class="w-14 h-14 rounded-lg object-cover shadow-sm" />
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{{ p.name }}</p>
                <p class="text-xs text-gray-500 mt-1">👁️ {{ p.viewCount?.toLocaleString() || 0 }} lượt xem</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-primary font-bold text-lg">{{ formatCurrency(p.price) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Low stock -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900">⚠️ Sắp hết hàng</h2>
            <p class="text-sm text-gray-500 mt-1">Cần nhập thêm</p>
          </div>
          <span class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold" v-if="!loading">{{ lowStock.length }}</span>
        </div>
        <div v-if="loading" class="text-gray-400 text-center py-8">Đang tải…</div>
        <div v-else class="space-y-3">
          <div
            v-for="p in lowStock"
            :key="p.id"
            class="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-white border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center gap-3 flex-1">
              <img :src="p.thumbnail || '/images/placeholder.png'" alt="thumb" class="w-14 h-14 rounded-lg object-cover shadow-sm" />
              <div class="flex-1">
                <p class="font-semibold text-gray-900">{{ p.name }}</p>
                <p class="text-xs text-orange-600 mt-1 font-medium">📦 Tồn: {{ p.stock }} cái</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-primary font-bold text-lg">{{ formatCurrency(p.price) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent contacts -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900">💬 Liên hệ gần đây</h2>
            <p class="text-sm text-gray-500 mt-1">Tin nhắn từ khách hàng</p>
          </div>
          <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold" v-if="!loading">{{ recentContacts.length }}</span>
        </div>
        <div v-if="loading" class="text-gray-400 text-center py-8">Đang tải…</div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-200 bg-gray-50 rounded-lg">
                <th class="text-left py-4 px-4 font-semibold text-gray-700">Tên</th>
                <th class="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                <th class="text-left py-4 px-4 font-semibold text-gray-700">Chủ đề</th>
                <th class="text-left py-4 px-4 font-semibold text-gray-700">Trạng thái</th>
                <th class="text-left py-4 px-4 font-semibold text-gray-700">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in recentContacts" :key="c.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="py-4 px-4 font-medium text-gray-900">{{ c.name }}</td>
                <td class="py-4 px-4 text-gray-600">{{ c.email }}</td>
                <td class="py-4 px-4 truncate max-w-[300px] text-gray-600">{{ c.subject || '—' }}</td>
                <td class="py-4 px-4">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="statusClass(c.status)">{{ statusLabel(c.status) }}</span>
                </td>
                <td class="py-4 px-4 text-sm text-gray-500">{{ formatDate(c.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Products by category (simple bar chart) -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 lg:col-span-2">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-900">📊 Sản phẩm theo danh mục</h2>
          <p class="text-sm text-gray-500 mt-1">Phân bố sản phẩm</p>
        </div>
        <div v-if="loading" class="text-gray-400 text-center py-8">Đang tải…</div>
        <div v-else class="space-y-5">
          <div v-for="cat in productsByCategory" :key="cat.id" class="group">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold text-gray-900">{{ cat.name }}</span>
              <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">{{ cat.productCount }}</span>
            </div>
            <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-3 bg-gradient-to-r from-primary to-primary-700 rounded-full transition-all duration-500 group-hover:shadow-lg"
                :style="{ width: computePercent(cat.productCount) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const loading = ref(true)
const stats = ref(null)
const topProducts = ref([])
const lowStock = ref([])
const recentContacts = ref([])
const productsByCategory = ref([])

const statCards = computed(() => [
  { title: 'Tổng sản phẩm', value: stats.value?.totalProducts ?? 0, icon: '📱' },
  { title: 'Danh mục', value: stats.value?.totalCategories ?? 0, icon: '🗂️' },
  { title: 'Người dùng', value: stats.value?.totalUsers ?? 0, icon: '👥' },
  { title: 'Liên hệ mới', value: stats.value?.unreadContacts ?? 0, icon: '✉️' },
  { title: 'Banners', value: stats.value?.totalBanners ?? 0, icon: '🖼️' },
  { title: 'Trang tĩnh', value: stats.value?.totalPages ?? 0, icon: '📄' },
  { title: 'Sản phẩm nổi bật', value: stats.value?.featuredProducts ?? 0, icon: '🌟' },
  { title: 'Tổng lượt xem', value: (stats.value?.totalViews ?? 0).toLocaleString(), icon: '🔍' }
])

const fetchData = async () => {
  try {
    const [statsRes, topRes, lowRes, contactRes, catRes] = await Promise.all([
      api.get('/dashboard/stats'),
      api.get('/dashboard/top-products?limit=8'),
      api.get('/dashboard/low-stock?threshold=8'),
      api.get('/dashboard/recent-contacts?limit=8'),
      api.get('/dashboard/products-by-category')
    ])

    stats.value = statsRes.data.data
    topProducts.value = topRes.data.data
    lowStock.value = lowRes.data.data
    recentContacts.value = contactRes.data.data
    productsByCategory.value = catRes.data.data
  } catch (e) {
    console.error('Load dashboard failed', e)
  } finally {
    loading.value = false
  }
}

const computePercent = (value) => {
  const max = Math.max(...productsByCategory.value.map(c => c.productCount), 1)
  return Math.round((value / max) * 100)
}

const statusClass = (status) => {
  const map = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-700',
    replied: 'bg-green-100 text-green-700',
    archived: 'bg-yellow-100 text-yellow-700'
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

const statusLabel = (status) => {
  const map = {
    new: '🆕 Mới',
    read: '👁️ Đã xem',
    replied: '✅ Đã trả lời',
    archived: '📦 Lưu trữ'
  }
  return map[status] || status
}

const formatCurrency = (n) => {
  if (n == null) return '—'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n)
}

const formatDate = (d) => new Date(d).toLocaleString('vi-VN')

onMounted(fetchData)
</script>

