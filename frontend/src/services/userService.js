import api from './api'

const userService = {
  getProfile: () => api.get('/auth/me'),
  updateProfile: (payload) => api.put('/auth/profile', payload),
  updatePassword: (payload) => api.post('/auth/change-password', payload),
  getAddresses: () => api.get('/auth/addresses'),
  addAddress: (payload) => api.post('/auth/addresses', payload),
  deleteAddress: (id) => api.delete(`/auth/addresses/${id}`)
}

export default userService

