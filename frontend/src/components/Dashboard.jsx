import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🏋️ GymApp Dashboard</h1>
        <div style={styles.userInfo}>
          <span>Bienvenido, {user?.first_name || user?.username}</span>
          <span style={styles.role}>({user?.role})</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.welcomeCard}>
          <h2>¡Bienvenido al Sistema de Gimnasio!</h2>
          <p>Tu sesión está activa y la conexión con la base de datos funciona correctamente.</p>
          
          <div style={styles.userDetails}>
            <h3>Información de tu cuenta:</h3>
            <ul>
              <li><strong>Usuario:</strong> {user?.username}</li>
              <li><strong>Email:</strong> {user?.email}</li>
              <li><strong>Nombre:</strong> {user?.first_name} {user?.last_name}</li>
              <li><strong>Rol:</strong> {user?.role}</li>
              <li><strong>Estado:</strong> {user?.is_active_member ? 'Miembro Activo' : 'Miembro Inactivo'}</li>
              <li><strong>Fecha de registro:</strong> {new Date(user?.created_at).toLocaleDateString()}</li>
            </ul>
          </div>

          <div style={styles.nextSteps}>
            <h3>Próximos pasos:</h3>
            <ul>
              <li>✅ Sistema de login implementado</li>
              <li>✅ Conexión con base de datos funcionando</li>
              <li>🔄 Próximo: Gestión de clases y horarios</li>
              <li>🔄 Próximo: Sistema de reservas</li>
              <li>🔄 Próximo: Gestión de membresías</li>
            </ul>
          </div>
        </div>

        <div style={styles.statusCard}>
          <h3>Estado del Sistema</h3>
          <div style={styles.statusItem}>
            <span style={styles.statusDot}></span>
            Base de datos: Conectada
          </div>
          <div style={styles.statusItem}>
            <span style={styles.statusDot}></span>
            Autenticación: Activa
          </div>
          <div style={styles.statusItem}>
            <span style={styles.statusDot}></span>
            API: Funcionando
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  role: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.8rem'
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  main: {
    padding: '2rem',
    display: 'grid',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  userDetails: {
    marginTop: '1.5rem',
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '5px'
  },
  nextSteps: {
    marginTop: '1.5rem'
  },
  statusCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0.5rem 0'
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#28a745'
  }
};

export default Dashboard;