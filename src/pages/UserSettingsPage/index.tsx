import { View, Text, Image, Switch } from "react-native";
import React, { useCallback, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Assets from "../../Assets";
import CustomButton from "../../components/CustomButton";
import { fbAuth, uploadProfilePicture } from "../../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { signOut } from "firebase/auth";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import WelcomeRoutes from "../../routes/Welcome.Routes";

const UserSettingsPage = () => {
  const [dislayName, setDisplayName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [toggleIsEnabled, setToggleIsEnabled] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>();

  const auth = fbAuth;
  const navigation = useCustomNavigation();

  const toggleDarkMode = () => {
    setToggleIsEnabled((previousState) => !previousState);
  };

  const handleProfilePictureChange = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    if (!response.canceled) {
      setProfileImage(response.assets[0].uri);
    }
    if (profileImage) {
      handleProfileImageUpload();
      setProfileImage("");
    }
  };

  const handleProfileImageUpload = async () => {
    if (profileImage) {
      try {
        const uri = profileImage;
        const fileName = uri.split("/").pop();

        uploadProfilePicture(uri, fileName, (progress: any) =>
          console.log(progress)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSaveChanges = () => {};

  const handleUserSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.reset("Welcome");
      })
      .catch((error) => alert(error));
  };

  return (
    <View className="flex-1">
      <View className="mt-10 ml-10">
        <Text className="font-bold text-2xl">Edit profile</Text>
        <TouchableOpacity
          className="justify-center items-center"
          onPress={handleProfilePictureChange}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: 150, height: 150 }}
              className="rounded-full"
            />
          ) : (
            <Image
              source={Assets.images.ProfileImagePlaceholder}
              style={{ width: 150, height: 150 }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View className="mx-10 my-5">
        <Text className="mb-2 font-bold">Edit display name</Text>
        <TextInput
          value={dislayName}
          onChangeText={(text) => setDisplayName(text)}
          placeholder="Display name"
          className="h-10 border-2 rounded-md px-2"
        />
      </View>
      <View className="mx-10">
        <Text className="mb-2 font-bold">Edit profile description</Text>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Profile description"
          className="h-20  border-2 rounded-md px-2"
        />
      </View>
      <View className="flex-row justify-between px-10 mt-10">
        <Text className="font-bold">Toggle Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#121212" }}
          ios_backgroundColor="#F1F0F0"
          value={toggleIsEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>
      <View className="mt-5 mx-10">
        <CustomButton
          title="Save changes"
          backgroundColor="bg-gray-500"
          onPress={() => {
            handleSaveChanges;
          }}
        />
      </View>
      <View className="mt-3 mx-10">
        <CustomButton title="Log out" onPress={handleUserSignOut} />
      </View>
    </View>
  );
};

export default UserSettingsPage;
