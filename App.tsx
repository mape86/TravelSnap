import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <View className="flex-1 items-center justify-center bg-slate-800">
        <Text className="text-pink-700 font-bold text-4xl">
          Hello everyone
        </Text>
      </View>
    </NavigationContainer>
  );
}