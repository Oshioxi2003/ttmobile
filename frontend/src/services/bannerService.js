import api from './api'

/**
 * Helper to build FormData for banner create/update.
 * Handles nested objects and null values correctly.
 * @param {object} data - The banner data object.
 * @param {File|null} imageFile - The new image file, if any.
 * @returns {FormData}
 */
function buildBannerFormData(data, imageFile) {
  const formData = new FormData()

  // Append all fields from the data object
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key]
      if (value !== null && value !== undefined) {
        formData.append(key, value)
      }
    }
  }

  // Append the image file if it exists
  if (imageFile instanceof File) {
    formData.append('image', imageFile)
  } else if (data.image === '') {
    // Handle image removal by sending an empty string for the 'image' field
    formData.append('image', '')
  }

  return formData
}

export const bannerService = {
  // ADMIN: Get all banners with pagination/filtering
  getBanners: (params = {}) => {
    return api.get('/banners', { params })
  },

  // ADMIN: Get a single banner by ID
  getBannerById: (id) => {
    return api.get(`/banners/${id}`)
  },

  // ADMIN: Create a new banner
  createBanner: (bannerData, imageFile) => {
    const formData = buildBannerFormData(bannerData, imageFile)
    return api.post('/banners', formData)
  },

  // ADMIN: Update an existing banner
  updateBanner: (id, bannerData, imageFile) => {
    const formData = buildBannerFormData(bannerData, imageFile)
    // Use POST with _method=PUT for full multipart/form-data compatibility
    formData.append('_method', 'PUT')
    return api.post(`/banners/${id}`, formData)
  },

  // ADMIN: Delete a banner
  deleteBanner: (id) => {
    return api.delete(`/banners/${id}`)
  },

  // ADMIN: Update sort order for multiple banners
  updateSortOrder: (orders) => {
    // Expects an array of { id: number, sortOrder: number }
    return api.put('/banners/sort-order', { orders })
  },

  // PUBLIC: Get hero banners (no auth)
    getHeroBanners: () => {
    return api.get('/banners/hero', { skipAuthRedirect: true })
  },

  // PUBLIC: Get banners by position (no auth)
  getBannersByPosition: (position) => {
    return api.get(`/banners/position/${position}`, { skipAuthRedirect: true })
  }
}

export default bannerService

