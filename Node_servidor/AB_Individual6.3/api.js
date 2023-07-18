
import axios from 'axios';

async function getPokemon() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const randomCharacter = response.data.results[Math.floor(Math.random() * response.data.results.length)];
    const pokemonResponse = await axios.get(randomCharacter.url);
    const { id, name} = pokemonResponse.data;
    return { id, name};
  } catch (error) {
    throw new Error('Error al obtener el Pokémon');
  }
}


export default getPokemon;


