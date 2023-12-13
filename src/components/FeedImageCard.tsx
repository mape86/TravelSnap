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
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import useCustomNavigation from "../hooks/Navigation/useCustomNavigation";
import { ImageObject } from "../hooks/useFeedImages";

interface FeedImageCardProps {
  image: ImageObject;
}

const FeedImageCard: React.FC<FeedImageCardProps> = ({ image }) => {
  const { navigate } = useCustomNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const scale = useSharedValue(1);

  const auth = getAuth();
  const user = auth.currentUser;
  const imageIdPath = decodeURIComponent(image.uri).replace(
    "https://firebasestorage.googleapis.com/v0/b/travelsnap-84d7a.appspot.com/o/feed/",
    ""
  );

  const fetchLikes = async () => {
    const firestore = getFirestore();
    const imageAttributesCollection = collection(
      firestore,
      "ImageAttributes",
      imageIdPath,
      "likes"
    );

    try {
      const q = query(imageAttributesCollection);
      const querySnapshot = await getDocs(q);

      setLikeCount(querySnapshot.docs.length);

      if (user) {
        const userLikeDoc = await getDoc(doc(imageAttributesCollection, user.uid));
        setIsLiked(userLikeDoc.exists());
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  const setLike = async () => {
    if (!user) {
      return;
    }
    setIsLiked(true);
    scale.value = withSpring(1.2, {}, () => {
      runOnJS(resetScale)();
    });

    try {
      const firestore = getFirestore();
      const userId = user.uid;

      const likeRef = doc(firestore, "ImageAttributes", imageIdPath, "likes", userId);

      await setDoc(likeRef, { like: true });
      console.log("Image liked successfully");
    } catch (error) {
      setIsLiked(false);
      console.error("Error liking image:", error);
    }
  };

  const unsetLike = async () => {
    if (!user) {
      return;
    }

    setIsLiked(false);
    try {
      const firestore = getFirestore();
      const userId = user.uid;

      const likeRef = doc(firestore, "ImageAttributes", imageIdPath, "likes", userId);

      await deleteDoc(likeRef);
      console.log("Image disliked successfully");
    } catch (error) {
      setIsLiked(true);
      console.error("Error disliking image:", error);
    }
  };

  const toggleLike = async () => {
    if (isLiked) {
      await unsetLike();
    } else {
      await setLike();
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
        <TouchableOpacity onPress={toggleLike}>
          <Animated.View style={animatedStyle}>
            <Ionicons
              name={!isLiked ? "ios-heart-outline" : "ios-heart-sharp"}
              size={32}
              color="black"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedImageCard;
function setUserHasLiked(arg0: any) {
  throw new Error("Function not implemented.");
}
