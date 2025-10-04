// frontend/src/components/dashboard/common/StatsCard.jsx

import React from 'react';
import '../../../styles/dashboard/common.css';

/**
 * Componente reutilizable para mostrar estadísticas
 * @param {string} icon - Emoji del ícono
 * @param {string|number} value - Valor a mostrar
 * @param {string} label - Etiqueta descriptiva
 */
const StatsCard = ({ icon, value, label }) => {
  return (
    <div className="stats-card">
      <span className="stats-card-icon">{icon}</span>
      <div className="stats-card-info">
        <strong className="stats-card-value">
          {value}
        </strong>
        <span className="stats-card-label">
          {label}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;