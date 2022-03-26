import * as React from 'react'
import {useEffect, useState} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';



const ClassroomFinderScreen = () => {

    const [region, setRegion] = useState({
        latitude: 43.4723,
        longitude: -80.5449,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        });
    
    type region = {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
      };
    const onRegionChange = (region: region) =>  {
        setRegion(region);
    }
    
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
});

export default ClassroomFinderScreen;