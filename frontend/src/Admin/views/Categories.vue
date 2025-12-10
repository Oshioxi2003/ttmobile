<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Quản lý danh mục</h1>
      <button @click="openAddModal" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Thêm danh mục
      </button>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="aspect-square bg-gray-100 flex items-center justify-center p-6">
          <img
            v-if="category.image"
            :src="asset(category.image)"
            :alt="category.name"
            class="w-full h-full object-contain"
          />
          <div v-else class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2">{{ category.name }}</h3>
          <p v-if="category.slug" class="text-sm text-gray-500 mb-3">/{{ category.slug }}</p>
          <div class="flex items-center justify-between">
            <span :class="category.isActive ? 'text-green-600' : 'text-gray-400'" class="text-sm font-medium">
              {{ category.isActive ? 'Hiển thị' : 'Ẩn' }}
            </span>
            <div class="flex gap-2">
              <button
                @click="openEditModal(category)"
                class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Sửa"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button
                @click="deleteCategory(category.id)"
                class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Xóa"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="categories.length === 0" class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
      </svg>
      <p class="text-gray-500">Chưa có danh mục nào</p>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ isEditMode ? 'Sửa danh mục' : 'Thêm danh mục mới' }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveCategory" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tên danh mục *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="input w-full"
              placeholder="VD: Điện thoại, Tablet, Laptop..."
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
            <input
              v-model="form.slug"
              type="text"
              class="input w-full"
              placeholder="VD: phone, tablet, laptop..."
            />
            <p class="text-xs text-gray-500 mt-1">Để trống để tự động tạo từ tên</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ảnh danh mục hiện tại</label>
            <div v-if="form.image" class="mb-2">
              <img :src="asset(form.image)" alt="Image" class="w-16 h-16 object-contain border rounded p-2" />
            </div>
            <input
              type="file"
              accept="image/*"
              @change="onImageChange"
              class="input w-full"
            />
            <p class="text-xs text-gray-500 mt-1">PNG, JPG hoặc SVG (tối đa 2MB)</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="input w-full"
              placeholder="Mô tả ngắn về danh mục..."
            />
          </div>

          <div class="flex items-center">
            <input
              v-model="form.isActive"
              type="checkbox"
              id="isActive"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label for="isActive" class="ml-2 text-sm text-gray-700">Hiển thị danh mục</label>
          </div>

          <div class="flex gap-3 pt-4 border-t">
            <button type="submit" class="btn btn-primary flex-1" :disabled="loading">
              {{ loading ? 'Đang lưu...' : 'Lưu danh mục' }}
            </button>
            <button type="button" @click="closeModal" class="btn btn-secondary">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import categoryService from '@/services/categoryService'
import { resolveAssetUrl as asset } from '@/utils/assets'

const categories = ref([])
const showModal = ref(false)
const isEditMode = ref(false)
const loading = ref(false)
const imageFile = ref(null)

const form = ref({
  id: null,
  name: '',
  slug: '',
  image: '',
  description: '',
  isActive: true
})

const loadCategories = async () => {
  try {
    const response = await categoryService.getCategories()
    // Backend returns { success: true, data: [...] }
    categories.value = response.data.data || []
  } catch (error) {
    console.error('Failed to load categories:', error)
    alert('Không thể tải danh sách danh mục')
  }
}

const openAddModal = () => {
  isEditMode.value = false
  form.value = {
    id: null,
    name: '',
    slug: '',
    image: '',
    description: '',
    isActive: true
  }
  imageFile.value = null
  showModal.value = true
}

const openEditModal = (category) => {
  isEditMode.value = true
  form.value = {
    id: category.id,
    name: category.name,
    slug: category.slug || '',
    image: category.image || '',
    description: category.description || '',
    isActive: category.isActive !== false
  }
  imageFile.value = null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  form.value = {
    id: null,
    name: '',
    slug: '',
    image: '',
    description: '',
    isActive: true
  }
  imageFile.value = null
}

const onImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('File quá lớn! Vui lòng chọn file nhỏ hơn 2MB')
      event.target.value = ''
      return
    }
    imageFile.value = file
  }
}

const saveCategory = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    if (form.value.slug) formData.append('slug', form.value.slug)
    if (form.value.description) formData.append('description', form.value.description)
    formData.append('isActive', form.value.isActive ? '1' : '0')
    
    if (imageFile.value) {
      formData.append('image', imageFile.value)
    }

    if (isEditMode.value) {
      await categoryService.updateCategory(form.value.id, formData)
      alert('Cập nhật danh mục thành công!')
    } else {
      await categoryService.createCategory(formData)
      alert('Thêm danh mục thành công!')
    }

    closeModal()
    await loadCategories()
  } catch (error) {
    console.error('Failed to save category:', error)
    alert(error.response?.data?.message || 'Không thể lưu danh mục')
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return

  try {
    await categoryService.deleteCategory(id)
    alert('Xóa danh mục thành công!')
    await loadCategories()
  } catch (error) {
    console.error('Failed to delete category:', error)
    alert(error.response?.data?.message || 'Không thể xóa danh mục')
  }
}

onMounted(() => {
  loadCategories()
})
</script>
