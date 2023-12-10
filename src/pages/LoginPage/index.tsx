import { View, TextInput, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import CustomButton from "../../components/CustomButton";
import { fbAuth } from "../../../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PhotoDetailPage from "../PhotoDetailPage";
import { PasswordField } from "../../components/PasswordField";

const LoginPage = () => {
  const { navigate, goBack, pop } = useCustomNavigation();

  const handleReturnClick = () => {
    goBack();
  };

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };
  const backToWelcome = () => {
    pop();
  };

  const auth = fbAuth;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("HomeRoutes");
      }
    });
    return unsubscribe;
  }, []);

  const userLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("User with email: ", response.user.email, " logged in");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity
        onPress={backToWelcome}
        className="flex p-5 my-3 flex-row items-center"
      >
        <Ionicons name="arrow-back" size={28} color="black" />
        <Text>Back</Text>
      </TouchableOpacity>
      <Text className="font-bold text-3xl ml-4 mb-5">Log in to your account</Text>
      <View className="px-8">
        <View className="mb-12">
          <View className="space-y-6 mb-6">
            <View>
              <Text>Email</Text>
              <TextInput
                className="border rounded-md p-4"
                placeholder="email"
                value={email}
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View>
              <Text>Password</Text>
              <PasswordField password={password} setPassword={setPassword} />
            </View>
          </View>
          <TouchableOpacity>
            <Text className="underline text-right">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-5">
          <CustomButton onPress={userLogin} text="Sign In" />
        </View>

        <TouchableOpacity
          onPress={() => handleClick("CreateUserPage")}
          className="py-14 m-auto"
        >
          <Text className="underline">Don`t have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
