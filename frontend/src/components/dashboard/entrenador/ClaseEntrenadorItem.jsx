// frontend/src/components/dashboard/entrenador/ClaseEntrenadorItem.jsx

import React from 'react';
import './ClaseEntrenadorItem.css';

/**
 * Componente que muestra una clase individual del entrenador
 * @param {Object} clase - Datos de la clase
 * @param {function} onVerDetalles - Callback para ver detalles de la clase
 */
const ClaseEntrenadorItem = ({ clase, onVerDetalles }) => {
  return (
    <div className="clase-entrenador-item">
      <div className="clase-entrenador-info">
        <span className="clase-entrenador-hora">
          {clase.hora}
        </span>
        
        <div className="clase-entrenador-detalles">
          <strong className="clase-entrenador-nombre">
            {clase.nombre}
          </strong>
          
          <div className="clase-entrenador-inscritos">
            👥 {clase.inscritos}/{clase.capacidad} inscritos
          </div>
          
          {clase.asistentes !== null && clase.asistentes !== undefined && (
            <div className="clase-entrenador-asistencia">
              ✅ {clase.asistentes} asistieron
            </div>
          )}
        </div>
      </div>
      
      <div className="clase-entrenador-actions">
        <button 
          onClick={() => onVerDetalles(clase)}
          className="btn-ver-detalles-entrenador"
        >
          VER DETALLES
        </button>
      </div>
    </div>
  );
};

export default ClaseEntrenadorItem;