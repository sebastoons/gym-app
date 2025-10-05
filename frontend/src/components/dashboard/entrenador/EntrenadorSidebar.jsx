// frontend/src/components/dashboard/entrenador/EntrenadorSidebar.jsx

import React, { useState } from 'react';
import './EntrenadorSidebar.css';

/**
 * Componente Sidebar que muestra información del entrenador
 * @param {Object} pagoData - Datos del próximo pago
 * @param {Object} datosEntrenador - Datos completos del entrenador
 */
const EntrenadorSidebar = ({ pagoData, datosEntrenador }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarContrato, setMostrarContrato] = useState(false);

  // Calcular días restantes para contratos a plazo fijo
  const calcularDiasRestantes = () => {
    if (!datosEntrenador.fechaTermino) return null;
    
    const hoy = new Date();
    const [dia, mes, año] = datosEntrenador.fechaTermino.split('-');
    const fechaFin = new Date(año, mes - 1, dia);
    const diff = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const diasRestantes = calcularDiasRestantes();

  return (
    <div className="entrenador-sidebar">
      {/* Próximo Pago */}
      <h3 className="entrenador-sidebar-title">
        💰 Próximo Pago
      </h3>

      <div className="entrenador-pago-info">
        <div className="entrenador-pago-monto">
          {pagoData.monto}
        </div>
        
        <div className="entrenador-pago-fecha">
          Fecha: <strong>{pagoData.fecha}</strong>
        </div>
        
        <div className="entrenador-pago-nota">
          {pagoData.nota}
        </div>
      </div>

      {/* Historial de Pagos */}
      <div className="entrenador-historial-toggle">
        <button 
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          className="entrenador-btn-toggle-historial"
        >
          {mostrarHistorial ? '▼' : '▶'} Historial de Pagos
        </button>
      </div>

      {mostrarHistorial && (
        <div className="entrenador-historial">
          {datosEntrenador.historialPagos.map((pago, index) => (
            <div key={index} className="entrenador-pago-item">
              <div className="entrenador-pago-item-fecha">{pago.fecha}</div>
              <div className="entrenador-pago-item-info">
                <span className="entrenador-pago-item-monto">{pago.monto}</span>
                <span className={`entrenador-pago-item-estado ${pago.estado.toLowerCase()}`}>
                  {pago.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Información de Contrato */}
      <div className="entrenador-contrato-toggle">
        <button 
          onClick={() => setMostrarContrato(!mostrarContrato)}
          className="entrenador-btn-toggle-contrato"
        >
          {mostrarContrato ? '▼' : '▶'} Información de Contrato
        </button>
      </div>

      {mostrarContrato && (
        <div className="entrenador-contrato-info">
          <div className="entrenador-contrato-row">
            <span className="entrenador-contrato-label">Tipo:</span>
            <strong className={`entrenador-contrato-valor ${datosEntrenador.tipoContrato === 'Indefinido' ? 'indefinido' : 'plazo'}`}>
              {datosEntrenador.tipoContrato}
            </strong>
          </div>

          <div className="entrenador-contrato-row">
            <span className="entrenador-contrato-label">Fecha Ingreso:</span>
            <strong className="entrenador-contrato-valor">
              {datosEntrenador.fechaIngreso}
            </strong>
          </div>

          {datosEntrenador.tipoContrato === 'Plazo Fijo' && datosEntrenador.fechaTermino && (
            <>
              <div className="entrenador-contrato-row">
                <span className="entrenador-contrato-label">Fecha Término:</span>
                <strong className="entrenador-contrato-valor">
                  {datosEntrenador.fechaTermino}
                </strong>
              </div>

              {diasRestantes !== null && (
                <div className={`entrenador-contrato-dias ${diasRestantes <= 30 ? 'alerta' : ''}`}>
                  <div className="entrenador-contrato-dias-label">
                    Días Restantes
                  </div>
                  <div className="entrenador-contrato-dias-valor">
                    {diasRestantes} días
                  </div>
                  {diasRestantes <= 30 && (
                    <div className="entrenador-contrato-dias-aviso">
                      ⚠️ Próximo a vencer
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="entrenador-contrato-row">
            <span className="entrenador-contrato-label">Especialidad:</span>
            <strong className="entrenador-contrato-valor">
              {datosEntrenador.especialidad}
            </strong>
          </div>

          <div className="entrenador-contrato-row">
            <span className="entrenador-contrato-label">Calificación:</span>
            <strong className="entrenador-contrato-valor calificacion">
              ⭐ {datosEntrenador.calificacion}/5
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntrenadorSidebar;