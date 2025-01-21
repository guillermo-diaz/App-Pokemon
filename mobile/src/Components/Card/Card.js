import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from './Styles.js';

const getId = (id ) => {
  if (id < 100) {
    id = id < 10 ? '00' + id : '0' + id;
  }
  return id;
}

const Card = ({ name, number }) => {
  return (
    <TouchableOpacity>
    <View style={styles.card}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{number}</Text>
      <Image source={{uri: `https://raw.githubusercontent.com/guillermo-diaz/App-Pokemon/refs/heads/master/web/archivos/img/asset-pokemon/${getId(number)}.png`}} style={{ width: 300, height: 150 }} />
    </View> 

    </TouchableOpacity>
    
  );
};

export default Card;