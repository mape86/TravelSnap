import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  NavigatorScreenParams,
} from "@react-navigation/native";

export type RouteList = {
  //Welcome routes:
  Welcome: undefined;
  LoginPage: undefined;
  CreateUserPage: undefined;

  //Shared routes:
  ProfilePage: undefined;
  PhotoDetailPage: undefined;

  //Homepage routes:
  HomeRoutes: undefined;
  HomePage: undefined;

    //Photo/Camera pages:
    CameraPage: undefined;
    PhotoGalleryPage: undefined;
    UploadLibraryPhotoPage: undefined;
    //Search pages:
    
    //UserProfile pages:
    UserProfilePage: undefined;
    UserSettingsPage: undefined;
}

type TravelSnapNavigationProp = NavigationProp<RouteList>;

const useCustomNavigation = () => {
  const navigation = useNavigation<TravelSnapNavigationProp>();

  const navigate = (path: keyof RouteList, params?: any) => {
    navigation.navigate(path, params);
  };
  const goBack = () => {
    navigation.goBack();
  };

  return { navigate, goBack };
};

export default useCustomNavigation;
