// frontend/src/utils/constants.js

/**
 * Datos mock de clases por día de la semana
 */
export const CLASES_BASE_POR_DIA = {
  'Lunes': [
    { 
      hora: '07:00 - 08:00', 
      nombre: 'Spinning', 
      entrenador: 'Carlos Ruiz',
      entrenadorId: 1,
      cupos: '12/15',
      calificacionEntrenador: 4.8
    },
    { 
      hora: '12:00 - 13:00', 
      nombre: 'Yoga', 
      entrenador: 'Ana Silva',
      entrenadorId: 2,
      cupos: '8/12',
      calificacionEntrenador: 4.9
    },
    { 
      hora: '18:00 - 19:00', 
      nombre: 'CrossFit', 
      entrenador: 'María López',
      entrenadorId: 3,
      cupos: '8/15',
      calificacionEntrenador: 4.9
    }
  ],
  'Martes': [
    { 
      hora: '08:00 - 09:00', 
      nombre: 'Pilates', 
      entrenador: 'Ana Silva',
      entrenadorId: 2,
      cupos: '5/12',
      calificacionEntrenador: 4.9
    },
    { 
      hora: '19:00 - 20:00', 
      nombre: 'Spinning', 
      entrenador: 'Carlos Ruiz',
      entrenadorId: 1,
      cupos: '10/15',
      calificacionEntrenador: 4.8
    }
  ],
  'Miércoles': [
    { 
      hora: '07:00 - 08:00', 
      nombre: 'Spinning', 
      entrenador: 'Carlos Ruiz',
      entrenadorId: 1,
      cupos: '10/15',
      calificacionEntrenador: 4.8
    },
    { 
      hora: '18:30 - 19:30', 
      nombre: 'Funcional', 
      entrenador: 'María López',
      entrenadorId: 3,
      cupos: '6/15',
      calificacionEntrenador: 4.9
    }
  ],
  'Jueves': [
    { 
      hora: '06:30 - 07:30', 
      nombre: 'Yoga Matutino', 
      entrenador: 'Ana Silva',
      entrenadorId: 2,
      cupos: '7/12',
      calificacionEntrenador: 4.9
    },
    { 
      hora: '19:00 - 20:00', 
      nombre: 'CrossFit', 
      entrenador: 'María López',
      entrenadorId: 3,
      cupos: '12/15',
      calificacionEntrenador: 4.9
    }
  ],
  'Viernes': [
    { 
      hora: '07:00 - 08:00', 
      nombre: 'Spinning', 
      entrenador: 'Carlos Ruiz',
      entrenadorId: 1,
      cupos: '15/15',
      calificacionEntrenador: 4.8
    },
    { 
      hora: '18:00 - 19:00', 
      nombre: 'Zumba', 
      entrenador: 'Laura Martínez',
      entrenadorId: 4,
      cupos: '9/20',
      calificacionEntrenador: 4.7
    }
  ],
  'Sábado': [
    { 
      hora: '09:00 - 10:00', 
      nombre: 'Pilates', 
      entrenador: 'Ana Silva',
      entrenadorId: 2,
      cupos: '6/15',
      calificacionEntrenador: 4.9
    },
    { 
      hora: '10:30 - 11:30', 
      nombre: 'Spinning Familiar', 
      entrenador: 'Carlos Ruiz',
      entrenadorId: 1,
      cupos: '8/15',
      calificacionEntrenador: 4.8
    }
  ],
  'Domingo': [
    { 
      hora: '10:00 - 11:00', 
      nombre: 'Yoga Relajante', 
      entrenador: 'Ana Silva',
      entrenadorId: 2,
      cupos: '4/12',
      calificacionEntrenador: 4.9
    }
  ]
};

/**
 * Clases del entrenador por día con lista de alumnos
 */
