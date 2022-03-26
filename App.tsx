import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './client/src/screens/login';
import SignupScreen from "./client/src/screens/signup";
import { StatusBar } from 'expo-status-bar';

import ClassroomFinderScreen from './client/src/screens/classroomFinder';
import Header from './client/shared/header';
import { Ionicons  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
          let iconName:any;

          if (route.name === 'Home') {
            iconName = 'bookmark'
          } else if (route.name === 'Settings') {
            iconName = 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color="#037A87" />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={ClassroomFinderScreen} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ header: () => <Header /> }}>
        <Stack.Screen name = "classroomFinderScreen" component={Classroom}/>
        <Stack.Screen name={"Login"} component={LoginScreen} options={{title: 'Login', headerShown:false}} />
        <Stack.Screen name={"Signup"} component={SignupScreen} options={{title: 'Signup', headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});