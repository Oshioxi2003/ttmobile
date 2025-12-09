<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h1>
          <p class="text-gray-600 mt-2">{{ isEdit ? 'Cập nhật thông tin sản phẩm' : 'Tạo một sản phẩm mới' }}</p>
        </div>
        <router-link to="/products" class="text-gray-600 hover:text-gray-900 text-sm font-medium">
          ← Quay lại
        </router-link>
      </div>
    </div>

    <div class="max-w-5xl">
      <form @submit.prevent="handleSubmit" class="space-y-6">

        <!-- Basic Information Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span class="w-1 h-6 bg-blue-500 mr-3 rounded"></span>
            Thông tin cơ bản
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm *</label>
              <input v-model="form.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Nhập tên sản phẩm" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input v-model="form.slug" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="tên-sản-phẩm" @input="productSlugTouched = true">
              <p class="text-xs text-gray-500 mt-1">Tự động tạo từ tên sản phẩm. Có thể chỉnh sửa thủ công.</p>
            </div>
          </div>
        </div>

        <!-- Pricing & Category Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span class="w-1 h-6 bg-green-500 mr-3 rounded"></span>
            Giá & Danh mục
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Giá (VND) *</label>
              <input v-model.number="form.price" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" min="0" placeholder="0" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
              <div class="flex gap-2">
                <select v-model="form.categorySlug" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
                  <option value="">Chọn danh mục</option>
                  <option v-for="c in categories" :key="c.slug || c.id || c.name" :value="c.slug">{{ c.name }}</option>
                </select>
                <button
                  type="button"
                  @click="showAddCategoryModal = true"
                  class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 whitespace-nowrap"
                  title="Thêm danh mục mới"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span class="hidden md:inline">Thêm</span>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Thương hiệu</label>
              <input v-model="form.brand" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Apple, Samsung...">
            </div>
          </div>
        </div>

        <!-- Product Details Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span class="w-1 h-6 bg-purple-500 mr-3 rounded"></span>
            Chi tiết sản phẩm
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tình trạng</label>
              <select v-model="form.condition" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
                <option value="new">Mới 100%</option>
                <option value="like_new">Like New</option>
                <option value="good">Tốt</option>
                <option value="fair">Khá</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tồn kho</label>
              <input v-model.number="form.stock" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" min="0" placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nổi bật</label>
              <select v-model="form.isFeatured" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
                <option :value="false">Không</option>
                <option :value="true">Có</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
              <input v-model="form.color" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Trắng, Đen, Xanh...">
              <p class="text-xs text-gray-500 mt-1">Có thể nhập nhiều màu, cách nhau bởi dấu phẩy</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Dung lượng pin (%)</label>
              <input v-model.number="form.batteryHealth" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" min="0" max="100" placeholder="100">
              <p class="text-xs text-gray-500 mt-1">Tình trạng pin hiện tại (0-100%)</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bảo hành</label>
              <input v-model="form.warranty" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="12 tháng, 6 tháng...">
              <p class="text-xs text-gray-500 mt-1">VD: 12 tháng, 6 tháng chính hãng</p>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn</label>
              <textarea v-model="form.shortDescription" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" rows="3" placeholder="Mô tả ngắn gọn sản phẩm..."></textarea>
              <p class="text-xs text-gray-500 mt-1">{{ form.shortDescription.length }}/200 ký tự</p>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
                <button
                  type="button"
                  @click="editorExpanded = !editorExpanded"
                  class="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{{ editorExpanded ? 'Thu gọn' : 'Xem thêm' }}</span>
                  <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': editorExpanded }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
              <div 
                id="editorjs" 
                class="border border-gray-300 rounded-lg p-4 bg-white transition-all overflow-hidden"
                :class="editorExpanded ? 'min-h-[400px] max-h-[800px]' : 'min-h-[200px] max-h-[300px]'"
              ></div>
            </div>
          </div>
        </div>

        <!-- Specifications Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <span class="w-1 h-6 bg-indigo-500 mr-3 rounded"></span>
              Thông số kỹ thuật
            </h2>
            <button
              v-if="specKeys.length > 5"
              type="button"
              @click="specsExpanded = !specsExpanded"
              class="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>{{ specsExpanded ? 'Thu gọn' : `Xem thêm (${specKeys.length - 5})` }}</span>
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': specsExpanded }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          <div class="space-y-3">
            <div v-for="(key, idx) in displayedSpecs" :key="idx" class="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
              <input
                v-model="specKeys[idx]"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Tên thông số (VD: Màn hình)"
                @blur="updateSpecKey(idx, specKeys[idx])"
              >
              <span class="text-gray-400">:</span>
              <input
                v-model="specValues[idx]"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Giá trị (VD: 6.1 inch)"
                @blur="updateSpecValue(idx, specValues[idx])"
              >
              <button
                type="button"
                @click="removeSpec(idx)"
                class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>

            <button
              type="button"
              @click="addSpec"
              class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Thêm thông số
            </button>

            <p class="text-xs text-gray-500 mt-2">
              Thêm các thông số kỹ thuật của sản phẩm (VD: Màn hình, RAM, Bộ nhớ, CPU...)
            </p>
          </div>
        </div>

        <!-- Images Section -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span class="w-1 h-6 bg-orange-500 mr-3 rounded"></span>
            Hình ảnh
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Thumbnail -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Ảnh đại diện (Thumbnail)</label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer" @click="thumbInput?.click()">
                <input :key="thumbInputKey" type="file" accept="image/*" class="hidden" @change="onThumbSelected" ref="thumbInput">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-8l-4-4m0 0l-4 4m4-4v12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-gray-600 text-sm mt-2">{{ form.thumbnail ? 'Nhấp để đổi ảnh' : 'Nhấp để chọn ảnh' }}</p>
              </div>
              <div v-if="form.thumbnail" class="mt-4">
                <div class="relative inline-block">
                  <img :src="asset(form.thumbnail)" alt="thumbnail" class="w-32 h-32 object-cover rounded-lg border border-gray-200">
                  <button type="button" @click="form.thumbnail = ''" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600">
                    ×
                  </button>
                </div>
              </div>
            </div>

            <!-- Detail Images -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Ảnh chi tiết</label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer" @click="imagesInput?.click()">
                <input :key="imagesInputKey" type="file" multiple accept="image/*" class="hidden" @change="onImagesSelected" ref="imagesInput">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-8l-4-4m0 0l-4 4m4-4v12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-gray-600 text-sm mt-2">Nhấp để chọn thêm ảnh</p>
              </div>
              <div v-if="form.images.length > 0" class="mt-4 grid grid-cols-3 gap-3">
                <div v-for="(img, i) in form.images" :key="i" class="relative">
                  <img :src="asset(img)" :alt="`image-${i}`" class="w-full h-24 object-cover rounded-lg border border-gray-200">
                  <button type="button" @click="form.images.splice(i, 1)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600">
                    ×
                  </button>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-2">{{ form.images.length }} ảnh đã tải</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pt-4">
          <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2" :disabled="saving">
            <svg v-if="!saving" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span v-if="saving">Đang lưu…</span>
            <span v-else>{{ isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}</span>
          </button>
          <router-link to="/products" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Hủy
          </router-link>
        </div>
      </form>
    </div>

    <!-- Add Category Modal -->
    <div v-if="showAddCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="showAddCategoryModal = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold text-gray-900">Thêm danh mục mới</h3>
            <button
              type="button"
              @click="showAddCategoryModal = false"
              class="text-gray-400 hover:text-gray-600 transition"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleCreateCategory" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tên danh mục *</label>
              <input
                v-model="newCategory.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Nhập tên danh mục"
                required
                :disabled="creatingCategory"
              >
            </div>

            <!-- Slug -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                v-model="newCategory.slug"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="ví dụ: iphone, samsung, xiaomi"
                required
                :disabled="creatingCategory"
                @input="onCategorySlugInput"
              >
              <p class="text-xs text-gray-500 mt-1">Slug là đường dẫn không dấu, viết thường, dùng dấu gạch ngang giữa các từ.</p>
            </div>


            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả (tùy chọn)</label>
              <textarea
                v-model="newCategory.description"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                rows="3"
                placeholder="Mô tả danh mục..."
                :disabled="creatingCategory"
              ></textarea>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                :disabled="creatingCategory"
              >
                <svg v-if="creatingCategory" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span v-if="creatingCategory">Đang tạo...</span>
                <span v-else>Tạo danh mục</span>
              </button>
              <button
                type="button"
                @click="showAddCategoryModal = false"
                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                :disabled="creatingCategory"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { resolveAssetUrl as asset } from '@/utils/assets'
import Editor from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import Paragraph from '@editorjs/paragraph'
import InlineCode from '@editorjs/inline-code'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  slug: '',
  price: 0,
  categorySlug: '',
  brand: '',
  condition: 'new',
  stock: 0,
  isFeatured: false,
  shortDescription: '',
  description: '',
  thumbnail: '',
  images: [],
  specs: {},
  color: '',
  batteryHealth: 100,
  warranty: ''
})

