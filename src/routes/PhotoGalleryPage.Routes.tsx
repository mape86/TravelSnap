import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoGalleryPage from "../pages/PhotoGalleryPage";

import CameraPage from "../pages/CameraPage";
import UploadLibraryPhotoPage from "../pages/UploadLibraryPhotoPage";

const { Navigator, Screen } = createStackNavigator();

export const PhotoGalleryPageRoutes = () => {
  const noHeaderShown = {
    headerShown: false,
  };
  return (
    <NavigationContainer independent={true}>
      <Navigator initialRouteName="PhotoGalleryPage">
        <Screen name="PhotoGalleryPage" component={PhotoGalleryPage} options={noHeaderShown} />
        <Screen name="CameraPage" component={CameraPage} />
        <Screen name="UploadLibraryPhotoPage" component={UploadLibraryPhotoPage} options={noHeaderShown} />
      </Navigator>
    </NavigationContainer>
  );
};

export default PhotoGalleryPageRoutes;
