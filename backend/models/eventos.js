const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Evento = sequelize.define('Evento', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  lugar: {
    type: DataTypes.STRING
  },
  cupo_disponible: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('gratuito', 'pago'),
    allowNull: false
  },
  valor_base: {
    type: DataTypes.DECIMAL(10, 2)
  },
  categorias: {
    type: DataTypes.STRING
  },
  fecha_apertura: {
    type: DataTypes.DATE
  },
  fecha_cierre: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'eventos',
  timestamps: true
});

module.exports = Evento;
