import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import CustomButton from "../../components/CustomButton";
import Assets from "../../Assets";
import { LinearGradient } from "expo-linear-gradient";

const WelcomePage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <ImageBackground
      source={Assets.images.Image5}
      className="flex-1 p-5 items-center"
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "33%",
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <SafeAreaView className="flex-1 justify-between">
        <View className="flex">
          <Text className="text-4xl font-bold">TravelSnap</Text>
          <Text className="text-2xl ">Keep your travel memories alive</Text>
        </View>
        {/* TODO: Endre customButton */}
        <View className="mb-24 space-y-4 ">
          <View className="">
            <CustomButton
              onPress={() => handleClick("CreateUserPage")}
              title="Sign Up"
              backgroundColor="bg-system-brandLight"
            />
          </View>
          <View className="">
            <CustomButton
              onPress={() => handleClick("LoginPage")}
              title="Log In"
              backgroundColor="bg-system-brandDark"
            />
          </View>
          <TouchableOpacity onPress={() => handleClick("HomeRoutes")}>
            <Text className="text-white underline">Continue as guest</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomePage;
