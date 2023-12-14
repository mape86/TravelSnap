import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeRoutes from ".";
import CreateUserPage from "../pages/CreateUserPage";
import LoginPage from "../pages/LoginPage";
import WelcomePage from "../pages/Welcome";

const { Navigator, Screen } = createStackNavigator();

const WelcomeRoutes: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="WelcomePage" component={WelcomePage} />
        <Screen name="CreateUserPage" component={CreateUserPage} />
        <Screen name="LoginPage" component={LoginPage} />
        <Screen name="HomeRoutes" component={HomeRoutes} />
      </Navigator>
    </NavigationContainer>
  );
};

export default WelcomeRoutes;
