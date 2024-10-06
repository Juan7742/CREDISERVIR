const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Inscripcion = sequelize.define('Inscripcion', {

  // Almacena el ID del evento al que se inscribe un asistente (llave foránea de la tabla 'eventos')
  evento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
      model: 'eventos', // Define que este campo hace referencia a la tabla 'eventos'
      key: 'id' // Y específicamente al campo 'id' de dicha tabla
    }
  },

  // Almacena el ID del asistente que está inscrito (llave foránea de la tabla 'asistentes')
  asistente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
      model: 'asistentes', // Define que este campo hace referencia a la tabla 'asistentes'
      key: 'id' // Y hace referencia al campo 'id' en dicha tabla
    }
  },

  // Almacena el tipo de entrada que el asistente adquirió para el evento (gratis, general o VIP)
  tipo_entrada: {
    type: DataTypes.ENUM('gratis', 'general', 'VIP'), // Define un valor limitado a estas tres opciones
    allowNull: false
  },

  // Almacena el valor total pagado por la inscripción, si aplica
  valor_total: {
    type: DataTypes.DECIMAL(10, 2)
  },

  estado: {
    type: DataTypes.ENUM('confirmado', 'cancelado'),
    allowNull: false
  },

  fecha_inscripcion: {
    type: DataTypes.DATE, // El tipo de dato es fecha
    defaultValue: DataTypes.NOW // Por defecto, se guarda la fecha y hora actuales cuando se crea el registro
  }
}, {
  tableName: 'inscripciones',

  // Incluye las columnas 'createdAt' y 'updatedAt' automáticamente para mantener las fechas de creación y actualización
  timestamps: true
});

module.exports = Inscripcion;
