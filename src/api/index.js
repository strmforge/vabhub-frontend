import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
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

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理错误响应
    if (error.response?.status === 401) {
      // 认证失败，清除token并跳转到登录页
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

// API方法
export default {
  // 认证相关
  auth: {
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData),
    getMe: () => api.get('/api/auth/me'),
    logout: () => api.post('/api/auth/logout')
  },
  
  // 媒体相关
  media: {
    list: (params) => api.get('/api/media', { params }),
    get: (id) => api.get(`/api/media/${id}`),
    create: (data) => api.post('/api/media', data),
    update: (id, data) => api.put(`/api/media/${id}`, data),
    delete: (id) => api.delete(`/api/media/${id}`),
    scan: () => api.post('/api/media/scan'),
    stats: () => api.get('/api/media/stats')
  },
  
  // 插件相关
  plugins: {
    list: () => api.get('/api/plugins'),
    install: (pluginId) => api.post(`/api/plugins/${pluginId}/install`),
    uninstall: (pluginId) => api.post(`/api/plugins/${pluginId}/uninstall`),
    config: (pluginId) => api.get(`/api/plugins/${pluginId}/config`),
    updateConfig: (pluginId, config) => api.put(`/api/plugins/${pluginId}/config`, config)
  },
  
  // 系统相关
  system: {
    stats: () => api.get('/api/system/stats'),
    settings: () => api.get('/api/system/settings'),
    updateSettings: (settings) => api.put('/api/system/settings', settings),
    backup: () => api.post('/api/system/backup'),
    logs: () => api.get('/api/system/logs')
  }
}