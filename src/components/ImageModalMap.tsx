import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface ImageModalProps {
  imageUrl: any;
  locationTitle: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, locationTitle, onClose }) => {
  return (
    <Modal transparent={true} visible={!!imageUrl} onRequestClose={onClose}>
      <View className="flex-1 justify-center">
        {locationTitle && (
          <Text className="absolute top-10 left-20 mt-10 text-2xl font-bold text-black">
            {locationTitle}
          </Text>
        )}
        <View className="w-90 h-full rounded-10 overflow-hidden ">
          <Image source={imageUrl} className="flex-1 w-full h-full" />
        </View>

        <View className="absolute top-20 items-center flex-row p-4 w-full justify-between">
          {locationTitle && (
            <Text className="text-2xl font-bold text-black">{locationTitle}</Text>
          )}

          <TouchableOpacity
            className=" bg-black rounded-full w-32 items-center p-4"
            onPress={onClose}
          >
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
