// frontend/src/components/dashboard/admin/tabs/OverviewTab.jsx

import React from 'react';
import KPICard from '../KPICard';
//import '../../../../styles/dashboard/admin/OverviewTab.css';

/**
 * Tab de resumen general del gimnasio
 * @param {Object} kpis - Datos de KPIs
 */
const OverviewTab = ({ kpis }) => {
  return (
    <div className="overview-tab">
      {/* KPIs Principales */}
      <div className="overview-kpis">
        <KPICard
          label="Clientes Activos"
          value={kpis.clientesActivos}
          meta={`${kpis.tasaCrecimiento} de crecimiento`}
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
        />
        <KPICard
          label="Clientes Deudores"
          value={kpis.clientesDeudores}
          meta="Requiere seguimiento"
          gradient="linear-gradient(135deg, #e53e3e, #fc8181)"
        />
        <KPICard
          label="Utilidad Mensual"
          value={kpis.utilidadMensual}
          meta={`${kpis.margenUtilidad} de margen`}
          gradient="linear-gradient(135deg, #38a169, #48bb78)"
        />
        <KPICard
          label="Asistencia Promedio"
          value={kpis.asistenciaPromedio}
          meta="Últimos 30 días"
          gradient="linear-gradient(135deg, #ed8936, #f6ad55)"
        />
      </div>

      {/* Alertas Críticas */}
      {kpis.alertas && kpis.alertas.length > 0 && (
        <div className="overview-alertas">
          <h3>⚠️ Alertas Críticas</h3>
          <div className="alertas-grid">
            {kpis.alertas.map((alerta, index) => (
              <div key={index} className="alerta-item">
                <span className="alerta-texto">
                  <strong>{alerta.cantidad}</strong> {alerta.mensaje}
                </span>
                {alerta.accion && (
                  <button className={`btn-alerta btn-alerta-${alerta.tipo}`}>
                    {alerta.accion}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gráficos */}
      <div className="overview-graficos">
        <div className="grafico-card">
          <h3>📈 Distribución de Membresías</h3>
          <div className="membresias-distribucion">
            {kpis.membresias.map((membresia, index) => (
              <div key={index} className="membresia-item">
                <div className="membresia-header">
                  <span className="membresia-nombre">{membresia.tipo}</span>
                  <span className="membresia-cantidad">{membresia.cantidad}</span>
                </div>
                <div className="membresia-barra">
                  <div 
                    className="membresia-progreso"
                    style={{ 
                      width: `${membresia.porcentaje}%`,
                      background: membresia.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grafico-card">
          <h3>💰 Estado Financiero</h3>
          <div className="estado-financiero">
            <div className="financiero-item financiero-ingresos">
              <div className="financiero-label">Ingresos Totales</div>
              <div className="financiero-valor">{kpis.ingresos}</div>
            </div>
            <div className="financiero-item financiero-egresos">
              <div className="financiero-label">Egresos Totales</div>
              <div className="financiero-valor">{kpis.egresos}</div>
            </div>
            <div className="financiero-item financiero-utilidad">
              <div className="financiero-label">Utilidad Neta</div>
              <div className="financiero-valor">{kpis.utilidadMensual}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;