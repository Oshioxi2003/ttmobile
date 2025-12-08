<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Menu</h1>
    </div>

    <!-- Search bar -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        class="input w-full"
        placeholder="Nhập từ khóa tìm kiếm..."
      />
    </div>

    <!-- Menu list -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <draggable
        v-model="nav"
        item-key="_key"
        handle=".drag-handle"
        ghost-class="opacity-50"
        class="divide-y divide-gray-200"
      >
        <template #item="{ element: item, index: idx }">
          <div class="group hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between px-4 py-3">
              <div class="flex items-center gap-3 flex-1">
                <span class="drag-handle cursor-move text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>
                  </svg>
                </span>
                <button
                  v-if="item.children && item.children.length > 0"
                  @click="toggleExpand(idx)"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-4 h-4 transition-transform"
                    :class="{ 'rotate-90': expandedItems[idx] }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <span v-else class="w-4"></span>
                <span class="font-medium text-gray-900">{{ item.label || 'Chưa có tên' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="openEditModal(item, idx)"
                  class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Sửa"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button
                  @click="removeNavItem(idx)"
                  class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Xóa"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Submenu items - Recursive -->
            <MenuNavbarItem
              v-if="item.children && item.children.length > 0 && expandedItems[idx]"
              :item="item"
              :parent-path="[idx]"
              :level="1"
              :expanded-items="expandedItems"
              @edit="(path) => openEditModalByPath(path)"
              @remove="(path) => removeItemByPath(path)"
              @toggle="(path) => toggleExpandByPath(path)"
            />
          </div>
        </template>
      </draggable>

      <div v-if="nav.length === 0" class="text-center py-12 text-gray-500">
        <p class="mb-4">Chưa có mục menu nào</p>
      </div>
    </div>

    <!-- Add button -->
    <div class="mt-4">
      <button
        type="button"
        class="btn btn-primary"
        @click="openAddModal"
      >
        + Thêm liên kết
      </button>
    </div>

    <!-- Edit/Add Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">{{ editingIndex !== null ? 'Sửa liên kết' : 'Thêm liên kết' }}</h2>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <!-- Tên -->
          <div>
            <label class="block text-sm font-medium mb-2">Tên *</label>
            <input
              v-model="modalForm.label"
              type="text"
              class="input w-full"
              placeholder="Nhập tên menu"
              required
            />
          </div>

          <!-- Liên kết -->
          <div>
            <label class="block text-sm font-medium mb-2">Liên kết</label>
            <div class="space-y-3">
              <!-- Link type dropdown -->
              <select
                v-model="modalForm.linkType"
                class="input w-full"
                @change="onLinkTypeChange"
              >
                <option value="home">Trang chủ</option>
                <option value="category">Danh mục sản phẩm</option>
                <option value="product">Sản phẩm</option>
                <option value="all_products">Tất cả sản phẩm</option>
                <option value="page">Trang nội dung</option>
                <option value="blog">Blog</option>
                <option value="search">Trang tìm kiếm</option>
                <option value="url">Địa chỉ web</option>
              </select>

              <!-- Category selector -->
              <div v-if="modalForm.linkType === 'category'">
                <select
                  v-model="modalForm.categorySlug"
                  class="input w-full"
                  @change="updatePathFromCategory"
                >
                  <option value="">Chọn danh mục</option>
                  <option
                    v-for="cat in allCategoriesFlat"
                    :key="cat.slug"
                    :value="cat.slug"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <!-- Page selector -->
              <div v-if="modalForm.linkType === 'page'">
                <select
                  v-model="modalForm.pageSlug"
                  class="input w-full"
                  @change="updatePathFromPage"
                >
                  <option value="">Chọn trang</option>
                  <option
                    v-for="page in allPages"
                    :key="page.slug"
                    :value="page.slug"
                  >
                    {{ page.title }}
                  </option>
                </select>
              </div>

              <!-- Product selector -->
              <div v-if="modalForm.linkType === 'product'">
                <input
                  v-model="productSearch"
                  type="text"
                  class="input w-full mb-2"
                  placeholder="Tìm kiếm sản phẩm..."
                  @input="searchProducts"
                />
                <select
                  v-model="modalForm.productId"
                  class="input w-full"
                  @change="updatePathFromProduct"
                >
                  <option value="">Chọn sản phẩm</option>
                  <option
                    v-for="product in filteredProducts"
                    :key="product.id"
                    :value="product.id"
                  >
                    {{ product.name }}
                  </option>
                </select>
              </div>

              <!-- URL input -->
              <div v-if="modalForm.linkType === 'url'">
                <input
                  v-model="modalForm.path"
                  type="url"
                  class="input w-full"
                  placeholder="https://example.com"
                />
              </div>

              <!-- Display path -->
              <div v-if="modalForm.path" class="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <strong>Đường dẫn:</strong> {{ modalForm.path }}
              </div>
            </div>
          </div>

          <!-- Alias -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Alias (tùy chọn)
            </label>
            <input
              v-model="modalForm.alias"
              type="text"
              class="input w-full"
              placeholder="tên alias ví dụ: shared-menu"
            />
            <p class="text-xs text-gray-500 mt-1">
              Alias này dùng để truy cập các thuộc tính của Menu trong Theme. Tìm hiểu thêm
            </p>
          </div>

          <!-- Parent menu selector -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Menu cha (tùy chọn)
            </label>
            <select
              v-model="modalForm.parentPath"
              class="input w-full"
            >
              <option :value="null">Không có (Menu chính)</option>
              <option
                v-for="item in availableParentMenus"
                :key="item._key + '-' + item.path.join('-')"
                :value="JSON.stringify(item.originalPath)"
              >
                {{ item.displayName }}
              </option>
            </select>
          </div>
        </div>

        <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            @click="closeModal"
            class="btn btn-secondary"
          >
            Hủy
          </button>
          <button
            @click="saveMenuItem"
            class="btn btn-primary"
            :disabled="saving || !modalForm.label"
          >
            <span v-if="saving">Đang lưu…</span>
            <span v-else>{{ editingIndex !== null ? 'Lưu thay đổi' : 'Hoàn thành' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'
import api from '@/services/api'
import MenuNavbarItem from './MenuNavbarItem.vue'

const saving = ref(false)
const nav = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const editingIndex = ref(null)
const editingChildIndex = ref(null)
const expandedItems = ref({})
const productSearch = ref('')
const filteredProducts = ref([])
const allPages = ref([])

const modalForm = reactive({
  label: '',
  path: '',
  linkType: 'home',
  categorySlug: '',
  pageSlug: '',
  productId: '',
  alias: '',
  parentIndex: null,
  parentPath: null
})

// Categories
const allCategories = ref([])

const loadCategories = async () => {
  try {
    const res = await api.get('/categories', { params: { includeInactive: true } })
    allCategories.value = res.data?.data || []
  } catch {
    allCategories.value = []
  }
}

const allCategoriesFlat = computed(() => {
  const out = []
  const walk = (arr = [], prefix = '') => {
    arr.forEach((c) => {
      const name = prefix ? `${prefix} / ${c.name}` : c.name
      out.push({ slug: c.slug, name, sortOrder: c.sortOrder ?? 999 })
      if (Array.isArray(c.children) && c.children.length) walk(c.children, name)
    })
  }
  walk(allCategories.value || [], '')
  return out.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
})

// Flatten all menu items for parent selection
const flattenMenuItems = (items, path = [], level = 0) => {
  const result = []
  items.forEach((item, idx) => {
    const currentPath = [...path, idx]
    result.push({
      ...item,
      path: currentPath,
      level,
      displayName: '  '.repeat(level) + (item.label || 'Chưa có tên')
    })
    if (item.children && item.children.length > 0) {
      result.push(...flattenMenuItems(item.children, currentPath, level + 1))
    }
  })
  return result
}

const availableParentMenus = computed(() => {
  const allItems = flattenMenuItems(nav.value)
  if (editingIndex.value === null && editingChildIndex.value === null) {
    return allItems.map(item => ({ ...item, originalPath: item.path }))
  }
  // Filter out current editing item and its children
  const editingPath = editingChildIndex.value !== null 
    ? [editingIndex.value, ...(Array.isArray(editingChildIndex.value) ? editingChildIndex.value : [editingChildIndex.value])]
    : [editingIndex.value]
  
  return allItems
    .map(item => ({ ...item, originalPath: item.path }))
    .filter(item => {
      // Don't allow selecting self or any descendant
      if (item.path.length <= editingPath.length) return true
      for (let i = 0; i < editingPath.length; i++) {
        if (item.path[i] !== editingPath[i]) return true
      }
      return false
    })
})

// Pages
const loadPages = async () => {
  try {
    const res = await api.get('/pages', { params: { isActive: true } })
    allPages.value = res.data?.data || res.data?.pages || []
  } catch {
    allPages.value = []
  }
}

// Products
const searchProducts = async () => {
  if (!productSearch.value || productSearch.value.length < 2) {
    filteredProducts.value = []
    return
  }
  try {
    const res = await api.get('/products', {
      params: { search: productSearch.value, limit: 20 }
    })
    filteredProducts.value = res.data?.data || res.data?.products || []
  } catch {
    filteredProducts.value = []
  }
}

const toggleExpand = (idx) => {
  expandedItems.value[idx] = !expandedItems.value[idx]
}

const toggleExpandByPath = (path) => {
  const key = path.join('-')
  expandedItems.value[key] = !expandedItems.value[key]
}

const getItemByPath = (path) => {
  let current = nav.value
  for (let i = 0; i < path.length; i++) {
    if (i === path.length - 1) {
      return current[path[i]]
    }
    current = current[path[i]].children
  }
  return null
}

const openEditModalByPath = (path) => {
  const item = getItemByPath(path)
  if (!item) return
  
  editingIndex.value = path[0]
  editingChildIndex.value = path.length > 1 ? path.slice(1) : null
  
  modalForm.label = item.label || ''
  modalForm.path = item.path || ''
  modalForm.alias = item.alias || ''
  
  // Determine link type
  if (item.path === '/') {
    modalForm.linkType = 'home'
  } else if (item.path === '/products') {
    modalForm.linkType = 'all_products'
  } else if (item.path === '/search') {
    modalForm.linkType = 'search'
  } else if (item.path === '/blog') {
    modalForm.linkType = 'blog'
  } else if (item.path?.startsWith('/collections/')) {
    modalForm.linkType = 'category'
    modalForm.categorySlug = item.path.replace('/collections/', '')
  } else if (item.path?.startsWith('/pages/')) {
    modalForm.linkType = 'page'
    modalForm.pageSlug = item.path.replace('/pages/', '')
  } else if (item.path?.startsWith('/products/')) {
    modalForm.linkType = 'product'
    const slug = item.path.replace('/products/', '')
    searchProducts()
  } else {
    modalForm.linkType = 'url'
  }
  
  // Set parent index
  if (path.length > 1) {
    const parentPath = path.slice(0, -1)
    if (parentPath.length === 1) {
      modalForm.parentIndex = parentPath[0]
    } else {
      // Nested parent - need to find in availableParentMenus
      modalForm.parentIndex = null // Will handle this differently
    }
  } else {
    modalForm.parentIndex = null
  }
  
  showModal.value = true
}

const removeItemByPath = (path) => {
  if (path.length === 1) {
    if (confirm('Xóa mục menu này?')) {
      nav.value.splice(path[0], 1)
      saveNav()
    }
  } else {
    if (confirm('Xóa mục menu này?')) {
      let current = nav.value
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]].children
      }
      current.splice(path[path.length - 1], 1)
      saveNav()
    }
  }
}

const onLinkTypeChange = () => {
  modalForm.path = ''
  modalForm.categorySlug = ''
  modalForm.pageSlug = ''
  modalForm.productId = ''
  
  switch (modalForm.linkType) {
    case 'home':
      modalForm.path = '/'
      break
    case 'all_products':
      modalForm.path = '/products'
      break
    case 'search':
      modalForm.path = '/search'
      break
    case 'blog':
      modalForm.path = '/blog'
      break
  }
}

const updatePathFromCategory = () => {
  if (modalForm.categorySlug) {
    modalForm.path = `/collections/${modalForm.categorySlug}`
  }
}

const updatePathFromPage = () => {
  if (modalForm.pageSlug) {
    modalForm.path = `/pages/${modalForm.pageSlug}`
  }
}

const updatePathFromProduct = () => {
  if (modalForm.productId) {
    const product = filteredProducts.value.find(p => p.id === modalForm.productId)
    if (product && product.slug) {
      modalForm.path = `/products/${product.slug}`
    }
  }
}

const openAddModal = () => {
  editingIndex.value = null
  editingChildIndex.value = null
  resetModalForm()
  showModal.value = true
}

const openEditModal = (item, idx, childIdx = null) => {
  editingIndex.value = idx
  editingChildIndex.value = childIdx
  
  modalForm.label = item.label || ''
  modalForm.path = item.path || ''
  modalForm.alias = item.alias || ''
  
  // Determine link type
  if (item.path === '/') {
    modalForm.linkType = 'home'
  } else if (item.path === '/products') {
    modalForm.linkType = 'all_products'
  } else if (item.path === '/search') {
    modalForm.linkType = 'search'
  } else if (item.path === '/blog') {
    modalForm.linkType = 'blog'
  } else if (item.path?.startsWith('/collections/')) {
    modalForm.linkType = 'category'
    modalForm.categorySlug = item.path.replace('/collections/', '')
  } else if (item.path?.startsWith('/pages/')) {
    modalForm.linkType = 'page'
    modalForm.pageSlug = item.path.replace('/pages/', '')
  } else if (item.path?.startsWith('/products/')) {
    modalForm.linkType = 'product'
    const slug = item.path.replace('/products/', '')
    // Try to find product
    searchProducts()
  } else {
    modalForm.linkType = 'url'
  }
  
  modalForm.parentIndex = childIdx === null ? null : idx
  
  showModal.value = true
}

const resetModalForm = () => {
  modalForm.label = ''
  modalForm.path = ''
  modalForm.linkType = 'home'
  modalForm.categorySlug = ''
  modalForm.pageSlug = ''
  modalForm.productId = ''
  modalForm.alias = ''
  modalForm.parentIndex = null
  modalForm.parentPath = null
  productSearch.value = ''
  filteredProducts.value = []
}

const closeModal = () => {
  showModal.value = false
  resetModalForm()
  editingIndex.value = null
  editingChildIndex.value = null
}

const saveMenuItem = async () => {
  if (!modalForm.label) return
  
  const menuItem = {
    label: modalForm.label,
    path: modalForm.path || '#',
    alias: modalForm.alias || undefined
  }
  
  if (editingChildIndex.value !== null && editingIndex.value !== null) {
    // Editing existing item
    const path = Array.isArray(editingChildIndex.value) 
      ? [editingIndex.value, ...editingChildIndex.value]
      : [editingIndex.value, editingChildIndex.value]
    
    let current = nav.value
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children
    }
    const existingItem = current[path[path.length - 1]]
    current[path[path.length - 1]] = {
      ...existingItem,
      ...menuItem
    }
  } else if (editingIndex.value !== null) {
    // Editing top level
    nav.value[editingIndex.value] = {
      ...nav.value[editingIndex.value],
      ...menuItem
    }
  } else {
    // Adding new
    menuItem._key = Date.now() + Math.random()
    menuItem.children = []
    
    if (modalForm.parentPath) {
      // Add as child at specified path
      const parentPath = JSON.parse(modalForm.parentPath)
      let current = nav.value
      for (let i = 0; i < parentPath.length; i++) {
        if (!current[parentPath[i]].children) {
          current[parentPath[i]].children = []
        }
        current = current[parentPath[i]].children
      }
      current.push(menuItem)
    } else {
      // Add as top level
      nav.value.push(menuItem)
    }
  }
  
  await saveNav()
  closeModal()
}

