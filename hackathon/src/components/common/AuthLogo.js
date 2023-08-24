import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import logo from "../../../assets/logo.jpg";

// ! contains the app name and logo of the app in authStacks

const AuthLogo = ({ message }) => {
  return (
    <View style={styles.logo}>
     <View style={styles.headingCont}>
     <Image style={styles.image} source={logo} />
     <Text style={styles.heading}>Cyber Safe</Text>
     </View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default AuthLogo;

const styles = StyleSheet.create({
  logo: {
    height: 150,
    alignItems: "center",
    padding: 10,

  },
  heading: {
    fontSize: 60,
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 20,
    borderRadius: 20,
    objectFit: "cover",
  },
  headingCont:{
    flexDirection: "row",
    alignItems: "center",
    gap: 20,

  },
  text: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 20,

    fontWeight: "bold",
  },
});
