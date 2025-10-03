import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/components/DashboardEntrenador.css';

const DashboardEntrenador = () => {
  const { user, logout } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedClase, setSelectedClase] = useState(null);

  // Datos mock - estos vendrían de tu API
  const estadisticas = {
    clasesTotalesHoy: 3,
    alumnosTotales: 45,
    asistenciaPromedio: '87%',
    calificacion: 4.8,
    proximoPago: '2025-01-05',
    montoPago: '$850.000'
  };

  const clasesSemanales = [
    {
      dia: 'Lunes',
      fecha: '2024-12-23',
      clases: [
        { 
          id: 1, 
          hora: '07:00 - 08:00', 
          nombre: 'Spinning', 
          inscritos: 12,
          capacidad: 15,
          asistentes: null,
          alumnos: [
            { id: 1, nombre: 'Juan Pérez', asistio: null },
            { id: 2, nombre: 'María González', asistio: null },
            { id: 3, nombre: 'Carlos Ruiz', asistio: null }
          ]
        },
        { 
          id: 2, 
          hora: '18:00 - 19:00', 
          nombre: 'Spinning Avanzado', 
          inscritos: 8,
          capacidad: 15,
          asistentes: null,
          alumnos: []
        }
      ]
    },
    {
      dia: 'Martes',
      fecha: '2024-12-24',
      clases: []
    },
    {
      dia: 'Miércoles',
      fecha: '2024-12-25',
      clases: [
        { 
          id: 3, 
          hora: '07:00 - 08:00', 
          nombre: 'Spinning', 
          inscritos: 15,
          capacidad: 15,
          asistentes: 14,
          alumnos: []
        },
        { 
          id: 4, 
          hora: '19:00 - 20:00', 
          nombre: 'Spinning Principiantes', 
          inscritos: 10,
          capacidad: 15,
          asistentes: 9,
          alumnos: []
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
          id: 5, 
          hora: '07:00 - 08:00', 
          nombre: 'Spinning', 
          inscritos: 14,
          capacidad: 15,
          asistentes: null,
          alumnos: []
        }
      ]
    },
    {
      dia: 'Sábado',
      fecha: '2024-12-28',
      clases: [
        { 
          id: 6, 
          hora: '09:00 - 10:00', 
          nombre: 'Spinning Familiar', 
          inscritos: 6,
          capacidad: 15,
          asistentes: null,
          alumnos: []
        }
      ]
    },
    {
      dia: 'Domingo',
      fecha: '2024-12-29',
      clases: []
    }
  ];

  const alumnosDestacados = [
    { id: 1, nombre: 'Ana Silva', asistencia: '98%', clasesTomadas: 24 },
    { id: 2, nombre: 'Pedro Gómez', asistencia: '95%', clasesTomadas: 22 },
    { id: 3, nombre: 'Laura Torres', asistencia: '92%', clasesTomadas: 21 },
    { id: 4, nombre: 'Diego Morales', asistencia: '90%', clasesTomadas: 20 }
  ];

  const historialPagos = [
    { id: 1, mes: 'Diciembre 2024', monto: '$850.000', fecha: '2024-12-05', estado: 'Pagado' },
    { id: 2, mes: 'Noviembre 2024', monto: '$850.000', fecha: '2024-11-05', estado: 'Pagado' },
    { id: 3, mes: 'Octubre 2024', monto: '$850.000', fecha: '2024-10-05', estado: 'Pagado' }
  ];

  const cambiarSemana = (direccion) => {
    setCurrentWeek(prev => prev + direccion);
  };

  const verDetallesClase = (clase) => {
    setSelectedClase(clase);
  };

  const cerrarModal = () => {
    setSelectedClase(null);
  };

  return (
    <div className="dashboard-entrenador-container">
      {/* Header */}
      <header className="dashboard-entrenador-header">
        <div className="dashboard-entrenador-header-content">
          <h1>💪 Panel de Entrenador</h1>
          <div className="dashboard-entrenador-user-info">
            <span className="dashboard-entrenador-user-name">
              {user?.first_name} {user?.last_name}
            </span>
            <span className="entrenador-badge">Entrenador</span>
            <button onClick={logout} className="dashboard-entrenador-logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-entrenador-main">
        {/* Bienvenida y Estadísticas */}
        <section className="dashboard-entrenador-welcome">
          <h2>¡Hola {user?.first_name}! 👋</h2>
          <div className="dashboard-entrenador-stats">
            <div className="stat-card">
              <span className="stat-icon">📅</span>
              <div className="stat-info">
                <strong>{estadisticas.clasesTotalesHoy}</strong>
                <span>Clases hoy</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <div className="stat-info">
                <strong>{estadisticas.alumnosTotales}</strong>
                <span>Alumnos totales</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✅</span>
              <div className="stat-info">
                <strong>{estadisticas.asistenciaPromedio}</strong>
                <span>Asistencia promedio</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <strong>{estadisticas.calificacion}/5</strong>
                <span>Calificación</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mis Clases */}
        <section className="dashboard-entrenador-clases">
          <div className="clases-header">
            <h3>📋 Mis Clases de la Semana</h3>
            <div className="week-navigator">
              <button onClick={() => cambiarSemana(-1)} className="week-btn">
                ← Anterior
              </button>
              <span className="week-label">
                {currentWeek === 0 ? 'Esta Semana' : 
                 currentWeek > 0 ? `+${currentWeek} semana(s)` : 
                 `${currentWeek} semana(s) atrás`}
              </span>
              <button onClick={() => cambiarSemana(1)} className="week-btn">
                Siguiente →
              </button>
            </div>
          </div>

          <div className="clases-grid">
            {clasesSemanales.map((dia) => (
              <div key={dia.dia} className="clase-dia-card">
                <div className="clase-dia-header">
                  <h4>{dia.dia}</h4>
                  <span className="clase-fecha">{dia.fecha}</span>
                </div>
                <div className="clase-dia-content">
                  {dia.clases.length === 0 ? (
                    <p className="no-clases">Día libre</p>
                  ) : (
                    dia.clases.map((clase) => (
                      <div key={clase.id} className="clase-item-entrenador">
                        <div className="clase-item-info">
                          <span className="clase-hora">{clase.hora}</span>
                          <div className="clase-details">
                            <strong>{clase.nombre}</strong>
                            <span className="clase-inscritos">
                              👥 {clase.inscritos}/{clase.capacidad} inscritos
                            </span>
                            {clase.asistentes !== null && (
                              <span className="clase-asistencia">
                                ✅ {clase.asistentes} asistieron
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="clase-item-actions">
                          <button 
                            onClick={() => verDetallesClase(clase)}
                            className="btn-ver-detalles"
                          >
                            Ver Detalles
                          </button>
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
        <aside className="dashboard-entrenador-sidebar">
          {/* Próximo Pago */}
          <div className="sidebar-card pago-card">
            <h3>💰 Próximo Pago</h3>
            <div className="pago-info">
              <div className="pago-monto-grande">{estadisticas.montoPago}</div>
              <div className="pago-fecha-proxima">
                Fecha: <strong>{estadisticas.proximoPago}</strong>
              </div>
              <div className="pago-nota">
                Tu pago se deposita automáticamente el día 5 de cada mes
              </div>
            </div>
          </div>

          {/* Historial de Pagos */}
          <div className="sidebar-card historial-card">
            <h3>📜 Historial de Pagos</h3>
            <div className="historial-list">
              {historialPagos.map((pago) => (
                <div key={pago.id} className="historial-item">
                  <div className="historial-info">
                    <strong>{pago.mes}</strong>
                    <span>{pago.fecha}</span>
                  </div>
                  <div className="historial-monto">
                    <strong>{pago.monto}</strong>
                    <span className="estado-pagado">{pago.estado}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-ver-todos">Ver Todos</button>
          </div>

          {/* Alumnos Destacados */}
          <div className="sidebar-card alumnos-card">
            <h3>🏆 Alumnos Destacados</h3>
            <div className="alumnos-list">
              {alumnosDestacados.map((alumno, index) => (
                <div key={alumno.id} className="alumno-item">
                  <div className="alumno-rank">{index + 1}</div>
                  <div className="alumno-info">
                    <strong>{alumno.nombre}</strong>
                    <span>{alumno.clasesTomadas} clases • {alumno.asistencia} asistencia</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Modal de Detalles de Clase */}
      {selectedClase && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedClase.nombre}</h3>
              <button className="modal-close" onClick={cerrarModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-info-row">
                <strong>Horario:</strong> {selectedClase.hora}
              </div>
              <div className="modal-info-row">
                <strong>Inscritos:</strong> {selectedClase.inscritos}/{selectedClase.capacidad}
              </div>
              {selectedClase.asistentes !== null && (
                <div className="modal-info-row">
                  <strong>Asistencia:</strong> {selectedClase.asistentes}/{selectedClase.inscritos}
                </div>
              )}
              
              {selectedClase.alumnos.length > 0 && (
                <div className="modal-alumnos">
                  <h4>Lista de Alumnos:</h4>
                  <div className="modal-alumnos-list">
                    {selectedClase.alumnos.map((alumno) => (
                      <div key={alumno.id} className="modal-alumno-item">
                        <span>{alumno.nombre}</span>
                        {alumno.asistio !== null && (
                          <span className={`asistencia-badge ${alumno.asistio ? 'presente' : 'ausente'}`}>
                            {alumno.asistio ? '✓ Presente' : '✗ Ausente'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardEntrenador;