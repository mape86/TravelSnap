import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserPhotoDetailPage from "../pages/UserPhotoDetailPage";
import UserProfilePage from "../pages/UserProfilePage";
import UserSettingsPage from "../pages/UserSettingsPage";

const { Navigator, Screen } = createStackNavigator();

export const UserProfilePageRoutes = () => {
  const noHeaderShown = {
    headerShown: false,
  };
  return (
    <NavigationContainer independent={true}>
      <Navigator initialRouteName="UserProfilePage">
        <Screen name="UserProfilePage" component={UserProfilePage} options={noHeaderShown} />
        <Screen name="UserSettingsPage" component={UserSettingsPage} options={noHeaderShown} />
        <Screen
          name="UserPhotoDetailPage"
          component={UserPhotoDetailPage}
          options={noHeaderShown}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default UserProfilePageRoutes;
