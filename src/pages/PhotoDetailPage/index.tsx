import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import Navigator from "../../components/Navigator";
import Assets from "../../Assets";

interface PhotoDetailPageProps {
  location: string;
  feedImage: any;
  id: string;
}

const PhotoDetailPage = (props: any) => {
  const { navigate } = useCustomNavigation();

  return (
    <ScrollView className="bg-brandLight ">
      <Image source={props.route.params.feedImage} className="w-full h-96" />
      <SafeAreaView className="flex-1">
        <TouchableOpacity onPress={() => navigate("ProfilePage")}>
          <View className="flex-row items-center">
            <Image
              className="rounded-lg m-3"
              style={{ width: 60, height: 75 }}
              source={Assets.images.ProfileImage}
            />
            <Text className=" text-lg font-bold">@susanna.winther</Text>
          </View>
        </TouchableOpacity>
        <View className="p-4">
          <Text className="text-xl font-bold">Location</Text>
          <Text className="text-base text-gray-800">
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
          </Text>
          <Text className="mt-1 text-gray-500">#Dolor #Sit #Amet</Text>
        </View>

        {/* Use react-native-maps */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default PhotoDetailPage;
