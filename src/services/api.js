import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

// Request interceptor for adding token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling 401 errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (email, password) => api.post('/login', { email, password }),
};

export const users = {
  list: (page = 1) => api.get(`/users?page=${page}`),
  get: id => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: id => api.delete(`/users/${id}`),
};