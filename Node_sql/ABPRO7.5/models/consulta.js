const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Medico = require('./medico');
const Paciente = require('./paciente');

const Consulta = sequelize.define('Consulta', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horaAtencion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroBox: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Consulta.belongsTo(Medico);
Consulta.belongsTo(Paciente);

module.exports = Consulta;
