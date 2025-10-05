// frontend/src/components/dashboard/admin/tabs/ClientesTab.jsx

import React from 'react';
import '../../../../styles/dashboard/admin/ClientesTab.css';

/**
 * Tab de gestión de clientes
 * @param {Object} data - Datos de clientes
 */
const ClientesTab = ({ data }) => {
  return (
    <div className="clientes-tab">
      {/* Resumen de Clientes */}
      <div className="clientes-resumen">
        <div className="resumen-card resumen-activos">
          <div className="resumen-label">Activos</div>
          <div className="resumen-valor">{data.activos}</div>
          <div className="resumen-meta">{data.tasaRetencion} retención</div>
        </div>
        <div className="resumen-card resumen-inactivos">
          <div className="resumen-label">Inactivos</div>
          <div className="resumen-valor">{data.inactivos}</div>
        </div>
        <div className="resumen-card resumen-deudores">
          <div className="resumen-label">Deudores</div>
          <div className="resumen-valor">{data.deudores}</div>
          <div className="resumen-meta resumen-meta-alerta">¡Acción requerida!</div>
        </div>
        <div className="resumen-card resumen-por-vencer">
          <div className="resumen-label">Por Vencer (7 días)</div>
          <div className="resumen-valor">{data.porVencer}</div>
          <div className="resumen-meta">Enviar recordatorio</div>
        </div>
      </div>

      {/* Tabla de Deudores */}
      <div className="clientes-section">
        <div className="section-header">
          <h3>💳 Clientes con Deuda</h3>
          <button className="btn-primary">
            Enviar Recordatorios Masivos
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Membresía</th>
                <th>Deuda</th>
                <th>Meses Adeudados</th>
                <th>Último Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.clientesDeudores.map((cliente) => (
                <tr key={cliente.id}>
                  <td>
                    <strong>{cliente.nombre}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#718096' }}>
                      {cliente.email}
                    </div>
                  </td>
                  <td>{cliente.membresia}</td>
                  <td className="deuda-valor">{cliente.deuda}</td>
                  <td>
                    <span className={`badge-meses ${cliente.meses >= 3 ? 'badge-critico' : 'badge-alerta'}`}>
                      {cliente.meses} {cliente.meses === 1 ? 'mes' : 'meses'}
                    </span>
                  </td>
                  <td className="fecha-texto">{cliente.ultimoPago}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-recordatorio">
                        Enviar Recordatorio
                      </button>
                      <button className="btn-detalles">
                        Ver Detalles
                      </button>
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
};

export default ClientesTab;