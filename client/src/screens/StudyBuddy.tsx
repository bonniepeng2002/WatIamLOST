import * as React from 'react'
import {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import axios from "axios";



const StudyBuddyScreen = ({ route, navigation }: {route:any, navigation: any}) => {
  let listViewRef;
  const [userName,setUserName] = useState("");
  const [currentBuidling,setCurrentBuilding] = useState("");
  const [currentRoom,setCurrentRoom] = useState("");
  useEffect(() => {
    // console.log(route.params.params.userId);
    axios({
      url: "http://localhost:3000/api/user/findUser",
      method: "GET",
      params: {
        id: route.params.params.userId
      }
    }).then((response:any) => {
      // console.log(response.data.name);
      setUserName(response.data.name);
      if (response.data.hasRoom) {
        setCurrentRoom(response.data.roomNumber);
        setCurrentBuilding(response.data.building);
        setHasBooking(true);
      }
      else {
        setHasBooking(false);
      }
    }).catch((error:any) => {
      console.log("Some internal error getting the name");
    })
  })
  const [hasBooking, setHasBooking] = useState(false);
  const [isPress, setIsPress] = React.useState(false);
  const [dataSource, setDataSource] = useState([
    { id: 1, title: 'EXP' },
    { id: 2, title: 'AL' },
    { id: 3, title: 'B1' },
    { id: 5, title: 'EIT' },
    { id: 6, title: 'DWE' },
    { id: 7, title: 'E2' },
    { id: 8, title: 'EV1' },
    { id: 9, title: 'EV2' },
    { id: 10, title: 'EV3' },
    { id: 11, title: 'HH' },
    { id: 12, title: 'RCH' },
    { id: 13, title: 'MC' },
    { id: 14, title: 'M3' },
    { id: 15, title: 'QNC' },
    { id: 16, title: 'ML' },
    { id: 17, title: 'OPT' },
    { id: 18, title: 'PHY' },
    { id: 19, title: 'PAS' },
    { id: 20, title: 'STC' },
    { id: 21, title: 'STP' },
    { id: 22, title: 'DC' }
  ]);




  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableHighlight {...touchProps} onPress={() => getItem(item)}>
      <Text style={styles.itemStyle} >
        {item.id}
        {'. '}
        {item.title.toUpperCase()}
      </Text>
      </TouchableHighlight>

    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate("StudyBuddyList",{
      bName: item.title.toUpperCase(),
      userId : route.params.params.userId,
      userName : route.params.params.name
    });
  };

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#eaeaea',
    //style: isPress ? styles.btnPress : styles.btnNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true)
  };

  const removeSession = (() => {
    axios({
      url: "http://localhost:3000/api/study/removeStudySession",
      method: "POST",
      data: {
        building: currentBuidling,
        room: currentRoom
      }
    }).then((response:any) => {
      // console.log("Successfully deleted building from building database")
      axios({
        url:  "http://localhost:3000/api/user/removeUserRoom",
        method: "POST",
        data: {
          id: route.params.params.userId
        }
      }).then((response:any) => {
        // console.log(response);
        // console.log("we should be here");
        setHasBooking(false);
      }).catch((error:any) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
    }).catch((error:any) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    })
  })


  if (!hasBooking) {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Text>Open up App.tsx to start working on your app!</Text> */}
        <Text style={styles.titleText}>Buildings</Text>
        <FlatList
          style={styles.list}
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          ref={(ref) => {
            listViewRef = ref;
          }}
        />
      </SafeAreaView>

    );
  }
  else {
    return (
      <SafeAreaView style={styles.containerTrue}>
        {/* <Text>Open up App.tsx to start working on your app!</Text> */}
        <Text>You're hosting a study room at {currentBuidling} {currentRoom}! Click below to end your session :(</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => removeSession()}>
          <Text style={styles.buttonText}>End session</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  containerTrue: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    //flexDirection: "row"
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
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
  titleText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 24
  },

  itemStyle: {
    padding: 25,
    fontSize: 20,
  },
});

export default StudyBuddyScreen;