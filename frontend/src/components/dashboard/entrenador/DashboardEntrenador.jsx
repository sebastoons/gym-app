// frontend/src/components/dashboard/entrenador/DashboardEntrenador.jsx

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Header from '../common/Header';
import StatsCard from '../common/StatsCard';
import WeekNavigator from '../common/WeekNavigator';
import ClaseEntrenadorDiaCard from './ClaseEntrenadorDiaCard';
import DetallesClaseModal from './DetallesClaseModal';
import EntrenadorSidebar from './EntrenadorSidebar';
import { getWeekDates, formatDateLocale, getDayName } from '../../../utils/dateUtils';
import { getClasesEntrenador } from '../../../utils/constants';
import './DashboardEntrenador.css';

const DashboardEntrenador = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedClase, setSelectedClase] = useState(null);

  const { user } = useAuth();

  // Datos mock - En producción vendrían del backend
  const estadisticas = {
    clasesTotalesHoy: 3,
    alumnosTotales: 45,
    asistenciaPromedio: '87%',
    calificacion: 4.8
  };

  const pagoData = {
    monto: '$850.000',
    fecha: '2025-01-05',
    nota: 'Tu pago se deposita automáticamente el día 5 de cada mes'
  };

  // Datos del entrenador para el sidebar
  const datosEntrenador = {
    nombre: user?.first_name || 'Entrenador',
    tipoContrato: 'Indefinido', // o 'Plazo Fijo'
    fechaIngreso: '15-03-2023',
    fechaTermino: null, // null para indefinido, o '15-03-2025' para plazo fijo
    especialidad: 'Spinning',
    sueldo: '$850.000',
    calificacion: 4.8,
    historialPagos: [
      { fecha: '05-01-2025', monto: '$850.000', estado: 'Pagado' },
      { fecha: '05-12-2024', monto: '$850.000', estado: 'Pagado' },
      { fecha: '05-11-2024', monto: '$850.000', estado: 'Pagado' },
      { fecha: '05-10-2024', monto: '$850.000', estado: 'Pagado' },
      { fecha: '05-09-2024', monto: '$850.000', estado: 'Pagado' }
    ]
  };

  // Generar clases de la semana usando la fecha ACTUAL del sistema
  const hoy = new Date();
  const weekDates = getWeekDates(currentWeek, hoy);
  const clasesSemanales = weekDates.map((date, index) => {
    const dayName = getDayName(date);
    const dateStr = formatDateLocale(date);
    
    const clasesDelDia = getClasesEntrenador(dayName, currentWeek);
    
    const clasesConId = clasesDelDia.map((clase, claseIndex) => ({
      ...clase,
      id: `${index}-${claseIndex}`,
      dia: dayName,
      fecha: dateStr
    }));

    return {
      dia: dayName,
      fecha: dateStr,
      clases: clasesConId
    };
  });

  // Handler para ver detalles de una clase
  const handleVerDetalles = (clase) => {
    setSelectedClase(clase);
  };

  // Handler para eliminar clase
  const handleEliminarClase = () => {
    if (window.confirm(`¿Estás seguro de eliminar la clase "${selectedClase.nombre}"?`)) {
      console.log('Clase eliminada:', selectedClase);
      alert('✓ Clase eliminada correctamente');
      setSelectedClase(null);
    }
  };

  // Handler para reservar cliente en una clase
  const handleReservarCliente = () => {
    console.log('Cliente reservado en:', selectedClase);
    alert('✓ Cliente reservado correctamente');
    setSelectedClase(null);
  };

  // Loading state
  if (!user) {
    return (
      <div className="dashboard-entrenador-loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-entrenador">
      {/* Header */}
      <Header 
        title="Panel de Entrenador" 
        roleLabel="Entrenador"
        roleColor="linear-gradient(135deg, #38a169, #48bb78)"
      />

      <main className="dashboard-entrenador-main">
        {/* Sección de Bienvenida */}
        <section className="dashboard-entrenador-bienvenida">
          <h2 className="dashboard-entrenador-bienvenida-titulo">
            ¡Hola {user.first_name}! 👋
          </h2>
          <div className="dashboard-entrenador-stats-grid">
            <StatsCard 
              icon="📅" 
              value={estadisticas.clasesTotalesHoy} 
              label="Clases hoy" 
            />
            <StatsCard 
              icon="👥" 
              value={estadisticas.alumnosTotales} 
              label="Alumnos totales" 
            />
            <StatsCard 
              icon="✅" 
              value={estadisticas.asistenciaPromedio} 
              label="Asistencia promedio" 
            />
            <StatsCard 
              icon="⭐" 
              value={`${estadisticas.calificacion}/5`} 
              label="Calificación" 
            />
          </div>
        </section>

        {/* Sección de Clases */}
        <section className="dashboard-entrenador-clases">
          <div className="dashboard-entrenador-clases-header">
            <h3 className="dashboard-entrenador-clases-titulo">
              📋 Mis Clases de la Semana
            </h3>
            
            <WeekNavigator
              currentWeek={currentWeek}
              onPrevious={() => setCurrentWeek(prev => prev - 1)}
              onNext={() => setCurrentWeek(prev => prev + 1)}
              color="#38a169"
            />
          </div>

          <div className="dashboard-entrenador-clases-grid">
            {clasesSemanales.map((dia) => (
              <ClaseEntrenadorDiaCard
                key={dia.fecha}
                dia={dia}
                onVerDetalles={handleVerDetalles}
              />
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="dashboard-entrenador-sidebar">
          <EntrenadorSidebar 
            pagoData={pagoData}
            datosEntrenador={datosEntrenador}
          />
        </aside>
      </main>

      {/* Modal de Detalles */}
      {selectedClase && (
        <DetallesClaseModal
          clase={selectedClase}
          onClose={() => setSelectedClase(null)}
          onEliminar={handleEliminarClase}
          onReservar={handleReservarCliente}
        />
      )}
    </div>
  );
};

export default DashboardEntrenador;