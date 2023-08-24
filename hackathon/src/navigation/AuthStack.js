import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// stacks
import LoginScreen from "../components/screens/LoginScreen";
import CreateAccScreen from "../components/screens/CreateAccScreen";


const AuthStack = createStackNavigator();

const AuthStackNavigator = () =>{
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen}  />
            <AuthStack.Screen  name="CreateAccount" component={CreateAccScreen} />
            

        </AuthStack.Navigator>
    )
}
export default AuthStackNavigator;