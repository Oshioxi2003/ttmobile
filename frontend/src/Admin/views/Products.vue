<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Quản lý sản phẩm</h1>
      <router-link to="/products/create" class="btn btn-primary">+ Thêm sản phẩm</router-link>
    </div>

    <!-- Search & Filter -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div class="flex flex-wrap gap-3 items-center">
        <input v-model="filters.search" type="text" class="input flex-1 min-w-[220px]" placeholder="Tìm kiếm theo tên, SKU...">
        <select v-model="filters.categoryId" class="input rounded-xl w-48 min-w-[180px]">
          <option value="">Tất cả danh mục</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
        <select v-model="filters.sortBy" class="input rounded-xl w-48 min-w-[180px]">
          <option value="newest">Mới nhất</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="popular">Bán chạy</option>
          <option value="name_asc">Tên A-Z</option>
        </select>
        <button class="btn btn-secondary !rounded-xl" @click="fetchProducts">Tìm kiếm</button>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="overflow-x-auto rounded-2xl border border-gray-100">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-100 bg-gray-50">
              <th class="text-left py-3 px-4">Hình ảnh</th>
              <th class="text-left py-3 px-4">Tên sản phẩm</th>
              <th class="text-left py-3 px-4">Giá</th>
              <th class="text-left py-3 px-4">Danh mục</th>
              <th class="text-left py-3 px-4">Tồn kho</th>
              <th class="text-left py-3 px-4">Trạng thái</th>
              <th class="text-left py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="py-6 text-center text-gray-500">Đang tải…</td>
            </tr>
            <tr v-for="p in products" :key="p.id" class="border-b hover:bg-gray-50">
              <td class="py-3 px-4">
                <img :src="p.thumbnail || '/images/placeholder.png'" class="w-12 h-12 rounded object-cover" alt="thumb">
              </td>
              <td class="py-3 px-4">
                <div class="font-medium">{{ p.name }}</div>
                <div class="text-xs text-gray-500">SKU: {{ p.sku || '—' }}</div>
                <div v-if="getMainSpecs(p).length > 0" class="text-xs text-gray-400 mt-1">
                  {{ getMainSpecs(p).join(' • ') }}
                </div>
              </td>
              <td class="py-3 px-4">{{ formatCurrency(p.price) }}</td>
              <td class="py-3 px-4">{{ p.category?.name || '—' }}</td>
              <td class="py-3 px-4">{{ p.stock }}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs" :class="p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                  {{ p.isActive ? 'Đang bán' : 'Ẩn' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex gap-3">
                  <router-link :to="`/products/${p.id}/edit`" class="text-blue-600 hover:text-blue-800">Sửa</router-link>
                  <button class="text-red-600 hover:text-red-800" @click="remove(p.id)">Xóa</button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && products.length === 0">
              <td colspan="7" class="py-6 text-center text-gray-500">Không có sản phẩm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4 pt-4 border-t">
        <p class="text-gray-600 text-sm">Trang {{ pagination.page }}/{{ pagination.totalPages }} • Tổng {{ pagination.total }}</p>
        <div class="flex gap-2">
          <button class="px-3 py-1 border rounded hover:bg-gray-100" :disabled="pagination.page<=1" @click="changePage(pagination.page-1)">Trước</button>
          <button class="px-3 py-1 border rounded hover:bg-gray-100" :disabled="pagination.page>=pagination.totalPages" @click="changePage(pagination.page+1)">Sau</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'

const loading = ref(true)
const products = ref([])
const categories = ref([])
const pagination = reactive({ page: 1, totalPages: 1, total: 0, limit: 12 })
const filters = reactive({ search: '', categoryId: '', sortBy: 'newest' })

const fetchCategories = async () => {
  try {
    const res = await api.get('/categories')
    categories.value = res.data.data || res.data
  } catch (e) {
    categories.value = []
  }
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      search: filters.search || undefined,
      categoryId: filters.categoryId || undefined,
      sortBy: filters.sortBy
    }
    const res = await api.get('/products', { params })
    products.value = res.data.data || res.data.products || []
    const p = res.data.pagination || res.data.meta || {}
    pagination.total = p.total || 0
    pagination.totalPages = p.totalPages || 1
  } catch (e) {
    console.error('Load products failed', e)
  } finally {
    loading.value = false
  }
}

const changePage = (p) => {
  pagination.page = Math.max(1, Math.min(p, pagination.totalPages))
  fetchProducts()
}

const remove = async (id) => {
  if (!confirm('Xóa sản phẩm này?')) return
  try {
    await api.delete(`/products/${id}`)
    fetchProducts()
  } catch (e) {
    alert('Xóa thất bại')
  }
}

const formatCurrency = (n) => {
  if (n == null) return '—'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n)
}

const getMainSpecs = (product) => {
  const specs = product.specs || product.specifications || {}
  const mainKeys = ['Màn hình', 'RAM', 'Bộ nhớ', 'CPU', 'Pin', 'Camera']
  const result = []
  for (const key of mainKeys) {
    if (specs[key]) {
      result.push(`${key}: ${specs[key]}`)
    }
  }
  // Limit to 3 specs max
  return result.slice(0, 3)
}

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})
</script>

