// frontend/src/components/dashboard/admin/TabNavigation.jsx

import React from 'react';
import '../../../styles/dashboard/admin/TabNavigation.css';

/**
 * Componente de navegación por pestañas para el admin
 * @param {string} activeTab - Tab activa actual
 * @param {function} onTabChange - Callback al cambiar de tab
 */
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: '📊' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'entrenadores', label: 'Entrenadores', icon: '💪' },
    { id: 'implementaciones', label: 'Implementaciones', icon: '🛠️' },
    { id: 'facturacion', label: 'Facturación', icon: '💰' }
  ];

  return (
    <nav className="admin-tab-navigation">
      <div className="admin-tab-nav-content">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`admin-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="admin-nav-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;