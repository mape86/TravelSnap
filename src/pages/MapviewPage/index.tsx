import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, View, Platform, StyleSheet, Image } from "react-native";
import customMapStyles from "./styling.json";
import ImageModal from "../../components/ImageModalMap";
import Assets from "../../Assets";

const markersData = [
  {
    id: 1,
    coordinate: { latitude: 44.1461, longitude: 9.6439 },
    imageUrl: Assets.travelImages.CinqueTerre,
    locationTitle: "Cinque Terre",
  },
  {
    id: 2,
    coordinate: { latitude: 68.166672, longitude: 13.75 },
    imageUrl: Assets.travelImages.Lofoten,
    locationTitle: "Lofoten",
  },
  {
    id: 3,
    coordinate: { latitude: 48.8566, longitude: 2.3522 },
    imageUrl: Assets.travelImages.Paris,
    locationTitle: "Paris",
  },
  {
    id: 4,
    coordinate: { latitude: 38.73946, longitude: -9.142685 },
    imageUrl: Assets.travelImages.Portugal,
    locationTitle: "Lisbon",
  },
  {
    id: 5,
    coordinate: { latitude: 50.073658, longitude: 14.41854 },
    imageUrl: Assets.travelImages.Prague,
    locationTitle: "Prague",
  },
  {
    id: 6,
    coordinate: { latitude: 41.9028, longitude: 12.4964 },
    imageUrl: Assets.travelImages.Rome,
    locationTitle: "Rome",
  },
  {
    id: 7,
    coordinate: { latitude: 60.124167, longitude: 6.74 },
    imageUrl: Assets.travelImages.Trolltunga,
    locationTitle: "Trolltunga",
  },
];

const MapviewPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleMarkerPress = (imageUrl: any, locationTitle: string) => {
    setSelectedImage(imageUrl);
    setSelectedTitle(locationTitle);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedTitle(null);
  };

  return (
    <View className="flex-1">
      <MapView
        style={styles.map}
        provider={Platform.OS === "ios" ? "google" : undefined}
        customMapStyle={customMapStyles}
      >
        {markersData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker.imageUrl, marker.locationTitle)}
          >
            <Image source={marker.imageUrl} style={styles.markerIcon} />
          </Marker>
        ))}
      </MapView>

      <View className="absolute top-20 left-5">
        <Text className="text-3xl font-bold">Travel Memoir</Text>
      </View>

      <ImageModal
        imageUrl={selectedImage}
        onClose={handleCloseModal}
        locationTitle={selectedTitle || ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerIcon: {
    width: 50,
    height: 75,
    resizeMode: "cover",
    borderRadius: 8,
  },
});

export default MapviewPage;
