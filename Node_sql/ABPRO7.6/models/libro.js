const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Libro extends Model {}

Libro.init({
  ISBN: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numPaginas: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize, modelName: 'libro' });

module.exports = Libro;
