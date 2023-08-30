import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { forgot, reportStyles } from "../../styles/Styles";
import { Field, Formik } from "formik";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { reportSchema } from "../../validation/authenticationSchema";
import Checkbox from "expo-checkbox";
import {
  ApplicationProvider,
  Icon,
  Select,
  SelectItem,
  Button,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import axios from "axios";
import { API_URL } from "../../services/api";

export default function Report() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCrimeId, setSelectedCrimeId] = useState(null);
  const [data, setData] = useState([]);
  const [errorData, setErrorData] = useState("");

  useEffect(() => {
    const get = async () => {
      const response = await axios.get(`${API_URL}/api/v1/get-categories`);

      console.log(response);
      setData(response.data);
    };
    get();
  }, []);

  // form submission
  const handleSubmit = async (values, { resetForm }) => {
    const report = {
      ...values,
      crime_id: selectedCrimeId,
    };

    try {
      const response = await axios.post(`${API_URL}/api/v1/report`, report);
      if (response && response.status === 200) {
        setErrorData(response.data.message);
        resetForm();
      } else {
        setErrorData(response.data.message);
      }
      setSelectedCrimeId(null);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setSelectedCrimeId(data[index.row].crime_id);
  };
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={reportStyles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={reportStyles.header}>
        <Text style={reportStyles.seen}>Seen a crime? Report Now!</Text>
        <Text style={reportStyles.errorData}>{errorData}</Text>
        <Formik
          initialValues={{
            email_address: "",
            phone_number: "",
            gender: "male",
            first_name: "",
            last_name: "",
            crime_description: "",
          }}
          validationSchema={reportSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View style={reportStyles.form}>
              <Text style={reportStyles.personal}>Personal Info</Text>
              <View>
                <View>
                  {/* <Icon name="people-outline" {...props} /> */}
                  <TextInput
                    style={reportStyles.commonInput}
                    placeholder="First Name"
                    value={props.values.first_name}
                    onChangeText={props.handleChange("first_name")}
                    onBlur={props.handleBlur("first_name")}
                  />
                  <Text style={reportStyles.errorMessage}>
                    {props.touched.first_name && props.errors.first_name}
                  </Text>
                </View>
                <TextInput
                  style={reportStyles.commonInput}
                  placeholder="Last Name"
                  value={props.values.last_name}
                  onChangeText={props.handleChange("last_name")}
                  onBlur={props.handleBlur("last_name")}
                />
                <Text style={reportStyles.errorMessage}>
                  {props.touched.last_name && props.errors.last_name}
                </Text>

                <Field name="gender">
                  {({ field }) => (
                    <>
                      <Text style={reportStyles.personal}>Gender</Text>
                      <View style={reportStyles.checkbox}>
                        <View style={reportStyles.genderBox}>
                          <Checkbox
                            value={field.value === "male"}
                            onValueChange={() =>
                              field.onChange("gender")("male")
                            }
                            color="#4630EB"
                          />
                          <Text>Male</Text>
                        </View>

                        <View style={reportStyles.genderBox}>
                          <Checkbox
                            value={field.value === "female"}
                            onValueChange={() =>
                              field.onChange("gender")("female")
                            }
                          />
                          <Text>Female</Text>
                        </View>
                      </View>
                    </>
                  )}
                </Field>
                <View>
                  <Text style={reportStyles.personal}>Contact</Text>
                  <TextInput
                    style={reportStyles.commonInput}
                    placeholder="Email address"
                    value={props.values.email_address}
                    onChangeText={props.handleChange("email_address")}
                    onBlur={props.handleBlur("email_address")}
                    keyboardType="email-address"
                  />
                  <Text style={reportStyles.errorMessage}>
                    {props.touched.email_address && props.errors.email_address}
                  </Text>
                  <TextInput
                    style={reportStyles.commonInput}
                    placeholder="Phone number"
                    value={props.values.phone_number}
                    onChangeText={props.handleChange("phone_number")}
                    onBlur={props.handleBlur("phone_number")}
                    keyboardType="phone-pad"
                  />
                  <Text style={reportStyles.errorMessage}>
                    {props.touched.phone_number && props.errors.phone_number}
                  </Text>
                </View>

                <Select
                  selectedIndex={selectedIndex}
                  onSelect={handleSelect}
                  value={
                    selectedIndex !== null
                      ? data[selectedIndex.row].crime_type
                      : "Select a Category"
                  }
                >
                  {data.map((item, index) => (
                    <SelectItem key={item.crime_id} title={item.crime_type} />
                  ))}
                </Select>

                <View>
                  <Text style={reportStyles.personal}>
                    Incident Report Description
                  </Text>

                  <Text style={reportStyles.errorMessage}>
                    {props.touched.crime_description &&
                      props.errors.crime_description}
                  </Text>
                  <ScrollView
                    style={reportStyles.TextInputCont}
                    contentContainerStyle={reportStyles.TextInputContent}
                    keyboardShouldPersistTaps="handled"
                  >
                    <TextInput
                      style={reportStyles.incidentDesc}
                      placeholder="Describe what happened"
                      value={props.values.crime_description}
                      multiline
                      numberOfLines={10}
                      onChangeText={props.handleChange("crime_description")}
                      onBlur={props.handleBlur("crime_description")}
                    />
                  </ScrollView>
                </View>

                <Button onPress={props.handleSubmit}>Submit Report</Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