export const CLASES_ENTRENADOR_BASE = {
  'Lunes': [
    { 
      hora: '07:00 - 08:00', 
      nombre: 'Spinning Matutino', 
      inscritos: 12,
      capacidad: 15,
      alumnos: [
        'Ana García', 'Pedro López', 'María Silva', 'Juan Pérez', 
        'Carlos Ruiz', 'Laura Martínez', 'Diego Torres', 'Sofía Ramírez',
        'Andrés Castro', 'Valentina Flores', 'Roberto Díaz', 'Camila Vargas'
      ]
    },
    { 
      hora: '18:00 - 19:00', 
      nombre: 'Spinning Avanzado', 
      inscritos: 8,
      capacidad: 15,
      alumnos: [
        'Fernando Soto', 'Gabriela Morales', 'Ricardo Pinto', 'Daniela Rojas',
        'Mauricio Vega', 'Patricia Núñez', 'Alejandro Campos', 'Nicole Herrera'
      ]
    }
  ],
  'Martes': [
    { 
      hora: '19:00 - 20:00', 
      nombre: 'Spinning Nocturno', 
      inscritos: 10,
      capacidad: 15,
      alumnos: [
        'Luis Contreras', 'Andrea Guzmán', 'Pablo Medina', 'Francisca Muñoz',
        'Jorge Salazar', 'Beatriz Ortiz', 'Rodrigo Peña', 'Catalina Bravo',
        'Sebastián León', 'Antonia Ríos'
      ]
    }
  ],
  'Miércoles': [
    { 
      hora: '07:00 - 08:00', 
      nombre: 'Spinning Matutino', 
      inscritos: 15,
      capacidad: 15,
      alumnos: [
        'Martín Espinoza', 'Javiera Fuentes', 'Cristóbal Parra', 'Isidora Sánchez',
        'Felipe Araya', 'Constanza Reyes', 'Tomás Navarro', 'Florencia Vera',
        'Ignacio Molina', 'Josefina Cortés', 'Maximiliano Leiva', 'Emilia Guerrero',
        'Vicente Tapia', 'Maite Figueroa', 'Matías Cárdenas'
      ]
    }
  ],
  'Jueves': [],
  'Viernes': [
    { 
      hora: '07:00 - 08:00', 
      nombre: 'Spinning Matutino', 
      inscritos: 14,
      capacidad: 15,
      alumnos: [
        'Benjamín Carmona', 'Renata Silva', 'Agustín Rojas', 'Amanda Torres',
        'Lucas Gómez', 'Isabella Moreno', 'Samuel Ibáñez', 'Antonella Fernández',
        'Gabriel Vargas', 'Sofía Castillo', 'Nicolás Sepúlveda', 'Valentina Muñoz',
        'Diego Valdés', 'Martina Jara'
      ]
    }
  ],
  'Sábado': [
    { 
      hora: '10:30 - 11:30', 
      nombre: 'Spinning Familiar', 
      inscritos: 6,
      capacidad: 15,
      alumnos: [
        'Carlos Herrera', 'Ana Campos', 'Pedro Bravo', 
        'María León', 'Juan Ríos', 'Laura Espinoza'
      ]
    }
  ],
  'Domingo': []
};

/**
 * Colores del tema
 */
export const COLORS = {
  primary: '#667eea',
  primaryDark: '#5a67d8',
  secondary: '#764ba2',
  success: '#38a169',
  successLight: '#48bb78',
  warning: '#ed8936',
  danger: '#e53e3e',
  dangerLight: '#fc8181',
  gray: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#a0aec0',
    500: '#718096',
    600: '#4a5568',
    700: '#2d3748'
  }
};

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard'
};

/**
 * Roles de usuario
 */
export const USER_ROLES = {
  CLIENTE: 'cliente',
  ENTRENADOR: 'entrenador',
  ADMIN: 'administrador'
};

/**
 * Genera clases para el entrenador con asistencia y calificaciones si es semana pasada
 */
export const getClasesEntrenador = (dayName, weekOffset) => {
  const clasesBase = CLASES_ENTRENADOR_BASE[dayName] || [];
  
  // Si es semana pasada, agregar calificaciones y asistentes
  if (weekOffset < 0) {
    return clasesBase.map(clase => ({
      ...clase,
      asistentes: clase.inscritos - Math.floor(Math.random() * 3), // Algunos alumnos pueden faltar
      calificacionClase: (4.5 + Math.random() * 0.5).toFixed(1), // Calificación entre 4.5 y 5.0
      completada: true
    }));
  }
  
  // Semana actual o futura, sin calificaciones
  return clasesBase.map(clase => ({
    ...clase,
    asistentes: null,
    calificacionClase: null,
    completada: false
  }));
};

/**
 * Datos mock del dashboard del administrador
 */
export const ADMIN_MOCK_DATA = {
  kpis: {
    clientesActivos: 127,
    tasaCrecimiento: '+12%',
    clientesDeudores: 8,
    utilidadMensual: '$2.450.000',
    margenUtilidad: '35%',
    asistenciaPromedio: '78%',
    ingresos: '$7.000.000',
    egresos: '$4.550.000',
    alertas: [
      { cantidad: 8, mensaje: 'clientes con deuda mayor a 2 meses', tipo: 'deudores', accion: 'Ver Deudores' },
      { cantidad: 15, mensaje: 'membresías vencen en los próximos 7 días', tipo: 'membresias', accion: 'Enviar Recordatorios' }
    ],
    membresias: [
      { tipo: 'Premium', cantidad: 45, porcentaje: 35, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
      { tipo: 'Standard', cantidad: 62, porcentaje: 49, color: 'linear-gradient(135deg, #38a169, #48bb78)' },
      { tipo: 'Básica', cantidad: 20, porcentaje: 16, color: 'linear-gradient(135deg, #ed8936, #f6ad55)' }
    ]
  },
  clientes: {
    activos: 127,
    inactivos: 18,
    deudores: 8,
    porVencer: 15,
    tasaRetencion: '92%',
    clientesDeudores: [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', membresia: 'Premium', deuda: '$90.000', meses: 2, ultimoPago: '2024-10-15' },
      { id: 2, nombre: 'María González', email: 'maria@email.com', membresia: 'Standard', deuda: '$135.000', meses: 3, ultimoPago: '2024-09-20' }
    ]
  },
  entrenadores: {
    totalActivos: 5,
    clasesSemanales: 48,
    calificacionPromedio: '4.7/5',
    costoMensual: '$4.250.000',
    entrenadores: [
      { id: 1, nombre: 'Carlos Ruiz', especialidad: 'Spinning', clasesSemanales: 12, alumnos: 45, calificacion: 4.8, tipoContrato: 'Indefinido', sueldo: '$850.000', fechaIngreso: '2023-01-15' },
      { id: 2, nombre: 'Ana Silva', especialidad: 'Yoga/Pilates', clasesSemanales: 10, alumnos: 38, calificacion: 4.9, tipoContrato: 'Indefinido', sueldo: '$800.000', fechaIngreso: '2023-03-20' }
    ]
  },
  implementaciones: {
    implementaciones: [
      { id: 1, nombre: 'Cinta de Correr', categoria: 'Cardio', cantidad: 8, estado: 'Excelente', ultimoMantenimiento: '2024-11-15' },
      { id: 2, nombre: 'Bicicleta Estática', categoria: 'Spinning', cantidad: 15, estado: 'Bueno', ultimoMantenimiento: '2024-10-20' }
    ]
  },
  facturacion: {
    ingresosMes: '$7.000.000',
    egresosMes: '$4.550.000',
    utilidadNeta: '$2.450.000',
    crecimientoIngresos: '8%',
    porcentajeEgresos: '65%',
    margenUtilidad: '35%',
    ingresosDesglose: [
      { concepto: 'Membresías', monto: '$5.700.000' },
      { concepto: 'Clases especiales', monto: '$800.000' },
      { concepto: 'Otros ingresos', monto: '$500.000' }
    ],
    egresosDesglose: [
      { concepto: 'Sueldos personal', monto: '$2.800.000' },
      { concepto: 'Arriendo local', monto: '$1.200.000' },
      { concepto: 'Servicios básicos', monto: '$350.000' },
      { concepto: 'Mantenimiento', monto: '$200.000' }
    ]
  }
};