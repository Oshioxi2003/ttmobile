import api from './api'

export const categoryService = {
  // Lấy danh sách danh mục
  getCategories: () => {
    return api.get('/categories')
  },

  // Lấy chi tiết danh mục
  getCategoryById: (id) => {
    return api.get(`/categories/${id}`)
  },

  // Lấy danh mục theo slug
  getCategoryBySlug: (slug) => {
    return api.get(`/categories/slug/${slug}`)
  },

  // Lấy sản phẩm theo danh mục
  getCategoryProducts: (id, params = {}) => {
    return api.get(`/categories/${id}/products`, { params })
  }
}

export default categoryService

