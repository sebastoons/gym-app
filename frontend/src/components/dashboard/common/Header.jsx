// frontend/src/components/dashboard/common/Header.jsx

import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/dashboard/common.css';

/**
 * Componente Header reutilizable para todos los dashboards
 * @param {string} title - Título del dashboard
 * @param {string} roleLabel - Etiqueta del rol (Cliente, Entrenador, Administrador)
 */
const Header = ({ title, roleLabel }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Determinar clase de rol para estilos específicos
  const roleClass = roleLabel.toLowerCase().replace(/\s+/g, '-');

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-content">
        {/* Logo y título */}
        <div className="dashboard-header-left">
          <div className="dashboard-logo">
            <img 
              src="/logo.svg" 
              alt="Logo Gimnasio"
            />
          </div>
          <h1 className="dashboard-title">
            {title}
          </h1>
        </div>
        
        {/* Usuario y logout */}
        <div className="dashboard-header-right">
          <span className="dashboard-user-name">
            {user.first_name} {user.last_name}
          </span>
          <span className={`dashboard-role-badge dashboard-role-${roleClass}`}>
            {roleLabel}
          </span>
          <button onClick={logout} className="dashboard-btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;