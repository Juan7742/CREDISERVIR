const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Pago = sequelize.define('Pago', {
  inscripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'inscripciones',
      key: 'id'
    }
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_pago: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'pagos',
  timestamps: true // Habilita createdAt y updatedAt
});

module.exports = Pago;
