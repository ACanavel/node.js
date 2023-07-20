import mysql from "mysql2/promise";
import { config } from "dotenv";
config();


const pool = mysql.createPool({
  port: process.env.DB_PORT, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 100000,
  queueLimit: 0,
});

const consulta = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        repertorio.id as RepertorioId,
        repertorio.artista,
        repertorio.tono
      FROM 
        repertorio
      `
    );
    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};


const cancion = async () => {
  try {
    const [rows] = await pool.query(`SELECT * FROM repertorio`); 
    return rows;
  } catch (error) {
    console.error(error);
    return error;
  }
};


const insertarCancion = async (datos) => {
  const consulta = "INSERT INTO repertorio (cancion, artista, tono) VALUES (?, ?, ?)";
  try {
    const [result] = await pool.query(consulta, datos);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};


const eliminarCancion = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM repertorio WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    return error;
  }
};


const editarCancion = async (datos) => {
  const consulta = "UPDATE repertorio SET cancion=?, artista=?, tono=? WHERE id=?";
  try {
    const [result] = await pool.query(consulta, datos);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { consulta, cancion, insertarCancion, eliminarCancion, editarCancion };
