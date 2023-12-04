import {
  Camera,
  CameraType,
  CameraType as ExpoCamerType,
  FlashMode as ExpoFlashMode,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadImageToFirebase } from "../../../firebaseConfig";
import CustomButton from "../../components/CustomButton";

const CameraPage = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState<ExpoCamerType>(CameraType.back);
  const [flashMode, setFlashMode] = useState<ExpoFlashMode>(ExpoFlashMode.off);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });
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

  if (hasCameraPermission === false) {
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
          type={type}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <View className="flex-row justify-between px-6 pt-3">
            <CustomButton
              title=""
              iconName="retweet"
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
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
