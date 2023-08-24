import React from "react";
import { StyleSheet } from "react-native";
const Styles = StyleSheet.create({
  container: {
    width: '100vw',
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 20,
    width: '100%',
  },
  link:{
    width: "100%",
    marginTop: 40,
  },
  linkText:{
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    textDecorationLine: "underline"
  }
});

export default Styles;
