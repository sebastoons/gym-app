// frontend/src/components/dashboard/admin/KPICard.jsx

import React from 'react';
import '../../../styles/dashboard/admin/KPICard.css';

/**
 * Tarjeta de KPI para el dashboard del admin
 * @param {string} label - Etiqueta del KPI
 * @param {string|number} value - Valor del KPI
 * @param {string} meta - Texto adicional (opcional)
 * @param {string} gradient - Gradiente de color
 */
const KPICard = ({ label, value, meta, gradient }) => {
  return (
    <div className="kpi-card" style={{ background: gradient }}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {meta && <div className="kpi-meta">{meta}</div>}
    </div>
  );
};

export default KPICard;