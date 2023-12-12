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
    <View>
      <View>
        <Text className="font-semibold text-lg py-2">{image.userName}</Text>
      </View>
      <TouchableOpacity onPress={() => navigate("PhotoDetailPage", image)}>
        <Image source={{ uri: image.uri }} className="rounded-lg w-80 h-96" />
      </TouchableOpacity>
      <View>
        <Text className="pt-2">{image.description}</Text>
        <Text className="font-semibold">{image.tags}</Text>
      </View>
    </View>
  );
};

export default SearchImageCard;
