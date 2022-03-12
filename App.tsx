import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import classroomFinderScreen from './src/screens/classroomFinder';
import Header from './shared/header';
const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  classroomFinderScreen: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName='classroomFinderScreen'
       screenOptions={{
        header: () => <Header />
      }}>
        <Stack.Screen 
          name = "classroomFinderScreen"
          component={classroomFinderScreen}/>
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
