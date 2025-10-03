import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Configuración base de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir token en las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (no autorizado), limpiar todo y redirigir
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Solo redirigir si no estamos ya en login o register
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Funciones de autenticación
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
    }
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
    } finally {
      // Siempre limpiar el localStorage, aunque falle la petición
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile/');
    return response.data;
  }
};

export default api;