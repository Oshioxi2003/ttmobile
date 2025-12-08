<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Trang tĩnh</h1>
      <router-link to="/pages/create" class="btn btn-primary rounded-lg">+ Tạo trang</router-link>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex gap-4 mb-4">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="onlyFooter" /> Chỉ hiển thị footer
        </label>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="text-left py-3 px-4">Tiêu đề</th>
              <th class="text-left py-3 px-4">Slug</th>
              <th class="text-left py-3 px-4">Hiện ở footer</th>
              <th class="text-left py-3 px-4">Cột</th>
              <th class="text-left py-3 px-4">Thứ tự</th>
              <th class="text-left py-3 px-4">Trạng thái</th>
              <th class="text-left py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="py-6 text-center text-gray-500">Đang tải…</td>
            </tr>
            <tr v-for="p in pages" :key="p.id" class="border-b hover:bg-gray-50">
              <td class="py-3 px-4">{{ p.title }}</td>
              <td class="py-3 px-4 text-gray-600">/{{ p.slug }}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs" :class="p.showInFooter ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                  {{ p.showInFooter ? 'Có' : 'Không' }}
                </span>
              </td>
              <td class="py-3 px-4">{{ p.footerColumn || '—' }}</td>
              <td class="py-3 px-4">{{ p.footerOrder }}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs" :class="p.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'">
                  {{ p.isActive ? 'Hoạt động' : 'Ẩn' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex gap-3">
                  <router-link :to="`/pages/${p.id}/edit`" class="text-blue-600 hover:text-blue-800">Sửa</router-link>
                  <button class="text-red-600 hover:text-red-800" @click="remove(p.id)">Xóa</button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && pages.length === 0">
              <td colspan="7" class="py-6 text-center text-gray-500">Chưa có trang nào</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/services/api'

const loading = ref(true)
const pages = ref([])
const onlyFooter = ref(false)

const fetchPages = async () => {
  loading.value = true
  try {
    const params = {}
    if (onlyFooter.value) params.showInFooter = true
    const res = await api.get('/pages', { params })
    pages.value = res.data.data
  } catch (e) {
    console.error('Load pages failed', e)
  } finally {
    loading.value = false
  }
}

const remove = async (id) => {
  if (!confirm('Xóa trang này?')) return
  try {
    await api.delete(`/pages/${id}`)
    await fetchPages()
  } catch (e) {
    alert('Xóa thất bại')
  }
}

watch(onlyFooter, fetchPages)

onMounted(fetchPages)
</script>

