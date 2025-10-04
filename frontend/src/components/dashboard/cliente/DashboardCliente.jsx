// frontend/src/components/dashboard/cliente/DashboardCliente.jsx

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Header from '../common/Header';
import StatsCard from '../common/StatsCard';
import WeekNavigator from '../common/WeekNavigator';
import ClaseDiaCard from './ClaseDiaCard';
import CalificarModal from './CalificarModal';
import MembresiaSidebar from './MembresiaSidebar';
import { getWeekDates, formatDate, getDayName } from '../../../utils/dateUtils';
import { CLASES_BASE_POR_DIA } from '../../../utils/constants';
import './DashboardCliente.css';

const DashboardCliente = () => {
  const [calificaciones, setCalificaciones] = useState({});
  const [showCalificarModal, setShowCalificarModal] = useState(null);
  const [clasesReservadas, setClasesReservadas] = useState(['2024-12-23-0', '2024-12-25-0', '2024-12-28-0']);
  const [currentWeek, setCurrentWeek] = useState(0);

  const { user } = useAuth();

  // Datos mock - En producción vendrían del backend
  const membresiaData = {
    tipo: 'Premium',
    estado: 'Activa',
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-15',
    diasRestantes: 107,
    precio: '$45.000/mes',
    beneficios: ['Acceso ilimitado', 'Todas las clases', 'Casillero personal', 'Nutricionista gratis']
  };

  const estadisticas = {
    clasesEsteMes: 12,
    clasesTotales: 45,
    asistencia: '92%',
    racha: 5
  };

  // Generar clases de la semana
  const weekDates = getWeekDates(currentWeek, new Date('2024-12-23'));
  const clasesSemanales = weekDates.map((date) => {
    const dayName = getDayName(date);
    const dateStr = formatDate(date);
    
    const clasesDelDia = CLASES_BASE_POR_DIA[dayName] || [];
    
    const clasesConId = clasesDelDia.map((clase, index) => ({
      ...clase,
      id: `${dateStr}-${index}`,
      fecha: dateStr
    }));

    return {
      dia: dayName,
      fecha: dateStr,
      clases: clasesConId
    };
  });

  // Handlers
  const handleReservar = (claseId) => {
    setClasesReservadas([...clasesReservadas, claseId]);
    console.log('Clase reservada:', claseId);
    // TODO: Integrar con API del backend
  };

  const handleCancelar = (claseId) => {
    setClasesReservadas(clasesReservadas.filter(id => id !== claseId));
    console.log('Reserva cancelada:', claseId);
    // TODO: Integrar con API del backend
  };

  const handleCalificar = (entrenadorId, rating) => {
    setCalificaciones({...calificaciones, [entrenadorId]: rating});
    setShowCalificarModal(null);
    alert(`¡Gracias por tu calificación de ${rating} estrellas!`);
    // TODO: Integrar con API del backend
  };

  // Loading state
  if (!user) {
    return (
      <div className="dashboard-cliente-loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-cliente">
      {/* Header */}
      <Header 
        title="Mi Gimnasio" 
        roleLabel="Cliente"
        roleColor="linear-gradient(135deg, #667eea, #764ba2)"
      />

      <main className="dashboard-cliente-main">
        {/* Sección de Bienvenida */}
        <section className="dashboard-cliente-bienvenida">
          <h2 className="dashboard-cliente-bienvenida-titulo">
            ¡Hola {user.first_name}! 👋
          </h2>
          <div className="dashboard-cliente-stats-grid">
            <StatsCard 
              icon="📅" 
              value={estadisticas.clasesEsteMes} 
              label="Clases este mes" 
            />
            <StatsCard 
              icon="✅" 
              value={estadisticas.asistencia} 
              label="Asistencia" 
            />
            <StatsCard 
              icon="🔥" 
              value={`${estadisticas.racha} días`} 
              label="Racha actual" 
            />
          </div>
        </section>

        {/* Sección de Clases */}
        <section className="dashboard-cliente-clases">
          <div className="dashboard-cliente-clases-header">
            <h3 className="dashboard-cliente-clases-titulo">
              📅 Mis Clases de la Semana
            </h3>
            
            <WeekNavigator
              currentWeek={currentWeek}
              onPrevious={() => setCurrentWeek(prev => prev - 1)}
              onNext={() => setCurrentWeek(prev => prev + 1)}
            />
          </div>

          <div className="dashboard-cliente-clases-grid">
            {clasesSemanales.map((dia) => (
              <ClaseDiaCard
                key={dia.fecha}
                dia={dia}
                clasesReservadas={clasesReservadas}
                onReservar={handleReservar}
                onCancelar={handleCancelar}
                onCalificar={setShowCalificarModal}
              />
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="dashboard-cliente-sidebar">
          <MembresiaSidebar membresiaData={membresiaData} />
        </aside>
      </main>

      {/* Modal de Calificación */}
      {showCalificarModal && (
        <CalificarModal
          clase={showCalificarModal}
          onClose={() => setShowCalificarModal(null)}
          onSubmit={handleCalificar}
        />
      )}
    </div>
  );
};

export default DashboardCliente;