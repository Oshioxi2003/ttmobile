<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Quản lý người dùng</h1>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <!-- Filters -->
      <div class="flex flex-wrap gap-3 mb-6 items-center">
        <input v-model="filters.search" type="text" class="input rounded-xl flex-1 min-w-[240px]" placeholder="Tìm kiếm theo tên, email, username">
        <button class="btn btn-secondary" @click="fetchUsers">Tìm kiếm</button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="text-left py-3 px-4">ID</th>
              <th class="text-left py-3 px-4">Họ tên</th>
              <th class="text-left py-3 px-4">Email</th>
              <th class="text-left py-3 px-4">Điện thoại</th>
              <th class="text-left py-3 px-4">Vai trò</th>
              <th class="text-left py-3 px-4">Trạng thái</th>
              <th class="text-left py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="py-6 text-center text-gray-500">Đang tải…</td>
            </tr>
            <tr v-for="u in users" :key="u.id" class="border-b hover:bg-gray-50">
              <td class="py-3 px-4">{{ u.id }}</td>
              <td class="py-3 px-4">
                <div class="font-medium">{{ u.fullName || u.username }}</div>
                <div class="text-xs text-gray-500">{{ u.username }}</div>
              </td>
              <td class="py-3 px-4">{{ u.email }}</td>
              <td class="py-3 px-4">{{ u.phone || '—' }}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs" :class="roleClass(u.role)">{{ (u.role || 'user').toUpperCase() }}</span>
              </td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 rounded-full text-xs" :class="u.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                  {{ u.isActive ? 'Hoạt động' : 'Đã khóa' }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex gap-2">
                  <button class="text-blue-600 hover:text-blue-800" @click="toggleRole(u)">{{ u.role === 'admin' ? 'Bỏ Admin' : 'Set Admin' }}</button>
                  <button class="text-red-600 hover:text-red-800" @click="toggleActive(u)">{{ u.isActive ? 'Khóa' : 'Mở khóa' }}</button>
                </div>
              </td>
            </tr>
            <tr v-if="!loading && users.length === 0">
              <td colspan="7" class="py-6 text-center text-gray-500">Không có người dùng</td>
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
const users = ref([])
const pagination = reactive({ page: 1, limit: 10, total: 0, totalPages: 1 })
const filters = reactive({ search: '' })

const roleClass = (role) => {
  const r = (role || 'user').toLowerCase()
  return r === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
}

const fetchUsers = async () => {
  loading.value = true
  try {
    const params = { page: pagination.page, limit: pagination.limit, search: filters.search || undefined }
    const res = await api.get('/users', { params })
    const result = res.data.data || {}
    users.value = result.users || []
    pagination.total = result.total || 0
    pagination.totalPages = result.totalPages || 1
  } catch (e) {
    console.error('Load users failed', e)
  } finally {
    loading.value = false
  }
}

const changePage = (p) => {
  pagination.page = Math.max(1, Math.min(p, pagination.totalPages))
  fetchUsers()
}

const toggleActive = async (u) => {
  const confirmMsg = u.isActive ? 'Khóa tài khoản này?' : 'Mở khóa tài khoản này?'
  if (!confirm(confirmMsg)) return
  try {
    await api.put(`/users/${u.id}`, { isActive: !u.isActive })
    fetchUsers()
  } catch (e) {
    alert('Cập nhật trạng thái thất bại')
  }
}

const toggleRole = async (u) => {
  const newRole = u.role === 'admin' ? 'user' : 'admin'
  if (!confirm(`Đổi vai trò thành ${newRole.toUpperCase()}?`)) return
  try {
    await api.put(`/users/${u.id}`, { role: newRole })
    fetchUsers()
  } catch (e) {
    alert('Cập nhật vai trò thất bại')
  }
}

onMounted(fetchUsers)
</script>

