import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { uploadImageToFirebase } from "../../../firebaseConfig";
import CustomButton from "../../components/CustomButton";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { fbAuth } from "../../../firebaseConfig";

const UploadLibraryPhotoPage = (route: any) => {
  const { uri, exif } = route.route.params;
  const auth = fbAuth.currentUser;

  const navigation = useCustomNavigation();

  const [imageDescription, setImageDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
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
          userName: auth?.displayName,
        };
        uploadImageToFirebase(uri, fileName, metadata, (progress: any) =>
          console.log(progress)
        );
        alert("Success, your image was uploaded to your firebase folder");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 ">
          <View className="mt-12 ml-2">
            <TouchableOpacity className="flex-row items-center" onPress={navigation.goBack}>
              <Ionicons name="arrow-back" size={28} color="black" />
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 items-center justify-between mt-4">
            <Image
              source={{ uri }}
              style={{ width: 350, height: 350 }}
              className="rounded-lg"
            />
            <TextInput
              placeholder="Write a description"
              numberOfLines={10}
              multiline={true}
              onChangeText={setImageDescription}
              className="w-80 h-16 border-2 border-gray-400"
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UploadLibraryPhotoPage;
