import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

interface MapProps {}

export const Map: React.FC<MapProps> = ({}) => {
  const mapRef = useRef(null);
  type region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  type buildingRegion = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  const [region, setRegion] = useState({
    latitude: 43.4723,
    longitude: -80.5449,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [buildingRegion, setBuildingRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const onRegionChange = (region: region) => {
    setRegion(region);
  };

  const [buildingCode, setBuildingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const search = () => {
    const url = "http://localhost:3000/buildings/" + buildingCode;
    setLoading(true);
    axios.get(url).then(
      (response) => {
        const res = response.data;

        setRegion({
          longitude: res.longitude,
          latitude: res.latitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
        setBuildingRegion({
          longitude: res.longitude,
          latitude: res.latitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        console.log(err);
      }
    );
  };

  const onChangeText = (s: string) => {
    setBuildingCode(s.toUpperCase());
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
        ref={mapRef}
      >
        <Marker coordinate={buildingRegion} />
      </MapView>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchText}
          placeholder={"Search for a building"}
          placeholderTextColor={"#666"}
          value={buildingCode}
          onChangeText={onChangeText}
        />
        <Button title="search" onPress={() => search()} />
      </View>
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0275d8"
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loading: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 0,
  },
});
