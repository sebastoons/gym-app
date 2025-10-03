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
    role: 'cliente'
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Mínimo 8 caracteres');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Incluye una mayúscula');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Incluye una minúscula');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Incluye un número');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Incluye un carácter especial');
    }

    return { score, feedback };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validar fortaleza de contraseña en tiempo real
    if (name === 'password') {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: null });
    }
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Validar nombre
    if (!formData.first_name.trim()) {
      errors.first_name = 'El nombre es requerido';
    } else if (formData.first_name.length < 2) {
      errors.first_name = 'Mínimo 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.first_name)) {
      errors.first_name = 'Solo letras permitidas';
    }
    
    // Validar apellido
    if (!formData.last_name.trim()) {
      errors.last_name = 'El apellido es requerido';
    } else if (formData.last_name.length < 2) {
      errors.last_name = 'Mínimo 2 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.last_name)) {
      errors.last_name = 'Solo letras permitidas';
    }
    
    // Validar username
    if (!formData.username.trim()) {
      errors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      errors.username = 'Mínimo 3 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Solo letras, números y guión bajo';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Formato de email inválido';
    }
    
    // Validar teléfono (si se proporciona)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[0-9+\s()-]{8,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Formato de teléfono inválido';
      }
    }
    
    // Validar contraseña con requisitos específicos
    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
    } else {
      const passwordErrors = [];
      
      if (formData.password.length < 8) {
        passwordErrors.push('mínimo 8 caracteres');
      }
      if (!/[A-Z]/.test(formData.password)) {
        passwordErrors.push('una mayúscula');
      }
      if (!/[a-z]/.test(formData.password)) {
        passwordErrors.push('una minúscula');
      }
      if (!/[0-9]/.test(formData.password)) {
        passwordErrors.push('un número');
      }
      
      if (passwordErrors.length > 0) {
        errors.password = `Debe contener: ${passwordErrors.join(', ')}`;
      }
    }
    
    // Validar confirmación de contraseña
    if (!formData.password_confirm) {
      errors.password_confirm = 'Confirma tu contraseña';
    } else if (formData.password !== formData.password_confirm) {
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
      setError('Por favor corrige los errores en el formulario');
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
          
          // Mapear errores comunes del backend
          if (key === 'username') {
            if (errorText.toLowerCase().includes('already') || errorText.toLowerCase().includes('existe')) {
              backendErrors.username = 'Este usuario ya está registrado';
              errorMessages.push('El nombre de usuario ya existe');
            } else {
              backendErrors.username = errorText;
              errorMessages.push(errorText);
            }
          } else if (key === 'email') {
            if (errorText.toLowerCase().includes('already') || errorText.toLowerCase().includes('existe')) {
              backendErrors.email = 'Este email ya está registrado';
              errorMessages.push('El email ya está en uso');
            } else {
              backendErrors.email = errorText;
              errorMessages.push(errorText);
            }
          } else if (key === 'password') {
            backendErrors.password = errorText;
            errorMessages.push(`Contraseña: ${errorText}`);
          } else {
            backendErrors[key] = errorText;
            errorMessages.push(errorText);
          }
        });
        
        setFieldErrors(backendErrors);
        setError(errorMessages.join('. '));
      } else {
        setError(result.error || 'Error al registrar. Intenta nuevamente.');
      }
    }
    
    setLoading(false);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return '#e53e3e';
    if (passwordStrength.score <= 3) return '#ed8936';
    if (passwordStrength.score <= 4) return '#ecc94b';
    return '#38a169';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return 'Muy débil';
    if (passwordStrength.score <= 3) return 'Débil';
    if (passwordStrength.score <= 4) return 'Buena';
    return 'Fuerte';
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="login-logo-image">
          <img 
            src="/logo.svg"
            alt="GymApp Logo" 
            className="login-logo-img"
          />
        </div>

        {/* Mostrar error general solo si no hay errores de campos específicos */}
      {error && Object.keys(fieldErrors).length === 0 && (
        <div className="register-error">
          <span className="register-error-icon">⚠️</span>
          {error}
        </div>
      )}
      
      {/* Mostrar resumen de errores si hay múltiples */}
      {Object.keys(fieldErrors).length > 0 && (
        <div className="register-error-list">
          <div className="register-error-header">
            <span className="register-error-icon">⚠️</span>
            <strong>Por favor corrige los siguientes errores:</strong>
          </div>
          <ul className="register-error-items">
            {Object.entries(fieldErrors).map(([field, message]) => (
              <li key={field}>
                <strong>{getFieldLabel(field)}:</strong> {message}
              </li>
            ))}
          </ul>
        </div>
      )}
        
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
              className={`register-input ${fieldErrors.phone ? 'error' : ''}`}
              placeholder="Teléfono (opcional)"
            />
            {fieldErrors.phone && (
              <span className="register-field-error">{fieldErrors.phone}</span>
            )}
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
                placeholder="Contraseña"
              />
              {formData.password && (
                <div className="password-strength-indicator">
                  <div 
                    className="password-strength-bar"
                    style={{
                      width: `${(passwordStrength.score / 5) * 100}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  ></div>
                  <span 
                    className="password-strength-text"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
              {passwordStrength.feedback.length > 0 && formData.password && (
                <div className="password-requirements">
                  {passwordStrength.feedback.map((req, idx) => (
                    <span key={idx} className="password-requirement">• {req}</span>
                  ))}
                </div>
              )}
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