const categories = ref([])
const saving = ref(false)
const thumbInput = ref(null)
const imagesInput = ref(null)
const thumbInputKey = ref(0)
const imagesInputKey = ref(0)
const showAddCategoryModal = ref(false)
const creatingCategory = ref(false)
const newCategory = reactive({
  name: '',
  slug: '',
  description: ''
})

let editor = null

const specKeys = ref([])
const specValues = ref([])
const specsExpanded = ref(false)
const editorExpanded = ref(false)

const displayedSpecs = computed(() => {
  if (specsExpanded.value || specKeys.value.length <= 5) {
    return specKeys.value
  }
  return specKeys.value.slice(0, 5)
})

const addSpec = () => {
  const newKey = `Thông số ${specKeys.value.length + 1}`
  form.specs[newKey] = ''
  specKeys.value.push(newKey)
  specValues.value.push('')
}

const removeSpec = (index) => {
  const key = specKeys.value[index]
  delete form.specs[key]
  specKeys.value.splice(index, 1)
  specValues.value.splice(index, 1)
}

const updateSpecKey = (index, newKey) => {
  if (!newKey || newKey.trim() === '') {
    removeSpec(index)
    return
  }
  const oldKey = specKeys.value[index]
  if (oldKey !== newKey) {
    const value = form.specs[oldKey]
    delete form.specs[oldKey]
    form.specs[newKey] = value
    specKeys.value[index] = newKey
  }
}

