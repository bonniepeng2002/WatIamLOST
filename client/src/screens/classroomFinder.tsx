import * as React from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { markers } from '../data/data';
import { FontAwesome  } from '@expo/vector-icons';

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
    const buildings = markers;
    const _map = React.useRef(null);
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <MapView
        ref={_map}
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
      >
        {buildings.map((building, index)=>{
          return (
            <Marker key={index} coordinate={building.coordinate}>
              <FontAwesome name="map-marker" size={26} color="red" />
            </Marker>
          )
        })}

      </MapView>

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
    height: Dimensions.get('window').height,
  },
});

export default ClassroomFinderScreen;