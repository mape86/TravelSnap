import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FeedImageCard from "../../components/FeedImageCard";
import { useFeedImages } from "../../hooks/useFeedImages";

const HomePage = () => {
  const { imageObjects, isError, refreshList } = useFeedImages();

  return (
    <SafeAreaView className="flex-1 pt-4">
      <ScrollView>
        <View className="ml-5 mb-10 mr-6 flex-row justify-between items-center ">
          <Text className="font-bold text-3xl text-system-brandDark">Home</Text>
          <TouchableOpacity onPress={refreshList}>
            <Entypo name="cycle" size={22} color="gray" />
          </TouchableOpacity>
        </View>
        <View>
          {isError ? (
            <Text>Something went wrong fetching the feed</Text>
          ) : (
            imageObjects.map((image) => {
              return <FeedImageCard key={image.uri} image={image} />;
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
