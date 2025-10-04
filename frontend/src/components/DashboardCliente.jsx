import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardCliente = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [calificaciones, setCalificaciones] = useState({});
  const [showCalificarModal, setShowCalificarModal] = useState(null);

  // CORRECCIÓN: Usar el usuario real del contexto
  const { user, logout } = useAuth();

  // Datos mock de membresía (estos vendrían del backend en producción)
  const membresiaData = {
    tipo: 'Premium',
    estado: 'Activa',
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-15',
    diasRestantes: 107,
    precio: '$45.000/mes',
    beneficios: ['Acceso ilimitado', 'Todas las clases', 'Casillero personal', 'Nutricionista gratis']
  };

  const estadisticas = {
    clasesEsteMes: 12,
    clasesTotales: 45,
    asistencia: '92%',
    racha: 5
  };

  const clasesSemanales = [
    {
      dia: 'Lunes',
      fecha: '2024-12-23',
      clases: [
        { 
          id: 1, 
          hora: '07:00', 
          nombre: 'Spinning', 
          entrenador: 'Carlos Ruiz',
          entrenadorId: 1,
          cupos: '3/15', 
          estado: 'reservada',
          calificacionEntrenador: 4.8
        }
      ]
    },
    {
      dia: 'Martes',
      fecha: '2024-12-24',
      clases: [
        { 
          id: 3, 
          hora: '08:00', 
          nombre: 'Yoga', 
          entrenador: 'Ana Silva',
          entrenadorId: 2,
          cupos: '5/12', 
          estado: 'disponible',
          calificacionEntrenador: 4.9
        }
      ]
    },
    {
      dia: 'Miércoles',
      fecha: '2024-12-25',
      clases: [
        { 
          id: 4, 
          hora: '07:00', 
          nombre: 'Spinning', 
          entrenador: 'Carlos Ruiz',
          entrenadorId: 1,
          cupos: '8/15', 
          estado: 'reservada',
          calificacionEntrenador: 4.8
        }
      ]
    },
    {
      dia: 'Jueves',
      fecha: '2024-12-26',
      clases: []
    },
    {
      dia: 'Viernes',
      fecha: '2024-12-27',
      clases: [
        { 
          id: 7, 
          hora: '07:00', 
          nombre: 'CrossFit', 
          entrenador: 'María López',
          entrenadorId: 3,
          cupos: 'Lleno', 
          estado: 'llena',
          calificacionEntrenador: 4.9
        }
      ]
    },
    {
      dia: 'Sábado',
      fecha: '2024-12-28',
      clases: [
        { 
          id: 8, 
          hora: '09:00', 
          nombre: 'Pilates', 
          entrenador: 'Ana Silva',
          entrenadorId: 2,
          cupos: '6/15', 
          estado: 'reservada',
          calificacionEntrenador: 4.9
        }
      ]
    },
    {
      dia: 'Domingo',
      fecha: '2024-12-29',
      clases: []
    }
  ];

  const handleCalificar = (entrenadorId, rating) => {
    setCalificaciones({...calificaciones, [entrenadorId]: rating});
    setShowCalificarModal(null);
    alert(`¡Gracias por tu calificación de ${rating} estrellas!`);
  };

  const CalificarModal = ({ clase, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }} onClick={onClose}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#2d3748', fontSize: '1.25rem', margin: 0 }}>
              Calificar a {clase.entrenador}
            </h3>
            <button onClick={onClose} style={{
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#718096',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease'
            }}>×</button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
              ¿Cómo fue tu experiencia en la clase de {clase.nombre}?
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{
                    cursor: 'pointer',
                    color: star <= (hover || rating) ? '#fbbf24' : '#e2e8f0',
                    transition: 'all 0.2s ease',
                    transform: star <= (hover || rating) ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  ⭐
                </span>
              ))}
            </div>

            {rating > 0 && (
              <p style={{ color: '#667eea', fontWeight: '600', marginBottom: '1rem' }}>
                {rating === 5 ? '¡Excelente!' : 
                 rating === 4 ? 'Muy buena' : 
                 rating === 3 ? 'Buena' : 
                 rating === 2 ? 'Regular' : 'Necesita mejorar'}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={onClose} style={{
              flex: 1,
              padding: '0.75rem',
              background: 'transparent',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#4a5568'
            }}>
              Cancelar
            </button>
            <button 
              onClick={() => handleCalificar(clase.entrenadorId, rating)}
              disabled={rating === 0}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: rating === 0 ? '#e2e8f0' : 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: rating === 0 ? 'not-allowed' : 'pointer',
                color: 'white',
                opacity: rating === 0 ? 0.6 : 1
              }}>
              Enviar Calificación
            </button>
          </div>
        </div>
      </div>
    );
  };

  // CORRECCIÓN: Mostrar loading mientras no hay usuario
  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              🏋️
            </div>
            <h1 style={{ color: '#2d3748', fontSize: '1.75rem', margin: 0 }}>
              Mi Gimnasio
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* CORRECCIÓN: Mostrar el nombre real del usuario autenticado */}
            <span style={{ fontWeight: '600', color: '#2d3748' }}>
              {user.first_name} {user.last_name}
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              Cliente
            </span>
            {/* CORRECCIÓN: Usar la función logout del contexto */}
            <button onClick={logout} style={{
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gridTemplateRows: 'auto 1fr',
        gap: '2rem'
      }}>
        {/* Bienvenida - CORRECCIÓN: Usar el nombre real del usuario */}
        <section style={{
          gridColumn: '1 / -1',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white'
        }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem' }}>
            ¡Hola {user.first_name}! 👋
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>📅</span>
              <div>
                <strong style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  {estadisticas.clasesEsteMes}
                </strong>
                <span style={{ fontSize: '0.85rem', opacity: 0.9, display: 'block' }}>
                  Clases este mes
                </span>
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>✅</span>
              <div>
                <strong style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  {estadisticas.asistencia}
                </strong>
                <span style={{ fontSize: '0.85rem', opacity: 0.9, display: 'block' }}>
                  Asistencia
                </span>
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>🔥</span>
              <div>
                <strong style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  {estadisticas.racha} días
                </strong>
                <span style={{ fontSize: '0.85rem', opacity: 0.9, display: 'block' }}>
                  Racha actual
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Clases */}
        <section style={{ gridColumn: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#2d3748', fontSize: '1.5rem', margin: 0 }}>
              📅 Mis Clases de la Semana
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {clasesSemanales.map((dia) => (
              <div key={dia.dia} style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}>
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
                      <div key={clase.id} style={{
                        border: `2px solid ${clase.estado === 'reservada' ? '#48bb78' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        padding: '0.75rem',
                        background: clase.estado === 'reservada' ? '#f0fff4' : 'white'
                      }}>
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <span style={{
                            fontWeight: '700',
                            color: '#667eea',
                            fontSize: '0.9rem',
                            minWidth: '45px'
                          }}>
                            {clase.hora}
                          </span>
                          <div style={{ flex: 1 }}>
                            <strong style={{ color: '#2d3748', fontSize: '0.95rem' }}>
                              {clase.nombre}
                            </strong>
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#718096',
                              marginTop: '0.15rem'
                            }}>
                              👤 {clase.entrenador}
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              marginTop: '0.25rem'
                            }}>
                              <span style={{ fontSize: '0.75rem', color: '#718096' }}>
                                ⭐ {clase.calificacionEntrenador}
                              </span>
                              {clase.estado === 'reservada' && (
                                <button
                                  onClick={() => setShowCalificarModal(clase)}
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
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside style={{
          gridColumn: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
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
                background: '#c6f6d5',
                color: '#22543d'
              }}>
                {membresiaData.estado}
              </div>
            </div>
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
        </aside>
      </main>

      {showCalificarModal && (
        <CalificarModal
          clase={showCalificarModal}
          onClose={() => setShowCalificarModal(null)}
        />
      )}
    </div>
  );
};

export default DashboardCliente;