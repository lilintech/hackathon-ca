import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Topics from "../components/screens/Topics";
import TopicDetails from "../components/screens/TopicDetails";
const Stack = createStackNavigator();

// news navigator
const TopicsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TopicsStack" component={Topics} />
      <Stack.Screen name="TopicDetail" component={TopicDetails} />
    </Stack.Navigator>
  );
};

export default TopicsStack;
