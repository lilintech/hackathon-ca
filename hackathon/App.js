import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/navigation/RootDrawerNavigator";
import AuthStackNavigator from "./src/navigation/AuthStack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./src/styles/custom-theme.json";

export default function App() {
  // check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  // setIsAuthenticated(true)

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NavigationContainer>
      <AuthStackNavigator/>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

// {isAuthenticated ? (
//   <Navigator />
// ) : (
//   <AuthStackNavigator/>
// )}