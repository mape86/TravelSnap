import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Assets from "../../Assets";
import CustomButton from "../../components/CustomButton";
import useCustomNavigation, { RouteList } from "../../hooks/Navigation/useCustomNavigation";

const WelcomePage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <ImageBackground source={Assets.images.Image5} className="flex-1 p-5 items-center">
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
        <View className="mb-18">
          <View className="space-y-4 mb-6">
            <View>
              <CustomButton
                variant="secondary"
                onPress={() => handleClick("CreateUserPage")}
                text="Sign Up"
              />
            </View>
            <View>
              <CustomButton onPress={() => handleClick("LoginPage")} text="Log In" />
            </View>
          </View>
          <TouchableOpacity onPress={() => handleClick("HomeRoutes")}>
            <Text className="text-white underline text-lg mx-auto">Continue as guest</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomePage;
