// single card that will display news on news page
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import imageCard from "../../../assets/background.jpeg";
import { TouchableOpacity } from "react-native-gesture-handler";
const NewsCard = () => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <Image source={imageCard} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>Example Heading</Text>
          <Text style={styles.description}>
            The hackers, who mostly targeted victims in Hong Kong, also hijacked
            Microsoft’s trust model to make their malware harder to detect.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 2,
    margin: 5,
    width: 170,
    height: 200,
    backgroundColor: "yellow",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "45%",
  },
  content: {
    flex: 1,
    backgroundColor: "brown",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
  },
});

export default NewsCard;
