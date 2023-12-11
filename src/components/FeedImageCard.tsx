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
  image: ImageObject;
}

interface ImageObject {
  uri: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  tags?: string;
  userName?: string;
}

const FeedImageCard: React.FC<FeedImageCardProps> = ({ image }) => {
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
            image,
          })
        }
        className="flex items-center relative mb-5"
      >
        <Image
          source={{ uri: image.uri }}
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
        <Text className="font-semibold mt-2 ">{image.userName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedImageCard;
