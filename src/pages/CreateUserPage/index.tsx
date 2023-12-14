import Checkbox from "expo-checkbox";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { fbAuth } from "../../../firebaseConfig";
import { BackButton } from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import { PasswordField } from "../../components/PasswordField";
import useCustomNavigation, { RouteList } from "../../hooks/Navigation/useCustomNavigation";

const CreateUserPage = () => {
  const { navigate, pop } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  const backToWelcome = () => {
    pop();
  };

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setChecked] = useState(false);

  const auth = fbAuth;

  //Creating a user through Firebase Authentication, and in turn setting the display name. If successful the user navigates to HomeRoutes.
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
      <BackButton onPress={backToWelcome} />
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
              autoCorrect={false}
              onChangeText={(text) => setUserName(text)}
            />
          </View>
          <View>
            <Text>Email</Text>
            <TextInput
              className="border rounded-md p-4"
              placeholder="email@example.com"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <Text>Password</Text>
            <PasswordField password={password} setPassword={setPassword} />
          </View>
          <View className="flex flex-row ">
            <Checkbox
              className="mr-2"
              value={isChecked}
              onValueChange={setChecked}
              color="#000"
            />
            <Text>By signing up you agree to the terms of service and privacy policy</Text>
          </View>
        </View>

        <View className="mb-5 top-5">
          <CustomButton onPress={createUser} text="Sign up" disabled={!isChecked} />
        </View>

        <TouchableOpacity onPress={() => handleClick("LoginPage")} className="py-14 m-auto">
          <Text className="underline">Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateUserPage;
