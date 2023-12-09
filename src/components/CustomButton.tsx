import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

type EntypoIconName =
  | "key"
  | "link"
  | "email"
  | "image"
  | "text"
  | "menu"
  | "radio"
  | "switch"
  | "address"
  | "code"
  | "map"
  | "video"
  | "circle"
  | "mask"
  | "forward"
  | "back"
  | "retweet"
  | "minus"
  | "plus"
  | "camera"
  | "check"
  | "flash"
  | "icloud"
  | "cloud"
  | "upload";

type Variant = "primary" | "secondary";

type ColorConfig = {
  backgroundColor: string;
  color: string;
};

const COLORS: Record<Variant, ColorConfig> = {
  primary: {
    color: "text-system-brandLight",
    backgroundColor: "bg-system-brandDark",
  },
  secondary: {
    color: "text-system-brandDark",
    backgroundColor: "bg-system-brandLight",
  },
};

interface ButtonProps {
  onPress: () => void;
  text?: string;
  variant?: Variant;
  iconName?: EntypoIconName;
  iconSize?: number;
  disabled?: boolean;
  className?: string;
}

const CustomButton = ({
  onPress,
  text,
  iconName,
  iconSize = 24,
  disabled,
  variant = "primary",
  className = "",
}: ButtonProps) => {
  const { color, backgroundColor } = COLORS[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex flex-row items-center justify-center py-4 px-12 rounded-full ${color} ${backgroundColor} ${className}`}
    >
      {iconName && <Entypo name={iconName} size={iconSize} color={color} />}
      {text && <Text className={`${color} text-lg font-bold`}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
