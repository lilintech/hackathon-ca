// parent of all stack-navigations
// contanis: topics, report, news, about
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// import screens
import About from "../screens/About";
import Report from "../screens/Report";
import News from "../screens/News";
import Topics from "../screens/Topics";

const Drawer = createDrawerNavigator();

// drawer options
const myDrawer = () => {
  return (
    <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Topics" component={Topics} />
      <Drawer.Screen name="Report Incident" component={Report} />
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default myDrawer;