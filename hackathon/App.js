import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./src/navigation/AuthStack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./src/styles/custom-theme.json";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TopicsStack from "./src/navigation/TopicStack";
import News from "./src/components/screens/News";
import Report from "./src/components/screens/Report";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check if user is authenticated

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Drawer.Navigator>
            <Drawer.Screen name="Topics" component={TopicsStack} />
            <Drawer.Screen name="News" component={News} />
            <Drawer.Screen name="Report Incident" component={Report} />
          </Drawer.Navigator>
        ) : (
          <AuthStackNavigator setIsAuthenticated={setIsAuthenticated} />
        )}
      </NavigationContainer>
    </ApplicationProvider>
  );
}
