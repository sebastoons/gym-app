// frontend/src/components/dashboard/cliente/ClaseDiaCard.jsx

import React from 'react';
import ClaseItem from './ClaseItem';
import './ClaseDiaCard.css';

/**
 * Tarjeta que muestra todas las clases de un día
 * @param {Object} dia - Objeto con día, fecha y clases
 * @param {Array} clasesReservadas - IDs de clases reservadas
 * @param {function} onReservar - Callback para reservar
 * @param {function} onCancelar - Callback para cancelar
 * @param {function} onCalificar - Callback para calificar
 */
const ClaseDiaCard = ({ 
  dia, 
  clasesReservadas, 
  onReservar, 
  onCancelar, 
  onCalificar 
}) => {
  return (
    <div className="clase-dia-card">
      {/* Header del día */}
      <div className="clase-dia-header">
        <h4 className="clase-dia-titulo">
          {dia.dia}
        </h4>
        <span className="clase-dia-fecha">
          {dia.fecha}
        </span>
      </div>

      {/* Clases del día */}
      <div className="clase-dia-content">
        {dia.clases.length === 0 ? (
          <p className="clase-dia-no-clases">
            Sin clases
          </p>
        ) : (
          dia.clases.map((clase) => (
            <ClaseItem
              key={clase.id}
              clase={clase}
              estaReservada={clasesReservadas.includes(clase.id)}
              onReservar={onReservar}
              onCancelar={onCancelar}
              onCalificar={onCalificar}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ClaseDiaCard;