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
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
    }}>
      {/* Header del día */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>
          {dia.dia}
        </h4>
        <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>
          {dia.fecha}
        </span>
      </div>

      {/* Clases del día */}
      <div style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {dia.clases.length === 0 ? (
          <p style={{
            textAlign: 'center',
            color: '#a0aec0',
            fontStyle: 'italic',
            padding: '1rem'
          }}>
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