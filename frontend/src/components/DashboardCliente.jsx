import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/components/DashboardCliente.css';

const DashboardCliente = () => {
  const { user, logout } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(0);

  // Datos mock - estos vendrían de tu API
  const membresiaData = {
    tipo: 'Premium',
    estado: 'Activa',
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-15',
    diasRestantes: 107,
    precio: '$45.000/mes',
    beneficios: ['Acceso ilimitado', 'Todas las clases', 'Casillero personal', 'Nutricionista gratis']
  };

  const pagosRecientes = [
    { id: 1, fecha: '2024-12-01', monto: '$45.000', metodo: 'Tarjeta', estado: 'Completado' },
    { id: 2, fecha: '2024-11-01', monto: '$45.000', metodo: 'Transferencia', estado: 'Completado' },
    { id: 3, fecha: '2024-10-01', monto: '$45.000', metodo: 'Tarjeta', estado: 'Completado' }
  ];

  const proximoPago = {
    fecha: '2025-01-01',
    monto: '$45.000',
    diasParaVencimiento: 7
  };

  // Clases de la semana actual
  const clasesSemanales = [
    {
      dia: 'Lunes',
      fecha: '2024-12-23',
      clases: [
        { id: 1, hora: '07:00', nombre: 'Spinning', entrenador: 'Carlos Ruiz', cupos: '3/15', estado: 'reservada' },
        { id: 2, hora: '18:00', nombre: 'CrossFit', entrenador: 'María López', cupos: '12/20', estado: 'disponible' }
      ]
    },
    {
      dia: 'Martes',
      fecha: '2024-12-24',
      clases: [
        { id: 3, hora: '08:00', nombre: 'Yoga', entrenador: 'Ana Silva', cupos: '5/12', estado: 'disponible' }
      ]
    },
    {
      dia: 'Miércoles',
      fecha: '2024-12-25',
      clases: [
        { id: 4, hora: '07:00', nombre: 'Spinning', entrenador: 'Carlos Ruiz', cupos: '8/15', estado: 'reservada' },
        { id: 5, hora: '19:00', nombre: 'Funcional', entrenador: 'Pedro Gómez', cupos: '15/25', estado: 'disponible' }
      ]
    },
    {
      dia: 'Jueves',
      fecha: '2024-12-26',
      clases: [
        { id: 6, hora: '18:30', nombre: 'Zumba', entrenador: 'Laura Torres', cupos: '10/20', estado: 'disponible' }
      ]
    },
    {
      dia: 'Viernes',
      fecha: '2024-12-27',
      clases: [
        { id: 7, hora: '07:00', nombre: 'CrossFit', entrenador: 'María López', cupos: 'Lleno', estado: 'llena' }
      ]
    },
    {
      dia: 'Sábado',
      fecha: '2024-12-28',
      clases: [
        { id: 8, hora: '09:00', nombre: 'Pilates', entrenador: 'Ana Silva', cupos: '6/15', estado: 'reservada' }
      ]
    },
    {
      dia: 'Domingo',
      fecha: '2024-12-29',
      clases: []
    }
  ];

  const estadisticas = {
    clasesEsteMes: 12,
    clasesTotales: 45,
    asistencia: '92%',
    racha: 5
  };

  const cambiarSemana = (direccion) => {
    setCurrentWeek(prev => prev + direccion);
  };

  const handleReservar = (claseId) => {
    console.log('Reservar clase:', claseId);
    // Aquí iría la lógica para reservar
  };

  const handleCancelar = (claseId) => {
    console.log('Cancelar reserva:', claseId);
    // Aquí iría la lógica para cancelar
  };

  return (
    <div className="dashboard-cliente-container">
      {/* Header */}
      <header className="dashboard-cliente-header">
        <div className="dashboard-cliente-header-content">
          <h1>🏋️ Mi Gimnasio</h1>
          <div className="dashboard-cliente-user-info">
            <span className="dashboard-cliente-user-name">
              {user?.first_name} {user?.last_name}
            </span>
            <button onClick={logout} className="dashboard-cliente-logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-cliente-main">
        {/* Bienvenida y Estadísticas Rápidas */}
        <section className="dashboard-cliente-welcome">
          <h2>¡Hola {user?.first_name}! 👋</h2>
          <div className="dashboard-cliente-stats-quick">
            <div className="stat-quick-item">
              <span className="stat-icon">📅</span>
              <div>
                <strong>{estadisticas.clasesEsteMes}</strong>
                <span>Clases este mes</span>
              </div>
            </div>
            <div className="stat-quick-item">
              <span className="stat-icon">✅</span>
              <div>
                <strong>{estadisticas.asistencia}</strong>
                <span>Asistencia</span>
              </div>
            </div>
            <div className="stat-quick-item">
              <span className="stat-icon">🔥</span>
              <div>
                <strong>{estadisticas.racha} días</strong>
                <span>Racha actual</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Clases Semanales */}
        <section className="dashboard-cliente-clases">
          <div className="clases-header">
            <h3>📅 Mis Clases de la Semana</h3>
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
                    <p className="no-clases">Sin clases</p>
                  ) : (
                    dia.clases.map((clase) => (
                      <div 
                        key={clase.id} 
                        className={`clase-item ${clase.estado}`}
                      >
                        <div className="clase-item-info">
                          <span className="clase-hora">{clase.hora}</span>
                          <div className="clase-details">
                            <strong>{clase.nombre}</strong>
                            <span className="clase-entrenador">
                              👤 {clase.entrenador}
                            </span>
                            <span className="clase-cupos">
                              {clase.estado === 'llena' ? '🔒 ' : '👥 '}{clase.cupos}
                            </span>
                          </div>
                        </div>
                        <div className="clase-item-actions">
                          {clase.estado === 'reservada' ? (
                            <button 
                              onClick={() => handleCancelar(clase.id)}
                              className="btn-cancelar"
                            >
                              Cancelar
                            </button>
                          ) : clase.estado === 'llena' ? (
                            <span className="btn-llena">Llena</span>
                          ) : (
                            <button 
                              onClick={() => handleReservar(clase.id)}
                              className="btn-reservar"
                            >
                              Reservar
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar con Membresía y Pagos */}
        <aside className="dashboard-cliente-sidebar">
          {/* Membresía */}
          <div className="sidebar-card membresia-card">
            <h3>💳 Mi Membresía</h3>
            <div className="membresia-info">
              <div className="membresia-badge">{membresiaData.tipo}</div>
              <div className={`membresia-estado ${membresiaData.estado.toLowerCase()}`}>
                {membresiaData.estado}
              </div>
            </div>
            <div className="membresia-details">
              <div className="detail-row">
                <span>Precio:</span>
                <strong>{membresiaData.precio}</strong>
              </div>
              <div className="detail-row">
                <span>Vence:</span>
                <strong>{membresiaData.fechaVencimiento}</strong>
              </div>
              <div className="detail-row highlight">
                <span>Días restantes:</span>
                <strong>{membresiaData.diasRestantes} días</strong>
              </div>
            </div>
            <div className="membresia-beneficios">
              <h4>Beneficios incluidos:</h4>
              {membresiaData.beneficios.map((beneficio, idx) => (
                <div key={idx} className="beneficio-item">
                  ✓ {beneficio}
                </div>
              ))}
            </div>
            <button className="btn-renovar">Renovar Membresía</button>
          </div>

          {/* Próximo Pago */}
          <div className="sidebar-card proximo-pago-card">
            <h3>💰 Próximo Pago</h3>
            <div className="proximo-pago-info">
              <div className="pago-fecha">
                <span>Fecha:</span>
                <strong>{proximoPago.fecha}</strong>
              </div>
              <div className="pago-monto">
                <span>Monto:</span>
                <strong>{proximoPago.monto}</strong>
              </div>
              <div className="pago-alerta">
                ⏰ Faltan {proximoPago.diasParaVencimiento} días
              </div>
            </div>
            <button className="btn-pagar-ahora">Pagar Ahora</button>
          </div>

          {/* Historial de Pagos */}
          <div className="sidebar-card pagos-card">
            <h3>📜 Historial de Pagos</h3>
            <div className="pagos-list">
              {pagosRecientes.map((pago) => (
                <div key={pago.id} className="pago-item">
                  <div className="pago-info">
                    <strong>{pago.fecha}</strong>
                    <span>{pago.metodo}</span>
                  </div>
                  <div className="pago-monto-estado">
                    <strong>{pago.monto}</strong>
                    <span className={`estado-${pago.estado.toLowerCase()}`}>
                      {pago.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-ver-todos">Ver Todos los Pagos</button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default DashboardCliente;