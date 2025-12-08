<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">{{ isEdit ? 'Chỉnh sửa' : 'Tạo' }} trang</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Tiêu đề</label>
            <input v-model="form.title" type="text" class="input rounded-xl" placeholder="Giới thiệu" required>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Slug</label>
            <input v-model="form.slug" type="text" class="input rounded-xl" placeholder="about">
            <p class="text-xs text-gray-500 mt-1">Nếu để trống sẽ tự sinh từ tiêu đề</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Nội dung</label>
            <EditorJs v-model="form.content" placeholder="Nhập nội dung trang..." />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Hiển thị ở footer</label>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" v-model="form.showInFooter"> Hiển thị
          </label>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Cột footer</label>
            <select v-model="form.footerColumn" class="input rounded-xl">
              <option value="">—</option>
              <option value="about">Về chúng tôi</option>
              <option value="policy">Chính sách</option>
              <option value="support">Hỗ trợ</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Thứ tự</label>
            <input v-model.number="form.footerOrder" type="number" class="input rounded-xl" min="0">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Trạng thái</label>
          <select v-model="form.isActive" class="input rounded-xl">
            <option :value="true">Hoạt động</option>
            <option :value="false">Ẩn</option>
          </select>
        </div>

        <div class="flex gap-3">
          <button class="btn btn-primary !rounded-xl" @click="submit">{{ isEdit ? 'Cập nhật' : 'Tạo mới' }}</button>
          <router-link to="/pages" class="btn btn-secondary !rounded-xl">Hủy</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import EditorJs from '../components/EditorJs.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)

const form = reactive({
  title: '',
  slug: '',
  content: { time: Date.now(), blocks: [], version: '2.28.2' },
  showInFooter: false,
  footerColumn: 'policy',
  footerOrder: 0,
  isActive: true
})

const defaultEditorData = () => ({ time: Date.now(), blocks: [], version: '2.28.2' })

function normalizeEditorContent(raw) {
  if (!raw) return defaultEditorData()

  // If server returns string, try JSON.parse, else wrap as paragraph
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      return normalizeEditorContent(parsed)
    } catch (_) {
      return {
        time: Date.now(),
        version: '2.28.2',
        blocks: [
          { type: 'paragraph', data: { text: String(raw) } }
        ]
      }
    }
  }

  // If it's an array, assume it's blocks
  if (Array.isArray(raw)) {
    return { time: Date.now(), version: '2.28.2', blocks: raw }
  }

  // Ensure object with blocks
  const data = { ...raw }
  if (!Array.isArray(data.blocks)) data.blocks = []

  // Migrate invalid paragraph blocks
  data.blocks = data.blocks.map((b) => {
    if (!b || typeof b !== 'object') {
      return { type: 'paragraph', data: { text: String(b ?? '') } }
    }
    const type = b.type || 'paragraph'
    const d = b.data || {}
    if (type === 'paragraph') {
      // Accept common alternative fields
      let text = d.text ?? d.content ?? d.html ?? ''
      if (typeof text !== 'string') text = String(text ?? '')
      return { type: 'paragraph', data: { text } }
    }
    return { type, data: d }
  })

  if (!data.time) data.time = Date.now()
  if (!data.version) data.version = '2.28.2'
  return data
}

const load = async () => {
  if (!isEdit.value) return
  const { data } = await api.get(`/pages/${route.params.id}`)
  const serverData = data.data || {}
  Object.assign(form, serverData)
  // Normalize editor content to avoid EditorJS warnings
  form.content = normalizeEditorContent(serverData.content)
}

const submit = async () => {
  try {
    const payload = { ...form, content: form.content || defaultEditorData() }
    if (isEdit.value) {
      await api.put(`/pages/${route.params.id}`, payload)
    } else {
      await api.post('/pages', payload)
    }
    router.push('/pages')
  } catch (e) {
    alert('Lưu thất bại')
  }
}

onMounted(load)
</script>

