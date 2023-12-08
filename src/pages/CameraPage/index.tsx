import {
  Camera,
  CameraType,
  CameraType as ExpoCameraType,
  FlashMode as ExpoFlashMode,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadImageToFirebase } from "../../../firebaseConfig";
import CustomButton from "../../components/CustomButton";
import * as location from "expo-location";
import { PermissionStatus } from "expo-location";

const CameraPage = () => {
  const [cameraPermission, setCameraPermission] = useState<
    boolean | null
  >(null);
  const [locationPermission, setLocationPermission] = useState<
    boolean | null
  >(null);
  const [imageData, setImageData] = useState<{
    uri: string | null;
    location: Location | undefined;
  }>({ uri: null, location: undefined });
  const [image, setImage] = useState<string | null>(null);
  const [camType, setCamType] = useState<ExpoCameraType>(CameraType.back);
  const [flashMode, setFlashMode] = useState<ExpoFlashMode>(ExpoFlashMode.off);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");

      // const locationStatus = await location.requestForegroundPermissionsAsync()
      // setLocationPermission(locationStatus.status === PermissionStatus.GRANTED);
    })();
  }, []);

  // const requestLocationPermission = async () => {
  //   const { status } = await location.requestForegroundPermissionsAsync();
  //   if (status !== PermissionStatus.GRANTED) {
  //     Alert.alert("Permission to access location was denied");
  //   }
  //   return status
  // }

  //   const getLocation = async () => {
  //     if (hasLocationPermission) {
  //       try {
  //         const {status} = await location.requestForegroundPermissionsAsync();
  //         if (status === "granted") {
  //           const locationResult = await location.getCurrentPositionAsync({});
  //           console.log(location)
  //           return locationResult.coords
  //         } else {
  //           throw new Error("App does not have permission to access location")
  //       }
  //     }catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  const getLocation = async () => {
    if (locationPermission) {
      try {
        const { coords } = await location.getCurrentPositionAsync({});
        return coords; // Return the coordinates directly
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      throw new Error("Location permission not granted");
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // const locationData = await getLocation();
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });
        // setImageData({ uri: data.uri, location: locationData });
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.saveToLibraryAsync(image);
        alert("Your image has been saved to your phones library!");
        setImage(null);
      } catch (error) {
        console.log(error);
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

  const uploadImage = async () => {
    if (image) {
      try {
        const uri = image;
        const fileName = uri.split("/").pop();
        uploadImageToFirebase(uri, fileName, (progress: any) =>
          console.log(progress)
        );
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black justify-center pb-1">
      {!image ? (
        <Camera
          style={styles.camera}
          type={camType}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <View className="flex-row justify-between px-6 pt-3">
            <CustomButton
              title=""
              iconName="retweet"
              onPress={() =>
                setCamType(
                  camType === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />
            <CustomButton
              title=""
              iconName="flash"
              color={flashMode === ExpoFlashMode.on ? "yellow" : "gray"}
              onPress={() => {
                setFlashMode(
                  flashMode === ExpoFlashMode.off
                    ? ExpoFlashMode.on
                    : ExpoFlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View className="flex-row justify-between px-6">
            <CustomButton
              title="Retake photo"
              iconName="retweet"
              onPress={() => setImage(null)}
            />
            <CustomButton title="Save" iconName="check" onPress={saveImage} />
            <CustomButton
              title="Upload"
              iconName="upload"
              onPress={uploadImage}
            />
          </View>
        ) : (
          <CustomButton
            title="Capture photo"
            iconName="camera"
            onPress={takePicture}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});

export default CameraPage;
