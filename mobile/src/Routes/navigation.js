import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//pages
import Home from '../Pages/Home/Home';
import Pokedex from '../Pages/Pokedex/Pokedex';
import AddPokemon from '../Pages/AddPokemon/AddPokemon';
import Favorites from '../Pages/Favorites/Favorites';

import CustomTabBar from '../Components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pokedex" component={Pokedex} />
        <Tab.Screen name="Add Pokémon" component={AddPokemon} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
