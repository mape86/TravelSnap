import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getStorage, ref, getMetadata } from 'firebase/storage'
import { fbAuth, fbStorage } from '../../../firebaseConfig'
import { RouteProp } from '@react-navigation/native'

type UserPhotoDetailPageRouteProp = RouteProp<{params: {uri: string, latitude?: string, longitude?: string}}, 'params'>

interface LocationState {
    latitude: string | null;
    longitude: string | null;
    }

const UserPhotoDetailPage = (route: any) => {

    const {uri} = route.route.params 
    const [imageLocation, setImageLocation] = useState<LocationState>({latitude: null, longitude: null})

    useEffect(() => {
        const fetchImageLocationData = async () => {
            const storage = getStorage()
            const imageRef = ref(storage, uri)

            try {
                const metadata = await getMetadata(imageRef)
                const latitude = metadata.customMetadata?.latitude
                const longitude = metadata.customMetadata?.longitude 

                if(latitude && longitude) {
                    setImageLocation({latitude, longitude})
                }    
            } catch (error) {
                console.log(error)
            }
        }
        fetchImageLocationData()
     }, [uri])

  return (
    <View className='flex-1 items-center'>
      <Image source={{uri}} className='rounded-lg m-2 w-80 h-80'/>
      <Text>Latitude: {imageLocation.latitude}</Text>
      <Text>Longitude: {imageLocation.longitude}</Text>
    </View>
  )
}

export default UserPhotoDetailPage