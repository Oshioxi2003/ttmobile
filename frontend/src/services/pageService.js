import api from './api'

export const pageService = {
  // Lấy danh sách trang cho footer (grouped by column)
  getFooter: () => api.get('/pages/footer'),
  // Lấy trang theo slug (hỗ trợ nested slug)
  getBySlug: (slug) => api.get(`/pages/slug/${slug}`),
}

export default pageService

