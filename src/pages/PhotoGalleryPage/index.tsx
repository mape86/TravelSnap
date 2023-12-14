import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation, { RouteList } from "../../hooks/Navigation/useCustomNavigation";

type photoUri = string;

type PickedPhoto = {
  uri: string;
  exif?: Record<string, any>;
};

const PhotoGalleryPage: React.FC = () => {
  const { navigate } = useCustomNavigation();

  const [pickedPhoto, setPickedPhotos] = useState<PickedPhoto[]>([]);

  const handleClick = (item: keyof RouteList, uri: string) => {
    navigate(item, { uri });
  };

  const handleCameraClick = (item: keyof RouteList) => {
    navigate(item);
  };

  //Function for choosing photos from device camera roll. If a photo or photos are picked setPickedPhotos is called, and the picked photos are added to the pickedPhoto state. The spread operator will add any new photos to the array, next to the old ones.
  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      exif: true,
      allowsMultipleSelection: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      const newPhotoUri = result.assets.map((asset) => {
        return {
          uri: asset.uri,
          exif: asset.exif || {},
        };
      });
      setPickedPhotos([...pickedPhoto, ...newPhotoUri]);
    }
  };

  return (
    <SafeAreaView className="flex-auto bg-system-brandLight overflow-hidden">
      <View className="mb-3 flex flex-row justify-between">
        <Text className="pb-1 ml-4 font-semibold text-3xl">Upload</Text>
        <TouchableOpacity
          className="pr-4 pt-2"
          onPress={() => handleCameraClick("CameraPage")}
        >
          <Icon source="camera" size={30} />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <View>
          <Button
            textColor="white"
            className="ml-2 mr-2 bg-black "
            onPress={() => choosePhotoFromLibrary()}
          >
            <Text>Pick photos to upload</Text>
          </Button>
        </View>

        <View className="flex-1 mt-2">
          <FlatList
            data={pickedPhoto}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <View className="gap-x-1 gap-y-1">
                <TouchableOpacity
                  className="mx-0.5 gap-x-1 gap-y-1 p-0.5"
                  onPress={() => handleClick("UploadLibraryPhotoPage", item.uri)}
                >
                  <Image
                    source={{ uri: item.uri }}
                    className="w-[120px] h-[120px] rounded-lg"
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhotoGalleryPage;
