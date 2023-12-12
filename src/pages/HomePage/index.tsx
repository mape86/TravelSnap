import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import CamerPage from "../CameraPage";
import FeedImageCard from "../../components/FeedImageCard";
import { feedImages } from "../../components/constants";
import Assets from "../../Assets";
import { fbStorage, getAllFeedImagesFromFirebase } from "../../../firebaseConfig";
import { getMetadata, ref } from "firebase/storage";
import { useFeedImages } from "../../hooks/useFeedImages";

const HomePage = () => {
  const { navigate } = useCustomNavigation();

  const { imageObjects, isError } = useFeedImages();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text className="font-bold text-3xl text-system-brandDark">Home</Text>
        </View>
        <View>
          {isError ? (
            <Text>Something went wrong fetching the feed</Text>
          ) : (
            imageObjects.map((image) => {
              return <FeedImageCard key={image.uri} image={image} />;
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
