import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchImageCard from "../../components/SearchImageCard";
import { useFeedImages } from "../../hooks/useFeedImages";

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("");

  const { imageObjects, isLoading } = useFeedImages();

  const imageSearchResults = imageObjects.filter(
    (image) => image.tags?.toLowerCase().includes(searchText.toLowerCase())
  );

  const images = searchText ? imageSearchResults : imageObjects;

  const results =
    searchText && imageSearchResults.length === 0 ? (
      <View className="justify-center items-center h-screen">
        <Text className="text-lg font-semibold">No results</Text>
      </View>
    ) : (
      images.length > 0 && (
        <View className="h-screen ">
          <FlatList
            columnWrapperStyle={flatListStyles.root}
            contentContainerStyle={flatListStyles.root}
            data={images}
            renderItem={({ item }) => <SearchImageCard image={item} />}
            keyExtractor={(item) => item.uri}
            numColumns={3}
          />
        </View>
      )
    );

  const loadingView = (
    <View className="justify-center items-center h-screen">
      <Text className="text-lg font-semibold">Loading...</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 w-screen my-20 px-5 justify-center">
        <TextInput
          className="h-14 border-[1px] rounded-full pl-6 .placeholder-black"
          placeholder="Search..."
          enterKeyHint="search"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
      </View>
      {isLoading ? loadingView : results}
    </SafeAreaView>
  );
};

const flatListStyles = StyleSheet.create({
  root: {
    gap: 4,
  },
});

export default SearchPage;
