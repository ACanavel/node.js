import express from "express";
import exphbs from "express-handlebars";
import { consulta, cancion, insertarCancion, editarCancion,eliminarCancion } from "./db.js"; 


const app = express();
const port = 3000;

app.engine("hbs", exphbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => res.render("home"));

app.get('/canciones', async (req, res) => {
  const registros = await consulta();
  const repertorio = await repertorio();
  res.status(200).json([registros, repertorio]);
});


app.post('/cancion', async (req, res) => {
  const datos = Object.values(req.body);
  const respuesta = await insertarCancion(datos);
  res.status(201).json(respuesta);
});


app.put('/cancion', async (req, res) => {

  const datos = Object.values(req.body);
  const respuesta = await editarCancion(datos);
  res.json(respuesta);
});
 

app.delete('/cancion', async (req, res) => {
  const { id } = req.query;
  const respuesta = await eliminarCancion(id);
  res.json(respuesta);
});



export default app;

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
