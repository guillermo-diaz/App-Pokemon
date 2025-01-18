import CONFIG from '../Config/config'

export const getPokemons = async (page, limit) => {
  try {
    const url = `http://${CONFIG.IP}:${CONFIG.PORT}/API/pokemon?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    if (response.ok) {
      const pokemonList = await response.json();
      return pokemonList;
    } else {
      return response.status(500);
    }
  } catch (e) {
    console.error("Error:", e);
    return 500;  
  }
};
