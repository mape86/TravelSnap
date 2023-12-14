import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { fbAuth, uploadImageToFirebase } from "../../../firebaseConfig";
import { BackButton } from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";

//Function to upload your image to firebase storage, along with your username. If image contains exif data, the latitude and longitude should in theory be uploaded as well.
const UploadLibraryPhotoPage = (route: any) => {
  const { uri, exif } = route.route.params;
  const auth = fbAuth.currentUser;

  const navigation = useCustomNavigation();
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
          userName: auth?.displayName,
        };
        uploadImageToFirebase(uri, fileName, metadata, (progress: any) =>
          console.log(progress)
        );
        if (auth) {
          alert("Success, your image was uploaded to your firebase folder");
        } else {
          alert("You need to be logged in to upload images");
        }
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
            <BackButton />
          </View>
          <View className="flex-1 items-center justify-between mt-4">
            <Image
              source={{ uri }}
              style={{ width: 350, height: 380 }}
              className="rounded-lg"
            />
            <Text>Go to profile to edit image and add it to feed</Text>
            <View className="w-80 my-4">
              <CustomButton
                text="Upload to profile"
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
