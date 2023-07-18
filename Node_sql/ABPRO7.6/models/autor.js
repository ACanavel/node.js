const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Autor extends Model {}

Autor.init({
  codigoAutor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fechaMuerte: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, { sequelize, modelName: 'autor' });

module.exports = Autor;
