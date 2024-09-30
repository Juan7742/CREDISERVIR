const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar la configuración de Sequelize
const sequelize = require('./models/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Importar las rutas
const eventosRouter = require('./routes/eventos');
const asistentesRouter = require('./routes/asistentes');
const inscripcionesRouter = require('./routes/inscripciones');
const pagosRouter = require('./routes/pagos');
const promocionesRouter = require('./routes/promociones');

// Integrar las rutas
app.use('/eventos', eventosRouter);
app.use('/asistentes', asistentesRouter);
app.use('/inscripciones', inscripcionesRouter);
app.use('/pagos', pagosRouter);
app.use('/promociones', promocionesRouter);

// Sincronizar los modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
    
    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });
