import exphbs from "express-handlebars";
import express from "express";
import { repertorio } from "./db.js"; 
import path from "path";

const app = express();
const port = 3000;

app.engine("hbs", exphbs({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src", "views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => res.render("home"));

app.get('/canciones', async (req, res) => {
  try {
    const rows = await repertorio(); // Utilizar el objeto "pool" a través de la función "repertorio"
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las canciones de la base de datos' });
  }
});

app.post('/cancion', async (req, res) => {
  try {
    const { cancion, artista, tono } = req.body;
    const result = await insertarRepertorio([cancion, artista, tono]); // Importar e utilizar la función "insertarRepertorio" desde "db.js"
    res.json({ id: result.insertId, message: 'Canción insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar la canción en la base de datos' });
  }
});

app.put('/cancion', async (req, res) => {
  try {
    const { id, cancion, artista, tono } = req.body;
    await editarRepertorio([cancion, artista, tono, id]); // Importar e utilizar la función "editarRepertorio" desde "db.js"
    res.json({ message: 'Canción actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la canción en la base de datos' });
  }
});

app.delete('/cancion', async (req, res) => {
  try {
    const id = req.query.id;
    const affectedRows = await eliminarRepertorio(id); // Importar e utilizar la función "eliminarRepertorio" desde "db.js"
    if (affectedRows === 0) {
      res.status(404).json({ error: 'No se encontró la canción con el ID proporcionado' });
    } else {
      res.json({ message: 'Canción eliminada correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la canción de la base de datos' });
  }
});

export default app;

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
