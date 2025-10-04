// frontend/src/components/dashboard/entrenador/DetallesClaseModal.jsx

import React from 'react';
import './DetallesClaseModal.css';

/**
 * Modal para mostrar detalles de una clase del entrenador
 * @param {Object} clase - Objeto con los datos de la clase
 * @param {function} onClose - Callback para cerrar el modal
 */
const DetallesClaseModal = ({ clase, onClose }) => {
  if (!clase) return null;

  return (
    <div className="detalles-clase-modal-overlay" onClick={onClose}>
      <div className="detalles-clase-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detalles-clase-modal-header">
          <h3 className="detalles-clase-modal-title">
            {clase.nombre}
          </h3>
          <button onClick={onClose} className="detalles-clase-modal-close">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="detalles-clase-modal-body">
          <div className="detalles-clase-info-row">
            <strong>Horario:</strong>
            <strong>{clase.hora}</strong>
          </div>
          
          <div className="detalles-clase-info-row">
            <strong>Inscritos:</strong>
            <strong>{clase.inscritos}/{clase.capacidad}</strong>
          </div>
          
          {clase.asistentes !== null && clase.asistentes !== undefined && (
            <div className="detalles-clase-info-row">
              <strong>Asistencia:</strong>
              <strong>{clase.asistentes}/{clase.inscritos}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallesClaseModal;