import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/navigation/RootDrawerNavigator";
import AuthStackNavigator from "./src/navigation/AuthStack";

export default function App() {
  // check if user is authenticated

  // const [isAuthenticated, setIsAuthenticated] = React.useState(false)

return (
    <NavigationContainer>
      <AuthStackNavigator/>
    {/* {isAuthenticated ?  <Navigator /> : <AuthStackNavigator/> } */}
     
    </NavigationContainer>
  );
}
