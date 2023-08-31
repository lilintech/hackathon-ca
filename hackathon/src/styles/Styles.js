import React from "react";
import { StyleSheet } from "react-native";

// stylesheet for login and signup
export const Styles = StyleSheet.create({
  container: {
    width: "100vw",
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
    width: "100%",
  },
  link: {
    width: "100%",
    marginTop: 40,
  },
  linkText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  errorData: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
  heading: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 20,

    fontWeight: "bold",
  },
  forgot: {
    backgroundColor: "red",
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
  },
});

// stylesheet for report new incident
export const reportStyles = StyleSheet.create({
  header: {
    backgroundColor: "grey",
    flex: 1,
    padding: 20,
  },
  seen: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "600",
  },
  personal: {
    fontSize: 18,
    marginTop: 10,
  },
  commonInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10,
    width: "100%",
    color: "white",
  },
  checkbox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  genderBox: {
    flexDirection: "row",
    gap: 16,
  },
  incidentDesc: {
    height: 100,
    textAlignVertical: "top",
    padding: 5,
  },

  scrollViewContent: {
    flexGrow: 1,
  },
  TextInputContent: {
    flexGrow: 1,
  },
  errorData: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
  TextInputCont: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
  },
});

// stylesheet for forgot passwrod screen
export const forgot = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    // marginTop: 80,
    width: "100vw",
    height: "100vh",
  },
  heading: {
    // backgroundColor: "yellow",
    padding: 10,
    textAlign: "center",
    fontSize: 30,
    marginTop: 20,
  },
  form: {
    padding: 20,
    justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginTop: 10,
    width: "100%",
    color: "black",
  },
  button:{
    marginTop: 20,
    width: "100%",
    alignItems: 'center'
  },
  form_error:{
    color: 'grey',
    marginTop: 5,
  }
});
