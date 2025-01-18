import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getPokemons } from "../../Services/API";
import Card from "../../Components/Card/Card";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]); // Almacena la lista de Pokémon
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando

  // Función para obtener los Pokémon de la API
  const fetchPokemons = async () => {
    try {
      const page = 1; // Página inicial
      const limit = 3; // Límite de Pokémon a obtener
      const data = await getPokemons(page, limit); // Llamada a la API
      setPokemons(data.results); // Guarda los resultados en el estado
      console.log(data.results);
    } catch (error) {
      console.log("Error al obtener los Pokémon: ", error.message);
    } finally {
      setLoading(false); // Desactiva el indicador dre carga
    }
  };

  // Llama a fetchPokemons cuando el componente se monta
  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Pokémon</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FF4500" /> // Indicador de carga
      ) : (
        <View style={styles.cardContainer}>
          {pokemons.map((pokemon, index) => (
            <Card
              key={index}
              name={pokemon.nombre}
              number={pokemon.id}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, color: "#333", marginBottom: 20 },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15, // Espaciado entre las tarjetas
  },
});

