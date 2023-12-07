import React, { useEffect, useState } from "react";
import { FlatList, Image, ImageSourcePropType, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import image1 from "../../../assets/mockdata/image-1.jpg";
import image2 from "../../../assets/mockdata/image-2.jpg";
import image3 from "../../../assets/mockdata/image-3.jpg";
import image4 from "../../../assets/mockdata/image-4.jpg";
import image5 from "../../../assets/mockdata/image-5.jpg";
import { fbAuth, getAllImagesFromFirebase } from "../../../firebaseConfig";
import useCustomNavigation, { RouteList } from "../../hooks/Navigation/useCustomNavigation";

const UserProfilePage = () => {
  const mockImages = [image1, image2, image3, image4, image5];

  const auth = fbAuth.currentUser;

  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  const handleImageClick = (item: keyof RouteList, uri: string) => {
    navigate(item, uri);
  };

  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [mockPhotoUrls, setMockPhotoUrls] = useState<ImageSourcePropType[]>([]);

  useEffect(() => {
    // setMockPhotoUrls(mockImages);
    const fetchImagesFromFirebase = async () => {
      const images = await getAllImagesFromFirebase()
      setPhotoUrls(images)
    }

    fetchImagesFromFirebase()
  }, []);

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
            <Text className="pt-1">Hello world</Text>
          </View>
          <TouchableOpacity
          className="bg-white rounded-2xl border-2 items-center justify-center mt-14 ml-10" 
          onPress={() => handleClick("UserSettingsPage")}
          >
            <Text className="px-2 py-0.5">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 mt-5">
        <FlatList
          data={photoUrls}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImageClick("PhotoDetailPage", item)}>
              <Image source={{uri: item}} className="h-60 w-48 mx-0.5 my-0.5" />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default UserProfilePage;
