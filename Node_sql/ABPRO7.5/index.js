const sequelize = require('./config/database');
const Persona = require('./models/persona');
const Especialidad = require('./models/especialidad');
const Medico = require('./models/medico');
const Paciente = require('./models/paciente');
const Consulta = require('./models/consulta');
const Licencia = require('./models/licencia');
const cargarDatosEjemplo = require('./datos');

// Sincronización de los modelos con la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados correctamente.');

    // Cargar datos de ejemplo
    await cargarDatosEjemplo();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

