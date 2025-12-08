import api from './api'

/**
 * Service for managing home page customizable sections
 * - Featured Products
 * - Promo Banners
 */
export const homePageService = {
  // PUBLIC: Get all featured product sections
  getFeaturedProducts: () => {
    return api.get('/home/featured-products', { skipAuthRedirect: true })
  },

  // PUBLIC: Get promo banners
  getPromoBanners: () => {
    return api.get('/home/promo-banners', { skipAuthRedirect: true })
  },

  // ADMIN: Create featured product section
  createFeaturedProduct: (data) => {
    return api.post('/home/featured-products', data)
  },

  // ADMIN: Update featured product section
  updateFeaturedProduct: (id, data) => {
    return api.put(`/home/featured-products/${id}`, data)
  },

  // ADMIN: Delete featured product section
  deleteFeaturedProduct: (id) => {
    return api.delete(`/home/featured-products/${id}`)
  },

  // ADMIN: Create promo banner
  createPromoBanner: (data) => {
    return api.post('/home/promo-banners', data)
  },

  // ADMIN: Update promo banner
  updatePromoBanner: (id, data) => {
    return api.put(`/home/promo-banners/${id}`, data)
  },

  // ADMIN: Delete promo banner
  deletePromoBanner: (id) => {
    return api.delete(`/home/promo-banners/${id}`)
  },

  // ADMIN: Update sort order for featured products
  updateFeaturedProductsOrder: (orders) => {
    return api.put('/home/featured-products/sort-order', { orders })
  },

  // ADMIN: Update sort order for promo banners
  updatePromoBannersOrder: (orders) => {
    return api.put('/home/promo-banners/sort-order', { orders })
  }
}

export default homePageService

