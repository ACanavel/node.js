
import express from 'express';
import getPokemon from './api.js';

const app = express();
const PORT = 3000;

app.get('/pokemon', async (req, res) => {
  try {
    const pokemon = await getPokemon();
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener un Pokémon al azar' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
