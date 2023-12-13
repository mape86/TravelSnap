import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FeedImageCard from "../../components/FeedImageCard";
import useCustomNavigation from "../../hooks/Navigation/useCustomNavigation";
import { useFeedImages } from "../../hooks/useFeedImages";

const HomePage = () => {
  const { navigate } = useCustomNavigation();

  const { imageObjects, isError } = useFeedImages();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text className="font-bold text-3xl text-system-brandDark">Home</Text>
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
