import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('cliente');
  
  const { login } = useAuth();
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

    const result = await login(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleUserTypeChange = (userType) => {
    setSelectedUserType(userType);
    setFormData({ username: '', password: '' });
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo-container">
          {/* Logo placeholder - aquí puedes poner tu logo real */}
          <div className="login-logo-image">
            <img 
              src="/logo.svg"           // Ruta relativa desde public
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
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="login-input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Ingresa tu contraseña"
            />
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