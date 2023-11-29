import { View, Text } from "react-native";
import React from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreateUserPage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>CreateUserPage</Text>
      <TextInput label="Username" />
      <TextInput label="Email" />
      <TextInput label="Password" />
      <TextInput className="pb-3" label="Confirm Password" />
      <CustomButton onPress={() => handleClick("HomeRoutes")} title="Create" />

      <TouchableOpacity onPress={() => handleClick("LoginPage")}>
        <Text>Already a user?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleClick("HomeRoutes")}>
        <Text>Continue as guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateUserPage;
