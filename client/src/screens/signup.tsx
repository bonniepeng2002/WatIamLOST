import React from "react";
import { StatusBar } from 'expo-status-bar';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import axios from "axios";

export default function SignupScreen({ navigation }: {navigation: any}) {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const singupFailAlert = (err:any) => Alert.alert(
    "Signup Failed",
    err.response.data,
    [
      {
        text: "Login instead",
        onPress: () => {
          navigation.navigate('Login');
        }
      },
      {
        text: "Retry",
        onPress: () => {
        }
      }
    ]
  )
  const signupPassAlert = () => Alert.alert(
    "Account created!",
    "Go to the login screen to get started",
    [
      {
        text: "Login",
        onPress: () => {
          navigation.navigate('Login');
        }
      },

    ]
  )
  const signupAuth = (uName : string, uEmail: string, pWord: string) => {
    axios({
      url: "http://localhost:3000/api/user/register",
      method: "POST",
      data: {
        name: uName,
        email: uEmail,
        password: pWord
      }
    }).then((response:any) => {
      // console.log(response);
      signupPassAlert();
      console.log("successful signup");
    }).catch((error:any) => {
      singupFailAlert(error);
      if (error.response) {
        // console.log(error.response.data);
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
        Create a new account
      </Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder={'Name'}
          placeholderTextColor={"#ffffff80"}
          onChangeText={(name) => setName(name)}
          style={styles.formText}
          autoCapitalize={"words"}
        />
        <TextInput
          placeholder={'UWaterloo Email'}
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
      <TouchableOpacity style={styles.loginBtn} onPress={() => signupAuth(name, email, password)}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Already have an account? Log in!</Text>
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