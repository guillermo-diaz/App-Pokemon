import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName = '';
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'Pokedex':
            iconName = 'book-outline';
            break;
          case 'Add Pokémon':
            iconName = 'add-circle-outline';
            break;
          case 'Favorites':
            iconName = 'heart-outline';
            break;
          default:
            iconName = '';
        }

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Icon
              name={iconName}
              size={30}
              color={isFocused ? 'red' : 'black'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomTabBar;
