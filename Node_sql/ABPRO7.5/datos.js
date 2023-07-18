const Medico = require('./models/medico');
const Paciente = require('./models/paciente');
const Especialidad = require('./models/especialidad');
const Licencia = require('./models/licencia');
const Consulta = require('./models/consulta');
const fs = require('fs');

// Función para generar el archivo txt
function generarArchivoTxt(nombreArchivo, datos) {
  const contenido = JSON.stringify(datos, null, 2);
  fs.writeFileSync(nombreArchivo, contenido);
  console.log(`Archivo TXT "${nombreArchivo}" generado exitosamente.`);
}

async function cargarDatosEjemplo() {
  try {
    // Crear el registro de una especialidad
    const especialidad = await Especialidad.create({
      codigo: 'ESPC0002',
      descripcion: 'Cardiologia',
    });

    // Crear el registro de un Médico
    const medico = await Medico.create({
      nombre: 'Dr. Julio Perdomo',
      rut: '15745965-5',
      direccion: 'Tucapel 338, Edif.Clinica Sur, Concepción, Región Bio Bio',
      especialidadId: especialidad.id,
    });

    // Crear el registro del paciente
    const paciente = await Paciente.create({
      nombre: 'José Cárdenas',
      rut: '6885623-7',
      direccion: 'Salas 958,Chillan',
    });

    // Crear el registro de la consulta
    const consulta = await Consulta.create({
      fecha: new Date(),
      horaAtencion: '9:00',
      numeroBox: 2,
    });

    // Asignar los id correspondientes en la tabla consulta, de medico y paciente
    consulta.setMedico(medico);
    consulta.setPaciente(paciente);

    // Crear el registro en la tabla de la Licencia
    const licencia = await Licencia.create({
      codigo: 'LIC0003',
      diagnostico: 'Licencia por arteria con grasa',
      fechaInicio: new Date(),
      fechaTermino: new Date(),
    });

    // Asignar en la tabla Licencia los id de medico y paciente
    licencia.setMedico(medico);
    licencia.setPaciente(paciente);

    // Generar un archivo txt con los datos de la licencia
    await generarArchivoTxt('licencia.txt', licencia.toJSON());

    console.log('Datos de ejemplo cargados correctamente.');
  } catch (error) {
    console.error('Error al cargar los datos de ejemplo:', error);
  }
}

module.exports = cargarDatosEjemplo;
