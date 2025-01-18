import { Text, View } from "react-native";

const Card = ({ name, number }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 8,
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{number}</Text>
      {/* <Image src={imgUrl} style={{ width: 300, height: 150 }} /> */}
    </View>
  );
};

export default Card;