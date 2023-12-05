import { View } from "react-native";
import React, { useState } from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { TextInput } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import { fbAuth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";

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

  const userLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigate("HomeRoutes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="mt-52">
      <View className="px-10">
        <TextInput
          label="Email"
          placeholder="email"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="mb-10"
          label="Password"
          placeholder="password"
          autoCapitalize="none"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <View className="mb-5">
          <CustomButton onPress={userLogin} title="Sign In" />
        </View>
        <View>
          <CustomButton
            onPress={handleReturnClick}
            title="Go back"
            backgroundColor="bg-neutral-400"
          />
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
