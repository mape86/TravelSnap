import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import WelcomeRoutes from "./src/routes/Welcome.Routes";

export default function App() {
  return (
    <NavigationContainer>
      <WelcomeRoutes />
    </NavigationContainer>
  );
}
