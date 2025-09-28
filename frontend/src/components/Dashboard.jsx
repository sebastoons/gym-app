import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/components/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🏋️ GymApp Dashboard</h1>
        <div className="dashboard-user-info">
          <span className="dashboard-user-name">Bienvenido, {user?.first_name || user?.username}</span>
          <span className="dashboard-user-role">({user?.role})</span>
          <button onClick={handleLogout} className="dashboard-logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-welcome-card">
          <h2>¡Bienvenido al Sistema de Gimnasio!</h2>
          <p>Tu sesión está activa y la conexión con la base de datos funciona correctamente.</p>
          
          <div className="dashboard-user-details">
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

          <div className="dashboard-next-steps">
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

        <div className="dashboard-status-card">
          <h3>Estado del Sistema</h3>
          <div className="dashboard-status-item">
            <span className="dashboard-status-dot"></span>
            Base de datos: Conectada
          </div>
          <div className="dashboard-status-item">
            <span className="dashboard-status-dot"></span>
            Autenticación: Activa
          </div>
          <div className="dashboard-status-item">
            <span className="dashboard-status-dot"></span>
            API: Funcionando
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;