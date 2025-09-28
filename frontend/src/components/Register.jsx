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
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password_confirm) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(typeof result.error === 'object' ? 
        Object.values(result.error).flat().join(', ') : 
        result.error
      );
    }
    
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Logo Section */}
        <div className="register-logo-container">
          <h2 className="register-title">Únete a GymApp</h2>
          <p className="register-subtitle">Crea tu cuenta y comienza tu entrenamiento</p>
        </div>
        
        {error && <div className="register-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-row">
            <div className="register-input-group">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="register-input"
                placeholder="Nombre"
              />
            </div>

            <div className="register-input-group">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="register-input"
                placeholder="Apellido"
              />
            </div>
          </div>

          <div className="register-input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Nombre de usuario"
            />
          </div>

          <div className="register-input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Correo electrónico"
            />
          </div>

          <div className="register-row">
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

            <div className="register-input-group">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="register-select"
              >
                <option value="cliente">Cliente</option>
                <option value="entrenador">Entrenador</option>
              </select>
            </div>
          </div>

          <div className="register-row">
            <div className="register-input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="register-input"
                placeholder="Contraseña"
              />
            </div>

            <div className="register-input-group">
              <input
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                className="register-input"
                placeholder="Confirmar contraseña"
              />
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
            ) : 'Crear Cuenta'}
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