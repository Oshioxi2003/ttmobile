<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Banner Management</h1>
      <button @click="openModal()" class="btn btn-primary">
        <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Banner
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Loading Banners...</p>
    </div>

    <!-- Banners Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full min-w-[800px]">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="table-header w-16"></th>
            <th class="table-header w-20">Image</th>
            <th class="table-header text-left">Title</th>
            <th class="table-header">Position</th>
            <th class="table-header">Link</th>
            <th class="table-header">Sort Order</th>
            <th class="table-header">Status</th>
            <th class="table-header">Last Updated</th>
            <th class="table-header">Actions</th>
          </tr>
        </thead>
        <draggable v-model="banners" tag="tbody" item-key="id" handle=".drag-handle" @end="handleSortUpdate">
          <template #item="{element: banner}">
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-2 text-center">
                <button class="drag-handle cursor-move text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
              </td>
              <td class="px-4 py-2">
                <img v-if="banner.image" :src="asset(banner.image)" :alt="banner.title" class="h-12 w-20 object-cover rounded"/>
              </td>
              <td class="px-4 py-2 font-semibold text-gray-900">{{ banner.title }}</td>
              <td class="px-4 py-2 text-center">
                <span class="badge-blue">{{ banner.position }}</span>
              </td>
              <td class="px-4 py-2 text-sm text-gray-600 truncate max-w-xs">
                <a :href="banner.link" target="_blank" class="hover:underline" v-if="banner.link">{{ banner.link }}</a>
              </td>
              <td class="px-4 py-2 text-center text-sm text-gray-600">{{ banner.sortOrder }}</td>
              <td class="px-4 py-2 text-center">
                <button @click="toggleStatus(banner)" :class="banner.isActive ? 'badge-green' : 'badge-red'">
                  {{ banner.isActive ? 'Active' : 'Inactive' }}
                </button>
              </td>
              <td class="px-4 py-2 text-center text-sm text-gray-600">{{ formatDate(banner.updatedAt) }}</td>
              <td class="px-4 py-2 text-center text-sm space-x-2">
                <button @click="openModal(banner)" class="btn-icon text-blue-600 hover:text-blue-800">Edit</button>
                <button @click="handleDelete(banner.id)" class="btn-icon text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </template>
        </draggable>
      </table>
      <div v-if="banners.length === 0" class="text-center py-12 text-gray-500">
        No banners found. Create your first banner!
      </div>
    </div>

    <!-- Modal -->
    <BannerModal
      v-if="showModal"
      :banner="editingBanner"
      :isEdit="!!editingBanner"
      @save="handleSave"
      @close="closeModal"
      ref="modalRef"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'
import bannerService from '@/services/bannerService'
import { resolveAssetUrl as asset } from '@/utils/assets'
import BannerModal from '../components/BannerModal.vue'

const banners = ref([])
const loading = ref(false)
const showModal = ref(false)
const editingBanner = ref(null)
const modalRef = ref(null) // Ref for the modal component

const fetchBanners = async () => {
  loading.value = true
  try {
    const res = await bannerService.getBanners({ sortBy: 'sortOrder', order: 'ASC' })
    banners.value = res.data?.data || []
  } catch (error) {
    console.error('Error fetching banners:', error)
    alert('Failed to load banners: ' + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}

const openModal = (banner = null) => {
  editingBanner.value = banner ? { ...banner } : null
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingBanner.value = null
}

const handleSave = async (bannerData, imageFile) => {
  const isEdit = !!bannerData.id
  try {
    console.log('Saving banner:', { bannerData, imageFile, isEdit })
    if (isEdit) {
      await bannerService.updateBanner(bannerData.id, bannerData, imageFile)
      alert('Banner updated successfully')
    } else {
      await bannerService.createBanner(bannerData, imageFile)
      alert('Banner created successfully')
    }
    closeModal()
    await fetchBanners()
  } catch (error) {
    console.error('Error saving banner:', error)
    console.error('Error response:', error.response?.data)
    alert('Failed to save banner: ' + (error.response?.data?.message || error.message))
    // Keep modal open by not setting submitting to false in the modal
    if (modalRef.value) {
      modalRef.value.submitting = false
    }
  }
}

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this banner?')) return
  try {
    await bannerService.deleteBanner(id)
    alert('Banner deleted successfully')
    banners.value = banners.value.filter(b => b.id !== id)
  } catch (error) {
    console.error('Error deleting banner:', error)
    alert('Failed to delete banner: ' + (error.response?.data?.message || error.message))
  }
}

const toggleStatus = async (banner) => {
  const originalStatus = banner.isActive
  banner.isActive = !banner.isActive // Optimistic update
  try {
    await bannerService.updateBanner(banner.id, { isActive: banner.isActive })
  } catch (error) {
    banner.isActive = originalStatus // Revert on failure
    console.error('Error updating banner status:', error)
    alert('Failed to update banner status')
  }
}

const handleSortUpdate = async () => {
  const newOrder = banners.value.map((banner, index) => ({
    id: banner.id,
    sortOrder: index + 1, // Re-calculate sort order based on new position
  }))

  // Update local sortOrder for immediate visual feedback
    banners.value.forEach((banner) => {
    banner.sortOrder = newOrder.find(o => o.id === banner.id).sortOrder
  })

  try {
    await bannerService.updateSortOrder(newOrder)
    // alert('Banner order updated successfully') // Optional: too noisy
  } catch (error) {
    console.error('Error updating banner order:', error)
    alert('Failed to save the new banner order. Please refresh.')
    await fetchBanners() // Re-fetch to get the correct order from server
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-CA')
}

onMounted(() => {
  fetchBanners()
})
</script>

<style scoped>
.drag-handle {
  cursor: move;
}
.table-header {
  @apply px-4 py-3 text-sm font-semibold text-gray-700;
}
.badge-green {
  @apply px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-800;
}
.badge-red {
  @apply px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-800;
}
.badge-blue {
  @apply px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold;
}
.btn-icon {
  @apply font-semibold transition-colors;
}
</style>

