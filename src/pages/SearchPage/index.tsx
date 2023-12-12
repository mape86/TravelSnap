import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchImageCard from "../../components/SearchImageCard";
import { useFeedImages } from "../../hooks/useFeedImages";

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("");

  const { imageObjects, isError } = useFeedImages();

  const imageSearchResults = imageObjects.filter(
    (image) => image.tags?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 w-screen mt-10 mb-5 px-5 justify-center">
        <TextInput
          className="h-10 border-2 rounded-3xl pl-4"
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
      </View>
      {imageSearchResults.length >= 1 ? (
        <ScrollView className="h-screen">
          {imageSearchResults.map((image, index) => (
            <View key={index} className="flex-1 p-2 items-center">
              {image.tags?.includes(searchText)}
              <SearchImageCard image={image} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className="justify-center items-center h-screen">
          <Text className="text-lg font-semibold">No results</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchPage;
