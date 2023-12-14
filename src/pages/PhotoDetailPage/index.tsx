import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { BackButton } from "../../components/BackButton";
import CommentSection from "../../components/CommentSection";
import { Map } from "../../components/Map";
import { ImageObject } from "../../hooks/useFeedImages";
import { useLikeImage } from "../../hooks/useLike";

interface PhotoDetailPageProps {
  location: string;
  image: ImageObject;
}

const PhotoDetailPage = (props: any) => {
  const image: ImageObject = props.route.params.image;
  //The ID's of the images in Firestore is the path excluding this first part of the url, which is therefor removed.
  const imageIdPath = decodeURIComponent(image.uri).replace(
    "https://firebasestorage.googleapis.com/v0/b/travelsnap-84d7a.appspot.com/o/feed/",
    ""
  );
  const { isLiked, likeCount, toggleLike, animatedStyle } = useLikeImage({ imageIdPath });

  return (
    <>
      <View className="mt-12 ml-2">
        <BackButton />
      </View>
      <ScrollView>
        <View className="relative">
          <Image source={{ uri: image.uri }} className="w-full aspect-square mb-4" />
          <View className="absolute bottom-[-36] right-6 items-center justify-center w-20 h-20 bg-system-brandLight rounded-full overflow-hidden">
            <TouchableOpacity className="" onPress={toggleLike}>
              <Animated.View className="" style={animatedStyle}>
                <Ionicons
                  name={!isLiked ? "ios-heart-outline" : "ios-heart-sharp"}
                  size={40}
                  color="black"
                />
              </Animated.View>
            </TouchableOpacity>
            <Text className="">{likeCount}</Text>
          </View>
        </View>
        <View className="flex-1 px-4">
          <View className="mb-12">
            <Text className="text-lg font-bold mb-2">@{image.userName}</Text>
            <Text className="text-base text-gray-800 mb-4">{image.description}</Text>
            <Text className="text-gray-500">{image.tags}</Text>
          </View>
          <CommentSection uri={image.uri} />
          {!!(image.latitude && image.longitude) && (
            <View className="mt-8">
              <Map latitude={image.latitude} longitude={image.longitude} />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerIcon: {
    width: 50,
    height: 75,
    resizeMode: "cover",
    borderRadius: 8,
  },
});

export default PhotoDetailPage;
