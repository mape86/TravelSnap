import { useFocusEffect, useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { DevSettings, FlatList, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import image1 from "../../../assets/mockdata/image-1.jpg";
import image3 from "../../../assets/mockdata/image-3.jpg";
import { fbAuth, getAllImagesFromFirebase } from "../../../firebaseConfig";
import useCustomNavigation, { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { signOut } from "firebase/auth";

type PickedPhoto = {
  uri: string;
  latitude?: number;
  longitude?: number;
};

type RouteParamList = {
  UserPhotoDetailPage: { uri: string };
};

const UserProfilePage = () => {
  const auth = fbAuth.currentUser;

  const navigation = useNavigation<StackNavigationProp<RouteParamList>>();
  const { navigate } = useCustomNavigation();
  const isFocused = useIsFocused();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  const handleImageClick = (uri: string) => {
    navigation.navigate("UserPhotoDetailPage", { uri });
  };

  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchImagesFromFirebase();
  }, [isFocused]);

  const fetchImagesFromFirebase = async () => {
    const images = await getAllImagesFromFirebase();
    setPhotoUrls(images);
  };

  const handleLoginClick = () => {
    DevSettings.reload();
  };

  const renderOutImages = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleImageClick(item)}>
      <Image source={{ uri: item }} className="h-60 w-48 mx-0.5 my-0.5" />
    </TouchableOpacity>
  );

  return (
    <>
      {auth ? (
        <View className="flex-auto bg-system-brandLight">
          <View className="w-screen h-32 object-cover">
            <Image className="h-44 w-screen object-cover" source={image3} />
          </View>

          <View className="flex flex-row items-center">
            <Image
              className="h-32 w-28 ml-6 rounded-xl border-2 object-cover flex-shrink-0 border-zinc-100"
              source={image1}
              resizeMode="cover"
            />

            <View className="flex flex-col justify-between ml-2 flex-grow mt-6">
              <View className="flex-row mt-6 justify-between">
                <Text className="font-semibold text-xl truncate">{auth?.displayName}</Text>
                <TouchableOpacity
                  className="rounded-2xl border-2 flex-shrink-0 self-center mr-2"
                  onPress={() => handleClick("UserSettingsPage")}
                >
                  <Text className="px-2 py-0.5">Edit</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-col flex-shrink">
                <Text className="text-sm truncate w-56">{auth?.photoURL}</Text>
              </View>
            </View>
          </View>

          <View className="flex-1 mt-5 items-center">
            <TouchableOpacity onPress={() => fetchImagesFromFirebase()}>
              <Entypo name="cycle" size={22} color="gray" />
            </TouchableOpacity>
            <FlatList
              data={photoUrls}
              renderItem={renderOutImages}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-semibold mb-5">Log in to view profile</Text>
          <CustomButton onPress={handleLoginClick} text="Log in" />
        </View>
      )}
    </>
  );
};

export default UserProfilePage;
