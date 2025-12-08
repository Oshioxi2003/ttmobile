<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ isEdit ? 'Edit Banner' : 'Create New Banner' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Image Upload -->
        <div>
          <label class="form-label">Banner Image <span class="text-red-500">*</span></label>
          <div class="flex gap-4 items-start">
            <div v-if="imagePreview" class="flex-shrink-0 w-32 h-32 relative">
              <img :src="imagePreview" :alt="form.title" class="h-full w-full object-cover rounded border"/>
              <button type="button" @click="removeImage" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="flex-1">
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                ref="imageInput"
                @change="handleImageUpload"
                class="input-file"
              />
              <p class="text-xs text-gray-500 mt-2">PNG, JPG, WebP. Recommended size < 1MB.</p>
            </div>
          </div>
        </div>

        <!-- Title -->
        <div>
          <label for="banner-title" class="form-label">Title <span class="text-red-500">*</span></label>
          <input id="banner-title" v-model="form.title" type="text" class="input w-full" placeholder="e.g., iPhone 15 Pro Launch" required />
        </div>

        <!-- Subtitle -->
        <div>
          <label for="banner-subtitle" class="form-label">Subtitle</label>
          <input id="banner-subtitle" v-model="form.subtitle" type="text" class="input w-full" placeholder="e.g., Available Now!" />
        </div>

        <!-- Description -->
        <div>
          <label for="banner-description" class="form-label">Description</label>
          <textarea id="banner-description" v-model="form.description" class="input w-full" rows="3" placeholder="Optional detailed description..."></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Link URL -->
          <div>
            <label for="banner-link" class="form-label">Link URL</label>
            <input id="banner-link" v-model="form.link" type="url" class="input w-full" placeholder="/products/iphone-15 or https://..." />
          </div>

          <!-- Button Text -->
          <div>
            <label for="banner-buttonText" class="form-label">Button Text</label>
            <input id="banner-buttonText" v-model="form.buttonText" type="text" class="input w-full" placeholder="e.g., Shop Now" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Position -->
          <div>
            <label for="banner-position" class="form-label">Position <span class="text-red-500">*</span></label>
            <select id="banner-position" v-model="form.position" class="input w-full" required>
              <option value="hero">Hero (Main Banner)</option>
              <option value="right-small">Right Small Banner</option>
              <option value="category">Category Page</option>
              <option value="promo">Promo Section</option>
            </select>
          </div>

          <!-- Open in New Tab -->
          <div>
            <label for="banner-openInNewTab" class="form-label">Open Link in New Tab</label>
            <select id="banner-openInNewTab" v-model="form.openInNewTab" class="input w-full">
              <option :value="null">Auto (Recommended)</option>
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
            <p v-if="form.openInNewTab === null && isExternalLink" class="text-xs text-gray-500 mt-1">Hint: Link is external, will open in a new tab automatically.</p>
          </div>
        </div>

        <!-- Status -->
        <div>
          <label class="flex items-center cursor-pointer">
            <input v-model="form.isActive" type="checkbox" class="w-4 h-4 accent-primary" />
            <span class="ml-2 text-sm text-gray-700">Active</span>
          </label>
          <p class="text-xs text-gray-500 ml-6">Inactive banners will not be displayed on the website.</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-4 pt-4 border-t">
          <button type="button" @click="$emit('close')" class="btn btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" :disabled="submitting" class="btn btn-primary flex-1">
            {{ submitting ? 'Saving...' : 'Save Banner' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { resolveAssetUrl as asset } from '@/utils/assets'

const props = defineProps({
  banner: { type: Object, default: null },
  isEdit: { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'close'])

const getInitialForm = () => ({
  id: null,
  title: '',
  subtitle: '',
  description: '',
  image: '', // Stores existing image URL
  link: '',
  buttonText: '',
  position: 'hero',
  sortOrder: 0,
  isActive: true,
  openInNewTab: null
})

const form = ref(getInitialForm())
const imageFile = ref(null) // For new file uploads
const imagePreview = ref(null)
const submitting = ref(false)
const imageInput = ref(null)

const isExternalLink = computed(() => {
  const url = form.value.link
  return url && /^(https?|ftp):\/\//.test(url) && !url.includes(window.location.hostname)
})

watch(() => props.banner, (newBanner) => {
  if (newBanner) {
    form.value = { ...getInitialForm(), ...newBanner }
    imagePreview.value = newBanner.image ? asset(newBanner.image) : null
  } else {
    form.value = getInitialForm()
    imagePreview.value = null
  }
  imageFile.value = null
}, { immediate: true, deep: true })

const handleImageUpload = (e) => {
  const file = e.target.files?.[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (event) => {
      imagePreview.value = event.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  imageFile.value = null
  imagePreview.value = null
  form.value.image = '' // Signal to backend to remove image
  if (imageInput.value) {
    imageInput.value.value = '' // Reset file input
  }
}

const handleSubmit = async () => {
  if (!form.value.image && !imageFile.value) {
    alert('Please select an image for the banner.')
    return
  }

  submitting.value = true
  try {
    const dataToSave = { ...form.value }
    // The imageFile (File object) is passed separately to the parent
    emit('save', dataToSave, imageFile.value)
  } finally {
    // The parent component is responsible for setting submitting to false
  }
}

// Expose submitting ref to parent to control disabled state from outside
defineExpose({ submitting })
</script>

