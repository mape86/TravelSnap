import { Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
//import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fbAuth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
//import { TextInput } from "react-native-paper";
import Checkbox from "expo-checkbox";

const CreateUserPage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setChecked] = useState(false);

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
      <Text className="font-bold text-3xl ml-4">Create your account</Text>
      <View className="px-8">
        <View className="py-5 space-y-6">
          <View>
            <Text>Username</Text>
            <TextInput
              className="border rounded-md p-4"
              placeholder="Username"
              value={userName}
              autoCapitalize="none"
              onChangeText={(text) => setUserName(text)}
            />
          </View>
          <View>
            <Text>Email</Text>
            <TextInput
              className="border rounded-md p-4"
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              className="border rounded-md p-4"
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              maxLength={20}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View className="flex flex-row">
            <Checkbox
              className="mr-2"
              value={isChecked}
              onValueChange={setChecked}
              color="#000"
            />
            <Text>By signing up you agree to the terms of service and privacy policy</Text>
          </View>
        </View>

        <View className="mb-5">
          <CustomButton onPress={createUser} text="Sign up" />
        </View>

        <View className="">
          <CustomButton
            variant="secondary"
            text="Continue as guest"
            onPress={() => handleClick("HomeRoutes")}
          />
        </View>

        <TouchableOpacity onPress={() => handleClick("LoginPage")} className="py-36">
          <Text className="underline">Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateUserPage;
