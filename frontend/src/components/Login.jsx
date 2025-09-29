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
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
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

  const handleAdminQuickLogin = () => {
    setFormData({
      username: 'admin',
      password: 'admin123'
    });
    setIsAdminLogin(true);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo-container">
          <div className="login-logo">🏋️‍♂️</div>
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">Accede a tu cuenta de GymApp</p>
        </div>
        
        {/* Selector de tipo de usuario */}
        <div className="login-user-type-selector">
          <div className="login-user-types">
            <button
              type="button"
              className={`login-user-type ${!isAdminLogin ? 'active' : ''}`}
              onClick={() => {
                setIsAdminLogin(false);
                setFormData({ username: '', password: '' });
                setError('');
              }}
            >
              <span className="login-user-icon">👤</span>
              Cliente / Entrenador
            </button>
            <button
              type="button"
              className={`login-user-type ${isAdminLogin ? 'active' : ''}`}
              onClick={() => {
                setIsAdminLogin(true);
                setFormData({ username: 'admin', password: 'admin123' });
                setError('');
              }}
            >
              <span className="login-user-icon">⚙️</span>
              Administrador
            </button>
          </div>
        </div>

        {isAdminLogin && (
          <div className="login-admin-notice">
            <p>🔐 <strong>Acceso de Administrador</strong></p>
            <p>Credenciales pre-cargadas para acceso administrativo</p>
          </div>
        )}
        
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
              placeholder={isAdminLogin ? "admin (pre-cargado)" : "Ingresa tu usuario"}
              readOnly={isAdminLogin}
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
              placeholder={isAdminLogin ? "admin123 (pre-cargado)" : "Ingresa tu contraseña"}
              readOnly={isAdminLogin}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`login-button ${isAdminLogin ? 'admin' : ''}`}
          >
            {loading ? (
              <>
                <span className="login-loading-spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              <>
                {isAdminLogin ? '🔐 ' : ''}
                Iniciar Sesión {isAdminLogin ? 'como Administrador' : ''}
              </>
            )}
          </button>
        </form>

        {!isAdminLogin && (
          <>
            <div className="login-divider">
              <span>o</span>
            </div>
            
            <button 
              type="button"
              onClick={handleAdminQuickLogin}
              className="login-admin-access"
            >
              🔐 Acceso Rápido de Administrador
            </button>
          </>
        )}

        <p className="login-register-link">
          ¿No tienes cuenta? <a href="/register" className="login-link">Regístrate</a>
        </p>

        {/* Información de roles */}
        <div className="login-roles-info">
          <h4>Tipos de Usuario:</h4>
          <ul>
            <li><strong>Cliente:</strong> Reserva clases, gestiona membresías</li>
            <li><strong>Entrenador:</strong> Maneja clases y seguimiento</li>
            <li><strong>Administrador:</strong> Control total del sistema</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;