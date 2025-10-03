import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('cliente');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    if (errors.general) {
      setErrors({ ...errors, general: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El usuario debe tener al menos 3 caracteres';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validación del lado del cliente
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const result = await login(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      // Manejar errores específicos del servidor
      const errorMessage = result.error;
      
      if (errorMessage.toLowerCase().includes('credenciales') || 
          errorMessage.toLowerCase().includes('credentials') ||
          errorMessage.toLowerCase().includes('invalid')) {
        setErrors({
          general: 'Usuario o contraseña incorrectos',
          username: 'Verifica tus credenciales',
          password: 'Verifica tus credenciales'
        });
      } else if (errorMessage.toLowerCase().includes('usuario') || 
                 errorMessage.toLowerCase().includes('user')) {
        setErrors({
          username: 'Este usuario no existe',
          general: 'Usuario no encontrado'
        });
      } else if (errorMessage.toLowerCase().includes('contraseña') || 
                 errorMessage.toLowerCase().includes('password')) {
        setErrors({
          password: 'Contraseña incorrecta',
          general: 'La contraseña no es correcta'
        });
      } else if (errorMessage.toLowerCase().includes('inactivo') || 
                 errorMessage.toLowerCase().includes('inactive')) {
        setErrors({
          general: 'Tu cuenta está inactiva. Contacta al administrador.'
        });
      } else {
        setErrors({
          general: errorMessage || 'Error al iniciar sesión. Intenta nuevamente.'
        });
      }
    }
    
    setLoading(false);
  };

  const handleUserTypeChange = (userType) => {
    setSelectedUserType(userType);
    setFormData({ username: '', password: '' });
    setErrors({});
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo-container">
          <div className="login-logo-image">
            <img 
              src="/logo.svg"
              alt="GymApp Logo" 
              className="login-logo-img"
            />
          </div>
          <h2 className="login-title">Iniciar Sesión</h2>
        </div>
        
        {/* Selector de tipo de usuario */}
        <div className="login-user-type-selector">
          <div className="login-user-types">
            <button
              type="button"
              className={`login-user-type ${selectedUserType === 'cliente' ? 'active' : ''}`}
              onClick={() => handleUserTypeChange('cliente')}
            >
              <span className="login-user-icon">👤</span>
              Cliente
            </button>
            <button
              type="button"
              className={`login-user-type ${selectedUserType === 'entrenador' ? 'active' : ''}`}
              onClick={() => handleUserTypeChange('entrenador')}
            >
              <span className="login-user-icon">💪</span>
              Entrenador
            </button>
            <button
              type="button"
              className={`login-user-type ${selectedUserType === 'administrador' ? 'active' : ''}`}
              onClick={() => handleUserTypeChange('administrador')}
            >
              <span className="login-user-icon">⚙️</span>
              Administrador
            </button>
          </div>
        </div>
        
        {/* Error general */}
        {errors.general && (
          <div className="login-error">
            <span className="login-error-icon">⚠️</span>
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`login-input ${errors.username ? 'error' : ''}`}
              placeholder="Ingresa tu usuario"
            />
            {errors.username && (
              <span className="login-field-error">{errors.username}</span>
            )}
          </div>

          <div className="login-input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`login-input ${errors.password ? 'error' : ''}`}
              placeholder="Ingresa tu contraseña"
            />
            {errors.password && (
              <span className="login-field-error">{errors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <>
                <span className="login-loading-spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <p className="login-register-link">
          ¿No tienes cuenta? <a href="/register" className="login-link">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;