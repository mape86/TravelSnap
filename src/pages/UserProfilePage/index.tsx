import { useFocusEffect, useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import image1 from "../../../assets/mockdata/image-1.jpg";
import image3 from "../../../assets/mockdata/image-3.jpg";
import { fbAuth, getAllImagesFromFirebase } from "../../../firebaseConfig";
import useCustomNavigation, { RouteList } from "../../hooks/Navigation/useCustomNavigation";
import { Entypo } from "@expo/vector-icons";

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

  const renderOutImages = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleImageClick(item)}>
      <Image source={{ uri: item }} className="h-60 w-48 mx-0.5 my-0.5" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-auto bg-system-brandLight">
      <View className="mb-3 flex justify-between">
        <View className="w-screen h-32 object-cover">
          <Image className="h-44 w-screen object-cover" source={image3} />
        </View>
        <View className="h-32 flex flex-row">
          <Image
            className="h-32 w-28 ml-6 rounded-xl border-2 border-zinc-100"
            source={image1}
          />

          <View className="flex flex-col ml-7 mt-14">
            <Text className="font-semibold text-xl">{auth?.displayName}</Text>
            <Text className="pt-1">{auth?.photoURL}</Text>
          </View>
          <TouchableOpacity
            className="bg-white rounded-2xl border-2 items-center justify-center mt-14 ml-12"
            onPress={() => handleClick("UserSettingsPage")}
          >
            <Text className="px-2 py-0.5">Edit Profile</Text>
          </TouchableOpacity>
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
  );
};

export default UserProfilePage;
