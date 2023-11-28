import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomNavigation from '../../hooks/Navigation/useCustomNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteList } from '../../hooks/Navigation/useCustomNavigation'

const WelcomePage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <TouchableOpacity onPress={() => handleClick("LoginPage")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleClick("HomeRoutes")}>
        <Text>Continue as guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default WelcomePage