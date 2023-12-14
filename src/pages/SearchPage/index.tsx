import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchImageCard from "../../components/SearchImageCard";
import { useFeedImages } from "../../hooks/useFeedImages";

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("");

  const { imageObjects, isLoading, refreshList } = useFeedImages();

  const imageSearchResults = imageObjects.filter(
    (image) => image.tags?.toLowerCase().includes(searchText.toLowerCase())
  );

  //If there is searchtext present, it means the user is currently expecting search results,
  // so use this as the source of the images rendered, even if it's empty.
  const images = searchText ? imageSearchResults : imageObjects;

  // If the user is searching, but the result is empty, show that, if not we show the images.
  // In the variable above this is either set to searchresult or all feed images dependent if the user is searching or not.
  const results =
    searchText && imageSearchResults.length === 0 ? (
      <View className="justify-center items-center h-screen">
        <Text className="text-lg font-semibold">No results</Text>
      </View>
    ) : (
      images.length > 0 && (
        <View className="flex-1">
          <TouchableOpacity onPress={refreshList} className="items-center mb-8">
            <Entypo name="cycle" size={22} color="gray" />
          </TouchableOpacity>
          <View className="flex-1">
            <FlatList
              columnWrapperStyle={flatListStyles.root}
              contentContainerStyle={flatListStyles.root}
              data={images}
              renderItem={({ item }) => <SearchImageCard image={item} />}
              // url of the image is unique, so we can use that as the key
              keyExtractor={(item) => item.uri}
              numColumns={3}
            />
          </View>
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
      <View className="w-screen mt-8 mb-8 px-5 justify-center">
        <TextInput
          className="h-14 border-[1px] rounded-full pl-6 .placeholder-black"
          placeholder="Search..."
          enterKeyHint="search"
          autoCorrect={false}
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
