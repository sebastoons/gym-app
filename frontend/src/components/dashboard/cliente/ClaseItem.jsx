// frontend/src/components/dashboard/cliente/ClaseItem.jsx

import React from 'react';
import { esClasePasada } from '../../../utils/dateUtils';
import './ClaseItem.css';

/**
 * Componente que muestra una clase individual con sus acciones
 * @param {Object} clase - Datos de la clase
 * @param {boolean} estaReservada - Si el usuario ya reservó esta clase
 * @param {function} onReservar - Callback para reservar
 * @param {function} onCancelar - Callback para cancelar reserva
 * @param {function} onCalificar - Callback para abrir modal de calificación
 */
const ClaseItem = ({ 
  clase, 
  estaReservada, 
  onReservar, 
  onCancelar, 
  onCalificar 
}) => {
  const clasePasada = esClasePasada(clase.fecha, clase.hora);
  const [inscritosStr, capacidadStr] = clase.cupos.split('/');
  const inscritos = parseInt(inscritosStr);
  const capacidad = parseInt(capacidadStr);
  const estaLlena = inscritos >= capacidad;

  return (
    <div style={{
      border: `2px solid ${estaReservada && !clasePasada ? '#48bb78' : '#e2e8f0'}`,
      borderRadius: '10px',
      padding: '0.75rem',
      background: estaReservada && !clasePasada ? '#f0fff4' : 'white'
    }}>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
        {/* Hora */}
        <span style={{
          fontWeight: '700',
          color: '#667eea',
          fontSize: '0.9rem',
          minWidth: '95px'
        }}>
          {clase.hora}
        </span>

        {/* Detalles */}
        <div style={{ flex: 1 }}>
          <strong style={{ color: '#2d3748', fontSize: '0.95rem' }}>
            {clase.nombre}
          </strong>
          
          {/* Entrenador */}
          <div style={{
            fontSize: '0.75rem',
            color: '#718096',
            marginTop: '0.15rem'
          }}>
            👤 {clase.entrenador}
          </div>

          {/* Cupos y calificación */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.25rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#718096' }}>
              👥 {clase.cupos}
            </span>
            
            {clasePasada && estaReservada ? (
              <>
                <span style={{ 
                  fontSize: '0.7rem', 
                  color: '#38a169',
                  fontWeight: '600',
                  background: '#c6f6d5',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  ✓ Finalizada
                </span>
                <button
                  onClick={() => onCalificar(clase)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #667eea',
                    color: '#667eea',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Calificar
                </button>
              </>
            ) : !clasePasada && (
              <span style={{ fontSize: '0.75rem', color: '#718096' }}>
                ⭐ {clase.calificacionEntrenador}
              </span>
            )}
          </div>
          
          {/* Botones de acción */}
          {!clasePasada && (
            <div style={{ marginTop: '0.5rem' }}>
              {estaLlena ? (
                <span style={{
                  padding: '0.4rem 0.8rem',
                  background: '#e2e8f0',
                  color: '#718096',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  COMPLETA
                </span>
              ) : estaReservada ? (
                <button
                  onClick={() => onCancelar(clase.id)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    background: '#fed7d7',
                    color: '#c53030',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  CANCELAR
                </button>
              ) : (
                <button
                  onClick={() => onReservar(clase.id)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  RESERVAR
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaseItem;