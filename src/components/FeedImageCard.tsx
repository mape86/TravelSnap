import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { flingGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler";
import Assets from "../Assets";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";
import { FeedImage, feedImages } from "./constants";

interface FeedImageCardProps {
  location: string;
  feedImage: any;
  id: string;
}

const FeedImageCard: React.FC<FeedImageCardProps> = ({
  location,
  feedImage,
  id,
}) => {
  const { navigate } = useCustomNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigate("PhotoDetailPage", {
            id,
            feedImage,
          })
        }
        className="flex items-center relative  mb-5"
      >
        <Image
          source={feedImage}
          style={{ width: 350, height: 430 }}
          className=" aspect-ratio-ratio-1 rounded-lg"
        />
        <View className="absolute bottom-2 right-10 items-center justify-center w-12 h-12 bg-white  rounded-full overflow-hidden">
          {/* TODO: Add heart icon */}
          {/* <Image source='' className="w-5 h-5 " /> */}
        </View>
        <Text className="font-semibold mt-2">{location}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedImageCard;
