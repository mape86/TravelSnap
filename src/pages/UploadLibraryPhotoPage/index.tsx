import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { RouteProp } from '@react-navigation/native'
import { Button } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';

type RootStackList = {
  GalleryPage: undefined;
  UploadLibraryPhotoPage: { uri: string };
};

type UploadLibraryPhotoPageRoute = RouteProp<RootStackList, 'UploadLibraryPhotoPage'>

type Props = {
  route: UploadLibraryPhotoPageRoute

}

const UploadLibraryPhotoPage: React.FC<Props> = ({route}) => {

  const {uri} = route.params

  const [description, setDescription] = useState<string>('')
  const [tags, setTags] = useState<string>('')

  const handleUploadToFirebase = () => {
      
    }

  return (
    <View className='flex-1 items-center'>
      <Image source={{uri}} style={{width: 350, height: 350}} className='rounded-lg m-2'/>
      <TextInput 
       placeholder='Write a description'
       numberOfLines={10}
       multiline={true}
       onChangeText={setDescription}
       className='w-80 h-36 border-2 border-gray-400 mb-4' 
       />
      <TextInput
        placeholder='Add tags'
        onChangeText={setTags}
        className='w-80 h-10 border-2 border-gray-400' 
        />
      <View className='flex flex-row gap-x-4 mt-4'>
        <CustomButton title='Upload' onPress={handleUploadToFirebase} />
      </View>
    </View>
  )
}

export default UploadLibraryPhotoPage