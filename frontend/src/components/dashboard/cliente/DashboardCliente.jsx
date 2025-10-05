// frontend/src/components/dashboard/cliente/DashboardCliente.jsx

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Header from '../common/Header';
import StatsCard from '../common/StatsCard';
import WeekNavigator from '../common/WeekNavigator';
import ClaseDiaCard from './ClaseDiaCard';
import CalificarModal from './CalificarModal';
import RenovarMembresiaModal from './RenovarMembresiaModal';
import MembresiaSidebar from './MembresiaSidebar';
import { getWeekDates, formatDate, getDayName } from '../../../utils/dateUtils';
import { CLASES_BASE_POR_DIA } from '../../../utils/constants';
import './DashboardCliente.css';

const DashboardCliente = () => {
  const [calificaciones, setCalificaciones] = useState({});
  const [showCalificarModal, setShowCalificarModal] = useState(null);
  const [showRenovarModal, setShowRenovarModal] = useState(false);
  
  // IMPORTANTE: Clases ficticias pasadas que el usuario reservó
  // Fecha actual del sistema: Miércoles 08/10/2025
  // Estas son clases del LUNES 06/10 y MARTES 07/10 (días pasados)
  const [clasesReservadas, setClasesReservadas] = useState([
    // LUNES 06/10/2025 - Clases que YA PASARON
    '2025-10-06-0', // Spinning 07:00 - 08:00 (COMPLETADA ✓)
    '2025-10-06-1', // Yoga 12:00 - 13:00 (COMPLETADA ✓)
    
    // MARTES 07/10/2025 - Clases que YA PASARON  
    '2025-10-07-0', // Pilates 08:00 - 09:00 (COMPLETADA ✓)
  ]);
  
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = semana actual
  const [membresiaActiva, setMembresiaActiva] = useState(true);

  const { user } = useAuth();

  const [membresiaData, setMembresiaData] = useState({
    tipo: 'Premium',
    estado: 'Activa',
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2025-01-15',
    diasRestantes: 107,
    precio: '$45.000/mes',
    beneficios: [
      'Acceso ilimitado',
      'Todas las clases',
      'Casillero personal',
      'Nutricionista gratis'
    ],
    historialPagos: [
      { fecha: '2024-12-01', monto: '$45.000', estado: 'Pagado' },
      { fecha: '2024-11-01', monto: '$45.000', estado: 'Pagado' },
      { fecha: '2024-10-01', monto: '$45.000', estado: 'Pagado' },
      { fecha: '2024-09-01', monto: '$45.000', estado: 'Pagado' },
      { fecha: '2024-08-01', monto: '$45.000', estado: 'Pagado' }
    ]
  });

  const estadisticas = {
    clasesEsteMes: 12,
    clasesTotales: 45,
    asistencia: '92%',
    racha: 5
  };

  // Usar fecha actual REAL del sistema
  const hoy = new Date();
  
  // Generar clases de la semana basadas en la fecha actual
  const weekDates = getWeekDates(currentWeek, hoy);
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

  const handleReservar = (claseId) => {
    if (!membresiaActiva) {
      alert('Tu membresía está cancelada. Por favor renuévala para reservar clases.');
      return;
    }
    setClasesReservadas([...clasesReservadas, claseId]);
    console.log('Clase reservada:', claseId);
  };

  const handleCancelar = (claseId) => {
    setClasesReservadas(clasesReservadas.filter(id => id !== claseId));
    console.log('Reserva cancelada:', claseId);
  };

  const handleCalificar = (entrenadorId, rating) => {
    setCalificaciones({...calificaciones, [entrenadorId]: rating});
    setShowCalificarModal(null);
    alert(`¡Gracias por tu calificación de ${rating} estrellas!`);
  };

  const handleRenovarMembresia = (planSeleccionado) => {
    const precios = {
      'basica': '$25.000/mes',
      'premium': '$45.000/mes',
      'vip': '$75.000/mes'
    };

    const beneficios = {
      'basica': [
        'Acceso al gimnasio en horario normal',
        'Uso de máquinas básicas',
        '2 clases grupales al mes',
        'Casillero básico'
      ],
      'premium': [
        'Acceso ilimitado al gimnasio',
        'Todas las clases grupales',
        'Casillero personal premium',
        'Nutricionista 1 vez al mes',
        'Toalla de cortesía',
        '10% descuento en productos'
      ],
      'vip': [
        'Todo lo de Premium +',
        'Entrenador personal 2 veces/semana',
        'Nutricionista ilimitado',
        'Acceso a zona VIP exclusiva',
        'Spa y sauna ilimitado',
        'Estacionamiento preferencial',
        'Bebidas energéticas gratis',
        '20% descuento en productos',
        'Invitaciones a eventos exclusivos'
      ]
    };

    setMembresiaData({
      ...membresiaData,
      tipo: planSeleccionado.charAt(0).toUpperCase() + planSeleccionado.slice(1),
      precio: precios[planSeleccionado],
      beneficios: beneficios[planSeleccionado],
      estado: 'Activa',
      diasRestantes: 365
    });

    setMembresiaActiva(true);
    setShowRenovarModal(false);
    alert(`¡Membresía ${planSeleccionado.toUpperCase()} renovada exitosamente! Bienvenido de vuelta.`);
  };

  const handleCancelarMembresia = () => {
    const confirmar = window.confirm('¿Estás seguro de que deseas cancelar tu membresía? Esta acción puede afectar tus reservas futuras.');
    
    if (confirmar) {
      setMembresiaData({
        ...membresiaData,
        estado: 'Cancelada'
      });
      setMembresiaActiva(false);
      alert('Tu membresía ha sido cancelada.');
    }
  };

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
      <Header 
        title="Mi Gimnasio" 
        roleLabel="Cliente"
        roleColor="linear-gradient(135deg, #667eea, #764ba2)"
      />

      <main className="dashboard-cliente-main">
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

        <aside className="dashboard-cliente-sidebar">
          <MembresiaSidebar 
            membresiaData={membresiaData}
            onRenovar={() => setShowRenovarModal(true)}
            onCancelar={handleCancelarMembresia}
          />
        </aside>
      </main>

      {showCalificarModal && (
        <CalificarModal
          clase={showCalificarModal}
          onClose={() => setShowCalificarModal(null)}
          onSubmit={handleCalificar}
        />
      )}

      {showRenovarModal && (
        <RenovarMembresiaModal
          planActual={membresiaData.tipo}
          onClose={() => setShowRenovarModal(false)}
          onRenovar={handleRenovarMembresia}
        />
      )}
    </div>
  );
};

export default DashboardCliente;