const removeNavItem = (idx) => {
  if (confirm('Xóa mục menu này?')) {
    nav.value.splice(idx, 1)
    saveNav()
  }
}

const removeChildItem = (parentIdx, childIdx) => {
  if (confirm('Xóa mục menu con này?')) {
    nav.value[parentIdx].children.splice(childIdx, 1)
    saveNav()
  }
}

// Recursive function to normalize menu items
const normalizeMenuItem = (item, idx = 0) => {
  const normalized = {
    _key: item._key ?? Date.now() + idx + Math.random(),
    label: item.label || '',
    path: item.path || '',
    alias: item.alias || '',
    children: Array.isArray(item.children) 
      ? item.children.map((child, cIdx) => normalizeMenuItem(child, idx + cIdx))
      : []
  }
  return normalized
}

const loadNav = async () => {
  try {
    const navRes = await api.get('/settings', { params: { group: 'nav' } })
    const raw = navRes?.data?.data?.nav_config || navRes?.data?.data?.navigation || '[]'
    const arr = JSON.parse(raw || '[]')
    nav.value = (Array.isArray(arr) ? arr : []).map((it, idx) => normalizeMenuItem(it, idx))
  } catch (err) {
    console.error('Load nav failed', err)
    nav.value = []
  }
}

const saveNav = async () => {
  try {
    saving.value = true
    const payload = {
      nav_config: { value: JSON.stringify(nav.value || []), group: 'nav' }
    }
    await api.put('/settings', payload)
    if (editingIndex.value === null) {
      alert('Lưu menu thành công!')
    }
  } catch (e) {
    alert('Lưu menu thất bại')
    console.error(e)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadNav(), loadCategories(), loadPages()])
})
</script>
