import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useCustomNavigation from '../../hooks/Navigation/useCustomNavigation'
import { RouteList } from '../../hooks/Navigation/useCustomNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper'

const PhotoGalleryPage = () => {

  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <View className='w-screen items-end'>
      <TouchableOpacity className='pr-4' onPress={() => handleClick("CameraPage")}>
        <Icon source="camera" size={30} />
      </TouchableOpacity>
      </View>
      <Text className='pb-6'>PhotoGalleryPage</Text>
      <TouchableOpacity onPress={() => handleClick("PhotoDetailPage")}>
        <Text>PhotoDetailPage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PhotoGalleryPage