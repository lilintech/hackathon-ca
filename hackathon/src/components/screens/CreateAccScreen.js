import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { createAccSchema } from "../../validation/authenticationSchema";
import { TextInput } from "react-native-gesture-handler";
import { Styles } from "../../styles/Styles";
import AuthLogo from "../common/AuthLogo";
import background from "../../../assets/background.jpeg";
import { useNavigation } from "@react-navigation/native";
import { post } from "../../services/api";

const CreateAccScreen = () => {
  const [errorData, setErrorData] = useState("");

   // handle page change
   const navigation = useNavigation();

  // handle form submit
  const handleSubmit = async (values) => {
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    console.log(data);

    try {
      const response = await post("api/v1/create", data);

      // handle success
      if (response.status === 201) {
        console.log(response.data);
        setErrorData(null);
        navigation.navigate("Login")

      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        if (error.response.status === 409) {
          setErrorData(error.response.data);
        } else if (error.response.status === 404) {
          setErrorData("Resource not found");
        } else {
          setErrorData("An error occurred");
        }
      } else {
        console.log("An error occured: ", error.message);
        setErrorData("An error occurred");
      }
    }
  };

  //

 

  const handlePress = () => {
    navigation.navigate("Login"); //pass name of screen
  };

  return (
    <ImageBackground style={Styles.container} source={background}>
      <View>
        {/* <AuthLogo message="Create an Account" /> */}
        <Text style={Styles.heading} >Create an Account</Text>
        <Text style={Styles.errorData}>{errorData}</Text>
        {/* formik handles on change values for the form */}
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={createAccSchema} //pass the yup validation schema
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View style={Styles.inputContainer}>
              {/* email input */}
              <TextInput
                style={Styles.input}
                placeholder="Username"
                onChangeText={props.handleChange("username")}
                onBlur={props.handleBlur("username")} //when user moves from input
                value={props.values.username} //handled by formik
              />
              <Text style={Styles.errorMessage}>
                {props.touched.username && props.errors.username}
              </Text>

              {/* email input */}
              <TextInput
                style={Styles.input}
                placeholder="Email address"
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")} //when user moves from input
                value={props.values.email} //handled by formik
              />
              <Text style={Styles.errorMessage}>
                {props.touched.email && props.errors.email}
              </Text>
              {/*password input */}
              <TextInput
                style={Styles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
                secureTextEntry={true}
              />
              <Text style={Styles.errorMessage}>
                {props.touched.password && props.errors.password}
              </Text>
              <Button onPress={props.handleSubmit} title="Create Account" />
            </View>
          )}
        </Formik>
        <View style={Styles.link}>
          <Text style={Styles.linkText} onPress={handlePress}>
            Already have an account? Log In
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CreateAccScreen;

const styles = StyleSheet.create({});


