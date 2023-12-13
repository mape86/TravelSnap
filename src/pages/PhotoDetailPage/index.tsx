import { View, Text, Image, StyleSheet, ScrollView, Platform } from "react-native";
import React from "react";
import customMapStyles from "./../MapviewPage/styling.json";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import Navigator from "../../components/Navigator";
import Assets from "../../Assets";
import { ImageObject } from "../../hooks/useFeedImages";
import CommentSection from "../../components/CommentSection";
import { BackButton } from "../../components/BackButton";

interface PhotoDetailPageProps {
  location: string;
  image: ImageObject;
}

const PhotoDetailPage = (props: any) => {
  const image: ImageObject = props.route.params.image;

  return (
    <ScrollView className="bg-brandLight">
      <SafeAreaView>
        <BackButton />
        <View>
          <Image source={{ uri: image.uri }} className="w-full aspect-square mb-4" />
        </View>
        <View className="flex-1 px-4">
          <View className="mb-12">
            <Text className="text-lg font-bold mb-2">@{image.userName}</Text>
            <Text className="text-base text-gray-800 mb-4">{image.description}</Text>
            <Text className="text-gray-500">{image.tags}</Text>
          </View>
          <CommentSection uri={image.uri} />

          <View className="flex-1 w-full h-1/3">
            <MapView
              provider={Platform.OS === "ios" ? "google" : undefined}
              customMapStyle={customMapStyles}
            ></MapView>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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

export default PhotoDetailPage;
