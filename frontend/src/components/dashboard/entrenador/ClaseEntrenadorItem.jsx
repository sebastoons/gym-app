// frontend/src/components/dashboard/entrenador/ClaseEntrenadorItem.jsx

import React from 'react';
import './ClaseEntrenadorItem.css';

/**
 * Componente que muestra una clase individual del entrenador
 * @param {Object} clase - Datos de la clase
 * @param {function} onVerDetalles - Callback para ver detalles de la clase
 */
const ClaseEntrenadorItem = ({ clase, onVerDetalles }) => {
  const esClaseCompletada = clase.completada === true;

  return (
    <div className={`clase-entrenador-item ${esClaseCompletada ? 'completada' : ''}`}>
      <div className="clase-entrenador-info">
        <span className="clase-entrenador-hora">
          {clase.hora}
        </span>
        
        <div className="clase-entrenador-detalles">
          <div className="clase-entrenador-nombre-container">
            <strong className="clase-entrenador-nombre">
              {clase.nombre}
            </strong>
            {esClaseCompletada && (
              <span className="clase-entrenador-badge-completada">
                ✓ Completada
              </span>
            )}
          </div>
          
          <div className="clase-entrenador-inscritos">
            👥 {clase.inscritos}/{clase.capacidad} inscritos
          </div>
          
          {esClaseCompletada && (
            <div className="clase-entrenador-info-completada">
              <div className="clase-entrenador-asistencia">
                ✅ {clase.asistentes}/{clase.inscritos} asistieron
              </div>
              
              {clase.calificacionClase && (
                <div className="clase-entrenador-calificacion">
                  ⭐ Calificación: <strong>{clase.calificacionClase}/5</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="clase-entrenador-actions">
        <button 
          onClick={() => onVerDetalles(clase)}
          className="btn-ver-detalles-entrenador"
        >
          {esClaseCompletada ? 'VER RESUMEN' : 'VER DETALLES'}
        </button>
      </div>
    </div>
  );
};

export default ClaseEntrenadorItem;