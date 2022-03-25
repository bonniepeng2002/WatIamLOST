import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ClassroomFinderScreen from "./src/screens/classroomFinder";
import Header from "./shared/header";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Map } from "./src/screens/Map";
const Stack = createStackNavigator();

type RootStackParamList = {
  classroomFinderScreen: undefined;
};

const Tab = createBottomTabNavigator();

function Classroom() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "ClassroomFinder") {
            iconName = "bookmark";
          } else if (route.name === "Settings") {
            iconName = "ios-list";
          } else if (route.name === "Map") {
            iconName = "map"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color="#037A87" />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="ClassroomFinder" component={ClassroomFinderScreen} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="classroomFinderScreen"
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="classroomFinderScreen" component={Classroom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
