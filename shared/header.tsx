import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>WATIAMLost</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    header: {
      width: '100%',
      backgroundColor: '#037A87',
      alignItems: 'center',
      justifyContent: 'center',
      height: 90,
      paddingTop: 40
    },
    text: {
        color: 'white',
        fontSize: 36
    }
  });

export default Header;