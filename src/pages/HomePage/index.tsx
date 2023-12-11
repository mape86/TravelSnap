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

interface ImageObject {
  uri: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  tags?: string;
  userName?: string;
}

const HomePage = () => {
  const { navigate } = useCustomNavigation();

  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);

  useEffect(() => {
    fillImageObjects();
  }, []);

  const fillImageObjects = async () => {
    const photoUrls = await getAllFeedImagesFromFirebase();

    const metadataPromises = photoUrls.map((url, i) => {
      const imageRef = ref(fbStorage, url);
      return getMetadata(imageRef).then((metadata) => {
        const latitude = metadata.customMetadata?.latitude;
        const longitude = metadata.customMetadata?.longitude;
        const description = metadata.customMetadata?.description || "";
        const tags = metadata.customMetadata?.tags || "";
        const userName = metadata.customMetadata?.userName || "";
        return {
          uri: url,
          latitude: latitude,
          longitude: longitude,
          description: description,
          tags: tags,
          userName: userName,
        };
      });
    });

    const imageObject = await Promise.all(metadataPromises);
    setImageObjects(imageObject);
  };

  const refreshList = () => {
    fillImageObjects();
  };

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text className="font-bold text-3xl text-system-brandDark">Home</Text>
        </View>

        <View>
          {imageObjects.map((image) => {
            return <FeedImageCard image={image} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
