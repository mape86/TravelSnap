import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native";

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
  UploadLibraryPhotoPage: { uri: string };
  //Search pages:

  //UserProfile pages:
  UserProfilePage: undefined;
  UserSettingsPage: undefined;
  WelcomeRoutes: undefined;
  UserPhotoDetailPage: undefined;
};

type TravelSnapNavigationProp = NavigationProp<RouteList>;

const useCustomNavigation = () => {
  const navigation = useNavigation<TravelSnapNavigationProp>();

  const navigate = (path: keyof RouteList, params?: any) => {
    navigation.navigate(path, params);
  };
  const goBack = () => {
    navigation.goBack();
  };

  const reset = (path: keyof RouteList, params?: any) => {
    navigation.reset({
      index: 0,
      routes: [{ name: path, params }],
    });
  };

  const pop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return { navigate, goBack, reset, pop };
};

export default useCustomNavigation;
