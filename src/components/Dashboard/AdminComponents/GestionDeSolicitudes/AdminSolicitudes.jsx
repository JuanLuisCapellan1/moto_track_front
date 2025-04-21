import { empleadosData } from '../../../../data/empleadosData';

// Then search through the file and update any references to EMPLEADO_ROL
// For example, change:
// const adminUsers = empleadosData.filter(emp => emp.rol === EMPLEADO_ROL.ADMIN);
// To:
const adminUsers = empleadosData.filter(emp => emp.rol === 'ADMIN');

// Similarly:
// EMPLEADO_ROL.SUPERVISOR -> 'SUPERVISOR'
// EMPLEADO_ROL.AGENTE -> 'EMPLEADO'