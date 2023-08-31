import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import NewsCard from "../common/NewsCard";
import { ScrollView } from "react-native-gesture-handler";

export default function News() {
  return (
    <ScrollView>
<View style={news.container}>
      
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
      <NewsCard />
   
  </View>
    </ScrollView>
    
  );
}

const news = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
