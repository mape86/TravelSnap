import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoGalleryPage from "../pages/PhotoGalleryPage";
import PhotoDetailPage from "../pages/PhotoDetailPage";
import CameraPage from "../pages/CameraPage";

const { Navigator, Screen } = createStackNavigator();

export const PhotoGalleryPageRoutes = () => {
    
        const noHeaderShown = {
            headerShown: false
        }
        return (
            <NavigationContainer independent={true}>
            <Navigator initialRouteName="PhotoGalleryPage">
                <Screen name="PhotoGalleryPage" component={PhotoGalleryPage} options={noHeaderShown} />
                <Screen name="CameraPage" component={CameraPage} />
                <Screen name="PhotoDetailPage" component={PhotoDetailPage} />
            </Navigator>
            </NavigationContainer>
        );
        }

        export default PhotoGalleryPageRoutes;