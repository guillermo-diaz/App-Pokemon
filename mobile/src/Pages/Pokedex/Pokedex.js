import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { getPokemons } from "../../Services/API";
import Card from "../../Components/Card/Card";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]); // Almacena la lista de Pokémon
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando

  // Función para obtener los Pokémon de la API
  const fetchPokemons = async () => {
    try {
      const page = 1; // Página inicial
      const limit = 6; // Límite de Pokémon a obtener
      const data = await getPokemons(page, limit); // Llamada a la API
      setPokemons(data.results); // Guarda los resultados en el estado
    } catch (error) {
      console.log("Error al obtener los Pokémon: ", error.message);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Llama a fetchPokemons cuando el componente se monta
  useEffect(() => {
    fetchPokemons();
  }, []);

  const renderPokemon = ({ item }) => (
    <Card name={item.nombre} number={item.id} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Pokémon</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FF4500" /> // Indicador de carga
      ) : (
        <FlatList
          data={pokemons}
          renderItem={renderPokemon}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cardContainer} // Estilo para los elementos
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, color: "#333", marginBottom: 20 },
  cardContainer: {
    paddingBottom: 20, // Espaciado inferior
    alignItems: "center",
  },
});


