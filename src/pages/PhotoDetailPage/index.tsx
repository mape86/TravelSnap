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
  const { navigate } = useCustomNavigation();
  const image: ImageObject = props.route.params.image;

  return (
    <ScrollView className="bg-brandLight ">
      <Image source={{ uri: image.uri }} className="w-full h-96" />
      <SafeAreaView className="flex-1">
        <TouchableOpacity onPress={() => navigate("ProfilePage")}>
          <View className="flex-row items-center">
            <Text className="p-2  text-lg font-bold">@{image.userName}</Text>
          </View>
        </TouchableOpacity>
        <View className="p-4">
          <Text className="text-base text-gray-800">{image.description}</Text>
          <Text className="mt-1 text-gray-500">{image.tags}</Text>
        </View>
        <CommentSection uri={image.uri} />
        {/* Use react-native-maps */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default PhotoDetailPage;
