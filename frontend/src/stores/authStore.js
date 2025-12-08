import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email, password) => {
    try {
      loading.value = true
      error.value = null
      const res = await authService.login(email, password)
      const { token: newToken, user: userData } = res.data?.data || {}
      
      if (newToken) {
        token.value = newToken
        user.value = userData
        authService.setToken(newToken)
        localStorage.setItem('user', JSON.stringify(userData))
      }
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Đăng nhập thất bại'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    try {
      loading.value = true
      error.value = null
      const res = await authService.register(userData)
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Đăng ký thất bại'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    authService.logout()
  }

  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (e) {
        console.error('Error parsing stored user:', e)
      }
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    loadUserFromStorage
  }
})

