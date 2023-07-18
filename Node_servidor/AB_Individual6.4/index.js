import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import {engine} from 'express-handlebars';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.engine("handlebars", engine());
app.set('views', `${__dirname}/views`);
app.set('view engine','hbs');


app.get('/pendientes', (req,res) => {
    const title = "Tareas Pendientes";
    const pendientes = [
{ id: 1, titulo: "Encender el computador"},
{ id: 2, titulo: "Iniciar Google Chome"},
{ id: 3, titulo: "Entrar a la plataforma Adalid"},
{ id: 4, titulo: "Registrar con clave sence"},
{ id: 5, titulo: "Buscar el aprendizaje 5"},

    ];
    res.render("pendientes", { pendientes, title });
});

app.get('/realizadas', (req, res) => {
    const title = "Tareas Realizadas";
    const realizadas = [
        {id: 1, titulo: "Levantarse"},
        {id: 2, titulo: "Desayunar"},
    ];

    res.render("realizadas", { realizadas, title });
});


  

app.listen(PORT, () => console.log (`Escuchando el puerto ${PORT}... `));