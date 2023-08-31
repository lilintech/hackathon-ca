import { View, Text } from "react-native";
import React, { useState } from "react";
import { forgot } from "../../styles/Styles";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { postForgot } from "../../services/helpers/helperFunctions";
import { forgotSchema } from "../../validation/authenticationSchema";
import { Button } from "@ui-kitten/components";
import { API_URL, post } from "../../services/api";
import axios from "axios";

const ForgotScreen = () => {
  const [errorMesssage, setError] = useState("");
  const handleSubmit = async (values) => {
    const data = {
        email: values.email_address,
    }
    
    try {
      const response = await axios.post(`${API_URL}/api/v1/forgot`, data);
      if (response && response.status === 200) {
        setError(response.data.message);
        console.log(response.data.message);
        // resetForm();
      }
      //   console.log(response.data);
    } catch (error) {
        // console.log(error);
        setError("An error occured when connecting to our servers. Please try again later")
      if (error.response) {
        console.log(error.response.data);
        if (error.response.status === 400) {
          setError(error.response.data);
          // console.log(errorMesssage);
        }
        if (error.response.status === 500) {
            setError(error.response.data.message);
            // console.log(errorMesssage);
          }
        
      }
    }
  };
  return (
    <View style={forgot.container}>
      <View>
        <Text style={forgot.heading}>
          Forgot your Password? Enter Email to Recover
        </Text>
      </View>
      <View style={forgot.form}>
        <Formik
          initialValues={{ email_address: "" }}
          validationSchema={forgotSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <>
              <Text style={{color: "red", fontSize: 15}}>{errorMesssage}</Text>
              <TextInput
                style={forgot.input}
                placeholder="Email Address"
                value={props.values.email_address}
                onChangeText={props.handleChange("email_address")}
                onBlur={props.handleBlur("email_address")}
                keyboardType="email-address"
              />
              <Text style={forgot.form_error}>
                {props.touched.email_address && props.errors.email_address}
              </Text>
              <View style={forgot.button}>
                <Button onPress={props.handleSubmit}>Submit</Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ForgotScreen;
