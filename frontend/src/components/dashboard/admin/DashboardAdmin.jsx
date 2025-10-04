// frontend/src/components/dashboard/admin/DashboardAdmin.jsx

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Header from '../common/Header';
import TabNavigation from './TabNavigation';
import OverviewTab from './tabs/OverviewTab';
import ClientesTab from './tabs/ClientesTab';
import EntrenadoresTab from './tabs/EntrenadoresTab';
import ImplementacionesTab from './tabs/ImplementacionesTab';
import FacturacionTab from './tabs/FacturacionTab';
import { ADMIN_MOCK_DATA } from '../../../utils/constants';
import '../../../styles/dashboard/admin/DashboardAdmin.css';

const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  // Renderizar el tab activo
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab kpis={ADMIN_MOCK_DATA.kpis} />;
      case 'clientes':
        return <ClientesTab data={ADMIN_MOCK_DATA.clientes} />;
      case 'entrenadores':
        return <EntrenadoresTab data={ADMIN_MOCK_DATA.entrenadores} />;
      case 'implementaciones':
        return <ImplementacionesTab data={ADMIN_MOCK_DATA.implementaciones} />;
      case 'facturacion':
        return <FacturacionTab data={ADMIN_MOCK_DATA.facturacion} />;
      default:
        return <OverviewTab kpis={ADMIN_MOCK_DATA.kpis} />;
    }
  };

  // Loading state
  if (!user) {
    return (
      <div className="dashboard-admin-loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-admin">
      {/* Header */}
      <Header 
        title="Panel de Administración" 
        roleLabel="Administrador"
        roleColor="linear-gradient(135deg, #e53e3e, #fc8181)"
      />

      {/* Tab Navigation */}
      <TabNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="dashboard-admin-main">
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default DashboardAdmin;