// frontend/src/components/dashboard/cliente/MembresiaSidebar.jsx

import React from 'react';
import './MembresiaSidebar.css';

/**
 * Componente Sidebar que muestra la información de membresía del cliente
 * @param {Object} membresiaData - Datos de la membresía
 */
const MembresiaSidebar = ({ membresiaData }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: '2px solid #667eea'
    }}>
      <h3 style={{
        color: '#2d3748',
        fontSize: '1.1rem',
        margin: '0 0 1rem 0'
      }}>
        💳 Mi Membresía
      </h3>

      {/* Tipo y Estado */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '0.9rem'
        }}>
          {membresiaData.tipo}
        </div>
        <div style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: membresiaData.estado === 'Activa' ? '#c6f6d5' : '#fed7d7',
          color: membresiaData.estado === 'Activa' ? '#22543d' : '#742a2a'
        }}>
          {membresiaData.estado}
        </div>
      </div>

      {/* Detalles */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1rem',
        padding: '1rem',
        background: '#f7fafc',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.9rem'
        }}>
          <span style={{ color: '#718096' }}>Precio:</span>
          <strong style={{ color: '#2d3748' }}>{membresiaData.precio}</strong>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.9rem'
        }}>
          <span style={{ color: '#718096' }}>Vence:</span>
          <strong style={{ color: '#2d3748' }}>{membresiaData.fechaVencimiento}</strong>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.9rem',
          background: '#e6fffa',
          padding: '0.5rem',
          borderRadius: '6px',
          marginTop: '0.5rem'
        }}>
          <span style={{ color: '#718096' }}>Días restantes:</span>
          <strong style={{ color: '#38a169', fontSize: '1.1rem' }}>
            {membresiaData.diasRestantes} días
          </strong>
        </div>
      </div>
    </div>
  );
};

export default MembresiaSidebar;