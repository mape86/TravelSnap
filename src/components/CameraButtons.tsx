import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type EntypoIconName = "retweet" | "camera" | "check" | "flash" | "upload";

interface ButtonProps {
  onPress: () => void;
  title: string;
  icon: EntypoIconName;
  color?: string;
  backgroundColor?: string;
}

const CameraButtons = ({ onPress, title, icon, color, backgroundColor }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-8 pt-2 flex-row items-center justify-center"
    >
      <View className="items-center flex-row">
        <Entypo
          name={icon}
          size={28}
          color={color ? color : "#CBD5E1"}
          backgroundColor={backgroundColor}
        />
        <Text className="ml-1 font-bold text-base text-pink-100">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CameraButtons;
