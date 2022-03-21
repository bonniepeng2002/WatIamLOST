import React from "react";
import { StatusBar } from 'expo-status-bar';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import { NavigationContainer} from "@react-navigation/native";
import {createReactNativeMatcher} from "@expo/metro-config/build/transformer/createMatcher";


const axios = require('axios');



export default function LoginScreen({ navigation }: {navigation: any}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginFailAlert = (err:any) => Alert.alert(
    "Login Failed",
    err.response.data,
    [
      {
        text: "Ok",
        onPress: () => {
        }
      }
    ]
  )
  const loginAuth = (uName : string, pWord: string) => {
    axios({
      url: "http://localhost:3000/api/user/login",
      method: "POST",
      data: {
        email: uName,
        password: pWord
      }
    }).then((response:string) => {
      // console.log(response);
      console.log("successful auth");
      navigation.push('classroomFinderScreen');
    }).catch((error:any) => {
      loginFailAlert(error);
      if (error.response) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      }
      else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    })
  }
  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.headingText}>
        WATIAMLost
      </Text>
      <Text style={[styles.headingText, styles.subHeadingText]}>
        Login
      </Text>
      <View style={styles.inputView}>

        <TextInput
          placeholder={'Email'}
          placeholderTextColor={"#ffffff80"}
          onChangeText={(email) => setEmail(email)}
          style={styles.formText}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
        <TextInput
          placeholder={'Password'}
          placeholderTextColor={"#ffffff80"}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={styles.formText}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.buttonText}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => loginAuth(email, password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#037a87',
    alignItems: "center",
    justifyContent: 'center',
    color: "#ffffff",


  },
  headingText: {
    fontSize: 48,
    marginBottom: 20,
    color: "#ffffff",
  },
  subHeadingText: {
    fontSize: 30,
  },
  inputView: {
    width: "80%",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#033f63",
  },
  buttonText: {
    color: "#ffffff",
  },
  formText: {
    color: "#ffffff",

    paddingBottom: 5,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1.5,
    marginBottom: 20,
  }
});
