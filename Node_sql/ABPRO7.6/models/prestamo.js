const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Prestamo extends Model {}

Prestamo.init({
  idPrestamo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaInicio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fechaEsperada: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fechaReal: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, { sequelize, modelName: 'prestamo' });

module.exports = Prestamo;
