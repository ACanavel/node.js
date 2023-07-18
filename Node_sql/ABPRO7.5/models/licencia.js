const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Medico = require('./medico');
const Paciente = require('./paciente');
const fs = require('fs');

const Licencia = sequelize.define('Licencia', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diagnostico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaTermino: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Licencia.belongsTo(Medico);
Licencia.belongsTo(Paciente);

// Método para generar el archivo TXT al crear una licencia
Licencia.afterCreate(async (licencia) => {
  const contenidoArchivo = `Código: ${licencia.codigo}\nDiagnóstico: ${licencia.diagnostico}\nFecha de inicio: ${licencia.fechaInicio}\nFecha de término: ${licencia.fechaTermino}`;

  try {
    fs.writeFileSync(`licencia_${licencia.id}.txt`, contenidoArchivo);
    console.log('Archivo TXT de licencia generado exitosamente.');
  } catch (error) {
    console.error('Error al generar el archivo TXT de licencia:', error);
  }
});

module.exports = Licencia;
