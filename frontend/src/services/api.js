import axios from 'axios';

// Obtener la URL del backend desde las variables de entorno
// Si no existe, usar localhost como fallback para desarrollo
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

console.log('🌐 API Base URL:', API_BASE_URL);

// Configuración base de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos de timeout
});

// Interceptor para incluir token en las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.message);
    
    // Si el error es de red (no hay conexión al backend)
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      console.error('🔴 Error de red: No se puede conectar al servidor');
      alert('No se puede conectar al servidor. Verifica tu conexión a internet y que el backend esté funcionando.');
      return Promise.reject({
        response: {
          data: {
            detail: 'Error de conexión con el servidor'
          },
          status: 0
        }
      });
    }
    
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
    try {
      const response = await api.post('/auth/login/', credentials);
      if (response.data.tokens) {
        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register/', userData);
      if (response.data.tokens) {
        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
      }
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Siempre limpiar el localStorage, aunque falle la petición
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }
};

export default api;