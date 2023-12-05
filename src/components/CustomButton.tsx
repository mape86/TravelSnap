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

interface ButtonProps {
  onPress: () => void;
  title: string;
  iconName?: EntypoIconName;
  color?: string;
  disabled?: boolean;
  backgroundColor?: string;
}

const CustomButton = ({
  onPress,
  title,
  iconName,
  color,
  disabled,
  backgroundColor,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.button}
    disabled={disabled}
    className={backgroundColor || "bg-black"}
  >
    {iconName && <Entypo name={iconName} size={24} color={color || "white"} />}
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    marginLeft: 8,
    color: "white",
  },
});

export default CustomButton;
