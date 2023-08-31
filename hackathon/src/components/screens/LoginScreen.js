import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { loginSchema } from "../../validation/authenticationSchema";
import { TextInput } from "react-native-gesture-handler";
import { Styles } from "../../styles/Styles";
import AuthLogo from "../common/AuthLogo";
import background from "../../../assets/background.jpeg";
import { post } from "../../services/api";
import { tokenStore } from "../../utility/tokens";

const LoginScreen = ({ navigation, route }) => {
  const [errorData, setErrorData] = useState("");
  const { setIsAuthenticated } = route.params;

 
  // handle form submit
  const handleSubmit = async (values) => {
    const data = {
      emailOrUsername: values.emailOrUsername,
      password: values.password,
    };
    console.log(data);

    try {
      const response = await post("api/v1/login", data);

      // handle success
      if (response.status === 200) {
        console.log(response.data);
        setErrorData(null);

        // store the tokens
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        await tokenStore(accessToken, refreshToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        if (error.response.status === 400) {
          setErrorData(error.response.data.message);
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

  // handle page change
  const handlePress = () => {
    navigation.navigate("CreateAccount"); //pass name of screen
  };

  //

  return (
    <ImageBackground style={Styles.container} source={background}>
      <View>
        <AuthLogo message="Welcome" />
        <Text style={Styles.errorData}>{errorData}</Text>
        {/* formik handles on change values for the form */}
        <Formik
          initialValues={{ emailOrUsername: "", password: "" }}
          validationSchema={loginSchema} //pass the yup validation schema
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            // resetForm(); //formik function to clear the form after successful submit
          }}
        >
          {(props) => (
            <View style={Styles.inputContainer}>
              {/* email input */}
              <TextInput
                style={Styles.input}
                placeholder="Email or Username"
                onChangeText={props.handleChange("emailOrUsername")}
                onBlur={props.handleBlur("emailOrUsername")} //when user moves from input
                value={props.values.emailOrUsername} //handled by formik
              />
              <Text style={Styles.errorMessage}>
                {props.touched.emailOrUsername && props.errors.emailOrUsername}
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

              <Button onPress={props.handleSubmit} title="submit" />
            </View>
          )}
        </Formik>

        <View>
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={Styles.forgot}
          >
            Forgot password?
          </Text>
        </View>

        <View style={Styles.link}>
          <Text style={Styles.linkText} onPress={handlePress}>
            Not a Member? Register Now
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
