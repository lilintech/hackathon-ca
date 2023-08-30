import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// stacks
import LoginScreen from "../components/screens/LoginScreen";
import CreateAccScreen from "../components/screens/CreateAccScreen";
import ForgotScreen from "../components/screens/ForgotScreen";

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login" >
      <AuthStack.Screen name="CreateAccount" component={CreateAccScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotScreen} />
    </AuthStack.Navigator>
  );
};
export default AuthStackNavigator;
