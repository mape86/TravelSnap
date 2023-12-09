import { Text, View } from "react-native";
import React, { useState } from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fbAuth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const CreateUserPage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = fbAuth;

  const createUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
    }

    if (auth.currentUser)
      try {
        await updateProfile(auth.currentUser, { displayName: userName });
        alert("New user registered");
        clearFields();
        navigate("HomeRoutes");
      } catch (error) {
        alert(error);
      }
  };

  const clearFields = () => {
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView className="flex-1">
      <Text className="font-bold text-2xl ml-4">Sign up</Text>
      <View className="justify-center items-center mt-10">
        <TextInput
          className="h-10 w-60 border-2 rounded-md px-2 my-2"
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          className="h-10 w-60 border-2 rounded-md px-2 my-2"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="h-10 w-60 border-2 rounded-md px-2 my-2"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View className="my-2">
          <CustomButton onPress={createUser} text="Create account" />
        </View>
      </View>
      <View className="justify-center items-center">
        <CustomButton
          text="Go to login"
          onPress={() => handleClick("LoginPage")}
        />
        <View className="mt-2">
          <CustomButton
            text="Continue as guest"
            onPress={() => handleClick("HomeRoutes")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateUserPage;
