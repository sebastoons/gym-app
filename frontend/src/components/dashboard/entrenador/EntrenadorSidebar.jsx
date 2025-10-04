// frontend/src/components/dashboard/entrenador/EntrenadorSidebar.jsx

import React from 'react';
import './EntrenadorSidebar.css';

/**
 * Componente Sidebar que muestra información del pago del entrenador
 * @param {Object} pagoData - Datos del próximo pago
 */
const EntrenadorSidebar = ({ pagoData }) => {
  return (
    <div className="entrenador-sidebar">
      <h3 className="entrenador-sidebar-title">
        💰 Próximo Pago
      </h3>

      <div className="entrenador-pago-info">
        <div className="entrenador-pago-monto">
          {pagoData.monto}
        </div>
        
        <div className="entrenador-pago-fecha">
          Fecha: <strong>{pagoData.fecha}</strong>
        </div>
        
        <div className="entrenador-pago-nota">
          {pagoData.nota}
        </div>
      </div>
    </div>
  );
};

export default EntrenadorSidebar;