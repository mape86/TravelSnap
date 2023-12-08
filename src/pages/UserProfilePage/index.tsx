import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useCustomNavigation from '../../hooks/Navigation/useCustomNavigation'
import { RouteList } from '../../hooks/Navigation/useCustomNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper'

const UserProfilePage = () => {

  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Text className='text-lg font-semibold pb-3'>UserProfilePage</Text>
      <TouchableOpacity onPress={() => handleClick("UserSettingsPage")}>
        <Text>UserSettingsPage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default UserProfilePage