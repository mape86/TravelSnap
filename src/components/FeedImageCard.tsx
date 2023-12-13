import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";
import { ImageObject } from "../hooks/useFeedImages";
import { useLikeImage } from "../hooks/useLike";

interface FeedImageCardProps {
  image: ImageObject;
}

const FeedImageCard: React.FC<FeedImageCardProps> = ({ image }) => {
  const { navigate } = useCustomNavigation();
  const isFocused = useIsFocused();
  const imageIdPath = decodeURIComponent(image.uri).replace(
    "https://firebasestorage.googleapis.com/v0/b/travelsnap-84d7a.appspot.com/o/feed/",
    ""
  );
  const { toggleLike, isLiked, animatedStyle, fetchLikes } = useLikeImage({ imageIdPath });

  useEffect(() => {
    if (isFocused) {
      fetchLikes();
    }
  }, [isFocused]);

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
          style={{ width: 350, height: 400 }}
          className="aspect-ratio-ratio-1 rounded-lg"
        />
        <Text className="font-semibold mt-2 ">{image.userName}</Text>
      </TouchableOpacity>

      <View className="absolute bottom-0 right-10 items-center justify-center w-16 h-16 bg-system-brandLight rounded-full overflow-hidden">
        <TouchableOpacity onPress={toggleLike}>
          <Animated.View style={animatedStyle}>
            <Ionicons
              name={!isLiked ? "ios-heart-outline" : "ios-heart-sharp"}
              size={32}
              color="black"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedImageCard;
function setUserHasLiked(arg0: any) {
  throw new Error("Function not implemented.");
}
