import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Camera,
  CameraType,
  CameraType as ExpoCameraType,
  FlashMode as ExpoFlashMode,
} from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadImageToFirebase } from "../../../firebaseConfig";
import CameraButtons from "../../components/CameraButtons";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";

interface LocationInfo {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const CameraPage = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [imageData, setImageData] = useState<{
    uri: string;
    location?: LocationInfo;
  } | null>(null);
  const [camType, setCamType] = useState<ExpoCameraType>(CameraType.back);
  const [flashMode, setFlashMode] = useState<ExpoFlashMode>(ExpoFlashMode.off);
  const cameraRef = useRef<Camera | null>(null);

  const navigation = useCustomNavigation();

  //This useEffect is used to ask for permission to use the camera, location and media library, when user first enters the view. These codelines are taken from the expo documentation. If user accepts the states are set to true, and the user can use the camera.
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(locationStatus.status === "granted");

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getLoc = async (): Promise<LocationInfo> => {
    let locationInfo = location;
    return locationInfo as LocationInfo;
  };

  //function for capturing a picture with camera, adding the location if that is granted permission. The captured image is then set to the imageData state, and then displayed in the view.
  const takePicture = async () => {
    if (cameraRef.current && locationPermission) {
      try {
        const locationInfo = await getLoc();
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });
        setImageData({ uri: data.uri, location: locationInfo });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Saves captures image to your device camera roll, with extra metadata such as location if there.
  const saveImageToLibrary = async () => {
    if (imageData) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imageData.uri);
        alert("Your image has been saved to your phone's library!");

        const imageMetadata = {
          uri: imageData.uri,
          location: imageData.location,
        };

        await AsyncStorage.setItem(`metadata_${asset.id}`, JSON.stringify(imageMetadata));

        setImageData(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (cameraPermission === false) {
    return (
      <View className="flex-1 bg-black justify-center pb-2">
        <Text>App has no access to device camera</Text>
      </View>
    );
  }

  //function to upload the captures image to firebase storage, with metadata such as location if it is available in with the image. This func is calling the upload function from firebaseConfig, and sending in image data in the call.
  const uploadImage = async () => {
    if (imageData && imageData.uri) {
      try {
        const uri = imageData.uri;
        const fileName = uri.split("/").pop() || "NoName.jpg";

        const metadata = imageData.location
          ? {
              latitude: String(imageData.location.coords.latitude),
              longitude: String(imageData.location.coords.longitude),
            }
          : {};
        console.log(metadata);

        uploadImageToFirebase(uri, fileName, metadata, (progress: any) =>
          console.log(progress)
        );
        setImageData(null);
        alert("Success, uploaded to your firebase folder");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-system-brandDark justify-center pb-1">
      <View className="ml-2 mb-2">
        <TouchableOpacity className="flex-row items-center" onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={28} color="gray" />
          <Text className="text-zinc-200">Back</Text>
        </TouchableOpacity>
      </View>
      {!imageData ? (
        <Camera
          className="flex-1 rounded-lg"
          type={camType}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <View className="flex-row justify-between px-6 pt-3">
            <CameraButtons
              title=""
              icon="retweet"
              backgroundColor="black"
              onPress={() =>
                setCamType(camType === CameraType.back ? CameraType.front : CameraType.back)
              }
            />
            <CameraButtons
              title=""
              icon="flash"
              backgroundColor="black"
              color={flashMode === ExpoFlashMode.on ? "yellow" : "#CBD5E1"}
              onPress={() => {
                setFlashMode(
                  flashMode === ExpoFlashMode.off ? ExpoFlashMode.on : ExpoFlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: imageData?.uri }} className="flex-1 rounded-lg" />
      )}
      <View>
        {imageData?.uri ? (
          <View className="flex-row justify-between px-6">
            <CameraButtons title="Retake" icon="retweet" onPress={() => setImageData(null)} />
            <CameraButtons title="Save" icon="check" onPress={saveImageToLibrary} />
            <CameraButtons title="Upload" icon="upload" onPress={uploadImage} />
          </View>
        ) : (
          <CameraButtons title="" icon="camera" onPress={takePicture} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CameraPage;
