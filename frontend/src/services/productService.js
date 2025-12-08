import api from './api'

export const productService = {
  // Lấy danh sách sản phẩm
  getProducts: (params = {}) => {
    return api.get('/products', { params })
  },

  // Lấy chi tiết sản phẩm
  getProductById: (id) => {
    return api.get(`/products/${id}`)
  },

  // Lấy sản phẩm nổi bật
  getFeaturedProducts: (limit = 10) => {
    return api.get('/products', {
      params: { isFeatured: true, limit }
    })
  },

  // Lấy sản phẩm theo danh mục
  getProductsByCategory: (categoryId, params = {}) => {
    return api.get('/products', {
      params: { categoryId, ...params }
    })
  },

  // Lấy sản phẩm theo thương hiệu
  getProductsByBrand: (brand, params = {}) => {
    return api.get('/products', {
      params: { brand, ...params }
    })
  },

  // Tìm kiếm sản phẩm
  searchProducts: (query, params = {}) => {
    return api.get('/products', {
      params: { search: query, ...params }
    })
  },

  // Lấy sản phẩm theo slug
  getProductBySlug: (slug) => {
    return api.get(`/products/slug/${slug}`)
  },

  // Lấy sản phẩm liên quan
  getRelatedProducts: (productId, limit = 5) => {
    return api.get(`/products/${productId}/related`, {
      params: { limit }
    })
  },

  // Lấy sản phẩm với bộ lọc nâng cao
  getProductsWithFilters: (filters = {}) => {
    return api.get('/products', { params: filters })
  },

  // Lấy danh sách thương hiệu
  getBrands: () => {
    return api.get('/products/brands')
  },

  // Lấy danh sách giá (min/max)
  getPriceRange: () => {
    return api.get('/products/price-range')
  }
}

export default productService

