import { View, Text } from "react-native";
import React, { useState } from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fbAuth } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const CreateUserPage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const auth = fbAuth;

  const createUser = async () => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }

    if (auth.currentUser)
      try {
        setIsLoading(true);
        await updateProfile(auth.currentUser, { displayName: userName });
        console.log(auth.currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

    alert("New user registered, continue to login page");
    clearFields();
  };

  const clearFields = () => {
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>CreateUserPage</Text>
      <TextInput
        label="Username"
        placeholder="username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        label="Email"
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <CustomButton
        onPress={createUser}
        title="Create"
        disabled={
          password.length >= 6 && email.includes(".") && email.includes("@")
            ? false
            : true
        }
      />

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
