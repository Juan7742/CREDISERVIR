const { Sequelize } = require('sequelize');

// Crear la instancia de Sequelize con la configuración de la base de datos
const sequelize = new Sequelize('gestion_eventos', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres'
});

// Probar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con PostgreSQL');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize; // Asegúrate de que esto esté presente
