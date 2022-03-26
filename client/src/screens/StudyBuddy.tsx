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
  useEffect(() => {
    console.log(route.params.params.userId);
  })
  //const {userId} = userInfo;
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
      bName: item.title.toUpperCase()
    });
  };

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#eaeaea',
    //style: isPress ? styles.btnPress : styles.btnNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <Text>Buildings</Text>
      <FlatList
        style={styles.list}
        data={dataSource}
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

export default StudyBuddyScreen;