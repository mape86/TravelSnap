import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation, { RouteList } from "../../hooks/Navigation/useCustomNavigation";

type photoUri = string;

const PhotoGalleryPage: React.FC = () => {
  const { navigate } = useCustomNavigation();

  const [pickedPhoto, setPickedPhotos] = useState<photoUri[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

  const handleClick = (item: keyof RouteList, uri: string) => {
    navigate(item, { uri });
  };

  const handleCameraClick = (item: keyof RouteList) => {
    navigate(item);
  }

  // useEffect(() => {
  //   (async () => {
  //     const {status} = await MediaLibrary.requestPermissionsAsync();
  //     if(status == 'granted'){
  //       const album = await MediaLibrary.getAlbumAsync('Camera Roll')
  //       const {assets} = await MediaLibrary.getAssetsAsync({
  //         album: album,
  //         first: 20,
  //         mediaType: 'photo'
  //       })
  //       setPhotos(assets)
  //     }
  //   })()
  // }, [])

  const choosePhotoFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      const newPhotoUri = result.assets.map((asset) => asset.uri);
      setPickedPhotos([...pickedPhoto, ...newPhotoUri]);
    }
  };

  return (
    <SafeAreaView className="flex-auto bg-system-brandLight overflow-hidden">
      <View className="mb-3 flex flex-row justify-between">
        <Text className="pb-1 ml-4 font-semibold text-3xl">Device Gallery</Text>
        <TouchableOpacity
          className="pr-4 pt-2"
          onPress={() => handleCameraClick("CameraPage")}
        >
          <Icon source="camera" size={30} />
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <View className="">
          <Button
            textColor="white"
            className="ml-2 mr-2 bg-black "
            onPress={() => choosePhotoFromLibrary()}
          >
            <Text>Pick photos</Text>
          </Button>
        </View>

        <View className="flex-1 mt-2">
          <FlatList
            data={pickedPhoto}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View className="gap-x-1 gap-y-1">
                <TouchableOpacity
                  className="mx-0.5 gap-x-1 gap-y-1 p-0.5"
                  onPress={() => handleClick("UploadLibraryPhotoPage", item)}
                >
                  <Image
                    source={{ uri: item }}
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
