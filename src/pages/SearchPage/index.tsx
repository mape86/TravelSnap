import { View, Text, Image, ImageSourcePropType } from "react-native";
import React, { useEffect, useState } from "react";
import { fbStorage, getAllFeedImagesFromFirebase } from "../../../firebaseConfig";
import { getMetadata, ref } from "firebase/storage";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Assets from "../../Assets";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ImageObject = {
  uri: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  tags?: string;
  userName?: string;
};

type RouteParamList = {
  PhotoDetailPage: { uri: string };
};

const SearchPage = () => {
  const navigation = useNavigation<StackNavigationProp<RouteParamList>>();
  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const mockImages: ImageSourcePropType[] = [
    Assets.travelImages.CinqueTerre,
    Assets.travelImages.Lofoten,
    Assets.travelImages.Paris,
  ];

  useEffect(() => {
    fillImageObjects();
  }, []);

  const fillImageObjects = async () => {
    const photoUrls = await getAllFeedImagesFromFirebase();

    const metadataPromises = photoUrls.map((url) => {
      const imageRef = ref(fbStorage, url);
      return getMetadata(imageRef).then((metadata) => {
        const latitude = metadata.customMetadata?.latitude;
        const longitude = metadata.customMetadata?.longitude;
        const description = metadata.customMetadata?.description || "";
        const tags = metadata.customMetadata?.tags || "";
        const userName = metadata.customMetadata?.userName || "";
        return {
          uri: url,
          latitude: latitude,
          longitude: longitude,
          description: description,
          tags: tags,
          userName: userName,
        };
      });
    });

    const imageObject = await Promise.all(metadataPromises);
    setImageObjects(imageObject);
  };

  // const refreshList = () => {
  //   fillImageObjects();
  // };

  const imageSearchResults = imageObjects.filter(
    (image) => image.tags?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleImageClick = (uri: string) => {
    navigation.navigate("PhotoDetailPage", { uri });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 w-screen mt-10 mb-5 px-5 justify-center">
        <TextInput
          className="h-10 border-2 rounded-3xl pl-4"
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
        {/* <TouchableOpacity onPress={() => refreshList()}>
          <Entypo name="cycle" size={22} color="gray" />
        </TouchableOpacity> */}
      </View>
      {mockImages.length >= 1 ? (
        <ScrollView className="h-screen">
          {imageSearchResults.map((image, index) => (
            <View key={index} className="flex-1 p-2 items-center">
              {image.tags?.includes(searchText)}
              <View className="flex-1 justify-start items-start w-screen pl-10">
                <Text className="font-semibold text-lg pb-2">{image.userName}</Text>
              </View>
              <TouchableOpacity onPress={() => handleImageClick(image.uri)}>
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  alt="image"
                  className="h-96 w-80 p-2 rounded-xl"
                />
              </TouchableOpacity>
              <View className="w-screen px-10 pt-1">
                <Text>{image.description}</Text>
                <Text className="font-semibold pt-1">{image.tags}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className="justify-center items-center h-screen">
          <Text className="text-lg font-semibold">No results</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchPage;
