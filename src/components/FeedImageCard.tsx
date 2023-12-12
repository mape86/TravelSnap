import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import CommentSection from "./CommentSection";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";
import { ImageObject } from "../hooks/useFeedImages";

interface FeedImageCardProps {
  image: ImageObject;
}

const FeedImageCard: React.FC<FeedImageCardProps> = ({ image }) => {
  const { navigate } = useCustomNavigation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const scale = useSharedValue(1);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    const firestore = getFirestore();
    const imageAttributesCollection = collection(firestore, "ImageAttributes");

    try {
      const q = query(imageAttributesCollection, where("imageId", "==", image.uri));

      const querySnapshot = await getDocs(q);

      const likesData = querySnapshot.docs.map((doc) => doc.data().like);
      setLikeCount(likesData.length > 0 ? likesData[0] : 0);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      console.log("User is not logged in. Cannot toggle favorite.");
      return;
    }

    const firestore = getFirestore();
    const imageDocRef = doc(firestore, "ImageAttributes", image.uri);

    try {
      await updateDoc(imageDocRef, { likes: likeCount + 1 });

      setLikeCount((prevCount) => prevCount + 1);

      scale.value = withSpring(1.2, {}, () => {
        runOnJS(resetScale)();
      });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const resetScale = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigate("PhotoDetailPage", {
            image,
          })
        }
        className="flex items-center relative mb-5"
      >
        <Image
          source={{ uri: image.uri }}
          style={{ width: 350, height: 400 }}
          className="aspect-ratio-ratio-1 rounded-lg"
        />
        <Text className="font-semibold mt-2 ">{image.userName}</Text>
      </TouchableOpacity>

      <View className="absolute bottom-0 right-10 items-center justify-center w-16 h-16 bg-system-brandLight rounded-full overflow-hidden">
        <TouchableOpacity onPress={toggleFavorite}>
          <Animated.View style={animatedStyle}>
            {isFavorited ? (
              <Ionicons name="ios-heart-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="ios-heart-outline" size={24} color="black" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedImageCard;
