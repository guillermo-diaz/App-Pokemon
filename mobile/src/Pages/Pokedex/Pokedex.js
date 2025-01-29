import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { getPokemons } from "../../Services/API";
import Card from "../../Components/Card/Card";
import styles from "./Styles";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]); // Almacena la lista de Pokémon
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando
  const [page, setPage] = useState(1);
  const nextPage = useRef(); // Referencia para la próxima página
  const limit = 6; 
  
  const getPokemonsData = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(page, limit); 
      setPokemons([...pokemons, ...data.results]);

      // Determina si hay una página siguiente
      console.log("pagina "+data.next.page)
      if (data.next) {
        nextPage.current = data.next.page;
      } else {
        nextPage.current = null;
      }
    } catch (error) {
      console.log("Error al obtener los Pokémon: ", error.message);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  const fetchNextPokemonPage = () => {

    console.log("entro "+nextPage.current)
    if (nextPage.current) {
      setPage(nextPage.current);
    }
  };

  // Efecto para cargar los Pokémon al inicializar o cuando cambia la página
  useEffect(() => {
    getPokemonsData();
  }, [page]);





  return (
     <View style={styles.container}>
      <Text style={styles.text}>Lista de Pokémon</Text>
      <FlatList
        data={pokemons}
        renderItem={({ item }) => (
          <Card name={item.nombre} number={item.id} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        onEndReachedThreshold={0.6}
        onEndReached={fetchNextPokemonPage}
      />
    </View>
  );
}



