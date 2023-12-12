import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageObject, useFeedImages } from "../../hooks/useFeedImages";
import SearchImageCard from "../../components/SearchImageCard";

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("");

  const { imageObjects, isError } = useFeedImages();

  const imageSearchResults = imageObjects.filter(
    (image) => image.tags?.toLowerCase().includes(searchText.toLowerCase())
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
      {imageSearchResults.length >= 1 ? (
        <View className="h-screen ">
          <FlatList
            columnWrapperStyle={flatListStyles.root}
            contentContainerStyle={flatListStyles.root}
            data={imageObjects}
            renderItem={({ item }) => <SearchImageCard image={item} />}
            keyExtractor={(item) => item.uri}
            numColumns={3}
          />
        </View>
      ) : (
        <View className="justify-center items-center h-screen">
          <Text className="text-lg font-semibold">No results</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const flatListStyles = StyleSheet.create({
  root: {
    gap: 4,
  },
});

export default SearchPage;
