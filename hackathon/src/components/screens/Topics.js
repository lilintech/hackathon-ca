import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Card from "../common/Card";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function Topics() {
  return (
    <ScrollView style={newsStyles.main}>
      <View style={newsStyles.container}>
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
}

const newsStyles = StyleSheet.create({
  main: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "grey",
    
  },
  container: {
    width: "100vw",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 15,
    justifyContent: "center"

  },
});
