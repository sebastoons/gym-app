import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardCliente from './dashboard/cliente/DashboardCliente.jsx';
import DashboardEntrenador from './dashboard/entrenador/DashboardEntrenador.jsx';
import DashboardAdmin from './dashboard/admin/DashboardAdmin.jsx';

const Dashboard = () => {
  const { user } = useAuth();

  // Renderizar el dashboard apropiado según el rol del usuario
  const renderDashboard = () => {
    if (!user) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      );
    }

    const userRole = user.role?.toLowerCase();

    switch (userRole) {
      case 'cliente':
        return <DashboardCliente />;
      
      case 'entrenador':
        return <DashboardEntrenador />;
      
      case 'administrador':
      case 'admin':
        return <DashboardAdmin />;
      
      default:
        return (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem'
          }}>
            <h2>⚠️ Rol no reconocido</h2>
            <p>Tu cuenta tiene un rol que no está configurado correctamente.</p>
            <p>Por favor contacta al administrador.</p>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;