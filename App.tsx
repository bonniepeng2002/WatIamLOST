import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/login';
import SignupScreen from "./src/signup";



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown : false}}>
        <Stack.Screen name={"Login"} component={LoginScreen} options={{title: 'Login'}} />
        <Stack.Screen name={"Signup"} component={SignupScreen} options={{title: 'Signup'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;