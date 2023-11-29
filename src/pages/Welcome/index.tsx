import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomNavigation from '../../hooks/Navigation/useCustomNavigation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteList } from '../../hooks/Navigation/useCustomNavigation'
import CustomButton from '../../components/CustomButton'

const WelcomePage = () => {
  const { navigate } = useCustomNavigation();

  const handleClick = (item: keyof RouteList) => {
    navigate(item);
  };

  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <View className='pb-3'>
      <CustomButton onPress={() => handleClick("CreateUserPage")} title="Create Account" iconName='email'/>
      </View>
      <View className='pb-3'>
      <CustomButton onPress={() => handleClick("LoginPage")} title="Login" iconName='key' />
      </View>

      <TouchableOpacity onPress={() => handleClick("HomeRoutes")}>
        <Text>Continue as guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default WelcomePage