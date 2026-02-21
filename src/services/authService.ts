import api from './api'

export interface LoginData {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  token: string
  user: {
    id: string
    fullName: string
    username: string
    role: string
  }
  paymentStatus?: any
}

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
  },
}
