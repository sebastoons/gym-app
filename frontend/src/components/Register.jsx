import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    phone: '',
    role: 'cliente' // Por defecto cliente
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: null });
    }
    // Limpiar error general
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Validar nombre
    if (!formData.first_name.trim()) {
      errors.first_name = 'El nombre es requerido';
    }
    
    // Validar apellido
    if (!formData.last_name.trim()) {
      errors.last_name = 'El apellido es requerido';
    }
    
    // Validar username
    if (!formData.username.trim()) {
      errors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      errors.username = 'Mínimo 3 caracteres';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Formato de email inválido';
    }
    
    // Validar contraseña
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      errors.password = 'Mínimo 8 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (formData.password !== formData.password_confirm) {
      errors.password_confirm = 'Las contraseñas no coinciden';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Validación del lado del cliente
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Por favor corrige los errores');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      // Manejar errores del servidor
      if (typeof result.error === 'object') {
        const backendErrors = {};
        let errorMessages = [];
        
        Object.keys(result.error).forEach(key => {
          const errorValue = result.error[key];
          const errorText = Array.isArray(errorValue) ? errorValue.join(', ') : errorValue;
          
          // Mapear errores comunes
          if (key === 'username') {
            backendErrors.username = 'Usuario ya registrado';
            errorMessages.push('El nombre de usuario ya existe');
          } else if (key === 'email') {
            backendErrors.email = 'Email ya registrado';
            errorMessages.push('El email ya está en uso');
          } else {
            backendErrors[key] = errorText;
            errorMessages.push(errorText);
          }
        });
        
        setFieldErrors(backendErrors);
        setError(errorMessages.join('. '));
      } else {
        setError(result.error || 'Error al registrar');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Logo Section */}
        <div className="login-logo-image">
          <img 
            src="/logo.svg"
            alt="GymApp Logo" 
            className="login-logo-img"
          />
        </div>

        {error && <div className="register-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="register-form">
          {/* Selector de Rol */}
          <div className="register-role-selector">
            <label className="register-label">¿Cómo te vas a registrar?</label>
            <div className="register-role-options">
              <label className={`register-role-option ${formData.role === 'cliente' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="cliente"
                  checked={formData.role === 'cliente'}
                  onChange={handleChange}
                />
                <div className="register-role-card">
                  <div className="register-role-icon">👤</div>
                  <h3>Cliente</h3>
                  <p>Acceso a clases y servicios del gimnasio</p>
                </div>
              </label>

              <label className={`register-role-option ${formData.role === 'entrenador' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="entrenador"
                  checked={formData.role === 'entrenador'}
                  onChange={handleChange}
                />
                <div className="register-role-card">
                  <div className="register-role-icon">💪</div>
                  <h3>Entrenador</h3>
                  <p>Gestión de clases y seguimiento de clientes</p>
                </div>
              </label>
            </div>
          </div>

          <div className="register-row">
            <div className="register-input-group">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className={`register-input ${fieldErrors.first_name ? 'error' : ''}`}
                placeholder="Nombre"
              />
              {fieldErrors.first_name && (
                <span className="register-field-error">{fieldErrors.first_name}</span>
              )}
            </div>

            <div className="register-input-group">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className={`register-input ${fieldErrors.last_name ? 'error' : ''}`}
                placeholder="Apellido"
              />
              {fieldErrors.last_name && (
                <span className="register-field-error">{fieldErrors.last_name}</span>
              )}
            </div>
          </div>

          <div className="register-input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={`register-input ${fieldErrors.username ? 'error' : ''}`}
              placeholder="Nombre de usuario"
            />
            {fieldErrors.username && (
              <span className="register-field-error">{fieldErrors.username}</span>
            )}
          </div>

          <div className="register-input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`register-input ${fieldErrors.email ? 'error' : ''}`}
              placeholder="Correo electrónico"
            />
            {fieldErrors.email && (
              <span className="register-field-error">{fieldErrors.email}</span>
            )}
          </div>

          <div className="register-input-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="register-input"
              placeholder="Teléfono (opcional)"
            />
          </div>

          <div className="register-row">
            <div className="register-input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`register-input ${fieldErrors.password ? 'error' : ''}`}
                placeholder="Contraseña (mín. 8)"
              />
              {fieldErrors.password && (
                <span className="register-field-error">{fieldErrors.password}</span>
              )}
            </div>

            <div className="register-input-group">
              <input
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                className={`register-input ${fieldErrors.password_confirm ? 'error' : ''}`}
                placeholder="Confirmar contraseña"
              />
              {fieldErrors.password_confirm && (
                <span className="register-field-error">{fieldErrors.password_confirm}</span>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="register-button"
          >
            {loading ? (
              <span>
                <span className="register-loading-spinner"></span>
                Creando cuenta...
              </span>
            ) : `Registrarse como ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`}
          </button>
        </form>

        <p className="register-login-link">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="register-link">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;