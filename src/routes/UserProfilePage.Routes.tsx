import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfilePage from "../pages/UserProfilePage";
import UserSettingsPage from "../pages/UserSettingsPage";

const { Navigator, Screen } = createStackNavigator();

export const UserProfilePageRoutes = () => {

    const noHeaderShown = {
        headerShown: false
    }
    return (
        <NavigationContainer independent={true}>
        <Navigator initialRouteName="UserProfilePage">
            <Screen name="UserProfilePage" component={UserProfilePage} options={noHeaderShown} />
            <Screen name="UserSettingsPage" component={UserSettingsPage} />
        </Navigator>
        </NavigationContainer>
    );
    }

    export default UserProfilePageRoutes;

