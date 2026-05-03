import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jobportal_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const unwrap = (response) => response.data

export const authApi = {
  register: (payload) => api.post('/register', payload).then(unwrap),
  login: (payload) => api.post('/login', payload).then(unwrap),
  logout: () => api.post('/logout').then(unwrap),
  me: () => api.get('/me').then(unwrap),
}

export const jobsApi = {
  list: (params) => api.get('/jobs', { params }).then(unwrap),
  show: (jobId) => api.get(`/jobs/${jobId}`).then(unwrap),
  create: (payload) => api.post('/jobs', payload).then(unwrap),
  update: (jobId, payload) => api.put(`/jobs/${jobId}`, payload).then(unwrap),
  remove: (jobId) => api.delete(`/jobs/${jobId}`).then(unwrap),
}

export const applicationsApi = {
  apply: (formData) =>
    api.post('/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(unwrap),
  list: () => api.get('/applications').then(unwrap),
}

export default api