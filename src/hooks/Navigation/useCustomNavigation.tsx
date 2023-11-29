import { useNavigation, NavigationProp } from "@react-navigation/native";

export type RouteList = {

    //Welcome routes:
    Welcome: undefined;
    LoginPage: undefined;
    CreateUserPage: undefined;

    //Shared routes:
    UserProfilePage: undefined;
    PhotoDetailPage: undefined;

    //Homepage routes:
    HomeRoutes: undefined;
    HomePage: undefined;

    //Photo/Camera pages:
    CameraPage: undefined;
    PhotoGalleryPage: undefined;
    //Search pages:
    
    //Profile pages:
}

type TravelSnapNavigationProp = NavigationProp<RouteList>;

const useCustomNavigation = () => {
    const navigation = useNavigation<TravelSnapNavigationProp>();
    
    const navigate = (path: keyof RouteList) => {
        navigation.navigate(path);
    }
    const goBack = () => {
        navigation.goBack();
    }

    return { navigate, goBack };
}

export default useCustomNavigation;