import React from 'react'
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { markers } from '../data/data';
import { FontAwesome  } from '@expo/vector-icons';
import axios from 'axios'
import { Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Component } from 'react';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const baseurl = "http://10.0.0.48:3000/classes"
const ClassroomFinderScreen = () => {
  const buildings = markers;
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const [schedule, setSchedule] = useState([[]]);
  useEffect(() => {
    // const url = "http://localhost:3000/buildings";
    axios.get("http://10.0.0.48:3000/buildings")
      .then(response => {
        // console.log(response.data);
      })

      {buildings.map((building, index)=>{
        axios.get(baseurl + "/"+ building.buildingCode + "?day=M")
          .then(response => {
            // setSchedule(prev => {
            //   return [...prev.slice(0, index), response.data.classes]
            // })
            // console.log(response);
              // setSchedule(prev => {
              //   return [...prev.slice(0, index), response.data.classes]
              // })
              // console.log(response);
              // setSchedule(prev => {
              //   return [...prev.slice(0, index), response.data.classes]
              // })
              // console.log(response);
              schedule.push([response.data.classes]);
              // setSchedule(schedule.concat([response.data.classes]));
          })
      })}
      // console.log(schedule)
  }),[] 
    const [region, setRegion] = useState({
        latitude:  43.46855480212223,
        longitude: -80.5433383765342,
        latitudeDelta: 0.01900427879418487,
        longitudeDelta: 0.01209999761337599,
        });
    
    type region = {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
      };
    const onRegionChange = (region: region) =>  {
        // setRegion(region);
        // console.log(region)
    }
    
  return (
    <View style={styles.container}>
      <MapView
        ref={_map} 
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
      >
        {buildings.map((building, index)=>{

          return (
            <Marker key={index} coordinate={building.coordinate}>
              <Animated.View>
                <Animated.Image
                  source={require('../../assets/map_marker.png')}
                  style={[styles.marker]}
                ></Animated.Image>
              </Animated.View>
            </Marker>
          )
        })}

      </MapView>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        ref={_scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
      >
        {buildings.map((building, index) => {
          // console.log(schedule[0]? true: false);
           return (
           <ScrollView style={styles.card} key={index}>
            <Text>{building.buildingCode}</Text>
            {schedule[0].map((clas, index) => {
              return (
                <View key={index}>
                  <Text>{clas.classNumber}</Text>
                </View>
              )
            })}
          </ScrollView>)
        })}
      </Animated.ScrollView>
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
  markerWrap: { 
    alignItems: "center",
    justifyContent: "center",
    width:40,
    height:40,
  },
  marker: {
    width: 20,
    height: 20,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    // shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});

export default ClassroomFinderScreen;
