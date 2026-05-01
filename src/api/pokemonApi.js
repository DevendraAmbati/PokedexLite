import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = (limit = 20, offset = 0) => {
  return axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
};

export const getPokemonDetails = (url) => {
  return axios.get(url);
};