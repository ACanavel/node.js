const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// configuración de la conexion db
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const agregar = async (valores) => {
  const consulta = {
    sql: 'INSERT INTO usuarios (id, nombre) VALUES (?, ?)',
    values: valores
  };

  try {
    const [rows] = await pool.query(consulta);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Ejemplo de uso
const valores = [5, 'Angela Lugo']; // Debe cambiar el valor del id porque ya hay tres valores insertados
agregar(valores)
  .then(result => {
    console.log(result);
    pool.end(); // La conexion se cierra al realizar todas las consultas
  })
  .catch(error => {
    console.error(error);
    pool.end(); // Cierra la conexión en caso de error también
  });
