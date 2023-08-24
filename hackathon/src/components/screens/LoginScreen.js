import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import { loginSchema } from "../../validation/authenticationSchema";
import { TextInput } from "react-native-gesture-handler";
import Styles from "../../styles/Styles";
import AuthLogo from "../common/AuthLogo";
import background from '../../../assets/background.jpeg'
import { useNavigation } from "@react-navigation/native";


const LoginScreen = () => {
  // handle form submit
  const handleSubmit = (values) => {
    console.log(values);
  };

  // 

  // handle page change
const navigation = useNavigation();

const handlePress = () =>{
  navigation.navigate('CreateAccount')
}

  return (
    <ImageBackground style={Styles.container} source={background} >
      <View  >
      <AuthLogo message="Welcome" />
      {/* formik handles on change values for the form */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema} //pass the yup validation schema
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {(props) => (
          <View style={Styles.inputContainer}>
            {/* email input */}
            <TextInput
              style={Styles.input}
              placeholder="Email or Username"
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
            />
            <Text style={Styles.errorMessage}>
              {props.touched.password && props.errors.password}
            </Text>
            <Button onPress={props.handleSubmit} title="submit" />
          </View>
        )}
      </Formik>
          <View style={Styles.link}>
            <Text style={Styles.linkText}  onPress={handlePress} >Not a Member? Register Now</Text>
          </View>

    </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
