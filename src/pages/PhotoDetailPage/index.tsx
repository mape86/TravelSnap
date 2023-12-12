import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import Navigator from "../../components/Navigator";
import Assets from "../../Assets";
import { ImageObject } from "../../hooks/useFeedImages";
import CommentSection from "../../components/CommentSection";

interface PhotoDetailPageProps {
  location: string;
  image: ImageObject;
}

const PhotoDetailPage = (props: any) => {
  const image: ImageObject = props.route.params.image;

  return (
    <ScrollView className="bg-brandLight">
      <Image source={{ uri: image.uri }} className="w-full aspect-square" />
      <SafeAreaView className="flex-1 px-4">
        <View className="mb-12">
          <Text className="text-lg font-bold mb-2">@{image.userName}</Text>
          <Text className="text-base text-gray-800 mb-4">{image.description}</Text>
          <Text className="text-gray-500">{image.tags}</Text>
        </View>
        <CommentSection uri={image.uri} />
        {/* Use react-native-maps */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default PhotoDetailPage;
