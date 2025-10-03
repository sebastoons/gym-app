import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/components/DashboardAdmin.css';

const DashboardAdmin = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Datos expandidos
  const estadisticas = {
    clientesActivos: 156,
    clientesInactivos: 24,
    clientesDeudores: 8,
    entrenadores: 12,
    clasesHoy: 24,
    ingresosEsteMes: 12450000,
    gastosEsteMes: 8200000,
    utilidadMes: 4250000,
    asistenciaPromedio: 89,
    membresiasPorVencer: 8
  };

  const membresias = {
    tipos: [
      { nombre: 'Premium', cantidad: 89, precio: 45000, color: '#667eea' },
      { nombre: 'Básica', cantidad: 67, precio: 30000, color: '#38a169' },
      { nombre: 'VIP', cantidad: 0, precio: 75000, color: '#ed8936' }
    ],
    activas: 156,
    inactivas: 24,
    porVencer: 8
  };

  const clientesDeudores = [
    { id: 1, nombre: 'Pedro González', deuda: 90000, mesesAtrasados: 2, ultimoPago: '2024-10-15' },
    { id: 2, nombre: 'Laura Martínez', deuda: 45000, mesesAtrasados: 1, ultimoPago: '2024-11-20' },
    { id: 3, nombre: 'Diego Torres', deuda: 135000, mesesAtrasados: 3, ultimoPago: '2024-09-10' },
    { id: 4, nombre: 'Sofia Ramírez', deuda: 45000, mesesAtrasados: 1, ultimoPago: '2024-11-18' }
  ];

  const entrenadores = [
    { 
      id: 1, 
      nombre: 'Carlos Martínez', 
      especialidad: 'Spinning', 
      contrato: 'Indefinido',
      fechaIngreso: '2023-01-15',
      sueldo: 850000,
      clases: 15, 
      alumnos: 45, 
      calificacion: 4.8,
      horasSemanales: 20
    },
    { 
      id: 2, 
      nombre: 'María López', 
      especialidad: 'CrossFit', 
      contrato: 'Plazo Fijo',
      fechaIngreso: '2023-03-20',
      sueldo: 800000,
      clases: 12, 
      alumnos: 38, 
      calificacion: 4.9,
      horasSemanales: 16
    },
    { 
      id: 3, 
      nombre: 'Pedro Gómez', 
      especialidad: 'Funcional', 
      contrato: 'Indefinido',
      fechaIngreso: '2022-11-10',
      sueldo: 750000,
      clases: 10, 
      alumnos: 32, 
      calificacion: 4.7,
      horasSemanales: 14
    },
    { 
      id: 4, 
      nombre: 'Ana Torres', 
      especialidad: 'Yoga/Pilates', 
      contrato: 'Indefinido',
      fechaIngreso: '2023-05-05',
      sueldo: 820000,
      clases: 14, 
      alumnos: 41, 
      calificacion: 4.9,
      horasSemanales: 18
    }
  ];

  const implementaciones = [
    { id: 1, item: 'Bicicletas Spinning', cantidad: 15, estado: 'Bueno', ultimoMantenimiento: '2024-11-15', proximoMantenimiento: '2025-02-15' },
    { id: 2, item: 'Máquinas Cardio', cantidad: 8, estado: 'Bueno', ultimoMantenimiento: '2024-10-20', proximoMantenimiento: '2025-01-20' },
    { id: 3, item: 'Pesas y Mancuernas', cantidad: 50, estado: 'Regular', ultimoMantenimiento: '2024-09-10', proximoMantenimiento: '2024-12-10' },
    { id: 4, item: 'Colchonetas Yoga', cantidad: 20, estado: 'Bueno', ultimoMantenimiento: '2024-11-01', proximoMantenimiento: '2025-02-01' },
    { id: 5, item: 'Rack de Sentadillas', cantidad: 3, estado: 'Excelente', ultimoMantenimiento: '2024-12-01', proximoMantenimiento: '2025-03-01' }
  ];

  const facturacion = {
    mesActual: {
      ingresos: 12450000,
      egresos: 8200000,
      utilidad: 4250000
    },
    desglose: {
      ingresosMembesias: 10800000,
      ingresosClasesExtra: 1200000,
      ingresosProductos: 450000,
      sueldos: 3220000,
      arriendo: 2500000,
      servicios: 800000,
      mantenimiento: 480000,
      otros: 1200000
    }
  };

  const renderOverview = () => (
    <div className="admin-overview">
      {/* KPIs Principales */}
      <div className="admin-kpis">
        <div className="kpi-card kpi-activos">
          <div className="kpi-label">CLIENTES ACTIVOS</div>
          <div className="kpi-value">{estadisticas.clientesActivos}</div>
          <div className="kpi-meta">+12 este mes</div>
        </div>

        <div className="kpi-card kpi-deudores">
          <div className="kpi-label">DEUDORES</div>
          <div className="kpi-value">{estadisticas.clientesDeudores}</div>
          <div className="kpi-meta">
            ${(clientesDeudores.reduce((sum, c) => sum + c.deuda, 0) / 1000).toFixed(0)}k en deuda
          </div>
        </div>

        <div className="kpi-card kpi-utilidad">
          <div className="kpi-label">UTILIDAD DEL MES</div>
          <div className="kpi-value">${(estadisticas.utilidadMes / 1000000).toFixed(1)}M</div>
          <div className="kpi-meta">+18% vs mes anterior</div>
        </div>

        <div className="kpi-card kpi-asistencia">
          <div className="kpi-label">ASISTENCIA</div>
          <div className="kpi-value">{estadisticas.asistenciaPromedio}%</div>
          <div className="kpi-meta">Promedio mensual</div>
        </div>
      </div>

      {/* Alertas Críticas */}
      <div className="admin-alertas-criticas">
        <h3>⚠️ Alertas Críticas</h3>
        <div className="alertas-grid">
          <div className="alerta-item">
            <span className="alerta-texto">
              <strong>{estadisticas.clientesDeudores}</strong> clientes con pagos pendientes
            </span>
            <button className="btn-alerta-deudores">Ver Deudores</button>
          </div>
          <div className="alerta-item">
            <span className="alerta-texto">
              <strong>{estadisticas.membresiasPorVencer}</strong> membresías vencen en 7 días
            </span>
            <button className="btn-alerta-membresias">Enviar Recordatorios</button>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="admin-graficos">
        {/* Distribución de Membresías */}
        <div className="grafico-card">
          <h3>📊 Distribución de Membresías</h3>
          <div className="membresias-distribucion">
            {membresias.tipos.map(tipo => {
              const porcentaje = (tipo.cantidad / membresias.activas) * 100;
              return (
                <div key={tipo.nombre} className="membresia-item">
                  <div className="membresia-header">
                    <span className="membresia-nombre">{tipo.nombre}</span>
                    <span className="membresia-cantidad">{tipo.cantidad} clientes</span>
                  </div>
                  <div className="membresia-barra">
                    <div 
                      className="membresia-progreso" 
                      style={{ 
                        width: `${porcentaje}%`,
                        background: tipo.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estado Financiero */}
        <div className="grafico-card">
          <h3>💰 Estado Financiero del Mes</h3>
          <div className="estado-financiero">
            <div className="financiero-item financiero-ingresos">
              <div className="financiero-label">INGRESOS</div>
              <div className="financiero-valor">
                ${(facturacion.mesActual.ingresos / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="financiero-item financiero-egresos">
              <div className="financiero-label">EGRESOS</div>
              <div className="financiero-valor">
                ${(facturacion.mesActual.egresos / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="financiero-item financiero-utilidad">
              <div className="financiero-label">UTILIDAD</div>
              <div className="financiero-valor">
                ${(facturacion.mesActual.utilidad / 1000000).toFixed(2)}M
              </div>
            </div>
          </div>
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

      {/* Resumen de Estados */}
      <div className="clientes-resumen">
        <div className="resumen-card resumen-activos">
          <div className="resumen-label">ACTIVOS</div>
          <div className="resumen-valor">{estadisticas.clientesActivos}</div>
          <div className="resumen-meta">
            {((estadisticas.clientesActivos / (estadisticas.clientesActivos + estadisticas.clientesInactivos)) * 100).toFixed(0)}% del total
          </div>
        </div>

        <div className="resumen-card resumen-inactivos">
          <div className="resumen-label">INACTIVOS</div>
          <div className="resumen-valor">{estadisticas.clientesInactivos}</div>
          <div className="resumen-meta">Membresías vencidas</div>
        </div>

        <div className="resumen-card resumen-deudores">
          <div className="resumen-label">DEUDORES</div>
          <div className="resumen-valor">{estadisticas.clientesDeudores}</div>
          <div className="resumen-meta resumen-meta-alerta">¡Acción requerida!</div>
        </div>

        <div className="resumen-card resumen-por-vencer">
          <div className="resumen-label">POR VENCER</div>
          <div className="resumen-valor">{estadisticas.membresiasPorVencer}</div>
          <div className="resumen-meta">Próximos 7 días</div>
        </div>
      </div>

      {/* Tabla de Deudores */}
      <div className="admin-card">
        <h4>⚠️ Clientes con Deuda Pendiente</h4>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>CLIENTE</th>
                <th>DEUDA TOTAL</th>
                <th>MESES ATRASADOS</th>
                <th>ÚLTIMO PAGO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {clientesDeudores.map(cliente => (
                <tr key={cliente.id}>
                  <td><strong>{cliente.nombre}</strong></td>
                  <td>
                    <span className="deuda-valor">${cliente.deuda.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className={`badge-meses ${cliente.mesesAtrasados >= 3 ? 'badge-critico' : 'badge-alerta'}`}>
                      {cliente.mesesAtrasados} {cliente.mesesAtrasados === 1 ? 'mes' : 'meses'}
                    </span>
                  </td>
                  <td className="fecha-texto">{cliente.ultimoPago}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-recordatorio">Enviar Recordatorio</button>
                      <button className="btn-detalles">Ver Detalles</button>
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
        <button className="btn-primary-green">+ Nuevo Entrenador</button>
      </div>

      {/* Estadísticas de Entrenadores */}
      <div className="entrenadores-stats">
        <div className="stat-card">
          <div className="stat-label">TOTAL ENTRENADORES</div>
          <div className="stat-valor stat-verde">{entrenadores.length}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">NÓMINA MENSUAL</div>
          <div className="stat-valor stat-morado">
            ${(entrenadores.reduce((sum, e) => sum + e.sueldo, 0) / 1000000).toFixed(2)}M
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">CALIFICACIÓN PROM.</div>
          <div className="stat-valor stat-naranja">
            {(entrenadores.reduce((sum, e) => sum + e.calificacion, 0) / entrenadores.length).toFixed(1)} ⭐
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">HORAS SEMANALES</div>
          <div className="stat-valor stat-gris">
            {entrenadores.reduce((sum, e) => sum + e.horasSemanales, 0)}h
          </div>
        </div>
      </div>

      {/* Tabla de Entrenadores */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ENTRENADOR</th>
                <th>ESPECIALIDAD</th>
                <th>CONTRATO</th>
                <th>SUELDO</th>
                <th>CLASES/MES</th>
                <th>CALIFICACIÓN</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {entrenadores.map(entrenador => (
                <tr key={entrenador.id}>
                  <td>
                    <div className="entrenador-info">
                      <strong>{entrenador.nombre}</strong>
                      <span className="entrenador-fecha">Desde {entrenador.fechaIngreso}</span>
                    </div>
                  </td>
                  <td>{entrenador.especialidad}</td>
                  <td>
                    <span className={`badge-contrato ${entrenador.contrato === 'Indefinido' ? 'badge-indefinido' : 'badge-plazo'}`}>
                      {entrenador.contrato}
                    </span>
                  </td>
                  <td><strong className="sueldo-valor">${entrenador.sueldo.toLocaleString()}</strong></td>
                  <td>{entrenador.clases} clases</td>
                  <td><span className="calificacion-valor">⭐ {entrenador.calificacion}</span></td>
                  <td>
                    <div className="action-icons">
                      <button className="btn-icon" title="Ver detalles">👁️</button>
                      <button className="btn-icon" title="Editar">✏️</button>
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

  const renderImplementaciones = () => (
    <div className="admin-section">
      <div className="section-header">
        <h3>🏋️ Implementaciones y Equipamiento</h3>
        <button className="btn-primary">+ Agregar Implemento</button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>IMPLEMENTO</th>
                <th>CANTIDAD</th>
                <th>ESTADO</th>
                <th>ÚLTIMO MANTENIMIENTO</th>
                <th>PRÓXIMO MANTENIMIENTO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {implementaciones.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.item}</strong></td>
                  <td><strong>{item.cantidad}</strong></td>
                  <td>
                    <span className={`badge-estado badge-${item.estado.toLowerCase()}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="fecha-texto">{item.ultimoMantenimiento}</td>
                  <td className="fecha-texto">{item.proximoMantenimiento}</td>
                  <td>
                    <button className="btn-mantenimiento">Registrar Mantenimiento</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFacturacion = () => (
    <div className="admin-section">
      <h3>💰 Facturación y Finanzas</h3>

      {/* Resumen del Mes */}
      <div className="facturacion-resumen">
        <div className="facturacion-card facturacion-ingresos">
          <div className="facturacion-label">💵 INGRESOS TOTALES</div>
          <div className="facturacion-valor">
            ${(facturacion.mesActual.ingresos / 1000000).toFixed(2)}M
          </div>
          <div className="facturacion-meta">Diciembre 2024</div>
        </div>

        <div className="facturacion-card facturacion-egresos">
          <div className="facturacion-label">📤 EGRESOS TOTALES</div>
          <div className="facturacion-valor">
            ${(facturacion.mesActual.egresos / 1000000).toFixed(2)}M
          </div>
          <div className="facturacion-meta">Diciembre 2024</div>
        </div>

        <div className="facturacion-card facturacion-utilidad-card">
          <div className="facturacion-label">💎 UTILIDAD NETA</div>
          <div className="facturacion-valor">
            ${(facturacion.mesActual.utilidad / 1000000).toFixed(2)}M
          </div>
          <div className="facturacion-meta">
            Margen: {((facturacion.mesActual.utilidad / facturacion.mesActual.ingresos) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Desglose de Ingresos y Egresos */}
      <div className="facturacion-desglose">
        {/* Ingresos */}
        <div className="admin-card">
          <h4>📈 Desglose de Ingresos</h4>
          <div className="desglose-lista">
            <div className="desglose-item desglose-ingreso">
              <span className="desglose-concepto">Membresías</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.ingresosMembesias / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="desglose-item desglose-ingreso">
              <span className="desglose-concepto">Clases Extra</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.ingresosClasesExtra / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="desglose-item desglose-ingreso">
              <span className="desglose-concepto">Productos</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.ingresosProductos / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>

        {/* Egresos */}
        <div className="admin-card">
          <h4>📉 Desglose de Egresos</h4>
          <div className="desglose-lista">
            <div className="desglose-item desglose-egreso">
              <span className="desglose-concepto">Sueldos</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.sueldos / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="desglose-item desglose-egreso">
              <span className="desglose-concepto">Arriendo</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.arriendo / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="desglose-item desglose-egreso">
              <span className="desglose-concepto">Servicios</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.servicios / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="desglose-item desglose-egreso">
              <span className="desglose-concepto">Mantenimiento</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.mantenimiento / 1000000).toFixed(2)}M
              </span>
            </div>
            <div className="desglose-item desglose-egreso">
              <span className="desglose-concepto">Otros</span>
              <span className="desglose-monto">
                ${(facturacion.desglose.otros / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-admin-container">
      {/* Header con logo */}
      <header className="dashboard-admin-header">
        <div className="dashboard-admin-header-content">
          <div className="header-left">
            <div className="admin-logo">⚙️</div>
            <div className="header-title">
              <h1>Panel de Administración</h1>
              <p>Control total del gimnasio</p>
            </div>
          </div>
          
          <div className="header-right">
            <span className="user-name">{user?.first_name} {user?.last_name}</span>
            <span className="admin-badge">Administrador</span>
            <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <div className="admin-nav-content">
          {[
            { id: 'overview', icon: '📊', label: 'Resumen' },
            { id: 'clientes', icon: '👥', label: 'Clientes' },
            { id: 'entrenadores', icon: '💪', label: 'Entrenadores' },
            { id: 'implementaciones', icon: '🏋️', label: 'Equipamiento' },
            { id: 'facturacion', icon: '💰', label: 'Facturación' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`nav-tab ${selectedTab === tab.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-admin-main">
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'clientes' && renderClientes()}
        {selectedTab === 'entrenadores' && renderEntrenadores()}
        {selectedTab === 'implementaciones' && renderImplementaciones()}
        {selectedTab === 'facturacion' && renderFacturacion()}
      </main>
    </div>
  );
};

export default DashboardAdmin;