const updateSpecValue = (index, newValue) => {
  const key = specKeys.value[index]
  if (key) {
    form.specs[key] = newValue || ''
    specValues.value[index] = newValue || ''
  }
}

const initSpecs = () => {
  specKeys.value = Object.keys(form.specs)
  specValues.value = Object.values(form.specs)
}

const fetchCategories = async () => {
  try {
    const res = await api.get('/categories')
    categories.value = res.data.data || []
  } catch (e) {
    categories.value = []
  }
}

// Utilities for slug handling (Vietnamese friendly)
const slugTouched = ref(false)
const productSlugTouched = ref(false)
const slugify = (str = '') => {
  return (str || '')
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Auto-generate slug while user hasn't edited slug manually
watch(() => newCategory.name, (val) => {
  if (!slugTouched.value || !newCategory.slug) {
    newCategory.slug = slugify(val)
  }
})

// Auto-generate product slug from product name
watch(() => form.name, (val) => {
  if (!productSlugTouched.value || !form.slug) {
    form.slug = slugify(val)
  }
})

const onCategorySlugInput = (e) => {
  slugTouched.value = true
  const val = e?.target?.value ?? newCategory.slug
  newCategory.slug = slugify(val)
}

const handleCreateCategory = async () => {
  if (!newCategory.name || !newCategory.name.trim()) {
    alert('Vui lòng nhập tên danh mục')
    return
  }
  if (!newCategory.slug || !newCategory.slug.trim()) {
    newCategory.slug = slugify(newCategory.name)
  }
  if (!newCategory.slug) {
    alert('Vui lòng nhập slug hợp lệ')
    return
  }

  try {
    creatingCategory.value = true
    const payload = {
      name: newCategory.name.trim(),
      slug: slugify(newCategory.slug),
      description: newCategory.description?.trim() || ''
    }

    const res = await api.post('/categories', payload)
    const createdCategory = res.data?.data || res.data

    // Refresh categories list
    await fetchCategories()

    // Try to select the newly created category by id or slug
    const match = categories.value.find(c => (createdCategory?.slug && c.slug === createdCategory.slug) || (newCategory.slug && c.slug === newCategory.slug))
    if (match && match.slug) {
      form.categorySlug = match.slug
    } else if (createdCategory?.slug) {
      form.categorySlug = createdCategory.slug
    } else if (newCategory.slug) {
      form.categorySlug = newCategory.slug
    }

    // Reset form and close modal
    newCategory.name = ''
    newCategory.slug = ''
    newCategory.description = ''
    showAddCategoryModal.value = false

    alert('Tạo danh mục thành công!')
  } catch (e) {
    const errorMsg = e.response?.data?.error || e.response?.data?.message || e.message || 'Tạo danh mục thất bại'
    alert(errorMsg)
  } finally {
    creatingCategory.value = false
  }
}

const load = async () => {
  if (!isEdit.value) {
    initEditor();
    return;
  }
  const { data } = await api.get(`/products/${route.params.id}`)
  const p = data.data
  form.name = p.name
  form.slug = p.slug
  form.price = Number(p.price || 0)
  form.categorySlug = p.categorySlug || p?.category?.slug || ''
  form.brand = p.brand || ''
  form.condition = p.condition || 'new'
  form.stock = p.stock || 0
  form.shortDescription = p.shortDescription || ''
  form.description = p.description || ''
  form.thumbnail = p.thumbnail || ''
  form.images = Array.isArray(p.images) ? p.images : []
  // Load specs - support both 'specs' and 'specifications' field names
  form.specs = p.specs || p.specifications || {}
  form.color = p.color || ''
  form.batteryHealth = p.batteryHealth ?? 100
  form.warranty = p.warranty || ''
  initSpecs()

  let editorData = null;
  try {
    editorData = JSON.parse(p.description);
  } catch (e) {
    editorData = { blocks: p.description ? [{ type: 'paragraph', data: { text: p.description } }] : [] };
  }
  initEditor(editorData);
}

const uploadFile = async (file) => {
  // Optional client-side size/type validation
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  if (file.size > MAX_SIZE) {
    throw new Error('File quá lớn (tối đa 10MB)')
  }

  // Check if file is actually an image
  if (!file.type.startsWith('image/')) {
    throw new Error('File không phải là ảnh hợp lệ')
  }

  try {
    const fd = new FormData()
    fd.append('image', file)
    
    const res = await api.post('/upload/single?type=products', fd, { 
      headers: { 
        'Content-Type': 'multipart/form-data' 
      } 
    })
    
    // Handle different response formats from backend
    const url = res.data?.data?.url || res.data?.url || res.data?.data?.path || res.data?.data
    
    if (!url) {
      console.error('Upload response:', res.data)
      throw new Error('Không nhận được URL từ server')
    }
    
    return url
  } catch (err) {
    console.error('Upload error:', err.response?.data || err.message)
    throw new Error(err.response?.data?.message || err.response?.data?.error || 'Upload thất bại')
  }
}

const onThumbSelected = async (e) => {
  const input = e.target
  const file = input.files?.[0]
  if (!file) {
    input.value = ''
    return
  }
  try {
    const url = await uploadFile(file)
    if (url) form.thumbnail = url
  } catch (err) {
    alert('Tải ảnh thất bại')
  } finally {
    // reset input to allow selecting the same file again
    input.value = ''
    thumbInputKey.value++
  }
}

const onImagesSelected = async (e) => {
  const input = e.target
  const files = Array.from(input.files || [])
  for (const f of files) {
    try {
      const url = await uploadFile(f)
      if (url) form.images.push(url)
    } catch (_) {}
  }
  // reset to allow re-selecting the same files
  input.value = ''
  imagesInputKey.value++
}

const handleSubmit = async () => {
  try {
    saving.value = true

    if (editor) {
      const savedData = await editor.save();
      form.description = JSON.stringify(savedData);
    }

    // Sync specs from specKeys and specValues before submit
    const syncedSpecs = {}
    for (let i = 0; i < specKeys.value.length; i++) {
      const key = specKeys.value[i]?.trim()
      const value = specValues.value[i]?.trim()
      if (key && value) {
        syncedSpecs[key] = value
      }
    }
    form.specs = syncedSpecs

    const payload = { ...form }
    
    // Convert categorySlug to categoryId for backend
    if (payload.categorySlug) {
      const category = categories.value.find(c => c.slug === payload.categorySlug)
      if (category) {
        payload.categoryId = category.id
      }
    }
    delete payload.categorySlug

    // Convert specs to specifications for backend compatibility
    if (payload.specs) {
      payload.specifications = payload.specs
      delete payload.specs
    }
    if (isEdit.value) {
      await api.put(`/products/${route.params.id}`, payload)
    } else {
      await api.post('/products', payload)
    }
    router.push('/products')
  } catch (e) {
    console.error('Save error:', e);
    alert('Lưu thất bại')
  } finally {
    saving.value = false
  }
}

const initEditor = (data = { blocks: [] }) => {
  if (editor) {
    editor.destroy();
  }
  editor = new Editor({
    holder: 'editorjs',
    tools: {
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      header: Header,
      list: List,
      quote: Quote,
      delimiter: Delimiter,
      table: Table,
      embed: Embed,
      inlineCode: InlineCode,
      image: {
        class: ImageTool,
        config: {
          uploader: {
            uploadByFile: async (file) => {
              try {
                console.log('Uploading file:', file.name, file.type, file.size)
                const url = await uploadFile(file);
                console.log('Upload successful, URL:', url)
                
                return {
                  success: 1,
                  file: {
                    url: url
                  },
                };
              } catch (error) {
                console.error('Upload error in ImageTool:', error);
                // Show error to user
                alert(error.message || 'Upload ảnh thất bại')
                return {
                  success: 0,
                  message: error.message || 'Upload failed'
                };
              }
            },
            uploadByUrl: async (url) => {
              // Optional: support uploading by URL
              return {
                success: 1,
                file: {
                  url: url
                }
              };
            }
          },
        },
      },
    },
    data: data,
    placeholder: 'Viết mô tả chi tiết ở đây...',
    defaultBlock: 'paragraph',
    onReady: () => {
      console.log('Editor.js is ready to work!')
    },
    onChange: async (api, event) => {
      // Optional: track changes
      console.log('Editor content changed', event)
    }
  });
};

onMounted(async () => {
  await fetchCategories()
  await load()
  // Initialize specs if empty
  if (Object.keys(form.specs).length === 0) {
    initSpecs()
  }
})
</script>

