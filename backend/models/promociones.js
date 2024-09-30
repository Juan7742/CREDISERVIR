const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Promocion = sequelize.define('Promocion', {
  codigo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  porcentaje_descuento: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  fecha_inicio: {
    type: DataTypes.DATE
  },
  fecha_fin: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    allowNull: false
  }
}, {
  tableName: 'promociones',
  timestamps: true // Habilita createdAt y updatedAt
});

module.exports = Promocion;
