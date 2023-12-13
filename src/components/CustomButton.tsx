import { Entypo } from "@expo/vector-icons";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

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
    color: "text-white",
    backgroundColor: "bg-system-brandDark",
  },
  secondary: {
    color: "text-black",
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

  const buttonStyle = disabled ? "opacity-40" : "opacity-100";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex flex-row items-center justify-center py-4 px-12 border rounded-full ${color} ${backgroundColor} ${buttonStyle} ${className}`}
    >
      {iconName && <Entypo name={iconName} size={iconSize} color={color} />}
      {text && <Text className={`${color} text-lg font-bold`}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
