import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomNavigation from '../../hooks/Navigation/useCustomNavigation'
import { RouteList } from '../../hooks/Navigation/useCustomNavigation'
import Navigator from '../../components/Navigator';


const PhotoDetailPage = () => {

  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <TouchableOpacity onPress={() => handleClick("UserProfilePage")}>
        <Text>Photo owner user page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PhotoDetailPage