import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { fbStorage, getAllFeedImagesFromFirebase } from "../../../firebaseConfig";
import { getMetadata, ref } from "firebase/storage";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

type ImageObject = {
  uri: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  tags?: string;
  userName?: string;
};

const SearchPage = () => {
  const [imageObjects, setImageObjects] = useState<ImageObject[]>([]);

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

  const refreshList = () => {
    fillImageObjects();
  };

  return (
    <View className="flex-1">
      <View className="w-screen items-center justify-center mt-20 mb-2 ">
        <TouchableOpacity onPress={() => refreshList()}>
          <Entypo name="cycle" size={22} color="gray" />
        </TouchableOpacity>
      </View>
      <ScrollView className="">
        {imageObjects.map((image, index) => (
          <View key={index} className="flex-1 p-2 items-center">
            <View className="flex-1 justify-start items-start w-screen pl-10">
              <Text className="font-semibold">{image.userName}</Text>
            </View>
            <Image
              key={index}
              source={{ uri: image.uri }}
              alt="image"
              className="h-96 w-80 p-2 rounded-xl"
            />
            <View className="w-screen px-10 pt-1">
              <Text>{image.description}</Text>
              <Text>{image.tags}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchPage;
