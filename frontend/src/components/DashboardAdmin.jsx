import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/components/DashboardAdmin.css';

const DashboardAdmin = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Datos mock - estos vendrían de tu API
  const estadisticasGenerales = {
    clientesActivos: 156,
    entrenadores: 12,
    clasesHoy: 24,
    ingresosEsteMes: '$12.450.000',
    asistenciaPromedio: '89%',
    membresiasPorVencer: 8
  };

  const ingresosMensuales = [
    { mes: 'Julio', ingresos: 10200000 },
    { mes: 'Agosto', ingresos: 11500000 },
    { mes: 'Septiembre', ingresos: 11800000 },
    { mes: 'Octubre', ingresos: 12100000 },
    { mes: 'Noviembre', ingresos: 12300000 },
    { mes: 'Diciembre', ingresos: 12450000 }
  ];

  const clientesRecientes = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', membresia: 'Premium', estado: 'Activo', fechaRegistro: '2024-12-20' },
    { id: 2, nombre: 'María González', email: 'maria@email.com', membresia: 'Básica', estado: 'Activo', fechaRegistro: '2024-12-19' },
    { id: 3, nombre: 'Carlos Ruiz', email: 'carlos@email.com', membresia: 'Premium', estado: 'Activo', fechaRegistro: '2024-12-18' },
    { id: 4, nombre: 'Ana Silva', email: 'ana@email.com', membresia: 'Básica', estado: 'Inactivo', fechaRegistro: '2024-12-17' }
  ];

  const entrenadores = [
    { id: 1, nombre: 'Carlos Martínez', especialidad: 'Spinning', clases: 15, alumnos: 45, sueldo: '$850.000', calificacion: 4.8 },
    { id: 2, nombre: 'María López', especialidad: 'CrossFit', clases: 12, alumnos: 38, sueldo: '$800.000', calificacion: 4.9 },
    { id: 3, nombre: 'Pedro Gómez', especialidad: 'Funcional', clases: 10, alumnos: 32, sueldo: '$750.000', calificacion: 4.7 },
    { id: 4, nombre: 'Ana Torres', especialidad: 'Yoga/Pilates', clases: 14, alumnos: 41, sueldo: '$820.000', calificacion: 4.9 }
  ];

  const clasesHoy = [
    { id: 1, hora: '07:00', nombre: 'Spinning', entrenador: 'Carlos Martínez', inscritos: 12, capacidad: 15, sala: 'A' },
    { id: 2, hora: '08:00', nombre: 'Yoga', entrenador: 'Ana Torres', inscritos: 10, capacidad: 12, sala: 'B' },
    { id: 3, hora: '09:00', nombre: 'CrossFit', entrenador: 'María López', inscritos: 15, capacidad: 20, sala: 'C' },
    { id: 4, hora: '18:00', nombre: 'Funcional', entrenador: 'Pedro Gómez', inscritos: 20, capacidad: 25, sala: 'A' }
  ];

  const pagosRecientes = [
    { id: 1, cliente: 'Juan Pérez', monto: '$45.000', fecha: '2024-12-22', metodo: 'Tarjeta', estado: 'Completado' },
    { id: 2, cliente: 'María González', monto: '$30.000', fecha: '2024-12-22', metodo: 'Transferencia', estado: 'Completado' },
    { id: 3, cliente: 'Carlos Ruiz', monto: '$45.000', fecha: '2024-12-21', metodo: 'Efectivo', estado: 'Completado' },
    { id: 4, cliente: 'Ana Silva', monto: '$30.000', fecha: '2024-12-20', metodo: 'Tarjeta', estado: 'Pendiente' }
  ];

  const membresiasProximas = [
    { id: 1, cliente: 'Pedro González', tipo: 'Premium', vencimiento: '2024-12-25', diasRestantes: 3 },
    { id: 2, cliente: 'Laura Martínez', tipo: 'Básica', vencimiento: '2024-12-27', diasRestantes: 5 },
    { id: 3, cliente: 'Diego Torres', tipo: 'Premium', vencimiento: '2024-12-28', diasRestantes: 6 },
    { id: 4, cliente: 'Sofia Ramírez', tipo: 'Básica', vencimiento: '2024-12-30', diasRestantes: 8 }
  ];

  const proximosPagosEntrenadores = [
    { id: 1, entrenador: 'Carlos Martínez', monto: '$850.000', fecha: '2025-01-05' },
    { id: 2, entrenador: 'María López', monto: '$800.000', fecha: '2025-01-05' },
    { id: 3, entrenador: 'Pedro Gómez', monto: '$750.000', fecha: '2025-01-05' },
    { id: 4, entrenador: 'Ana Torres', monto: '$820.000', fecha: '2025-01-05' }
  ];

  const renderOverview = () => (
    <div className="admin-overview">
      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card-admin highlight">
          <div className="stat-icon-admin">👥</div>
          <div className="stat-content">
            <h3>Clientes Activos</h3>
            <p className="stat-number">{estadisticasGenerales.clientesActivos}</p>
          </div>
        </div>
        <div className="stat-card-admin highlight">
          <div className="stat-icon-admin">💪</div>
          <div className="stat-content">
            <h3>Entrenadores</h3>
            <p className="stat-number">{estadisticasGenerales.entrenadores}</p>
          </div>
        </div>
        <div className="stat-card-admin highlight">
          <div className="stat-icon-admin">📅</div>
          <div className="stat-content">
            <h3>Clases Hoy</h3>
            <p className="stat-number">{estadisticasGenerales.clasesHoy}</p>
          </div>
        </div>
        <div className="stat-card-admin highlight">
          <div className="stat-icon-admin">💰</div>
          <div className="stat-content">
            <h3>Ingresos del Mes</h3>
            <p className="stat-number">{estadisticasGenerales.ingresosEsteMes}</p>
          </div>
        </div>
      </div>

      {/* Gráfico de ingresos */}
      <div className="admin-card">
        <h3>📈 Ingresos Mensuales (últimos 6 meses)</h3>
        <div className="ingresos-chart">
          {ingresosMensuales.map((item) => {
            const maxIngreso = Math.max(...ingresosMensuales.map(i => i.ingresos));
            const height = (item.ingresos / maxIngreso) * 100;
            return (
              <div key={item.mes} className="chart-bar-container">
                <div className="chart-bar" style={{ height: `${height}%` }}>
                  <span className="chart-value">${(item.ingresos / 1000000).toFixed(1)}M</span>
                </div>
                <span className="chart-label">{item.mes}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alertas y notificaciones */}
      <div className="admin-alerts">
        <div className="alert-card warning">
          <span className="alert-icon">⚠️</span>
          <div>
            <strong>Membresías por vencer</strong>
            <p>{estadisticasGenerales.membresiasPorVencer} clientes con membresía próxima a vencer</p>
          </div>
        </div>
        <div className="alert-card info">
          <span className="alert-icon">📊</span>
          <div>
            <strong>Asistencia</strong>
            <p>Promedio de asistencia: {estadisticasGenerales.asistenciaPromedio}</p>
          </div>
        </div>
      </div>

      {/* Clases de hoy */}
      <div className="admin-card">
        <h3>📅 Clases Programadas Hoy</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Clase</th>
                <th>Entrenador</th>
                <th>Sala</th>
                <th>Ocupación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {clasesHoy.map((clase) => (
                <tr key={clase.id}>
                  <td><strong>{clase.hora}</strong></td>
                  <td>{clase.nombre}</td>
                  <td>{clase.entrenador}</td>
                  <td>Sala {clase.sala}</td>
                  <td>
                    <div className="ocupacion-bar">
                      <div 
                        className="ocupacion-fill" 
                        style={{ width: `${(clase.inscritos / clase.capacidad) * 100}%` }}
                      ></div>
                      <span className="ocupacion-text">{clase.inscritos}/{clase.capacidad}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${clase.inscritos === clase.capacidad ? 'badge-full' : 'badge-available'}`}>
                      {clase.inscritos === clase.capacidad ? 'Llena' : 'Disponible'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClientes = () => (
    <div className="admin-section">
      <div className="section-header">
        <h3>👥 Gestión de Clientes</h3>
        <button className="btn-primary">+ Nuevo Cliente</button>
      </div>
      
      <div className="admin-card">
        <div className="search-bar">
          <input type="text" placeholder="Buscar cliente por nombre o email..." />
          <button className="btn-search">🔍 Buscar</button>
        </div>
        
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Membresía</th>
                <th>Estado</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesRecientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td><strong>{cliente.nombre}</strong></td>
                  <td>{cliente.email}</td>
                  <td>
                    <span className={`badge badge-${cliente.membresia.toLowerCase()}`}>
                      {cliente.membresia}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${cliente.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}`}>
                      {cliente.estado}
                    </span>
                  </td>
                  <td>{cliente.fechaRegistro}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Ver detalles">👁️</button>
                      <button className="btn-icon" title="Editar">✏️</button>
                      <button className="btn-icon" title="Eliminar">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEntrenadores = () => (
    <div className="admin-section">
      <div className="section-header">
        <h3>💪 Gestión de Entrenadores</h3>
        <button className="btn-primary">+ Nuevo Entrenador</button>
      </div>

      <div className="entrenadores-grid">
        {entrenadores.map((entrenador) => (
          <div key={entrenador.id} className="entrenador-card">
            <div className="entrenador-header">
              <div className="entrenador-avatar">
                {entrenador.nombre.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="entrenador-info">
                <h4>{entrenador.nombre}</h4>
                <p>{entrenador.especialidad}</p>
                <div className="rating">
                  ⭐ {entrenador.calificacion}/5.0
                </div>
              </div>
            </div>
            <div className="entrenador-stats">
              <div className="stat-item">
                <span className="stat-label">Clases/mes</span>
                <strong>{entrenador.clases}</strong>
              </div>
              <div className="stat-item">
                <span className="stat-label">Alumnos</span>
                <strong>{entrenador.alumnos}</strong>
              </div>
              <div className="stat-item">
                <span className="stat-label">Sueldo</span>
                <strong>{entrenador.sueldo}</strong>
              </div>
            </div>
            <div className="entrenador-actions">
              <button className="btn-secondary">Ver Horario</button>
              <button className="btn-secondary">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinanzas = () => (
    <div className="admin-section">
      <h3>💰 Gestión Financiera</h3>

      <div className="finanzas-grid">
        {/* Pagos recientes */}
        <div className="admin-card">
          <h4>💳 Pagos Recientes</h4>
          <div className="table-responsive">
            <table className="admin-table compact">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Método</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pagosRecientes.map((pago) => (
                  <tr key={pago.id}>
                    <td>{pago.cliente}</td>
                    <td><strong>{pago.monto}</strong></td>
                    <td>{pago.fecha}</td>
                    <td>{pago.metodo}</td>
                    <td>
                      <span className={`badge ${pago.estado === 'Completado' ? 'badge-success' : 'badge-pending'}`}>
                        {pago.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Próximos pagos a entrenadores */}
        <div className="admin-card">
          <h4>👨‍🏫 Próximos Pagos a Entrenadores</h4>
          <div className="pagos-entrenadores-list">
            {proximosPagosEntrenadores.map((pago) => (
              <div key={pago.id} className="pago-entrenador-item">
                <div className="pago-info">
                  <strong>{pago.entrenador}</strong>
                  <span className="pago-fecha">Fecha: {pago.fecha}</span>
                </div>
                <div className="pago-monto-large">
                  {pago.monto}
                </div>
              </div>
            ))}
            <div className="total-pagos">
              <strong>Total a pagar:</strong>
              <span className="total-amount">$3.220.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Membresías por vencer */}
      <div className="admin-card">
        <h4>⚠️ Membresías Próximas a Vencer</h4>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Vencimiento</th>
                <th>Días Restantes</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {membresiasProximas.map((membresia) => (
                <tr key={membresia.id}>
                  <td><strong>{membresia.cliente}</strong></td>
                  <td>
                    <span className={`badge badge-${membresia.tipo.toLowerCase()}`}>
                      {membresia.tipo}
                    </span>
                  </td>
                  <td>{membresia.vencimiento}</td>
                  <td>
                    <span className={`dias-restantes ${membresia.diasRestantes <= 3 ? 'urgente' : 'normal'}`}>
                      {membresia.diasRestantes} días
                    </span>
                  </td>
                  <td>
                    <button className="btn-action">Enviar Recordatorio</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-admin-container">
      {/* Header */}
      <header className="dashboard-admin-header">
        <div className="dashboard-admin-header-content">
          <h1>⚙️ Panel de Administración</h1>
          <div className="dashboard-admin-user-info">
            <span className="dashboard-admin-user-name">
              {user?.first_name} {user?.last_name}
            </span>
            <span className="admin-badge">Administrador</span>
            <button onClick={logout} className="dashboard-admin-logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <div className="admin-nav-content">
          <button 
            className={`nav-tab ${selectedTab === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedTab('overview')}
          >
            📊 Resumen
          </button>
          <button 
            className={`nav-tab ${selectedTab === 'clientes' ? 'active' : ''}`}
            onClick={() => setSelectedTab('clientes')}
          >
            👥 Clientes
          </button>
          <button 
            className={`nav-tab ${selectedTab === 'entrenadores' ? 'active' : ''}`}
            onClick={() => setSelectedTab('entrenadores')}
          >
            💪 Entrenadores
          </button>
          <button 
            className={`nav-tab ${selectedTab === 'finanzas' ? 'active' : ''}`}
            onClick={() => setSelectedTab('finanzas')}
          >
            💰 Finanzas
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-admin-main">
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'clientes' && renderClientes()}
        {selectedTab === 'entrenadores' && renderEntrenadores()}
        {selectedTab === 'finanzas' && renderFinanzas()}
      </main>
    </div>
  );
};

export default DashboardAdmin;