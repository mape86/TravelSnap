import { View, Text } from 'react-native'
import React from 'react'
import useCustomNavigation  from '../../hooks/Navigation/useCustomNavigation';
import { RouteList } from '../../hooks/Navigation/useCustomNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginPage = () => {

  const { navigate } = useCustomNavigation();

  const { goBack } = useCustomNavigation();

  const handleReturnClick = () => {
    goBack();
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Text>LoginPage</Text>
      <TouchableOpacity onPress={handleReturnClick}>
        <Text>Return</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginPage