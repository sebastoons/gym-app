// frontend/src/components/dashboard/admin/tabs/EntrenadoresTab.jsx

import React from 'react';
//import '../../../../styles/dashboard/admin/EntrenadoresTab.css';

/**
 * Tab de gestión de entrenadores
 * @param {Object} data - Datos de entrenadores
 */
const EntrenadoresTab = ({ data }) => {
  return (
    <div className="entrenadores-tab">
      {/* Estadísticas de Entrenadores */}
      <div className="entrenadores-stats">
        <div className="stat-card">
          <div className="stat-label">Total Activos</div>
          <div className="stat-valor stat-verde">{data.totalActivos}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Clases Semanales</div>
          <div className="stat-valor stat-morado">{data.clasesSemanales}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Calificación Promedio</div>
          <div className="stat-valor stat-naranja">{data.calificacionPromedio}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Costo Mensual</div>
          <div className="stat-valor stat-gris">{data.costoMensual}</div>
        </div>
      </div>

      {/* Tabla de Entrenadores */}
      <div className="entrenadores-section">
        <div className="section-header">
          <h3>👨‍🏫 Personal de Entrenadores</h3>
          <button className="btn-primary-green">
            + Agregar Entrenador
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Entrenador</th>
                <th>Especialidad</th>
                <th>Clases/Semana</th>
                <th>Alumnos</th>
                <th>Calificación</th>
                <th>Tipo Contrato</th>
                <th>Sueldo Mensual</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.entrenadores.map((entrenador) => (
                <tr key={entrenador.id}>
                  <td>
                    <div className="entrenador-info">
                      <strong>{entrenador.nombre}</strong>
                      <div className="entrenador-fecha">
                        Desde: {entrenador.fechaIngreso}
                      </div>
                    </div>
                  </td>
                  <td>{entrenador.especialidad}</td>
                  <td>{entrenador.clasesSemanales}</td>
                  <td>{entrenador.alumnos}</td>
                  <td>
                    <span className="calificacion-valor">
                      ⭐ {entrenador.calificacion}
                    </span>
                  </td>
                  <td>
                    <span className={`badge-contrato ${entrenador.tipoContrato === 'Indefinido' ? 'badge-indefinido' : 'badge-plazo'}`}>
                      {entrenador.tipoContrato}
                    </span>
                  </td>
                  <td className="sueldo-valor">{entrenador.sueldo}</td>
                  <td>
                    <div className="action-icons">
                      <button className="btn-icon" title="Editar">✏️</button>
                      <button className="btn-icon" title="Ver horario">📅</button>
                      <button className="btn-icon" title="Estadísticas">📊</button>
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

export default EntrenadoresTab;