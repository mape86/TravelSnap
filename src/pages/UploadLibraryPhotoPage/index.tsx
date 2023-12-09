import React, { useEffect, useState } from "react";
import { Image, TextInput, View, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import { uploadImageToFirebase } from "../../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

const UploadLibraryPhotoPage = (route: any) => {
  const { uri, exif } = route.route.params;

  const [imageDescription, setImageDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setImage(uri);
  }, []);

  const handleUploadToFirebase = async () => {
    if (image) {
      try {
        const uri = image;
        const fileName = uri.split("/").pop();
        const metadata = {
          latitude: exif?.GPSLatitude,
          longitude: exif?.GPSLongitude,
          description: imageDescription,
          tags: tags,
        };
        uploadImageToFirebase(uri, fileName, metadata, (progress: any) =>
          console.log(progress)
        );
        console.log(metadata);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 items-center">
        <Image
          source={{ uri }}
          style={{ width: 350, height: 350 }}
          className="rounded-lg m-2"
        />
        <Text></Text>
        <TextInput
          placeholder="Write a description"
          numberOfLines={10}
          multiline={true}
          onChangeText={setImageDescription}
          className="w-80 h-36 border-2 border-gray-400 mb-4"
        />
        <TextInput
          placeholder="Add tags"
          onChangeText={setTags}
          className="w-80 h-10 border-2 border-gray-400"
        />
        <View className="w-80 my-4">
          <CustomButton
            text="Upload"
            className="self-stretch"
            onPress={handleUploadToFirebase}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadLibraryPhotoPage;
