import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// stacks
import TopicStack from "./TopicStack";
import Report from "../screens/Report";
import News from "../screens/News";

// create the drawer
const Drawer = createDrawerNavigator();
// drawer navigation options
const RootDrawerNavigator = () => {
  return (
   
      <Drawer.Navigator>
        <Drawer.Screen  name="Topics" component={TopicStack} />
        <Drawer.Screen name="News" component={News} />
        <Drawer.Screen name="Report Incident" component={Report} />
      </Drawer.Navigator>
   
  );
};

export default RootDrawerNavigator;