import { View, Text, Image } from "react-native";
import React from "react";
import { ImageObject } from "../hooks/useFeedImages";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";

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
