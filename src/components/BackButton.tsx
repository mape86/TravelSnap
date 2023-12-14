import React from "react";
import { GestureResponderEvent, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";

interface BackButtonProps {
  onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const { goBack } = useCustomNavigation();

  return (
    <TouchableOpacity onPress={onPress ?? goBack} className="flex m-4 flex-row items-center">
      <Ionicons name="arrow-back" size={28} color="black" />
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

export { BackButton };
