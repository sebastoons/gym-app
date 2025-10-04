// frontend/src/components/dashboard/admin/tabs/ImplementacionesTab.jsx

import React from 'react';
//import '../../../../styles/dashboard/admin/ImplementacionesTab.css';

/**
 * Tab de implementaciones del gimnasio
 * @param {Object} data - Datos de implementaciones
 */
const ImplementacionesTab = ({ data }) => {
  return (
    <div className="implementaciones-tab">
      <div className="section-header">
        <h3>🛠️ Equipamiento e Implementaciones</h3>
        <button className="btn-primary">
          + Registrar Implementación
        </button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Implementación</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Último Mantenimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.implementaciones.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.nombre}</strong></td>
                <td>{item.categoria}</td>
                <td>{item.cantidad}</td>
                <td>
                  <span className={`badge-estado badge-${item.estado.toLowerCase()}`}>
                    {item.estado}
                  </span>
                </td>
                <td className="fecha-texto">{item.ultimoMantenimiento}</td>
                <td>
                  <button className="btn-mantenimiento">
                    Programar Mantenimiento
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImplementacionesTab;