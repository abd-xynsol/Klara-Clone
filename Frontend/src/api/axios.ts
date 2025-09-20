// import axios from 'axios'
// import { getToken, setToken, clearAuth } from '../stores/authStore'


// const api = axios.create({
// baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
// })


// // Attach token
// api.interceptors.request.use((config) => {
// const token = getToken()
// if (token) config.headers && (config.headers['Authorization'] = `Bearer ${token}`)
// return config
// })


// // Response interceptor for 401 handling (basic)
// api.interceptors.response.use(
// (res) => res,
// async (error) => {
// if (error.response?.status === 401) {
// // simple logout + redirect
// clearAuth()
// window.location.href = '/login/facility'
// }
// return Promise.reject(error)
// }
// )


// export default api

import axios from 'axios'
import { getToken, clearStoredAuth } from '../stores/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
})

// Attach token
api.interceptors.request.use((config: any) => {
  const token = getToken()
  config.headers = config.headers || {}
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

// Response interceptor for 401 handling (basic)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // logout and redirect
      clearStoredAuth()
      window.location.href = '/login/facility'
    }
    return Promise.reject(error)
  }
)

export default api
