import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ClassroomFinderScreen from "./src/screens/classroomFinder";
import Header from "./shared/header";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Map } from "./src/screens/Map";
import LoginScreen from "./src/screens/login";
import SignupScreen from "./src/screens/signup";
import StudyBuddyScreen from "./src/screens/StudyBuddy";
import * as React from "react";
import StudyBuddyList from "./src/screens/StudyBuddyList";
import {useEffect} from "react";
const Stack = createStackNavigator();

type RootStackParamList = {
  classroomFinderScreen: undefined;
};

const Tab = createBottomTabNavigator();

function Classroom(props) {
  //const {userId} = userInfo.params;

  // useEffect(() => {
  //   console.log(JSON.stringify(props.route.params));
  // })
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = "bookmark";
          } else if (route.name === "Settings") {
            iconName = "ios-list";
          } else if (route.name === "Map") {
            iconName = "map"
          } else if (route.name == "Study Buddy!") {
            iconName = "people"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color="#037A87" />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={ClassroomFinderScreen} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Study Buddy!" component={StudyBuddyScreen} initialParams={props.route.params}/>



    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="classroomFinderScreen" component={Classroom} />
        <Stack.Screen name={"Login"} component={LoginScreen} options={{title: 'Login', headerShown:false}} />
        <Stack.Screen name={"Signup"} component={SignupScreen} options={{title: 'Signup', headerShown: false}} />
        <Stack.Screen name={"StudyBuddyList"} component={StudyBuddyList} />

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
