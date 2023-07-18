const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./persona');
const Especialidad = require('./especialidad');

const Medico = sequelize.define(
  'Medico',
  {
    ...Persona.tableAttributes,
  },
   {
    timestamps: true, 
    underscored: true, 
  }
);

Medico.belongsTo(Especialidad, { foreignKey: 'especialidadId' });

module.exports = Medico;
