const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./persona');

const Paciente = sequelize.define(
  'Paciente',
  {
    ...Persona.tableAttributes,
  },
  {
    timestamps: true, 
    underscored: true, 
  }
);
module.exports = Paciente;


