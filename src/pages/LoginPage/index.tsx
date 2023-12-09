import { View, TextInput, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import CustomButton from "../../components/CustomButton";
import { fbAuth } from "../../../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginPage = () => {
  const { navigate } = useCustomNavigation();

  const { goBack } = useCustomNavigation();

  const handleReturnClick = () => {
    goBack();
  };

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
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
      <Text className="font-bold text-3xl ml-4">Log into your account</Text>
      <View className="px-8">
        <View className="py-5 space-y-6">
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
            <TextInput
              className="border rounded-md p-4"
              placeholder="password"
              autoCapitalize="none"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity>
            <Text className="underline text-right">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-5">
          <CustomButton onPress={userLogin} text="Sign In" />
        </View>

        <View>
          <CustomButton variant="secondary" onPress={handleReturnClick} text="Go back" />
        </View>
        <TouchableOpacity onPress={handleReturnClick} className="py-64">
          <Text className="underline">Don`t have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
