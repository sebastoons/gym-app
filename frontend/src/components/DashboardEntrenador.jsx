import React, { useState } from 'react';

const DashboardEntrenadorMejorado = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedClase, setSelectedClase] = useState(null);

  const user = {
    first_name: 'Carlos',
    last_name: 'Martínez'
  };

  const logout = () => {
    console.log('Cerrando sesión...');
  };

  const estadisticas = {
    clasesTotalesHoy: 3,
    alumnosTotales: 45,
    asistenciaPromedio: '87%',
    calificacion: 4.8,
    proximoPago: '2025-01-05',
    montoPago: '$850.000'
  };

  // Función para obtener las fechas de la semana
  const getWeekDates = (weekOffset) => {
    const today = new Date('2024-12-23'); // Fecha base
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    
    const monday = new Date(today);
    monday.setDate(diff + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-CL', options);
  };

  const getDayName = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  };

  const getWeekLabel = () => {
    if (currentWeek === 0) return 'Esta Semana';
    if (currentWeek === -1) return 'Semana Pasada';
    if (currentWeek === 1) return 'Próxima Semana';
    if (currentWeek < 0) return `${Math.abs(currentWeek)} semanas atrás`;
    return `+${currentWeek} semanas`;
  };

  // Generar clases para la semana actual
  const weekDates = getWeekDates(currentWeek);
  const clasesSemanales = weekDates.map((date, index) => {
    const dayName = getDayName(date);
    const dateStr = formatDate(date);
    
    // Clases predefinidas por día (solo algunos días tienen clases)
    const clasesBase = {
      'Lunes': [
        { 
          id: 1, 
          hora: '07:00 - 08:00', 
          nombre: 'Spinning', 
          inscritos: 12,
          capacidad: 15,
          asistentes: currentWeek < 0 ? 11 : null
        },
        { 
          id: 2, 
          hora: '18:00 - 19:00', 
          nombre: 'Spinning Avanzado', 
          inscritos: 8,
          capacidad: 15,
          asistentes: currentWeek < 0 ? 8 : null
        }
      ],
      'Miércoles': [
        { 
          id: 3, 
          hora: '07:00 - 08:00', 
          nombre: 'Spinning', 
          inscritos: 15,
          capacidad: 15,
          asistentes: currentWeek < 0 ? 14 : null
        }
      ],
      'Viernes': [
        { 
          id: 5, 
          hora: '07:00 - 08:00', 
          nombre: 'Spinning', 
          inscritos: 14,
          capacidad: 15,
          asistentes: currentWeek < 0 ? 13 : null
        }
      ],
      'Sábado': [
        { 
          id: 6, 
          hora: '09:00 - 10:00', 
          nombre: 'Spinning Familiar', 
          inscritos: 6,
          capacidad: 15,
          asistentes: currentWeek < 0 ? 6 : null
        }
      ]
    };

    return {
      dia: dayName,
      fecha: dateStr,
      clases: clasesBase[dayName] || []
    };
  });

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
              background: 'linear-gradient(135deg, #38a169, #48bb78)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              💪
            </div>
            <h1 style={{ color: '#2d3748', fontSize: '1.75rem', margin: 0 }}>
              Panel de Entrenador
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: '600', color: '#2d3748' }}>
              {user.first_name} {user.last_name}
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #38a169, #48bb78)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              Entrenador
            </span>
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
        {/* Bienvenida */}
        <section style={{
          gridColumn: '1 / -1',
          background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white'
        }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '2rem' }}>
            ¡Hola {user.first_name}! 👋
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2.5rem' }}>📅</span>
              <div>
                <strong style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                  {estadisticas.clasesTotalesHoy}
                </strong>
                <span style={{ fontSize: '0.9rem', opacity: 0.95, display: 'block' }}>
                  Clases hoy
                </span>
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2.5rem' }}>👥</span>
              <div>
                <strong style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                  {estadisticas.alumnosTotales}
                </strong>
                <span style={{ fontSize: '0.9rem', opacity: 0.95, display: 'block' }}>
                  Alumnos totales
                </span>
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2.5rem' }}>✅</span>
              <div>
                <strong style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                  {estadisticas.asistenciaPromedio}
                </strong>
                <span style={{ fontSize: '0.9rem', opacity: 0.95, display: 'block' }}>
                  Asistencia promedio
                </span>
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2.5rem' }}>⭐</span>
              <div>
                <strong style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                  {estadisticas.calificacion}/5
                </strong>
                <span style={{ fontSize: '0.9rem', opacity: 0.95, display: 'block' }}>
                  Calificación
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
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h3 style={{ color: '#2d3748', fontSize: '1.5rem', margin: 0 }}>
              📋 Mis Clases de la Semana
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <button 
                onClick={() => setCurrentWeek(prev => prev - 1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38a169',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px'
                }}
              >
                ← Anterior
              </button>
              <span style={{
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '0.9rem',
                minWidth: '140px',
                textAlign: 'center'
              }}>
                {getWeekLabel()}
              </span>
              <button 
                onClick={() => setCurrentWeek(prev => prev + 1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38a169',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '6px'
                }}
              >
                Siguiente →
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {clasesSemanales.map((dia) => (
              <div key={dia.fecha} style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #38a169, #48bb78)',
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
                      Día libre
                    </p>
                  ) : (
                    dia.clases.map((clase) => (
                      <div key={clase.id} style={{
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <span style={{
                            fontWeight: '700',
                            color: '#38a169',
                            fontSize: '0.85rem',
                            minWidth: '80px'
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
                              marginTop: '0.25rem'
                            }}>
                              👥 {clase.inscritos}/{clase.capacidad} inscritos
                            </div>
                            {clase.asistentes !== null && (
                              <div style={{
                                fontSize: '0.75rem',
                                color: '#38a169',
                                fontWeight: '600',
                                marginTop: '0.25rem'
                              }}>
                                ✅ {clase.asistentes} asistieron
                              </div>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedClase(clase)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#38a169',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                          }}
                        >
                          Ver Detalles
                        </button>
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
            border: '2px solid #38a169',
            background: 'linear-gradient(to bottom, white, #f0fff4)'
          }}>
            <h3 style={{
              color: '#2d3748',
              fontSize: '1.1rem',
              margin: '0 0 1rem 0'
            }}>
              💰 Próximo Pago
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#38a169',
                margin: '0.5rem 0'
              }}>
                {estadisticas.montoPago}
              </div>
              <div style={{
                padding: '0.75rem',
                background: 'white',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#4a5568'
              }}>
                Fecha: <strong style={{ color: '#2d3748', fontWeight: '700' }}>
                  {estadisticas.proximoPago}
                </strong>
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: '#718096',
                fontStyle: 'italic',
                padding: '0.5rem',
                background: '#edf2f7',
                borderRadius: '6px'
              }}>
                Tu pago se deposita automáticamente el día 5 de cada mes
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Modal */}
      {selectedClase && (
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
        }} onClick={() => setSelectedClase(null)}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
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
              <h3 style={{ color: '#2d3748', fontSize: '1.5rem', margin: 0 }}>
                {selectedClase.nombre}
              </h3>
              <button onClick={() => setSelectedClase(null)} style={{
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
                borderRadius: '50%'
              }}>×</button>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                padding: '0.75rem',
                background: '#f7fafc',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <strong style={{ color: '#718096', fontWeight: '600' }}>Horario:</strong>
                <strong style={{ color: '#2d3748' }}>{selectedClase.hora}</strong>
              </div>
              <div style={{
                padding: '0.75rem',
                background: '#f7fafc',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <strong style={{ color: '#718096', fontWeight: '600' }}>Inscritos:</strong>
                <strong style={{ color: '#2d3748' }}>
                  {selectedClase.inscritos}/{selectedClase.capacidad}
                </strong>
              </div>
              {selectedClase.asistentes !== null && (
                <div style={{
                  padding: '0.75rem',
                  background: '#f7fafc',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <strong style={{ color: '#718096', fontWeight: '600' }}>Asistencia:</strong>
                  <strong style={{ color: '#2d3748' }}>
                    {selectedClase.asistentes}/{selectedClase.inscritos}
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardEntrenadorMejorado;