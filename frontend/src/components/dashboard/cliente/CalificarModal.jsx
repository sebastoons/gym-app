// frontend/src/components/dashboard/cliente/CalificarModal.jsx

import React, { useState } from 'react';
import './CalificarModal.css';

/**
 * Modal para calificar entrenadores después de una clase
 * @param {Object} clase - Objeto con los datos de la clase
 * @param {function} onClose - Callback para cerrar el modal
 * @param {function} onSubmit - Callback al enviar la calificación (entrenadorId, rating)
 */
const CalificarModal = ({ clase, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(clase.entrenadorId, rating);
    }
  };

  const getRatingText = () => {
    if (rating === 5) return '¡Excelente!';
    if (rating === 4) return 'Muy buena';
    if (rating === 3) return 'Buena';
    if (rating === 2) return 'Regular';
    if (rating === 1) return 'Necesita mejorar';
    return '';
  };

  return (
    <div className="calificar-modal-overlay" onClick={onClose}>
      <div className="calificar-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="calificar-modal-header">
          <h3 className="calificar-modal-title">
            Calificar a {clase.entrenador}
          </h3>
          <button onClick={onClose} className="calificar-modal-close">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="calificar-modal-body">
          <p className="calificar-modal-question">
            ¿Cómo fue tu experiencia en la clase de {clase.nombre}?
          </p>
          
          {/* Estrellas */}
          <div className="calificar-modal-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`calificar-modal-star ${
                  star <= (hover || rating) ? 'filled' : 'empty'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Texto de feedback */}
          {rating > 0 && (
            <p className="calificar-modal-feedback">
              {getRatingText()}
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="calificar-modal-actions">
          <button onClick={onClose} className="calificar-modal-btn-cancel">
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            disabled={rating === 0}
            className="calificar-modal-btn-submit"
          >
            Enviar Calificación
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalificarModal;