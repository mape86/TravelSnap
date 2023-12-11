import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { DevSettings, Image, Switch, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { fbAuth, getOwnProfilePicture, uploadProfilePicture } from "../../../firebaseConfig";
import Assets from "../../Assets";
import CustomButton from "../../components/CustomButton";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";

const UserSettingsPage = () => {
  const auth = fbAuth;
  const navigation = useCustomNavigation();

  const [dislayName, setDisplayName] = useState<string>(`${auth.currentUser?.displayName}`);
  const [description, setDescription] = useState<string>(`${auth.currentUser?.photoURL}`);
  const [toggleIsEnabled, setToggleIsEnabled] = useState<boolean>(false);
  const [chosenProfileImage, setChosenProfileImage] = useState<string>();
  const [profileImage, setProfileImage] = useState<string>();

  useEffect(() => {
    handleProfileImageUpload();
  }, [chosenProfileImage]);

  useEffect(() => {
    retrieveProfilePicture();
  }, []);

  const retrieveProfilePicture = async () => {
    try {
      const profileImageUrl = await getOwnProfilePicture();
      if (profileImageUrl) {
        setProfileImage(profileImageUrl);
      }
    } catch (error) {
      console.log("Error getting profile picture:", error);
    }
  };

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
      setChosenProfileImage(response.assets[0].uri);
    }
  };

  const handleProfileImageUpload = async () => {
    if (chosenProfileImage) {
      try {
        const uri = chosenProfileImage;
        const fileName = uri.split("/").pop();

        uploadProfilePicture(uri, fileName, (progress: any) => console.log(progress));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: dislayName,
        photoURL: description,
      });
      alert("Profile info updated!");
    }
  };

  const handleUserSignOut = () => {
    signOut(auth)
      .then(() => {
        DevSettings.reload();
      })
      .catch((error) => alert(error));
  };

  return (
    <View className="flex-1">
      <View className="mt-12 ml-2">
        <TouchableOpacity className="flex-row items-center" onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={28} color="black" />
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5 ml-10">
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
          autoCapitalize="none"
          value={dislayName}
          onChangeText={(text) => setDisplayName(text)}
          placeholder="Display name"
          className="h-10 border-2 rounded-md px-2"
        />
      </View>
      <View className="mx-10">
        <Text className="mb-2 font-bold">Edit profile description</Text>
        <TextInput
          autoCapitalize="none"
          multiline={true}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Profile description"
          className="h-20  border-2 rounded-md px-2 py-2"
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
      <View className="mx-10">
        <CustomButton variant="secondary" text="Save changes" onPress={handleSaveChanges} />
      </View>
      <View className="mt-1 mx-10">
        <CustomButton text="Log out" onPress={handleUserSignOut} />
      </View>
    </View>
  );
};

export default UserSettingsPage;
