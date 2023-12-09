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
import * as Location from "expo-location";
import { PermissionStatus } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LocationInfo {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const CameraPage = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null
  );
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [imageData, setImageData] = useState<{
    uri: string;
    location?: LocationInfo;
  } | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [camType, setCamType] = useState<ExpoCameraType>(CameraType.back);
  const [flashMode, setFlashMode] = useState<ExpoFlashMode>(ExpoFlashMode.off);
  const cameraRef = useRef<Camera | null>(null);

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
      // console.log(location);
    })();
  }, []);

  const getLocation = async () => {
    if (locationPermission) {
      try {
        let location = await Location.getCurrentPositionAsync({});
        return location as LocationInfo;
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      throw new Error("Location permission not granted");
    }
  };

  const getLoc = async (): Promise<LocationInfo> => {
    let locationInfo = location;
    return locationInfo as LocationInfo;
  };

  const takePicture = async () => {
    if (cameraRef.current && locationPermission) {
      try {
        const locationInfo = await getLoc();
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });
        setImageData({ uri: data.uri, location: locationInfo });
        //setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveImageToLibrary = async () => {
    if (imageData) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imageData.uri);
        await MediaLibrary.createAlbumAsync("Expo Images", asset, false);
        alert(
          "Your image has been saved to your phone's library in the Expo Images album!"
        );

        const imageMetadata = {
          uri: imageData.uri,
          location: imageData.location,
        };
        console.log(imageMetadata);

        await AsyncStorage.setItem(
          `metadata_${asset.id}`,
          JSON.stringify(imageMetadata)
        );

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
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black justify-center pb-1">
      {!imageData ? (
        <Camera
          style={styles.camera}
          type={camType}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <View className="flex-row justify-between px-6 pt-3">
            <CustomButton
              variant="secondary"
              iconName="retweet"
              onPress={() =>
                setCamType(
                  camType === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                )
              }
            />
            <CustomButton
              variant="secondary"
              iconName="flash"
              className={flashMode === ExpoFlashMode.on ? "yellow" : "gray"}
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
        <Image source={{ uri: imageData?.uri }} style={styles.camera} />
      )}
      <View>
        {imageData?.uri ? (
          <View className="flex-row justify-between px-6">
            <CustomButton
              text="Retake photo"
              iconName="retweet"
              onPress={() => setImageData(null)}
            />
            <CustomButton
              text="Save"
              iconName="check"
              onPress={saveImageToLibrary}
            />
            <CustomButton
              text="Upload"
              iconName="upload"
              onPress={uploadImage}
            />
          </View>
        ) : (
          <CustomButton
            variant="secondary"
            iconSize={28}
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
