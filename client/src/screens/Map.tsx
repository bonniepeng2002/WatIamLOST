import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import MapView from "react-native-maps";

interface MapProps {}

export const Map: React.FC<MapProps> = ({}) => {
  const [region, setRegion] = useState({
    latitude: 43.4723,
    longitude: -80.5449,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  type region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  const onRegionChange = (region: region) => {
    setRegion(region);
  };

  const [value, setValue] = useState("");
  const onChangeText = (s: string) => {
    setValue(s);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
      />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchText}
          placeholder={"Search"}
          placeholderTextColor={"#666"}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchBar: { position: "absolute", top: 10, width: "100%" },
  searchText: {
    borderRadius: 10,
    margin: 10,
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
