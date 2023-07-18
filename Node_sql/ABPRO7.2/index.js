const { agregarEstudiante, registroEstudiante, consultaEstudianteRut, actualizaEstudiante, eliminarEstudiante, closeConnection } = require('./estudiante');


// Ejemplo de uso
const estudiante = { nombre: 'John Doe', rut: '12345678-9', curso: 'A', nivel: 1 };
// las funciones se encuentran comentadas para ejecutarlas individualmente
agregarEstudiante(estudiante);
//registroEstudiante();
//consultaEstudianteRut('12345678-9');
//actualizaEstudiante({ ...estudiante, nombre: 'Jane Smith' });
//eliminarEstudiante('12345678-9');

setTimeout(() => {
  closeConnection();
}, 2000);
