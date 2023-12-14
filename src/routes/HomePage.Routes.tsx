import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage";
import PhotoDetailPage from "../pages/PhotoDetailPage";
import UserProfilePage from "../pages/UserProfilePage";

const { Navigator, Screen } = createStackNavigator();

export const HomePageRoutes = () => {
  const noHeaderShown = {
    headerShown: false,
  };
  return (
    <NavigationContainer independent={true}>
      <Navigator initialRouteName="HomePage">
        <Screen name="HomePage" component={HomePage} options={noHeaderShown} />
        <Screen name="PhotoDetailPage" component={PhotoDetailPage} options={noHeaderShown} />
        <Screen name="UserProfilePage" component={UserProfilePage} />
      </Navigator>
    </NavigationContainer>
  );
};

export default HomePageRoutes;
