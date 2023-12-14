import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoDetailPage from "../pages/PhotoDetailPage";
import UserProfilePage from "../pages/UserProfilePage";
import SearchPage from "../pages/SearchPage";

const { Navigator, Screen } = createStackNavigator();

export const SearchPageRoutes = () => {
  const noHeaderShown = {
    headerShown: false,
  };

  return (
    <NavigationContainer independent={true}>
      <Navigator initialRouteName="SearchPage">
        <Screen name="SearchPage" component={SearchPage} options={noHeaderShown} />
        <Screen name="PhotoDetailPage" component={PhotoDetailPage} options={noHeaderShown} />
        <Screen name="UserProfilePage" component={UserProfilePage} />
      </Navigator>
    </NavigationContainer>
  );
};

export default SearchPageRoutes;
