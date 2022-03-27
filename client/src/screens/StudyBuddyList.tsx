import * as React from 'react'
import { useEffect, useState } from 'react';
import Dialog from 'react-native-dialog';
import {
  Alert,
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
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";



const StudyBuddyList = ({route, navigation}) => {
  let listViewRef;
  const {bName, userId} = route.params;
  const [isPress, setIsPress] = React.useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [userName,setUserName] = useState("");

  useEffect(() => {
    console.log(userId);
    console.log("st")
    axios({
      url: "http://localhost:3000/api/study/allCurrentSessions",
      method: "GET",
      params: {
        building: bName
      }
    }).then((response:any) => {
      // console.log(response.data);
      // for (let i = 0; i < response.data.length; i++) {
      //   console.log(response.data[i].name);
      //   console.log(response.data[i].room);
      // }
      // console.log("Success");
      setdataSrc(response.data);
    }).catch((error:any)=> {
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

    axios({
      url: "http://localhost:3000/api/user/findUser",
      method: "GET",
      params: {
        id: userId
      }
    }).then((response:any) => {
      console.log(response.data.name);
      setUserName(response.data.name);
    }).catch((error:any) => {
      console.log("Some internal error getting the name");
    })


  }, [])

  const addSession = ((room:string) => {
    axios({
      url: "http://localhost:3000/api/study/addStudySession",
      method: "POST",
      data: {
        name: userName,
        building: bName,
        room: room
      }
    }).then((response:any) => {
      console.log("Successful building registration")
      axios({
        url:  "http://localhost:3000/api/user/addUserRoom",
        method: "POST",
        data: {
          id: userId,
          building: bName,
          roomNum: room,
        }
      }).then((response:any) => {
        console.log(response);
        navigation.navigate("classroomFinderScreen",{
          screen: 'Home'
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
      // Alert.alert(
      //   "Booking Failed",
      //   "That room is already taken!",
      //   [
      //     {
      //       text: "Retry",
      //       onPress: () => {
      //       }
      //     }
      //   ]
      // )
    })
  })

  const [dataSrc, setdataSrc] = useState([]);

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableHighlight {...touchProps}>
        <Text style={styles.itemStyle} >
          {item.name}
          {' - '}
          {item.room}
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



  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#eaeaea',
    //style: isPress ? styles.btnPress : styles.btnNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true)
  };

  const [dialog, setDialog] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <Text>{bName}</Text>
      <TouchableOpacity onPress={() => {setDialog(true)}}>
        <AntDesign name="pluscircle" size={24} color="#037a87" />
      </TouchableOpacity>
      <Dialog.Container visible={dialog}>
        <Dialog.Title>Add Study Session in {bName}</Dialog.Title>
        <Dialog.Description>
          Enter your room info below:
        </Dialog.Description>
        <Dialog.Input
          placeholder={'Room Number'}
          onChangeText={(rm) => setRoomNumber((rm))}>

        </Dialog.Input>
        <Dialog.Button label={"Cancel"} onPress={() => {setDialog(false);}}></Dialog.Button>
        <Dialog.Button label={"Start"} onPress={() => {addSession(roomNumber);setDialog(false);}}></Dialog.Button>

      </Dialog.Container>

      <FlatList
        style={styles.list}
        data={dataSrc}
        keyExtractor={(item,index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ref={(ref) => {
          listViewRef = ref;
        }}
      />



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
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


  itemStyle: {
    padding: 25,
    fontSize: 20,
  },
});

export default StudyBuddyList;