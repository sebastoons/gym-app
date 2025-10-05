// frontend/src/components/dashboard/entrenador/DetallesClaseModal.jsx

import React, { useState } from 'react';
import './DetallesClaseModal.css';

/**
 * Modal para mostrar detalles completos de una clase del entrenador
 * @param {Object} clase - Objeto con los datos de la clase
 * @param {function} onClose - Callback para cerrar el modal
 * @param {function} onEliminar - Callback para eliminar la clase
 * @param {function} onReservar - Callback para reservar un cliente
 */
const DetallesClaseModal = ({ clase, onClose, onEliminar, onReservar }) => {
  const [mostrarAlumnos, setMostrarAlumnos] = useState(false);

  if (!clase) return null;

  const cuposDisponibles = clase.capacidad - clase.inscritos;
  const sinCupos = cuposDisponibles <= 0;
  const esClaseCompletada = clase.completada === true;

  return (
    <div className="detalles-clase-modal-overlay" onClick={onClose}>
      <div className="detalles-clase-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detalles-clase-modal-header">
          <h3 className="detalles-clase-modal-title">
            {clase.nombre}
            {esClaseCompletada && (
              <span className="detalles-clase-badge-completada">✓ Completada</span>
            )}
          </h3>
          <button onClick={onClose} className="detalles-clase-modal-close">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="detalles-clase-modal-body">
          {/* Información básica */}
          <div className="detalles-clase-info-row">
            <strong>Día:</strong>
            <strong>{clase.dia}</strong>
          </div>

          <div className="detalles-clase-info-row">
            <strong>Fecha:</strong>
            <strong>{clase.fecha}</strong>
          </div>
          
          <div className="detalles-clase-info-row">
            <strong>Horario:</strong>
            <strong>{clase.hora}</strong>
          </div>
          
          <div className="detalles-clase-info-row">
            <strong>Entrenador:</strong>
            <strong>Boris Negrete</strong>
          </div>

          <div className="detalles-clase-info-row">
            <strong>Inscritos:</strong>
            <strong>{clase.inscritos}/{clase.capacidad}</strong>
          </div>

          {/* Mostrar asistencia y calificación si la clase ya pasó */}
          {esClaseCompletada ? (
            <>
              <div className="detalles-clase-info-row highlight-success">
                <strong>Asistieron:</strong>
                <strong>{clase.asistentes}/{clase.inscritos}</strong>
              </div>

              {clase.calificacionClase && (
                <div className="detalles-clase-info-row highlight-rating">
                  <strong>Calificación obtenida:</strong>
                  <strong className="calificacion-destacada">
                    ⭐ {clase.calificacionClase}/5
                  </strong>
                </div>
              )}
            </>
          ) : (
            <div className="detalles-clase-info-row">
              <strong>Cupos disponibles:</strong>
              <strong style={{ color: sinCupos ? '#e53e3e' : '#38a169' }}>
                {cuposDisponibles}
              </strong>
            </div>
          )}

          {/* Lista de alumnos */}
          {clase.alumnos && clase.alumnos.length > 0 && (
            <div className="detalles-clase-alumnos-section">
              <button
                onClick={() => setMostrarAlumnos(!mostrarAlumnos)}
                className="detalles-clase-toggle-alumnos"
              >
                <span>👥 Alumnos Inscritos ({clase.inscritos})</span>
                <span>{mostrarAlumnos ? '▼' : '▶'}</span>
              </button>

              {mostrarAlumnos && (
                <div className="detalles-clase-alumnos-lista">
                  {clase.alumnos.map((alumno, index) => (
                    <div key={index} className="detalles-clase-alumno-item">
                      {index + 1}. {alumno}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botones de acción - Solo mostrar para clases futuras */}
        {!esClaseCompletada && (
          <div className="detalles-clase-modal-actions">
            <button
              onClick={onEliminar}
              className="detalles-clase-btn-eliminar"
            >
              🗑️ Eliminar Clase
            </button>

            <button
              onClick={onReservar}
              disabled={sinCupos}
              className="detalles-clase-btn-reservar"
            >
              {sinCupos ? '❌ Sin Cupos' : '➕ Reservar Cliente'}
            </button>
          </div>
        )}

        {/* Botón de cerrar para clases completadas */}
        {esClaseCompletada && (
          <div className="detalles-clase-modal-actions-single">
            <button
              onClick={onClose}
              className="detalles-clase-btn-cerrar"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetallesClaseModal;