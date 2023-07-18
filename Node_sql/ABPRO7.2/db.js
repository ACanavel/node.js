const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

// Creación del pool de conexiones
const pool = mysql.createPool({
  connectionLimit: 20,
  idleTimeoutMillis: 5000,
  acquireTimeoutMillis: 2000,
  ...dbConfig,
});

// cierre de conexion
function closeConnection() {
  pool.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err);
    } else {
      console.log('Conexión cerrada correctamente');
    }
  });
}

// Exportar el pool de conexiones y la función de cierre
module.exports = {
  pool,
  closeConnection,
};