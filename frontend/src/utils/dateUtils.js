// frontend/src/utils/dateUtils.js

/**
 * Obtiene las fechas de una semana específica
 * @param {number} weekOffset - Offset de semanas (0 = esta semana, -1 = semana pasada, etc.)
 * @param {Date} baseDate - Fecha base (por defecto: hoy)
 * @returns {Date[]} Array con las 7 fechas de la semana
 */
export const getWeekDates = (weekOffset = 0, baseDate = new Date()) => {
  const today = new Date(baseDate);
  const currentDay = today.getDay();
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  
  const monday = new Date(today);
  monday.setDate(diff + (weekOffset * 7));
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }
  return dates;
};

/**
 * Formatea una fecha a string YYYY-MM-DD
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formatea una fecha al formato DD-MM-YYYY
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDateLocale = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('es-CL', options);
};

/**
 * Obtiene el nombre del día en español
 * @param {Date} date - Fecha
 * @returns {string} Nombre del día
 */
export const getDayName = (date) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[date.getDay()];
};

/**
 * Obtiene la etiqueta de la semana (Esta Semana, Semana Pasada, etc.)
 * @param {number} weekOffset - Offset de semanas
 * @returns {string} Etiqueta de la semana
 */
export const getWeekLabel = (weekOffset) => {
  if (weekOffset === 0) return 'Esta Semana';
  if (weekOffset === -1) return 'Semana Pasada';
  if (weekOffset === 1) return 'Próxima Semana';
  if (weekOffset < 0) return `${Math.abs(weekOffset)} semanas atrás`;
  return `+${weekOffset} semanas`;
};

/**
 * Verifica si una clase ya pasó (comparado con fecha y hora actual)
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} hora - Hora en formato HH:MM - HH:MM
 * @returns {boolean} True si la clase ya pasó
 */
export const esClasePasada = (fecha, hora) => {
  const [horaInicio] = hora.split(' - ');
  const [horaNum, minNum] = horaInicio.split(':');
  
  const fechaClase = new Date(fecha + 'T' + horaInicio + ':00');
  const ahora = new Date();
  
  return fechaClase < ahora;
};

/**
 * Verifica si una clase es de semana pasada
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {boolean} True si la clase es de semana pasada
 */
export const esDeSemanaAnterior = (fecha) => {
  const fechaClase = new Date(fecha + 'T00:00:00');
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  
  return fechaClase < hoy;
};

/**
 * Verifica si una clase es reservable (presente o futura, no pasada)
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} hora - Hora en formato HH:MM - HH:MM
 * @returns {boolean} True si la clase es reservable
 */
export const esClaseReservable = (fecha, hora) => {
  return !esClasePasada(fecha, hora);
};