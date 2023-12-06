import { View, Text, Image, Modal, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Use } from "react-native-svg";
import CustomButton from "../../components/CustomButton";
import { StackNavigationProp } from "@react-navigation/stack";

type photoUri = string;

type RootStackList = {
  GalleryPage: undefined;
  UploadLibraryPhotoPage: { uri: string };
};

type GalleryPageNavigation = StackNavigationProp<RootStackList>;

const PhotoGalleryPage: React.FC = () => {
  // const { navigate } = useCustomNavigation();
  const navigation = useNavigation<GalleryPageNavigation>();

  const [pickedPhoto, setPickedPhotos] = useState<photoUri[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  // const [pickedPhoto, setPickedPhoto] = useState<photoUri | null>(null)

  const handleClick = ( uri: string) => {
    navigation.navigate("UploadLibraryPhotoPage", { uri });
  };

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

  // const openModal = () => {
  //   setModalVisible(true)
  // }

  // const selectYourPhoto = (uri: photoUri) => {
  //   setPickedPhoto(uri)
  //   setModalVisible(false)
  // }

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
    <SafeAreaView className="flex-auto bg-sys overflow-hidden">
      <View className="mb-3 flex flex-row justify-between">
        <Text className="pb-1 ml-4 font-semibold text-3xl">Device Gallery</Text>
        <TouchableOpacity
          className="pr-4"
          onPress={() => handleClick("CameraPage")}
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
                  onPress={() => handleClick(item)}
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
  // return (
  //   <View>
  //     <CustomButton onPress={openModal} title="Show device images" />
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => setModalVisible(false)}
  //     >
  //       <View>
  //         <FlatList
  //         data={photos}
  //         keyExtractor={(item) => item.id}
  //         renderItem={({item}) => (
  //           <TouchableOpacity onPress={() => selectYourPhoto(item.uri)}>
  //             <Image source={{uri: item.uri}} style={{width: 100, height: 100}} />
  //           </TouchableOpacity>
  //         )}
  //         numColumns={3}
  //         />
  //         </View>
  //     </Modal>
  //       {pickedPhoto && (
  //         <View>
  //           <Image source={{uri: pickedPhoto}} style={{width: 100, height: 100}} />
  //         </View>
  //       )}
  //   </View>
  // )
};

export default PhotoGalleryPage;
