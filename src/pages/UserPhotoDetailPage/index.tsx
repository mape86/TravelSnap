import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getStorage, ref, getMetadata } from "firebase/storage";
import { RouteProp } from "@react-navigation/native";
import { fbStorage } from "../../../firebaseConfig";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { fbAuth } from "../../../firebaseConfig";

type UserPhotoDetailPageRouteProp = RouteProp<{
  params: {
    uri: string;
    latitude?: string;
    longitude?: string;
    description?: string;
    tags?: string;
  };
}>;

interface LocationState {
  latitude: string | null;
  longitude: string | null;
}

const UserPhotoDetailPage = (route: any) => {
  const { uri } = route.route.params;
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [imageLocation, setImageLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const fetchImageLocationData = async () => {
      //   const storage = getStorage();
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchImageLocationData();
  }, [uri]);

  return (
    <ScrollView>
      <View className="flex-1 items-center">
        <View className="flex items-center">
          <Image source={{ uri }} className="rounded-lg m-2 w-80 h-96 object-cover" />
          <View className="flex flex-row w-72 justify-center pb-5">
            <Text className="font-bold">{fbAuth.currentUser?.displayName}: </Text>
            <Text>{description}</Text>
          </View>
          <Text className="pb-5">{tags}</Text>
          <CustomButton text="Add to Feed" onPress={() => {}} />
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
            <Text className="pt-3">No location data available</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserPhotoDetailPage;
