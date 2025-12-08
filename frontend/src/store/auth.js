import { defineStore } from 'pinia'
import api from '@/services/api'

const AUTH_LOGIN_PATH = import.meta.env.VITE_AUTH_LOGIN_PATH || '/auth/login'
const AUTH_ME_PATH = import.meta.env.VITE_AUTH_ME_PATH || '/auth/me'
const AUTH_REGISTER_PATH = import.meta.env.VITE_AUTH_REGISTER_PATH || '/auth/register'
const USER_FIELD_KEY = import.meta.env.VITE_AUTH_USER_FIELD || 'email' // ví dụ: 'email' | 'username' | 'identifier'
const PASS_FIELD_KEY = import.meta.env.VITE_AUTH_PASS_FIELD || 'password'

function extractAuthPayload(res) {
  const root = res?.data ?? res
  const data = root?.data ?? root
  // Chuẩn hoá các kiểu trả về token phổ biến
  const token = data?.token || data?.accessToken || data?.access_token || data?.jwt
  // Chuẩn hoá user
  const user = data?.user || data?.profile || data?.data || null
  return { token, user }
}

function buildLoginPayload(credentials) {
  // Tự động map trường đăng nhập theo cấu hình
  const payload = {}
  const idVal = credentials?.email ?? credentials?.username ?? credentials?.identifier
  payload[USER_FIELD_KEY] = credentials?.[USER_FIELD_KEY] ?? idVal
  payload[PASS_FIELD_KEY] = credentials?.[PASS_FIELD_KEY] ?? credentials?.password
  return payload
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  getters: {
    getUser: (state) => state.user,
    isAdmin: (state) => {
      const role = state.user?.role
      if (!role) return false
      if (typeof role === 'string') return role.toLowerCase() === 'admin'
      if (typeof role === 'object' && role?.name) return role.name.toLowerCase() === 'admin'
      const roles = state.user?.roles
      if (Array.isArray(roles)) {
        return roles.some(r => (typeof r === 'string' ? r : r?.name)?.toString().toLowerCase() === 'admin')
      }
      return false
    }
  },

  actions: {
    async login(credentials) {
      try {
        const payload = buildLoginPayload(credentials)
        const response = await api.post(AUTH_LOGIN_PATH, payload)
        let { token, user } = extractAuthPayload(response)

        if (!token) {
          throw new Error('Token not found in response')
        }

        // Lưu token trước để có thể gọi /me nếu cần
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem('token', token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Nếu login không trả user, thử gọi /me
        if (!user) {
          try {
            const meRes = await api.get(AUTH_ME_PATH)
            user = meRes.data?.data || meRes.data?.user || null
          } catch (_) {
            // ignore
          }
        }
        this.user = user

        return { success: true }
      } catch (error) {
        // Reset state khi lỗi
        this.user = null
        this.token = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']

        const backendMsg = error.response?.data?.message || error.response?.data?.error || error.message
        return {
          success: false,
          message: backendMsg || 'Đăng nhập thất bại'
        }
      }
    },

    async register(userData) {
      try {
        await api.post(AUTH_REGISTER_PATH, userData)
        return { success: true }
      } catch (error) {
        const backendMsg = error.response?.data?.message || error.response?.data?.error || error.message
        return {
          success: false,
          message: backendMsg || 'Đăng ký thất bại'
        }
      }
    },

    async fetchUser() {
      try {
        const response = await api.get(AUTH_ME_PATH)
        // backend có thể trả về {data: user} hoặc {user}
        this.user = response.data?.data || response.data?.user || null
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }
})

