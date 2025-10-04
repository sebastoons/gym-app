// frontend/src/components/dashboard/admin/tabs/FacturacionTab.jsx

import React from 'react';
//import '../../../../styles/dashboard/admin/FacturacionTab.css';

/**
 * Tab de facturación y finanzas
 * @param {Object} data - Datos financieros
 */
const FacturacionTab = ({ data }) => {
  return (
    <div className="facturacion-tab">
      {/* Resumen Financiero */}
      <div className="facturacion-resumen">
        <div className="facturacion-card facturacion-ingresos">
          <div className="facturacion-label">Ingresos del Mes</div>
          <div className="facturacion-valor">{data.ingresosMes}</div>
          <div className="facturacion-meta">+{data.crecimientoIngresos} vs mes anterior</div>
        </div>
        <div className="facturacion-card facturacion-egresos">
          <div className="facturacion-label">Egresos del Mes</div>
          <div className="facturacion-valor">{data.egresosMes}</div>
          <div className="facturacion-meta">{data.porcentajeEgresos} del ingreso</div>
        </div>
        <div className="facturacion-card facturacion-utilidad-card">
          <div className="facturacion-label">Utilidad Neta</div>
          <div className="facturacion-valor">{data.utilidadNeta}</div>
          <div className="facturacion-meta">Margen: {data.margenUtilidad}</div>
        </div>
      </div>

      {/* Desglose de Ingresos y Egresos */}
      <div className="facturacion-desglose">
        <div className="desglose-section">
          <h3>💰 Desglose de Ingresos</h3>
          <div className="desglose-lista">
            {data.ingresosDesglose.map((item, index) => (
              <div key={index} className="desglose-item desglose-ingreso">
                <span className="desglose-concepto">{item.concepto}</span>
                <span className="desglose-monto">{item.monto}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="desglose-section">
          <h3>💸 Desglose de Egresos</h3>
          <div className="desglose-lista">
            {data.egresosDesglose.map((item, index) => (
              <div key={index} className="desglose-item desglose-egreso">
                <span className="desglose-concepto">{item.concepto}</span>
                <span className="desglose-monto">{item.monto}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturacionTab;