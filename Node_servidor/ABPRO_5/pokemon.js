const http = require('http');
const axios = require('axios');

const PORT = 3000;

// Función para obtener la información detallada de un Pokémon dado su URL
async function getPokemonDetails(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los detalles del Pokémon: ${error}`);
    throw error;
  }
}

// Función para obtener la información básica de todos los Pokémon
async function getAllPokemons() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemons = response.data.results;
    const pokemonDetailsPromises = pokemons.map((pokemon) => getPokemonDetails(pokemon.url));
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    return pokemonDetails;
  } catch (error) {
    console.error(`Error al obtener la lista de Pokémon: ${error}`);
    throw error;
  }
}

// Crear un servidor HTTP
const server = http.createServer(async (req, res) => {
  if (req.url === '/pokemones' && req.method === 'GET') {
    try {
      const pokemonDetails = await getAllPokemons();
      const pokemonData = pokemonDetails.map((pokemon) => ({
        name: pokemon.name,
        image: pokemon.sprites.front_shiny
      }));
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(pokemonData));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Error al obtener la información de los Pokémon' }));
    }
  } else if (req.url === '/' && req.method === 'GET') {
    try {
      const pokemonDetails = await getAllPokemons();
      const pokemonGallery = pokemonDetails
        .map((pokemon) => `<div class="pokemon">
                            <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}" />
                            <p>${pokemon.name}</p>
                          </div>`)
        .join('');

      const html = `<html>
                      <head>
                        <style>
                          .pokemon {
                            display: inline-block;
                            width: 100px;
                            text-align: center;
                            margin: 5px;
                          }
                          img {
                            width: 80px;
                            height: 80px;
                          }
                        </style>
                      </head>
                      <body>
                        <div>${pokemonGallery}</div>
                      </body>
                    </html>`;

      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Error al obtener la información de los Pokémon' }));
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Not Found');
  }
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
