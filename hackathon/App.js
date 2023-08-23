import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./routes/RootDrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
