// frontend/src/components/dashboard/cliente/MembresiaSidebar.jsx

import React, { useState } from 'react';
import './MembresiaSidebar.css';

const MembresiaSidebar = ({ membresiaData, onRenovar, onCancelar }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  return (
    <div className="membresia-sidebar">
      <h3 className="membresia-sidebar-title">
        💳 Mi Membresía
      </h3>

      <div className="membresia-info-header">
        <div className="membresia-badge-tipo">
          {membresiaData.tipo}
        </div>
        <div className={`membresia-badge-estado ${membresiaData.estado.toLowerCase()}`}>
          {membresiaData.estado}
        </div>
      </div>

      <div className="membresia-detalles">
        <div className="membresia-detalle-row">
          <span className="membresia-detalle-label">Precio:</span>
          <strong className="membresia-detalle-valor">{membresiaData.precio}</strong>
        </div>
        <div className="membresia-detalle-row">
          <span className="membresia-detalle-label">Vence:</span>
          <strong className="membresia-detalle-valor">{membresiaData.fechaVencimiento}</strong>
        </div>
        <div className="membresia-detalle-row highlight">
          <span className="membresia-detalle-label">Días restantes:</span>
          <strong className="membresia-detalle-valor">
            {membresiaData.diasRestantes} días
          </strong>
        </div>
      </div>

      <div className="membresia-acciones">
        <button onClick={onRenovar} className="btn-renovar">
          🔄 Renovar
        </button>
        <button onClick={onCancelar} className="btn-cancelar-membresia">
          ❌ Cancelar
        </button>
      </div>

      <div className="membresia-historial-toggle">
        <button 
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          className="btn-toggle-historial"
        >
          {mostrarHistorial ? '▼' : '▶'} Historial de Pagos
        </button>
      </div>

      {mostrarHistorial && (
        <div className="membresia-historial">
          {membresiaData.historialPagos.map((pago, index) => (
            <div key={index} className="pago-item">
              <div className="pago-fecha">{pago.fecha}</div>
              <div className="pago-info">
                <span className="pago-monto">{pago.monto}</span>
                <span className={`pago-estado ${pago.estado.toLowerCase()}`}>
                  {pago.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="membresia-beneficios">
        <h4 className="beneficios-titulo">✨ Beneficios Incluidos</h4>
        <div className="beneficios-lista">
          {membresiaData.beneficios.map((beneficio, index) => (
            <div key={index} className="beneficio-item-sidebar">
              <span className="beneficio-check">✓</span>
              <span className="beneficio-texto">{beneficio}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembresiaSidebar;