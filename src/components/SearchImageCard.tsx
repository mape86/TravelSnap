import React from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";
import { ImageObject } from "../hooks/useFeedImages";

type SearchImageCardProps = {
  image: ImageObject;
};

const SearchImageCard: React.FC<SearchImageCardProps> = ({ image }) => {
  const { navigate } = useCustomNavigation();

  return (
    <View className="w-1/3 h-[165px] aspect-auto object-cover">
      <TouchableOpacity onPress={() => navigate("PhotoDetailPage", { image })}>
        <Image source={{ uri: image.uri }} className="h-full " />
      </TouchableOpacity>
    </View>
  );
};

export default SearchImageCard;
