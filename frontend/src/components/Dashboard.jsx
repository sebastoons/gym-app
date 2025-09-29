import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/components/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'administrador':
      case 'admin':
        return '⚙️';
      case 'entrenador':
        return '💪';
      case 'cliente':
        return '👤';
      default:
        return '🏋️';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'administrador':
      case 'admin':
        return '#e53e3e';
      case 'entrenador':
        return '#38a169';
      case 'cliente':
        return '#3182ce';
      default:
        return '#667eea';
    }
  };

  const getRoleFeatures = (role) => {
    switch(role) {
      case 'administrador':
      case 'admin':
        return [
          'Gestión completa de usuarios',
          'Reportes financieros y estadísticas',
          'Configuración del sistema',
          'Control de membresías y pagos',
          'Gestión de entrenadores y clases',
          'Panel de administración avanzado'
        ];
      case 'entrenador':
        return [
          'Gestión de clases grupales',
          'Seguimiento de clientes',
          'Horarios y disponibilidad',
          'Reportes de asistencia',
          'Comunicación con clientes'
        ];
      case 'cliente':
        return [
          'Reserva de clases',
          'Gestión de membresía',
          'Historial de pagos',
          'Control de asistencia',
          'Perfil personal'
        ];
      default:
        return ['Funcionalidades básicas'];
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1>🏋️ GymApp Dashboard</h1>
          <div className="dashboard-user-info">
            <div className="dashboard-user-details">
              <span className="dashboard-user-role-badge" style={{backgroundColor: getRoleColor(user?.role)}}>
                {getRoleIcon(user?.role)} {user?.role?.toUpperCase()}
              </span>
              <span className="dashboard-user-name">
                {user?.first_name || user?.username}
              </span>
            </div>
            <button onClick={handleLogout} className="dashboard-logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-welcome-card">
          <div className="dashboard-welcome-header">
            <h2>
              {getRoleIcon(user?.role)} ¡Bienvenido {user?.role === 'administrador' || user?.role === 'admin' ? 'Administrador' : user?.role === 'entrenador' ? 'Entrenador' : 'Cliente'}!
            </h2>
            <p>Tu sesión está activa y la conexión con la base de datos funciona correctamente.</p>
          </div>
          
          <div className="dashboard-role-features">
            <h3>Funcionalidades disponibles para tu rol:</h3>
            <div className="dashboard-features-grid">
              {getRoleFeatures(user?.role).map((feature, index) => (
                <div key={index} className="dashboard-feature-item">
                  <span className="dashboard-feature-check">✅</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-user-details-section">
            <h3>Información de tu cuenta:</h3>
            <div className="dashboard-info-grid">
              <div className="dashboard-info-item">
                <strong>Usuario:</strong> {user?.username}
              </div>
              <div className="dashboard-info-item">
                <strong>Email:</strong> {user?.email}
              </div>
              <div className="dashboard-info-item">
                <strong>Nombre:</strong> {user?.first_name} {user?.last_name}
              </div>
              <div className="dashboard-info-item">
                <strong>Rol:</strong> 
                <span className="dashboard-role-inline" style={{color: getRoleColor(user?.role)}}>
                  {getRoleIcon(user?.role)} {user?.role}
                </span>
              </div>
              <div className="dashboard-info-item">
                <strong>Estado:</strong> {user?.is_active_member ? 'Miembro Activo' : 'Miembro Inactivo'}
              </div>
              <div className="dashboard-info-item">
                <strong>Fecha de registro:</strong> {new Date(user?.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Mensaje especial para administradores */}
          {(user?.role === 'administrador' || user?.role === 'admin') && (
            <div className="dashboard-admin-notice">
              <h4>🔐 Panel de Administrador</h4>
              <p>Como administrador, tienes acceso completo a todas las funcionalidades del sistema. Puedes gestionar usuarios, ver reportes, configurar el sistema y mucho más.</p>
            </div>
          )}

          <div className="dashboard-development-roadmap">
            <h3>Roadmap de Desarrollo (Basado en Documento):</h3>
            <div className="dashboard-roadmap-items">
              <div className="dashboard-roadmap-item completed">
                <span className="dashboard-roadmap-icon">✅</span>
                <div>
                  <strong>Sprint 1 - Fundamentos</strong>
                  <p>Sistema de autenticación y roles implementado</p>
                </div>
              </div>
              <div className="dashboard-roadmap-item in-progress">
                <span className="dashboard-roadmap-icon">🔄</span>
                <div>
                  <strong>Sprint 2 - Módulos Base</strong>
                  <p>Gestión de clientes y membresías (En desarrollo)</p>
                </div>
              </div>
              <div className="dashboard-roadmap-item pending">
                <span className="dashboard-roadmap-icon">📋</span>
                <div>
                  <strong>Sprint 3 - Funcionalidades Clave</strong>
                  <p>Reserva de clases y control de asistencia</p>
                </div>
              </div>
              <div className="dashboard-roadmap-item pending">
                <span className="dashboard-roadmap-icon">📊</span>
                <div>
                  <strong>Sprint 4 - Reportes y Cierre</strong>
                  <p>Panel administrativo con estadísticas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-status-card">
          <h3>Estado del Sistema</h3>
          <div className="dashboard-status-item">
            <span className="dashboard-status-dot active"></span>
            Base de datos: Conectada
          </div>
          <div className="dashboard-status-item">
            <span className="dashboard-status-dot active"></span>
            Autenticación: Activa
          </div>
          <div className="dashboard-status-item">
            <span className="dashboard-status-dot active"></span>
            API: Funcionando
          </div>
          <div className="dashboard-status-item">
            <span className="dashboard-status-dot active"></span>
            Roles: Configurados
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;