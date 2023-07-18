import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

// Creación del pool de conexiones a la base de datos
const pool = mysql.createPool({
  port: process.env.DB_PORT, // Asegúrate de tener esta variable en tu archivo .env
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 100000,
  queueLimit: 0,
});

// Función para obtener todos los registros de la tabla "repertorio"
const repertorio = async () => {
  try {
    const [rows] = await pool.query(`SELECT * FROM repertorio`); // Asegúrate de que la tabla se llama "repertorio", no "Repertorio"
    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Función para insertar un nuevo registro en la tabla "repertorio"
const insertarRepertorio = async (datos) => {
  const consulta = "INSERT INTO repertorio (cancion, artista, tono) VALUES (?, ?, ?)";
  try {
    const [result] = await pool.query(consulta, datos);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Función para eliminar un registro de la tabla "repertorio" por su ID
const eliminarRepertorio = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM repertorio WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Función para editar un registro de la tabla "repertorio" por su ID
const editarRepertorio = async (datos) => {
  const consulta = "UPDATE repertorio SET cancion=?, artista=?, tono=? WHERE id=?";
  try {
    const [result] = await pool.query(consulta, datos);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { repertorio, insertarRepertorio, eliminarRepertorio, editarRepertorio };
