import React, { useState } from "react";
import { View, TextInput, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface PasswordFieldProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const PasswordField = ({ password, setPassword, className }: PasswordFieldProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <View
      className={`flex flex-row 1 space-x-2 border rounded-md px-2 items-center ${className}`}
    >
      <TextInput
        className="flex-1 p-4 bg-transparent"
        placeholder="password"
        autoCapitalize="none"
        value={password}
        autoCorrect={false}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => setPasswordVisible((state) => !state)} className="mr-2">
        {isPasswordVisible ? (
          <Ionicons name="eye" size={24} color="black" />
        ) : (
          <Ionicons name="eye-off" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export { PasswordField };
