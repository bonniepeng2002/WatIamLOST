import React from 'react'
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { DataTable } from 'react-native-paper';
import { FontAwesome  } from '@expo/vector-icons';
import axios from 'axios'
import { Animated } from 'react-native';
import { ScrollView, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.95;
const baseurl = "http://localhost:3000/classes"
const ClassroomFinderScreen = () => {
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const [buildings, setBuildings] = useState([]);
  const [current, setCurrent] = useState({buildingCode: "MC", longitude: -80.5441279, latitude: 43.4721377});
  const [schedule, setSchedule] = useState({});
  const [classroom, setClassroom] = useState([]);

  const getToday = () => {
    let today = new Date();
    let dates = ["M", "T", "W", "Th", "F", "S", "Su"];
    return dates[today.getDay() - 1];
  }

  useEffect(() => {
    axios.get("http://localhost:3000/buildings")
      .then(response => {
        setBuildings(response.data.buildings);
      })
  },[]) 

  useEffect(() => {
    axios.get("http://localhost:3000/classes/" + current.buildingCode + "/free?day=" + getToday())
      .then(response => {
        setSchedule(response.data.result);
        setClassroom(Object.keys(response.data.result));
      })
  },[current]) 

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

  const onMarkerPress = (index) => {
    setCurrent({buildingCode : buildings[index].buildingCode, longitude: buildings[index].longitude, latitude: buildings[index].latitude})
  }

  const getFreeTime = (arr) => {
    let result = "";
    if (!arr) {
      return result;
    }
    arr.map((time, index) => {
      result += time.startTime.hours + ":" + getMinutes(time.startTime.mins) + "~";
      result += time.endTime.hours + ":" + getMinutes(time.endTime.mins);
      if (index != arr.length - 1) {
        result += ", "
      }
    })
    return result;
  }

  const getMinutes = (num) => {
    if (num < 10) {
      return "0" + num;
    }
    else return num;
  }
    
  return (
    <View style={styles.container}>
      <MapView
        ref={_map} 
        style={styles.map}
        initialRegion={region}
      >
        {buildings.map((building, index)=>{
          if (building && building.longitude && building.latitude) {
            return (
              <Marker key={index} coordinate={{latitude: building.latitude, longitude: building.longitude}} onPress={() => onMarkerPress(index)}>
                <Animated.View>
                  <Animated.Image
                    source={require('../../assets/map_marker.png')}
                    style={[styles.marker]}
                  ></Animated.Image>
                </Animated.View>
              </Marker>
            )
          }
        })}

      </MapView>
      {schedule != [] && <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        ref={_scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
      >
        <ScrollView style={styles.card} >
          <Text style={styles.head}>{current.buildingCode}</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Classroom</DataTable.Title>
              <DataTable.Title>Free Times</DataTable.Title>
            </DataTable.Header>
            {classroom.map((key, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{key}</DataTable.Cell>
                  <View style={styles.time}><Text>{getFreeTime(schedule[key])}</Text></View>
                </DataTable.Row>
              )
            })}

            </DataTable>
        </ScrollView>
        
      </Animated.ScrollView>}
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
  head: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  time: {
    width: CARD_WIDTH * 0.7,
    textAlign: "center"
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
