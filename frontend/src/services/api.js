import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Don't override Content-Type for FormData (multipart/form-data)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor + light retry for rate limits
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status
    const config = error?.config || {}
    const reqUrl = config.url || ''

    // Auto retry on 429/503/502 with exponential backoff (max 3 retries)
    const noRetry = config.__noRetry === true
    const shouldRetry = !noRetry && ([429, 502, 503].includes(status) || error?.code === 'ECONNABORTED')
    if (shouldRetry && !config.__isRetryRequest) {
      config.__isRetryRequest = true
      config.__retryCount = (config.__retryCount || 0) + 1
      const maxRetries = 3
      if (config.__retryCount <= maxRetries) {
        const retryAfter = Number(error?.response?.headers?.['retry-after'])
        const baseDelay = 300
        const delay = Number.isFinite(retryAfter)
          ? retryAfter * 1000
          : baseDelay * Math.pow(2, config.__retryCount - 1)
        await new Promise((r) => setTimeout(r, delay))
        return api(config)
      }
    }

    // Không redirect khi đang gọi API đăng nhập để hiển thị lỗi đúng
    const isLoginRequest = /\/auth\/login/i.test(reqUrl)

    // Handle 401 Unauthorized
    if (status === 401 && !isLoginRequest) {
      // Không redirect nếu request công khai hoặc không có token
      const skip = config?.skipAuthRedirect === true
      const hasToken = !!localStorage.getItem('token')
      if (!hasToken || skip) {
        return Promise.reject(error)
      }
      localStorage.removeItem('token')
      const currentPath = window.location.pathname || ''
      const isAdminApp = currentPath.startsWith('/admin')
      window.location.href = isAdminApp ? '/admin/login' : '/login'
      return Promise.reject(error)
    }

    // Handle 403 Forbidden
    if (status === 403) {
      const currentPath = window.location.pathname || ''
      const isAdminApp = currentPath.startsWith('/admin')
      if (!isAdminApp) {
        window.location.href = '/403'
      }
      return Promise.reject(error)
    }

    // Handle 500 Server Error
    if (status === 500) {
      const currentPath = window.location.pathname || ''
      const isAdminApp = currentPath.startsWith('/admin')
      const isAlreadyOnErrorPage = currentPath.includes('/500')
      if (!isAdminApp && !isAlreadyOnErrorPage) {
        window.location.href = '/500'
      }
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default api

