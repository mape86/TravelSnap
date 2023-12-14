import React from "react";
import { Platform, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import CustomMapStyle from "../pages/MapviewPage/styling.json";

interface MapProps {
  latitude: string;
  longitude: string;
}
// Created a custom map style using https://mapstyle.withgoogle.com/,
// which was then copied to ./styling.json and then set to the MapView component.
// The "provider" prop must be set to the value of the imported PROVIDER_GOOGLE variable if on iOS,
//as explained by the library docs: https://www.npmjs.com/package/react-native-maps
const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <View>
      <Text className="text-lg  mb-2">Location</Text>
      <View className="border-t">
        <MapView
          customMapStyle={CustomMapStyle}
          className="m-2 w-screen h-80"
          provider={Platform.OS === "ios" ? PROVIDER_GOOGLE : undefined}
          initialRegion={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.1022,
            longitudeDelta: 0.0521,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
          />
        </MapView>
      </View>
    </View>
  );
};

export { Map };
