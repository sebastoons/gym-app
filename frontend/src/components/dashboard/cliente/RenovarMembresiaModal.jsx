// frontend/src/components/dashboard/cliente/RenovarMembresiaModal.jsx

import React, { useState } from 'react';
import './RenovarMembresiaModal.css';

const PLANES_MEMBRESIA = {
  basica: {
    nombre: 'Básica',
    precio: '$25.000/mes',
    beneficios: [
      'Acceso al gimnasio en horario normal',
      'Uso de máquinas básicas',
      '2 clases grupales al mes',
      'Casillero básico'
    ],
    color: 'linear-gradient(135deg, #ed8936, #f6ad55)'
  },
  premium: {
    nombre: 'Premium',
    precio: '$45.000/mes',
    beneficios: [
      'Acceso ilimitado al gimnasio',
      'Todas las clases grupales',
      'Casillero personal premium',
      'Nutricionista 1 vez al mes',
      'Toalla de cortesía',
      '10% descuento en productos'
    ],
    color: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  vip: {
    nombre: 'VIP',
    precio: '$75.000/mes',
    beneficios: [
      'Todo lo de Premium +',
      'Entrenador personal 2 veces/semana',
      'Nutricionista ilimitado',
      'Acceso a zona VIP exclusiva',
      'Spa y sauna ilimitado',
      'Estacionamiento preferencial',
      'Bebidas energéticas gratis',
      '20% descuento en todos los productos',
      'Invitaciones a eventos exclusivos'
    ],
    color: 'linear-gradient(135deg, #d4af37, #f4d03f)'
  }
};

const RenovarMembresiaModal = ({ onClose, onRenovar, planActual }) => {
  const [planSeleccionado, setPlanSeleccionado] = useState(planActual?.toLowerCase() || 'premium');

  const handleRenovar = () => {
    onRenovar(planSeleccionado);
  };

  return (
    <div className="renovar-modal-overlay" onClick={onClose}>
      <div className="renovar-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="renovar-modal-header">
          <h3 className="renovar-modal-title">
            🔄 Renovar Membresía
          </h3>
          <button onClick={onClose} className="renovar-modal-close">
            ×
          </button>
        </div>

        <div className="renovar-modal-body">
          <p className="renovar-modal-subtitle">
            Selecciona el plan que mejor se adapte a tus necesidades
          </p>

          <div className="planes-grid">
            {Object.entries(PLANES_MEMBRESIA).map(([key, plan]) => (
              <div
                key={key}
                className={`plan-card ${planSeleccionado === key ? 'selected' : ''}`}
                onClick={() => setPlanSeleccionado(key)}
              >
                <div className="plan-header" style={{ background: plan.color }}>
                  <h4 className="plan-nombre">{plan.nombre}</h4>
                  <div className="plan-precio">{plan.precio}</div>
                </div>

                <div className="plan-beneficios">
                  {plan.beneficios.map((beneficio, index) => (
                    <div key={index} className="beneficio-item">
                      <span className="beneficio-icon">✓</span>
                      <span className="beneficio-text">{beneficio}</span>
                    </div>
                  ))}
                </div>

                {planSeleccionado === key && (
                  <div className="plan-seleccionado-badge">
                    ✓ Seleccionado
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="renovar-modal-footer">
          <button onClick={onClose} className="btn-cancelar-renovar">
            Cancelar
          </button>
          <button onClick={handleRenovar} className="btn-confirmar-renovar">
            Confirmar Renovación
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenovarMembresiaModal;