// frontend/src/components/dashboard/entrenador/ClaseEntrenadorDiaCard.jsx

import React from 'react';
import ClaseEntrenadorItem from './ClaseEntrenadorItem';
import './ClaseEntrenadorDiaCard.css';

/**
 * Tarjeta que muestra todas las clases de un día para el entrenador
 * @param {Object} dia - Objeto con día, fecha y clases
 * @param {function} onVerDetalles - Callback para ver detalles
 */
const ClaseEntrenadorDiaCard = ({ dia, onVerDetalles }) => {
  return (
    <div className="clase-entrenador-dia-card">
      {/* Header del día */}
      <div className="clase-entrenador-dia-header">
        <h4 className="clase-entrenador-dia-titulo">
          {dia.dia}
        </h4>
        <span className="clase-entrenador-dia-fecha">
          {dia.fecha}
        </span>
      </div>

      {/* Clases del día */}
      <div className="clase-entrenador-dia-content">
        {dia.clases.length === 0 ? (
          <p className="clase-entrenador-dia-no-clases">
            Día libre
          </p>
        ) : (
          dia.clases.map((clase) => (
            <ClaseEntrenadorItem
              key={clase.id}
              clase={clase}
              onVerDetalles={onVerDetalles}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ClaseEntrenadorDiaCard;