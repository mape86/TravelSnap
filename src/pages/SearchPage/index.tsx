import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { fbStorage, getAllFeedImagesFromFirebase } from "../../../firebaseConfig";
import { getMetadata, ref } from "firebase/storage";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

export interface ImageObject {
  uri: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  tags?: string;
  userName?: string;
}

const SearchPage = () => {
  return (
    <View>
      <Text>SearchPage</Text>
    </View>
  );
};

export default SearchPage;
