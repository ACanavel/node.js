const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Socio extends Model {}

Socio.init({
  rut: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'socio' });

module.exports = Socio;
