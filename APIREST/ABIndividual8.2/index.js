import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

let coffeeTypes = JSON.parse(fs.readFileSync('./data/coffee.json', 'utf8')).coffeeTypes;

//ruta get
//muestra todos los café
app.get('/coffee', (req, res) => {
  res.json(coffeeTypes);
});
//muestra un id correspondiente a un café
app.get('/coffee/:id', (req, res) => {
  const id = req.params.id;
  const coffee = coffeeTypes.find((coffee) => coffee.id === parseInt(id));
  if (coffee) {
    res.json(coffee);
  } else {
    res.status(404).json({ error: 'Tipo de café no encontrado' });
  }
});

//ruta post (agregamos un nuevo café)
app.post('/coffee', (req, res) => {
  const newCoffeeType = req.body;
  const id = coffeeTypes.length + 1;
  newCoffeeType.id = id;
  coffeeTypes.push(newCoffeeType);
  res.status(201).json(newCoffeeType);
});

//actualizamos un café
app.put('/coffee/:id', (req, res) => {
  const id = req.params.id;
  const updatedCoffeeType = req.body;

  const index = coffeeTypes.findIndex(coffee => coffee.id === parseInt(id));
  if (index >= 0) {
    coffeeTypes[index] = updatedCoffeeType;
    res.json(updatedCoffeeType);
  } else {
    res.status(404).json({ error: 'Tipo de café no encontrado' });
  }
});
//escuchamos el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
