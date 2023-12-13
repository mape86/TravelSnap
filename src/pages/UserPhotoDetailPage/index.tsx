import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { getMetadata, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { fbAuth, fbStorage, uploadToFeed } from "../../../firebaseConfig";
import CustomButton from "../../components/CustomButton";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";

interface LocationState {
  latitude: string | null;
  longitude: string | null;
}

const UserPhotoDetailPage = (route: any) => {
  const auth = fbAuth.currentUser;
  const navigation = useCustomNavigation();

  const { uri } = route.route.params;
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [imageLocation, setImageLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
  });
  const [userName, setUserName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageLocationData = async () => {
      const imageRef = ref(fbStorage, uri);

      try {
        const metadata = await getMetadata(imageRef);
        const latitude = metadata.customMetadata?.latitude;
        const longitude = metadata.customMetadata?.longitude;
        const description = metadata.customMetadata?.description || "";
        const tags = metadata.customMetadata?.tags || "";

        if (latitude && longitude) {
          setImageLocation({ latitude, longitude });
        }
        if (description) {
          setDescription(description);
        }
        if (tags) {
          setTags(tags);
        }
        if (auth?.displayName) {
          setUserName(auth.displayName);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImageLocationData();
    setImage(uri);
  }, [uri]);

  const uploadImageToFeed = async () => {
    if (image) {
      try {
        const uri = image;
        const fileName = uri.split("/").pop();
        const metadata = {
          latitude: imageLocation.latitude,
          longitude: imageLocation.longitude,
          description: description,
          tags: tags,
          userName: userName,
        };
        uploadToFeed(uri, fileName, metadata, (progress: any) => console.log(progress));
        alert("Success, your image was added to the Feed");
      } catch (error) {
        console.log(error);
        alert("Something went wrong, please try again");
      }
    }
  };

  return (
    <>
      <View className="mt-12 ml-2">
        <TouchableOpacity className="flex-row items-center" onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={28} color="black" />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex-1 items-center mt-5">
          <View className="flex items-center">
            <Image source={{ uri }} className="rounded-lg m-2 w-80 h-96 object-cover" />
            <View className="flex flex-row w-72 justify-center pb-5">
              <View className="flex-col w-80">
                <Text className="font-bold mb-1">{fbAuth.currentUser?.displayName}</Text>
                <Text className="mb-2">{description}</Text>
                <Text className="">{tags}</Text>
              </View>
            </View>
            <View className="flex items-center justify-between mt-2">
              <TextInput
                autoCorrect={false}
                placeholder="Write a description"
                numberOfLines={10}
                multiline={true}
                onChangeText={setDescription}
                className="w-80 h-16 border-2 border-gray-400 mb-1"
              />
              <TextInput
                autoCorrect={false}
                placeholder="Add tags"
                onChangeText={setTags}
                className="w-80 h-10 border-2 border-gray-400"
              />
            </View>
            <View className="mt-2">
              <CustomButton text="Add to Feed" onPress={uploadImageToFeed} />
            </View>
          </View>
          <View className="flex items-center">
            {imageLocation.latitude && imageLocation.longitude ? (
              <MapView
                className="rounded-xl m-2 w-screen h-80"
                initialRegion={{
                  latitude: Number(imageLocation.latitude),
                  longitude: Number(imageLocation.longitude),
                  latitudeDelta: 0.1022,
                  longitudeDelta: 0.0521,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: Number(imageLocation.latitude),
                    longitude: Number(imageLocation.longitude),
                  }}
                />
              </MapView>
            ) : (
              <Text className="pt-3 mb-2">No location available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default UserPhotoDetailPage;
