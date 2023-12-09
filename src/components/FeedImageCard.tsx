import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { flingGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler";
import Assets from "../Assets";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";
import { FeedImage, feedImages } from "./constants";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

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
  const [isFavorited, setIsFavorited] = useState(false);
  const scale = useSharedValue(1);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    scale.value = withSpring(isFavorited ? 1 : 1.2, {}, () => {
      if (isFavorited) {
        runOnJS(resetScale)();
      }
    });
  };

  const resetScale = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigate("PhotoDetailPage", {
            id,
            feedImage,
          })
        }
        className="flex items-center relative mb-5"
      >
        <Image
          source={feedImage}
          style={{ width: 350, height: 430 }}
          className=" aspect-ratio-ratio-1 rounded-lg"
        />
        <View className="absolute bottom-0 right-10 items-center justify-center w-16 h-16 bg-system-brandLight rounded-full overflow-hidden">
          <TouchableOpacity onPress={toggleFavorite}>
            <Animated.View style={animatedStyle}>
              {isFavorited ? (
                <Ionicons name="ios-heart-sharp" size={24} color="black" />
              ) : (
                <Ionicons name="ios-heart-outline" size={24} color="black" />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
        <Text className="font-semibold mt-2 ">{location}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedImageCard;
