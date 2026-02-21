import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Public API instance - token yubormaslik
export const publicApi = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - har bir request'ga token qo'shish
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - xatoliklarni qaytarish
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 xatolikda avtomatik logout qilmaslik
    // Chunki ba'zi public route'lar ham token yuborishi mumkin
    // Lekin bu xatolik bo'lmasligi kerak
    return Promise.reject(error)
  }
)

export default api
