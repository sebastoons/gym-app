import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const [focusedField, setFocusedField] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
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
    <div style={styles.container}>
      <div style={styles.registerBox}>
        <div style={styles.registerBoxBefore}></div>
        
        {/* Logo Section */}
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            🏋️
          </div>
          <h2 style={styles.title}>Únete a GymApp</h2>
          <p style={styles.subtitle}>Crea tu cuenta y comienza tu entrenamiento</p>
        </div>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                onFocus={() => handleFocus('first_name')}
                onBlur={handleBlur}
                required
                style={{
                  ...styles.input,
                  ...(focusedField === 'first_name' ? styles.inputFocused : {})
                }}
                placeholder="Nombre"
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onFocus={() => handleFocus('last_name')}
                onBlur={handleBlur}
                required
                style={{
                  ...styles.input,
                  ...(focusedField === 'last_name' ? styles.inputFocused : {})
                }}
                placeholder="Apellido"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={handleBlur}
              required
              style={{
                ...styles.input,
                ...(focusedField === 'username' ? styles.inputFocused : {})
              }}
              placeholder="Nombre de usuario"
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              required
              style={{
                ...styles.input,
                ...(focusedField === 'email' ? styles.inputFocused : {})
              }}
              placeholder="Correo electrónico"
            />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                style={{
                  ...styles.input,
                  ...(focusedField === 'phone' ? styles.inputFocused : {})
                }}
                placeholder="Teléfono (opcional)"
              />
            </div>

            <div style={styles.inputGroup}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => handleFocus('role')}
                onBlur={handleBlur}
                style={{
                  ...styles.select,
                  ...(focusedField === 'role' ? styles.inputFocused : {})
                }}
              >
                <option value="cliente">Cliente</option>
                <option value="entrenador">Entrenador</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
                style={{
                  ...styles.input,
                  ...(focusedField === 'password' ? styles.inputFocused : {})
                }}
                placeholder="Contraseña"
              />
            </div>

            <div style={styles.inputGroup}>
              <input
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                onFocus={() => handleFocus('password_confirm')}
                onBlur={handleBlur}
                required
                style={{
                  ...styles.input,
                  ...(focusedField === 'password_confirm' ? styles.inputFocused : {})
                }}
                placeholder="Confirmar contraseña"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.target.style, styles.buttonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <span>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}></span>
                Creando cuenta...
              </span>
            ) : 'Crear Cuenta'}
          </button>
        </form>

        <p style={styles.loginLink}>
          ¿Ya tienes cuenta?{' '}
          <a 
            href="/login" 
            style={styles.link}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.linkHover)}
            onMouseLeave={(e) => e.target.style.color = styles.link.color}
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '1rem'
  },
  registerBox: {
    backgroundColor: 'white',
    padding: '3rem 2.5rem',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '650px',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeIn 0.6s ease'
  },
  registerBoxBefore: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
    backgroundSize: '300% 300%',
    animation: 'gradient 3s ease infinite'
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  logo: {
    width: '80px',
    height: '80px',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    fontSize: '2.5rem',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
    animation: 'fadeIn 0.8s ease 0.2s both'
  },
  title: {
    textAlign: 'center',
    marginBottom: '0.5rem',
    color: '#2d3748',
    fontSize: '2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    textAlign: 'center',
    color: '#718096',
    fontSize: '1rem',
    marginBottom: '1rem',
    fontWeight: '400'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  inputGroup: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc',
    boxSizing: 'border-box',
    cursor: 'pointer'
  },
  inputFocused: {
    borderColor: '#667eea',
    backgroundColor: 'white',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    outline: 'none'
  },
  button: {
    padding: '1rem',
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(40, 167, 69, 0.3)'
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none'
  },
  error: {
    backgroundColor: '#fed7d7',
    color: '#c53030',
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '1rem',
    border: '1px solid #feb2b2',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.95rem',
    color: '#718096'
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.2s ease'
  },
  linkHover: {
    color: '#764ba2'
  }
};

export default Register;