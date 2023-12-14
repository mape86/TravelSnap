import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PasswordFieldProps {
  password: string;
  // Simply set the type to be the same type React uses
  // on the function that sets the state when using the useState hook (seen when hovering over the function).
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

// Made a seperate password component
// since the same design (and toggle visibility functionality ) is used in the login page and signup page  */
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
        <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export { PasswordField };
