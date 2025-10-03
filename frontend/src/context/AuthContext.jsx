import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
        } catch (error) {
          // Si el token es inválido, limpiar todo
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Error de login' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || error.message || 'Error de registro' 
      };
    }
  };

  const logout = async () => {
    try {
      // Intentar hacer logout en el servidor
      await authAPI.logout();
    } catch (error) {
      console.error('Error en logout del servidor:', error);
      // Continuar con el logout local aunque falle el servidor
    } finally {
      // CRÍTICO: Limpiar TODO el estado local
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      
      // Forzar recarga completa de la página para limpiar cualquier estado residual
      window.location.href = '/login';
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};