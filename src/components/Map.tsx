import React from "react";
import { Platform, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomMapStyle from "../pages/MapviewPage/styling.json";

interface MapProps {
  latitude: string;
  longitude: string;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <View>
      <Text className="text-2xl bold text-black mb-2">Location</Text>
      <View className="border-t-[1px] border-solid border-black">
        <MapView
          customMapStyle={CustomMapStyle}
          className="rounded-xl m-2 w-screen h-80"
          provider={Platform.OS === "ios" ? "google" : undefined}
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
