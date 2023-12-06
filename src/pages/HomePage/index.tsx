import { View, Text } from "react-native";
import React from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import CamerPage from "../CameraPage";
import FeedImageCard from "../../components/FeedImageCard";
import { feedImages } from "../../components/constants";
import Assets from "../../Assets";

const HomePage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text className="font-bold text-3xl text-black-600">Home</Text>
          <TouchableOpacity>
            <Text>0</Text>
          </TouchableOpacity>
        </View>

        <View>
          <FeedImageCard
            location="Bali, Indonesia"
            feedImage={Assets.images.Image1}
            id="2"
          />
          <FeedImageCard
            location="Bali, Indonesia"
            feedImage={Assets.images.Image2}
            id="1"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
