// frontend/src/components/dashboard/common/WeekNavigator.jsx

import React from 'react';
import { getWeekLabel } from '../../../utils/dateUtils';
import '../../../styles/dashboard/common.css';

/**
 * Componente navegador de semanas
 * @param {number} currentWeek - Semana actual
 * @param {function} onPrevious - Callback para semana anterior
 * @param {function} onNext - Callback para semana siguiente
 * @param {string} color - Color del botón (por defecto: #667eea)
 */
const WeekNavigator = ({ 
  currentWeek, 
  onPrevious, 
  onNext, 
  color = '#667eea' 
}) => {
  return (
    <div className="week-navigator">
      <button 
        onClick={onPrevious}
        className="week-navigator-btn"
        style={{ color }}
      >
        ← Anterior
      </button>
      <span className="week-navigator-label">
        {getWeekLabel(currentWeek)}
      </span>
      <button 
        onClick={onNext}
        className="week-navigator-btn"
        style={{ color }}
      >
        Siguiente →
      </button>
    </div>
  );
};

export default WeekNavigator;