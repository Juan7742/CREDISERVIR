const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestion_eventos', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa con PostgreSQL');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize;
