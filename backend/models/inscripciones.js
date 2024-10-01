const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Inscripcion = sequelize.define('Inscripcion', {
  evento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'eventos',
      key: 'id'
    }
  },
  asistente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'asistentes',
      key: 'id'
    }
  },
  tipo_entrada: {
    type: DataTypes.ENUM('gratis', 'general', 'VIP'),
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(10, 2)
  },
  estado: {
    type: DataTypes.ENUM('confirmado', 'cancelado'),
    allowNull: false
  },
  fecha_inscripcion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'inscripciones',
  timestamps: true
});

module.exports = Inscripcion;
