const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Asistente = sequelize.define('Asistente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATE
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  celular: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'asistentes',
  timestamps: true // Habilita createdAt y updatedAt
});

module.exports = Asistente;
