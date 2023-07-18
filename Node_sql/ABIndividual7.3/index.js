const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const agregar = async (valores) => {
  const consulta = {
    text: "INSERT INTO usuarios (nombre) VALUES (?) RETURNING *",
    values: [valores[0]]
  };
  const { rows, rowCount } = await pool.query(consulta);
  if (rows && rows.length > 0) {
    console.log("Insertado " + rowCount + " filas. Última inserción con id: " + rows[0].id);
    return rows;
  } else {
    throw new Error("No se pudo insertar el usuario.");
  }
};

const modificar = async (valores) => {
  const consulta = {
    text: "UPDATE usuarios SET nombre = ? WHERE id = ? RETURNING *",
    values: [valores[1], valores[0]]
  };
  const { rows } = await pool.query(consulta);
  if (rows && rows.length > 0) {
    return rows;
  } else {
    throw new Error("No se pudo modificar el usuario.");
  }
};

const eliminar = async (id) => {
  const { rows } = await pool.query("DELETE FROM usuarios WHERE id = ? RETURNING *", [id]);
  if (rows && rows.length > 0) {
    return rows;
  } else {
    throw new Error("No se pudo eliminar el usuario.");
  }
};


pool.getConnection((err, connection) => {
  if (err) throw err;

  // Utiliza las funciones dentro de la conexión
  agregar(['Maria Suarez']).then((result) => {
    console.log('Usuario agregado:', result);
  });

 /*  modificar([1, 'Jane Smith']).then((result) => {
    console.log('Usuario modificado:', result);
  });

  eliminar(1).then((result) => {
    console.log('Usuario eliminado:', result);
  }); */

  // Devuelve la conexión al pool cuando hayas terminado
  connection.release();
});
