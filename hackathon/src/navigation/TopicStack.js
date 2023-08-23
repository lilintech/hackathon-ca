import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Topics from "../components/screens/Topics"
const Stack = createStackNavigator();

// news navigator
const TopicsStack = () => {
  return (
  
      <Stack.Navigator screenOptions={{
        headerShown : true,
      }} >
        <Stack.Screen name="TopicsStack" component={Topics} />
      </Stack.Navigator>
    
  );
};

export default TopicsStack;
