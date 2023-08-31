import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// stacks
import LoginScreen from "../components/screens/LoginScreen";
import CreateAccScreen from "../components/screens/CreateAccScreen";
import ForgotScreen from "../components/screens/ForgotScreen";

const AuthStack = createStackNavigator();

const AuthStackNavigator = ({ setIsAuthenticated }) => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ setIsAuthenticated }}
      />
      <AuthStack.Screen name="CreateAccount" component={CreateAccScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotScreen} />
    </AuthStack.Navigator>
  );
};
export default AuthStackNavigator;
