import api from './api'

export const authService = {
  // Đăng nhập
  login: (email, password) => {
    return api.post('/auth/login', { email, password })
  },

  // Đăng ký
  register: (userData) => {
    return api.post('/auth/register', userData)
  },

  // Đăng xuất
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return Promise.resolve()
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: () => {
    return api.get('/auth/me')
  },

  // Cập nhật thông tin người dùng
  updateProfile: (userData) => {
    return api.put('/auth/profile', userData)
  },

  // Đổi mật khẩu
  changePassword: (oldPassword, newPassword) => {
    return api.post('/auth/change-password', { oldPassword, newPassword })
  },

  // Lấy token từ localStorage
  getToken: () => {
    return localStorage.getItem('token')
  },

  // Lưu token vào localStorage
  setToken: (token) => {
    localStorage.setItem('token', token)
  },

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
}

export default authService

